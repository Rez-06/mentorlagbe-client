import Link from "next/link";
import {
  PiArrowUpRightBold,
  PiArrowDownBold,
  PiLightbulbFilamentDuotone,
  PiAtomDuotone,
  PiSealCheckDuotone,
} from "react-icons/pi";
import Container from "@/components/ui/Container";
import HeroStage from "./HeroStage";

const avatars = [
  { letter: "A", cls: "bg-accent text-accent-content" },
  { letter: "S", cls: "bg-secondary text-secondary-content" },
  { letter: "T", cls: "bg-base-100 text-base-content" },
];

export default function Hero() {
  return (
    <section className="relative overflow-hidden pb-6 pt-8 lg:pt-10">
      <Container>
        <h1 className="sr-only">Find Your Ideal Tutor or Mentorship Batch Today</h1>

        {/* ---------- Main stage ---------- */}
        <div className="grid items-stretch gap-6 lg:grid-cols-[1fr_14rem]">
          <HeroStage className="h-auto w-full" />

          <aside className="flex flex-col justify-between gap-8 lg:py-6">
            <div>
              <p className="font-semibold">Ready to learn?</p>
              <p className="mt-2 text-sm leading-relaxed text-base-content/70">
                Find your ideal tutor or mentorship batch today. Compare verified
                mentors by subject, class level and budget.
              </p>
              <Link href="/tuitions" className="btn btn-primary mt-5 gap-2">
                Find a tutor <PiArrowUpRightBold />
              </Link>
              <Link
                href="/sign-up"
                className="mt-4 block text-sm font-medium underline underline-offset-4 transition hover:text-secondary"
              >
                Or become a tutor
              </Link>
            </div>

            <PiLightbulbFilamentDuotone className="hidden h-12 w-12 animate-float text-accent lg:block" />

            <Link
              href="#how-it-works"
              className="hidden flex-col items-center gap-3 self-end text-xs font-semibold uppercase tracking-[0.2em] lg:flex"
            >
              <span className="[writing-mode:vertical-rl]">Scroll down</span>
              <span className="grid h-10 w-10 place-items-center rounded-full border border-base-content/30 transition hover:bg-base-content hover:text-base-100">
                <PiArrowDownBold />
              </span>
            </Link>
          </aside>
        </div>

        {/* ---------- Bottom info row ---------- */}
        <div className="mt-10 grid items-center gap-8 border-t border-base-content/15 pt-8 sm:grid-cols-2 lg:grid-cols-4">
          {/* 1. Top subjects */}
          <Link href="/tuitions" className="group flex items-center gap-4">
            <span className="relative grid h-24 w-24 shrink-0 place-items-center rounded-full bg-neutral text-accent">
              <PiAtomDuotone className="h-12 w-12" />
              <span className="absolute -bottom-1 -right-1 grid h-8 w-8 place-items-center rounded-full bg-accent text-accent-content ring-4 ring-base-100 transition group-hover:rotate-45">
                <PiArrowUpRightBold size={14} />
              </span>
            </span>
            <span className="text-lg font-semibold leading-snug">
              Top subjects
              <br />
              this month
            </span>
          </Link>

          {/* 2. Rotating badge */}
          <Link
            href="/tuitions"
            aria-label="Browse tuitions"
            className="relative mx-auto grid h-28 w-28 place-items-center"
          >
            <svg
              viewBox="0 0 120 120"
              className="absolute inset-0 h-full w-full animate-spin-medium"
              aria-hidden="true"
            >
              <defs>
                <path id="badge-ring" d="M60,60 m-44,0 a44,44 0 1,1 88,0 a44,44 0 1,1 -88,0" />
              </defs>
              <text
                fontSize="9.5"
                fontWeight="700"
                letterSpacing="1.5"
                style={{ fontFamily: "var(--font-space-mono), monospace", fill: "currentColor" }}
              >
                <textPath href="#badge-ring" textLength="270" lengthAdjust="spacing">
                  BROWSE TUITIONS • BROWSE TUITIONS •
                </textPath>
              </text>
            </svg>
            <span className="grid h-12 w-12 place-items-center rounded-full border border-base-content/40">
              <PiArrowUpRightBold size={18} />
            </span>
          </Link>

          {/* 3. Verified tutors */}
          <div>
            <p className="flex items-center gap-2 text-lg font-semibold">
              <PiSealCheckDuotone className="h-6 w-6 text-secondary" /> Verified tutors
            </p>
            <span className="my-2 block h-[2px] w-8 bg-base-content" />
            <p className="max-w-[16rem] text-sm leading-relaxed text-base-content/70">
              Every batch is reviewed by an admin before it goes live, so you only see approved tutors.
            </p>
          </div>

          {/* 4. Learner capsule */}
          <div className="flex h-24 w-full max-w-[19rem] items-center gap-4 rounded-full bg-neutral px-5 text-neutral-content lg:justify-self-end">
            <div className="flex -space-x-3">
              {avatars.map((a) => (
                <span
                  key={a.letter}
                  className={`grid h-11 w-11 place-items-center rounded-full text-sm font-bold ring-2 ring-neutral ${a.cls}`}
                >
                  {a.letter}
                </span>
              ))}
            </div>
            <div>
              <p className="text-xl font-semibold leading-none">2,400+</p>
              <p className="mt-1 text-xs text-neutral-content/70">learners onboard</p>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}