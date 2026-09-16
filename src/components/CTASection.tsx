"use client";

import React from "react";
import Link from "next/link";
import { ArrowRight, Download } from "lucide-react";
import { ArrowHandDrawn } from "./Doodles";

export default function CTASection() {
  return (
    <section className="bg-black text-white border-t-[3.5px] border-black py-12 sm:py-16 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
          {/* Left Text */}
          <div className="flex flex-col items-start text-left max-w-2xl">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black font-display tracking-tight text-white mb-3">
              Let&apos;s Build a Safer Digital Tomorrow
            </h2>
            <p className="text-sm sm:text-base font-medium text-neutral-300">
              Open to collaborations, internships, projects, and exciting opportunities.
            </p>
          </div>

          {/* Right Actions & Hand-drawn Arrow */}
          <div className="flex flex-wrap items-center gap-4 relative">
            <Link
              href="/contact"
              className="btn-brutal btn-brutal-yellow px-7 py-3.5 text-sm sm:text-base font-black tracking-wide"
              id="cta-connect-btn"
            >
              <span>Let&apos;s Connect</span>
              <ArrowRight className="w-5 h-5 stroke-[2.5]" />
            </Link>

            <a
              href="/resume.pdf"
              download
              className="btn-brutal bg-neutral-900 text-white border-2 border-white/80 px-6 py-3.5 text-sm sm:text-base font-bold hover:bg-neutral-800"
            >
              <span>Download Resume</span>
              <Download className="w-4 h-4" />
            </a>

            {/* Hand-drawn arrow pointing up */}
            <div className="absolute -top-12 -right-8 text-white hidden xl:block pointer-events-none">
              <ArrowHandDrawn className="w-14 h-14 rotate-12" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
