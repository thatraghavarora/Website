import { NextResponse } from "next/server";
import {
  createServerSupabaseClient,
  createAdminSupabaseClient,
  isSupabaseServerConfigured,
} from "@/lib/supabase/server";
import { validateBlogInput } from "@/lib/validations";

interface LocalBlog {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  cover_image: string;
  category: string;
  tags: string[];
  read_time: string;
  author_name: string;
  author_avatar: string;
  is_published: boolean;
  views_count: number;
  created_at: string;
}

const localDemoBlogs: LocalBlog[] = [
  {
    id: "blog-1",
    slug: "how-to-find-first-bug-bounty",
    title: "How I Found My First Critical Bug in a Fortune 500 Company",
    excerpt: "A practical step-by-step walkthrough of finding an IDOR that exposed sensitive user data.",
    content: `Finding your first bug bounty can feel overwhelming. In this post, I break down the exact methodology I used to discover an IDOR vulnerability in an enterprise authorization header.
    
1. Reconnaissance: Mapping hidden endpoints using subfinder and httpx.
2. Parameter Analysis: Reviewing all API requests in Burp Suite Repeater.
3. Exploitation: Swapping UUIDs across lower privilege accounts.
4. Responsible Disclosure: Drafting a clear, reproducible report.`,
    cover_image: "/images/hero-hacker.jpg",
    category: "Bug Bounty",
    tags: ["Bug Bounty", "IDOR", "Recon"],
    read_time: "6 min read",
    author_name: "Raghav Arora",
    author_avatar: "/images/hero-avatar.jpg",
    is_published: true,
    views_count: 1420,
    created_at: new Date(Date.now() - 3600000 * 48).toISOString(),
  },
  {
    id: "blog-2",
    slug: "burp-suite-pro-tips-2026",
    title: "Top 10 Burp Suite Pro Tips for High-Impact Hunting",
    excerpt: "Learn how to leverage Intruder, Match and Replace, and Turbo Intruder to find race conditions.",
    content: `Burp Suite is the bread and butter of any web application penetration tester. Here are 10 workflows you need to integrate into your daily testing:
    
- Using Turbo Intruder with custom Python single-packet attacks to exploit race conditions.
- Auto-extracting CSRF tokens with Session Handling Rules.
- Bypassing Cloudflare 1020 blocks via header spoofing.`,
    cover_image: "/images/hero-hacker.jpg",
    category: "Tools & Automation",
    tags: ["Burp Suite", "Web Pentesting", "Pro Tips"],
    read_time: "8 min read",
    author_name: "Raghav Arora",
    author_avatar: "/images/hero-avatar.jpg",
    is_published: true,
    views_count: 980,
    created_at: new Date(Date.now() - 3600000 * 96).toISOString(),
  },
];

export async function GET() {
  if (!isSupabaseServerConfigured()) {
    return NextResponse.json({
      success: true,
      demoMode: true,
      blogs: localDemoBlogs,
      total: localDemoBlogs.length,
    });
  }

  try {
    const admin = createAdminSupabaseClient();
    const { data: blogs, error } = await admin
      .from("blogs")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      return NextResponse.json({
        success: true,
        fallback: true,
        blogs: localDemoBlogs,
      });
    }

    return NextResponse.json({
      success: true,
      blogs: blogs && blogs.length > 0 ? blogs : localDemoBlogs,
      total: blogs?.length || localDemoBlogs.length,
    });
  } catch {
    return NextResponse.json({
      success: true,
      fallback: true,
      blogs: localDemoBlogs,
    });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const validation = validateBlogInput(body);

    if (!validation.valid || !validation.data) {
      return NextResponse.json(
        { success: false, error: "Validation failed.", errors: validation.errors },
        { status: 400 }
      );
    }

    const { title, slug, excerpt, content, category, tags, coverImage } = validation.data;

    const newBlog: LocalBlog = {
      id: `blog-${Date.now()}`,
      slug,
      title,
      excerpt,
      content,
      cover_image: coverImage || "/images/hero-avatar.jpg",
      category,
      tags,
      read_time: `${Math.max(2, Math.round(content.split(" ").length / 150))} min read`,
      author_name: "Raghav Arora",
      author_avatar: "/images/hero-avatar.jpg",
      is_published: true,
      views_count: 0,
      created_at: new Date().toISOString(),
    };

    localDemoBlogs.unshift(newBlog);

    if (!isSupabaseServerConfigured()) {
      return NextResponse.json({
        success: true,
        demoMode: true,
        blog: newBlog,
        message: "Blog article published successfully in local demo cache!",
      });
    }

    const admin = createAdminSupabaseClient();
    const { data, error } = await admin
      .from("blogs")
      .insert({
        slug,
        title,
        excerpt,
        content,
        cover_image: coverImage || "/images/hero-avatar.jpg",
        category,
        tags,
        read_time: newBlog.read_time,
        author_name: "Raghav Arora",
        is_published: true,
      })
      .select()
      .single();

    if (error) {
      return NextResponse.json({
        success: true,
        warning: error.message,
        blog: newBlog,
        message: "Blog published and cached.",
      });
    }

    return NextResponse.json({
      success: true,
      blog: data,
      message: "Blog article published successfully in Supabase DB!",
    });
  } catch (err: unknown) {
    const errorMessage = err instanceof Error ? err.message : "Internal Server Error";
    return NextResponse.json({ success: false, error: errorMessage }, { status: 500 });
  }
}
