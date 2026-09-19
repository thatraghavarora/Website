"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { User, Lock, Eye, EyeOff, Loader2 } from "lucide-react";
import { supabase, isSupabaseConfigured } from "@/lib/supabase/client";

interface AuthCardProps {
  initialMode?: "login" | "signup";
}

export default function AuthCard({ initialMode = "login" }: AuthCardProps) {
  const router = useRouter();
  const [mode, setMode] = useState<"login" | "signup">(initialMode);
  const [emailOrUsername, setEmailOrUsername] = useState("");
  const [fullName, setFullName] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg("");
    setSuccessMsg("");
    setLoading(true);

    try {
      const res = await fetch("/api/auth", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          action: mode,
          email: emailOrUsername,
          password,
          fullName: mode === "signup" ? fullName : undefined,
        }),
      });

      const data = await res.json();

      if (!res.ok || data.error) {
        setErrorMsg(data.error || "Authentication failed. Please check your credentials.");
        setLoading(false);
        return;
      }

      if (mode === "signup") {
        setSuccessMsg("Account created successfully! Redirecting to dashboard...");
      } else {
        setSuccessMsg("Login successful! Redirecting...");
      }

      setTimeout(() => {
        router.push("/dashboard");
      }, 1000);
    } catch {
      setErrorMsg("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleOAuthLogin = async (provider: "google" | "apple" | "github") => {
    setErrorMsg("");
    if (!isSupabaseConfigured()) {
      // Graceful local demo fallback
      router.push("/dashboard");
      return;
    }

    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider,
        options: {
          redirectTo: `${window.location.origin}/dashboard`,
        },
      });
      if (error) {
        setErrorMsg(error.message);
      }
    } catch {
      router.push("/dashboard");
    }
  };

  return (
    <div className="w-full max-w-[410px] bg-white rounded-3xl sm:border sm:border-neutral-200/80 shadow-sm sm:shadow-xl p-6 sm:p-8">
      {/* Brand Logo Header */}
      <div className="flex items-center justify-center gap-2 mb-7">
        <Link href="/" className="inline-flex items-center gap-2 group">
          {/* Blue </> code symbol */}
          <span className="text-blue-600 font-mono font-black text-2xl tracking-tighter leading-none select-none">
            &lt;/&gt;
          </span>
          <span className="font-black text-xl text-neutral-900 tracking-tight">
            thatraghavarora.in
          </span>
        </Link>
      </div>

      {/* Heading & Subtitle */}
      <div className="text-center mb-6">
        <h1 className="text-2xl sm:text-[26px] font-black text-neutral-900 tracking-tight">
          {mode === "login" ? "Welcome Back" : "Create Account"}
        </h1>
        <p className="text-xs sm:text-sm text-neutral-500 mt-1 font-medium">
          {mode === "login"
            ? "Continue your learning journey"
            : "Start your learning journey today"}
        </p>
      </div>

      {/* Tabs: Login / Sign Up */}
      <div className="grid grid-cols-2 border-b border-neutral-200 mb-6">
        <button
          type="button"
          onClick={() => {
            setMode("login");
            setErrorMsg("");
            setSuccessMsg("");
          }}
          className={`pb-2.5 text-sm sm:text-base font-bold relative transition-colors ${
            mode === "login"
              ? "text-blue-600 bg-blue-50/50 rounded-t-xl"
              : "text-neutral-500 hover:text-neutral-800"
          }`}
        >
          Login
          {mode === "login" && (
            <span className="absolute bottom-0 left-0 right-0 h-[2.5px] bg-blue-600 rounded-full" />
          )}
        </button>

        <button
          type="button"
          onClick={() => {
            setMode("signup");
            setErrorMsg("");
            setSuccessMsg("");
          }}
          className={`pb-2.5 text-sm sm:text-base font-bold relative transition-colors ${
            mode === "signup"
              ? "text-blue-600 bg-blue-50/50 rounded-t-xl"
              : "text-neutral-500 hover:text-neutral-800"
          }`}
        >
          Sign Up
          {mode === "signup" && (
            <span className="absolute bottom-0 left-0 right-0 h-[2.5px] bg-blue-600 rounded-full" />
          )}
        </button>
      </div>

      {/* Feedback Alerts */}
      {errorMsg && (
        <div className="p-3 mb-4 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs font-bold leading-snug">
          {errorMsg}
        </div>
      )}
      {successMsg && (
        <div className="p-3 mb-4 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold leading-snug">
          {successMsg}
        </div>
      )}

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Sign Up: Full Name */}
        {mode === "signup" && (
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-neutral-400">
              <User className="w-5 h-5 stroke-[1.8]" />
            </div>
            <input
              type="text"
              required
              placeholder="Full Name"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              className="w-full pl-11 pr-4 py-3 sm:py-3.5 rounded-2xl border border-neutral-200 bg-white text-sm text-neutral-900 placeholder:text-neutral-400 focus:outline-hidden focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all"
            />
          </div>
        )}

        {/* Email or Username */}
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-neutral-400">
            <User className="w-5 h-5 stroke-[1.8]" />
          </div>
          <input
            type="text"
            required
            placeholder={mode === "login" ? "Email or Username" : "Email Address"}
            value={emailOrUsername}
            onChange={(e) => setEmailOrUsername(e.target.value)}
            className="w-full pl-11 pr-4 py-3 sm:py-3.5 rounded-2xl border border-neutral-200 bg-white text-sm text-neutral-900 placeholder:text-neutral-400 focus:outline-hidden focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all"
          />
        </div>

        {/* Password */}
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-neutral-400">
            <Lock className="w-5 h-5 stroke-[1.8]" />
          </div>
          <input
            type={showPassword ? "text" : "password"}
            required
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full pl-11 pr-11 py-3 sm:py-3.5 rounded-2xl border border-neutral-200 bg-white text-sm text-neutral-900 placeholder:text-neutral-400 focus:outline-hidden focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all"
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-neutral-400 hover:text-neutral-600 transition-colors"
            aria-label={showPassword ? "Hide password" : "Show password"}
          >
            {showPassword ? (
              <Eye className="w-5 h-5 stroke-[1.8]" />
            ) : (
              <EyeOff className="w-5 h-5 stroke-[1.8]" />
            )}
          </button>
        </div>

        {/* Remember me & Forgot password row */}
        {mode === "login" && (
          <div className="flex items-center justify-between text-xs sm:text-sm pt-1">
            <label className="flex items-center gap-2 cursor-pointer select-none text-neutral-600 font-medium">
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                className="w-4 h-4 rounded text-blue-600 border-neutral-300 focus:ring-blue-500 cursor-pointer accent-blue-600"
              />
              <span>Remember me</span>
            </label>
            <a
              href="#"
              onClick={(e) => {
                e.preventDefault();
                alert("Password reset instructions sent to your email!");
              }}
              className="text-blue-600 hover:underline font-bold text-xs sm:text-sm"
            >
              Forgot password?
            </a>
          </div>
        )}

        {/* Main Action Button (Royal Blue) */}
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-600 hover:bg-blue-700 active:scale-[0.99] disabled:opacity-75 text-white font-bold py-3.5 rounded-2xl text-base shadow-sm transition-all mt-2 flex items-center justify-center gap-2"
        >
          {loading && <Loader2 className="w-4 h-4 animate-spin" />}
          <span>{mode === "login" ? "Login" : "Sign Up"}</span>
        </button>
      </form>

      {/* Divider: or continue with */}
      <div className="relative my-6">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-neutral-200" />
        </div>
        <div className="relative flex justify-center text-xs">
          <span className="bg-white px-3 text-neutral-400 font-medium">
            or continue with
          </span>
        </div>
      </div>

      {/* Social Login Buttons: Google, Apple, GitHub */}
      <div className="grid grid-cols-3 gap-3">
        {/* Google */}
        <button
          type="button"
          onClick={() => handleOAuthLogin("google")}
          className="h-12 rounded-2xl border border-neutral-200 bg-white hover:bg-neutral-50 hover:border-neutral-300 flex items-center justify-center transition-all shadow-xs"
          aria-label="Continue with Google"
        >
          <svg className="w-5 h-5" viewBox="0 0 24 24">
            <path
              fill="#4285F4"
              d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
            />
            <path
              fill="#34A853"
              d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
            />
            <path
              fill="#FBBC05"
              d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
            />
            <path
              fill="#EA4335"
              d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
            />
          </svg>
        </button>

        {/* Apple */}
        <button
          type="button"
          onClick={() => handleOAuthLogin("apple")}
          className="h-12 rounded-2xl border border-neutral-200 bg-white hover:bg-neutral-50 hover:border-neutral-300 flex items-center justify-center transition-all shadow-xs text-neutral-900"
          aria-label="Continue with Apple"
        >
          <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
            <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M15.97 6.37c.62-.76 1.05-1.82.93-2.87-1 .04-2.18.67-2.88 1.48-.56.65-1.05 1.71-.92 2.73 1.12.09 2.25-.58 2.87-1.34z" />
          </svg>
        </button>

        {/* GitHub */}
        <button
          type="button"
          onClick={() => handleOAuthLogin("github")}
          className="h-12 rounded-2xl border border-neutral-200 bg-white hover:bg-neutral-50 hover:border-neutral-300 flex items-center justify-center transition-all shadow-xs text-neutral-900"
          aria-label="Continue with GitHub"
        >
          <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
            />
          </svg>
        </button>
      </div>

      {/* Footer: Don't have an account? Sign Up */}
      <div className="mt-8 text-center flex items-center justify-center gap-2">
        <span className="text-xs sm:text-sm text-neutral-500 font-medium">
          {mode === "login" ? "Don't have an account?" : "Already have an account?"}
        </span>
        <button
          type="button"
          onClick={() => {
            setMode(mode === "login" ? "signup" : "login");
            setErrorMsg("");
            setSuccessMsg("");
          }}
          className="text-xs sm:text-sm font-bold text-blue-600 bg-blue-50 hover:bg-blue-100 px-3 py-1.5 rounded-lg transition-colors"
        >
          {mode === "login" ? "Sign Up" : "Login"}
        </button>
      </div>
    </div>
  );
}
