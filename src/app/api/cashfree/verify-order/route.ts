import { NextResponse } from "next/server";
import { getCashfreeOrder } from "@/lib/cashfree";
import {
  createAdminSupabaseClient,
  isSupabaseServerConfigured,
} from "@/lib/supabase/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { order_id, itemSlug = "web-pentesting-cyber-security", customerEmail } = body;

    if (!order_id) {
      return NextResponse.json(
        { success: false, error: "order_id is required" },
        { status: 400 }
      );
    }

    // Verify status with Cashfree
    const verification = await getCashfreeOrder(order_id);

    if (!verification.isPaid) {
      return NextResponse.json({
        success: false,
        verified: false,
        status: verification.orderStatus || "PENDING",
        message: "Order is not paid yet.",
      });
    }

    // Order is paid! Update database
    if (isSupabaseServerConfigured()) {
      try {
        const admin = createAdminSupabaseClient();

        // 1. Update purchase status to active & verified
        const { error: purchaseErr } = await admin
          .from("purchases")
          .update({
            status: "active",
            verification_status: "verified",
            verified_at: new Date().toISOString(),
          })
          .eq("transaction_id", order_id);

        if (purchaseErr) {
          console.warn("Could not update purchase in Supabase:", purchaseErr);
        }

        // 2. Ensure user_progress row is initialized if customerEmail is present
        if (customerEmail) {
          const cleanEmail = String(customerEmail).toLowerCase().trim();
          const { data: existingProgress } = await admin
            .from("user_progress")
            .select("id")
            .eq("user_email", cleanEmail)
            .eq("item_slug", itemSlug)
            .maybeSingle();

          if (!existingProgress) {
            await admin.from("user_progress").insert({
              user_email: cleanEmail,
              item_slug: itemSlug,
              item_title: "Web Penetration Testing & Bug Bounty Roadmap",
              item_type: "roadmap",
              progress_percent: 0,
              completed_count: 0,
              total_count: 7,
              checklist_data: [],
              status: "in_progress",
              enrolled_at: new Date().toISOString(),
              last_activity: new Date().toISOString(),
            });
          }
        }
      } catch (dbErr) {
        console.warn("DB verification update exception:", dbErr);
      }
    }

    return NextResponse.json({
      success: true,
      verified: true,
      order_id,
      message: "Payment successfully verified and roadmap unlocked!",
    });
  } catch (err: unknown) {
    const errorMsg = err instanceof Error ? err.message : "Internal Server Error";
    console.error("Cashfree verify order error:", errorMsg);
    return NextResponse.json({ success: false, error: errorMsg }, { status: 500 });
  }
}
