import { API_URL } from "./api";
import { getToken } from "./token";


export async function apiFetch(path, { method = "GET", body, headers = {}, auth = true } = {}) {
  const isForm = typeof FormData !== "undefined" && body instanceof FormData;
  const token = auth ? getToken() : null;

  const res = await fetch(`${API_URL}${path}`, {
    method,
    headers: {
      ...(body && !isForm ? { "Content-Type": "application/json" } : {}),
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...headers,
    },
    body: body ? (isForm ? body : JSON.stringify(body)) : undefined,
  });

  let data = null;
  try {
    data = await res.json();
  } catch {}

  if (!res.ok) {
    const err = new Error(data?.message || `Request failed (${res.status})`);
    err.status = res.status;
    throw err;
  }
  return data;
}