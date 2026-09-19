import React from "react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Clock, Calendar, User, Share2, Tag, ArrowRight } from "lucide-react";
import { blogPosts, BlogPost } from "@/data/siteData";
import {
  createAdminSupabaseClient,
  isSupabaseServerConfigured,
} from "@/lib/supabase/server";

export const dynamicParams = true;

export async function generateStaticParams() {
  return blogPosts.map((post) => ({ slug: post.slug }));
}

export default async function BlogPostPage({
  params
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  let post: BlogPost | undefined = blogPosts.find((p) => p.slug === slug);

  if (!post && isSupabaseServerConfigured()) {
    try {
      const admin = createAdminSupabaseClient();
      const { data } = await admin.from("blogs").select("*").eq("slug", slug).single();
      if (data) {
        post = {
          slug: data.slug,
          title: data.title,
          excerpt: data.excerpt,
          content: data.content,
          category: (data.category as any) || "Cybersecurity",
          tags: Array.isArray(data.tags) ? data.tags : ["Security"],
          readTime: data.read_time || "5 min read",
          date: new Date(data.created_at || Date.now()).toLocaleDateString("en-US", {
            month: "short",
            day: "numeric",
            year: "numeric",
          }),
          author: {
            name: data.author_name || "Raghav Arora",
            avatar: data.author_avatar || "/images/hero-avatar.jpg",
            role: "Security Researcher",
          },
          accentColor: "bg-yellow-200",
        };
      }
    } catch {}
  }

  if (!post) {
    notFound();
  }

  return (
    <div className="py-12 sm:py-16 bg-white min-h-screen">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back Link */}
        <Link
          href="/blog"
          className="inline-flex items-center gap-2 font-bold text-sm text-neutral-700 hover:text-black mb-8 group"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          <span>Back to All Writeups</span>
        </Link>

        {/* Article Header Card */}
        <div className="rounded-3xl border-[3.5px] border-black bg-yellow-50 p-8 sm:p-12 shadow-brutal-xl mb-12">
          <div className="flex flex-wrap items-center gap-3 mb-4">
            <span className="px-3.5 py-1 rounded-full border-2 border-black bg-black text-white font-black text-xs uppercase tracking-wider">
              {post.category}
            </span>
            <div className="flex items-center gap-2 text-xs font-bold text-neutral-700">
              <Calendar className="w-3.5 h-3.5" />
              <span>{post.date}</span>
              <span>•</span>
              <Clock className="w-3.5 h-3.5" />
              <span>{post.readTime}</span>
            </div>
          </div>

          <h1 className="text-3xl sm:text-5xl font-black text-black font-display tracking-tight leading-tight mb-6">
            {post.title}
          </h1>

          {/* Author Box */}
          <div className="flex items-center gap-4 pt-6 border-t-2 border-neutral-300">
            <div className="relative w-12 h-12 rounded-full overflow-hidden border-2 border-black shadow-brutal-sm">
              <Image
                src={post.author.avatar}
                alt={post.author.name}
                fill
                className="object-cover"
              />
            </div>
            <div>
              <p className="font-display font-black text-base text-black">
                {post.author.name}
              </p>
              <p className="text-xs font-bold text-neutral-600">
                {post.author.role} • @thatraghavarora
              </p>
            </div>
          </div>
        </div>

        {/* Article Body Content */}
        <div className="rounded-3xl border-[3.5px] border-black bg-white p-8 sm:p-12 shadow-brutal mb-12">
          <div className="prose max-w-none text-neutral-900 font-medium text-base sm:text-lg leading-relaxed space-y-6">
            <p className="text-xl sm:text-2xl font-bold text-neutral-800 border-l-4 border-black pl-4 italic">
              {post.excerpt}
            </p>

            {post.content.split("\n\n").map((paragraph, idx) => {
              if (paragraph.startsWith("# ")) {
                return (
                  <h1 key={idx} className="text-3xl font-black font-display text-black pt-4">
                    {paragraph.replace("# ", "")}
                  </h1>
                );
              }
              if (paragraph.startsWith("### ")) {
                return (
                  <h3 key={idx} className="text-2xl font-black font-display text-black pt-4">
                    {paragraph.replace("### ", "")}
                  </h3>
                );
              }
              if (paragraph.startsWith("```")) {
                const codeContent = paragraph.replace(/```[a-z]*\n?/g, "");
                return (
                  <pre
                    key={idx}
                    className="p-4 rounded-2xl bg-neutral-900 text-yellow-300 border-2 border-black font-mono-code text-sm overflow-x-auto"
                  >
                    <code>{codeContent}</code>
                  </pre>
                );
              }
              return <p key={idx}>{paragraph}</p>;
            })}
          </div>

          {/* Tags */}
          <div className="mt-10 pt-6 border-t-2 border-neutral-200 flex flex-wrap items-center gap-2">
            <Tag className="w-4 h-4 text-black mr-2" />
            {post.tags.map((tag) => (
              <span
                key={tag}
                className="px-3 py-1 rounded-lg border border-black bg-neutral-100 font-bold text-xs text-black"
              >
                #{tag}
              </span>
            ))}
          </div>
        </div>

        {/* Next Read CTA */}
        <div className="rounded-3xl border-[3.5px] border-black bg-purple-100 p-8 shadow-brutal flex flex-col sm:flex-row items-center justify-between gap-6">
          <div>
            <p className="font-display font-black text-xl text-black">
              Want more security tips and tutorials?
            </p>
            <p className="text-sm font-medium text-neutral-700 mt-1">
              Explore Raghav&apos;s practical hands-on ethical hacking courses.
            </p>
          </div>
          <Link
            href="/courses"
            className="btn-brutal btn-brutal-primary px-6 py-3 text-xs uppercase tracking-wider shrink-0"
          >
            <span>Explore Courses</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}
