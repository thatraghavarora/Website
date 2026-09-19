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
  whatYouBecome: { title: string; desc: string; icon: string }[];
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
    title: "Complete Web Pentesting & Cyber Security Roadmap",
    subtitle: "From Absolute Beginner to Professional Bug Bounty Hunter & Penetration Tester",
    description: "A battle-tested, phase-by-phase structured blueprint that takes you from zero networking knowledge to hunting real vulnerabilities on live targets, earning Hall of Fame credits, and landing cyber security roles.",
    thumbnail: "/images/hero-hacker.jpg",
    level: "Beginner to Advanced",
    duration: "10 Master Chapters",
    modulesCount: 10,
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
      { label: "Deep Chapters", value: "10 Chapters" },
      { label: "Core Lessons", value: "60+ Lessons" },
      { label: "Best Labs Curated", value: "10+ Platforms" },
      { label: "Free YT Masterclasses", value: "7 Channels" },
    ],

    whatYouBecome: [
      {
        title: "Bug Bounty Hunter",
        desc: "Find real vulnerabilities in live companies like NASA, Swiggy, Google, and get paid cash rewards and Hall of Fame recognition.",
        icon: "🐛"
      },
      {
        title: "Web Penetration Tester",
        desc: "Get hired by companies to legally hack their systems, write professional reports, and become a certified security consultant.",
        icon: "🔐"
      },
      {
        title: "Security Analyst",
        desc: "Land SOC and Blue Team roles in MNCs — monitor live threats, investigate incidents, and protect digital infrastructure.",
        icon: "🛡️"
      },
      {
        title: "Ethical Hacker (CEH / OSCP Ready)",
        desc: "Prepare fully for globally recognised certifications like CEH, eWPT, OSCP and crack interviews at top security firms.",
        icon: "🎓"
      },
      {
        title: "Cyber Security Freelancer",
        desc: "Offer VAPT services to startups and SMEs and earn 50,000 to 2L INR per project on your own terms.",
        icon: "💼"
      },
      {
        title: "CTF Player & Security Researcher",
        desc: "Compete in global Capture-The-Flag competitions, build your GitHub portfolio, and get noticed by top-tier security teams.",
        icon: "🏆"
      },
    ],

    whatIsIncluded: [
      "Complete 6-phase roadmap from absolute zero to professional penetration tester (80+ curated topics)",
      "Deep-dive into all OWASP Top 10 vulnerabilities with manual exploitation techniques",
      "Phase-by-phase hands-on lab goals — exactly what to practice at each stage",
      "10+ curated practice platforms: PortSwigger, TryHackMe, HackTheBox, DVWA, bWAPP, VulnHub and more",
      "7 best free YouTube channel recommendations with reason why each channel matters",
      "Bug Bounty platform guide: how to start on HackerOne, Bugcrowd and Intigriti with zero experience",
      "Professional VAPT report writing templates used in real corporate penetration tests",
      "Lifetime roadmap updates as new vulnerability classes and tools emerge",
      "Exclusive access to Raghav Arora's private student security community"
    ],

    phases: [
      {
        phaseNumber: 1,
        title: "Foundations — Networking, Linux & How the Internet Works",
        badge: "Beginner",
        duration: "Weeks 1 – 3",
        description: "Before you touch a single exploit, you need to think like a machine. This phase builds your unbreakable technical foundation so every attack you learn later actually makes sense — not just copy-paste hacking.",
        topics: [
          "What is a Computer Network? — Nodes, Media, Topologies (Star/Mesh), Hubs, Switches, Routers & Firewalls",
          "How Data Travels — Encapsulation, MAC Addressing, and ARP Protocol mechanics",
          "OSI Model & TCP/IP Protocol Stack — how data really travels across networks",
          "IP Addressing, Subnetting & CIDR notation explained from scratch",
          "DNS Resolution — how domains map to IPs and how attackers abuse it",
          "HTTP vs HTTPS — request/response lifecycle, headers, methods & status codes",
          "Cookies, Sessions & Tokens — the auth layer every web app depends on",
          "Linux Terminal Mastery — file system, permissions, users and processes",
          "Bash scripting basics — automating repetitive security tasks",
          "Setting up your Hacking Lab — Kali Linux on VirtualBox or WSL2",
          "Wireshark packet capture — reading and analysing live network traffic",
          "Nmap port scanning fundamentals — service enumeration and OS detection",
        ],
        handsOnGoals: [
          "Set up a full Kali Linux environment (VM or WSL2) completely from scratch",
          "Capture and analyse live HTTP traffic using Wireshark",
          "Run Nmap scans and enumerate open services on a local target",
          "Navigate and manage the Linux file system via terminal only — no GUI",
          "Complete TryHackMe Pre-Security learning path fully",
        ]
      },
      {
        phaseNumber: 2,
        title: "Web Architecture, Burp Suite & Attack Surface Mapping",
        badge: "Beginner to Intermediate",
        duration: "Weeks 4 – 6",
        description: "You will learn exactly how modern web applications are built, how browsers talk to servers, and how to intercept every single request in real time — the skill that unlocks everything else in web pentesting.",
        topics: [
          "How web apps work — front-end, back-end, databases and APIs explained",
          "Burp Suite Community Edition — complete setup, proxy, intercept and repeater",
          "HTTPS Interception — installing Burp CA certificate, traffic decryption",
          "URL structure, query parameters, path parameters and hidden endpoints",
          "Reconnaissance Methodology — passive vs active recon phases",
          "Subdomain enumeration with Subfinder, Amass and Assetfinder",
          "Directory and file brute-forcing with ffuf and Gobuster",
          "Google Dorking and Shodan for attack surface discovery",
          "JavaScript source code review — finding leaked API keys and hidden endpoints",
          "HTTP request smuggling fundamentals overview",
          "Content Security Policy (CSP) analysis and bypass basics",
        ],
        handsOnGoals: [
          "Configure Burp Suite as a proxy and intercept your first HTTPS request",
          "Enumerate subdomains of a bug bounty target using Subfinder",
          "Discover hidden directories using ffuf with SecLists wordlists",
          "Find leaked secrets in JavaScript files of a real public program",
          "Complete PortSwigger Burp Suite Essentials labs section",
        ]
      },
      {
        phaseNumber: 3,
        title: "OWASP Top 10 — Core Web Vulnerability Exploitation",
        badge: "Intermediate",
        duration: "Weeks 7 – 11",
        description: "This is the heart of the roadmap. You will deeply understand, manually detect, and exploit every critical web vulnerability — not from a scanner, but with your own hands, understanding exactly why each attack works.",
        topics: [
          "SQL Injection — In-Band, Error-Based, Blind Boolean, Time-Based and Out-of-Band",
          "Cross-Site Scripting (XSS) — Reflected, Stored, DOM-Based and mXSS variants",
          "Payload bypasses — WAF evasion techniques, encoding tricks, filter circumvention",
          "Insecure Direct Object Reference (IDOR) — horizontal and vertical privilege escalation",
          "Cross-Site Request Forgery (CSRF) — token bypass and SameSite attribute abuse",
          "Server-Side Request Forgery (SSRF) — internal port scan and cloud metadata extraction",
          "Broken Authentication — JWT signature tampering, session fixation, brute-force",
          "Security Misconfigurations — exposed .git repos, debug endpoints, CORS wildcard",
          "Unrestricted File Upload — MIME bypass, double extension, web shell execution",
          "XML External Entity (XXE) — arbitrary file read and Out-of-Band blind exfiltration",
          "Server-Side Template Injection (SSTI) — Jinja2, Twig exploitation to Remote Code Execution",
          "Path Traversal and Local File Inclusion (LFI and RFI attacks)",
          "Clickjacking — X-Frame-Options bypass and UI redress attack chains",
          "Open Redirect — phishing chain attacks and OAuth abuse",
        ],
        handsOnGoals: [
          "Manually exploit SQLi, XSS and IDOR on PortSwigger Academy labs (Apprentice to Practitioner)",
          "Craft a working SSRF payload to read AWS EC2 instance metadata",
          "Bypass a file upload filter and successfully execute a PHP web shell",
          "Tamper a JWT token using the alg:none trick to escalate privileges",
          "Chain SSRF plus IDOR to achieve a critical impact exploit demonstration",
          "Complete 30+ PortSwigger Web Security Academy labs in this phase",
        ]
      },
      {
        phaseNumber: 4,
        title: "API Security, Business Logic Flaws & Advanced Recon",
        badge: "Intermediate to Advanced",
        duration: "Weeks 12 – 15",
        description: "Modern applications run on APIs. This phase teaches you the attack vectors automated scanners completely miss — business logic flaws, mass assignment, API versioning abuse, and advanced recon workflows used by real bounty hunters.",
        topics: [
          "REST API security testing — endpoint enumeration, verb tampering and fuzzing",
          "GraphQL security — introspection abuse, query batching and injection attacks",
          "Mass Assignment vulnerabilities — privilege escalation through JSON body keys",
          "Business Logic Flaws — price tampering, quantity manipulation and workflow bypass",
          "Race Conditions — limit overrun, concurrency exploits and multi-step race attacks",
          "Authentication bypass — 2FA and OTP bypass, forgot password chain exploitation",
          "CORS Misconfiguration — arbitrary origin reflection and null origin attacks",
          "Rate Limiting Bypass — header manipulation, IP rotation and user agent tricks",
          "API key leakage — GitHub, JavaScript files and mobile APK decompilation",
          "Advanced subdomain takeover — dangling CNAMEs and expired cloud buckets",
          "Sensitive data exposure — backup files, source code exposure and .env leaks",
          "HTTP parameter pollution and parameter smuggling techniques",
          "Postman and Burp Suite combined workflow for full API security testing",
        ],
        handsOnGoals: [
          "Test a GraphQL endpoint for introspection and injection vulnerabilities",
          "Exploit a mass assignment flaw to escalate your account to admin role",
          "Demonstrate a race condition to claim a coupon code multiple times",
          "Set up a full recon automation pipeline using Subfinder, HTTPX and Nuclei",
          "Find and report a working subdomain takeover on a real bug bounty program",
        ]
      },
      {
        phaseNumber: 5,
        title: "Advanced Exploitation — High-Impact & Client-Side Attacks",
        badge: "Advanced",
        duration: "Weeks 16 – 19",
        description: "This phase covers the vulnerability classes that award the highest bounties and earn the most recognition. These are technically complex, often chained attacks that separate intermediate hunters from elite security researchers.",
        topics: [
          "Advanced XSS — DOM Clobbering, prototype pollution and framework sandbox escapes",
          "HTTP Request Smuggling — CL.TE, TE.CL and TE.TE desync attack chains",
          "OAuth 2.0 and OpenID Connect attacks — state bypass and redirect_uri manipulation",
          "SAML vulnerabilities — signature wrapping and XML injection attacks",
          "Prototype Pollution — server-side and client-side full exploitation chains",
          "Cache Poisoning and Web Cache Deception attacks explained",
          "Insecure Deserialization — PHP object injection and Java deserialization chains",
          "LDAP, XPath and NoSQL injection attack techniques",
          "Blind vulnerability exploitation — Blind XSS via XSS Hunter, Blind SSRF and Blind SSTI",
          "Vulnerability chaining — combining low and medium bugs for critical impact",
          "Mobile API security testing — APK decompilation and certificate pinning bypass",
          "Cloud misconfigurations — AWS S3 bucket exposure and IAM policy misconfigurations",
        ],
        handsOnGoals: [
          "Execute an HTTP request smuggling attack to bypass access controls on a lab",
          "Chain a self-XSS plus CSRF into a full stored XSS with victim impact",
          "Exploit an OAuth redirect_uri bypass to steal a victim access token",
          "Set up XSS Hunter and demonstrate a real blind XSS payload firing on callback",
          "Complete HackTheBox Pro Labs web machines at Hard difficulty",
        ]
      },
      {
        phaseNumber: 6,
        title: "Bug Bounty, Professional VAPT & Cyber Security Career Launch",
        badge: "Mastery & Career",
        duration: "Weeks 20+",
        description: "Now you convert all your technical knowledge into real money, real certificates, and real job offers. This phase covers the business side of security — how to write reports, how to pitch clients, and how to build a reputation that opens doors.",
        topics: [
          "Bug bounty platform deep dive — HackerOne, Bugcrowd and Intigriti program selection strategy",
          "Reading a program scope — understanding what is in vs out of bounds",
          "Recon methodology for bug bounty — automation plus manual hunting hybrid workflow",
          "Writing a perfect vulnerability report — CVSS scoring, impact statement, PoC and remediation",
          "Triaging your own bugs before submission — determining true vs false positives",
          "Responsible disclosure — VDPs for NASA, WHO, Nokia, Jio and Hall of Fame credits",
          "From bounty to portfolio — converting reports into career-opening showcase pieces",
          "Corporate VAPT client acquisition — pricing, scope agreements and deliverable structure",
          "VAPT report writing — executive summary, technical findings and remediation roadmap",
          "Cyber security job hunting — resume, LinkedIn and GitHub profile optimisation",
          "CEH, eWPT, OSCP certification guide — which cert, when to take it and how to prepare",
          "Building your security brand — write-ups, conference talks and community presence",
        ],
        handsOnGoals: [
          "Submit your first real bug report on HackerOne or Bugcrowd",
          "Get at least one valid finding acknowledged (even informational counts as a start)",
          "Write a full professional VAPT report for a practice target from the labs",
          "Get a Hall of Fame credit from any responsible disclosure program",
          "Build a cyber security portfolio with 3 or more real write-ups published on GitHub",
        ]
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
        description: "Renowned practical ethical hacking courses covering real-world workflows from scratch.",
        url: "https://www.youtube.com/@TCMSecurityAcademy",
        cost: "Free",
        badge: "Top Recommendation"
      },
      {
        name: "Rana Khalil",
        category: "youtube",
        tag: "Web Security Master",
        description: "Step-by-step walkthroughs solving PortSwigger Academy labs for every major vulnerability class.",
        url: "https://www.youtube.com/@RanaKhalil101",
        cost: "Free",
        badge: "Best Lab Walkthroughs"
      },
      {
        name: "NahamSec (Ben Sadeghipour)",
        category: "youtube",
        tag: "Bug Bounty Pro",
        description: "Live bug bounty recon sessions, tooling setups and practical hunting advice from a top bounty hunter.",
        url: "https://www.youtube.com/@NahamSec",
        cost: "Free",
        badge: "Bounty Methodology"
      },
      {
        name: "InsiderPhD (Katie Paxton-Fear)",
        category: "youtube",
        tag: "Bug Bounty Guides",
        description: "Beginner-friendly guidance on finding your first bug, API testing and systematic vulnerability hunting.",
        url: "https://www.youtube.com/@InsiderPhD",
        cost: "Free",
        badge: "Beginner Friendly"
      },
      {
        name: "John Hammond",
        category: "youtube",
        tag: "CTFs & Exploits",
        description: "Deep CTF challenge walkthroughs, malware analysis and real-world vulnerability post-mortems.",
        url: "https://www.youtube.com/@_JohnHammond",
        cost: "Free",
        badge: "Deep Analysis"
      },
      {
        name: "NetworkChuck",
        category: "youtube",
        tag: "Networking & Linux",
        description: "High-energy tutorials on TCP/IP, subnetting, Wireshark and building penetration testing home labs.",
        url: "https://www.youtube.com/@NetworkChuck",
        cost: "Free",
        badge: "Networking Fundamentals"
      },
      {
        name: "STOK (Fredrik Alexandersson)",
        category: "youtube",
        tag: "Hacker Culture & Tips",
        description: "Burp Suite tips, hacker mindset, Bounty Thursday series and global conference coverage.",
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
        description: "The most widely referenced open-source repository containing battle-tested payloads for every web vulnerability class.",
        url: "https://github.com/swisskyrepo/PayloadsAllTheThings",
        cost: "Free",
        badge: "Essential Bookmark"
      },
      {
        name: "SecLists by Daniel Miessler",
        category: "website",
        tag: "Wordlists Collection",
        description: "Curated collections of usernames, passwords, URLs, sensitive files and fuzzing payloads.",
        url: "https://github.com/danielmiessler/SecLists",
        cost: "Free",
        badge: "Gold Standard Wordlists"
      },
      {
        name: "GTFOBins",
        category: "website",
        tag: "Privilege Escalation",
        description: "Unix binaries that can bypass local security restrictions and escalate privileges to root.",
        url: "https://gtfobins.github.io",
        cost: "Free",
        badge: "Linux Escalation"
      },
      {
        name: "Exploit Database (Exploit-DB)",
        category: "website",
        tag: "Exploits Archive",
        description: "The authoritative archive of public exploits and corresponding vulnerable software maintained by Offensive Security.",
        url: "https://www.exploit-db.com",
        cost: "Free",
        badge: "Public CVE Database"
      },
      {
        name: "Burp Suite (PortSwigger)",
        category: "website",
        tag: "Interception Proxy",
        description: "The industry standard web application security testing tool used by every professional pentester.",
        url: "https://portswigger.net/burp",
        cost: "Freemium",
        badge: "Industry Must-Have"
      },
      {
        name: "ffuf (Fast Web Fuzzer)",
        category: "website",
        tag: "Content Discovery",
        description: "Ultra-fast command-line web fuzzer for discovering hidden files, API parameters and virtual hosts.",
        url: "https://github.com/ffuf/ffuf",
        cost: "Free",
        badge: "Fastest Fuzzer"
      },
      {
        name: "Nuclei (ProjectDiscovery)",
        category: "website",
        tag: "Vulnerability Scanner",
        description: "Fast template-based vulnerability scanner used by bug bounty hunters for large-scale recon automation.",
        url: "https://github.com/projectdiscovery/nuclei",
        cost: "Free",
        badge: "Automation Favorite"
      },
      {
        name: "OWASP ZAP (Zed Attack Proxy)",
        category: "website",
        tag: "Free Open Source Proxy",
        description: "The world's most popular free open-source web application scanner and proxy tool.",
        url: "https://www.zaproxy.org",
        cost: "Free",
        badge: "100% Free Alternative"
      }
    ],
    bugBountyPrograms: [
      {
        name: "HackerOne",
        category: "program",
        tag: "Leading Global Platform",
        description: "Hosts the largest variety of public and private bug bounty programs including GitHub, Uber, TikTok and the US DoD.",
        url: "https://www.hackerone.com",
        cost: "Free",
        badge: "World's #1 Platform"
      },
      {
        name: "Bugcrowd",
        category: "program",
        tag: "Pioneering Marketplace",
        description: "Crowdsourced security programs and managed VDPs ranging from small startups to Fortune 50 enterprise giants.",
        url: "https://www.bugcrowd.com",
        cost: "Free",
        badge: "High-Volume Programs"
      },
      {
        name: "Intigriti",
        category: "program",
        tag: "European Leader",
        description: "Fastest-growing European platform known for fair triage, rapid payouts and great researcher support.",
        url: "https://www.intigriti.com",
        cost: "Free",
        badge: "Fast Triage"
      },
      {
        name: "Responsible Disclosure / VDPs",
        category: "program",
        tag: "Hall of Fame & Certs",
        description: "Submit findings directly to organisations like NASA, WHO, Nokia, Jio to build your Hall of Fame resume.",
        url: "https://en.wikipedia.org/wiki/Responsible_disclosure",
        cost: "Free",
        badge: "Resume Building"
      }
    ],
    faqs: [
      {
        question: "Who is this Roadmap for?",
        answer: "Anyone starting from scratch — college students, developers wanting to switch to security, IT professionals, or simply curious minds. No prior hacking experience needed. Phase 1 starts from absolute zero."
      },
      {
        question: "Do I need to know coding to follow this roadmap?",
        answer: "No coding required to start. You will naturally pick up basic scripting (Python/Bash) as you progress through Phase 2-3. The roadmap tells you exactly when and what to learn."
      },
      {
        question: "Why only 99 RS | $2?",
        answer: "High-quality cybersecurity education should not be locked behind Rs 50,000 bootcamps. This nominal fee supports platform maintenance and lets every student access real, structured guidance."
      },
      {
        question: "How much time per day do I need?",
        answer: "1 to 2 hours per day is enough. The roadmap is designed for working students and professionals. Each phase has a clear duration estimate so you always know where you stand."
      },
      {
        question: "What exactly do I get after purchasing?",
        answer: "Immediate access to the complete 80+ topic curriculum, phase-wise hands-on lab goals, curated resource lists (labs, YouTube channels, bug bounty platforms), professional report templates, and Raghav's private student community."
      },
      {
        question: "Will this help me get a job in cyber security?",
        answer: "Phase 6 is entirely dedicated to career — resume building, certifications (CEH/OSCP), bug bounty portfolio, VAPT freelancing, and LinkedIn profile strategy. Students who complete this roadmap go from zero to their first security role or bug bounty payout."
      }
    ]
  }
];

export const cybersecurityRoadmap = roadmaps[0];
