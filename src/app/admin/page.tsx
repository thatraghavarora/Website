"use client";

import React, { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import {
  ShieldAlert,
  ShieldCheck,
  Users,
  DollarSign,
  FileText,
  ShoppingBag,
  Search,
  Filter,
  RefreshCw,
  Mail,
  CheckCircle2,
  AlertCircle,
  Lock,
  Unlock,
  LogOut,
  ExternalLink,
  Trash2,
  PlusCircle,
  Check,
  ChevronRight,
  Terminal,
  Activity,
  UserCheck,
  Shield,
  Map,
  BookOpen,
  MessageSquare,
  ThumbsUp,
  Copy,
  Eye,
  Clock,
  Sparkles,
  Menu,
  X
} from "lucide-react";
import AdminRoadmapCurriculum from "@/components/AdminRoadmapCurriculum";

type TabType =
  | "overview"
  | "purchases"
  | "progress"
  | "blogs"
  | "community"
  | "roadmap"
  | "inquiries"
  | "users"
  | "validation";

interface InquiryItem {
  id: string;
  name: string;
  email: string;
  contact_handle?: string | null;
  service_type: string;
  details: string;
  preferred_timeline?: string;
  status: "new" | "contacted" | "scheduled" | "completed" | "archived";
  created_at: string;
}

interface PurchaseItem {
  id: string;
  user_email: string;
  item_slug: string;
  item_title: string;
  item_type: string;
  amount: string;
  payment_method: string;
  transaction_id: string;
  utr_number?: string;
  verification_status?: "verified" | "pending_verification" | "rejected";
  enrolled_at?: string;
  verified_at?: string | null;
  status: "active" | "pending" | "expired" | "refunded";
  created_at: string;
}

interface BlogItem {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  category: string;
  tags?: string[];
  cover_image?: string;
  read_time?: string;
  views_count?: number;
  is_published?: boolean;
  created_at: string;
}

interface CommunityPostItem {
  id: string;
  author: string;
  role?: string;
  category: string;
  title: string;
  content: string;
  likes?: number;
  time?: string;
  created_at?: string;
  comments?: Array<{ id: string; author: string; content: string; time?: string }>;
}

interface ProgressItem {
  id: string;
  user_email: string;
  item_title: string;
  item_type: string;
  item_slug: string;
  progress_percent: number;
  completed_count: number;
  total_count: number;
  enrolled_at: string;
  last_activity: string;
  status: "in_progress" | "completed";
}

interface UserItem {
  id: string;
  email: string;
  full_name?: string;
  role: "student" | "instructor" | "admin";
  created_at: string;
}

interface StatsData {
  totalInquiries: number;
  newInquiries: number;
  totalPurchases: number;
  activePurchases: number;
  estimatedRevenue: string;
  totalUsers: number;
  systemStatus: string;
  serverValidationActive: boolean;
}

export default function AdminPage() {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [authChecking, setAuthChecking] = useState<boolean>(true);
  const [secretKeyInput, setSecretKeyInput] = useState<string>("");
  const [authError, setAuthError] = useState<string>("");
  const [authLoading, setAuthLoading] = useState<boolean>(false);

  // Dashboard Data
  const [activeTab, setActiveTab] = useState<TabType>("overview");
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState<boolean>(false);
  const [stats, setStats] = useState<StatsData | null>(null);
  const [inquiries, setInquiries] = useState<InquiryItem[]>([]);
  const [purchases, setPurchases] = useState<PurchaseItem[]>([]);
  const [users, setUsers] = useState<UserItem[]>([]);
  const [blogs, setBlogs] = useState<BlogItem[]>([]);
  const [communityPosts, setCommunityPosts] = useState<CommunityPostItem[]>([]);
  const [progressList, setProgressList] = useState<ProgressItem[]>([]);
  const [loadingData, setLoadingData] = useState<boolean>(false);
  const [statusMessage, setStatusMessage] = useState<{ text: string; type: "success" | "error" } | null>(null);

  // Filters & Search
  const [inquirySearch, setInquirySearch] = useState("");
  const [inquiryStatusFilter, setInquiryStatusFilter] = useState("all");
  const [purchaseSearch, setPurchaseSearch] = useState("");
  const [purchaseStatusFilter, setPurchaseStatusFilter] = useState("all");
  const [userSearch, setUserSearch] = useState("");

  // Modals & Detail Views
  const [selectedInquiry, setSelectedInquiry] = useState<InquiryItem | null>(null);
  const [showGrantModal, setShowGrantModal] = useState(false);
  const [grantData, setGrantData] = useState({
    userEmail: "",
    itemSlug: "web-pentesting-cyber-security",
    itemTitle: "Web Penetration Testing & Bug Bounty Roadmap",
    itemType: "roadmap",
    amount: "₹0 (Admin Grant)",
    paymentMethod: "admin_grant",
  });
  const [grantSubmitting, setGrantSubmitting] = useState(false);
  const [grantValidationErrors, setGrantValidationErrors] = useState<string[]>([]);

  // Blog Publishing Modal State
  const [showCreateBlogModal, setShowCreateBlogModal] = useState(false);
  const [newBlogData, setNewBlogData] = useState({
    title: "",
    slug: "",
    category: "Cybersecurity",
    excerpt: "",
    content: "",
    tags: "Bug Bounty, Web Security, Tutorial",
    coverImage: "/images/hero-avatar.jpg",
  });
  const [blogSubmitting, setBlogSubmitting] = useState(false);
  const [blogErrors, setBlogErrors] = useState<string[]>([]);

  // Validation Test Playground
  const [testPayload, setTestPayload] = useState({
    name: "T",
    email: "invalid-email-format",
    serviceType: "1:1 Live Guidance",
    details: "Hi",
  });
  const [validationTestResult, setValidationTestResult] = useState<Record<string, unknown> | null>(null);
  const [validationTestLoading, setValidationTestLoading] = useState(false);

  // Check Auth State on Mount
  const checkAuth = useCallback(async () => {
    try {
      setAuthChecking(true);
      const res = await fetch("/api/admin/auth");
      const data = await res.json();
      setIsAuthenticated(Boolean(data.authenticated));
    } catch {
      setIsAuthenticated(false);
    } finally {
      setAuthChecking(false);
    }
  }, []);

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  // Load Data
  const loadDashboardData = useCallback(async () => {
    if (!isAuthenticated) return;
    setLoadingData(true);
    try {
      // 1. Stats
      const statsRes = await fetch("/api/admin/stats");
      if (statsRes.ok) {
        const s = await statsRes.json();
        setStats(s.stats);
      }

      // 2. Inquiries
      const inqRes = await fetch(`/api/admin/inquiries?status=${inquiryStatusFilter}&search=${encodeURIComponent(inquirySearch)}`);
      if (inqRes.ok) {
        const i = await inqRes.json();
        setInquiries(i.inquiries || []);
      }

      // 3. Purchases
      const purRes = await fetch(`/api/admin/purchases?status=${purchaseStatusFilter}&search=${encodeURIComponent(purchaseSearch)}`);
      if (purRes.ok) {
        const p = await purRes.json();
        setPurchases(p.purchases || []);
      }

      // 4. Users
      const userRes = await fetch(`/api/admin/users?search=${encodeURIComponent(userSearch)}`);
      if (userRes.ok) {
        const u = await userRes.json();
        setUsers(u.users || []);
      }

      // 5. Blogs
      const blogRes = await fetch("/api/blogs");
      if (blogRes.ok) {
        const b = await blogRes.json();
        setBlogs(b.blogs || []);
      }

      // 6. Community Posts
      const commRes = await fetch("/api/community");
      if (commRes.ok) {
        const c = await commRes.json();
        setCommunityPosts(c.posts || []);
      }

      // 7. Student Progress
      const progRes = await fetch("/api/admin/progress");
      if (progRes.ok) {
        const pr = await progRes.json();
        setProgressList(pr.progressList || []);
      }
    } catch (err) {
      console.error("Failed to load admin data:", err);
    } finally {
      setLoadingData(false);
    }
  }, [isAuthenticated, inquiryStatusFilter, inquirySearch, purchaseStatusFilter, purchaseSearch, userSearch]);

  useEffect(() => {
    if (isAuthenticated) {
      loadDashboardData();
    }
  }, [isAuthenticated, loadDashboardData]);

  // Login handler
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setAuthError("");
    setAuthLoading(true);

    try {
      const res = await fetch("/api/admin/auth", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ secretKey: secretKeyInput }),
      });

      const data = await res.json();
      if (!res.ok || !data.success) {
        setAuthError(data.error || "Invalid credentials. Server rejected authentication.");
      } else {
        setIsAuthenticated(true);
        setStatusMessage({ text: "Welcome to Command Center, Raghav!", type: "success" });
      }
    } catch {
      setAuthError("Failed to reach authentication server.");
    } finally {
      setAuthLoading(false);
    }
  };

  // Logout handler
  const handleLogout = async () => {
    try {
      await fetch("/api/admin/auth", { method: "DELETE" });
      setIsAuthenticated(false);
      setStats(null);
    } catch {
      setIsAuthenticated(false);
    }
  };

  // Update Inquiry Status (Server-side validated)
  const handleUpdateInquiryStatus = async (id: string, newStatus: string) => {
    try {
      const res = await fetch("/api/admin/inquiries", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, status: newStatus }),
      });
      const data = await res.json();
      if (!res.ok) {
        setStatusMessage({ text: data.error || "Server validation rejected update.", type: "error" });
      } else {
        setStatusMessage({ text: `Lead status updated to '${newStatus}'!`, type: "success" });
        setInquiries((prev) =>
          prev.map((item) => (item.id === id ? { ...item, status: newStatus as InquiryItem["status"] } : item))
        );
      }
    } catch {
      setStatusMessage({ text: "Error sending update request.", type: "error" });
    }
  };

  // Delete Inquiry
  const handleDeleteInquiry = async (id: string) => {
    if (!confirm("Are you sure you want to permanently delete this lead inquiry?")) return;
    try {
      const res = await fetch(`/api/admin/inquiries?id=${id}`, { method: "DELETE" });
      if (res.ok) {
        setInquiries((prev) => prev.filter((i) => i.id !== id));
        if (selectedInquiry?.id === id) setSelectedInquiry(null);
        setStatusMessage({ text: "Inquiry removed successfully.", type: "success" });
      }
    } catch {
      setStatusMessage({ text: "Failed to delete inquiry.", type: "error" });
    }
  };

  // Update Purchase Status
  const handleUpdatePurchaseStatus = async (id: string, newStatus: string) => {
    try {
      const res = await fetch("/api/admin/purchases", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, status: newStatus }),
      });
      const data = await res.json();
      if (!res.ok) {
        setStatusMessage({ text: data.error || "Server rejected purchase update.", type: "error" });
      } else {
        setStatusMessage({ text: `Purchase status changed to '${newStatus}'!`, type: "success" });
        setPurchases((prev) =>
          prev.map((item) => (item.id === id ? { ...item, status: newStatus as PurchaseItem["status"] } : item))
        );
      }
    } catch {
      setStatusMessage({ text: "Error updating purchase status.", type: "error" });
    }
  };

  // Verify Payment UTR
  const handleVerifyUtr = async (id: string) => {
    try {
      const res = await fetch("/api/admin/purchases", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, verificationStatus: "verified" }),
      });
      const data = await res.json();
      if (!res.ok) {
        setStatusMessage({ text: data.error || "Server rejected UTR verification.", type: "error" });
      } else {
        setStatusMessage({ text: "Payment UTR verified & student access activated successfully!", type: "success" });
        setPurchases((prev) =>
          prev.map((item) =>
            item.id === id
              ? {
                  ...item,
                  verification_status: "verified",
                  status: "active",
                  verified_at: new Date().toISOString(),
                }
              : item
          )
        );
      }
    } catch {
      setStatusMessage({ text: "Error sending verification request.", type: "error" });
    }
  };

  // Blog Publishing Handler
  const handleCreateBlogSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setBlogSubmitting(true);
    setBlogErrors([]);

    const slug =
      newBlogData.slug.trim() ||
      newBlogData.title
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/^-|-$/g, "");

    const tagsArray = newBlogData.tags
      .split(",")
      .map((t) => t.trim())
      .filter(Boolean);

    try {
      const res = await fetch("/api/blogs", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: newBlogData.title,
          slug,
          category: newBlogData.category,
          excerpt: newBlogData.excerpt,
          content: newBlogData.content,
          tags: tagsArray,
          coverImage: newBlogData.coverImage,
        }),
      });

      const data = await res.json();
      if (!res.ok || !data.success) {
        setBlogErrors(data.errors || [data.error || "Failed to publish blog."]);
      } else {
        setShowCreateBlogModal(false);
        setStatusMessage({ text: "Blog article published successfully!", type: "success" });
        setNewBlogData({
          title: "",
          slug: "",
          category: "Cybersecurity",
          excerpt: "",
          content: "",
          tags: "Bug Bounty, Web Security, Tutorial",
          coverImage: "/images/hero-avatar.jpg",
        });
        loadDashboardData();
      }
    } catch {
      setBlogErrors(["Failed to reach blog publishing service."]);
    } finally {
      setBlogSubmitting(false);
    }
  };

  // Manual Access Grant (Validated on Server)
  const handleManualGrantSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setGrantSubmitting(true);
    setGrantValidationErrors([]);

    try {
      const res = await fetch("/api/admin/purchases", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(grantData),
      });
      const data = await res.json();

      if (!res.ok) {
        if (data.validationErrors && Array.isArray(data.validationErrors)) {
          setGrantValidationErrors(data.validationErrors);
        } else {
          setGrantValidationErrors([data.error || "Server validation rejected request."]);
        }
      } else {
        setShowGrantModal(false);
        setStatusMessage({
          text: `Successfully granted access to ${grantData.userEmail}!`,
          type: "success",
        });
        setGrantData({
          userEmail: "",
          itemSlug: "web-pentesting-cyber-security",
          itemTitle: "Web Penetration Testing & Bug Bounty Roadmap",
          itemType: "roadmap",
          amount: "₹0 (Admin Grant)",
          paymentMethod: "admin_grant",
        });
        loadDashboardData();
      }
    } catch {
      setGrantValidationErrors(["Failed to reach admin purchases server."]);
    } finally {
      setGrantSubmitting(false);
    }
  };

  // Update User Role
  const handleUpdateUserRole = async (userId: string, newRole: string) => {
    try {
      const res = await fetch("/api/admin/users", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId, role: newRole }),
      });
      const data = await res.json();
      if (!res.ok) {
        setStatusMessage({ text: data.error || "Server validation error.", type: "error" });
      } else {
        setStatusMessage({ text: `User role updated to '${newRole}'!`, type: "success" });
        setUsers((prev) =>
          prev.map((u) => (u.id === userId ? { ...u, role: newRole as UserItem["role"] } : u))
        );
      }
    } catch {
      setStatusMessage({ text: "Failed to update role.", type: "error" });
    }
  };

  // Test Server Validation Sandbox
  const runValidationTest = async () => {
    setValidationTestLoading(true);
    try {
      const res = await fetch("/api/inquiries", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(testPayload),
      });
      const result = await res.json();
      setValidationTestResult({
        httpStatus: res.status,
        statusText: res.statusText,
        body: result,
      });
    } catch (err) {
      setValidationTestResult({ error: String(err) });
    } finally {
      setValidationTestLoading(false);
    }
  };

  // ---------------------------------------------------------------------------
  // AUTH CHECKING LOADER
  // ---------------------------------------------------------------------------
  if (authChecking) {
    return (
      <div className="min-h-screen bg-neutral-900 flex items-center justify-center p-6 text-white">
        <div className="flex items-center gap-3">
          <RefreshCw className="w-6 h-6 animate-spin text-amber-400" />
          <span className="font-mono text-sm font-bold tracking-wider">Verifying Admin Authorization...</span>
        </div>
      </div>
    );
  }

  // ---------------------------------------------------------------------------
  // AUTHENTICATION GATEKEEPER
  // ---------------------------------------------------------------------------
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-neutral-950 py-16 px-4 sm:px-6 flex items-center justify-center relative overflow-hidden">
        {/* Background Grid Accent */}
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#f59e0b_1px,transparent_1px)] [background-size:16px_16px]" />

        <div className="w-full max-w-md relative z-10">
          <div className="rounded-3xl border-[3.5px] border-black bg-white p-8 sm:p-10 shadow-brutal-xl">
            <div className="flex items-center justify-center w-16 h-16 rounded-2xl bg-amber-300 border-[3px] border-black mx-auto mb-6 shadow-brutal-sm">
              <Lock className="w-8 h-8 text-black stroke-[2.5]" />
            </div>

            <div className="text-center mb-8">
              <span className="inline-block px-3 py-0.5 rounded-full border border-black bg-amber-200 text-black text-[11px] font-black uppercase tracking-wider mb-2">
                Restricted Area
              </span>
              <h1 className="text-2xl sm:text-3xl font-black text-black font-display tracking-tight">
                Raghav Arora Admin
              </h1>
              <p className="text-xs sm:text-sm font-bold text-neutral-600 mt-1">
                Enter your secure Admin Secret Key to access the command center.
              </p>
            </div>

            {authError && (
              <div className="mb-6 p-4 rounded-xl border-2 border-red-500 bg-red-50 text-red-700 text-xs font-bold flex items-start gap-2.5">
                <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
                <span>{authError}</span>
              </div>
            )}

            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <label className="block text-xs font-black uppercase tracking-wider text-black mb-1.5">
                  Admin Secret Key
                </label>
                <div className="relative">
                  <input
                    type="password"
                    value={secretKeyInput}
                    onChange={(e) => setSecretKeyInput(e.target.value)}
                    placeholder="Enter admin secret..."
                    className="w-full px-4 py-3 rounded-xl border-[2.5px] border-black bg-neutral-50 text-sm font-mono font-bold focus:bg-white focus:outline-none focus:ring-2 focus:ring-black shadow-brutal-xs"
                    required
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={authLoading}
                className="w-full btn-brutal btn-brutal-primary py-3.5 text-sm uppercase tracking-wider font-black flex items-center justify-center gap-2"
              >
                {authLoading ? (
                  <>
                    <RefreshCw className="w-4 h-4 animate-spin" />
                    <span>Verifying...</span>
                  </>
                ) : (
                  <>
                    <Unlock className="w-4 h-4" />
                    <span>Unlock Admin Console</span>
                  </>
                )}
              </button>
            </form>

            <div className="mt-6 pt-6 border-t-2 border-neutral-200 text-center">
              <div className="mt-4">
                <Link
                  href="/"
                  className="text-xs font-black text-neutral-600 hover:text-black underline"
                >
                  ← Return to Public Website
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // ---------------------------------------------------------------------------
  // AUTHENTICATED ADMIN CONSOLE
  // ---------------------------------------------------------------------------
  const pendingUtrsCount = purchases.filter((p) => p.verification_status === "pending_verification").length;
  const newLeadsCount = inquiries.filter((i) => i.status === "new").length;

  const tabMeta: Record<TabType, { title: string; subtitle: string; icon: React.ComponentType<{ className?: string }> }> = {
    overview: {
      title: "Overview & Metrics",
      subtitle: "System health, live metrics, revenue estimates and platform activity",
      icon: Activity,
    },
    purchases: {
      title: "Purchases & UTR Verification",
      subtitle: "Verify student UPI UTR numbers, grant manual access, and track paid courses",
      icon: ShoppingBag,
    },
    progress: {
      title: "Student Progress & Checklists",
      subtitle: "Monitor enrolled students, module progress percentage, and checklist completion",
      icon: ShieldCheck,
    },
    blogs: {
      title: "Blog & Cybersecurity Articles",
      subtitle: "Create, edit, publish, and delete public blog posts and writeups",
      icon: BookOpen,
    },
    community: {
      title: "Community Discussions",
      subtitle: "Moderate student discussions, community questions, answers and comments",
      icon: MessageSquare,
    },
    roadmap: {
      title: "Paid Roadmap Curriculum",
      subtitle: "Comprehensive 7-phase curriculum from Networking to Certified Pentester",
      icon: Map,
    },
    inquiries: {
      title: "Hire Me Leads & Inquiries",
      subtitle: "Manage client leads, service requests, timelines and client communications",
      icon: Mail,
    },
    users: {
      title: "Registered Users & Roles",
      subtitle: "Inspect registered accounts, roles (student/admin), and enrollment history",
      icon: Users,
    },
    validation: {
      title: "Server Validation Suite",
      subtitle: "Real-time interactive server-side validation tester and sanitization tester",
      icon: Shield,
    },
  };

  const navSections = [
    {
      group: "Core Management",
      items: [
        { id: "overview" as TabType, label: "Overview & Metrics", icon: Activity, badge: null, badgeColor: "" },
        {
          id: "purchases" as TabType,
          label: "Purchases & UTRs",
          icon: ShoppingBag,
          badge: pendingUtrsCount > 0 ? `${pendingUtrsCount} Pending` : `${purchases.length}`,
          badgeColor: pendingUtrsCount > 0 ? "bg-amber-400 text-black animate-pulse" : "bg-neutral-800 text-neutral-300",
        },
        {
          id: "progress" as TabType,
          label: "Student Progress",
          icon: ShieldCheck,
          badge: `${progressList.length}`,
          badgeColor: "bg-neutral-800 text-neutral-300",
        },
      ],
    },
    {
      group: "Content & Learning",
      items: [
        {
          id: "roadmap" as TabType,
          label: "Roadmap Curriculum",
          icon: Map,
          badge: "Paid Pro",
          badgeColor: "bg-emerald-400 text-black",
        },
        {
          id: "blogs" as TabType,
          label: "Blogs & Writeups",
          icon: BookOpen,
          badge: `${blogs.length}`,
          badgeColor: "bg-neutral-800 text-neutral-300",
        },
        {
          id: "community" as TabType,
          label: "Community Forum",
          icon: MessageSquare,
          badge: `${communityPosts.length}`,
          badgeColor: "bg-neutral-800 text-neutral-300",
        },
      ],
    },
    {
      group: "CRM & Platform",
      items: [
        {
          id: "inquiries" as TabType,
          label: "Hire Me Leads",
          icon: Mail,
          badge: newLeadsCount > 0 ? `${newLeadsCount} New` : `${inquiries.length}`,
          badgeColor: newLeadsCount > 0 ? "bg-red-500 text-white" : "bg-neutral-800 text-neutral-300",
        },
        {
          id: "users" as TabType,
          label: "Users & Accounts",
          icon: Users,
          badge: `${users.length}`,
          badgeColor: "bg-neutral-800 text-neutral-300",
        },
        {
          id: "validation" as TabType,
          label: "Validation Suite",
          icon: Shield,
          badge: "Active",
          badgeColor: "bg-emerald-400 text-black",
        },
      ],
    },
  ];

  const CurrentTabIcon = tabMeta[activeTab]?.icon || Activity;

  return (
    <div className="min-h-screen bg-neutral-100 text-black font-sans flex flex-col md:flex-row">
      {/* ══ DESKTOP FIXED LEFT SIDEBAR ═══════════════════════════════ */}
      <aside className="hidden md:flex md:w-72 md:flex-col md:fixed md:inset-y-0 bg-black text-white border-r-[3.5px] border-black z-40 shadow-brutal-xl justify-between">
        <div className="flex flex-col flex-1 overflow-y-auto">
          {/* Brand Header */}
          <div className="p-5 border-b-[3px] border-neutral-800">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-amber-400 text-black font-black flex items-center justify-center text-sm border-2 border-white shadow-brutal-xs">
                  RA
                </div>
                <div>
                  <h2 className="font-display font-black text-sm text-white tracking-tight leading-none">
                    thatraghavarora
                  </h2>
                  <span className="text-[10px] font-mono text-amber-400 uppercase font-black tracking-wider">
                    Admin Command Center
                  </span>
                </div>
              </div>
              <span className="px-2 py-0.5 rounded-full border border-emerald-500/40 bg-emerald-500/10 text-emerald-400 text-[10px] font-mono font-bold flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                Live
              </span>
            </div>
          </div>

          {/* Navigation Links Grouped */}
          <nav className="p-4 space-y-5 flex-1">
            {navSections.map((section, idx) => (
              <div key={idx} className="space-y-1.5">
                <p className="px-3 text-[10px] font-black uppercase tracking-widest text-neutral-400">
                  {section.group}
                </p>
                <div className="space-y-1">
                  {section.items.map((item) => {
                    const Icon = item.icon;
                    const isActive = activeTab === item.id;
                    return (
                      <button
                        key={item.id}
                        onClick={() => setActiveTab(item.id)}
                        className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-black uppercase tracking-wider transition-all border-2 cursor-pointer ${
                          isActive
                            ? "bg-amber-300 text-black border-black shadow-brutal-xs font-black"
                            : "text-neutral-300 border-transparent hover:bg-neutral-900 hover:text-white"
                        }`}
                      >
                        <div className="flex items-center gap-2.5">
                          <Icon className={`w-4 h-4 stroke-[2.5] ${isActive ? "text-black" : "text-neutral-400"}`} />
                          <span>{item.label}</span>
                        </div>
                        {item.badge && (
                          <span
                            className={`text-[9px] font-mono font-bold px-1.5 py-0.5 rounded border border-black/20 ${item.badgeColor}`}
                          >
                            {item.badge}
                          </span>
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>
            ))}
          </nav>
        </div>

        {/* Sidebar Footer */}
        <div className="p-4 border-t-[3px] border-neutral-800 space-y-3 bg-neutral-950 shrink-0">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-neutral-800 border border-neutral-700 flex items-center justify-center text-xs font-black text-amber-400">
                🛡️
              </div>
              <div className="text-left">
                <p className="text-xs font-black text-white leading-none">Raghav Arora</p>
                <p className="text-[10px] text-neutral-400 font-mono mt-0.5">Super Administrator</p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-2 pt-1">
            <Link
              href="/"
              target="_blank"
              className="px-2.5 py-2 rounded-xl border border-neutral-700 bg-neutral-900 hover:bg-neutral-800 text-white text-[11px] font-black uppercase tracking-wider flex items-center justify-center gap-1 transition-all cursor-pointer"
              title="Open public website"
            >
              <ExternalLink className="w-3 h-3 text-amber-400" />
              <span>Website</span>
            </Link>
            <button
              onClick={handleLogout}
              className="px-2.5 py-2 rounded-xl border border-red-500/50 bg-red-950/40 hover:bg-red-900/60 text-red-300 text-[11px] font-black uppercase tracking-wider flex items-center justify-center gap-1 transition-all cursor-pointer"
            >
              <LogOut className="w-3 h-3 text-red-400" />
              <span>Sign Out</span>
            </button>
          </div>
        </div>
      </aside>

      {/* ══ MOBILE SIDEBAR DRAWER OVERLAY ═══════════════════════════ */}
      {mobileSidebarOpen && (
        <div className="fixed inset-0 z-50 md:hidden bg-black/75 backdrop-blur-sm flex">
          <div className="w-72 bg-black text-white border-r-[3.5px] border-black flex flex-col justify-between h-full shadow-brutal-xl">
            <div className="flex flex-col flex-1 overflow-y-auto">
              <div className="p-5 border-b-[3px] border-neutral-800 flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-lg bg-amber-400 text-black font-black flex items-center justify-center text-xs">
                    RA
                  </div>
                  <div>
                    <h2 className="font-display font-black text-xs text-white">thatraghavarora</h2>
                    <span className="text-[9px] font-mono text-amber-400 uppercase font-bold">Admin Console</span>
                  </div>
                </div>
                <button
                  onClick={() => setMobileSidebarOpen(false)}
                  className="p-1.5 rounded-lg border border-neutral-700 hover:bg-neutral-800 text-neutral-300"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <nav className="p-4 space-y-4 flex-1">
                {navSections.map((section, idx) => (
                  <div key={idx} className="space-y-1">
                    <p className="px-2 text-[10px] font-black uppercase tracking-widest text-neutral-400">
                      {section.group}
                    </p>
                    {section.items.map((item) => {
                      const Icon = item.icon;
                      const isActive = activeTab === item.id;
                      return (
                        <button
                          key={item.id}
                          onClick={() => {
                            setActiveTab(item.id);
                            setMobileSidebarOpen(false);
                          }}
                          className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-black uppercase tracking-wider transition-all border-2 ${
                            isActive
                              ? "bg-amber-300 text-black border-black shadow-brutal-xs font-black"
                              : "text-neutral-300 border-transparent hover:bg-neutral-900"
                          }`}
                        >
                          <div className="flex items-center gap-2">
                            <Icon className="w-4 h-4 stroke-[2.5]" />
                            <span>{item.label}</span>
                          </div>
                          {item.badge && (
                            <span className={`text-[9px] font-mono font-bold px-1.5 py-0.5 rounded ${item.badgeColor}`}>
                              {item.badge}
                            </span>
                          )}
                        </button>
                      );
                    })}
                  </div>
                ))}
              </nav>
            </div>

            <div className="p-4 border-t border-neutral-800 space-y-2 bg-neutral-950">
              <button
                onClick={handleLogout}
                className="w-full py-2.5 rounded-xl border border-red-500 bg-red-600 text-white text-xs font-black uppercase tracking-wider flex items-center justify-center gap-1.5"
              >
                <LogOut className="w-3.5 h-3.5" />
                <span>Sign Out</span>
              </button>
            </div>
          </div>

          <div className="flex-1" onClick={() => setMobileSidebarOpen(false)} />
        </div>
      )}

      {/* ══ MAIN CONTENT COLUMN ══════════════════════════════════════ */}
      <div className="flex-1 md:pl-72 flex flex-col min-w-0 min-h-screen">
        {/* Top Header Bar */}
        <header className="sticky top-0 z-30 bg-white/95 backdrop-blur-md border-b-[3px] border-black px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between gap-4 shadow-brutal-xs">
          <div className="flex items-center gap-3 min-w-0">
            <button
              onClick={() => setMobileSidebarOpen(true)}
              className="md:hidden p-2 rounded-xl border-2 border-black bg-amber-300 text-black hover:bg-amber-400 transition-colors shadow-brutal-xs cursor-pointer"
              aria-label="Open navigation menu"
            >
              <Menu className="w-5 h-5" />
            </button>
            <div className="w-10 h-10 rounded-xl border-2 border-black bg-amber-300 flex items-center justify-center shrink-0 shadow-brutal-xs hidden sm:flex">
              <CurrentTabIcon className="w-5 h-5 text-black stroke-[2.5]" />
            </div>
            <div className="min-w-0">
              <h1 className="text-base sm:text-xl font-black text-black font-display tracking-tight truncate">
                {tabMeta[activeTab]?.title}
              </h1>
              <p className="text-xs text-neutral-500 font-bold truncate hidden sm:block">
                {tabMeta[activeTab]?.subtitle}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2.5 shrink-0">
            {activeTab === "blogs" && (
              <button
                onClick={() => setShowCreateBlogModal(true)}
                className="px-3.5 py-2 rounded-xl border-2 border-black bg-amber-400 hover:bg-amber-300 text-black text-xs font-black uppercase tracking-wider flex items-center gap-1.5 transition-all shadow-brutal-xs cursor-pointer"
              >
                <PlusCircle className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">New Blog</span>
              </button>
            )}
            {activeTab === "purchases" && (
              <button
                onClick={() => setShowGrantModal(true)}
                className="px-3.5 py-2 rounded-xl border-2 border-black bg-amber-400 hover:bg-amber-300 text-black text-xs font-black uppercase tracking-wider flex items-center gap-1.5 transition-all shadow-brutal-xs cursor-pointer"
              >
                <PlusCircle className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Grant Access</span>
              </button>
            )}
            <button
              onClick={loadDashboardData}
              disabled={loadingData}
              className="px-3.5 py-2 rounded-xl border-2 border-black bg-white hover:bg-neutral-100 text-black text-xs font-black uppercase tracking-wider flex items-center gap-1.5 transition-all shadow-brutal-xs cursor-pointer"
              title="Refresh all data"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${loadingData ? "animate-spin" : ""}`} />
              <span className="hidden sm:inline">Refresh</span>
            </button>
            <div className="hidden lg:flex items-center gap-1.5 px-3 py-1.5 rounded-xl border-2 border-neutral-200 bg-neutral-100 text-[10px] font-mono font-bold text-neutral-700">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
              <span>Validation: ACTIVE</span>
            </div>
          </div>
        </header>

        {/* Content Container */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 space-y-6 max-w-7xl w-full">
          {/* TOP STATUS TOAST */}
          {statusMessage && (
            <div
              className={`p-4 rounded-2xl border-[3px] border-black flex items-center justify-between shadow-brutal-sm transition-all ${
                statusMessage.type === "success" ? "bg-emerald-200 text-emerald-950" : "bg-red-200 text-red-950"
              }`}
            >
              <div className="flex items-center gap-2.5">
                {statusMessage.type === "success" ? (
                  <CheckCircle2 className="w-5 h-5 text-emerald-800 shrink-0" />
                ) : (
                  <AlertCircle className="w-5 h-5 text-red-800 shrink-0" />
                )}
                <span className="text-xs sm:text-sm font-black">{statusMessage.text}</span>
              </div>
              <button
                onClick={() => setStatusMessage(null)}
                className="font-black text-xs uppercase px-2 py-0.5 rounded border border-black bg-white hover:bg-black hover:text-white transition-colors"
              >
                Dismiss
              </button>
            </div>
          )}

          {/* ══════════════════════════════════════════════════════════════ */}
          {/* TAB 1: OVERVIEW & METRICS                                     */}
          {/* ══════════════════════════════════════════════════════════════ */}
          {activeTab === "overview" && (
          <div className="space-y-6">
            {/* KPI Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="rounded-3xl border-[3px] border-black bg-yellow-200 p-6 shadow-brutal">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-black uppercase tracking-wider text-black">
                    Total Leads
                  </span>
                  <div className="w-9 h-9 rounded-xl bg-white border-2 border-black flex items-center justify-center shadow-brutal-xs">
                    <Mail className="w-4 h-4 text-black stroke-[2.5]" />
                  </div>
                </div>
                <div className="text-3xl sm:text-4xl font-black text-black font-display">
                  {stats?.totalInquiries ?? inquiries.length}
                </div>
                <div className="text-xs font-bold text-neutral-800 mt-2">
                  <span className="px-2 py-0.5 rounded bg-black text-yellow-300 font-mono text-[10px] font-black mr-1">
                    {stats?.newInquiries ?? inquiries.filter((i) => i.status === "new").length} NEW
                  </span>
                  Leads awaiting reply
                </div>
              </div>

              <div className="rounded-3xl border-[3px] border-black bg-emerald-200 p-6 shadow-brutal">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-black uppercase tracking-wider text-black">
                    Estimated Revenue
                  </span>
                  <div className="w-9 h-9 rounded-xl bg-white border-2 border-black flex items-center justify-center shadow-brutal-xs">
                    <DollarSign className="w-4 h-4 text-emerald-700 stroke-[2.5]" />
                  </div>
                </div>
                <div className="text-3xl sm:text-4xl font-black text-black font-display">
                  {stats?.estimatedRevenue ?? "₹24,800 INR"}
                </div>
                <div className="text-xs font-bold text-emerald-950 mt-2">
                  Roadmaps + 1:1 Live guidance bookings
                </div>
              </div>

              <div className="rounded-3xl border-[3px] border-black bg-sky-200 p-6 shadow-brutal">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-black uppercase tracking-wider text-black">
                    Roadmap Unlocks
                  </span>
                  <div className="w-9 h-9 rounded-xl bg-white border-2 border-black flex items-center justify-center shadow-brutal-xs">
                    <ShoppingBag className="w-4 h-4 text-sky-700 stroke-[2.5]" />
                  </div>
                </div>
                <div className="text-3xl sm:text-4xl font-black text-black font-display">
                  {stats?.totalPurchases ?? purchases.length}
                </div>
                <div className="text-xs font-bold text-neutral-800 mt-2">
                  Verified buyers with YouTube & CTF access
                </div>
              </div>

              <div className="rounded-3xl border-[3px] border-black bg-violet-200 p-6 shadow-brutal">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-black uppercase tracking-wider text-black">
                    Total Students / Users
                  </span>
                  <div className="w-9 h-9 rounded-xl bg-white border-2 border-black flex items-center justify-center shadow-brutal-xs">
                    <Users className="w-4 h-4 text-violet-700 stroke-[2.5]" />
                  </div>
                </div>
                <div className="text-3xl sm:text-4xl font-black text-black font-display">
                  {stats?.totalUsers ?? users.length}
                </div>
                <div className="text-xs font-bold text-neutral-800 mt-2">
                  Registered hacker profiles
                </div>
              </div>
            </div>

            {/* Quick Actions & Recent Activity Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Quick Actions */}
              <div className="rounded-3xl border-[3.5px] border-black bg-white p-6 shadow-brutal">
                <h3 className="text-lg font-black text-black font-display mb-4 flex items-center gap-2">
                  <Terminal className="w-5 h-5 text-amber-500" />
                  <span>Admin Actions</span>
                </h3>
                <div className="space-y-3">
                  <button
                    onClick={() => setShowGrantModal(true)}
                    className="w-full p-3.5 rounded-2xl border-2 border-black bg-amber-100 hover:bg-amber-200 text-black font-black text-xs uppercase flex items-center justify-between transition-all shadow-brutal-xs"
                  >
                    <span className="flex items-center gap-2">
                      <PlusCircle className="w-4 h-4 text-black" />
                      <span>Manually Grant Roadmap Access</span>
                    </span>
                    <span>→</span>
                  </button>

                  <button
                    onClick={() => setActiveTab("inquiries")}
                    className="w-full p-3.5 rounded-2xl border-2 border-black bg-neutral-50 hover:bg-neutral-100 text-black font-black text-xs uppercase flex items-center justify-between transition-all shadow-brutal-xs"
                  >
                    <span className="flex items-center gap-2">
                      <Mail className="w-4 h-4 text-black" />
                      <span>Review Hire Me Inquiries</span>
                    </span>
                    <span className="px-2 py-0.5 rounded bg-black text-white text-[10px]">
                      {inquiries.filter((i) => i.status === "new").length} New
                    </span>
                  </button>

                  <button
                    onClick={() => setActiveTab("validation")}
                    className="w-full p-3.5 rounded-2xl border-2 border-black bg-neutral-50 hover:bg-neutral-100 text-black font-black text-xs uppercase flex items-center justify-between transition-all shadow-brutal-xs"
                  >
                    <span className="flex items-center gap-2">
                      <ShieldCheck className="w-4 h-4 text-emerald-600" />
                      <span>Test Server Validation Sandbox</span>
                    </span>
                    <span>→</span>
                  </button>

                  <Link
                    href="/roadmap/web-pentesting-cyber-security"
                    target="_blank"
                    className="w-full p-3.5 rounded-2xl border-2 border-black bg-neutral-50 hover:bg-neutral-100 text-black font-black text-xs uppercase flex items-center justify-between transition-all shadow-brutal-xs"
                  >
                    <span className="flex items-center gap-2">
                      <ExternalLink className="w-4 h-4 text-black" />
                      <span>View Public Roadmap Page</span>
                    </span>
                    <span>↗</span>
                  </Link>
                </div>
              </div>

              {/* Recent Inquiries Snippet */}
              <div className="lg:col-span-2 rounded-3xl border-[3.5px] border-black bg-white p-6 shadow-brutal">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-black text-black font-display flex items-center gap-2">
                    <Mail className="w-5 h-5 text-amber-500" />
                    <span>Recent Hire Me Leads</span>
                  </h3>
                  <button
                    onClick={() => setActiveTab("inquiries")}
                    className="text-xs font-black text-amber-700 hover:text-black uppercase underline"
                  >
                    View All Leads ({inquiries.length})
                  </button>
                </div>

                {inquiries.length === 0 ? (
                  <p className="text-xs text-neutral-500 font-bold py-6 text-center">No leads recorded yet.</p>
                ) : (
                  <div className="space-y-3">
                    {inquiries.slice(0, 3).map((lead) => (
                      <div
                        key={lead.id}
                        className="p-4 rounded-2xl border-2 border-black bg-neutral-50 flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-brutal-xs"
                      >
                        <div>
                          <div className="flex items-center gap-2 mb-1">
                            <span className="font-black text-sm text-black">{lead.name}</span>
                            <span className="text-xs font-mono text-neutral-600">({lead.email})</span>
                          </div>
                          <div className="flex items-center gap-2 flex-wrap">
                            <span className="px-2 py-0.5 rounded bg-amber-200 text-black text-[10px] font-black uppercase border border-black">
                              {lead.service_type}
                            </span>
                            <span className="text-[11px] font-bold text-neutral-500">
                              {new Date(lead.created_at).toLocaleDateString()}
                            </span>
                          </div>
                        </div>

                        <div className="flex items-center gap-2">
                          <select
                            value={lead.status}
                            onChange={(e) => handleUpdateInquiryStatus(lead.id, e.target.value)}
                            className="px-2.5 py-1.5 rounded-xl border-2 border-black text-xs font-black uppercase bg-white focus:outline-none shadow-brutal-xs"
                          >
                            <option value="new">New</option>
                            <option value="contacted">Contacted</option>
                            <option value="scheduled">Scheduled</option>
                            <option value="completed">Completed</option>
                            <option value="archived">Archived</option>
                          </select>
                          <a
                            href={`mailto:${lead.email}?subject=Regarding your inquiry for ${lead.service_type}`}
                            className="px-3 py-1.5 rounded-xl border-2 border-black bg-black text-white hover:bg-neutral-800 text-xs font-black uppercase flex items-center gap-1 shadow-brutal-xs"
                          >
                            <Mail className="w-3.5 h-3.5" />
                            <span>Reply</span>
                          </a>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* ══════════════════════════════════════════════════════════════ */}
        {/* TAB 2: INQUIRIES / LEADS MANAGER                             */}
        {/* ══════════════════════════════════════════════════════════════ */}
        {activeTab === "inquiries" && (
          <div className="rounded-3xl border-[3.5px] border-black bg-white p-6 sm:p-8 shadow-brutal space-y-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <h2 className="text-2xl font-black text-black font-display">
                  Hire Me Leads &amp; Consultations
                </h2>
                <p className="text-xs font-bold text-neutral-600 mt-0.5">
                  Server-side validated inquiries for 1:1 Live Guidance &amp; Freelance Services.
                </p>
              </div>

              {/* Filters */}
              <div className="flex items-center gap-2 flex-wrap">
                <div className="relative">
                  <Search className="w-4 h-4 text-neutral-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    value={inquirySearch}
                    onChange={(e) => setInquirySearch(e.target.value)}
                    placeholder="Search name, email, service..."
                    className="pl-9 pr-3 py-2 rounded-xl border-2 border-black bg-neutral-50 text-xs font-bold focus:bg-white focus:outline-none w-52 sm:w-64"
                  />
                </div>

                <select
                  value={inquiryStatusFilter}
                  onChange={(e) => setInquiryStatusFilter(e.target.value)}
                  className="px-3 py-2 rounded-xl border-2 border-black bg-neutral-50 text-xs font-black uppercase focus:outline-none"
                >
                  <option value="all">All Statuses</option>
                  <option value="new">New Leads</option>
                  <option value="contacted">Contacted</option>
                  <option value="scheduled">Scheduled</option>
                  <option value="completed">Completed</option>
                  <option value="archived">Archived</option>
                </select>
              </div>
            </div>

            {/* Inquiries Table */}
            <div className="overflow-x-auto rounded-2xl border-2 border-black">
              <table className="w-full text-left border-collapse text-xs">
                <thead>
                  <tr className="bg-amber-300 border-b-2 border-black text-black uppercase font-black tracking-wider text-[11px]">
                    <th className="p-3.5">Client &amp; Contact</th>
                    <th className="p-3.5">Service Requested</th>
                    <th className="p-3.5">Details</th>
                    <th className="p-3.5">Timeline</th>
                    <th className="p-3.5">Status</th>
                    <th className="p-3.5 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y-2 divide-neutral-200 font-bold text-neutral-800">
                  {inquiries.length === 0 ? (
                    <tr>
                      <td colSpan={6} className="p-8 text-center text-neutral-500 font-bold">
                        No inquiries match the current filter.
                      </td>
                    </tr>
                  ) : (
                    inquiries.map((lead) => (
                      <tr key={lead.id} className="hover:bg-amber-50/50 transition-colors">
                        <td className="p-3.5">
                          <div className="font-black text-black">{lead.name}</div>
                          <div className="text-neutral-500 font-mono text-[11px]">{lead.email}</div>
                          {lead.contact_handle && (
                            <div className="text-[10px] text-amber-800 font-mono">
                              Handle: {lead.contact_handle}
                            </div>
                          )}
                        </td>
                        <td className="p-3.5">
                          <span className="inline-block px-2.5 py-0.5 rounded-full border border-black bg-neutral-100 text-black text-[10px] font-black uppercase">
                            {lead.service_type}
                          </span>
                        </td>
                        <td className="p-3.5 max-w-xs">
                          <p className="line-clamp-2 text-neutral-600 leading-snug">
                            {lead.details}
                          </p>
                          <button
                            onClick={() => setSelectedInquiry(lead)}
                            className="text-[10px] font-black text-amber-700 hover:text-black underline mt-1"
                          >
                            Read Full Details
                          </button>
                        </td>
                        <td className="p-3.5 text-neutral-600 whitespace-nowrap">
                          {lead.preferred_timeline || "Flexible"}
                        </td>
                        <td className="p-3.5">
                          <select
                            value={lead.status}
                            onChange={(e) => handleUpdateInquiryStatus(lead.id, e.target.value)}
                            className={`px-2.5 py-1 rounded-lg border-2 border-black text-[11px] font-black uppercase focus:outline-none ${
                              lead.status === "new"
                                ? "bg-amber-300 text-black"
                                : lead.status === "contacted"
                                ? "bg-sky-200 text-sky-950"
                                : lead.status === "scheduled"
                                ? "bg-purple-200 text-purple-950"
                                : lead.status === "completed"
                                ? "bg-emerald-300 text-black"
                                : "bg-neutral-200 text-neutral-700"
                            }`}
                          >
                            <option value="new">New</option>
                            <option value="contacted">Contacted</option>
                            <option value="scheduled">Scheduled</option>
                            <option value="completed">Completed</option>
                            <option value="archived">Archived</option>
                          </select>
                        </td>
                        <td className="p-3.5 text-right whitespace-nowrap">
                          <div className="flex items-center justify-end gap-1.5">
                            <a
                              href={`mailto:${lead.email}?subject=Regarding your ${lead.service_type} inquiry`}
                              className="p-1.5 rounded-lg border border-black bg-white hover:bg-black hover:text-white transition-colors"
                              title="Send Email"
                            >
                              <Mail className="w-3.5 h-3.5" />
                            </a>
                            <button
                              onClick={() => handleDeleteInquiry(lead.id)}
                              className="p-1.5 rounded-lg border border-black bg-white hover:bg-red-500 hover:text-white transition-colors text-red-600"
                              title="Delete Lead"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* ══════════════════════════════════════════════════════════════ */}
        {/* TAB 3: PURCHASES & ROADMAP UNLOCKS                           */}
        {/* ══════════════════════════════════════════════════════════════ */}
        {activeTab === "purchases" && (
          <div className="rounded-3xl border-[3.5px] border-black bg-white p-6 sm:p-8 shadow-brutal space-y-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <h2 className="text-2xl font-black text-black font-display">
                  Roadmap &amp; Course Purchases
                </h2>
                <p className="text-xs font-bold text-neutral-600 mt-0.5">
                  Verified student unlocks granting access to hidden YouTube channels &amp; CTF challenge guides.
                </p>
              </div>

              <div className="flex items-center gap-2 flex-wrap">
                <button
                  onClick={() => setShowGrantModal(true)}
                  className="btn-brutal btn-brutal-primary px-4 py-2 text-xs uppercase font-black flex items-center gap-1.5"
                >
                  <PlusCircle className="w-4 h-4" />
                  <span>Manual Grant Access</span>
                </button>

                <div className="relative">
                  <Search className="w-4 h-4 text-neutral-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    value={purchaseSearch}
                    onChange={(e) => setPurchaseSearch(e.target.value)}
                    placeholder="Search email, transaction..."
                    className="pl-9 pr-3 py-2 rounded-xl border-2 border-black bg-neutral-50 text-xs font-bold focus:bg-white focus:outline-none w-48 sm:w-56"
                  />
                </div>

                <select
                  value={purchaseStatusFilter}
                  onChange={(e) => setPurchaseStatusFilter(e.target.value)}
                  className="px-3 py-2 rounded-xl border-2 border-black bg-neutral-50 text-xs font-black uppercase focus:outline-none"
                >
                  <option value="all">All Statuses</option>
                  <option value="active">Active</option>
                  <option value="pending">Pending</option>
                  <option value="verified">Verified UTR</option>
                  <option value="pending_verification">Pending UTR</option>
                  <option value="refunded">Refunded</option>
                  <option value="expired">Expired</option>
                </select>
              </div>
            </div>

            {/* Purchases Table */}
            <div className="overflow-x-auto rounded-2xl border-2 border-black">
              <table className="w-full text-left border-collapse text-xs">
                <thead>
                  <tr className="bg-sky-200 border-b-2 border-black text-black uppercase font-black tracking-wider text-[11px]">
                    <th className="p-3.5">Student Email</th>
                    <th className="p-3.5">Item Unlocked</th>
                    <th className="p-3.5">Amount</th>
                    <th className="p-3.5">Enrolled Date &amp; Time</th>
                    <th className="p-3.5">UPI UTR / Ref No.</th>
                    <th className="p-3.5">Verification</th>
                    <th className="p-3.5">Access Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y-2 divide-neutral-200 font-bold text-neutral-800">
                  {purchases.length === 0 ? (
                    <tr>
                      <td colSpan={7} className="p-8 text-center text-neutral-500 font-bold">
                        No purchases found.
                      </td>
                    </tr>
                  ) : (
                    purchases.map((purchase) => {
                      const isVerified = purchase.verification_status === "verified";
                      const enrollmentDate = purchase.enrolled_at || purchase.created_at;
                      const formattedDate = new Date(enrollmentDate).toLocaleString("en-IN", {
                        day: "2-digit",
                        month: "short",
                        year: "numeric",
                        hour: "2-digit",
                        minute: "2-digit",
                      });

                      return (
                        <tr key={purchase.id} className="hover:bg-neutral-50 transition-colors">
                          <td className="p-3.5 font-mono text-black font-bold">
                            {purchase.user_email}
                          </td>
                          <td className="p-3.5">
                            <div className="font-black text-black">{purchase.item_title}</div>
                            <span className="text-[10px] font-mono text-neutral-500 uppercase">
                              {purchase.item_type || "item"} · {purchase.item_slug}
                            </span>
                          </td>
                          <td className="p-3.5 font-black text-emerald-700">
                            {purchase.amount || "99 RS"}
                          </td>
                          <td className="p-3.5 whitespace-nowrap text-neutral-600 font-mono text-[11px]">
                            {formattedDate}
                          </td>
                          <td className="p-3.5">
                            <div className="flex items-center gap-1.5">
                              <span className="font-mono text-xs font-black bg-yellow-100 px-2 py-0.5 rounded border border-yellow-400 text-neutral-900 select-all">
                                {purchase.utr_number || purchase.transaction_id}
                              </span>
                            </div>
                            <span className="text-[9px] text-neutral-400 font-mono">
                              via {purchase.payment_method.toUpperCase()}
                            </span>
                          </td>
                          <td className="p-3.5">
                            {isVerified ? (
                              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-emerald-100 text-emerald-900 border border-emerald-400 font-black text-[10px] uppercase">
                                <Check className="w-3 h-3 text-emerald-700 stroke-[3]" />
                                Verified
                              </span>
                            ) : (
                              <div className="flex items-center gap-1.5">
                                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-amber-100 text-amber-900 border border-amber-400 font-black text-[10px] uppercase">
                                  <Clock className="w-3 h-3 text-amber-700 stroke-[2.5]" />
                                  Pending
                                </span>
                                <button
                                  onClick={() => handleVerifyUtr(purchase.id)}
                                  className="px-2.5 py-1 rounded-lg border-2 border-black bg-emerald-400 hover:bg-emerald-500 text-black font-black text-[10px] uppercase tracking-wider shadow-brutal-xs cursor-pointer"
                                  title="Approve UTR & Unlock Access"
                                >
                                  Verify UTR
                                </button>
                              </div>
                            )}
                          </td>
                          <td className="p-3.5">
                            <select
                              value={purchase.status}
                              onChange={(e) => handleUpdatePurchaseStatus(purchase.id, e.target.value)}
                              className={`px-2.5 py-1 rounded-lg border-2 border-black text-[11px] font-black uppercase focus:outline-none ${
                                purchase.status === "active"
                                  ? "bg-emerald-300 text-black"
                                  : purchase.status === "refunded"
                                  ? "bg-red-200 text-red-900"
                                  : "bg-neutral-200 text-neutral-800"
                              }`}
                            >
                              <option value="active">Active</option>
                              <option value="pending">Pending</option>
                              <option value="refunded">Refunded</option>
                              <option value="expired">Expired</option>
                            </select>
                          </td>
                        </tr>
                      );
                    })
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* ══════════════════════════════════════════════════════════════ */}
        {/* TAB: STUDENT PROGRESS TRACKING                                */}
        {/* ══════════════════════════════════════════════════════════════ */}
        {activeTab === "progress" && (
          <div className="rounded-3xl border-[3.5px] border-black bg-white p-6 sm:p-8 shadow-brutal space-y-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <h2 className="text-2xl font-black text-black font-display">
                  Student Learning &amp; Course Progress
                </h2>
                <p className="text-xs font-bold text-neutral-600 mt-0.5">
                  Live course &amp; roadmap milestone completions with enrollment date, timestamp &amp; checklist stats.
                </p>
              </div>
              <button
                onClick={loadDashboardData}
                className="btn-brutal btn-brutal-primary px-4 py-2 text-xs uppercase font-black flex items-center gap-1.5"
              >
                <RefreshCw className={`w-3.5 h-3.5 ${loadingData ? "animate-spin" : ""}`} />
                <span>Sync DB Progress</span>
              </button>
            </div>

            <div className="overflow-x-auto rounded-2xl border-2 border-black">
              <table className="w-full text-left border-collapse text-xs">
                <thead>
                  <tr className="bg-emerald-200 border-b-2 border-black text-black uppercase font-black tracking-wider text-[11px]">
                    <th className="p-3.5">Student Email</th>
                    <th className="p-3.5">Enrolled Course / Roadmap</th>
                    <th className="p-3.5">Progress (%)</th>
                    <th className="p-3.5">Checklist Completed</th>
                    <th className="p-3.5">Enrolled At</th>
                    <th className="p-3.5">Last Activity</th>
                    <th className="p-3.5">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y-2 divide-neutral-200 font-bold text-neutral-800">
                  {progressList.length === 0 ? (
                    <tr>
                      <td colSpan={7} className="p-8 text-center text-neutral-500 font-bold">
                        No progress records found.
                      </td>
                    </tr>
                  ) : (
                    progressList.map((prog) => (
                      <tr key={prog.id} className="hover:bg-neutral-50 transition-colors">
                        <td className="p-3.5 font-mono text-black font-bold">
                          {prog.user_email}
                        </td>
                        <td className="p-3.5">
                          <div className="font-black text-black capitalize">{prog.item_title.replace(/-/g, " ")}</div>
                          <span className="text-[10px] font-mono text-neutral-500 uppercase">
                            Type: {prog.item_type}
                          </span>
                        </td>
                        <td className="p-3.5">
                          <div className="flex items-center gap-2">
                            <div className="w-24 bg-neutral-200 rounded-full h-2.5 overflow-hidden border border-neutral-400">
                              <div
                                className="bg-emerald-500 h-2.5 rounded-full"
                                style={{ width: `${Math.min(100, prog.progress_percent)}%` }}
                              />
                            </div>
                            <span className="font-black font-mono text-xs">{prog.progress_percent.toFixed(0)}%</span>
                          </div>
                        </td>
                        <td className="p-3.5 font-mono text-neutral-700">
                          {prog.completed_count} / {prog.total_count} items
                        </td>
                        <td className="p-3.5 font-mono text-[11px] text-neutral-600 whitespace-nowrap">
                          {new Date(prog.enrolled_at).toLocaleString("en-IN", {
                            day: "2-digit",
                            month: "short",
                            year: "numeric",
                          })}
                        </td>
                        <td className="p-3.5 font-mono text-[11px] text-neutral-500 whitespace-nowrap">
                          {new Date(prog.last_activity).toLocaleString("en-IN", {
                            day: "2-digit",
                            month: "short",
                            hour: "2-digit",
                            minute: "2-digit",
                          })}
                        </td>
                        <td className="p-3.5">
                          <span
                            className={`px-2.5 py-0.5 rounded-full border text-[10px] font-black uppercase ${
                              prog.status === "completed"
                                ? "bg-emerald-100 text-emerald-900 border-emerald-400"
                                : "bg-amber-100 text-amber-900 border-amber-400"
                            }`}
                          >
                            {prog.status === "completed" ? "Completed" : "In Progress"}
                          </span>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* ══════════════════════════════════════════════════════════════ */}
        {/* TAB: BLOGS & ARTICLES MANAGEMENT                              */}
        {/* ══════════════════════════════════════════════════════════════ */}
        {activeTab === "blogs" && (
          <div className="rounded-3xl border-[3.5px] border-black bg-white p-6 sm:p-8 shadow-brutal space-y-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <h2 className="text-2xl font-black text-black font-display">
                  Blogs &amp; Technical Writeups
                </h2>
                <p className="text-xs font-bold text-neutral-600 mt-0.5">
                  Publish and manage technical articles, bug bounty methodology guides, and security tutorials.
                </p>
              </div>

              <button
                onClick={() => setShowCreateBlogModal(true)}
                className="btn-brutal btn-brutal-primary px-4 py-2.5 text-xs uppercase font-black flex items-center gap-1.5"
              >
                <PlusCircle className="w-4 h-4" />
                <span>Publish New Blog</span>
              </button>
            </div>

            <div className="overflow-x-auto rounded-2xl border-2 border-black">
              <table className="w-full text-left border-collapse text-xs">
                <thead>
                  <tr className="bg-yellow-200 border-b-2 border-black text-black uppercase font-black tracking-wider text-[11px]">
                    <th className="p-3.5">Article Title</th>
                    <th className="p-3.5">Slug</th>
                    <th className="p-3.5">Category</th>
                    <th className="p-3.5">Estimated Read</th>
                    <th className="p-3.5">Published Date</th>
                    <th className="p-3.5">Status</th>
                    <th className="p-3.5 text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y-2 divide-neutral-200 font-bold text-neutral-800">
                  {blogs.length === 0 ? (
                    <tr>
                      <td colSpan={7} className="p-8 text-center text-neutral-500 font-bold">
                        No blogs published yet. Click &quot;Publish New Blog&quot; to write your first writeup!
                      </td>
                    </tr>
                  ) : (
                    blogs.map((b) => (
                      <tr key={b.id} className="hover:bg-neutral-50 transition-colors">
                        <td className="p-3.5 font-black text-black max-w-xs">
                          <div className="truncate">{b.title}</div>
                          <div className="text-[10px] text-neutral-500 font-medium truncate">{b.excerpt}</div>
                        </td>
                        <td className="p-3.5 font-mono text-[11px] text-neutral-600">
                          {b.slug}
                        </td>
                        <td className="p-3.5">
                          <span className="px-2.5 py-0.5 rounded-full border border-black bg-neutral-100 text-black text-[10px] font-black uppercase">
                            {b.category}
                          </span>
                        </td>
                        <td className="p-3.5 text-neutral-600 font-mono">
                          {b.read_time || "5 min read"}
                        </td>
                        <td className="p-3.5 text-neutral-500 whitespace-nowrap">
                          {new Date(b.created_at).toLocaleDateString()}
                        </td>
                        <td className="p-3.5">
                          <span className="px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-900 border border-emerald-400 font-black text-[10px] uppercase">
                            Live Published
                          </span>
                        </td>
                        <td className="p-3.5 text-right whitespace-nowrap">
                          <Link
                            href={`/blog/${b.slug}`}
                            target="_blank"
                            className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg border border-black bg-white hover:bg-black hover:text-white transition-colors text-[11px] font-black uppercase"
                          >
                            <Eye className="w-3 h-3" />
                            <span>View</span>
                          </Link>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* ══════════════════════════════════════════════════════════════ */}
        {/* TAB: COMMUNITY POSTS & MODERATION                             */}
        {/* ══════════════════════════════════════════════════════════════ */}
        {activeTab === "community" && (
          <div className="rounded-3xl border-[3.5px] border-black bg-white p-6 sm:p-8 shadow-brutal space-y-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <h2 className="text-2xl font-black text-black font-display">
                  Community Student Forum
                </h2>
                <p className="text-xs font-bold text-neutral-600 mt-0.5">
                  View and moderate discussions, Hall of Fame reports, and student bug bounty doubts.
                </p>
              </div>
              <button
                onClick={loadDashboardData}
                className="btn-brutal btn-brutal-primary px-4 py-2 text-xs uppercase font-black flex items-center gap-1.5"
              >
                <RefreshCw className={`w-3.5 h-3.5 ${loadingData ? "animate-spin" : ""}`} />
                <span>Refresh Posts</span>
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {communityPosts.length === 0 ? (
                <div className="col-span-2 p-8 text-center text-neutral-500 font-bold border-2 border-dashed border-neutral-300 rounded-2xl">
                  No community posts found.
                </div>
              ) : (
                communityPosts.map((post) => (
                  <div
                    key={post.id}
                    className="p-5 rounded-2xl border-2 border-black bg-neutral-50 shadow-brutal-xs flex flex-col justify-between"
                  >
                    <div>
                      <div className="flex items-center justify-between gap-2 mb-2">
                        <span className="px-2.5 py-0.5 rounded-full border border-black bg-purple-200 text-purple-900 text-[10px] font-black uppercase">
                          {post.category}
                        </span>
                        <span className="text-[10px] text-neutral-500 font-medium">
                          {post.time || (post.created_at ? new Date(post.created_at).toLocaleDateString() : "")}
                        </span>
                      </div>
                      <h4 className="font-black text-black text-sm mb-1">{post.title}</h4>
                      <p className="text-xs font-bold text-neutral-700 line-clamp-3 mb-3">
                        {post.content}
                      </p>
                    </div>

                    <div className="flex items-center justify-between pt-3 border-t border-neutral-200 text-[11px] font-bold text-neutral-600">
                      <div className="flex items-center gap-1.5">
                        <span className="w-5 h-5 rounded-full bg-yellow-300 border border-black flex items-center justify-center text-[10px] font-black text-black">
                          {post.author.charAt(0)}
                        </span>
                        <span className="text-black font-black">{post.author}</span>
                        {post.role && <span className="text-neutral-400">· {post.role}</span>}
                      </div>
                      <div className="flex items-center gap-3">
                        <span className="flex items-center gap-1">
                          <ThumbsUp className="w-3 h-3 text-neutral-500" />
                          {post.likes || 0}
                        </span>
                        <span className="flex items-center gap-1">
                          <MessageSquare className="w-3 h-3 text-neutral-500" />
                          {post.comments ? post.comments.length : 0}
                        </span>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        )}

        {/* ══════════════════════════════════════════════════════════════ */}
        {/* TAB 4: USERS & ROLES                                         */}
        {/* ══════════════════════════════════════════════════════════════ */}
        {activeTab === "users" && (
          <div className="rounded-3xl border-[3.5px] border-black bg-white p-6 sm:p-8 shadow-brutal space-y-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <h2 className="text-2xl font-black text-black font-display">
                  User Profiles &amp; Role Administration
                </h2>
                <p className="text-xs font-bold text-neutral-600 mt-0.5">
                  Inspect student profiles and assign admin/instructor access with server validation.
                </p>
              </div>

              <div className="relative">
                <Search className="w-4 h-4 text-neutral-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={userSearch}
                  onChange={(e) => setUserSearch(e.target.value)}
                  placeholder="Search user email or name..."
                  className="pl-9 pr-3 py-2 rounded-xl border-2 border-black bg-neutral-50 text-xs font-bold focus:bg-white focus:outline-none w-56 sm:w-64"
                />
              </div>
            </div>

            <div className="overflow-x-auto rounded-2xl border-2 border-black">
              <table className="w-full text-left border-collapse text-xs">
                <thead>
                  <tr className="bg-violet-200 border-b-2 border-black text-black uppercase font-black tracking-wider text-[11px]">
                    <th className="p-3.5">Full Name / Alias</th>
                    <th className="p-3.5">Email Address</th>
                    <th className="p-3.5">Joined Date</th>
                    <th className="p-3.5">Assigned Role</th>
                  </tr>
                </thead>
                <tbody className="divide-y-2 divide-neutral-200 font-bold text-neutral-800">
                  {users.length === 0 ? (
                    <tr>
                      <td colSpan={4} className="p-8 text-center text-neutral-500 font-bold">
                        No user profiles found.
                      </td>
                    </tr>
                  ) : (
                    users.map((u) => (
                      <tr key={u.id} className="hover:bg-neutral-50 transition-colors">
                        <td className="p-3.5 font-black text-black">
                          {u.full_name || "Hacker Student"}
                        </td>
                        <td className="p-3.5 font-mono text-neutral-600">
                          {u.email}
                        </td>
                        <td className="p-3.5 text-neutral-500">
                          {new Date(u.created_at).toLocaleDateString()}
                        </td>
                        <td className="p-3.5">
                          <select
                            value={u.role}
                            onChange={(e) => handleUpdateUserRole(u.id, e.target.value)}
                            className={`px-3 py-1.5 rounded-xl border-2 border-black text-xs font-black uppercase focus:outline-none ${
                              u.role === "admin"
                                ? "bg-amber-300 text-black"
                                : u.role === "instructor"
                                ? "bg-sky-200 text-sky-950"
                                : "bg-neutral-100 text-neutral-800"
                            }`}
                          >
                            <option value="student">Student</option>
                            <option value="instructor">Instructor</option>
                            <option value="admin">Admin</option>
                          </select>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* ══════════════════════════════════════════════════════════════ */}
        {/* TAB 5: SERVER VALIDATION SUITE & TESTER                      */}
        {/* ══════════════════════════════════════════════════════════════ */}
        {activeTab === "validation" && (
          <div className="space-y-6">
            <div className="rounded-3xl border-[3.5px] border-black bg-white p-6 sm:p-8 shadow-brutal">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-2xl bg-amber-300 border-2 border-black flex items-center justify-center shadow-brutal-xs">
                  <ShieldCheck className="w-6 h-6 text-black stroke-[2.5]" />
                </div>
                <div>
                  <h2 className="text-2xl font-black text-black font-display">
                    Server-Side Validation Specifications
                  </h2>
                  <p className="text-xs font-bold text-neutral-600">
                    Comprehensive rules executed on the Node.js Next.js backend for all incoming payloads.
                  </p>
                </div>
              </div>

              {/* Grid of Validation Rules */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
                <div className="p-5 rounded-2xl border-2 border-black bg-neutral-50">
                  <div className="flex items-center gap-2 mb-2 font-black text-sm text-black">
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
                    <span>Email Validation</span>
                  </div>
                  <ul className="text-xs text-neutral-600 space-y-1.5 font-medium list-disc list-inside">
                    <li>Strict RFC 5322 regex conformance</li>
                    <li>Max length constraint (254 characters)</li>
                    <li>Normalized lowercase domain conversion</li>
                    <li>Rejection of whitespace &amp; malformed inputs</li>
                  </ul>
                </div>

                <div className="p-5 rounded-2xl border-2 border-black bg-neutral-50">
                  <div className="flex items-center gap-2 mb-2 font-black text-sm text-black">
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
                    <span>XSS &amp; Script Sanitization</span>
                  </div>
                  <ul className="text-xs text-neutral-600 space-y-1.5 font-medium list-disc list-inside">
                    <li>Strips dangerous null bytes (<code className="font-mono">\0</code>)</li>
                    <li>Regex removal of HTML tags (<code className="font-mono">&lt;script&gt;</code>)</li>
                    <li>Length truncation limits on all text blocks</li>
                    <li>Safe text output escaping</li>
                  </ul>
                </div>

                <div className="p-5 rounded-2xl border-2 border-black bg-neutral-50">
                  <div className="flex items-center gap-2 mb-2 font-black text-sm text-black">
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
                    <span>Enum Whitelist Guards</span>
                  </div>
                  <ul className="text-xs text-neutral-600 space-y-1.5 font-medium list-disc list-inside">
                    <li>Inquiries: <code className="font-mono">new, contacted, scheduled, completed, archived</code></li>
                    <li>Purchases: <code className="font-mono">active, pending, expired, refunded</code></li>
                    <li>Roles: <code className="font-mono">student, instructor, admin</code></li>
                    <li>Unauthorized values instantly rejected with 400</li>
                  </ul>
                </div>
              </div>

              {/* Interactive Validation Tester */}
              <div className="p-6 rounded-2xl border-[2.5px] border-black bg-neutral-900 text-white shadow-brutal-sm">
                <div className="flex items-center justify-between gap-4 mb-4">
                  <div className="flex items-center gap-2 font-display font-black text-base text-amber-400">
                    <Terminal className="w-5 h-5" />
                    <span>Live Server-Side Validation Sandbox</span>
                  </div>
                  <span className="text-[11px] font-mono text-neutral-400">Target: POST /api/inquiries</span>
                </div>

                <p className="text-xs text-neutral-300 mb-4">
                  Test malicious or malformed payloads against the live server endpoint to verify that the server returns HTTP 400 Bad Request and descriptive validation error messages:
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                  <div>
                    <label className="block text-[11px] font-mono text-neutral-400 mb-1">Name Payload</label>
                    <input
                      type="text"
                      value={testPayload.name}
                      onChange={(e) => setTestPayload({ ...testPayload, name: e.target.value })}
                      className="w-full px-3 py-2 rounded-lg bg-neutral-800 border border-neutral-700 font-mono text-xs text-white focus:outline-none focus:border-amber-400"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-mono text-neutral-400 mb-1">Email Payload</label>
                    <input
                      type="text"
                      value={testPayload.email}
                      onChange={(e) => setTestPayload({ ...testPayload, email: e.target.value })}
                      className="w-full px-3 py-2 rounded-lg bg-neutral-800 border border-neutral-700 font-mono text-xs text-white focus:outline-none focus:border-amber-400"
                    />
                  </div>
                </div>

                <div className="flex items-center gap-3 mb-4">
                  <button
                    onClick={runValidationTest}
                    disabled={validationTestLoading}
                    className="btn-brutal btn-brutal-primary px-4 py-2 text-xs uppercase font-black flex items-center gap-2"
                  >
                    {validationTestLoading ? <RefreshCw className="w-3.5 h-3.5 animate-spin" /> : <Terminal className="w-3.5 h-3.5" />}
                    <span>Dispatch Payload to Server</span>
                  </button>

                  <button
                    type="button"
                    onClick={() =>
                      setTestPayload({
                        name: "<script>alert('xss')</script> Rag",
                        email: "connect@thatraghavarora.in",
                        serviceType: "1:1 Live Guidance",
                        details: "Legitimate inquiry with script tags to test server sanitization.",
                      })
                    }
                    className="text-xs text-neutral-400 hover:text-white underline font-mono"
                  >
                    Load XSS Test
                  </button>

                  <button
                    type="button"
                    onClick={() =>
                      setTestPayload({
                        name: "A",
                        email: "notanemail",
                        serviceType: "1:1 Live Guidance",
                        details: "abc",
                      })
                    }
                    className="text-xs text-neutral-400 hover:text-white underline font-mono"
                  >
                    Load Malformed Test
                  </button>
                </div>

                {Boolean(validationTestResult) && (
                  <div className="p-4 rounded-xl bg-black border border-neutral-800 font-mono text-xs">
                    <div className="text-amber-400 font-bold mb-2">Live Server Response:</div>
                    <pre className="text-neutral-300 overflow-x-auto whitespace-pre-wrap">
                      {JSON.stringify(validationTestResult, null, 2)}
                    </pre>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* ══════════════════════════════════════════════════════════════ */}
        {/* TAB 6: PAID ROADMAP DEEP CURRICULUM                          */}
        {/* ══════════════════════════════════════════════════════════════ */}
        {activeTab === "roadmap" && <AdminRoadmapCurriculum />}
      </main>
    </div>

      {/* ══ MODAL 1: VIEW FULL INQUIRY DETAILS ═════════════════════════ */}
      {selectedInquiry && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl border-[3.5px] border-black p-6 sm:p-8 max-w-lg w-full shadow-brutal-xl space-y-4">
            <div className="flex items-center justify-between">
              <span className="px-2.5 py-0.5 rounded-full border border-black bg-amber-200 text-black text-[11px] font-black uppercase">
                {selectedInquiry.service_type}
              </span>
              <button
                onClick={() => setSelectedInquiry(null)}
                className="w-8 h-8 rounded-xl border-2 border-black flex items-center justify-center font-black text-sm hover:bg-black hover:text-white transition-colors"
              >
                ✕
              </button>
            </div>

            <h3 className="text-xl font-black text-black font-display">
              {selectedInquiry.name}
            </h3>

            <div className="space-y-2 text-xs font-bold text-neutral-700">
              <p>
                <span className="text-neutral-500">Email:</span>{" "}
                <span className="font-mono text-black">{selectedInquiry.email}</span>
              </p>
              {selectedInquiry.contact_handle && (
                <p>
                  <span className="text-neutral-500">Handle / Phone:</span>{" "}
                  <span className="font-mono text-black">{selectedInquiry.contact_handle}</span>
                </p>
              )}
              <p>
                <span className="text-neutral-500">Preferred Timeline:</span>{" "}
                <span className="text-black">{selectedInquiry.preferred_timeline || "Flexible"}</span>
              </p>
              <p>
                <span className="text-neutral-500">Received On:</span>{" "}
                <span className="text-black">
                  {new Date(selectedInquiry.created_at).toLocaleString()}
                </span>
              </p>
            </div>

            <div className="pt-2">
              <span className="block text-[11px] font-black uppercase text-neutral-500 mb-1">
                Project Details &amp; Requirements:
              </span>
              <div className="p-4 rounded-xl border-2 border-black bg-neutral-50 text-xs font-medium text-black leading-relaxed whitespace-pre-wrap max-h-48 overflow-y-auto">
                {selectedInquiry.details}
              </div>
            </div>

            <div className="pt-4 flex items-center gap-3">
              <a
                href={`mailto:${selectedInquiry.email}?subject=Regarding your inquiry for ${selectedInquiry.service_type}`}
                className="btn-brutal btn-brutal-primary text-xs uppercase font-black py-2.5 px-4 flex-1 text-center"
              >
                Reply Via Email
              </a>
              <button
                onClick={() => setSelectedInquiry(null)}
                className="btn-brutal btn-brutal-outline text-xs uppercase font-black py-2.5 px-4"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ══ MODAL 2: MANUAL ACCESS GRANT ══════════════════════════════ */}
      {showGrantModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl border-[3.5px] border-black p-6 sm:p-8 max-w-md w-full shadow-brutal-xl space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-black text-black font-display">
                Manual Roadmap / Course Unlock
              </h3>
              <button
                onClick={() => setShowGrantModal(false)}
                className="w-8 h-8 rounded-xl border-2 border-black flex items-center justify-center font-black text-sm hover:bg-black hover:text-white transition-colors"
              >
                ✕
              </button>
            </div>

            <p className="text-xs text-neutral-600 font-bold">
              Grant instant access to a student. All fields are validated server-side.
            </p>

            {grantValidationErrors.length > 0 && (
              <div className="p-3.5 rounded-xl border-2 border-red-500 bg-red-50 text-red-700 text-xs font-bold space-y-1">
                {grantValidationErrors.map((err, i) => (
                  <p key={i}>• {err}</p>
                ))}
              </div>
            )}

            <form onSubmit={handleManualGrantSubmit} className="space-y-3 text-xs">
              <div>
                <label className="block font-black uppercase text-black mb-1">
                  Student Email Address
                </label>
                <input
                  type="email"
                  value={grantData.userEmail}
                  onChange={(e) => setGrantData({ ...grantData, userEmail: e.target.value })}
                  placeholder="student@example.com"
                  required
                  className="w-full px-3 py-2.5 rounded-xl border-2 border-black bg-neutral-50 font-mono font-bold focus:bg-white focus:outline-none"
                />
              </div>

              <div>
                <label className="block font-black uppercase text-black mb-1">
                  Select Item to Unlock
                </label>
                <select
                  value={grantData.itemSlug}
                  onChange={(e) => {
                    const slug = e.target.value;
                    const title =
                      slug === "web-pentesting-cyber-security"
                        ? "Web Penetration Testing & Bug Bounty Roadmap"
                        : "Computer Networking from Scratch";
                    setGrantData({
                      ...grantData,
                      itemSlug: slug,
                      itemTitle: title,
                      itemType: slug === "web-pentesting-cyber-security" ? "roadmap" : "course",
                    });
                  }}
                  className="w-full px-3 py-2.5 rounded-xl border-2 border-black bg-neutral-50 font-bold focus:bg-white focus:outline-none"
                >
                  <option value="web-pentesting-cyber-security">
                    Web Penetration Testing &amp; Bug Bounty Roadmap
                  </option>
                  <option value="computer-networking">
                    Computer Networking from Scratch
                  </option>
                </select>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-black uppercase text-black mb-1">Amount</label>
                  <input
                    type="text"
                    value={grantData.amount}
                    onChange={(e) => setGrantData({ ...grantData, amount: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border-2 border-black bg-neutral-50 font-bold focus:bg-white focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block font-black uppercase text-black mb-1">Payment Method</label>
                  <select
                    value={grantData.paymentMethod}
                    onChange={(e) => setGrantData({ ...grantData, paymentMethod: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border-2 border-black bg-neutral-50 font-bold focus:bg-white focus:outline-none uppercase text-[11px]"
                  >
                    <option value="admin_grant">Admin Grant</option>
                    <option value="upi">UPI</option>
                    <option value="card">Card</option>
                    <option value="free">Free</option>
                  </select>
                </div>
              </div>

              <div className="pt-3 flex items-center gap-3">
                <button
                  type="submit"
                  disabled={grantSubmitting}
                  className="btn-brutal btn-brutal-primary text-xs uppercase font-black py-2.5 px-4 flex-1 text-center"
                >
                  {grantSubmitting ? "Granting..." : "Confirm & Unlock"}
                </button>
                <button
                  type="button"
                  onClick={() => setShowGrantModal(false)}
                  className="btn-brutal btn-brutal-outline text-xs uppercase font-black py-2.5 px-4"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ══ MODAL 3: CREATE & PUBLISH BLOG ════════════════════════════ */}
      {showCreateBlogModal && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-3xl border-[3.5px] border-black p-6 sm:p-8 max-w-2xl w-full shadow-brutal-xl space-y-4 my-8 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <BookOpen className="w-6 h-6 text-amber-500" />
                <h3 className="text-xl font-black text-black font-display">
                  Publish New Blog Writeup
                </h3>
              </div>
              <button
                onClick={() => setShowCreateBlogModal(false)}
                className="w-8 h-8 rounded-xl border-2 border-black flex items-center justify-center font-black text-sm hover:bg-black hover:text-white transition-colors cursor-pointer"
              >
                ✕
              </button>
            </div>

            <p className="text-xs text-neutral-600 font-bold">
              Writeups are immediately published to the public blog and persisted in the database.
            </p>

            {blogErrors.length > 0 && (
              <div className="p-3.5 rounded-xl border-2 border-red-500 bg-red-50 text-red-700 text-xs font-bold space-y-1">
                {blogErrors.map((err, i) => (
                  <p key={i}>• {err}</p>
                ))}
              </div>
            )}

            <form onSubmit={handleCreateBlogSubmit} className="space-y-4 text-xs">
              <div>
                <label className="block font-black uppercase text-black mb-1">
                  Article Title <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={newBlogData.title}
                  onChange={(e) => {
                    const title = e.target.value;
                    const autoSlug = title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
                    setNewBlogData({ ...newBlogData, title, slug: autoSlug });
                  }}
                  placeholder="e.g. How I Discovered an IDOR Exposing 50,000 Accounts"
                  required
                  className="w-full px-3.5 py-2.5 rounded-xl border-2 border-black bg-neutral-50 font-bold focus:bg-white focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block font-black uppercase text-black mb-1">
                    URL Slug
                  </label>
                  <input
                    type="text"
                    value={newBlogData.slug}
                    onChange={(e) => setNewBlogData({ ...newBlogData, slug: e.target.value })}
                    placeholder="how-i-found-idor-bug"
                    required
                    className="w-full px-3 py-2 rounded-xl border-2 border-black bg-neutral-50 font-mono text-xs font-bold focus:bg-white focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block font-black uppercase text-black mb-1">
                    Category
                  </label>
                  <select
                    value={newBlogData.category}
                    onChange={(e) => setNewBlogData({ ...newBlogData, category: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border-2 border-black bg-neutral-50 font-bold focus:bg-white focus:outline-none"
                  >
                    <option value="Cybersecurity">Cybersecurity</option>
                    <option value="Bug Bounty">Bug Bounty</option>
                    <option value="Tools & Automation">Tools &amp; Automation</option>
                    <option value="Web Pentesting">Web Pentesting</option>
                    <option value="Career & Learning">Career &amp; Learning</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block font-black uppercase text-black mb-1">
                  Tags (Comma separated)
                </label>
                <input
                  type="text"
                  value={newBlogData.tags}
                  onChange={(e) => setNewBlogData({ ...newBlogData, tags: e.target.value })}
                  placeholder="Bug Bounty, IDOR, Burp Suite, Recon"
                  className="w-full px-3 py-2 rounded-xl border-2 border-black bg-neutral-50 font-bold focus:bg-white focus:outline-none"
                />
              </div>

              <div>
                <label className="block font-black uppercase text-black mb-1">
                  Cover Image URL
                </label>
                <input
                  type="text"
                  value={newBlogData.coverImage}
                  onChange={(e) => setNewBlogData({ ...newBlogData, coverImage: e.target.value })}
                  placeholder="/images/hero-hacker.jpg"
                  className="w-full px-3 py-2 rounded-xl border-2 border-black bg-neutral-50 font-mono text-xs font-bold focus:bg-white focus:outline-none"
                />
              </div>

              <div>
                <label className="block font-black uppercase text-black mb-1">
                  Summary / Excerpt <span className="text-red-500">*</span>
                </label>
                <textarea
                  rows={2}
                  value={newBlogData.excerpt}
                  onChange={(e) => setNewBlogData({ ...newBlogData, excerpt: e.target.value })}
                  placeholder="A short punchy preview description of this writeup..."
                  required
                  className="w-full px-3.5 py-2 rounded-xl border-2 border-black bg-neutral-50 font-bold focus:bg-white focus:outline-none"
                />
              </div>

              <div>
                <label className="block font-black uppercase text-black mb-1">
                  Article Content (Markdown supported) <span className="text-red-500">*</span>
                </label>
                <textarea
                  rows={6}
                  value={newBlogData.content}
                  onChange={(e) => setNewBlogData({ ...newBlogData, content: e.target.value })}
                  placeholder="Write your technical writeup here with steps, methodology, tool commands and remediation tips..."
                  required
                  className="w-full px-3.5 py-2 rounded-xl border-2 border-black bg-neutral-50 font-mono text-xs font-medium focus:bg-white focus:outline-none"
                />
              </div>

              <div className="pt-2 flex items-center gap-3">
                <button
                  type="submit"
                  disabled={blogSubmitting}
                  className="btn-brutal btn-brutal-yellow text-xs uppercase font-black py-3 px-6 flex-1 text-center cursor-pointer shadow-brutal-sm"
                >
                  {blogSubmitting ? "Publishing..." : "Publish Article Live"}
                </button>
                <button
                  type="button"
                  onClick={() => setShowCreateBlogModal(false)}
                  className="btn-brutal btn-brutal-outline text-xs uppercase font-black py-3 px-4 cursor-pointer"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
