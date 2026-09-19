import { NextResponse } from "next/server";
import {
  createServerSupabaseClient,
  isSupabaseServerConfigured,
  createAdminSupabaseClient,
} from "@/lib/supabase/server";

export async function GET() {
  if (!isSupabaseServerConfigured()) {
    return NextResponse.json({
      configured: false,
      user: null,
      message: "Supabase environment variables not configured yet.",
    });
  }

  try {
    const supabase = await createServerSupabaseClient();
    const {
      data: { user },
      error,
    } = await supabase.auth.getUser();

    if (error || !user) {
      return NextResponse.json({ configured: true, user: null });
    }

    return NextResponse.json({ configured: true, user });
  } catch (err: unknown) {
    const errorMessage = err instanceof Error ? err.message : "Unknown error";
    return NextResponse.json(
      { configured: false, error: errorMessage },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { action, email, password, fullName } = body;

    if (!isSupabaseServerConfigured()) {
      // Graceful local demo mode
      return NextResponse.json({
        success: true,
        demoMode: true,
        user: {
          id: "demo-user-id",
          email: email || "student@example.com",
          full_name: fullName || "Raghav Student",
        },
        message: "Demo login successful (Supabase keys not yet set in .env.local)",
      });
    }

    const supabase = await createServerSupabaseClient();

    if (action === "signup") {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            full_name: fullName || "",
          },
        },
      });

      if (error) {
        return NextResponse.json({ success: false, error: error.message }, { status: 400 });
      }

      // If user is auto-confirmed, also ensure profile exists
      if (data.user) {
        const admin = createAdminSupabaseClient();
        await admin.from("profiles").upsert({
          id: data.user.id,
          email: data.user.email,
          full_name: fullName || splitEmail(email),
        });
      }

      return NextResponse.json({
        success: true,
        user: data.user,
        session: data.session,
      });
    }

    if (action === "login") {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        return NextResponse.json({ success: false, error: error.message }, { status: 400 });
      }

      return NextResponse.json({
        success: true,
        user: data.user,
        session: data.session,
      });
    }

    if (action === "logout") {
      await supabase.auth.signOut();
      return NextResponse.json({ success: true, message: "Logged out successfully" });
    }

    return NextResponse.json({ error: "Invalid action" }, { status: 400 });
  } catch (err: unknown) {
    const errorMessage = err instanceof Error ? err.message : "Internal Server Error";
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}

function splitEmail(email: string): string {
  return email ? email.split("@")[0] : "Student";
}
