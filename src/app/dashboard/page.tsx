"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Home,
  BookOpen,
  Map,
  Users,
  Settings,
  PlayCircle,
  Trophy,
  Clock,
  CheckCircle2,
  Flame,
  ChevronRight,
  Bell,
  Menu,
  X,
  Zap,
  Award,
  ArrowRight,
  Lock,
} from "lucide-react";
import { courses } from "@/data/siteData";

// ─── NAV ITEMS ───────────────────────────────────────────────
const navItems = [
  { label: "Home",           href: "/dashboard",         icon: Home },
  { label: "Explore Courses",href: "/courses",           icon: BookOpen },
  { label: "Roadmap",        href: "/roadmap",           icon: Map },
  { label: "Community",      href: "#community",         icon: Users },
  { label: "Settings",       href: "#settings",          icon: Settings },
];

// ─── SIDEBAR ─────────────────────────────────────────────────
function Sidebar({ open, onClose }: { open: boolean; onClose: () => void }) {
  const pathname = usePathname();

  return (
    <>
      {/* Overlay on mobile */}
      {open && (
        <div
          className="fixed inset-0 z-30 bg-black/60 md:hidden"
          onClick={onClose}
        />
      )}

      <aside
        className={`fixed top-0 left-0 h-full w-64 bg-neutral-950 border-r-[3px] border-black z-40 flex flex-col transition-transform duration-300
          ${open ? "translate-x-0" : "-translate-x-full"} md:translate-x-0`}
      >
        {/* Sidebar Logo */}
        <div className="h-16 flex items-center px-5 border-b-[3px] border-black shrink-0">
          <Link href="/" className="flex items-center gap-2 group">
            <span className="bg-yellow-300 text-black px-2 py-0.5 rounded-md font-mono text-sm font-black group-hover:bg-yellow-400 transition-colors">
              &lt;/&gt;
            </span>
            <span className="font-black text-base text-white tracking-tight">
              thatraghavarora
            </span>
          </Link>
          {/* Close on mobile */}
          <button onClick={onClose} className="ml-auto md:hidden text-neutral-400 hover:text-white">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Nav Links */}
        <nav className="flex-1 px-3 py-5 space-y-1 overflow-y-auto">
          <p className="text-[10px] font-black uppercase tracking-widest text-neutral-600 px-3 mb-3">
            Main Menu
          </p>
          {navItems.map(({ label, href, icon: Icon }) => {
            const active = pathname === href;
            return (
              <Link
                key={href}
                href={href}
                onClick={onClose}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-xl font-black text-sm transition-all group
                  ${active
                    ? "bg-yellow-300 text-black shadow-brutal-xs"
                    : "text-neutral-400 hover:bg-white/5 hover:text-white"
                  }`}
              >
                <Icon className={`w-4.5 h-4.5 shrink-0 ${active ? "text-black" : "text-neutral-500 group-hover:text-white"}`} />
                <span>{label}</span>
                {active && <ChevronRight className="w-3.5 h-3.5 ml-auto text-black" />}
              </Link>
            );
          })}
        </nav>

        {/* Upgrade CTA */}
        <div className="m-3 p-4 rounded-2xl border-2 border-yellow-300/30 bg-yellow-300/10 mb-5">
          <p className="font-black text-xs text-yellow-300 mb-1">🔓 Unlock More</p>
          <p className="text-[11px] font-bold text-neutral-400 leading-snug mb-3">
            Access premium roadmaps and 1:1 live sessions
          </p>
          <Link
            href="/roadmap"
            className="block w-full py-2 rounded-xl border-2 border-yellow-300 bg-yellow-300 text-black text-center font-black text-xs hover:bg-yellow-400 transition-colors"
          >
            Explore Roadmaps
          </Link>
        </div>
      </aside>
    </>
  );
}

// ─── MAIN DASHBOARD ──────────────────────────────────────────
export default function DashboardPage() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const enrolledCourses = courses.map((course) => ({
    ...course,
    progress: Math.floor(Math.random() * 60),
    completedLessons: Math.floor(Math.random() * 10),
    lastLesson: course.curriculum[0]?.lectures[0]?.title || "Introduction",
  }));

  const stats = [
    { label: "Courses Enrolled", value: enrolledCourses.length.toString(), icon: BookOpen, color: "bg-purple-200 text-purple-800", border: "border-purple-300" },
    { label: "Hours Watched",    value: "24.5h",                            icon: Clock,     color: "bg-blue-200 text-blue-800",   border: "border-blue-300"   },
    { label: "Lessons Done",     value: "75",                               icon: CheckCircle2, color: "bg-emerald-200 text-emerald-800", border: "border-emerald-300" },
    { label: "Day Streak",       value: "5 🔥",                             icon: Flame,     color: "bg-amber-200 text-amber-800", border: "border-amber-300"  },
  ];

  return (
    <div className="flex min-h-screen bg-neutral-100">
      {/* ── SIDEBAR ── */}
      <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      {/* ── MAIN AREA ── */}
      <div className="flex-1 flex flex-col md:ml-64 min-w-0">

        {/* ── TOP HEADER ── */}
        <header className="sticky top-0 z-20 h-16 bg-white border-b-[3px] border-black flex items-center px-4 sm:px-6 gap-4">
          {/* Hamburger — mobile only */}
          <button
            onClick={() => setSidebarOpen(true)}
            className="md:hidden w-9 h-9 rounded-xl border-2 border-black flex items-center justify-center bg-yellow-300 shadow-brutal-xs shrink-0"
          >
            <Menu className="w-5 h-5 text-black" />
          </button>

          {/* Left: Brand Text */}
          <div className="flex-1 min-w-0">
            <p className="font-display font-black text-lg text-black tracking-tight leading-none">
              Student Portal
            </p>
            <p className="text-[11px] font-bold text-neutral-500 leading-none mt-0.5">
              Welcome back, Hacker! 👋
            </p>
          </div>

          {/* Right: Bell + Avatar */}
          <div className="flex items-center gap-3 shrink-0">
            <button className="relative w-9 h-9 rounded-xl border-2 border-black flex items-center justify-center bg-white shadow-brutal-xs hover:bg-neutral-50 transition-colors">
              <Bell className="w-4.5 h-4.5 text-black" />
              <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-red-500 border-2 border-white text-[9px] font-black text-white flex items-center justify-center">3</span>
            </button>
            <div className="relative w-9 h-9 rounded-xl border-2 border-black overflow-hidden shadow-brutal-xs bg-yellow-300 flex items-center justify-center cursor-pointer">
              <span className="font-black text-sm text-black">R</span>
            </div>
          </div>
        </header>

        {/* ── PAGE CONTENT ── */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 space-y-8">

          {/* ── WELCOME BANNER ── */}
          <div className="rounded-3xl border-[3px] border-black bg-neutral-950 p-6 sm:p-8 shadow-brutal-xl relative overflow-hidden">
            {/* Grid bg */}
            <div className="absolute inset-0 opacity-[0.05] pointer-events-none"
              style={{ backgroundImage: "linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)", backgroundSize: "30px 30px" }}
            />
            <div className="relative z-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-5">
              <div>
                <span className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full border border-yellow-300/40 bg-yellow-300/10 text-yellow-300 text-[11px] font-black uppercase tracking-wider mb-3">
                  <Zap className="w-3 h-3" /> Student Learning Dashboard
                </span>
                <h1 className="text-2xl sm:text-3xl font-black text-white font-display tracking-tight">
                  Keep Going, You&apos;re Doing Great!
                </h1>
                <p className="text-sm font-bold text-neutral-400 mt-1">
                  You&apos;re on a <span className="text-yellow-300">5-day streak</span> — don&apos;t break it today.
                </p>
              </div>
              <Link
                href="/my-courses"
                className="shrink-0 inline-flex items-center gap-2 px-5 py-3 rounded-xl border-2 border-yellow-300 bg-yellow-300 text-black font-black text-sm hover:bg-yellow-400 transition-all shadow-brutal-sm hover:shadow-brutal whitespace-nowrap"
              >
                <PlayCircle className="w-4 h-4" />
                Resume Learning
              </Link>
            </div>
          </div>

          {/* ── STAT CARDS ── */}
          <div className="grid grid-cols-2 xl:grid-cols-4 gap-4">
            {stats.map(({ label, value, icon: Icon, color, border }) => (
              <div key={label} className="rounded-2xl border-[3px] border-black bg-white p-4 sm:p-5 shadow-brutal hover:-translate-y-0.5 hover:shadow-brutal-xl transition-all">
                <div className={`w-10 h-10 rounded-xl border-2 ${border} ${color} flex items-center justify-center mb-3`}>
                  <Icon className="w-5 h-5" />
                </div>
                <p className="text-2xl font-black text-black font-display">{value}</p>
                <p className="text-xs font-bold text-neutral-500 mt-0.5">{label}</p>
              </div>
            ))}
          </div>

          {/* ── TWO COLUMN LAYOUT ── */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">

            {/* LEFT: Continue Learning */}
            <div className="lg:col-span-8 space-y-5">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-black text-black font-display">Continue Learning</h2>
                <Link href="/courses" className="text-xs font-black text-purple-700 flex items-center gap-1 hover:underline">
                  Browse More <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>

              <div className="space-y-4">
                {enrolledCourses.slice(0, 3).map((c) => (
                  <div key={c.slug} className="rounded-2xl border-[3px] border-black bg-white p-5 shadow-brutal hover:-translate-y-0.5 hover:shadow-brutal-xl transition-all flex flex-col sm:flex-row items-start sm:items-center gap-4">
                    <div className="relative w-full sm:w-36 aspect-video rounded-xl overflow-hidden border-2 border-black shrink-0">
                      <Image src={c.thumbnail} alt={c.title} fill className="object-cover" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <span className="text-[10px] font-black uppercase tracking-wider text-purple-700">{c.category}</span>
                      <h3 className="font-display font-black text-sm sm:text-base text-black mt-0.5 leading-snug">{c.title}</h3>
                      <p className="text-[11px] font-bold text-neutral-500 mt-1 mb-3 truncate">Next: {c.lastLesson}</p>
                      {/* Progress bar */}
                      <div className="flex items-center gap-3">
                        <div className="flex-1 h-2.5 rounded-full border border-black bg-neutral-100 overflow-hidden">
                          <div
                            className="h-full bg-yellow-300 border-r border-black transition-all"
                            style={{ width: `${c.progress}%` }}
                          />
                        </div>
                        <span className="text-[11px] font-black text-black shrink-0">{c.progress}%</span>
                      </div>
                      <div className="flex items-center justify-between mt-3">
                        <span className="text-[11px] font-bold text-neutral-500">{c.completedLessons}/{c.lessonsCount} lessons</span>
                        <Link href="/my-courses" className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg border-2 border-black bg-black text-yellow-300 text-xs font-black hover:bg-neutral-800 transition-colors shadow-brutal-xs">
                          Resume <PlayCircle className="w-3.5 h-3.5" />
                        </Link>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* RIGHT: Sidebar panels */}
            <div className="lg:col-span-4 space-y-5">

              {/* Live Session */}
              <div className="rounded-2xl border-[3px] border-black bg-neutral-950 p-5 shadow-brutal">
                <div className="flex items-center gap-2 mb-3">
                  <span className="w-2 h-2 rounded-full bg-red-500 animate-ping shrink-0" />
                  <span className="font-black text-[11px] uppercase tracking-wider text-red-400">Live Soon</span>
                </div>
                <h3 className="font-display font-black text-sm text-white mb-1">Bug Bounty Live Walkthrough</h3>
                <p className="text-[11px] font-bold text-neutral-400 mb-4">
                  Saturday 7:00 PM IST · Discord · Bring your recon questions!
                </p>
                <a
                  href="https://discord.gg"
                  target="_blank" rel="noopener noreferrer"
                  className="block w-full py-2.5 rounded-xl border-2 border-yellow-300 bg-yellow-300 text-black text-center font-black text-xs hover:bg-yellow-400 transition-colors"
                >
                  Join Community Discord
                </a>
              </div>

              {/* Locked Roadmap teaser */}
              <div className="rounded-2xl border-[3px] border-black bg-white p-5 shadow-brutal">
                <div className="flex items-center gap-2 mb-3">
                  <Lock className="w-4 h-4 text-purple-700" />
                  <h3 className="font-display font-black text-sm text-black">Premium Roadmap</h3>
                </div>
                <p className="text-[11px] font-bold text-neutral-500 mb-4 leading-relaxed">
                  Unlock the complete 6-phase Cyber Security roadmap — 80+ topics, lab goals & bug bounty guide.
                </p>
                <Link
                  href="/roadmap/web-pentesting-cyber-security"
                  className="block w-full py-2.5 rounded-xl border-2 border-black bg-purple-600 text-white text-center font-black text-xs hover:bg-purple-700 transition-colors shadow-brutal-xs"
                >
                  View Roadmap →
                </Link>
              </div>

              {/* Badges */}
              <div className="rounded-2xl border-[3px] border-black bg-white p-5 shadow-brutal">
                <div className="flex items-center gap-2 mb-4">
                  <Award className="w-4 h-4 text-amber-600" />
                  <h3 className="font-display font-black text-sm text-black">Earned Badges</h3>
                </div>
                <div className="space-y-2.5">
                  {[
                    { emoji: "⚡", name: "Fast Learner", desc: "10 lessons in 48 hours", bg: "bg-yellow-100 border-yellow-300" },
                    { emoji: "🛡️", name: "XSS Hunter",   desc: "Finished Web App Module", bg: "bg-purple-100 border-purple-300" },
                    { emoji: "🏆", name: "Streak King",  desc: "5-day learning streak",   bg: "bg-emerald-100 border-emerald-300" },
                  ].map(({ emoji, name, desc, bg }) => (
                    <div key={name} className={`flex items-center gap-3 p-2.5 rounded-xl border-2 ${bg}`}>
                      <div className="w-9 h-9 rounded-lg border border-black bg-white flex items-center justify-center text-base shrink-0">{emoji}</div>
                      <div>
                        <p className="font-black text-xs text-black">{name}</p>
                        <p className="text-[10px] font-bold text-neutral-600">{desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
