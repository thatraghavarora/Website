export interface RoadmapPhase {
  phaseNumber: number;
  title: string;
  badge: string;
  duration: string;
  description: string;
  topics?: string[];
  handsOnGoals?: string[];
}

export interface RecommendedResource {
  name: string;
  category: "lab" | "youtube" | "website" | "program";
  tag: string;
  description: string;
  url: string;
  cost: "Free" | "Freemium" | "Paid";
  badge?: string;
}

export interface RoadmapItem {
  slug: string;
  title: string;
  subtitle: string;
  description: string;
  thumbnail: string;
  level: string;
  duration: string;
  modulesCount: number;
  rating: number;
  reviewsCount: number;
  price: string;
  originalPrice: string;
  featured: boolean;
  category: string;
  badge?: string;
  edition: string;
  offerBadge: string;
  stats: { label: string; value: string }[];
  whatIsIncluded: string[];
  phases: RoadmapPhase[];
  labs: RecommendedResource[];
  youtubeCourses: RecommendedResource[];
  pentestWebsites: RecommendedResource[];
  bugBountyPrograms: RecommendedResource[];
  faqs: { question: string; answer: string }[];
}

export const roadmaps: RoadmapItem[] = [
  {
    slug: "web-pentesting-cyber-security",
    title: "Web Pentesting Roadmap",
    subtitle: "Complete Zero-to-Advanced Web Penetration Testing & Bug Bounty Guide",
    description: "A battle-tested structured blueprint covering web architectures, OWASP Top 10 vulnerabilities, API security, best practice labs, free YouTube courses, websites to test, and bug bounty platforms.",
    thumbnail: "/images/hero-hacker.jpg",
    level: "Beginner to Advanced",
    duration: "6 Master Modules",
    modulesCount: 6,
    rating: 5.0,
    reviewsCount: 84,
    price: "99 RS | $2",
    originalPrice: "499 RS | $10",
    featured: true,
    category: "Web Pentesting",
    badge: "Bestseller",
    edition: "2025 - 2026 Edition",
    offerBadge: "Special Access Deal",
    stats: [
      { label: "Structured Phases", value: "6 Modules" },
      { label: "Core Topics", value: "60+ Topics" },
      { label: "Best Labs Curated", value: "6 Platforms" },
      { label: "Free YT Masterclasses", value: "7 Channels" },
    ],
    whatIsIncluded: [
      "Complete step-by-step roadmap from absolute beginner to professional penetration tester",
      "Comprehensive Web Pentesting curriculum covering networking to advanced client-side & API attacks",
      "Hand-picked free and freemium vulnerability practice labs (PortSwigger, TryHackMe, HTB, DVWA)",
      "Best free YouTube courses and playlist recommendations from top cybersecurity educators",
      "Essential website cheatsheets, wordlists, and payload databases (PayloadsAllTheThings, SecLists, GTFOBins)",
      "Vetted Bug Bounty platforms (HackerOne, Bugcrowd, Intigriti) and tips on finding your first valid vulnerability",
      "Lifetime updates whenever new vulnerability classes, tools, or techniques emerge",
      "Exclusive access to Raghav Arora's private student security community"
    ],
    phases: [
      {
        phaseNumber: 1,
        title: "Foundations of Cybersecurity & Networking",
        badge: "Beginner",
        duration: "Weeks 1 - 3",
        description: "Build an unbreakable technical foundation in computer networks, Linux systems, and HTTP communications before attempting any exploit."
      },
      {
        phaseNumber: 2,
        title: "Web Architecture, Proxies & Reconnaissance",
        badge: "Beginner to Intermediate",
        duration: "Weeks 4 - 6",
        description: "Understand how modern web applications communicate, intercept requests in real time, and map out an organization's digital attack surface."
      },
      {
        phaseNumber: 3,
        title: "OWASP Top 10 & Core Web Vulnerability Exploitation",
        badge: "Intermediate",
        duration: "Weeks 7 - 11",
        description: "Dive deep into the most critical web application vulnerabilities. Learn manual payload crafting, detection logic, and impact demonstration."
      },
      {
        phaseNumber: 4,
        title: "API Pentesting & Modern Business Logic Flaws",
        badge: "Intermediate to Advanced",
        duration: "Weeks 12 - 15",
        description: "Traditional web pentesting is evolving toward REST APIs, GraphQL endpoints, and subtle business logic vulnerabilities that automated scanners miss."
      },
      {
        phaseNumber: 5,
        title: "Advanced Exploitation & Client-Side Attacks",
        badge: "Advanced",
        duration: "Weeks 16 - 19",
        description: "Tackle sophisticated vulnerabilities that award the highest bounties on HackerOne and Bugcrowd."
      },
      {
        phaseNumber: 6,
        title: "Bug Bounty Hunting, Professional VAPT & Reporting",
        badge: "Mastery & Career",
        duration: "Weeks 20+",
        description: "Convert your technical knowledge into real-world Hall of Fame recognitions, monetary bounties, and corporate penetration testing client contracts."
      }
    ],
    labs: [
      {
        name: "PortSwigger Web Security Academy",
        category: "lab",
        tag: "Must-Have",
        description: "The gold standard for web application pentesting. Created by the developers of Burp Suite. Contains 200+ free labs from beginner to expert level.",
        url: "https://portswigger.net/web-security",
        cost: "Free",
        badge: "100% Free & Best in Class"
      },
      {
        name: "TryHackMe (Pre-Security & Jr Pentester)",
        category: "lab",
        tag: "Beginner Friendly",
        description: "Gamified, browser-based hands-on learning paths covering networking, Linux, web fundamentals, and practical tool usage.",
        url: "https://tryhackme.com",
        cost: "Freemium",
        badge: "Top Beginner Pick"
      },
      {
        name: "HackTheBox (HTB Academy & Machines)",
        category: "lab",
        tag: "Realistic Practice",
        description: "Industry-leading cybersecurity playground with realistic corporate network simulation machines, active CTFs, and modular academy tracks.",
        url: "https://www.hackthebox.com",
        cost: "Freemium",
        badge: "Industry Favorite"
      },
      {
        name: "DVWA (Damn Vulnerable Web App)",
        category: "lab",
        tag: "Local Sandbox",
        description: "A PHP/MySQL web application deliberately packed with vulnerabilities. Great for testing exploits offline with adjustable security difficulty levels.",
        url: "https://github.com/digininja/DVWA",
        cost: "Free",
        badge: "Classic Offline Lab"
      },
      {
        name: "bWAPP (Buggy Web Application)",
        category: "lab",
        tag: "Comprehensive",
        description: "An open-source web application with over 100+ vulnerabilities including all OWASP Top 10 vectors. Ideal for security students.",
        url: "http://www.itsecgames.com",
        cost: "Free",
        badge: "100+ Vulnerabilities"
      },
      {
        name: "VulnHub",
        category: "lab",
        tag: "Boot to Root",
        description: "Downloadable vulnerable virtual machine images for VMware/VirtualBox to practice penetration testing in completely isolated local networks.",
        url: "https://www.vulnhub.com",
        cost: "Free",
        badge: "Offline VMs"
      }
    ],
    youtubeCourses: [
      {
        name: "The Cyber Mentor (Heath Adams)",
        category: "youtube",
        tag: "Practical Pentesting",
        description: "Renowned 12-hour+ Practical Ethical Hacking and Web Application Penetration Testing courses covering real-world workflows from scratch.",
        url: "https://www.youtube.com/@TCMSecurityAcademy",
        cost: "Free",
        badge: "Top Recommendation"
      },
      {
        name: "Rana Khalil (PortSwigger Lab Solutions)",
        category: "youtube",
        tag: "Web Security Master",
        description: "Clear, deeply technical step-by-step walkthroughs solving PortSwigger Academy labs for SQLi, XSS, CSRF, and CORS with manual & scripted solutions.",
        url: "https://www.youtube.com/@RanaKhalil101",
        cost: "Free",
        badge: "Best Lab Walkthroughs"
      },
      {
        name: "NahamSec (Ben Sadeghipour)",
        category: "youtube",
        tag: "Bug Bounty Pro",
        description: "Live bug bounty recon sessions, tooling setups, interview series with million-dollar bounty hunters, and practical hunting advice.",
        url: "https://www.youtube.com/@NahamSec",
        cost: "Free",
        badge: "Bounty Methodology"
      },
      {
        name: "InsiderPhD (Katie Paxton-Fear)",
        category: "youtube",
        tag: "Bug Bounty Guides",
        description: "PhD researcher explaining bug bounty fundamentals, API testing, finding your first bug, and systematic vulnerability hunting for beginners.",
        url: "https://www.youtube.com/@InsiderPhD",
        cost: "Free",
        badge: "Beginner Friendly"
      },
      {
        name: "John Hammond",
        category: "youtube",
        tag: "CTFs & Exploits",
        description: "Hands-on cybersecurity deep dives, CTF challenge breakdowns, malware analysis, and real-world zero-day exploit explanations.",
        url: "https://www.youtube.com/@_JohnHammond",
        cost: "Free",
        badge: "Deep Analysis"
      },
      {
        name: "NetworkChuck",
        category: "youtube",
        tag: "Networking & Linux",
        description: "Vibrant, high-energy tutorials on TCP/IP, IP subnetting, Wireshark packet analysis, and building virtual penetration testing home labs.",
        url: "https://www.youtube.com/@NetworkChuck",
        cost: "Free",
        badge: "Networking Fundamentals"
      },
      {
        name: "STÖK (Fredrik Alexandersson)",
        category: "youtube",
        tag: "Hacker Culture & Tips",
        description: "Bounty Thursday series, hardware setups, Burp Suite tips, mental wellness for hackers, and coverage of global hacking conferences.",
        url: "https://www.youtube.com/@STOKfredrik",
        cost: "Free",
        badge: "Hacker Mindset"
      }
    ],
    pentestWebsites: [
      {
        name: "PayloadsAllTheThings",
        category: "website",
        tag: "Cheatsheet & Payloads",
        description: "The most widely referenced open-source GitHub repository containing battle-tested payloads and bypasses for every web vulnerability class.",
        url: "https://github.com/swisskyrepo/PayloadsAllTheThings",
        cost: "Free",
        badge: "Essential Bookmark"
      },
      {
        name: "SecLists by Daniel Miessler",
        category: "website",
        tag: "Wordlists Collection",
        description: "The security tester's companion: curated collections of usernames, passwords, URLs, sensitive files, and fuzzing payloads.",
        url: "https://github.com/danielmiessler/SecLists",
        cost: "Free",
        badge: "Gold Standard Wordlists"
      },
      {
        name: "GTFOBins",
        category: "website",
        tag: "Privilege Escalation",
        description: "A curated list of Unix binaries that can be exploited by an attacker to bypass local security restrictions and escalate to root privileges.",
        url: "https://gtfobins.github.io",
        cost: "Free",
        badge: "Linux Escalation"
      },
      {
        name: "Exploit Database (Exploit-DB)",
        category: "website",
        tag: "Exploits Archive",
        description: "Maintained by Offensive Security, this is the authoritative archive of public exploits and corresponding vulnerable software.",
        url: "https://www.exploit-db.com",
        cost: "Free",
        badge: "Public CVE Database"
      },
      {
        name: "Burp Suite (PortSwigger)",
        category: "website",
        tag: "Interception Proxy",
        description: "The industry standard web application security testing tool. Includes proxy, repeater, intruder, sequencer, and extensive extension store (BApp).",
        url: "https://portswigger.net/burp",
        cost: "Freemium",
        badge: "Industry Must-Have"
      },
      {
        name: "OWASP ZAP (Zed Attack Proxy)",
        category: "website",
        tag: "Free Open Source Proxy",
        description: "World's most popular free open-source web application scanner and proxy. Highly customizable with active community support.",
        url: "https://www.zaproxy.org",
        cost: "Free",
        badge: "100% Free Alternative"
      },
      {
        name: "ffuf (Fast Web Fuzzer)",
        category: "website",
        tag: "Content Discovery",
        description: "Ultra-fast command-line web fuzzer written in Go. Ideal for discovering unlinked files, API parameters, and hidden virtual hosts.",
        url: "https://github.com/ffuf/ffuf",
        cost: "Free",
        badge: "Fastest Fuzzer"
      },
      {
        name: "Nuclei (ProjectDiscovery)",
        category: "website",
        tag: "Vulnerability Scanner",
        description: "Fast and lightweight template-based vulnerability scanner that sends requests across targets based on simple community-driven YAML templates.",
        url: "https://github.com/projectdiscovery/nuclei",
        cost: "Free",
        badge: "Automation Favorite"
      }
    ],
    bugBountyPrograms: [
      {
        name: "HackerOne",
        category: "program",
        tag: "Leading Global Platform",
        description: "Hosts the largest variety of public and private bug bounty programs, including GitHub, Uber, TikTok, Twitter, and the US Department of Defense.",
        url: "https://www.hackerone.com",
        cost: "Free",
        badge: "World's #1 Platform"
      },
      {
        name: "Bugcrowd",
        category: "program",
        tag: "Pioneering Marketplace",
        description: "Offers crowdsourced security programs, managed VDPs, and clear researcher tiers. Programs range from small startups to Fortune 50 enterprise giants.",
        url: "https://www.bugcrowd.com",
        cost: "Free",
        badge: "High-Volume Programs"
      },
      {
        name: "Intigriti",
        category: "program",
        tag: "European Leader",
        description: "Fastest-growing European platform known for fair triage, rapid payouts, great researcher support, and high-impact private targets.",
        url: "https://www.intigriti.com",
        cost: "Free",
        badge: "Fast Triage"
      },
      {
        name: "Responsible Disclosure / VDPs",
        category: "program",
        tag: "Hall of Fame & Certs",
        description: "Submit security findings directly to major organizations with vulnerability disclosure programs (e.g., NASA, WHO, Nokia, Jio) to build your Hall of Fame resume.",
        url: "https://en.wikipedia.org/wiki/Responsible_disclosure",
        cost: "Free",
        badge: "Resume Building"
      }
    ],
    faqs: [
      {
        question: "Who is this Roadmap for?",
        answer: "This roadmap is designed for anyone starting out in cybersecurity, college students, developers looking to transition to web security, and aspiring bug bounty hunters who want a clear, non-confusing path without wasting time on dead-end tutorials."
      },
      {
        question: "Why only 99 RS | $2?",
        answer: "High-quality cybersecurity education shouldn't be locked behind expensive $500 bootcamps. This nominal fee supports our platform maintenance and allows every student to access genuine, structured guidance."
      },
      {
        question: "How do I receive access after payment?",
        answer: "Upon completing payment via UPI (99 RS) or PayPal ($2), you receive immediate digital access to the complete roadmap, checklist Notion workspace, and private student community access."
      },
      {
        question: "Do I need prior coding knowledge to follow this roadmap?",
        answer: "No! Phase 1 starts from absolute ground zero with basic networking and Linux terminal fundamentals before progressing to web exploitation."
      }
    ]
  }
];

export const cybersecurityRoadmap = roadmaps[0];
