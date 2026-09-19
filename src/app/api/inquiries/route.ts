import { NextResponse } from "next/server";
import {
  createAdminSupabaseClient,
  isSupabaseServerConfigured,
} from "@/lib/supabase/server";
import { validateInquiryInput } from "@/lib/validations";

export async function GET() {
  if (!isSupabaseServerConfigured()) {
    return NextResponse.json({
      configured: false,
      inquiries: [],
    });
  }

  try {
    const admin = createAdminSupabaseClient();
    const { data, error } = await admin
      .from("inquiries")
      .select("*")
      .order("created_at", { ascending: false })
      .limit(50);

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 400 });
    }

    return NextResponse.json({
      configured: true,
      inquiries: data || [],
    });
  } catch (err: unknown) {
    const errorMessage = err instanceof Error ? err.message : "Internal Server Error";
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();

    // Strict Server-Side Validation & Sanitization
    const validation = validateInquiryInput(body);
    if (!validation.valid || !validation.data) {
      return NextResponse.json(
        {
          success: false,
          error: "Server-side validation failed.",
          validationErrors: validation.errors,
        },
        { status: 400 }
      );
    }

    const {
      name,
      email,
      contactHandle,
      serviceType,
      details,
      preferredTimeline,
    } = validation.data;

    if (!isSupabaseServerConfigured()) {
      return NextResponse.json({
        success: true,
        demoMode: true,
        message: "Inquiry validated and received in demo mode (Configure Supabase keys in .env.local to persist in database)",
        inquiry: {
          name,
          email,
          contact_handle: contactHandle,
          service_type: serviceType,
          details,
          preferred_timeline: preferredTimeline,
          status: "new",
          created_at: new Date().toISOString(),
        },
      });
    }

    const admin = createAdminSupabaseClient();
    const { data, error } = await admin
      .from("inquiries")
      .insert({
        name,
        email,
        contact_handle: contactHandle,
        service_type: serviceType,
        details,
        preferred_timeline: preferredTimeline,
        status: "new",
      })
      .select()
      .single();

    if (error) {
      return NextResponse.json({ success: false, error: error.message }, { status: 400 });
    }

    return NextResponse.json({
      success: true,
      inquiry: data,
      message: "Your inquiry was validated and stored successfully in Supabase database! Raghav will respond shortly.",
    });
  } catch (err: unknown) {
    const errorMessage = err instanceof Error ? err.message : "Internal Server Error";
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}

