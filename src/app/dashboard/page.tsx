"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
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
  Zap,
  Award,
  ArrowRight,
  Lock,
  Star,
  Search,
  Filter,
  ShieldCheck,
  Globe,
  Code2,
  ArrowLeft,
  Play,
  Pause,
  RotateCcw,
  Check,
  ChevronDown,
  ChevronUp,
  Sparkles,
  Bookmark,
  Volume2,
  Maximize2,
  CreditCard,
  ShoppingBag,
  X
} from "lucide-react";
import confetti from "canvas-confetti";
import { courses, Course } from "@/data/siteData";
import { roadmaps } from "@/data/roadmapData";

type Tab = "home" | "courses" | "roadmap" | "community" | "settings";

interface NavItem {
  label: string;
  shortLabel: string;
  tab: Tab;
  icon: React.ElementType;
}

const navItems: NavItem[] = [
  { label: "Home",            shortLabel: "Home",     tab: "home",      icon: Home     },
  { label: "Explore Courses", shortLabel: "Courses",  tab: "courses",   icon: BookOpen },
  { label: "Roadmap",         shortLabel: "Roadmap",  tab: "roadmap",   icon: Map      },
  { label: "Community",       shortLabel: "Community",tab: "community", icon: Users    },
  { label: "Settings",        shortLabel: "Settings", tab: "settings",  icon: Settings },
];

// ─── DESKTOP SIDEBAR ─────────────────────────────
function DesktopSidebar({
  active,
  onSelect,
}: {
  active: Tab;
  onSelect: (t: Tab) => void;
}) {
  return (
    <aside className="hidden md:flex fixed top-0 left-0 h-full w-64 bg-neutral-950 border-r-[3px] border-black z-30 flex-col">
      {/* Logo */}
      <div className="h-16 flex items-center px-5 border-b-[3px] border-black shrink-0">
        <Link href="/" className="flex items-center gap-2 group">
          <span className="bg-yellow-300 text-black px-2 py-0.5 rounded-md font-mono text-sm font-black group-hover:bg-yellow-400 transition-colors">
            &lt;/&gt;
          </span>
          <span className="font-black text-base text-white tracking-tight">
            thatraghavarora
          </span>
        </Link>
      </div>

      {/* Nav */}
      <nav className="flex-1 px-3 py-5 space-y-1.5 overflow-y-auto">
        <p className="text-[10px] font-black uppercase tracking-widest text-neutral-500 px-3 mb-3">
          Main Menu
        </p>
        {navItems.map(({ label, tab, icon: Icon }) => {
          const isActive = active === tab;
          return (
            <button
              key={tab}
              onClick={() => onSelect(tab)}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl font-black text-sm transition-all group text-left
                ${
                  isActive
                    ? "bg-yellow-300 text-black shadow-brutal-xs"
                    : "text-neutral-400 hover:bg-white/5 hover:text-white"
                }`}
            >
              <Icon
                className={`w-4 h-4 shrink-0 ${
                  isActive ? "text-black" : "text-neutral-500 group-hover:text-white"
                }`}
              />
              <span>{label}</span>
              {isActive && <ChevronRight className="w-3.5 h-3.5 ml-auto text-black" />}
            </button>
          );
        })}
      </nav>

      {/* Upgrade CTA */}
      <div className="m-3 p-4 rounded-2xl border-2 border-yellow-300/30 bg-yellow-300/10 mb-5">
        <p className="font-black text-xs text-yellow-300 mb-1">🔓 Unlock More</p>
        <p className="text-[11px] font-bold text-neutral-400 leading-snug mb-3">
          Access premium roadmaps and 1:1 live guidance
        </p>
        <button
          onClick={() => onSelect("roadmap")}
          className="block w-full py-2 rounded-xl border-2 border-yellow-300 bg-yellow-300 text-black text-center font-black text-xs hover:bg-yellow-400 transition-colors shadow-brutal-xs"
        >
          Explore Roadmaps
        </button>
      </div>
    </aside>
  );
}

// ─── MOBILE BOTTOM NAVBAR ────────────────────────
function MobileBottomNav({
  active,
  onSelect,
}: {
  active: Tab;
  onSelect: (t: Tab) => void;
}) {
  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-white border-t-[3px] border-black px-2 py-2 flex items-center justify-around shadow-brutal">
      {navItems.map(({ label, shortLabel, tab, icon: Icon }) => {
        const isActive = active === tab;
        return (
          <button
            key={tab}
            onClick={() => onSelect(tab)}
            className={`flex flex-col items-center justify-center py-1.5 px-3 rounded-xl transition-all ${
              isActive
                ? "bg-yellow-300 text-black border-2 border-black shadow-brutal-xs font-black scale-105"
                : "text-neutral-600 hover:text-black font-bold"
            }`}
            title={label}
          >
            <Icon className="w-5 h-5 mb-0.5" />
            <span className="text-[10px] leading-none tracking-tight">{shortLabel}</span>
          </button>
        );
      })}
    </nav>
  );
}

// ─── PURCHASE COURSE MODAL ───────────────────────
function CoursePurchaseModal({
  course,
  onClose,
  onUnlockSuccess,
}: {
  course: Course;
  onClose: () => void;
  onUnlockSuccess: () => void;
}) {
  const priceDisplay =
    typeof course.price === "number" ? `₹${course.price} INR` : `${course.price}`;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ backgroundColor: "rgba(0,0,0,0.78)" }}
    >
      <div className="w-full max-w-md rounded-3xl border-[3.5px] border-black bg-white p-6 sm:p-7 shadow-brutal-xl relative max-h-[92vh] overflow-y-auto">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-8 h-8 rounded-full border-2 border-black flex items-center justify-center hover:bg-neutral-100 font-black text-sm transition-colors"
        >
          <X className="w-4 h-4" />
        </button>

        <div className="flex items-center gap-2.5 mb-1.5">
          <Zap className="w-6 h-6 text-yellow-500 fill-yellow-400" />
          <h3 className="text-xl font-black font-display text-black">
            Unlock Full Course Access
          </h3>
        </div>
        <p className="text-xs font-bold text-neutral-600 mb-5">{course.title}</p>

        {/* Price Card */}
        <div className="p-4 rounded-2xl border-2 border-black bg-yellow-300 mb-5 shadow-brutal-xs">
          <p className="text-[11px] font-black uppercase tracking-wider text-black">
            Lifetime Enrollment
          </p>
          <div className="flex items-baseline gap-2 mt-0.5">
            <span className="text-3xl font-black text-black font-display">
              {priceDisplay}
            </span>
            {course.originalPrice && (
              <span className="text-xs font-bold text-neutral-700 line-through">
                ₹{course.originalPrice}
              </span>
            )}
          </div>
          <p className="text-[11px] font-bold text-neutral-800 mt-1">
            Includes all modules, code files, Discord access & completion certificate
          </p>
        </div>

        {/* Payment Options */}
        <div className="space-y-3.5 mb-5">
          <div className="p-3.5 rounded-2xl border-2 border-black bg-neutral-50">
            <p className="font-black text-xs text-black mb-1">Option 1 — UPI (Instant Pay)</p>
            <p className="text-sm font-black font-mono text-purple-800 mb-1">
              connect@thatraghavarora.in
            </p>
            <p className="text-[10px] font-bold text-neutral-600">
              Pay using Google Pay, PhonePe, Paytm or any UPI app.
            </p>
          </div>

          <div className="p-3.5 rounded-2xl border-2 border-black bg-blue-50">
            <p className="font-black text-xs text-black mb-1">
              Option 2 — PayPal (International)
            </p>
            <a
              href="https://paypal.me/raghavarora"
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs font-bold text-blue-700 underline font-mono"
            >
              paypal.me/raghavarora ($10 USD)
            </a>
          </div>
        </div>

        <a
          href="https://instagram.com/thatraghavarora"
          target="_blank"
          rel="noopener noreferrer"
          className="block w-full py-2.5 rounded-xl border-2 border-black bg-purple-600 hover:bg-purple-700 text-white text-center font-black text-xs transition-colors shadow-brutal-xs mb-3"
        >
          Send Payment Proof on Instagram DM
        </a>

        <div className="pt-3 border-t-2 border-neutral-200">
          <p className="text-[10px] text-center font-bold text-neutral-500 mb-2">
            Paid or activating demo access?
          </p>
          <button
            onClick={onUnlockSuccess}
            className="w-full py-3 rounded-xl border-2 border-black bg-emerald-400 hover:bg-emerald-500 text-black font-black text-xs uppercase tracking-wider transition-colors shadow-brutal-xs flex items-center justify-center gap-1.5"
          >
            <Check className="w-4 h-4" />
            <span>Confirm & Unlock Course Now</span>
          </button>
        </div>
      </div>
    </div>
  );
}

// ─── IN-DASHBOARD COURSE VIEWER ──────────────────
function DashboardCourseViewer({
  course,
  isPurchased,
  onBack,
  onRequestBuy,
}: {
  course: Course;
  isPurchased: boolean;
  onBack: () => void;
  onRequestBuy: () => void;
}) {
  const firstLecture = course.curriculum[0]?.lectures[0] || {
    title: "Course Overview & Introduction",
    duration: "10:00",
    freePreview: true,
  };

  const [activeSectionIdx, setActiveSectionIdx] = useState(0);
  const [activeLectureIdx, setActiveLectureIdx] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [completedLectures, setCompletedLectures] = useState<string[]>([]);
  const [expandedSections, setExpandedSections] = useState<Record<number, boolean>>({
    0: true,
    1: true,
  });
  const [activeTab, setActiveTab] = useState<"syllabus" | "overview" | "faqs">("syllabus");

  const currentSection = course.curriculum[activeSectionIdx] || course.curriculum[0];
  const currentLecture =
    currentSection?.lectures[activeLectureIdx] || firstLecture;

  const isLectureAccessible = isPurchased || Boolean(currentLecture.freePreview);

  const toggleSection = (idx: number) => {
    setExpandedSections((prev) => ({ ...prev, [idx]: !prev[idx] }));
  };

  const toggleComplete = (title: string) => {
    if (!isPurchased) {
      onRequestBuy();
      return;
    }
    setCompletedLectures((prev) =>
      prev.includes(title) ? prev.filter((t) => t !== title) : [...prev, title]
    );
  };

  const totalLecturesCount = course.curriculum.reduce(
    (acc, sec) => acc + sec.lectures.length,
    0
  );
  const progressPercent = Math.min(
    100,
    Math.round((completedLectures.length / Math.max(1, totalLecturesCount)) * 100)
  );

  const handleNextLecture = () => {
    if (currentSection && activeLectureIdx < currentSection.lectures.length - 1) {
      const nextIdx = activeLectureIdx + 1;
      const nextLec = currentSection.lectures[nextIdx];
      if (!isPurchased && !nextLec.freePreview) {
        onRequestBuy();
        return;
      }
      setActiveLectureIdx(nextIdx);
    } else if (activeSectionIdx < course.curriculum.length - 1) {
      const nextSecIdx = activeSectionIdx + 1;
      const nextLec = course.curriculum[nextSecIdx]?.lectures[0];
      if (!isPurchased && !nextLec?.freePreview) {
        onRequestBuy();
        return;
      }
      setActiveSectionIdx(nextSecIdx);
      setActiveLectureIdx(0);
      setExpandedSections((prev) => ({ ...prev, [nextSecIdx]: true }));
    }
  };

  const handlePrevLecture = () => {
    if (activeLectureIdx > 0) {
      setActiveLectureIdx(activeLectureIdx - 1);
    } else if (activeSectionIdx > 0) {
      const prevSec = activeSectionIdx - 1;
      setActiveSectionIdx(prevSec);
      setActiveLectureIdx(course.curriculum[prevSec].lectures.length - 1);
    }
  };

  const priceFormatted =
    typeof course.price === "number" ? `₹${course.price}` : `${course.price}`;

  return (
    <div className="space-y-6">
      {/* Top Bar with Back Button */}
      <div className="flex flex-wrap items-center justify-between gap-4 pb-2 border-b-2 border-neutral-200">
        <button
          onClick={onBack}
          className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl border-2 border-black bg-white hover:bg-neutral-100 text-black font-black text-xs transition-all shadow-brutal-xs"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to All Courses</span>
        </button>

        <div className="flex flex-wrap items-center gap-2">
          {isPurchased ? (
            <span className="px-3 py-1 rounded-full border-2 border-black bg-emerald-300 text-black font-black text-[11px] uppercase tracking-wider shadow-brutal-xs flex items-center gap-1">
              <Check className="w-3.5 h-3.5" /> Enrolled Student
            </span>
          ) : (
            <button
              onClick={onRequestBuy}
              className="px-3.5 py-1.5 rounded-full border-2 border-black bg-yellow-300 hover:bg-yellow-400 text-black font-black text-xs uppercase tracking-wider shadow-brutal-xs flex items-center gap-1.5"
            >
              <Zap className="w-3.5 h-3.5 fill-black" />
              <span>Buy Course · {priceFormatted}</span>
            </button>
          )}

          <span className="px-2.5 py-1 rounded-full border border-black bg-purple-200 text-purple-900 font-black text-[10px] uppercase">
            {course.category}
          </span>
          <span className="px-2.5 py-1 rounded-full border border-black bg-yellow-300 text-black font-black text-[10px] uppercase">
            {course.level}
          </span>
        </div>
      </div>

      {/* Main Grid: Player + Syllabus */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Player & Overview (8 cols) */}
        <div className="lg:col-span-8 space-y-6">
          {/* Video Player Box */}
          <div className="rounded-3xl border-[3px] border-black bg-neutral-950 overflow-hidden shadow-brutal-xl">
            {/* Player Top Info */}
            <div className="px-4 sm:px-6 py-3 border-b-2 border-neutral-800 bg-neutral-900 flex items-center justify-between gap-3 text-xs">
              <div className="flex items-center gap-2 min-w-0">
                <span className={`w-2.5 h-2.5 rounded-full ${isLectureAccessible ? "bg-red-500 animate-pulse" : "bg-neutral-500"} shrink-0`} />
                <span className="font-mono text-neutral-400 truncate">
                  {currentSection?.sectionTitle || "Module"}
                </span>
              </div>
              <div className="flex items-center gap-2 shrink-0">
                {!isPurchased && currentLecture.freePreview && (
                  <span className="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-400/40 font-mono text-[10px] font-bold">
                    Free Preview
                  </span>
                )}
                <span className="px-2 py-0.5 rounded bg-yellow-300/20 text-yellow-300 font-mono text-[11px] font-bold">
                  {currentLecture.duration}
                </span>
              </div>
            </div>

            {/* Video Screen / Locked Screen */}
            <div className="relative aspect-video w-full bg-neutral-900 flex flex-col items-center justify-center p-6 text-center select-none overflow-hidden">
              <div
                className="absolute inset-0 opacity-10 pointer-events-none"
                style={{
                  backgroundImage:
                    "linear-gradient(#fff 1px,transparent 1px),linear-gradient(90deg,#fff 1px,transparent 1px)",
                  backgroundSize: "28px 28px",
                }}
              />

              {isLectureAccessible ? (
                <>
                  <div className="absolute top-4 left-4 font-mono text-[11px] text-yellow-400/70 text-left hidden sm:block">
                    <span>[STUDENT_VIEW::HD_1080P]</span>
                    <br />
                    <span className="text-neutral-500">
                      LESSON {activeLectureIdx + 1} / {currentSection?.lectures.length || 1}
                    </span>
                  </div>

                  <button
                    onClick={() => setIsPlaying(!isPlaying)}
                    className="relative z-10 w-20 h-20 rounded-full border-[3px] border-black bg-yellow-300 hover:bg-yellow-400 text-black flex items-center justify-center shadow-brutal transition-transform hover:scale-105 active:scale-95 cursor-pointer"
                    title={isPlaying ? "Pause" : "Play"}
                  >
                    {isPlaying ? (
                      <Pause className="w-9 h-9 fill-black text-black" />
                    ) : (
                      <Play className="w-9 h-9 fill-black text-black ml-1" />
                    )}
                  </button>

                  <p className="relative z-10 font-display font-black text-white text-base sm:text-lg mt-4 max-w-lg leading-snug px-2">
                    {currentLecture.title}
                  </p>

                  {isPlaying && (
                    <div className="relative z-10 mt-2 inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/20 border border-emerald-400 text-emerald-300 text-xs font-mono font-bold animate-pulse">
                      <span>● Playing Lecture Stream</span>
                    </div>
                  )}

                  {/* Player Bottom Bar Controls */}
                  <div className="absolute bottom-0 left-0 right-0 p-3 sm:p-4 bg-gradient-to-t from-black via-black/80 to-transparent flex items-center justify-between gap-3 text-white text-xs">
                    <div className="flex items-center gap-3">
                      <button
                        onClick={() => setIsPlaying(!isPlaying)}
                        className="hover:text-yellow-300 transition-colors"
                      >
                        {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                      </button>
                      <Volume2 className="w-4 h-4 text-neutral-400 hidden sm:block" />
                      <span className="font-mono text-[11px] text-neutral-300">
                        {isPlaying ? "04:12" : "00:00"} / {currentLecture.duration}
                      </span>
                    </div>

                    <div className="flex-1 mx-2 h-1.5 rounded-full bg-neutral-700 overflow-hidden cursor-pointer">
                      <div
                        className="h-full bg-yellow-400 transition-all"
                        style={{ width: isPlaying ? "35%" : "5%" }}
                      />
                    </div>

                    <div className="flex items-center gap-2">
                      <span className="text-[10px] font-mono bg-neutral-800 px-1.5 py-0.5 rounded text-neutral-300">
                        1.0x
                      </span>
                      <Maximize2 className="w-4 h-4 text-neutral-400" />
                    </div>
                  </div>
                </>
              ) : (
                /* LOCKED SCREEN FOR UNPAID USERS */
                <div className="relative z-10 flex flex-col items-center justify-center max-w-md px-4">
                  <div className="w-16 h-16 rounded-2xl border-2 border-yellow-300 bg-yellow-300/10 text-yellow-300 flex items-center justify-center mb-4">
                    <Lock className="w-8 h-8 text-yellow-300" />
                  </div>
                  <h4 className="font-display font-black text-xl text-white mb-2">
                    This Lecture is Locked
                  </h4>
                  <p className="text-xs font-bold text-neutral-400 leading-relaxed mb-5">
                    Buy <span className="text-white font-black">{course.title}</span> to
                    unlock this lecture, exercises, source code, and full certification.
                  </p>
                  <button
                    onClick={onRequestBuy}
                    className="px-6 py-3 rounded-xl border-2 border-yellow-300 bg-yellow-300 hover:bg-yellow-400 text-black font-black text-sm transition-all shadow-brutal-sm flex items-center gap-2"
                  >
                    <Zap className="w-4 h-4 fill-black" />
                    <span>Buy Course to Unlock ({priceFormatted})</span>
                  </button>
                </div>
              )}
            </div>

            {/* Lesson Control Footer */}
            <div className="p-4 sm:p-5 bg-white border-t-[3px] border-black flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
              <div>
                <span className="text-[10px] font-black uppercase text-neutral-500 tracking-wider">
                  Current Lesson
                </span>
                <h4 className="font-display font-black text-sm sm:text-base text-black">
                  {currentLecture.title}
                </h4>
              </div>

              <div className="flex items-center gap-2 w-full sm:w-auto">
                {isPurchased ? (
                  <button
                    onClick={() => toggleComplete(currentLecture.title)}
                    className={`flex-1 sm:flex-none px-3.5 py-2 rounded-xl border-2 border-black text-xs font-black flex items-center justify-center gap-1.5 transition-all shadow-brutal-xs ${
                      completedLectures.includes(currentLecture.title)
                        ? "bg-emerald-400 text-black"
                        : "bg-neutral-100 text-black hover:bg-neutral-200"
                    }`}
                  >
                    <Check className="w-3.5 h-3.5" />
                    {completedLectures.includes(currentLecture.title)
                      ? "Completed"
                      : "Mark Complete"}
                  </button>
                ) : (
                  <button
                    onClick={onRequestBuy}
                    className="flex-1 sm:flex-none px-3.5 py-2 rounded-xl border-2 border-black bg-yellow-300 hover:bg-yellow-400 text-black text-xs font-black flex items-center justify-center gap-1.5 transition-all shadow-brutal-xs"
                  >
                    <Lock className="w-3.5 h-3.5" />
                    <span>Buy to Track Progress</span>
                  </button>
                )}

                <div className="flex items-center gap-1">
                  <button
                    onClick={handlePrevLecture}
                    disabled={activeSectionIdx === 0 && activeLectureIdx === 0}
                    className="px-3 py-2 rounded-xl border-2 border-black bg-white hover:bg-neutral-100 text-black font-black text-xs disabled:opacity-40 transition-all shadow-brutal-xs"
                    title="Previous Lesson"
                  >
                    ←
                  </button>
                  <button
                    onClick={handleNextLecture}
                    className="px-3 py-2 rounded-xl border-2 border-black bg-yellow-300 hover:bg-yellow-400 text-black font-black text-xs transition-all shadow-brutal-xs flex items-center gap-1"
                    title="Next Lesson"
                  >
                    <span>Next</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Sub Navigation Tabs */}
          <div className="flex border-b-2 border-neutral-300 gap-2">
            {[
              { id: "syllabus", label: "Overview & Objectives" },
              { id: "overview", label: "What You Will Learn" },
              { id: "faqs",     label: "FAQs" },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`px-4 py-2.5 font-display font-black text-xs sm:text-sm border-b-2 -mb-[2px] transition-all ${
                  activeTab === tab.id
                    ? "border-black text-black bg-yellow-300/30 rounded-t-lg"
                    : "border-transparent text-neutral-500 hover:text-black"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Tab 1: Overview */}
          {activeTab === "syllabus" && (
            <div className="rounded-2xl border-[3px] border-black bg-white p-6 shadow-brutal space-y-4">
              <h3 className="font-display font-black text-xl text-black">
                {course.title}
              </h3>
              <p className="text-sm font-bold text-neutral-700 leading-relaxed">
                {course.subtitle}
              </p>
              <p className="text-xs font-bold text-neutral-600 leading-relaxed">
                {course.description}
              </p>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-3 border-t-2 border-neutral-200">
                <div className="p-3 rounded-xl border-2 border-black bg-neutral-50">
                  <p className="text-[10px] font-black uppercase text-neutral-500">Duration</p>
                  <p className="font-display font-black text-sm text-black">{course.duration}</p>
                </div>
                <div className="p-3 rounded-xl border-2 border-black bg-neutral-50">
                  <p className="text-[10px] font-black uppercase text-neutral-500">Lectures</p>
                  <p className="font-display font-black text-sm text-black">
                    {totalLecturesCount} Lessons
                  </p>
                </div>
                <div className="p-3 rounded-xl border-2 border-black bg-neutral-50">
                  <p className="text-[10px] font-black uppercase text-neutral-500">Level</p>
                  <p className="font-display font-black text-sm text-black">{course.level}</p>
                </div>
                <div className="p-3 rounded-xl border-2 border-black bg-neutral-50">
                  <p className="text-[10px] font-black uppercase text-neutral-500">Price</p>
                  <p className="font-display font-black text-sm text-purple-700">
                    {priceFormatted}
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Tab 2: What You Will Learn */}
          {activeTab === "overview" && (
            <div className="rounded-2xl border-[3px] border-black bg-white p-6 shadow-brutal space-y-4">
              <h3 className="font-display font-black text-lg text-black">
                What You Will Master in this Course
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                {course.whatYouWillLearn.map((item, i) => (
                  <div
                    key={i}
                    className="flex items-start gap-2.5 p-3 rounded-xl border-2 border-black bg-neutral-50"
                  >
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span className="text-xs font-bold text-neutral-800 leading-snug">
                      {item}
                    </span>
                  </div>
                ))}
              </div>

              {course.requirements && course.requirements.length > 0 && (
                <div className="pt-4 border-t-2 border-neutral-200">
                  <h4 className="font-display font-black text-sm text-black mb-2">
                    Prerequisites & Requirements
                  </h4>
                  <ul className="space-y-1.5">
                    {course.requirements.map((req, i) => (
                      <li
                        key={i}
                        className="text-xs font-bold text-neutral-600 flex items-center gap-2"
                      >
                        <span className="w-1.5 h-1.5 rounded-full bg-black shrink-0" />
                        {req}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          )}

          {/* Tab 3: FAQs */}
          {activeTab === "faqs" && (
            <div className="rounded-2xl border-[3px] border-black bg-white p-6 shadow-brutal space-y-3">
              <h3 className="font-display font-black text-lg text-black mb-2">
                Frequently Asked Questions
              </h3>
              {course.faqs?.map((faq, i) => (
                <div
                  key={i}
                  className="p-3.5 rounded-xl border-2 border-black bg-neutral-50 space-y-1.5"
                >
                  <p className="font-black text-xs text-black">{faq.question}</p>
                  <p className="text-[11px] font-bold text-neutral-600">{faq.answer}</p>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Right Column: Progress (if purchased) OR Buy CTA (if not purchased) */}
        <div className="lg:col-span-4 space-y-5">
          {/* ONLY SHOW PROGRESS IF USER HAS PURCHASED */}
          {isPurchased ? (
            <div className="rounded-2xl border-[3px] border-black bg-white p-5 shadow-brutal">
              <div className="flex items-center justify-between mb-2">
                <span className="font-display font-black text-sm text-black">
                  Course Progress
                </span>
                <span className="font-mono font-black text-xs text-black">
                  {progressPercent}%
                </span>
              </div>
              <div className="w-full h-3 rounded-full border-2 border-black bg-neutral-100 overflow-hidden mb-2">
                <div
                  className="h-full bg-yellow-300 border-r-2 border-black transition-all duration-300"
                  style={{ width: `${progressPercent}%` }}
                />
              </div>
              <p className="text-[11px] font-bold text-neutral-500">
                {completedLectures.length} of {totalLecturesCount} lessons completed
              </p>
            </div>
          ) : (
            /* PROMINENT BUY CARD IF NOT PURCHASED */
            <div className="rounded-2xl border-[3px] border-black bg-yellow-300 p-5 shadow-brutal space-y-3">
              <div className="flex items-center gap-2">
                <ShoppingBag className="w-5 h-5 text-black" />
                <span className="font-black text-xs uppercase tracking-wider text-black">
                  Unlock Full Course
                </span>
              </div>
              <h4 className="font-display font-black text-xl text-black">
                {priceFormatted}
              </h4>
              <p className="text-xs font-bold text-neutral-800 leading-snug">
                You haven&apos;t purchased this course yet. Buy now to unlock all video lectures, downloads, and live session access.
              </p>
              <button
                onClick={onRequestBuy}
                className="w-full py-3 rounded-xl border-2 border-black bg-black text-yellow-300 font-black text-xs uppercase tracking-wider hover:bg-neutral-800 transition-colors shadow-brutal-xs flex items-center justify-center gap-2"
              >
                <Zap className="w-4 h-4 fill-yellow-300" />
                <span>Buy & Unlock Course</span>
              </button>
            </div>
          )}

          {/* Course Curriculum Accordion */}
          <div className="rounded-2xl border-[3px] border-black bg-white overflow-hidden shadow-brutal">
            <div className="p-4 border-b-2 border-black bg-neutral-950 text-white flex items-center justify-between">
              <div className="flex items-center gap-2">
                <BookOpen className="w-4 h-4 text-yellow-300" />
                <h3 className="font-display font-black text-sm">Curriculum Syllabus</h3>
              </div>
              <span className="text-[11px] font-mono text-neutral-400">
                {course.curriculum.length} Modules
              </span>
            </div>

            <div className="divide-y-2 divide-neutral-200 max-h-[500px] overflow-y-auto">
              {course.curriculum.map((section, sIdx) => {
                const isExpanded = expandedSections[sIdx] ?? false;
                return (
                  <div key={sIdx} className="bg-white">
                    <button
                      onClick={() => toggleSection(sIdx)}
                      className="w-full p-3.5 flex items-center justify-between gap-2 text-left hover:bg-neutral-50 transition-colors"
                    >
                      <div className="min-w-0 flex-1">
                        <p className="font-display font-black text-xs text-black leading-snug">
                          {section.sectionTitle}
                        </p>
                        <p className="text-[10px] font-bold text-neutral-500 mt-0.5">
                          {section.lectures.length} lessons
                        </p>
                      </div>
                      {isExpanded ? (
                        <ChevronUp className="w-4 h-4 text-neutral-500 shrink-0" />
                      ) : (
                        <ChevronDown className="w-4 h-4 text-neutral-500 shrink-0" />
                      )}
                    </button>

                    {isExpanded && (
                      <div className="bg-neutral-50 border-t border-neutral-200 divide-y divide-neutral-200">
                        {section.lectures.map((lec, lIdx) => {
                          const isCurrent =
                            activeSectionIdx === sIdx && activeLectureIdx === lIdx;
                          const isDone = completedLectures.includes(lec.title);
                          const canPlay = isPurchased || Boolean(lec.freePreview);

                          return (
                            <button
                              key={lIdx}
                              onClick={() => {
                                if (!canPlay) {
                                  onRequestBuy();
                                  return;
                                }
                                setActiveSectionIdx(sIdx);
                                setActiveLectureIdx(lIdx);
                                setIsPlaying(true);
                              }}
                              className={`w-full p-3 text-left flex items-start gap-2.5 transition-all ${
                                isCurrent
                                  ? "bg-yellow-300/40 border-l-4 border-black"
                                  : "hover:bg-neutral-100"
                              }`}
                            >
                              <div className="mt-0.5 shrink-0">
                                {isDone ? (
                                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                                ) : canPlay ? (
                                  isCurrent ? (
                                    <PlayCircle className="w-4 h-4 text-black animate-pulse" />
                                  ) : (
                                    <Play className="w-3.5 h-3.5 text-neutral-400" />
                                  )
                                ) : (
                                  <Lock className="w-3.5 h-3.5 text-neutral-400" />
                                )}
                              </div>
                              <div className="flex-1 min-w-0">
                                <p
                                  className={`text-xs leading-snug truncate ${
                                    isCurrent
                                      ? "font-black text-black"
                                      : "font-bold text-neutral-700"
                                  }`}
                                >
                                  {lec.title}
                                </p>
                                <div className="flex items-center gap-2 mt-0.5">
                                  <span className="text-[10px] font-mono text-neutral-500">
                                    {lec.duration}
                                  </span>
                                  {!isPurchased && lec.freePreview && (
                                    <span className="text-[9px] font-black uppercase text-emerald-600 bg-emerald-100 px-1.5 py-0.2 rounded border border-emerald-300">
                                      Preview
                                    </span>
                                  )}
                                  {!isPurchased && !lec.freePreview && (
                                    <span className="text-[9px] font-black uppercase text-neutral-500 bg-neutral-200 px-1.5 py-0.2 rounded">
                                      Locked
                                    </span>
                                  )}
                                </div>
                              </div>
                            </button>
                          );
                        })}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Instructor Card */}
          <div className="rounded-2xl border-[3px] border-black bg-white p-5 shadow-brutal">
            <span className="text-[10px] font-black uppercase text-neutral-500 tracking-wider block mb-2">
              Instructor
            </span>
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl border-2 border-black bg-yellow-300 flex items-center justify-center font-black text-black text-lg shadow-brutal-xs shrink-0">
                RA
              </div>
              <div className="min-w-0">
                <h4 className="font-display font-black text-sm text-black">
                  {course.instructor.name}
                </h4>
                <p className="text-[11px] font-bold text-neutral-500 truncate">
                  {course.instructor.role}
                </p>
              </div>
            </div>
            <p className="text-xs font-bold text-neutral-600 mt-3 leading-relaxed">
              {course.instructor.bio}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── HOME TAB ────────────────────────────────────
function HomeTab({
  purchasedCourseSlugs,
  onSelectTab,
  onSelectCourse,
  onRequestBuyCourse,
}: {
  purchasedCourseSlugs: string[];
  onSelectTab: (t: Tab) => void;
  onSelectCourse: (c: Course) => void;
  onRequestBuyCourse: (c: Course) => void;
}) {
  // ONLY real purchased courses are enrolled!
  const enrolled = courses.filter((c) => purchasedCourseSlugs.includes(c.slug));

  const stats = [
    {
      label: "Courses Enrolled",
      value: enrolled.length.toString(),
      icon: BookOpen,
      bg: "bg-purple-100",
      text: "text-purple-700",
      border: "border-purple-300",
    },
    {
      label: "Hours Watched",
      value: enrolled.length > 0 ? `${enrolled.length * 4.5}h` : "0h",
      icon: Clock,
      bg: "bg-blue-100",
      text: "text-blue-700",
      border: "border-blue-300",
    },
    {
      label: "Lessons Done",
      value: enrolled.length > 0 ? `${enrolled.length * 5}` : "0",
      icon: CheckCircle2,
      bg: "bg-emerald-100",
      text: "text-emerald-700",
      border: "border-emerald-300",
    },
    {
      label: "Day Streak",
      value: "1 🔥",
      icon: Flame,
      bg: "bg-amber-100",
      text: "text-amber-700",
      border: "border-amber-300",
    },
  ];

  return (
    <div className="space-y-8">
      {/* Banner */}
      <div className="rounded-3xl border-[3px] border-black bg-neutral-950 p-6 sm:p-8 shadow-brutal-xl relative overflow-hidden">
        <div
          className="absolute inset-0 opacity-[0.04] pointer-events-none"
          style={{
            backgroundImage:
              "linear-gradient(#fff 1px,transparent 1px),linear-gradient(90deg,#fff 1px,transparent 1px)",
            backgroundSize: "30px 30px",
          }}
        />
        <div className="relative z-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-5">
          <div>
            <span className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full border border-yellow-300/40 bg-yellow-300/10 text-yellow-300 text-[11px] font-black uppercase tracking-wider mb-3">
              <Zap className="w-3 h-3" /> Student Portal
            </span>
            <h1 className="text-2xl sm:text-3xl font-black text-white font-display tracking-tight">
              {enrolled.length > 0
                ? "Keep Going, You're Doing Great!"
                : "Welcome to Your Learning Portal!"}
            </h1>
            <p className="text-sm font-bold text-neutral-400 mt-1">
              {enrolled.length > 0 ? (
                <>
                  You have <span className="text-yellow-300">{enrolled.length} active course(s)</span>. Pick up where you left off.
                </>
              ) : (
                "Enroll in your first course to begin your cybersecurity & developer journey."
              )}
            </p>
          </div>
          <button
            onClick={() => onSelectTab("courses")}
            className="shrink-0 inline-flex items-center gap-2 px-5 py-3 rounded-xl border-2 border-yellow-300 bg-yellow-300 text-black font-black text-sm hover:bg-yellow-400 transition-all shadow-brutal-sm whitespace-nowrap"
          >
            <BookOpen className="w-4 h-4" /> Explore Courses
          </button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 xl:grid-cols-4 gap-4">
        {stats.map(({ label, value, icon: Icon, bg, text, border }) => (
          <div
            key={label}
            className="rounded-2xl border-[3px] border-black bg-white p-4 sm:p-5 shadow-brutal hover:-translate-y-0.5 hover:shadow-brutal-xl transition-all"
          >
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
        {/* Continue Learning OR Buy Empty State */}
        <div className="lg:col-span-8 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-black text-black font-display">Continue Learning</h2>
            <button
              onClick={() => onSelectTab("courses")}
              className="text-xs font-black text-purple-700 flex items-center gap-1 hover:underline"
            >
              Browse All Courses <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {enrolled.length > 0 ? (
            /* IF USER HAS PURCHASED COURSES */
            enrolled.map((c) => (
              <div
                key={c.slug}
                className="rounded-2xl border-[3px] border-black bg-white p-5 shadow-brutal hover:-translate-y-0.5 transition-all flex flex-col sm:flex-row gap-4"
              >
                <div className="relative w-full sm:w-36 aspect-video rounded-xl overflow-hidden border-2 border-black shrink-0">
                  <Image src={c.thumbnail} alt={c.title} fill className="object-cover" />
                </div>
                <div className="flex-1 min-w-0">
                  <span className="text-[10px] font-black uppercase tracking-wider text-purple-700">
                    {c.category}
                  </span>
                  <h3 className="font-display font-black text-sm sm:text-base text-black mt-0.5 leading-snug">
                    {c.title}
                  </h3>
                  <div className="flex items-center gap-3 my-2.5">
                    <div className="flex-1 h-2 rounded-full border border-black bg-neutral-100 overflow-hidden">
                      <div className="h-full bg-yellow-300 transition-all" style={{ width: "25%" }} />
                    </div>
                    <span className="text-[11px] font-black text-black shrink-0">25%</span>
                  </div>
                  <button
                    onClick={() => {
                      onSelectCourse(c);
                      onSelectTab("courses");
                    }}
                    className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg border-2 border-black bg-black text-yellow-300 text-xs font-black hover:bg-neutral-800 transition-colors shadow-brutal-xs"
                  >
                    Resume <PlayCircle className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))
          ) : (
            /* IF USER HAS NOT BOUGHT ANY COURSE YET */
            <div className="rounded-2xl border-[3px] border-black bg-white p-6 sm:p-8 shadow-brutal text-center space-y-4">
              <div className="w-14 h-14 rounded-2xl border-[2.5px] border-black bg-yellow-300 flex items-center justify-center mx-auto shadow-brutal-xs">
                <ShoppingBag className="w-7 h-7 text-black" />
              </div>
              <div>
                <h3 className="font-display font-black text-lg sm:text-xl text-black">
                  No Courses Purchased Yet
                </h3>
                <p className="text-xs sm:text-sm font-bold text-neutral-600 max-w-md mx-auto mt-1 leading-relaxed">
                  Progress tracking unlocks once you enroll in a course. Explore our hand-crafted, industry-oriented cybersecurity and engineering courses below!
                </p>
              </div>
              <button
                onClick={() => onSelectTab("courses")}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl border-2 border-black bg-yellow-300 hover:bg-yellow-400 text-black font-black text-xs uppercase tracking-wider shadow-brutal transition-transform hover:-translate-y-0.5"
              >
                <Zap className="w-4 h-4 fill-black" />
                <span>Explore Courses & Enroll</span>
              </button>
            </div>
          )}
        </div>

        {/* Right panel */}
        <div className="lg:col-span-4 space-y-4">
          <div className="rounded-2xl border-[3px] border-black bg-neutral-950 p-5 shadow-brutal">
            <div className="flex items-center gap-2 mb-3">
              <span className="w-2 h-2 rounded-full bg-red-500 animate-ping shrink-0" />
              <span className="font-black text-[11px] uppercase tracking-wider text-red-400">
                Live Soon
              </span>
            </div>
            <h3 className="font-display font-black text-sm text-white mb-1">
              Bug Bounty Live Walkthrough
            </h3>
            <p className="text-[11px] font-bold text-neutral-400 mb-4">
              Saturday 7:00 PM IST · Discord · Bring your recon questions!
            </p>
            <button
              onClick={() => onSelectTab("community")}
              className="block w-full py-2.5 rounded-xl border-2 border-yellow-300 bg-yellow-300 text-black text-center font-black text-xs hover:bg-yellow-400 transition-colors shadow-brutal-xs"
            >
              Join Community
            </button>
          </div>
          <div className="rounded-2xl border-[3px] border-black bg-white p-5 shadow-brutal">
            <div className="flex items-center gap-2 mb-3">
              <Award className="w-4 h-4 text-amber-600" />
              <h3 className="font-display font-black text-sm text-black">Earned Badges</h3>
            </div>
            <div className="space-y-2.5">
              {[
                { emoji: "⚡", name: "Fast Learner", desc: "10 lessons in 48h", bg: "bg-yellow-100 border-yellow-300" },
                { emoji: "🛡️", name: "XSS Hunter",  desc: "Finished Web App Module", bg: "bg-purple-100 border-purple-300" },
                { emoji: "🔥", name: "Streak King",  desc: "5-day learning streak", bg: "bg-red-100 border-red-300" },
              ].map(({ emoji, name, desc, bg }) => (
                <div key={name} className={`flex items-center gap-3 p-2.5 rounded-xl border-2 ${bg}`}>
                  <div className="w-8 h-8 rounded-lg border border-black bg-white flex items-center justify-center text-sm shrink-0">
                    {emoji}
                  </div>
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
    </div>
  );
}

// ─── COURSES TAB (IN-DASHBOARD EXPLORER) ──────────
function CoursesTab({
  purchasedCourseSlugs,
  selectedCourse,
  onSelectCourse,
  onClearCourse,
  onRequestBuyCourse,
}: {
  purchasedCourseSlugs: string[];
  selectedCourse: Course | null;
  onSelectCourse: (c: Course) => void;
  onClearCourse: () => void;
  onRequestBuyCourse: (c: Course) => void;
}) {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");

  if (selectedCourse) {
    const isPurchased = purchasedCourseSlugs.includes(selectedCourse.slug);
    return (
      <DashboardCourseViewer
        course={selectedCourse}
        isPurchased={isPurchased}
        onBack={onClearCourse}
        onRequestBuy={() => onRequestBuyCourse(selectedCourse)}
      />
    );
  }

  const categories = ["All", ...Array.from(new Set(courses.map((c) => c.category)))];
  const filtered = courses.filter((c) => {
    const matchCat = filter === "All" || c.category === filter;
    const matchSearch =
      c.title.toLowerCase().includes(search.toLowerCase()) ||
      c.category.toLowerCase().includes(search.toLowerCase());
    return matchCat && matchSearch;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-2xl font-black text-black font-display">Explore Courses</h2>
        <p className="text-sm font-bold text-neutral-500 mt-1">
          Select any course to view curriculum and watch lectures inside your dashboard
        </p>
      </div>

      {/* Search + Filter */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400" />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search courses by topic, protocol, or name..."
            className="w-full pl-10 pr-4 py-3 rounded-xl border-2 border-black text-sm font-bold text-black placeholder:text-neutral-400 focus:outline-none focus:ring-2 focus:ring-yellow-300 bg-white shadow-brutal-xs"
          />
        </div>
        <div className="flex gap-2 flex-wrap">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={`px-3.5 py-2 rounded-xl border-2 border-black text-xs font-black transition-all shadow-brutal-xs
                ${
                  filter === cat
                    ? "bg-black text-yellow-300"
                    : "bg-white text-black hover:bg-neutral-100"
                }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Course Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
        {filtered.map((c) => {
          const isPurchased = purchasedCourseSlugs.includes(c.slug);
          const priceDisplay =
            typeof c.price === "number" ? `₹${c.price}` : `${c.price}`;

          return (
            <div
              key={c.slug}
              onClick={() => onSelectCourse(c)}
              className="rounded-2xl border-[3px] border-black bg-white shadow-brutal hover:-translate-y-1 hover:shadow-brutal-xl transition-all flex flex-col overflow-hidden group cursor-pointer"
            >
              {/* Thumbnail */}
              <div className="relative w-full aspect-video border-b-2 border-black overflow-hidden">
                <Image
                  src={c.thumbnail}
                  alt={c.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-2 left-2 flex gap-1.5">
                  <span className="px-2 py-0.5 rounded-full border border-black bg-white text-[10px] font-black uppercase">
                    {c.level}
                  </span>
                  {isPurchased ? (
                    <span className="px-2 py-0.5 rounded-full border border-black bg-emerald-300 text-black text-[10px] font-black uppercase flex items-center gap-1">
                      <Check className="w-3 h-3" /> Enrolled
                    </span>
                  ) : (
                    <span className="px-2 py-0.5 rounded-full border border-black bg-yellow-300 text-black text-[10px] font-black uppercase">
                      {priceDisplay}
                    </span>
                  )}
                </div>
              </div>

              {/* Content */}
              <div className="p-4 flex-1 flex flex-col">
                <span className="text-[10px] font-black uppercase tracking-wider text-purple-700 mb-1">
                  {c.category}
                </span>
                <h3 className="font-display font-black text-sm text-black leading-snug mb-2 flex-1">
                  {c.title}
                </h3>

                <div className="flex items-center gap-3 text-[11px] font-bold text-neutral-500 mb-4">
                  <span className="flex items-center gap-1">
                    <BookOpen className="w-3.5 h-3.5" />
                    {c.lessonsCount} lessons
                  </span>
                  <span className="flex items-center gap-1">
                    <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                    {c.rating}
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5" />
                    {c.duration}
                  </span>
                </div>

                {isPurchased ? (
                  /* IF PURCHASED: Show Continue Button */
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      onSelectCourse(c);
                    }}
                    className="w-full py-2.5 rounded-xl border-2 border-black bg-black text-yellow-300 text-xs font-black flex items-center justify-center gap-2 hover:bg-neutral-800 transition-colors shadow-brutal-xs"
                  >
                    <PlayCircle className="w-4 h-4" />
                    <span>Continue Learning</span>
                  </button>
                ) : (
                  /* IF NOT PURCHASED: Show Buy Button (NO PROGRESS) */
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        onRequestBuyCourse(c);
                      }}
                      className="flex-1 py-2.5 rounded-xl border-2 border-black bg-yellow-300 hover:bg-yellow-400 text-black text-xs font-black flex items-center justify-center gap-1.5 transition-colors shadow-brutal-xs"
                    >
                      <Zap className="w-3.5 h-3.5 fill-black" />
                      <span>Buy · {priceDisplay}</span>
                    </button>
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        onSelectCourse(c);
                      }}
                      className="px-3 py-2.5 rounded-xl border-2 border-black bg-white hover:bg-neutral-100 text-black text-xs font-black shadow-brutal-xs"
                      title="Preview Course"
                    >
                      Preview
                    </button>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {filtered.length === 0 && (
        <div className="text-center py-16 text-neutral-400 font-bold">
          No courses found for &quot;{search}&quot;
        </div>
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
                View Roadmap →
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
          <a href="https://discord.gg/thatraghavarora" target="_blank" rel="noopener noreferrer" className="block w-full py-3 rounded-xl border-2 border-yellow-300 bg-yellow-300 text-black text-center font-black text-sm hover:bg-yellow-400 transition-colors shadow-brutal-xs">
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
          <Link href="/roadmap" className="block w-full py-2.5 rounded-xl border-2 border-black bg-black text-yellow-300 text-center font-black text-xs hover:bg-neutral-800 transition-colors shadow-brutal-xs">
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
            <button className="px-5 py-2.5 rounded-xl border-2 border-red-500 bg-white text-red-600 font-black text-sm hover:bg-red-50 transition-colors shadow-brutal-xs">
              Reset Progress
            </button>
            <button className="px-5 py-2.5 rounded-xl border-2 border-red-500 bg-red-500 text-white font-black text-sm hover:bg-red-600 transition-colors shadow-brutal-xs">
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
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);
  const [purchasedCourseSlugs, setPurchasedCourseSlugs] = useState<string[]>([]);
  const [purchasingCourse, setPurchasingCourse] = useState<Course | null>(null);

  // Load user purchased courses on mount
  useEffect(() => {
    const loadedSlugs: string[] = [];

    // 1. Check local storage
    courses.forEach((c) => {
      try {
        const stored = localStorage.getItem(`course_purchased_${c.slug}`);
        if (stored === "true" && !loadedSlugs.includes(c.slug)) {
          loadedSlugs.push(c.slug);
        }
      } catch {}
    });

    setPurchasedCourseSlugs([...loadedSlugs]);

    // 2. Query Supabase purchases API
    fetch("/api/purchases")
      .then((res) => res.json())
      .then((data) => {
        if (data.purchases && Array.isArray(data.purchases)) {
          const apiSlugs = data.purchases
            .filter((p: any) => p.status === "active")
            .map((p: any) => p.item_slug);
          
          setPurchasedCourseSlugs((prev) => {
            const combined = Array.from(new Set([...prev, ...apiSlugs]));
            return combined;
          });
        }
      })
      .catch(() => {});
  }, []);

  const handleSelectTab = (tab: Tab) => {
    setActiveTab(tab);
  };

  const handleOpenBuyModal = (course: Course) => {
    setPurchasingCourse(course);
  };

  const handleUnlockCourseSuccess = async () => {
    if (!purchasingCourse) return;
    const slug = purchasingCourse.slug;

    // 1. Update State
    setPurchasedCourseSlugs((prev) => Array.from(new Set([...prev, slug])));

    // 2. Persist in LocalStorage
    try {
      localStorage.setItem(`course_purchased_${slug}`, "true");
    } catch {}

    // 3. Close modal & celebrate
    setPurchasingCourse(null);
    confetti({ particleCount: 160, spread: 80, origin: { y: 0.6 } });

    // 4. Save to DB
    try {
      await fetch("/api/purchases", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          itemType: "course",
          itemSlug: purchasingCourse.slug,
          itemTitle: purchasingCourse.title,
          amount: purchasingCourse.price,
          paymentMethod: "upi",
        }),
      });
    } catch {}
  };

  return (
    <div className="flex min-h-screen bg-neutral-100">
      {/* Desktop Sidebar ONLY (Hidden on Mobile) */}
      <DesktopSidebar
        active={activeTab}
        onSelect={handleSelectTab}
      />

      <div className="flex-1 flex flex-col md:ml-64 min-w-0">
        {/* Header (Text on Left, Avatar on Right, NO extra icons or hamburgers) */}
        <header className="sticky top-0 z-20 h-16 bg-white border-b-[3px] border-black flex items-center justify-between px-4 sm:px-6">
          {/* Left: thatraghavarora */}
          <div className="flex items-center gap-2">
            <span className="bg-yellow-300 text-black px-2 py-0.5 rounded-md font-mono text-xs font-black border border-black shadow-brutal-xs">
              &lt;/&gt;
            </span>
            <span className="font-display font-black text-lg sm:text-xl text-black tracking-tight">
              thatraghavarora
            </span>
          </div>

          {/* Right: Avatar only */}
          <button
            onClick={() => setActiveTab("settings")}
            className="w-10 h-10 rounded-xl border-2 border-black overflow-hidden shadow-brutal-xs bg-yellow-300 hover:bg-yellow-400 flex items-center justify-center transition-all hover:-translate-y-0.5 cursor-pointer"
            title="User Profile & Settings"
          >
            <span className="font-display font-black text-base text-black">R</span>
          </button>
        </header>

        {/* Main Content Area: pb-28 on mobile so bottom navbar never overlaps */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 pb-28 md:pb-8">
          {activeTab === "home" && (
            <HomeTab
              purchasedCourseSlugs={purchasedCourseSlugs}
              onSelectTab={handleSelectTab}
              onSelectCourse={(course) => setSelectedCourse(course)}
              onRequestBuyCourse={handleOpenBuyModal}
            />
          )}
          {activeTab === "courses" && (
            <CoursesTab
              purchasedCourseSlugs={purchasedCourseSlugs}
              selectedCourse={selectedCourse}
              onSelectCourse={(course) => setSelectedCourse(course)}
              onClearCourse={() => setSelectedCourse(null)}
              onRequestBuyCourse={handleOpenBuyModal}
            />
          )}
          {activeTab === "roadmap" && <RoadmapTab />}
          {activeTab === "community" && <CommunityTab />}
          {activeTab === "settings" && <SettingsTab />}
        </main>
      </div>

      {/* Mobile Bottom Navigation Bar (Hidden on Desktop) */}
      <MobileBottomNav
        active={activeTab}
        onSelect={handleSelectTab}
      />

      {/* Course Purchase Modal */}
      {purchasingCourse && (
        <CoursePurchaseModal
          course={purchasingCourse}
          onClose={() => setPurchasingCourse(null)}
          onUnlockSuccess={handleUnlockCourseSuccess}
        />
      )}
    </div>
  );
}
