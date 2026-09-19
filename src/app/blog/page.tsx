"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Search, Clock, Calendar, Bookmark, Tag } from "lucide-react";
import { blogPosts, BlogPost } from "@/data/siteData";
import { SquiggleDoodle } from "@/components/Doodles";

const ACCENTS = ["bg-yellow-200", "bg-rose-200", "bg-blue-200", "bg-emerald-200", "bg-purple-200"];

export default function BlogPage() {
  const [posts, setPosts] = useState<BlogPost[]>(blogPosts);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    fetch("/api/blogs")
      .then((res) => res.json())
      .then((data) => {
        if (data.blogs && Array.isArray(data.blogs)) {
          const apiBlogs: BlogPost[] = data.blogs.map((b: any, idx: number) => ({
            slug: b.slug,
            title: b.title,
            excerpt: b.excerpt,
            content: b.content,
            category: (b.category as any) || "Cybersecurity",
            tags: Array.isArray(b.tags) ? b.tags : ["Security"],
            readTime: b.read_time || "5 min read",
            date: new Date(b.created_at || Date.now()).toLocaleDateString("en-US", {
              month: "short",
              day: "numeric",
              year: "numeric",
            }),
            author: {
              name: b.author_name || "Raghav Arora",
              avatar: b.author_avatar || "/images/hero-avatar.jpg",
              role: "Security Researcher",
            },
            accentColor: ACCENTS[idx % ACCENTS.length],
          }));

          // Deduplicate by slug
          const combined = [...apiBlogs];
          blogPosts.forEach((bp) => {
            if (!combined.some((c) => c.slug === bp.slug)) {
              combined.push(bp);
            }
          });
          setPosts(combined);
        }
      })
      .catch(() => {});
  }, []);

  const categories = ["All", "Cybersecurity", "Bug Bounty", "Tools & Automation", "Development", "Learning", "Career"];

  const filteredPosts = posts.filter((post) => {
    const matchesCategory =
      selectedCategory === "All" || post.category === selectedCategory;

    const matchesSearch =
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.tags.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()));

    return matchesCategory && matchesSearch;
  });

  return (
    <div className="py-12 sm:py-16 bg-white min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="max-w-3xl mb-12">
          <div className="inline-block px-3.5 py-1 rounded-full border-2 border-black bg-rose-100 shadow-brutal-sm font-black text-xs uppercase tracking-wider text-rose-900 mb-4">
            WRITEUPS, THOUGHTS &amp; TUTORIALS
          </div>
          <div className="flex items-center gap-3">
            <h1 className="text-4xl sm:text-6xl font-black text-black font-display tracking-tight">
              Thoughts, Learnings &amp; Experiences
            </h1>
          </div>
          <p className="text-base sm:text-lg text-neutral-700 font-medium mt-4 leading-relaxed">
            Read technical writeups on bug bounty hunting, responsible disclosure methodologies, web security, and software craftsmanship.
          </p>
        </div>

        {/* Filter and Search Bar */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-10 pb-6 border-b-2 border-neutral-200">
          <div className="flex flex-wrap items-center gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-xl font-black text-xs sm:text-sm border-2 border-black transition-all ${
                  selectedCategory === cat
                    ? "bg-black text-white shadow-brutal-sm -translate-y-0.5"
                    : "bg-white text-black hover:bg-neutral-100"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="relative w-full md:w-72">
            <input
              type="text"
              placeholder="Search writeups..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 rounded-xl border-2 border-black bg-white shadow-brutal-sm font-bold text-sm focus:outline-hidden focus:ring-2 focus:ring-blue-600"
            />
            <Search className="w-4 h-4 text-neutral-500 absolute left-3.5 top-3.5" />
          </div>
        </div>

        {/* Articles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredPosts.map((post) => (
            <article
              key={post.slug}
              className={`${post.accentColor} rounded-3xl border-[3.5px] border-black p-6 shadow-brutal hover-lift flex flex-col justify-between group`}
            >
              <div>
                <div className="relative w-full aspect-video rounded-2xl overflow-hidden border-[2.5px] border-black bg-white shadow-brutal-sm mb-5">
                  <Image
                    src={post.author.avatar}
                    alt={post.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <span className="absolute top-2.5 left-2.5 bg-black text-white text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded-full border border-white/20">
                    {post.category}
                  </span>
                </div>

                <div className="flex items-center gap-2 text-xs font-bold text-neutral-700 mb-2">
                  <Calendar className="w-3.5 h-3.5" />
                  <span>{post.date}</span>
                  <span>•</span>
                  <Clock className="w-3.5 h-3.5" />
                  <span>{post.readTime}</span>
                </div>

                <h2 className="text-xl font-black font-display text-black tracking-tight leading-snug mb-3 group-hover:text-blue-700 transition-colors">
                  <Link href={`/blog/${post.slug}`}>
                    {post.title}
                  </Link>
                </h2>

                <p className="text-xs sm:text-sm font-medium text-neutral-700 line-clamp-3 mb-6 leading-relaxed">
                  {post.excerpt}
                </p>

                <div className="flex flex-wrap gap-1 mb-6">
                  {post.tags.map((t) => (
                    <span
                      key={t}
                      className="text-[10px] font-bold px-2 py-0.5 rounded bg-white/80 border border-black/30"
                    >
                      #{t}
                    </span>
                  ))}
                </div>
              </div>

              <div className="pt-4 border-t-2 border-black/20 flex items-center justify-between">
                <Link
                  href={`/blog/${post.slug}`}
                  className="font-black text-xs uppercase tracking-wider text-black flex items-center gap-1.5 hover:underline"
                >
                  <span>Read Article</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>

                <Link
                  href={`/blog/${post.slug}`}
                  className="w-9 h-9 rounded-full bg-black text-white flex items-center justify-center shadow-brutal-sm group-hover:scale-110 group-hover:bg-blue-600 transition-all"
                  aria-label={`Read ${post.title}`}
                >
                  <ArrowRight className="w-4 h-4 stroke-[2.5]" />
                </Link>
              </div>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
}
