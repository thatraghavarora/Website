import { supabase } from "@/lib/supabase/client";

/**
 * Universal logout helper:
 * 1. Synchronously clears localStorage & sessionStorage
 * 2. Synchronously expires all cookies on document.cookie
 * 3. Signs out client-side Supabase session (local scope to avoid hanging)
 * 4. Calls server-side /api/auth and /api/admin/auth in parallel
 * 5. Hard redirects to target path (default /login)
 */
export async function logoutUser(redirectTo: string = "/login") {
  try {
    // 1. Clear browser storage immediately
    try {
      if (typeof window !== "undefined") {
        window.localStorage.clear();
        window.sessionStorage.clear();
      }
    } catch {}

    // 2. Clear all document cookies immediately across all domains & paths
    try {
      if (typeof document !== "undefined" && typeof window !== "undefined") {
        const hostname = window.location.hostname;
        const rootDomain = hostname.replace(/^www\./, "");
        const domains = ["", hostname, `.${hostname}`, `.${rootDomain}`];
        const knownCookies = [
          "sb-access-token",
          "sb-refresh-token",
          "sb-auth-token",
          "supabase-auth-token",
          "auth_token",
          "session",
          "admin_session",
          "demo_user"
        ];

        // Gather all existing cookie names
        const existingCookies = document.cookie
          .split(";")
          .map((c) => {
            const eqPos = c.indexOf("=");
            return eqPos > -1 ? c.substring(0, eqPos).trim() : c.trim();
          })
          .filter(Boolean);

        const allToClear = Array.from(new Set([...existingCookies, ...knownCookies]));

        allToClear.forEach((name) => {
          domains.forEach((dom) => {
            const domainStr = dom ? `; domain=${dom}` : "";
            document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/${domainStr}; SameSite=Lax`;
          });
        });
      }
    } catch {}

    // 3. Client Supabase signOut (local scope so it never hangs)
    try {
      if (supabase && supabase.auth && typeof supabase.auth.signOut === "function") {
        supabase.auth.signOut({ scope: "local" }).catch(() => {});
      }
    } catch {}

    // 4. Server-side session invalidation in background (never await so UI never blocks)
    try {
      fetch("/api/auth", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "logout" }),
      }).catch(() => {});
    } catch {}

    try {
      fetch("/api/admin/auth", {
        method: "DELETE",
      }).catch(() => {});
    } catch {}
  } finally {
    // 5. Guaranteed immediate hard redirect
    if (typeof window !== "undefined") {
      try {
        window.location.replace(redirectTo);
      } catch {
        window.location.href = redirectTo;
      }
    }
  }
}

export async function logoutAdmin() {
  await logoutUser("/admin");
}
