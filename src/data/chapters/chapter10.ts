import { RoadmapChapter } from "./types";

export const chapter10: RoadmapChapter = {
  id: "ch-10-bug-bounty-career",
  chapterNumber: 10,
  title: "Bug Bounty Hunting Methodology, Triage & Career Mastery",
  subtitle: "HackerOne/Bugcrowd Programs, High-Impact Report Writing, CVSS 3.1 Scoring & Hall of Fame Status",
  badge: "Chapter 10 • Career & Bug Bounty",
  duration: "16 Hours • 5 In-Depth Lessons",
  difficulty: "Expert",
  description:
    "Transition from technical practitioner to elite professional security researcher. Master the economics of bug bounty platforms (HackerOne, Bugcrowd, Intigriti), write high-impact vulnerability reports that guarantee maximum payouts, calculate precise CVSS 3.1 severity metrics, navigate triage disputes, outsmart duplicate reports, and build a world-class reputation in cybersecurity halls of fame.",
  iconName: "Award",
  lessons: [
    {
      id: "l-10-1",
      lessonNumber: "10.1",
      title: "Bug Bounty Ecosystem: HackerOne, Bugcrowd & Private Programs",
      duration: "3 Hours",
      badge: "Platform Economics",
      summary:
        "Navigating public vs private bug bounty programs, understanding platform reputation algorithms (Signal, Impact, Reputation), and legal rules of engagement.",
      studyNotes: [
        {
          heading: "The Economics of Modern Bug Bounty Platforms",
          subheading: "How global crowdsourced security markets evaluate and reward vulnerability findings",
          points: [
            "Platform Dynamics: Major platforms include HackerOne, Bugcrowd, Intigriti, and Synack. Organizations deposit bounty pools (ranging from $50,000 to $5,000,000) and invite researchers to test their applications under strict terms of service.",
            "Public vs. Private Programs: Public programs are visible to everyone on the Internet. They have thousands of researchers competing, meaning low-hanging fruit (basic XSS, automated scans) is eliminated within hours of launch. Private programs are invite-only, shared with 50 to 200 vetted researchers, resulting in significantly higher signal-to-noise ratios and larger bounty payouts.",
            "Platform Reputation Metrics: HackerOne measures 'Signal' (ratio of valid bugs to noise/spam; maintaining >3.0 Signal guarantees continuous private invites) and 'Impact' (average severity of accepted reports). Submitting junk reports ruins your platform metrics and disqualifies you from private programs.",
            "Rules of Engagement (Safe Harbor): Always read the program's policy page before sending a single probe! Testing out-of-scope assets or violating denial-of-service rules will result in account suspension and potential legal liability under computer fraud statutes (CFAA).",
          ],
          callout: "The Golden Rule of Bug Bounty: Quality beats quantity every single time. One well-researched, high-impact Critical finding (like an SSRF to cloud metadata paying $10,000) is worth more than 50 low-severity cookie flag reports that risk being marked as Informational or Duplicate.",
          diagramOrCode: `+-------------------------------------------------------------+
|               BUG BOUNTY PLATFORM INVITATION PIPELINE       |
+-------------------------------------------------------------+
 Researcher registers on HackerOne / Bugcrowd
        |
        v
 Starts on PUBLIC Programs (High Competition, Crowded Scope)
        |
        v Submits 3-5 high-quality, valid High/Critical reports
 Platform Algorithm updates:
   Signal: 4.8 / 5.0 (High validity ratio)
   Impact: 18.2 / 20.0 (High severity average)
        |
        v Automatic Invitation Engine Triggers:
 [ EXCLUSIVE PRIVATE PROGRAM INVITE DELIVERED! ]
   Target: Fortune 100 Fintech API (Only 50 researchers invited!)
   Bounty Table: Critical = $15,000 | High = $5,000`
        },
        {
          heading: "Legal Safe Harbor & Responsible Disclosure Ethics",
          subheading: "Operating within legal boundaries to protect yourself against prosecution",
          points: [
            "Gold Standard Safe Harbor: Programs adopting Disclose.io or standard HackerOne Safe Harbor explicitly promise not to pursue legal action under computer crime laws (e.g. CFAA) against researchers who follow program guidelines in good faith.",
            "Prohibited Testing Behaviors: Denial of Service (DoS/DDoS), physical social engineering, accessing/downloading massive customer data (exfiltrating more than 1 row of proof-of-concept data), and modifying production database records.",
            "Scope Classifications: 'In Scope' (eligible for monetary bounties and platform reputation); 'Out of Scope' (strictly forbidden from testing; testing these constitutes unauthorized access).",
            "Coordinated Disclosure Timeline: Standard industry window is 90 days. Never publicly disclose or tweet about a bug until the vendor has deployed a verified patch and explicitly granted permission to publish.",
          ],
          callout: "Proof-of-Concept Restraint: If you find an SQL Injection flaw that can dump 10 million user credit cards, STOP immediately after extracting the database version (`SELECT @@version`) or current user (`SELECT user()`). Dumping the entire customer table does NOT increase your bounty—it creates legal exposure and privacy violations.",
          diagramOrCode: `SAFE HARBOR COMPLIANCE CHECKLIST:
  [x] Is the target domain explicitly listed under 'In Scope'?
  [x] Did I avoid automated rate-limit exhaustion and DoS?
  [x] Did I extract only the minimum data required for PoC (e.g. whoami)?
  [x] Did I use my verified platform email in testing headers?
  [x] Did I refrain from publicly sharing details before patch verification?`
        }
      ],
      keyTopics: [
        "The Bug Bounty Platform Ecosystem (HackerOne, Bugcrowd, Intigriti): Bug bounty platforms operate as crowdsourced vulnerability marketplaces connecting independent security researchers with enterprise software vendors. Programs deposit bounty pools and define strict scopes of engagement. Public programs allow anyone to participate, resulting in intense competition on common assets, while private programs are invite-only, offering higher bounty payouts and significantly lower researcher competition.",
        "Platform Reputation Metrics (Signal, Impact, and Reputation): Platforms utilize mathematical scoring algorithms to evaluate researcher reliability. HackerOne's 'Signal' metric measures the ratio of valid, accepted vulnerability reports to invalid or spam submissions (a Signal above 3.0 is required for consistent private invites). 'Impact' measures the average severity rating of accepted findings. Submitting low-quality, out-of-scope, or automated scanner reports degrades Signal, disqualifying researchers from lucrative private programs.",
        "Legal Safe Harbor Frameworks & Rules of Engagement: The Safe Harbor agreement provides legal protection under computer fraud statutes (such as the US CFAA) for researchers acting in good faith within program guidelines. Testing must strictly adhere to the defined 'In Scope' assets, completely avoiding out-of-scope domains. Prohibited testing activities include Denial of Service (DoS), physical social engineering, automated rate-limit flooding, and accessing or exfiltrating private customer data.",
        "Proof-of-Concept Restraint & Data Minimization Ethics: When discovering critical data exposure vulnerabilities (such as SQL Injection or SSRF), researchers must practice strict data minimization. Extracting the database version (SELECT @@version) or current username is sufficient to prove exploitation. Dumping millions of real customer credit cards or medical records creates severe legal liability, violates privacy regulations (GDPR, HIPAA), and leads to immediate report disqualification.",
        "Coordinated Vulnerability Disclosure (90-Day Policy): Coordinated disclosure balances public transparency with vendor remediation timelines. The global industry standard enforces a 90-day disclosure window: researchers notify the vendor and withhold all public details while software engineers develop and deploy security patches. Publishing vulnerability write-ups or tweeting proof-of-concept exploits before patches are verified constitutes irresponsible disclosure and results in permanent platform bans.",
      ],
      terminalCommands: [
        "# Verify target scope using WHOIS and DNS records before testing:",
        "whois target.com | grep -i 'Registrant Organization'",
      ],
      proTips: [
        "Focus on new assets: whenever a private program updates its scope to add a new domain, be the first to scan it within the first 60 minutes.",
        "Include your platform identifier in headers (e.g. `X-BugBounty-Hunter: your_username`) so corporate SOC teams identify your traffic as authorized security research.",
      ],
    },
    {
      id: "l-10-2",
      lessonNumber: "10.2",
      title: "Writing High-Impact Professional Vulnerability Reports",
      duration: "3.5 Hours",
      badge: "Report Writing",
      summary:
        "Structuring elite vulnerability reports that eliminate triage friction, guarantee rapid reproduction, prevent duplicate disputes, and maximize bounty payouts.",
      studyNotes: [
        {
          heading: "The Anatomy of an Elite Vulnerability Report",
          subheading: "Why report quality directly dictates the dollar value of your payout",
          points: [
            "The Triage Perspective: Triagers (at HackerOne or the target company) review 50 to 100 reports every single day. If your report is a messy, poorly formatted wall of text without clear reproduction steps, it will be delayed, down-voted, or closed as 'Needs More Info'.",
            "Executive Summary: A concise 2-3 sentence overview explaining: 1. What the vulnerability is; 2. Where it is located; 3. The worst-case business impact if exploited by an attacker.",
            "Step-by-Step Reproduction: Must be 100% reproducible by someone who has never seen the application before. Number every step cleanly (Step 1, Step 2, Step 3). Include exact HTTP requests, parameters, and payloads.",
            "Raw HTTP Proof of Concept: Never provide just screenshots. Include the exact raw HTTP request from Burp Suite and the server's raw HTTP response highlighting the injected execution.",
          ],
          callout: "A high-quality report often earns an extra 'Quality Bonus' ($250 to $1,000) from grateful security teams who can hand your report directly to software engineering teams to patch in under 1 hour.",
          diagramOrCode: `+-------------------------------------------------------------+
|               PROFESSIONAL REPORT ARCHITECTURE              |
+-------------------------------------------------------------+
 1. TITLE: Clear, concise vulnerability description
    Example: "IDOR on /api/v1/invoices allows unauthorized viewing of customer PII"
 
 2. SEVERITY & CVSS: Calculated accurately with justifications
 
 3. SUMMARY: Business impact explained in executive terms
 
 4. STEP-BY-STEP REPRODUCTION:
    Step 1: Log in as User A...
    Step 2: Send GET /api/v1/invoices/1042 in Burp...
    Step 3: Modify ID to 1043 (User B)...
 
 5. RAW HTTP PROOF OF CONCEPT: Exact request/response frames
 
 6. REMEDIATION RECOMMENDATION: Actionable engineering fix`
        },
        {
          heading: "Demonstrating Real-World Business Impact",
          subheading: "Elevating a vulnerability from Medium severity to Critical payout",
          points: [
            "Impact Framing: Software engineers care about code; executives care about business risk. Explain how the bug violates GDPR, leaks trade secrets, enables account takeover, or causes financial theft.",
            "Vulnerability Chaining: A standalone CSRF on a profile bio might pay $100. But if you chain that CSRF to an internal API endpoint that changes the user's password, you have an unauthenticated Account Takeover that pays $5,000!",
            "Clear Video Demonstrations: Record a clean, 60-second Loom or MP4 video demonstrating the attack flow. Avoid background music or lengthy typing; keep it crisp and professional.",
            "Actionable Remediation Guidance: End your report with precise code-level remediation suggestions (e.g. 'Implement `@PreAuthorize(\"hasPermission(#invoiceId, 'READ')\")` or use parameterized prepared statements').",
          ],
          callout: "Never exaggerate or make sensationalist claims. If a bug requires high user interaction and a specific browser configuration, state so honestly. Integrity builds trust with platform triage teams.",
          diagramOrCode: `VULNERABILITY REPORT TEMPLATE SNIPPET:
## Vulnerability Title
Server-Side Request Forgery (SSRF) on /api/export-pdf Exposes AWS EC2 Metadata

## Summary
The export-to-pdf endpoint fails to restrict URL schemes and private IP ranges.
An attacker can coerce the backend rendering engine to query the local AWS
hypervisor metadata API (169.254.169.254), exposing temporary IAM credentials
and resulting in full AWS infrastructure compromise.

## Reproduction Steps
1. Navigate to https://target.com/reports/export
2. Enter the following payload into the 'Template URL' field:
   http://169.254.169.254/latest/meta-data/iam/security-credentials/EC2-Role
3. Click 'Generate PDF' and download the output.
4. Observe the AWS AccessKeyId and SecretAccessKey rendered in the document.`
        }
      ],
      keyTopics: [
        "Executive Summary & Business Impact Framing: An elite vulnerability report begins with an Executive Summary that translates technical software flaws into tangible business risk for non-technical leadership. Rather than simply stating 'Stored XSS on parameter q', explain: 'An unauthenticated attacker can inject persistent JavaScript into the user profile page, enabling full session hijacking of all customers who visit the portal'. Clearly articulating risk prevents triagers from downgrading severity ratings.",
        "Deterministic Step-by-Step Reproduction Walkthroughs: Triagers review dozens of submissions daily; reports with vague or inconsistent steps are delayed or closed as 'Needs More Info'. A professional report provides numbered, deterministic steps that can be reproduced from a completely fresh, unauthenticated browser session. Every step specifies the exact URL, HTTP method, parameter names, and attack payloads without requiring the triager to guess missing context.",
        "Raw HTTP Proof of Concept Inclusion: Never rely solely on screenshots or visual screen recordings. A professional report always includes the exact raw HTTP request captured in Burp Suite and the server's raw HTTP response highlighting the executed payload or reflected data. Providing raw HTTP frames allows engineering teams to reproduce the issue instantly via command-line cURL scripts and create automated regression tests.",
        "Vulnerability Chaining for Maximum Severity Escalation: Individual low-severity vulnerabilities often pay nominal rewards ($100 to $250). However, chaining multiple minor flaws together creates critical high-impact exploits: chaining an open redirect with an OAuth flow leads to full Account Takeover ($5,000); chaining a local file inclusion with a log injection leads to Remote Code Execution ($15,000). Always explore how a minor finding can be combined with other endpoints.",
        "Actionable Code-Level Remediation Recommendations: Conclude every report with precise, code-level remediation guidance tailored to the target's technology stack. Instead of generic advice like 'sanitize input', provide concrete recommendations: 'Implement parameterized prepared statements using PDO', 'Apply context-aware HTML entity encoding using DOMPurify', or 'Enforce strict whitelist validation on the redirect_uri parameter'. Providing remediation advice builds trust with engineering teams.",
      ],
      terminalCommands: [
        "# Format clean markdown report files for submission:",
        "cat << 'EOF' > report.md",
      ],
      proTips: [
        "Always test your reproduction steps from a fresh, clean browser window or private browsing session before submitting to guarantee reproducibility.",
        "Attach both raw HTTP request/response logs AND a short 45-second screen recording to eliminate any ambiguity for triagers.",
      ],
    },
    {
      id: "l-10-3",
      lessonNumber: "10.3",
      title: "CVSS 3.1 Severity Scoring & Remediation Advisories",
      duration: "3 Hours",
      badge: "CVSS Scoring",
      summary:
        "Mastering the Common Vulnerability Scoring System (CVSS 3.1) metric calculator, justifying severity ratings, and crafting vendor remediation advisories.",
      studyNotes: [
        {
          heading: "The CVSS 3.1 Base Metric Equations Explained",
          subheading: "How mathematical metrics translate technical flaws into standardized severity scores",
          points: [
            "The Purpose of CVSS: Provides an open, vendor-agnostic framework for communicating the characteristics and severity of software vulnerabilities. Scores range from 0.0 to 10.0 (None: 0.0, Low: 0.1-3.9, Medium: 4.0-6.9, High: 7.0-8.9, Critical: 9.0-10.0).",
            "Exploitability Metrics: Attack Vector (`AV:N` Network vs `AV:L` Local), Attack Complexity (`AC:L` Low vs `AC:H` High), Privileges Required (`PR:N` None, `PR:L` Low, `PR:H` High), and User Interaction (`UI:N` None vs `UI:R` Required).",
            "Scope Metric (`S:U` Unchanged vs `S:C` Changed): The most critical score multiplier! If exploiting a vulnerability in component A allows you to impact resources in component B (e.g. XSS in web browser impacting backend server, or SSRF in web server compromising cloud hypervisor), Scope changes to `CHANGED`, dramatically elevating the score into Critical territory!",
            "Impact Metrics: Confidentiality (`C`), Integrity (`I`), and Availability (`A`). Graded as None (`N`), Low (`L`), or High (`H`).",
          ],
          callout: "Understanding the Scope (S) metric is the difference between an 8.6 High and a 9.8 Critical! When reporting SSRF that hits AWS metadata, always argue for `Scope: Changed` because the web application vulnerability breaches the security boundary of the AWS cloud environment.",
          diagramOrCode: `+-------------------------------------------------------------+
|                 CVSS 3.1 METRIC BREAKDOWN EXAMPLE           |
+-------------------------------------------------------------+
 Metric Vector:
   CVSS:3.1/AV:N/AC:L/PR:N/UI:N/S:C/C:H/I:H/A:N
 
 Evaluation:
   - Attack Vector: Network (AV:N)           -> Exploit remote over Internet
   - Attack Complexity: Low (AC:L)           -> No special conditions required
   - Privileges Required: None (PR:N)        -> Unauthenticated attacker
   - User Interaction: None (UI:N)           -> Zero victim action needed
   - Scope: Changed (S:C)                    -> Breaches cloud boundary!
   - Confidentiality: High (C:H)             -> Full credential access
   - Integrity: High (I:H)                   -> Modifies cloud resources
   - Availability: None (A:N)                -> No downtime caused
 
 RESULTING CVSS SCORE: 10.0 CRITICAL ($$$ Maximum Payout!)`
        },
        {
          heading: "Defending Your Severity Rating in Triage Discussions",
          subheading: "Negotiating with triagers without alienating program managers",
          points: [
            "The Down-Scoring Threat: Companies often attempt to reclassify Critical findings down to Medium to save budget or protect internal KPI metrics.",
            "Defending with RFCs and CVSS Guidelines: Never argue emotionally ('This is unfair!'). Quote official FIRST.org CVSS specification guidelines: 'According to FIRST CVSS v3.1 Section 2.2, when an unauthorized attacker can execute arbitrary read/write actions across tenant boundaries without user interaction, PR is None and Scope is Changed.'",
            "Demonstrating Blast Radius: Provide evidence of actual blast radius: show that the bug affects 100% of accounts across all database shards, not just an isolated test environment.",
            "Accepting Vendor Discretion: At the end of the day, programs have final discretion. If a program firmly decides on High instead of Critical, remain professional, accept the decision graciously, and move on to find the next bug.",
          ],
          callout: "Maintain a reputation of technical objectivity. Triagers love working with researchers who can accurately defend their CVSS scores using technical facts rather than demands for more money.",
          diagramOrCode: `SAMPLE CVSS JUSTIFICATION CLAUSE:
"We have scored this finding as CVSS 9.1 (Critical) with vector
CVSS:3.1/AV:N/AC:L/PR:N/UI:N/S:U/C:H/I:H/A:N.
Because the /api/v2/users/reset endpoint requires no prior authentication
(PR:N) and requires zero victim interaction (UI:N), any remote attacker (AV:N)
can reset arbitrary user passwords, achieving complete loss of confidentiality
and integrity for all user accounts."`
        }
      ],
      keyTopics: [
        "Common Vulnerability Scoring System (CVSS 3.1) Architecture: CVSS 3.1 is the global open standard maintained by FIRST.org for communicating the characteristics and severity of software vulnerabilities. Scores range from 0.0 to 10.0: None (0.0), Low (0.1-3.9), Medium (4.0-6.9), High (7.0-8.9), and Critical (9.0-10.0). Base metrics evaluate intrinsic characteristics: Exploitability (Attack Vector, Complexity, Privileges, User Interaction) and Impact (Confidentiality, Integrity, Availability).",
        "The Critical Scope (S:C vs S:U) Metric Multiplier: The Scope metric measures whether a vulnerability in an authority component impacts resources managed by a different authority. If a vulnerability breaches security boundaries (such as Cross-Site Scripting executing in a user's browser, or SSRF in a web app compromising cloud hypervisor metadata), Scope is evaluated as 'Changed' (S:C). Changing Scope from Unchanged to Changed dramatically increases the mathematical score, elevating High findings into Critical territory.",
        "Defending Severity Ratings in Triage Disputes: When program triagers attempt to downgrade a vulnerability's severity to reduce payout amounts, researchers must defend their rating using technical facts rather than emotion. Reference official FIRST.org specification guidelines: quote specific clauses (e.g. 'According to CVSS 3.1 Section 2.1, Attack Complexity is Low because exploitation requires zero specialized conditions or timing dependencies'). Providing objective RFC citations ensures fair evaluation.",
        "Evaluating Confidentiality, Integrity & Availability Impact: Impact metrics reflect the worst-case consequence of successful exploitation. High Confidentiality (C:H) indicates complete loss of confidential customer data; High Integrity (I:H) indicates the attacker can modify any data or execute arbitrary transactions; High Availability (A:H) indicates complete denial of service. Accurately scoring these metrics ensures the vulnerability is prioritized correctly by enterprise patch management teams.",
        "Enterprise Remediation Advisories & Patch Verification: Once a report is resolved, security researchers review the vendor's patch in production or staging environments. If the vendor implemented a superficial regex blacklist instead of a proper architectural fix, researchers can frequently bypass the patch within days. Re-breaking a flawed patch is considered a brand-new valid vulnerability report, highlighting the importance of thorough patch verification.",
      ],
      terminalCommands: [
        "# Calculate CVSS score using CLI or online calculator (FIRST.org):",
        "curl -s 'https://www.first.org/cvss/calculator/3.1#CVSS:3.1/AV:N/AC:L/PR:N/UI:N/S:U/C:H/I:N/A:N'",
      ],
      proTips: [
        "Bookmark `first.org/cvss/calculator/3.1`; always copy and paste the full CVSS vector string into your reports to look professional.",
        "If a program disputes your severity, provide a realistic scenario showing how an attacker can chain the vulnerability with public OSINT to compromise an executive.",
      ],
    },
    {
      id: "l-10-4",
      lessonNumber: "10.4",
      title: "Navigating Triage Conflicts, Duplicates & Mediation",
      duration: "3 Hours",
      badge: "Dispute Mediation",
      summary:
        "Handling duplicate reports gracefully, requesting platform mediation on HackerOne and Bugcrowd, and turning Informational closures into valid bounties.",
      studyNotes: [
        {
          heading: "The Reality of Duplicates in Bug Bounty Hunting",
          subheading: "Understanding the first-to-find rule and minimizing duplicate collisions",
          points: [
            "The First-to-Find Standard: In bug bounty, rewards are awarded strictly to the FIRST researcher who submitted a valid report. If Researcher B submits the same bug 2 minutes after Researcher A, Researcher B receives a Duplicate status ($0).",
            "Why Duplicates Happen: Hundreds of researchers scan the same targets using the same public tools (Subfinder, Nuclei). If you only run default wordlists against main assets, you will hit 80% duplicate rates.",
            "How to Avoid Duplicates: 1. Deep manual business logic testing (tools cannot find multi-step logic bugs); 2. Obscure target subdomains and mobile apps; 3. Newly deployed endpoints mined via Certstream; 4. Complex parameter fuzzing.",
            "Requesting Duplicate Verification: If you suspect your report was marked duplicate in bad faith, politely request verification: 'Could you please confirm if the original report was submitted on this exact endpoint, or if it was on a different service?' Platforms like HackerOne will confirm the original report ID and timestamp.",
          ],
          callout: "Never throw a tantrum when receiving a Duplicate. Every elite hacker with $500,000+ in bounties has had hundreds of duplicate closures. It is part of the game. Stay professional, learn from it, and find something the first researcher missed.",
          diagramOrCode: `+-------------------------------------------------------------+
|               DUPLICATE MITIGATION STRATEGY MATRIX          |
+-------------------------------------------------------------+
 High-Duplicate Territory (AVOID):
   - Running default nuclei templates on homepage
   - Automated subdomain takeover checks on popular assets
   - Basic reflected XSS on main search bar
 
 Zero-Duplicate Territory (FOCUS HERE):
   - Complex Multi-Tenant Authorization (IDOR) between organizations
   - Race conditions on financial balances and coupons
   - OAuth account linking flows with custom mobile schemes
   - Second-order blind SSRF in asynchronous worker queues`
        },
        {
          heading: "Platform Mediation & Disclosing Responsibly",
          subheading: "Resolving deadlocks with program managers through official mediation channels",
          points: [
            "When to Request Mediation: Request platform mediation only for genuine contract disputes: e.g. the vendor confirmed the vulnerability, deployed the patch, but closed your report as 'Informational' or 'Not Applicable' to avoid paying.",
            "How Mediation Works on HackerOne: You click 'Request Mediation'. An independent senior HackerOne staff member steps in, reviews the report, the vendor's policy, and technical evidence, and issues an impartial ruling.",
            "Turning 'Informational' into 'Bounty': If a company closes a bug as Informational claiming 'No Impact', take the time to build a weaponized Proof of Concept demonstrating tangible business harm. Re-open with: 'I understand your perspective. Here is an updated demonstration showing how an attacker uses this to read other users' data.'",
            "Maintaining Long-Term Relationships: Program managers talk to each other. Researchers who are polite, articulate, and professional receive private program invitations and direct consulting contracts.",
          ],
          callout: "A polite, factual response resolves disputes 10x faster than an aggressive attack on the triager's competence. Assume good faith first; triagers make mistakes under heavy workloads and will reverse decisions when presented with clear evidence.",
          diagramOrCode: `PROFESSIONAL MEDIATION REQUEST TEMPLATE:
"Hi Team,
Thank you for reviewing my report. I respectfully disagree with the
classification of this finding as Informational. As demonstrated in Step 4,
the vulnerability allows an unauthenticated external user to view private
PII records belonging to other tenants.

Could we please request platform mediation to provide an objective review
of the security impact under the program policy guidelines?
Thank you for your time and assistance."`
        }
      ],
      keyTopics: [
        "The First-to-Find Rule & Duplicate Economics: In bug bounty programs, monetary bounties are awarded exclusively to the FIRST researcher who submits a valid report. If another researcher reports the exact same bug five minutes later, the second submission is closed as Duplicate ($0). Duplicates are an inevitable reality of crowdsourced security; top researchers accept duplicates professionally and pivot to hunting on newer, less crowded scope assets.",
        "Duplicate Mitigation Strategies: To minimize duplicate collisions, avoid running generic public scanners (like default Nuclei templates) against primary marketing homepages. Focus instead on: 1. Complex multi-tenant business logic flaws and authorization bypasses (IDOR); 2. Obscure subdomains discovered via real-time Certstream monitoring; 3. Mobile application API endpoints; 4. Multi-step race conditions in payment checkouts.",
        "Requesting Impartial Duplicate Verification: If you suspect a report was closed as Duplicate in bad faith, request polite clarification from platform triagers: 'Could you please confirm if the earlier report was submitted against this exact endpoint and parameter, or if it was on a different service?'. On platforms like HackerOne and Bugcrowd, triagers will review the earlier report's timestamp and ensure the duplicate claim is valid.",
        "Platform Mediation on HackerOne & Bugcrowd: When a formal disagreement arises regarding report severity, scope eligibility, or unfair closures, researchers can request Platform Mediation. An independent senior staff member from HackerOne or Bugcrowd steps in to review the report history, technical evidence, and program policies, issuing an impartial, binding ruling. Requesting mediation should be reserved strictly for genuine contract disputes.",
        "Upgrading Informational Closures via Impact Escalation: When a company closes a submission as 'Informational' claiming the bug has no real security impact, do not argue theoretically. Take the time to build a weaponized Proof of Concept demonstrating real-world harm. For example, if a CSRF on a bio field was marked Informational, chain it to an internal API to demonstrate full account takeover, then re-open the report with the new evidence to secure full payout.",
      ],
      terminalCommands: [
        "# Document timestamped PoC proof using local terminal:",
        "date -u && curl -I https://target.com/vulnerable-endpoint",
      ],
      proTips: [
        "If your report is marked duplicate, check if you can bypass the vendor's fix 2 weeks later; re-breaking a patched vulnerability is considered a brand new valid report!",
        "Never argue publicly on social media about an ongoing bug bounty dispute; it violates platform terms and can get you permanently banned.",
      ],
    },
    {
      id: "l-10-5",
      lessonNumber: "10.5",
      title: "Building an Enterprise Security Career & Ethical Standards",
      duration: "3.5 Hours",
      badge: "Career Mastery",
      summary:
        "Translating bug bounty triumphs into high-paying enterprise penetration testing roles, mastering OSCP/OSWE certifications, and upholding ethical hacking standards.",
      studyNotes: [
        {
          heading: "Translating Bug Bounty Success into a Six-Figure Career",
          subheading: "How public halls of fame and technical write-ups build personal brand equity",
          points: [
            "The High-Value Resume Asset: Having a public HackerOne profile with a top 100 ranking, or acknowledgment in the Hall of Fame of Apple, Google, NASA, or Microsoft, is worth more than 10 university degrees to modern cybersecurity hiring managers.",
            "Primary Career Pathways: 1. Full-time Bug Bounty Hunter (Independent freedom, variable income); 2. Senior Penetration Tester / Red Team Consultant ($130,000 - $220,000 salary); 3. In-House Product Security Engineer / Application Security (AppSec) Architect ($160,000 - $300,000 salary).",
            "Publishing Quality Write-ups: After a vulnerability is patched and resolved, write a deep technical blog post (on Medium or personal blog) dissecting the root cause, your methodology, and defensive takeaways. Great write-ups attract direct recruitment offers from leading tech companies.",
            "Open Source Tooling: Contributing to open-source security tools (Nuclei templates, SecLists, Burp extensions) establishes you as a technical authority in the global cybersecurity community.",
          ],
          callout: "Hiring managers are exhausted by resumes that list generic certifications with zero practical experience. When you walk into an interview and demonstrate 5 real vulnerabilities you discovered on Fortune 500 applications, you stand out from 99% of candidates.",
          diagramOrCode: `+-------------------------------------------------------------+
|               CYBERSECURITY CAREER PROGRESSION ROADMAP      |
+-------------------------------------------------------------+
 Junior Security Researcher (Bug Bounty Starter)
        |
        v Builds public reputation, Hall of Fame rankings, write-ups
 Penetration Tester / Security Consultant (Consulting Firm)
   - Executes authorized network & web pentests
   - Delivers formal executive compliance reports
        |
        v Masters cloud security, CI/CD pipelines, source code review
 Senior Application Security (AppSec) Engineer (Big Tech)
   - Designs secure software architecture
   - Implements automated SAST/DAST in DevOps pipelines
   - Advises C-suite on enterprise threat landscapes`
        },
        {
          heading: "Industry Certifications & Continuous Mastery",
          subheading: "The certification roadmap from practical hands-on labs to executive mastery",
          points: [
            "Hands-On Certifications (Avoid Multiple Choice!): The industry values hands-on practical 24-hour exam certifications over multiple-choice tests: 1. OSCP (Offensive Security Certified Professional - Network & OS Pentesting); 2. OSWE (Offensive Security Web Expert - Advanced Web & Code Review); 3. OSEP (Offensive Security Experienced Pentester - Evasion & Active Directory); 4. Burp Suite Certified Practitioner (BSCP).",
            "The Code Review Advantage: The top 1% of security researchers don't just test from the outside (black box); they read source code (white box). Learn Python, Go, Node.js, and Java to identify architectural security flaws directly in GitHub source repositories.",
            "Lifelong Ethics: The power to discover zero-day vulnerabilities comes with immense ethical responsibility. Never use your offensive capabilities for extortion, illegal data sales, or unauthorized probing. Build a reputation of absolute integrity.",
          ],
          callout: "The ultimate goal of offensive security is not to break things—it is to make the digital world safer. The best hackers are those who can not only compromise an application in 10 minutes, but can sit down with software engineers and teach them how to build unbreakable systems.",
          diagramOrCode: `PRACTICAL CERTIFICATION ROADMAP:
  [ Phase 1: Foundational Practical Pentesting ]
    - Burp Suite Certified Practitioner (BSCP)
    - Offensive Security Certified Professional (OSCP)
  
  [ Phase 2: Advanced Web Exploitation & White-Box Code Review ]
    - Offensive Security Web Expert (OSWE)
  
  [ Phase 3: Red Teaming & EDR Evasion ]
    - Offensive Security Experienced Pentester (OSEP)
    - Certified Red Team Operator (CRTO)`
        }
      ],
      keyTopics: [
        "Translating Bug Bounty Success into High-Paying Careers: An established track record in bug bounty hunting serves as definitive proof of real-world offensive capability. Public rankings on HackerOne/Bugcrowd leaderboards and acknowledgments in Halls of Fame (Apple, Google, Microsoft, NASA) are highly valued by corporate recruiters. Researchers leverage these achievements to secure lucrative careers as Senior Penetration Testers, Red Team Operators, and Application Security (AppSec) Engineers.",
        "Practical Hands-On Industry Certifications: The cybersecurity industry prioritizes hands-on practical 24-hour exam certifications over multiple-choice tests. The gold standard roadmap includes: 1. OSCP (Offensive Security Certified Professional - Network & OS Pentesting); 2. OSWE (Offensive Security Web Expert - Advanced Web Exploitation & White-Box Source Code Review); 3. BSCP (Burp Suite Certified Practitioner); 4. CRTO (Certified Red Team Operator).",
        "The White-Box Source Code Auditing Advantage: The top 1% of security researchers do not rely solely on black-box external probing; they read and audit source code directly (white-box testing). Developing proficiency in Python, Go, Java, PHP, and JavaScript allows researchers to identify subtle cryptographic flaws, race conditions, and deserialization vulnerabilities directly in open-source GitHub repositories before software is compiled.",
        "Publishing Technical Research & Personal Brand Building: Once vulnerabilities are patched and approved for disclosure, writing detailed technical post-mortems on personal blogs or Medium builds personal brand equity in the global infosec community. Sharing root cause analyses, novel exploitation techniques, and defensive takeaways establishes technical authority and attracts direct consulting contracts from enterprise clients.",
        "Ethical Responsibility & The Hacker Code of Ethics: The offensive capabilities required to discover zero-day vulnerabilities carry immense legal and ethical responsibility. Elite security researchers never weaponize their knowledge for extortion, illegal data exfiltration, or black-market exploit sales. The true mission of offensive cybersecurity is to uncover vulnerabilities ethically, assist engineering teams in remediation, and make the global digital ecosystem safer for everyone.",
      ],
      terminalCommands: [
        "# Start building your public portfolio on GitHub:",
        "git init my-security-research",
      ],
      proTips: [
        "Earn the Burp Suite Certified Practitioner (BSCP) certification: it is one of the most respected, rigorous 4-hour hands-on web pentesting exams in the world.",
        "Maintain a personal technical blog: well-written post-mortems on patched vulnerabilities are the single most effective magnet for executive job offers.",
      ],
    },
  ],
  handsOnLab: {
    title: "Lab 10: Capstone: Vulnerability Report Writing & CVSS 3.1 Justification",
    target: "Real-World Mock Vulnerability Scenario",
    goal: "Draft a production-grade, executive-ready vulnerability report for a Critical multi-stage vulnerability chain, compute the exact CVSS 3.1 vector, write reproduction steps, and formulate code-level remediation advice.",
    steps: [
      "1. Synthesize a multi-stage exploit chain combining IDOR, CSRF bypass, and administrative account takeover.",
      "2. Calculate the exact CVSS 3.1 score and draft a technical justification defending Scope: Changed.",
      "3. Write a crystal-clear, deterministic step-by-step reproduction guide with curl commands and raw HTTP logs.",
      "4. Formulate an actionable remediation guide detailing prepared statements and access control annotations.",
    ],
    verification: "Submit a complete, publication-quality markdown report that meets top-tier HackerOne triage standards.",
  },
  checklist: [
    { id: "ch10-t1", label: "Understood platform dynamics across HackerOne, Bugcrowd, and private invitation tiers" },
    { id: "ch10-t2", label: "Mastered the legal boundaries of Safe Harbor and responsible disclosure frameworks" },
    { id: "ch10-t3", label: "Authored professional vulnerability reports with deterministic reproduction steps" },
    { id: "ch10-t4", label: "Calculated and defended CVSS 3.1 severity scores and metric vectors" },
    { id: "ch10-t5", label: "Navigated triage communications, duplicate disputes, and platform mediation professionally" },
    { id: "ch10-t6", label: "Framed technical findings in terms of enterprise business risk to maximize bounty payouts" },
    { id: "ch10-t7", label: "Mapped out a practical hands-on certification path (OSCP, OSWE, BSCP)" },
    { id: "ch10-t8", label: "Committed to lifelong ethical hacking standards and responsible security research" },
  ],
};
