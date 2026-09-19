import React from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ShieldCheck,
  Code2,
  Award,
  GraduationCap,
  Download,
  ArrowRight,
  Trophy,
  BookOpen,
  FileText,
  Star,
  Zap,
  Users,
  TrendingUp,
  MonitorPlay,
} from "lucide-react";
import { trustedLogos } from "@/data/siteData";
import { CrownDoodle, SquiggleDoodle } from "@/components/Doodles";
import HallOfFameMarquee from "@/components/HallOfFameMarquee";

export const metadata = {
  title: "About Raghav Arora | thatraghavarora",
  description:
    "Raghav Arora — Founder of Webpeaker, Ethical Hacker, Full Stack Developer, AI Patent Holder. Secured NASA, WHO, Nokia, Jio, OLA & 50+ organisations.",
};

/* ─────────────────────────────────────────────────────────
   SECTION HEADING helper
   ───────────────────────────────────────────────────────── */
function SectionHeading({ title, squiggleColor }: { title: string; squiggleColor: string }) {
  return (
    <div className="flex items-center gap-3 mb-8">
      <h2 className="text-3xl sm:text-4xl font-black font-display" style={{ color: "var(--fg)" }}>
        {title}
      </h2>
      <SquiggleDoodle className={`w-20 h-4 ${squiggleColor}`} />
    </div>
  );
}

export default function AboutPage() {

  /* ── data ──────────────────────────────────────────────── */

  const awards = [
    { title: "Awarded by IPS Officer — ADGP Rajasthan, India",      icon: <Award       className="w-5 h-5 text-yellow-500" />, accent: "bg-[#FEF9C3]" },
    { title: "Award by DoIT&C, Government of Rajasthan",             icon: <Award       className="w-5 h-5 text-blue-500"   />, accent: "bg-[#BAE6FD]" },
    { title: "Award by Government of Latvia",                        icon: <Award       className="w-5 h-5 text-purple-500" />, accent: "bg-[#DDD6FE]" },
    { title: "Assisted Rajasthan Police in Cybercrime Investigation", icon: <ShieldCheck className="w-5 h-5 text-emerald-500"/>, accent: "bg-[#DCFCE7]" },
  ];

  const education = [
    { degree: "BCA — Cyber Security",       institution: "Cyber Security & Computer Science",          note: "Currently Pursuing", icon: <GraduationCap className="w-5 h-5 text-purple-600" />, accent: "bg-[#DDD6FE]" },
    { degree: "Class 12 — Commerce Stream", institution: "Computer Science: 99 / 100 in Boards", note: "Completed",          icon: <Star          className="w-5 h-5 text-yellow-500" />, accent: "bg-[#FEF9C3]" },
    { degree: "Class 11 — Commerce Stream", institution: "Accounts & Business Studies",          note: "Completed",          icon: <BookOpen      className="w-5 h-5 text-blue-500"   />, accent: "bg-[#BAE6FD]" },
  ];

  const impactStats = [
    { value: "20+",   label: "Hackathons",      icon: <Zap           className="w-5 h-5 text-yellow-500" />, accent: "bg-[#FEF9C3]" },
    { value: "4",     label: "Hackathon Wins",  icon: <Trophy        className="w-5 h-5 text-amber-500"  />, accent: "bg-[#FEF08A]" },
    { value: "200K+", label: "Impressions",     icon: <TrendingUp    className="w-5 h-5 text-green-500"  />, accent: "bg-[#DCFCE7]" },
    { value: "10K+",  label: "Connections",     icon: <Users         className="w-5 h-5 text-blue-500"   />, accent: "bg-[#BAE6FD]" },
    { value: "100+",  label: "Students Taught", icon: <GraduationCap className="w-5 h-5 text-purple-500" />, accent: "bg-[#DDD6FE]" },
    { value: "2",     label: "Workshops",       icon: <MonitorPlay   className="w-5 h-5 text-rose-500"   />, accent: "bg-[#FECDD3]" },
  ];

  const sports = [
    "3-time District Gold Medalist — Ball Badminton 🏅",
    "5-time State-Level Ball Badminton Player 🏸",
    "1-time District-Level Basketball Player 🏀",
  ];

  /* ── render ────────────────────────────────────────────── */
  return (
    <div className="py-8 sm:py-14 lg:py-16 min-h-screen" style={{ backgroundColor: "var(--bg)", color: "var(--fg)" }}>
      <div className="max-w-7xl mx-auto px-3.5 sm:px-6 lg:px-8 space-y-12 sm:space-y-16 lg:space-y-20">

        {/* ══ 1. PAGE HEADER ══════════════════════════════ */}
        <div className="max-w-3xl animate-slide-up">
          <div className="inline-block px-3.5 py-1 rounded-full border-2 border-black shadow-brutal-sm font-black text-xs uppercase tracking-wider mb-3 sm:mb-4"
            style={{ backgroundColor: "var(--bg-card)", color: "var(--fg)" }}>
            THE STORY BEHIND THE HANDLE
          </div>
          <div className="flex items-center gap-3">
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black font-display tracking-tight" style={{ color: "var(--fg)" }}>
              About Raghav Arora
            </h1>
            <CrownDoodle className="w-9 h-9 sm:w-11 sm:h-11 hidden sm:block -rotate-12 animate-float-slow text-yellow-400" />
          </div>
          <p className="text-base sm:text-xl font-medium mt-3 sm:mt-4 leading-relaxed" style={{ color: "var(--fg-muted)" }}>
            Hacker · Builder · Educator · Entrepreneur — Jaipur, India
          </p>
        </div>

        {/* ══ 2. HERO BIO CARD ════════════════════════════ */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 lg:gap-10 items-center rounded-2xl sm:rounded-3xl border-[3.5px] border-black p-5 sm:p-8 lg:p-12 shadow-brutal-xl animate-slide-up"
          style={{ backgroundColor: "var(--bg-card)" }}>
          {/* Photo */}
          <div className="lg:col-span-4 max-w-[280px] sm:max-w-[340px] mx-auto lg:max-w-none w-full">
            <div className="relative w-full aspect-square rounded-2xl overflow-hidden border-[3.5px] border-black shadow-brutal hover-lift">
              <Image src="/images/about-hacker.jpg" alt="Raghav Arora" fill className="object-cover" />
            </div>
          </div>
          {/* Bio text */}
          <div className="lg:col-span-8 flex flex-col gap-4 sm:gap-5">
            <div className="inline-block px-3 py-1 rounded-full border-2 border-black font-extrabold text-xs uppercase tracking-wider self-start"
              style={{ backgroundColor: "var(--bg-secondary)", color: "var(--fg)" }}>
              BCA Cyber Security
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black font-display tracking-tight leading-tight" style={{ color: "var(--fg)" }}>
              Founder, Ethical Hacker &amp; Full Stack Developer
            </h2>
            <div className="space-y-3 text-sm sm:text-base lg:text-lg font-medium leading-relaxed" style={{ color: "var(--fg-muted)" }}>
              <p>
                I&apos;m <strong style={{ color: "var(--fg)" }}>Raghav Arora</strong> —{" "}
                <strong style={{ color: "var(--fg)" }}>Founder of Webpeaker</strong>, an ethical hacker and full stack
                developer who has secured over <strong style={{ color: "var(--fg)" }}>50+ organisations</strong> including
                NASA, WHO, Nokia, Panasonic, Jio, OLA, Lenskart and many more.
              </p>
              <p>
                Awarded by an <strong style={{ color: "var(--fg)" }}>IPS Officer (ADGP Rajasthan)</strong>, the{" "}
                <strong style={{ color: "var(--fg)" }}>DoIT&amp;C Government of Rajasthan</strong>, and the{" "}
                <strong style={{ color: "var(--fg)" }}>Government of Latvia</strong>. Also assisted the{" "}
                <strong style={{ color: "var(--fg)" }}>Rajasthan Police</strong> in cybercrime investigations.
              </p>
              <p>
                Patent holder on an <strong style={{ color: "var(--fg)" }}>AI-based Mobile Security System</strong> &amp; 
                a <strong style={{ color: "var(--fg)" }}>3-time District Gold Medalist</strong> in Ball Badminton.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row flex-wrap items-stretch sm:items-center gap-3 sm:gap-4 pt-2">
              <a
                href="/resume.pdf"
                download
                className="btn-brutal btn-brutal-primary px-5 sm:px-7 py-3 sm:py-3.5 text-xs sm:text-sm uppercase tracking-wide w-full sm:w-auto text-center justify-center"
              >
                <span>Download Resume</span><Download className="w-4 h-4" />
              </a>
              <a
                href="/biography-june-2026.pdf"
                download
                className="btn-brutal btn-brutal-yellow px-5 sm:px-7 py-3 sm:py-3.5 text-xs sm:text-sm uppercase tracking-wide flex items-center justify-center gap-2 w-full sm:w-auto text-center"
                id="about-biography-btn"
              >
                <span>Download Biography Book (Till June 2026)</span>
                <BookOpen className="w-4 h-4 shrink-0" />
              </a>
              <Link
                href="/contact"
                className="btn-brutal btn-brutal-white px-5 sm:px-7 py-3 sm:py-3.5 text-xs sm:text-sm w-full sm:w-auto text-center justify-center"
              >
                <span>Get In Touch</span><ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>

        {/* ══ 3. IMPACT STATS (Hackathons) ════════════════ */}
        <div>
          <SectionHeading title="Hackathons & Impact" squiggleColor="text-yellow-500" />
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4">
            {impactStats.map((stat, i) => (
              <div key={i} className={`${stat.accent} rounded-xl sm:rounded-2xl border-[3px] border-black p-3.5 sm:p-5 shadow-brutal hover-lift flex flex-col items-start gap-1.5 sm:gap-2`}>
                <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl border-2 border-black bg-white flex items-center justify-center shadow-brutal-sm shrink-0">
                  {stat.icon}
                </div>
                <p className="text-xl sm:text-3xl font-black text-black font-display leading-none">{stat.value}</p>
                <p className="text-[10px] sm:text-xs font-black text-black/70 uppercase tracking-wider leading-tight">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>

        {/* ══ 4. AWARDS & RECOGNITION ═════════════════════ */}
        <div>
          <SectionHeading title="Awards & Recognition" squiggleColor="text-yellow-500" />
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 sm:gap-5">
            {awards.map((award, i) => (
              <div key={i} className={`${award.accent} rounded-xl sm:rounded-2xl border-[3px] border-black p-4 sm:p-5 shadow-brutal hover-lift flex items-center gap-3.5 sm:gap-4`}>
                <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl border-2 border-black bg-white flex items-center justify-center shadow-brutal-sm shrink-0">
                  {award.icon}
                </div>
                <p className="font-black text-xs sm:text-base text-black leading-snug">{award.title}</p>
              </div>
            ))}
          </div>
        </div>

        {/* ══ 5. HALL OF FAMES ════════════════════════════ */}
        <div className="rounded-2xl sm:rounded-3xl border-[3.5px] border-black bg-black text-white overflow-hidden shadow-brutal-xl">
          {/* Header */}
          <div className="px-5 sm:px-10 lg:px-12 pt-6 sm:pt-10 pb-4 sm:pb-6 max-w-2xl">
            <h2 className="text-2xl sm:text-3xl font-black font-display text-white mb-2">Hall of Fames &amp; Secured Organisations</h2>
            <p className="text-xs sm:text-sm text-neutral-300 font-medium">
              Responsible vulnerability disclosures to 50+ global organisations — conducted per ISO 29147.
            </p>
          </div>
          <HallOfFameMarquee orgs={trustedLogos} />
        </div>


        {/* ══ 6. EDUCATION ════════════════════════════════ */}
        <div>
          <SectionHeading title="Education" squiggleColor="text-purple-500" />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5 sm:gap-5">
            {education.map((edu, i) => (
              <div key={i} className={`${edu.accent} rounded-xl sm:rounded-2xl border-[3px] border-black p-4 sm:p-6 shadow-brutal hover-lift flex flex-col gap-2.5 sm:gap-3`}>
                <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl border-2 border-black bg-white flex items-center justify-center shadow-brutal-sm">
                  {edu.icon}
                </div>
                <div>
                  <p className="font-black text-base sm:text-lg text-black leading-tight font-display">{edu.degree}</p>
                  <p className="text-xs sm:text-sm font-bold text-neutral-700 mt-1">{edu.institution}</p>
                </div>
                <span className="inline-block text-[10px] sm:text-xs font-black uppercase tracking-wider px-2.5 py-1 rounded-full border border-black bg-white text-black self-start">
                  {edu.note}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* ══ 7. PATENT ═══════════════════════════════════ */}
        <div className="rounded-2xl sm:rounded-3xl border-[3.5px] border-black p-5 sm:p-8 lg:p-10 shadow-brutal-xl flex flex-col sm:flex-row items-start gap-4 sm:gap-6 hover-lift"
          style={{ backgroundColor: "var(--bg-card)" }}>
          <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl border-[2.5px] border-black bg-[#DDD6FE] flex items-center justify-center shadow-brutal-sm shrink-0">
            <FileText className="w-6 h-6 sm:w-7 sm:h-7 text-purple-700" />
          </div>
          <div>
            <div className="inline-block px-3 py-0.5 rounded-full border-2 border-black font-black text-xs uppercase tracking-widest mb-2 sm:mb-3"
              style={{ backgroundColor: "var(--bg-secondary)", color: "var(--fg)" }}>
              Patent Holder &amp; Author
            </div>
            <h3 className="text-base sm:text-2xl font-black font-display leading-snug mb-2" style={{ color: "var(--fg)" }}>
              An Artificial Intelligence Based Mobile Security System with Virus Detection, Permission Monitoring and Chatbot Guidance
            </h3>
            <p className="text-xs sm:text-sm font-bold" style={{ color: "var(--fg-subtle)" }}>
              Application No: <span className="font-black" style={{ color: "var(--fg)" }}>202611073222</span>
            </p>
          </div>
        </div>

        {/* ══ 8. SKILLS ═══════════════════════════════════ */}
        <div>
          <SectionHeading title="Skills" squiggleColor="text-purple-500" />
          <div className="space-y-4 sm:space-y-5">
            {[
              {
                label: "Development", Icon: Code2, color: "text-yellow-600",
                pills: ["HTML","CSS","JavaScript","React JS","Node JS","SQL","Python","C","C++","Java"],
                bg: "bg-[#FEF08A]",
              },
              {
                label: "Cyber Security", Icon: ShieldCheck, color: "text-purple-600",
                pills: ["Web Pentesting","App Pentesting","API Pentesting","Reverse Engineering","Cyber Crime Investigation","SOC"],
                bg: "bg-[#DDD6FE]",
              },
              {
                label: "Digital Marketing", Icon: TrendingUp, color: "text-sky-600",
                pills: ["SEO","Google Ads","Meta Ads","Social Media","Graphic Designing"],
                bg: "bg-[#BAE6FD]",
              },
            ].map(({ label, Icon, color, pills, bg }) => (
              <div key={label}>
                <p className={`text-xs font-black uppercase tracking-widest mb-2.5 flex items-center gap-2 ${color}`}>
                  <Icon className="w-3.5 h-3.5" /> {label}
                </p>
                <div className="flex flex-wrap gap-2">
                  {pills.map((s) => (
                    <span key={s} className={`${bg} px-3 sm:px-4 py-1.5 sm:py-2 rounded-xl sm:rounded-2xl border-[2.5px] border-black shadow-brutal-sm text-black text-xs sm:text-sm font-extrabold font-display hover-lift`}>
                      {s}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ══ 9. SPORTS & ACTIVITIES ══════════════════════ */}
        <div>
          <SectionHeading title="Sports & Activities" squiggleColor="text-emerald-500" />
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5 sm:gap-5">
            {sports.map((item, i) => (
              <div key={i} className="bg-[#DCFCE7] rounded-xl sm:rounded-2xl border-[3px] border-black p-4 sm:p-5 shadow-brutal hover-lift flex items-center gap-3.5 sm:gap-4">
                <Trophy className="w-7 h-7 sm:w-8 sm:h-8 text-emerald-700 shrink-0" />
                <p className="font-black text-xs sm:text-base text-black leading-snug">{item}</p>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
