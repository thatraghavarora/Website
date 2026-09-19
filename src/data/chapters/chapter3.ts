import { RoadmapChapter } from "./types";

export const chapter3: RoadmapChapter = {
  id: "ch-3-osint",
  chapterNumber: 3,
  title: "OSINT & Passive Reconnaissance Masterclass",
  subtitle: "Domain Intelligence, Certificate Transparency, GitHub Leaks & Shodan IoT Hunting",
  badge: "Chapter 3 • Passive Recon",
  duration: "16 Hours • 6 In-Depth Lessons",
  difficulty: "Intermediate",
  description:
    "Over 80% of critical security breaches originate from passive intelligence gathered without sending a single offensive packet to the target. Learn how to map Autonomous System Numbers (ASNs), mine Certificate Transparency logs, extract hardcoded secrets from git commit histories, query Shodan search filters, and resurrect vulnerable historical endpoints via the Wayback Machine.",
  iconName: "Search",
  lessons: [
    {
      id: "l-3-1",
      lessonNumber: "3.1",
      title: "Domain Intelligence, ASN Scoping & Reverse IP",
      duration: "2.5 Hours",
      badge: "Scoping",
      summary:
        "Finding an enterprise's entire digital footprint via Autonomous System Numbers (ASNs), BGP routing prefixes, WHOIS registration data, and reverse IP lookups.",
      studyNotes: [
        {
          heading: "Autonomous System Numbers (ASNs) & BGP Routing Scopes",
          subheading: "How global Internet routing structures reveal all corporate IP subnets",
          points: [
            "What is an Autonomous System (AS)? A connected collection of IP routing prefixes under the control of a single administrative entity (e.g., AS15169 for Google, AS32934 for Meta, AS16509 for Amazon).",
            "BGP Route Announcements: Organizations advertise their IP subnets to global tier-1 telecom carriers via Border Gateway Protocol (BGP). Querying BGP routing tables allows penetration testers to uncover every single CIDR block allocated to a company.",
            "Regional Internet Registries (RIRs): ARIN (North America), RIPE NCC (Europe/Middle East), APNIC (Asia-Pacific), LACNIC (Latin America), and AFRINIC (Africa) maintain official registration records of IP allocations.",
            "Expanding Bounty Scope Legally: If a bug bounty policy specifies 'Any asset owned by Company X', discovering their ASN instantly expands your testing perimeter from 1 domain to tens of thousands of internal IP addresses.",
          ],
          callout: "Always verify ASN ownership against public acquisitions and mergers. Many enterprises purchase startups but fail to integrate their legacy cloud infrastructure into corporate security policies, leaving behind unmonitored, patchless staging networks.",
          diagramOrCode: `+-------------------------------------------------------------+
|                 ASN DISCOVERY & SCOPE EXPANSION             |
+-------------------------------------------------------------+
 Target: "Uber Inc."
       |
       v (BGP Routing Table Query via BGPview / HE.net)
 ASN: AS27745
       |
       +---> Subnet 1: 199.223.116.0/22 (1,024 IPs)
       +---> Subnet 2: 104.36.192.0/21  (2,048 IPs)
       +---> Subnet 3: 2605:9980::/32   (IPv6 Range)
       |
       v
 Mass Port Scanning / Asset Fingerprinting (nmap / masscan)`
        },
        {
          heading: "Reverse WHOIS, DNS & Cross-Asset Attribution",
          subheading: "Connecting obscure subsidiary domains via shared registrar records",
          points: [
            "Historical WHOIS Records: Even if modern domains use WHOIS Privacy Protection, historical databases (Whoisology, DomainTools) often reveal the original administrative email, phone number, or physical address used at initial registration.",
            "Reverse WHOIS Searches: Searching by registrant email (e.g. `domainadmin@targetcompany.com`) uncovers forgotten campaign domains, staging subdomains, and corporate subsidiaries.",
            "Shared SSL Subject Alt Names (SAN): Reverse SSL lookups reveal all domains that share the same multi-domain cryptographic certificate.",
            "DNS Shared Nameservers: Enumerating custom enterprise nameservers (`ns1.targetinternal.com`) reveals all related corporate zones hosted under the same infrastructure.",
          ],
          callout: "Attackers look for 'forgotten marketing domains' created by third-party PR agencies for promotional events 5 years ago. These domains often run obsolete WordPress plugins connected directly to corporate internal databases.",
          diagramOrCode: `REVERSE WHOIS SCOPING COMMANDS:
  # Query ASN by Company Name:
  amass intel -org "Target Company"
  
  # Discover all CIDR blocks belonging to ASN 12345:
  whois -h whois.radb.net -- '-i origin AS12345' | grep -Eo "([0-9.]+){4}/[0-9]+"
  
  # Reverse IP lookup via HackerTarget API:
  curl -s "https://api.hackertarget.com/reverseiplookup/?q=199.223.116.5"`
        }
      ],
      keyTopics: [
        "Autonomous System Numbers (ASNs) & BGP Routing Allocation: An Autonomous System (AS) is an interconnected collection of IP routing prefixes controlled by a single administrative organization sharing a common routing policy. Organizations advertise their network blocks to global tier-1 telecom carriers via the Border Gateway Protocol (BGP). Discovering an enterprise's ASN (e.g. AS15169 for Google, AS27745 for Uber) reveals every public CIDR IP block legally owned by the company across the entire Internet.",
        "Regional Internet Registry (RIR) Databases & WHOIS Scoping: Global IP addresses and ASNs are allocated and cataloged by five Regional Internet Registries: ARIN, RIPE NCC, APNIC, LACNIC, and AFRINIC. Querying WHOIS databases via tools like RADb (whois -h whois.radb.net -- '-i origin AS12345') returns authoritative lists of IP ranges registered to that organization. Penetration testers parse these CIDR blocks to map the target's entire network perimeter before initiating active port scans.",
        "Reverse WHOIS Mapping & Corporate Attribution: While modern domain registrations frequently utilize WHOIS Privacy Guard services, historical registration records often preserve the original registrant email, administrative phone number, or physical corporate address. Reverse WHOIS engines (DomainTools, Whoxy) search historical databases to identify all domains registered with that specific corporate email address. This exposes forgotten marketing campaigns, legacy acquisitions, and unmonitored staging portals.",
        "Corporate Mergers, Acquisitions & SEC 10-K Filings: When large enterprises acquire startups, the newly acquired company's infrastructure is often absorbed into the parent organization's bug bounty scope long before security policies are standardized. Reviewing public financial filings (such as US SEC Form 10-K Exhibit 21) reveals a comprehensive legal list of all corporate subsidiaries and joint ventures. Testing these subsidiary assets frequently yields high-severity vulnerabilities due to outdated software and patch lag.",
        "Reverse IP Lookups & Shared Virtual Hosting Architecture: A reverse IP lookup determines all hostnames associated with a specific IP address by analyzing historical DNS A records, PTR records, and shared SSL certificate databases. On shared cloud infrastructure (AWS EC2, Cloudflare edge nodes), thousands of distinct websites share the same IP, whereas on dedicated enterprise hosting, reverse IP queries uncover unlinked corporate portals. Identifying co-located hosts reveals internal administrative interfaces sharing the same server.",
      ],
      terminalCommands: [
        "whois -h whois.radb.net -- '-i origin AS15169'",
        "amass intel -org 'Target Organization'",
        "amass intel -asn 12345",
        "dig +nocmd target.com ANY +multiline +noall +answer",
      ],
      proTips: [
        "Always check bug bounty policy scope; if ASN or wildcards `*.target.com` are in scope, you have thousands of untapped assets.",
        "Use SEC 10-K financial filings for publicly traded US companies; Section 1 lists all subsidiaries and legally owned brands.",
      ],
    },
    {
      id: "l-3-2",
      lessonNumber: "3.2",
      title: "Certificate Transparency (CT) Logs Mining",
      duration: "2.5 Hours",
      badge: "Passive Recon",
      summary:
        "Leveraging public SSL/TLS Certificate Transparency (CT) logs to discover newly created internal, testing, and staging subdomains within minutes of issuance.",
      studyNotes: [
        {
          heading: "How Certificate Transparency Works & Why It Cannot Be Hidden",
          subheading: "The cryptographic append-only Merkle tree standard designed to catch fraudulent CAs",
          points: [
            "Why CT Exists: Created by Google (RFC 6962) following CA compromises (like DigiNotar), CT requires all public Certificate Authorities (Let's Encrypt, DigiCert, Sectigo) to publicly log every TLS certificate they issue before browsers will trust it.",
            "Append-Only Merkle Trees: CT logs are cryptographically verifiable append-only public ledgers. Once a certificate is logged, it can never be deleted or modified by anyone — including the domain owner.",
            "Passive Discovery: Because certificate generation is logged by third-party CAs, an attacker queries the public log servers without ever interacting with or alerting the target organization.",
            "Subject Alternative Names (SANs): A single TLS wildcard certificate often bundles dozens of staging domains (e.g. `*.prod.target.com`, `admin-test.target.com`, `vpn-staging.target.com`).",
          ],
          callout: "Software engineers often register a Let's Encrypt SSL certificate for their internal testing portal 2 weeks BEFORE deploying access controls or firewalls. Mining CT logs exposes these naked developer portals before security teams lock them down.",
          diagramOrCode: `+-------------------------------------------------------------+
|              CERTIFICATE TRANSPARENCY (CT) MINING           |
+-------------------------------------------------------------+
 Developer requests SSL cert for: [ dev-api-v2.internal.target.com ]
                                 |
                                 v
 Certificate Authority (Let's Encrypt) logs cert to public Merkle Tree
                                 |
                                 v
 [ Public CT Logs: crt.sh / Google / Cloudflare ]
                                 |
                                 v
 Attacker queries: curl 'https://crt.sh/?q=%.target.com&output=json'
                                 |
                                 v
 Instant Discovery of: dev-api-v2.internal.target.com (No active scans sent!)`
        },
        {
          heading: "Real-Time Certificate Streaming with Certstream",
          subheading: "Catching zero-minute asset deployments as they hit the global cryptographic ledger",
          points: [
            "Real-Time Websocket Feeds: Certstream aggregates live updates from all global CT log operators and streams them over a public WebSocket interface in real time.",
            "Keyword Regex Filtering: Running a certstream daemon filtered for your target's keyword triggers instant push alerts the exact second a sysadmin provisions an SSL certificate.",
            "High-Value Keywords: Look for subdomains containing strings like `dev`, `stage`, `corp`, `vpn`, `sso`, `gitlab`, `jira`, `grafana`, `admin`, and `test`.",
            "Historical SAN Mining via crt.sh: Querying crt.sh via automated JSON parsing extracts years of forgotten legacy subdomains.",
          ],
          callout: "Combine CT log mining with automated HTTP probing. When a new certificate matching your target appears on Certstream, pipe it directly into `httpx` to verify if port 443 or 8443 is open and returns HTTP 200.",
          diagramOrCode: `CT LOG EXTRACTION BASH PIPELINE:
  # Query crt.sh for all wildcard subdomains:
  curl -s "https://crt.sh/?q=%.target.com&output=json" | \\
    jq -r '.[].name_value' | \\
    sed 's/\\*\\.//g' | \\
    sort -u | \\
    anew ct_subdomains.txt
  
  # Stream live certificate issuances via Python:
  certstream --json | jq -r 'select(.data.leaf_cert.all_domains[] | test("target.*"))'`
        }
      ],
      keyTopics: [
        "Certificate Transparency (CT) Merkle Tree Architecture: Certificate Transparency (RFC 6962) is an open cryptographic framework created to detect and audit fraudulently issued SSL/TLS certificates. Public Certificate Authorities (Let's Encrypt, DigiCert, Sectigo) are required to log every public certificate they issue to public, append-only, cryptographically verifiable Merkle trees before browsers trust them. Because these logs are permanently public and unmodifiable, researchers query them to passively discover every domain and subdomain ever provisioned.",
        "Subject Alternative Names (SAN) Mining via crt.sh: When modern SSL certificates are generated, administrators frequently bundle multiple hostnames into a single certificate using the Subject Alternative Name (SAN) extension. Querying public CT aggregators like crt.sh with wildcards (curl 'https://crt.sh/?q=%.target.com&output=json') extracts thousands of subdomains, including internal test servers, VPN gateways, and development clusters. Parsing these records via jq and anew produces a clean, deduplicated target inventory.",
        "Real-Time Certificate Streaming with Certstream: Certstream is an open-source intelligence service that aggregates real-time certificate issuance updates from all global CT log operators into a centralized WebSocket stream. Security researchers deploy Python or Go daemons that filter the live stream for target company keywords (e.g. matching 'target.*' or '.*-target.com'). This triggers instant alerts within minutes of a sysadmin provisioning an SSL certificate for a new server, long before DNS propagates globally.",
        "Zero-Packet Passive Reconnaissance Advantages: Because Certificate Transparency logs are maintained by third-party search engines and CAs, querying CT data sends exactly zero network packets to the target organization's infrastructure. The target's Intrusion Detection Systems (IDS), Web Application Firewalls (WAF), and Security Operations Centers (SOC) have zero visibility into this reconnaissance phase. This allows researchers to map out complete corporate networks completely undetected.",
        "Identifying Pre-Production & Staging Assets in CT Logs: Developers routinely provision valid TLS certificates for staging environments weeks before launch to test HTTPS compatibility in development pipelines. Subdomains discovered in CT logs containing strings like 'dev-', 'stage-', 'uat-', 'internal-', or 'vpn-' represent the highest-value targets for bug bounty hunting. These servers frequently have default credentials, disabled authentication gates, and verbose debugging error pages enabled.",
      ],
      terminalCommands: [
        "curl -s 'https://crt.sh/?q=%.target.com&output=json' | jq -r '.[].name_value' | sed 's/\\*\\.//g' | sort -u",
        "subfinder -d target.com -all -silent | anew subs.txt",
        "python3 -m pip install certstream",
      ],
      proTips: [
        "Newly registered certificates containing words like `dev-`, `staging-`, `jira-`, `vpn-` usually have minimal security controls!",
        "Query crt.sh with wildcards: `%.corp.target.com` to drill down into internal corporate infrastructure.",
      ],
    },
    {
      id: "l-3-3",
      lessonNumber: "3.3",
      title: "GitHub Leaks, Git History Extraction & Secret Scraping",
      duration: "3 Hours",
      badge: "Secret Hunting",
      summary:
        "Mining GitHub repositories, public Gists, commit diff histories, and employee personal profiles for hardcoded AWS keys, database connection URIs, and JWT signing secrets.",
      studyNotes: [
        {
          heading: "The Threat of Public Source Code Leakage",
          subheading: "How developer convenience leads to catastrophic corporate secret exposure",
          points: [
            "Accidental Public Commits: Developers working on private enterprise repositories frequently fork code to their personal GitHub accounts or accidentally push `.env` files containing production credentials.",
            "The Illusion of Deleted Commits: When a developer realizes they committed an API key and deletes it in a subsequent commit, the secret REMAINS PERMANENTLY STORED in the Git commit object tree (`git log -p`)!",
            "High-Impact Secret Types: AWS Access Key IDs (starting with `AKIA...`), Slack Bot Tokens (`xoxb-...`), Google Cloud Service Account JSON keys, Stripe Secret Keys (`sk_live_...`), and MongoDB connection strings with cleartext passwords (`mongodb+srv://admin:pass@...`).",
            "Public Gists: Developers often paste snippets of server logs, stack traces, and database schemas into public GitHub Gists to share with colleagues.",
          ],
          callout: "A critical severity finding is almost guaranteed if you discover an `AKIA...` AWS secret key with administrative privileges. Using the AWS CLI (`aws sts get-caller-identity`), you can verify whether the leaked key has access to the target company's entire S3 data lake.",
          diagramOrCode: `+-------------------------------------------------------------+
|               GIT COMMIT HISTORY SECRET EXTRACTION          |
+-------------------------------------------------------------+
 Commit 1: Initial commit (contains db_password = "SuperSecretPass!")
 Commit 2: "Oops, remove secret" (deletes line from config.py)

 Attacker clones repository:
   git clone https://github.com/employee/company-tool.git
   git log -p | grep -E "AKIA|password|secret|token"
   
 Result: The secret is fully extracted from Commit 1 history!`
        },
        {
          heading: "Automated Secret Scraping: Trufflehog, Gitrob & GitHub Dorking",
          subheading: "Scanning millions of lines of code with regex patterns and Shannon entropy",
          points: [
            "Entropy-Based Detection: TruffleHog searches not only for fixed regex signatures, but calculates Shannon entropy to detect high-randomness character strings (characteristic of base64/hex hashes and cryptographic keys).",
            "GitHub Search Syntax (Dorks): Target queries like `org:targetcompany \"AWS_SECRET_ACCESS_KEY\"` or `filename:.env targetcompany.com`.",
            "CI/CD Pipeline Configurations: Searching for `.github/workflows/` or `.gitlab-ci.yml` often reveals exposed secret environment variables or webhook tokens.",
            "Validating Leaked Credentials: Always verify whether a key is active without causing destructive damage (e.g. `aws sts get-caller-identity` or `curl -H \"Authorization: Bearer <token>\" https://api.stripe.com/v1/charges`).",
          ],
          callout: "Never modify, download, or delete data when you discover leaked credentials during an authorized penetration test or bug bounty assessment. Demonstrate read-only access (Proof of Concept) and report immediately.",
          diagramOrCode: `ESSENTIAL GITHUB SEARCH DORKS:
  org:target "password"
  org:target "api_key"
  org:target filename:credentials
  org:target filename:id_rsa
  org:target "mongodb://"
  "target.com" filename:.npmrc _auth

TRUFFLEHOG COMMAND:
  trufflehog github --org=targetcompany --only-verified`
        }
      ],
      keyTopics: [
        "Public Source Code Secret Leakage & Developer Pitfalls: Modern Agile development encourages rapid code pushes to public platforms like GitHub, GitLab, and Bitbucket. Developers working on enterprise projects frequently fork corporate repositories to their personal accounts or commit private configuration files (.env, credentials.json, id_rsa) by accident. Even if a repository is made private hours later, public commit scrapers and historical mirror engines often preserve the leaked secrets permanently.",
        "Git Object Tree Forensics & Dangling Commits: When a developer realizes they committed a secret and executes 'git rm' in a subsequent commit, the secret REMAINS FULLY ACCESSIBLE in the Git commit history object tree. Running 'git log -p -S \"password\"' or inspecting the raw commit history with tools like GitKraken reveals the plaintext secret in the commit diff. Attackers also inspect dangling commits, abandoned branches, and squashed pull requests to recover deleted keys.",
        "Automated Secret Detection with TruffleHog & Gitleaks: TruffleHog and Gitleaks are specialized tools that scan Git repositories, commit histories, and filesystems for sensitive credentials using both regex signatures and Shannon entropy algorithms. Shannon entropy calculates the mathematical randomness of character strings, flagging high-entropy strings characteristic of base64-encoded API keys, AWS access tokens, and private SSH keys. TruffleHog also verifies if discovered AWS, Slack, or GitHub keys are currently active.",
        "High-Impact Secret Signatures (AWS, GCP, Slack, Stripe): Key signatures to look for include: AWS Access Key IDs (starting with 'AKIA' followed by 16 alphanumeric characters), Slack Bot Tokens ('xoxb-'), Google Cloud Service Account private keys, and Stripe Live API keys ('sk_live_'). Discovering a high-privilege cloud credential allows an attacker to take over the target's entire cloud infrastructure without exploiting any web application software vulnerabilities.",
        "GitHub Dorking Syntax & Corporate Organization Scoping: GitHub Dorking leverages advanced search operators within GitHub's code search engine: 'org:targetcompany' limits queries strictly to company-owned repositories. Queries like 'org:targetcompany filename:.env DB_PASSWORD' or '\"target.com\" filename:credentials' uncover exposed database connection URIs, internal API keys, and private tokens. Researchers also search for employee personal accounts and public Gists to locate leaked debugging scripts.",
      ],
      terminalCommands: [
        "trufflehog git https://github.com/target/repo.git",
        "git log -p -S 'password'",
        "aws sts get-caller-identity",
      ],
      proTips: [
        "Search GitHub for employees' personal accounts: developers often copy snippets of company code into public personal repositories to work from home.",
        "Look for `postman_environment.json` files on GitHub; they frequently contain authorization bearer tokens for internal APIs.",
      ],
    },
    {
      id: "l-3-4",
      lessonNumber: "3.4",
      title: "Shodan, Censys & Internet-Wide Scanning Engines",
      duration: "3 Hours",
      badge: "IoT & Scanners",
      summary:
        "Mastering Shodan, Censys, and FOFA to locate exposed Elasticsearch databases, unauthenticated Redis instances, ICS/SCADA controllers, and origin web servers behind Cloudflare.",
      studyNotes: [
        {
          heading: "How Internet-Wide Port Scanners Operate",
          subheading: "Continuous global IPv4 banner grabbing and service fingerprinting",
          points: [
            "Internet Scanning Architecture: Platforms like Shodan and Censys continuously scan the entire 4.2 billion IPv4 address space across hundreds of ports (80, 443, 21, 22, 3389, 27017, 9200), indexing every response banner.",
            "Banner Grabbing: When Shodan connects to an open port, it captures the raw service greeting (e.g., `SSH-2.0-OpenSSH_8.2p1`, `HTTP/1.1 200 OK Server: Apache/2.4.41`, or `MongoDB 4.0.12`).",
            "Zero-Impact Reconnaissance: Searching Shodan queries Shodan's cached database. You never send a single TCP packet to the victim, making this completely invisible to target intrusion detection systems (IDS/IPS).",
            "Unauthenticated Databases: Thousands of Redis (port 6379), MongoDB (port 27017), and Elasticsearch (port 9200) clusters are accidentally exposed directly to the public Internet without password authentication.",
          ],
          callout: "Corporate firewalls often protect `target.com`, but third-party cloud instances (AWS EC2, DigitalOcean) spun up by marketing or dev teams are completely exposed on non-standard ports. Shodan reveals these hidden entry points effortlessly.",
          diagramOrCode: `+-------------------------------------------------------------+
|              SHODAN PASSIVE ASSET IDENTIFICATION            |
+-------------------------------------------------------------+
 Attacker Search: org:"Target Company" product:"Elasticsearch"
       |
       v (Queries Shodan's Pre-Indexed Global Database)
 Discovered Host: 198.51.100.45:9200
       |
       v (Banner Inspection)
 {
   "name" : "production-cluster-01",
   "cluster_name" : "target-customer-data",
   "version" : { "number" : "7.10.2" }
 }
 Result: Direct access to customer records without sending active scans!`
        },
        {
          heading: "Shodan & Censys Query Syntax Mastery",
          subheading: "Advanced filters for isolating organization assets and SSL certificate hashes",
          points: [
            "Organization & ASN Filters: `org:\"Target Corporation\"` or `asn:AS12345` limits results strictly to corporate-owned IP blocks.",
            "SSL Certificate Fingerprinting: `ssl.cert.subject.CN:\"target.com\"` or `ssl:\"target.com\"` reveals origin web servers hosting target certificates on naked IP addresses.",
            "Bypassing Cloudflare WAF: By searching for the SSL certificate hash of `target.com` on Shodan, you discover the actual origin server IP. Sending HTTP requests directly to this IP completely bypasses Cloudflare WAF, rate limits, and DDoS protection!",
            "HTTP Title & Header Filters: `http.title:\"Dashboard\"` or `http.favicon.hash:<hash>` identifies specific proprietary internal applications.",
          ],
          callout: "The Favicon Hash Trick: Download a company's unique `favicon.ico`, calculate its MurmurHash3 value in Python, and search Shodan (`http.favicon.hash:<hash>`). This uncovers every stealth server belonging to the company anywhere on the Internet!",
          diagramOrCode: `SHODAN SEARCH SYNTAX CHEATSHEET:
  org:"Target LLC" port:3389              -> Exposed RDP Windows servers
  ssl:"target.com" 200                    -> Origin servers hosting SSL cert
  product:"Redis" "redis_version" -auth   -> Unauthenticated Redis instances
  http.title:"Jenkins" "Dashboard"        -> Unprotected CI/CD pipelines
  city:"San Francisco" port:22            -> Port 22 SSH in specific city`
        }
      ],
      keyTopics: [
        "Internet-Wide Port Scanning Architecture (Shodan & Censys): Search engines like Shodan and Censys continuously scan the entire IPv4 address space across hundreds of standard ports (80, 443, 21, 22, 3389, 8080, 27017). They establish TCP connections, capture the initial service greeting or HTTP banner, and index the results into a massive, searchable database. Querying Shodan allows penetration testers to inspect an enterprise's external attack surface without transmitting a single packet from their own IP.",
        "Shodan Query Operators & Filter Customization: Shodan supports specialized search operators that allow precise asset filtering: 'org:\"Target LLC\"' isolates hosts registered to a specific corporate entity; 'asn:AS12345' limits results to specific BGP routing prefixes. Filters like 'port:3389' find exposed Remote Desktop (RDP) servers, 'product:\"Apache httpd\"' pinpoints web servers, and 'http.title:\"Dashboard\"' isolates administrative interfaces, helping researchers locate high-risk entry points in seconds.",
        "Bypassing Cloudflare WAFs via SSL Certificate Hashes: Enterprises place Cloudflare, Akamai, or AWS CloudFront in front of their websites to filter malicious traffic and block IP-based attacks. However, the origin web server behind the CDN often remains directly reachable on the public Internet. By searching Shodan or Censys for the unique SSL certificate serial number or Subject Common Name (ssl:\"target.com\" 200), researchers locate the real origin server IP, allowing them to bypass the WAF completely.",
        "Favicon MurmurHash3 Fingerprinting Technique: Modern web applications display unique visual icons in browser tabs (favicon.ico). By downloading a target's favicon, encoding it in base64, and calculating its 32-bit MurmurHash3 value in Python, researchers generate a unique cryptographic hash for that application. Searching Shodan for 'http.favicon.hash:<hash>' instantly uncovers every server on the Internet hosting that specific application, revealing unlinked staging and development servers worldwide.",
        "Unauthenticated Databases & Industrial Control Systems: Thousands of production databases are accidentally exposed directly to the public Internet without password authentication. Shodan queries like 'product:\"MongoDB\" \"authentication: disabled\"' or 'product:\"Redis\" \"redis_version\" -auth' locate unprotected databases holding customer records. Attackers can connect directly via command-line clients (e.g. mongo or redis-cli) to dump customer databases without exploiting any application flaws.",
      ],
      terminalCommands: [
        "shodan search --limit 10 'org:\"Target Company\" port:443'",
        "shodan host 198.51.100.45",
        "censys search 'services.tls.certificates.leaf_data.subject.common_name: target.com'",
      ],
      proTips: [
        "Use `favicon-hash` Python scripts on the target's logo icon: searching Shodan for `http.favicon.hash:<number>` identifies unlinked staging servers instantly.",
        "Query Shodan for `kibana` or `grafana` under target IP ranges to find unprotected telemetry dashboards revealing internal passwords.",
      ],
    },
    {
      id: "l-3-5",
      lessonNumber: "3.5",
      title: "Wayback Machine, AlienVault OTX & Parameter Scraping",
      duration: "2.5 Hours",
      badge: "Historical Mining",
      summary:
        "Mining internet archive machines and threat intelligence platforms to extract historical URLs, deprecated APIs, hidden query parameters, and forgotten debug endpoints.",
      studyNotes: [
        {
          heading: "The Internet Archive as an Offensive Goldmine",
          subheading: "How 10 years of archived URLs reveal hidden injection entry points",
          points: [
            "What the Wayback Machine Preserves: The Internet Archive's crawlers have scraped web pages for decades, preserving query parameters, old JavaScript files, deprecated API versions (`/api/v1/`), and forgotten admin panels.",
            "The Vulnerability of Deprecated Endpoints: When companies release `/api/v2/`, they often leave `/api/v1/` running on the backend for backward compatibility with mobile apps. However, security patches are rarely backported to `/api/v1/`, leaving them vulnerable to SQL injection and IDOR.",
            "Aggregating Threat Intelligence: AlienVault OTX, URLScan.io, and Common Crawl index billions of historical HTTP requests, query parameters, and endpoints.",
            "Automated Historical Extraction: Tools like `gau` (GetAllUrls) and `waybackurls` query all historical archive APIs simultaneously, returning tens of thousands of endpoints in seconds.",
          ],
          callout: "A classic bug bounty technique: Run `gau target.com`, grep for `.php?` or `.aspx?`, and filter for parameter names like `redirect=`, `url=`, `file=`, `debug=`, and `id=`. These parameters are prime candidates for SSRF, LFI, and SQL Injection.",
          diagramOrCode: `+-------------------------------------------------------------+
|              HISTORICAL PARAMETER MINING PIPELINE           |
+-------------------------------------------------------------+
 Target: target.com
       |
       v (Query Wayback Machine + AlienVault OTX + Common Crawl)
 [ gau / waybackurls ]  ==> (50,000 Historical URLs)
       |
       v
 [ uro ]                ==> (Removes duplicate paths & junk images)
       |
       v
 [ grep -E '(\?|\&)(id|url|file|dir|path|redirect|key)=' ]
       |
       v
 High-Value Injection Candidates:
   https://target.com/legacy/view.php?file=report.pdf  <-- Test for LFI!
   https://target.com/auth/sso?redirect=https://...   <-- Test for Open Redirect!`
        },
        {
          heading: "Deduplication & Parameter Fuzzing Preparation",
          subheading: "Filtering millions of archived links down to unique attack surfaces",
          points: [
            "The Noise Problem: Historical archives contain thousands of redundant pagination URLs (`/blog?page=1`, `/blog?page=2`, ... `/blog?page=999`). Feeding these directly into scanners wastes bandwidth.",
            "Smart URL Filtering with Uro: The `uro` utility intelligently declutters URL lists by keeping only unique paths and parameter combinations, reducing 100,000 raw URLs down to a razor-sharp list of 500 unique endpoints.",
            "JavaScript File Extraction: Filtering archived URLs for `.js` files uncovers historical frontend code containing internal API routes and hardcoded endpoints that no longer appear on the live homepage.",
            "gf Patterns: Using `gf` (by tomnomnom) applies pre-configured regex patterns to classify URLs into vulnerability categories: `gf sqli`, `gf ssrf`, `gf xss`, `gf idor`.",
          ],
          callout: "Inspect archived JavaScript files using `diff`. Comparing `app.min.js` from 2 years ago against `app.min.js` today often reveals hidden administrative endpoints that developers removed from the UI buttons but forgot to disable on the API server.",
          diagramOrCode: `HISTORICAL URL EXTRACTION WORKFLOW:
  # Extract all historical URLs:
  gau target.com --threads 5 | anew raw_urls.txt
  
  # Clean and deduplicate URL paths:
  cat raw_urls.txt | uro | anew clean_urls.txt
  
  # Extract SSRF candidates:
  cat clean_urls.txt | gf ssrf | anew ssrf_candidates.txt
  
  # Extract LFI candidates:
  cat clean_urls.txt | gf lfi | anew lfi_candidates.txt`
        }
      ],
      keyTopics: [
        "The Internet Archive & Historical Endpoint Mining: The Wayback Machine (archive.org), AlienVault OTX, and Common Crawl have indexed billions of web pages and HTTP requests over the past two decades. Over time, applications add and remove features, but legacy backend API endpoints frequently remain live on the server even when frontend UI links are deleted. Mining historical URLs allows security researchers to discover deprecated endpoints (like /api/v1/auth) that lack modern security controls.",
        "Automating Historical URL Extraction with gau & waybackurls: Tools like 'gau' (GetAllUrls) and 'waybackurls' query multiple public archive APIs simultaneously, returning tens of thousands of historical URLs for a target domain in seconds. By piping target domains through these utilities (e.g. 'gau target.com | anew urls.txt'), researchers build a comprehensive database of historic endpoints, subdirectories, and uploaded documents without sending any active traffic to the target server.",
        "URL Decluttering & Pattern Deduplication with uro: Scraping historical archives frequently returns thousands of redundant URLs caused by blog pagination, e-commerce product catalogs, and image assets (e.g. /product?id=1 through /product?id=9999). The 'uro' utility analyzes URL structures, stripping out duplicate paths and static media extensions while preserving unique query parameter combinations. This reduces a noisy 100,000-line dataset down to a razor-sharp list of 500 unique testing candidates.",
        "Isolating Injection Candidates via gf Regex Patterns: The 'gf' (Go Framework) utility applies pre-compiled regular expression patterns to large URL lists to categorize endpoints by vulnerability type. Running 'cat urls.txt | gf ssrf' extracts all URLs containing parameters like 'url=', 'dest=', 'path=', or 'redirect='. Similarly, 'gf sqli', 'gf xss', and 'gf idor' isolate high-value parameters, allowing researchers to prioritize testing against parameters most likely to accept malicious inputs.",
        "Historical JavaScript Analysis & Deprecated API Discovery: Historical web archives preserve snapshots of JavaScript files (app.min.js) across different software releases. Security analysts download and beautify these historical script files, comparing old versions against current builds using 'diff'. This analysis frequently uncovers internal API endpoints, developer debugging flags, and administrative routes that were hidden from the public interface but remain fully operational on the server backend.",
      ],
      terminalCommands: [
        "gau target.com | uro | anew urls.txt",
        "waybackurls target.com | grep -E '\\.js$' | anew js_files.txt",
        "cat urls.txt | gf xss | anew xss_params.txt",
      ],
      proTips: [
        "Pipe historical URLs into `uro` to strip out redundant blog pagination and image assets.",
        "Check `/api/v1/` endpoints found in Wayback archives; companies often patch bugs on `/api/v2/` but leave `/api/v1/` unpatched!",
      ],
    },
    {
      id: "l-3-6",
      lessonNumber: "3.6",
      title: "Google Dorking & Search Engine OSINT Operations",
      duration: "2.5 Hours",
      badge: "Search OSINT",
      summary:
        "Using advanced Google, Bing, and DuckDuckGo search operators to locate exposed database backups, `.env` files, internal Jira tickets, and administrative login portals.",
      studyNotes: [
        {
          heading: "Advanced Google Dorking Operator Mechanics",
          subheading: "Instructing search engine indexers to uncover sensitive enterprise assets",
          points: [
            "Core Search Operators: `site:` (restricts search strictly to a domain or TLD), `filetype:` or `ext:` (specifies exact file extensions like `pdf`, `sql`, `env`, `log`), `inurl:` (matches strings in the URI path), and `intitle:` (matches text in HTML `<title>` tags).",
            "Boolean Logic & Negation: Use quotes `\"...\"` for exact string matching, `OR` for alternatives, and `-` to negate terms (e.g. `site:target.com -www` exposes all non-www subdomains).",
            "Google Hacking Database (GHDB): Maintained by Exploit-DB, GHDB catalogs thousands of verified dorks categorized by vulnerability type (sensitive directories, vulnerable servers, error messages, password files).",
            "Index of / Directory Listing: Queries like `site:target.com \"Index of /\"` find Apache/Nginx web servers where directory indexing is enabled, exposing all downloadable files and backups.",
          ],
          callout: "A single Google Dork like `site:target.com ext:sql OR ext:bak OR ext:env` can expose a multi-gigabyte production MySQL database dump containing thousands of customer passwords and credit card hashes.",
          diagramOrCode: `+-------------------------------------------------------------+
|                 HIGH-IMPACT GOOGLE DORKING EXAMPLES         |
+-------------------------------------------------------------+
 1. Exposed Configuration Files:
    site:target.com ext:env OR ext:yml OR ext:json "DB_PASSWORD"
 
 2. Database Backup Dumps:
    site:target.com ext:sql OR ext:bak OR ext:tar.gz "INSERT INTO"
 
 3. Open Directory Listings:
    site:target.com intitle:"Index of /" "parent directory"
 
 4. Internal Portals & Single Sign-On:
    site:target.com inurl:login OR inurl:admin OR inurl:portal -www`
        },
        {
          heading: "Alternative Search Engines & Cached Scraping",
          subheading: "Evading Google CAPTCHAs and mining Bing, DuckDuckGo, and Baidu",
          points: [
            "The Google CAPTCHA Hurdle: Running automated scraping tools against Google triggers aggressive Cloudflare/Google reCAPTCHA blocks. Use DuckDuckGo or Bing search APIs for automated programmatic dorking.",
            "Bing IP Range Search (`ip:`): Bing supports the `ip:198.51.100.25` operator, listing all virtual hosts sharing a specific web server IP address.",
            "Google Cached Pages (`cache:`): Viewing `cache:target.com/page` displays the Googlebot snapshot of a page from days or weeks ago, enabling you to read deleted content or pages temporarily taken down for maintenance.",
            "De-indexing Analysis (`robots.txt`): Always read `/robots.txt`. The paths that sysadmins specifically instruct Google *not* to index (`Disallow: /admin/`, `Disallow: /internal-api/`) are the exact paths an attacker must investigate first!",
          ],
          callout: "Always check `robots.txt` on every target subdomain! Disallow entries frequently list hidden administrative dashboards, proprietary API documentation, and staging directories that developers hoped search engines would ignore.",
          diagramOrCode: `ROBOTS.TXT RECON WORKFLOW:
  curl -s https://target.com/robots.txt
  
  Typical High-Value Disallow Entries:
    Disallow: /admin-panel/
    Disallow: /api/v1/internal/
    Disallow: /backup/
    Disallow: /staging/
    Disallow: /dev-login/`
        }
      ],
      keyTopics: [
        "Advanced Search Engine Operators (Google Dorking Syntax): Google Dorking leverages advanced search operators to instruct search engine crawlers to return sensitive, unlinked corporate assets. The operator 'site:target.com' restricts results strictly to the target domain; 'filetype:sql' or 'ext:env' isolates specific file extensions. Operators like 'inurl:admin' match strings in the URI path, 'intitle:\"Index of /\"' finds open directory listings, and '-www' negates the primary public portal to highlight obscure subdomains.",
        "The Google Hacking Database (GHDB) on Exploit-DB: Maintained by the security community on Exploit-DB, the Google Hacking Database (GHDB) catalogs thousands of proven, weaponized search queries categorized by risk. Categories include exposed credentials, sensitive directories, web server error messages, vulnerable third-party components, and network hardware portals. Researchers reference the GHDB to automate Google queries that target specific software frameworks used by their target.",
        "Locating Exposed Database Backups, Logs & .env Files: Developers frequently leave database backup dumps and configuration files on public web servers during server migrations or maintenance. Dorks like 'site:target.com ext:sql OR ext:bak OR ext:env \"DB_PASSWORD\"' locate files containing raw SQL INSERT statements with customer password hashes. Similarly, 'site:target.com ext:log' uncovers application debug logs that leak session cookies, internal IP addresses, and stack traces.",
        "Open Directory Listings & Web Server Indexing Flaws: When a web server (Apache, Nginx, IIS) receives a request for a directory that lacks a default index file (index.html, index.php), it can automatically generate an HTML directory listing if 'Options +Indexes' is enabled. Dorks like 'site:target.com intitle:\"Index of /\" \"Parent Directory\"' expose entire filesystem directories to the public Internet. Attackers browse these open folders to download private PDF invoices, source code archives, and internal manuals.",
        "Robots.txt & Sitemap.xml Reconnaissance: The robots.txt file instructs search engine web crawlers which parts of a website should not be indexed, using directives like 'Disallow: /admin-panel/'. Because administrators use robots.txt to hide sensitive portals, it functions as an inadvertent attack surface roadmap for security researchers. Reviewing /robots.txt and /sitemap.xml on every discovered subdomain reveals proprietary administrative dashboards and internal API endpoints.",
      ],
      terminalCommands: [
        "curl -s https://target.com/robots.txt",
        "curl -s https://target.com/sitemap.xml | grep -Eo '<loc>[^<]+' | sed 's/<loc>//'",
      ],
      proTips: [
        "Search Google for `site:target.com ext:log` to find public debug logs that leak session cookies and stack traces.",
        "Always review `/robots.txt` on every discovered subdomain; `Disallow:` directives are literally a roadmap of sensitive folders.",
      ],
    },
  ],
  handsOnLab: {
    title: "Lab 3: Build an Automated OSINT Recon Profile for a Fortune 500 Target",
    target: "Authorized Public Bug Bounty Target (HackerOne / Bugcrowd)",
    goal: "Execute a completely passive reconnaissance phase without sending any direct traffic, discovering at least 50 hidden subdomains, 3 historical endpoints with parameters, and verifying origin IP.",
    steps: [
      "1. Identify the target's ASN via BGPview / HE.net and document all allocated CIDR blocks.",
      "2. Query crt.sh and subfinder to aggregate subdomains via Certificate Transparency logs.",
      "3. Search Shodan for `ssl:\"target.com\"` to pinpoint the origin server IP bypassing CDN proxies.",
      "4. Run `gau` and `uro` to extract historical parameter candidates for SSRF/SQLi testing.",
      "5. Execute Google Dorks for exposed filetypes (`ext:env OR ext:sql OR ext:bak`).",
    ],
    verification: "Submit a structured markdown reconnaissance dossier detailing the target's attack surface, ASN ranges, origin IP, and high-priority testing candidates.",
  },
  checklist: [
    { id: "ch3-t1", label: "Identified target Autonomous System Numbers (ASNs) and mapped all BGP IP subnets" },
    { id: "ch3-t2", label: "Executed Certificate Transparency (CT) log mining via crt.sh and certstream" },
    { id: "ch3-t3", label: "Searched GitHub repositories for leaked credentials, API tokens, and git commit history" },
    { id: "ch3-t4", label: "Mastered Shodan and Censys query operators to locate exposed database ports" },
    { id: "ch3-t5", label: "Discovered true origin server IP behind Cloudflare CDN using SSL certificate fingerprints" },
    { id: "ch3-t6", label: "Mined Wayback Machine and AlienVault OTX using gau and uro to isolate parameters" },
    { id: "ch3-t7", label: "Applied Google Dorking operators to find exposed .env, .sql, and directory listings" },
    { id: "ch3-t8", label: "Analyzed target robots.txt and sitemap.xml for restricted administrative directories" },
  ],
};
