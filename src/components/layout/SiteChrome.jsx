"use client";

import { Suspense } from "react";
import { usePathname } from "next/navigation";
import Navbar from "./Navbar";
import Footer from "./Footer";

function Chrome({ children }) {
  const inDashboard = usePathname().startsWith("/dashboard");
  return (
    <>
      {!inDashboard && <Navbar />}
      <main className={inDashboard ? "" : "min-h-[70vh]"}>{children}</main>
      {!inDashboard && <Footer />}
    </>
  );
}

export default function SiteChrome({ children }) {
  return (
    <Suspense fallback={<main className="min-h-[70vh]">{children}</main>}>
      <Chrome>{children}</Chrome>
    </Suspense>
  );
}