import Link from "next/link";
import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import TuitionCard from "@/components/ui/TuitionCard";
import TuitionFilters from "@/components/tuitions/TuitionFilters";
import Pagination from "@/components/tuitions/Pagination";
import { fetchPublic } from "@/lib/api";

export const metadata = { title: "Browse Tuitions | MentorLagbe" };

export default async function TuitionsPage({ searchParams }) {
  const sp = await searchParams;
  const get = (k) => (typeof sp[k] === "string" ? sp[k] : "");

  const filters = {
    search: get("search"),
    subject: get("subject"),
    classLevel: get("classLevel"),
    mode: get("mode"),
    sort: get("sort") || "newest",
  };

  // params that stay the same across pagination links
  const baseParams = {};
  Object.entries(filters).forEach(([k, v]) => {
    if (v && !(k === "sort" && v === "newest")) baseParams[k] = v;
  });

  const qs = new URLSearchParams({ ...baseParams, page: get("page") || "1", limit: "9" });
  const { ok, data } = await fetchPublic(`/api/tuitions?${qs}`);

  return (
    <section className="py-12">
      <Container>
        <SectionHeading
          center={false}
          eyebrow="Browse tuitions"
          title="Find the right batch for you"
          subtitle={ok ? `${data.total} approved ${data.total === 1 ? "tuition" : "tuitions"} available right now.` : "Search by subject, class level and mode."}
        />

        <TuitionFilters initial={filters} />

        {!ok ? (
          <div className="rounded-[var(--radius-box)] border border-error/30 bg-error/5 p-10 text-center">
            <p className="font-semibold">We could not load tuitions right now.</p>
            <p className="mt-1 text-sm text-base-content/65">Please check your connection and try again in a moment.</p>
          </div>
        ) : data.tuitions.length === 0 ? (
          <div className="rounded-[var(--radius-box)] border border-base-content/15 bg-base-200/60 p-12 text-center">
            <p className="text-lg font-semibold">No tuitions match your filters</p>
            <p className="mt-1 text-sm text-base-content/65">Try a different subject or clear the filters.</p>
            <Link href="/tuitions" className="btn btn-primary mt-6">Clear filters</Link>
          </div>
        ) : (
          <>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {data.tuitions.map((t) => (
                <TuitionCard key={t._id} tuition={t} />
              ))}
            </div>
            <Pagination page={data.page} pages={data.pages} params={baseParams} />
          </>
        )}
      </Container>
    </section>
  );
}