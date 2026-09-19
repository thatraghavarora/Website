"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowLeft,
  Star,
  Clock,
  BookOpen,
  Users,
  ShieldCheck,
  CheckCircle2,
  ChevronDown,
  ChevronUp,
  PlayCircle,
  HelpCircle,
  Award,
  Check,
  Share2
} from "lucide-react";
import confetti from "canvas-confetti";
import { Course } from "@/data/siteData";

export default function CourseDetailClient({ course }: { course: Course }) {
  const [enrolled, setEnrolled] = useState(false);
  const [expandedSection, setExpandedSection] = useState<number | null>(0);
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);

  const handleEnroll = () => {
    setEnrolled(true);
    confetti({
      particleCount: 120,
      spread: 70,
      origin: { y: 0.6 }
    });
  };

  const isComingSoon = course.badge === "Coming Soon";

  const discountPercent =
    typeof course.price === "number" &&
    typeof course.originalPrice === "number" &&
    course.originalPrice > 0
      ? Math.round(
          ((course.originalPrice - course.price) / course.originalPrice) * 100
        )
      : null;

  return (
    <div className="py-12 bg-neutral-50 dark:bg-neutral-900 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back navigation */}
        <Link
          href="/courses"
          className="inline-flex items-center gap-2 font-bold text-sm text-neutral-700 hover:text-black mb-8 group"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          <span>Back to All Courses</span>
        </Link>

        {/* Main Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* Left / Main Content: 8 cols */}
          <div className="lg:col-span-8 space-y-10">
            {/* Header Card */}
            <div className="rounded-3xl border-[3.5px] border-black bg-white p-8 sm:p-10 shadow-brutal-xl">
              <div className="flex flex-wrap items-center gap-2 mb-4">
                <span className="px-3 py-1 rounded-full border-2 border-black bg-purple-200 text-purple-900 font-black text-xs uppercase tracking-wider">
                  {course.category}
                </span>
                <span className="px-3 py-1 rounded-full border-2 border-black bg-yellow-200 text-black font-black text-xs uppercase tracking-wider">
                  {course.level}
                </span>
                {course.badge && (
                  <span className="px-3 py-1 rounded-full border-2 border-black bg-amber-300 text-black font-black text-xs uppercase tracking-wider shadow-brutal-sm">
                    {course.badge}
                  </span>
                )}
              </div>

              <h1 className="text-3xl sm:text-5xl font-black text-black font-display tracking-tight leading-tight mb-4">
                {course.title}
              </h1>

              <p className="text-lg sm:text-xl font-bold text-neutral-700 mb-6">
                {course.subtitle}
              </p>

              {/* Meta stats */}
              <div className="flex flex-wrap items-center gap-6 text-sm font-bold text-neutral-800 pb-6 border-b-2 border-neutral-200">
                <div className="flex items-center gap-1 text-amber-500 font-extrabold">
                  <Star className="w-4 h-4 fill-amber-400" />
                  <span className="text-black">{course.rating}</span>
                  <span className="text-neutral-500">
                    ({course.reviewsCount} reviews)
                  </span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Users className="w-4 h-4 text-purple-600" />
                  <span>{course.studentsCount} Students Enrolled</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Clock className="w-4 h-4 text-blue-600" />
                  <span>{course.duration} Total Content</span>
                </div>
              </div>

              {/* Instructor snippet */}
              <div className="flex items-center gap-3 pt-6">
                <div className="relative w-12 h-12 rounded-full overflow-hidden border-2 border-black shadow-brutal-sm">
                  <Image
                    src={course.instructor.avatar}
                    alt={course.instructor.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <div>
                  <p className="text-xs text-neutral-500 font-bold uppercase tracking-wider">
                    Created By
                  </p>
                  <p className="font-display font-black text-base text-black">
                    {course.instructor.name}
                  </p>
                </div>
              </div>
            </div>

            {/* What You'll Learn */}
            <div className="rounded-3xl border-[3.5px] border-black bg-white p-8 sm:p-10 shadow-brutal">
              <h2 className="text-2xl sm:text-3xl font-black text-black font-display mb-6">
                What You&apos;ll Learn
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {course.whatYouWillLearn.map((item, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                    <span className="font-bold text-sm text-neutral-800 leading-snug">
                      {item}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Interactive Curriculum */}
            <div className="rounded-3xl border-[3.5px] border-black bg-white p-8 sm:p-10 shadow-brutal">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="text-2xl sm:text-3xl font-black text-black font-display">
                    Course Curriculum
                  </h2>
                  <p className="text-xs sm:text-sm font-bold text-neutral-500 mt-1">
                    {course.curriculum.length} Modules • {course.lessonsCount} Lectures
                  </p>
                </div>
              </div>

              <div className="space-y-3">
                {course.curriculum.map((section, idx) => {
                  const isOpen = expandedSection === idx;
                  return (
                    <div
                      key={idx}
                      className="rounded-2xl border-2 border-black overflow-hidden"
                    >
                      <button
                        type="button"
                        onClick={() => setExpandedSection(isOpen ? null : idx)}
                        className="w-full px-5 py-4 flex items-center justify-between text-left font-black text-sm sm:text-base text-black dark:text-white bg-neutral-50 dark:bg-neutral-800 hover:bg-neutral-100 dark:hover:bg-neutral-700 transition-colors"
                      >
                        <span>{section.sectionTitle}</span>
                        {isOpen ? (
                          <ChevronUp className="w-5 h-5 shrink-0" />
                        ) : (
                          <ChevronDown className="w-5 h-5 shrink-0" />
                        )}
                      </button>

                      {isOpen && (
                        <div className="p-4 space-y-2.5 bg-white dark:bg-neutral-900 border-t-2 border-black/10 dark:border-white/10">
                          {section.lectures.map((lecture, lIdx) => (
                            <Link
                              key={lIdx}
                              href={`/courses/${course.slug}/learn?module=${idx}&lecture=${lIdx}`}
                              className="flex items-center justify-between p-3 rounded-xl bg-neutral-50 dark:bg-neutral-800 hover:bg-neutral-100 dark:hover:bg-neutral-700 border border-black/20 dark:border-white/10 text-xs sm:text-sm font-bold text-neutral-800 dark:text-neutral-100 transition-colors group cursor-pointer"
                            >
                              <div className="flex items-center gap-2.5">
                                <PlayCircle className="w-4 h-4 text-blue-500 shrink-0 group-hover:scale-110 transition-transform" />
                                <span className="group-hover:text-blue-600 transition-colors">{lecture.title}</span>
                              </div>
                              <div className="flex items-center gap-3">
                                {lecture.freePreview && (
                                  <span className="text-[10px] font-black uppercase tracking-wider bg-emerald-100 dark:bg-emerald-900 text-emerald-800 dark:text-emerald-300 border border-emerald-500 px-2 py-0.5 rounded">
                                    Study Lesson
                                  </span>
                                )}
                                <span className="text-neutral-500 dark:text-neutral-400 text-xs">
                                  {lecture.duration}
                                </span>
                              </div>
                            </Link>
                          ))}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Instructor Details */}
            <div className="rounded-3xl border-[3.5px] border-black bg-yellow-100 dark:bg-neutral-800 p-8 shadow-brutal">
              <h2 className="text-2xl font-black text-black dark:text-white font-display mb-4">
                About the Instructor
              </h2>
              <div className="flex flex-col sm:flex-row items-start gap-6">
                <div className="relative w-20 h-20 rounded-2xl overflow-hidden border-[2.5px] border-black dark:border-white/30 shrink-0 shadow-brutal-sm">
                  <Image
                    src={course.instructor.avatar}
                    alt={course.instructor.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <div>
                  <h3 className="text-xl font-black text-black dark:text-white font-display">
                    {course.instructor.name}
                  </h3>
                  <p className="text-xs font-bold text-neutral-600 dark:text-neutral-400 uppercase tracking-wider mb-2">
                    {course.instructor.role}
                  </p>
                  <p className="text-sm font-medium text-neutral-800 dark:text-neutral-200 leading-relaxed">
                    {course.instructor.bio}
                  </p>
                </div>
              </div>
            </div>

            {/* FAQs */}
            <div className="rounded-3xl border-[3.5px] border-black bg-white p-8 shadow-brutal">
              <h2 className="text-2xl font-black text-black font-display mb-6">
                Frequently Asked Questions
              </h2>
              <div className="space-y-3">
                {course.faqs.map((faq, fIdx) => {
                  const isOpen = expandedFaq === fIdx;
                  return (
                    <div
                      key={fIdx}
                      className="rounded-2xl border-2 border-black overflow-hidden"
                    >
                      <button
                        onClick={() => setExpandedFaq(isOpen ? null : fIdx)}
                        className="w-full px-5 py-4 flex items-center justify-between text-left font-black text-sm text-black bg-neutral-50 hover:bg-neutral-100"
                      >
                        <span>{faq.question}</span>
                        {isOpen ? (
                          <ChevronUp className="w-4 h-4 shrink-0" />
                        ) : (
                          <ChevronDown className="w-4 h-4 shrink-0" />
                        )}
                      </button>
                      {isOpen && (
                        <div className="p-5 text-sm font-medium text-neutral-700 bg-white border-t border-black/20 leading-relaxed">
                          {faq.answer}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Right Column: Sticky Pricing & Action Card (4 cols) */}
          <div className="lg:col-span-4">
            <div className="sticky top-20 rounded-3xl border-[3.5px] border-black bg-white p-6 shadow-brutal-xl">
              {/* Preview image */}
              <div className="relative w-full aspect-video rounded-2xl overflow-hidden border-2 border-black mb-6 shadow-brutal-sm">
                <Image
                  src={course.thumbnail}
                  alt={course.title}
                  fill
                  className="object-cover"
                />
              </div>

              {/* Price Row */}
              <div className="flex items-baseline gap-3 mb-2">
                <span className="text-4xl font-black text-black font-display">
                  {course.price}
                </span>
                {course.originalPrice && course.originalPrice !== course.price && (
                  <span className="text-lg text-neutral-400 line-through font-bold">
                    {course.originalPrice}
                  </span>
                )}
                {discountPercent !== null && (
                  <span className="px-2 py-0.5 rounded-md bg-emerald-200 text-emerald-900 border border-emerald-800 text-xs font-black">
                    {discountPercent}% OFF
                  </span>
                )}
              </div>

              {isComingSoon ? (
                <p className="text-xs font-bold text-blue-600 mb-6">
                  🚀 Course Launching Soon — Detailed Syllabus Below
                </p>
              ) : (
                <p className="text-xs font-bold text-red-600 mb-6">
                  🔥 Special promotional pricing active for this batch
                </p>
              )}

              {/* Action Button */}
              {isComingSoon ? (
                <div className="mb-4">
                  <button
                    disabled
                    className="btn-brutal bg-amber-300 text-black border-2 border-black w-full py-4 text-base tracking-wide uppercase font-black opacity-95 cursor-not-allowed shadow-brutal-sm"
                  >
                    Coming Soon
                  </button>
                  <p className="text-[11px] text-center font-bold text-neutral-500 mt-2">
                    Official enrollment opens soon! Check out the complete module list below.
                  </p>
                </div>
              ) : enrolled ? (
                <div className="rounded-2xl border-2 border-emerald-600 bg-emerald-100 p-4 text-center mb-6">
                  <p className="font-display font-black text-emerald-900 text-base mb-2">
                    🎉 You are enrolled!
                  </p>
                  <Link
                    href={`/courses/${course.slug}/learn`}
                    className="btn-brutal bg-emerald-400 hover:bg-emerald-300 text-black border-[2.5px] border-black w-full py-3 text-xs uppercase font-black tracking-wider flex items-center justify-center gap-2 mb-2"
                  >
                    <BookOpen className="w-4 h-4 stroke-[2.5]" />
                    <span>Open Interactive Course &amp; Lab</span>
                  </Link>
                  <Link
                    href="/dashboard"
                    className="inline-block text-xs font-bold text-emerald-900 underline hover:text-black"
                  >
                    Go to Student Dashboard
                  </Link>
                </div>
              ) : (
                <div className="space-y-3 mb-6">
                  <Link
                    href={`/courses/${course.slug}/learn`}
                    className="btn-brutal bg-emerald-400 hover:bg-emerald-300 text-black border-[2.5px] border-black w-full py-3.5 text-sm tracking-wide uppercase font-black flex items-center justify-center gap-2 shadow-brutal hover-lift text-center"
                    id="start-course-btn"
                  >
                    <BookOpen className="w-4 h-4 stroke-[2.5]" />
                    <span>Start Free Masterclass &amp; Lab</span>
                  </Link>

                  <button
                    onClick={handleEnroll}
                    className="btn-brutal btn-brutal-yellow w-full py-3 text-xs tracking-wide uppercase font-black text-center"
                    id="enroll-now-btn"
                  >
                    Enroll &amp; Save Progress
                  </button>
                </div>
              )}

              {/* Perks List */}
              <div className="space-y-3 pt-4 border-t-2 border-neutral-200 text-xs font-bold text-neutral-700">
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-black stroke-[3]" />
                  <span>Full lifetime access to all future updates</span>
                </div>
                <div className="flex items-center gap-2">
                  <Award className="w-4 h-4 text-black" />
                  <span>Verified Certificate of Completion</span>
                </div>
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-black" />
                  <span>Access to private Discord / Telegram group</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
