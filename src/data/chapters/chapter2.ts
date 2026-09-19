import { RoadmapChapter } from "./types";

export const chapter2: RoadmapChapter = {
  id: "ch-2-kali",
  chapterNumber: 2,
  title: "Kali Linux Architecture & Offensive Command Line",
  subtitle: "Terminal Power Tools, Text Processing, Process Isolation, SSH Tunnels & Bash Automation",
  badge: "Chapter 2 • OS Mastery",
  duration: "16 Hours • 6 In-Depth Lessons",
  difficulty: "Beginner",
  description:
    "A hacker without mastery over the Linux shell is like a surgeon without surgical instruments. Master the Filesystem Hierarchy Standard (FHS), high-speed regex pipelines, SUID execution mechanics, multi-hop SSH tunnels, process daemonization in tmux, and building automated bug bounty recon engines.",
  iconName: "Terminal",
  lessons: [
    {
      id: "l-2-1",
      lessonNumber: "2.1",
      title: "Kali Linux Filesystem Hierarchy & Core Utilities",
      duration: "2.5 Hours",
      badge: "Linux Internals",
      summary:
        "Mastering the Filesystem Hierarchy Standard (FHS) from an attacker's perspective: `/etc`, `/var/log`, `/dev/shm`, `/opt`, wordlist directories, package registries, and shell environment customization.",
      studyNotes: [
        {
          heading: "Filesystem Hierarchy Standard (FHS) Under an Adversarial Lens",
          subheading: "Where sensitive credentials, log artifacts, and stealth memory-only directories reside",
          points: [
            "/etc (Configuration Central): Contains sensitive configuration files including `/etc/passwd` (world-readable user accounts), `/etc/shadow` (salted password hashes restricted to root), `/etc/crontab` (scheduled automated tasks), and `/etc/sudoers` (privilege specifications).",
            "/var/log (Forensic Footprints): Audit trails where defensive blue teams look for your attacks: `auth.log` (SSH and sudo authentication attempts), `syslog` (system events), and `apache2/access.log` or `nginx/access.log` (HTTP requests with IP and User-Agent).",
            "/dev/shm (Shared Memory Ramdisk): A temporary filesystem mounted in RAM (`tmpfs`). Any script or binary written here executes directly from memory and leaves zero traces on the physical disk upon system reboot — a favorite location for fileless malware droppers.",
            "/opt & /usr/share (Tooling Ecosystem): `/opt` is traditionally used for third-party git repositories and custom offensive suites; `/usr/share/wordlists` is the central repository for password and discovery dictionaries like `rockyou.txt` and `seclists`.",
          ],
          callout: "When gaining an initial foothold on a Linux target, the very first directories to inspect for write permissions are `/tmp`, `/var/tmp`, and `/dev/shm`. Attackers routinely drop their enumeration scripts (like linpeas.sh) into `/dev/shm` to avoid triggering disk-based file integrity monitors.",
          diagramOrCode: `+-------------------------------------------------------------+
|              LINUX FILESYSTEM HIERARCHY ARCHITECTURE        |
+-------------------------------------------------------------+
 / (Root)
 ├── /bin -> /usr/bin      (Essential user binary executables)
 ├── /sbin -> /usr/sbin    (Root administrative system binaries)
 ├── /etc                  (System configs: passwd, shadow, sudoers)
 ├── /dev/shm              (Shared memory tmpfs - RAM-only execution)
 ├── /home/<user>          (User home dirs: .bashrc, .ssh/id_rsa)
 ├── /root                 (Root superuser home directory)
 ├── /var/log              (Audit trails: auth.log, syslog, http logs)
 └── /usr/share/wordlists  (SecLists, rockyou.txt, dirb, fuzzing dicts)`
        },
        {
          heading: "Environment Variables, Shell Initialization & Path Hijacking",
          subheading: "How bash/zsh resolves commands and how improper PATH configurations allow privilege escalation",
          points: [
            "The PATH Variable: An ordered, colon-delimited list of directories searched whenever a user executes a command without specifying its absolute path (e.g., `nmap` instead of `/usr/bin/nmap`).",
            "Command Lookup Sequence: If a directory earlier in PATH contains an executable with the same name, that binary executes first. If `.` (current directory) or a world-writable folder precedes `/usr/bin`, an attacker can plant a malicious binary to hijack execution.",
            "Profile Persistence Files: `~/.bashrc` or `~/.zshrc` execute on every interactive shell launch; `/etc/profile` and `/etc/environment` enforce system-wide environment configurations.",
            "SecLists & Go Binaries Integration: By default, Go tools (`subfinder`, `httpx`, `nuclei`) install to `~/go/bin`. Exporting `export PATH=$PATH:~/go/bin` in your profile ensures your offensive toolkit is globally accessible from any terminal window.",
          ],
          callout: "Never place `.` at the beginning of your system PATH! If an administrator types `ls` inside a world-writable directory (like `/tmp`), and a malicious user has created an executable named `ls` there, the malicious script will run under the administrator's high-privilege context.",
          diagramOrCode: `PATH HIJACKING VULNERABILITY MODEL:
Current PATH: /usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/tmp/bin

If an attacker has write access to /usr/local/bin, they can create a fake 'curl':
  echo '/bin/bash -p' > /usr/local/bin/curl && chmod +x /usr/local/bin/curl
When root runs:
  curl http://internal.api/
The OS executes /usr/local/bin/curl FIRST, immediately granting root shell access!`
        }
      ],
      keyTopics: [
        "Linux Filesystem Hierarchy (FHS) Under Adversarial Inspection: The Filesystem Hierarchy Standard organizes Unix directories into functional trees. Key target directories include /etc (system configuration files, user account databases), /var/log (audit trails, authentication logs, web server traces), and /opt (third-party tools). In offensive engagements, knowing where passwords and keys are stored by default allows rapid local privilege assessment upon gaining an initial shell.",
        "Crucial Target Configuration Files (/etc/passwd, /etc/shadow, /etc/sudoers): /etc/passwd is a world-readable file listing all system user accounts, home directory locations, and default login shells. /etc/shadow is restricted strictly to the root user, containing salted cryptographic password hashes (SHA-512, yescrypt) that can be extracted for offline cracking. /etc/sudoers defines specific execution privileges and command restrictions for administrative users.",
        "Volatile In-Memory Directories (/dev/shm & /tmp) for Evasion: /dev/shm is a shared memory temporary filesystem mounted directly in RAM (tmpfs), meaning files written here never touch physical disk blocks. When attackers deploy enumeration scripts, exploit compilers, or reverse shell binaries, saving them to /dev/shm evades basic disk-based file integrity monitors. Upon system reboot, all artifacts in /dev/shm vanish completely, minimizing forensic detection.",
        "Wordlists Architecture & SecLists Integration: SecLists is the security tester's definitive collection of multiple types of lists, including usernames, passwords, URLs, sensitive data patterns, and fuzzing payloads. By default in Kali Linux, wordlists reside in /usr/share/wordlists/, including the iconic rockyou.txt dictionary containing 14.3 million breached passwords. Properly indexing and combining these dictionaries enables high-speed credential stuffing and directory fuzzing.",
        "PATH Variable Manipulation & Persistent Shell Profiles: The PATH environment variable dictates the directory search order when an executable is invoked without an absolute path. Users configure persistent PATH exports and aliases in ~/.bashrc or ~/.zshrc, while system-wide variables reside in /etc/environment. Placing writable directories before standard system paths creates PATH hijacking vulnerabilities where an attacker overrides standard utilities.",
      ],
      terminalCommands: [
        "sudo apt update && sudo apt install -y seclists curl jq ripgrep",
        "echo 'export PATH=$PATH:~/go/bin' >> ~/.zshrc && source ~/.zshrc",
        "ls -la /usr/share/wordlists/",
        "df -h /dev/shm",
      ],
      proTips: [
        "Always install Go-based tools (`subfinder`, `httpx`, `nuclei`) into `~/go/bin` and add it to your PATH.",
        "Uncompress rockyou: `sudo gzip -d /usr/share/wordlists/rockyou.txt.gz` to have 14.3 million passwords immediately ready for Hydra or Hashcat.",
      ],
    },
    {
      id: "l-2-2",
      lessonNumber: "2.2",
      title: "Text Processing Supremacy: grep, awk, sed, cut, sort & uniq",
      duration: "3 Hours",
      badge: "Data Pipelines",
      summary:
        "Turning messy recon outputs containing 50,000 URLs into clean, deduplicated, targetable scope files in seconds using UNIX streams and high-speed text utilities.",
      studyNotes: [
        {
          heading: "The UNIX Philosophy: Standard Streams & Pipelining",
          subheading: "Composing atomic utilities into lightning-fast multi-stage data processors",
          points: [
            "Standard Streams: STDIN (File Descriptor 0), STDOUT (File Descriptor 1), and STDERR (File Descriptor 2). The pipe operator `|` connects the STDOUT of one program directly into the STDIN of another without writing intermediate data to disk.",
            "Redirecting Streams: `>` overwrites file; `>>` appends to file; `2>&1` merges STDERR into STDOUT; `2>/dev/null` silently discards error messages (essential when recursively scanning restricted directories with `find`).",
            "grep vs ripgrep (rg): grep parses regular expressions line-by-line. Ripgrep (`rg`) utilizes Rust's finite state machine regex engine and memory-mapped files to search multi-gigabyte wordlists in milliseconds.",
            "anew vs sort -u: Traditional `sort -u` loads the entire dataset into memory to sort before deduplicating. Tomnomnom's `anew` deduplicates on the fly in real-time streaming mode, only writing brand-new unseen lines.",
          ],
          callout: "Mastering text streaming separates junior script users from elite security researchers. In bug bounty hunting, finding a 0-day endpoint across 100,000 subdomains requires streaming HTTP probe outputs straight into regex extraction filters without choking system memory.",
          diagramOrCode: `+-------------------------------------------------------------+
|              RECON STREAMING PIPELINE DATAFLOW               |
+-------------------------------------------------------------+
 [ subfinder ]  ==> (subdomain list)
       |
       v
 [ httpx ]      ==> (probes status codes, titles, technologies)
       |
       v
 [ awk '$2 == 200' ] ==> (filters only HTTP 200 OK responses)
       |
       v
 [ sed 's|http[s]*://||' ] ==> (strips URI schemes)
       |
       v
 [ anew live_targets.txt ] ==> (appends unique endpoints in real time)`
        },
        {
          heading: "Awk & Sed: In-Memory Parsing & Text Mutation",
          subheading: "Programmatic text transformation for custom logs, burp outputs, and scope files",
          points: [
            "Awk Field Splitting: By default, awk splits lines by whitespace into fields `$1`, `$2`, ... `$NF` (last field). Use `-F` to specify custom delimiters like colons (`awk -F':' '{print $1, $3}' /etc/passwd`).",
            "Conditional Logic in Awk: `awk '$2 ~ /^[45]/ {print $1}' responses.txt` filters and prints URLs returning 4xx or 5xx HTTP error codes.",
            "Sed Substitution Engine: Syntax `sed 's/regex/replacement/flags'`. Flags: `g` (global replacement across entire line), `i` (case-insensitive).",
            "Sed In-Place Editing: `sed -i 's/foo/bar/g' file.txt` mutates the file directly on disk without requiring temporary scratch files.",
          ],
          callout: "When dealing with Web Application Firewalls (WAFs) that log your IP, awk allows you to instantly parse your local proxy logs, calculate request rates per minute, and ensure you remain under rate-limiting threshold limits.",
          diagramOrCode: `AWK ONE-LINER CHEATSHEET:
  awk '{print $NF}'               -> Print the very last column
  awk -F',' '{print $1}'          -> Parse CSV file, print first column
  awk 'length($0) > 20'           -> Print lines longer than 20 chars
  awk '!seen[$0]++'               -> High-speed deduplication without sorting

SED ONE-LINER CHEATSHEET:
  sed 's/^[ \t]*//'               -> Strip leading whitespace
  sed '/^$/d'                     -> Delete all blank lines
  sed -E 's/[0-9]{1,3}(\.[0-9]{1,3}){3}/REDACTED/g' -> Mask IPv4 addresses`
        }
      ],
      keyTopics: [
        "UNIX Pipelining & Standard File Descriptors (STDIN, STDOUT, STDERR): The UNIX philosophy connects modular command-line tools using standard streams: STDIN (fd 0), STDOUT (fd 1), and STDERR (fd 2). The pipe operator '|' channels the standard output of one command directly into the standard input of the next without writing temporary files to disk. Redirecting errors with '2>/dev/null' silences permission denied warnings, keeping automated tool streams clean and easily parseable.",
        "Advanced Pattern Matching with grep & Ripgrep (rg): grep searches text files for lines matching regular expressions, with flags like -i (case-insensitive), -v (invert match), and -E (extended regex). Ripgrep (rg) utilizes Rust's finite state regex engine and memory-mapped files to search multi-gigabyte files 10x faster than traditional grep. Security researchers pipe large recon datasets through grep to filter for specific high-value patterns like exposed API keys or endpoint extensions.",
        "Text Transformation & Field Extraction via awk: awk is a full-featured programming language designed for column-oriented text processing and data extraction. By default, awk splits lines by whitespace into variables $1, $2, through $NF (the final column), allowing instant filtering like 'awk \"$2 == 200 {print $1}\"'. Using custom delimiters (-F':'), awk effortlessly parses structured records like /etc/passwd or CSV log exports in real-time streams.",
        "Stream Editing & Regex Substitution with sed: sed (Stream Editor) performs automated search, replace, insertion, and deletion of text in dynamic data pipelines. The substitution command 'sed \"s/regex/replacement/flags\"' replaces matching patterns across millions of URLs in seconds. Using the in-place flag 'sed -i', security analysts can sanitize massive wordlists directly on disk without requiring intermediate scratch files.",
        "Stream Deduplication with sort -u & anew: Traditional 'sort -u' buffers an entire dataset into memory to sort lines before deduplicating, causing bottlenecks on 500,000-line recon files. Tomnomnom's 'anew' tool reads from standard input and appends only brand-new, unseen unique lines to a master file in real time. This allows continuous reconnaissance scripts to process streaming outputs from multiple tools without generating redundant alerts.",
      ],
      terminalCommands: [
        "cat urls.txt | grep -E '\\.php|\\.aspx' | sort -u > endpoints.txt",
        "cat targets.txt | awk '{print $1}' | cut -d':' -f1 | sort -u",
        "cat subdomains.txt | sed 's|^https\\?://||' | anew clean_subs.txt",
        "grep -rnw '/var/www/html/' -e 'password' --exclude='*.log'",
      ],
      proTips: [
        "Install `anew` by tomnomnom: `cat new_data.txt | anew master_list.txt` automatically appends only unique entries.",
        "Use `grep -E` (Extended POSIX regex) instead of basic grep to avoid having to escape parentheses and plus signs.",
      ],
    },
    {
      id: "l-2-3",
      lessonNumber: "2.3",
      title: "Permissions, SUID/SGID & Privilege Escalation Foundations",
      duration: "2.5 Hours",
      badge: "PrivEsc",
      summary:
        "Understanding Linux Discretionary Access Control (DAC), octal permissions (755, 644), special bits (SUID 4000, SGID 2000, Sticky bit 1000), and exploiting misconfigured binaries via GTFOBins.",
      studyNotes: [
        {
          heading: "Linux Discretionary Access Control & Octal Calculations",
          subheading: "How file permissions are computed and enforced by the Linux kernel",
          points: [
            "Permission Triads: Every file has permissions for Owner (User), Group, and Others. The three primary rights are Read (r=4), Write (w=2), and Execute (x=1).",
            "Directory Execution Bit: For directories, the execute (`x`) bit does not mean running a binary; it grants permission to enter (`cd`) and traverse that directory.",
            "Special Bits: SUID (Set Owner User ID = 4000), SGID (Set Group ID = 2000), and Sticky Bit (1000, used on `/tmp` so users can only delete files they personally own).",
            "SUID Execution Mechanics: When a binary with the SUID bit set (`-rwsr-xr-x`) is executed, it runs with the privileges of the file's owner (typically root), regardless of who invoked it.",
          ],
          callout: "The SUID bit is necessary for tools like `passwd` (so ordinary users can write their new password hash to `/etc/shadow`), but if an administrator sets SUID on standard utilities like `find`, `vim`, or `bash`, any low-privilege user can immediately break out into a root shell.",
          diagramOrCode: `+-------------------------------------------------------------+
|                 PERMISSION OCTAL BIT MATRIX                 |
+-------------------------------------------------------------+
 Mode String:  -  r w x  r - x  r - -
 Octal Value:     4 2 1  4 0 1  4 0 0
 Decimal Sum:       7      5      4   ==> chmod 754 file

 SUID MODE STRING:
 - r w s r - x r - x  ==> SUID bit replaces 'x' in Owner triad
 Octal: 4755 (4000 = SUID, 700 = rwx owner, 50 = rx group, 5 = rx other)`
        },
        {
          heading: "GTFOBins: Weaponizing Legitimate Binaries for Root Access",
          subheading: "Escaping restricted shells and escalating privileges via standard system utilities",
          points: [
            "What is GTFOBins? A curated repository of Unix binaries that can be exploited by an attacker to bypass local security restrictions and escalate privileges.",
            "The `find` SUID Escape: `find . -exec /bin/sh -p \\; -quit`. The `-p` flag instructs `/bin/sh` to preserve the effective user ID (euid), yielding an instant root shell.",
            "The `vim` SUID Escape: Running `vim -c ':!/bin/sh'` executes a subshell inheriting vim's elevated UID.",
            "Sudo Misconfigurations: Running `sudo -l` enumerates which commands a low-privilege user is permitted to execute as root. If a command allows arbitrary arguments or script execution (e.g. `sudo python3 -c '...'`), root is instantly achieved.",
          ],
          callout: "Always check `sudo -l` as your very first command after obtaining a reverse shell! If you see `(ALL : ALL) NOPASSWD: /usr/bin/find`, you can obtain an unconstrained root shell in less than 3 seconds.",
          diagramOrCode: `COMMON GTFOBINS ESCAPES:
1. find with SUID:
   find . -exec /bin/sh -p \\; -quit

2. bash with SUID:
   bash -p

3. Python via Sudo:
   sudo python3 -c 'import os; os.system("/bin/bash")'

4. Nano via Sudo:
   sudo nano
   ^R^X
   reset; sh 1>&0 2>&0`
        }
      ],
      keyTopics: [
        "Linux Discretionary Access Control (DAC) & Octal Calculations: Linux file permissions use a 9-bit matrix divided into three triads: Owner (User), Group, and Others. The three primary rights are Read (r=4), Write (w=2), and Execute (x=1), summed to produce octal representations (e.g. 754 represents rwxr-xr--). For directories, the execute bit (x) grants permission to enter and traverse the folder, while the write bit (w) allows creating or deleting files within that directory.",
        "Special Permission Bits (SUID 4000, SGID 2000, Sticky Bit 1000): SUID (Set User ID) instructs the kernel to execute the binary with the permissions of the file owner (typically root) rather than the user who ran it. SGID (Set Group ID) ensures files created inside a folder inherit the parent directory's group ownership, useful for collaborative project directories. The Sticky Bit (1000, displayed as 't' on /tmp) ensures users can only delete or rename files that they personally own, preventing tampering on shared directories.",
        "SUID Execution Mechanics & Effective User ID (EUID): When an SUID binary executes, the Linux kernel sets its Effective User ID (euid) to 0 (root) while leaving the Real User ID (ruid) as the unprivileged user. If an SUID binary spawns a subshell or executes system commands without dropping privileges, the resulting shell retains root authority. Attackers search for SUID binaries using 'find / -perm -4000 -type f 2>/dev/null' to pinpoint custom administrator wrappers.",
        "GTFOBins Exploitation Framework: GTFOBins is a curated open-source repository documenting how standard Unix system binaries can be abused to bypass local security restrictions and spawn root shells. If utilities like find, vim, bash, python, or cp have SUID bits or sudo rights, an attacker uses pre-documented escape parameters to break out. For example, 'find . -exec /bin/sh -p ; -quit' immediately spawns a root shell by leveraging find's execution flag.",
        "Sudoers Specification & Least Privilege Auditing: The /etc/sudoers file defines which users can run specific commands under elevated privileges, controlled via the 'visudo' utility. Running 'sudo -l' lists all administrative commands permitted for the current user session, highlighting NOPASSWD exemptions. Insecure sudoers rules (such as allowing wildcards like 'sudo /bin/cat /var/log/*') allow directory traversal to read restricted files like /etc/shadow.",
      ],
      terminalCommands: [
        "find / -perm -4000 -type f 2>/dev/null",
        "sudo -l",
        "python3 -c 'import pty; pty.spawn(\"/bin/bash\")'",
        "chmod u+s /path/to/binary",
      ],
      proTips: [
        "Bookmark `gtfobins.github.io` — it provides instant copy-paste commands for bypassing local shell restrictions.",
        "Always pass `-p` to `/bin/bash` or `/bin/sh` when exploiting SUID binaries; modern shells drop SUID privileges by default unless `-p` is explicitly supplied.",
      ],
    },
    {
      id: "l-2-4",
      lessonNumber: "2.4",
      title: "SSH Keys, Local/Remote Port Forwarding & SOCKS Proxies",
      duration: "3 Hours",
      badge: "Tunneling",
      summary:
        "Pivoting deep into corporate internal networks behind enterprise firewalls using SSH Local (`-L`), Remote (`-R`), and Dynamic (`-D`) SOCKS5 proxies combined with Proxychains.",
      studyNotes: [
        {
          heading: "SSH Cryptographic Foundations & The Three Tunneling Paradigms",
          subheading: "How secure shells encapsulate foreign protocols across encrypted channels",
          points: [
            "Asymmetric Key Pairs: The private key (`id_ed25519` or `id_rsa`) remains secret on the attacker machine; the public key (`id_ed25519.pub`) is appended to the victim's `~/.ssh/authorized_keys` file for passwordless persistence.",
            "Local Port Forwarding (`ssh -L [local_ip:]local_port:dest_ip:dest_port user@ssh_server`): Forwards traffic from a port on your local machine, through the SSH tunnel, to a specific IP and port reachable by the remote SSH server (e.g. reaching an internal MySQL database listening only on 127.0.0.1).",
            "Remote / Reverse Port Forwarding (`ssh -R remote_port:dest_ip:dest_port user@ssh_server`): Opens a listening port on the remote server that forwards incoming connections back through the tunnel into your local attack machine.",
            "Dynamic Port Forwarding (`ssh -D local_port user@ssh_server`): Creates an in-memory SOCKS4/SOCKS5 proxy on your local machine. Any tool configured with this proxy can route arbitrary TCP traffic dynamically to any subnet accessible to the remote server.",
          ],
          callout: "When you breach an external web server that sits in the DMZ with dual network interfaces (e.g., public 198.51.100.10 and private 10.10.10.5), establishing an SSH Dynamic SOCKS proxy turns that compromised server into your personal gateway into the entire internal corporate intranet.",
          diagramOrCode: `+-------------------------------------------------------------+
|              SSH DYNAMIC SOCKS5 TUNNELING ARCHITECTURE       |
+-------------------------------------------------------------+
 [ Attacker PC ]                               [ Compromised Web Server ]
  127.0.0.1:9050  <====== SSH TUNNEL ======>    Dual-Homed Pivot Host
        ^            (Encrypted Port 22)             |
        |                                            v (Internal Network)
 [ Proxychains ]                                [ Internal Domain Controller ]
  nmap -sT 10.10.10.20                           10.10.10.20:445 (SMB)
  curl http://10.10.10.50                        [ Internal GitLab Server ]`
        },
        {
          heading: "Proxychains Mastery & DNS Leak Prevention",
          subheading: "Routing command-line security tools through multi-stage proxy relays",
          points: [
            "How Proxychains Operates: Uses `LD_PRELOAD` to dynamically hook the `connect()` and `socket()` system calls in dynamically linked C binaries, redirecting all outbound network connections through designated SOCKS or HTTP proxies.",
            "Configuration (`/etc/proxychains4.conf`): Modes include `strict_chain` (proxies are followed in strict linear order; if one fails, the connection aborts), `dynamic_chain` (dead proxies are automatically bypassed), and `round_robin`.",
            "DNS Leaks: If `proxy_dns` is commented out in your configuration, DNS queries are resolved by your local ISP rather than through the SOCKS tunnel, instantly blowing your operational cover and failing to resolve internal Active Directory domain names (e.g., `dc01.corp.internal`).",
            "TCP vs UDP Limitation: Standard SOCKS proxies cannot tunnel raw ICMP ping packets or half-open TCP SYN scans (`nmap -sS`). Always use full TCP connect scans (`nmap -sT -Pn`) when scanning through Proxychains.",
          ],
          callout: "If Nmap hangs or outputs all ports as 'filtered' when used with Proxychains, check two flags immediately: you MUST add `-Pn` (skip ICMP host discovery) and `-sT` (full TCP 3-way handshake). Otherwise Nmap attempts raw socket packets which SOCKS cannot forward.",
          diagramOrCode: `PROXYCHAINS4.CONF ESSENTIAL SETTINGS:
  # Enable dynamic hopping:
  dynamic_chain
  
  # Prevent DNS lookups from leaking locally:
  proxy_dns
  
  # Proxy list at the bottom of the file:
  [ProxyList]
  socks5  127.0.0.1 9050
  socks5  10.10.10.5 1080  # Second-hop pivot!`
        }
      ],
      keyTopics: [
        "OpenSSH Cryptographic Foundations (RSA, ED25519, Host Keys): OpenSSH uses asymmetric public-key cryptography to authenticate users and establish encrypted transport tunnels across untrusted networks. Modern deployments prefer Ed25519 keys based on Edwards-curve digital signatures, offering superior performance and resistance to side-channel attacks compared to legacy RSA. A user's private key (id_ed25519) remains confidential on the client, while the public key is appended to ~/.ssh/authorized_keys on the destination server.",
        "Local Port Forwarding (-L) Tunneling Mechanics: Local port forwarding (ssh -L local_port:dest_ip:dest_port user@server) opens a listening socket on the attacker's local machine that forwards all incoming TCP traffic through the encrypted SSH tunnel to a specific IP and port reachable by the remote SSH server. This allows penetration testers to access internal web servers, databases (like MySQL listening only on 127.0.0.1), or management consoles hidden behind perimeter firewalls.",
        "Remote / Reverse Port Forwarding (-R) Mechanics: Reverse port forwarding (ssh -R remote_port:dest_ip:dest_port user@server) opens a listening socket on the remote SSH server that forwards traffic back through the tunnel into a service running on the attacker's local machine. This is essential when catching reverse shells from air-gapped target networks that cannot initiate direct connections to your external IP address, routing traffic back through an intermediate bastion host.",
        "Dynamic Port Forwarding (-D) & SOCKS5 Proxying: Dynamic port forwarding (ssh -D local_port user@server) configures an in-memory SOCKS4/SOCKS5 proxy on the attacker's local machine. Unlike local forwarding which targets a single port, a SOCKS5 proxy dynamically routes arbitrary TCP traffic to ANY destination IP and port accessible from the remote pivot host. This transforms the remote compromised server into a full-featured routing proxy for your entire offensive tool suite.",
        "Proxychains Configuration & DNS Leak Prevention: Proxychains uses the LD_PRELOAD environment variable to hook network socket calls in dynamically linked binaries, redirecting all outbound TCP connections through designated SOCKS proxies. In /etc/proxychains4.conf, administrators configure 'dynamic_chain' to bypass dead proxies and enable 'proxy_dns' to resolve domain names through the proxy tunnel. Without proxy_dns, local DNS lookups leak to your ISP and fail to resolve internal Active Directory names.",
      ],
      terminalCommands: [
        "ssh -D 9050 -C -q -N user@remote-vps.com",
        "ssh -L 8080:127.0.0.1:3306 user@remote-vps.com",
        "proxychains4 nmap -sT -Pn -p 80,443,8080 10.10.10.5",
        "ssh-keygen -t ed25519 -C 'pentest-session'",
      ],
      proTips: [
        "When running tools over Proxychains, always use TCP Connect scan (`nmap -sT`), because SYN stealth scans cannot traverse TCP proxies.",
        "Add `-C` to SSH commands to enable gzip compression over slow or high-latency satellite connections.",
      ],
    },
    {
      id: "l-2-5",
      lessonNumber: "2.5",
      title: "Background Jobs, Screen, Tmux & Process Monitoring",
      duration: "2 Hours",
      badge: "Productivity",
      summary:
        "Running 24-hour long fuzzing, brute-force, and mass-scanning jobs without disconnecting when SSH sessions drop, using Tmux, nohup, and background process management.",
      studyNotes: [
        {
          heading: "POSIX Signals & Process Lifecycle Management",
          subheading: "How Linux handles process termination, suspension, and backgrounding",
          points: [
            "Signal Architecture: Key signals include SIGINT (Signal 2, triggered by `Ctrl+C` to interrupt), SIGTSTP (Signal 20, triggered by `Ctrl+Z` to suspend execution), SIGHUP (Signal 1, sent when the controlling terminal closes), and SIGKILL (Signal 9, unconditional immediate kernel termination).",
            "Job Control: Pressing `Ctrl+Z` suspends a running process; typing `bg` resumes it in the background; typing `fg` brings it back to the foreground; `jobs -l` lists all active jobs with their process IDs (PIDs).",
            "The `nohup` & `disown` Utilities: `nohup command &` intercepts and blocks the SIGHUP signal, ensuring that closing your terminal window or an accidental Wi-Fi drop will not terminate your running scanner.",
            "Process Inspection Tools: `ps aux --sort=-%mem` pinpoints memory leaks; `htop` provides interactive CPU thread monitoring; `kill -9 <PID>` destroys runaway processes.",
          ],
          callout: "Never run a 5-hour vulnerability scan in a regular SSH terminal! If your local laptop sleeps or changes Wi-Fi networks, the SSH connection sends SIGHUP to the remote shell, killing all child processes instantly. Always run inside a detached tmux session.",
          diagramOrCode: `+-------------------------------------------------------------+
|               TMUX TERMINAL MULTIPLEXER MODEL               |
+-------------------------------------------------------------+
 [ Tmux Server (Background Daemon) ]
       └── Session: "bounty-hunt"
             ├── Window 1: "recon"      [ subfinder | httpx ]
             ├── Window 2: "fuzzing"    [ ffuf -w wordlist.txt ]
             └── Window 3: "monitoring"[ tail -f access.log ]

 Client disconnects (SSH drops) ===> Tmux Server continues running!
 Reconnect later: tmux attach-session -t bounty-hunt`
        },
        {
          heading: "Tmux Mastery for Professional Operations",
          subheading: "Managing multi-window workspaces and persistent remote environments",
          points: [
            "Prefix Key (`Ctrl+b`): The universal trigger for all Tmux commands. Press `Ctrl+b` followed by the command letter.",
            "Window Management: `Ctrl+b c` creates a new virtual window; `Ctrl+b ,` renames the current window; `Ctrl+b n` / `Ctrl+b p` cycles through windows; `Ctrl+b w` opens an interactive window selector.",
            "Pane Splitting: `Ctrl+b %` splits the screen vertically into two columns; `Ctrl+b \"` splits horizontally into rows; `Ctrl+b <arrows>` navigates between panes.",
            "Detaching & Reattaching: `Ctrl+b d` detaches cleanly from the session, leaving all background tools running. Run `tmux ls` to inspect active sessions, and `tmux a -t <name>` to resume your session exactly where you left off.",
          ],
          callout: "You can enable mouse support in Tmux by adding `set -g mouse on` to `~/.tmux.conf`. This allows you to click between split panes, resize columns by dragging borders, and scroll backwards through terminal outputs with your mouse wheel.",
          diagramOrCode: `ESSENTIAL TMUX CHEATSHEET:
  tmux new -s <name>     -> Start new named session
  tmux ls                -> List all active sessions
  tmux a -t <name>       -> Reattach to named session
  Ctrl+b d               -> Detach from current session
  Ctrl+b %               -> Split pane vertically
  Ctrl+b "               -> Split pane horizontally
  Ctrl+b x               -> Kill active pane
  Ctrl+b z               -> Toggle zoom on active pane`
        }
      ],
      keyTopics: [
        "POSIX Signals & Process Control Lifecycle: The Linux kernel communicates process events using standardized POSIX signals: SIGINT (Ctrl+C, requests graceful interrupt), SIGTSTP (Ctrl+Z, suspends execution), SIGHUP (Signal 1, sent when terminal closes), and SIGKILL (Signal 9, unconditional termination). Job control commands manage suspended processes: 'bg' resumes a stopped job in the background, 'fg' returns it to the foreground, and 'jobs -l' lists active session tasks with their PIDs.",
        "Persistent Background Daemons (nohup, &, disown): When an SSH session terminates, the controlling terminal sends SIGHUP to all child processes, terminating long-running port scans and fuzzing tasks. Running a command with 'nohup <command> &' intercepts SIGHUP, allowing the process to continue running indefinitely in the background while logging output to nohup.out. The bash builtin 'disown -h' removes active jobs from the shell's job table so closing the terminal window leaves the process alive.",
        "Tmux Terminal Multiplexer Architecture: Tmux is a terminal multiplexer running a persistent background server daemon that decouples running shell sessions from the physical graphical terminal window. Within a single Tmux session, users create multiple independent virtual windows and split screens into interactive rows and columns (panes). If a network connection drops or an SSH session freezes, the Tmux server keeps all processes running unaffected on the remote machine.",
        "Tmux Session Lifecycle & Detach/Attach Commands: Tmux operates around a master prefix key (default Ctrl+b). Users detach from a live session using 'Ctrl+b d', safely closing the remote SSH connection while background scanners execute at full speed. Running 'tmux ls' lists all active background sessions, and 'tmux attach-session -t <name>' instantly reattaches to the exact workspace, restoring running terminal outputs and active shell prompts.",
        "Process Telemetry & System Resource Monitoring: Long-running brute-force and mass-scanning scripts can easily exhaust target or attack host memory, triggering the Linux kernel's Out-Of-Memory (OOM) killer. The 'htop' utility provides interactive real-time CPU thread, memory, and swap utilization monitoring with color-coded bar graphs. The command 'ps aux --sort=-%mem | head -n 10' identifies rogue memory-leaking processes so they can be safely terminated.",
      ],
      terminalCommands: [
        "tmux new -s bugbounty",
        "nohup subfinder -d target.com -o subs.txt > /dev/null 2>&1 &",
        "tmux attach-session -t bugbounty",
        "ps aux | grep -i 'nmap'",
      ],
      proTips: [
        "Always run recon in `tmux` on a remote VPS; never run multi-hour brute force jobs on your local laptop screen.",
        "Add `set -g history-limit 50000` to `~/.tmux.conf` so terminal scrollback buffers can hold up to 50,000 lines of scan output.",
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
      studyNotes: [
        {
          heading: "Writing Bulletproof Offensive Bash Scripts",
          subheading: "Defensive bash scripting patterns that prevent data corruption and silent crashes",
          points: [
            "The `set -euo pipefail` Standard: `-e` exits immediately if any command returns a non-zero exit code; `-u` treats unset variables as errors; `-o pipefail` ensures a pipeline fails if *any* stage fails, not just the last one.",
            "Trapping Cleanup Events: Using `trap cleanup EXIT SIGINT SIGTERM` guarantees that temporary scratch files in `/tmp` are erased and background child processes are killed cleanly even if the user aborts with `Ctrl+C`.",
            "CLI Argument Parsing (`getopts`): Standardizes script input parameters (e.g., `./recon.sh -d target.com -o results/ -t 50`) with built-in help flags (`-h`).",
            "Output Directory Management: Automatically generating timestamped output structures (`mkdir -p results/$DOMAIN/$(date +%Y-%m-%d)`) preserves historical records for diffing newly discovered assets.",
          ],
          callout: "Without `set -o pipefail`, if you run `subfinder -d target.com | tee subs.txt`, and subfinder crashes due to an API rate limit, bash checks only the exit code of `tee` (which is 0/success), causing downstream tools to scan an empty file without raising an alert.",
          diagramOrCode: `+-------------------------------------------------------------+
|               AUTOMATED RECON ENGINE ARCHITECTURE           |
+-------------------------------------------------------------+
                  [ ./auto_recon.sh -d target.com ]
                                 |
                                 v
                     [ 1. Subdomain Discovery ]
                     subfinder + assetfinder + crt.sh
                                 |
                                 v
                     [ 2. Real-Time Deduplication ]
                     anew results/target.com/subs.txt
                                 |
                                 v
                     [ 3. Live HTTP Web Probing ]
                     httpx -sc -title -tech-detect
                                 |
                                 v
                     [ 4. Critical Alert Dispatch ]
                     POST payload to Telegram / Discord Webhook`
        },
        {
          heading: "Webhook Integration & Diff-Based Asset Alerting",
          subheading: "Pushing real-time vulnerability notifications directly to your phone",
          points: [
            "The Power of Continuous Recon: The easiest bugs are found on newly deployed subdomains. By running a scheduled script every hour and comparing old assets against new assets, you test targets before other bounty hunters even know they exist.",
            "The `anew` Output Hook: `cat current_subs.txt | anew master_subs.txt > new_only.txt`. If `new_only.txt` contains data, trigger an alert.",
            "Discord / Telegram Webhook Payloads: Formatting JSON notifications with embedded markdown, discovered technologies, and direct links.",
            "Cron Automation (`crontab -e`): Scheduling the recon engine to run automatically every hour in the background on your VPS.",
          ],
          callout: "The fastest bug bounty payouts come from automated asset alerts. When companies launch new marketing or testing portals (e.g., `dev-auth.target.com`), setting up a diff monitor will ping your phone within minutes of DNS propagation.",
          diagramOrCode: `COMPLETE BASH TELEGRAM ALERT FUNCTION:
send_telegram() {
  local MSG="$1"
  local BOT_TOKEN="123456:ABC-DEF1234ghIkl-zyx57W2v1u123ew11"
  local CHAT_ID="987654321"
  curl -s -X POST "https://api.telegram.org/bot\${BOT_TOKEN}/sendMessage" \\
       -d "chat_id=\${CHAT_ID}" \\
       -d "text=\${MSG}" \\
       -d "parse_mode=Markdown" > /dev/null
}`
        }
      ],
      keyTopics: [
        "Defensive Bash Architecture & The set -euo pipefail Standard: Robust offensive bash scripts must avoid silent failures that corrupt recon datasets. The directive 'set -e' exits immediately if any command returns a non-zero exit code; 'set -u' treats unset variables as fatal errors; 'set -o pipefail' ensures a pipeline returns the exit code of the first failing command rather than the last. Implementing this triad prevents downstream tools from scanning empty or malformed files when upstream APIs fail.",
        "Command-Line Argument Parsing with getopts: Professional shell utilities standardize input parameters using the built-in 'getopts' parser, accepting short options like '-d target.com -o results/ -t 50 -h'. Using getopts enables flexible parameter handling with automatic error detection for missing arguments and built-in usage help menus. This ensures custom recon engines can be seamlessly integrated into automated cron tasks and continuous testing pipelines.",
        "Signal Traps & Automated Workspace Cleanup: The 'trap' command registers handler functions that execute automatically upon receiving specific termination signals (EXIT, SIGINT, SIGTERM). In automated recon pipelines, trap functions delete temporary scratch files from /tmp, kill background subprocesses, and flush memory buffers when an assessment is interrupted. This prevents disk bloat and ensures target systems remain clean after scanning completes.",
        "Streaming Pipelines & Zero-Disk Data Architecture: In high-scale reconnaissance across 100,000 subdomains, writing intermediate text files for every stage consumes gigabytes of storage and slows down execution. UNIX streaming connects discovery tools directly via pipes (e.g. subfinder | httpx | anew live_targets.txt), processing output lines in memory as fast as packets arrive. This zero-disk architecture maximizes throughput and avoids leaving sensitive asset inventories on multi-tenant cloud servers.",
        "Real-Time Webhook Alerting (Discord, Telegram, Slack): Continuous asset monitoring engines must notify researchers the exact moment a high-value asset or critical vulnerability is discovered. Scripts format JSON payloads containing discovered subdomains, HTTP status codes, page titles, and timestamps, dispatching them via cURL POST requests to Discord or Telegram Webhook endpoints. This pushes instant mobile notifications to the researcher's phone within minutes of a new staging portal going live.",
      ],
      terminalCommands: [
        "chmod +x auto_recon.sh",
        "./auto_recon.sh -d target.com",
        "curl -H \"Content-Type: application/json\" -X POST -d '{\"content\":\"New Subdomain Found!\"}' $WEBHOOK_URL",
        "crontab -l",
      ],
      proTips: [
        "Use `set -e` in all your bash scripts so execution halts immediately if a critical prerequisite fails.",
        "Always test your scripts with `bash -x script.sh` to trace every command and variable substitution during execution.",
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
    { id: "ch2-t1", label: "Mastered Linux Filesystem Hierarchy: /etc, /var/log, and memory-only execution in /dev/shm" },
    { id: "ch2-t2", label: "Configured SecLists and exported Go binary directory into persistent user PATH" },
    { id: "ch2-t3", label: "Mastered grep, ripgrep, awk, sed, and cut for rapid scope filtering" },
    { id: "ch2-t4", label: "Understood SUID/SGID special permissions and successfully executed GTFOBins escapes" },
    { id: "ch2-t5", label: "Configured SSH Dynamic SOCKS5 Proxy (-D 9050) and Proxychains with DNS leak prevention" },
    { id: "ch2-t6", label: "Created, detached, and restored persistent multi-window Tmux sessions" },
    { id: "ch2-t7", label: "Written a modular bash recon pipeline with strict 'set -euo pipefail' error handling" },
    { id: "ch2-t8", label: "Integrated Discord/Telegram Webhook alerts and configured automated cron scheduling" },
  ],
};
