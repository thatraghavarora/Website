"use client";

import React, { useState, useMemo, useEffect } from "react";
import {
  Globe,
  Terminal,
  Search,
  Target,
  Wrench,
  Bug,
  Flag,
  Award,
  BookOpen,
  Check,
  Copy,
  CheckCircle2,
  ChevronDown,
  ChevronRight,
  Lock,
  Unlock,
  Zap,
  Shield,
  Sparkles,
  ExternalLink,
  Laptop,
  AlertCircle,
  FileText,
  Flame,
  Clock,
  Layers,
  Code2,
  Menu,
  X,
  ArrowLeft,
  ArrowRight,
  ShieldAlert,
  CheckSquare,
  Square,
  Bookmark,
  Bot,
  Send,
  MessageSquare,
} from "lucide-react";
import {
  chapterRoadmapList,
  RoadmapChapter,
  RoadmapLesson
} from "@/data/chapterRoadmapData";

interface ChapterRoadmapViewerProps {
  completedItems?: string[];
  onToggleItem?: (itemId: string) => void;
  isUnlocked?: boolean;
  onRequestUnlock?: () => void;
  syncStatus?: string | null;
}

export default function ChapterRoadmapViewer({
  completedItems = [],
  onToggleItem,
  isUnlocked = true,
  onRequestUnlock,
  syncStatus,
}: ChapterRoadmapViewerProps) {
  // Navigation State
  const [selectedChapterIndex, setSelectedChapterIndex] = useState(0);
  const [selectedLessonId, setSelectedLessonId] = useState<string>(
    chapterRoadmapList[0]?.lessons[0]?.id || "l-1-1"
  );
  const [searchQuery, setSearchQuery] = useState("");
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const [copiedText, setCopiedText] = useState<string | null>(null);
  const [expandedChapters, setExpandedChapters] = useState<Record<number, boolean>>({
    0: true,
  });
  const [leftPanelMode, setLeftPanelMode] = useState<"chapters" | "ai_mentor">("chapters");

  // Current Active Chapter & Lesson
  const activeChapter = chapterRoadmapList[selectedChapterIndex] || chapterRoadmapList[0];
  const activeLesson =
    activeChapter.lessons.find((l) => l.id === selectedLessonId) ||
    activeChapter.lessons[0] ||
    chapterRoadmapList[0].lessons[0];

  // Auto-expand current chapter when selected
  useEffect(() => {
    setExpandedChapters((prev) => ({
      ...prev,
      [selectedChapterIndex]: true,
    }));
  }, [selectedChapterIndex]);

  // Copy helper
  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedText(text);
    setTimeout(() => setCopiedText(null), 2000);
  };

  // Flatten all lessons across all chapters for sequential prev/next navigation
  const allFlattenedLessons = useMemo(() => {
    const list: { chapterIndex: number; lesson: RoadmapLesson }[] = [];
    chapterRoadmapList.forEach((ch, chIdx) => {
      ch.lessons.forEach((lesson) => {
        list.push({ chapterIndex: chIdx, lesson });
      });
    });
    return list;
  }, []);

  const currentFlatIndex = allFlattenedLessons.findIndex(
    (item) => item.lesson.id === activeLesson.id
  );
  const prevLessonItem = currentFlatIndex > 0 ? allFlattenedLessons[currentFlatIndex - 1] : null;
  const nextLessonItem =
    currentFlatIndex >= 0 && currentFlatIndex < allFlattenedLessons.length - 1
      ? allFlattenedLessons[currentFlatIndex + 1]
      : null;

  const navigateToLesson = (chapterIdx: number, lessonId: string) => {
    setSelectedChapterIndex(chapterIdx);
    setSelectedLessonId(lessonId);
    setMobileSidebarOpen(false);
    if (typeof window !== "undefined") {
      window.scrollTo({ top: 180, behavior: "smooth" });
    }
  };

  // Progress Calculations
  const totalAllLessons = allFlattenedLessons.length;
  const totalAllChecklists = useMemo(
    () => chapterRoadmapList.reduce((acc, ch) => acc + ch.checklist.length, 0),
    []
  );
  const totalCompletedCount = useMemo(() => {
    let count = 0;
    allFlattenedLessons.forEach(({ lesson }) => {
      if (completedItems.includes(lesson.id)) count++;
    });
    chapterRoadmapList.forEach((ch) => {
      ch.checklist.forEach((item) => {
        if (completedItems.includes(item.id)) count++;
      });
    });
    return count;
  }, [allFlattenedLessons, completedItems]);

  const totalTrackableItems = totalAllLessons + totalAllChecklists;
  const overallPercentage =
    totalTrackableItems > 0
      ? Math.min(100, Math.round((totalCompletedCount / totalTrackableItems) * 100))
      : 0;

  // Filter lessons based on search query
  const searchResults = useMemo(() => {
    if (!searchQuery.trim()) return null;
    const q = searchQuery.toLowerCase();
    const matches: { chapterIndex: number; lesson: RoadmapLesson }[] = [];
    chapterRoadmapList.forEach((ch, chIdx) => {
      ch.lessons.forEach((l) => {
        if (
          l.title.toLowerCase().includes(q) ||
          l.summary.toLowerCase().includes(q) ||
          l.keyTopics.some((t) => t.toLowerCase().includes(q)) ||
          (l.terminalCommands && l.terminalCommands.some((c) => c.toLowerCase().includes(q)))
        ) {
          matches.push({ chapterIndex: chIdx, lesson: l });
        }
      });
    });
    return matches;
  }, [searchQuery]);

  // Icon resolver
  const getChapterIcon = (iconName: string) => {
    switch (iconName) {
      case "Globe":
        return <Globe className="w-4 h-4 text-blue-600 shrink-0" />;
      case "Terminal":
        return <Terminal className="w-4 h-4 text-emerald-600 shrink-0" />;
      case "Search":
        return <Search className="w-4 h-4 text-indigo-600 shrink-0" />;
      case "Target":
        return <Target className="w-4 h-4 text-purple-600 shrink-0" />;
      case "Wrench":
        return <Wrench className="w-4 h-4 text-amber-600 shrink-0" />;
      case "Bug":
        return <Bug className="w-4 h-4 text-red-600 shrink-0" />;
      case "Flag":
        return <Flag className="w-4 h-4 text-teal-600 shrink-0" />;
      case "Award":
        return <Award className="w-4 h-4 text-yellow-600 shrink-0" />;
      default:
        return <BookOpen className="w-4 h-4 text-black shrink-0" />;
    }
  };

  const isCurrentLessonDone = completedItems.includes(activeLesson.id);

  return (
    <div className="w-full font-sans">
      {/* ── TOP HEADER / PROGRESS BAR ───────────────────────────────── */}
      <div className="bg-[#fffdf0] border-[3px] border-black p-4 sm:p-5 mb-6 shadow-brutal">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1.5 flex-wrap">
              <span className="px-2.5 py-0.5 bg-black text-white font-mono font-bold text-xs uppercase tracking-wider rounded-md flex items-center gap-1.5">
                <Flame className="w-3.5 h-3.5 text-yellow-400" />
                Cyber Security Docs
              </span>
              <span className="px-2.5 py-0.5 bg-yellow-300 text-black font-black text-xs uppercase tracking-wider border border-black rounded-md">
                10 Chapters • 60+ Lessons • Interactive Labs
              </span>
              {syncStatus && (
                <span className="text-xs font-mono font-bold text-emerald-800 bg-emerald-100 px-2 py-0.5 border border-emerald-400 rounded-md">
                  {syncStatus}
                </span>
              )}
            </div>
            <h1 className="text-xl sm:text-2xl font-black text-black tracking-tight">
              Complete Offensive Cyber Security Roadmap &amp; Knowledge Base
            </h1>
          </div>

          {/* Right: AI Chatbot (Locked / Paid) + Progress Indicator */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
            {/* Locked Paid Chatbot Button in Header */}
            <button
              type="button"
              onClick={() => {
                setLeftPanelMode("ai_mentor");
                setMobileSidebarOpen(true);
              }}
              className="px-3.5 py-2.5 rounded-xl border-2 border-black bg-neutral-950 hover:bg-neutral-900 text-white font-mono text-xs font-black uppercase flex items-center justify-between sm:justify-center gap-2.5 shadow-brutal-xs hover:shadow-brutal active:scale-95 transition-all cursor-pointer group"
              title="Open 24/7 AI Security Mentor (Locked • Paid Feature)"
              id="roadmap-header-chatbot-btn"
            >
              <div className="flex items-center gap-2">
                <Bot className="w-4 h-4 text-yellow-300 group-hover:rotate-12 transition-transform" />
                <span className="font-display font-black text-xs text-white">AI Mentor</span>
              </div>
              <span className="px-1.5 py-0.5 bg-rose-600 text-white rounded text-[9px] font-mono font-black flex items-center gap-1 border border-black/40">
                <Lock className="w-2.5 h-2.5" /> PAID
              </span>
            </button>

            {/* Overall Progress Indicator */}
            <div className="bg-white border-2 border-black p-3 min-w-[240px] shadow-brutal-xs rounded-xl">
              <div className="flex items-center justify-between text-xs font-black uppercase mb-1">
                <span className="text-neutral-700">Course Progress</span>
                <span className="font-mono text-emerald-600 font-black">{overallPercentage}%</span>
              </div>
              <div className="w-full bg-neutral-200 h-2.5 border border-black rounded-full overflow-hidden mb-1.5">
                <div
                  className="bg-emerald-500 h-full transition-all duration-300"
                  style={{ width: `${overallPercentage}%` }}
                />
              </div>
              <div className="flex items-center justify-between text-[10px] font-mono font-bold text-neutral-500">
                <span>{totalCompletedCount} items completed</span>
                <span className="text-black font-black">10 Master Chapters</span>
              </div>
            </div>
          </div>
        </div>

        {/* Mobile Sidebar Toggle Button */}
        <div className="mt-3 pt-3 border-t border-black/15 flex lg:hidden items-center justify-between gap-3">
          <button
            type="button"
            onClick={() => setMobileSidebarOpen(true)}
            className="flex-1 py-2 px-3 bg-yellow-300 hover:bg-yellow-400 text-black font-black text-xs uppercase tracking-wider border-2 border-black rounded-xl flex items-center justify-center gap-2 shadow-brutal-xs active:scale-95 transition-all"
          >
            <Menu className="w-4 h-4" />
            <span>Open Chapters Menu ({chapterRoadmapList.length})</span>
          </button>
        </div>
      </div>

      {/* ── MAIN DOCS SPLIT-LAYOUT (LEFT SIDEBAR / RIGHT DOCS) ──────── */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* ══ LEFT SIDEBAR: CHAPTERS & LESSONS DIRECTORY ══════════════ */}
        <aside
          className={`
            fixed inset-y-0 left-0 z-50 w-80 sm:w-96 bg-white border-r-[3px] border-black p-4 flex flex-col transition-transform duration-200 lg:static lg:z-auto lg:w-auto lg:col-span-4 lg:border-[3px] lg:rounded-2xl lg:shadow-brutal lg:translate-x-0
            ${mobileSidebarOpen ? "translate-x-0 shadow-2xl" : "-translate-x-full lg:translate-x-0"}
          `}
        >
          {/* Mobile Close Button */}
          <div className="flex lg:hidden items-center justify-between pb-3 border-b-2 border-black mb-3 shrink-0">
            <span className="font-display font-black text-sm uppercase tracking-wider text-black">
              {leftPanelMode === "chapters" ? "Chapters Index" : "AI Security Mentor"}
            </span>
            <button
              type="button"
              onClick={() => setMobileSidebarOpen(false)}
              className="p-1.5 rounded-lg border-2 border-black bg-neutral-100 hover:bg-neutral-200 cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Left Panel Segmented Switcher: Chapters vs AI Mentor */}
          <div className="grid grid-cols-2 gap-1.5 p-1 bg-neutral-100 border-2 border-black rounded-xl mb-3 shrink-0">
            <button
              type="button"
              onClick={() => setLeftPanelMode("chapters")}
              className={`py-2 px-2 rounded-lg text-xs font-black uppercase flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
                leftPanelMode === "chapters"
                  ? "bg-white text-black border border-black shadow-brutal-xs"
                  : "text-neutral-600 hover:text-black hover:bg-neutral-200"
              }`}
            >
              <Layers className="w-3.5 h-3.5" />
              <span>Chapters</span>
            </button>
            <button
              type="button"
              onClick={() => setLeftPanelMode("ai_mentor")}
              className={`py-2 px-2 rounded-lg text-xs font-mono font-black uppercase flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
                leftPanelMode === "ai_mentor"
                  ? "bg-yellow-300 text-black border border-black shadow-brutal-xs"
                  : "text-neutral-700 hover:text-black hover:bg-yellow-100"
              }`}
            >
              <Bot className="w-3.5 h-3.5 text-black" />
              <span>AI Mentor</span>
              <span className="px-1 py-0.2 bg-rose-600 text-white rounded text-[8px] font-mono font-black flex items-center gap-0.5">
                <Lock className="w-2 h-2" /> PAID
              </span>
            </button>
          </div>

          {/* ══ CHAPTERS MODE ═══════════════════════════════════════════ */}
          {leftPanelMode === "chapters" ? (
            <div className="flex-1 flex flex-col min-h-0">
              {/* Search Box */}
              <div className="relative mb-3 shrink-0">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-neutral-400" />
                <input
                  type="text"
                  placeholder="Search lessons, tools, bugs..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-8 pr-3 py-2 bg-neutral-50 border-2 border-black rounded-xl font-medium text-xs focus:outline-none focus:bg-white focus:ring-2 focus:ring-yellow-400"
                />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery("")}
                    className="absolute right-2.5 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-black text-xs font-bold cursor-pointer"
                  >
                    ✕
                  </button>
                )}
              </div>

              {/* Sidebar Header */}
              <div className="bg-black text-white px-3 py-2 rounded-xl text-[11px] font-mono font-bold uppercase tracking-wider flex items-center justify-between mb-2 shrink-0">
                <span className="flex items-center gap-1.5">
                  <Layers className="w-3.5 h-3.5 text-yellow-400" />
                  <span>Table of Contents</span>
                </span>
                <span className="text-yellow-300 font-black">
                  {chapterRoadmapList.length} Chapters
                </span>
              </div>

              {/* Search Results Mode */}
              {searchResults ? (
                <div className="flex-1 overflow-y-auto space-y-1.5 max-h-[65vh] pr-1">
                  <p className="text-[11px] font-bold text-neutral-500 mb-2">
                    Found {searchResults.length} lessons matching &quot;{searchQuery}&quot;:
                  </p>
                  {searchResults.length === 0 ? (
                    <div className="p-4 text-center text-xs text-neutral-500 bg-neutral-50 rounded-xl border border-neutral-200">
                      No matching lessons found.
                    </div>
                  ) : (
                    searchResults.map(({ chapterIndex, lesson }) => {
                      const isSelected = activeLesson.id === lesson.id;
                      const isDone = completedItems.includes(lesson.id);
                      return (
                        <button
                          key={lesson.id}
                          type="button"
                          onClick={() => navigateToLesson(chapterIndex, lesson.id)}
                          className={`w-full text-left p-2.5 rounded-xl border transition-all flex items-start gap-2 ${
                            isSelected
                              ? "bg-yellow-300 border-black shadow-brutal-xs font-black text-black"
                              : "bg-white border-neutral-200 hover:border-black text-neutral-800"
                          }`}
                        >
                          <span className="mt-0.5 shrink-0">
                            {isDone ? (
                              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                            ) : (
                              <span className="w-3.5 h-3.5 rounded-full border border-neutral-400 inline-block" />
                            )}
                          </span>
                          <div className="min-w-0">
                            <p className="text-xs font-bold line-clamp-1 leading-tight">
                              {lesson.lessonNumber} {lesson.title}
                            </p>
                            <p className="text-[10px] text-neutral-500 line-clamp-1 mt-0.5">
                              Chapter {chapterRoadmapList[chapterIndex].chapterNumber}: {chapterRoadmapList[chapterIndex].title}
                            </p>
                          </div>
                        </button>
                      );
                    })
                  )}
                </div>
              ) : (
                /* Chapters Accordion Tree */
                <div className="flex-1 overflow-y-auto space-y-2 max-h-[65vh] pr-1">
                  {chapterRoadmapList.map((chapter, chIdx) => {
                    const isChapterActive = selectedChapterIndex === chIdx;
                    const isExpanded = expandedChapters[chIdx] ?? false;
                    const chapterCompletedLessons = chapter.lessons.filter((l) =>
                      completedItems.includes(l.id)
                    ).length;
                    const isChapterDone =
                      chapter.lessons.length > 0 &&
                      chapterCompletedLessons === chapter.lessons.length;

                    return (
                      <div
                        key={chapter.id}
                        className={`rounded-xl border-2 transition-all overflow-hidden ${
                          isChapterActive
                            ? "border-black bg-neutral-50 shadow-brutal-xs"
                            : "border-neutral-200 bg-white hover:border-neutral-400"
                        }`}
                      >
                        {/* Chapter Header Toggle */}
                        <button
                          type="button"
                          onClick={() => {
                            setSelectedChapterIndex(chIdx);
                            setExpandedChapters((prev) => ({
                              ...prev,
                              [chIdx]: !prev[chIdx],
                            }));
                          }}
                          className={`w-full p-2.5 text-left flex items-center justify-between gap-2 transition-colors cursor-pointer ${
                            isChapterActive ? "bg-neutral-100" : "hover:bg-neutral-50"
                          }`}
                        >
                          <div className="flex items-center gap-2 min-w-0">
                            {getChapterIcon(chapter.iconName)}
                            <div className="min-w-0">
                              <div className="flex items-center gap-1.5">
                                <span className="text-[10px] font-mono font-black uppercase text-neutral-500">
                                  Ch {chapter.chapterNumber}
                                </span>
                                {isChapterDone && (
                                  <span className="text-[9px] font-black uppercase px-1.5 py-0.2 bg-emerald-100 text-emerald-800 rounded">
                                    Done
                                  </span>
                                )}
                              </div>
                              <p
                                className={`text-xs font-black truncate leading-tight ${
                                  isChapterActive ? "text-black" : "text-neutral-800"
                                }`}
                              >
                                {chapter.title}
                              </p>
                            </div>
                          </div>

                          <div className="shrink-0 flex items-center gap-1.5 text-neutral-400">
                            <span className="text-[10px] font-mono font-bold">
                              {chapterCompletedLessons}/{chapter.lessons.length}
                            </span>
                            <ChevronRight
                              className={`w-3.5 h-3.5 transition-transform duration-200 ${
                                isExpanded ? "rotate-90 text-black" : ""
                              }`}
                            />
                          </div>
                        </button>

                        {/* Chapter Lessons List */}
                        {isExpanded && (
                          <div className="p-1.5 pt-0 space-y-1 bg-white border-t border-neutral-200">
                            {chapter.lessons.map((lesson) => {
                              const isLessonSelected = activeLesson.id === lesson.id;
                              const isLessonDone = completedItems.includes(lesson.id);

                              return (
                                <button
                                  key={lesson.id}
                                  type="button"
                                  onClick={() => navigateToLesson(chIdx, lesson.id)}
                                  className={`w-full text-left px-2.5 py-2 rounded-lg text-xs transition-all flex items-center justify-between gap-2 cursor-pointer ${
                                    isLessonSelected
                                      ? "bg-yellow-300 text-black font-black border-2 border-black shadow-brutal-xs"
                                      : "text-neutral-700 hover:bg-neutral-100 font-semibold"
                                  }`}
                                >
                                  <div className="flex items-center gap-2 min-w-0">
                                    <span className="shrink-0">
                                      {isLessonDone ? (
                                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 fill-emerald-100" />
                                      ) : (
                                        <span
                                          className={`w-3.5 h-3.5 rounded-full border flex items-center justify-center ${
                                            isLessonSelected ? "border-black bg-white" : "border-neutral-300"
                                          }`}
                                        />
                                      )}
                                    </span>
                                    <span className="truncate leading-tight">
                                      {lesson.lessonNumber} {lesson.title}
                                    </span>
                                  </div>

                                  <span
                                    className={`text-[10px] font-mono shrink-0 ${
                                      isLessonSelected ? "text-black font-bold" : "text-neutral-400"
                                    }`}
                                  >
                                    {lesson.duration}
                                  </span>
                                </button>
                              );
                            })}
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              )}

              {/* Quick AI Mentor Card at bottom of Chapters list */}
              <div className="mt-3 pt-3 border-t border-neutral-200 shrink-0">
                <button
                  type="button"
                  onClick={() => setLeftPanelMode("ai_mentor")}
                  className="w-full p-2.5 rounded-xl border-2 border-black bg-neutral-950 hover:bg-neutral-900 text-white text-left transition-all flex items-center justify-between shadow-brutal-xs cursor-pointer group"
                >
                  <div className="flex items-center gap-2">
                    <div className="w-7 h-7 rounded-lg bg-yellow-300 border border-black flex items-center justify-center text-black">
                      <Bot className="w-4 h-4 group-hover:rotate-12 transition-transform" />
                    </div>
                    <div>
                      <div className="flex items-center gap-1.5">
                        <span className="font-display font-black text-xs text-white">Open AI Mentor</span>
                        <span className="px-1 py-0.2 rounded bg-rose-600 text-white font-mono text-[8px] font-black flex items-center gap-0.5">
                          <Lock className="w-2 h-2" /> PAID
                        </span>
                      </div>
                      <p className="text-[10px] text-neutral-400 font-mono">24/7 Exploit &amp; Lab Assistant</p>
                    </div>
                  </div>
                  <ChevronRight className="w-4 h-4 text-neutral-400 group-hover:text-yellow-300" />
                </button>
              </div>
            </div>
          ) : (
            /* ══ FULL AI MENTOR IN LEFT SIDEBAR (PAID & LOCKED) ═══════════ */
            <div className="flex-1 flex flex-col min-h-0">
              {/* Header with Close Icon */}
              <div className="bg-neutral-950 text-white p-3 rounded-xl border-2 border-black flex items-center justify-between mb-3 shrink-0 shadow-brutal-xs">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-yellow-300 border border-black flex items-center justify-center text-black shadow-brutal-xs">
                    <Bot className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="flex items-center gap-1.5">
                      <h3 className="font-display font-black text-xs text-white">
                        HackerBot AI
                      </h3>
                      <span className="px-1.5 py-0.2 bg-rose-600 text-white font-mono text-[8px] font-black uppercase rounded border border-black flex items-center gap-0.5">
                        <Lock className="w-2 h-2" /> PAID
                      </span>
                    </div>
                    <p className="text-[10px] font-mono text-neutral-400">
                      24/7 Offensive Security Mentor
                    </p>
                  </div>
                </div>

                {/* Close Icon Button to return to chapters */}
                <button
                  type="button"
                  onClick={() => setLeftPanelMode("chapters")}
                  className="p-1.5 rounded-lg border border-neutral-700 bg-neutral-900 hover:bg-neutral-800 text-neutral-300 hover:text-white flex items-center justify-center transition-colors cursor-pointer"
                  title="Close AI Mentor (Return to Chapters)"
                  aria-label="Close AI Mentor"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Scrollable Conversation & Locked Paywall Area */}
              <div className="flex-1 overflow-y-auto space-y-3 pr-1 max-h-[60vh]">
                {/* Bot Greeting */}
                <div className="bg-neutral-50 border-2 border-black p-3 rounded-xl shadow-brutal-xs space-y-1.5">
                  <div className="flex items-center gap-1.5 font-display font-black text-xs text-black">
                    <span>🤖</span>
                    <span>HackerBot Assistant</span>
                  </div>
                  <p className="text-xs text-neutral-700 leading-relaxed font-medium">
                    Hey hacker! 👋 I&apos;m your 24/7 AI Security Mentor. Ask me anything about networking, exploit payloads, bypassing WAFs, or debugging your labs.
                  </p>
                  <div className="bg-yellow-100 border border-yellow-300 rounded p-1.5 text-[10px] font-mono font-bold text-neutral-800">
                    ⚡ Fine-tuned on OWASP Top 10, PortSwigger, &amp; OSCP methodology.
                  </div>
                </div>

                {/* Teaser Prompts */}
                <div className="space-y-1">
                  <p className="text-[10px] font-mono font-black uppercase text-neutral-500">
                    Sample Prompt Teasers:
                  </p>
                  {[
                    "Explain TCP SYN scan flag anomaly under RFC 793",
                    "How to craft a blind SQLi payload bypassing Cloudflare WAF",
                    "Generate a custom Python script to automate AXFR zone transfers",
                  ].map((prompt, pIdx) => (
                    <div
                      key={pIdx}
                      className="p-2 rounded-lg border border-neutral-200 bg-white text-[11px] font-medium text-neutral-500 flex items-center justify-between opacity-75"
                    >
                      <span className="truncate">{prompt}</span>
                      <Lock className="w-3 h-3 text-rose-500 shrink-0 ml-1.5" />
                    </div>
                  ))}
                </div>

                {/* Locked Paywall Box */}
                <div className="p-4 rounded-xl border-2 border-black bg-gradient-to-b from-yellow-50 to-amber-100 shadow-brutal-xs space-y-2.5 text-center">
                  <div className="w-10 h-10 rounded-xl border-2 border-black bg-yellow-300 mx-auto flex items-center justify-center text-black">
                    <Lock className="w-5 h-5 stroke-[2.5]" />
                  </div>

                  <div>
                    <span className="px-2 py-0.5 rounded bg-rose-600 text-white font-mono text-[9px] font-black uppercase tracking-wider inline-block mb-1">
                      Paid Feature
                    </span>
                    <h4 className="font-display font-black text-sm text-black leading-tight">
                      AI Mentor is Locked
                    </h4>
                    <p className="text-[11px] text-neutral-700 font-medium leading-snug mt-1">
                      24/7 unlimited AI tutoring, exploit payload generator, and real-time lab hints are exclusive to Pro / Enrolled members.
                    </p>
                  </div>

                  <div className="space-y-1 text-left bg-white/80 p-2.5 rounded-lg border border-black/10 text-[10px] font-bold text-neutral-800">
                    <div className="flex items-center gap-1.5">
                      <Check className="w-3 h-3 text-emerald-600 stroke-[3]" />
                      <span>Instant debugging for all 10 roadmap chapters</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Check className="w-3.5 h-3.5 text-emerald-600 stroke-[3]" />
                      <span>Custom bypass payloads tailored to your target</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Check className="w-3 h-3 text-emerald-600 stroke-[3]" />
                      <span>OSCP / CEH interview mock questions &amp; answers</span>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() => {
                      if (onRequestUnlock) {
                        onRequestUnlock();
                      } else if (typeof window !== "undefined") {
                        window.location.href = "/roadmap/web-pentesting-cyber-security";
                      }
                    }}
                    className="w-full py-2.5 px-3 rounded-xl border-2 border-black bg-yellow-300 hover:bg-yellow-400 active:bg-yellow-500 text-black font-black text-xs uppercase tracking-wider shadow-brutal-xs hover:shadow-brutal active:scale-95 transition-all flex items-center justify-center gap-1.5 cursor-pointer"
                  >
                    <Unlock className="w-3.5 h-3.5 stroke-[2.5]" />
                    <span>Unlock AI Chatbot Access</span>
                  </button>
                </div>
              </div>

              {/* Locked Input Field */}
              <div className="pt-2 border-t border-neutral-200 shrink-0 mt-2">
                <div
                  onClick={() => {
                    if (onRequestUnlock) onRequestUnlock();
                  }}
                  className="relative cursor-pointer"
                >
                  <input
                    type="text"
                    disabled
                    placeholder="🔒 AI Chatbot is locked..."
                    className="w-full pl-3 pr-8 py-2 rounded-lg border-2 border-neutral-300 bg-neutral-100 text-[11px] font-mono text-neutral-400 cursor-not-allowed select-none"
                  />
                  <button
                    type="button"
                    disabled
                    className="absolute right-1.5 top-1/2 -translate-y-1/2 w-6 h-6 rounded bg-neutral-300 text-neutral-500 flex items-center justify-center cursor-not-allowed"
                  >
                    <Lock className="w-3 h-3" />
                  </button>
                </div>
              </div>

              {/* Close & Return Button */}
              <button
                type="button"
                onClick={() => setLeftPanelMode("chapters")}
                className="mt-2 w-full py-2 px-3 rounded-lg border border-black bg-neutral-100 hover:bg-neutral-200 text-black font-black text-[11px] uppercase flex items-center justify-center gap-1.5 transition-all cursor-pointer"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Close &amp; Return to Chapters</span>
              </button>
            </div>
          )}
        </aside>

        {/* Mobile Backdrop Overlay */}
        {mobileSidebarOpen && (
          <div
            onClick={() => setMobileSidebarOpen(false)}
            className="fixed inset-0 z-40 bg-black/50 lg:hidden"
          />
        )}

        {/* ══ RIGHT CONTENT: CLEAN DOCS READING & LAB VIEW ══════════════ */}
        <main className="lg:col-span-8 space-y-6">
          <article className="bg-white border-[3px] border-black rounded-2xl shadow-brutal p-6 sm:p-8 space-y-8">
            {/* Docs Breadcrumb & Lesson Top Meta */}
            <div className="border-b-2 border-neutral-200 pb-5 space-y-3">
              <div className="flex items-center gap-2 text-xs font-mono font-bold text-neutral-500 flex-wrap">
                <span>Cyber Security</span>
                <span>/</span>
                <span className="text-black">Chapter {activeChapter.chapterNumber}: {activeChapter.title}</span>
                <span>/</span>
                <span className="text-purple-700 font-black">Lesson {activeLesson.lessonNumber}</span>
              </div>

              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <div className="flex items-center gap-2 mb-2 flex-wrap">
                    <span className="px-2.5 py-0.5 rounded-full border border-black bg-blue-100 text-blue-900 text-xs font-black uppercase">
                      {activeLesson.badge || activeChapter.difficulty}
                    </span>
                    <span className="px-2.5 py-0.5 rounded-full border border-black bg-neutral-100 text-neutral-800 text-xs font-mono font-bold flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {activeLesson.duration}
                    </span>
                    <span className="px-2.5 py-0.5 rounded-full border border-black bg-purple-100 text-purple-900 text-xs font-mono font-bold">
                      Difficulty: {activeChapter.difficulty}
                    </span>
                  </div>

                  <h2 className="text-2xl sm:text-3xl font-black text-black tracking-tight leading-tight">
                    {activeLesson.lessonNumber} — {activeLesson.title}
                  </h2>
                </div>

                {/* Action Buttons */}
                <div className="flex items-center gap-2.5 shrink-0 flex-wrap sm:flex-nowrap">
                  {/* Ask AI Mentor Button (Paid & Locked) */}
                  <button
                    type="button"
                    onClick={() => {
                      setLeftPanelMode("ai_mentor");
                      setMobileSidebarOpen(true);
                    }}
                    className="px-3.5 py-2.5 rounded-xl border-2 border-black bg-neutral-900 hover:bg-neutral-800 text-white font-mono text-xs font-black uppercase flex items-center gap-2 transition-all cursor-pointer shadow-brutal-xs hover:shadow-brutal active:scale-95 group"
                    title="Ask AI HackerBot about this lesson (Locked • Paid)"
                  >
                    <Bot className="w-4 h-4 text-yellow-300 group-hover:rotate-12 transition-transform" />
                    <span>Ask AI</span>
                    <span className="px-1.5 py-0.2 bg-rose-600 text-white rounded text-[9px] font-mono font-black flex items-center gap-0.5">
                      <Lock className="w-2.5 h-2.5" /> PAID
                    </span>
                  </button>

                  {/* Mark Complete Action Button */}
                  <button
                    type="button"
                    onClick={() => onToggleItem && onToggleItem(activeLesson.id)}
                    className={`px-4 py-2.5 rounded-xl border-2 border-black font-mono text-xs font-black uppercase flex items-center gap-2 transition-all cursor-pointer shadow-brutal-xs active:scale-95 ${
                      isCurrentLessonDone
                        ? "bg-emerald-400 text-black hover:bg-emerald-500"
                        : "bg-yellow-300 text-black hover:bg-yellow-400"
                    }`}
                  >
                    <Check className="w-4 h-4 stroke-[3]" />
                    <span>{isCurrentLessonDone ? "Lesson Completed ✓" : "Mark as Completed"}</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Docs Section 1: Summary & Theoretical Foundation */}
            <section className="space-y-3">
              <div className="flex items-center gap-2 text-black">
                <BookOpen className="w-5 h-5 text-purple-600" />
                <h3 className="font-display font-black text-lg uppercase tracking-tight">
                  Overview &amp; Concept Architecture
                </h3>
              </div>
              <p className="text-neutral-800 text-base sm:text-lg leading-relaxed bg-neutral-50 p-5 rounded-xl border-2 border-neutral-200">
                {activeLesson.summary}
              </p>
            </section>

            {/* Docs Section 1.5: Comprehensive Study Notes & Deep-Dive Guide */}
            {activeLesson.studyNotes && activeLesson.studyNotes.length > 0 && (
              <section className="space-y-4">
                <div className="flex items-center gap-2 text-black">
                  <FileText className="w-5 h-5 text-amber-600" />
                  <h3 className="font-display font-black text-lg uppercase tracking-tight">
                    In-Depth Study Notes &amp; Architecture
                  </h3>
                </div>

                <div className="space-y-4">
                  {activeLesson.studyNotes.map((note, noteIdx) => (
                    <div
                      key={noteIdx}
                      className="rounded-2xl border-2 border-black bg-white p-5 shadow-brutal-xs space-y-3.5"
                    >
                      <div className="flex items-start justify-between gap-3 border-b-2 border-neutral-100 pb-3">
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="w-2.5 h-2.5 rounded-full bg-yellow-400 border border-black shrink-0" />
                            <h4 className="font-display font-black text-base text-black leading-snug">
                              {note.heading}
                            </h4>
                          </div>
                          {note.subheading && (
                            <p className="text-xs font-bold text-neutral-500 mt-0.5 ml-4">
                              {note.subheading}
                            </p>
                          )}
                        </div>
                        <span className="text-[10px] font-mono font-black uppercase px-2 py-0.5 rounded bg-yellow-300 text-black border border-black shrink-0 shadow-brutal-xs">
                          Part {noteIdx + 1}
                        </span>
                      </div>

                      {/* Bullet points */}
                      <ul className="space-y-2.5">
                        {note.points.map((pt, ptIdx) => (
                          <li key={ptIdx} className="flex items-start gap-2.5 text-xs sm:text-sm text-neutral-800 leading-relaxed font-medium">
                            <span className="text-yellow-500 font-black mt-0.5 shrink-0 text-sm">▸</span>
                            <span>{pt}</span>
                          </li>
                        ))}
                      </ul>

                      {/* Optional Diagram or Monospaced Architecture */}
                      {note.diagramOrCode && (
                        <div className="rounded-xl border-2 border-neutral-900 bg-neutral-950 p-4 font-mono text-[11px] sm:text-xs text-emerald-400 overflow-x-auto whitespace-pre leading-relaxed shadow-inner">
                          {note.diagramOrCode}
                        </div>
                      )}

                      {/* Optional Callout / Hacker Insight */}
                      {note.callout && (
                        <div className="rounded-xl border-2 border-amber-400 bg-amber-50/80 p-3.5 flex items-start gap-2.5">
                          <Sparkles className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                          <div className="text-xs font-bold text-amber-950 leading-relaxed">
                            <span className="font-black uppercase tracking-wider text-[10px] text-amber-700 block mb-0.5">
                              Offensive Security &amp; Hacker Insight
                            </span>
                            {note.callout}
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* Docs Section 2: Core Attack Concepts & Mechanics */}
            <section className="space-y-3">
              <div className="flex items-center gap-2 text-black">
                <Target className="w-5 h-5 text-red-600" />
                <h3 className="font-display font-black text-lg uppercase tracking-tight">
                  Core Attack Vectors &amp; Technical Analysis
                </h3>
              </div>

              <div className="space-y-2.5">
                {activeLesson.keyTopics.map((topic, idx) => {
                  const isDone = completedItems.includes(topic);
                  return (
                    <div
                      key={idx}
                      onClick={() => onToggleItem && onToggleItem(topic)}
                      className={`p-3.5 rounded-xl border-2 transition-all cursor-pointer flex items-start gap-3 select-none ${
                        isDone
                          ? "bg-emerald-50 border-emerald-600 shadow-brutal-xs"
                          : "bg-white border-neutral-300 hover:border-black shadow-sm"
                      }`}
                    >
                      <div
                        className={`w-5 h-5 rounded-md border-2 flex items-center justify-center shrink-0 mt-0.5 transition-colors ${
                          isDone
                            ? "bg-emerald-500 border-emerald-700 text-white"
                            : "bg-neutral-100 border-neutral-400 hover:border-black"
                        }`}
                      >
                        <Check className="w-3.5 h-3.5 stroke-[3]" />
                      </div>
                      <span
                        className={`text-sm font-bold leading-relaxed ${
                          isDone ? "text-emerald-950 line-through opacity-75" : "text-black"
                        }`}
                      >
                        {topic}
                      </span>
                    </div>
                  );
                })}
              </div>
            </section>

            {/* Docs Section 3: Live Terminal Commands & Payloads */}
            {activeLesson.terminalCommands && activeLesson.terminalCommands.length > 0 && (
              <section className="space-y-3">
                <div className="flex items-center gap-2 text-black">
                  <Terminal className="w-5 h-5 text-emerald-600" />
                  <h3 className="font-display font-black text-lg uppercase tracking-tight">
                    Terminal Commands &amp; Exploit Payloads
                  </h3>
                </div>

                <div className="space-y-3">
                  {activeLesson.terminalCommands.map((cmd, idx) => {
                    const isCopied = copiedText === cmd;
                    return (
                      <div
                        key={idx}
                        className="rounded-xl border-2 border-black bg-neutral-950 overflow-hidden shadow-brutal-xs"
                      >
                        {/* Terminal Header */}
                        <div className="bg-neutral-900 px-4 py-2 flex items-center justify-between border-b border-neutral-800">
                          <div className="flex items-center gap-1.5">
                            <span className="w-2.5 h-2.5 rounded-full bg-rose-500" />
                            <span className="w-2.5 h-2.5 rounded-full bg-amber-500" />
                            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
                            <span className="text-[10px] font-mono text-neutral-400 ml-2">
                              offensive-bash
                            </span>
                          </div>

                          <button
                            type="button"
                            onClick={() => handleCopy(cmd)}
                            className="text-[11px] font-mono font-bold text-neutral-300 hover:text-white flex items-center gap-1 px-2 py-0.5 rounded bg-neutral-800 hover:bg-neutral-700 transition-colors"
                          >
                            {isCopied ? (
                              <>
                                <Check className="w-3 h-3 text-emerald-400" />
                                <span className="text-emerald-400">Copied!</span>
                              </>
                            ) : (
                              <>
                                <Copy className="w-3 h-3" />
                                <span>Copy</span>
                              </>
                            )}
                          </button>
                        </div>

                        {/* Terminal Body */}
                        <div className="p-4 overflow-x-auto">
                          <code className="text-emerald-400 font-mono text-xs sm:text-sm whitespace-pre">
                            $ {cmd}
                          </code>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </section>
            )}

            {/* Docs Section 4: Pro Tips & Hacker Warnings */}
            {activeLesson.proTips && activeLesson.proTips.length > 0 && (
              <section className="rounded-xl border-2 border-amber-500 bg-amber-50 p-5 space-y-2">
                <div className="flex items-center gap-2 text-amber-900 font-black text-sm uppercase">
                  <AlertCircle className="w-4 h-4 text-amber-600 shrink-0" />
                  <span>Pro Hacker Tip &amp; Bug Bounty Gotcha</span>
                </div>
                {activeLesson.proTips.map((tip, idx) => (
                  <p key={idx} className="text-xs sm:text-sm font-bold text-amber-950 leading-relaxed">
                    💡 {tip}
                  </p>
                ))}
              </section>
            )}

            {/* Docs Section 5: Hands-On Lab Exercise for Active Chapter */}
            <section className="rounded-2xl border-2 border-black bg-neutral-950 text-white p-6 space-y-4 shadow-brutal-sm">
              <div className="flex items-center justify-between flex-wrap gap-2">
                <div className="flex items-center gap-2">
                  <Laptop className="w-5 h-5 text-yellow-400" />
                  <h3 className="font-display font-black text-base sm:text-lg text-white uppercase tracking-tight">
                    Chapter Lab: {activeChapter.handsOnLab.title}
                  </h3>
                </div>
                <span className="px-2.5 py-0.5 rounded-full border border-yellow-400 bg-yellow-400/20 text-yellow-300 font-mono text-xs font-bold">
                  Interactive Lab Goal
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
                <div className="p-3 rounded-xl bg-neutral-900 border border-neutral-800">
                  <span className="text-neutral-400 uppercase font-mono font-bold block mb-1">
                    Target Environment
                  </span>
                  <span className="text-yellow-300 font-mono font-bold">
                    {activeChapter.handsOnLab.target}
                  </span>
                </div>
                <div className="p-3 rounded-xl bg-neutral-900 border border-neutral-800">
                  <span className="text-neutral-400 uppercase font-mono font-bold block mb-1">
                    Attack Mission
                  </span>
                  <span className="text-emerald-400 font-bold">
                    {activeChapter.handsOnLab.goal}
                  </span>
                </div>
              </div>

              {/* Lab Steps */}
              <div className="space-y-2 pt-2">
                <p className="text-xs font-black uppercase text-neutral-300 tracking-wider">
                  Attack Execution Steps:
                </p>
                <div className="space-y-2">
                  {activeChapter.handsOnLab.steps.map((step, idx) => (
                    <div
                      key={idx}
                      className="p-2.5 rounded-xl bg-neutral-900 border border-neutral-800 text-xs font-medium text-neutral-200 flex items-start gap-2.5"
                    >
                      <span className="w-5 h-5 rounded-full bg-yellow-400 text-black font-mono font-black flex items-center justify-center text-[10px] shrink-0 mt-0.5">
                        {idx + 1}
                      </span>
                      <span className="leading-relaxed">{step}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Lab Verification */}
              <div className="p-3 rounded-xl bg-emerald-950/60 border border-emerald-600/60 text-xs font-mono text-emerald-300 flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>
                  <strong>Success Flag:</strong> {activeChapter.handsOnLab.verification}
                </span>
              </div>
            </section>

            {/* Docs Section 6: Chapter Interactive Checklist */}
            <section className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-black">
                  <CheckSquare className="w-5 h-5 text-indigo-600" />
                  <h3 className="font-display font-black text-lg uppercase tracking-tight">
                    Chapter Verifiable Checklist
                  </h3>
                </div>
                <span className="text-xs font-mono font-bold text-neutral-500">
                  Click box to verify progress
                </span>
              </div>

              <div className="space-y-2">
                {activeChapter.checklist.map((item) => {
                  const isDone = completedItems.includes(item.id);
                  return (
                    <div
                      key={item.id}
                      onClick={() => onToggleItem && onToggleItem(item.id)}
                      className={`p-3 rounded-xl border-2 transition-all cursor-pointer flex items-center gap-3 select-none ${
                        isDone
                          ? "bg-emerald-50 border-emerald-600"
                          : "bg-white border-neutral-300 hover:border-black"
                      }`}
                    >
                      <div
                        className={`w-5 h-5 rounded-md border-2 flex items-center justify-center shrink-0 transition-colors ${
                          isDone
                            ? "bg-emerald-500 border-emerald-700 text-white"
                            : "bg-neutral-100 border-neutral-400 hover:border-black"
                        }`}
                      >
                        <Check className="w-3.5 h-3.5 stroke-[3]" />
                      </div>
                      <span
                        className={`text-xs sm:text-sm font-bold ${
                          isDone ? "text-emerald-950 line-through opacity-75" : "text-black"
                        }`}
                      >
                        {item.label}
                      </span>
                    </div>
                  );
                })}
              </div>
            </section>

            {/* ── DOCS BOTTOM PAGINATION (PREV / NEXT LESSON) ─────────── */}
            <div className="border-t-2 border-neutral-200 pt-6 flex items-center justify-between gap-4 flex-wrap">
              {prevLessonItem ? (
                <button
                  type="button"
                  onClick={() =>
                    navigateToLesson(prevLessonItem.chapterIndex, prevLessonItem.lesson.id)
                  }
                  className="px-4 py-3 rounded-xl border-2 border-black bg-white hover:bg-neutral-100 text-black font-black text-xs uppercase flex items-center gap-2 transition-all shadow-brutal-xs hover:shadow-brutal-sm cursor-pointer active:scale-95"
                >
                  <ArrowLeft className="w-4 h-4" />
                  <div className="text-left">
                    <span className="text-[10px] text-neutral-500 block font-mono">Previous Lesson</span>
                    <span>{prevLessonItem.lesson.lessonNumber} {prevLessonItem.lesson.title}</span>
                  </div>
                </button>
              ) : (
                <div />
              )}

              {nextLessonItem && (
                <button
                  type="button"
                  onClick={() =>
                    navigateToLesson(nextLessonItem.chapterIndex, nextLessonItem.lesson.id)
                  }
                  className="px-5 py-3 rounded-xl border-2 border-black bg-yellow-300 hover:bg-yellow-400 text-black font-black text-xs uppercase flex items-center gap-2 transition-all shadow-brutal hover:shadow-brutal-sm cursor-pointer active:scale-95 ml-auto"
                >
                  <div className="text-right">
                    <span className="text-[10px] text-neutral-700 block font-mono">Next Lesson</span>
                    <span>{nextLessonItem.lesson.lessonNumber} {nextLessonItem.lesson.title}</span>
                  </div>
                  <ArrowRight className="w-4 h-4" />
                </button>
              )}
            </div>
          </article>
        </main>
      </div>


    </div>
  );
}
