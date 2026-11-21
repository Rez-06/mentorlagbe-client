import { Poppins, Space_Mono, Oleo_Script } from "next/font/google";
import { Toaster } from "react-hot-toast";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import "./globals.css";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-poppins",
});

const spaceMono = Space_Mono({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-space-mono",
});

const oleo = Oleo_Script({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-oleo",
});

export const metadata = {
  title: "MentorLagbe | Find Your Ideal Tutor",
  description:
    "Smart tuition & mentorship platform connecting students with verified tutors.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" data-theme="mentorlight">
      <body
        className={`${poppins.variable} ${spaceMono.variable} ${oleo.variable} bg-base-100 text-base-content antialiased`}
      >
        <Navbar />
        <main className="min-h-[70vh]">{children}</main>
        <Footer />
        <Toaster position="top-right" toastOptions={{ duration: 3000 }} />
      </body>
    </html>
  );
}