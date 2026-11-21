import Welcome from "@/components/dashboard/Welcome";

export default function TutorOverview() {
  return (
    <Welcome
      subtitle="Post tuition batches, manage applicants and grow your student base."
      actions={[{ label: "Update Profile", href: "/dashboard/profile" }, { label: "View Pricing", href: "/pricing" }]}
    />
  );
}