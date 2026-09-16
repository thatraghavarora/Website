"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Star,
  Layers,
  BookOpen,
  Award,
  ArrowRight
} from "lucide-react";
import { roadmaps } from "@/data/siteData";
import { CrownDoodle, SquiggleDoodle } from "@/components/Doodles";

export default function RoadmapsPage() {
  const [selectedCategory, setSelectedCategory] = useState("All");

  const categories = ["All", "Cybersecurity", "Web Pentest", "Bug Bounty"];

  const allRoadmaps = roadmaps || [];
  const filteredRoadmaps = allRoadmaps.filter(
    (r) =>
      selectedCategory === "All" ||
      r.category === selectedCategory ||
      (selectedCategory === "Web Pentest" && r.slug.includes("pentesting")) ||
      (selectedCategory === "Bug Bounty" && r.slug.includes("cyber-security"))
  );

  return (
    <div className="py-12 sm:py-16 bg-white min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="max-w-3xl mb-12">
          <div className="inline-block px-3.5 py-1 rounded-full border-2 border-black bg-yellow-300 shadow-brutal-sm font-black text-xs uppercase tracking-wider text-black mb-4">
            PRACTICAL TECH ROADMAPS
          </div>
          <div className="flex items-center gap-3">
            <h1 className="text-4xl sm:text-6xl font-black text-black font-display tracking-tight">
              Master Practical Security
            </h1>
            <CrownDoodle className="w-10 h-10 hidden sm:block -rotate-12" />
          </div>
          <p className="text-base sm:text-lg text-neutral-700 font-medium mt-4 leading-relaxed">
            Battle-tested, step-by-step career and skill blueprints designed by Raghav Arora. From zero networking foundation to professional penetration testing and bug hunting.
          </p>
        </div>

        {/* Category Tabs */}
        <div className="flex flex-wrap items-center gap-3 mb-10 pb-6 border-b-2 border-neutral-200">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-5 py-2.5 rounded-full font-black text-xs sm:text-sm border-[2.5px] border-black transition-all ${
                selectedCategory === cat
                  ? "bg-blue-600 text-white shadow-brutal -translate-y-0.5"
                  : "bg-white text-black hover:bg-neutral-100"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Roadmaps Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredRoadmaps.map((roadmap) => (
            <div
              key={roadmap.slug}
              className="rounded-3xl border-[3.5px] border-black bg-white p-6 shadow-brutal hover-lift flex flex-col justify-between group relative overflow-hidden"
            >
              {/* Badge if available */}
              {roadmap.badge && (
                <div className="absolute top-4 right-4 z-10 bg-yellow-300 border-2 border-black rounded-full px-3 py-0.5 text-[10px] font-black uppercase tracking-wider shadow-brutal-sm">
                  {roadmap.badge}
                </div>
              )}

              <div>
                {/* Thumbnail */}
                <div className="relative w-full aspect-video rounded-2xl overflow-hidden border-[2.5px] border-black bg-neutral-900 shadow-brutal-sm mb-5">
                  <Image
                    src={roadmap.thumbnail}
                    alt={roadmap.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute bottom-2.5 left-2.5 bg-black/90 backdrop-blur-xs text-white text-[10px] font-black px-2.5 py-1 rounded-md border border-white/40 flex items-center gap-1.5">
                    <Layers className="w-3 h-3" />
                    <span>{roadmap.duration}</span>
                  </div>
                </div>

                {/* Rating & Level */}
                <div className="flex items-center justify-between text-xs font-bold mb-3">
                  <div className="flex items-center gap-1 text-amber-500 font-extrabold">
                    <Star className="w-4 h-4 fill-amber-400" />
                    <span className="text-black">{roadmap.rating}</span>
                    <span className="text-neutral-500">
                      ({roadmap.reviewsCount})
                    </span>
                  </div>
                  <span className="bg-purple-100 text-purple-900 border border-black px-2 py-0.5 rounded-md text-[11px] font-black uppercase">
                    {roadmap.level}
                  </span>
                </div>

                {/* Title */}
                <h3 className="text-xl font-black font-display text-black tracking-tight leading-snug mb-2 group-hover:text-blue-600 transition-colors">
                  <Link href={`/roadmap/${roadmap.slug}`}>
                    {roadmap.title}
                  </Link>
                </h3>

                <p className="text-xs sm:text-sm font-medium text-neutral-600 line-clamp-2 mb-6">
                  {roadmap.description}
                </p>

                {/* Micro Stats */}
                <div className="flex items-center gap-4 text-xs font-bold text-neutral-600 mb-6 pb-4 border-b border-neutral-200">
                  <span className="flex items-center gap-1">
                    <BookOpen className="w-3.5 h-3.5 text-blue-600" />
                    {roadmap.modulesCount} Modules
                  </span>
                  <span className="flex items-center gap-1">
                    <Award className="w-3.5 h-3.5 text-purple-600" />
                    Verified Labs &amp; Tools
                  </span>
                </div>
              </div>

              {/* Price & View CTA */}
              <div className="flex items-center justify-between pt-2">
                <div>
                  <span className="text-2xl font-black text-black font-display">
                    {roadmap.price}
                  </span>
                  {roadmap.originalPrice && roadmap.originalPrice !== roadmap.price && (
                    <span className="text-xs text-neutral-500 line-through ml-2 font-bold">
                      {roadmap.originalPrice}
                    </span>
                  )}
                </div>

                <Link
                  href={`/roadmap/${roadmap.slug}`}
                  className="btn-brutal btn-brutal-primary px-4 py-2 text-xs uppercase tracking-wider"
                >
                  <span>View Roadmap</span>
                  <ArrowRight className="w-3.5 h-3.5 stroke-[3]" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
