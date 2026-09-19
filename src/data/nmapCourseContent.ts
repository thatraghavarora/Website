export interface NmapLecture {
  id: string;
  title: string;
  duration: string;
  freePreview: boolean;
  definition: {
    what: string;
    how: string;
    why: string;
  };
  overview: string;
  keyPoints: string[];
  commandSnippets?: {
    title: string;
    command: string;
    description: string;
    flags: { flag: string; meaning: string }[];
  }[];
  images?: {
    src: string;
    alt: string;
    caption: string;
    badge?: string;
  }[];
  deepDive: {
    heading: string;
    body: string;
    subsections?: { title: string; text: string }[];
  }[];
  terminalOutput?: {
    command: string;
    target: string;
    rawOutput: string;
    analysis: string[];
  };
  quiz?: {
    question: string;
    options: string[];
    correctIndex: number;
    explanation: string;
  };
}

export interface NmapModule {
  id: string;
  moduleNumber: number;
  sectionTitle: string;
  description: string;
  lectures: NmapLecture[];
}

export const nmapCourseData: {
  slug: string;
  title: string;
  subtitle: string;
  description: string;
  category: string;
  level: string;
  badge: string;
  duration: string;
  totalLectures: number;
  sourceUrl: string;
  modules: NmapModule[];
} = {
  slug: "nmap-scans-for-cyber-security-and-penetration-testing",
  title: "Nmap Scans for Cyber Security and Penetration Testing",
  subtitle: "The Complete Practical Masterclass: Host Discovery, Port Scanning Techniques (TCP, SYN, UDP), State Analysis & Pentesting Workflows",
  description: "Comprehensive hands-on course covering Network Mapper (Nmap) from fundamentals to advanced reconnaissance. Master TCP 3-way handshakes, SYN stealth half-open probing, UDP scan mechanics, subnet ping sweeps, 6 port state classifications, and vulnerability discovery best practices with real terminal screenshots and packet flow diagrams.",
  category: "Cybersecurity",
  level: "All Levels",
  badge: "Featured Masterclass",
  duration: "4.5 Hours",
  totalLectures: 14,
  sourceUrl: "https://www.geeksforgeeks.org/computer-networks/nmap-scans-for-cyber-security-and-penetration-testing/",
  modules: [
    {
      id: "mod-1",
      moduleNumber: 1,
      sectionTitle: "Module 1: Introduction to Nmap & Network Discovery",
      description: "Understand the core architecture, capabilities, and role of Network Mapper in penetration testing and security auditing.",
      lectures: [
        {
          id: "lec-1-1",
          title: "What is Nmap (Network Mapper) & Its Role in Security Auditing",
          duration: "14:30",
          freePreview: true,
          definition: {
            what: "Nmap (Network Mapper) is a free, open-source command-line tool designed for network discovery, security auditing, and vulnerability assessment.",
            how: "It crafts raw IP packets using diverse transport protocols to analyze responses, determine active hosts, open ports, and operating system fingerprints.",
            why: "Security professionals and penetration testers rely on Nmap as the foundational first step of reconnaissance to discover attack surfaces and misconfigured assets."
          },
          overview: "Nmap is universally recognized as the de facto standard network scanner in ethical hacking, network administration, and infrastructure auditing. It allows engineers to map complex networks in seconds and evaluate security postures.",
          keyPoints: [
            "Maps entire network topologies and identifies active devices across local subnets and internet ranges.",
            "Detects open, closed, filtered, unfiltered, open|filtered, and closed|filtered ports.",
            "Supports versatile scan types including TCP Connect (-sT), SYN Stealth (-sS), UDP (-sU), and Ping discovery (-sn).",
            "Discovers outdated or unpatched network services for vulnerability management and hardening.",
            "Provides granular output including port numbers, service protocols, version banners, and response states."
          ],
          deepDive: [
            {
              heading: "The Reconnaissance Phase of Penetration Testing",
              body: "In any ethical hacking engagement, reconnaissance is 70% of the battle. Without knowing what IP addresses are alive, which services are listening, and what software versions are exposed, an attacker or defender cannot assess risk. Nmap automates this discovery phase with precision."
            },
            {
              heading: "Why Network Administrators and Pentesters Choose Nmap",
              body: "Unlike naive port scanners that only test TCP socket connections, Nmap inspects low-level TCP/IP headers, packet flags (SYN, ACK, FIN, RST, URG, PSH), window sizes, and ICMP error codes to extract maximal intelligence with minimal packet overhead."
            }
          ],
          quiz: {
            question: "What is the primary role of Nmap in the reconnaissance phase of penetration testing?",
            options: [
              "Cracking encrypted password hashes using brute force",
              "Discovering active hosts, listening ports, and identifying running services",
              "Injecting SQL payloads into vulnerable web application databases",
              "Generating self-signed SSL/TLS digital certificates"
            ],
            correctIndex: 1,
            explanation: "Nmap is primarily a network discovery and port scanning tool used to map active IP addresses, enumerate open ports, and fingerprint network services."
          }
        },
        {
          id: "lec-1-2",
          title: "Core Capabilities & Feature Matrix of Modern Nmap",
          duration: "16:45",
          freePreview: true,
          definition: {
            what: "Nmap's feature matrix encompasses host discovery, port enumeration, service version detection, OS fingerprinting, and scriptable automation.",
            how: "Through modular scan engines and the Lua-based Nmap Scripting Engine (NSE), it translates network packet interactions into human-readable security intelligence.",
            why: "Understanding every capability allows security auditors to tailor scans for either maximum stealth or maximum thoroughness depending on the engagement rules."
          },
          overview: "Nmap goes far beyond simple port checking. It provides deep protocol probing, script execution, timing controls, and multi-format reporting.",
          keyPoints: [
            "Host Discovery: Rapidly separates responsive online hosts from dormant IP addresses.",
            "Port Scanning: Probes target ports across TCP and UDP protocols to determine listening sockets.",
            "Version Fingerprinting (-sV): Queries open ports with application-specific probes to detect exact daemon versions (e.g., Apache 2.4.41, OpenSSH 8.2p1).",
            "OS Fingerprinting (-O): Compares TCP/IP stack implementation quirks (TTL, TCP options, initial sequence numbers) against a database of thousands of operating systems.",
            "Nmap Scripting Engine (NSE): Executes Lua scripts for vulnerability detection, malware discovery, and advanced exploitation."
          ],
          deepDive: [
            {
              heading: "Passive vs. Active Reconnaissance",
              body: "While passive recon relies on OSINT (Whois, Shodan, Google Dorks), Nmap is an active reconnaissance tool. Its probes physically reach the target network cards and firewalls, generating network traffic that can be observed by Intrusion Detection Systems (IDS)."
            }
          ],
          quiz: {
            question: "Which Nmap capability extracts exact software versions from open services?",
            options: [
              "-sP (Ping scan)",
              "-sV (Version detection)",
              "-sn (No port scan)",
              "-F (Fast scan)"
            ],
            correctIndex: 1,
            explanation: "The -sV flag instructs Nmap to interrogate open ports with targeted application probes to determine software names and version numbers."
          }
        }
      ]
    },
    {
      id: "mod-2",
      moduleNumber: 2,
      sectionTitle: "Module 2: Installation, Verification & Command Anatomy",
      description: "Set up Nmap on various operating systems and master the fundamental command syntax.",
      lectures: [
        {
          id: "lec-2-1",
          title: "Installing & Verifying Nmap on Linux, Windows & macOS",
          duration: "15:20",
          freePreview: true,
          definition: {
            what: "Nmap installation is available across all major operating systems via native package managers or official binary installers.",
            how: "Linux distributions maintain pre-compiled packages in their central repositories, while Windows and macOS provide signed GUI and CLI installers.",
            why: "Ensuring an up-to-date Nmap installation is essential for access to the latest service signatures, NSE scripts, and operating system fingerprints."
          },
          overview: "Follow straightforward steps to get Nmap installed on Debian, Ubuntu, Kali Linux, CentOS, Fedora, Windows, and macOS, and verify that the binary is functional.",
          keyPoints: [
            "Debian / Ubuntu / Kali Linux: sudo apt update && sudo apt install nmap",
            "CentOS / Fedora / RHEL: sudo yum install nmap or sudo dnf install nmap",
            "Arch Linux: sudo pacman -S nmap",
            "macOS: brew install nmap or download the official .dmg package",
            "Windows: Download the Windows self-installer (.exe) with Npcap driver from nmap.org"
          ],
          commandSnippets: [
            {
              title: "Debian / Ubuntu / Kali Linux Installation",
              command: "sudo apt update && sudo apt install nmap -y",
              description: "Installs Nmap along with standard NSE scripts and documentation.",
              flags: [
                { flag: "apt update", meaning: "Synchronizes package repository indexes" },
                { flag: "install nmap", meaning: "Installs the nmap package and dependent libraries" },
                { flag: "-y", meaning: "Automatically confirms installation prompt" }
              ]
            },
            {
              title: "CentOS / Fedora / RHEL Installation",
              command: "sudo yum install nmap -y",
              description: "Installs Nmap using the RPM package management system.",
              flags: [
                { flag: "yum install", meaning: "Pulls and installs RPM packages" },
                { flag: "-y", meaning: "Assumes yes to all confirmation prompts" }
              ]
            },
            {
              title: "Verifying Installation & Checking Version",
              command: "nmap --version",
              description: "Displays installed version, release year, and compilation details.",
              flags: [
                { flag: "--version", meaning: "Prints version number and exits" }
              ]
            }
          ],
          deepDive: [
            {
              heading: "Npcap Driver on Windows",
              body: "On Windows systems, Nmap requires the Npcap packet capture library to transmit and capture raw network packets. Without Npcap, advanced features like SYN stealth scans and OS detection cannot function on Windows."
            }
          ],
          quiz: {
            question: "Which command confirms that Nmap is correctly installed and displays its active version?",
            options: [
              "nmap -help",
              "nmap --version",
              "nmap -check",
              "nmap -v"
            ],
            correctIndex: 1,
            explanation: "Running 'nmap --version' outputs the installed Nmap release, platform architecture, and bundled feature libraries."
          }
        },
        {
          id: "lec-2-2",
          title: "Nmap Basic Syntax: Scan Types, Options & Target Specifications",
          duration: "18:10",
          freePreview: true,
          definition: {
            what: "The canonical Nmap syntax follows: nmap [Scan Type] [Options] {Target}.",
            how: "The command combines scan methodology switches (e.g. -sS, -sT), tuning/output flags (e.g. -p, -T4, -oN), and target host definitions (IP, hostname, CIDR).",
            why: "A structured command construction ensures precise scoping, prevents accidental network disruption, and optimizes scanning performance."
          },
          overview: "Mastering the anatomy of an Nmap command is essential for crafting targeted, stealthy, or aggressive scans depending on your operational goals.",
          keyPoints: [
            "Scan Type (-sS, -sT, -sU, -sn): Dictates the underlying transport protocol and packet interaction mechanism.",
            "Options (-p, -Pn, -T0-5, -sV, -O, -oN): Controls target port ranges, ping bypass, timing templates, detection flags, and output formats.",
            "Target: Accepts individual IPv4/IPv6 addresses (192.168.1.12), domain names (scanme.nmap.org), ranges (192.168.1.1-50), or CIDR subnets (192.168.1.0/24)."
          ],
          commandSnippets: [
            {
              title: "Basic Syntax Template",
              command: "nmap [Scan Type] [Options] {Target}",
              description: "The universal structure of every Nmap invocation.",
              flags: [
                { flag: "[Scan Type]", meaning: "Specifies scan method: -sT (Connect), -sS (SYN), -sU (UDP), -sn (Ping)" },
                { flag: "[Options]", meaning: "Specifies port range (-p), timing (-T4), version (-sV), output (-oN)" },
                { flag: "{Target}", meaning: "Target IP address, hostname, or CIDR network range" }
              ]
            },
            {
              title: "Target Specification Examples",
              command: "# Single host:\nnmap 192.168.1.12\n\n# Hostname:\nnmap scanme.nmap.org\n\n# Entire Class C Subnet:\nnmap 192.168.1.0/24\n\n# Custom IP Range:\nnmap 192.168.1.1-100",
              description: "Flexible target specification syntax supported by Nmap.",
              flags: []
            }
          ],
          deepDive: [
            {
              heading: "Scoping and Authorization Rules",
              body: "Always ensure you have explicit written authorization before scanning external networks or IP addresses. Unauthorized port scanning may violate local cybersecurity laws or Terms of Service."
            }
          ],
          quiz: {
            question: "In the command 'nmap -sT -p 80,443 -T4 192.168.1.12', what role does '-p 80,443' play?",
            options: [
              "It specifies the scan type as a ping scan",
              "It restricts the scan exclusively to destination ports 80 and 443",
              "It sets the packet transmission rate to 80443 packets per second",
              "It specifies the proxy IP address"
            ],
            correctIndex: 1,
            explanation: "The -p flag tells Nmap which port numbers or port ranges to scan instead of probing the default top 1,000 ports."
          }
        }
      ]
    },
    {
      id: "mod-3",
      moduleNumber: 3,
      sectionTitle: "Module 3: TCP Connect Scan (-sT) & 3-Way Handshake",
      description: "Dissect the full TCP Connect scan, the 3-way handshake mechanics, and packet interactions for open vs closed ports.",
      lectures: [
        {
          id: "lec-3-1",
          title: "TCP Connect Scan Mechanics & The Full 3-Way Handshake",
          duration: "24:30",
          freePreview: true,
          definition: {
            what: "A TCP Connect scan (-sT) is a full-connection scan that completes the entire standard TCP 3-way handshake with target ports.",
            how: "It instructs the local operating system kernel to issue a connect() system call, exchanging SYN, SYN-ACK, and ACK packets.",
            why: "It is the most reliable scan type that works without root/administrator privileges and seamlessly routes through SOCKS proxies."
          },
          overview: "When you do not have root or administrator privileges, or when you are routing traffic through network proxies (e.g., Proxychains), the TCP Connect scan is your go-to method.",
          keyPoints: [
            "Uses the OS standard connect() system call rather than crafting raw low-level packets.",
            "Completes the complete 3-way handshake (SYN -> SYN-ACK -> ACK) before closing the connection.",
            "Does not require root (sudo) privileges on Unix-like operating systems.",
            "Easily logged by application servers (e.g. Apache, Nginx, IIS) because full TCP sessions are established.",
            "Slightly slower than SYN stealth scans due to the full socket handshake overhead."
          ],
          commandSnippets: [
            {
              title: "Executing a TCP Connect Scan on Top 50 Ports",
              command: "nmap -sT 192.168.1.12 --top-ports 50",
              description: "Runs a full TCP connect scan against the 50 most frequently used TCP ports.",
              flags: [
                { flag: "-sT", meaning: "Specifies TCP Connect Scan mode" },
                { flag: "192.168.1.12", meaning: "Target host IP address" },
                { flag: "--top-ports 50", meaning: "Limits the scan to the 50 most common ports for speed" }
              ]
            }
          ],
          deepDive: [
            {
              heading: "Why TCP Connect Scans are Noisy",
              body: "Because the 3-way handshake finishes completely, the target operating system passes the completed socket connection up to the listening application daemon. As a result, web servers, FTP daemons, and SSH servers create connection log entries, leaving clear footprints for security analysts."
            }
          ],
          quiz: {
            question: "Why can an unprivileged regular user run a TCP Connect scan (-sT) without sudo privileges?",
            options: [
              "Because it uses ICMP packets which require no privileges",
              "Because it uses the standard operating system connect() socket API rather than raw packet injection",
              "Because Nmap automatically elevates privileges silently in the background",
              "Because TCP Connect scans do not transmit packets across the physical network"
            ],
            correctIndex: 1,
            explanation: "Any user application can initiate standard TCP connections using the OS kernel's connect() system call without needing raw socket capabilities (CAP_NET_RAW)."
          }
        },
        {
          id: "lec-3-2",
          title: "3-Way Handshake Packet Analysis: Open vs. Closed Ports",
          duration: "28:15",
          freePreview: true,
          definition: {
            what: "The TCP 3-way handshake establishes a reliable transport connection, responding differently when a port is listening vs. when it is closed.",
            how: "An open port replies to an incoming SYN with SYN-ACK, followed by an ACK; a closed port immediately replies with an RST/ACK packet.",
            why: "Analyzing these distinct packet responses enables Nmap to immediately determine whether a service is active or unreachable."
          },
          overview: "Understand the exact packet sequence exchanged between the scanner and the destination host during a TCP Connect scan under open and closed conditions.",
          keyPoints: [
            "Open Port Handshake: Scanner sends [SYN] -> Target responds [SYN-ACK] -> Scanner confirms [ACK] -> Scanner tears down [RST] or [FIN].",
            "Closed Port Response: Scanner sends [SYN] -> Target kernel has no listening socket -> Target responds [RST/ACK] immediately.",
            "Filtered Port Response: Scanner sends [SYN] -> Packet filter drops packet -> Scanner receives no response or ICMP Unreachable."
          ],
          images: [
            {
              src: "/courses/nmap/tcp_open_handshake.webp",
              alt: "Nmap TCP Connect Scan Open Port 3-Way Handshake",
              caption: "Diagram 1: The 3-way handshake process when the destination port is OPEN (Client sends SYN -> Target replies SYN-ACK -> Client sends ACK).",
              badge: "Port Open Handshake"
            },
            {
              src: "/courses/nmap/tcp_closed_handshake.webp",
              alt: "Nmap TCP Connect Scan Closed Port RST Response",
              caption: "Diagram 2: Handshake response when the destination port is CLOSED (Client sends SYN -> Target immediately replies with RST/ACK).",
              badge: "Port Closed Handshake"
            }
          ],
          deepDive: [
            {
              heading: "Step-by-Step Packet Breakdown",
              body: "1. Scanner sends SYN (Synchronize): 'I want to initiate communication on port 80.'\n2. Target replies SYN-ACK (Synchronize-Acknowledge): 'Port 80 is listening, here is my initial sequence number.'\n3. Scanner sends ACK (Acknowledge): 'Connection established.'\n4. For closed ports, the target host kernel returns an RST (Reset) flag with ACK set to terminate the unwanted connection."
            }
          ],
          quiz: {
            question: "When scanning an open port with a TCP Connect scan, what packet does the destination host reply with?",
            options: [
              "RST (Reset)",
              "SYN-ACK (Synchronize-Acknowledge)",
              "ICMP Destination Unreachable",
              "FIN (Finish)"
            ],
            correctIndex: 1,
            explanation: "An open TCP port indicates it is listening for connections by responding with a SYN-ACK packet to acknowledge the incoming SYN."
          }
        },
        {
          id: "lec-3-3",
          title: "Terminal Output Walkthrough: Analyzing a Real TCP Connect Scan",
          duration: "18:40",
          freePreview: true,
          definition: {
            what: "Nmap's terminal output presents a structured report summarizing scan timing, host status, port states, and discovered services.",
            how: "It lists open ports under columns: PORT (number/protocol), STATE (open, closed, filtered), and SERVICE (standard registered service name).",
            why: "Accurately reading scan tables allows security engineers to identify critical entry points (FTP, SSH, Telnet, HTTP, SMB) within seconds."
          },
          overview: "Review the actual terminal screenshot and output from running `nmap -sT 192.168.1.12 --top-ports 50` as featured in the GeeksforGeeks tutorial.",
          keyPoints: [
            "Shows Nmap scan report for target IP address (192.168.1.12).",
            "Indicates host latency (e.g., Host is up 0.00041s latency).",
            "Identifies common ports open on the target: 21/tcp (ftp), 22/tcp (ssh), 23/tcp (telnet), 25/tcp (smtp), 53/tcp (domain), 80/tcp (http), 110/tcp (pop3), 139/tcp (netbios-ssn), 445/tcp (microsoft-ds).",
            "Summarizes closed ports (e.g. 41 closed ports).",
            "Provides total scan duration (e.g. Nmap done: 1 IP address scanned in 0.05 seconds)."
          ],
          images: [
            {
              src: "/courses/nmap/tcp_scan_output.png",
              alt: "Nmap TCP Connect Scan Terminal Output Screenshot",
              caption: "Terminal Screenshot: Actual terminal output from running 'nmap -sT 192.168.1.12 --top-ports 50' showing open ports (ftp, ssh, telnet, smtp, http, etc.).",
              badge: "Real Terminal Output"
            }
          ],
          terminalOutput: {
            command: "nmap -sT 192.168.1.12 --top-ports 50",
            target: "192.168.1.12",
            rawOutput: `Starting Nmap 7.80 ( https://nmap.org ) at 2026-09-19 14:22 UTC
Nmap scan report for 192.168.1.12
Host is up (0.00041s latency).
Not shown: 41 closed ports
PORT    STATE SERVICE
21/tcp  open  ftp
22/tcp  open  ssh
23/tcp  open  telnet
25/tcp  open  smtp
53/tcp  open  domain
80/tcp  open  http
110/tcp open  pop3
139/tcp open  netbios-ssn
445/tcp open  microsoft-ds

Nmap done: 1 IP address (1 host up) scanned in 0.05 seconds`,
            analysis: [
              "Port 21/tcp (ftp): File Transfer Protocol is listening. Test for anonymous login or outdated vsftpd version.",
              "Port 22/tcp (ssh): Secure Shell is active. Audit SSH banner and key exchange algorithms.",
              "Port 23/tcp (telnet): Cleartext Telnet is exposed! Immediate security hazard; credentials sent in plaintext.",
              "Port 80/tcp (http): Web server listening. Fuzz for directories, vhosts, and web vulnerabilities.",
              "Port 445/tcp (microsoft-ds): SMB service active. Probe for EternalBlue (MS17-010) or SMB signing misconfigurations."
            ]
          },
          deepDive: [
            {
              heading: "Key Takeaways from the Top 50 Port Output",
              body: "Scanning the top 50 ports took only 0.05 seconds while revealing 9 critical services including Telnet, FTP, and SMB. In penetration testing, rapid reconnaissance of top ports provides immediate exploitation candidates."
            }
          ],
          quiz: {
            question: "In the terminal scan output, which open port represents an unencrypted legacy protocol that transmits credentials in cleartext?",
            options: [
              "Port 22/tcp (ssh)",
              "Port 23/tcp (telnet)",
              "Port 53/tcp (domain)",
              "Port 445/tcp (microsoft-ds)"
            ],
            correctIndex: 1,
            explanation: "Port 23 (Telnet) transmits all communication, including usernames and passwords, in unencrypted cleartext across the network."
          }
        }
      ]
    },
    {
      id: "mod-4",
      moduleNumber: 4,
      sectionTitle: "Module 4: SYN Stealth Scan (-sS) & Half-Open Dynamics",
      description: "Master the SYN Stealth scan, half-open connection mechanics, evasion advantages, and terminal results.",
      lectures: [
        {
          id: "lec-4-1",
          title: "SYN Scan (Stealth / Half-Open) Architecture & Evasion",
          duration: "26:10",
          freePreview: true,
          definition: {
            what: "A SYN scan (-sS), also known as a stealth or half-open scan, is Nmap's default and most popular TCP scanning technique.",
            how: "It sends a raw TCP SYN packet, awaits the target's SYN-ACK, and immediately responds with an RST packet rather than an ACK.",
            why: "Because the connection is never fully established, the application layer never receives the socket, avoiding standard application logging."
          },
          overview: "The SYN stealth scan is the gold standard for penetration testing. It requires root (sudo) access because Nmap crafts custom raw IP packets bypassing the OS network stack.",
          keyPoints: [
            "Performs a partial TCP handshake (half-open connection).",
            "Sends SYN and immediately aborts with RST upon receiving SYN-ACK.",
            "Substantially reduces detection by application-level logs (Apache, Nginx, IIS).",
            "Faster than TCP Connect scan because fewer packets are exchanged and no kernel socket teardown is required.",
            "Requires root / administrator privileges (CAP_NET_RAW) to craft raw TCP packets."
          ],
          commandSnippets: [
            {
              title: "Running a SYN Stealth Scan",
              command: "sudo nmap -sS 192.168.1.12 --top-ports 50",
              description: "Executes a stealth half-open SYN scan across the top 50 TCP ports.",
              flags: [
                { flag: "sudo", meaning: "Elevates privileges required for raw packet transmission" },
                { flag: "-sS", meaning: "Specifies SYN Stealth / Half-Open scan mode" },
                { flag: "192.168.1.12", meaning: "Target IP address" },
                { flag: "--top-ports 50", meaning: "Restricts scan to the 50 most common ports" }
              ]
            }
          ],
          deepDive: [
            {
              heading: "Application Logging vs. Network IDS",
              body: "While SYN scans bypass application daemon logs (since Apache only logs after the connection is handed off via accept()), modern network Intrusion Detection Systems (Snort, Suricata, Zeek) and stateful firewalls easily detect SYN scans if scanning rates exceed configured thresholds."
            }
          ],
          quiz: {
            question: "Why does an Nmap SYN Stealth scan (-sS) require root/sudo privileges?",
            options: [
              "Because Nmap must read private user password hashes",
              "Because crafting raw TCP packets bypassing the OS socket stack requires raw network capabilities (CAP_NET_RAW)",
              "Because Linux forbids scanning external IP addresses without root approval",
              "Because SYN packets are encrypted using root-only private keys"
            ],
            correctIndex: 1,
            explanation: "Creating custom TCP headers with specific flags (SYN, RST) directly at Layer 3/4 requires raw socket access restricted to root."
          }
        },
        {
          id: "lec-4-2",
          title: "Half-Open Packet Dynamics: SYN -> SYN-ACK -> RST Teardown",
          duration: "27:50",
          freePreview: true,
          definition: {
            what: "The half-open packet exchange terminates the TCP handshake before completion using a Reset (RST) packet.",
            how: "Scanner sends SYN -> Target sends SYN-ACK (proving port is open) -> Scanner responds with RST to reset the socket.",
            why: "This prevents the target from holding half-open connection state in memory (SYN backlog) and prevents application socket binding."
          },
          overview: "Dive deep into the diagrammatic packet breakdown of the SYN stealth scan as presented in the GeeksforGeeks article.",
          keyPoints: [
            "1. Attacker sends SYN packet with an initial sequence number.",
            "2. Target port, if open, responds with SYN-ACK packet.",
            "3. Attacker immediately sends an RST (Reset) packet instead of the final ACK.",
            "4. Target kernel terminates the connection attempt and does not alert the application layer.",
            "5. If the target port is closed, the target responds with an RST/ACK packet directly."
          ],
          images: [
            {
              src: "/courses/nmap/syn_stealth_handshake.webp",
              alt: "Nmap SYN Stealth Scan Half-Open Handshake Diagram",
              caption: "Diagram 3: In a SYN scan, the scanner sends a SYN packet and receives SYN-ACK if the port is open, but instead of sending the final ACK, it responds with an RST packet to terminate early.",
              badge: "Stealth Handshake Mechanics"
            }
          ],
          deepDive: [
            {
              heading: "Preventing SYN Flood Denial of Service",
              body: "By promptly sending the RST packet, Nmap ensures the target operating system does not keep the socket in the SYN_RECEIVED state waiting for timeouts. This prevents the scanner from inadvertently causing a SYN flood DoS against the target machine."
            }
          ],
          quiz: {
            question: "What packet does Nmap transmit upon receiving a SYN-ACK during a SYN stealth scan?",
            options: [
              "ACK (Acknowledge)",
              "RST (Reset)",
              "FIN (Finish)",
              "PSH (Push)"
            ],
            correctIndex: 1,
            explanation: "Nmap sends an RST packet to abruptly close the half-open connection before completing the full 3-way handshake."
          }
        },
        {
          id: "lec-4-3",
          title: "Terminal Output Walkthrough: Analyzing Real SYN Scan Results",
          duration: "19:15",
          freePreview: true,
          definition: {
            what: "The terminal output of a SYN stealth scan provides rapid, authoritative port state information with minimal latency.",
            how: "Nmap parses incoming SYN-ACK responses asynchronously, populating the PORT, STATE, and SERVICE table in milliseconds.",
            why: "Interpreting this output confirms reachable listening daemons while verifying that minimal network overhead was incurred."
          },
          overview: "Examine the real terminal output screenshot of `nmap -sS 192.168.1.12 --top-ports 50` from the tutorial.",
          keyPoints: [
            "Executed with sudo privileges: sudo nmap -sS 192.168.1.12 --top-ports 50.",
            "Target host reported up with low latency.",
            "Displays open ports: 21 (ftp), 22 (ssh), 23 (telnet), 25 (smtp), 53 (domain), 80 (http), 110 (pop3), 139 (netbios-ssn), 445 (microsoft-ds).",
            "Completed 50-port scan in under 0.05 seconds.",
            "Generates identical port state findings as TCP Connect scan, but with half the packet exchange and zero application-level session logs."
          ],
          images: [
            {
              src: "/courses/nmap/syn_scan_output.png",
              alt: "Nmap SYN Stealth Scan Terminal Output Screenshot",
              caption: "Terminal Screenshot: Actual output of 'nmap -sS 192.168.1.12 --top-ports 50' on Linux displaying identical open ports with stealth packet mechanics.",
              badge: "SYN Scan Terminal"
            }
          ],
          terminalOutput: {
            command: "sudo nmap -sS 192.168.1.12 --top-ports 50",
            target: "192.168.1.12",
            rawOutput: `Starting Nmap 7.80 ( https://nmap.org ) at 2026-09-19 14:35 UTC
Nmap scan report for 192.168.1.12
Host is up (0.00038s latency).
Not shown: 41 closed ports
PORT    STATE SERVICE
21/tcp  open  ftp
22/tcp  open  ssh
23/tcp  open  telnet
25/tcp  open  smtp
53/tcp  open  domain
80/tcp  open  http
110/tcp open  pop3
139/tcp open  netbios-ssn
445/tcp open  microsoft-ds

Nmap done: 1 IP address (1 host up) scanned in 0.04 seconds`,
            analysis: [
              "Identical open port discovery as TCP Connect scan (-sT), but executed in 0.04s.",
              "Application servers on 192.168.1.12 recorded zero connection entries in access.log.",
              "The 41 closed ports responded with RST/ACK and were immediately cataloged as closed."
            ]
          },
          deepDive: [
            {
              heading: "Comparing -sT vs -sS Performance",
              body: "Because -sS does not complete the connection or wait for application responses, it is significantly faster on large network subnets. It is the recommended default scan type whenever root privileges are available."
            }
          ],
          quiz: {
            question: "Which of the following is an operational advantage of -sS over -sT?",
            options: [
              "It can penetrate air-gapped offline networks",
              "It is faster and bypasses application-level connection logging",
              "It works without root privileges on all systems",
              "It automatically exploits discovered vulnerabilities"
            ],
            correctIndex: 1,
            explanation: "The SYN scan is faster because it sends fewer packets per port, and standard server application logs never record the half-open connection."
          }
        }
      ]
    },
    {
      id: "mod-5",
      moduleNumber: 5,
      sectionTitle: "Module 5: UDP Scanning (-sU) & Connectionless Recon",
      description: "Understand the challenges, packet behavior, ICMP rate limiting, and output analysis of UDP port scanning.",
      lectures: [
        {
          id: "lec-5-1",
          title: "UDP Protocol Scanning Architecture & Connectionless Caveats",
          duration: "25:40",
          freePreview: true,
          definition: {
            what: "A UDP scan (-sU) probes target ports using connectionless User Datagram Protocol packets without any handshake.",
            how: "Nmap transmits empty or protocol-specific UDP datagrams; if no response is received, the port is marked open|filtered.",
            why: "Critical services such as DNS (53), SNMP (161), DHCP (67/68), and NTP (123) run exclusively over UDP and are invisible to TCP scans."
          },
          overview: "While most web services operate over TCP, vital network infrastructure and enterprise management services rely on UDP. Scanning UDP ports is fundamentally different from TCP.",
          keyPoints: [
            "UDP is connectionless: there is no SYN/ACK handshake to confirm an open socket.",
            "Open ports often return no response to empty UDP probes.",
            "Closed ports typically elicit an ICMP Type 3 Code 3 (Port Unreachable) error message.",
            "If packet filters or firewalls drop the packet, no response is received, resulting in 'open|filtered'.",
            "Significantly slower than TCP scanning due to operating system ICMP error rate limiting (RFC 1812)."
          ],
          commandSnippets: [
            {
              title: "Running a UDP Scan on Top 50 Ports",
              command: "sudo nmap -sU 192.168.1.12 --top-ports 50",
              description: "Probes the 50 most common UDP ports for listening services.",
              flags: [
                { flag: "-sU", meaning: "Specifies UDP port scan mode" },
                { flag: "192.168.1.12", meaning: "Target IP address" },
                { flag: "--top-ports 50", meaning: "Limits scan to 50 frequent UDP ports to avoid long timeouts" }
              ]
            }
          ],
          deepDive: [
            {
              heading: "ICMP Rate Limiting (RFC 1812)",
              body: "Linux and Cisco routers limit the rate at which they emit ICMP Port Unreachable error packets (typically to 1 packet per second). When scanning 65,535 UDP ports, a full UDP scan could take over 18 hours! Restricting probes to --top-ports 50 or --top-ports 100 is vital for practical security auditing."
            }
          ],
          quiz: {
            question: "What response does a closed UDP port typically return to the scanner?",
            options: [
              "TCP RST/ACK",
              "ICMP Destination Unreachable: Port Unreachable",
              "UDP SYN-ACK packet",
              "DNS NXDOMAIN response"
            ],
            correctIndex: 1,
            explanation: "When a UDP datagram reaches a closed port, the host kernel generates an ICMP Type 3 Code 3 (Destination Unreachable: Port Unreachable) packet."
          }
        },
        {
          id: "lec-5-2",
          title: "Terminal Output Walkthrough: Analyzing Real UDP Scan Results",
          duration: "18:20",
          freePreview: true,
          definition: {
            what: "UDP scan terminal output lists discovered UDP services, their response states, and latency metrics.",
            how: "Ports returning protocol payloads or remaining silent without ICMP errors are cataloged under the UDP protocol designation.",
            why: "Reveals mission-critical infrastructure like DNS (domain), NetBIOS (netbios-ns), and SNMP that could permit lateral movement."
          },
          overview: "Review the terminal output screenshot from running `nmap -sU 192.168.1.12 --top-ports 50` as detailed in the GeeksforGeeks guide.",
          keyPoints: [
            "Executed as: nmap -sU 192.168.1.12 --top-ports 50.",
            "Sends empty UDP packets to destination ports.",
            "Identifies active UDP services: 53/udp (domain) and 137/udp (netbios-ns).",
            "Categorizes 48 closed ports.",
            "Demonstrates that UDP scanning requires patience compared to instantaneous TCP sweeps."
          ],
          images: [
            {
              src: "/courses/nmap/udp_scan_output.png",
              alt: "Nmap UDP Scan Terminal Output Screenshot",
              caption: "Terminal Screenshot: Actual terminal output from running 'nmap -sU 192.168.1.12 --top-ports 50' showing open UDP ports (53/udp domain, 137/udp netbios-ns).",
              badge: "UDP Scan Terminal Output"
            }
          ],
          terminalOutput: {
            command: "nmap -sU 192.168.1.12 --top-ports 50",
            target: "192.168.1.12",
            rawOutput: `Starting Nmap 7.80 ( https://nmap.org ) at 2026-09-19 14:48 UTC
Nmap scan report for 192.168.1.12
Host is up (0.00045s latency).
Not shown: 48 closed ports
PORT    STATE SERVICE
53/udp  open  domain
137/udp open  netbios-ns

Nmap done: 1 IP address (1 host up) scanned in 1.42 seconds`,
            analysis: [
              "Port 53/udp (domain): DNS server active. Candidate for DNS zone transfer testing (dig axfr) or DNS cache snooping.",
              "Port 137/udp (netbios-ns): Windows/Samba NetBIOS Name Service. Can be queried via nbtscan to enumerate Windows workgroup, hostname, and MAC address.",
              "Scan time took 1.42 seconds for 50 ports—roughly 30x longer than the TCP scan due to UDP retransmission timeouts."
            ]
          },
          deepDive: [
            {
              heading: "Techniques to Accelerate UDP Scans",
              body: "To speed up UDP scanning: 1) Specify target ports explicitly (-p 53,67,68,69,123,137,161,500), 2) Combine with version detection (-sUV) so Nmap sends service-specific payload probes, and 3) Set --max-retries 1 to prevent excessive retransmissions."
            }
          ],
          quiz: {
            question: "In the UDP scan output, which service on port 137/udp can be interrogated for Windows computer names and workgroup metadata?",
            options: [
              "FTP daemon",
              "NetBIOS Name Service (netbios-ns)",
              "SSH server",
              "HTTP proxy"
            ],
            correctIndex: 1,
            explanation: "Port 137/udp is the NetBIOS Name Service, frequently utilized on Windows and Samba networks to resolve computer names."
          }
        }
      ]
    },
    {
      id: "mod-6",
      moduleNumber: 6,
      sectionTitle: "Module 6: Ping Scan (-sn) & Subnet Host Discovery",
      description: "Discover active hosts across entire IP subnets quickly without probing individual port numbers.",
      lectures: [
        {
          id: "lec-6-1",
          title: "Ping Scan / No-Port Scan (-sn / -sP) Mechanics & Subnet Sweeps",
          duration: "21:30",
          freePreview: true,
          definition: {
            what: "A Ping scan (-sn, formerly -sP) is a host discovery scan that identifies alive systems without scanning any port numbers.",
            how: "It emits ICMP Echo Requests, TCP SYN to port 443, TCP ACK to port 80, and ICMP Timestamp probes to discover live hosts.",
            why: "It rapidly maps available devices across whole subnets (e.g. 256 hosts in /24) before investing time in targeted port scans."
          },
          overview: "Before you spend hours scanning 65,535 ports on 250 IP addresses, you must know which IPs are actually powered on and connected to the network.",
          keyPoints: [
            "Flag syntax: nmap -sn 192.168.1.0/24 (previously known as -sP in older Nmap versions).",
            "Does not touch destination ports: focuses exclusively on host discovery probes.",
            "When run on a local Ethernet subnet as root, Nmap uses ARP requests for 100% reliable discovery regardless of firewalls.",
            "When run against external networks, Nmap sends ICMP Echo, TCP SYN to 443, TCP ACK to 80, and ICMP Timestamp.",
            "Subnet notation /24 scans all 256 addresses (from .0 to .255) in a matter of seconds."
          ],
          commandSnippets: [
            {
              title: "Subnet Sweeping with Ping Scan",
              command: "nmap -sn 192.168.1.0/24",
              description: "Sweeps all 256 IP addresses in the 192.168.1.0/24 subnet to discover active hosts.",
              flags: [
                { flag: "-sn", meaning: "Ping scan only: disables port scanning" },
                { flag: "192.168.1.0/24", meaning: "CIDR notation for the target Class C subnet" }
              ]
            },
            {
              title: "Checking a Single Host Liveness",
              command: "nmap -sn 192.168.1.12",
              description: "Verifies whether a specific IP address is currently online.",
              flags: [
                { flag: "-sn", meaning: "Skips port scan, tests host liveness only" }
              ]
            }
          ],
          deepDive: [
            {
              heading: "ARP Scanning on Local Subnets",
              body: "If Nmap is executed by root on a local Ethernet network, it overrides ICMP ping and utilizes ARP (Address Resolution Protocol) ping probes. Because hosts must respond to ARP to communicate on Ethernet, local ARP sweeps cannot be blocked by personal software firewalls!"
            }
          ],
          quiz: {
            question: "What does the command 'nmap -sn 192.168.1.0/24' accomplish?",
            options: [
              "It scans all 65,535 ports on IP 192.168.1.0",
              "It discovers all alive hosts in the subnet without scanning ports",
              "It launches a denial of service ping flood against the gateway",
              "It changes the scanner's subnet mask to /24"
            ],
            correctIndex: 1,
            explanation: "The -sn flag disables port scanning and prints only the responsive hosts found within the designated /24 subnet range."
          }
        },
        {
          id: "lec-6-2",
          title: "Terminal Output Walkthrough: Host Discovery Scan Output",
          duration: "16:40",
          freePreview: true,
          definition: {
            what: "The ping scan terminal report outputs a clean list of responsive IP addresses and hostnames discovered on the subnet.",
            how: "Each detected host is printed with its IP, latency measurement, and optional MAC address with hardware vendor details.",
            why: "This provides the immediate inventory of live targets for the next phases of vulnerability assessment and penetration testing."
          },
          overview: "Review the terminal screenshot of `nmap -sn 192.168.1.0/24` from the GeeksforGeeks article.",
          keyPoints: [
            "Identifies responsive IP addresses on the 192.168.1.0/24 network.",
            "Only prints the available hosts that respond to discovery probes.",
            "Shows that no port scan was performed, keeping the probe extremely lightweight.",
            "Ideal for discovering unauthorized devices (rogue APs, unauthorized laptops) on corporate subnets."
          ],
          images: [
            {
              src: "/courses/nmap/ping_scan_output.png",
              alt: "Nmap Ping Scan Terminal Output Screenshot",
              caption: "Terminal Screenshot: Actual terminal output from running 'nmap -sn 192.168.1.0/24' showing discovery of live host 192.168.1.12.",
              badge: "Ping Scan Output"
            }
          ],
          terminalOutput: {
            command: "nmap -sn 192.168.1.0/24",
            target: "192.168.1.0/24",
            rawOutput: `Starting Nmap 7.80 ( https://nmap.org ) at 2026-09-19 14:55 UTC
Nmap scan report for 192.168.1.12
Host is up (0.00032s latency).
MAC Address: 08:00:27:84:5D:89 (Oracle VirtualBox virtual NIC)
Nmap done: 256 IP addresses (1 host up) scanned in 2.15 seconds`,
            analysis: [
              "Target 192.168.1.12 is online and responding to discovery probes.",
              "Latency is ultra-low (0.32 milliseconds), indicating a local virtual machine or LAN segment.",
              "MAC address reveals vendor 'Oracle VirtualBox virtual NIC', providing initial OSINT that the target is a virtual lab instance.",
              "All 256 IPs scanned in just 2.15 seconds!"
            ]
          },
          deepDive: [
            {
              heading: "Next Steps After Host Discovery",
              body: "Once live IPs are saved (e.g. using -oG live_hosts.txt), feed them directly into targeted port scans: nmap -sS -p- -iL live_hosts.txt to enumerate the full attack surface."
            }
          ],
          quiz: {
            question: "What valuable hardware information can local subnet ping scans reveal in their terminal output?",
            options: [
              "The target's BIOS administrator password",
              "The target's MAC address and hardware vendor organization",
              "The target's hard drive serial number",
              "The target's CPU clock frequency"
            ],
            correctIndex: 1,
            explanation: "On local networks, ARP responses include the target's MAC address, whose first 3 bytes (OUI) identify the hardware manufacturer (e.g. Apple, VirtualBox, Dell)."
          }
        }
      ]
    },
    {
      id: "mod-7",
      moduleNumber: 7,
      sectionTitle: "Module 7: Port States, Diagnostic Matrix & Pentesting Best Practices",
      description: "Master the 6 distinct Nmap port states, timing templates (-T0 to -T5), output export formats, and security best practices.",
      lectures: [
        {
          id: "lec-7-1",
          title: "The 6 Port States Explained: Open, Closed, Filtered & Ambiguous States",
          duration: "29:30",
          freePreview: true,
          definition: {
            what: "Nmap classifies ports into 6 distinct states: Open, Closed, Filtered, Unfiltered, Open|Filtered, and Closed|Filtered.",
            how: "The classification depends on received responses: SYN-ACK, RST, ICMP error codes, or packet drop timeouts.",
            why: "Recognizing each state prevents false assumptions and guides pestering tactics (e.g. firewall evasion vs service exploitation)."
          },
          overview: "Rather than simply reporting open or closed, Nmap provides 6 nuanced states that reflect firewall rules, packet filters, and application socket behavior.",
          keyPoints: [
            "Open: The port is actively accepting connections; an application daemon is listening (e.g., MySQL on port 3306, Apache on port 80).",
            "Closed: The port is accessible (packets reach the destination), but no application daemon is currently listening; responds with RST/ACK.",
            "Filtered: A firewall, router filter, or security system blocks the probes; Nmap cannot determine if the port is open or closed due to packet drops or ICMP errors.",
            "Unfiltered: The port responds to probes (e.g. ACK scans), indicating it is accessible, but whether it is listening or closed is unknown.",
            "Open | Filtered: No response is received; Nmap cannot distinguish whether the port is open or filtered (common in UDP, NULL, FIN, and Xmas scans).",
            "Closed | Filtered: Conflicting responses suggest the port is sometimes closed and sometimes filtered (found in idle bounce scans)."
          ],
          deepDive: [
            {
              heading: "Detailed Port State Diagnostic Matrix",
              body: "Understanding the diagnostic matrix is critical for security audits:\n\n1. OPEN: Target replies with SYN-ACK (TCP) or application response (UDP). Attack action: Enumerate software version with -sV, test for default credentials.\n\n2. CLOSED: Target replies with RST/ACK (TCP) or ICMP Port Unreachable (UDP). Attack action: No service listening; can still be used for host uptime checks.\n\n3. FILTERED: Packet dropped silently or ICMP Type 3 Code 1/2/9/10/13 received. Attack action: Test firewall evasion techniques (-f fragmentation, decoy -D, source-port 53).\n\n4. UNFILTERED: Target replies with RST in an ACK scan (-sA). Attack action: Proves firewall allows packets through; follow up with SYN scan.\n\n5. OPEN|FILTERED: No packet returned in UDP/NULL/FIN/Xmas scan. Attack action: Send protocol-specific UDP probes with -sUV.\n\n6. CLOSED|FILTERED: Only observed in advanced idle scans when zombie IP state is inconsistent."
            }
          ],
          quiz: {
            question: "What does Nmap mean when it flags a port as 'Filtered'?",
            options: [
              "The port is actively running a filtered proxy service",
              "A firewall or packet filter is intercepting probes, making it impossible to determine if the port is open or closed",
              "The port is verified to be completely closed and powered down",
              "The port has been filtered out of the report because it is safe"
            ],
            correctIndex: 1,
            explanation: "Filtered means that firewall rules or packet filters dropped the scan probes or returned ICMP unreachable codes, obscuring the port's true status."
          }
        },
        {
          id: "lec-7-2",
          title: "Best Practices: Timing Templates (-T0 to -T5), Output Formats & Safe Scanning",
          duration: "26:40",
          freePreview: true,
          definition: {
            what: "Professional Nmap workflows integrate multi-scan methodologies, performance timing controls, and multi-format reporting.",
            how: "Engineers apply timing templates (-T0 Paranoid to -T5 Insane), capture logs with -oA, and adhere to strict rules of engagement.",
            why: "Following best practices ensures comprehensive coverage, avoids bringing down fragile legacy equipment, and produces audit-ready documentation."
          },
          overview: "Master the essential guidelines for conducting thorough, safe, and professional network vulnerability discovery as emphasized in the GeeksforGeeks guide.",
          keyPoints: [
            "Use Multiple Scan Types: Combine TCP Connect/SYN, UDP, and Ping scans for holistic network visibility.",
            "Timing & Performance (-T0 to -T5): -T0 (Paranoid) and -T1 (Sneaky) evade IDS alerts; -T3 (Normal) is default; -T4 (Aggressive) is the standard for fast broadband scans.",
            "Regular Scheduled Scanning: Periodically scan networks to catch newly exposed services, accidental firewall holes, or shadow IT assets.",
            "Safe Version Probing: Use version detection (-sV) carefully without aggressive intrusive fuzzing on sensitive industrial or healthcare networks.",
            "Export Results (-oN, -oX, -oG, -oA): Always save scan data. -oN creates human-readable text, -oX generates XML for automated tools/SIEMs, -oG creates grepable output, and -oA exports all formats simultaneously."
          ],
          commandSnippets: [
            {
              title: "Comprehensive Security Audit Command",
              command: "sudo nmap -sS -sV -T4 -p- -oA enterprise_audit 192.168.1.12",
              description: "Scans all 65,535 TCP ports with stealth, service versioning, aggressive timing, and exports in all formats.",
              flags: [
                { flag: "-sS", meaning: "SYN Stealth Scan" },
                { flag: "-sV", meaning: "Version detection across open ports" },
                { flag: "-T4", meaning: "Aggressive timing template for fast network links" },
                { flag: "-p-", meaning: "Probes all 65,535 ports (1 to 65535)" },
                { flag: "-oA enterprise_audit", meaning: "Outputs in Normal (.nmap), XML (.xml), and Grepable (.gnmap) formats" }
              ]
            },
            {
              title: "Timing Templates Reference",
              command: "# -T0: Paranoid (slowest, serial, 5-minute delays between probes)\n# -T1: Sneaky (evades IDS threshold rules)\n# -T2: Polite (relieves target bandwidth)\n# -T3: Normal (default Nmap timing)\n# -T4: Aggressive (recommended for fast, reliable LAN/broadband)\n# -T5: Insane (extremely fast, risks packet drop on congested networks)",
              description: "Nmap timing templates scale probe intervals, timeouts, and parallel sockets.",
              flags: []
            }
          ],
          deepDive: [
            {
              heading: "Export Formats for Automated Workflows",
              body: "Never lose scan data. Generating XML output (-oX) allows you to import scan results directly into vulnerability management platforms (such as Metasploit db_import, DefectDojo, or Nessus) for automated vulnerability correlation."
            }
          ],
          quiz: {
            question: "Which Nmap output option exports scan results simultaneously in Normal, XML, and Grepable formats?",
            options: [
              "-oN",
              "-oX",
              "-oG",
              "-oA <basename>"
            ],
            correctIndex: 3,
            explanation: "The -oA <basename> flag instructs Nmap to write scan results to <basename>.nmap (normal), <basename>.xml (XML), and <basename>.gnmap (grepable) all at once."
          }
        }
      ]
    }
  ]
};
