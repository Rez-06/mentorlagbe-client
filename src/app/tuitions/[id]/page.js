/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  PiArrowLeftBold, PiGraduationCapDuotone, PiCalendarBlankDuotone, PiMapPinDuotone,
  PiVideoCameraDuotone, PiSealCheckDuotone,
} from "react-icons/pi";
import Container from "@/components/ui/Container";
import SubjectArt from "@/components/ui/SubjectArt";
import UserAvatar from "@/components/ui/UserAvatar";
import ApplyPanel from "@/components/tuitions/ApplyPanel";
import { fetchPublic } from "@/lib/api";

function Info({ icon: Icon, label, value }) {
  return (
    <div className="rounded-[var(--radius-box)] border border-base-content/15 bg-base-200/60 p-4">
      <Icon className="h-6 w-6 text-secondary" />
      <p className="mt-3 text-xs text-base-content/55">{label}</p>
      <p className="font-semibold">{value}</p>
    </div>
  );
}

export default async function TuitionDetailsPage({ params }) {
  const { id } = await params;
  const { ok, status, data: t } = await fetchPublic(`/api/tuitions/${id}`);

  if (!ok) {
    if (status === 404 || status === 400) notFound();
    throw new Error("We could not load this tuition. Please try again.");
  }

  const ModeIcon = t.mode === "Online" ? PiVideoCameraDuotone : PiMapPinDuotone;

  return (
    <section className="py-10">
      <Container>
        <Link href="/tuitions" className="mb-6 inline-flex items-center gap-2 text-sm font-medium hover:text-secondary">
          <PiArrowLeftBold /> Back to all tuitions
        </Link>

        <div className="grid gap-8 lg:grid-cols-[1fr_22rem]">
          <div>
            <div className="aspect-[16/8] overflow-hidden rounded-[var(--radius-box)]">
              {t.bannerImage ? (
                <img src={t.bannerImage} alt={t.title} className="h-full w-full object-cover" />
              ) : (
                <SubjectArt subject={t.subject} className="h-full w-full" />
              )}
            </div>

            <p className="mt-8 font-mono text-xs uppercase tracking-[0.16em] text-base-content/55">
              {t.subject} · {t.classLevel}
            </p>
            <h1 className="mt-2 text-3xl font-semibold tracking-tight sm:text-4xl">{t.title}</h1>

            <div className="mt-8 grid grid-cols-2 gap-4 md:grid-cols-4">
              <Info icon={PiGraduationCapDuotone} label="Class level" value={t.classLevel} />
              <Info icon={PiCalendarBlankDuotone} label="Schedule" value={`${t.daysPerWeek} days / week`} />
              <Info icon={ModeIcon} label={t.mode} value={t.location} />
              <Info icon={PiSealCheckDuotone} label="Posted" value={new Date(t.createdAt).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" })} />
            </div>

            <h2 className="mt-10 text-xl font-semibold">About this batch</h2>
            <p className="mt-3 whitespace-pre-line leading-relaxed text-base-content/75">{t.description}</p>

            <h2 className="mt-10 text-xl font-semibold">Your tutor</h2>
            <div className="mt-4 flex items-start gap-4 rounded-[var(--radius-box)] border border-base-content/15 bg-base-200/60 p-5">
              <UserAvatar user={t.tutor} size="h-16 w-16" />
              <div>
                <p className="flex items-center gap-2 text-lg font-semibold">
                  {t.tutor.name}
                  {t.tutor.plan === "pro" && (
                    <span className="flex items-center gap-1 rounded-md bg-accent px-2 py-0.5 font-mono text-[10px] font-bold uppercase tracking-wider text-accent-content">
                      <PiSealCheckDuotone /> Verified
                    </span>
                  )}
                </p>
                <p className="mt-1 text-sm leading-relaxed text-base-content/70">
                  {t.tutor.bio || "This tutor has not added a bio yet."}
                </p>
              </div>
            </div>
          </div>

          <ApplyPanel tuitionId={t._id} fee={t.monthlyFee} />
        </div>
      </Container>
    </section>
  );
}