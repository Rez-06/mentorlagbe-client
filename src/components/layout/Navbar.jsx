"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";
import {
  PiLightbulbFilamentDuotone, PiBookOpenTextDuotone, PiCrownSimpleDuotone, PiCompassRoseDuotone,
  PiListBold, PiXBold, PiCaretDownBold, PiSquaresFourDuotone, PiIdentificationCardDuotone, PiSignOutBold,
} from "react-icons/pi";
import Logo from "@/components/ui/Logo";
import Container from "@/components/ui/Container";
import UserAvatar from "@/components/ui/UserAvatar";
import RoleBadge from "@/components/ui/RoleBadge";
import ThemeToggle from "@/components/ui/ThemeToggle";
import { useAuth } from "@/components/providers/AuthProvider";

const links = [
  { href: "/", label: "Home", icon: PiLightbulbFilamentDuotone },
  { href: "/tuitions", label: "Browse Tuitions", icon: PiBookOpenTextDuotone },
  { href: "/pricing", label: "Pricing", icon: PiCrownSimpleDuotone },
  { href: "/#how-it-works", label: "How It Works", icon: PiCompassRoseDuotone },
];

// Scrolls to a section; keeps retrying for a moment because the home page
// may still be loading when we arrive from another route.
function scrollToId(id, tries = 0) {
  const el = document.getElementById(id);
  if (el) {
    el.scrollIntoView({ behavior: tries === 0 ? "smooth" : "auto", block: "start" });
    return;
  }
  if (tries < 40) setTimeout(() => scrollToId(id, tries + 1), 100);
}

export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const { user, loading, logout } = useAuth();
  const headerRef = useRef(null);
  const menuRef = useRef(null);
  const [open, setOpen] = useState(false);
  const [menu, setMenu] = useState(false);
  const [lamp, setLamp] = useState(null);

  const isActive = (href) => !href.includes("#") && pathname === href;

  const settle = useCallback(() => {
    const root = headerRef.current;
    if (!root) return;
    const el = root.querySelector("[data-active='true']") || root.querySelector("[data-nav-link]");
    const r = el?.getBoundingClientRect();
    if (r && r.width > 0) setLamp(r.left + r.width / 2);
    else setLamp(window.innerWidth / 2);
  }, []);

  useEffect(() => {
    settle();
    window.addEventListener("resize", settle);
    return () => window.removeEventListener("resize", settle);
  }, [pathname, settle]);

  useEffect(() => {
    const close = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) setMenu(false);
    };
    document.addEventListener("mousedown", close);
    return () => document.removeEventListener("mousedown", close);
  }, []);

  // Open the page's #hash section on first load / after navigating home
  useEffect(() => {
    if (pathname === "/" && window.location.hash) scrollToId(window.location.hash.slice(1));
  }, [pathname]);

  // "/#section" links: scroll directly when already on the home page,
  // otherwise go home first and scroll once the section exists
  const handleSectionLink = (e, href) => {
    if (!href.startsWith("/#")) return false;
    e.preventDefault();
    const id = href.slice(2);
    setOpen(false);
    if (pathname === "/") {
      scrollToId(id);
      window.history.replaceState(null, "", href);
    } else {
      router.push(href, { scroll: false });
      setTimeout(() => scrollToId(id, 1), 150);
    }
    return true;
  };

  const moveLampTo = (e) => {
    const r = e.currentTarget.getBoundingClientRect();
    setLamp(r.left + r.width / 2);
  };

  const handleLogout = async () => {
    await logout();
    setMenu(false);
    setOpen(false);
    toast.success("Signed out successfully");
    router.push("/");
  };

  const lampStyle = { left: lamp ?? "50%", opacity: lamp === null ? 0 : 1 };

  return (
    <header ref={headerRef} className="sticky top-0 z-50 [overflow-x:clip]">
      <nav className="nav-surface text-white">
        <Container className="flex items-center justify-between py-3.5">
          <Logo />

          <ul onMouseLeave={settle} className="hidden items-center gap-2 lg:flex">
            {links.map(({ href, label, icon: Icon }) => {
              const active = isActive(href);
              return (
                <li key={href}>
                  <Link
                    href={href}
                    data-nav-link
                    data-active={active}
                    onMouseEnter={moveLampTo}
                    onClick={(e) => handleSectionLink(e, href)}
                    className="group flex items-center gap-2.5 rounded-xl px-5 py-2.5 text-[15px] font-medium"
                  >
                    <Icon className={`h-[22px] w-[22px] transition ${active ? "text-accent" : "text-white/45 group-hover:text-accent"}`} />
                    <span className={active ? "text-white" : "text-white/85"}>{label}</span>
                  </Link>
                </li>
              );
            })}
          </ul>

          {/* Right side (desktop) */}
          <div className="hidden items-center gap-2 lg:flex">
            <ThemeToggle className="text-white/70 hover:bg-white/10 hover:text-white" />
            {loading ? (
              <span className="h-10 w-44 animate-pulse rounded-xl bg-white/10" />
            ) : user ? (
              <div ref={menuRef} className="relative">
                <button onClick={() => setMenu(!menu)} className="flex items-center gap-3 rounded-xl px-2 py-1.5 transition hover:bg-white/5">
                  <UserAvatar user={user} />
                  <span className="text-left leading-tight">
                    <span className="block max-w-[9rem] truncate text-sm font-medium">{user.name}</span>
                    <RoleBadge role={user.role} />
                  </span>
                  <PiCaretDownBold className="text-white/50" />
                </button>
                {menu && (
                  <div className="absolute right-0 top-full mt-3 w-60 rounded-2xl bg-neutral p-2 text-sm shadow-2xl ring-1 ring-white/10">
                    <Link href="/dashboard" onClick={() => setMenu(false)} className="flex items-center gap-3 rounded-xl px-3 py-2.5 hover:bg-white/5">
                      <PiSquaresFourDuotone className="h-5 w-5 text-accent" /> Dashboard
                    </Link>
                    <Link href="/dashboard/profile" onClick={() => setMenu(false)} className="flex items-center gap-3 rounded-xl px-3 py-2.5 hover:bg-white/5">
                      <PiIdentificationCardDuotone className="h-5 w-5 text-accent" /> Update Profile
                    </Link>
                    <button onClick={handleLogout} className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left hover:bg-white/5">
                      <PiSignOutBold className="h-5 w-5 text-accent" /> Sign Out
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <>
                <Link href="/sign-in" className="rounded-xl px-5 py-2.5 text-[15px] font-medium text-white/85 transition hover:text-white">
                  Sign In
                </Link>
                <Link href="/sign-up" className="rounded-xl bg-accent px-5 py-2.5 text-[15px] font-semibold text-accent-content transition hover:brightness-105">
                  Sign Up
                </Link>
              </>
            )}
          </div>

          {/* Right side (mobile) */}
          <div className="flex items-center gap-1 lg:hidden">
            <ThemeToggle className="text-white/70 hover:bg-white/10" />
            <button onClick={() => setOpen(!open)} className="grid h-10 w-10 place-items-center rounded-xl hover:bg-white/10" aria-label="Toggle menu">
              {open ? <PiXBold size={22} /> : <PiListBold size={22} />}
            </button>
          </div>
        </Container>

        {open && (
          <Container className="relative z-10 pb-4 lg:hidden">
            <div className="space-y-1 border-t border-white/10 pt-3">
              {user && (
                <div className="mb-2 flex items-center gap-3 rounded-xl bg-white/5 p-3">
                  <UserAvatar user={user} />
                  <div>
                    <p className="text-sm font-medium">{user.name}</p>
                    <RoleBadge role={user.role} />
                  </div>
                </div>
              )}
              {links.map(({ href, label, icon: Icon }) => (
                <Link key={href} href={href} onClick={(e) => { if (!handleSectionLink(e, href)) setOpen(false); }} className="flex items-center gap-3 rounded-xl px-4 py-3 text-[15px] font-medium hover:bg-white/5">
                  <Icon className="h-[22px] w-[22px] text-white/45" /> {label}
                </Link>
              ))}
              {user ? (
                <>
                  <Link href="/dashboard" onClick={() => setOpen(false)} className="flex items-center gap-3 rounded-xl px-4 py-3 text-[15px] font-medium hover:bg-white/5">
                    <PiSquaresFourDuotone className="h-[22px] w-[22px] text-white/45" /> Dashboard
                  </Link>
                  <Link href="/dashboard/profile" onClick={() => setOpen(false)} className="flex items-center gap-3 rounded-xl px-4 py-3 text-[15px] font-medium hover:bg-white/5">
                    <PiIdentificationCardDuotone className="h-[22px] w-[22px] text-white/45" /> Update Profile
                  </Link>
                  <button onClick={handleLogout} className="mt-2 w-full rounded-xl bg-accent py-2.5 text-sm font-semibold text-accent-content">
                    Sign Out
                  </button>
                </>
              ) : (
                <div className="grid grid-cols-2 gap-2 pt-2">
                  <Link href="/sign-in" onClick={() => setOpen(false)} className="rounded-xl border border-white/15 py-2.5 text-center text-sm font-medium">Sign In</Link>
                  <Link href="/sign-up" onClick={() => setOpen(false)} className="rounded-xl bg-accent py-2.5 text-center text-sm font-semibold text-accent-content">Sign Up</Link>
                </div>
              )}
            </div>
          </Container>
        )}

        <span aria-hidden="true" className="lamp-bar" style={lampStyle} />
      </nav>
      <div aria-hidden="true" className="lamp" style={lampStyle} />
    </header>
  );
}