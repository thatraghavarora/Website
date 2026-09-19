import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import {
  ADMIN_COOKIE_NAME,
  DEFAULT_ADMIN_SECRET,
  verifyAdminAuth,
} from "@/lib/adminAuth";
import { sanitizeString } from "@/lib/validations";

export async function GET(request: Request) {
  const auth = await verifyAdminAuth(request);
  return NextResponse.json({
    authenticated: auth.authorized,
    adminIdentifier: auth.adminIdentifier || null,
    method: auth.method || null,
  });
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const secretKey = sanitizeString(body?.secretKey, 200);

    if (!secretKey) {
      return NextResponse.json(
        { success: false, error: "Admin secret key is required." },
        { status: 400 }
      );
    }

    if (secretKey !== DEFAULT_ADMIN_SECRET) {
      return NextResponse.json(
        { success: false, error: "Invalid Admin Secret Key. Access Denied." },
        { status: 401 }
      );
    }

    const cookieStore = await cookies();
    cookieStore.set({
      name: ADMIN_COOKIE_NAME,
      value: DEFAULT_ADMIN_SECRET,
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 60 * 60 * 24 * 7, // 7 days
      path: "/",
    });

    return NextResponse.json({
      success: true,
      message: "Admin authentication successful!",
      adminIdentifier: "raghavarora_master",
      token: DEFAULT_ADMIN_SECRET,
    });
  } catch (err: unknown) {
    const errorMessage = err instanceof Error ? err.message : "Internal Server Error";
    return NextResponse.json({ success: false, error: errorMessage }, { status: 500 });
  }
}

export async function DELETE() {
  try {
    const cookieStore = await cookies();
    cookieStore.set({
      name: ADMIN_COOKIE_NAME,
      value: "",
      maxAge: 0,
      path: "/",
    });

    return NextResponse.json({
      success: true,
      message: "Logged out from Admin successfully.",
    });
  } catch (err: unknown) {
    const errorMessage = err instanceof Error ? err.message : "Internal Server Error";
    return NextResponse.json({ success: false, error: errorMessage }, { status: 500 });
  }
}
