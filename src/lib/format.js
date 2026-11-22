export const formatDate = (d) =>
  d ? new Date(d).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" }) : "-";

export const formatTaka = (n) => `৳${Number(n || 0).toLocaleString("en-US")}`;