"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";
import {
  PiLightbulbFilamentDuotone,
  PiBookOpenTextDuotone,
  PiCrownSimpleDuotone,
  PiCompassRoseDuotone,
  PiListBold,
  PiXBold,
} from "react-icons/pi";
import Logo from "@/components/ui/Logo";
import Container from "@/components/ui/Container";

const links = [
  { href: "/", label: "Home", icon: PiLightbulbFilamentDuotone },
  { href: "/tuitions", label: "Browse Tuitions", icon: PiBookOpenTextDuotone },
  { href: "/pricing", label: "Pricing", icon: PiCrownSimpleDuotone },
  { href: "/#how-it-works", label: "How It Works", icon: PiCompassRoseDuotone },
];

export default function Navbar() {
  const pathname = usePathname();
  const headerRef = useRef(null);
  const [open, setOpen] = useState(false);
  const [lamp, setLamp] = useState(null); // x position (px) of the lamp

  const isActive = (href) => !href.includes("#") && pathname === href;

  // Move the lamp under the active link (or the first link if none is active)
  const settle = useCallback(() => {
    const root = headerRef.current;
    if (!root) return;
    const el =
      root.querySelector("[data-active='true']") ||
      root.querySelector("[data-nav-link]");
    const r = el?.getBoundingClientRect();
    if (r && r.width > 0) setLamp(r.left + r.width / 2);
    else setLamp(window.innerWidth / 2); // mobile: links are hidden
  }, []);

  useEffect(() => {
    settle();
    window.addEventListener("resize", settle);
    return () => window.removeEventListener("resize", settle);
  }, [pathname, settle]);

  const moveLampTo = (e) => {
    const r = e.currentTarget.getBoundingClientRect();
    setLamp(r.left + r.width / 2);
  };

  const lampStyle = { left: lamp ?? "50%", opacity: lamp === null ? 0 : 1 };

  return (
    <header ref={headerRef} className="sticky top-0 z-50 [overflow-x:clip]">
      <nav className="nav-surface text-white">
        <Container className="flex items-center justify-between py-3.5">
          <Logo />

          {/* Desktop links */}
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
                    className="group flex items-center gap-2.5 rounded-xl px-5 py-2.5 text-[15px] font-medium"
                  >
                    <Icon
                      className={`h-[22px] w-[22px] transition ${
                        active ? "text-accent" : "text-white/45 group-hover:text-accent"
                      }`}
                    />
                    <span className={active ? "text-white" : "text-white/85"}>{label}</span>
                  </Link>
                </li>
              );
            })}
          </ul>

          {/* Right side: auth buttons (swapped for avatar menu in Push 7) */}
          <div className="hidden items-center gap-2 lg:flex">
            <Link
              href="/sign-in"
              className="rounded-xl px-5 py-2.5 text-[15px] font-medium text-white/85 transition hover:text-white"
            >
              Sign In
            </Link>
            <Link
              href="/sign-up"
              className="rounded-xl bg-accent px-5 py-2.5 text-[15px] font-semibold text-accent-content transition hover:brightness-105"
            >
              Sign Up
            </Link>
          </div>

          <button
            onClick={() => setOpen(!open)}
            className="grid h-10 w-10 place-items-center rounded-xl hover:bg-white/10 lg:hidden"
            aria-label="Toggle menu"
          >
            {open ? <PiXBold size={22} /> : <PiListBold size={22} />}
          </button>
        </Container>

        {/* Mobile menu */}
        {open && (
          <Container className="relative z-10 pb-4 lg:hidden">
            <div className="space-y-1 border-t border-white/10 pt-3">
              {links.map(({ href, label, icon: Icon }) => (
                <Link
                  key={href}
                  href={href}
                  onClick={() => setOpen(false)}
                  className="flex items-center gap-3 rounded-xl px-4 py-3 text-[15px] font-medium hover:bg-white/5"
                >
                  <Icon className="h-[22px] w-[22px] text-white/45" />
                  {label}
                </Link>
              ))}
              <div className="grid grid-cols-2 gap-2 pt-2">
                <Link
                  href="/sign-in"
                  onClick={() => setOpen(false)}
                  className="rounded-xl border border-white/15 py-2.5 text-center text-sm font-medium"
                >
                  Sign In
                </Link>
                <Link
                  href="/sign-up"
                  onClick={() => setOpen(false)}
                  className="rounded-xl bg-accent py-2.5 text-center text-sm font-semibold text-accent-content"
                >
                  Sign Up
                </Link>
              </div>
            </div>
          </Container>
        )}

        {/* The lamp: bright edge on the bar */}
        <span aria-hidden="true" className="lamp-bar" style={lampStyle} />
      </nav>

      {/* The lamp: light falling onto the page */}
      <div aria-hidden="true" className="lamp" style={lampStyle} />
    </header>
  );
}