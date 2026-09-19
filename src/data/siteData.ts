export interface Project {
  slug: string;
  title: string;
  subtitle: string;
  description: string;
  fullDescription: string;
  category: string;
  tags: string[];
  accentColor: string; // brutalist card bg
  textColor: string;
  darkCard?: boolean;
  image?: string;
  featured: boolean;
  link: string;
  github?: string;
  stats?: { label: string; value: string }[];
  features?: string[];
  challenges?: string[];
  techStack?: string[];
}

export interface Course {
  slug: string;
  title: string;
  subtitle: string;
  description: string;
  thumbnail: string;
  level: "Beginner" | "Intermediate" | "Advanced" | "All Levels";
  duration: string;
  lessonsCount: number;
  studentsCount: number;
  rating: number;
  reviewsCount: number;
  price: number | string;
  originalPrice?: number | string;
  featured: boolean;
  category: string;
  badge?: string;
  instructor: {
    name: string;
    role: string;
    bio: string;
    avatar: string;
  };
  whatYouWillLearn: string[];
  requirements: string[];
  curriculum: {
    sectionTitle: string;
    lectures: { title: string; duration: string; freePreview?: boolean }[];
  }[];
  faqs: { question: string; answer: string }[];
}

export interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  category: "Cybersecurity" | "Bug Bounty" | "Development" | "Learning" | "Career";
  date: string;
  readTime: string;
  accentColor: string;
  author: {
    name: string;
    role: string;
    avatar: string;
  };
  tags: string[];
}

export interface Testimonial {
  name: string;
  role: string;
  avatar: string;
  quote: string;
  rating: number;
  companyOrCollege?: string;
}

export interface Service {
  id: string;
  title: string;
  tagline: string;
  iconName: string;
  accentBg: string; // hex or tailwind class
  badgeColor: string;
  items: string[];
  description: string;
}

export const siteProfile = {
  brand: "thatraghavarora",
  name: "Raghav Arora",
  handle: "@thatraghavarora",
  heroLabel: "CYBERSECURITY × DEVELOPMENT × LEARNING",
  headline: ["HI, I'M", "RAGHAV", "ARORA"],
  subtitle: "Cyber Security Enthusiast | Full Stack Developer | Bug Bounty Hunter | Educator | Entrepreneur",
  heroDescription: "Building a safer digital world through code, creativity and curiosity. I explore vulnerabilities, build solutions, share knowledge and help others grow in tech.",
  aboutText: "I'm Raghav Arora, a BCA (Cyber Security). A bug bounty hunter, full stack developer, and the founder of Webpeaker. I love exploring technology, finding vulnerabilities, building products, and sharing knowledge through my content and courses.",
  stats: [
    { value: "30+", label: "Vulnerabilities Reported" },
    { value: "7+", label: "Hackathons" },
    { value: "50+", label: "Organizations Secured" },
    { value: "4+", label: "Projects Built" },
    { value: "1000+", label: "Students Reached" }
  ],
  quote: "A SAFER DIGITAL WORLD STARTS WITH A CURIOUS MIND.",
  identityPills: [
    { title: "Cyber Specialist", desc: "BCA (Cyber Security)", icon: "GraduationCap" },
    { title: "Developer", desc: "Full Stack Next.js, Node & React", icon: "Code2" },
    { title: "Bug Hunter", desc: "Hall of Fames & VAPT Expert", icon: "ShieldAlert" },
    { title: "Entrepreneur", desc: "Founder of Webpeaker", icon: "Briefcase" },
    { title: "Educator", desc: "Mentored 1000+ Students in Tech", icon: "BookOpen" }
  ],
  socials: {
    linkedin: "https://linkedin.com/in/raghavarora",
    instagram: "https://instagram.com/thatraghavarora",
    github: "https://github.com/raghavarora",
    x: "https://twitter.com/raghavarora",
    youtube: "https://youtube.com/@thatraghavarora",
    email: "contact@thatraghavarora.com"
  }
};

export const trustedLogos = [
  { name: "NASA", role: "Hall of Fame / Vulnerability Disclosure", color: "#105BD8", badge: "Hall of Fame" },
  { name: "World Health Organization", role: "Responsible Disclosure", color: "#008DC9", badge: "Acknowledged" },
  { name: "NOKIA", role: "Security Acknowledgement", color: "#124191", badge: "Acknowledged" },
  { name: "Panasonic", role: "Security Vulnerability Report", color: "#004098", badge: "Recognized" },
  { name: "Jio", role: "Bug Bounty / Security Program", color: "#0A2885", badge: "Recognized" },
  { name: "Swiggy", role: "Application VAPT Program", color: "#FC8019", badge: "Security" },
  { name: "Zepto", role: "Security Research", color: "#8000FF", badge: "Recognized" },
  { name: "Lenskart", role: "Web Application VAPT", color: "#000042", badge: "Secured" },
  { name: "TCS", role: "Campus Hackathon & Security", color: "#E60000", badge: "Recognized" }
];

export const services: Service[] = [
  {
    id: "cyber-security",
    title: "Cyber Security",
    tagline: "Offensive & Defensive Security",
    iconName: "ShieldCheck",
    accentBg: "bg-[#DDD6FE]", // Pastel Purple
    badgeColor: "bg-[#8B5CF6]",
    items: [
      "Web Penetration Testing",
      "API Security Testing",
      "VAPT Audits",
      "Bug Bounty Hunting",
      "Security Research & Disclosure"
    ],
    description: "Thorough vulnerability assessments and penetration testing using modern OWASP methodology to protect digital assets before malicious attackers find zero-days."
  },
  {
    id: "web-development",
    title: "Web Development",
    tagline: "High-Performance Modern Web Apps",
    iconName: "Code",
    accentBg: "bg-[#FEF08A]", // Pastel Yellow
    badgeColor: "bg-[#EAB308]",
    items: [
      "Full Stack Development",
      "WordPress / CMS Solutions",
      "E-Commerce Websites",
      "Custom Web Applications",
      "Website Maintenance & Speed"
    ],
    description: "Production-ready, highly responsive websites built with Next.js, React, Tailwind CSS, secure backends, and flawless brutalist aesthetics."
  },
  {
    id: "digital-marketing",
    title: "Digital Marketing",
    tagline: "Organic Growth & Visibility",
    iconName: "Megaphone",
    accentBg: "bg-[#BAE6FD]", // Pastel Sky Blue
    badgeColor: "bg-[#0284C7]",
    items: [
      "SEO & High PPC Campaigns",
      "Social Media Marketing",
      "Technical Content Strategy",
      "Personal & Brand Strategy",
      "Performance Marketing Funnels"
    ],
    description: "Engineered growth strategies that blend technical SEO, viral cybersecurity educational content, and data-backed performance marketing."
  },
  {
    id: "design-branding",
    title: "Design & Branding",
    tagline: "Neo-Brutalist & Modern Identity",
    iconName: "Palette",
    accentBg: "bg-[#FECDD3]", // Pastel Rose/Pink
    badgeColor: "bg-[#F43F5E]",
    items: [
      "UI/UX Design Systems",
      "Graphic Designing",
      "Brand Identity & Styleguides",
      "Social Media Creatives",
      "Marketing & Ad Collaterals"
    ],
    description: "Striking neo-brutalist and high-contrast editorial design systems that grab attention, stand out from generic corporate templates, and drive conversions."
  }
];

export const projects: Project[] = [
  {
    slug: "crypto-whatsapp",
    title: "CryptoSend",
    subtitle: "Transfer Crypto Currency Through WhatsApp",
    description: "A revolutionary platform that lets you send and receive cryptocurrency directly through WhatsApp messages — no wallet apps, no complex UIs, just a simple chat.",
    fullDescription: "CryptoSend simplifies blockchain payments by leveraging WhatsApp's 2 billion+ user base. Users can send crypto by simply messaging a phone number, making crypto as easy as sending a text. Built with Node.js, WhatsApp Business API, and Web3 integration.",
    category: "Blockchain / FinTech",
    tags: ["WhatsApp", "Crypto", "Web3", "Node.js"],
    accentColor: "bg-[#18181B]",
    textColor: "text-white",
    darkCard: true,
    featured: true,
    link: "https://github.com/raghavarora/crypto-whatsapp",
    github: "https://github.com/raghavarora/crypto-whatsapp",
    stats: [
      { label: "Chains Supported", value: "3+" },
      { label: "Avg Transfer Time", value: "<5 sec" },
      { label: "Integration", value: "WhatsApp API" }
    ],
    features: [
      "Send crypto via WhatsApp message to any phone number",
      "Multi-chain support: ETH, BNB, MATIC",
      "Automatic wallet creation for new users",
      "Real-time balance and transaction notifications"
    ],
    techStack: ["Node.js", "WhatsApp Business API", "Web3.js", "Ethers.js", "MongoDB"]
  },
  {
    slug: "whatsapp-auth",
    title: "WhatsApp Auth",
    subtitle: "FREE WhatsApp Based Authentication System",
    description: "An open-source, completely free authentication system that uses WhatsApp OTP instead of SMS or email — works globally with zero per-message cost.",
    fullDescription: "WhatsApp Auth System replaces expensive SMS OTP services with WhatsApp-based one-time passwords. Developers can drop in this system to provide free, reliable authentication to their users. Works via WhatsApp Business API or unofficial bridges.",
    category: "Developer Tool / Open Source",
    tags: ["WhatsApp", "Auth", "OTP", "Open Source"],
    accentColor: "bg-[#DCFCE7]",
    textColor: "text-black",
    featured: true,
    link: "https://github.com/raghavarora/whatsapp-auth",
    github: "https://github.com/raghavarora/whatsapp-auth",
    stats: [
      { label: "Cost", value: "FREE" },
      { label: "Setup Time", value: "<10 min" },
      { label: "License", value: "Open Source" }
    ],
    features: [
      "WhatsApp OTP instead of costly SMS gateways",
      "Easy integration with any Node.js / Next.js app",
      "Configurable OTP expiry and retry limits",
      "Works globally where WhatsApp is available"
    ],
    techStack: ["Node.js", "Express", "WhatsApp Business API", "Redis", "JWT"]
  },
  {
    slug: "healhack",
    title: "HealHack",
    subtitle: "Nani Maa Ke Nuskhe — The Desi Health Reel App",
    description: "An app that shares traditional Indian home remedies (nuskhe) in a reel/feed format — like Instagram but for nani maa's time-tested health tips.",
    fullDescription: "HealHack combines ancient Ayurvedic wisdom with a modern social media experience. Users discover, save, and share short-form video and card content featuring home remedies and traditional health tips. AI curates personalized remedy feeds based on health queries.",
    category: "HealthTech / Social",
    tags: ["Health", "AI", "Mobile", "Social"],
    accentColor: "bg-[#FEF08A]",
    textColor: "text-black",
    featured: true,
    link: "https://healhack.tech",
    github: "https://github.com/raghavarora/healhack",
    stats: [
      { label: "Hackathon Award", value: "1st Place" },
      { label: "Remedies Database", value: "500+" },
      { label: "AI Accuracy", value: "92%" }
    ],
    features: [
      "Reel-style feed for browsing Ayurvedic home remedies",
      "AI-powered remedy recommendations by symptom",
      "Community sharing and saving of traditional nuskhe",
      "Vernacular language support (Hindi, Hinglish)"
    ],
    techStack: ["React Native", "Next.js", "OpenAI API", "Supabase", "Tailwind CSS"]
  },
  {
    slug: "airbomb",
    title: "AirBomb",
    subtitle: "WiFi Pentesting Tool",
    description: "A powerful command-line WiFi penetration testing toolkit for security researchers — automates network discovery, handshake capture, and deauth attacks in a controlled lab environment.",
    fullDescription: "AirBomb is a Python-based WiFi security auditing tool built for ethical hackers and security researchers. It automates the most common wireless penetration testing tasks including network enumeration, WPA handshake capture, deauthentication attacks, and evil twin AP setup — all within authorized test environments.",
    category: "Security Tool / Open Source",
    tags: ["WiFi", "Pentesting", "Python", "CLI"],
    accentColor: "bg-[#EDE9FE]",
    textColor: "text-black",
    featured: true,
    link: "https://github.com/raghavarora/airbomb",
    github: "https://github.com/raghavarora/airbomb",
    stats: [
      { label: "Attack Modules", value: "8+" },
      { label: "Language", value: "Python" },
      { label: "Target", value: "Kali Linux" }
    ],
    features: [
      "Automated WPA/WPA2 handshake capture",
      "Deauthentication and disassociation attack modules",
      "Evil Twin Access Point for credential harvesting",
      "Network discovery and client enumeration"
    ],
    techStack: ["Python", "Scapy", "Aircrack-ng", "Bash", "Linux"]
  },
  {
    slug: "lookoninternet",
    title: "LookOnInternet",
    subtitle: "OSINT Reconnaissance Tool",
    description: "An OSINT (Open Source Intelligence) tool that aggregates public data from across the internet to build detailed profiles — for ethical security research and digital investigations.",
    fullDescription: "LookOnInternet is a powerful OSINT framework that scrapes and correlates publicly available data from social networks, domain registries, WHOIS, Shodan, and other open data sources. It visualizes connections and generates clean intelligence reports for security researchers.",
    category: "OSINT / Security Research",
    tags: ["OSINT", "Python", "Recon", "Security"],
    accentColor: "bg-[#E0F2FE]",
    textColor: "text-black",
    featured: true,
    link: "https://github.com/raghavarora/lookoninternet",
    github: "https://github.com/raghavarora/lookoninternet",
    stats: [
      { label: "Data Sources", value: "15+" },
      { label: "Report Types", value: "HTML + JSON" },
      { label: "Type", value: "CLI + Web UI" }
    ],
    features: [
      "Domain, IP, email and username intelligence gathering",
      "Shodan, WHOIS, DNSDumpster and social media lookups",
      "Visual relationship graph between discovered entities",
      "Export reports as HTML, PDF and JSON formats"
    ],
    techStack: ["Python", "Shodan API", "Requests", "BeautifulSoup", "FastAPI"]
  },
  {
    slug: "webpeaker",
    title: "Webpeaker",
    subtitle: "Cyber Security & Digital Marketing Agency",
    description: "A comprehensive digital agency providing high-grade penetration testing, VAPT, modern web engineering, and ROI-driven marketing solutions.",
    fullDescription: "Founded by Raghav Arora, Webpeaker bridges the critical gap between offensive cybersecurity and cutting-edge web growth. Delivering full-stack web architectures hardened against modern OWASP Top 10 exploits alongside targeted performance marketing.",
    category: "Agency / Security",
    tags: ["Web", "Security", "Business"],
    accentColor: "bg-[#18181B]", // Dark brutalist card
    textColor: "text-white",
    darkCard: true,
    featured: true,
    link: "https://webpeaker.com",
    github: "https://github.com/raghavarora/webpeaker",
    stats: [
      { label: "Active Clients", value: "25+" },
      { label: "Vulnerabilities Patched", value: "140+" },
      { label: "Average Client ROI", value: "3.4x" }
    ],
    features: [
      "Automated and manual web vulnerability scanning pipeline",
      "Modern Next.js & React headless CMS architecture",
      "Enterprise lead qualification and CRM integration",
      "Real-time security auditing reports for stakeholders"
    ],
    techStack: ["Next.js", "TypeScript", "Tailwind CSS", "Node.js", "PostgreSQL", "Docker"]
  },
  {
    slug: "cyberhelper",
    title: "Cyberhelper",
    subtitle: "A Global Cyber Security Platform",
    description: "An intuitive cybersecurity toolkit and community portal designed to democratize threat intelligence, OSINT recon, and bug bounty workflows.",
    fullDescription: "Cyberhelper is built for aspiring penetration testers, ethical hackers, and security teams. It aggregates threat feeds, provides interactive recon utilities (subdomain enumeration, header analysis, CVE lookups), and hosts curated writeups.",
    category: "Security Platform",
    tags: ["Security", "Platform", "Global"],
    accentColor: "bg-[#E0F2FE]", // Light Sky Blue
    textColor: "text-black",
    featured: true,
    link: "https://cyberhelper.io",
    github: "https://github.com/raghavarora/cyberhelper",
    stats: [
      { label: "Community Waitlist", value: "2,400+" },
      { label: "Tools Integrated", value: "18" },
      { label: "Supported Threat Feeds", value: "12" }
    ],
    features: [
      "One-click OSINT recon dashboard for target domains",
      "Live CVE vulnerability search and severity calculator",
      "Interactive checklists for OWASP Web & Mobile VAPT",
      "Student learning tracks with step-by-step CTF challenges"
    ],
    techStack: ["React", "FastAPI", "Python", "Tailwind CSS", "Redis", "Supabase"]
  },
  {
    slug: "face-auth-library",
    title: "Face Auth Library",
    subtitle: "Face Authentication System for Library Management",
    description: "A computer-vision powered face recognition system that automates student authentication and book issue/return tracking in a library — no ID cards needed.",
    fullDescription: "Face Authentication of Library Management replaces traditional ID card scanning with real-time face recognition. Built using Python and OpenCV, it identifies registered students instantly via webcam, logs entry/exit timestamps, and manages book issuance records — all secured with encrypted face embeddings.",
    category: "AI / Computer Vision",
    tags: ["Python", "OpenCV", "AI", "Face Recognition"],
    accentColor: "bg-[#DCFCE7]",
    textColor: "text-black",
    featured: false,
    link: "https://github.com/raghavarora/face-auth-library",
    github: "https://github.com/raghavarora/face-auth-library",
    stats: [
      { label: "Recognition Speed", value: "<1 sec" },
      { label: "Accuracy", value: "97%+" },
      { label: "Students Managed", value: "500+" }
    ],
    features: [
      "Real-time face recognition via webcam using OpenCV + face_recognition lib",
      "Automated book issue & return logging with timestamps",
      "Encrypted face embeddings — no raw images stored",
      "Admin dashboard with student registration and audit logs"
    ],
    techStack: ["Python", "OpenCV", "face_recognition", "SQLite", "Tkinter"]
  },
  {
    slug: "password-generator",
    title: "Password Generator",
    subtitle: "Cryptographically Secure Passphrase & Key Tool",
    description: "An open-source, client-side cryptographic password and passkey generator with real-time entropy calculation and zero data persistence.",
    fullDescription: "Engineered for cybersecurity professionals and privacy advocates, this utility leverages the Web Crypto API to generate high-entropy passwords, memorable diceware passphrases, and 2FA seed strings right in the browser with 100% offline security.",
    category: "Utility / Open Source",
    tags: ["JavaScript", "Tool", "Open Source"],
    accentColor: "bg-[#EDE9FE]", // Light Purple
    textColor: "text-black",
    featured: true,
    link: "https://passwords.thatraghavarora.com",
    github: "https://github.com/raghavarora/secure-password-generator",
    stats: [
      { label: "GitHub Stars", value: "320+" },
      { label: "Zero Logs", value: "100% Client-side" },
      { label: "Monthly Users", value: "15,000+" }
    ],
    features: [
      "Hardware-accelerated CSPRNG using Web Crypto API",
      "Real-time zxcvbn password crack time estimation",
      "Customizable character sets, separators, and diceware wordlists",
      "Dark neo-brutalist UI with instant one-click copy and sound effects"
    ],
    techStack: ["TypeScript", "Vanilla JS", "Tailwind CSS", "Web Crypto API"]
  },
  {
    slug: "drug-detection-system",
    title: "Drug Detection System",
    subtitle: "AI / Computer Vision Chemical & Substance Classifier",
    description: "A research concept and proof-of-concept AI system utilizing computer vision and spectroscopic data to detect illicit chemical compounds.",
    fullDescription: "Developed as an academic research concept, this project investigates how deep learning models trained on Raman spectroscopy and high-resolution optical imagery can assist border safety and forensic teams in identifying hazardous chemicals quickly and safely.",
    category: "AI / Security Research",
    tags: ["AI", "Research", "Security", "Python"],
    accentColor: "bg-[#FEF9C3]", // Light Yellow
    textColor: "text-black",
    featured: false,
    link: "https://github.com/raghavarora/drug-detection-ai",
    github: "https://github.com/raghavarora/drug-detection-ai",
    stats: [
      { label: "Compounds Cataloged", value: "120+" },
      { label: "Model Architecture", value: "ResNet-50 + SVM" },
      { label: "Validation Accuracy", value: "94.6%" }
    ],
    features: [
      "Spectral data preprocessing and baseline subtraction pipeline",
      "Real-time classification confidence metrics and false-positive guards",
      "Comprehensive forensic export logs for law enforcement audits"
    ],
    techStack: ["Python", "PyTorch", "OpenCV", "Scikit-Learn", "Streamlit"]
  },
  {
    slug: "portfolio-website",
    title: "thatraghavarora Portfolio",
    subtitle: "The Neo-Brutalist Digital Playground",
    description: "Personal website, educational academy, and cybersecurity archive built with Next.js, TypeScript, and custom editorial hand-drawn assets.",
    fullDescription: "The very site you are exploring right now! Built from scratch to prove that personal portfolios can break away from sterile corporate SaaS templates with bold ink typography, playful doodles, and brutalist physical interactions.",
    category: "Web / Portfolio",
    tags: ["Next.js", "Design", "Cybersecurity"],
    accentColor: "bg-[#FBCFE8]", // Pink
    textColor: "text-black",
    featured: false,
    link: "https://thatraghavarora.com",
    github: "https://github.com/raghavarora/thatraghavarora",
    stats: [
      { label: "Lighthouse Score", value: "99" },
      { label: "Design System", value: "Neo-Brutalism" },
      { label: "Handmade Doodles", value: "100%" }
    ],
    features: [
      "Subtle physical hover animations and hard offset shadows",
      "Integrated course marketplace with interactive syllabus and enrollment",
      "Interactive dark & light mode support with zero layout shift",
      "Complete responsive breakdown across mobile, tablet and desktop"
    ],
    techStack: ["Next.js App Router", "TypeScript", "Tailwind CSS", "Canvas Confetti"]
  }
];

export const courses: Course[] = [
  {
    slug: "computer-networking",
    title: "Computer Networking for Cyber Security",
    subtitle: "The Complete Networking Blueprint for Ethical Hackers & Security Analysts",
    description: "Master computer networks from the ground up: Topologies, OSI & TCP/IP models, Routers, Layer 2/3 Switches, Firewalls, Critical Ports, Subnetting, and Real-world Packet Analysis with Wireshark.",
    thumbnail: "/images/course-hacker.jpg",
    level: "All Levels",
    duration: "Coming Soon",
    lessonsCount: 45,
    studentsCount: 0,
    rating: 5.0,
    reviewsCount: 0,
    price: "$XX",
    originalPrice: "$XX",
    featured: true,
    category: "Cybersecurity",
    badge: "Coming Soon",
    instructor: {
      name: "Raghav Arora",
      role: "Cyber Security Specialist & Ethical Hacker",
      bio: "BCA (Cyber Security) & bug bounty hunter acknowledged by NASA, WHO, and Fortune 500s. Passionate about deconstructing network architectures and securing digital infrastructure.",
      avatar: "/images/about-hacker.jpg"
    },
    whatYouWillLearn: [
      "Core Network Architectures: Understand LAN, WAN, MAN, and how data packets traverse the global internet",
      "Network Topologies: Star, Mesh, Bus, Ring, and Hybrid topologies with Single Point of Failure (SPOF) analysis",
      "Hardware Deep-Dive: Routers, Layer-2/Layer-3 Switches, Hubs, Access Points, and Default Gateways",
      "Crucial Ports & Protocols: TCP vs UDP, Handshakes, and high-risk ports (21, 22, 23, 25, 53, 80, 443, 445, 3389)",
      "IP Addressing & Subnetting: IPv4 vs IPv6, Public vs Private IPs (RFC 1918), CIDR notation, Subnet Masks, and NAT",
      "Layer 2 Attacks & Defenses: MAC Table flooding, ARP Poisoning/Spoofing, VLAN Hopping, and Dynamic ARP Inspection",
      "Firewalls & Defense Systems: Stateful/Stateless Inspection, Next-Gen Firewalls (NGFW), IDS/IPS, Proxies, and VPNs",
      "Hands-On Traffic Analysis: Capture, filter, and dissect real network traffic using Wireshark and tcpdump",
      "Network Scanning & Recon: Master Nmap stealth scans, port sweeping, service detection, and OS fingerprinting"
    ],
    requirements: [
      "Any PC/Laptop running Windows, macOS, or Linux (minimum 4GB RAM)",
      "Curiosity about how computers talk to each other and how hackers intercept data",
      "No prior networking or programming experience required — covers zero to hero"
    ],
    curriculum: [
      {
        sectionTitle: "Module 1: Foundations of Computer Networks & Security Architecture",
        lectures: [
          { title: "What is a Computer Network? LAN, WAN, MAN, WLAN, and SAN Explained", duration: "18:20", freePreview: true },
          { title: "The OSI 7-Layer Model: Security & Attack Surfaces at Each Layer", duration: "28:45", freePreview: true },
          { title: "TCP/IP 4-Layer Model vs OSI Model: Real-World Protocol Mapping", duration: "22:10" },
          { title: "Packet Anatomy: Headers, Payloads, MTU, Encapsulation & Decapsulation", duration: "25:30" },
          { title: "Introduction to Traffic Analysis: Setting Up Wireshark & tcpdump", duration: "20:15" }
        ]
      },
      {
        sectionTitle: "Module 2: Network Topologies & Architectural Vulnerabilities",
        lectures: [
          { title: "Physical vs Logical Network Topologies: Star, Mesh, Bus, Ring & Hybrid", duration: "24:00", freePreview: true },
          { title: "Single Point of Failure (SPOF) Analysis & Fault Tolerance in Modern Networks", duration: "19:30" },
          { title: "Enterprise Perimeter Design: Demilitarized Zones (DMZ) & Screened Subnets", duration: "26:40" },
          { title: "Network Segmentation & Air-Gapping for High-Security Environments", duration: "21:15" }
        ]
      },
      {
        sectionTitle: "Module 3: Network Hardware & Devices (Routers, Switches & Hubs)",
        lectures: [
          { title: "Hubs vs Switches vs Routers: Broadcast Domains, Collision Domains & Security", duration: "27:50", freePreview: true },
          { title: "Layer 2 Switches & MAC Address Tables: How CAM Table Flooding Works", duration: "32:10" },
          { title: "Virtual LANs (VLANs), 802.1Q Trunking & VLAN Hopping Attack Vectors", duration: "30:45" },
          { title: "Routers & Routing Tables: Static Routing, OSPF, BGP & Route Poisoning", duration: "35:20" },
          { title: "Default Gateways, NAT (Network Address Translation), PAT & Port Forwarding", duration: "28:15" },
          { title: "Hardware Hardening: Port Security, 802.1X Network Access Control (NAC)", duration: "24:50" }
        ]
      },
      {
        sectionTitle: "Module 4: IP Addressing, Subnetting & Critical Network Services",
        lectures: [
          { title: "IPv4 Architecture: Classes, Public vs Private RFC 1918 Ranges & Loopback", duration: "26:30", freePreview: true },
          { title: "Subnetting Masterclass: Subnet Masks, CIDR Notation (/24, /16, /8) & Calculations", duration: "45:00" },
          { title: "IPv6 Protocol: Addressing Structure, SLAAC & Neighbor Discovery Attacks", duration: "23:40" },
          { title: "DHCP Deep Dive: DORA Process, DHCP Starvation & Rogue DHCP Server Attacks", duration: "27:10" },
          { title: "DNS (Domain Name System): Hierarchy, Record Types (A, MX, TXT) & DNS Poisoning", duration: "31:25" },
          { title: "ARP Protocol: How Machines Resolve IPs to MACs & ARP Spoofing / Poisoning", duration: "34:15" }
        ]
      },
      {
        sectionTitle: "Module 5: Ports, Protocols & Transport Layer Reconnaissance",
        lectures: [
          { title: "TCP vs UDP: Reliability, Flow Control & Three-Way Handshake (SYN-ACK)", duration: "29:10", freePreview: true },
          { title: "Understanding TCP Flags: URG, ACK, PSH, RST, SYN, FIN in Port Scanning", duration: "25:40" },
          { title: "Well-Known & Critical Ports: 20/21 (FTP), 22 (SSH), 23 (Telnet), 25 (SMTP), 53 (DNS)", duration: "33:20" },
          { title: "Web & File Sharing Ports: 80 (HTTP), 443 (HTTPS), 445 (SMB/EternalBlue), 3389 (RDP)", duration: "36:50" },
          { title: "Port Scanning with Nmap: SYN Stealth, TCP Connect, UDP, NULL, FIN & Xmas Scans", duration: "42:00" }
        ]
      },
      {
        sectionTitle: "Module 6: Network Security Defenses (Firewalls, IDS/IPS, VPNs & Proxies)",
        lectures: [
          { title: "Firewalls Explained: Stateless Packet Filters vs Stateful Inspection vs Next-Gen (NGFW)", duration: "31:40" },
          { title: "Access Control Lists (ACLs): Standard, Extended & Rule Ordering Best Practices", duration: "26:15" },
          { title: "Intrusion Detection (IDS) & Prevention Systems (IPS): Signature vs Anomaly Based", duration: "28:30" },
          { title: "Virtual Private Networks (VPNs): IPsec, OpenVPN, WireGuard & Tunneling Protocols", duration: "30:10" },
          { title: "Forward Proxies vs Reverse Proxies: SSL Offloading, WAFs & Load Balancing", duration: "24:45" },
          { title: "Transport Layer Security (TLS/SSL): Certificates, Handshakes & MitM Interception", duration: "35:00" }
        ]
      },
      {
        sectionTitle: "Module 7: Real-World Network Attacks & Hands-On Packet Analysis",
        lectures: [
          { title: "Man-in-the-Middle (MITM) Lab: Executing and Detecting ARP Poisoning", duration: "38:20" },
          { title: "Denial of Service (DoS) & DDoS: SYN Floods, UDP Floods & Amplification Attacks", duration: "33:15" },
          { title: "Hands-on Wireshark: Dissecting Live PCAP Captures for Suspicious Payloads", duration: "44:30" },
          { title: "Defensive Network Hardening Checklist: Dynamic ARP Inspection & DHCP Snooping", duration: "29:00" }
        ]
      }
    ],
    faqs: [
      {
        question: "When will this Computer Networking course launch?",
        answer: "The course is currently in active production and will launch very soon! All topics, lab setups, and packet analysis workflows are being finalized."
      },
      {
        question: "Is this course geared toward Cybersecurity and Ethical Hacking?",
        answer: "Yes! While traditional networking courses focus only on administrative configurations, this course specifically approaches every single networking concept (topologies, switches, routers, ports, protocols) from both offensive attack vectors and defensive mitigation strategies."
      },
      {
        question: "Do I need prior IT or programming knowledge?",
        answer: "None at all. We start from the absolute basics of what a packet is and build up step-by-step to advanced enterprise networking, routing, switching, and packet dissection."
      },
      {
        question: "Will hands-on lab exercises and packet captures (PCAP) be provided?",
        answer: "Yes! You will receive sample PCAP files, packet capture labs with Wireshark, virtual network topologies in Cisco Packet Tracer / GNS3, and guided hands-on exercises."
      }
    ]
  }
];

export const blogPosts: BlogPost[] = [
  {
    slug: "top-10-bug-bounty-tips-for-beginners",
    title: "Top 10 Bug Bounty Tips for Beginners",
    excerpt: "Essential lessons I learned the hard way when starting out in ethical hacking. From avoiding duplicate burnout to finding high-signal targets.",
    content: `
# Top 10 Bug Bounty Tips for Beginners

Entering the world of bug bounty hunting is thrilling, but it can also be overwhelming. When I first started out as a student in cybersecurity, I spent dozens of hours running automated scanners on high-profile targets with zero findings and endless duplicate reports.

Over the last few years—reporting vulnerabilities to NASA, WHO, and Fortune 500 companies—I developed a systematic playbook that changed everything. Here are my top 10 practical tips for every beginner:

### 1. Specialize Before You Generalize
Don't try to master SSRF, Race Conditions, IDOR, GraphQL vulnerabilities, and Binary Exploitation all on day one. Pick **one vulnerability class** (such as Insecure Direct Object References or IDOR) and study everything about it. Read 30 HackerOne writeups specifically on IDOR until you can spot the pattern with your eyes closed.

### 2. Manual Testing Always Beats Automated Scanners
Every beginner runs the exact same automated scanners (Nikto, default Nuclei, OWASP ZAP) against broad scopes. If a scanner can find it, 500 other hunters found it within 10 minutes of the program launching. Use automation for **reconnaissance**, but perform **manual application exploration** for business logic flaws.

### 3. Read the Javascript Source Code
Modern web applications pack an incredible amount of logic into client-side JavaScript bundles. Use tools like \`js-beautify\` or Burp's built-in parser to read through \`main.bundle.js\`. You will frequently discover:
- Hidden admin API routes
- Forgotten debug feature flags
- Client-side validation checks that can be bypassed in transit
- Hardcoded staging endpoints

\`\`\`javascript
// Example of a hidden endpoint found inside a webpack chunk
const ADMIN_CONFIG = {
  endpoint: "/api/v2/internal/user-lookup",
  debug: false
};
\`\`\`

### 4. Understand the Business Flow
Put away your payload lists for the first 30 minutes on a target. Create two user accounts:
1. User A (Victim)
2. User B (Attacker)
Go through the complete flow: onboarding, inviting team members, changing passwords, modifying invoice details, updating phone numbers. When you understand what the application is *supposed* to do, finding what it *fails* to restrict becomes natural.

### 5. Always Check Mobile and Staging Endpoints
Companies frequently harden their main web landing page (\`target.com\`), but forget about:
- \`api-stage.target.com\`
- \`mobile-gateway.target.com\`
- Endpoints intended exclusively for their Android or iOS apps that omit rate limiting or strict CORS.

### 6. Write Stellar Vulnerability Reports
Triage teams read hundreds of low-quality submissions every day. If your report contains:
- A concise summary
- Severity score (CVSS)
- Clean, numbered reproduction steps
- A short Proof of Concept video or clear screenshot
- Remediation guidance

Your report will be triaged 3x faster and you will earn respect from the program's security engineers.

### 7. Embrace Rejection and Duplicates
Every great hunter has hundreds of "Informative" or "Duplicate" marks. View every duplicate as proof that your recon and exploitation intuition was correct—you were just slightly behind on time. Keep pushing forward!
`,
    category: "Bug Bounty",
    date: "Sep 10, 2025",
    readTime: "5 min read",
    accentColor: "bg-[#FECDD3]", // Pink
    author: {
      name: "Raghav Arora",
      role: "Security Researcher",
      avatar: "/images/about-hacker.jpg"
    },
    tags: ["Bug Bounty", "Web Security", "Beginner Guide", "Methodology"]
  },
  {
    slug: "how-i-reported-vulnerabilities-to-30-organizations",
    title: "How I Reported Vulnerabilities to 30+ Organizations",
    excerpt: "A deep dive into responsible vulnerability disclosure, recon workflows, and building a trusted reputation across global organizations.",
    content: `
# How I Reported Vulnerabilities to 30+ Organizations

Finding a critical security hole is only half the battle. Responsibly disclosing it, communicating with international engineering teams, and ensuring a safe fix without causing harm is the true hallmark of an ethical hacker.

Throughout my journey as a BCA Cybersecurity student, I have had the privilege of securing digital infrastructures for organizations like NASA, WHO, Nokia, Panasonic, and numerous private platforms.

Here is an inside look at my methodology and workflow:

### Step 1: Passive Reconnaissance & Attack Surface Mapping
Before sending a single probe packet, I build an asset inventory:
- ASN lookup to map all IP CIDR blocks belonging to the organization
- Subdomain permutation and certificate transparency logs using \`crt.sh\`
- Mapping cloud assets (S3 buckets, Azure blobs, GCP buckets) that may have misconfigured read/write permissions.

### Step 2: Spotting Low-Hanging Misconfigurations
Often, the biggest vulnerabilities stem from simple developer oversights:
1. **Exposed .git or environment repositories**: Leftover \`.env\` files containing database credentials or third-party service tokens.
2. **CORS Misconfigurations**: Trusting arbitrary origins with \`Access-Control-Allow-Credentials: true\`, enabling authenticated cross-origin data theft.
3. **Subdomain Takeovers**: CNAME records pointing to decommissioned GitHub Pages, AWS Elastic Beanstalk, or Shopify instances.

### Step 3: Responsible Disclosure Ethics
I follow strict Responsible Disclosure principles:
- Never alter, delete, or harvest sensitive user data.
- Stop testing immediately once Proof of Concept of the vulnerability is established.
- Provide organizations a standard 90-day window to patch before considering any public discussion.
- Document every step transparently.

### The Power of Being Polite
When writing to a security team at a multi-billion dollar enterprise, arrogance gets you nowhere. Speak with clarity, demonstrate the real-world business impact calmly, and offer to re-test their fix once deployed. This is how you earn invitations to private, high-reward bounty programs.
`,
    category: "Cybersecurity",
    date: "Sep 5, 2025",
    readTime: "7 min read",
    accentColor: "bg-[#DDD6FE]", // Purple
    author: {
      name: "Raghav Arora",
      role: "Security Researcher",
      avatar: "/images/hero-hacker.jpg"
    },
    tags: ["VAPT", "Responsible Disclosure", "Hall of Fame", "NASA", "WHO"]
  },
  {
    slug: "my-journey-in-cyber-security",
    title: "My Journey in Cyber Security (From Curiosity to Impact)",
    excerpt: "How a curious teenager exploring Linux commands transformed into a bug bounty hunter, agency founder, and tech educator.",
    content: `
# My Journey in Cyber Security: From Curiosity to Impact

People often ask me: *"Raghav, how did you get started in cybersecurity? Did you need a high-end supercomputer or advanced mathematics?"*

The honest truth? It started with a basic laptop, an insatiable curiosity to understand how software works beneath the user interface, and the determination to solve hard technical puzzles.

### The Spark: The Linux Terminal
My journey began when I first installed Ubuntu Linux on an old family computer. For the first time, I wasn't just clicking colorful icons—I was interacting directly with system processes, sockets, and memory tables. Seeing a computer respond to raw text commands made me realize that software isn't magic; it's logic created by humans, which means it can be analyzed and improved.

### Structured Grounding & Focused Discipline
Pursuing my degree in Cyber Security gave me structured academic grounding in networking protocols, cryptography, and operating systems. However, I made a promise to myself: **academic degrees are just the foundation; true excellence comes from building and testing in the real world every single day.**

Every evening after classes, I dedicated 3 to 4 hours to:
- Solving CTF (Capture the Flag) challenges on TryHackMe and HackTheBox
- Reading public bug bounty writeups
- Building full-stack web applications with Next.js and Node.js to understand developer perspective
- Performing responsible security research

### Founding Webpeaker
As I discovered more vulnerabilities and assisted startups with security, I realized that modern businesses struggle with two sides of the same coin: they need fast, beautiful digital products to grow, but they also need those products to be impenetrable against attacks.

That insight birthed **Webpeaker**—my digital agency offering both high-performance web development and offensive security audits.

### Why I Teach
Through my courses and social platforms under **thatraghavarora**, I have now reached over 1,000+ students. Seeing a student report their very first bug or launch their first full-stack application is the greatest reward imaginable.

Remember: *"A safer digital world starts with a curious mind."* Never stop exploring!
`,
    category: "Career",
    date: "Aug 26, 2025",
    readTime: "6 min read",
    accentColor: "bg-[#FEF08A]", // Yellow
    author: {
      name: "Raghav Arora",
      role: "Founder & Bug Hunter",
      avatar: "/images/about-hacker.jpg"
    },
    tags: ["Personal Story", "Cybersecurity Career", "Discipline", "Webpeaker"]
  },
  {
    slug: "tools-every-cybersecurity-student-should-know",
    title: "Tools Every Cybersecurity Student Should Know",
    excerpt: "A curated list of indispensable command-line tools, browser extensions, and intercepting proxies for modern security analysts.",
    content: `
# Tools Every Cybersecurity Student Should Know

Having the right tools in your security belt saves hundreds of hours and elevates your analytical speed. Here are the tools I use every single day:

1. **Burp Suite Community / Pro**: The undisputed industry king of HTTP interception and request manipulation.
2. **Nmap**: Essential for network host discovery and port state detection.
3. **Sublist3r & Amass**: Passive and active DNS enumeration powerhouses.
4. **ffuf (Fast Web Fuzzer)**: Incredibly fast Go-based directory and parameter fuzzer.
5. **Wireshark**: The gold standard for deep packet inspection.
6. **Wappalyzer**: Instant browser detection of web frameworks, CMSs, and server versions.
7. **CyberChef**: The Swiss Army knife for decoding Base64, Hex, URL encoding, and cryptographic ciphers.
`,
    category: "Learning",
    date: "Aug 15, 2025",
    readTime: "4 min read",
    accentColor: "bg-[#BAE6FD]", // Sky Blue
    author: {
      name: "Raghav Arora",
      role: "Security Researcher",
      avatar: "/images/course-hacker.jpg"
    },
    tags: ["Tools", "Nmap", "Burp Suite", "CyberChef", "Learning"]
  },
  {
    slug: "how-to-build-your-first-secure-web-application",
    title: "How to Build Your First Secure Web Application",
    excerpt: "Security should not be an afterthought. Learn how to architect full-stack apps with secure headers, CSRF guards, and sanitized inputs from day one.",
    content: `
# How to Build Your First Secure Web Application

Most developers learn to code first, and only worry about security after their database gets leaked or user sessions get hijacked.

Building secure web applications from day one requires adhering to 5 core design tenets:
1. **Never Trust User Input**: Sanitize, validate with Zod or Joi schemas on the server, and use parameterized queries.
2. **Implement Strict Content Security Policy (CSP)**: Disallow inline script execution to neutralize 95% of reflected and stored XSS vectors.
3. **Use HTTP-Only and SameSite Cookies**: Never store sensitive auth tokens in localStorage where rogue third-party scripts can extract them.
4. **Rate Limit Sensitive Routes**: Protect login, password reset, and payment endpoints against credential stuffing and brute-force attacks.
5. **Keep Dependencies Audited**: Run \`npm audit\` regularly to spot outdated packages with known CVEs.
`,
    category: "Development",
    date: "Aug 02, 2025",
    readTime: "6 min read",
    accentColor: "bg-[#DCFCE7]", // Light Green
    author: {
      name: "Raghav Arora",
      role: "Full Stack Engineer",
      avatar: "/images/hero-hacker.jpg"
    },
    tags: ["Next.js", "AppSec", "Web Security", "Developers"]
  }
];

export const testimonials: Testimonial[] = [
  {
    name: "Aman Verma",
    role: "BCA Student & Ethical Hacker",
    avatar: "/images/hero-hacker.jpg",
    quote: "Raghav explains complex cybersecurity topics in such a simple, actionable way. His ethical hacking guidance helped me find my very first XSS vulnerability!",
    rating: 5,
    companyOrCollege: "Cyber Security Student"
  },
  {
    name: "Sneha Kapoor",
    role: "Full Stack Web Learner",
    avatar: "/images/about-hacker.jpg",
    quote: "Great mentor and an amazing developer. His course was 100% practical, hands-on, and easy to follow. Not a single second was wasted on boring theory.",
    rating: 5,
    companyOrCollege: "Tech Academy"
  },
  {
    name: "Karan Mehta",
    role: "Agency Collaborator & Client",
    avatar: "/images/course-hacker.jpg",
    quote: "Working with Raghav on a penetration testing and web project was a great experience. Extremely professional, punctual, and highly skilled in security.",
    rating: 5,
    companyOrCollege: "Startup Founder"
  }
];

export interface GalleryItem {
  id: string;
  title: string;
  category: "Hackathons" | "Awards & Recognition" | "Workshops & Speaking" | "Sports & Milestones";
  image: string;
  date: string;
  badge: string;
  accentBg: string;
  description: string;
}

export const galleryItems: GalleryItem[] = [
  {
    id: "hackathon-winner",
    title: "1st Place Hackathon Winner — ByteFest & National Tech Sprint",
    category: "Hackathons",
    image: "/images/gallery/gallery-hackathon.jpg",
    date: "2024",
    badge: "1st Prize Trophy",
    accentBg: "bg-[#FEF08A]",
    description: "Led our engineering team to victory in a high-intensity hackathon, building an AI-powered automated vulnerability assessment scanner."
  },
  {
    id: "police-felicitation",
    title: "Felicitation by ADGP & Senior IPS Officer, Rajasthan Police",
    category: "Awards & Recognition",
    image: "/images/gallery/gallery-police.jpg",
    date: "2024",
    badge: "State Police Honor",
    accentBg: "bg-[#DCFCE7]",
    description: "Honored with an official Certificate of Appreciation by senior police leadership for cybercrime investigation support and ethical vulnerability disclosures."
  },
  {
    id: "cyber-workshop",
    title: "Cyber Defense & Ethical Hacking Masterclass (100+ Students)",
    category: "Workshops & Speaking",
    image: "/images/gallery/gallery-workshop.jpg",
    date: "2024",
    badge: "100+ Students Taught",
    accentBg: "bg-[#DDD6FE]",
    description: "Keynote presentation and hands-on offensive security lab demonstration for over 100+ aspiring tech enthusiasts and security researchers."
  },
  {
    id: "badminton-gold",
    title: "3-Time District Gold Medalist — Ball Badminton Championship",
    category: "Sports & Milestones",
    image: "/images/gallery/gallery-badminton.jpg",
    date: "2023 - 2024",
    badge: "Gold Medalist 🏅",
    accentBg: "bg-[#BAE6FD]",
    description: "Secured first place gold trophies across 3 consecutive district tournaments and represented Rajasthan state team 5 times."
  },
  {
    id: "webpeaker-founder",
    title: "Founder & Full Stack Architect — Webpeaker Innovation Lab",
    category: "Awards & Recognition",
    image: "/images/gallery/gallery-about.jpg",
    date: "2024",
    badge: "Webpeaker",
    accentBg: "bg-[#FEF9C3]",
    description: "Leading Webpeaker to deliver high-performance modern web platforms, secure systems, and innovative student mentorship."
  },
  {
    id: "hands-on-mentorship",
    title: "Practical Application Security & Bug Bounty Live Labs",
    category: "Workshops & Speaking",
    image: "/images/gallery/gallery-course.jpg",
    date: "2024",
    badge: "VAPT Workshop",
    accentBg: "bg-[#FECDD3]",
    description: "Mentoring upcoming ethical hackers in OWASP Top 10 vulnerabilities, API security, and responsible disclosure practices."
  }
];

export { roadmaps, cybersecurityRoadmap } from "./roadmapData";


