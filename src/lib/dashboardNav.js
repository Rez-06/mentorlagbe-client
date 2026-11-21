import {
  PiSquaresFourDuotone, PiFileTextDuotone, PiPlusCircleDuotone, PiBooksDuotone, PiUsersThreeDuotone,
  PiUserGearDuotone, PiReceiptDuotone, PiIdentificationCardDuotone, PiChalkboardTeacherDuotone,
} from "react-icons/pi";

const profile = { label: "Update Profile", href: "/dashboard/profile", icon: PiIdentificationCardDuotone };

// soon: true = page is built in a later push (shown disabled in the sidebar)
export const dashboardNav = {
  student: [
    { label: "Overview", href: "/dashboard/student", icon: PiSquaresFourDuotone },
    { label: "My Applications", href: "/dashboard/student/my-applications", icon: PiFileTextDuotone, soon: true },
    profile,
  ],
  tutor: [
    { label: "Overview", href: "/dashboard/tutor", icon: PiSquaresFourDuotone },
    { label: "Post Tuition", href: "/dashboard/tutor/post-tuition", icon: PiPlusCircleDuotone, soon: true },
    { label: "My Tuitions", href: "/dashboard/tutor/my-tuitions", icon: PiBooksDuotone, soon: true },
    { label: "Applicants", href: "/dashboard/tutor/applicants", icon: PiChalkboardTeacherDuotone, soon: true },
    profile,
  ],
  admin: [
    { label: "Overview", href: "/dashboard/admin", icon: PiSquaresFourDuotone },
    { label: "Users", href: "/dashboard/admin/users", icon: PiUsersThreeDuotone, soon: true },
    { label: "Tuitions", href: "/dashboard/admin/tuitions", icon: PiBooksDuotone, soon: true },
    { label: "Transactions", href: "/dashboard/admin/transactions", icon: PiReceiptDuotone, soon: true },
    profile,
  ],
};