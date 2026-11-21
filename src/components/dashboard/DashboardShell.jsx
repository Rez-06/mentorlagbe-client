"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";
import { PiSidebarSimpleBold, PiSignOutBold, PiHouseLineDuotone, PiListBold, PiXBold } from "react-icons/pi";
import Logo from "@/components/ui/Logo";
import UserAvatar from "@/components/ui/UserAvatar";
import RoleBadge from "@/components/ui/RoleBadge";
import { useAuth } from "@/components/providers/AuthProvider";
import { dashboardNav } from "@/lib/dashboardNav";

export default function DashboardShell({ children }) {
  const { user, logout } = useAuth();
  const pathname = usePathname();
  const router = useRouter();
  const [collapsed, setCollapsed] = useState(false);
  const [mobile, setMobile] = useState(false);

  const items = dashboardNav[user.role] || [];
  const isActive = (href) => (href.split("/").length <= 3 ? pathname === href : pathname.startsWith(href));
  const current = items.find((i) => isActive(i.href));
  const hide = collapsed ? "lg:hidden" : "";

  const handleLogout = async () => {
    await logout();
    toast.success("Signed out successfully");
    router.push("/");
  };

  return (
    <div className="min-h-screen bg-base-100 lg:flex">
      {mobile && <div className="fixed inset-0 z-40 bg-black/50 lg:hidden" onClick={() => setMobile(false)} />}

      {/* Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 flex w-72 flex-col bg-neutral text-neutral-content transition-all duration-300 lg:sticky lg:top-0 lg:h-screen lg:translate-x-0 ${
          mobile ? "translate-x-0" : "-translate-x-full"
        } ${collapsed ? "lg:w-[84px]" : "lg:w-72"}`}
      >
        <div className="flex h-[72px] items-center justify-between border-b border-white/10 px-5">
          <span className={hide}><Logo /></span>
          {collapsed && (
            <span className="logo-script hidden text-3xl font-bold lg:block"><span className="l-a">M</span></span>
          )}
          <button onClick={() => setMobile(false)} className="lg:hidden" aria-label="Close menu"><PiXBold size={22} /></button>
        </div>

        <nav className="flex-1 space-y-1 overflow-y-auto p-3">
          {items.map(({ label, href, icon: Icon, soon }) =>
            soon ? (
              <div key={href} title="Coming soon" className="flex cursor-not-allowed items-center gap-3 rounded-xl px-3 py-3 text-sm text-white/35">
                <Icon className="h-6 w-6 shrink-0" />
                <span className={`flex-1 ${hide}`}>{label}</span>
                <span className={`rounded bg-white/10 px-1.5 py-0.5 font-mono text-[9px] uppercase ${hide}`}>Soon</span>
              </div>
            ) : (
              <Link
                key={href}
                href={href}
                onClick={() => setMobile(false)}
                className={`flex items-center gap-3 rounded-xl px-3 py-3 text-sm font-medium transition ${
                  isActive(href) ? "bg-white/10 text-white" : "text-white/70 hover:bg-white/5 hover:text-white"
                }`}
              >
                <Icon className={`h-6 w-6 shrink-0 ${isActive(href) ? "text-accent" : "text-white/45"}`} />
                <span className={hide}>{label}</span>
              </Link>
            )
          )}
        </nav>

        <div className="space-y-1 border-t border-white/10 p-3">
          <Link href="/" className="flex items-center gap-3 rounded-xl px-3 py-3 text-sm text-white/70 hover:bg-white/5 hover:text-white">
            <PiHouseLineDuotone className="h-6 w-6 shrink-0 text-white/45" />
            <span className={hide}>Back to site</span>
          </Link>
          <button onClick={handleLogout} className="flex w-full items-center gap-3 rounded-xl px-3 py-3 text-sm text-white/70 hover:bg-white/5 hover:text-white">
            <PiSignOutBold className="h-6 w-6 shrink-0 text-white/45" />
            <span className={hide}>Sign Out</span>
          </button>
        </div>
      </aside>

      {/* Main */}
      <div className="min-w-0 flex-1">
        <header className="sticky top-0 z-30 flex h-[72px] items-center justify-between border-b border-base-content/10 bg-base-100/90 px-4 backdrop-blur sm:px-6">
          <div className="flex items-center gap-3">
            <button onClick={() => setMobile(true)} className="grid h-10 w-10 place-items-center rounded-xl border border-base-content/15 lg:hidden" aria-label="Open menu">
              <PiListBold size={20} />
            </button>
            <button onClick={() => setCollapsed(!collapsed)} className="hidden h-10 w-10 place-items-center rounded-xl border border-base-content/15 hover:bg-base-200 lg:grid" aria-label="Collapse sidebar">
              <PiSidebarSimpleBold size={20} />
            </button>
            <p className="font-semibold">{current?.label || "Dashboard"}</p>
          </div>

          <div className="flex items-center gap-3">
            <span className="hidden rounded-md border border-base-content/20 px-2 py-1 font-mono text-[10px] font-bold uppercase tracking-wider sm:inline-block">
              {user.plan} plan
            </span>
            <div className="hidden text-right leading-tight sm:block">
              <p className="max-w-[10rem] truncate text-sm font-medium">{user.name}</p>
              <RoleBadge role={user.role} />
            </div>
            <UserAvatar user={user} />
          </div>
        </header>

        <main className="p-4 sm:p-6 lg:p-8">{children}</main>
      </div>
    </div>
  );
}