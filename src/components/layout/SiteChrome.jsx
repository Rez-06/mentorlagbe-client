"use client";

import { usePathname } from "next/navigation";
import Navbar from "./Navbar";
import Footer from "./Footer";

export default function SiteChrome({ children }) {
  const inDashboard = usePathname().startsWith("/dashboard");
  return (
    <>
      {!inDashboard && <Navbar />}
      <main className={inDashboard ? "" : "min-h-[70vh]"}>{children}</main>
      {!inDashboard && <Footer />}
    </>
  );
}