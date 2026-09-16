"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  Trophy,
  Calendar,
  Sparkles,
  ExternalLink,
  X,
  Maximize2,
} from "lucide-react";
import { galleryItems, GalleryItem } from "@/data/siteData";
import { SquiggleDoodle } from "./Doodles";

export default function FeaturedGallery() {
  const [selectedItem, setSelectedItem] = useState<GalleryItem | null>(null);

  // Display top 6 featured gallery items
  const displayItems = galleryItems.slice(0, 6);

  return (
    <section className="py-12 sm:py-20 bg-white border-t-[3.5px] border-black overflow-hidden" id="gallery">
      <div className="max-w-7xl mx-auto px-3.5 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 sm:mb-12 gap-3 sm:gap-4">
          <div>
            <div className="inline-block px-3.5 py-1 rounded-full border-2 border-black bg-yellow-300 shadow-brutal-sm font-black text-xs tracking-wider uppercase text-black mb-2.5 sm:mb-3">
              MOMENTS &amp; ACHIEVEMENTS
            </div>
            <div className="flex items-center gap-3 flex-wrap">
              <h2 className="text-2xl sm:text-4xl lg:text-5xl font-black text-black font-display tracking-tight">
                Gallery &amp; Milestones
              </h2>
              <SquiggleDoodle className="w-16 sm:w-20 h-4 text-purple-600 inline-block transform -rotate-3" />
            </div>
            <p className="text-xs sm:text-base text-neutral-600 font-medium mt-2 max-w-xl">
              Real moments from hackathons, police awards, speaking stages, and sports championships.
            </p>
          </div>
          <Link
            href="/gallery"
            className="inline-flex items-center gap-1.5 font-extrabold text-purple-600 hover:text-purple-800 text-xs sm:text-base group shrink-0"
          >
            <span>View All Photos</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {displayItems.map((item) => (
            <div
              key={item.id}
              onClick={() => setSelectedItem(item)}
              className="group cursor-pointer rounded-2xl sm:rounded-3xl border-[3.5px] border-black overflow-hidden shadow-brutal hover-lift flex flex-col justify-between"
              style={{ backgroundColor: "var(--bg-card)" }}
            >
              {/* Image Box with zoom on hover */}
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
                <div className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white/90 border-2 border-black flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity shadow-brutal-sm text-black">
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
                  <h3 className="text-base sm:text-lg font-black font-display tracking-tight leading-snug text-black group-hover:text-blue-600 transition-colors line-clamp-2">
                    {item.title}
                  </h3>
                  <p className="text-xs sm:text-sm font-medium text-neutral-600 mt-2 line-clamp-2 leading-relaxed">
                    {item.description}
                  </p>
                </div>

                <div className="pt-3 mt-3 border-t border-neutral-200 dark:border-neutral-800 flex items-center justify-between text-xs font-black text-neutral-800 dark:text-neutral-300">
                  <span>View Details</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform text-purple-600" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Lightbox Modal */}
      {selectedItem && (
        <div
          className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in duration-200"
          onClick={() => setSelectedItem(null)}
        >
          <div
            className="relative max-w-3xl w-full rounded-3xl border-[3.5px] border-black bg-white dark:bg-[#151824] shadow-brutal-xl overflow-hidden animate-in zoom-in-95 duration-200"
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
            <div className="p-6 sm:p-8">
              <div className="flex items-center gap-2 mb-2">
                <span className="bg-yellow-300 text-black text-xs font-black px-3 py-1 rounded-full border border-black shadow-brutal-sm uppercase">
                  {selectedItem.badge}
                </span>
                <span className="text-xs font-bold text-neutral-500 flex items-center gap-1">
                  <Calendar className="w-3.5 h-3.5" />
                  {selectedItem.date}
                </span>
              </div>
              <h3 className="text-xl sm:text-2xl font-black font-display text-black dark:text-white leading-snug mb-3">
                {selectedItem.title}
              </h3>
              <p className="text-sm sm:text-base font-medium text-neutral-700 dark:text-neutral-300 leading-relaxed">
                {selectedItem.description}
              </p>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
