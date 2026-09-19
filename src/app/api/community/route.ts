import { NextResponse } from "next/server";
import {
  createServerSupabaseClient,
  createAdminSupabaseClient,
  isSupabaseServerConfigured,
} from "@/lib/supabase/server";
import { validateCommunityPostInput } from "@/lib/validations";

const DEFAULT_POSTS = [
  {
    id: "seed-1",
    author: "Aman Verma",
    role: "Student · Phase 3",
    avatarColor: "bg-yellow-300",
    category: "Achievement",
    title: "Got my first Hall of Fame acknowledgment from NASA! 🚀",
    content: "Followed the structured recon techniques from Raghav bhai's roadmap. Used sublist3r + httpx on wildcards, identified an exposed sensitive endpoint, and reported it responsibly. Huge thanks to this community!",
    time: "2 hours ago",
    likes: 18,
    likedByUser: false,
    comments: [
      {
        id: "c-1",
        author: "Raghav Arora",
        avatarColor: "bg-yellow-400",
        content: "Proud of you Aman! Incredible work. Keep hunting responsibly! 🔥",
        time: "1 hour ago",
      },
      {
        id: "c-2",
        author: "Karan Patel",
        avatarColor: "bg-purple-300",
        content: "Inspiring bro! Which phase of the roadmap helped you the most?",
        time: "45 mins ago",
      }
    ],
  },
  {
    id: "seed-2",
    author: "Priya Sharma",
    role: "Student",
    avatarColor: "bg-purple-300",
    category: "Doubt & Help",
    title: "Question regarding CSRF tokens in multi-step forms",
    content: "Hey everyone, when analyzing a multi-step checkout form in Burp Suite, the CSRF token changes on step 2. How do you automate CSRF testing with dynamic tokens using Burp Repeater/Macros?",
    time: "5 hours ago",
    likes: 7,
    likedByUser: false,
    comments: [
      {
        id: "c-3",
        author: "Siddharth Mehta",
        avatarColor: "bg-blue-300",
        content: "You can use Burp Session Handling Rules with 'Run a macro' to fetch the new token from step 1 before each request.",
        time: "3 hours ago",
      }
    ],
  },
  {
    id: "seed-3",
    author: "Rohan Gupta",
    role: "Web Dev Student",
    avatarColor: "bg-emerald-300",
    category: "Bug Bounty",
    title: "Found my first IDOR on an Indian eCommerce program",
    content: "Just tested user profile address endpoints with sequential IDs in the authorization header. Was able to view delivery addresses of other test accounts. Submitted report via Bugcrowd.",
    time: "Yesterday",
    likes: 24,
    likedByUser: false,
    comments: [],
  },
];

export async function GET() {
  if (!isSupabaseServerConfigured()) {
    return NextResponse.json({
      configured: false,
      posts: DEFAULT_POSTS,
    });
  }

  try {
    const admin = createAdminSupabaseClient();

    // Fetch posts ordered by created_at desc
    const { data: posts, error: postErr } = await admin
      .from("community_posts")
      .select("*, comments:community_comments(*)")
      .order("created_at", { ascending: false });

    if (postErr) {
      return NextResponse.json({
        configured: true,
        error: postErr.message,
        posts: DEFAULT_POSTS,
      });
    }

    if (!posts || posts.length === 0) {
      return NextResponse.json({
        configured: true,
        posts: DEFAULT_POSTS,
      });
    }

    // Format posts
    const formatted = posts.map((p: any) => ({
      id: p.id,
      author: p.author,
      role: p.author_role || "Student",
      avatarColor: p.avatar_color || "bg-yellow-300",
      category: p.category,
      title: p.title,
      content: p.content,
      time: new Date(p.created_at).toLocaleDateString("en-IN", {
        month: "short",
        day: "numeric",
      }),
      likes: p.likes || 0,
      likedByUser: false,
      comments: (p.comments || []).map((c: any) => ({
        id: c.id,
        author: c.author,
        avatarColor: c.avatar_color || "bg-yellow-300",
        content: c.content,
        time: new Date(c.created_at).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      })),
    }));

    return NextResponse.json({
      configured: true,
      posts: formatted,
    });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Internal error";
    return NextResponse.json({
      configured: true,
      error: message,
      posts: DEFAULT_POSTS,
    });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const validation = validateCommunityPostInput(body);
    if (!validation.valid || !validation.data) {
      return NextResponse.json(
        { success: false, errors: validation.errors },
        { status: 400 }
      );
    }

    const { title, content, category, author } = validation.data;
    const colors = ["bg-yellow-300", "bg-purple-300", "bg-emerald-300", "bg-blue-300", "bg-amber-300"];
    const avatarColor = colors[Math.floor(Math.random() * colors.length)];

    if (!isSupabaseServerConfigured()) {
      const mockPost = {
        id: `mock-${Date.now()}`,
        author,
        role: "Student",
        avatarColor,
        category,
        title,
        content,
        time: "Just now",
        likes: 1,
        likedByUser: true,
        comments: [],
      };

      return NextResponse.json({
        success: true,
        demoMode: true,
        post: mockPost,
      });
    }

    const supabase = await createServerSupabaseClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();

    const admin = createAdminSupabaseClient();
    const { data: newPost, error } = await admin
      .from("community_posts")
      .insert({
        user_id: user?.id || null,
        author,
        author_role: user ? "Verified Student" : "Student",
        avatar_color: avatarColor,
        category,
        title,
        content,
        likes: 0,
      })
      .select()
      .single();

    if (error) {
      return NextResponse.json({ success: false, error: error.message }, { status: 400 });
    }

    return NextResponse.json({
      success: true,
      post: {
        id: newPost.id,
        author: newPost.author,
        role: newPost.author_role,
        avatarColor: newPost.avatar_color,
        category: newPost.category,
        title: newPost.title,
        content: newPost.content,
        time: "Just now",
        likes: 0,
        likedByUser: false,
        comments: [],
      },
    });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Server error";
    return NextResponse.json({ success: false, error: message }, { status: 500 });
  }
}

export async function PATCH(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const postId = searchParams.get("id");
    const action = searchParams.get("action"); // "like" or "unlike"

    if (!postId) {
      return NextResponse.json({ error: "Missing post id" }, { status: 400 });
    }

    if (!isSupabaseServerConfigured()) {
      return NextResponse.json({ success: true, demoMode: true });
    }

    const admin = createAdminSupabaseClient();
    const { data: post } = await admin
      .from("community_posts")
      .select("likes")
      .eq("id", postId)
      .single();

    if (!post) {
      return NextResponse.json({ error: "Post not found" }, { status: 404 });
    }

    const currentLikes = post.likes || 0;
    const newLikes = action === "unlike" ? Math.max(0, currentLikes - 1) : currentLikes + 1;

    await admin
      .from("community_posts")
      .update({ likes: newLikes })
      .eq("id", postId);

    return NextResponse.json({ success: true, likes: newLikes });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Server error";
    return NextResponse.json({ success: false, error: message }, { status: 500 });
  }
}
