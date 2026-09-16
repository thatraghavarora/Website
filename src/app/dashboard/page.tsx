"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import {
  BookOpen,
  Trophy,
  Clock,
  PlayCircle,
  Award,
  CheckCircle2,
  ExternalLink,
  MessageSquare,
  Sparkles,
  ArrowRight
} from "lucide-react";
import { courses } from "@/data/siteData";
import { CrownDoodle } from "@/components/Doodles";

export default function DashboardPage() {
  const enrolledCourses = courses.map((course) => ({
    ...course,
    progress: 0,
    completedLessons: 0,
    lastLesson: course.curriculum[0]?.lectures[0]?.title || "Introduction"
  }));

  return (
    <div className="py-12 bg-neutral-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Welcome Header Banner */}
        <div className="rounded-3xl border-[3.5px] border-black bg-yellow-300 p-8 sm:p-10 shadow-brutal-xl mb-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          <div>
            <div className="inline-block px-3 py-0.5 rounded-full border border-black bg-white text-xs font-black uppercase tracking-wider mb-2">
              STUDENT LEARNING DASHBOARD
            </div>
            <h1 className="text-3xl sm:text-5xl font-black text-black font-display tracking-tight">
              Welcome Back, Hacker!
            </h1>
            <p className="text-sm sm:text-base font-bold text-neutral-800 mt-1">
              You are on a 5-day study streak. Keep exploring vulnerabilities!
            </p>
          </div>

          <div className="flex items-center gap-3">
            <Link
              href="/my-courses"
              className="btn-brutal btn-brutal-primary px-6 py-3 text-xs sm:text-sm uppercase tracking-wider"
            >
              <span>Resume Last Lesson</span>
              <PlayCircle className="w-4 h-4" />
            </Link>
          </div>
        </div>

        {/* Dashboard Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-10">
          <div className="rounded-2xl border-[3px] border-black bg-white p-5 shadow-brutal">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-purple-100 border-2 border-black flex items-center justify-center">
                <BookOpen className="w-5 h-5 text-purple-700" />
              </div>
              <div>
                <p className="text-2xl sm:text-3xl font-black text-black font-display">{enrolledCourses.length}</p>
                <p className="text-xs font-bold text-neutral-600">Courses Enrolled</p>
              </div>
            </div>
          </div>

          <div className="rounded-2xl border-[3px] border-black bg-white p-5 shadow-brutal">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-blue-100 border-2 border-black flex items-center justify-center">
                <Clock className="w-5 h-5 text-blue-700" />
              </div>
              <div>
                <p className="text-2xl sm:text-3xl font-black text-black font-display">24.5h</p>
                <p className="text-xs font-bold text-neutral-600">Time Watched</p>
              </div>
            </div>
          </div>

          <div className="rounded-2xl border-[3px] border-black bg-white p-5 shadow-brutal">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-100 border-2 border-black flex items-center justify-center">
                <CheckCircle2 className="w-5 h-5 text-emerald-700" />
              </div>
              <div>
                <p className="text-2xl sm:text-3xl font-black text-black font-display">75</p>
                <p className="text-xs font-bold text-neutral-600">Lessons Finished</p>
              </div>
            </div>
          </div>

          <div className="rounded-2xl border-[3px] border-black bg-white p-5 shadow-brutal">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-amber-100 border-2 border-black flex items-center justify-center">
                <Trophy className="w-5 h-5 text-amber-700" />
              </div>
              <div>
                <p className="text-2xl sm:text-3xl font-black text-black font-display">1</p>
                <p className="text-xs font-bold text-neutral-600">Certificate Earned</p>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content: Enrolled Courses & Sidebar */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* Left: Enrolled Courses (8 cols) */}
          <div className="lg:col-span-8 space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl sm:text-3xl font-black text-black font-display">
                Continue Learning
              </h2>
              <Link
                href="/courses"
                className="font-bold text-xs sm:text-sm text-blue-600 hover:underline flex items-center gap-1"
              >
                <span>Browse More Courses</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

            <div className="space-y-6">
              {enrolledCourses.map((c) => (
                <div
                  key={c.slug}
                  className="rounded-3xl border-[3.5px] border-black bg-white p-6 shadow-brutal hover-lift flex flex-col md:flex-row items-start md:items-center gap-6"
                >
                  <div className="relative w-full md:w-48 aspect-video rounded-2xl overflow-hidden border-2 border-black shrink-0">
                    <Image
                      src={c.thumbnail}
                      alt={c.title}
                      fill
                      className="object-cover"
                    />
                  </div>

                  <div className="flex-grow w-full">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-[11px] font-black uppercase tracking-wider text-purple-700">
                        {c.category}
                      </span>
                      <span className="text-xs font-black text-black">
                        {c.progress}% Complete
                      </span>
                    </div>

                    <h3 className="text-lg sm:text-xl font-black font-display text-black mb-1">
                      {c.title}
                    </h3>

                    <p className="text-xs font-medium text-neutral-600 mb-4 line-clamp-1">
                      Current: {c.lastLesson}
                    </p>

                    {/* Progress Bar */}
                    <div className="w-full h-3 rounded-full border-2 border-black bg-neutral-100 overflow-hidden mb-4">
                      <div
                        className="h-full bg-emerald-500 border-r-2 border-black transition-all duration-500"
                        style={{ width: `${c.progress}%` }}
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-neutral-500">
                        {c.completedLessons} of {c.lessonsCount} lessons
                      </span>

                      <Link
                        href="/my-courses"
                        className="btn-brutal btn-brutal-primary px-4 py-2 text-xs uppercase tracking-wider"
                      >
                        Resume →
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Sidebar: Community & Badges (4 cols) */}
          <div className="lg:col-span-4 space-y-6">
            {/* Live Session Notice */}
            <div className="rounded-3xl border-[3.5px] border-black bg-purple-100 p-6 shadow-brutal">
              <div className="flex items-center gap-2 mb-2">
                <span className="w-2.5 h-2.5 rounded-full bg-red-500 animate-ping" />
                <span className="font-mono-code font-black text-xs uppercase text-purple-900">
                  Upcoming Live Q&amp;A
                </span>
              </div>
              <h3 className="text-lg font-black text-black font-display mb-2">
                Live Bug Bounty Walkthrough with Raghav
              </h3>
              <p className="text-xs font-medium text-neutral-700 mb-4">
                This Saturday at 7:00 PM IST on Discord. Bring your target recon questions!
              </p>
              <a
                href="https://discord.gg"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-brutal btn-brutal-white w-full py-2.5 text-xs uppercase tracking-wider"
              >
                Join Student Discord
              </a>
            </div>

            {/* Achievement Badges */}
            <div className="rounded-3xl border-[3.5px] border-black bg-white p-6 shadow-brutal">
              <h3 className="text-lg font-black text-black font-display mb-4">
                Earned Badges
              </h3>
              <div className="space-y-3">
                <div className="flex items-center gap-3 p-2.5 rounded-xl border border-black bg-yellow-50">
                  <div className="w-9 h-9 rounded-lg bg-yellow-300 border border-black flex items-center justify-center font-black text-sm">
                    ⚡
                  </div>
                  <div>
                    <p className="font-bold text-xs text-black">Fast Learner</p>
                    <p className="text-[10px] text-neutral-600">Completed 10 lessons in 48 hours</p>
                  </div>
                </div>

                <div className="flex items-center gap-3 p-2.5 rounded-xl border border-black bg-purple-50">
                  <div className="w-9 h-9 rounded-lg bg-purple-300 border border-black flex items-center justify-center font-black text-sm">
                    🛡️
                  </div>
                  <div>
                    <p className="font-bold text-xs text-black">XSS Hunter</p>
                    <p className="text-[10px] text-neutral-600">Finished Web Application Module</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
