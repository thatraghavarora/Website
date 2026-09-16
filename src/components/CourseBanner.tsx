"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, CheckCircle2, Sparkles } from "lucide-react";
import { CrownDoodle, SparkleDoodle } from "./Doodles";

export default function CourseBanner() {
  const benefits = [
    "Beginner Friendly",
    "Real-world Projects",
    "Lifetime Access",
    "Regular Updates"
  ];

  return (
    <section className="py-12 sm:py-20 bg-neutral-100 border-t-[3.5px] border-black" id="courses-banner">
      <div className="max-w-7xl mx-auto px-3.5 sm:px-6 lg:px-8">
        <div className="relative rounded-2xl sm:rounded-[2.5rem] border-[4px] border-black bg-black text-white p-5 sm:p-10 lg:p-14 shadow-brutal-xl overflow-hidden">
          {/* Subtle background stars */}
          <div className="absolute top-6 left-12 opacity-30 pointer-events-none hidden sm:block">
            <SparkleDoodle className="w-8 h-8 text-yellow-400" />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center">
            {/* Left Column: Offer details */}
            <div className="lg:col-span-7 z-10 flex flex-col items-start">
              <div className="inline-block px-3.5 py-1 rounded-full border border-neutral-700 bg-neutral-900 text-yellow-300 font-extrabold text-xs tracking-wider uppercase mb-3 sm:mb-4">
                LET&apos;S LEARN &amp; GROW TOGETHER
              </div>

              <h2 className="text-2xl sm:text-5xl lg:text-6xl font-black text-white font-display tracking-tight leading-tight mb-3 sm:mb-4">
                Join My Courses
              </h2>

              <p className="text-sm sm:text-lg text-neutral-300 font-medium max-w-lg mb-6 sm:mb-8 leading-relaxed">
                Practical, hands-on courses to upskill in Cyber Security, Web Development, and more.
              </p>

              {/* 4 Benefits in 2-column grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-3.5 mb-6 sm:mb-8 w-full max-w-md">
                {benefits.map((b) => (
                  <div key={b} className="flex items-center gap-2.5">
                    <CheckCircle2 className="w-4 h-4 sm:w-5 sm:h-5 text-emerald-400 shrink-0 stroke-[2.5]" />
                    <span className="font-bold text-xs sm:text-sm text-neutral-200">{b}</span>
                  </div>
                ))}
              </div>

              {/* Yellow Brutalist Button */}
              <Link
                href="/courses"
                className="btn-brutal btn-brutal-yellow px-7 py-3.5 sm:px-8 sm:py-4 text-sm sm:text-base tracking-wide w-full sm:w-auto text-center justify-center"
                id="banner-explore-courses-btn"
              >
                <span>Explore Courses</span>
                <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 stroke-[2.5]" />
              </Link>
            </div>

            {/* Right Column: Character with Laptop & Crown */}
            <div className="lg:col-span-5 relative flex justify-center lg:justify-end">
              <div className="relative w-full max-w-[260px] sm:max-w-[340px] aspect-square rounded-2xl sm:rounded-3xl overflow-hidden border-[3.5px] border-white/80 bg-neutral-900 shadow-brutal-lg group">
                <Image
                  src="/images/course-hacker.jpg"
                  alt="Learn Ethical Hacking with Raghav"
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>

              {/* Floating Crown above character */}
              <div className="absolute -top-6 right-10 sm:right-16 rotate-12 pointer-events-none">
                <CrownDoodle className="w-12 h-10" />
              </div>

              {/* Editorial hand-drawn text banner */}
              <div className="absolute -bottom-5 -left-4 sm:-bottom-6 sm:left-4 bg-yellow-300 border-[3px] border-black rounded-2xl px-4 py-2 shadow-brutal -rotate-3 hover:rotate-0 transition-transform">
                <div className="flex items-center gap-1.5">
                  <Sparkles className="w-4 h-4 text-black" />
                  <p className="font-display font-black text-xs sm:text-sm uppercase tracking-tight text-black leading-tight">
                    SKILLS TODAY
                    <br />
                    <span className="text-blue-900">A SAFER TOMORROW.</span>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
