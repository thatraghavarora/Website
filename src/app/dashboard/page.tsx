"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Home, BookOpen, Map, Users, Settings,
  PlayCircle, Trophy, Clock, CheckCircle2,
  Flame, ChevronRight, Bell, Menu, X, Zap,
  Award, ArrowRight, Lock, Star, Search,
  Filter, ShieldCheck, Globe, Code2,
} from "lucide-react";
import { courses } from "@/data/siteData";
import { roadmaps } from "@/data/roadmapData";

type Tab = "home" | "courses" | "roadmap" | "community" | "settings";

const navItems: { label: string; tab: Tab; icon: React.ElementType }[] = [
  { label: "Home",            tab: "home",      icon: Home     },
  { label: "Explore Courses", tab: "courses",   icon: BookOpen },
  { label: "Roadmap",         tab: "roadmap",   icon: Map      },
  { label: "Community",       tab: "community", icon: Users    },
  { label: "Settings",        tab: "settings",  icon: Settings },
];

// ─── SIDEBAR ─────────────────────────────────────
function Sidebar({
  open, onClose, active, onSelect,
}: {
  open: boolean;
  onClose: () => void;
  active: Tab;
  onSelect: (t: Tab) => void;
}) {
  return (
    <>
      {open && <div className="fixed inset-0 z-30 bg-black/60 md:hidden" onClick={onClose} />}
      <aside className={`fixed top-0 left-0 h-full w-64 bg-neutral-950 border-r-[3px] border-black z-40 flex flex-col transition-transform duration-300 ${open ? "translate-x-0" : "-translate-x-full"} md:translate-x-0`}>
        {/* Logo */}
        <div className="h-16 flex items-center px-5 border-b-[3px] border-black shrink-0">
          <Link href="/" className="flex items-center gap-2 group">
            <span className="bg-yellow-300 text-black px-2 py-0.5 rounded-md font-mono text-sm font-black group-hover:bg-yellow-400 transition-colors">&lt;/&gt;</span>
            <span className="font-black text-base text-white tracking-tight">thatraghavarora</span>
          </Link>
          <button onClick={onClose} className="ml-auto md:hidden text-neutral-400 hover:text-white"><X className="w-5 h-5" /></button>
        </div>

        {/* Nav */}
        <nav className="flex-1 px-3 py-5 space-y-1 overflow-y-auto">
          <p className="text-[10px] font-black uppercase tracking-widest text-neutral-600 px-3 mb-3">Main Menu</p>
          {navItems.map(({ label, tab, icon: Icon }) => {
            const isActive = active === tab;
            return (
              <button
                key={tab}
                onClick={() => { onSelect(tab); onClose(); }}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl font-black text-sm transition-all group text-left
                  ${isActive ? "bg-yellow-300 text-black shadow-brutal-xs" : "text-neutral-400 hover:bg-white/5 hover:text-white"}`}
              >
                <Icon className={`w-4 h-4 shrink-0 ${isActive ? "text-black" : "text-neutral-500 group-hover:text-white"}`} />
                <span>{label}</span>
                {isActive && <ChevronRight className="w-3.5 h-3.5 ml-auto text-black" />}
              </button>
            );
          })}
        </nav>

        {/* Upgrade CTA */}
        <div className="m-3 p-4 rounded-2xl border-2 border-yellow-300/30 bg-yellow-300/10 mb-5">
          <p className="font-black text-xs text-yellow-300 mb-1">🔓 Unlock More</p>
          <p className="text-[11px] font-bold text-neutral-400 leading-snug mb-3">Access premium roadmaps and 1:1 live sessions</p>
          <button
            onClick={() => onSelect("roadmap")}
            className="block w-full py-2 rounded-xl border-2 border-yellow-300 bg-yellow-300 text-black text-center font-black text-xs hover:bg-yellow-400 transition-colors"
          >
            Explore Roadmaps
          </button>
        </div>
      </aside>
    </>
  );
}

// ─── HOME TAB ────────────────────────────────────
function HomeTab({ onSelect }: { onSelect: (t: Tab) => void }) {
  const enrolled = courses.map((c) => ({
    ...c,
    progress: Math.floor(Math.random() * 70 + 10),
    completedLessons: Math.floor(Math.random() * 12),
    lastLesson: c.curriculum[0]?.lectures[0]?.title || "Introduction",
  }));

  const stats = [
    { label: "Courses Enrolled", value: enrolled.length.toString(), icon: BookOpen, bg: "bg-purple-100", text: "text-purple-700", border: "border-purple-300" },
    { label: "Hours Watched",    value: "24.5h",  icon: Clock,        bg: "bg-blue-100",   text: "text-blue-700",   border: "border-blue-300" },
    { label: "Lessons Done",     value: "75",     icon: CheckCircle2, bg: "bg-emerald-100",text: "text-emerald-700",border: "border-emerald-300" },
    { label: "Day Streak",       value: "5 🔥",   icon: Flame,        bg: "bg-amber-100",  text: "text-amber-700",  border: "border-amber-300" },
  ];

  return (
    <div className="space-y-8">
      {/* Banner */}
      <div className="rounded-3xl border-[3px] border-black bg-neutral-950 p-6 sm:p-8 shadow-brutal-xl relative overflow-hidden">
        <div className="absolute inset-0 opacity-[0.04] pointer-events-none" style={{ backgroundImage: "linear-gradient(#fff 1px,transparent 1px),linear-gradient(90deg,#fff 1px,transparent 1px)", backgroundSize: "30px 30px" }} />
        <div className="relative z-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-5">
          <div>
            <span className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full border border-yellow-300/40 bg-yellow-300/10 text-yellow-300 text-[11px] font-black uppercase tracking-wider mb-3">
              <Zap className="w-3 h-3" /> Student Dashboard
            </span>
            <h1 className="text-2xl sm:text-3xl font-black text-white font-display tracking-tight">Keep Going, You&apos;re Doing Great!</h1>
            <p className="text-sm font-bold text-neutral-400 mt-1">You&apos;re on a <span className="text-yellow-300">5-day streak</span> — don&apos;t break it today.</p>
          </div>
          <button
            onClick={() => onSelect("courses")}
            className="shrink-0 inline-flex items-center gap-2 px-5 py-3 rounded-xl border-2 border-yellow-300 bg-yellow-300 text-black font-black text-sm hover:bg-yellow-400 transition-all shadow-brutal-sm whitespace-nowrap"
          >
            <PlayCircle className="w-4 h-4" /> Resume Learning
          </button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 xl:grid-cols-4 gap-4">
        {stats.map(({ label, value, icon: Icon, bg, text, border }) => (
          <div key={label} className="rounded-2xl border-[3px] border-black bg-white p-4 sm:p-5 shadow-brutal hover:-translate-y-0.5 hover:shadow-brutal-xl transition-all">
            <div className={`w-10 h-10 rounded-xl border-2 ${border} ${bg} flex items-center justify-center mb-3`}>
              <Icon className={`w-5 h-5 ${text}`} />
            </div>
            <p className="text-2xl font-black text-black font-display">{value}</p>
            <p className="text-xs font-bold text-neutral-500 mt-0.5">{label}</p>
          </div>
        ))}
      </div>

      {/* Content grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Continue Learning */}
        <div className="lg:col-span-8 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-black text-black font-display">Continue Learning</h2>
            <button onClick={() => onSelect("courses")} className="text-xs font-black text-purple-700 flex items-center gap-1 hover:underline">
              Explore All <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
          {enrolled.slice(0, 2).map((c) => (
            <div key={c.slug} className="rounded-2xl border-[3px] border-black bg-white p-5 shadow-brutal hover:-translate-y-0.5 transition-all flex flex-col sm:flex-row gap-4">
              <div className="relative w-full sm:w-36 aspect-video rounded-xl overflow-hidden border-2 border-black shrink-0">
                <Image src={c.thumbnail} alt={c.title} fill className="object-cover" />
              </div>
              <div className="flex-1 min-w-0">
                <span className="text-[10px] font-black uppercase tracking-wider text-purple-700">{c.category}</span>
                <h3 className="font-display font-black text-sm sm:text-base text-black mt-0.5 leading-snug">{c.title}</h3>
                <p className="text-[11px] font-bold text-neutral-500 mt-1 mb-3 truncate">Next: {c.lastLesson}</p>
                <div className="flex items-center gap-3 mb-3">
                  <div className="flex-1 h-2.5 rounded-full border border-black bg-neutral-100 overflow-hidden">
                    <div className="h-full bg-yellow-300 border-r border-black transition-all" style={{ width: `${c.progress}%` }} />
                  </div>
                  <span className="text-[11px] font-black text-black shrink-0">{c.progress}%</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-bold text-neutral-500">{c.completedLessons}/{c.lessonsCount} lessons</span>
                  <button
                    onClick={() => onSelect("courses")}
                    className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg border-2 border-black bg-black text-yellow-300 text-xs font-black hover:bg-neutral-800 transition-colors shadow-brutal-xs"
                  >
                    Resume <PlayCircle className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Right panel */}
        <div className="lg:col-span-4 space-y-4">
          <div className="rounded-2xl border-[3px] border-black bg-neutral-950 p-5 shadow-brutal">
            <div className="flex items-center gap-2 mb-3">
              <span className="w-2 h-2 rounded-full bg-red-500 animate-ping shrink-0" />
              <span className="font-black text-[11px] uppercase tracking-wider text-red-400">Live Soon</span>
            </div>
            <h3 className="font-display font-black text-sm text-white mb-1">Bug Bounty Live Walkthrough</h3>
            <p className="text-[11px] font-bold text-neutral-400 mb-4">Saturday 7:00 PM IST · Discord · Bring your recon questions!</p>
            <button
              onClick={() => onSelect("community")}
              className="block w-full py-2.5 rounded-xl border-2 border-yellow-300 bg-yellow-300 text-black text-center font-black text-xs hover:bg-yellow-400 transition-colors"
            >
              Join Community
            </button>
          </div>
          <div className="rounded-2xl border-[3px] border-black bg-white p-5 shadow-brutal">
            <div className="flex items-center gap-2 mb-3"><Award className="w-4 h-4 text-amber-600" /><h3 className="font-display font-black text-sm text-black">Earned Badges</h3></div>
            <div className="space-y-2.5">
              {[
                { emoji: "⚡", name: "Fast Learner", desc: "10 lessons in 48h", bg: "bg-yellow-100 border-yellow-300" },
                { emoji: "🛡️", name: "XSS Hunter",  desc: "Finished Web App Module", bg: "bg-purple-100 border-purple-300" },
                { emoji: "🔥", name: "Streak King",  desc: "5-day learning streak", bg: "bg-red-100 border-red-300" },
              ].map(({ emoji, name, desc, bg }) => (
                <div key={name} className={`flex items-center gap-3 p-2.5 rounded-xl border-2 ${bg}`}>
                  <div className="w-8 h-8 rounded-lg border border-black bg-white flex items-center justify-center text-sm shrink-0">{emoji}</div>
                  <div><p className="font-black text-xs text-black">{name}</p><p className="text-[10px] font-bold text-neutral-600">{desc}</p></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── COURSES TAB ─────────────────────────────────
function CoursesTab() {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");
  const categories = ["All", ...Array.from(new Set(courses.map(c => c.category)))];
  const filtered = courses.filter(c => {
    const matchCat = filter === "All" || c.category === filter;
    const matchSearch = c.title.toLowerCase().includes(search.toLowerCase()) || c.category.toLowerCase().includes(search.toLowerCase());
    return matchCat && matchSearch;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-2xl font-black text-black font-display">Explore Courses</h2>
        <p className="text-sm font-bold text-neutral-500 mt-1">All courses available on the platform — start or continue learning</p>
      </div>

      {/* Search + Filter */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400" />
          <input
            value={search} onChange={e => setSearch(e.target.value)}
            placeholder="Search courses..."
            className="w-full pl-10 pr-4 py-3 rounded-xl border-2 border-black text-sm font-bold text-black placeholder:text-neutral-400 focus:outline-none focus:ring-2 focus:ring-yellow-300 bg-white shadow-brutal-xs"
          />
        </div>
        <div className="flex gap-2 flex-wrap">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={`px-3.5 py-2 rounded-xl border-2 border-black text-xs font-black transition-all shadow-brutal-xs
                ${filter === cat ? "bg-black text-yellow-300" : "bg-white text-black hover:bg-neutral-100"}`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Course Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
        {filtered.map((c) => {
          const progress = Math.floor(Math.random() * 80);
          const isEnrolled = progress > 0;
          return (
            <div key={c.slug} className="rounded-2xl border-[3px] border-black bg-white shadow-brutal hover:-translate-y-1 hover:shadow-brutal-xl transition-all flex flex-col overflow-hidden group">
              {/* Thumbnail */}
              <div className="relative w-full aspect-video border-b-2 border-black overflow-hidden">
                <Image src={c.thumbnail} alt={c.title} fill className="object-cover group-hover:scale-105 transition-transform duration-500" />
                <div className="absolute top-2 left-2 flex gap-1.5">
                  <span className="px-2 py-0.5 rounded-full border border-black bg-white text-[10px] font-black uppercase">{c.level}</span>
                  {c.badge && <span className="px-2 py-0.5 rounded-full border border-black bg-yellow-300 text-[10px] font-black uppercase">{c.badge}</span>}
                </div>
                {isEnrolled && (
                  <div className="absolute bottom-0 left-0 right-0 h-1.5 bg-neutral-200">
                    <div className="h-full bg-yellow-400 transition-all" style={{ width: `${progress}%` }} />
                  </div>
                )}
              </div>

              {/* Content */}
              <div className="p-4 flex-1 flex flex-col">
                <span className="text-[10px] font-black uppercase tracking-wider text-purple-700 mb-1">{c.category}</span>
                <h3 className="font-display font-black text-sm text-black leading-snug mb-2 flex-1">{c.title}</h3>

                <div className="flex items-center gap-3 text-[11px] font-bold text-neutral-500 mb-3">
                  <span className="flex items-center gap-1"><BookOpen className="w-3.5 h-3.5" />{c.lessonsCount} lessons</span>
                  <span className="flex items-center gap-1"><Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />{c.rating}</span>
                  <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5" />{c.duration}</span>
                </div>

                {isEnrolled ? (
                  <div>
                    <div className="flex items-center justify-between text-[11px] font-bold mb-1.5">
                      <span className="text-neutral-500">Progress</span>
                      <span className="text-black">{progress}%</span>
                    </div>
                    <div className="w-full h-2 rounded-full border border-black bg-neutral-100 overflow-hidden mb-3">
                      <div className="h-full bg-yellow-300 transition-all" style={{ width: `${progress}%` }} />
                    </div>
                    <Link href={`/my-courses`} className="w-full py-2.5 rounded-xl border-2 border-black bg-black text-yellow-300 text-xs font-black flex items-center justify-center gap-2 hover:bg-neutral-800 transition-colors shadow-brutal-xs">
                      <PlayCircle className="w-3.5 h-3.5" /> Continue
                    </Link>
                  </div>
                ) : (
                  <Link href={`/courses/${c.slug}`} className="w-full py-2.5 rounded-xl border-2 border-black bg-yellow-300 text-black text-xs font-black flex items-center justify-center gap-2 hover:bg-yellow-400 transition-colors shadow-brutal-xs">
                    Enroll Now <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {filtered.length === 0 && (
        <div className="text-center py-16 text-neutral-400 font-bold">No courses found for &quot;{search}&quot;</div>
      )}
    </div>
  );
}

// ─── ROADMAP TAB ─────────────────────────────────
function RoadmapTab() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-black text-black font-display">Your Roadmaps</h2>
        <p className="text-sm font-bold text-neutral-500 mt-1">Structured learning paths — phase by phase</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {roadmaps.map((r) => (
          <div key={r.slug} className="rounded-2xl border-[3px] border-black bg-white p-6 shadow-brutal hover:-translate-y-1 hover:shadow-brutal-xl transition-all">
            <div className="flex items-center gap-2 mb-3 flex-wrap">
              <span className="px-2 py-0.5 rounded-full border-2 border-black bg-purple-200 text-[11px] font-black uppercase">{r.category}</span>
              {r.badge && <span className="px-2 py-0.5 rounded-full border-2 border-black bg-yellow-300 text-[11px] font-black uppercase">{r.badge}</span>}
            </div>
            <h3 className="font-display font-black text-lg text-black mb-2">{r.title}</h3>
            <p className="text-xs font-bold text-neutral-500 mb-4 line-clamp-2">{r.description}</p>
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3 text-xs font-bold text-neutral-600">
                <span className="flex items-center gap-1"><Map className="w-3.5 h-3.5" />{r.modulesCount} phases</span>
                <span className="flex items-center gap-1"><Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />{r.rating}</span>
              </div>
              <div className="text-right">
                <p className="font-black text-base text-black">{r.price}</p>
                <p className="text-[10px] text-neutral-400 line-through">{r.originalPrice}</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <div className="flex-1 flex items-center gap-1.5 p-2.5 rounded-xl border border-neutral-200 bg-neutral-50">
                <Lock className="w-3.5 h-3.5 text-neutral-400" />
                <span className="text-[11px] font-bold text-neutral-500">Deep content locked</span>
              </div>
              <Link
                href={`/roadmap/${r.slug}`}
                className="px-4 py-2.5 rounded-xl border-2 border-black bg-yellow-300 text-black text-xs font-black hover:bg-yellow-400 transition-colors shadow-brutal-xs whitespace-nowrap"
              >
                View →
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── COMMUNITY TAB ───────────────────────────────
function CommunityTab() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-black text-black font-display">Community</h2>
        <p className="text-sm font-bold text-neutral-500 mt-1">Connect with fellow hackers and developers</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <div className="rounded-2xl border-[3px] border-black bg-neutral-950 p-6 shadow-brutal">
          <div className="flex items-center gap-2 mb-3"><span className="w-2 h-2 rounded-full bg-red-500 animate-ping" /><span className="font-black text-xs text-red-400 uppercase tracking-wider">Live This Week</span></div>
          <h3 className="font-black text-white text-lg mb-2 font-display">Bug Bounty Walkthrough Session</h3>
          <p className="text-xs font-bold text-neutral-400 mb-4">Saturday 7:00 PM IST — Raghav will walk through a real recon-to-report workflow live.</p>
          <a href="https://discord.gg/thatraghavarora" target="_blank" rel="noopener noreferrer" className="block w-full py-3 rounded-xl border-2 border-yellow-300 bg-yellow-300 text-black text-center font-black text-sm hover:bg-yellow-400 transition-colors">
            Join Discord Server
          </a>
        </div>
        <div className="rounded-2xl border-[3px] border-black bg-white p-6 shadow-brutal">
          <Globe className="w-6 h-6 text-blue-600 mb-3" />
          <h3 className="font-black text-black text-lg mb-2 font-display">Hall of Fame Members</h3>
          <p className="text-xs font-bold text-neutral-500 mb-4">Students who got acknowledged by NASA, WHO, Swiggy and more after completing this roadmap.</p>
          <div className="flex -space-x-2 mb-4">
            {["R","A","S","K","P"].map((l, i) => (
              <div key={i} className="w-8 h-8 rounded-full border-2 border-black bg-yellow-300 flex items-center justify-center text-xs font-black text-black shadow-brutal-xs">{l}</div>
            ))}
            <div className="w-8 h-8 rounded-full border-2 border-black bg-black flex items-center justify-center text-[10px] font-black text-yellow-300">+50</div>
          </div>
          <Link href="/roadmap" className="block w-full py-2.5 rounded-xl border-2 border-black bg-black text-yellow-300 text-center font-black text-xs hover:bg-neutral-800 transition-colors">
            See Roadmap →
          </Link>
        </div>
        <div className="md:col-span-2 rounded-2xl border-[3px] border-black bg-purple-50 p-6 shadow-brutal">
          <ShieldCheck className="w-6 h-6 text-purple-700 mb-3" />
          <h3 className="font-black text-black text-lg mb-2 font-display">Student Showcase Board</h3>
          <p className="text-xs font-bold text-neutral-500 mb-4">Share your first bug, first site, or first Hall of Fame acknowledgment with the community.</p>
          <a href="https://instagram.com/thatraghavarora" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl border-2 border-black bg-purple-600 text-white font-black text-sm hover:bg-purple-700 transition-colors shadow-brutal-xs">
            DM on Instagram <ArrowRight className="w-4 h-4" />
          </a>
        </div>
      </div>
    </div>
  );
}

// ─── SETTINGS TAB ────────────────────────────────
function SettingsTab() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-black text-black font-display">Settings</h2>
        <p className="text-sm font-bold text-neutral-500 mt-1">Manage your account and preferences</p>
      </div>
      <div className="max-w-2xl space-y-5">
        {/* Profile */}
        <div className="rounded-2xl border-[3px] border-black bg-white p-6 shadow-brutal">
          <h3 className="font-black text-base text-black mb-4 flex items-center gap-2"><Code2 className="w-4 h-4" />Profile</h3>
          <div className="space-y-3">
            {[
              { label: "Full Name",     placeholder: "Raghav Arora",    type: "text"  },
              { label: "Email Address", placeholder: "connect@thatraghavarora.in", type: "email" },
              { label: "Mobile Number", placeholder: "+91 XXXXX XXXXX", type: "tel"   },
            ].map(({ label, placeholder, type }) => (
              <div key={label}>
                <label className="text-[11px] font-black uppercase tracking-wider text-neutral-500 block mb-1">{label}</label>
                <input type={type} placeholder={placeholder} className="w-full px-4 py-3 rounded-xl border-2 border-black text-sm font-bold text-black placeholder:text-neutral-400 focus:outline-none focus:ring-2 focus:ring-yellow-300 bg-white shadow-brutal-xs" />
              </div>
            ))}
            <button className="mt-2 px-6 py-2.5 rounded-xl border-2 border-black bg-yellow-300 text-black font-black text-sm hover:bg-yellow-400 transition-colors shadow-brutal-xs">
              Save Changes
            </button>
          </div>
        </div>

        {/* Danger Zone */}
        <div className="rounded-2xl border-[3px] border-red-500 bg-red-50 p-6 shadow-brutal">
          <h3 className="font-black text-base text-red-700 mb-2">Danger Zone</h3>
          <p className="text-xs font-bold text-red-600 mb-4">These actions are permanent and cannot be undone.</p>
          <div className="flex flex-col sm:flex-row gap-3">
            <button className="px-5 py-2.5 rounded-xl border-2 border-red-500 bg-white text-red-600 font-black text-sm hover:bg-red-50 transition-colors">
              Reset Progress
            </button>
            <button className="px-5 py-2.5 rounded-xl border-2 border-red-500 bg-red-500 text-white font-black text-sm hover:bg-red-600 transition-colors">
              Delete Account
            </button>
          </div>
        </div>

        {/* Logout */}
        <button className="w-full py-3 rounded-xl border-2 border-black bg-black text-yellow-300 font-black text-sm hover:bg-neutral-800 transition-colors shadow-brutal-sm">
          Log Out
        </button>
      </div>
    </div>
  );
}

// ─── MAIN DASHBOARD ──────────────────────────────
export default function DashboardPage() {
  const [activeTab, setActiveTab] = useState<Tab>("home");
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const tabTitles: Record<Tab, string> = {
    home:      "Student Portal",
    courses:   "Explore Courses",
    roadmap:   "Roadmaps",
    community: "Community",
    settings:  "Settings",
  };

  return (
    <div className="flex min-h-screen bg-neutral-100">
      <Sidebar
        open={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
        active={activeTab}
        onSelect={setActiveTab}
      />

      <div className="flex-1 flex flex-col md:ml-64 min-w-0">
        {/* Header */}
        <header className="sticky top-0 z-20 h-16 bg-white border-b-[3px] border-black flex items-center px-4 sm:px-6 gap-4">
          <button
            onClick={() => setSidebarOpen(true)}
            className="md:hidden w-9 h-9 rounded-xl border-2 border-black flex items-center justify-center bg-yellow-300 shadow-brutal-xs shrink-0"
          >
            <Menu className="w-5 h-5 text-black" />
          </button>

          <div className="flex-1 min-w-0">
            <p className="font-display font-black text-lg text-black tracking-tight leading-none">{tabTitles[activeTab]}</p>
            <p className="text-[11px] font-bold text-neutral-500 leading-none mt-0.5">thatraghavarora.in</p>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <button className="relative w-9 h-9 rounded-xl border-2 border-black flex items-center justify-center bg-white shadow-brutal-xs hover:bg-neutral-50 transition-colors">
              <Bell className="w-4 h-4 text-black" />
              <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-red-500 border-2 border-white text-[9px] font-black text-white flex items-center justify-center">3</span>
            </button>
            <button
              onClick={() => setActiveTab("settings")}
              className="w-9 h-9 rounded-xl border-2 border-black overflow-hidden shadow-brutal-xs bg-yellow-300 flex items-center justify-center hover:bg-yellow-400 transition-colors cursor-pointer"
            >
              <span className="font-black text-sm text-black">R</span>
            </button>
          </div>
        </header>

        {/* Content */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8">
          {activeTab === "home"      && <HomeTab onSelect={setActiveTab} />}
          {activeTab === "courses"   && <CoursesTab />}
          {activeTab === "roadmap"   && <RoadmapTab />}
          {activeTab === "community" && <CommunityTab />}
          {activeTab === "settings"  && <SettingsTab />}
        </main>
      </div>
    </div>
  );
}
