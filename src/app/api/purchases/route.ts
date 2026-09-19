import { NextResponse } from "next/server";
import {
  createServerSupabaseClient,
  createAdminSupabaseClient,
  isSupabaseServerConfigured,
} from "@/lib/supabase/server";
import { validatePurchaseInput } from "@/lib/validations";

interface LocalDemoPurchase {
  id: string;
  user_email: string;
  item_slug: string;
  item_title: string;
  item_type: string;
  amount: string;
  payment_method: string;
  transaction_id: string;
  status: "active" | "pending" | "expired" | "refunded";
  created_at: string;
}

const localDemoPurchases: LocalDemoPurchase[] = [
  {
    id: "demo-purchase-web-pentest",
    user_email: "guest@thatraghavarora.in",
    item_slug: "web-pentesting-cyber-security",
    item_title: "Web Penetration Testing & Bug Bounty Roadmap",
    item_type: "roadmap",
    amount: "99 RS",
    payment_method: "upi",
    transaction_id: "TXN-DEMO-INIT",
    status: "active",
    created_at: new Date().toISOString(),
  },
];

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const slug = searchParams.get("slug");
  const email = searchParams.get("email");

  if (!isSupabaseServerConfigured()) {
    const matching = localDemoPurchases.filter(
      (p) => (!slug || p.item_slug === slug) && p.status === "active"
    );
    return NextResponse.json({
      configured: false,
      demoMode: true,
      purchases: matching,
      isUnlocked: matching.length > 0,
    });
  }

  try {
    const supabase = await createServerSupabaseClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();

    const targetEmail = user?.email || email;

    if (!targetEmail && !user) {
      return NextResponse.json({
        configured: true,
        purchases: [],
        isUnlocked: false,
      });
    }

    const admin = createAdminSupabaseClient();
    let query = admin
      .from("purchases")
      .select("*")
      .eq("status", "active");

    if (user?.id) {
      query = query.or(`user_id.eq.${user.id},user_email.eq.${targetEmail}`);
    } else if (targetEmail) {
      query = query.eq("user_email", targetEmail);
    }

    if (slug) {
      query = query.eq("item_slug", slug);
    }

    const { data: purchases, error } = await query;

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 400 });
    }

    const isUnlocked = Boolean(purchases && purchases.length > 0);

    return NextResponse.json({
      configured: true,
      purchases: purchases || [],
      isUnlocked,
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
    const validation = validatePurchaseInput(body);
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
      itemType,
      itemSlug,
      itemTitle,
      amount,
      paymentMethod,
      transactionId,
      userEmail,
    } = validation.data;

    if (!isSupabaseServerConfigured()) {
      const demoPurchase: LocalDemoPurchase = {
        id: `demo-purchase-${Date.now()}`,
        user_email: userEmail || "guest@thatraghavarora.in",
        item_slug: itemSlug,
        item_title: itemTitle,
        item_type: itemType,
        amount,
        payment_method: paymentMethod,
        transaction_id: transactionId,
        status: "active",
        created_at: new Date().toISOString(),
      };
      localDemoPurchases.unshift(demoPurchase);

      return NextResponse.json({
        success: true,
        demoMode: true,
        message: "Purchase unlocked locally (Configure Supabase keys in .env.local to persist in database)",
        purchase: demoPurchase,
      });
    }

    const supabase = await createServerSupabaseClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();

    const resolvedEmail = user?.email || userEmail;

    const admin = createAdminSupabaseClient();
    const { data, error } = await admin
      .from("purchases")
      .insert({
        user_id: user?.id || null,
        user_email: resolvedEmail,
        item_type: itemType,
        item_slug: itemSlug,
        item_title: itemTitle,
        amount: amount,
        payment_method: paymentMethod,
        transaction_id: transactionId,
        status: "active",
      })
      .select()
      .single();

    if (error) {
      return NextResponse.json({ success: false, error: error.message }, { status: 400 });
    }

    return NextResponse.json({
      success: true,
      purchase: data,
      message: "Purchase recorded and roadmap unlocked successfully in Supabase!",
    });
  } catch (err: unknown) {
    const errorMessage = err instanceof Error ? err.message : "Internal Server Error";
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}

