import { NextResponse } from "next/server";
import { verifyAdminAuth } from "@/lib/adminAuth";
import {
  createAdminSupabaseClient,
  isSupabaseServerConfigured,
} from "@/lib/supabase/server";

export async function GET(request: Request) {
  const auth = await verifyAdminAuth(request);
  if (!auth.authorized) {
    return NextResponse.json({ error: "Unauthorized access." }, { status: 401 });
  }

  if (!isSupabaseServerConfigured()) {
    const demoProgress = [
      {
        id: "prog-1",
        user_email: "hacker.priya@gmail.com",
        item_title: "Web Penetration Testing & Bug Bounty Roadmap",
        item_type: "roadmap",
        item_slug: "web-pentesting-cyber-security",
        progress_percent: 64.5,
        completed_count: 51,
        total_count: 80,
        enrolled_at: new Date(Date.now() - 3600000 * 24 * 14).toISOString(),
        last_activity: new Date(Date.now() - 3600000 * 2).toISOString(),
        status: "in_progress",
      },
      {
        id: "prog-2",
        user_email: "rohit.cyber@proton.me",
        item_title: "Computer Networking from Scratch",
        item_type: "course",
        item_slug: "computer-networking",
        progress_percent: 42.0,
        completed_count: 6,
        total_count: 14,
        enrolled_at: new Date(Date.now() - 3600000 * 24 * 7).toISOString(),
        last_activity: new Date(Date.now() - 3600000 * 5).toISOString(),
        status: "in_progress",
      },
      {
        id: "prog-3",
        user_email: "student.ananya@gmail.com",
        item_title: "Linux & CLI for Hackers",
        item_type: "course",
        item_slug: "linux-cli-fundamentals",
        progress_percent: 100.0,
        completed_count: 12,
        total_count: 12,
        enrolled_at: new Date(Date.now() - 3600000 * 24 * 30).toISOString(),
        last_activity: new Date(Date.now() - 3600000 * 24 * 2).toISOString(),
        status: "completed",
      },
    ];

    return NextResponse.json({
      configured: false,
      progressList: demoProgress,
      total: demoProgress.length,
    });
  }

  try {
    const admin = createAdminSupabaseClient();

    // Query both course_progress and roadmap_progress
    const [coursesRes, roadmapsRes] = await Promise.all([
      admin.from("course_progress").select("*").order("updated_at", { ascending: false }),
      admin.from("roadmap_progress").select("*").order("updated_at", { ascending: false }),
    ]);

    const list: Array<Record<string, unknown>> = [];

    if (coursesRes.data) {
      coursesRes.data.forEach((c) => {
        list.push({
          id: c.id,
          user_email: c.user_email || "student@lms.local",
          item_title: c.course_slug,
          item_type: "course",
          item_slug: c.course_slug,
          progress_percent: Number(c.progress_percent) || 0,
          completed_count: Array.isArray(c.completed_lectures) ? c.completed_lectures.length : 0,
          total_count: 15,
          enrolled_at: c.enrolled_at,
          last_activity: c.updated_at || c.last_watched_at,
          status: Number(c.progress_percent) >= 100 ? "completed" : "in_progress",
        });
      });
    }

    if (roadmapsRes.data) {
      roadmapsRes.data.forEach((r) => {
        list.push({
          id: r.id,
          user_email: r.user_email,
          item_title: r.roadmap_slug,
          item_type: "roadmap",
          item_slug: r.roadmap_slug,
          progress_percent: Number(r.progress_percent) || 0,
          completed_count: Array.isArray(r.completed_items) ? r.completed_items.length : 0,
          total_count: 80,
          enrolled_at: r.enrolled_at,
          last_activity: r.updated_at,
          status: Number(r.progress_percent) >= 100 ? "completed" : "in_progress",
        });
      });
    }

    return NextResponse.json({
      configured: true,
      progressList: list,
      total: list.length,
    });
  } catch (err: unknown) {
    const errorMessage = err instanceof Error ? err.message : "Internal Server Error";
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}
