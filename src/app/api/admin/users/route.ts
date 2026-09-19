import { NextResponse } from "next/server";
import { verifyAdminAuth } from "@/lib/adminAuth";
import {
  createAdminSupabaseClient,
  isSupabaseServerConfigured,
} from "@/lib/supabase/server";
import {
  validateUserRoleUpdate,
  sanitizeString,
} from "@/lib/validations";

export async function GET(request: Request) {
  const auth = await verifyAdminAuth(request);
  if (!auth.authorized) {
    return NextResponse.json({ error: "Unauthorized access." }, { status: 401 });
  }

  const { searchParams } = new URL(request.url);
  const roleFilter = searchParams.get("role");
  const searchQuery = searchParams.get("search");

  if (!isSupabaseServerConfigured()) {
    const sampleProfiles = [
      {
        id: "usr-1",
        email: "raghav@thatraghavarora.in",
        full_name: "Raghav Arora",
        role: "admin",
        created_at: new Date(Date.now() - 3600000 * 24 * 180).toISOString(),
      },
      {
        id: "usr-2",
        email: "student.ananya@gmail.com",
        full_name: "Ananya Sen",
        role: "student",
        created_at: new Date(Date.now() - 3600000 * 24 * 14).toISOString(),
      },
      {
        id: "usr-3",
        email: "instructor.karan@cyberguard.io",
        full_name: "Karan Verma",
        role: "instructor",
        created_at: new Date(Date.now() - 3600000 * 24 * 60).toISOString(),
      },
    ];

    let filtered = sampleProfiles;
    if (roleFilter && roleFilter !== "all") {
      filtered = filtered.filter((u) => u.role === roleFilter);
    }
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (u) =>
          u.email.toLowerCase().includes(q) ||
          (u.full_name && u.full_name.toLowerCase().includes(q))
      );
    }

    return NextResponse.json({
      configured: false,
      users: filtered,
      total: filtered.length,
    });
  }

  try {
    const admin = createAdminSupabaseClient();
    let query = admin
      .from("profiles")
      .select("*")
      .order("created_at", { ascending: false });

    if (roleFilter && roleFilter !== "all") {
      query = query.eq("role", roleFilter);
    }

    if (searchQuery) {
      const q = sanitizeString(searchQuery, 100);
      query = query.or(`email.ilike.%${q}%,full_name.ilike.%${q}%`);
    }

    const { data, error } = await query;

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 400 });
    }

    return NextResponse.json({
      configured: true,
      users: data || [],
      total: data?.length || 0,
    });
  } catch (err: unknown) {
    const errorMessage = err instanceof Error ? err.message : "Internal Server Error";
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}

export async function PATCH(request: Request) {
  const auth = await verifyAdminAuth(request);
  if (!auth.authorized) {
    return NextResponse.json({ error: "Unauthorized access." }, { status: 401 });
  }

  try {
    const body = await request.json();
    const userId = sanitizeString(body?.userId, 100);
    const rawRole = body?.role;

    if (!userId) {
      return NextResponse.json({ error: "User ID is required." }, { status: 400 });
    }

    const validation = validateUserRoleUpdate(rawRole);
    if (!validation.valid || !validation.role) {
      return NextResponse.json({ error: validation.error }, { status: 400 });
    }

    if (!isSupabaseServerConfigured()) {
      return NextResponse.json({
        success: true,
        demoMode: true,
        message: `User role updated to ${validation.role} in demo mode.`,
        userId,
        role: validation.role,
      });
    }

    const admin = createAdminSupabaseClient();
    const { data, error } = await admin
      .from("profiles")
      .update({ role: validation.role, updated_at: new Date().toISOString() })
      .eq("id", userId)
      .select()
      .single();

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 400 });
    }

    return NextResponse.json({
      success: true,
      message: `User role changed to ${validation.role}.`,
      user: data,
    });
  } catch (err: unknown) {
    const errorMessage = err instanceof Error ? err.message : "Internal Server Error";
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}
