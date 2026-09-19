import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "thatraghavarora | Raghav Arora - Cybersecurity, Developer & Educator",
  description:
    "Personal hacker portfolio, full stack developer showcase, cybersecurity researcher acknowledged by NASA & WHO, and hands-on online course academy by Raghav Arora.",
  keywords: [
    "Raghav Arora",
    "thatraghavarora",
    "Cyber Security",
    "Ethical Hacking",
    "Full Stack Developer",
    "Bug Bounty",
    "VAPT",
    "Webpeaker",
    "Online Courses"
  ],
  authors: [{ name: "Raghav Arora", url: "https://thatraghavarora.in" }],
  openGraph: {
    title: "thatraghavarora | Raghav Arora",
    description:
      "Cyber Security Enthusiast, Full Stack Developer, Bug Bounty Hunter, and Educator.",
    url: "https://thatraghavarora.in",
    siteName: "thatraghavarora",
    images: [
      {
        url: "/images/hero-hacker.jpg",
        width: 1200,
        height: 630,
        alt: "Raghav Arora Portfolio"
      }
    ],
    locale: "en_US",
    type: "website"
  }
};

export default function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="h-full scroll-smooth">
      <body className="min-h-full flex flex-col bg-white text-black font-sans selection:bg-yellow-300 selection:text-black">
        <Navbar />
        <main className="flex-grow">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
