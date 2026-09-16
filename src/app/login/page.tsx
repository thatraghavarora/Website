"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Lock, Mail, ArrowRight, ShieldCheck } from "lucide-react";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    router.push("/dashboard");
  };

  return (
    <div className="min-h-screen py-16 bg-yellow-50 flex items-center justify-center px-4">
      <div className="w-full max-w-md rounded-3xl border-[3.5px] border-black bg-white p-8 sm:p-10 shadow-brutal-xl">
        <div className="text-center mb-8">
          <div className="w-14 h-14 rounded-2xl bg-purple-200 border-2 border-black flex items-center justify-center mx-auto mb-3 shadow-brutal-sm">
            <ShieldCheck className="w-8 h-8 text-black" />
          </div>
          <h1 className="text-3xl font-black text-black font-display tracking-tight">
            Student Login
          </h1>
          <p className="text-xs font-bold text-neutral-600 mt-1">
            Access your courses, certificates &amp; lab exercises
          </p>
        </div>

        <form onSubmit={handleLogin} className="space-y-5">
          <div>
            <label className="block font-black text-xs uppercase tracking-wider text-black mb-2">
              Email Address
            </label>
            <div className="relative">
              <input
                type="email"
                required
                placeholder="student@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-10 pr-4 py-3 rounded-xl border-2 border-black bg-neutral-50 shadow-brutal-sm font-bold text-sm focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-blue-600"
              />
              <Mail className="w-4 h-4 text-neutral-500 absolute left-3.5 top-3.5" />
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="block font-black text-xs uppercase tracking-wider text-black">
                Password
              </label>
              <a href="#" className="text-xs font-bold text-blue-600 hover:underline">
                Forgot?
              </a>
            </div>
            <div className="relative">
              <input
                type="password"
                required
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-10 pr-4 py-3 rounded-xl border-2 border-black bg-neutral-50 shadow-brutal-sm font-bold text-sm focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-blue-600"
              />
              <Lock className="w-4 h-4 text-neutral-500 absolute left-3.5 top-3.5" />
            </div>
          </div>

          <button
            type="submit"
            className="btn-brutal btn-brutal-primary w-full py-3.5 text-sm uppercase tracking-wider font-black"
          >
            <span>Sign In to Dashboard</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        <div className="mt-8 pt-6 border-t-2 border-neutral-200 text-center">
          <p className="text-xs font-bold text-neutral-600">
            Don&apos;t have an account yet?{" "}
            <Link href="/signup" className="text-blue-600 font-black hover:underline">
              Create Account
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
