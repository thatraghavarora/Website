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
        },
        {
          heading: "GeeksforGeeks Nmap Masterclass: TCP Connect, SYN Stealth, UDP & Subnet Ping Sweeps",
          subheading: "Complete packet mechanics, timing controls, and 6 port state classifications",
          points: [
            "TCP Connect Scan (-sT): Executes full 3-way handshake (SYN -> SYN-ACK -> ACK) via OS connect() API. If port is open, target responds with SYN-ACK; if closed, target returns RST/ACK. Generates application connection logs but runs without root privileges.",
            "SYN Stealth Scan (-sS): Crafts raw SYN packet; target responds with SYN-ACK (open); scanner immediately responds with RST to terminate before connection completes. Avoids application logs and finishes faster.",
            "UDP Scan (-sU): Connectionless probing sending empty or protocol-specific UDP packets. Open ports typically do not respond (open|filtered); closed ports return ICMP Type 3 Code 3 (Port Unreachable). Subject to RFC 1812 ICMP rate limiting.",
            "Ping Scan (-sn / -sP): Disables port scanning to sweep subnets (e.g. 192.168.1.0/24) for active hosts in seconds using ARP (locally) or ICMP Echo + TCP SYN/ACK (remotely).",
            "The 6 Port States: Open (service listening), Closed (host up, no service listening, RST returned), Filtered (firewall dropping packets), Unfiltered (responds to ACK scans, open/closed unknown), Open|Filtered (no response in UDP/FIN/Null scans), Closed|Filtered (conflicting idle scan state).",
          ],
          callout: "Access the full interactive course with live terminal simulator, quizzes, and high-res packet diagrams at /courses/nmap-scans-for-cyber-security-and-penetration-testing!",
          diagramOrCode: `GEEKSFORGEEKS NMAP SCAN COMMAND REFERENCE:
  # 1. TCP Connect Scan (Top 50 Ports):
  nmap -sT 192.168.1.12 --top-ports 50
  
  # 2. SYN Stealth Scan (Top 50 Ports):
  sudo nmap -sS 192.168.1.12 --top-ports 50
  
  # 3. UDP Scan (Top 50 Ports):
  sudo nmap -sU 192.168.1.12 --top-ports 50
  
  # 4. Subnet Ping Sweep (Host Discovery Only):
  nmap -sn 192.168.1.0/24
  
  # 5. Full 65k Port Comprehensive Recon:
  sudo nmap -sS -sV -T4 -p- -oA full_network_scan 192.168.1.12`
        }
      ],
      keyTopics: [
        "TCP Half-Open (SYN) Stealth Scanning Mechanics: Nmap's SYN scan (-sS) crafts raw TCP packets to probe destination ports without completing the 3-way handshake. If the target port is open, it responds with SYN-ACK; Nmap immediately transmits an RST packet to tear down the connection before an application session is established. Because the full connection is never completed, standard application-layer logs (like Apache or Nginx access logs) record zero traces of the inbound connection.",
        "Full TCP Connect Scanning (-sT) & SOCKS Proxy Limitations: A TCP Connect scan uses the operating system's standard connect() system call to complete the full 3-way handshake (SYN -> SYN-ACK -> ACK). While noisier and slower than SYN scanning, Connect scanning is mandatory when running Nmap without root privileges or when routing scan traffic through SOCKS proxies with Proxychains. SOCKS proxies operate at the TCP layer and cannot forward raw half-open SYN packets.",
        "Scanning All 65,535 Ports & Timing Rate Optimization: Port scanning by default checks only the top 1,000 most common ports, missing services running on non-standard ports (like HTTP on 8080, 8443, or 8888). Scanning all 65,535 ports (-p-) can take hours unless tuned with performance flags: '--min-rate 1500' forces Nmap to send at least 1,500 packets per second, completing a full port scan in under 3 minutes. Timing template -T4 optimizes timeouts for reliable broadband networks.",
        "Firewall Evasion via Packet Fragmentation & MTU Manipulation: Stateless firewalls and basic packet filters inspect incoming TCP headers by looking for known signatures in a single packet. Passing '-f' or '--mtu 24' instructs Nmap to split the 20-byte TCP header across multiple tiny 8-byte or 16-byte IP fragments. Naive packet inspection firewalls fail to inspect signatures split across fragmented payloads, allowing probes to pass through to the internal service.",
        "Decoy Scanning (-D) & Source Port Spoofing (--source-port 53): Decoy scanning (-D RND:10) transmits scan packets from 10 randomly generated IP addresses simultaneously alongside the attacker's real IP. Target firewall logs show 11 simultaneous port scans originating from different parts of the world, making it nearly impossible for defenders to pinpoint the true attacker. Source port spoofing (--source-port 53) exploits firewall rules that blindly trust inbound traffic originating from DNS port 53.",
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
        "Nmap Scripting Engine (NSE) Lua Architecture: The Nmap Scripting Engine (NSE) embeds a high-performance Lua interpreter directly into Nmap, enabling automated network vulnerability detection and service exploitation. Pre-installed scripts reside in /usr/share/nmap/scripts/ indexed by /usr/share/nmap/scripts/script.db. Scripts execute in parallel across discovered open ports using Lua coroutines, making NSE significantly faster than running standalone vulnerability scanning tools.",
        "NSE Script Categories & Safe vs Intrusive Classifications: NSE scripts are organized into distinct functional categories: 'default' (fast, low-noise reconnaissance scripts), 'vuln' (scans for known CVEs like EternalBlue and Log4j), and 'auth' (audits default credentials). The 'safe' category includes passive scripts guaranteed not to crash services, whereas 'intrusive' scripts send malformed payloads that carry a risk of causing denial-of-service on legacy or unstable industrial systems.",
        "SSL/TLS Cryptographic Auditing with ssl-enum-ciphers: Running 'nmap -p 443 --script ssl-enum-ciphers <target>' connects to HTTPS services and systematically tests every supported TLS version and cryptographic cipher suite. The script grades each cipher, flagging deprecated protocols (SSLv3, TLS 1.0, TLS 1.1) and vulnerable ciphers (CBC-mode ciphers vulnerable to POODLE, RC4, export ciphers). This provides instant proof of compliance failures during security assessments.",
        "Matching Service Versions to CVEs with vulners: The 'vulners' NSE script queries the public Vulners.com vulnerability database using the exact service name and version detected by Nmap's service scan (-sV). When an outdated service is identified (e.g. OpenSSH 7.2p2 or Apache 2.4.29), the script returns a prioritized table of known CVE identifiers, public exploit links, and CVSS severity scores, turning an ordinary port scan into a structured vulnerability report.",
        "Custom Script Arguments (--script-args) & Authenticated Audits: Many NSE scripts require runtime configuration parameters, passed via the '--script-args' flag. For instance, testing administrative interfaces requires passing custom credentials ('--script-args user=admin,pass=admin') or custom dictionary paths. Using script arguments allows penetration testers to perform deep authenticated audits against SMB, databases, and web applications using a single unified command line.",
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
        "Asynchronous Stateless Scanning vs Stateful Sockets: Traditional port scanners like Nmap maintain state tables in memory for every transmitted probe, waiting for timeouts before adjusting packet velocity. Masscan operates as an asynchronous raw packet generator based on the pf_ring and DPDK architectures, maintaining zero state in memory. Masscan transmits raw TCP SYN packets at wire speed (up to 10 million packets per second), allowing it to scan the entire 4.2 billion IPv4 address space in under 6 minutes.",
        "Cryptographic Sequence Hashing for Port Response Validation: Because Masscan maintains zero connection state in memory, it validates incoming SYN-ACK replies using mathematical cryptography. When Masscan crafts a probe, it encrypts the destination IP and port into the 32-bit TCP Sequence number using a secret internal key. When the target echoes this value back in the Acknowledgment number (ISN+1), Masscan decrypts and verifies the hash, confirming the port is open without state lookup overhead.",
        "Rate Control Mechanics (--rate) & Network Saturation Risks: Transmitting packets at high rates without rate control will saturate local network routers, drop packets, and trigger aggressive ISP abuse filters. On standard consumer networks or cloud VPS instances, Masscan must be constrained using '--rate 1000' or '--rate 2500' (packets per second) to prevent exhausting NAT translation tables. Only dedicated enterprise fiber connections with hardware bypass drivers should exceed 100,000 pps.",
        "RustScan Sub-Second Multi-Threading Architecture: RustScan is a modern port scanner written in Rust that achieves sub-second port discovery across all 65,535 ports using asynchronous Tokio socket workers. RustScan scans a target host for open ports in under 3 seconds, automatically formats the discovered open ports, and passes them directly into Nmap for deep service versioning and script execution. This eliminates Nmap's scanning overhead while retaining its deep analysis capabilities.",
        "The Two-Tier Reconnaissance Methodology: Enterprise red teams never run heavyweight Nmap scans across massive Class B (/16) subnets containing 65,536 IP addresses. Instead, they execute a two-tier strategy: Tier 1 uses Masscan or RustScan to rapidly identify which specific IP addresses have open ports across the entire range; Tier 2 parses the open IP:Port combinations and pipes them into Nmap (-sV -sC) and Httpx for deep, surgical inspection.",
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
        "Concurrent HTTP Probing Architecture with Httpx: Subdomain enumeration tools only output lists of DNS hostnames; they do not verify whether an active web service is responding. ProjectDiscovery's Httpx takes tens of thousands of discovered hostnames and executes concurrent HTTP/HTTPS requests over pooled connections to determine live endpoints. Httpx automatically handles protocol fallback (testing port 80 and port 443 simultaneously) and follows redirect chains cleanly.",
        "Technology Stack Fingerprinting & Header Detection (-tech-detect): Httpx analyzes HTTP response headers, cookies, and DOM structural patterns to automatically detect running technologies via the Wappalyzer signature database. Passing '-tech-detect' identifies web frameworks (Django, Spring Boot, React, Laravel), content management systems (WordPress, Drupal), and reverse proxies (Nginx, Envoy, Cloudflare). This allows researchers to quickly isolate high-value technology stacks.",
        "Response Body Hashing (-hash) for Noise Elimination: When probing 50,000 subdomains, thousands of dead or unconfigured domains return identical generic placeholder pages, default web server screens, or soft-404 errors. Httpx calculates the cryptographic SHA-256 and Simhash of the response body (-hash), tagging every response with its hash value. Analysts filter out repeating hashes, reducing thousands of redundant responses down to a unique list of distinct web applications.",
        "CDN & WAF Edge Identification (-cdn): The '-cdn' flag in Httpx queries IP ranges and response headers to identify whether a subdomain is routed through a Content Delivery Network (Cloudflare, Akamai, Fastly, AWS CloudFront). Identifying non-CDN assets is critical during penetration testing; non-CDN subdomains route directly to the target's origin hosting servers where rate-limiting, WAF inspection, and DDoS protections do not exist.",
        "CNAME Extraction & Subdomain Takeover Detection: Httpx extracts DNS Canonical Name (CNAME) records during HTTP probing (-cname). If a subdomain's CNAME points to an external cloud service (such as an AWS S3 bucket, GitHub Pages, or Zendesk helpdesk) that returns an HTTP 404 error, a Subdomain Takeover vulnerability exists. An attacker can register the abandoned bucket or third-party service name to take full control of the corporate subdomain.",
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
        "Web Application Fuzzing Mechanics & The FUZZ Keyword: Fuzzing is the automated submission of systematically altered input data to discover hidden resources and software errors. In ffuf (Fuzz Faster U Fool), the keyword 'FUZZ' acts as a placeholder replaced by words from your dictionary across any part of the request: the URI path, query parameters, headers, or POST body. Written in Go, ffuf leverages lightweight goroutines to send thousands of HTTP requests per second across multi-core systems.",
        "Response Calibration & Anomaly Filtering (-fc, -fs, -fw, -fl): The greatest challenge in web fuzzing is filtering out false positive responses generated when a web server returns HTTP 200 for every non-existent URL. The flag -fc filters specific HTTP status codes (e.g. -fc 404,500); -fs filters responses matching exact byte sizes; -fw filters by word count; -fl filters by line count. Using auto-calibration (-ac) instructs ffuf to automatically analyze server behavior and filter baseline noise.",
        "Recursive Directory Discovery (-recursion & -recursion-depth): When fuzzing a web application, discovering a directory (such as /admin returning HTTP 301) only uncovers the first level of the hierarchy. Enabling recursive fuzzing (-recursion -recursion-depth 2) instructs ffuf to automatically spawn a child fuzzing task inside every discovered folder (/admin/FUZZ). This systematically maps out nested administrative hierarchies and hidden API version paths.",
        "Virtual Host (VHost) Brute-Forcing for Internal Routing: Modern web servers host dozens of different websites on a single public IP address, routing traffic based on the HTTP 'Host:' header. By keeping the IP constant and fuzzing the Host header (ffuf -H 'Host: FUZZ.target.com'), researchers uncover internal developer portals (e.g. dev.target.com, staging.target.com) that lack public DNS records. Filtering by response size (-fs) isolates unique internal virtual hosts from the default fallback website.",
        "Parameter Fuzzing & Hidden Functionality Discovery: Fuzzing query parameters (https://target.com/index.php?FUZZ=test) using SecLists parameter dictionaries uncovers hidden administrative and debugging triggers. Developers frequently leave backdoor parameters (like ?debug=true, ?admin=1, or ?view=) in production code to bypass authentication or view verbose error traces. Discovering these hidden parameters unlocks critical injection attack vectors.",
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
        "Nuclei Declarative YAML Template Architecture: ProjectDiscovery's Nuclei is a lightning-fast, community-driven vulnerability scanner powered by human-readable YAML templates. Unlike legacy opaque scanners, Nuclei templates clearly define the exact HTTP/TCP requests to send, the payload parameters to inject, and the precise conditions (matchers) required to confirm vulnerability. This declarative architecture makes vulnerability scanning transparent, reproducible, and easily customizable.",
        "Advanced Matcher Logic & Condition Chains: Nuclei matchers inspect HTTP response status codes, response headers, response bodies, and cryptographic hashes using string matching, regular expressions, and DSL expressions. Matchers can be combined using boolean logic (condition: and / condition: or) to virtually eliminate false positives. For example, a template verifying an exposed Git config requires both a status code of 200 AND the exact string '[core]' inside the response body.",
        "Surgical Vulnerability Scanning & Severity Tagging: Nuclei organizes thousands of community templates into categorized tags: 'cve' (published CVEs), 'exposure' (exposed configs and API keys), 'misconfig' (security misconfigurations), and 'takeover' (subdomain takeovers). Analysts filter scans by severity (-severity critical,high) and tags (-tags cve,exposure), focusing execution strictly on high-payout, actionable vulnerabilities without sending thousands of irrelevant checks.",
        "Out-of-Band (OAST) Integration via Interactsh: Many critical vulnerabilities (like Log4Shell, blind Server-Side Request Forgery, and blind OS command injection) generate zero visible output in HTTP responses. Nuclei integrates natively with the Interactsh out-of-band listener platform (-interactsh). When a payload triggers, the target server initiates a DNS or HTTP interaction back to Interactsh, allowing Nuclei to conclusively confirm blind vulnerabilities.",
        "Custom Template Development for 0-Day & Proprietary Checks: Security researchers write custom Nuclei templates to operationalize newly published proof-of-concept exploits across thousands of client assets in minutes. A custom template specifies the target endpoint path, HTTP method, attack headers, and regex extractors that parse sensitive tokens from responses. Sharing and running custom templates gives researchers a decisive speed advantage during initial vulnerability disclosure windows.",
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
