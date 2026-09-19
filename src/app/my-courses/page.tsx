"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Play,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  BookOpen,
  FileText,
  MessageSquare,
  Download,
  Terminal,
  ArrowLeft
} from "lucide-react";
import { courses } from "@/data/siteData";

export default function MyCoursesPlayerPage() {
  const course = courses[0]; // Computer Networking for Cyber Security
  const [currentModuleIndex, setCurrentModuleIndex] = useState(0);
  const [currentLectureIndex, setCurrentLectureIndex] = useState(0);
  const [completedLectures, setCompletedLectures] = useState<number[]>([0, 1]);
  const [activeTab, setActiveTab] = useState<"overview" | "notes" | "resources">("overview");

  const currentModule = course.curriculum[currentModuleIndex] || course.curriculum[0];
  const currentLecture = currentModule.lectures[currentLectureIndex] || currentModule.lectures[0];

  const handleMarkComplete = () => {
    const lectureId = currentModuleIndex * 10 + currentLectureIndex;
    if (!completedLectures.includes(lectureId)) {
      setCompletedLectures([...completedLectures, lectureId]);
    }
  };

  return (
    <div className="min-h-screen bg-neutral-100 flex flex-col">
      {/* Top Bar */}
      <div className="bg-white border-b-2 border-black px-4 sm:px-8 py-3 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link
            href="/dashboard"
            className="flex items-center gap-1.5 font-bold text-xs sm:text-sm text-neutral-700 hover:text-black"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Dashboard</span>
          </Link>
          <span className="text-neutral-300">|</span>
          <h1 className="font-display font-black text-sm sm:text-base text-black truncate max-w-md">
            {course.title}
          </h1>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleMarkComplete}
            className="btn-brutal bg-emerald-400 text-black px-3.5 py-1.5 text-xs font-black"
          >
            <CheckCircle2 className="w-4 h-4" />
            <span>Mark Complete</span>
          </button>
        </div>
      </div>

      {/* Main Content Layout */}
      <div className="flex-grow flex flex-col lg:flex-row">
        {/* Video Player & Lesson Area (Left 8 cols) */}
        <div className="flex-1 p-4 sm:p-6 lg:p-8 flex flex-col">
          {/* Simulated Player Container */}
          <div className="relative w-full aspect-video rounded-3xl border-[3.5px] border-black bg-neutral-950 shadow-brutal-xl overflow-hidden flex flex-col items-center justify-center text-white mb-6 group">
            {/* Terminal mock background */}
            <div className="absolute top-4 left-4 flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-red-500 border border-black" />
              <span className="w-3 h-3 rounded-full bg-yellow-500 border border-black" />
              <span className="w-3 h-3 rounded-full bg-green-500 border border-black" />
              <span className="font-mono-code text-xs text-neutral-400 ml-2">
                kali@thatraghavarora:~# {currentLecture.title}
              </span>
            </div>

            <div className="text-center p-6">
              <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-yellow-300 text-black border-2 border-black flex items-center justify-center mx-auto mb-4 shadow-brutal cursor-pointer group-hover:scale-110 transition-transform">
                <Play className="w-8 h-8 fill-current ml-1" />
              </div>
              <p className="font-display font-black text-lg sm:text-2xl">
                {currentLecture.title}
              </p>
              <p className="text-xs sm:text-sm font-mono-code text-yellow-300 mt-2">
                Duration: {currentLecture.duration} • Lab: VirtualBox Kali Linux
              </p>
            </div>
          </div>

          {/* Player Controls & Tabs */}
          <div className="rounded-2xl border-[3px] border-black bg-white p-6 shadow-brutal">
            <div className="flex items-center gap-4 border-b-2 border-neutral-200 pb-4 mb-4">
              <button
                onClick={() => setActiveTab("overview")}
                className={`font-black text-xs uppercase tracking-wider pb-1 ${
                  activeTab === "overview"
                    ? "border-b-2 border-black text-black"
                    : "text-neutral-500 hover:text-black"
                }`}
              >
                Overview
              </button>
              <button
                onClick={() => setActiveTab("notes")}
                className={`font-black text-xs uppercase tracking-wider pb-1 ${
                  activeTab === "notes"
                    ? "border-b-2 border-black text-black"
                    : "text-neutral-500 hover:text-black"
                }`}
              >
                Class Notes
              </button>
              <button
                onClick={() => setActiveTab("resources")}
                className={`font-black text-xs uppercase tracking-wider pb-1 ${
                  activeTab === "resources"
                    ? "border-b-2 border-black text-black"
                    : "text-neutral-500 hover:text-black"
                }`}
              >
                Downloads &amp; Lab Cheatsheet
              </button>
            </div>

            {activeTab === "overview" && (
              <div>
                <h3 className="text-lg font-black text-black font-display mb-2">
                  About this Lecture
                </h3>
                <p className="text-sm font-medium text-neutral-700 leading-relaxed mb-4">
                  In this session, Raghav demonstrates the exact configuration steps required for setting up an isolated network adapter in VirtualBox. Ensure promiscuous mode is enabled so your Kali instance can capture traffic correctly.
                </p>
                <div className="p-4 rounded-xl bg-neutral-900 text-yellow-300 font-mono-code text-xs">
                  <code>
                    $ sudo ip link set eth0 promisc on<br />
                    $ nmap -sC -sV -p- 192.168.56.102 -oN scan_results.txt
                  </code>
                </div>
              </div>
            )}

            {activeTab === "notes" && (
              <div className="space-y-2 text-sm text-neutral-700 font-medium">
                <p>• Always verify scope boundaries before running intensive TCP SYN scans.</p>
                <p>• Save your scan output in standard nmap format for future report generation.</p>
              </div>
            )}

            {activeTab === "resources" && (
              <div className="space-y-2">
                <a
                  href="#"
                  className="flex items-center justify-between p-3 rounded-xl border border-black bg-neutral-50 hover:bg-yellow-50 text-xs font-bold"
                >
                  <span className="flex items-center gap-2">
                    <Download className="w-4 h-4 text-blue-600" />
                    Kali-Linux-Setup-CheatSheet.pdf
                  </span>
                  <span className="text-neutral-500">2.4 MB</span>
                </a>
              </div>
            )}
          </div>
        </div>

        {/* Syllabus Sidebar (Right 4 cols) */}
        <div className="w-full lg:w-96 border-t-2 lg:border-t-0 lg:border-l-2 border-black bg-white p-4 sm:p-6 overflow-y-auto">
          <h2 className="font-display font-black text-lg text-black mb-4">
            Course Content
          </h2>

          <div className="space-y-4">
            {course.curriculum.map((mod, mIdx) => (
              <div key={mIdx} className="rounded-2xl border-2 border-black overflow-hidden bg-neutral-50">
                <div className="px-4 py-3 bg-neutral-200 border-b border-black font-black text-xs text-black">
                  {mod.sectionTitle}
                </div>
                <div className="divide-y divide-neutral-200">
                  {mod.lectures.map((lec, lIdx) => {
                    const isCurrent =
                      currentModuleIndex === mIdx && currentLectureIndex === lIdx;
                    const isDone = completedLectures.includes(mIdx * 10 + lIdx);

                    return (
                      <button
                        key={lIdx}
                        onClick={() => {
                          setCurrentModuleIndex(mIdx);
                          setCurrentLectureIndex(lIdx);
                        }}
                        className={`w-full p-3 text-left flex items-start gap-2.5 transition-colors ${
                          isCurrent
                            ? "bg-yellow-100 font-black text-black"
                            : "bg-white font-medium text-neutral-800 hover:bg-neutral-50"
                        }`}
                      >
                        {isDone ? (
                          <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                        ) : (
                          <Play className="w-4 h-4 text-neutral-400 shrink-0 mt-0.5" />
                        )}
                        <div className="flex-grow">
                          <p className="text-xs leading-snug">{lec.title}</p>
                          <span className="text-[10px] text-neutral-500 font-mono-code">
                            {lec.duration}
                          </span>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
