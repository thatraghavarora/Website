"use client";

import React, { useState, useMemo } from "react";
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
  ChevronUp,
  Lock,
  Unlock,
  Zap,
  Shield,
  Sparkles,
  ExternalLink,
  Laptop,
  AlertCircle,
  FileText,
  Play,
  Share2,
  CheckSquare,
  Square,
  Flame,
  Clock,
  Layers,
  Code2
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
  const [activeChapterIndex, setActiveChapterIndex] = useState(0);
  const [searchQuery, setSearchQuery] = useState("");
  const [expandedLessons, setExpandedLessons] = useState<Record<string, boolean>>({});
  const [copiedText, setCopiedText] = useState<string | null>(null);

  const activeChapter = chapterRoadmapList[activeChapterIndex] || chapterRoadmapList[0];

  // Copy helper
  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedText(text);
    setTimeout(() => setCopiedText(null), 2000);
  };

  // Toggle single lesson
  const toggleLesson = (lessonId: string) => {
    setExpandedLessons((prev) => ({
      ...prev,
      [lessonId]: !prev[lessonId],
    }));
  };

  // Expand / Collapse all in active chapter
  const toggleAllLessonsInChapter = (expand: boolean) => {
    const updated: Record<string, boolean> = { ...expandedLessons };
    activeChapter.lessons.forEach((l) => {
      updated[l.id] = expand;
    });
    setExpandedLessons(updated);
  };

  // Filter chapters/lessons if search is active
  const filteredChapters = useMemo(() => {
    if (!searchQuery.trim()) return chapterRoadmapList;
    const q = searchQuery.toLowerCase();
    return chapterRoadmapList.filter((ch) => {
      const inTitle = ch.title.toLowerCase().includes(q) || ch.subtitle.toLowerCase().includes(q);
      const inLessons = ch.lessons.some(
        (l) =>
          l.title.toLowerCase().includes(q) ||
          l.summary.toLowerCase().includes(q) ||
          l.keyTopics.some((t) => t.toLowerCase().includes(q))
      );
      const inChecklist = ch.checklist.some((c) => c.label.toLowerCase().includes(q));
      return inTitle || inLessons || inChecklist;
    });
  }, [searchQuery]);

  // Calculate stats for current chapter
  const chapterChecklistTotal = activeChapter.checklist.length;
  const chapterChecklistDone = activeChapter.checklist.filter((item) =>
    completedItems.includes(item.id)
  ).length;
  const chapterProgressPercent =
    chapterChecklistTotal > 0
      ? Math.round((chapterChecklistDone / chapterChecklistTotal) * 100)
      : 0;

  // Calculate overall curriculum stats
  const totalAllChecklistItems = useMemo(
    () => chapterRoadmapList.reduce((acc, ch) => acc + ch.checklist.length, 0),
    []
  );
  const totalAllCompleted = useMemo(
    () =>
      chapterRoadmapList.reduce(
        (acc, ch) =>
          acc + ch.checklist.filter((item) => completedItems.includes(item.id)).length,
        0
      ),
    [completedItems]
  );
  const overallProgressPercent =
    totalAllChecklistItems > 0
      ? Math.round((totalAllCompleted / totalAllChecklistItems) * 100)
      : 0;

  // Icon resolver
  const getChapterIcon = (iconName: string) => {
    switch (iconName) {
      case "Globe":
        return <Globe className="w-5 h-5 text-blue-600" />;
      case "Terminal":
        return <Terminal className="w-5 h-5 text-emerald-600" />;
      case "Search":
        return <Search className="w-5 h-5 text-indigo-600" />;
      case "Target":
        return <Target className="w-5 h-5 text-purple-600" />;
      case "Wrench":
        return <Wrench className="w-5 h-5 text-amber-600" />;
      case "Bug":
        return <Bug className="w-5 h-5 text-red-600" />;
      case "Flag":
        return <Flag className="w-5 h-5 text-teal-600" />;
      case "Award":
        return <Award className="w-5 h-5 text-yellow-600" />;
      default:
        return <BookOpen className="w-5 h-5 text-black" />;
    }
  };

  const getDifficultyBadgeColor = (difficulty: string) => {
    switch (difficulty) {
      case "Beginner":
        return "bg-emerald-100 text-emerald-900 border-emerald-400";
      case "Intermediate":
        return "bg-blue-100 text-blue-900 border-blue-400";
      case "Advanced":
        return "bg-purple-100 text-purple-900 border-purple-400";
      case "Expert":
        return "bg-rose-100 text-rose-900 border-rose-400";
      default:
        return "bg-gray-100 text-gray-900 border-gray-400";
    }
  };

  return (
    <div className="w-full space-y-6 font-sans">
      {/* Top Banner with Overall Stats & Search */}
      <div className="bg-[#fffdf0] border-4 border-black p-5 sm:p-6 shadow-[6px_6px_0px_0px_#000]">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-2 flex-wrap">
              <span className="px-3 py-1 bg-black text-white font-mono font-bold text-xs uppercase tracking-wider rounded-sm flex items-center gap-1.5">
                <Flame className="w-3.5 h-3.5 text-yellow-400" />
                Deep Chapter Curriculum
              </span>
              <span className="px-3 py-1 bg-yellow-300 text-black font-black text-xs uppercase tracking-wider border-2 border-black">
                10 Chapters • 60+ Lessons • Hands-On Labs
              </span>
              {syncStatus && (
                <span className="text-xs font-mono font-bold text-emerald-700 bg-emerald-100 px-2 py-0.5 border border-emerald-400 rounded-sm">
                  {syncStatus}
                </span>
              )}
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-black tracking-tight">
              Web Penetration Testing & Ethical Hacking Masterclass
            </h2>
            <p className="text-gray-700 text-sm mt-1 max-w-3xl">
              Zero-to-Hero structured chapter breakdown. Each chapter contains granular lessons, command lines, hands-on lab attack scenarios, and live verifiable checklists.
            </p>
          </div>

          {/* Overall Progress Widget */}
          <div className="bg-white border-3 border-black p-4 min-w-[240px] shadow-[4px_4px_0px_0px_#000]">
            <div className="flex items-center justify-between text-xs font-black uppercase mb-1">
              <span>Overall Progress</span>
              <span className="font-mono text-emerald-600 font-black">{overallProgressPercent}%</span>
            </div>
            <div className="w-full bg-gray-200 h-3.5 border-2 border-black overflow-hidden mb-2">
              <div
                className="bg-emerald-500 h-full transition-all duration-300 border-r-2 border-black"
                style={{ width: `${overallProgressPercent}%` }}
              />
            </div>
            <div className="flex items-center justify-between text-[11px] font-mono font-bold text-gray-600">
              <span>Completed: {totalAllCompleted} / {totalAllChecklistItems}</span>
              <span className="text-black font-black">10 Chapters</span>
            </div>
          </div>
        </div>

        {/* Search Bar */}
        <div className="mt-4 pt-4 border-t-2 border-black/20 flex flex-col sm:flex-row items-center gap-3">
          <div className="relative flex-1 w-full">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
            <input
              type="text"
              placeholder="Search chapters, lessons, tools, bugs (e.g. 'Wireshark', 'Burp Suite', 'SSRF', 'SQLi')..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 bg-white border-2 border-black font-medium text-sm focus:outline-none focus:ring-2 focus:ring-yellow-400"
            />
          </div>
          {searchQuery && (
            <button
              onClick={() => setSearchQuery("")}
              className="px-4 py-2.5 bg-gray-200 hover:bg-gray-300 font-mono text-xs font-bold border-2 border-black text-black"
            >
              Clear
            </button>
          )}
        </div>
      </div>

      {/* Main Chapter Navigation + Chapter Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Column: Chapters Navigation List */}
        <div className="lg:col-span-4 space-y-2.5">
          <div className="bg-black text-white p-3 font-mono font-bold text-xs uppercase tracking-wider flex items-center justify-between border-2 border-black">
            <span className="flex items-center gap-2">
              <Layers className="w-4 h-4 text-yellow-400" />
              Chapter Directory ({filteredChapters.length})
            </span>
            <span className="text-yellow-400 text-[11px]">Click to view</span>
          </div>

          <div className="space-y-2 max-h-[780px] overflow-y-auto pr-1">
            {filteredChapters.map((chapter) => {
              const chIndex = chapterRoadmapList.findIndex((c) => c.id === chapter.id);
              const isSelected = chIndex === activeChapterIndex;
              const chCompleted = chapter.checklist.filter((item) =>
                completedItems.includes(item.id)
              ).length;
              const chTotal = chapter.checklist.length;
              const chPercent = chTotal > 0 ? Math.round((chCompleted / chTotal) * 100) : 0;

              return (
                <button
                  key={chapter.id}
                  onClick={() => setActiveChapterIndex(chIndex)}
                  className={`w-full text-left p-3.5 border-3 border-black transition-all relative ${
                    isSelected
                      ? "bg-yellow-300 shadow-[4px_4px_0px_0px_#000] -translate-y-0.5"
                      : "bg-white hover:bg-yellow-50 hover:shadow-[2px_2px_0px_0px_#000]"
                  }`}
                >
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex items-center gap-2">
                      <div className="p-1.5 bg-white border-2 border-black rounded-sm">
                        {getChapterIcon(chapter.iconName)}
                      </div>
                      <div>
                        <span className="font-mono text-[11px] font-black uppercase text-gray-700 block">
                          Chapter {chapter.chapterNumber}
                        </span>
                        <h4 className="font-black text-sm text-black line-clamp-1 leading-tight">
                          {chapter.title}
                        </h4>
                      </div>
                    </div>
                    <span
                      className={`text-[10px] font-black uppercase px-2 py-0.5 border border-black rounded-sm shrink-0 ${getDifficultyBadgeColor(
                        chapter.difficulty
                      )}`}
                    >
                      {chapter.difficulty}
                    </span>
                  </div>

                  <div className="mt-2.5 pt-2 border-t border-black/15 flex items-center justify-between text-xs font-mono">
                    <span className="text-gray-600 text-[11px] flex items-center gap-1">
                      <BookOpen className="w-3 h-3 text-black" />
                      {chapter.lessons.length} Lessons
                    </span>
                    <span className="text-gray-600 text-[11px] flex items-center gap-1">
                      <Clock className="w-3 h-3 text-black" />
                      {chapter.duration}
                    </span>
                    <span
                      className={`text-[11px] font-black ${
                        chPercent === 100 ? "text-emerald-700" : "text-black"
                      }`}
                    >
                      {chPercent}% Done
                    </span>
                  </div>

                  {/* Micro Progress Bar */}
                  <div className="w-full bg-gray-200 h-1.5 border border-black overflow-hidden mt-1.5">
                    <div
                      className="bg-emerald-500 h-full transition-all duration-300"
                      style={{ width: `${chPercent}%` }}
                    />
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Right Column: Active Chapter Deep View */}
        <div className="lg:col-span-8 space-y-6">
          {/* Chapter Header Card */}
          <div className="bg-white border-4 border-black p-6 shadow-[6px_6px_0px_0px_#000]">
            <div className="flex flex-wrap items-center justify-between gap-3 mb-3">
              <div className="flex items-center gap-2">
                <span className="px-3 py-1 bg-black text-yellow-400 font-mono font-black text-xs uppercase tracking-wider border border-black">
                  CHAPTER {activeChapter.chapterNumber} OF 10
                </span>
                <span
                  className={`text-xs font-black uppercase px-2.5 py-1 border-2 border-black ${getDifficultyBadgeColor(
                    activeChapter.difficulty
                  )}`}
                >
                  {activeChapter.difficulty}
                </span>
                <span className="text-xs font-mono font-bold bg-gray-100 text-gray-800 px-2.5 py-1 border border-black flex items-center gap-1">
                  <Clock className="w-3 h-3 text-black" />
                  {activeChapter.duration}
                </span>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => toggleAllLessonsInChapter(true)}
                  className="px-2.5 py-1 bg-white hover:bg-gray-100 border-2 border-black font-mono text-[11px] font-bold text-black"
                >
                  Expand All
                </button>
                <button
                  onClick={() => toggleAllLessonsInChapter(false)}
                  className="px-2.5 py-1 bg-white hover:bg-gray-100 border-2 border-black font-mono text-[11px] font-bold text-black"
                >
                  Collapse All
                </button>
              </div>
            </div>

            <h1 className="text-2xl sm:text-3xl font-black text-black tracking-tight leading-snug">
              {activeChapter.title}
            </h1>
            <p className="text-gray-600 font-mono text-xs sm:text-sm mt-1 font-semibold">
              {activeChapter.subtitle}
            </p>
            <p className="text-gray-800 text-sm mt-3 leading-relaxed bg-amber-50/70 p-3 border-l-4 border-yellow-500 font-medium">
              {activeChapter.description}
            </p>

            {/* Chapter Checklist Progress Bar */}
            <div className="mt-4 pt-4 border-t-2 border-black/15 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div className="flex items-center gap-2 font-mono text-xs font-bold text-black">
                <CheckSquare className="w-4 h-4 text-emerald-600" />
                <span>Chapter Mastery: {chapterChecklistDone} / {chapterChecklistTotal} completed</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-36 bg-gray-200 h-3 border-2 border-black overflow-hidden">
                  <div
                    className="bg-emerald-500 h-full transition-all duration-300"
                    style={{ width: `${chapterProgressPercent}%` }}
                  />
                </div>
                <span className="font-mono text-xs font-black text-black">
                  {chapterProgressPercent}%
                </span>
              </div>
            </div>
          </div>

          {/* Locked Overlay Warning if visitor hasn't purchased */}
          {!isUnlocked && (
            <div className="bg-rose-50 border-4 border-black p-5 shadow-[4px_4px_0px_0px_#000] flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="p-3 bg-rose-500 text-white border-2 border-black">
                  <Lock className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="font-black text-base text-black">Full Chapter Content Locked</h4>
                  <p className="text-xs text-gray-700">
                    Unlock all 10 chapters, terminal exploits, hands-on lab guides, and interactive checklists.
                  </p>
                </div>
              </div>
              {onRequestUnlock && (
                <button
                  onClick={onRequestUnlock}
                  className="px-5 py-2.5 bg-yellow-400 hover:bg-yellow-300 text-black font-black text-sm border-2 border-black shadow-[2px_2px_0px_0px_#000] shrink-0"
                >
                  Unlock Full Roadmap
                </button>
              )}
            </div>
          )}

          {/* Section: Granular Lessons Accordion */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-black text-black uppercase tracking-wide flex items-center gap-2">
                <BookOpen className="w-5 h-5 text-black" />
                Structured Lessons ({activeChapter.lessons.length})
              </h3>
              <span className="text-xs font-mono text-gray-600 font-bold">
                Step-by-step technical breakdown
              </span>
            </div>

            <div className="space-y-3">
              {activeChapter.lessons.map((lesson) => {
                const isExpanded = expandedLessons[lesson.id] ?? false;

                return (
                  <div
                    key={lesson.id}
                    className="bg-white border-3 border-black shadow-[3px_3px_0px_0px_#000] transition-all"
                  >
                    {/* Lesson Header Clickable */}
                    <button
                      onClick={() => toggleLesson(lesson.id)}
                      className="w-full text-left p-4 flex items-center justify-between gap-3 hover:bg-yellow-50/50 transition-colors"
                    >
                      <div className="flex items-start sm:items-center gap-3">
                        <span className="px-2.5 py-1 bg-black text-white font-mono font-bold text-xs border border-black shrink-0">
                          {lesson.lessonNumber}
                        </span>
                        <div>
                          <div className="flex items-center gap-2 flex-wrap">
                            <h4 className="font-black text-base text-black">{lesson.title}</h4>
                            {lesson.badge && (
                              <span className="text-[10px] font-mono font-black uppercase px-2 py-0.5 bg-yellow-200 text-black border border-black">
                                {lesson.badge}
                              </span>
                            )}
                          </div>
                          <p className="text-xs text-gray-600 mt-0.5 line-clamp-1">{lesson.summary}</p>
                        </div>
                      </div>

                      <div className="flex items-center gap-2 shrink-0">
                        <span className="font-mono text-xs font-bold text-gray-500 hidden sm:inline-flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          {lesson.duration}
                        </span>
                        <div className="p-1 bg-gray-100 border border-black">
                          {isExpanded ? (
                            <ChevronUp className="w-4 h-4 text-black" />
                          ) : (
                            <ChevronDown className="w-4 h-4 text-black" />
                          )}
                        </div>
                      </div>
                    </button>

                    {/* Lesson Body Content */}
                    {isExpanded && (
                      <div className="p-4 pt-2 border-t-2 border-black/20 bg-stone-50 space-y-4">
                        {/* Summary */}
                        <div className="bg-white p-3 border-2 border-black">
                          <span className="font-mono text-[11px] font-black uppercase text-gray-500 block mb-1">
                            Lesson Overview
                          </span>
                          <p className="text-xs sm:text-sm text-gray-800 leading-relaxed font-medium">
                            {lesson.summary}
                          </p>
                        </div>

                        {/* Key Topics Covered */}
                        {lesson.keyTopics && lesson.keyTopics.length > 0 && (
                          <div className="bg-white p-3 border-2 border-black">
                            <span className="font-mono text-[11px] font-black uppercase text-black block mb-2 flex items-center gap-1.5">
                              <Sparkles className="w-3.5 h-3.5 text-yellow-600" />
                              Key Concepts & Attack Mechanics
                            </span>
                            <ul className="grid grid-cols-1 md:grid-cols-2 gap-2">
                              {lesson.keyTopics.map((topic, tidx) => (
                                <li
                                  key={tidx}
                                  className="flex items-start gap-2 text-xs font-semibold text-gray-800"
                                >
                                  <span className="w-1.5 h-1.5 rounded-full bg-black mt-1.5 shrink-0" />
                                  <span>{topic}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}

                        {/* Terminal Commands / Exploits */}
                        {lesson.terminalCommands && lesson.terminalCommands.length > 0 && (
                          <div className="space-y-2">
                            <span className="font-mono text-[11px] font-black uppercase text-emerald-800 block flex items-center gap-1.5">
                              <Terminal className="w-3.5 h-3.5 text-emerald-700" />
                              Offensive Terminal Commands & Syntax
                            </span>
                            <div className="space-y-1.5">
                              {lesson.terminalCommands.map((cmd, cidx) => (
                                <div
                                  key={cidx}
                                  className="bg-black text-emerald-400 font-mono text-xs p-3 border-2 border-black flex items-center justify-between gap-3 overflow-x-auto"
                                >
                                  <span className="select-all break-all whitespace-pre-wrap">{cmd}</span>
                                  <button
                                    onClick={() => handleCopy(cmd)}
                                    className="px-2 py-1 bg-zinc-800 hover:bg-zinc-700 text-white font-mono text-[11px] border border-zinc-600 flex items-center gap-1 shrink-0"
                                    title="Copy Command"
                                  >
                                    {copiedText === cmd ? (
                                      <>
                                        <Check className="w-3 h-3 text-emerald-400" />
                                        <span>Copied</span>
                                      </>
                                    ) : (
                                      <>
                                        <Copy className="w-3 h-3" />
                                        <span>Copy</span>
                                      </>
                                    )}
                                  </button>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}

                        {/* Pro Tips / Insider Insights */}
                        {lesson.proTips && lesson.proTips.length > 0 && (
                          <div className="bg-amber-100/70 border-2 border-black p-3 space-y-1.5">
                            <span className="font-mono text-[11px] font-black uppercase text-amber-900 block flex items-center gap-1.5">
                              <Zap className="w-3.5 h-3.5 text-amber-600" />
                              Hacker Pro-Tip & Bug Bounty Intel
                            </span>
                            {lesson.proTips.map((tip, pidx) => (
                              <p key={pidx} className="text-xs font-semibold text-amber-950 flex items-start gap-2">
                                <span className="text-amber-700 font-bold shrink-0">⚡</span>
                                <span>{tip}</span>
                              </p>
                            ))}
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Section: Hands-On Lab Objective Card */}
          {activeChapter.handsOnLab && (
            <div className="bg-[#111] text-white border-4 border-black p-5 sm:p-6 shadow-[6px_6px_0px_0px_#000] space-y-4">
              <div className="flex items-center justify-between flex-wrap gap-2">
                <div className="flex items-center gap-2">
                  <div className="p-2 bg-yellow-400 text-black border border-black">
                    <Laptop className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="font-mono text-xs font-black uppercase text-yellow-400 tracking-wider block">
                      Hands-On Lab Scenario
                    </span>
                    <h3 className="text-lg sm:text-xl font-black text-white">
                      {activeChapter.handsOnLab.title}
                    </h3>
                  </div>
                </div>
                <span className="font-mono text-xs font-bold px-2.5 py-1 bg-zinc-800 text-zinc-300 border border-zinc-700">
                  Target: {activeChapter.handsOnLab.target}
                </span>
              </div>

              <div className="bg-zinc-900 border border-zinc-800 p-3.5 space-y-2">
                <div className="flex items-start gap-2">
                  <Target className="w-4 h-4 text-rose-400 mt-0.5 shrink-0" />
                  <p className="text-xs sm:text-sm font-semibold text-zinc-200">
                    <strong className="text-yellow-400">Mission Goal:</strong>{" "}
                    {activeChapter.handsOnLab.goal}
                  </p>
                </div>
              </div>

              {/* Lab Steps */}
              <div className="space-y-2">
                <span className="font-mono text-xs font-bold uppercase text-zinc-400 block">
                  Execution Procedure:
                </span>
                <div className="space-y-2">
                  {activeChapter.handsOnLab.steps.map((step, sidx) => (
                    <div
                      key={sidx}
                      className="bg-black/80 border border-zinc-700 p-3 font-mono text-xs flex items-start gap-2.5"
                    >
                      <span className="px-1.5 py-0.5 bg-yellow-400 text-black font-black text-[10px] shrink-0">
                        STEP {sidx + 1}
                      </span>
                      <span className="text-zinc-200 font-sans text-xs font-medium">{step}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Verification & Flag */}
              <div className="bg-emerald-950/60 border border-emerald-500/50 p-3 flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 mt-0.5 shrink-0" />
                <div className="text-xs font-medium">
                  <strong className="text-emerald-300 font-mono uppercase block text-[11px]">
                    Proof of Verification:
                  </strong>
                  <span className="text-emerald-100">{activeChapter.handsOnLab.verification}</span>
                </div>
              </div>
            </div>
          )}

          {/* Section: Verifiable Checklist & Live Progress Sync */}
          <div className="bg-white border-4 border-black p-5 sm:p-6 shadow-[6px_6px_0px_0px_#000] space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b-2 border-black/15 pb-3">
              <div>
                <h3 className="text-lg font-black text-black uppercase tracking-wide flex items-center gap-2">
                  <CheckSquare className="w-5 h-5 text-emerald-600" />
                  Chapter Checklist & Verification ({chapterChecklistDone}/{chapterChecklistTotal})
                </h3>
                <p className="text-xs text-gray-600 font-medium mt-0.5">
                  Check off items as you study or execute labs. Progress saves in Supabase DB.
                </p>
              </div>
              <span className="font-mono text-xs font-black px-2.5 py-1 bg-yellow-200 text-black border border-black shrink-0">
                {chapterProgressPercent}% Completed
              </span>
            </div>

            <div className="space-y-2">
              {activeChapter.checklist.map((item) => {
                const isChecked = completedItems.includes(item.id);

                return (
                  <div
                    key={item.id}
                    onClick={() => onToggleItem && onToggleItem(item.id)}
                    className={`p-3 border-2 border-black flex items-start gap-3 cursor-pointer transition-all ${
                      isChecked
                        ? "bg-emerald-50 border-emerald-600 text-emerald-950"
                        : "bg-white hover:bg-yellow-50 text-gray-900"
                    }`}
                  >
                    <div className="mt-0.5 shrink-0">
                      {isChecked ? (
                        <div className="w-5 h-5 bg-emerald-600 text-white flex items-center justify-center border border-black">
                          <Check className="w-3.5 h-3.5 stroke-[3]" />
                        </div>
                      ) : (
                        <div className="w-5 h-5 bg-white border-2 border-black hover:border-emerald-600" />
                      )}
                    </div>
                    <div className="flex-1">
                      <p
                        className={`text-xs sm:text-sm font-bold leading-snug select-none ${
                          isChecked ? "line-through text-emerald-800" : "text-black"
                        }`}
                      >
                        {item.label}
                      </p>
                      <span className="font-mono text-[10px] text-gray-500 block mt-0.5">
                        ID: {item.id}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Bottom Next/Prev Chapter Navigation Buttons */}
          <div className="flex items-center justify-between pt-2">
            <button
              disabled={activeChapterIndex === 0}
              onClick={() => {
                setActiveChapterIndex((prev) => Math.max(0, prev - 1));
                window.scrollTo({ top: 100, behavior: "smooth" });
              }}
              className={`px-4 py-2.5 border-3 border-black font-mono text-xs font-black uppercase flex items-center gap-2 ${
                activeChapterIndex === 0
                  ? "opacity-40 cursor-not-allowed bg-gray-200"
                  : "bg-white hover:bg-yellow-300 shadow-[3px_3px_0px_0px_#000]"
              }`}
            >
              ← Prev Chapter
            </button>

            <span className="font-mono text-xs font-bold text-gray-600">
              Chapter {activeChapter.chapterNumber} of {chapterRoadmapList.length}
            </span>

            <button
              disabled={activeChapterIndex === chapterRoadmapList.length - 1}
              onClick={() => {
                setActiveChapterIndex((prev) => Math.min(chapterRoadmapList.length - 1, prev + 1));
                window.scrollTo({ top: 100, behavior: "smooth" });
              }}
              className={`px-4 py-2.5 border-3 border-black font-mono text-xs font-black uppercase flex items-center gap-2 ${
                activeChapterIndex === chapterRoadmapList.length - 1
                  ? "opacity-40 cursor-not-allowed bg-gray-200"
                  : "bg-yellow-400 hover:bg-yellow-300 shadow-[3px_3px_0px_0px_#000]"
              }`}
            >
              Next Chapter →
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
