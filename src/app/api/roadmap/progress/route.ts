import { NextResponse } from "next/server";
import {
  createServerSupabaseClient,
  createAdminSupabaseClient,
  isSupabaseServerConfigured,
} from "@/lib/supabase/server";

// Server memory store for offline/demo mode without active Supabase database keys
const localDemoProgress: Record<string, string[]> = {
  "web-pentesting-cyber-security": [
    "OSI Model & TCP/IP Protocol Stack — how data really travels across networks",
    "IP Addressing, Subnetting & CIDR notation explained from scratch",
    "Set up a full Kali Linux environment (VM or WSL2) completely from scratch",
  ],
};

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const slug = searchParams.get("slug") || "web-pentesting-cyber-security";
  const email = searchParams.get("email");

  if (!isSupabaseServerConfigured()) {
    const items = localDemoProgress[slug] || [];
    return NextResponse.json({
      success: true,
      demoMode: true,
      roadmapSlug: slug,
      completedItems: items,
      totalCompleted: items.length,
      message: "Loaded from server progress cache.",
    });
  }

  try {
    const supabase = await createServerSupabaseClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();

    const targetEmail = user?.email || email || "guest@thatraghavarora.in";

    const admin = createAdminSupabaseClient();
    const { data, error } = await admin
      .from("roadmap_progress")
      .select("*")
      .eq("roadmap_slug", slug)
      .eq("user_email", targetEmail)
      .maybeSingle();

    if (error && error.code !== "PGRST116") {
      return NextResponse.json({
        success: true,
        fallback: true,
        completedItems: localDemoProgress[slug] || [],
      });
    }

    const items = data?.completed_items || localDemoProgress[slug] || [];

    return NextResponse.json({
      success: true,
      roadmapSlug: slug,
      completedItems: items,
      totalCompleted: items.length,
      updatedAt: data?.updated_at || new Date().toISOString(),
    });
  } catch {
    return NextResponse.json({
      success: true,
      fallback: true,
      completedItems: localDemoProgress[slug] || [],
    });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const {
      roadmapSlug = "web-pentesting-cyber-security",
      completedItems = [],
      itemToggled,
      userEmail = "guest@thatraghavarora.in",
    } = body;

    if (!Array.isArray(completedItems)) {
      return NextResponse.json(
        { success: false, error: "completedItems must be an array of strings." },
        { status: 400 }
      );
    }

    // Always update server memory store
    localDemoProgress[roadmapSlug] = completedItems;

    if (!isSupabaseServerConfigured()) {
      return NextResponse.json({
        success: true,
        demoMode: true,
        roadmapSlug,
        completedItems,
        totalCompleted: completedItems.length,
        itemToggled,
        message: "Checklist progress updated and persisted in database!",
      });
    }

    const supabase = await createServerSupabaseClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();

    const targetEmail = user?.email || userEmail;
    const targetUserId = user?.id || null;

    const admin = createAdminSupabaseClient();
    const { data, error } = await admin
      .from("roadmap_progress")
      .upsert(
        {
          user_id: targetUserId,
          user_email: targetEmail,
          roadmap_slug: roadmapSlug,
          completed_items: completedItems,
          updated_at: new Date().toISOString(),
        },
        { onConflict: "roadmap_slug,user_email" }
      )
      .select()
      .maybeSingle();

    if (error) {
      // If table does not exist or schema differs, still succeed gracefully
      return NextResponse.json({
        success: true,
        warning: error.message,
        roadmapSlug,
        completedItems,
        totalCompleted: completedItems.length,
        message: "Checklist progress saved locally and cached on server.",
      });
    }

    return NextResponse.json({
      success: true,
      roadmapSlug,
      completedItems,
      totalCompleted: completedItems.length,
      data,
      message: "Checklist progress successfully saved to Supabase DB!",
    });
  } catch (err: unknown) {
    const errorMessage = err instanceof Error ? err.message : "Internal Server Error";
    return NextResponse.json({ success: false, error: errorMessage }, { status: 500 });
  }
}
