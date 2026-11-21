import Welcome from "@/components/dashboard/Welcome";

export default function StudentOverview() {
  return (
    <Welcome
      subtitle="Find a tutor, apply to batches and track every application in one place."
      actions={[{ label: "Browse Tuitions", href: "/tuitions" }, { label: "Update Profile", href: "/dashboard/profile" }]}
    />
  );
}