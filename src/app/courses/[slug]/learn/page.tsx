"use client";

import React, { useState, useEffect, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import { useParams, useSearchParams } from "next/navigation";
import {
  ArrowLeft,
  CheckCircle2,
  Circle,
  Play,
  ChevronLeft,
  ChevronRight,
  BookOpen,
  Terminal,
  HelpCircle,
  Download,
  ExternalLink,
  Copy,
  Check,
  Shield,
  Search,
  Menu,
  X,
  Sparkles,
  Layers,
  Zap,
  Info,
  FileText,
  AlertTriangle,
  Monitor,
  Maximize2
} from "lucide-react";
import confetti from "canvas-confetti";
import { courses } from "@/data/siteData";
import { nmapCourseData, NmapLecture } from "@/data/nmapCourseContent";

function CourseLearnContent() {
  const params = useParams();
  const searchParams = useSearchParams();
  const slug = params?.slug as string;

  const currentCourse = useMemo(() => {
    return courses.find((c) => c.slug === slug) || courses[0];
  }, [slug]);

  // Read query params for module and lecture index if present
  const initialMod = parseInt(searchParams.get("module") || "0", 10);
  const initialLec = parseInt(searchParams.get("lecture") || "0", 10);

  const [activeModuleIdx, setActiveModuleIdx] = useState(
    isNaN(initialMod) || initialMod < 0 || initialMod >= nmapCourseData.modules.length ? 0 : initialMod
  );
  const [activeLectureIdx, setActiveLectureIdx] = useState(
    isNaN(initialLec) || initialLec < 0 ? 0 : initialLec
  );

  const [completedLectures, setCompletedLectures] = useState<string[]>([]);
  const [activeTab, setActiveTab] = useState<"notes" | "terminal" | "quiz" | "resources">("notes");
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [copiedText, setCopiedText] = useState<string | null>(null);

  // Terminal Simulator State
  const [simCommand, setSimCommand] = useState("nmap -sT 192.168.1.12 --top-ports 50");
  const [terminalOutput, setTerminalOutput] = useState<string | null>(null);
  const [isScanning, setIsScanning] = useState(false);

  // Quiz State
  const [selectedQuizOption, setSelectedQuizOption] = useState<number | null>(null);
  const [quizSubmitted, setQuizSubmitted] = useState(false);

  // Image Lightbox / Zoom State
  const [selectedImage, setSelectedImage] = useState<{ src: string; alt: string; caption: string } | null>(null);

  // Load completed lectures from localStorage
  useEffect(() => {
    try {
      const saved = localStorage.getItem(`course_progress_${slug}`);
      if (saved) {
        setCompletedLectures(JSON.parse(saved));
      }
    } catch {
      // ignore
    }
  }, [slug]);

  // Save completed lectures
  const saveCompletion = (newCompleted: string[]) => {
    setCompletedLectures(newCompleted);
    try {
      localStorage.setItem(`course_progress_${slug}`, JSON.stringify(newCompleted));
    } catch {
      // ignore
    }
  };

  const currentModule = nmapCourseData.modules[activeModuleIdx] || nmapCourseData.modules[0];
  const currentLecture = currentModule.lectures[activeLectureIdx] || currentModule.lectures[0];

  // Calculate total lectures and progress percentage
  const totalLecturesCount = useMemo(() => {
    return nmapCourseData.modules.reduce((acc, m) => acc + m.lectures.length, 0);
  }, []);

  const progressPercentage = useMemo(() => {
    if (totalLecturesCount === 0) return 0;
    return Math.round((completedLectures.length / totalLecturesCount) * 100);
  }, [completedLectures, totalLecturesCount]);

  const isCurrentCompleted = completedLectures.includes(currentLecture.id);

  const toggleComplete = () => {
    if (isCurrentCompleted) {
      saveCompletion(completedLectures.filter((id) => id !== currentLecture.id));
    } else {
      const updated = [...completedLectures, currentLecture.id];
      saveCompletion(updated);
      confetti({
        particleCount: 80,
        spread: 60,
        origin: { y: 0.7 }
      });
    }
  };

  // Navigate between lectures
  const goToNextLecture = () => {
    if (activeLectureIdx < currentModule.lectures.length - 1) {
      setActiveLectureIdx(activeLectureIdx + 1);
    } else if (activeModuleIdx < nmapCourseData.modules.length - 1) {
      setActiveModuleIdx(activeModuleIdx + 1);
      setActiveLectureIdx(0);
    }
    window.scrollTo({ top: 0, behavior: "smooth" });
    setQuizSubmitted(false);
    setSelectedQuizOption(null);
  };

  const goToPrevLecture = () => {
    if (activeLectureIdx > 0) {
      setActiveLectureIdx(activeLectureIdx - 1);
    } else if (activeModuleIdx > 0) {
      const prevMod = nmapCourseData.modules[activeModuleIdx - 1];
      setActiveModuleIdx(activeModuleIdx - 1);
      setActiveLectureIdx(prevMod.lectures.length - 1);
    }
    window.scrollTo({ top: 0, behavior: "smooth" });
    setQuizSubmitted(false);
    setSelectedQuizOption(null);
  };

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedText(text);
    setTimeout(() => setCopiedText(null), 2000);
  };

  // Run simulated scan in terminal simulator
  const handleRunScan = (cmdToRun?: string) => {
    const cmd = (cmdToRun || simCommand).trim();
    setIsScanning(true);
    setTerminalOutput(null);

    setTimeout(() => {
      setIsScanning(false);
      if (cmd.includes("-sT") || cmd.includes("connect")) {
        setTerminalOutput(`Starting Nmap 7.80 ( https://nmap.org ) at 2026-09-19 14:22 UTC
Nmap scan report for 192.168.1.12
Host is up (0.00041s latency).
Not shown: 41 closed ports
PORT    STATE SERVICE
21/tcp  open  ftp
22/tcp  open  ssh
23/tcp  open  telnet
25/tcp  open  smtp
53/tcp  open  domain
80/tcp  open  http
110/tcp open  pop3
139/tcp open  netbios-ssn
445/tcp open  microsoft-ds

Nmap done: 1 IP address (1 host up) scanned in 0.05 seconds`);
      } else if (cmd.includes("-sS") || cmd.includes("syn")) {
        setTerminalOutput(`Starting Nmap 7.80 ( https://nmap.org ) at 2026-09-19 14:35 UTC
Nmap scan report for 192.168.1.12
Host is up (0.00038s latency).
Not shown: 41 closed ports
PORT    STATE SERVICE
21/tcp  open  ftp
22/tcp  open  ssh
23/tcp  open  telnet
25/tcp  open  smtp
53/tcp  open  domain
80/tcp  open  http
110/tcp open  pop3
139/tcp open  netbios-ssn
445/tcp open  microsoft-ds

Nmap done: 1 IP address (1 host up) scanned in 0.04 seconds`);
      } else if (cmd.includes("-sU") || cmd.includes("udp")) {
        setTerminalOutput(`Starting Nmap 7.80 ( https://nmap.org ) at 2026-09-19 14:48 UTC
Nmap scan report for 192.168.1.12
Host is up (0.00045s latency).
Not shown: 48 closed ports
PORT    STATE SERVICE
53/udp  open  domain
137/udp open  netbios-ns

Nmap done: 1 IP address (1 host up) scanned in 1.42 seconds`);
      } else if (cmd.includes("-sn") || cmd.includes("ping") || cmd.includes("-sP")) {
        setTerminalOutput(`Starting Nmap 7.80 ( https://nmap.org ) at 2026-09-19 14:55 UTC
Nmap scan report for 192.168.1.12
Host is up (0.00032s latency).
MAC Address: 08:00:27:84:5D:89 (Oracle VirtualBox virtual NIC)
Nmap done: 256 IP addresses (1 host up) scanned in 2.15 seconds`);
      } else if (cmd.includes("--version")) {
        setTerminalOutput(`Nmap version 7.80 ( https://nmap.org )
Platform: x86_64-pc-linux-gnu
Compiled with: liblua-5.3.3 openssl-1.1.1 libpcre-8.39 libpcap-1.8.1 nmap-libdnet-1.12 ipv6
Compiled without:
Available nsock engines: epoll poll select`);
      } else {
        setTerminalOutput(`Starting Nmap 7.80 ( https://nmap.org )
Nmap scan report for 192.168.1.12
Host is up (0.00035s latency).
PORT     STATE SERVICE
22/tcp   open  ssh
80/tcp   open  http
445/tcp  open  microsoft-ds
Nmap done: 1 IP address scanned in 0.12 seconds`);
      }
    }, 450);
  };

  // Filter lectures in search
  const filteredModules = useMemo(() => {
    if (!searchQuery.trim()) return nmapCourseData.modules;
    const query = searchQuery.toLowerCase();
    return nmapCourseData.modules
      .map((m) => ({
        ...m,
        lectures: m.lectures.filter(
          (l) =>
            l.title.toLowerCase().includes(query) ||
            l.overview.toLowerCase().includes(query) ||
            l.definition.what.toLowerCase().includes(query)
        )
      }))
      .filter((m) => m.lectures.length > 0);
  }, [searchQuery]);

  return (
    <div className="min-h-screen bg-[#FDFBF7] dark:bg-neutral-950 text-neutral-900 dark:text-neutral-100 flex flex-col font-sans">
      {/* Top Interactive Sticky Navbar */}
      <header className="sticky top-0 z-40 bg-white/95 dark:bg-neutral-900/95 backdrop-blur-md border-b-[3px] border-black px-4 sm:px-6 py-3 flex items-center justify-between shadow-sm">
        <div className="flex items-center gap-3 sm:gap-4 overflow-hidden">
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="p-1.5 rounded-lg border-2 border-black hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors shrink-0"
            title="Toggle Curriculum Sidebar"
          >
            {sidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>

          <Link
            href={`/courses/${slug}`}
            className="hidden sm:inline-flex items-center gap-1.5 font-black text-xs uppercase tracking-wider text-neutral-700 dark:text-neutral-300 hover:text-black dark:hover:text-white shrink-0 border-2 border-black px-2.5 py-1 rounded-lg bg-neutral-50 dark:bg-neutral-800"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Course Details</span>
          </Link>

          <div className="h-6 w-[2px] bg-neutral-300 dark:bg-neutral-700 hidden sm:block shrink-0" />

          <div className="truncate">
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-black uppercase tracking-wider bg-yellow-300 text-black px-2 py-0.5 rounded border border-black shrink-0">
                {currentModule.sectionTitle.split(":")[0]}
              </span>
              <h1 className="font-display font-black text-xs sm:text-sm md:text-base truncate">
                {currentLecture.title}
              </h1>
            </div>
          </div>
        </div>

        {/* Right side controls: Progress and Mark Complete */}
        <div className="flex items-center gap-3 shrink-0">
          {/* Progress Pill */}
          <div className="hidden md:flex items-center gap-2.5 bg-neutral-100 dark:bg-neutral-800 border-2 border-black px-3 py-1.5 rounded-full">
            <span className="text-xs font-black">{progressPercentage}% Done</span>
            <div className="w-20 bg-neutral-200 dark:bg-neutral-700 h-2 rounded-full overflow-hidden border border-black/40">
              <div
                className="bg-emerald-500 h-full transition-all duration-300 rounded-full"
                style={{ width: `${progressPercentage}%` }}
              />
            </div>
          </div>

          <button
            onClick={toggleComplete}
            className={`btn-brutal text-xs sm:text-sm font-black px-3.5 py-1.5 flex items-center gap-1.5 transition-all ${
              isCurrentCompleted
                ? "bg-emerald-400 text-black border-2 border-black shadow-brutal-sm"
                : "bg-white dark:bg-neutral-800 text-black dark:text-white border-2 border-black hover:bg-neutral-100"
            }`}
          >
            {isCurrentCompleted ? (
              <>
                <CheckCircle2 className="w-4 h-4 text-black stroke-[3]" />
                <span className="hidden sm:inline">Completed</span>
              </>
            ) : (
              <>
                <Circle className="w-4 h-4 text-neutral-400" />
                <span className="hidden sm:inline">Mark Complete</span>
              </>
            )}
          </button>
        </div>
      </header>

      {/* Main Container: Sidebar + Content */}
      <div className="flex-1 flex overflow-hidden">
        {/* Left Curriculum Sidebar */}
        <aside
          className={`${
            sidebarOpen ? "w-80 sm:w-96 translate-x-0" : "-translate-x-full w-0"
          } fixed inset-y-0 left-0 top-[57px] z-30 bg-white dark:bg-neutral-900 border-r-[3px] border-black transition-all duration-300 flex flex-col md:relative md:top-0 md:translate-x-0 overflow-y-auto shrink-0`}
        >
          {/* Sidebar Search */}
          <div className="p-4 border-b-2 border-black sticky top-0 bg-white dark:bg-neutral-900 z-10">
            <div className="relative">
              <Search className="w-4 h-4 absolute left-3 top-3 text-neutral-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search lectures, scan types..."
                className="w-full pl-9 pr-3 py-2 text-xs font-bold border-2 border-black rounded-xl bg-neutral-50 dark:bg-neutral-800 text-black dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          {/* Module & Lecture Accordion List */}
          <div className="p-4 space-y-4 flex-1">
            {filteredModules.map((module, mIdx) => {
              const realModIdx = nmapCourseData.modules.findIndex((m) => m.id === module.id);
              const isModuleActive = realModIdx === activeModuleIdx;

              return (
                <div
                  key={module.id}
                  className="rounded-2xl border-2 border-black bg-neutral-50 dark:bg-neutral-800/50 overflow-hidden shadow-brutal-sm"
                >
                  <div
                    onClick={() => setActiveModuleIdx(realModIdx)}
                    className="p-3 bg-neutral-100 dark:bg-neutral-800 border-b-2 border-black cursor-pointer flex items-center justify-between hover:bg-neutral-200 dark:hover:bg-neutral-700 transition-colors"
                  >
                    <div>
                      <span className="text-[10px] font-black uppercase text-blue-600 dark:text-blue-400">
                        Module {module.moduleNumber}
                      </span>
                      <h3 className="text-xs font-black text-black dark:text-white leading-tight">
                        {module.sectionTitle.replace(/^Module \d+:\s*/, "")}
                      </h3>
                    </div>
                    <span className="text-[11px] font-bold text-neutral-500 bg-white dark:bg-neutral-900 px-2 py-0.5 rounded border border-black/30">
                      {module.lectures.length}
                    </span>
                  </div>

                  {/* Lectures list */}
                  <div className="divide-y divide-neutral-200 dark:divide-neutral-700/50 bg-white dark:bg-neutral-900">
                    {module.lectures.map((lecture, lIdx) => {
                      const realLecIdx = nmapCourseData.modules[realModIdx].lectures.findIndex(
                        (l) => l.id === lecture.id
                      );
                      const isSelected = isModuleActive && realLecIdx === activeLectureIdx;
                      const isDone = completedLectures.includes(lecture.id);

                      return (
                        <button
                          key={lecture.id}
                          onClick={() => {
                            setActiveModuleIdx(realModIdx);
                            setActiveLectureIdx(realLecIdx);
                            setQuizSubmitted(false);
                            setSelectedQuizOption(null);
                            if (window.innerWidth < 768) setSidebarOpen(false);
                          }}
                          className={`w-full text-left p-3 flex items-start gap-2.5 transition-colors ${
                            isSelected
                              ? "bg-yellow-200/90 dark:bg-neutral-800 border-l-4 border-l-black font-black"
                              : "hover:bg-neutral-50 dark:hover:bg-neutral-800/60"
                          }`}
                        >
                          <div className="mt-0.5 shrink-0">
                            {isDone ? (
                              <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 stroke-[2.5]" />
                            ) : isSelected ? (
                              <Play className="w-4 h-4 text-blue-600 dark:text-blue-400 fill-blue-600" />
                            ) : (
                              <Circle className="w-4 h-4 text-neutral-400" />
                            )}
                          </div>
                          <div className="flex-1 min-w-0">
                            <p
                              className={`text-xs leading-snug line-clamp-2 ${
                                isSelected
                                  ? "text-black dark:text-white font-black"
                                  : "text-neutral-700 dark:text-neutral-300 font-bold"
                              }`}
                            >
                              {lecture.title}
                            </p>
                            <span className="text-[10px] text-neutral-500 font-medium">
                              {lecture.duration}
                            </span>
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Sidebar Footer Link */}
          <div className="p-4 border-t-2 border-black bg-neutral-100 dark:bg-neutral-800 text-xs">
            <p className="font-bold text-neutral-600 dark:text-neutral-400 mb-2">
              Curriculum Source:
            </p>
            <a
              href={nmapCourseData.sourceUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 font-black text-blue-600 dark:text-blue-400 hover:underline"
            >
              <span>GeeksforGeeks Nmap Article</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>
        </aside>

        {/* Main Content Area */}
        <main className="flex-1 overflow-y-auto px-4 sm:px-8 py-8 max-w-5xl mx-auto space-y-8">
          {/* Lecture Header Banner */}
          <div className="rounded-3xl border-[3.5px] border-black bg-white dark:bg-neutral-900 p-6 sm:p-8 shadow-brutal-lg">
            <div className="flex flex-wrap items-center gap-2 mb-3">
              <span className="px-3 py-1 rounded-full border-2 border-black bg-purple-200 text-purple-900 font-black text-xs uppercase tracking-wider">
                {currentModule.sectionTitle.split(":")[0]}
              </span>
              <span className="px-3 py-1 rounded-full border-2 border-black bg-emerald-200 text-emerald-900 font-black text-xs uppercase tracking-wider">
                Lesson {activeModuleIdx + 1}.{activeLectureIdx + 1}
              </span>
              <span className="px-3 py-1 rounded-full border-2 border-black bg-blue-100 text-blue-900 font-black text-xs uppercase tracking-wider">
                {currentLecture.duration}
              </span>
            </div>

            <h2 className="text-2xl sm:text-4xl font-black text-black dark:text-white font-display tracking-tight mb-4 leading-tight">
              {currentLecture.title}
            </h2>

            <p className="text-sm sm:text-base font-medium text-neutral-700 dark:text-neutral-300 leading-relaxed">
              {currentLecture.overview}
            </p>
          </div>

          {/* Interactive Mode Tabs */}
          <div className="flex flex-wrap items-center gap-2 pb-2 border-b-2 border-neutral-300 dark:border-neutral-800">
            <button
              onClick={() => setActiveTab("notes")}
              className={`px-4 py-2 rounded-xl font-black text-xs sm:text-sm border-2 border-black flex items-center gap-2 transition-all ${
                activeTab === "notes"
                  ? "bg-yellow-300 text-black shadow-brutal-sm -translate-y-0.5"
                  : "bg-white dark:bg-neutral-800 text-black dark:text-white hover:bg-neutral-100"
              }`}
            >
              <BookOpen className="w-4 h-4" />
              <span>Study Notes &amp; Diagrams</span>
            </button>

            <button
              onClick={() => {
                setActiveTab("terminal");
                if (currentLecture.terminalOutput) {
                  setSimCommand(currentLecture.terminalOutput.command);
                  handleRunScan(currentLecture.terminalOutput.command);
                }
              }}
              className={`px-4 py-2 rounded-xl font-black text-xs sm:text-sm border-2 border-black flex items-center gap-2 transition-all ${
                activeTab === "terminal"
                  ? "bg-blue-600 text-white shadow-brutal-sm -translate-y-0.5"
                  : "bg-white dark:bg-neutral-800 text-black dark:text-white hover:bg-neutral-100"
              }`}
            >
              <Terminal className="w-4 h-4" />
              <span>Interactive Terminal Lab</span>
            </button>

            {currentLecture.quiz && (
              <button
                onClick={() => setActiveTab("quiz")}
                className={`px-4 py-2 rounded-xl font-black text-xs sm:text-sm border-2 border-black flex items-center gap-2 transition-all ${
                  activeTab === "quiz"
                    ? "bg-purple-500 text-white shadow-brutal-sm -translate-y-0.5"
                    : "bg-white dark:bg-neutral-800 text-black dark:text-white hover:bg-neutral-100"
                }`}
              >
                <HelpCircle className="w-4 h-4" />
                <span>Knowledge Check</span>
              </button>
            )}

            <button
              onClick={() => setActiveTab("resources")}
              className={`px-4 py-2 rounded-xl font-black text-xs sm:text-sm border-2 border-black flex items-center gap-2 transition-all ${
                activeTab === "resources"
                  ? "bg-emerald-400 text-black shadow-brutal-sm -translate-y-0.5"
                  : "bg-white dark:bg-neutral-800 text-black dark:text-white hover:bg-neutral-100"
              }`}
            >
              <Download className="w-4 h-4" />
              <span>Cheatsheet &amp; Flags</span>
            </button>
          </div>

          {/* TAB 1: STUDY NOTES & DIAGRAMS */}
          {activeTab === "notes" && (
            <div className="space-y-8">
              {/* 3-LINE DEFINITION CARD (Requested by user: "add more content 3 line define of all thinks") */}
              <div className="rounded-3xl border-[3.5px] border-black bg-gradient-to-br from-amber-50 to-yellow-100 dark:from-neutral-900 dark:to-neutral-800 p-6 sm:p-8 shadow-brutal">
                <div className="flex items-center gap-2 mb-4">
                  <Sparkles className="w-5 h-5 text-amber-600 dark:text-amber-400" />
                  <h3 className="font-display font-black text-lg sm:text-xl text-black dark:text-white">
                    3-Line Technical Blueprint
                  </h3>
                </div>

                <div className="space-y-3">
                  <div className="p-3.5 rounded-2xl bg-white dark:bg-neutral-800 border-2 border-black">
                    <span className="text-[10px] font-black uppercase tracking-wider text-blue-600 dark:text-blue-400 block mb-1">
                      1. Core Definition (What is it?)
                    </span>
                    <p className="text-xs sm:text-sm font-bold text-neutral-900 dark:text-neutral-100">
                      {currentLecture.definition.what}
                    </p>
                  </div>

                  <div className="p-3.5 rounded-2xl bg-white dark:bg-neutral-800 border-2 border-black">
                    <span className="text-[10px] font-black uppercase tracking-wider text-emerald-600 dark:text-emerald-400 block mb-1">
                      2. Low-Level Mechanics (How does it work?)
                    </span>
                    <p className="text-xs sm:text-sm font-bold text-neutral-900 dark:text-neutral-100">
                      {currentLecture.definition.how}
                    </p>
                  </div>

                  <div className="p-3.5 rounded-2xl bg-white dark:bg-neutral-800 border-2 border-black">
                    <span className="text-[10px] font-black uppercase tracking-wider text-purple-600 dark:text-purple-400 block mb-1">
                      3. Pentesting Significance (Why does it matter?)
                    </span>
                    <p className="text-xs sm:text-sm font-bold text-neutral-900 dark:text-neutral-100">
                      {currentLecture.definition.why}
                    </p>
                  </div>
                </div>
              </div>

              {/* DOWNLOADED ARTICLE IMAGES / PACKET HANDSHAKE DIAGRAMS */}
              {currentLecture.images && currentLecture.images.length > 0 && (
                <div className="space-y-6">
                  <h3 className="font-display font-black text-xl text-black dark:text-white flex items-center gap-2">
                    <Layers className="w-5 h-5 text-blue-600" />
                    <span>Visual Handshake Diagrams &amp; Screenshots</span>
                  </h3>

                  <div className="grid grid-cols-1 gap-6">
                    {currentLecture.images.map((img, iIdx) => (
                      <div
                        key={iIdx}
                        className="rounded-3xl border-[3px] border-black bg-white dark:bg-neutral-900 p-4 sm:p-6 shadow-brutal overflow-hidden"
                      >
                        <div className="flex items-center justify-between mb-3">
                          {img.badge && (
                            <span className="px-3 py-1 rounded-full border-2 border-black bg-yellow-300 text-black font-black text-xs uppercase tracking-wider shadow-brutal-sm">
                              {img.badge}
                            </span>
                          )}
                          <button
                            onClick={() => setSelectedImage(img)}
                            className="inline-flex items-center gap-1 text-xs font-bold text-blue-600 hover:text-blue-800"
                          >
                            <Maximize2 className="w-3.5 h-3.5" />
                            <span>Enlarge Diagram</span>
                          </button>
                        </div>

                        <div
                          onClick={() => setSelectedImage(img)}
                          className="relative w-full aspect-video sm:aspect-21/9 max-h-[420px] rounded-2xl overflow-hidden border-2 border-black bg-neutral-950 cursor-pointer group flex items-center justify-center"
                        >
                          <Image
                            src={img.src}
                            alt={img.alt}
                            fill
                            className="object-contain p-2 group-hover:scale-105 transition-transform duration-300"
                          />
                        </div>

                        <p className="text-xs sm:text-sm font-bold text-neutral-700 dark:text-neutral-300 mt-4 leading-relaxed bg-neutral-100 dark:bg-neutral-800 p-3 rounded-xl border border-black/20">
                          {img.caption}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* COMMAND SNIPPETS WITH COPY BUTTONS */}
              {currentLecture.commandSnippets && currentLecture.commandSnippets.length > 0 && (
                <div className="space-y-4">
                  <h3 className="font-display font-black text-xl text-black dark:text-white flex items-center gap-2">
                    <Terminal className="w-5 h-5 text-purple-600" />
                    <span>Nmap Command Syntax &amp; Execution</span>
                  </h3>

                  <div className="space-y-4">
                    {currentLecture.commandSnippets.map((cmd, cIdx) => (
                      <div
                        key={cIdx}
                        className="rounded-2xl border-[2.5px] border-black bg-neutral-900 text-neutral-100 p-4 sm:p-5 shadow-brutal-sm"
                      >
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-xs font-bold text-neutral-400 uppercase tracking-wider">
                            {cmd.title}
                          </span>
                          <button
                            onClick={() => handleCopy(cmd.command)}
                            className="flex items-center gap-1 px-2.5 py-1 rounded bg-neutral-800 hover:bg-neutral-700 border border-neutral-600 text-xs font-bold text-white transition-colors"
                          >
                            {copiedText === cmd.command ? (
                              <>
                                <Check className="w-3.5 h-3.5 text-emerald-400" />
                                <span>Copied</span>
                              </>
                            ) : (
                              <>
                                <Copy className="w-3.5 h-3.5" />
                                <span>Copy</span>
                              </>
                            )}
                          </button>
                        </div>

                        <pre className="font-mono text-xs sm:text-sm text-emerald-400 overflow-x-auto p-3 rounded-xl bg-black/70 border border-neutral-800 mb-3 whitespace-pre-wrap">
                          {cmd.command}
                        </pre>

                        <p className="text-xs text-neutral-300 font-medium mb-3">
                          {cmd.description}
                        </p>

                        {cmd.flags && cmd.flags.length > 0 && (
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-2 border-t border-neutral-800">
                            {cmd.flags.map((flag, fIdx) => (
                              <div
                                key={fIdx}
                                className="text-[11px] bg-neutral-800/80 p-2 rounded-lg border border-neutral-700 flex items-start gap-1.5"
                              >
                                <code className="text-yellow-300 font-bold shrink-0">
                                  {flag.flag}:
                                </code>
                                <span className="text-neutral-300">{flag.meaning}</span>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* KEY BULLET POINTS */}
              <div className="rounded-3xl border-[3.5px] border-black bg-white dark:bg-neutral-900 p-6 sm:p-8 shadow-brutal">
                <h3 className="font-display font-black text-xl text-black dark:text-white mb-4 flex items-center gap-2">
                  <Shield className="w-5 h-5 text-emerald-600" />
                  <span>Key Concepts &amp; Takeaways</span>
                </h3>

                <ul className="space-y-3">
                  {currentLecture.keyPoints.map((point, pIdx) => (
                    <li key={pIdx} className="flex items-start gap-3">
                      <div className="mt-1 w-5 h-5 rounded-full bg-emerald-100 dark:bg-emerald-950 border border-emerald-600 flex items-center justify-center shrink-0">
                        <Check className="w-3 h-3 text-emerald-700 dark:text-emerald-400 stroke-[3]" />
                      </div>
                      <p className="text-xs sm:text-sm font-bold text-neutral-800 dark:text-neutral-200 leading-relaxed">
                        {point}
                      </p>
                    </li>
                  ))}
                </ul>
              </div>

              {/* DEEP DIVE SECTIONS */}
              {currentLecture.deepDive && (
                <div className="space-y-6">
                  {currentLecture.deepDive.map((section, sIdx) => (
                    <div
                      key={sIdx}
                      className="rounded-3xl border-[3px] border-black bg-neutral-50 dark:bg-neutral-900 p-6 sm:p-8 shadow-brutal-sm"
                    >
                      <h4 className="font-display font-black text-lg sm:text-xl text-black dark:text-white mb-3">
                        {section.heading}
                      </h4>
                      <p className="text-xs sm:text-sm font-medium text-neutral-700 dark:text-neutral-300 leading-relaxed whitespace-pre-line">
                        {section.body}
                      </p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* TAB 2: INTERACTIVE TERMINAL SIMULATOR */}
          {activeTab === "terminal" && (
            <div className="space-y-6">
              <div className="rounded-3xl border-[3.5px] border-black bg-neutral-950 p-6 sm:p-8 shadow-brutal text-white">
                <div className="flex flex-wrap items-center justify-between gap-3 mb-6 pb-4 border-b border-neutral-800">
                  <div className="flex items-center gap-2">
                    <div className="flex gap-1.5">
                      <div className="w-3 h-3 rounded-full bg-red-500" />
                      <div className="w-3 h-3 rounded-full bg-yellow-500" />
                      <div className="w-3 h-3 rounded-full bg-emerald-500" />
                    </div>
                    <span className="text-xs font-mono font-bold text-neutral-400 ml-2">
                      kali@raghav-security: ~ (Nmap Sandbox Lab)
                    </span>
                  </div>

                  <span className="text-[10px] font-black uppercase tracking-wider bg-neutral-800 text-neutral-300 px-2.5 py-1 rounded border border-neutral-700">
                    Live Simulator
                  </span>
                </div>

                {/* Quick-Run Presets */}
                <div className="mb-6">
                  <p className="text-xs font-bold text-neutral-400 mb-2">
                    Click to load preset command:
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {[
                      "nmap -sT 192.168.1.12 --top-ports 50",
                      "sudo nmap -sS 192.168.1.12 --top-ports 50",
                      "sudo nmap -sU 192.168.1.12 --top-ports 50",
                      "nmap -sn 192.168.1.0/24",
                      "nmap --version"
                    ].map((cmd, idx) => (
                      <button
                        key={idx}
                        onClick={() => {
                          setSimCommand(cmd);
                          handleRunScan(cmd);
                        }}
                        className="px-2.5 py-1 rounded-lg text-xs font-mono font-bold bg-neutral-900 hover:bg-neutral-800 border border-neutral-700 text-emerald-400 transition-colors"
                      >
                        {cmd}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Command Input Form */}
                <div className="flex items-center gap-2 mb-6">
                  <span className="text-emerald-400 font-mono font-bold text-sm sm:text-base shrink-0">
                    kali#
                  </span>
                  <input
                    type="text"
                    value={simCommand}
                    onChange={(e) => setSimCommand(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") handleRunScan();
                    }}
                    placeholder="Type Nmap command and press Enter..."
                    className="flex-1 bg-black/80 border border-neutral-700 rounded-xl px-4 py-2.5 font-mono text-xs sm:text-sm text-white focus:outline-none focus:border-blue-500"
                  />
                  <button
                    onClick={() => handleRunScan()}
                    disabled={isScanning}
                    className="btn-brutal bg-emerald-400 text-black px-4 py-2.5 text-xs font-black shrink-0 flex items-center gap-1.5"
                  >
                    {isScanning ? (
                      <span className="animate-pulse">Scanning...</span>
                    ) : (
                      <>
                        <Play className="w-3.5 h-3.5 fill-black" />
                        <span>Run Scan</span>
                      </>
                    )}
                  </button>
                </div>

                {/* Output Screen */}
                <div className="bg-black/90 rounded-2xl border border-neutral-800 p-4 sm:p-5 font-mono text-xs sm:text-sm overflow-x-auto min-h-[220px]">
                  {isScanning ? (
                    <div className="flex flex-col items-center justify-center py-12 text-neutral-400 space-y-3">
                      <div className="w-8 h-8 border-2 border-emerald-400 border-t-transparent rounded-full animate-spin" />
                      <p className="text-xs font-bold text-emerald-400">
                        Synthesizing raw IP probes &amp; awaiting socket response...
                      </p>
                    </div>
                  ) : terminalOutput ? (
                    <pre className="text-neutral-200 whitespace-pre-wrap leading-relaxed">
                      {terminalOutput}
                    </pre>
                  ) : (
                    <p className="text-neutral-500 italic">
                      No scan executed yet. Press &quot;Run Scan&quot; or select a preset above.
                    </p>
                  )}
                </div>

                {/* Output Analysis */}
                {currentLecture.terminalOutput && (
                  <div className="mt-6 pt-6 border-t border-neutral-800">
                    <h4 className="font-display font-black text-sm text-yellow-300 uppercase tracking-wider mb-3">
                      Security Analyst Interpretation:
                    </h4>
                    <div className="space-y-2">
                      {currentLecture.terminalOutput.analysis.map((item, aIdx) => (
                        <div
                          key={aIdx}
                          className="flex items-start gap-2 text-xs font-mono text-neutral-300"
                        >
                          <span className="text-emerald-400 font-bold shrink-0">&gt;</span>
                          <span>{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* TAB 3: QUIZ / KNOWLEDGE CHECK */}
          {activeTab === "quiz" && currentLecture.quiz && (
            <div className="space-y-6">
              <div className="rounded-3xl border-[3.5px] border-black bg-white dark:bg-neutral-900 p-6 sm:p-8 shadow-brutal">
                <div className="flex items-center gap-2 mb-4">
                  <HelpCircle className="w-5 h-5 text-purple-600" />
                  <span className="text-xs font-black uppercase tracking-wider text-neutral-500">
                    Quick Knowledge Check
                  </span>
                </div>

                <h3 className="font-display font-black text-lg sm:text-xl text-black dark:text-white mb-6">
                  {currentLecture.quiz.question}
                </h3>

                <div className="space-y-3 mb-6">
                  {currentLecture.quiz.options.map((opt, oIdx) => {
                    const isSelected = selectedQuizOption === oIdx;
                    const isCorrect = oIdx === currentLecture.quiz?.correctIndex;
                    let styling =
                      "border-2 border-black bg-neutral-50 dark:bg-neutral-800 text-black dark:text-white hover:bg-neutral-100";

                    if (quizSubmitted) {
                      if (isCorrect) {
                        styling =
                          "border-2 border-black bg-emerald-300 dark:bg-emerald-800 text-black dark:text-white font-black";
                      } else if (isSelected && !isCorrect) {
                        styling =
                          "border-2 border-black bg-red-300 dark:bg-red-900 text-black dark:text-white line-through";
                      }
                    } else if (isSelected) {
                      styling =
                        "border-2 border-black bg-yellow-200 dark:bg-neutral-700 text-black dark:text-white font-black";
                    }

                    return (
                      <button
                        key={oIdx}
                        disabled={quizSubmitted}
                        onClick={() => setSelectedQuizOption(oIdx)}
                        className={`w-full text-left p-4 rounded-2xl text-xs sm:text-sm font-bold transition-all flex items-center justify-between ${styling}`}
                      >
                        <span>{opt}</span>
                        {quizSubmitted && isCorrect && (
                          <CheckCircle2 className="w-4 h-4 text-black stroke-[3]" />
                        )}
                      </button>
                    );
                  })}
                </div>

                {!quizSubmitted ? (
                  <button
                    disabled={selectedQuizOption === null}
                    onClick={() => {
                      setQuizSubmitted(true);
                      if (selectedQuizOption === currentLecture.quiz?.correctIndex) {
                        confetti({ particleCount: 70, spread: 50, origin: { y: 0.6 } });
                      }
                    }}
                    className="btn-brutal btn-brutal-primary px-6 py-3 text-xs font-black uppercase tracking-wider disabled:opacity-50"
                  >
                    Submit Answer
                  </button>
                ) : (
                  <div className="p-4 rounded-2xl bg-neutral-100 dark:bg-neutral-800 border-2 border-black space-y-2">
                    <p className="text-xs font-black uppercase tracking-wider text-blue-600 dark:text-blue-400">
                      Explanation:
                    </p>
                    <p className="text-xs sm:text-sm font-medium text-neutral-800 dark:text-neutral-200 leading-relaxed">
                      {currentLecture.quiz.explanation}
                    </p>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* TAB 4: RESOURCES & CHEATSHEET */}
          {activeTab === "resources" && (
            <div className="space-y-6">
              {/* Comprehensive Port State Reference Table */}
              <div className="rounded-3xl border-[3.5px] border-black bg-white dark:bg-neutral-900 p-6 sm:p-8 shadow-brutal overflow-x-auto">
                <h3 className="font-display font-black text-xl text-black dark:text-white mb-4 flex items-center gap-2">
                  <Layers className="w-5 h-5 text-blue-600" />
                  <span>The 6 Nmap Port States Diagnostic Matrix</span>
                </h3>

                <table className="w-full text-left border-collapse text-xs sm:text-sm">
                  <thead>
                    <tr className="border-b-2 border-black bg-neutral-100 dark:bg-neutral-800">
                      <th className="p-3 font-black border-r border-black">Port State</th>
                      <th className="p-3 font-black border-r border-black">Packet Behavior</th>
                      <th className="p-3 font-black border-r border-black">Meaning</th>
                      <th className="p-3 font-black">Pentester Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-neutral-200 dark:divide-neutral-800">
                    <tr>
                      <td className="p-3 font-black text-emerald-600 border-r border-black/20">Open</td>
                      <td className="p-3 border-r border-black/20 font-mono text-xs">SYN-ACK or UDP Payload</td>
                      <td className="p-3 border-r border-black/20">Application is actively accepting connections.</td>
                      <td className="p-3 font-bold">Fingerprint service (-sV), search CVEs, audit credentials.</td>
                    </tr>
                    <tr>
                      <td className="p-3 font-black text-red-600 border-r border-black/20">Closed</td>
                      <td className="p-3 border-r border-black/20 font-mono text-xs">RST/ACK or ICMP Type 3 Code 3</td>
                      <td className="p-3 border-r border-black/20">Host is up, but no service is listening.</td>
                      <td className="p-3 font-bold">Host is confirmed alive; check other port ranges.</td>
                    </tr>
                    <tr>
                      <td className="p-3 font-black text-amber-600 border-r border-black/20">Filtered</td>
                      <td className="p-3 border-r border-black/20 font-mono text-xs">No response or ICMP Unreachable</td>
                      <td className="p-3 border-r border-black/20">Firewall/packet filter is blocking probes.</td>
                      <td className="p-3 font-bold">Attempt firewall evasion (-f fragmentation, -D decoy, --source-port 53).</td>
                    </tr>
                    <tr>
                      <td className="p-3 font-black text-blue-600 border-r border-black/20">Unfiltered</td>
                      <td className="p-3 border-r border-black/20 font-mono text-xs">RST reply in ACK scan (-sA)</td>
                      <td className="p-3 border-r border-black/20">Port is accessible, but open/closed status unknown.</td>
                      <td className="p-3 font-bold">Verify firewall state; follow up with SYN stealth scan.</td>
                    </tr>
                    <tr>
                      <td className="p-3 font-black text-purple-600 border-r border-black/20">Open | Filtered</td>
                      <td className="p-3 border-r border-black/20 font-mono text-xs">No response (UDP/FIN/Null scan)</td>
                      <td className="p-3 border-r border-black/20">Cannot determine if port is open or dropped.</td>
                      <td className="p-3 font-bold">Run protocol-specific UDP probes (-sUV).</td>
                    </tr>
                    <tr>
                      <td className="p-3 font-black text-neutral-600 border-r border-black/20">Closed | Filtered</td>
                      <td className="p-3 border-r border-black/20 font-mono text-xs">Ambiguous IP ID changes</td>
                      <td className="p-3 border-r border-black/20">State indeterminable in advanced idle bounce scans.</td>
                      <td className="p-3 font-bold">Select a different idle zombie host.</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              {/* Master Cheatsheet Box */}
              <div className="rounded-3xl border-[3.5px] border-black bg-white dark:bg-neutral-900 p-6 sm:p-8 shadow-brutal space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="font-display font-black text-xl text-black dark:text-white">
                    Quick Reference Cheatsheet
                  </h3>
                  <button
                    onClick={() =>
                      handleCopy(`# Nmap Reconnaissance Cheatsheet
# 1. TCP Connect Scan:
nmap -sT 192.168.1.12 --top-ports 50

# 2. SYN Stealth Scan:
sudo nmap -sS 192.168.1.12 --top-ports 50

# 3. UDP Scan:
sudo nmap -sU 192.168.1.12 --top-ports 50

# 4. Host Discovery Ping Scan:
nmap -sn 192.168.1.0/24

# 5. Full 65k Ports with Aggressive Timing:
sudo nmap -sS -p- -T4 --min-rate 1500 192.168.1.12 -oA full_recon`)
                    }
                    className="btn-brutal btn-brutal-primary px-3 py-1.5 text-xs font-black flex items-center gap-1.5"
                  >
                    <Copy className="w-3.5 h-3.5" />
                    <span>Copy All Commands</span>
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs font-mono">
                  <div className="p-4 rounded-2xl bg-neutral-900 text-neutral-100 border-2 border-black space-y-2">
                    <p className="text-yellow-300 font-bold uppercase tracking-wider">
                      Scan Types:
                    </p>
                    <p><span className="text-emerald-400 font-bold">-sT</span>: TCP Connect Scan (Userland)</p>
                    <p><span className="text-emerald-400 font-bold">-sS</span>: SYN Stealth Scan (Root required)</p>
                    <p><span className="text-emerald-400 font-bold">-sU</span>: UDP Port Scan</p>
                    <p><span className="text-emerald-400 font-bold">-sn</span>: Ping Scan (Host Discovery Only)</p>
                    <p><span className="text-emerald-400 font-bold">-sV</span>: Service Version Probing</p>
                  </div>

                  <div className="p-4 rounded-2xl bg-neutral-900 text-neutral-100 border-2 border-black space-y-2">
                    <p className="text-yellow-300 font-bold uppercase tracking-wider">
                      Timing &amp; Evasion:
                    </p>
                    <p><span className="text-emerald-400 font-bold">-T0 to -T5</span>: Timing templates (0=Paranoid, 4=Aggressive)</p>
                    <p><span className="text-emerald-400 font-bold">-p-</span>: Scan all 65,535 ports</p>
                    <p><span className="text-emerald-400 font-bold">--top-ports 50</span>: Scan top 50 ports</p>
                    <p><span className="text-emerald-400 font-bold">-Pn</span>: Treat all hosts as online (skip ping)</p>
                    <p><span className="text-emerald-400 font-bold">-oA &lt;name&gt;</span>: Save in normal, XML, and grepable</p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Navigation Controls: Previous / Next Lecture */}
          <div className="flex items-center justify-between pt-6 border-t-2 border-neutral-300 dark:border-neutral-800">
            <button
              onClick={goToPrevLecture}
              disabled={activeModuleIdx === 0 && activeLectureIdx === 0}
              className="btn-brutal bg-white dark:bg-neutral-800 text-black dark:text-white px-4 py-2.5 text-xs font-black uppercase tracking-wider flex items-center gap-2 disabled:opacity-40 disabled:cursor-not-allowed"
            >
              <ChevronLeft className="w-4 h-4" />
              <span>Previous Lecture</span>
            </button>

            <button
              onClick={goToNextLecture}
              disabled={
                activeModuleIdx === nmapCourseData.modules.length - 1 &&
                activeLectureIdx === currentModule.lectures.length - 1
              }
              className="btn-brutal btn-brutal-primary px-5 py-2.5 text-xs font-black uppercase tracking-wider flex items-center gap-2 disabled:opacity-40 disabled:cursor-not-allowed"
            >
              <span>Next Lecture</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </main>
      </div>

      {/* Lightbox Modal for Enlarge Image */}
      {selectedImage && (
        <div
          className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6"
          onClick={() => setSelectedImage(null)}
        >
          <div
            className="bg-white dark:bg-neutral-900 border-[3.5px] border-black rounded-3xl max-w-4xl w-full p-4 sm:p-6 shadow-2xl relative"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between mb-4">
              <span className="font-display font-black text-sm text-black dark:text-white">
                {selectedImage.alt}
              </span>
              <button
                onClick={() => setSelectedImage(null)}
                className="p-1 rounded-full border-2 border-black hover:bg-neutral-100 dark:hover:bg-neutral-800"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="relative w-full aspect-video rounded-2xl overflow-hidden border-2 border-black bg-neutral-950 flex items-center justify-center mb-4">
              <Image
                src={selectedImage.src}
                alt={selectedImage.alt}
                fill
                className="object-contain p-2"
              />
            </div>

            <p className="text-xs sm:text-sm font-bold text-neutral-800 dark:text-neutral-200">
              {selectedImage.caption}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}

export default function CourseLearnPage() {
  return (
    <React.Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center bg-[#FDFBF7] dark:bg-neutral-950">
          <div className="flex flex-col items-center gap-3">
            <div className="w-10 h-10 border-4 border-black border-t-transparent rounded-full animate-spin" />
            <p className="font-display font-black text-sm uppercase tracking-wider text-neutral-700 dark:text-neutral-300">
              Loading Nmap Masterclass Lab...
            </p>
          </div>
        </div>
      }
    >
      <CourseLearnContent />
    </React.Suspense>
  );
}
