import { NextResponse } from "next/server";
import {
  createServerSupabaseClient,
  createAdminSupabaseClient,
  isSupabaseServerConfigured,
} from "@/lib/supabase/server";
import { sanitizeString } from "@/lib/validations";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const postId = sanitizeString(body.postId, 100);
    const content = sanitizeString(body.content, 2000);
    const author = sanitizeString(body.author, 60) || "Student";
    const avatarColor = sanitizeString(body.avatarColor, 30) || "bg-yellow-300";

    if (!postId || !content) {
      return NextResponse.json(
        { error: "postId and content are required." },
        { status: 400 }
      );
    }

    if (!isSupabaseServerConfigured()) {
      return NextResponse.json({
        success: true,
        demoMode: true,
        comment: {
          id: `comment-mock-${Date.now()}`,
          author,
          avatarColor,
          content,
          time: "Just now",
        },
      });
    }

    const supabase = await createServerSupabaseClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();

    const admin = createAdminSupabaseClient();
    const { data: comment, error } = await admin
      .from("community_comments")
      .insert({
        post_id: postId,
        user_id: user?.id || null,
        author: user ? (user.user_metadata?.full_name || author) : author,
        avatar_color: avatarColor,
        content,
      })
      .select()
      .single();

    if (error) {
      return NextResponse.json({ success: false, error: error.message }, { status: 400 });
    }

    return NextResponse.json({
      success: true,
      comment: {
        id: comment.id,
        author: comment.author,
        avatarColor: comment.avatar_color,
        content: comment.content,
        time: "Just now",
      },
    });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Server error";
    return NextResponse.json({ success: false, error: message }, { status: 500 });
  }
}
