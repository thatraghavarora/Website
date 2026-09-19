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
  // 1. Clear browser storage immediately
  try {
    localStorage.clear();
    sessionStorage.clear();
  } catch {}

  // 2. Clear all document cookies immediately
  try {
    if (typeof document !== "undefined") {
      document.cookie.split(";").forEach((cookie) => {
        const eqPos = cookie.indexOf("=");
        const name = eqPos > -1 ? cookie.substr(0, eqPos).trim() : cookie.trim();
        document.cookie = `${name}=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/;`;
        document.cookie = `${name}=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/;domain=${window.location.hostname};`;
      });
    }
  } catch {}

  // 3. Client Supabase signOut (local scope so it never hangs)
  try {
    supabase.auth.signOut({ scope: "local" }).catch(() => {});
  } catch {}

  // 4. Server-side session invalidation in background
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

  // 5. Immediate hard redirect so UI updates immediately
  if (typeof window !== "undefined") {
    window.location.href = redirectTo;
  }
}

export async function logoutAdmin() {
  await logoutUser("/admin");
}
