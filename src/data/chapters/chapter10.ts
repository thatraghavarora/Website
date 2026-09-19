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
        "Public vs Private bug bounty programs: invitation algorithms and competition dynamics",
        "Understanding HackerOne Signal, Impact, and Reputation mechanics",
        "Legal Safe Harbor frameworks and rules of engagement compliance",
        "Coordinated vulnerability disclosure guidelines (90-day disclosure window)",
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
        "Structuring professional vulnerability reports for rapid triage acceptance",
        "Writing deterministic, step-by-step reproduction walkthroughs",
        "Chaining low-severity findings into critical business-impact exploits",
        "Actionable remediation recommendations for development teams",
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
        "CVSS 3.1 metric definitions: AV, AC, PR, UI, S, C, I, A",
        "The impact of the Scope (`S:C`) metric on final score calculations",
        "Technical negotiation strategies for defending severity ratings with triagers",
        "Writing enterprise remediation advisories for software architects",
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
        "The economics of the first-to-find model and duplicate mitigation tactics",
        "Requesting duplicate validation timestamps from platform triagers",
        "Executing formal platform mediation on HackerOne and Bugcrowd",
        "Upgrading Informational closures into bounty-eligible findings through impact escalation",
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
        "Leveraging public bug bounty profiles and write-ups for high-paying AppSec roles",
        "The certification landscape: OSCP, OSWE, BSCP, and practical hands-on exams",
        "Transitioning from black-box testing to white-box source code auditing",
        "Professional ethics, responsible disclosure, and building an enduring reputation",
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
