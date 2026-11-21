"use client";

import { createContext, useCallback, useContext, useEffect, useState } from "react";
import { authClient, SESSION_KEY } from "@/lib/auth-client";

const AuthContext = createContext(null);
export const useAuth = () => useContext(AuthContext);

const saveToken = (ctx) => {
  const t = ctx.response.headers.get("set-auth-token");
  if (t) localStorage.setItem(SESSION_KEY, t);
};

export default function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const loadUser = useCallback(async () => {
    if (!localStorage.getItem(SESSION_KEY)) {
      setUser(null);
      setLoading(false);
      return;
    }
    try {
      const { data } = await authClient.getSession();
      setUser(data?.user ?? null);
      if (!data) localStorage.removeItem(SESSION_KEY);
    } catch {
      setUser(null);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadUser();
  }, [loadUser]);

  const login = async (email, password) => {
    const { error } = await authClient.signIn.email({ email, password }, { onSuccess: saveToken });
    if (error) throw new Error(error.message || "Sign in failed");
    await loadUser();
  };

  const register = async ({ name, email, password, role }) => {
    const { error } = await authClient.signUp.email({ name, email, password, role }, { onSuccess: saveToken });
    if (error) throw new Error(error.message || "Sign up failed");
    await loadUser();
  };

  const logout = async () => {
    try {
      await authClient.signOut();
    } catch {}
    localStorage.removeItem(SESSION_KEY);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, register, logout, setUser }}>
      {children}
    </AuthContext.Provider>
  );
}