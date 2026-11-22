import { Poppins, Space_Mono, Oleo_Script } from "next/font/google";
import { Toaster } from "react-hot-toast";
import AuthProvider from "@/components/providers/AuthProvider";
import BookmarksProvider from "@/components/providers/BookmarksProvider";
import SiteChrome from "@/components/layout/SiteChrome";
import "./globals.css";

const poppins = Poppins({ subsets: ["latin"], weight: ["400", "500", "600", "700"], variable: "--font-poppins" });
const spaceMono = Space_Mono({ subsets: ["latin"], weight: ["400", "700"], variable: "--font-space-mono" });
const oleo = Oleo_Script({ subsets: ["latin"], weight: ["400", "700"], variable: "--font-oleo" });

export const metadata = {
  title: "MentorLagbe | Find Your Ideal Tutor",
  description: "Smart tuition & mentorship platform connecting students with verified tutors.",
};

// Runs before the page paints, so the saved theme never flashes
const themeScript = `try{var t=localStorage.getItem("ml_theme");if(t==="mentordark"||t==="mentorlight")document.documentElement.setAttribute("data-theme",t)}catch(e){}`;

export default function RootLayout({ children }) {
  return (
    <html lang="en" data-theme="mentorlight" data-scroll-behavior="smooth" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body className={`${poppins.variable} ${spaceMono.variable} ${oleo.variable} bg-base-100 text-base-content antialiased transition-colors duration-300`}>
        <AuthProvider>
          <BookmarksProvider>
            <SiteChrome>{children}</SiteChrome>
            <Toaster position="top-right" toastOptions={{ duration: 3000 }} />
          </BookmarksProvider>
        </AuthProvider>
      </body>
    </html>
  );
}