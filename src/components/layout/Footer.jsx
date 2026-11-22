import Link from "next/link";
import { FaXTwitter, FaFacebookF, FaLinkedinIn, FaInstagram } from "react-icons/fa6";
import NewsletterForm from "./NewsletterForm";

const company = [
  { href: "/", label: "Home" },
  { href: "/tuitions", label: "Browse Tuitions" },
  { href: "/pricing", label: "Pricing" },
];

const platform = [
  { href: "/sign-up", label: "For Students" },
  { href: "/sign-up", label: "For Tutors" },
  { href: "/pricing", label: "Pro Plans" },
];

const resources = [
  { href: "/#how-it-works", label: "How It Works" },
  { href: "/sign-in", label: "Sign In" },
  { href: "/sign-up", label: "Create Account" },
];

const socials = [
  { icon: FaXTwitter, label: "X", href: "https://x.com" },
  { icon: FaFacebookF, label: "Facebook", href: "https://facebook.com" },
  { icon: FaLinkedinIn, label: "LinkedIn", href: "https://linkedin.com" },
  { icon: FaInstagram, label: "Instagram", href: "https://instagram.com" },
];

const cell = "border-b border-r border-base-content/25";
const label =
  "mb-5 font-mono text-[11px] uppercase tracking-[0.12em] text-base-content/55";
const linkCls = "block text-[15px] transition hover:text-secondary";

function LinkColumn({ title, items }) {
  return (
    <div className={`${cell} p-5`}>
      <p className={label}>{title}</p>
      <ul className="space-y-3">
        {items.map((l) => (
          <li key={l.label}>
            <Link href={l.href} className={linkCls}>
              {l.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function Footer() {
  return (
    <footer className="paper-grain mt-24 border-t border-base-content/25 bg-base-200/50">
      <div className="relative">
        {/* ---------- Grid of cells ---------- */}
        <div className="grid border-l border-base-content/25 sm:grid-cols-2 lg:grid-cols-5">
          {/* Tagline */}
          <div className={`${cell} p-5 sm:col-span-2 lg:col-span-1`}>
            <h2 className="text-2xl font-semibold uppercase leading-[1.05] tracking-tight">
              Find the right mentor. Learn without limits.
            </h2>
          </div>

          <LinkColumn title="Company" items={company} />
          <LinkColumn title="Platform" items={platform} />
          <LinkColumn title="Resources" items={resources} />

          {/* Emblem: mortarboard on an open book (spans 2 rows on desktop) */}
          <div className={`${cell} hidden place-items-center p-8 lg:grid lg:row-span-2`}>
            <svg
              viewBox="0 0 140 140"
              className="h-40 w-40 text-base-content"
              fill="none"
              stroke="currentColor"
              strokeWidth="3.5"
              strokeLinejoin="round"
              strokeLinecap="round"
              aria-hidden="true"
            >
              <path d="M36 53 V78 C36 91 104 91 104 78 V53" />
              <path d="M70 14 L128 40 L70 66 L12 40 Z" />
              <path d="M128 40 V86" />
              <circle cx="128" cy="93" r="6" />
              <path d="M14 108 C34 100 56 102 70 112 C84 102 106 100 126 108 V128 C106 120 84 122 70 132 C56 122 34 120 14 128 Z" />
              <path d="M70 112 V132" />
              <path
                d="M0-12C1-4 4-1 12 0 4 1 1 4 0 12-1 4-4 1-12 0-4-1-1-4 0-12Z"
                transform="translate(16 72) scale(.9)"
                fill="#F6B22B"
                stroke="none"
              />
              <path
                d="M0-12C1-4 4-1 12 0 4 1 1 4 0 12-1 4-4 1-12 0-4-1-1-4 0-12Z"
                transform="translate(112 10) scale(.7)"
                fill="#2B55D6"
                stroke="none"
              />
            </svg>
          </div>

          {/* Subscribe */}
          <div className={`${cell} flex flex-col justify-between sm:col-span-2 lg:col-span-1`}>
            <div className="p-5">
              <p className={label}>Subscribe</p>
              <p className="text-[15px] leading-relaxed text-base-content/70">
                Want tuition tips and new tutor alerts? Sign up for occasional updates from MentorLagbe.
              </p>
            </div>
            <NewsletterForm />
          </div>

          {/* Address */}
          <div className={`${cell} flex flex-col justify-between p-5`}>
            <div>
              <p className={label}>Address</p>
              <p className="text-[15px] leading-relaxed">
                House 12, Road 5, Dhanmondi, Dhaka 1209, Bangladesh
              </p>
            </div>
            <a
              href="https://maps.google.com/?q=Dhanmondi+Dhaka"
              target="_blank"
              rel="noreferrer"
              className="mt-6 text-[15px] underline-offset-4 transition hover:text-secondary hover:underline"
            >
              Direction
            </a>
          </div>

          {/* Contact */}
          <div className={`${cell} p-0`}>
            <div className="border-b border-base-content/25 p-5">
              <p className={label}>New Tutors</p>
              <a href="mailto:tutors@mentorlagbe.com" className={linkCls}>
                tutors@mentorlagbe.com
              </a>
            </div>
            <div className="p-5">
              <p className={label}>General Inquiries</p>
              <a href="mailto:hello@mentorlagbe.com" className={linkCls}>
                hello@mentorlagbe.com
              </a>
              <a href="tel:+8801700000000" className={`${linkCls} mt-2`}>
                +880 1700-000000
              </a>
            </div>
          </div>

          {/* Social */}
          <div className={`${cell} p-5`}>
            <p className={label}>Social</p>
            <ul className="grid grid-cols-2 gap-x-4 gap-y-3">
              {socials.map(({ icon: Icon, label: name, href }) => (
                <li key={name}>
                  <a
                    href={href}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center gap-2 text-[15px] transition hover:text-secondary"
                  >
                    <Icon size={14} /> {name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* ---------- Big outlined wordmark ---------- */}
        <div className="relative border-b border-t border-base-content/25 px-6 py-10 sm:px-10">
          <span className="absolute left-2 top-1 font-mono text-sm">+</span>
          <span className="absolute right-2 top-1 font-mono text-sm">+</span>
          <span className="absolute bottom-1 left-2 font-mono text-sm">+</span>
          <span className="absolute bottom-1 right-2 font-mono text-sm">+</span>
          <div className="ticks absolute inset-x-8 top-1.5 h-1.5 text-base-content/30" />
          <div className="ticks absolute inset-x-8 bottom-1.5 h-1.5 text-base-content/30" />

          <svg
            viewBox="0 0 1200 190"
            className="mx-auto w-full text-base-content"
            role="img"
            aria-label="MentorLagbe"
          >
            <text
              x="10"
              y="160"
              textLength="1180"
              lengthAdjust="spacingAndGlyphs"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.6"
              fontSize="190"
              fontWeight="700"
              style={{ fontFamily: "var(--font-poppins), sans-serif" }}
            >
              MENTORLAGBE
            </text>
          </svg>
        </div>

        {/* ---------- Bottom bar ---------- */}
        <div className="flex flex-col border-l border-base-content/25 sm:flex-row">
          <p className="flex-1 border-r border-base-content/25 px-5 py-4 font-mono text-[11px] uppercase tracking-[0.1em] text-base-content/70">
            © 2026 MentorLagbe. All rights reserved.
          </p>
          <div className="flex border-t border-base-content/25 text-sm sm:border-t-0">
            {["Privacy Policy", "Terms & Conditions", "Cookie Policy"].map((t) => (
              <Link
                key={t}
                href="#"
                className="border-r border-base-content/25 px-5 py-4 transition hover:bg-accent hover:text-accent-content"
              >
                {t}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}