import { NextResponse } from "next/server";
import { verifyAdminAuth } from "@/lib/adminAuth";
import {
  createAdminSupabaseClient,
  isSupabaseServerConfigured,
} from "@/lib/supabase/server";

export async function GET(request: Request) {
  const auth = await verifyAdminAuth(request);
  if (!auth.authorized) {
    return NextResponse.json({ error: "Unauthorized access to Admin Stats." }, { status: 401 });
  }

  if (!isSupabaseServerConfigured()) {
    // Return mock demo stats for local preview
    return NextResponse.json({
      configured: false,
      stats: {
        totalInquiries: 14,
        newInquiries: 5,
        totalPurchases: 28,
        estimatedRevenue: "₹24,800 INR",
        totalUsers: 42,
        activeRoadmaps: 1,
        systemStatus: "Demo Sandbox Mode",
        serverValidationActive: true,
      },
    });
  }

  try {
    const admin = createAdminSupabaseClient();

    // 1. Inquiries counts
    const { data: inquiries, error: inqErr } = await admin
      .from("inquiries")
      .select("id, status, service_type");

    // 2. Purchases count
    const { data: purchases, error: purErr } = await admin
      .from("purchases")
      .select("id, amount, status, item_type");

    // 3. Profiles / users count
    const { count: usersCount, error: userErr } = await admin
      .from("profiles")
      .select("*", { count: "exact", head: true });

    if (inqErr || purErr || userErr) {
      const err = inqErr?.message || purErr?.message || userErr?.message;
      return NextResponse.json({ error: err }, { status: 400 });
    }

    const totalInquiries = inquiries?.length || 0;
    const newInquiries = inquiries?.filter((i) => i.status === "new").length || 0;
    const totalPurchases = purchases?.length || 0;
    const activePurchases = purchases?.filter((p) => p.status === "active").length || 0;

    // Approximate revenue calculation
    let calculatedRupees = 0;
    purchases?.forEach((p) => {
      const amtStr = p.amount || "";
      const numMatch = amtStr.match(/\d+/);
      if (numMatch) {
        calculatedRupees += parseInt(numMatch[0], 10);
      }
    });

    return NextResponse.json({
      configured: true,
      stats: {
        totalInquiries,
        newInquiries,
        totalPurchases,
        activePurchases,
        estimatedRevenue: `₹${calculatedRupees.toLocaleString()} INR`,
        totalUsers: usersCount || 0,
        systemStatus: "Live Supabase Connected",
        serverValidationActive: true,
      },
    });
  } catch (err: unknown) {
    const errorMessage = err instanceof Error ? err.message : "Internal Server Error";
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}
