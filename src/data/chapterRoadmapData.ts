/**
 * Comprehensive Chapter-Wise Deep Curriculum for Web Penetration Testing
 * 10 Chapters, 60+ Lessons, Hands-on Lab Scenarios, Exact Commands & Checklists.
 */

export interface RoadmapLesson {
  id: string;
  lessonNumber: string;
  title: string;
  duration: string;
  badge?: string;
  summary: string;
  keyTopics: string[];
  terminalCommands?: string[];
  proTips?: string[];
}

export interface RoadmapChapter {
  id: string;
  chapterNumber: number;
  title: string;
  subtitle: string;
  badge: string;
  duration: string;
  difficulty: "Beginner" | "Intermediate" | "Advanced" | "Expert";
  description: string;
  iconName: string;
  lessons: RoadmapLesson[];
  handsOnLab: {
    title: string;
    target: string;
    goal: string;
    steps: string[];
    verification: string;
  };
  checklist: { id: string; label: string }[];
}

export const chapterRoadmapList: RoadmapChapter[] = [
  {
    id: "ch-1-networking",
    chapterNumber: 1,
    title: "Deep Computer Networking for Hackers",
    subtitle: "OSI 7-Layer, TCP/UDP Mechanics, DNS, HTTP/1-2-3, Subnetting & Packet Capture",
    badge: "Chapter 1 • Core Foundations",
    duration: "18 Hours • 6 Lessons",
    difficulty: "Beginner",
    description:
      "You cannot hack what you do not understand. This chapter breaks down byte-level packet communications, protocol headers, handshake flags, and network diagnostic tools essential for every offensive security engineer.",
    iconName: "Globe",
    lessons: [
      {
        id: "l-1-1",
        lessonNumber: "1.1",
        title: "OSI 7-Layer & TCP/IP Stack Attack Surfaces",
        duration: "3 Hours",
        badge: "Architecture",
        summary:
          "Comprehensive breakdown of how data moves from physical bits to application protocols, and specific attack vectors per layer.",
        keyTopics: [
          "Layer 2 Data Link: Ethernet frame structure, MAC addressing, CAM table flooding & ARP poisoning mechanics",
          "Layer 3 Network: IPv4/IPv6 packet headers, TTL manipulation, IP spoofing & ICMP redirect attacks",
          "Layer 4 Transport: TCP state machine, sequence numbers, window sizing, UDP stateless attacks",
          "Layer 7 Application: HTTP, DNS, SMTP, FTP, SSH — where web vulnerabilities reside",
        ],
        terminalCommands: [
          "sudo tcpdump -i eth0 -n -c 10",
          "sudo arpspoof -i eth0 -t 192.168.1.50 192.168.1.1",
          "netstat -tulnp | grep -E ':(80|443|22)'",
        ],
        proTips: [
          "Never blindly run ARP spoofing in production environments; it can trigger enterprise SIEM alerts or crash switches.",
        ],
      },
      {
        id: "l-1-2",
        lessonNumber: "1.2",
        title: "TCP 3-Way Handshake & Scanning Mechanics",
        duration: "3 Hours",
        badge: "Protocols",
        summary:
          "Mastering SYN, ACK, FIN, RST, PSH, and URG flags to understand stateful firewalls, IDS evasion, and stealth scanning.",
        keyTopics: [
          "Handshake sequence: SYN (Client) → SYN-ACK (Server) → ACK (Client connection established)",
          "TCP SYN Stealth Scan (-sS): Drops connection with RST before 3rd packet, bypassing application-level logs",
          "TCP Connect Scan (-sT): Full 3-way handshake required when unprivileged user has no raw socket access",
          "Xmas (-sX) & NULL (-sN) scans: RFC 793 anomalies used against stateless inspection filters",
        ],
        terminalCommands: [
          "sudo nmap -sS -Pn -T4 target.com",
          "sudo hping3 -S -p 80 -c 3 target.com",
          "ss -ant state established",
        ],
        proTips: [
          "Modern cloud firewalls (AWS Security Groups, Cloudflare) normalize malformed flags; learn SYN scans thoroughly first.",
        ],
      },
      {
        id: "l-1-3",
        lessonNumber: "1.3",
        title: "DNS Architecture, Hierarchy & Zone Transfers",
        duration: "3 Hours",
        badge: "Recon Essential",
        summary:
          "Understanding recursive vs authoritative resolvers, Root servers, TLDs, and discovering internal hostnames via misconfigured DNS servers.",
        keyTopics: [
          "DNS Record Types: A (IPv4), AAAA (IPv6), CNAME (Aliases), MX (Mail), TXT (SPF/DKIM/Domain verification), SOA (Authority)",
          "DNS Zone Transfer (AXFR): Misconfigured nameservers dumping entire internal domain inventories to untrusted clients",
          "Reverse DNS (PTR) lookups & discovering unmapped IP addresses in enterprise ranges",
        ],
        terminalCommands: [
          "dig any target.com @8.8.8.8",
          "dig axfr target.com @ns1.target.com",
          "dnsrecon -d target.com -t axfr",
        ],
        proTips: [
          "Always test AXFR on all nameservers of a bug bounty scope; an unauthenticated zone transfer is an instant High-severity bounty!",
        ],
      },
      {
        id: "l-1-4",
        lessonNumber: "1.4",
        title: "HTTP/1.1, HTTP/2 & HTTP/3 Protocol Mechanics",
        duration: "3 Hours",
        badge: "Web Core",
        summary:
          "Dissecting HTTP request and response structures, header injections, keep-alive connections, multiplexing, and binary framing.",
        keyTopics: [
          "HTTP Request Structure: Method, Path, HTTP Version, Headers, Blank line separator (CRLF), Body",
          "HTTP Response Structure: Status codes (1xx, 2xx, 3xx, 4xx, 5xx), response headers, MIME types",
          "HTTP/2 Multiplexing: Binary streams over a single TCP connection, pseudo-headers (:method, :path, :authority)",
          "HTTP Request Smuggling Foundation: Desynchronization between frontend reverse proxies and backend servers using Content-Length vs Transfer-Encoding",
        ],
        terminalCommands: [
          "curl -I -s -v https://example.com",
          "curl --http2 -I https://example.com",
          "printf 'GET / HTTP/1.1\\r\\nHost: example.com\\r\\n\\r\\n' | nc example.com 80",
        ],
        proTips: [
          "Inspect CRLF (\\r\\n) separators carefully in Burp Suite Repeater; malformed headers are the gateway to request smuggling.",
        ],
      },
      {
        id: "l-1-5",
        lessonNumber: "1.5",
        title: "IP Subnetting, CIDR & NAT Architecture",
        duration: "3 Hours",
        badge: "Routing",
        summary:
          "IPv4 math, subnet masks, RFC 1918 private scopes, NAT traversal, and finding backend networks.",
        keyTopics: [
          "RFC 1918 Private Ranges: 10.0.0.0/8, 172.16.0.0/12, 192.168.0.0/16",
          "CIDR Calculations: /24 = 256 IPs (254 usable), /28 = 16 IPs, /30 = 4 IPs",
          "NAT Types: SNAT (source masquerading), DNAT (port forwarding), Carrier-Grade NAT (CGNAT)",
          "Bypassing internal IP restrictions using SSRF against 127.0.0.1, 169.254.169.254 (Cloud metadata)",
        ],
        terminalCommands: [
          "ipcalc 192.168.1.0/24",
          "ip route show",
          "curl -s http://169.254.169.254/latest/meta-data/",
        ],
        proTips: [
          "When auditing cloud infrastructure, 169.254.169.254 is link-local metadata; never leave it unchecked in SSRF testing.",
        ],
      },
      {
        id: "l-1-6",
        lessonNumber: "1.6",
        title: "Wireshark & Packet Capture Forensics",
        duration: "3 Hours",
        badge: "Hands-On",
        summary:
          "Capturing, filtering, and dissecting live traffic streams to analyze TLS handshakes, basic auth leaks, and suspicious payloads.",
        keyTopics: [
          "Capture filters vs Display filters syntax in Wireshark",
          "Filtering HTTP credentials: `http.request.method == 'POST'` and `http contains 'password'`",
          "Following TCP Streams to rebuild full conversation payloads",
          "Exporting TLS session master keys via `SSLKEYLOGFILE` to decrypt HTTPS traffic in Wireshark",
        ],
        terminalCommands: [
          "sudo wireshark -i eth0 -k",
          "tshark -i eth0 -Y 'http.request.method == \"POST\"' -T fields -e http.host -e http.request.uri",
          "export SSLKEYLOGFILE=~/sslkeys.log",
        ],
        proTips: [
          "Use `tshark` in headless cloud VPS setups to monitor automated scanner traffic in real-time.",
        ],
      },
    ],
    handsOnLab: {
      title: "Lab 1: DNS Zone Transfer & Packet Forensic Capture",
      target: "Vulnerable Practice Nameservers & Local Wireshark Stream",
      goal: "Perform full DNS enumeration on an enterprise target, discover unlisted subdomains via AXFR, and capture credentials in transit.",
      steps: [
        "1. Identify all authoritative nameservers for the target using `dig ns <target>`.",
        "2. Query each nameserver for AXFR zone transfer using `dig axfr <target> @<nameserver>`.",
        "3. Launch Wireshark, set display filter `dns || http`, and trigger authentication requests.",
        "4. Follow the TCP stream of the authentication payload to retrieve intercepted parameters.",
      ],
      verification: "Confirm successful retrieval of internal hostnames and cleartext credentials from the capture stream.",
    },
    checklist: [
      { id: "ch1-t1", label: "Mastered all 7 layers of the OSI model and their offensive attack surfaces" },
      { id: "ch1-t2", label: "Understood TCP 3-Way Handshake flags (SYN, ACK, RST, FIN, PSH, URG)" },
      { id: "ch1-t3", label: "Tested DNS Zone Transfer (AXFR) using dig and dnsrecon" },
      { id: "ch1-t4", label: "Dissected raw HTTP/1.1 request & response headers using Netcat and cURL" },
      { id: "ch1-t5", label: "Calculated CIDR subnets (/24, /28, /30) and memorized RFC 1918 private ranges" },
      { id: "ch1-t6", label: "Captured and inspected live traffic using Wireshark and followed TCP Streams" },
      { id: "ch1-t7", label: "Extracted HTTP POST payloads and credentials using tshark CLI filters" },
      { id: "ch1-t8", label: "Understood AWS link-local IP 169.254.169.254 metadata endpoint mechanism" },
    ],
  },
  {
    id: "ch-2-kali",
    chapterNumber: 2,
    title: "Kali Linux Architecture & Offensive Command Line",
    subtitle: "Terminal Power Tools, Text Processing, Process Isolation, SSH Tunnels & Bash Automation",
    badge: "Chapter 2 • OS Mastery",
    duration: "16 Hours • 6 Lessons",
    difficulty: "Beginner",
    description:
      "A hacker without mastery over the Linux shell is like a surgeon without surgical instruments. Master text-manipulation pipelines, background processes, SUID permissions, SSH tunneling, and building automated recon scripts.",
    iconName: "Terminal",
    lessons: [
      {
        id: "l-2-1",
        lessonNumber: "2.1",
        title: "Kali Linux Filesystem Hierarchy & Core Utilities",
        duration: "2.5 Hours",
        badge: "Linux Internals",
        summary:
          "Understanding `/etc`, `/var/log`, `/opt`, `/usr/share/wordlists`, package managers (apt, git), and environment variables.",
        keyTopics: [
          "Linux Directory Structure: `/etc/passwd`, `/etc/shadow`, `/var/log/auth.log`, `/tmp`, `/dev/shm`",
          "SecLists installation path: `/usr/share/seclists/` & wordlists management",
          "Configuring PATH variables, aliases, and persistent zsh/bash profiles",
        ],
        terminalCommands: [
          "sudo apt update && sudo apt install -y seclists curl jq ripgrep",
          "echo 'export PATH=$PATH:~/go/bin' >> ~/.zshrc && source ~/.zshrc",
          "ls -la /usr/share/wordlists/",
        ],
        proTips: [
          "Always install Go-based tools (`subfinder`, `httpx`, `nuclei`) into `~/go/bin` and add it to your PATH.",
        ],
      },
      {
        id: "l-2-2",
        lessonNumber: "2.2",
        title: "Text Processing Supremacy: grep, awk, sed, cut, sort & uniq",
        duration: "3 Hours",
        badge: "Data Pipelines",
        summary:
          "Turning messy recon outputs containing 50,000 URLs into clean, deduplicated, targetable scope files in seconds.",
        keyTopics: [
          "grep & ripgrep: Regex matching, inverse matching (-v), extract only matching patterns (-o)",
          "awk: Column manipulation, conditional printing, filtering by HTTP status codes",
          "sed: Stream editor for search and replace, removing protocols `http://` or trailing slashes",
          "sort -u & anew: Deduplication without losing stream speed",
        ],
        terminalCommands: [
          "cat urls.txt | grep -E '\\.php|\\.aspx' | sort -u > endpoints.txt",
          "cat targets.txt | awk '{print $1}' | cut -d':' -f1 | sort -u",
          "cat subdomains.txt | sed 's|^https\\?://||' | anew clean_subs.txt",
        ],
        proTips: [
          "Install `anew` by tomnomnom: `cat new_data.txt | anew master_list.txt` automatically appends only unique entries.",
        ],
      },
      {
        id: "l-2-3",
        lessonNumber: "2.3",
        title: "Permissions, SUID/SGID & Privilege Escalation Foundations",
        duration: "2.5 Hours",
        badge: "PrivEsc",
        summary:
          "Understanding octal permissions (755, 644), special bits (SUID 4000, SGID 2000, Sticky bit 1000), and GTFOBins.",
        keyTopics: [
          "Standard permissions: Read (4), Write (2), Execute (1) across User, Group, Others",
          "SUID bit vulnerability: Binaries executing with root permissions when invoked by low-privilege users",
          "GTFOBins: Exploiting legitimate system binaries (`find`, `vim`, `bash`, `python`) to spawn root shells",
        ],
        terminalCommands: [
          "find / -perm -4000 -type f 2>/dev/null",
          "sudo -l",
          "python3 -c 'import pty; pty.spawn(\"/bin/bash\")'",
        ],
        proTips: [
          "Bookmark `gtfobins.github.io` — it provides instant copy-paste commands for bypassing local shell restrictions.",
        ],
      },
      {
        id: "l-2-4",
        lessonNumber: "2.4",
        title: "SSH Keys, Local/Remote Port Forwarding & SOCKS Proxies",
        duration: "3 Hours",
        badge: "Tunneling",
        summary:
          "Pivoting into internal networks behind firewalls using SSH Dynamic Port Forwarding (-D) and Proxychains.",
        keyTopics: [
          "SSH Key Generation & Hardening: `ssh-keygen -t ed25519`",
          "Dynamic SOCKS5 Proxy (-D): Tunneling any browser or tool through a remote compromised bastion server",
          "Local Port Forwarding (-L): Accessing internal MySQL/Redis services listening only on 127.0.0.1",
          "Proxychains Configuration: Routing Nmap, cURL, and Burp through multi-hop proxy chains",
        ],
        terminalCommands: [
          "ssh -D 9050 -C -q -N user@remote-vps.com",
          "ssh -L 8080:127.0.0.1:3306 user@remote-vps.com",
          "proxychains nmap -sT -Pn 10.10.10.5",
        ],
        proTips: [
          "When running tools over Proxychains, always use TCP Connect scan (`nmap -sT`), because SYN stealth scans cannot traverse TCP proxies.",
        ],
      },
      {
        id: "l-2-5",
        lessonNumber: "2.5",
        title: "Background Jobs, Screen, Tmux & Process Monitoring",
        duration: "2 Hours",
        badge: "Productivity",
        summary:
          "Running 24-hour long fuzzing and mass-scanning jobs without disconnecting when SSH sessions drop.",
        keyTopics: [
          "Managing background jobs: `&`, `ctrl+z`, `bg`, `fg`, `jobs`, `nohup`",
          "Tmux Mastery: Creating persistent sessions, split panes, detaching (`ctrl+b d`), and reattaching (`tmux attach`)",
          "Monitoring resource exhaustion: `htop`, `ps aux --sort=-%mem`, killing rogue processes",
        ],
        terminalCommands: [
          "tmux new -s bugbounty",
          "nohup subfinder -d target.com -o subs.txt > /dev/null 2>&1 &",
          "tmux attach-session -t bugbounty",
        ],
        proTips: [
          "Always run recon in `tmux` on a remote VPS; never run multi-hour brute force jobs on your local laptop screen.",
        ],
      },
      {
        id: "l-2-6",
        lessonNumber: "2.6",
        title: "Building Automated Offensive Recon Bash Scripts",
        duration: "3 Hours",
        badge: "Automation",
        summary:
          "Creating a modular, error-handled shell script that orchestrates subfinder, httpx, nuclei, and alerts via Discord/Telegram webhooks.",
        keyTopics: [
          "Shell script structure: `set -euo pipefail` for strict error handling",
          "Parsing CLI arguments using `getopts`",
          "Streaming outputs between tools via Linux Unix pipelines without creating giant intermediate files",
          "Sending real-time Slack/Discord/Telegram webhook notifications when critical findings trigger",
        ],
        terminalCommands: [
          "chmod +x auto_recon.sh",
          "./auto_recon.sh -d target.com",
          "curl -H \"Content-Type: application/json\" -X POST -d '{\"content\":\"New Subdomain Found!\"}' $WEBHOOK_URL",
        ],
        proTips: [
          "Use `set -e` in all your bash scripts so execution halts immediately if a critical prerequisite fails.",
        ],
      },
    ],
    handsOnLab: {
      title: "Lab 2: Build a Continuous Subdomain Monitor in Bash",
      target: "Self-hosted VPS & Target Bounty Scope",
      goal: "Write an automated script that scans a target domain hourly, checks for new live HTTP services, and alerts your phone via Telegram.",
      steps: [
        "1. Write a bash script invoking `subfinder` piped to `anew subs_archive.txt`.",
        "2. Run `httpx -status-code -title` on any newly discovered subdomains.",
        "3. If new entries exist, send a POST request with the diff to a Discord/Telegram Webhook.",
        "4. Schedule the script in Linux cron using `crontab -e` to execute every 60 minutes.",
      ],
      verification: "Simulate adding a new subdomain and verify receiving an instant push notification on your phone.",
    },
    checklist: [
      { id: "ch2-t1", label: "Installed SecLists and configured Go binary tools directory in PATH" },
      { id: "ch2-t2", label: "Mastered grep, awk, sed, and cut for rapid scope filtering" },
      { id: "ch2-t3", label: "Understood SUID/SGID special permissions and checked GTFOBins" },
      { id: "ch2-t4", label: "Configured SSH Dynamic SOCKS5 Proxy (-D 9050) and Proxychains" },
      { id: "ch2-t5", label: "Created and managed detached Tmux sessions for continuous scanning" },
      { id: "ch2-t6", label: "Written a modular bash recon pipeline with error handling" },
      { id: "ch2-t7", label: "Integrated Discord/Telegram Webhook alerts in Linux scripts" },
      { id: "ch2-t8", label: "Configured Linux cron jobs for scheduled automated recon" },
    ],
  },
  {
    id: "ch-3-osint",
    chapterNumber: 3,
    title: "OSINT & Passive Reconnaissance Masterclass",
    subtitle: "Domain Intelligence, Certificate Transparency, GitHub Leaks & Shodan IoT Hunting",
    badge: "Chapter 3 • Passive Recon",
    duration: "16 Hours • 6 Lessons",
    difficulty: "Intermediate",
    description:
      "80% of critical bugs are discovered before sending a single offensive packet to the target. Learn passive reconnaissance: finding hidden staging environments, exposed API keys, and internal servers using public intelligence feeds.",
    iconName: "Search",
    lessons: [
      {
        id: "l-3-1",
        lessonNumber: "3.1",
        title: "Domain Intelligence, ASN Scoping & Reverse IP",
        duration: "2.5 Hours",
        badge: "Scoping",
        summary:
          "Finding an enterprise's entire IP range via Autonomous System Numbers (ASN), WHOIS records, and reverse IP lookups.",
        keyTopics: [
          "ASN Discovery: Identifying company IP allocations (e.g. AS15169 for Google) using BGPview & Hurricane Electric",
          "Reverse WHOIS: Finding associated domains registered under the same corporate email or registrant name",
          "Acquisition & Merger Mapping: Researching Crunchbase and SEC 10-K filings to expand bounty scope legally",
        ],
        terminalCommands: [
          "whois -h whois.radb.net -- '-i origin AS15169'",
          "amass intel -org 'Target Organization'",
          "amass intel -asn 12345",
        ],
        proTips: [
          "Always check bug bounty policy scope; if ASN or wildcards `*.target.com` are in scope, you have thousands of untapped assets.",
        ],
      },
      {
        id: "l-3-2",
        lessonNumber: "3.2",
        title: "Certificate Transparency (CT) Logs Mining",
        duration: "2.5 Hours",
        badge: "Passive Recon",
        summary:
          "Leveraging public SSL/TLS Certificate Transparency logs to find newly created subdomains minutes after generation.",
        keyTopics: [
          "How Certificate Transparency works: Every public TLS certificate issued by Let's Encrypt, DigiCert, etc., is permanently logged",
          "Querying crt.sh & C99 for subdomains and SAN (Subject Alternative Names)",
          "Real-time CT log streaming with `certstream` to catch new staging domains before firewalls protect them",
        ],
        terminalCommands: [
          "curl -s 'https://crt.sh/?q=%.target.com&output=json' | jq -r '.[].name_value' | sed 's/\\*\\.//g' | sort -u",
          "subfinder -d target.com -all -silent | anew subs.txt",
        ],
        proTips: [
          "Newly registered certificates containing words like `dev-`, `staging-`, `jira-`, `vpn-` usually have minimal security controls!",
        ],
      },
      {
        id: "l-3-3",
        lessonNumber: "3.3",
        title: "Google Dorking for High-Severity Bug Bounties",
        duration: "3 Hours",
        badge: "Dorking",
        summary:
          "Advanced Google search operator techniques to find exposed admin panels, confidential documents, `.env` files, and database dumps.",
        keyTopics: [
          "Core Google Operators: `site:`, `inurl:`, `intitle:`, `filetype:`, `ext:`, `-site:`",
          "Dorks for sensitive files: `site:target.com ext:env OR ext:yml OR ext:json intext:password`",
          "Dorks for exposed admin panels: `site:target.com inurl:admin OR inurl:login OR inurl:dashboard`",
          "Dorks for open cloud storage: `site:s3.amazonaws.com \"target\"`",
        ],
        terminalCommands: [
          "google-dork: site:target.com ext:log | ext:txt | ext:conf",
          "google-dork: site:target.com inurl:api/v1 | inurl:api/v2",
          "google-dork: site:target.com intitle:\"index of\" .git",
        ],
        proTips: [
          "Combine Google Dorking with Bing, Yahoo, and DuckDuckGo; each search engine indexes different internal dev URLs.",
        ],
      },
      {
        id: "l-3-4",
        lessonNumber: "3.4",
        title: "GitHub Reconnaissance & Secret Leak Extraction",
        duration: "3 Hours",
        badge: "Secret Hunting",
        summary:
          "Searching public GitHub repositories and developer commits for hardcoded AWS keys, database credentials, and internal API tokens.",
        keyTopics: [
          "GitHub Search syntax: `org:target \"AKIA\"`, `org:target \"AIza\"`, `\"target.com\" password`",
          "Automated secret scanning with TruffleHog and GitLeaks",
          "Mining developer personal accounts who work at the target company (often committing corporate keys to personal repos)",
        ],
        terminalCommands: [
          "trufflehog github --org=target-org",
          "gitleaks detect --source=./repo/ -v",
          "git log -p | grep -iE 'api_key|secret|password'",
        ],
        proTips: [
          "If a developer removed an API key in the latest commit, inspect `git log` or commit history; the secret is still in git history!",
        ],
      },
      {
        id: "l-3-5",
        lessonNumber: "3.5",
        title: "Shodan, Censys & FOFA Threat Intelligence",
        duration: "3 Hours",
        badge: "IoT & Cloud",
        summary:
          "Querying internet-wide port scans to locate origin web servers, unauthenticated Redis/Elasticsearch databases, and exposed cameras.",
        keyTopics: [
          "Shodan Search Filters: `ssl:\"target.com\"`, `org:\"Target Inc\"`, `http.title:\"Dashboard\"`",
          "Bypassing Cloudflare WAF: Finding the real Origin IP by matching SSL certificate serial numbers on Censys/Shodan",
          "Querying open databases: `port:9200 \"cluster_name\"` (Elasticsearch), `port:6379 \"redis_version\"`",
        ],
        terminalCommands: [
          "shodan search --fields ip_str,port 'ssl:target.com 200'",
          "censys search 'services.tls.certificates.leaf_data.subject.common_name: target.com'",
          "curl -s -H 'Host: target.com' http://<ORIGIN_IP> -k",
        ],
        proTips: [
          "Once you discover the origin IP behind Cloudflare, send your requests directly to that IP with `Host: target.com` to bypass all WAF protections!",
        ],
      },
      {
        id: "l-3-6",
        lessonNumber: "3.6",
        title: "Wayback Machine & Historic Parameter Extraction",
        duration: "2 Hours",
        badge: "Historic Data",
        summary:
          "Mining billions of archived URLs from the Wayback Machine, Common Crawl, and AlienVault OTX for deprecated parameters and endpoints.",
        keyTopics: [
          "Archived URL collectors: `gau` (GetAllUrls) & `waybackurls`",
          "Extracting vulnerable parameters: `ParamSpider` and filtering with `gf` patterns (sqli, xss, ssrf, idor)",
          "Testing historic endpoints that developers forgot to decommission (often running obsolete, unpatched software)",
        ],
        terminalCommands: [
          "echo 'target.com' | gau --subs --blacklist png,jpg,css,js | anew historic_urls.txt",
          "cat historic_urls.txt | gf sqli | anew potential_sqli.txt",
          "python3 paramspider.py -d target.com",
        ],
        proTips: [
          "Legacy APIs (e.g. `/api/v1/user` when `/api/v3` is current) frequently lack modern rate limiting and authorization checks.",
        ],
      },
    ],
    handsOnLab: {
      title: "Lab 3: Uncover Cloudflare Origin IP & Leaked GitHub Secret",
      target: "Simulated Enterprise Asset & Public OSINT Feeds",
      goal: "Use Shodan SSL matching to identify an origin IP bypassing Cloudflare, and extract a valid hardcoded API token from a GitHub commit.",
      steps: [
        "1. Query Shodan using `ssl:target.com` and collect candidates with port 80/443 open.",
        "2. Send an HTTP GET with `-H 'Host: target.com'` to confirm the response matches the production web app.",
        "3. Run TruffleHog against the target organization's public GitHub repositories.",
        "4. Validate the leaked credential against the target API endpoint.",
      ],
      verification: "Successfully communicate with the backend origin server without going through the Cloudflare WAF proxy.",
    },
    checklist: [
      { id: "ch3-t1", label: "Mapped enterprise IP ranges using BGP ASN lookups" },
      { id: "ch3-t2", label: "Queried Certificate Transparency logs via crt.sh and subfinder" },
      { id: "ch3-t3", label: "Built advanced Google Dorks for sensitive files and exposed panels" },
      { id: "ch3-t4", label: "Executed automated GitHub secret hunting with TruffleHog" },
      { id: "ch3-t5", label: "Found unauthenticated Elasticsearch/Redis instances on Shodan" },
      { id: "ch3-t6", label: "Identified Cloudflare Origin IP via Shodan/Censys SSL certificates" },
      { id: "ch3-t7", label: "Extracted historical parameters using gau, waybackurls, and gf patterns" },
      { id: "ch3-t8", label: "Discovered deprecated v1 API routes from archive endpoints" },
    ],
  },
  {
    id: "ch-4-active-recon",
    chapterNumber: 4,
    title: "Active Reconnaissance, Port Scanning & Fuzzing",
    subtitle: "Advanced Nmap, Masscan, Httpx, Nuclei & Content Discovery Fuzzing with ffuf",
    badge: "Chapter 4 • Active Attack Surface",
    duration: "18 Hours • 6 Lessons",
    difficulty: "Intermediate",
    description:
      "Transition from passive intelligence to active probing. Master port scanning mechanics, probe HTTP response behaviors, automate vulnerability triage with Nuclei, and fuzz web applications with SecLists wordlists.",
    iconName: "Target",
    lessons: [
      {
        id: "l-4-1",
        lessonNumber: "4.1",
        title: "Nmap Advanced Scanning, Evasion & Timing",
        duration: "3 Hours",
        badge: "Port Scanning",
        summary:
          "Fine-tuning Nmap performance, timing templates (T1 to T5), packet fragmentation, source port manipulation, and service versioning.",
        keyTopics: [
          "Port Scanning Flag Combos: `-sS -sV -sC -Pn -T4 --open`",
          "Scanning all 65,535 ports: `-p- --min-rate 1000`",
          "Firewall evasion: Fragmenting packets (`-f`), MTU manipulation (`--mtu 24`), spoofing source port (`--source-port 53` for DNS)",
        ],
        terminalCommands: [
          "sudo nmap -sS -p- --min-rate 2000 -T4 target.com -oN full_ports.txt",
          "sudo nmap -sV -sC -p 80,443,8080,8443 target.com -oA detailed_scan",
          "sudo nmap -sS -f --mtu 32 -D RND:5 target.com",
        ],
        proTips: [
          "Always use `--min-rate 1500` when scanning 65k ports to finish in under 3 minutes instead of 2 hours.",
        ],
      },
      {
        id: "l-4-2",
        lessonNumber: "4.2",
        title: "Nmap Scripting Engine (NSE) for Rapid Exploitation",
        duration: "3 Hours",
        badge: "NSE Scripts",
        summary:
          "Harnessing Lua-based Nmap scripts to discover default credentials, SMB vulnerabilities (EternalBlue), SSL weaknesses, and RCE.",
        keyTopics: [
          "Script categories: `default`, `vuln`, `auth`, `safe`, `discovery`",
          "SSL/TLS audit scripts: `ssl-enum-ciphers`, `ssl-heartbleed`",
          "Web vulnerability discovery scripts: `http-enum`, `http-headers`, `http-methods`, `http-shellshock`",
        ],
        terminalCommands: [
          "nmap -p 443 --script ssl-enum-ciphers target.com",
          "nmap -p 80,443 --script http-vuln-* target.com",
          "nmap -p 445 --script smb-vuln-ms17-010 target.com",
        ],
        proTips: [
          "Use `--script-args` to pass custom credentials and wordlists to NSE scripts during authenticated auditing.",
        ],
      },
      {
        id: "l-4-3",
        lessonNumber: "4.3",
        title: "Mass Port Scanning with Masscan & Naabu",
        duration: "2.5 Hours",
        badge: "Massive Scans",
        summary:
          "Scanning entire /16 CIDR ranges (65,536 hosts) in under 2 minutes using asynchronous raw SYN generators.",
        keyTopics: [
          "Masscan architecture: Custom asynchronous TCP stack transmitting up to 10 million packets per second",
          "Naabu: ProjectDiscovery port scanner that integrates natively with Nmap and pipelines into httpx",
          "Avoiding router crashing and ISP bandwidth throttling during high-rate scans",
        ],
        terminalCommands: [
          "sudo masscan -p80,443,8080 192.168.1.0/24 --rate=1000 -oG masscan_out.txt",
          "naabu -host target.com -p - -rate 1500 | httpx -title -status-code",
        ],
        proTips: [
          "Pipe `naabu` output directly into `httpx` to instantly identify web servers running on non-standard ports (e.g. 8443, 8888, 9090).",
        ],
      },
      {
        id: "l-4-4",
        lessonNumber: "4.4",
        title: "HTTP Service Probing with Httpx",
        duration: "2.5 Hours",
        badge: "HTTP Probing",
        summary:
          "Probing thousands of subdomains for live web services, status codes, page titles, tech stacks, and response hashes.",
        keyTopics: [
          "Httpx core flags: `-title`, `-status-code`, `-tech-detect`, `-ip`, `-cdn`, `-content-length`",
          "Filtering out CDN false positives (detecting Akamai, Cloudflare, Fastly)",
          "Extracting response hashes (`-hash sha256`) to group duplicate default error pages",
        ],
        terminalCommands: [
          "cat subs.txt | httpx -silent -status-code -title -tech-detect -follow-redirects",
          "cat subs.txt | httpx -mc 200,302,401,403 -o live_web.txt",
          "cat subs.txt | httpx -path '/admin' -mc 200",
        ],
        proTips: [
          "Use `-mc 401,403` to find protected staging panels — these are prime candidates for 403 bypass techniques!",
        ],
      },
      {
        id: "l-4-5",
        lessonNumber: "4.5",
        title: "Automated Vulnerability Scanning with Nuclei",
        duration: "3.5 Hours",
        badge: "Nuclei Power",
        summary:
          "Running fast template-based vulnerability scans across thousands of hosts for known CVEs, misconfigurations, and default credentials.",
        keyTopics: [
          "Nuclei architecture: Community YAML templates categorized by severity and vulnerability type",
          "Filtering scans by tags: `-tags cve,rce,ssrf,takeover`",
          "Writing custom Nuclei YAML templates with matchers (word, regex, status) and extractors",
        ],
        terminalCommands: [
          "nuclei -update-templates",
          "nuclei -l live_web.txt -tags cve,misconfig -severity critical,high",
          "nuclei -u https://target.com -t exposures/tokens/ -v",
        ],
        proTips: [
          "Write your own private Nuclei templates whenever a new CVE drops on Twitter; you can scan your entire target list before anyone else!",
        ],
      },
      {
        id: "l-4-6",
        lessonNumber: "4.6",
        title: "Directory & Content Discovery Fuzzing with ffuf",
        duration: "3.5 Hours",
        badge: "Fuzzing",
        summary:
          "High-speed content discovery, parameter fuzzing, recursion, and filtering out noise using SecLists wordlists.",
        keyTopics: [
          "ffuf syntax: `-u https://target.com/FUZZ -w /path/to/wordlist`",
          "Filtering options: `-fc 404`, `-fs <size>` (filter exact size), `-fw <words>`, `-fl <lines>`",
          "Parameter fuzzing: `ffuf -u https://target.com/page?FUZZ=test -w parameters.txt`",
          "Recursion flags: `-recursion -recursion-depth 2`",
        ],
        terminalCommands: [
          "ffuf -u https://target.com/FUZZ -w /usr/share/seclists/Discovery/Web-Content/raft-medium-directories.txt -mc 200,301,302 -fc 404",
          "ffuf -u https://target.com/FUZZ -w /usr/share/seclists/Discovery/Web-Content/quickhits.txt -fs 1240",
          "ffuf -u https://target.com/api/v1/users?FUZZ=1 -w /usr/share/seclists/Discovery/Web-Content/burp-parameter-names.txt -fs 240",
        ],
        proTips: [
          "When you get 5,000 false positives with status 200, check the content length of the false response and use `-fs <length>` to filter them out instantly.",
        ],
      },
    ],
    handsOnLab: {
      title: "Lab 4: Automated Active Recon Pipeline Execution",
      target: "Self-Hosted Vulnerable Application (OWASP Juice Shop / DVWA)",
      goal: "Execute a full active recon chain: Port scan with Naabu, probe HTTP with Httpx, fuzz directories with ffuf, and execute a Nuclei scan.",
      steps: [
        "1. Scan all 65,535 ports on the target using `naabu -p -`.",
        "2. Feed discovered ports into `httpx -status-code -title -tech-detect`.",
        "3. Run `ffuf` against discovered web ports using `raft-medium-directories.txt` with size filtering.",
        "4. Run a focused `nuclei` scan targeting misconfigurations and exposed panels.",
      ],
      verification: "Locate hidden administration portals and exposed database credentials through fuzzing logs.",
    },
    checklist: [
      { id: "ch4-t1", label: "Mastered Nmap timing templates and full 65k port scans" },
      { id: "ch4-t2", label: "Audited SSL ciphers and web services using Nmap NSE scripts" },
      { id: "ch4-t3", label: "Conducted high-speed port scanning using Masscan and Naabu" },
      { id: "ch4-t4", label: "Probed live web servers and tech stacks using Httpx" },
      { id: "ch4-t5", label: "Executed template-based vulnerability scans using Nuclei" },
      { id: "ch4-t6", label: "Written a custom Nuclei YAML template with matchers" },
      { id: "ch4-t7", label: "Fuzzed web directories using ffuf and filtered response sizes with -fs" },
      { id: "ch4-t8", label: "Fuzzed GET/POST query parameters using SecLists parameter wordlists" },
    ],
  },
  {
    id: "ch-5-burp",
    chapterNumber: 5,
    title: "Burp Suite Pro Masterclass & Traffic Interception",
    subtitle: "Proxy Setup, Repeater, Intruder Attacks, Turbo Intruder & Race Conditions",
    badge: "Chapter 5 • The Primary Weapon",
    duration: "20 Hours • 6 Lessons",
    difficulty: "Intermediate",
    description:
      "Burp Suite is the industry-standard toolkit for web penetration testing and bug bounty hunting. Master request interception, Scope definitions, automated payload injections, single-packet race conditions, and essential extensions.",
    iconName: "Wrench",
    lessons: [
      {
        id: "l-5-1",
        lessonNumber: "5.1",
        title: "Proxy Setup, SSL Certificates & Target Scope Architecture",
        duration: "3 Hours",
        badge: "Setup",
        summary:
          "Configuring browser interception, importing the PortSwigger CA certificate, and defining precise regex Target Scope to prevent legal out-of-scope testing.",
        keyTopics: [
          "Installing PortSwigger CA certificate into Firefox and system trust store",
          "Target Scope configuration: Including `.*\\.target\\.com` and excluding CDN/logout endpoints",
          "Using Burp's embedded Chromium browser for immediate pre-configured testing",
        ],
        terminalCommands: [
          "curl http://127.0.0.1:8080/cert -o cacert.der",
          "openssl x509 -inform DER -in cacert.der -out cacert.pem",
        ],
        proTips: [
          "Always check 'Drop out-of-scope traffic' in Proxy Options so your Burp sitemap doesn't fill with third-party tracking scripts.",
        ],
      },
      {
        id: "l-5-2",
        lessonNumber: "5.2",
        title: "Burp Repeater & Request Mutation Mastery",
        duration: "3 Hours",
        badge: "Repeater",
        summary:
          "Manipulating HTTP headers, switching HTTP methods (GET/POST/PUT/PATCH), modifying MIME types, and observing raw response differentials.",
        keyTopics: [
          "Repeater shortcuts: `Ctrl+R` to send to Repeater, `Ctrl+Space` to fire request",
          "Method tampering: Changing `GET /api/user` to `POST /api/user` or `PUT /api/user` to bypass authorization checks",
          "Header manipulation: `X-Original-URL`, `X-Rewrite-URL`, `X-Forwarded-For: 127.0.0.1`",
        ],
        terminalCommands: [
          "curl -X PUT -H 'Content-Type: application/json' -d '{\"role\":\"admin\"}' https://target.com/api/user/10",
        ],
        proTips: [
          "Use Repeater Tab Groups to organize related endpoints (e.g. Authentication, Cart, Profile, Checkout).",
        ],
      },
      {
        id: "l-5-3",
        lessonNumber: "5.3",
        title: "Burp Intruder: All 4 Attack Modes Dissected",
        duration: "3.5 Hours",
        badge: "Intruder",
        summary:
          "Mastering Sniper, Battering Ram, Pitchfork, and Cluster Bomb attack modes for fuzzing, credential stuffing, and ID enumeration.",
        keyTopics: [
          "Sniper: Tests 1 payload position at a time (ideal for fuzzing parameter vulnerabilities)",
          "Battering Ram: Tests identical payload across all positions simultaneously",
          "Pitchfork: Iterates through multiple payload sets in parallel (Set 1 Username paired with Set 2 Password)",
          "Cluster Bomb: Tests every permutation of multiple payload sets (exhaustive brute-force)",
        ],
        terminalCommands: [
          "ffuf -u https://target.com/login -X POST -d 'user=FUZZ&pass=test' -w users.txt",
        ],
        proTips: [
          "In Community edition, Intruder is throttled; use `ffuf` or `Turbo Intruder` for high-speed brute forcing without limitations.",
        ],
      },
      {
        id: "l-5-4",
        lessonNumber: "5.4",
        title: "Turbo Intruder & Single-Packet Race Conditions",
        duration: "4 Hours",
        badge: "High Severity",
        summary:
          "Writing custom Python single-packet attack scripts to exploit concurrency flaws, duplicate coupon redemption, and double withdrawals.",
        keyTopics: [
          "Race Condition Theory: Exploiting the time-of-check to time-of-use (TOCTOU) gap between database read and write operations",
          "Single-Packet Attack: Packaging 50 requests inside a single TCP packet over HTTP/2 to arrive at the server in the exact same microsecond",
          "Writing Turbo Intruder Python handlers: `queueRequests` and `handleResponse`",
        ],
        terminalCommands: [
          "turbo-intruder: engine.queue(target.req, gate='race1')",
          "turbo-intruder: engine.openGate('race1')",
        ],
        proTips: [
          "Test Turbo Intruder on gift card redemption, discount coupons, upvoting systems, and fund transfers for instant critical payouts.",
        ],
      },
      {
        id: "l-5-5",
        lessonNumber: "5.5",
        title: "Match & Replace Rules for Automated Testing",
        duration: "3 Hours",
        badge: "Automation",
        summary:
          "Configuring proxy Match and Replace rules to auto-spoof IP headers, strip security headers, and test unauthorized access.",
        keyTopics: [
          "Auto-injecting headers: `X-Forwarded-For: 127.0.0.1` on all outgoing requests",
          "Stripping client-side validation: Auto-removing `disabled` and `readonly` attributes from HTML forms",
          "Replacing User-Agent with Googlebot (`Googlebot/2.1`) to inspect search engine bypasses",
        ],
        terminalCommands: [
          "burp-rule: Match: ^(Host:.*) -> Replace: $1\\r\\nX-Forwarded-For: 127.0.0.1",
        ],
        proTips: [
          "Create a Match and Replace rule that replaces User A's session cookie with User B's cookie to test every clicked button for IDOR in real time!",
        ],
      },
      {
        id: "l-5-6",
        lessonNumber: "5.6",
        title: "Essential BApp Store Extensions Matrix",
        duration: "3.5 Hours",
        badge: "Extensions",
        summary:
          "Supercharging Burp Suite with Autorize, Logger++, JSON Web Tokens, Param Miner, and Flow.",
        keyTopics: [
          "Autorize: Automated horizontal and vertical authorization testing while you browse normally",
          "Param Miner: Automatic discovery of unlinked and hidden HTTP request parameters",
          "JSON Web Token (JWT) Editor: Forging JWTs, testing 'none' algorithm and key confusion attacks",
        ],
        terminalCommands: [
          "burp-extension: Install Autorize from BApp Store",
          "burp-extension: Configure Low-Privilege Cookie in Autorize",
        ],
        proTips: [
          "Leave Autorize running in the background while performing manual site browsing; it automatically flags every IDOR you stumble across!",
        ],
      },
    ],
    handsOnLab: {
      title: "Lab 5: Exploit a Coupon Race Condition with Turbo Intruder",
      target: "PortSwigger Lab: Exploiting Time-of-Check to Time-of-Use Race Conditions",
      goal: "Use Turbo Intruder with a single-packet gate to apply a 20% discount coupon 10 times on a single cart item to purchase a $1,000 item for $0.",
      steps: [
        "1. Intercept the `POST /cart/coupon` request in Burp Suite.",
        "2. Send the request to Extensions → Turbo Intruder.",
        "3. Select the `race-single-packet-attack.py` template.",
        "4. Queue 30 requests and release the single-packet gate simultaneously.",
        "5. Observe the final shopping cart total drop below zero and checkout successfully.",
      ],
      verification: "Confirm the product is purchased with an inflated discount exceeding the permitted single application.",
    },
    checklist: [
      { id: "ch5-t1", label: "Configured Burp Suite Proxy and imported PortSwigger CA Certificate" },
      { id: "ch5-t2", label: "Defined strict regex Target Scope to prevent out-of-scope traffic" },
      { id: "ch5-t3", label: "Mastered Burp Repeater request tampering and method switching" },
      { id: "ch5-t4", label: "Understood all 4 Burp Intruder attack modes (Sniper, Battering Ram, Pitchfork, Cluster Bomb)" },
      { id: "ch5-t5", label: "Written and executed single-packet race condition attacks in Turbo Intruder" },
      { id: "ch5-t6", label: "Configured automated Match & Replace rules for header spoofing" },
      { id: "ch5-t7", label: "Installed and automated authorization audits with Autorize BApp extension" },
      { id: "ch5-t8", label: "Discovered hidden parameters using Param Miner extension" },
    ],
  },
  {
    id: "ch-6-bugs",
    chapterNumber: 6,
    title: "100+ Web Vulnerabilities & Bug Bounty Exploitation",
    subtitle: "IDOR, SQLi, XSS, SSRF, Broken Access Control, CSRF, File Upload RCE & Business Logic",
    badge: "Chapter 6 • The Offensive Arsenal",
    duration: "30 Hours • 10 Lessons",
    difficulty: "Advanced",
    description:
      "The complete offensive encyclopedia. Master testing methodologies, impact demonstrations, bypass techniques, and remediation guidance for over 100 web application vulnerabilities tested on live bug bounty programs.",
    iconName: "Bug",
    lessons: [
      {
        id: "l-6-1",
        lessonNumber: "6.1",
        title: "IDOR & Broken Object Level Authorization (BOLA)",
        duration: "3 Hours",
        badge: "High Bounty",
        summary:
          "Manipulating numeric IDs, UUIDs, and hidden parameters in REST and GraphQL APIs to view and modify sensitive user records.",
        keyTopics: [
          "Numeric ID parameter tampering: `GET /api/documents/1029` → `1030`",
          "UUID bypass techniques: Finding leaked UUIDs in public profile endpoints, comments, or historic URLs",
          "Method switching & JSON parameter pollution: Changing GET to POST/PUT/DELETE to manipulate foreign data",
          "Testing IDOR in PDF/Invoice generation endpoints and password reset flows",
        ],
        terminalCommands: [
          "curl -H 'Authorization: Bearer USER_A_TOKEN' https://target.com/api/v1/orders/USER_B_ID",
        ],
        proTips: [
          "Whenever you see an encoded identifier, check if it's Base64! `eyJpZCI6MTIzfQ==` decodes to `{\"id\":123}`.",
        ],
      },
      {
        id: "l-6-2",
        lessonNumber: "6.2",
        title: "SQL Injection (SQLi): Error, Union, Blind & Out-of-Band",
        duration: "3.5 Hours",
        badge: "Critical Impact",
        summary:
          "Extracting entire backend database schemas, bypassing login screens, and executing code via SQL injection.",
        keyTopics: [
          "Authentication Bypass: `' OR 1=1-- -` and `' OR '1'='1`",
          "Union-Based SQLi: Determining column counts (`ORDER BY 1,2,3...`) and data types (`UNION SELECT 'a',NULL`)",
          "Error-Based SQLi: Forcing database verbose errors via `EXTRACTVALUE`, `UPDATEXML`, or `CAST`",
          "Time-Based Blind SQLi: `'; IF (1=1) WAITFOR DELAY '0:0:5'--` and `pg_sleep(5)`",
          "SQLMap automation mastery: Tamper scripts, risk/level parameters, database dumping",
        ],
        terminalCommands: [
          "sqlmap -u 'https://target.com/item?id=1' --batch --dbs",
          "sqlmap -r request.txt -p id --tamper=space2comment --risk=3 --level=5 --dump",
        ],
        proTips: [
          "Never run `--dump-all` during bug bounties; dump only `current-user` and `current-db` to demonstrate critical impact responsibly.",
        ],
      },
      {
        id: "l-6-3",
        lessonNumber: "6.3",
        title: "Cross-Site Scripting (XSS): Reflected, Stored & DOM",
        duration: "3.5 Hours",
        badge: "Client-Side",
        summary:
          "Executing arbitrary JavaScript in victim browsers, stealing session cookies, crafting CSRF exploits, and bypassing Content Security Policies (CSP).",
        keyTopics: [
          "Contextual XSS: HTML Context, Attribute Context (`\" onfocus=alert(1) autofocus=\"`), JavaScript Context",
          "Stored XSS in user profiles, comments, SVG avatars, and invoice company names",
          "DOM-based XSS: Sinks (`innerHTML`, `document.write`, `location.href`) and Sources (`location.search`, `hash`)",
          "Content Security Policy (CSP) Bypasses: JSONP endpoints, CDN whitelists, base-uri injection",
        ],
        terminalCommands: [
          "payload: <img src=x onerror=alert(document.domain)>",
          "payload: \"><svg/onload=confirm(document.cookie)>",
          "payload: javascript:alert(document.domain)",
        ],
        proTips: [
          "Always prove impact in bug bounty reports: Instead of `alert(1)`, demonstrate reading sensitive CSRF tokens or user emails.",
        ],
      },
      {
        id: "l-6-4",
        lessonNumber: "6.4",
        title: "Server-Side Request Forgery (SSRF): Cloud Metadata & Internal Pivoting",
        duration: "3.5 Hours",
        badge: "Critical Impact",
        summary:
          "Forcing backend web servers to make requests to internal network services, Redis instances, and cloud metadata APIs.",
        keyTopics: [
          "AWS Metadata Extraction: `http://169.254.169.254/latest/meta-data/iam/security-credentials/`",
          "GCP & Azure Metadata Header Requirements & Bypasses",
          "Bypassing Blacklist Filters: Decimal IP (`2852039166`), Hex (`0x7f000001`), Octal (`0177.0.0.1`), Enclosed Alphanumerics, DNS Rebinding",
          "Blind SSRF Detection using ProjectDiscovery Interactsh & Burp Collaborator",
        ],
        terminalCommands: [
          "curl -s 'http://target.com/fetch?url=http://169.254.169.254/latest/meta-data/'",
          "interactsh-client",
        ],
        proTips: [
          "DNS Rebinding is the ultimate bypass for SSRF: Configure a domain that resolves to a public IP on the 1st request and 127.0.0.1 on the 2nd request.",
        ],
      },
      {
        id: "l-6-5",
        lessonNumber: "6.5",
        title: "Broken Access Control & Privilege Escalation",
        duration: "3 Hours",
        badge: "OWASP #1",
        summary:
          "Vertical privilege escalation (standard user becoming admin) and horizontal privilege escalation (accessing other users' resources).",
        keyTopics: [
          "Mass Assignment Vulnerability: Submitting `\"is_admin\": true` or `\"role\": \"superuser\"` in profile update requests",
          "Path Traversal & Admin Access: `GET /admin/users` blocked, but `GET /users/..;/admin/users` allowed by reverse proxies",
          "Feature toggle parameter tampering: `\"beta_features\": true`, `\"can_export\": true`",
        ],
        terminalCommands: [
          "curl -X PUT -H 'Content-Type: application/json' -d '{\"role\":\"admin\",\"is_verified\":true}' https://target.com/api/profile",
        ],
        proTips: [
          "Inspect all JavaScript files for hidden admin routes: search for strings like `'/admin'`, `'superadmin'`, `'manage_users'`.",
        ],
      },
      {
        id: "l-6-6",
        lessonNumber: "6.6",
        title: "CSRF & CORS Misconfigurations",
        duration: "3 Hours",
        badge: "Session Flaws",
        summary:
          "Forcing authenticated victims to perform unwanted actions, and exploiting permissive CORS headers (`Access-Control-Allow-Origin: *` with credentials) to steal private data.",
        keyTopics: [
          "Cross-Site Request Forgery (CSRF): Generating automated HTML exploit PoCs with auto-submitting forms",
          "Bypassing CSRF Defenses: SameSite cookie nuances (None vs Lax vs Strict), removing CSRF tokens entirely, content-type spoofing",
          "CORS Misconfiguration: Null origin reflection, dynamic origin reflection, wildcard regex errors (`target.com.attacker.com`)",
        ],
        terminalCommands: [
          "cors-poc: var req = new XMLHttpRequest(); req.open('GET', 'https://target.com/api/user', true); req.withCredentials = true; req.send();",
        ],
        proTips: [
          "If `Access-Control-Allow-Credentials: true` is present with an origin you control, you can read sensitive private user accounts across domains.",
        ],
      },
      {
        id: "l-6-7",
        lessonNumber: "6.7",
        title: "Malicious File Upload Attacks to Remote Code Execution (RCE)",
        duration: "3.5 Hours",
        badge: "RCE Critical",
        summary:
          "Bypassing client-side and server-side file upload filters to upload webshells, execute arbitrary commands, and compromise servers.",
        keyTopics: [
          "Extension Blacklist Bypasses: `.phtml`, `.php5`, `.php7`, `.phar`, `.jspx`, `.asp;.jpg`",
          "MIME-Type & Magic Byte Spoofing: Prepending GIF89a or PNG magic headers to PHP webshells",
          "SVG XML Entity Injection (XXE) & XSS through uploaded profile pictures",
          "Double Extension & Path Traversal filenames: `shell.php.png` or `../../shell.php`",
        ],
        terminalCommands: [
          "echo 'GIF89a;<?php system($_GET[\"cmd\"]); ?>' > shell.php.gif",
          "curl https://target.com/uploads/shell.php?cmd=id",
        ],
        proTips: [
          "If uploads are hosted on AWS S3 buckets rather than the web server, look for HTML/SVG upload allowing stored XSS instead of RCE.",
        ],
      },
      {
        id: "l-6-8",
        lessonNumber: "6.8",
        title: "JSON Web Token (JWT) Attacks & Key Confusion",
        duration: "2.5 Hours",
        badge: "Crypto & Auth",
        summary:
          "Cracking weak HMAC secrets, none-algorithm signature stripping, and exploiting public key confusion (RS256 to HS256).",
        keyTopics: [
          "JWT Anatomy: Header, Payload, Signature separated by dots",
          "Algorithm 'None' Attack: Stripping signature and setting `\"alg\": \"none\"`",
          "HMAC Secret Key Cracking using John The Ripper / Hashcat and rockyou.txt",
          "Algorithm Confusion Attack: Signing a token with the public RSA certificate using HMAC-SHA256",
        ],
        terminalCommands: [
          "hashcat -m 16500 jwt.txt /usr/share/wordlists/rockyou.txt",
          "jwt_tool.py <TOKEN> -X a",
        ],
        proTips: [
          "Use the `jwt_tool` CLI to automatically run 20+ known JWT attack variations against any token in 5 seconds.",
        ],
      },
      {
        id: "l-6-9",
        lessonNumber: "6.9",
        title: "Business Logic Flaws & E-Commerce Vulnerabilities",
        duration: "2.5 Hours",
        badge: "Business Logic",
        summary:
          "Tampering with prices, rounding errors, negative quantities, step skipping in workflows, and parameter manipulation.",
        keyTopics: [
          "Price Tampering: Changing `\"price\": 1000` to `\"price\": 0.01` in client checkout requests",
          "Integer Overflow & Negative Quantities: Purchasing 1 item with quantity -1 to credit account balance",
          "Workflow Step Skipping: Jumping from Step 1 (Select Product) directly to Step 4 (Order Confirmation)",
        ],
        terminalCommands: [
          "curl -X POST -d '{\"item_id\":10,\"quantity\":-5}' https://target.com/cart/add",
        ],
        proTips: [
          "Automated scanners cannot find business logic flaws; this is where manual human testing earns the highest bug bounty rewards.",
        ],
      },
      {
        id: "l-6-10",
        lessonNumber: "6.10",
        title: "Subdomain Takeover & Dangling DNS Records",
        duration: "2.5 Hours",
        badge: "Takeover",
        summary:
          "Detecting CNAME records pointing to abandoned third-party services (S3, GitHub Pages, Heroku, Shopify) and claiming ownership.",
        keyTopics: [
          "Dangling CNAME identification and matching with fingerprint fingerprints.json",
          "Claiming AWS S3 buckets: 'NoSuchBucket' error messages",
          "Claiming GitHub Pages: 'There isn't a GitHub Pages site here.'",
        ],
        terminalCommands: [
          "subjack -w subs.txt -t 100 -timeout 30 -ssl -v",
          "subzy run --targets subs.txt",
        ],
        proTips: [
          "Always take a non-destructive screenshot when verifying a subdomain takeover (e.g. create a text file proving ownership).",
        ],
      },
    ],
    handsOnLab: {
      title: "Lab 6: Full Chain Exploitation (IDOR + CSRF + File Upload RCE)",
      target: "Vulnerable Practice Lab (DVWA / PortSwigger Lab)",
      goal: "Chain multiple vulnerabilities together: find an IDOR exposing an admin API token, use CSRF to create an admin account, and upload a webshell for RCE.",
      steps: [
        "1. Intercept profile API queries and tamper with user ID to view admin details.",
        "2. Identify an unauthenticated endpoint accepting file uploads.",
        "3. Bypass extension validation using double extensions and magic bytes.",
        "4. Execute `id` and `whoami` through the uploaded webshell to confirm RCE.",
      ],
      verification: "Execute arbitrary system commands and display server hostname on the terminal.",
    },
    checklist: [
      { id: "ch6-t1", label: "Found and exploited IDOR/BOLA in REST and GraphQL APIs" },
      { id: "ch6-t2", label: "Executed Union-based and Time-based Blind SQL Injection" },
      { id: "ch6-t3", label: "Differentiated Reflected, Stored, and DOM-based Cross-Site Scripting" },
      { id: "ch6-t4", label: "Extracted cloud metadata credentials via Server-Side Request Forgery (SSRF)" },
      { id: "ch6-t5", label: "Bypassed Broken Access Control using mass assignment and path traversal" },
      { id: "ch6-t6", label: "Created working HTML Proof-of-Concept for CSRF and CORS data theft" },
      { id: "ch6-t7", label: "Bypassed file upload blacklists to achieve Remote Code Execution" },
      { id: "ch6-t8", label: "Cracked weak JWT HMAC secrets and exploited None-algorithm tokens" },
      { id: "ch6-t9", label: "Identified and exploited business logic price/quantity tampering" },
      { id: "ch6-t10", label: "Discovered and claimed dangling CNAME subdomain takeovers" },
    ],
  },
  {
    id: "ch-7-tools",
    chapterNumber: 7,
    title: "50+ Offensive Security Tools Matrix",
    subtitle: "Command Syntaxes, Configuration Flags & Production Weaponization",
    badge: "Chapter 7 • Tools Arsenal",
    duration: "16 Hours • 6 Lessons",
    difficulty: "Advanced",
    description:
      "A deep-dive into the top 50 offensive security tools used by professional penetration testers. Master their command line parameters, performance tuning, wordlist selection, and automation pipelines.",
    iconName: "Wrench",
    lessons: [
      {
        id: "l-7-1",
        lessonNumber: "7.1",
        title: "Proxy & Interception Tools (Burp, ZAP, Caido)",
        duration: "2.5 Hours",
        badge: "Proxies",
        summary: "Comparison and usage of Burp Suite Pro, OWASP ZAP, Caido, and Mitmproxy in headless and GUI modes.",
        keyTopics: [
          "OWASP ZAP Automated Spidering & API Active Scanning",
          "Caido: Rust-based lightweight interception proxy for resource-constrained environments",
          "Mitmproxy: Python-scriptable CLI proxy for inspecting mobile apps and WebSockets",
        ],
        terminalCommands: [
          "mitmproxy -p 8080 -s script.py",
          "zapr.sh -cmd -quickurl https://target.com",
        ],
        proTips: ["Use Caido on remote VPS servers when Burp Suite GUI is too slow over VNC."],
      },
      {
        id: "l-7-2",
        lessonNumber: "7.2",
        title: "Subdomain & DNS Recon Suite (Subfinder, Amass, Assetfinder)",
        duration: "2.5 Hours",
        badge: "Recon",
        summary: "Weaponizing passive sources, DNS resolvers, and brute-force wordlists for 100% domain coverage.",
        keyTopics: [
          "Subfinder configuration with API keys (Shodan, Censys, SecurityTrails, Chaos, VirusTotal)",
          "Amass passive intelligence and active DNS resolution pipelines",
          "Puredns & massdns: Resolving 100,000 domains per minute using valid public resolvers",
        ],
        terminalCommands: [
          "subfinder -d target.com -all -silent | anew subs.txt",
          "puredns bruteforce wordlist.txt target.com -r resolvers.txt -w resolved.txt",
        ],
        proTips: ["Always generate fresh resolver lists using `dnsvalidator` before large brute-force runs."],
      },
      {
        id: "l-7-3",
        lessonNumber: "7.3",
        title: "Fast Web Content Discovery (ffuf, Feroxbuster, Gobuster)",
        duration: "3 Hours",
        badge: "Fuzzers",
        summary: "Comparing Go and Rust web fuzzers, directory recursion, and filtering techniques.",
        keyTopics: [
          "Feroxbuster: Multi-threaded Rust directory brute-forcer with automatic recursion",
          "Gobuster: Modular directory, DNS, and VHost scanning tool",
          "ffuf: Advanced HTTP fuzzing with multiple wordlists and raw HTTP requests",
        ],
        terminalCommands: [
          "feroxbuster -u https://target.com -w wordlist.txt -t 50 -d 2",
          "gobuster dir -u https://target.com -w wordlist.txt -t 30 -k",
        ],
        proTips: ["Use Feroxbuster when you want automatic, hands-off recursive discovery into deep nested subfolders."],
      },
      {
        id: "l-7-4",
        lessonNumber: "7.4",
        title: "Crawlers & Parameter Discovery (Katana, Hakrawler, ParamSpider)",
        duration: "2.5 Hours",
        badge: "Crawlers",
        summary: "Parsing JavaScript files, crawling single-page applications (SPAs), and extracting hidden parameters.",
        keyTopics: [
          "Katana: Headless Chromium crawler parsing JavaScript routes and endpoints",
          "Hakrawler: Fast endpoint and asset parser from standard input",
          "ParamSpider: Mining parameters from the Wayback Machine without sending live traffic",
        ],
        terminalCommands: [
          "katana -u https://target.com -jc -d 3 -o crawled.txt",
          "echo 'https://target.com' | hakrawler -depth 2",
          "python3 paramspider.py -d target.com --level high",
        ],
        proTips: ["Always enable JavaScript crawling (`-jc`) in Katana to extract routes from React/Next.js/Vue web applications."],
      },
      {
        id: "l-7-5",
        lessonNumber: "7.5",
        title: "Vulnerability Scanning & CMS Tools (Nuclei, WPScan, Nikto)",
        duration: "2.5 Hours",
        badge: "Scanners",
        summary: "Automated vulnerability scanning, WordPress plugin audits, and server configuration analysis.",
        keyTopics: [
          "WPScan: Enumerating WordPress users, themes, and vulnerable plugins using WPScan API tokens",
          "Nikto: Legacy server misconfiguration scanner checking dangerous files and outdated software",
          "Nuclei: High-speed YAML template-based scanning",
        ],
        terminalCommands: [
          "wpscan --url https://target.com --enumerate u,vp,vt --api-token $WPSCAN_TOKEN",
          "nikto -h https://target.com -Tuning 1,2,3,b",
        ],
        proTips: ["Always register for a free WPScan API token; without it, WPScan cannot check plugin vulnerabilities against its database."],
      },
      {
        id: "l-7-6",
        lessonNumber: "7.6",
        title: "Exploitation & Cracking (SQLmap, Commix, Hydra, John The Ripper)",
        duration: "3 Hours",
        badge: "Exploitation",
        summary: "Automating SQL injection, Command Injection, online network login cracking, and offline hash cracking.",
        keyTopics: [
          "SQLmap: Advanced command injection, dumping databases, and tamper scripts",
          "Commix: Automated command injection and exploitation engine",
          "Hydra: Multi-threaded network login cracker for SSH, FTP, HTTP POST login forms",
          "John The Ripper & Hashcat: GPU/CPU password hash cracking with rockyou.txt",
        ],
        terminalCommands: [
          "commix --url='https://target.com/index.php?ip=127.0.0.1' --batch",
          "hydra -l admin -P /usr/share/wordlists/rockyou.txt target.com ssh -t 4",
          "hashcat -m 0 -a 0 md5_hashes.txt /usr/share/wordlists/rockyou.txt",
        ],
        proTips: ["For online Hydra brute forcing, keep threads low (`-t 4`) to prevent account lockouts and IP bans."],
      },
    ],
    handsOnLab: {
      title: "Lab 7: Master the Automated Attack Pipeline",
      target: "Self-Hosted Multi-Service Environment",
      goal: "Pipeline outputs seamlessly from Subfinder → Naabu → Httpx → Katana → Nuclei without writing a single line of manual code.",
      steps: [
        "1. Execute: `subfinder -d target.com -silent | naabu -silent | httpx -silent > targets.txt`",
        "2. Run Katana to crawl endpoints: `katana -l targets.txt -silent | anew endpoints.txt`",
        "3. Run Nuclei against discovered endpoints: `nuclei -l endpoints.txt -severity critical,high`",
      ],
      verification: "Confirm automated finding of critical vulnerabilities from raw root domain input.",
    },
    checklist: [
      { id: "ch7-t1", label: "Configured API keys in Subfinder for maximum subdomain yield" },
      { id: "ch7-t2", label: "Mastered high-speed directory fuzzing with Feroxbuster and ffuf" },
      { id: "ch7-t3", label: "Extracted single-page application routes using Katana headless crawler" },
      { id: "ch7-t4", label: "Identified outdated WordPress plugins using WPScan" },
      { id: "ch7-t5", label: "Automated SQL injection exploitation using SQLMap tamper scripts" },
      { id: "ch7-t6", label: "Automated command injection testing with Commix" },
      { id: "ch7-t7", label: "Cracked password hashes offline using Hashcat and John The Ripper" },
      { id: "ch7-t8", label: "Built a continuous toolchain pipeline connecting discovery to exploitation" },
    ],
  },
  {
    id: "ch-8-ctf",
    chapterNumber: 8,
    title: "CTF Platforms & Hands-On Vulnerable Labs",
    subtitle: "PortSwigger Web Security Academy, Hack The Box, TryHackMe & Local Docker Apps",
    badge: "Chapter 8 • Hands-On Labs",
    duration: "24 Hours • 5 Lessons",
    difficulty: "Advanced",
    description:
      "Theory without practice is worthless. This chapter provides structured learning paths across the world's top cybersecurity practice platforms, including setting up local vulnerable docker containers and completing real CTF challenges.",
    iconName: "Flag",
    lessons: [
      {
        id: "l-8-1",
        lessonNumber: "8.1",
        title: "Locally Hosted Vulnerable Labs with Docker",
        duration: "4 Hours",
        badge: "Local Labs",
        summary: "Deploying DVWA, OWASP Juice Shop, bWAPP, and WebGoat locally using Docker containers for legal, unrestricted practice.",
        keyTopics: [
          "Installing and managing Docker on Kali Linux",
          "Deploying OWASP Juice Shop: `docker run -d -p 3000:3000 bkimminich/juice-shop`",
          "Deploying Damn Vulnerable Web Application (DVWA): `docker run -d -p 80:80 vulnerables/web-dvwa`",
        ],
        terminalCommands: [
          "docker run -d -p 3000:3000 bkimminich/juice-shop",
          "docker run -d -p 8080:80 vulnerables/web-dvwa",
          "docker ps",
        ],
        proTips: ["Local Docker apps allow you to run aggressive fuzzers and SQLMap without risking legal trouble or IP blocks."],
      },
      {
        id: "l-8-2",
        lessonNumber: "8.2",
        title: "PortSwigger Web Security Academy Learning Path",
        duration: "6 Hours",
        badge: "Industry Standard",
        summary: "The definitive guide to conquering PortSwigger Academy's 200+ free hands-on web vulnerability labs.",
        keyTopics: [
          "Essential Apprentice labs: SQLi, Reflected XSS, Path Traversal, Access Control",
          "Practitioner challenges: Blind SQLi with conditional responses, 2FA bypasses, SSRF with whitelist bypasses",
          "Documenting solutions into personal penetration testing cheatsheets",
        ],
        terminalCommands: [
          "navigate: https://portswigger.net/web-security",
        ],
        proTips: ["Completing 100+ PortSwigger labs is the #1 credential top cybersecurity firms look for during hiring interviews."],
      },
      {
        id: "l-8-3",
        lessonNumber: "8.3",
        title: "TryHackMe: Web Fundamentals & Junior Penetration Tester",
        duration: "5 Hours",
        badge: "Guided Labs",
        summary: "Structured gamified rooms covering network enumeration, web exploitation, and privilege escalation.",
        keyTopics: [
          "Top THM Rooms: 'Web Fundamentals', 'Burp Suite Basics', 'OWASP Top 10', 'Junior Penetration Tester'",
          "Connecting through OpenVPN to access private lab subnets",
          "Privilege escalation paths on Linux and Windows boxes",
        ],
        terminalCommands: [
          "sudo openvpn user.ovpn",
        ],
        proTips: ["TryHackMe is the best platform for building initial confidence before stepping into unguided Hack The Box machines."],
      },
      {
        id: "l-8-4",
        lessonNumber: "8.4",
        title: "Hack The Box: Web Track & Boot2Root Machines",
        duration: "5 Hours",
        badge: "Advanced CTF",
        summary: "Attacking realistic, unguided virtual machines to gain user and root flags.",
        keyTopics: [
          "HTB Starting Point: Tier 0, 1, and 2 machines",
          "Web Track: Attacking serialized Java objects, SSTI (Server-Side Template Injection), and API authentication flaws",
          "Writing comprehensive CTF walkthroughs and post-mortem reports",
        ],
        terminalCommands: [
          "htb-cli: sudo openvpn htb-lab.ovpn",
        ],
        proTips: ["Never read the complete walkthrough if you get stuck; check only a one-line hint to keep building your problem-solving muscle."],
      },
      {
        id: "l-8-5",
        lessonNumber: "8.5",
        title: "OverTheWire: Bandit & Natas Wargames",
        duration: "4 Hours",
        badge: "Fundamentals",
        summary: "Command line wargames for mastering Linux and server-side web vulnerabilities level by level.",
        keyTopics: [
          "Bandit Levels 0-34: SSH password retrieval, base64 decoding, cron job hijacking",
          "Natas Levels 0-34: Source code auditing, session tampering, SQL injection, PHP file execution",
        ],
        terminalCommands: [
          "ssh bandit0@bandit.labs.overthewire.org -p 2220",
        ],
        proTips: ["Complete Natas Levels 0 to 20 to understand exactly how vulnerable PHP backend code looks under the hood."],
      },
    ],
    handsOnLab: {
      title: "Lab 8: Solve OWASP Juice Shop 5-Star Challenges",
      target: "Dockerized OWASP Juice Shop",
      goal: "Deploy Juice Shop in Docker, solve 10 vulnerabilities ranging from 1-star to 5-star, and extract the Scoreboard flag.",
      steps: [
        "1. Launch Juice Shop in Docker on port 3000.",
        "2. Access the hidden Score Board at `/score-board`.",
        "3. Exploit an SQL injection on the Login page to log in as administrator (`' OR 1=1--`).",
        "4. Tamper with basket contents via IDOR to checkout goods belonging to another user.",
      ],
      verification: "Score Board reflects completion of at least 10 challenges across diverse categories.",
    },
    checklist: [
      { id: "ch8-t1", label: "Deployed OWASP Juice Shop and DVWA locally with Docker" },
      { id: "ch8-t2", label: "Completed 25+ Apprentice labs on PortSwigger Web Security Academy" },
      { id: "ch8-t3", label: "Connected to TryHackMe and Hack The Box via OpenVPN" },
      { id: "ch8-t4", label: "Solved OWASP Top 10 rooms on TryHackMe" },
      { id: "ch8-t5", label: "Rooted 3 Easy/Medium Web machines on Hack The Box" },
      { id: "ch8-t6", label: "Completed Bandit levels 0-25 on OverTheWire" },
      { id: "ch8-t7", label: "Solved Natas levels 0-16 for web backend code review" },
      { id: "ch8-t8", label: "Documented complete exploit notes for every solved CTF room" },
    ],
  },
  {
    id: "ch-9-methodology",
    chapterNumber: 9,
    title: "Real-World Bug Bounty Reporting & VAPT Methodology",
    subtitle: "HackerOne/Bugcrowd Standards, CVSS 3.1 Scoring, PoC Construction & Commercial Auditing",
    badge: "Chapter 9 • Professional Practice",
    duration: "14 Hours • 5 Lessons",
    difficulty: "Advanced",
    description:
      "Finding the bug is only 50% of the job. Getting paid and earning Hall of Fame recognition requires writing pristine, reproducible reports with accurate CVSS scoring, clear remediation steps, and professional commercial VAPT deliverables.",
    iconName: "Award",
    lessons: [
      {
        id: "l-9-1",
        lessonNumber: "9.1",
        title: "Bug Bounty Platforms & Program Selection",
        duration: "2.5 Hours",
        badge: "Platforms",
        summary: "Navigating HackerOne, Bugcrowd, Intigriti, and Synack; choosing between VDPs (Hall of Fame) and Paid Bounties.",
        keyTopics: [
          "Understanding Vulnerability Disclosure Policies (VDP) vs Cash Bug Bounties",
          "Public vs Private Program Invitations: How to boost signal-to-noise ratio to earn private invites",
          "Analyzing Rules of Engagement (Out-of-Scope limits, rate limits, testing account markers)",
        ],
        terminalCommands: [
          "curl -H 'X-Bug-Bounty: hacker_username' https://target.com",
        ],
        proTips: ["Always include your platform username in a custom HTTP header (e.g. `X-Bug-Bounty: yourname`) so security teams recognize your testing."],
      },
      {
        id: "l-9-2",
        lessonNumber: "9.2",
        title: "Writing Triager-Ready Professional Vulnerability Reports",
        duration: "3 Hours",
        badge: "Reporting",
        summary: "Structuring bug reports that triagers love: clear summaries, step-by-step reproduction, impact proofs, and remediation.",
        keyTopics: [
          "The Anatomy of an Accepted Report: Title, Vulnerability Type, Asset, Severity, Summary, Steps to Reproduce, Impact, Remediation",
          "Creating clean PoC artifacts: Non-destructive screenshots, video recordings, cURL reproduction commands",
          "Avoiding generic copy-pasted scanner outputs that lead to instant 'Not Applicable' or 'Informative' closures",
        ],
        terminalCommands: [
          "report-structure: Title: [IDOR] Unauthorized modification of customer shipping address via /api/v1/user/address",
        ],
        proTips: ["Make your 'Steps to Reproduce' so clear that a non-technical manager could follow them and reproduce the bug in 2 minutes."],
      },
      {
        id: "l-9-3",
        lessonNumber: "9.3",
        title: "CVSS v3.1 Scoring & Severity Negotiation",
        duration: "2.5 Hours",
        badge: "CVSS Math",
        summary: "Calculating Attack Vector, Attack Complexity, Privileges Required, User Interaction, and CIA impact.",
        keyTopics: [
          "Base Metric Group: AV (Network/Adjacent/Local/Physical), AC (Low/High), PR (None/Low/High), UI (None/Required)",
          "Impact Metrics: Confidentiality (High/Low/None), Integrity, Availability",
          "Defending your severity when a triager tries to downgrade your Critical finding to Low",
        ],
        terminalCommands: [
          "cvss-calculator: https://www.first.org/cvss/calculator/3.1",
        ],
        proTips: ["If an IDOR allows updating passwords without knowing current password, it is Critical (CVSS 9.8); always cite CVSS vector string in your report."],
      },
      {
        id: "l-9-4",
        lessonNumber: "9.4",
        title: "Building Your Personal Hall of Fame & Brand",
        duration: "3 Hours",
        badge: "Brand & Career",
        summary: "Documenting achievements, Hall of Fame acknowledgments, responsible disclosure timelines, and writing technical writeups.",
        keyTopics: [
          "Publishing responsible disclosure writeups after patches are applied (following 90-day industry standard)",
          "Building an offensive security GitHub portfolio showing original scripts and research",
          "Maintaining an audit log of submitted bounties, acceptance rates, and payout metrics",
        ],
        terminalCommands: [
          "git commit -m 'Add writeup: How I found an RCE on Fortune 500 company'",
        ],
        proTips: ["Technical blog writeups are the fastest way to get noticed by headhunters and security directors looking for senior talent."],
      },
      {
        id: "l-9-5",
        lessonNumber: "9.5",
        title: "Commercial VAPT Methodology for Freelance & Enterprise Audits",
        duration: "3 Hours",
        badge: "Freelance",
        summary: "Delivering professional client penetration testing audits: scoping documents, NDAs, executive summaries, and formal client presentations.",
        keyTopics: [
          "Pre-engagement: Scoping agreements, rules of engagement, white-box vs black-box vs grey-box testing",
          "Executing standard methodologies (OWASP Testing Guide v4.2, PTES, NIST 800-115)",
          "Writing the Executive Summary for C-level executives vs Technical Findings for developers",
        ],
        terminalCommands: [
          "vapt-deliverable: Executive_Summary_VAPT_Audit.pdf",
        ],
        proTips: ["Clients evaluate your penetration test by the quality of your remediation advice, not just how cool your exploit was."],
      },
    ],
    handsOnLab: {
      title: "Lab 9: Draft an Audit-Grade Vulnerability Report",
      target: "Simulated Discovered Finding",
      goal: "Draft a formal, comprehensive penetration testing report for a Critical vulnerability with CVSS vector, step-by-step reproduction, and dev remediation code.",
      steps: [
        "1. Define the vulnerability summary and real-world business impact.",
        "2. Compute the exact CVSS v3.1 vector string (e.g. CVSS:3.1/AV:N/AC:L/PR:N/UI:N/S:U/C:H/I:H/A:H).",
        "3. Write numbered reproduction steps with exact HTTP requests and responses.",
        "4. Provide specific code remediation (e.g. prepared statements for SQLi or server-side authorization checks).",
      ],
      verification: "Review against industry standards for clarity, non-destructiveness, and technical completeness.",
    },
    checklist: [
      { id: "ch9-t1", label: "Created verified accounts on HackerOne, Bugcrowd, and Intigriti" },
      { id: "ch9-t2", label: "Configured custom security identification header in scanning tools" },
      { id: "ch9-t3", label: "Drafted a complete triager-ready vulnerability report" },
      { id: "ch9-t4", label: "Calculated accurate CVSS v3.1 base score and vector strings" },
      { id: "ch9-t5", label: "Defended vulnerability severity using business impact rationale" },
      { id: "ch9-t6", label: "Followed 90-day responsible disclosure protocol for resolved bugs" },
      { id: "ch9-t7", label: "Created an Executive Summary for commercial client penetration tests" },
      { id: "ch9-t8", label: "Built a public Hall of Fame portfolio of security credits" },
    ],
  },
  {
    id: "ch-10-certifications",
    chapterNumber: 10,
    title: "Certifications & Ethical Hacker Career Roadmap",
    subtitle: "CEH, eWPT, BSCP, OSCP Exam Blueprints, Resume Studio & Technical Interview Q&A",
    badge: "Chapter 10 • Career Mastery",
    duration: "18 Hours • 5 Lessons",
    difficulty: "Expert",
    description:
      "Transform your technical skills into high-paying employment. This final chapter provides targeted blueprints for the world's most prestigious security certifications, real technical interview questions, resume templates, and salary negotiation tactics.",
    iconName: "Award",
    lessons: [
      {
        id: "l-10-1",
        lessonNumber: "10.1",
        title: "Cybersecurity Certification Blueprints Compared",
        duration: "3 Hours",
        badge: "Cert Guide",
        summary: "Cost, format, syllabus, and career ROI comparison: CEH, eWPT, eJPT, BSCP, and OSCP.",
        keyTopics: [
          "eJPT (eLearnSecurity Junior Penetration Tester): Best introductory practical hands-on exam",
          "PortSwigger BSCP (Burp Suite Certified Practitioner): The ultimate affordable web pentesting badge ($99)",
          "eWPT (eLearnSecurity Web Application Penetration Tester): Dedicated commercial web auditing exam",
          "OffSec OSCP (PEN-200): The gold standard 24-hour practical penetration testing exam with Active Directory",
        ],
        terminalCommands: [
          "cert-path: eJPT -> PortSwigger BSCP -> OSCP",
        ],
        proTips: ["Get PortSwigger BSCP first ($99 exam fee); it costs a fraction of OSCP ($1,600+) and proves elite web security competence."],
      },
      {
        id: "l-10-2",
        lessonNumber: "10.2",
        title: "PortSwigger Certified Practitioner (BSCP) Exam Blueprint",
        duration: "4 Hours",
        badge: "BSCP Exam",
        summary: "Step-by-step battle plan to crack the 4-hour BSCP exam attacking two mystery enterprise web applications.",
        keyTopics: [
          "Exam structure: Stage 1 Access Low-Privilege User → Stage 2 Escalate to Admin → Stage 3 Read `/home/carlos/secret` on host",
          "Time management strategy: 2 hours per target application",
          "Automating repetitive checks with custom Burp Suite configurations and hotkeys",
        ],
        terminalCommands: [
          "exam-objective: Obtain /home/carlos/secret using Server-Side Template Injection or Deserialization",
        ],
        proTips: ["Complete all PortSwigger mystery lab challenges under timed conditions before booking the live exam."],
      },
      {
        id: "l-10-3",
        lessonNumber: "10.3",
        title: "OSCP (PEN-200) Exam Lab Strategy & Active Directory",
        duration: "4 Hours",
        badge: "OSCP Prep",
        summary: "Tackling the 24-hour OSCP exam: 3 standalone targets and a 40-point Active Directory domain controller chain.",
        keyTopics: [
          "Active Directory attack chain: Initial foothold → BloodHound domain mapping → Kerberoasting / AS-REP Roasting → DCSync",
          "Note-taking strategy using Obsidian/CherryTree for the 24-hour post-exam documentation report",
          "Sleep, hydration, and pacing strategies to avoid burnout during 24-hour practical exams",
        ],
        terminalCommands: [
          "bloodhound-python -d domain.local -u user -p pass -ns dc01.domain.local -c All",
          "GetUserSPNs.py domain.local/user:password -request",
        ],
        proTips: ["Start with the Active Directory set on the OSCP exam; compromising the Domain Controller yields 40 points instantly!"],
      },
      {
        id: "l-10-4",
        lessonNumber: "10.4",
        title: "Building an Elite Cybersecurity Resume & Portfolio",
        duration: "3.5 Hours",
        badge: "Resume Studio",
        summary: "Crafting an ATS-optimized penetration testing resume, showcasing GitHub tools, writeups, and CTF rankings.",
        keyTopics: [
          "Formatting technical projects: Highlighting tool creation, bug bounty discoveries, and security disclosures",
          "Presenting certifications and rankings (Hack The Box, TryHackMe, HackerOne profile links)",
          "Avoiding generic buzzwords; quantifying impact: 'Discovered and reported 14 critical vulnerabilities across Fortune 500 scopes'",
        ],
        terminalCommands: [
          "portfolio-link: https://github.com/yourname/security-tools",
        ],
        proTips: ["Link your live HackerOne/Bugcrowd profile and Hack The Box badge directly in your resume header."],
      },
      {
        id: "l-10-5",
        lessonNumber: "10.5",
        title: "Cracking the Technical Penetration Tester Interview",
        duration: "3.5 Hours",
        badge: "Interview Q&A",
        summary: "Top 50 technical interview questions asked by senior security managers and live technical assessment scenarios.",
        keyTopics: [
          "Core Interview Questions: How does HTTPS handshaking work? Explain the difference between Stored and DOM XSS? How to remediate SSRF?",
          "Live white-board architectural threat modeling: Securing a modern microservice authentication system",
          "Salary negotiation strategies for Junior vs Senior Offensive Security Engineers in India, US, and Remote roles",
        ],
        terminalCommands: [
          "interview-scenario: 'Walk me through how you would audit this multi-tenant SaaS application from scratch'",
        ],
        proTips: ["When interviewers ask how to fix a vulnerability, never just say 'sanitize input'; explain parameterized queries, contextual encoding, and architectural defense-in-depth."],
      },
    ],
    handsOnLab: {
      title: "Lab 10: Mock 4-Hour Technical Practical Exam",
      target: "Hardened Enterprise Simulation Box",
      goal: "Simulate a live commercial penetration test: conduct passive recon, identify an entry point, escalate to administrator, and generate a final signed certificate of completion.",
      steps: [
        "1. Conduct automated and manual reconnaissance within 30 minutes.",
        "2. Locate the initial vulnerability (SQLi or IDOR) to obtain lower-privilege credentials.",
        "3. Escalate privileges to root/administrator through a secondary flaw.",
        "4. Document the complete methodology and generate your verified Raghav Arora Platform Certificate.",
      ],
      verification: "Submit full proof of compromise and verify certificate issuance in the platform studio.",
    },
    checklist: [
      { id: "ch10-t1", label: "Selected target certification roadmap (BSCP / eWPT / OSCP)" },
      { id: "ch10-t2", label: "Completed all mystery lab challenges for PortSwigger BSCP preparation" },
      { id: "ch10-t3", label: "Mastered Active Directory Kerberoasting and lateral movement mechanics" },
      { id: "ch10-t4", label: "Built an ATS-optimized offensive cybersecurity resume" },
      { id: "ch10-t5", label: "Prepared answers for Top 50 Web Penetration Tester interview questions" },
      { id: "ch10-t6", label: "Practiced live whiteboard architectural threat modeling scenarios" },
      { id: "ch10-t7", label: "Completed the 4-hour mock practical assessment under strict timer" },
      { id: "ch10-t8", label: "Generated and claimed platform certificate of course completion" },
    ],
  },
];
