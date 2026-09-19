import { NextResponse } from "next/server";
import {
  createAdminSupabaseClient,
  isSupabaseServerConfigured,
} from "@/lib/supabase/server";

export async function POST(request: Request) {
  try {
    const payload = await request.json();

    // Cashfree PG v3 Webhook structure:
    // { data: { order: { order_id: "...", order_status: "PAID", ... }, payment: { ... } }, type: "PAYMENT_SUCCESS_WEBHOOK" | "ORDER_PAID" }
    const eventType = payload.type || payload.event;
    const orderData = payload.data?.order || payload.order || payload.data;
    const orderId = orderData?.order_id || payload.order_id;
    const orderStatus = orderData?.order_status || payload.order_status;

    if (!orderId) {
      return NextResponse.json({ success: true, message: "No order ID in webhook payload" });
    }

    const isPaid =
      orderStatus === "PAID" ||
      eventType === "PAYMENT_SUCCESS_WEBHOOK" ||
      eventType === "ORDER_PAID";

    if (isPaid && isSupabaseServerConfigured()) {
      const admin = createAdminSupabaseClient();
      await admin
        .from("purchases")
        .update({
          status: "active",
          verification_status: "verified",
          verified_at: new Date().toISOString(),
        })
        .eq("transaction_id", orderId);
    }

    return NextResponse.json({ success: true, received: true });
  } catch (err: unknown) {
    console.error("Cashfree webhook processing error:", err);
    // Always return 200 to Cashfree webhook so it does not retry infinitely
    return NextResponse.json({ success: true, warning: "Webhook logged with warnings" });
  }
}
