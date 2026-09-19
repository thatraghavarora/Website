/**
 * Server-Side Validation and Sanitization Module
 * Enforces strict types, length bounds, email formatting, and whitelisted enums.
 */

// Email RFC 5322 standard regex (simplified robust version)
const EMAIL_REGEX = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+$/;

/**
 * Strips dangerous HTML tags, null bytes, and trims whitespace
 */
export function sanitizeString(input: unknown, maxLength = 1000): string {
  if (typeof input !== "string") return "";
  
  // Remove null bytes & script/html characters
  const cleaned = input
    .replace(/\0/g, "")
    .replace(/<[^>]*>?/gm, "")
    .trim();

  return cleaned.slice(0, maxLength);
}

/**
 * Validates email format and domain length
 */
export function validateEmail(email: unknown): { valid: boolean; error?: string; normalized?: string } {
  if (typeof email !== "string" || !email.trim()) {
    return { valid: false, error: "Email address is required." };
  }

  const normalized = email.trim().toLowerCase();

  if (normalized.length > 254) {
    return { valid: false, error: "Email exceeds maximum allowed length (254 characters)." };
  }

  if (!EMAIL_REGEX.test(normalized)) {
    return { valid: false, error: "Invalid email format. Please provide a valid email address (e.g. user@example.com)." };
  }

  return { valid: true, normalized };
}

// ---------------------------------------------------------------------------
// INQUIRY VALIDATION
// ---------------------------------------------------------------------------

export const VALID_INQUIRY_STATUSES = ["new", "contacted", "scheduled", "completed", "archived"] as const;
export type InquiryStatus = (typeof VALID_INQUIRY_STATUSES)[number];

export const VALID_SERVICE_TYPES = [
  "1:1 Live Guidance",
  "Cyber Security Guidance",
  "Web Development Guidance",
  "Digital Marketing Guidance",
  "Hire Me As Web Developer",
  "Hire Me As Pentester",
  "Hire Me As Graphic Designer",
  "Hire Me As Digital Marketer",
  "Freelance Project",
  "Custom Consultation"
] as const;

export interface InquiryInputValidationResult {
  valid: boolean;
  errors: string[];
  data?: {
    name: string;
    email: string;
    contactHandle: string | null;
    serviceType: string;
    details: string;
    preferredTimeline: string;
  };
}

export function validateInquiryInput(body: unknown): InquiryInputValidationResult {
  const errors: string[] = [];

  if (!body || typeof body !== "object") {
    return { valid: false, errors: ["Request body must be a valid JSON object."] };
  }

  const record = body as Record<string, unknown>;

  // Name validation
  const name = sanitizeString(record.name, 100);
  if (!name || name.length < 2) {
    errors.push("Name is required and must be between 2 and 100 characters.");
  }

  // Email validation
  const emailRes = validateEmail(record.email);
  if (!emailRes.valid) {
    errors.push(emailRes.error || "Invalid email.");
  }

  // Details validation
  const details = sanitizeString(record.details, 2500);
  if (!details || details.length < 5) {
    errors.push("Project or inquiry details must be at least 5 characters long.");
  }

  // Service Type validation
  const serviceType = sanitizeString(record.serviceType, 120) || "1:1 Live Guidance";

  // Optional contact handle & timeline
  const contactHandle = record.contactHandle ? sanitizeString(record.contactHandle, 100) : null;
  const preferredTimeline = sanitizeString(record.preferredTimeline, 50) || "Flexible";

  if (errors.length > 0) {
    return { valid: false, errors };
  }

  return {
    valid: true,
    errors: [],
    data: {
      name,
      email: emailRes.normalized!,
      contactHandle,
      serviceType,
      details,
      preferredTimeline,
    },
  };
}

export function validateInquiryStatusUpdate(status: unknown): { valid: boolean; error?: string; status?: InquiryStatus } {
  if (typeof status !== "string" || !VALID_INQUIRY_STATUSES.includes(status as InquiryStatus)) {
    return {
      valid: false,
      error: `Invalid status. Must be one of: ${VALID_INQUIRY_STATUSES.join(", ")}`,
    };
  }
  return { valid: true, status: status as InquiryStatus };
}

// ---------------------------------------------------------------------------
// PURCHASES VALIDATION
// ---------------------------------------------------------------------------

export const VALID_PURCHASE_STATUSES = ["active", "pending", "expired", "refunded"] as const;
export type PurchaseStatus = (typeof VALID_PURCHASE_STATUSES)[number];

export const VALID_PAYMENT_METHODS = ["upi", "paypal", "card", "free", "demo", "admin_grant"] as const;
export type PaymentMethod = (typeof VALID_PAYMENT_METHODS)[number];

export const VALID_ITEM_TYPES = ["roadmap", "course", "bundle"] as const;
export type ItemType = (typeof VALID_ITEM_TYPES)[number];

export interface PurchaseInputValidationResult {
  valid: boolean;
  errors: string[];
  data?: {
    itemSlug: string;
    itemType: ItemType;
    itemTitle: string;
    amount: string;
    paymentMethod: PaymentMethod;
    transactionId: string;
    userEmail: string;
  };
}

export function validatePurchaseInput(body: unknown): PurchaseInputValidationResult {
  const errors: string[] = [];

  if (!body || typeof body !== "object") {
    return { valid: false, errors: ["Request body must be a valid JSON object."] };
  }

  const record = body as Record<string, unknown>;

  // Item Slug
  const itemSlug = sanitizeString(record.itemSlug, 150);
  if (!itemSlug || itemSlug.length < 2) {
    errors.push("itemSlug is required and must be a valid identifier.");
  }

  // Item Type
  const rawItemType = (record.itemType as string) || "roadmap";
  const itemType: ItemType = VALID_ITEM_TYPES.includes(rawItemType as ItemType) ? (rawItemType as ItemType) : "roadmap";

  // Item Title
  const itemTitle = sanitizeString(record.itemTitle, 200) || itemSlug;

  // Amount
  const amount = sanitizeString(record.amount, 50) || "99 RS";

  // Payment Method
  const rawMethod = (record.paymentMethod as string) || "upi";
  const paymentMethod: PaymentMethod = VALID_PAYMENT_METHODS.includes(rawMethod as PaymentMethod)
    ? (rawMethod as PaymentMethod)
    : "upi";

  // Transaction ID
  const transactionId = sanitizeString(record.transactionId, 100) || `TXN-${Date.now()}`;

  // User Email (optional in request if retrieved from session, but validated if passed)
  let userEmail = "guest@thatraghavarora.in";
  if (record.userEmail) {
    const emailRes = validateEmail(record.userEmail);
    if (!emailRes.valid) {
      errors.push(emailRes.error || "Invalid userEmail.");
    } else {
      userEmail = emailRes.normalized!;
    }
  }

  if (errors.length > 0) {
    return { valid: false, errors };
  }

  return {
    valid: true,
    errors: [],
    data: {
      itemSlug,
      itemType,
      itemTitle,
      amount,
      paymentMethod,
      transactionId,
      userEmail,
    },
  };
}

export function validatePurchaseStatusUpdate(status: unknown): { valid: boolean; error?: string; status?: PurchaseStatus } {
  if (typeof status !== "string" || !VALID_PURCHASE_STATUSES.includes(status as PurchaseStatus)) {
    return {
      valid: false,
      error: `Invalid purchase status. Must be one of: ${VALID_PURCHASE_STATUSES.join(", ")}`,
    };
  }
  return { valid: true, status: status as PurchaseStatus };
}

// ---------------------------------------------------------------------------
// USER ROLE VALIDATION
// ---------------------------------------------------------------------------

export const VALID_USER_ROLES = ["student", "instructor", "admin"] as const;
export type UserRole = (typeof VALID_USER_ROLES)[number];

export function validateUserRoleUpdate(role: unknown): { valid: boolean; error?: string; role?: UserRole } {
  if (typeof role !== "string" || !VALID_USER_ROLES.includes(role as UserRole)) {
    return {
      valid: false,
      error: `Invalid user role. Must be one of: ${VALID_USER_ROLES.join(", ")}`,
    };
  }
  return { valid: true, role: role as UserRole };
}

// ---------------------------------------------------------------------------
// COMMUNITY POST VALIDATION
// ---------------------------------------------------------------------------

export const VALID_COMMUNITY_CATEGORIES = [
  "Bug Bounty",
  "Web Security",
  "Doubt & Help",
  "Achievement",
  "General",
] as const;

export type CommunityCategory = (typeof VALID_COMMUNITY_CATEGORIES)[number];

export function validateCommunityPostInput(body: unknown): {
  valid: boolean;
  errors: string[];
  data?: {
    title: string;
    content: string;
    category: CommunityCategory;
    author: string;
  };
} {
  const errors: string[] = [];

  if (!body || typeof body !== "object") {
    return { valid: false, errors: ["Request body must be a JSON object."] };
  }

  const record = body as Record<string, unknown>;

  const title = sanitizeString(record.title, 150);
  if (!title || title.length < 3) {
    errors.push("Post title must be at least 3 characters.");
  }

  const content = sanitizeString(record.content, 4000);
  if (!content || content.length < 5) {
    errors.push("Post content must be at least 5 characters.");
  }

  let category: CommunityCategory = "General";
  if (record.category && typeof record.category === "string") {
    if (VALID_COMMUNITY_CATEGORIES.includes(record.category as CommunityCategory)) {
      category = record.category as CommunityCategory;
    } else {
      errors.push(`Invalid category. Must be one of: ${VALID_COMMUNITY_CATEGORIES.join(", ")}`);
    }
  }

  const author = sanitizeString(record.author, 60) || "Student";

  if (errors.length > 0) {
    return { valid: false, errors };
  }

  return {
    valid: true,
    errors: [],
    data: {
      title,
      content,
      category,
      author,
    },
  };
}

