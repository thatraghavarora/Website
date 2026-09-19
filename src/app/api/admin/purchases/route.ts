import { NextResponse } from "next/server";
import { verifyAdminAuth } from "@/lib/adminAuth";
import {
  createAdminSupabaseClient,
  isSupabaseServerConfigured,
} from "@/lib/supabase/server";
import {
  validatePurchaseInput,
  validatePurchaseStatusUpdate,
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
    const samplePurchases = [
      {
        id: "demo-purchase-1",
        user_email: "hacker.priya@gmail.com",
        item_slug: "web-pentesting-cyber-security",
        item_title: "Web Penetration Testing & Bug Bounty Roadmap",
        item_type: "roadmap",
        amount: "99 RS",
        payment_method: "upi",
        transaction_id: "TXN-DEMO-99120",
        status: "active",
        created_at: new Date(Date.now() - 3600000 * 12).toISOString(),
      },
      {
        id: "demo-purchase-2",
        user_email: "rohit.cyber@proton.me",
        item_slug: "computer-networking",
        item_title: "Computer Networking from Scratch",
        item_type: "course",
        amount: "₹1,499",
        payment_method: "card",
        transaction_id: "TXN-DEMO-44810",
        status: "active",
        created_at: new Date(Date.now() - 3600000 * 36).toISOString(),
      },
    ];

    let filtered = samplePurchases;
    if (statusFilter && statusFilter !== "all") {
      filtered = filtered.filter((p) => p.status === statusFilter);
    }
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (p) =>
          p.user_email.toLowerCase().includes(q) ||
          p.item_title.toLowerCase().includes(q) ||
          p.transaction_id.toLowerCase().includes(q)
      );
    }

    return NextResponse.json({
      configured: false,
      purchases: filtered,
      total: filtered.length,
    });
  }

  try {
    const admin = createAdminSupabaseClient();
    let query = admin
      .from("purchases")
      .select("*")
      .order("created_at", { ascending: false });

    if (statusFilter && statusFilter !== "all") {
      query = query.eq("status", statusFilter);
    }

    if (searchQuery) {
      const q = sanitizeString(searchQuery, 100);
      query = query.or(`user_email.ilike.%${q}%,item_title.ilike.%${q}%,transaction_id.ilike.%${q}%`);
    }

    const { data, error } = await query;

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 400 });
    }

    return NextResponse.json({
      configured: true,
      purchases: data || [],
      total: data?.length || 0,
    });
  } catch (err: unknown) {
    const errorMessage = err instanceof Error ? err.message : "Internal Server Error";
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}

// POST: Admin manual unlock / grant access
export async function POST(request: Request) {
  const auth = await verifyAdminAuth(request);
  if (!auth.authorized) {
    return NextResponse.json({ error: "Unauthorized access." }, { status: 401 });
  }

  try {
    const body = await request.json();

    const validation = validatePurchaseInput(body);
    if (!validation.valid || !validation.data) {
      return NextResponse.json(
        { error: "Validation failed.", validationErrors: validation.errors },
        { status: 400 }
      );
    }

    const {
      itemSlug,
      itemType,
      itemTitle,
      amount,
      paymentMethod,
      transactionId,
      userEmail,
    } = validation.data;

    if (!isSupabaseServerConfigured()) {
      return NextResponse.json({
        success: true,
        demoMode: true,
        message: `Admin access granted to ${userEmail} (Demo Mode).`,
        purchase: {
          user_email: userEmail,
          item_slug: itemSlug,
          item_title: itemTitle,
          item_type: itemType,
          amount,
          payment_method: paymentMethod,
          transaction_id: transactionId,
          status: "active",
        },
      });
    }

    const admin = createAdminSupabaseClient();
    const { data, error } = await admin
      .from("purchases")
      .insert({
        user_email: userEmail,
        item_slug: itemSlug,
        item_title: itemTitle,
        item_type: itemType,
        amount,
        payment_method: paymentMethod,
        transaction_id: transactionId,
        status: "active",
      })
      .select()
      .single();

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 400 });
    }

    return NextResponse.json({
      success: true,
      message: `Access to "${itemTitle}" granted to ${userEmail} successfully.`,
      purchase: data,
    });
  } catch (err: unknown) {
    const errorMessage = err instanceof Error ? err.message : "Internal Server Error";
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}

// PATCH: Update purchase status (e.g. active <-> refunded <-> expired)
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
      return NextResponse.json({ error: "Purchase ID is required." }, { status: 400 });
    }

    const validation = validatePurchaseStatusUpdate(rawStatus);
    if (!validation.valid || !validation.status) {
      return NextResponse.json({ error: validation.error }, { status: 400 });
    }

    if (!isSupabaseServerConfigured()) {
      return NextResponse.json({
        success: true,
        demoMode: true,
        message: `Purchase status updated to ${validation.status} in demo mode.`,
        id,
        status: validation.status,
      });
    }

    const admin = createAdminSupabaseClient();
    const { data, error } = await admin
      .from("purchases")
      .update({ status: validation.status })
      .eq("id", id)
      .select()
      .single();

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 400 });
    }

    return NextResponse.json({
      success: true,
      message: `Purchase status updated to ${validation.status}.`,
      purchase: data,
    });
  } catch (err: unknown) {
    const errorMessage = err instanceof Error ? err.message : "Internal Server Error";
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}
