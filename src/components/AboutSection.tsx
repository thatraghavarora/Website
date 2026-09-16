"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  GraduationCap,
  Code2,
  ShieldAlert,
  Briefcase,
  BookOpen,
  Download
} from "lucide-react";
import { siteProfile } from "@/data/siteData";
import { LightbulbDoodle, SmileyDoodle } from "./Doodles";

export default function AboutSection() {
  const getIdentityIcon = (icon: string) => {
    switch (icon) {
      case "GraduationCap":
        return <GraduationCap className="w-5 h-5 text-black" />;
      case "Code2":
        return <Code2 className="w-5 h-5 text-black" />;
      case "ShieldAlert":
        return <ShieldAlert className="w-5 h-5 text-black" />;
      case "Briefcase":
        return <Briefcase className="w-5 h-5 text-black" />;
      case "BookOpen":
        return <BookOpen className="w-5 h-5 text-black" />;
      default:
        return <Code2 className="w-5 h-5 text-black" />;
    }
  };

  return (
    <section className="py-12 sm:py-20 bg-neutral-50 border-t-[3.5px] border-black overflow-hidden" id="about">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Left Column: Yellow Illustrated Card */}
          <div className="lg:col-span-5 relative">
            <div className="relative rounded-2xl sm:rounded-3xl border-[4px] border-black bg-[#FEF08A] p-5 sm:p-6 shadow-brutal-xl overflow-hidden group">
              {/* Top / background text */}
              <div className="mb-4">
                <p className="font-display font-black text-lg sm:text-2xl text-black leading-none uppercase tracking-tight">
                  PEOPLE • IDEAS
                  <br />
                  TECH • IMPACT
                </p>
              </div>

              {/* Character Illustration */}
              <div className="relative w-full aspect-square rounded-2xl overflow-hidden border-[3px] border-black bg-white shadow-brutal">
                <Image
                  src="/images/about-hacker.jpg"
                  alt="Raghav Arora - About Portrait"
                  fill
                  className="object-cover object-top group-hover:scale-105 transition-transform duration-500"
                />
              </div>

              {/* Floating </> badge on bottom-right */}
              <div className="absolute bottom-6 right-6 bg-white border-[2.5px] border-black rounded-xl px-3 py-1.5 shadow-brutal-sm -rotate-6 group-hover:rotate-0 transition-transform">
                <span className="font-mono-code font-black text-lg text-black">
                  &lt;/&gt;
                </span>
              </div>
            </div>
          </div>

          {/* Right Column: Bio, Identity Pills, Sticky Post-it & Actions */}
          <div className="lg:col-span-7 flex flex-col items-start">
            {/* Badge */}
            <div className="inline-block px-3.5 py-1 rounded-full border-2 border-black bg-blue-100 shadow-brutal-sm font-black text-xs tracking-wider uppercase text-blue-900 mb-3 sm:mb-4">
              ABOUT ME
            </div>

            {/* Main Heading */}
            <h2 className="text-2xl sm:text-4xl lg:text-5xl font-black text-black font-display tracking-tight leading-tight mb-4 sm:mb-5">
              More Than Just Code
            </h2>

            {/* Introduction Paragraph */}
            <p className="text-sm sm:text-base lg:text-lg text-neutral-800 font-medium leading-relaxed mb-6 sm:mb-8">
              {siteProfile.aboutText}
            </p>

            {/* 5 Identity Cards in a Row */}
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2.5 sm:gap-3 w-full mb-6 sm:mb-8">
              {siteProfile.identityPills.map((pill, pIdx) => (
                <div
                  key={pill.title}
                  className={`border-[2.5px] border-black rounded-2xl bg-white p-2.5 sm:p-3 shadow-brutal-sm hover:-translate-y-1 hover:shadow-brutal transition-all text-center flex flex-col items-center justify-center group ${
                    pIdx === 4 ? "col-span-2 sm:col-span-1" : ""
                  }`}
                >
                  <div className="w-8 h-8 rounded-lg bg-neutral-100 border border-black flex items-center justify-center mb-1.5 group-hover:bg-yellow-200 transition-colors">
                    {getIdentityIcon(pill.icon)}
                  </div>
                  <p className="font-display font-extrabold text-xs text-black">
                    {pill.title}
                  </p>
                </div>
              ))}
            </div>

            {/* CTAs and Sticky Card Row */}
            <div className="w-full flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-5 sm:gap-6 pt-4 border-t-2 border-neutral-300">
              {/* Buttons */}
              <div className="flex flex-col sm:flex-row flex-wrap items-stretch sm:items-center gap-3 sm:gap-4 w-full sm:w-auto">
                <a
                  href="/resume.pdf"
                  download
                  className="btn-brutal btn-brutal-primary px-5 sm:px-6 py-3 text-xs sm:text-sm tracking-wide w-full sm:w-auto text-center justify-center"
                >
                  <span>Download Resume</span>
                  <Download className="w-4 h-4" />
                </a>
                <Link
                  href="/about"
                  className="btn-brutal btn-brutal-white px-5 sm:px-6 py-3 text-xs sm:text-sm w-full sm:w-auto text-center justify-center"
                >
                  <span>Know More About Me</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>

              {/* Yellow Post-it Note matching reference */}
              <div className="relative bg-[#FEF08A] border-[2.5px] border-black rounded-2xl p-3.5 sm:p-4 shadow-brutal rotate-1 sm:rotate-2 hover:rotate-0 transition-transform max-w-xs w-full sm:w-auto self-start sm:self-auto shrink-0">
                {/* Dotted scotch tape at top */}
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-12 h-4 bg-yellow-200/90 border border-black/50 rounded-sm" />

                <p className="font-display font-black text-sm tracking-tight text-black leading-tight uppercase">
                  DISCIPLINE
                  <br />
                  BUILDS
                  <br />
                  FREEDOM.
                </p>
                <div className="flex items-center justify-between mt-2 pt-2 border-t border-black/30">
                  <p className="font-hand font-bold text-xs text-neutral-800">
                    - Raghav Arora
                  </p>
                  <div className="flex items-center gap-1">
                    <LightbulbDoodle className="w-5 h-5" />
                    <SmileyDoodle className="w-5 h-5" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
