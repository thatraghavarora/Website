"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Star, ArrowRight, Quote } from "lucide-react";
import { testimonials } from "@/data/siteData";
import { SquiggleDoodle } from "./Doodles";

export default function Testimonials() {
  return (
    <section className="py-16 sm:py-20 bg-white border-t-[3.5px] border-black" id="testimonials">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-12 gap-4">
          <div>
            <div className="inline-block px-3 py-1 rounded-full border-2 border-black bg-purple-100 shadow-brutal-sm font-black text-xs tracking-wider uppercase text-purple-900 mb-3">
              WHAT PEOPLE SAY
            </div>
            <div className="flex items-center gap-3">
              <h2 className="text-3xl sm:text-5xl font-black text-black font-display tracking-tight">
                Kind Words, Bigger Motivation
              </h2>
              <SquiggleDoodle className="w-16 sm:w-20 h-4 text-blue-600 inline-block transform -rotate-3" />
            </div>
          </div>
          <Link
            href="/about#reviews"
            className="inline-flex items-center gap-1.5 font-extrabold text-blue-600 hover:text-blue-800 text-sm sm:text-base group"
          >
            <span>View All Testimonials</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {/* 3 Testimonial Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((item) => (
            <div
              key={item.name}
              className="rounded-3xl border-[3.5px] border-black bg-white p-7 shadow-brutal hover-lift flex flex-col justify-between group relative"
            >
              <div className="mb-6">
                {/* 5 Stars */}
                <div className="flex items-center gap-1 mb-4">
                  {[...Array(item.rating)].map((_, i) => (
                    <Star
                      key={i}
                      className="w-4 h-4 fill-amber-400 text-amber-500"
                    />
                  ))}
                </div>

                {/* Quote */}
                <p className="text-sm sm:text-base font-semibold text-neutral-800 leading-relaxed italic">
                  &ldquo;{item.quote}&rdquo;
                </p>
              </div>

              {/* Author Footer */}
              <div className="flex items-center gap-3 pt-4 border-t-2 border-neutral-200">
                <div className="relative w-12 h-12 rounded-full overflow-hidden border-2 border-black shrink-0 shadow-brutal-sm">
                  <Image
                    src={item.avatar}
                    alt={item.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <div>
                  <h3 className="font-display font-black text-sm sm:text-base text-black leading-tight">
                    {item.name}
                  </h3>
                  <p className="text-xs font-bold text-neutral-500">
                    {item.role}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
