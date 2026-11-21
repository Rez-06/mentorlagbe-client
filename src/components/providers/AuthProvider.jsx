"use client";

import { createContext, useCallback, useContext, useEffect, useState } from "react";
import { authClient, SESSION_KEY } from "@/lib/auth-client";
import { apiFetch } from "@/lib/apiFetch";
import { getToken, setToken, clearToken } from "@/lib/token";

const AuthContext = createContext(null);
export const useAuth = () => useContext(AuthContext);

export default function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Runs on every page load/reload: restores the user from the saved JWT
  const loadUser = useCallback(async () => {
    if (!getToken()) {
      setLoading(false);
      return;
    }
    try {
      setUser(await apiFetch("/api/users/me"));
    } catch (err) {
      if (err.status === 401) {
        clearToken();
        localStorage.removeItem(SESSION_KEY);
        setUser(null);
      }
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadUser();
  }, [loadUser]);

  // BetterAuth session token -> our API JWT
  const establish = async (sessionToken) => {
    localStorage.setItem(SESSION_KEY, sessionToken);
    const { token, user } = await apiFetch("/api/jwt", {
      method: "POST",
      auth: false,
      headers: { Authorization: `Bearer ${sessionToken}` },
    });
    setToken(token);
    setUser(user);
  };

  const login = async (email, password) => {
    localStorage.removeItem(SESSION_KEY);
    let sessionToken = null;
    const { error } = await authClient.signIn.email(
      { email, password },
      { onSuccess: (ctx) => (sessionToken = ctx.response.headers.get("set-auth-token")) }
    );
    if (error) throw new Error(error.message || "Sign in failed");
    if (!sessionToken) throw new Error("Could not start your session");
    await establish(sessionToken);
  };

  const register = async ({ name, email, password, role }) => {
    localStorage.removeItem(SESSION_KEY);
    let sessionToken = null;
    const { error } = await authClient.signUp.email(
      { name, email, password, role },
      { onSuccess: (ctx) => (sessionToken = ctx.response.headers.get("set-auth-token")) }
    );
    if (error) throw new Error(error.message || "Sign up failed");
    if (!sessionToken) throw new Error("Could not start your session");
    await establish(sessionToken);
  };

  const logout = async () => {
    try {
      await authClient.signOut();
    } catch {}
    localStorage.removeItem(SESSION_KEY);
    clearToken();
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, register, logout, setUser }}>
      {children}
    </AuthContext.Provider>
  );
}