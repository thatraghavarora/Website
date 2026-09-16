"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ArrowRight, Search, ShieldCheck, Globe, Leaf, KeyRound, Terminal } from "lucide-react";
import { projects } from "@/data/siteData";
import { SquiggleDoodle } from "@/components/Doodles";

export default function ProjectsPage() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  const categories = ["All", "Security", "Web", "AI", "Utility"];

  const filteredProjects = projects.filter((project) => {
    const matchesCategory =
      activeCategory === "All" ||
      project.category.toLowerCase().includes(activeCategory.toLowerCase()) ||
      project.tags.some((t) => t.toLowerCase() === activeCategory.toLowerCase());

    const matchesSearch =
      project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.tags.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()));

    return matchesCategory && matchesSearch;
  });

  const getProjectIcon = (slug: string) => {
    switch (slug) {
      case "webpeaker":
        return <ShieldCheck className="w-6 h-6 text-white" />;
      case "cyberhelper":
        return <Globe className="w-6 h-6 text-blue-900" />;
      case "healhack":
        return <Leaf className="w-6 h-6 text-emerald-900" />;
      case "password-generator":
        return <KeyRound className="w-6 h-6 text-purple-900" />;
      default:
        return <Terminal className="w-6 h-6 text-black" />;
    }
  };

  return (
    <div className="py-12 sm:py-16 bg-white min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="max-w-3xl mb-12">
          <div className="inline-block px-3.5 py-1 rounded-full border-2 border-black bg-blue-100 shadow-brutal-sm font-black text-xs uppercase tracking-wider text-blue-900 mb-4">
            PORTFOLIO &amp; LAB EXPERIMENTS
          </div>
          <div className="flex items-center gap-3">
            <h1 className="text-4xl sm:text-6xl font-black text-black font-display tracking-tight">
              Ideas into Real Impact
            </h1>
            <SquiggleDoodle className="w-16 h-4 text-blue-600 hidden sm:block -rotate-3" />
          </div>
          <p className="text-base sm:text-lg text-neutral-700 font-medium mt-4">
            Explore web applications, offensive security tools, AI research concepts, and open-source utilities built by Raghav Arora.
          </p>
        </div>

        {/* Filter Controls */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-10 pb-6 border-b-2 border-neutral-200">
          {/* Category Tabs */}
          <div className="flex flex-wrap items-center gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-2 rounded-xl font-black text-xs sm:text-sm border-2 border-black transition-all ${
                  activeCategory === cat
                    ? "bg-black text-white shadow-brutal-sm -translate-y-0.5"
                    : "bg-white text-black hover:bg-neutral-100"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Search Input */}
          <div className="relative w-full md:w-72">
            <input
              type="text"
              placeholder="Search projects or tags..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 rounded-xl border-2 border-black bg-white shadow-brutal-sm font-bold text-sm focus:outline-hidden focus:ring-2 focus:ring-blue-600"
            />
            <Search className="w-4 h-4 text-neutral-500 absolute left-3.5 top-3.5" />
          </div>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project) => {
            const isDark = project.darkCard;

            return (
              <div
                key={project.slug}
                className={`${project.accentColor} ${
                  isDark ? "text-white" : "text-black"
                } rounded-3xl border-[3.5px] border-black p-7 shadow-brutal hover-lift flex flex-col justify-between group`}
              >
                <div>
                  <div className="flex items-center justify-between gap-3 mb-5">
                    <div
                      className={`w-12 h-12 rounded-2xl border-2 border-black flex items-center justify-center shadow-brutal-sm ${
                        isDark ? "bg-neutral-800" : "bg-white"
                      }`}
                    >
                      {getProjectIcon(project.slug)}
                    </div>
                    <span
                      className={`text-xs font-black uppercase px-2.5 py-0.5 rounded-full border border-black ${
                        isDark ? "bg-neutral-800 text-yellow-300" : "bg-white text-black"
                      }`}
                    >
                      {project.category}
                    </span>
                  </div>

                  <h3 className="text-2xl font-black font-display tracking-tight leading-tight mb-2">
                    {project.title}
                  </h3>

                  <p
                    className={`text-xs sm:text-sm font-semibold mb-4 ${
                      isDark ? "text-neutral-300" : "text-neutral-700"
                    }`}
                  >
                    {project.subtitle}
                  </p>

                  <p
                    className={`text-sm font-medium line-clamp-3 mb-6 ${
                      isDark ? "text-neutral-400" : "text-neutral-600"
                    }`}
                  >
                    {project.description}
                  </p>

                  <div className="flex flex-wrap gap-1.5 mb-6">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className={`text-[11px] font-bold px-2.5 py-0.5 rounded-md border border-black ${
                          isDark
                            ? "bg-neutral-800 text-neutral-200"
                            : "bg-white text-neutral-900"
                        }`}
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="pt-4 border-t border-black/20 flex items-center justify-between">
                  <Link
                    href={`/projects/${project.slug}`}
                    className={`font-black text-sm flex items-center gap-1.5 hover:underline ${
                      isDark ? "text-white" : "text-black"
                    }`}
                  >
                    <span>Read Case Study</span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>

                  <Link
                    href={`/projects/${project.slug}`}
                    className={`w-10 h-10 rounded-full border-2 border-black flex items-center justify-center shadow-brutal-sm group-hover:scale-110 transition-all ${
                      isDark
                        ? "bg-white text-black hover:bg-yellow-300"
                        : "bg-black text-white hover:bg-blue-600"
                    }`}
                  >
                    <ArrowRight className="w-5 h-5 stroke-[2.5]" />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>

        {filteredProjects.length === 0 && (
          <div className="text-center py-16 border-2 border-dashed border-black rounded-3xl p-8">
            <p className="font-display font-black text-xl text-black">
              No projects found matching your filter.
            </p>
            <button
              onClick={() => {
                setActiveCategory("All");
                setSearchQuery("");
              }}
              className="mt-4 btn-brutal btn-brutal-primary px-6 py-2.5 text-xs uppercase"
            >
              Reset Filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
