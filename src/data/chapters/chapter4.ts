import { RoadmapChapter } from "./types";

export const chapter4: RoadmapChapter = {
  id: "ch-4-active-recon",
  chapterNumber: 4,
  title: "Active Reconnaissance, Port Scanning & Fuzzing",
  subtitle: "Advanced Nmap, Masscan, Httpx, Nuclei & Content Discovery Fuzzing with ffuf",
  badge: "Chapter 4 • Active Attack Surface",
  duration: "18 Hours • 6 In-Depth Lessons",
  difficulty: "Intermediate",
  description:
    "Transition from passive intelligence to active tactical probing. Master the physics of TCP/UDP port scanning, bypass Next-Gen Firewalls and IDS/IPS with fragmentation and decoys, leverage Lua-based Nmap Scripting Engine (NSE), conduct internet-scale scanning with Masscan, probe HTTP behaviors with Httpx, fuzz web routes with ffuf, and automate vulnerability triaging with Nuclei templates.",
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
      studyNotes: [
        {
          heading: "TCP Half-Open (SYN) Scanning vs. Full Connect Scans",
          subheading: "The underlying packet mechanics and socket interactions of network scanners",
          points: [
            "SYN Stealth Scan (`-sS`): Nmap crafts a raw TCP SYN packet to a target port. If the port is open, the target replies with SYN-ACK. Nmap immediately transmits an RST (Reset) packet tearing down the connection without sending the final ACK. Because the 3-way handshake is never completed, traditional application layer logs (like Apache or IIS) never log an inbound connection!",
            "TCP Connect Scan (`-sT`): Uses the operating system's standard `connect()` system call to establish a full 3-way handshake (SYN -> SYN-ACK -> ACK). Required when scanning without root privileges or when routing through SOCKS/HTTP proxies (Proxychains).",
            "UDP Port Scanning (`-sU`): Because UDP is connectionless, an open port usually returns no response. A closed UDP port triggers an ICMP Type 3 Code 3 (Destination Unreachable: Port Unreachable) packet. Due to OS-level ICMP rate limiting (RFC 1812), UDP scanning can take hours unless tuned with `--min-rate`.",
            "Timing Templates (`-T0` to `-T5`): `-T4` is the industry standard for aggressive broadband scans; `-T2` and `-T1` insert multi-second delays between probes to evade Intrusion Detection System (IDS) threshold alerts.",
          ],
          callout: "Running `-sS` requires `sudo` privileges because crafting raw TCP packets bypassing the OS kernel network stack demands `CAP_NET_RAW` Linux capabilities.",
          diagramOrCode: `+-------------------------------------------------------------+
|               NMAP SYN STEALTH SCAN PACKET FLOW             |
+-------------------------------------------------------------+
 Attacker (Nmap)                                Target Port 443
       |                                              |
       | ------------ [ TCP SYN (Seq=100) ] --------> | (Port is Open)
       |                                              |
       | <--- [ TCP SYN-ACK (Seq=500, Ack=101) ] ---- |
       |                                              |
       | ------------ [ TCP RST (Seq=101) ] --------> | (Connection Killed)
       v                                              v
 Result: Port flagged OPEN! Application layer logging is completely bypassed!`
        },
        {
          heading: "Firewall & IDS/IPS Evasion Techniques",
          subheading: "Manipulating packet sizes, IP headers, and source attributes to bypass packet filters",
          points: [
            "Packet Fragmentation (`-f` or `--mtu`): Splits TCP headers across multiple tiny 8-byte or 16-byte IP fragments. Primitive stateful packet inspection firewalls fail to inspect signatures split across fragmented payloads.",
            "Source Port Spoofing (`--source-port 53`): Many legacy corporate firewalls are configured to blindly permit inbound traffic originating from port 53 (DNS) or port 123 (NTP) to prevent breaking enterprise name resolution.",
            "Decoy Scanning (`-D RND:10`): Generates 10 spoofed random IP addresses scanning the victim simultaneously alongside your real IP. System administrators see 11 simultaneous scans in their firewall logs, making it nearly impossible to determine which IP is the real attacker.",
            "Service & OS Fingerprinting (`-sV -O`): Probes services with a series of NULL and binary probes to match response signatures against Nmap's database of over 2,200 protocols and operating system TCP/IP stack quirks (TTL, window sizes).",
          ],
          callout: "Modern Next-Gen Firewalls (Palo Alto, Fortinet) reassemble IP fragments before inspection. When testing modern enterprise targets, rate-limiting and rotating source IPs via distributed VPS clusters is far more effective than basic fragmentation.",
          diagramOrCode: `NMAP SCANNING MASTER CHEATSHEET:
  # Fast, full 65,535 port scan:
  sudo nmap -sS -p- --min-rate 2000 -T4 target.com -oN all_ports.txt
  
  # Detailed service, script, and OS detection on open ports:
  sudo nmap -sV -sC -p 22,80,443,8080 target.com -oA targeted_scan
  
  # Evasion scan with decoys and DNS source port:
  sudo nmap -sS -Pn -D RND:5 --source-port 53 target.com`
        }
      ],
      keyTopics: [
        "Port Scanning Flag Combos: `-sS -sV -sC -Pn -T4 --open`",
        "Scanning all 65,535 ports: `-p- --min-rate 1000`",
        "Firewall evasion: Fragmenting packets (`-f`), MTU manipulation (`--mtu 24`), spoofing source port (`--source-port 53`)",
        "Decoy scanning (`-D`) to obscure true origin IP addresses",
      ],
      terminalCommands: [
        "sudo nmap -sS -p- --min-rate 2000 -T4 target.com -oN full_ports.txt",
        "sudo nmap -sV -sC -p 80,443,8080,8443 target.com -oA detailed_scan",
        "sudo nmap -sS -f --mtu 32 -D RND:5 target.com",
      ],
      proTips: [
        "Always use `--min-rate 1500` when scanning 65k ports to finish in under 3 minutes instead of 2 hours.",
        "Add `-Pn` to treat all hosts as online and bypass ICMP ping blocks enforced by modern cloud firewalls.",
      ],
    },
    {
      id: "l-4-2",
      lessonNumber: "4.2",
      title: "Nmap Scripting Engine (NSE) for Rapid Exploitation",
      duration: "3 Hours",
      badge: "NSE Scripts",
      summary:
        "Harnessing Lua-based Nmap scripts to discover default credentials, SMB vulnerabilities (EternalBlue), SSL weaknesses, and remote code execution.",
      studyNotes: [
        {
          heading: "NSE Architecture & Script Categories",
          subheading: "Automating deep protocol probing via Lua network coroutines",
          points: [
            "What is NSE? A powerful scripting environment embedded within Nmap allowing users to write and execute Lua scripts that interact directly with network services.",
            "Script Storage: Pre-installed scripts reside in `/usr/share/nmap/scripts/` along with the centralized database index `/usr/share/nmap/scripts/script.db`.",
            "Primary Categories: `vuln` (scans for known CVEs like EternalBlue, Shellshock, Log4j), `auth` (tests for default passwords or authentication bypasses), `discovery` (queries Active Directory, SNMP, and DNS zones), `safe` (passive scripts guaranteed not to crash services), and `intrusive` (high-risk scripts that may trigger service denial).",
            "Script Arguments (`--script-args`): Allows passing custom parameters like credentials, wordlists, or timeout thresholds (e.g. `--script-args user=admin,pass=admin`).",
          ],
          callout: "Before running `--script vuln` in a production corporate network, be aware that certain legacy vulnerability check scripts send malformed packets that can crash unstable Windows or industrial SCADA services. Always verify with `safe` or non-destructive scripts first.",
          diagramOrCode: `+-------------------------------------------------------------+
|                 NMAP SCRIPTING ENGINE (NSE) WORKFLOW        |
+-------------------------------------------------------------+
 Target: SMB Port 445
       |
       v (Run SMB Vulnerability Scripts)
 nmap -p 445 --script smb-vuln-ms17-010 target.com
       |
       v (NSE Script Execution)
 [ smb-vuln-ms17-010.nse triggers raw SMB transaction packets ]
       |
       v (Response Analyzed)
 | smb-vuln-ms17-010:
 |   VULNERABLE: Remote Code Execution vulnerability (EternalBlue)
 |   State: VULNERABLE
 |   IDs:  CVE:CVE-2017-0143
 Result: Immediate confirmation of critical RCE vulnerability!`
        },
        {
          heading: "High-Impact NSE Scripts for Web & Network Penetration Testing",
          subheading: "Automating SSL, SMB, and HTTP discovery during initial engagement",
          points: [
            "`ssl-enum-ciphers`: Connects to HTTPS (port 443) and grades every supported cipher suite, immediately identifying weak CBC ciphers, deprecated TLS 1.0/1.1 protocols, and POODLE vulnerabilities.",
            "`http-enum`: Fuzzes common web directories and CMS platforms (WordPress, Joomla, phpMyAdmin) against a lightweight dictionary.",
            "`http-methods`: Enumerates enabled HTTP verbs (`PUT`, `DELETE`, `TRACE`). If `PUT` is enabled, an attacker can upload a web shell directly to the web root.",
            "`vulners`: Queries the Vulners API database using the exact service version detected by `-sV`, returning active CVE identifiers and CVSS severity scores.",
          ],
          callout: "The `vulners` script is one of the fastest ways to turn an ordinary port scan into a structured vulnerability report. Simply run `nmap -sV --script vulners <target>` to generate CVE lists for every open port.",
          diagramOrCode: `HIGH-IMPACT NSE ONE-LINERS:
  # Check for EternalBlue (MS17-010):
  nmap -p 445 --script smb-vuln-ms17-010 target.com
  
  # Audit TLS versions and weak cryptographic ciphers:
  nmap -p 443 --script ssl-enum-ciphers target.com
  
  # Check for all known CVEs using version signatures:
  nmap -sV --script vulners target.com
  
  # Enumerate HTTP administrative directories:
  nmap -p 80,443 --script http-enum target.com`
        }
      ],
      keyTopics: [
        "Script categories: `default`, `vuln`, `auth`, `safe`, `discovery`",
        "SSL/TLS audit scripts: `ssl-enum-ciphers`, `ssl-heartbleed`",
        "Web vulnerability discovery scripts: `http-enum`, `http-headers`, `http-methods`",
        "Matching service version signatures to CVEs using `vulners`",
      ],
      terminalCommands: [
        "nmap -p 443 --script ssl-enum-ciphers target.com",
        "nmap -p 80,443 --script http-vuln-* target.com",
        "nmap -p 445 --script smb-vuln-ms17-010 target.com",
        "nmap -sV --script vulners -p 21,22,80,443 target.com",
      ],
      proTips: [
        "Use `--script-args` to pass custom credentials and wordlists to NSE scripts during authenticated auditing.",
        "Always update the script database: `sudo nmap --script-updatedb` after downloading custom scripts from GitHub.",
      ],
    },
    {
      id: "l-4-3",
      lessonNumber: "4.3",
      title: "Masscan Internet-Scale Scanning & RustScan",
      duration: "2.5 Hours",
      badge: "Fast Scanners",
      summary:
        "Scanning entire Class B and Class A subnets at 10 million packets per second using Masscan's asynchronous raw SYN generator and modern Rust-based scanners.",
      studyNotes: [
        {
          heading: "The Architecture of Asynchronous Network Scanners",
          subheading: "Why Masscan can scan the entire IPv4 Internet in 6 minutes",
          points: [
            "Why Nmap is Slow for Giant Ranges: Nmap uses a stateful approach, maintaining an in-memory tracking structure for every single transmitted packet and waiting for responses before adjusting socket timers.",
            "Masscan's Asynchronous Engine: Masscan operates like a packet generator. It transmits raw SYN packets at up to 10 million packets per second (`--rate 10000000`) completely asynchronously. It maintains zero state in memory.",
            "Cryptographic Cookie Verification: How does Masscan know an incoming SYN-ACK belongs to its scan? It encrypts the target IP and port into the initial TCP Sequence number using a custom key. When the target echoes it back in the ACK field, Masscan validates the response mathematically without needing a state table.",
            "Hardware & Bandwidth Requirements: Transmitting at 10 Mpps requires a 10-Gigabit fiber optic uplink and custom PF_RING / DPDK kernel-bypass drivers.",
          ],
          callout: "WARNING: Running Masscan at `--rate 100000` on a standard home DSL or consumer Wi-Fi router will instantly crash your home router due to NAT table state exhaustion. Only run high-rate Masscan scans from enterprise cloud servers with dedicated uplinks.",
          diagramOrCode: `+-------------------------------------------------------------+
|               MASSCAN ASYNCHRONOUS SCANNING MODEL           |
+-------------------------------------------------------------+
 [ Raw Packet Generator ] ===> Spews 1,000,000 SYN packets/sec
 (No state maintained!)          across entire 10.0.0.0/8 subnet
                                 |
                                 v
 [ Separate Listening Thread ]   Picks up incoming SYN-ACK responses
                                 Validates Seq/Ack cryptographic hash
                                 Logs open port: 10.10.25.10:80 OPEN!`
        },
        {
          heading: "RustScan & Multi-Stage Recon Pipelines",
          subheading: "Marrying the extreme speed of Masscan with the precision of Nmap",
          points: [
            "The RustScan Approach: Written in modern Rust, RustScan scans all 65,535 ports on a host in less than 3 seconds using asynchronous socket workers, then automatically feeds only the open ports directly into Nmap for deep service versioning.",
            "The Two-Tier Recon Strategy: Never run `nmap -sV -sC -p-` across 500 IP addresses. Instead, Tier 1: Run Masscan or RustScan to identify which ports are open across the fleet. Tier 2: Pipe the list of open ports into Nmap (`-sV -sC -p <open_ports>`) for surgical inspection.",
            "Output Formatting: Outputting Masscan results in JSON or grepable format (`-oJ` or `-oG`) allows instant integration into automated bash pipelines.",
          ],
          callout: "The two-tier strategy saves dozens of hours during external red team assessments. You can discover every open HTTP port across a 65,000-IP subnet in 5 minutes with Masscan, then launch focused web scanners against the live hosts.",
          diagramOrCode: `TWO-TIER SCANNING BASH PIPELINE:
  # Step 1: Rapidly locate open web ports across /16 subnet:
  sudo masscan 10.10.0.0/16 -p80,443,8080,8443 --rate 5000 -oL open_ports.txt
  
  # Step 2: Parse IP:Port combinations and probe with Httpx:
  cat open_ports.txt | awk '$1=="open" {print $4":"$3}' | \\
    httpx -title -status-code -tech-detect -o live_web.txt`
        }
      ],
      keyTopics: [
        "Asynchronous packet transmission mechanics and cryptographic sequence hashes",
        "Managing packet transmission rates (`--rate`) to prevent firewall saturation",
        "RustScan integration for sub-second 65k port discovery",
        "Two-tier scanning methodology: Masscan for discovery + Nmap for deep service analysis",
      ],
      terminalCommands: [
        "sudo masscan 10.10.0.0/16 -p80,443,8080 --rate 2500 -oL masscan_results.txt",
        "rustscan -a target.com -- -sV -sC",
        "cat masscan_results.txt | awk '{print $4}' | sort -u > live_ips.txt",
      ],
      proTips: [
        "Never run Masscan without `--rate`; on home routers, cap the rate at `--rate 1000` to prevent crashing your modem.",
        "Combine Masscan with Nmap: use Masscan to find open ports across a `/16` subnet, then pass only open ports to `nmap -sV` for deep versioning.",
      ],
    },
    {
      id: "l-4-4",
      lessonNumber: "4.4",
      title: "Httpx Probing, Status Filtering & Tech Detection",
      duration: "3 Hours",
      badge: "HTTP Probing",
      summary:
        "Probing thousands of subdomains for live HTTP/HTTPS services, extracting titles, web server headers, technology stacks, and response hashes with ProjectDiscovery's httpx.",
      studyNotes: [
        {
          heading: "High-Throughput HTTP Probing Architecture",
          subheading: "Transforming raw domain lists into classified web application matrices",
          points: [
            "Why Httpx is Indispensable: Subdomain enumeration tools (`subfinder`, `amass`) only output DNS hostnames; they don't verify whether a web service is running. Httpx takes thousands of hostnames and performs concurrent HTTP/HTTPS requests to verify live endpoints.",
            "Automatic Port Probing: By default, httpx probes both port 80 (HTTP) and port 443 (HTTPS), automatically following or logging redirects (`-fr` or `-location`).",
            "Fingerprinting Technology Stacks (`-tech-detect`): Automatically detects underlying frameworks (Spring Boot, Django, React, Laravel, WordPress) and web servers (Nginx, Apache, IIS, Envoy, Cloudflare).",
            "Response Body Hash Deduplication (`-hash`): Calculates sha256 and simhash values of response bodies. If 500 subdomains return identical 404 pages or default Apache placeholder screens, their hashes match, allowing you to instantly filter out the noise.",
          ],
          callout: "The CDN / Edge Filter: Adding `-cdn` to httpx identifies whether an asset is behind Cloudflare, CloudFront, or Fastly. This allows you to prioritize naked hosting servers where rate-limiting and WAF rules do not exist.",
          diagramOrCode: `+-------------------------------------------------------------+
|               HTTPX PIPELINE PROCESSING ARCHITECTURE        |
+-------------------------------------------------------------+
 [ 10,000 Discovered Subdomains ]
                |
                v (httpx -sc -title -tech-detect -cdn)
 [ Output Stream ]
   https://vpn.target.com      [200] [Pulse Secure VPN] [Tech: OpenSSL] [Non-CDN]
   https://dev.target.com      [403] [Apache 2.4.49]   [Tech: PHP 7.4]  [Cloudflare]
   https://api.target.com      [200] [Swagger UI]      [Tech: Node.js]  [Non-CDN]
                |
                v
 High-Value Priority Target: https://vpn.target.com (Legacy VPN gateway!)`
        },
        {
          heading: "Advanced Filtering & Content-Length Sorting",
          subheading: "Isolating anomalous endpoints hiding among thousands of default responses",
          points: [
            "Content-Length Filtering (`-fc` / `-mc`): Filter out responses matching specific HTTP status codes (`-fc 404,500`) or match specific codes (`-mc 200,302`).",
            "Line & Word Count Matching: When all endpoints return HTTP 200 due to single-page application (SPA) routing, filter by response size (`-fl <length>`) to isolate endpoints with unique data.",
            "Extracting CNAME & IP Information: Using `-ip -cname` reveals which cloud provider hosts each subdomain (e.g. `cname.s3.amazonaws.com` exposes an S3 bucket takeover opportunity).",
            "Screenshotting Integrations: Pairing httpx with gowitness or eyewitness visually captures screenshots of all live websites, allowing you to scan 500 login pages visually in 2 minutes.",
          ],
          callout: "Look for subdomains where httpx returns a CNAME pointing to a third-party service (like `*.zendesk.com`, `*.github.io`, or `*.s3.amazonaws.com`) that returns an HTTP 404. This is a classic Subdomain Takeover vulnerability!",
          diagramOrCode: `ESSENTIAL HTTPX COMMANDS:
  # Probe list of subdomains for live HTTP/HTTPS services:
  cat subdomains.txt | httpx -title -status-code -tech-detect -o live_sites.txt
  
  # Filter only HTTP 200 and 302 responses, omitting 404:
  cat subdomains.txt | httpx -mc 200,302 -title -o active_web.txt
  
  # Identify Subdomain Takeover opportunities:
  cat subdomains.txt | httpx -cname -status-code | grep -i "NoSuchBucket"`
        }
      ],
      keyTopics: [
        "Concurrent HTTP/HTTPS probing with ProjectDiscovery's `httpx`",
        "Technology stack fingerprinting and web server classification (`-tech-detect`)",
        "Response body hashing (`-hash`) to filter out generic 404 and placeholder pages",
        "Identifying cloud CDN infrastructure and CNAME configurations",
      ],
      terminalCommands: [
        "cat subdomains.txt | httpx -title -status-code -tech-detect -o live_sites.txt",
        "httpx -l subdomains.txt -path /admin,/api/v1 -mc 200",
        "httpx -u https://target.com -hash -title",
      ],
      proTips: [
        "Use `-hash` with httpx to calculate the sha256 of response bodies; filter out generic default landing pages easily.",
        "Add `-stream` when piping inputs with over 100k lines to process outputs in real time without buffering.",
      ],
    },
    {
      id: "l-4-5",
      lessonNumber: "4.5",
      title: "Fuzzing Directories, APIs & Vhosts with ffuf",
      duration: "3.5 Hours",
      badge: "Web Fuzzing",
      summary:
        "Mastering high-speed web application fuzzing with ffuf: directory discovery, hidden query parameters, virtual host (vhost) brute-forcing, and recursion.",
      studyNotes: [
        {
          heading: "Fuzzing Mechanics & The FUZZ Keyword Paradigm",
          subheading: "How ffuf crafts and measures thousands of HTTP requests per second",
          points: [
            "The `FUZZ` Keyword: The central placeholder replaced by words from your dictionary in any part of the request (URL, headers, query parameters, POST body).",
            "High-Speed Go Concurrency: ffuf utilizes Go goroutines to maintain hundreds of concurrent connections (`-t 50`), sending thousands of HTTP requests per second.",
            "Response Calibration & Anomaly Detection: The hardest part of fuzzing is eliminating false positives. When a server returns HTTP 200 for every non-existent page, calibrate with `-ac` (auto-calibration) or manually filter by response size (`-fs`), word count (`-fw`), or line count (`-fl`).",
            "Recursive Fuzzing (`-recursion -recursion-depth 2`): When ffuf discovers a valid directory (`/admin/`), it automatically spawns a child fuzzing task inside that directory (`/admin/FUZZ`).",
          ],
          callout: "Always check what happens when you request a random string like `/thispagecannotexist12345`. Note the response size (e.g., 2,842 bytes). Then add `-fs 2842` to your ffuf command to eliminate 50,000 false positive responses!",
          diagramOrCode: `+-------------------------------------------------------------+
|                 FFUF WEB FUZZING ARCHITECTURE               |
+-------------------------------------------------------------+
 Wordlist: [ admin, dev, api, test, config, backup, secret ]
                                 |
                                 v
 HTTP Request: GET /FUZZ HTTP/1.1  ==> Concurrency: -t 50
 Host: target.com
                                 |
                                 v
 Filter Matrix:
   -fc 404 (Filter status 404)
   -fs 1240 (Filter default response length)
                                 |
                                 v
 DISCOVERIES:
   [Status: 200, Size: 8452, Words: 120] ==> /api
   [Status: 301, Size: 180,  Words: 5]   ==> /admin (Redirects to /admin/)
   [Status: 403, Size: 412,  Words: 20]  ==> /config (Protected directory!)`
        },
        {
          heading: "Virtual Host (VHost) Fuzzing for Internal Applications",
          subheading: "Bypassing reverse proxy routing to discover unauthenticated internal portals",
          points: [
            "What is Virtual Host Fuzzing? Modern reverse proxies (Nginx, Apache, Cloudflare) host hundreds of different websites on a single public IP address, routing traffic based strictly on the HTTP `Host:` header.",
            "Attacking the Host Header: By keeping the target IP constant and fuzzing the `Host` header (`-H \"Host: FUZZ.target.com\"`), you discover internal developer domains (e.g., `dev.target.com`, `admin-internal.target.com`) that have no public DNS records!",
            "Filtering VHost Noise: All non-matching Host headers return the default fallback website. Use `-fs` to filter out the byte size of the default virtual host.",
            "Parameter Fuzzing: Fuzzing query parameters (`https://target.com/page?FUZZ=test`) using SecLists' `burp-parameter-names.txt` to discover hidden debugging and administrative triggers.",
          ],
          callout: "Virtual Host fuzzing frequently yields Critical findings in bug bounty programs. Internal dashboards hosted on the same server as the public marketing site often have zero authentication because developers assume they are only accessible from the local office network.",
          diagramOrCode: `VIRTUAL HOST (VHOST) FUZZING SYNTAX:
  ffuf -w /usr/share/seclists/Discovery/DNS/subdomains-top1million-5000.txt \\
       -u https://target.com \\
       -H "Host: FUZZ.target.com" \\
       -fs 3140

PARAMETER DISCOVERY SYNTAX:
  ffuf -w /usr/share/seclists/Discovery/Web-Content/burp-parameter-names.txt \\
       -u https://target.com/index.php?FUZZ=1 \\
       -fs 1890`
        }
      ],
      keyTopics: [
        "Directory and file discovery using ffuf and SecLists wordlists",
        "Filtering false positives using `-fc`, `-fs`, `-fw`, and auto-calibration (`-ac`)",
        "Virtual Host (VHost) brute-forcing to bypass reverse proxies",
        "Parameter fuzzing and POST body fuzzing with custom headers",
      ],
      terminalCommands: [
        "ffuf -w /usr/share/seclists/Discovery/Web-Content/raft-medium-directories.txt -u https://target.com/FUZZ -mc 200,301,302,403 -fs 1240",
        "ffuf -w subdomains.txt -u https://target.com -H 'Host: FUZZ.target.com' -fs 3140",
        "ffuf -w params.txt -u https://target.com/api?FUZZ=test -mc 200",
      ],
      proTips: [
        "Always use `-ac` (auto-calibration) in ffuf to automatically analyze target responses and filter out generic soft-404 error pages.",
        "Add `-e .php,.aspx,.json,.bak` to automatically fuzz for multiple technology-specific extensions simultaneously.",
      ],
    },
    {
      id: "l-4-6",
      lessonNumber: "4.6",
      title: "Automated Vulnerability Triaging with Nuclei",
      duration: "3 Hours",
      badge: "Vulnerability Scanner",
      summary:
        "Orchestrating community-driven YAML vulnerability templates with ProjectDiscovery's Nuclei to detect CVEs, misconfigurations, default credentials, and token leaks.",
      studyNotes: [
        {
          heading: "Nuclei Template Architecture & The YAML Standard",
          subheading: "Declarative, reproducible vulnerability definitions executed at wire speed",
          points: [
            "Why Nuclei Disrupted Automated Scanning: Legacy scanners (Nessus, OpenVAS) are heavyweight, opaque black-box tools. Nuclei is a lightning-fast, transparent, community-driven engine that executes human-readable YAML templates.",
            " Anatomy of a Nuclei Template: Consists of `id` (unique vulnerability identifier), `info` (name, severity, author, CVE), `requests` (exact HTTP/TCP payload, headers, and verbs), and `matchers` (condition logic verifying the exploit succeeded).",
            "Matcher Logic: Matchers inspect response status (`status`), response body strings (`words`), regexes (`regex`), or cryptographic hashes (`binary`). Matchers can be chained using `condition: and` to virtually eliminate false positives.",
            "Template Updating: The open-source community updates thousands of templates daily. Running `nuclei -update-templates` ensures you test for zero-day CVEs within hours of public disclosure.",
          ],
          callout: "Nuclei templates are the fastest way to verify whether your target is vulnerable to newly published CVEs (like Log4Shell or Spring4Shell). Security researchers write templates the moment a proof-of-concept drops on Twitter/GitHub.",
          diagramOrCode: `+-------------------------------------------------------------+
|                 NUCLEI YAML TEMPLATE ARCHITECTURE           |
+-------------------------------------------------------------+
 id: exposed-git-config
 info:
   name: Git Config File Disclosure
   severity: high
 requests:
   - method: GET
     path:
       - "{{BaseURL}}/.git/config"
     matchers:
       - type: word
         words:
           - "[core]"
           - "repositoryformatversion"
         condition: and
         part: body`
        },
        {
          heading: "Surgical Scanning & Custom Template Creation",
          subheading: "Balancing scan aggressiveness with operational stealth",
          points: [
            "Severity Tag Filtering: Filter templates by severity (`-severity critical,high`) or by category tags (`-tags cve,auth,exposure,takeover`).",
            "Rate Limiting & Concurrency: Protect target stability with `-c 50` (concurrency) and `-rate-limit 150` (maximum requests per second).",
            "Writing Custom Templates: Crafting custom company-specific templates to detect internal debugging flags or proprietary API keys across thousands of company subdomains.",
            "Interactsh Integration: Testing for blind vulnerabilities (like blind SSRF or Log4j) using OOB (Out-of-Band) interaction servers (`-interactsh`).",
          ],
          callout: "Never run Nuclei with default settings against production systems without rate-limiting (`-rate-limit 100`). Sending 10,000 requests per second will trigger Web Application Firewalls and may crash vulnerable backend application servers.",
          diagramOrCode: `NUCLEI SCANNING CHEATSHEET:
  # Scan live hosts for Critical and High vulnerabilities:
  nuclei -l live_sites.txt -severity critical,high -o critical_findings.txt
  
  # Scan specifically for CVEs and exposures:
  nuclei -l live_sites.txt -tags cve,exposure -rate-limit 150
  
  # Test for Out-of-Band Blind SSRF and Remote Code Execution:
  nuclei -l live_sites.txt -tags ssrf,rce -interactsh`
        }
      ],
      keyTopics: [
        "Nuclei YAML template syntax: requests, matchers, extractors, and conditions",
        "Filtering templates by severity (`critical`, `high`) and tags (`cve`, `exposure`)",
        "Out-of-band (OOB) vulnerability detection using Interactsh",
        "Writing custom Nuclei templates for proprietary vulnerability verification",
      ],
      terminalCommands: [
        "nuclei -update-templates",
        "nuclei -l live_sites.txt -severity critical,high -o critical_findings.txt",
        "nuclei -u https://target.com -tags cve,exposure -rate-limit 150",
      ],
      proTips: [
        "Filter Nuclei by tags: `nuclei -l targets.txt -tags cve,misconfig,takeover -severity high,critical` to focus strictly on high-payout bugs.",
        "Use `-interactsh` with Nuclei to catch blind Out-of-Band (OOB) vulnerabilities like Log4j and blind SSRF.",
      ],
    },
  ],
  handsOnLab: {
    title: "Lab 4: Automated Attack Surface Mapping & Targeted Fuzzing",
    target: "OWASP Juice Shop / Intentionally Vulnerable Web Target",
    goal: "Discover all open ports, fingerprint running technologies, fuzz hidden administrative endpoints using ffuf, and execute a surgical Nuclei CVE audit.",
    steps: [
      "1. Execute a full TCP port scan using Nmap with timing template -T4 and service detection.",
      "2. Probe discovered HTTP ports with httpx to fingerprint web frameworks and technologies.",
      "3. Run ffuf against the web target using raft-medium-directories.txt to locate hidden admin portals.",
      "4. Execute virtual host fuzzing to uncover unlinked subdomains.",
      "5. Run a targeted Nuclei audit focused on exposure and misconfiguration templates.",
    ],
    verification: "Provide the exact path of the discovered administrative dashboard and the raw HTTP proof-of-concept output confirming vulnerability exposure.",
  },
  checklist: [
    { id: "ch4-t1", label: "Mastered Nmap SYN stealth (-sS), Connect (-sT), and UDP (-sU) scan mechanics" },
    { id: "ch4-t2", label: "Applied firewall evasion techniques: packet fragmentation, MTU, and decoys" },
    { id: "ch4-t3", label: "Leveraged Nmap Scripting Engine (NSE) for SSL cipher auditing and CVE verification" },
    { id: "ch4-t4", label: "Conducted high-speed asynchronous port scanning with Masscan and RustScan" },
    { id: "ch4-t5", label: "Fingerprinted web technologies, status codes, and response hashes using httpx" },
    { id: "ch4-t6", label: "Mastered content fuzzing with ffuf and eliminated false positives via -ac and -fs" },
    { id: "ch4-t7", label: "Discovered internal web applications through Virtual Host (VHost) header fuzzing" },
    { id: "ch4-t8", label: "Automated vulnerability detection and triage using Nuclei community YAML templates" },
  ],
};
