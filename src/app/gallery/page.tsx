"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Calendar,
  Sparkles,
  Trophy,
  Maximize2,
  X,
  ArrowRight,
  ShieldCheck,
  Zap,
  Users,
  Award,
} from "lucide-react";
import { galleryItems, GalleryItem } from "@/data/siteData";
import { CrownDoodle, SquiggleDoodle } from "@/components/Doodles";

const categories = [
  "All",
  "Hackathons",
  "Awards & Recognition",
  "Workshops & Speaking",
  "Sports & Milestones",
] as const;

export default function GalleryPage() {
  const [activeCategory, setActiveCategory] = useState<string>("All");
  const [selectedItem, setSelectedItem] = useState<GalleryItem | null>(null);

  const filteredItems =
    activeCategory === "All"
      ? galleryItems
      : galleryItems.filter((item) => item.category === activeCategory);

  return (
    <div className="py-8 sm:py-14 min-h-screen" style={{ backgroundColor: "var(--bg)", color: "var(--fg)" }}>
      <div className="max-w-7xl mx-auto px-3.5 sm:px-6 lg:px-8 space-y-10 sm:space-y-14">

        {/* ══ 1. PAGE HEADER ══════════════════════════════ */}
        <div className="max-w-3xl animate-slide-up">
          <div
            className="inline-block px-3.5 py-1 rounded-full border-2 border-black shadow-brutal-sm font-black text-xs uppercase tracking-wider mb-3 sm:mb-4"
            style={{ backgroundColor: "var(--bg-card)", color: "var(--fg)" }}
          >
            PHOTOGRAPHIC ARCHIVE
          </div>
          <div className="flex items-center gap-3">
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black font-display tracking-tight" style={{ color: "var(--fg)" }}>
              Gallery &amp; Moments
            </h1>
            <CrownDoodle className="w-9 h-9 sm:w-11 sm:h-11 hidden sm:block -rotate-12 animate-float-slow text-yellow-400" />
          </div>
          <p className="text-base sm:text-xl font-medium mt-3 sm:mt-4 leading-relaxed" style={{ color: "var(--fg-muted)" }}>
            Real snapshots from hackathons, police investigations, student workshops, and sports podiums.
          </p>
        </div>

        {/* ══ 2. STATS QUICK STRIP ════════════════════════ */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
          {[
            { label: "Hackathons", val: "20+", icon: <Zap className="w-5 h-5 text-yellow-500" />, bg: "bg-[#FEF9C3]" },
            { label: "1st Place Wins", val: "4", icon: <Trophy className="w-5 h-5 text-amber-500" />, bg: "bg-[#FEF08A]" },
            { label: "Students Taught", val: "100+", icon: <Users className="w-5 h-5 text-purple-500" />, bg: "bg-[#DDD6FE]" },
            { label: "District Gold Medals", val: "3x", icon: <Award className="w-5 h-5 text-emerald-500" />, bg: "bg-[#DCFCE7]" },
          ].map((s, idx) => (
            <div
              key={idx}
              className={`${s.bg} rounded-xl sm:rounded-2xl border-[3px] border-black p-3.5 sm:p-4 shadow-brutal hover-lift flex items-center gap-3`}
            >
              <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl border-2 border-black bg-white flex items-center justify-center shadow-brutal-sm shrink-0">
                {s.icon}
              </div>
              <div>
                <p className="text-lg sm:text-2xl font-black text-black font-display leading-tight">{s.val}</p>
                <p className="text-[10px] sm:text-xs font-black text-black/70 uppercase tracking-wider">{s.label}</p>
              </div>
            </div>
          ))}
        </div>

        {/* ══ 3. CATEGORY TABS ════════════════════════════ */}
        <div className="flex items-center gap-2 sm:gap-3 overflow-x-auto pb-2 scrollbar-none">
          {categories.map((cat) => {
            const isSelected = activeCategory === cat;
            return (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`btn-brutal px-4 sm:px-6 py-2 sm:py-2.5 text-xs sm:text-sm font-black whitespace-nowrap transition-all ${
                  isSelected
                    ? "btn-brutal-primary !text-white"
                    : "btn-brutal-white"
                }`}
              >
                {cat}
              </button>
            );
          })}
        </div>

        {/* ══ 4. GALLERY GRID ═════════════════════════════ */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-7">
          {filteredItems.map((item) => (
            <div
              key={item.id}
              onClick={() => setSelectedItem(item)}
              className="group cursor-pointer rounded-2xl sm:rounded-3xl border-[3.5px] border-black overflow-hidden shadow-brutal hover-lift flex flex-col justify-between"
              style={{ backgroundColor: "var(--bg-card)" }}
            >
              {/* Image Preview Container */}
              <div className="relative aspect-[4/3] w-full overflow-hidden border-b-[3px] border-black bg-neutral-900">
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors" />

                {/* Badge top-left */}
                <div className="absolute top-3 left-3 bg-black text-white text-[11px] font-black px-3 py-1 rounded-full border border-white/20 shadow-brutal-sm uppercase tracking-wider flex items-center gap-1.5">
                  <Sparkles className="w-3 h-3 text-yellow-400" />
                  <span>{item.badge}</span>
                </div>

                {/* Enlarge icon top-right */}
                <div className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white/95 border-2 border-black flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity shadow-brutal-sm text-black">
                  <Maximize2 className="w-4 h-4" />
                </div>

                {/* Date bottom-right */}
                <div className="absolute bottom-3 right-3 bg-white/95 text-black text-[11px] font-extrabold px-2.5 py-0.5 rounded-full border border-black shadow-brutal-sm flex items-center gap-1">
                  <Calendar className="w-3 h-3 text-neutral-600" />
                  <span>{item.date}</span>
                </div>
              </div>

              {/* Card Meta Content */}
              <div className="p-4 sm:p-5 flex flex-col justify-between flex-1">
                <div>
                  <span className="text-[10px] sm:text-xs font-black uppercase tracking-wider text-purple-600 dark:text-purple-400 mb-1 block">
                    {item.category}
                  </span>
                  <h3 className="text-base sm:text-lg font-black font-display tracking-tight leading-snug text-black group-hover:text-blue-600 transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-xs sm:text-sm font-medium text-neutral-600 mt-2 leading-relaxed">
                    {item.description}
                  </p>
                </div>

                <div className="pt-3 mt-3 border-t border-neutral-200 dark:border-neutral-800 flex items-center justify-between text-xs font-black text-neutral-800 dark:text-neutral-300">
                  <span>Click to Expand</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform text-purple-600" />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* ══ 5. BOTTOM CTA ═══════════════════════════════ */}
        <div
          className="rounded-2xl sm:rounded-3xl border-[3.5px] border-black p-6 sm:p-10 shadow-brutal-xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-5 sm:gap-8"
          style={{ backgroundColor: "var(--bg-card)" }}
        >
          <div>
            <span className="inline-block px-3 py-0.5 rounded-full border-2 border-black font-black text-xs uppercase tracking-wider mb-2 bg-yellow-300 text-black">
              COLLABORATE WITH RAGHAV
            </span>
            <h2 className="text-xl sm:text-3xl font-black font-display text-black leading-tight">
              Organizing a Hackathon or Workshop?
            </h2>
            <p className="text-xs sm:text-base font-medium text-neutral-600 mt-1">
              Available for live speaking, tech workshops, mentorship, and security keynotes.
            </p>
          </div>
          <Link
            href="/contact"
            className="btn-brutal btn-brutal-primary px-7 py-3 text-sm font-black w-full sm:w-auto text-center justify-center shrink-0"
          >
            <span>Let&apos;s Connect</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

      </div>

      {/* ══ LIGHTBOX MODAL ═══════════════════════════════ */}
      {selectedItem && (
        <div
          className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in duration-200"
          onClick={() => setSelectedItem(null)}
        >
          <div
            className="relative max-w-3xl w-full rounded-2xl sm:rounded-3xl border-[3.5px] border-black bg-white dark:bg-[#151824] shadow-brutal-xl overflow-hidden animate-in zoom-in-95 duration-200"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Image */}
            <div className="relative aspect-[16/10] w-full border-b-[3px] border-black bg-black">
              <Image
                src={selectedItem.image}
                alt={selectedItem.title}
                fill
                className="object-cover"
              />
              <button
                onClick={() => setSelectedItem(null)}
                className="absolute top-3 right-3 w-10 h-10 rounded-full bg-white text-black border-2 border-black flex items-center justify-center shadow-brutal-sm hover:scale-105 transition-all"
                aria-label="Close modal"
              >
                <X className="w-5 h-5 stroke-[2.5]" />
              </button>
            </div>

            {/* Modal Details */}
            <div className="p-5 sm:p-8">
              <div className="flex items-center gap-2 mb-2">
                <span className="bg-yellow-300 text-black text-xs font-black px-3 py-1 rounded-full border border-black shadow-brutal-sm uppercase">
                  {selectedItem.badge}
                </span>
                <span className="text-xs font-bold text-neutral-500 flex items-center gap-1">
                  <Calendar className="w-3.5 h-3.5" />
                  {selectedItem.date}
                </span>
              </div>
              <h3 className="text-lg sm:text-2xl font-black font-display text-black dark:text-white leading-snug mb-2">
                {selectedItem.title}
              </h3>
              <p className="text-xs sm:text-base font-medium text-neutral-700 dark:text-neutral-300 leading-relaxed">
                {selectedItem.description}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
