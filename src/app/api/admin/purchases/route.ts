import { NextResponse } from "next/server";
import { verifyAdminAuth } from "@/lib/adminAuth";
import {
  createAdminSupabaseClient,
  isSupabaseServerConfigured,
} from "@/lib/supabase/server";
import {
  validatePurchaseInput,
  validatePurchaseStatusUpdate,
  validateVerificationStatusUpdate,
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
        utr_number: "428910294821",
        verification_status: "verified",
        enrolled_at: new Date(Date.now() - 3600000 * 12).toISOString(),
        verified_at: new Date(Date.now() - 3600000 * 11).toISOString(),
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
        payment_method: "upi",
        transaction_id: "TXN-DEMO-44810",
        utr_number: "428919028472",
        verification_status: "pending_verification",
        enrolled_at: new Date(Date.now() - 3600000 * 3).toISOString(),
        verified_at: null,
        status: "pending",
        created_at: new Date(Date.now() - 3600000 * 3).toISOString(),
      },
      {
        id: "demo-purchase-3",
        user_email: "student.ananya@gmail.com",
        item_slug: "linux-cli-fundamentals",
        item_title: "Linux & CLI for Hackers",
        item_type: "course",
        amount: "₹999",
        payment_method: "upi",
        transaction_id: "TXN-DEMO-77112",
        utr_number: "428801928473",
        verification_status: "verified",
        enrolled_at: new Date(Date.now() - 3600000 * 48).toISOString(),
        verified_at: new Date(Date.now() - 3600000 * 47).toISOString(),
        status: "active",
        created_at: new Date(Date.now() - 3600000 * 48).toISOString(),
      },
    ];

    let filtered = samplePurchases;
    if (statusFilter && statusFilter !== "all") {
      filtered = filtered.filter((p) => p.status === statusFilter || p.verification_status === statusFilter);
    }
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (p) =>
          p.user_email.toLowerCase().includes(q) ||
          p.item_title.toLowerCase().includes(q) ||
          p.transaction_id.toLowerCase().includes(q) ||
          (p.utr_number && p.utr_number.toLowerCase().includes(q))
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
      if (statusFilter === "pending_verification" || statusFilter === "verified") {
        query = query.eq("verification_status", statusFilter);
      } else {
        query = query.eq("status", statusFilter);
      }
    }

    if (searchQuery) {
      const q = sanitizeString(searchQuery, 100);
      query = query.or(`user_email.ilike.%${q}%,item_title.ilike.%${q}%,transaction_id.ilike.%${q}%,utr_number.ilike.%${q}%`);
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

// PATCH: Update purchase status or verify payment UTR
export async function PATCH(request: Request) {
  const auth = await verifyAdminAuth(request);
  if (!auth.authorized) {
    return NextResponse.json({ error: "Unauthorized access." }, { status: 401 });
  }

  try {
    const body = await request.json();
    const id = sanitizeString(body?.id, 100);
    const rawStatus = body?.status;
    const rawVerificationStatus = body?.verificationStatus || body?.verification_status;

    if (!id) {
      return NextResponse.json({ error: "Purchase ID is required." }, { status: 400 });
    }

    const updates: Record<string, unknown> = {};

    if (rawStatus) {
      const validation = validatePurchaseStatusUpdate(rawStatus);
      if (!validation.valid || !validation.status) {
        return NextResponse.json({ error: validation.error }, { status: 400 });
      }
      updates.status = validation.status;
    }

    if (rawVerificationStatus) {
      const vValid = validateVerificationStatusUpdate(rawVerificationStatus);
      if (!vValid.valid || !vValid.status) {
        return NextResponse.json({ error: vValid.error }, { status: 400 });
      }
      updates.verification_status = vValid.status;
      if (vValid.status === "verified") {
        updates.status = "active";
        updates.verified_at = new Date().toISOString();
      }
    }

    if (Object.keys(updates).length === 0) {
      return NextResponse.json({ error: "No valid status or verification updates provided." }, { status: 400 });
    }

    if (!isSupabaseServerConfigured()) {
      return NextResponse.json({
        success: true,
        demoMode: true,
        message: `Purchase updated successfully in demo mode.`,
        id,
        ...updates,
      });
    }

    const admin = createAdminSupabaseClient();
    const { data, error } = await admin
      .from("purchases")
      .update(updates)
      .eq("id", id)
      .select()
      .single();

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 400 });
    }

    return NextResponse.json({
      success: true,
      message: `Purchase updated successfully.`,
      purchase: data,
    });
  } catch (err: unknown) {
    const errorMessage = err instanceof Error ? err.message : "Internal Server Error";
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}
