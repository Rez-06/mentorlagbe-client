import Link from "next/link";
import { Search, BookOpen, Atom, BadgeCheck, Star, ArrowDown } from "lucide-react";
import Container from "@/components/ui/Container";

const stats = [
  ["2,400+", "Students"],
  ["350+", "Tutors"],
  ["4.9/5", "Avg. Rating"],
];

export default function Hero() {
  return (
    <section className="overflow-hidden pb-8 pt-12 sm:pt-16">
      <Container className="grid items-center gap-12 lg:grid-cols-2">
        {/* Text */}
        <div>
          <span className="inline-flex items-center gap-2 rounded-full bg-accent/30 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest">
            <BadgeCheck size={14} /> 100% Verified Tutors
          </span>

          <h1 className="mt-5 text-4xl font-semibold leading-tight tracking-tight sm:text-5xl lg:text-6xl">
            Find Your Ideal <span className="text-secondary">Tutor</span> or Mentorship
            Batch Today
          </h1>

          <p className="mt-5 max-w-xl leading-relaxed text-base-content/70">
            Search by subject, class level and budget. Learn online or at home with
            tutors who are reviewed and approved before they appear.
          </p>

          <form
            action="/tuitions"
            className="mt-8 flex max-w-xl items-center gap-2 rounded-full border border-base-300 bg-base-200 p-2 shadow-sm"
          >
            <Search size={18} className="ml-3 shrink-0 text-base-content/50" />
            <input
              name="search"
              placeholder="Try Math, Physics, IELTS..."
              className="w-full bg-transparent px-2 text-sm outline-none placeholder:text-base-content/40"
            />
            <button className="btn btn-primary rounded-full px-6">Search</button>
          </form>

          <div className="mt-10 flex flex-wrap gap-8">
            {stats.map(([num, label]) => (
              <div key={label}>
                <p className="text-2xl font-semibold">{num}</p>
                <p className="text-sm text-base-content/60">{label}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Visual */}
        <div className="relative mx-auto aspect-square w-full max-w-md lg:max-w-lg">
          <div className="absolute left-0 top-[18%] grid h-[52%] w-[52%] place-items-center rounded-full bg-accent text-accent-content shadow-xl">
            <Atom size={72} strokeWidth={1.4} />
          </div>
          <div className="absolute bottom-0 right-0 grid h-[72%] w-[72%] place-items-center rounded-full bg-secondary text-secondary-content shadow-2xl">
            <BookOpen size={120} strokeWidth={1.2} />
          </div>

          <svg
            viewBox="0 0 200 200"
            className="absolute inset-0 h-full w-full animate-spin-slow text-base-content"
          >
            <defs>
              <path
                id="circ"
                d="M100,100 m-82,0 a82,82 0 1,1 164,0 a82,82 0 1,1 -164,0"
              />
            </defs>
            <text fontSize="11" fontWeight="600" fill="currentColor">
              <textPath href="#circ" textLength="510" lengthAdjust="spacing">
                LEARN • GROW • MENTOR • LEARN • GROW • MENTOR •
              </textPath>
            </text>
          </svg>

          <div className="absolute left-[4%] top-[4%] flex animate-float items-center gap-2 rounded-full bg-base-100 px-4 py-2 text-sm font-medium shadow-lg ring-1 ring-base-300">
            <BadgeCheck size={16} className="text-success" /> Verified
          </div>
          <div className="absolute bottom-[6%] left-[2%] flex animate-float items-center gap-2 rounded-full bg-neutral px-4 py-2 text-sm font-medium text-neutral-content shadow-lg [animation-delay:2s]">
            <Star size={16} className="fill-accent text-accent" /> 4.9 Rated
          </div>
        </div>
      </Container>

      <div className="mt-6 hidden justify-center lg:flex">
        <Link
          href="#how-it-works"
          className="flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-base-content/50 hover:text-base-content"
        >
          Scroll down <ArrowDown size={14} />
        </Link>
      </div>
    </section>
  );
}