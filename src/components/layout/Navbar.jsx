"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { WandSparkles, Box, ShieldCheck, Compass, Menu, X } from "lucide-react";
import Logo from "@/components/ui/Logo";

const links = [
  { href: "/", label: "Home", icon: WandSparkles },
  { href: "/tuitions", label: "Browse Tuitions", icon: Box },
  { href: "/pricing", label: "Pricing", icon: ShieldCheck },
  { href: "/#how-it-works", label: "How It Works", icon: Compass },
];

export default function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  const isActive = (href) => !href.includes("#") && pathname === href;

  return (
    <header className="sticky top-0 z-50 px-3 pt-4 sm:px-6">
      <nav className="nav-surface mx-auto max-w-7xl rounded-[1.25rem] px-4 py-3 text-white sm:px-6">
        <div className="relative z-10 flex items-center justify-between gap-6">
          <Logo />

          {/* Desktop links */}
          <ul className="hidden items-center gap-2 lg:flex">
            {links.map(({ href, label, icon: Icon }) => {
              const active = isActive(href);
              return (
                <li key={href}>
                  <Link
                    href={href}
                    className="group flex items-center gap-2.5 rounded-xl px-5 py-2.5 text-[15px] font-medium transition hover:bg-white/5"
                  >
                    <Icon
                      size={20}
                      strokeWidth={1.8}
                      className={`transition ${
                        active ? "text-accent" : "text-white/45 group-hover:text-white/80"
                      }`}
                    />
                    <span className={active ? "text-white" : "text-white/90"}>{label}</span>
                  </Link>
                </li>
              );
            })}
          </ul>

          {/* Right side: auth buttons (swapped for avatar menu in Push 7) */}
          <div className="hidden items-center gap-2 lg:flex">
            <Link
              href="/sign-in"
              className="rounded-xl px-5 py-2.5 text-[15px] font-medium text-white/90 transition hover:bg-white/5"
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
            {open ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>

        {/* Mobile menu */}
        {open && (
          <div className="relative z-10 mt-3 space-y-1 border-t border-white/10 pt-3 lg:hidden">
            {links.map(({ href, label, icon: Icon }) => (
              <Link
                key={href}
                href={href}
                onClick={() => setOpen(false)}
                className="flex items-center gap-3 rounded-xl px-4 py-3 text-[15px] font-medium hover:bg-white/5"
              >
                <Icon size={20} strokeWidth={1.8} className="text-white/45" />
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
        )}
      </nav>
    </header>
  );
}