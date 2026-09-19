import { supabase } from "@/lib/supabase/client";

/**
 * Universal logout helper:
 * 1. Signs out client-side Supabase session
 * 2. Calls server-side /api/auth logout to invalidate cookies
 * 3. Clears all browser storage (localStorage & sessionStorage)
 * 4. Hard redirects to /login
 */
export async function logoutUser() {
  try {
    await supabase.auth.signOut();
  } catch (err) {
    console.error("Client signOut error:", err);
  }

  try {
    await fetch("/api/auth", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ action: "logout" }),
    });
  } catch (err) {
    console.error("Server signOut error:", err);
  }

  try {
    localStorage.clear();
    sessionStorage.clear();
  } catch {}

  window.location.href = "/login";
}
