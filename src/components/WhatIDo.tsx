"use client";

import React from "react";
import Link from "next/link";
import {
  ShieldCheck,
  Code2,
  Megaphone,
  Palette,
  ArrowRight,
  Check
} from "lucide-react";
import { services } from "@/data/siteData";
import { SquiggleDoodle } from "./Doodles";

export default function WhatIDo() {
  const getIcon = (iconName: string) => {
    switch (iconName) {
      case "ShieldCheck": return <ShieldCheck className="w-6 h-6" style={{ color: "var(--fg)" }} />;
      case "Code":        return <Code2       className="w-6 h-6" style={{ color: "var(--fg)" }} />;
      case "Megaphone":   return <Megaphone   className="w-6 h-6" style={{ color: "var(--fg)" }} />;
      case "Palette":     return <Palette     className="w-6 h-6" style={{ color: "var(--fg)" }} />;
      default:            return <ShieldCheck className="w-6 h-6" style={{ color: "var(--fg)" }} />;
    }
  };

  return (
    <section
      className="py-12 sm:py-20"
      style={{ backgroundColor: "var(--bg)" }}
      id="services"
    >
      <div className="max-w-7xl mx-auto px-3.5 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 sm:mb-12 gap-3 sm:gap-4">
          <div>
            <div className="flex items-center gap-2">
              <h2
                className="text-2xl sm:text-4xl lg:text-5xl font-black font-display tracking-tight"
                style={{ color: "var(--fg)" }}
              >
                What I Do ?
              </h2>
              <SquiggleDoodle className="w-16 sm:w-24 h-4 text-blue-500 inline-block transform -rotate-3" />
            </div>
          </div>
          <Link
            href="/contact?service=general"
            className="inline-flex items-center gap-1.5 font-extrabold text-blue-500 hover:text-blue-400 text-xs sm:text-base group"
          >
            <span>View All Services</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {/* 4 Service Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {services.map((service) => (
            <div
              key={service.id}
              className={`${service.accentBg} rounded-2xl sm:rounded-3xl border-[3.5px] border-black p-5 sm:p-7 shadow-brutal hover-lift flex flex-col justify-between relative group`}
            >
              <div>
                {/* Icon + Title */}
                <div className="flex items-center gap-3 mb-5">
                  {/* Icon box — always uses --fg for icon colour so it's visible in both modes */}
                  <div
                    className="w-12 h-12 rounded-2xl border-[2.5px] border-black flex items-center justify-center shadow-brutal-sm group-hover:scale-105 transition-transform shrink-0"
                    style={{ backgroundColor: "var(--bg-card)" }}
                  >
                    {getIcon(service.iconName)}
                  </div>
                  <h3 className="text-xl sm:text-2xl font-black text-black font-display tracking-tight leading-tight">
                    {service.title}
                  </h3>
                </div>

                {/* Items Checklist */}
                <ul className="space-y-2.5 mb-8">
                  {service.items.map((item) => (
                    <li
                      key={item}
                      className="flex items-start gap-2 text-xs sm:text-sm font-bold text-neutral-900 leading-snug"
                    >
                      <Check className="w-4 h-4 text-black stroke-[3] shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Bottom Card Action */}
              <div className="flex items-center justify-between pt-4 border-t-2 border-black/20">
                <span className="text-[11px] font-extrabold uppercase tracking-wider text-black/70">
                  {service.tagline}
                </span>
                <Link
                  href={`/contact?service=${service.id}`}
                  className="w-10 h-10 rounded-full bg-black text-white flex items-center justify-center shadow-brutal-sm hover:scale-110 hover:bg-blue-600 transition-all"
                  aria-label={`Inquire about ${service.title}`}
                >
                  <ArrowRight className="w-5 h-5 stroke-[2.5]" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
