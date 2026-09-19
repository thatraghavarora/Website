"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  Map,
  Check,
  Zap,
  Sparkles,
  BookOpen,
  CheckCircle2,
  Lock,
  ArrowRight,
  ShieldCheck,
  Star
} from "lucide-react";
import confetti from "canvas-confetti";
import { roadmaps, RoadmapItem } from "@/data/roadmapData";
import DashboardRoadmapViewer from "@/components/DashboardRoadmapViewer";
import CashfreeCheckoutModal from "@/components/CashfreeCheckoutModal";

export default function DashboardRoadmapStandalonePage() {
  const [selectedRoadmap, setSelectedRoadmap] = useState<RoadmapItem | null>(null);
  const [purchasedRoadmapSlugs, setPurchasedRoadmapSlugs] = useState<string[]>([]);
  const [purchasingRoadmap, setPurchasingRoadmap] = useState<RoadmapItem | null>(null);
  const [cashfreeRoadmap, setCashfreeRoadmap] = useState<RoadmapItem | null>(null);

  useEffect(() => {
    // Check localStorage
    const loaded: string[] = [];
    roadmaps.forEach((r) => {
      try {
        if (localStorage.getItem(`roadmap_purchased_${r.slug}`) === "true") {
          loaded.push(r.slug);
        }
      } catch {}
    });
    setPurchasedRoadmapSlugs(loaded);

    // Check API
    fetch("/api/purchases")
      .then((res) => res.json())
      .then((data) => {
        if (data.purchases && Array.isArray(data.purchases)) {
          const apiSlugs = data.purchases
            .filter((p: any) => p.item_type === "roadmap" || !p.item_type)
            .map((p: any) => p.item_slug);
          if (apiSlugs.length > 0) {
            setPurchasedRoadmapSlugs((prev) => Array.from(new Set([...prev, ...apiSlugs])));
          }
        }
      })
      .catch(() => {});
  }, []);

  const handleUnlockSuccess = async () => {
    if (!purchasingRoadmap) return;
    const slug = purchasingRoadmap.slug;
    setPurchasedRoadmapSlugs((prev) => Array.from(new Set([...prev, slug])));
    try {
      localStorage.setItem(`roadmap_purchased_${slug}`, "true");
    } catch {}
    setPurchasingRoadmap(null);
    confetti({ particleCount: 160, spread: 80, origin: { y: 0.6 } });

    try {
      await fetch("/api/purchases", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          itemType: "roadmap",
          itemSlug: slug,
          itemTitle: purchasingRoadmap.title,
          amount: purchasingRoadmap.price,
          paymentMethod: "upi",
        }),
      });
    } catch {}
  };

  return (
    <div className="min-h-screen bg-neutral-100 p-4 sm:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* LMS Portal Breadcrumb / Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link
              href="/dashboard"
              className="p-2.5 rounded-2xl border-2 border-black bg-white hover:bg-neutral-50 text-black transition-colors shadow-brutal-xs flex items-center gap-1.5 text-xs font-black uppercase"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back to Dashboard</span>
            </Link>
            <div className="hidden sm:flex items-center gap-2">
              <span className="text-xs font-bold text-neutral-400">/</span>
              <span className="text-xs font-black uppercase text-purple-700">LMS Portal Roadmaps</span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <span className="px-3 py-1 rounded-xl bg-purple-200 text-purple-900 border-2 border-black font-black text-xs uppercase shadow-brutal-xs">
              Student Study Portal
            </span>
          </div>
        </div>

        {/* Render In-Portal Roadmap Viewer if selected */}
        {selectedRoadmap ? (
          <DashboardRoadmapViewer
            roadmap={selectedRoadmap}
            isPurchased={purchasedRoadmapSlugs.includes(selectedRoadmap.slug)}
            onBack={() => setSelectedRoadmap(null)}
            onRequestBuy={() => setPurchasingRoadmap(selectedRoadmap)}
          />
        ) : (
          /* Roadmaps Listing inside LMS */
          <div className="space-y-6">
            <div className="rounded-3xl border-[3.5px] border-black bg-white p-6 sm:p-8 shadow-brutal">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-10 h-10 rounded-2xl bg-amber-300 border-2 border-black flex items-center justify-center shadow-brutal-xs">
                  <Map className="w-5 h-5 text-black stroke-[2.5]" />
                </div>
                <div>
                  <h1 className="text-2xl font-black text-black font-display uppercase">
                    Cyber Security &amp; Pentesting Roadmaps
                  </h1>
                  <p className="text-xs font-bold text-neutral-600">
                    Structured learning pathways designed specifically for the LMS Portal without external redirects.
                  </p>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {roadmaps.map((r) => {
                const isPurchased = purchasedRoadmapSlugs.includes(r.slug);

                return (
                  <div
                    key={r.slug}
                    className="rounded-3xl border-[3px] border-black bg-white p-6 shadow-brutal flex flex-col justify-between hover:border-purple-600 transition-all"
                  >
                    <div>
                      <div className="flex items-center justify-between gap-2 mb-3">
                        <span className="px-2.5 py-0.5 rounded-full border border-black bg-purple-100 text-purple-900 text-[10px] font-black uppercase">
                          {r.category}
                        </span>
                        {isPurchased ? (
                          <span className="px-2.5 py-0.5 rounded-full border border-black bg-emerald-300 text-black text-[10px] font-black uppercase flex items-center gap-1 shadow-brutal-xs">
                            <Check className="w-3 h-3" /> Unlocked &amp; Active
                          </span>
                        ) : (
                          <span className="px-2.5 py-0.5 rounded-full border border-black bg-yellow-200 text-black text-[10px] font-black uppercase">
                            {r.badge || "Featured"}
                          </span>
                        )}
                      </div>

                      <h3 className="text-lg font-black text-black font-display uppercase tracking-tight mb-2">
                        {r.title}
                      </h3>
                      <p className="text-xs font-semibold text-neutral-600 mb-4 leading-relaxed line-clamp-2">
                        {r.description}
                      </p>

                      <div className="flex items-center justify-between text-xs font-bold text-neutral-600 mb-4">
                        <span className="flex items-center gap-1 font-mono">
                          <Map className="w-3.5 h-3.5" />
                          {r.modulesCount} Master Phases
                        </span>
                        <span className="flex items-center gap-1">
                          <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                          {r.rating} ({r.reviewsCount} reviews)
                        </span>
                      </div>
                    </div>

                    <div className="pt-4 border-t-2 border-neutral-100 flex items-center gap-2">
                      <button
                        onClick={() => setSelectedRoadmap(r)}
                        className="btn-brutal btn-brutal-primary flex-1 py-2.5 px-4 text-xs font-black uppercase flex items-center justify-center gap-1.5"
                      >
                        <span>Open In-Portal Roadmap</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>

                      {!isPurchased && (
                        <button
                          onClick={() => setCashfreeRoadmap(r)}
                          className="btn-brutal btn-brutal-yellow py-2.5 px-3 text-xs font-black uppercase whitespace-nowrap flex items-center gap-1 cursor-pointer"
                          title="Pay securely with Cashfree"
                        >
                          <Zap className="w-3.5 h-3.5 fill-current text-black" />
                          <span>Buy ({r.price})</span>
                        </button>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* In-Portal Purchase Modal */}
        {purchasingRoadmap && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            style={{ backgroundColor: "rgba(0,0,0,0.78)" }}
          >
            <div className="w-full max-w-md rounded-3xl border-[3.5px] border-black bg-white p-6 sm:p-7 shadow-brutal-xl relative max-h-[92vh] overflow-y-auto">
              <button
                onClick={() => setPurchasingRoadmap(null)}
                className="absolute top-4 right-4 w-8 h-8 rounded-full border-2 border-black flex items-center justify-center hover:bg-neutral-100 font-black text-sm cursor-pointer"
              >
                ✕
              </button>

              <div className="flex items-center gap-2.5 mb-1.5">
                <Zap className="w-6 h-6 text-yellow-500 fill-yellow-400" />
                <h3 className="text-xl font-black font-display text-black uppercase">
                  Unlock In-Portal Access
                </h3>
              </div>
              <p className="text-xs font-bold text-neutral-600 mb-4">{purchasingRoadmap.title}</p>

              {/* Cashfree Quick Checkout */}
              <div className="p-4 rounded-2xl border-2 border-black bg-gradient-to-r from-amber-200 to-yellow-300 mb-4 shadow-brutal-xs space-y-2">
                <div className="flex items-center justify-between">
                  <span className="px-2 py-0.5 rounded-full bg-black text-white text-[9px] font-black uppercase">
                    Auto-Unlock Recommended
                  </span>
                  <span className="text-[10px] font-mono font-bold text-neutral-800">Cashfree PG</span>
                </div>
                <div className="text-2xl font-black text-black font-display leading-none">
                  {purchasingRoadmap.price}
                </div>
                <p className="text-[10px] font-bold text-neutral-800">
                  Instant activation via UPI, PhonePe, GPay, Cards &amp; Netbanking.
                </p>
                <button
                  type="button"
                  onClick={() => {
                    const r = purchasingRoadmap;
                    setPurchasingRoadmap(null);
                    setCashfreeRoadmap(r);
                  }}
                  className="w-full py-2.5 rounded-xl border-2 border-black bg-black text-white hover:bg-neutral-800 text-xs font-black uppercase tracking-wider flex items-center justify-center gap-1.5 transition-all shadow-brutal-xs cursor-pointer"
                >
                  <Zap className="w-3.5 h-3.5 text-yellow-400 fill-yellow-400" />
                  <span>Pay with Cashfree Gateway</span>
                </button>
              </div>

              <div className="space-y-3 mb-4 text-xs font-bold">
                <div className="p-3 rounded-xl border-2 border-black bg-neutral-50">
                  <p className="font-black text-black">Option 2: Direct UPI (India)</p>
                  <p className="font-mono text-purple-700 font-black">connect@thatraghavarora.in</p>
                </div>
              </div>

              <button
                onClick={handleUnlockSuccess}
                className="btn-brutal btn-brutal-primary w-full py-3 text-xs uppercase font-black tracking-wider flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <Check className="w-4 h-4" />
                <span>Confirm &amp; Unlock In LMS Portal</span>
              </button>
            </div>
          </div>
        )}

        {/* Cashfree Checkout Modal */}
        {cashfreeRoadmap && (
          <CashfreeCheckoutModal
            isOpen={Boolean(cashfreeRoadmap)}
            onClose={() => setCashfreeRoadmap(null)}
            itemSlug={cashfreeRoadmap.slug}
            itemTitle={cashfreeRoadmap.title}
            amount={cashfreeRoadmap.price}
            onSuccess={() => {
              const slug = cashfreeRoadmap.slug;
              setPurchasedRoadmapSlugs((prev) => Array.from(new Set([...prev, slug])));
              try {
                localStorage.setItem(`roadmap_purchased_${slug}`, "true");
              } catch {}
              setCashfreeRoadmap(null);
              setPurchasingRoadmap(null);
              confetti({ particleCount: 160, spread: 80, origin: { y: 0.6 } });
            }}
          />
        )}
      </div>
    </div>
  );
}
