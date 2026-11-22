import {
  PiSquaresFourDuotone, PiFileTextDuotone, PiPlusCircleDuotone, PiBooksDuotone, PiUsersThreeDuotone,
  PiReceiptDuotone, PiIdentificationCardDuotone, PiChalkboardTeacherDuotone,
} from "react-icons/pi";
import { READY_ROUTES } from "./readyRoutes";

const profile = { label: "Update Profile", href: "/dashboard/profile", icon: PiIdentificationCardDuotone };

const raw = {
  student: [
    { label: "Overview", href: "/dashboard/student", icon: PiSquaresFourDuotone },
    { label: "My Applications", href: "/dashboard/student/my-applications", icon: PiFileTextDuotone },
    profile,
  ],
  tutor: [
    { label: "Overview", href: "/dashboard/tutor", icon: PiSquaresFourDuotone },
    { label: "Post Tuition", href: "/dashboard/tutor/post-tuition", icon: PiPlusCircleDuotone },
    { label: "My Tuitions", href: "/dashboard/tutor/my-tuitions", icon: PiBooksDuotone },
    { label: "Applicants", href: "/dashboard/tutor/applicants", icon: PiChalkboardTeacherDuotone },
    profile,
  ],
  admin: [
    { label: "Overview", href: "/dashboard/admin", icon: PiSquaresFourDuotone },
    { label: "Users", href: "/dashboard/admin/users", icon: PiUsersThreeDuotone },
    { label: "Tuitions", href: "/dashboard/admin/tuitions", icon: PiBooksDuotone },
    { label: "Transactions", href: "/dashboard/admin/transactions", icon: PiReceiptDuotone },
    profile,
  ],
};

// Pages not in READY_ROUTES are shown disabled with a "Soon" tag
export const dashboardNav = Object.fromEntries(
  Object.entries(raw).map(([role, items]) => [role, items.map((i) => ({ ...i, soon: !READY_ROUTES.includes(i.href) }))])
);