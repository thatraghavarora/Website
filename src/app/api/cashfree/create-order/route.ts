import { NextResponse } from "next/server";
import { createCashfreeOrder } from "@/lib/cashfree";
import {
  createAdminSupabaseClient,
  isSupabaseServerConfigured,
} from "@/lib/supabase/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const {
      itemSlug = "web-pentesting-cyber-security",
      itemTitle = "Web Penetration Testing & Bug Bounty Roadmap",
      amount = 99,
      customerEmail = "student@thatraghavarora.in",
      customerName = "Student",
      customerPhone = "9876543210",
    } = body;

    const numericAmount = typeof amount === "number"
      ? amount
      : parseFloat(String(amount).replace(/[^0-9.]/g, "")) || 99;

    const cleanEmail = String(customerEmail).trim().toLowerCase() || "student@thatraghavarora.in";
    const cleanName = String(customerName).trim() || "Student";
    const orderId = `cf_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`;
    const customerId = `cust_${cleanEmail.replace(/[^a-zA-Z0-9]/g, "_").slice(0, 30)}`;

    // Create Cashfree Order
    const origin = request.headers.get("origin") || "http://localhost:3000";
    const returnUrl = `${origin}/roadmap/${itemSlug}?cf_order_id=${orderId}`;

    const cfResult = await createCashfreeOrder({
      orderId,
      orderAmount: numericAmount,
      orderCurrency: "INR",
      customerId,
      customerName: cleanName,
      customerEmail: cleanEmail,
      customerPhone,
      orderNote: `Enrollment for ${itemTitle.slice(0, 80)}`,
      returnUrl,
    });

    // Record pending purchase in Supabase
    if (isSupabaseServerConfigured()) {
      try {
        const admin = createAdminSupabaseClient();
        await admin.from("purchases").insert({
          user_email: cleanEmail,
          item_slug: itemSlug,
          item_title: itemTitle,
          item_type: "roadmap",
          amount: `₹${numericAmount}`,
          payment_method: "cashfree",
          transaction_id: orderId,
          status: "pending",
          verification_status: "pending_verification",
          enrolled_at: new Date().toISOString(),
        });
      } catch (dbErr) {
        console.warn("Could not write pending purchase to Supabase:", dbErr);
      }
    }

    return NextResponse.json({
      success: true,
      orderId,
      paymentSessionId: cfResult.paymentSessionId,
      mode: cfResult.mode,
      isDemo: cfResult.isDemo,
      amount: numericAmount,
      itemSlug,
      itemTitle,
      customerEmail: cleanEmail,
    });
  } catch (err: unknown) {
    const errorMsg = err instanceof Error ? err.message : "Internal Server Error";
    console.error("Cashfree create order route error:", errorMsg);
    return NextResponse.json({ success: false, error: errorMsg }, { status: 500 });
  }
}
