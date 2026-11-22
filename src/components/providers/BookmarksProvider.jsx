"use client";

import { createContext, useContext, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useAuth } from "./AuthProvider";
import { apiFetch } from "@/lib/apiFetch";

const Ctx = createContext({ ids: [], enabled: false, loaded: false, limit: null, toggle: () => {} });
export const useBookmarks = () => useContext(Ctx);

export default function BookmarksProvider({ children }) {
  const { user } = useAuth();
  const [ids, setIds] = useState([]);
  const [limit, setLimit] = useState(null);
  const [loaded, setLoaded] = useState(false);
  const enabled = user?.role === "student";

  useEffect(() => {
    if (!enabled) {
      setIds([]);
      setLoaded(false);
      return;
    }
    apiFetch("/api/bookmarks/ids")
      .then((r) => {
        setIds(r.ids);
        setLimit(r.limit);
        setLoaded(true);
      })
      .catch(() => {});
  }, [enabled, user?.plan]);

  const toggle = async (id) => {
    const saved = ids.includes(id);
    try {
      const r = await apiFetch(`/api/bookmarks/${id}`, { method: saved ? "DELETE" : "POST" });
      setIds(r.ids);
      toast.success(saved ? "Removed from saved" : "Saved for later");
    } catch (err) {
      toast.error(err.message);
    }
  };

  return <Ctx.Provider value={{ ids, enabled, loaded, limit, toggle }}>{children}</Ctx.Provider>;
}