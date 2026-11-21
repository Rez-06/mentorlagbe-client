import Welcome from "@/components/dashboard/Welcome";

export default function AdminOverview() {
  return (
    <Welcome
      subtitle="Moderate tuitions, manage users and keep the platform healthy."
      actions={[{ label: "Browse Tuitions", href: "/tuitions" }, { label: "Update Profile", href: "/dashboard/profile" }]}
    />
  );
}