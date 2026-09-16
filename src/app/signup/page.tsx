"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Lock, Mail, User, ArrowRight, Sparkles } from "lucide-react";

export default function SignupPage() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [interest, setInterest] = useState("Cyber Security / Ethical Hacking");

  const handleSignup = (e: React.FormEvent) => {
    e.preventDefault();
    router.push("/dashboard");
  };

  return (
    <div className="min-h-screen py-16 bg-purple-50 flex items-center justify-center px-4">
      <div className="w-full max-w-md rounded-3xl border-[3.5px] border-black bg-white p-8 sm:p-10 shadow-brutal-xl">
        <div className="text-center mb-8">
          <div className="w-14 h-14 rounded-2xl bg-yellow-300 border-2 border-black flex items-center justify-center mx-auto mb-3 shadow-brutal-sm">
            <Sparkles className="w-7 h-7 text-black" />
          </div>
          <h1 className="text-3xl font-black text-black font-display tracking-tight">
            Create Account
          </h1>
          <p className="text-xs font-bold text-neutral-600 mt-1">
            Join 1,000+ students leveling up their security &amp; coding skills
          </p>
        </div>

        <form onSubmit={handleSignup} className="space-y-4">
          <div>
            <label className="block font-black text-xs uppercase tracking-wider text-black mb-1.5">
              Full Name
            </label>
            <div className="relative">
              <input
                type="text"
                required
                placeholder="Aman Verma"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 rounded-xl border-2 border-black bg-neutral-50 shadow-brutal-sm font-bold text-sm focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-blue-600"
              />
              <User className="w-4 h-4 text-neutral-500 absolute left-3.5 top-3" />
            </div>
          </div>

          <div>
            <label className="block font-black text-xs uppercase tracking-wider text-black mb-1.5">
              Email Address
            </label>
            <div className="relative">
              <input
                type="email"
                required
                placeholder="aman@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 rounded-xl border-2 border-black bg-neutral-50 shadow-brutal-sm font-bold text-sm focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-blue-600"
              />
              <Mail className="w-4 h-4 text-neutral-500 absolute left-3.5 top-3" />
            </div>
          </div>

          <div>
            <label className="block font-black text-xs uppercase tracking-wider text-black mb-1.5">
              Password
            </label>
            <div className="relative">
              <input
                type="password"
                required
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 rounded-xl border-2 border-black bg-neutral-50 shadow-brutal-sm font-bold text-sm focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-blue-600"
              />
              <Lock className="w-4 h-4 text-neutral-500 absolute left-3.5 top-3" />
            </div>
          </div>

          <div>
            <label className="block font-black text-xs uppercase tracking-wider text-black mb-1.5">
              Primary Learning Goal
            </label>
            <select
              value={interest}
              onChange={(e) => setInterest(e.target.value)}
              className="w-full px-3 py-2.5 rounded-xl border-2 border-black bg-neutral-50 shadow-brutal-sm font-bold text-xs sm:text-sm focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-blue-600"
            >
              <option>Cyber Security / Ethical Hacking</option>
              <option>Bug Bounty Hunting</option>
              <option>Full Stack Web Development</option>
              <option>Linux &amp; Python Scripting</option>
            </select>
          </div>

          <button
            type="submit"
            className="btn-brutal btn-brutal-yellow w-full py-3.5 text-sm uppercase tracking-wider font-black mt-2"
          >
            <span>Start Learning Today</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        <div className="mt-6 pt-5 border-t-2 border-neutral-200 text-center">
          <p className="text-xs font-bold text-neutral-600">
            Already have an account?{" "}
            <Link href="/login" className="text-blue-600 font-black hover:underline">
              Sign In
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
