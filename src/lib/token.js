export const JWT_KEY = "ml_jwt";

export const getToken = () => (typeof window === "undefined" ? null : localStorage.getItem(JWT_KEY));
export const setToken = (t) => localStorage.setItem(JWT_KEY, t);
export const clearToken = () => localStorage.removeItem(JWT_KEY);