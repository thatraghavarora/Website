"use client";

import React, { useState, useEffect } from "react";
import {
  ShieldCheck,
  Zap,
  Lock,
  CheckCircle2,
  AlertCircle,
  CreditCard,
  Smartphone,
  Building2,
  RefreshCw,
  ExternalLink,
  Check
} from "lucide-react";
import confetti from "canvas-confetti";

declare global {
  interface Window {
    Cashfree?: (config: { mode: "sandbox" | "production" }) => {
      checkout: (options: {
        paymentSessionId: string;
        redirectTarget?: "_modal" | "_self" | "_blank";
      }) => Promise<{
        error?: { message: string };
        redirect?: boolean;
        paymentDetails?: unknown;
      }>;
    };
  }
}

interface CashfreeCheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  itemSlug: string;
  itemTitle: string;
  amount: number | string;
  defaultEmail?: string;
  onSuccess: (details: { orderId: string; email: string }) => void;
}

export default function CashfreeCheckoutModal({
  isOpen,
  onClose,
  itemSlug,
  itemTitle,
  amount,
  defaultEmail = "",
  onSuccess,
}: CashfreeCheckoutModalProps) {
  const [email, setEmail] = useState(defaultEmail);
  const [phone, setPhone] = useState("9876543210");
  const [fullName, setFullName] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [sdkReady, setSdkReady] = useState(false);

  // Simulator state if using Cashfree Sandbox / Demo
  const [simulatorData, setSimulatorData] = useState<{
    orderId: string;
    paymentSessionId: string;
    amount: number;
    email: string;
  } | null>(null);
  const [simulatingPayment, setSimulatingPayment] = useState(false);

  const numericAmount = typeof amount === "number"
    ? amount
    : parseFloat(String(amount).replace(/[^0-9.]/g, "")) || 99;

  // Load Cashfree JS SDK v3
  useEffect(() => {
    if (typeof window === "undefined") return;

    if (window.Cashfree) {
      setSdkReady(true);
      return;
    }

    const script = document.createElement("script");
    script.src = "https://sdk.cashfree.com/js/v3/cashfree.js";
    script.async = true;
    script.onload = () => setSdkReady(true);
    script.onerror = () => console.warn("Cashfree SDK script failed to load, falling back to simulator");
    document.body.appendChild(script);

    return () => {
      // Keep script cached
    };
  }, []);

  useEffect(() => {
    if (defaultEmail && !email) {
      setEmail(defaultEmail);
    }
  }, [defaultEmail, email]);

  if (!isOpen) return null;

  const handleInitiatePayment = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg("");

    const targetEmail = email.trim() || "student@thatraghavarora.in";
    if (!targetEmail.includes("@")) {
      setErrorMsg("Please provide a valid email address.");
      return;
    }

    setLoading(true);

    try {
      // 1. Create order on backend
      const res = await fetch("/api/cashfree/create-order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          itemSlug,
          itemTitle,
          amount: numericAmount,
          customerEmail: targetEmail,
          customerName: fullName.trim() || targetEmail.split("@")[0],
          customerPhone: phone.trim() || "9876543210",
        }),
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        throw new Error(data.error || "Could not initialize Cashfree order.");
      }

      // If in Demo / Simulator mode or Cashfree SDK is not available
      if (data.isDemo || !window.Cashfree) {
        setSimulatorData({
          orderId: data.orderId,
          paymentSessionId: data.paymentSessionId,
          amount: data.amount || numericAmount,
          email: targetEmail,
        });
        setLoading(false);
        return;
      }

      // 2. Open Cashfree Official Modal SDK
      const cashfree = window.Cashfree({ mode: data.mode || "sandbox" });
      const checkoutResult = await cashfree.checkout({
        paymentSessionId: data.paymentSessionId,
        redirectTarget: "_modal",
      });

      if (checkoutResult.error) {
        setErrorMsg(checkoutResult.error.message || "Payment cancelled or failed.");
        setLoading(false);
        return;
      }

      // 3. Verify order with backend
      await verifyAndComplete(data.orderId, targetEmail);
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Payment initialization failed.";
      setErrorMsg(msg);
      setLoading(false);
    }
  };

  const verifyAndComplete = async (orderId: string, studentEmail: string) => {
    try {
      const res = await fetch("/api/cashfree/verify-order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          order_id: orderId,
          itemSlug,
          customerEmail: studentEmail,
        }),
      });

      const data = await res.json();
      if (data.success && data.verified) {
        confetti({ particleCount: 160, spread: 80, origin: { y: 0.6 } });
        onSuccess({ orderId, email: studentEmail });
        onClose();
      } else {
        setErrorMsg(data.message || "Order verification pending. If amount was deducted, access will activate shortly.");
      }
    } catch {
      setErrorMsg("Failed to verify transaction. Please contact support.");
    } finally {
      setLoading(false);
      setSimulatingPayment(false);
    }
  };

  const handleSimulatedSuccess = async () => {
    if (!simulatorData) return;
    setSimulatingPayment(true);
    await verifyAndComplete(simulatorData.orderId, simulatorData.email);
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
      onClick={(e) => {
        if (e.target === e.currentTarget && !loading && !simulatingPayment) {
          onClose();
        }
      }}
    >
      <div className="w-full max-w-lg rounded-3xl border-[3.5px] border-black bg-white shadow-brutal-xl overflow-hidden relative animate-in fade-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="bg-black text-white p-6 border-b-[3px] border-black flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-xl bg-amber-400 text-black font-black flex items-center justify-center text-base border-2 border-white shadow-brutal-xs">
              CF
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <h3 className="font-display font-black text-base text-white">Cashfree Gateway</h3>
                <span className="px-2 py-0.2 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 text-[9px] font-mono font-bold">
                  Instant Access
                </span>
              </div>
              <p className="text-[11px] text-neutral-300 font-medium">
                Official Cashfree Payments PG (UPI, Cards, Netbanking)
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            disabled={loading || simulatingPayment}
            className="w-8 h-8 rounded-xl border-2 border-neutral-700 bg-neutral-900 hover:bg-neutral-800 text-white flex items-center justify-center font-black text-xs transition-colors cursor-pointer"
          >
            ✕
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6 sm:p-7 space-y-5">
          {/* Order Summary Pill */}
          <div className="p-4 rounded-2xl border-2 border-black bg-yellow-100 flex items-center justify-between shadow-brutal-xs">
            <div>
              <span className="text-[10px] font-mono font-bold text-neutral-600 uppercase">Item to Unlock</span>
              <h4 className="text-sm font-black text-black truncate max-w-[240px]">{itemTitle}</h4>
            </div>
            <div className="text-right">
              <span className="text-[10px] font-mono font-bold text-neutral-600 uppercase">Total Payable</span>
              <p className="text-2xl font-black text-black font-display leading-none">₹{numericAmount}</p>
            </div>
          </div>

          {errorMsg && (
            <div className="p-3.5 rounded-xl border-2 border-red-500 bg-red-50 text-red-800 text-xs font-bold flex items-start gap-2">
              <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
              <span>{errorMsg}</span>
            </div>
          )}

          {/* SIMULATOR SCREEN (If Cashfree Sandbox Simulator is active) */}
          {simulatorData ? (
            <div className="space-y-4 animate-in fade-in">
              <div className="p-4 rounded-2xl border-2 border-black bg-neutral-900 text-white space-y-3 shadow-brutal-sm">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1.5 text-xs font-black text-amber-400 font-mono">
                    <Zap className="w-4 h-4" />
                    <span>Cashfree Sandbox Simulator</span>
                  </div>
                  <span className="text-[10px] font-mono text-emerald-400 bg-emerald-950 px-2 py-0.5 rounded border border-emerald-700">
                    TEST MODE
                  </span>
                </div>
                <p className="text-xs text-neutral-300">
                  Cashfree PG order created: <code className="font-mono text-amber-300">{simulatorData.orderId}</code>.
                  In production, live credentials in <code className="text-neutral-200">.env</code> render the direct Cashfree modal. In test mode, click below to verify and unlock immediately:
                </p>

                <div className="grid grid-cols-3 gap-2 pt-1 text-center">
                  <div className="p-2 rounded-xl bg-neutral-800 border border-neutral-700 text-[11px] font-bold text-neutral-200">
                    <Smartphone className="w-4 h-4 mx-auto mb-1 text-purple-400" />
                    UPI Apps
                  </div>
                  <div className="p-2 rounded-xl bg-neutral-800 border border-neutral-700 text-[11px] font-bold text-neutral-200">
                    <CreditCard className="w-4 h-4 mx-auto mb-1 text-blue-400" />
                    All Cards
                  </div>
                  <div className="p-2 rounded-xl bg-neutral-800 border border-neutral-700 text-[11px] font-bold text-neutral-200">
                    <Building2 className="w-4 h-4 mx-auto mb-1 text-emerald-400" />
                    Netbanking
                  </div>
                </div>
              </div>

              <div className="space-y-2 pt-2">
                <button
                  type="button"
                  onClick={handleSimulatedSuccess}
                  disabled={simulatingPayment}
                  className="w-full py-3.5 rounded-2xl border-[2.5px] border-black bg-emerald-400 hover:bg-emerald-500 text-black font-black text-xs uppercase tracking-wider transition-all shadow-brutal flex items-center justify-center gap-2 cursor-pointer"
                >
                  {simulatingPayment ? (
                    <>
                      <RefreshCw className="w-4 h-4 animate-spin" />
                      <span>Verifying with Cashfree...</span>
                    </>
                  ) : (
                    <>
                      <Check className="w-4 h-4" />
                      <span>Pay ₹{simulatorData.amount} (Simulate Success)</span>
                    </>
                  )}
                </button>

                <button
                  type="button"
                  onClick={() => setSimulatorData(null)}
                  disabled={simulatingPayment}
                  className="w-full py-2.5 text-xs font-bold text-neutral-600 hover:text-black transition-colors"
                >
                  Back to Customer Details
                </button>
              </div>
            </div>
          ) : (
            /* STANDARD INITIATION FORM */
            <form onSubmit={handleInitiatePayment} className="space-y-4">
              <div>
                <label className="block text-xs font-black uppercase text-black mb-1">
                  Student Email Address <span className="text-red-500">*</span>
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="student@example.com"
                  required
                  className="w-full px-3.5 py-2.5 rounded-xl border-2 border-black bg-neutral-50 font-mono text-xs font-bold focus:bg-white focus:outline-none"
                />
                <p className="text-[10px] text-neutral-500 mt-1 font-bold">
                  Roadmap progress and verification receipt will be associated with this email.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-black uppercase text-black mb-1">
                    Your Name (Optional)
                  </label>
                  <input
                    type="text"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="e.g. Raghav Arora"
                    className="w-full px-3 py-2 rounded-xl border-2 border-black bg-neutral-50 text-xs font-bold focus:bg-white focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-black uppercase text-black mb-1">
                    Phone (For UPI SMS receipt)
                  </label>
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="9876543210"
                    className="w-full px-3 py-2 rounded-xl border-2 border-black bg-neutral-50 font-mono text-xs font-bold focus:bg-white focus:outline-none"
                  />
                </div>
              </div>

              {/* Supported Payment Channels Badge */}
              <div className="p-3 rounded-xl border border-neutral-200 bg-neutral-50 flex items-center justify-between text-[11px] font-bold text-neutral-700">
                <span className="flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-emerald-600" />
                  <span>256-bit Encrypted Cashfree Checkout</span>
                </span>
                <span className="font-mono text-[10px] text-neutral-500">
                  GPay • PhonePe • Cards • Paytm
                </span>
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-3.5 rounded-2xl border-[2.5px] border-black bg-amber-400 hover:bg-amber-300 text-black font-black text-xs uppercase tracking-wider transition-all shadow-brutal flex items-center justify-center gap-2 cursor-pointer"
                >
                  {loading ? (
                    <>
                      <RefreshCw className="w-4 h-4 animate-spin" />
                      <span>Connecting to Cashfree...</span>
                    </>
                  ) : (
                    <>
                      <Lock className="w-3.5 h-3.5" />
                      <span>Proceed to Pay ₹{numericAmount} via Cashfree</span>
                    </>
                  )}
                </button>
              </div>
            </form>
          )}

          {/* Footer Security Badges */}
          <div className="pt-2 border-t border-neutral-200 flex items-center justify-between text-[10px] text-neutral-500 font-bold">
            <span className="flex items-center gap-1">
              <CheckCircle2 className="w-3 h-3 text-emerald-600" />
              Instant Automatic Unlock
            </span>
            <span>PCI-DSS Level 1 Compliant</span>
          </div>
        </div>
      </div>
    </div>
  );
}
