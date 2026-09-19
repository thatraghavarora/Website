import { cookies } from "next/headers";
import {
  createServerSupabaseClient,
  createAdminSupabaseClient,
  isSupabaseServerConfigured,
} from "./supabase/server";

export const ADMIN_COOKIE_NAME = "raghav_admin_session";
export const DEFAULT_ADMIN_SECRET = process.env.ADMIN_SECRET_KEY || "raghav@admin2026";

/**
 * Validates whether the incoming request is authorized as an admin.
 * Checks:
 * 1. Admin cookie / Bearer token matching ADMIN_SECRET_KEY
 * 2. Or Supabase session with user role === 'admin'
 */
export async function verifyAdminAuth(request?: Request): Promise<{
  authorized: boolean;
  adminIdentifier?: string;
  method?: "token" | "supabase_role" | "master_key";
  error?: string;
}> {
  // 1. Check Authorization Header if request is provided
  if (request) {
    const authHeader = request.headers.get("authorization");
    if (authHeader && authHeader.startsWith("Bearer ")) {
      const token = authHeader.replace("Bearer ", "").trim();
      if (token === DEFAULT_ADMIN_SECRET) {
        return {
          authorized: true,
          adminIdentifier: "raghavarora_master",
          method: "master_key",
        };
      }
    }
  }

  // 2. Check Cookie
  try {
    const cookieStore = await cookies();
    const adminCookie = cookieStore.get(ADMIN_COOKIE_NAME)?.value;
    if (adminCookie && adminCookie === DEFAULT_ADMIN_SECRET) {
      return {
        authorized: true,
        adminIdentifier: "raghavarora_session",
        method: "token",
      };
    }
  } catch {
    // Ignore cookie read failures in edge contexts
  }

  // 3. Check Supabase User Session Role if Supabase is configured
  if (isSupabaseServerConfigured()) {
    try {
      const supabase = await createServerSupabaseClient();
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (user?.id) {
        const adminDb = createAdminSupabaseClient();
        const { data: profile } = await adminDb
          .from("profiles")
          .select("role, email")
          .eq("id", user.id)
          .single();

        if (profile && profile.role === "admin") {
          return {
            authorized: true,
            adminIdentifier: profile.email || user.email || user.id,
            method: "supabase_role",
          };
        }
      }
    } catch {
      // Supabase verification error
    }
  }

  return {
    authorized: false,
    error: "Unauthorized: Admin privileges or valid admin secret required.",
  };
}
