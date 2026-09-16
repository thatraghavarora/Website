"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Clock, Calendar } from "lucide-react";
import { blogPosts } from "@/data/siteData";

export default function BlogSection() {
  const topArticles = blogPosts.slice(0, 3);

  return (
    <section className="py-16 sm:py-20 bg-neutral-50 border-t-[3.5px] border-black" id="blog">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-12 gap-4">
          <div>
            <div className="inline-block px-3 py-1 rounded-full border-2 border-black bg-purple-100 shadow-brutal-sm font-black text-xs tracking-wider uppercase text-purple-900 mb-3">
              LATEST FROM MY BLOG
            </div>
            <h2 className="text-3xl sm:text-5xl font-black text-black font-display tracking-tight">
              Thoughts, Learnings &amp; Experiences
            </h2>
          </div>
          <Link
            href="/blog"
            className="inline-flex items-center gap-1.5 font-extrabold text-blue-600 hover:text-blue-800 text-sm sm:text-base group"
          >
            <span>View All Posts</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {/* 3 Blog Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {topArticles.map((article) => (
            <div
              key={article.slug}
              className={`${article.accentColor} rounded-3xl border-[3.5px] border-black p-5 sm:p-6 shadow-brutal hover-lift flex flex-col justify-between group`}
            >
              <div>
                {/* Thumbnail */}
                <div className="relative w-full aspect-video rounded-2xl overflow-hidden border-[2.5px] border-black bg-white shadow-brutal-sm mb-5">
                  <Image
                    src={article.author.avatar}
                    alt={article.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute top-2.5 left-2.5 bg-black text-white text-[10px] font-black uppercase px-2 py-0.5 rounded-full">
                    {article.category}
                  </div>
                </div>

                {/* Title */}
                <h3 className="text-lg sm:text-xl font-black text-black font-display tracking-tight leading-snug mb-4 group-hover:text-blue-700 transition-colors">
                  <Link href={`/blog/${article.slug}`}>
                    {article.title}
                  </Link>
                </h3>
              </div>

              {/* Bottom Meta & Arrow */}
              <div className="flex items-center justify-between pt-4 border-t-2 border-black/20 text-xs font-bold text-neutral-800">
                <div className="flex items-center gap-2">
                  <span>{article.date}</span>
                  <span>•</span>
                  <span>{article.readTime}</span>
                </div>

                <Link
                  href={`/blog/${article.slug}`}
                  className="w-9 h-9 rounded-full bg-black text-white flex items-center justify-center shadow-brutal-sm group-hover:scale-110 group-hover:bg-blue-600 transition-all"
                  aria-label={`Read ${article.title}`}
                >
                  <ArrowRight className="w-4 h-4 stroke-[2.5]" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
