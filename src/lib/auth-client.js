import { createAuthClient } from "better-auth/react";
import { API_URL } from "./api";

export const SESSION_KEY = "ml_session_token";

export const authClient = createAuthClient({
  baseURL: API_URL,
  fetchOptions: {
    auth: {
      type: "Bearer",
      token: () => (typeof window !== "undefined" ? localStorage.getItem(SESSION_KEY) || "" : ""),
    },
  },
});