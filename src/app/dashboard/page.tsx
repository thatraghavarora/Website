"use client";

import React, { useState } from "react";
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
  Maximize2
} from "lucide-react";
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

// ─── IN-DASHBOARD COURSE VIEWER ──────────────────
function DashboardCourseViewer({
  course,
  onBack,
}: {
  course: Course;
  onBack: () => void;
}) {
  const firstLecture = course.curriculum[0]?.lectures[0] || {
    title: "Course Overview & Introduction",
    duration: "10:00",
  };

  const [activeSectionIdx, setActiveSectionIdx] = useState(0);
  const [activeLectureIdx, setActiveLectureIdx] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [completedLectures, setCompletedLectures] = useState<string[]>([
    firstLecture.title,
  ]);
  const [expandedSections, setExpandedSections] = useState<Record<number, boolean>>({
    0: true,
    1: true,
  });
  const [activeTab, setActiveTab] = useState<"syllabus" | "overview" | "faqs">("syllabus");

  const currentSection = course.curriculum[activeSectionIdx] || course.curriculum[0];
  const currentLecture =
    currentSection?.lectures[activeLectureIdx] || firstLecture;

  const toggleSection = (idx: number) => {
    setExpandedSections((prev) => ({ ...prev, [idx]: !prev[idx] }));
  };

  const toggleComplete = (title: string) => {
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
      setActiveLectureIdx(activeLectureIdx + 1);
    } else if (activeSectionIdx < course.curriculum.length - 1) {
      setActiveSectionIdx(activeSectionIdx + 1);
      setActiveLectureIdx(0);
      setExpandedSections((prev) => ({ ...prev, [activeSectionIdx + 1]: true }));
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
          <span className="px-2.5 py-0.5 rounded-full border border-black bg-purple-200 text-purple-900 font-black text-[10px] uppercase">
            {course.category}
          </span>
          <span className="px-2.5 py-0.5 rounded-full border border-black bg-yellow-300 text-black font-black text-[10px] uppercase">
            {course.level}
          </span>
          <span className="inline-flex items-center gap-1 text-xs font-black text-black bg-white px-2 py-0.5 rounded-full border border-black">
            <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
            {course.rating}
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
                <span className="w-2.5 h-2.5 rounded-full bg-red-500 animate-pulse shrink-0" />
                <span className="font-mono text-neutral-400 truncate">
                  {currentSection?.sectionTitle || "Module"}
                </span>
              </div>
              <span className="px-2 py-0.5 rounded bg-yellow-300/20 text-yellow-300 font-mono text-[11px] font-bold shrink-0">
                {currentLecture.duration}
              </span>
            </div>

            {/* Video Screen Simulation */}
            <div className="relative aspect-video w-full bg-neutral-900 flex flex-col items-center justify-center p-6 text-center select-none overflow-hidden">
              {/* Background grid */}
              <div
                className="absolute inset-0 opacity-10 pointer-events-none"
                style={{
                  backgroundImage:
                    "linear-gradient(#fff 1px,transparent 1px),linear-gradient(90deg,#fff 1px,transparent 1px)",
                  backgroundSize: "28px 28px",
                }}
              />

              {/* Decorative elements */}
              <div className="absolute top-4 left-4 font-mono text-[11px] text-yellow-400/70 text-left hidden sm:block">
                <span>[STUDENT_VIEW::HD_1080P]</span>
                <br />
                <span className="text-neutral-500">
                  LESSON {activeLectureIdx + 1} / {currentSection?.lectures.length || 1}
                </span>
              </div>

              {/* Play / Pause Center Button */}
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

                {/* Progress bar */}
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
                  <p className="text-[10px] font-black uppercase text-neutral-500">Language</p>
                  <p className="font-display font-black text-sm text-black">Hinglish / English</p>
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

        {/* Right Column: Interactive Curriculum & Progress (4 cols) */}
        <div className="lg:col-span-4 space-y-5">
          {/* Progress Card */}
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

                          return (
                            <button
                              key={lIdx}
                              onClick={() => {
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
                                ) : isCurrent ? (
                                  <PlayCircle className="w-4 h-4 text-black animate-pulse" />
                                ) : (
                                  <Play className="w-3.5 h-3.5 text-neutral-400" />
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
                                <span className="text-[10px] font-mono text-neutral-500">
                                  {lec.duration}
                                </span>
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
  onSelectTab,
  onSelectCourse,
}: {
  onSelectTab: (t: Tab) => void;
  onSelectCourse: (c: Course) => void;
}) {
  const enrolled = courses.map((c) => ({
    ...c,
    progress: Math.floor(Math.random() * 70 + 10),
    completedLessons: Math.floor(Math.random() * 12 + 1),
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
              Keep Going, You&apos;re Doing Great!
            </h1>
            <p className="text-sm font-bold text-neutral-400 mt-1">
              You&apos;re on a <span className="text-yellow-300">5-day streak</span> — don&apos;t break it today.
            </p>
          </div>
          <button
            onClick={() => onSelectTab("courses")}
            className="shrink-0 inline-flex items-center gap-2 px-5 py-3 rounded-xl border-2 border-yellow-300 bg-yellow-300 text-black font-black text-sm hover:bg-yellow-400 transition-all shadow-brutal-sm whitespace-nowrap"
          >
            <PlayCircle className="w-4 h-4" /> Resume Learning
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
        {/* Continue Learning */}
        <div className="lg:col-span-8 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-black text-black font-display">Continue Learning</h2>
            <button
              onClick={() => onSelectTab("courses")}
              className="text-xs font-black text-purple-700 flex items-center gap-1 hover:underline"
            >
              Explore All <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
          {enrolled.slice(0, 2).map((c) => (
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
                <p className="text-[11px] font-bold text-neutral-500 mt-1 mb-3 truncate">
                  Next: {c.lastLesson}
                </p>
                <div className="flex items-center gap-3 mb-3">
                  <div className="flex-1 h-2.5 rounded-full border border-black bg-neutral-100 overflow-hidden">
                    <div
                      className="h-full bg-yellow-300 border-r border-black transition-all"
                      style={{ width: `${c.progress}%` }}
                    />
                  </div>
                  <span className="text-[11px] font-black text-black shrink-0">
                    {c.progress}%
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-bold text-neutral-500">
                    {c.completedLessons}/{c.lessonsCount} lessons
                  </span>
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
            </div>
          ))}
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
  selectedCourse,
  onSelectCourse,
  onClearCourse,
}: {
  selectedCourse: Course | null;
  onSelectCourse: (c: Course) => void;
  onClearCourse: () => void;
}) {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");

  if (selectedCourse) {
    return (
      <DashboardCourseViewer
        course={selectedCourse}
        onBack={onClearCourse}
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
          Select any course to view lessons and watch lectures directly inside your dashboard
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
                  {c.badge && (
                    <span className="px-2 py-0.5 rounded-full border border-black bg-yellow-300 text-[10px] font-black uppercase">
                      {c.badge}
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

                <div className="flex items-center gap-3 text-[11px] font-bold text-neutral-500 mb-3">
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

                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    onSelectCourse(c);
                  }}
                  className="w-full py-2.5 rounded-xl border-2 border-black bg-yellow-300 hover:bg-yellow-400 text-black text-xs font-black flex items-center justify-center gap-2 transition-colors shadow-brutal-xs"
                >
                  <PlayCircle className="w-4 h-4" />
                  <span>Explore & Watch Lessons</span>
                </button>
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

  const handleSelectTab = (tab: Tab) => {
    setActiveTab(tab);
    // If switching tabs away from courses, keep course state or allow coming back
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

        {/* Main Content Area: pb-24 on mobile so bottom navbar never overlaps */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 pb-28 md:pb-8">
          {activeTab === "home" && (
            <HomeTab
              onSelectTab={handleSelectTab}
              onSelectCourse={(course) => setSelectedCourse(course)}
            />
          )}
          {activeTab === "courses" && (
            <CoursesTab
              selectedCourse={selectedCourse}
              onSelectCourse={(course) => setSelectedCourse(course)}
              onClearCourse={() => setSelectedCourse(null)}
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
    </div>
  );
}
