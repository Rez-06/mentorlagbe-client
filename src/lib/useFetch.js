"use client";

import { useCallback, useEffect, useState } from "react";
import { apiFetch } from "./apiFetch";

export function useFetch(path) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const load = useCallback(
    async (silent = false) => {
      if (!silent) setLoading(true);
      setError("");
      try {
        setData(await apiFetch(path));
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    },
    [path]
  );

  useEffect(() => {
    load();
  }, [load]);

  return { data, loading, error, reload: () => load(true), setData };
}