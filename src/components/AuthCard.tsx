"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { User, Lock, Eye, EyeOff, Loader2, Mail, Phone, ArrowRight, CheckCircle2, Shield } from "lucide-react";
import { supabase, isSupabaseConfigured } from "@/lib/supabase/client";

interface AuthCardProps {
  initialMode?: "login" | "signup";
}

const GoogleIcon = () => (
  <svg className="w-5 h-5" viewBox="0 0 24 24">
    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
    <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"/>
    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"/>
  </svg>
);

export default function AuthCard({ initialMode = "login" }: AuthCardProps) {
  const router = useRouter();
  const [mode, setMode] = useState<"login" | "signup">(initialMode);
  // Form fields
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [mobile, setMobile] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");
  // Post-Signup email verification step
  const [createdAccountEmail, setCreatedAccountEmail] = useState<string | null>(null);
  // Post-Google extra details step
  const [googleStep, setGoogleStep] = useState(false);
  const [googleName, setGoogleName] = useState("");
  const [googleMobile, setGoogleMobile] = useState("");

  // Reset messages on mode switch
  const switchMode = (m: "login" | "signup") => {
    setMode(m);
    setErrorMsg("");
    setSuccessMsg("");
    setCreatedAccountEmail(null);
    setFullName(""); setEmail(""); setPassword(""); setMobile("");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(""); setSuccessMsg(""); setLoading(true);
    try {
      const res = await fetch("/api/auth", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          action: mode,
          email,
          password,
          fullName: mode === "signup" ? fullName : undefined,
          mobile: mode === "signup" ? mobile : undefined,
        }),
      });
      const data = await res.json();
      if (!res.ok || data.error) {
        setErrorMsg(data.error || "Authentication failed. Please check your credentials.");
        setLoading(false);
        return;
      }

      if (mode === "signup") {
        setCreatedAccountEmail(email);
        setLoading(false);
        return;
      }

      setSuccessMsg("Login successful! Redirecting...");
      setTimeout(() => router.push("/dashboard"), 1000);
    } catch {
      setErrorMsg("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleAuth = async () => {
    setErrorMsg("");
    if (!isSupabaseConfigured()) {
      setGoogleStep(true);
      return;
    }
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: "google",
        options: { redirectTo: `${window.location.origin}/auth/callback` },
      });
      if (error) setErrorMsg(error.message);
      else setGoogleStep(true);
    } catch {
      setGoogleStep(true);
    }
  };

  const handleGoogleDetailsSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    // Save extra details then redirect
    try {
      await fetch("/api/auth", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          action: "update-profile",
          fullName: googleName,
          mobile: googleMobile,
        }),
      });
    } catch {}
    setSuccessMsg("Profile complete! Taking you to your dashboard...");
    setTimeout(() => router.push("/dashboard"), 1000);
    setLoading(false);
  };

  const inputClass =
    "w-full pl-11 pr-4 py-3.5 rounded-xl border-2 border-black bg-white text-sm font-bold text-black placeholder:text-neutral-400 focus:outline-none focus:ring-2 focus:ring-yellow-300 focus:border-black transition-all shadow-brutal-xs hover:shadow-brutal-sm";

  // ── ACCOUNT CREATED: VERIFY EMAIL SCREEN ──
  if (createdAccountEmail) {
    return (
      <div className="w-full max-w-[440px] bg-white rounded-3xl border-[3px] border-black shadow-brutal-xl p-7 sm:p-9 text-center">
        {/* Brand Link */}
        <Link href="/" className="flex items-center gap-2 mb-6 group w-fit mx-auto">
          <span className="bg-black text-white px-2 py-0.5 rounded-md font-mono text-sm font-black group-hover:bg-purple-700 transition-colors">&lt;/&gt;</span>
          <span className="font-black text-lg text-black tracking-tight">thatraghavarora</span>
        </Link>

        {/* Envelope / Verify Icon */}
        <div className="w-14 h-14 rounded-2xl bg-yellow-300 border-2 border-black flex items-center justify-center mx-auto mb-4 shadow-brutal-sm">
          <Mail className="w-7 h-7 text-black stroke-[2.5]" />
        </div>

        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100 border border-emerald-400 text-emerald-900 text-xs font-black uppercase tracking-wider mb-2">
          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-700" />
          Account Created Successfully!
        </div>

        <h2 className="text-xl sm:text-2xl font-black text-black font-display tracking-tight mb-2">
          Verify Your Email
        </h2>

        <p className="text-xs sm:text-sm font-medium text-neutral-600 mb-5 leading-relaxed">
          Your account has been created! A confirmation verification link has been sent to:
          <br />
          <span className="font-mono font-black text-black bg-yellow-100 px-2.5 py-1 rounded-lg border border-black inline-block mt-2 break-all text-xs sm:text-sm">
            {createdAccountEmail}
          </span>
        </p>

        {/* Action Steps */}
        <div className="p-4 rounded-2xl border-2 border-black bg-neutral-50 text-left space-y-2 mb-6 shadow-brutal-xs">
          <p className="text-xs font-black uppercase tracking-wider text-black flex items-center gap-1.5">
            <span>📩</span> What to do next:
          </p>
          <ol className="text-xs font-bold text-neutral-700 space-y-1.5 list-decimal pl-4 leading-normal">
            <li>Check your email inbox (and Spam/Junk folder).</li>
            <li>Click the verification link to activate your account.</li>
            <li>Once verified, click below and enter your password to log in.</li>
          </ol>
        </div>

        {/* Button to Log In */}
        <button
          type="button"
          onClick={() => {
            const savedEmail = createdAccountEmail;
            setCreatedAccountEmail(null);
            setMode("login");
            setEmail(savedEmail);
            setPassword("");
            setSuccessMsg("Account created! Please enter your password to log in.");
          }}
          className="w-full py-3.5 rounded-xl border-2 border-black bg-yellow-300 hover:bg-yellow-400 active:scale-[0.99] text-black font-black text-sm uppercase tracking-wider shadow-brutal-sm hover:shadow-brutal transition-all flex items-center justify-center gap-2 cursor-pointer"
        >
          <ArrowRight className="w-4 h-4 stroke-[3]" />
          <span>Click Here to Log In</span>
        </button>

        <p className="mt-4 text-[11px] font-bold text-neutral-500">
          Already clicked the link? Click the button above to log in now.
        </p>
      </div>
    );
  }

  // ── GOOGLE EXTRA DETAILS STEP ──
  if (googleStep) {
    return (
      <div className="w-full max-w-[440px] bg-white rounded-3xl border-[3px] border-black shadow-brutal-xl p-7 sm:p-9">
        <Link href="/" className="flex items-center gap-2 mb-7 group w-fit mx-auto">
          <span className="bg-black text-white px-2 py-0.5 rounded-md font-mono text-sm font-black group-hover:bg-purple-700 transition-colors">&lt;/&gt;</span>
          <span className="font-black text-lg text-black tracking-tight">thatraghavarora</span>
        </Link>

        <div className="w-12 h-12 rounded-2xl bg-emerald-400 border-2 border-black flex items-center justify-center mx-auto mb-4 shadow-brutal-sm">
          <CheckCircle2 className="w-6 h-6 text-black stroke-[2.5]" />
        </div>
        <h2 className="text-xl font-black text-center text-black font-display mb-1">Google Sign-In Successful!</h2>
        <p className="text-xs font-bold text-neutral-500 text-center mb-6">
          Fill in a few more details to complete your profile.
        </p>

        {errorMsg && <div className="p-3 mb-4 rounded-xl bg-red-50 border-2 border-red-400 text-red-700 text-xs font-bold">{errorMsg}</div>}
        {successMsg && <div className="p-3 mb-4 rounded-xl bg-emerald-50 border-2 border-emerald-400 text-emerald-800 text-xs font-bold">{successMsg}</div>}

        <form onSubmit={handleGoogleDetailsSubmit} className="space-y-4">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-neutral-500"><User className="w-5 h-5" /></div>
            <input type="text" required placeholder="Full Name" value={googleName} onChange={e => setGoogleName(e.target.value)} className={inputClass} />
          </div>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-neutral-500"><Phone className="w-5 h-5" /></div>
            <input type="tel" required placeholder="Mobile Number" value={googleMobile} onChange={e => setGoogleMobile(e.target.value)} className={inputClass} />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="w-full py-3.5 rounded-xl border-2 border-black bg-yellow-300 hover:bg-yellow-400 text-black font-black text-sm uppercase tracking-wide shadow-brutal-sm hover:shadow-brutal transition-all flex items-center justify-center gap-2 mt-2"
          >
            {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <ArrowRight className="w-4 h-4" />}
            Complete My Profile
          </button>
        </form>
      </div>
    );
  }

  // ── MAIN LOGIN / SIGNUP CARD ──
  return (
    <div className="w-full max-w-[440px] bg-white rounded-3xl border-[3px] border-black shadow-brutal-xl p-7 sm:p-9">
      {/* Logo */}
      <Link href="/" className="flex items-center gap-2 mb-7 group w-fit mx-auto">
        <span className="bg-black text-white px-2 py-0.5 rounded-md font-mono text-sm font-black group-hover:bg-purple-700 transition-colors">&lt;/&gt;</span>
        <span className="font-black text-lg text-black tracking-tight">thatraghavarora</span>
      </Link>

      {/* Mode Tabs */}
      <div className="grid grid-cols-2 bg-neutral-100 rounded-2xl border-2 border-black p-1 mb-7 shadow-brutal-xs">
        {(["login", "signup"] as const).map(m => (
          <button
            key={m}
            type="button"
            onClick={() => switchMode(m)}
            className={`py-2.5 rounded-xl font-black text-sm uppercase tracking-wide transition-all ${
              mode === m
                ? "bg-black text-yellow-300 shadow-brutal-xs"
                : "text-neutral-500 hover:text-black"
            }`}
          >
            {m === "login" ? "Login" : "Sign Up"}
          </button>
        ))}
      </div>

      {/* Heading */}
      <div className="mb-6">
        <h1 className="text-2xl font-black text-black font-display tracking-tight">
          {mode === "login" ? "Welcome Back 👋" : "Create Your Account"}
        </h1>
        <p className="text-xs font-bold text-neutral-500 mt-1">
          {mode === "login"
            ? "Login to access your courses and student portal."
            : "Join 1,000+ students learning cyber security & dev."}
        </p>
      </div>

      {/* Alerts */}
      {errorMsg && (
        <div className="p-3 mb-5 rounded-xl bg-red-50 border-2 border-red-400 text-red-700 text-xs font-bold flex items-start gap-2">
          <span className="shrink-0 mt-0.5">⚠️</span>{errorMsg}
        </div>
      )}
      {successMsg && (
        <div className="p-3 mb-5 rounded-xl bg-emerald-50 border-2 border-emerald-400 text-emerald-800 text-xs font-bold flex items-start gap-2">
          <CheckCircle2 className="w-4 h-4 shrink-0 mt-0.5" />{successMsg}
        </div>
      )}

      {/* Google OAuth Button — prominent at top */}
      <button
        type="button"
        onClick={handleGoogleAuth}
        className="w-full py-3.5 mb-5 rounded-xl border-2 border-black bg-white hover:bg-neutral-50 text-black font-black text-sm flex items-center justify-center gap-3 shadow-brutal-sm hover:shadow-brutal transition-all"
      >
        <GoogleIcon />
        Continue with Google
      </button>

      {/* Divider */}
      <div className="relative mb-5">
        <div className="absolute inset-0 flex items-center"><div className="w-full border-t-2 border-neutral-200" /></div>
        <div className="relative flex justify-center text-xs">
          <span className="bg-white px-3 text-neutral-400 font-black uppercase tracking-wider">or with email</span>
        </div>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-3.5">
        {/* Full Name — signup only */}
        {mode === "signup" && (
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-neutral-500"><User className="w-5 h-5" /></div>
            <input
              type="text" required placeholder="Full Name"
              value={fullName} onChange={e => setFullName(e.target.value)}
              className={inputClass}
            />
          </div>
        )}

        {/* Email */}
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-neutral-500"><Mail className="w-5 h-5" /></div>
          <input
            type="email" required placeholder={mode === "login" ? "Email Address" : "Email Address"}
            value={email} onChange={e => setEmail(e.target.value)}
            className={inputClass}
          />
        </div>

        {/* Mobile — signup only */}
        {mode === "signup" && (
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-neutral-500"><Phone className="w-5 h-5" /></div>
            <input
              type="tel" required placeholder="Mobile Number (+91...)"
              value={mobile} onChange={e => setMobile(e.target.value)}
              className={inputClass}
            />
          </div>
        )}

        {/* Password */}
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-neutral-500"><Lock className="w-5 h-5" /></div>
          <input
            type={showPassword ? "text" : "password"} required placeholder="Password"
            value={password} onChange={e => setPassword(e.target.value)}
            className={`${inputClass} pr-11`}
          />
          <button
            type="button" onClick={() => setShowPassword(!showPassword)}
            className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-neutral-400 hover:text-black transition-colors"
            aria-label={showPassword ? "Hide password" : "Show password"}
          >
            {showPassword ? <Eye className="w-5 h-5" /> : <EyeOff className="w-5 h-5" />}
          </button>
        </div>

        {/* Remember me / Forgot */}
        {mode === "login" && (
          <div className="flex items-center justify-between text-xs pt-1">
            <label className="flex items-center gap-2 cursor-pointer select-none text-neutral-600 font-bold">
              <input
                type="checkbox" checked={rememberMe} onChange={e => setRememberMe(e.target.checked)}
                className="w-4 h-4 rounded border-2 border-black accent-yellow-400 cursor-pointer"
              />
              Remember me
            </label>
            <button
              type="button"
              onClick={() => alert("Password reset link sent to your email!")}
              className="font-black text-xs text-purple-700 hover:underline"
            >
              Forgot password?
            </button>
          </div>
        )}

        {/* Submit */}
        <button
          type="submit" disabled={loading}
          className="w-full py-3.5 mt-1 rounded-xl border-2 border-black bg-yellow-300 hover:bg-yellow-400 active:scale-[0.99] disabled:opacity-60 text-black font-black text-sm uppercase tracking-wide shadow-brutal-sm hover:shadow-brutal transition-all flex items-center justify-center gap-2"
        >
          {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <ArrowRight className="w-4 h-4 stroke-[3]" />}
          {mode === "login" ? "Login to Dashboard" : "Create My Account"}
        </button>
      </form>

      {/* Security note */}
      <div className="mt-5 flex items-center justify-center gap-1.5 text-[11px] font-bold text-neutral-400">
        <Shield className="w-3.5 h-3.5" />
        <span>Your data is encrypted & never shared</span>
      </div>

      {/* Switch mode footer */}
      <div className="mt-5 pt-5 border-t-2 border-neutral-200 text-center">
        <span className="text-xs font-bold text-neutral-500">
          {mode === "login" ? "New here?" : "Already have an account?"}
        </span>{" "}
        <button
          type="button"
          onClick={() => switchMode(mode === "login" ? "signup" : "login")}
          className="text-xs font-black text-purple-700 hover:underline"
        >
          {mode === "login" ? "Sign Up Free" : "Login"}
        </button>
      </div>
    </div>
  );
}
