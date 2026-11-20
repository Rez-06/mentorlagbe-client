import { Poppins } from "next/font/google";
import { Toaster } from "react-hot-toast";
import "./globals.css";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-poppins",
});

export const metadata = {
  title: "MentorLagbe | Find Your Ideal Tutor",
  description:
    "Smart tuition & mentorship platform connecting students with verified tutors.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" data-theme="mentorlight">
      <body className={`${poppins.variable} bg-base-100 text-base-content antialiased`}>
        {children}
        <Toaster position="top-right" toastOptions={{ duration: 3000 }} />
      </body>
    </html>
  );
}