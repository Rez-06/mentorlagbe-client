import Link from "next/link";
import { PiCaretLeftBold, PiCaretRightBold } from "react-icons/pi";

function pageList(page, pages) {
  const set = new Set([1, pages, page - 1, page, page + 1]);
  const nums = [...set].filter((n) => n >= 1 && n <= pages).sort((a, b) => a - b);
  const out = [];
  nums.forEach((n, i) => {
    if (i > 0 && n - nums[i - 1] > 1) out.push("…");
    out.push(n);
  });
  return out;
}

export default function Pagination({ page, pages, params }) {
  if (pages <= 1) return null;
  const href = (p) => {
    const qs = new URLSearchParams(params);
    qs.set("page", String(p));
    return `/tuitions?${qs}`;
  };
  const box = "grid h-10 min-w-10 place-items-center rounded-lg border border-base-content/20 px-3 text-sm font-medium";

  return (
    <nav className="mt-12 flex flex-wrap items-center justify-center gap-2" aria-label="Pagination">
      {page > 1 ? (
        <Link href={href(page - 1)} className={`${box} gap-1 hover:bg-base-200`}><PiCaretLeftBold /> Previous</Link>
      ) : (
        <span className={`${box} gap-1 opacity-40`}><PiCaretLeftBold /> Previous</span>
      )}
      {pageList(page, pages).map((n, i) =>
        n === "…" ? (
          <span key={`d${i}`} className="px-1 text-base-content/50">…</span>
        ) : (
          <Link key={n} href={href(n)} className={`${box} ${n === page ? "border-base-content bg-base-content text-base-100" : "hover:bg-base-200"}`}>
            {n}
          </Link>
        )
      )}
      {page < pages ? (
        <Link href={href(page + 1)} className={`${box} gap-1 hover:bg-base-200`}>Next <PiCaretRightBold /></Link>
      ) : (
        <span className={`${box} gap-1 opacity-40`}>Next <PiCaretRightBold /></span>
      )}
    </nav>
  );
}