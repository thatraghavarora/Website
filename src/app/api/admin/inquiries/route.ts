import { NextResponse } from "next/server";
import { verifyAdminAuth } from "@/lib/adminAuth";
import {
  createAdminSupabaseClient,
  isSupabaseServerConfigured,
} from "@/lib/supabase/server";
import {
  validateInquiryStatusUpdate,
  sanitizeString,
} from "@/lib/validations";

export async function GET(request: Request) {
  const auth = await verifyAdminAuth(request);
  if (!auth.authorized) {
    return NextResponse.json({ error: "Unauthorized access." }, { status: 401 });
  }

  const { searchParams } = new URL(request.url);
  const statusFilter = searchParams.get("status");
  const searchQuery = searchParams.get("search");

  if (!isSupabaseServerConfigured()) {
    // Return sample lead inquiries for demo administration
    const sampleLeads = [
      {
        id: "demo-lead-1",
        name: "Aarav Sharma",
        email: "aarav.sharma@example.com",
        contact_handle: "@aarav_sec",
        service_type: "Cyber Security Guidance",
        details: "Interested in 1:1 Live guidance for breaking into bug bounties and learning Burp Suite Pro.",
        preferred_timeline: "Within 1 week",
        status: "new",
        created_at: new Date(Date.now() - 3600000 * 4).toISOString(),
      },
      {
        id: "demo-lead-2",
        name: "Vikram Patel",
        email: "vikram@fintechsafe.in",
        contact_handle: "+91 9876543210",
        service_type: "Hire Me As Pentester",
        details: "Need a comprehensive web application penetration test for our upcoming payment gateway release.",
        preferred_timeline: "Immediate / Urgent",
        status: "contacted",
        created_at: new Date(Date.now() - 3600000 * 24).toISOString(),
      },
      {
        id: "demo-lead-3",
        name: "Sneha Mukherjee",
        email: "sneha.m@techstudio.com",
        contact_handle: "@sneha_dev",
        service_type: "Hire Me As Web Developer",
        details: "Building a Next.js SaaS dashboard with custom cyber intelligence charts. Looking for contract development.",
        preferred_timeline: "Next Month",
        status: "scheduled",
        created_at: new Date(Date.now() - 3600000 * 48).toISOString(),
      },
    ];

    let filtered = sampleLeads;
    if (statusFilter && statusFilter !== "all") {
      filtered = filtered.filter((lead) => lead.status === statusFilter);
    }
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (lead) =>
          lead.name.toLowerCase().includes(q) ||
          lead.email.toLowerCase().includes(q) ||
          lead.service_type.toLowerCase().includes(q)
      );
    }

    return NextResponse.json({
      configured: false,
      inquiries: filtered,
      total: filtered.length,
    });
  }

  try {
    const admin = createAdminSupabaseClient();
    let query = admin
      .from("inquiries")
      .select("*")
      .order("created_at", { ascending: false });

    if (statusFilter && statusFilter !== "all") {
      query = query.eq("status", statusFilter);
    }

    if (searchQuery) {
      const q = sanitizeString(searchQuery, 100);
      query = query.or(`name.ilike.%${q}%,email.ilike.%${q}%,service_type.ilike.%${q}%`);
    }

    const { data, error } = await query;

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 400 });
    }

    return NextResponse.json({
      configured: true,
      inquiries: data || [],
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
    const id = sanitizeString(body?.id, 100);
    const rawStatus = body?.status;

    if (!id) {
      return NextResponse.json({ error: "Inquiry ID is required." }, { status: 400 });
    }

    // Server-Side Status Validation
    const validation = validateInquiryStatusUpdate(rawStatus);
    if (!validation.valid || !validation.status) {
      return NextResponse.json({ error: validation.error }, { status: 400 });
    }

    if (!isSupabaseServerConfigured()) {
      return NextResponse.json({
        success: true,
        demoMode: true,
        message: `Status updated to '${validation.status}' in demo mode.`,
        id,
        status: validation.status,
      });
    }

    const admin = createAdminSupabaseClient();
    const { data, error } = await admin
      .from("inquiries")
      .update({ status: validation.status })
      .eq("id", id)
      .select()
      .single();

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 400 });
    }

    return NextResponse.json({
      success: true,
      message: `Inquiry status updated to ${validation.status}.`,
      inquiry: data,
    });
  } catch (err: unknown) {
    const errorMessage = err instanceof Error ? err.message : "Internal Server Error";
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  const auth = await verifyAdminAuth(request);
  if (!auth.authorized) {
    return NextResponse.json({ error: "Unauthorized access." }, { status: 401 });
  }

  try {
    const { searchParams } = new URL(request.url);
    const id = sanitizeString(searchParams.get("id"), 100);

    if (!id) {
      return NextResponse.json({ error: "Inquiry ID is required." }, { status: 400 });
    }

    if (!isSupabaseServerConfigured()) {
      return NextResponse.json({
        success: true,
        demoMode: true,
        message: "Inquiry deleted successfully (Demo Mode).",
        id,
      });
    }

    const admin = createAdminSupabaseClient();
    const { error } = await admin.from("inquiries").delete().eq("id", id);

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 400 });
    }

    return NextResponse.json({
      success: true,
      message: "Inquiry deleted successfully from Supabase.",
    });
  } catch (err: unknown) {
    const errorMessage = err instanceof Error ? err.message : "Internal Server Error";
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}
