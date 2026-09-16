"use client";

import React from "react";
import Link from "next/link";
import {
  ArrowRight,
  Wifi,
  Leaf,
  KeyRound,
  MessageCircle,
  Search,
  Bitcoin,
} from "lucide-react";
import { projects } from "@/data/siteData";
import { SquiggleDoodle } from "./Doodles";

export default function FeaturedProjects() {
  const getProjectIcon = (slug: string) => {
    switch (slug) {
      case "crypto-whatsapp":
        return <Bitcoin className="w-6 h-6 text-yellow-400" />;
      case "whatsapp-auth":
        return <MessageCircle className="w-6 h-6 text-emerald-600" />;
      case "healhack":
        return <Leaf className="w-6 h-6 text-green-700" />;
      case "airbomb":
        return <Wifi className="w-6 h-6 text-purple-700" />;
      case "lookoninternet":
        return <Search className="w-6 h-6 text-blue-700" />;
      default:
        return <KeyRound className="w-6 h-6 text-black" />;
    }
  };

  // Show only the 5 user-specified real projects
  const featuredSlugs = [
    "crypto-whatsapp",
    "whatsapp-auth",
    "healhack",
    "airbomb",
    "lookoninternet",
  ];
  const featuredList = projects.filter((p) =>
    featuredSlugs.includes(p.slug)
  );

  return (
    <section className="py-12 sm:py-20 bg-white border-t-[3.5px] border-black" id="projects">
      <div className="max-w-7xl mx-auto px-3.5 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 sm:mb-12 gap-3 sm:gap-4">
          <div>
            <div className="inline-block px-3 py-1 rounded-full border-2 border-black bg-blue-100 shadow-brutal-sm font-black text-xs tracking-wider uppercase text-blue-900 mb-2.5 sm:mb-3">
              FEATURED PROJECTS
            </div>
            <div className="flex items-center gap-3 flex-wrap">
              <h2 className="text-2xl sm:text-4xl lg:text-5xl font-black text-black font-display tracking-tight">
                Ideas into Real Impact
              </h2>
              <SquiggleDoodle className="w-16 sm:w-20 h-4 text-blue-600 inline-block transform -rotate-3" />
            </div>
            <p className="text-xs sm:text-base text-neutral-600 font-medium mt-2 max-w-xl">
              Real tools, real ideas — built from curiosity and shipped to the world.
            </p>
          </div>
          <Link
            href="/projects"
            className="inline-flex items-center gap-1.5 font-extrabold text-blue-600 hover:text-blue-800 text-xs sm:text-base group shrink-0"
          >
            <span>View All Projects</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {/* 5 Cards: 2+3 responsive grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {featuredList.map((project, idx) => {
            const isDark = project.darkCard;
            // Make the last card span full width on lg if there's an odd one out
            const isLastOdd =
              featuredList.length % 3 !== 0 &&
              idx === featuredList.length - 1;

            return (
              <div
                key={project.slug}
                className={`${project.accentColor} ${
                  isDark ? "text-white" : "text-black"
                } rounded-2xl sm:rounded-3xl border-[3.5px] border-black p-5 sm:p-6 shadow-brutal hover-lift flex flex-col justify-between group relative ${
                  isLastOdd ? "sm:col-span-2 lg:col-span-1" : ""
                }`}
              >
                <div>
                  {/* Icon & Title */}
                  <div className="flex items-center gap-3 mb-4">
                    <div
                      className={`w-12 h-12 rounded-2xl border-[2.5px] border-black flex items-center justify-center shadow-brutal-sm shrink-0 ${
                        isDark ? "bg-neutral-800" : "bg-white"
                      }`}
                    >
                      {getProjectIcon(project.slug)}
                    </div>
                    <div>
                      <h3 className="text-xl font-black font-display tracking-tight leading-tight">
                        {project.title}
                      </h3>
                      <p
                        className={`text-[11px] font-bold uppercase tracking-wide ${
                          isDark ? "text-neutral-400" : "text-neutral-500"
                        }`}
                      >
                        {project.category}
                      </p>
                    </div>
                  </div>

                  {/* Description */}
                  <p
                    className={`text-xs sm:text-sm font-medium line-clamp-3 mb-5 ${
                      isDark ? "text-neutral-300" : "text-neutral-700"
                    }`}
                  >
                    {project.description}
                  </p>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-1.5 mb-6">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className={`text-[11px] font-extrabold px-2.5 py-0.5 rounded-full border border-black ${
                          isDark
                            ? "bg-neutral-800 text-neutral-200"
                            : "bg-white text-neutral-900"
                        }`}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Bottom: GitHub & Arrow */}
                <div className="pt-4 border-t border-black/20 flex items-center justify-between gap-3">
                  {project.github && (
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`text-xs font-bold underline underline-offset-2 hover:opacity-70 transition-opacity ${
                        isDark ? "text-neutral-300" : "text-neutral-700"
                      }`}
                    >
                      GitHub →
                    </a>
                  )}
                  <Link
                    href={`/projects/${project.slug}`}
                    className={`w-10 h-10 rounded-full border-2 border-black flex items-center justify-center shadow-brutal-sm group-hover:scale-110 transition-all ml-auto ${
                      isDark
                        ? "bg-white text-black hover:bg-yellow-300"
                        : "bg-black text-white hover:bg-blue-600"
                    }`}
                    aria-label={`View ${project.title}`}
                  >
                    <ArrowRight className="w-5 h-5 stroke-[2.5]" />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
