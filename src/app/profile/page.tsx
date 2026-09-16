"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  User,
  Shield,
  Key,
  Bell,
  CheckCircle,
  Save,
  Lock,
  ArrowRight
} from "lucide-react";

export default function ProfilePage() {
  const [saved, setSaved] = useState(false);
  const [name, setName] = useState("Aman Verma");
  const [email, setEmail] = useState("aman.verma@example.com");
  const [handle, setHandle] = useState("@aman_sec");
  const [twoFactor, setTwoFactor] = useState(true);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <div className="py-12 bg-neutral-50 min-h-screen">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <div className="inline-block px-3 py-0.5 rounded-full border border-black bg-purple-200 text-xs font-black uppercase text-purple-900 mb-2">
            ACCOUNT SETTINGS
          </div>
          <h1 className="text-3xl sm:text-4xl font-black text-black font-display">
            Student Profile &amp; Security
          </h1>
        </div>

        <div className="rounded-3xl border-[3.5px] border-black bg-white p-8 sm:p-10 shadow-brutal-xl">
          <form onSubmit={handleSave} className="space-y-8">
            {/* Avatar Row */}
            <div className="flex items-center gap-6 pb-6 border-b-2 border-neutral-200">
              <div className="relative w-20 h-20 rounded-full overflow-hidden border-[3px] border-black shadow-brutal-sm">
                <Image
                  src="/images/hero-hacker.jpg"
                  alt="Avatar"
                  fill
                  className="object-cover"
                />
              </div>
              <div>
                <h2 className="font-display font-black text-lg text-black">{name}</h2>
                <p className="text-xs font-bold text-neutral-500">{email}</p>
                <span className="inline-block mt-2 px-2.5 py-0.5 rounded-full border border-black bg-emerald-100 text-emerald-800 text-[11px] font-black uppercase">
                  Verified Student
                </span>
              </div>
            </div>

            {/* Profile fields */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <label className="block font-black text-xs uppercase tracking-wider text-black mb-2">
                  Display Name
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border-2 border-black bg-neutral-50 font-bold text-sm"
                />
              </div>

              <div>
                <label className="block font-black text-xs uppercase tracking-wider text-black mb-2">
                  Email
                </label>
                <input
                  type="email"
                  value={email}
                  disabled
                  className="w-full px-4 py-2.5 rounded-xl border-2 border-black bg-neutral-200 text-neutral-500 font-bold text-sm cursor-not-allowed"
                />
              </div>

              <div>
                <label className="block font-black text-xs uppercase tracking-wider text-black mb-2">
                  Hacker Handle / Username
                </label>
                <input
                  type="text"
                  value={handle}
                  onChange={(e) => setHandle(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border-2 border-black bg-neutral-50 font-bold text-sm"
                />
              </div>

              <div>
                <label className="block font-black text-xs uppercase tracking-wider text-black mb-2">
                  Timezone
                </label>
                <select className="w-full px-4 py-2.5 rounded-xl border-2 border-black bg-neutral-50 font-bold text-sm">
                  <option>Asia/Kolkata (IST +5:30)</option>
                  <option>UTC</option>
                  <option>America/New_York (EST)</option>
                </select>
              </div>
            </div>

            {/* Security Section */}
            <div className="pt-6 border-t-2 border-neutral-200">
              <h2 className="text-xl font-black text-black font-display mb-4 flex items-center gap-2">
                <Shield className="w-5 h-5 text-blue-600" />
                <span>Security &amp; 2FA</span>
              </h2>

              <div className="flex items-center justify-between p-4 rounded-2xl border-2 border-black bg-yellow-50">
                <div>
                  <p className="font-bold text-sm text-black">
                    Two-Factor Authentication (2FA)
                  </p>
                  <p className="text-xs text-neutral-600">
                    Secure your account with an Authenticator App (TOTP).
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => setTwoFactor(!twoFactor)}
                  className={`px-4 py-1.5 rounded-full border-2 border-black font-black text-xs transition-colors ${
                    twoFactor ? "bg-emerald-400 text-black" : "bg-neutral-200 text-neutral-700"
                  }`}
                >
                  {twoFactor ? "Enabled" : "Disabled"}
                </button>
              </div>
            </div>

            {/* Save Button */}
            <div className="flex items-center justify-between pt-6 border-t-2 border-neutral-200">
              {saved ? (
                <span className="text-emerald-700 font-bold text-sm flex items-center gap-1.5">
                  <CheckCircle className="w-4 h-4" /> Changes saved successfully!
                </span>
              ) : (
                <span />
              )}
              <button
                type="submit"
                className="btn-brutal btn-brutal-primary px-7 py-3 text-xs uppercase tracking-wider font-black"
              >
                <span>Save Changes</span>
                <Save className="w-4 h-4" />
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
