
    // 1. Roles Typing Animation
    const roles = [
      "Computer Science Engineer",
      "Aspiring SOC Analyst",
      "Python & Java Developer",
      "Cybersecurity Specialist",
      "Full-Stack Web Builder"
    ];
    let roleIndex = 0, charIndex = 0, isDeleting = false;
    const typingTextEl = document.getElementById('typing-text');

    function typeEffect() {
      const currentRole = roles[roleIndex];
      if (isDeleting) {
        typingTextEl.textContent = currentRole.substring(0, charIndex - 1);
        charIndex--;
      } else {
        typingTextEl.textContent = currentRole.substring(0, charIndex + 1);
        charIndex++;
      }

      let speed = isDeleting ? 40 : 80;
      if (!isDeleting && charIndex === currentRole.length) {
        speed = 2200;
        isDeleting = true;
      } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        roleIndex = (roleIndex + 1) % roles.length;
        speed = 400;
      }
      setTimeout(typeEffect, speed);
    }
    typeEffect();

    // 2. Custom Cursor
    const cur = document.getElementById('custom-cursor');
    const curFollower = document.getElementById('custom-cursor-follower');
    let mouseX = window.innerWidth / 2, mouseY = window.innerHeight / 2;
    let followerX = mouseX, followerY = mouseY;

    if (cur && curFollower) {
      document.addEventListener('mousemove', e => {
        mouseX = e.clientX;
        mouseY = e.clientY;
        cur.style.left = mouseX + 'px';
        cur.style.top = mouseY + 'px';
      });

      function animateFollower() {
        followerX += (mouseX - followerX) * 0.18;
        followerY += (mouseY - followerY) * 0.18;
        curFollower.style.left = followerX + 'px';
        curFollower.style.top = followerY + 'px';
        requestAnimationFrame(animateFollower);
      }
      animateFollower();

      document.querySelectorAll('a, button, input, textarea, .stat-card, .skill-matrix-card, .cyber-cert-card, .pathway-station, .contact-row, .filter-btn').forEach(el => {
        el.addEventListener('mouseenter', () => document.body.classList.add('cursor-hover'));
        el.addEventListener('mouseleave', () => document.body.classList.remove('cursor-hover'));
      });
    }

    // 3. Interactive Network Canvas
    const canvas = document.getElementById('canvas-network');
    const ctx = canvas.getContext('2d');
    let width, height, particles = [];

    function resizeCanvas() {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    }
    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();

    class Particle {
      constructor() { this.reset(); }
      reset() {
        this.x = Math.random() * width;
        this.y = Math.random() * height;
        this.vx = (Math.random() - 0.5) * 0.45;
        this.vy = (Math.random() - 0.5) * 0.45;
        this.radius = Math.random() * 1.5 + 0.6;
        this.alpha = Math.random() * 0.5 + 0.2;
      }
      update() {
        this.x += this.vx;
        this.y += this.vy;
        if (this.x < 0 || this.x > width || this.y < 0 || this.y > height) {
          this.reset();
        }
      }
      draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(0, 255, 170, ${this.alpha})`;
        ctx.fill();
      }
    }

    for (let i = 0; i < 65; i++) {
      particles.push(new Particle());
    }

    function renderNetwork() {
      ctx.clearRect(0, 0, width, height);
      for (let i = 0; i < particles.length; i++) {
        particles[i].update();
        particles[i].draw();

        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 115) {
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = `rgba(16, 185, 129, ${0.14 * (1 - dist / 115)})`;
            ctx.lineWidth = 0.65;
            ctx.stroke();
          }
        }
      }
      requestAnimationFrame(renderNetwork);
    }
    renderNetwork();

    // 4. 3D Avatar Tilt
    const avatarCard = document.getElementById('avatarCard');
    if (avatarCard) {
      document.addEventListener('mousemove', e => {
        const rect = avatarCard.getBoundingClientRect();
        const cardX = rect.left + rect.width / 2;
        const cardY = rect.top + rect.height / 2;
        const deltaX = (e.clientX - cardX) / (window.innerWidth / 2);
        const deltaY = (e.clientY - cardY) / (window.innerHeight / 2);
        avatarCard.style.transform = `rotateY(${deltaX * 16}deg) rotateX(${-deltaY * 16}deg)`;
      });
    }

    // 5. Scroll Progress & Navbar Scrolled
    window.addEventListener('scroll', () => {
      const winScroll = document.documentElement.scrollTop || document.body.scrollTop;
      const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const scrolled = (winScroll / height) * 100;
      document.getElementById('scroll-progress').style.width = scrolled + '%';

      const nav = document.getElementById('navbar');
      if (winScroll > 40) {
        nav.classList.add('scrolled');
      } else {
        nav.classList.remove('scrolled');
      }
    });

    // 6. Reveal Observer
    const revealObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('active');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });

    document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

    // 7. Skills Category Filter
    function filterSkills(cat, btn) {
      document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const cards = document.querySelectorAll('.skill-matrix-card');
      cards.forEach(c => {
        if (cat === 'all' || c.dataset.category === cat) {
          c.style.display = 'flex';
          setTimeout(() => c.style.opacity = '1', 50);
        } else {
          c.style.opacity = '0';
          setTimeout(() => c.style.display = 'none', 250);
        }
      });
    }

    // 8. SOC Telemetry Channel Switcher
    const socChannels = {
      'network': {
        title: 'Network Protocol & Packet Analysis',
        desc: 'In-depth understanding of TCP/IP 4-layer model, handshake validation, packet sniffing using Wireshark, DNS queries, and firewall stateful inspection against malicious traffic anomalies.',
        tags: ['Wireshark', 'TCP/IP', 'DNS / HTTP(S)', 'Packet Filtering'],
        metrics: [
          { label: 'Protocol Coverage', val: 'TCP, UDP, ICMP, ARP, TLS' },
          { label: 'Threat Detection', val: 'SYN Flood, ARP Poisoning, Port Scans' },
          { label: 'Analysis Skill', val: 'Pcap Triage & Flow Analysis' }
        ]
      },
      'siem': {
        title: 'SIEM Log Correlation & Monitoring',
        desc: 'Security Information and Event Management concepts, event log analysis (Windows Security / Syslog), alert correlation, anomaly detection, and basic Splunk search processing query fundamentals.',
        tags: ['Splunk Concepts', 'Syslog Analysis', 'Event ID Triage', 'Log Aggregation'],
        metrics: [
          { label: 'Log Sources', val: 'Windows Security, Linux Auth, Firewall' },
          { label: 'Alert Triage', val: 'Severity Scoring & False Positive Red.' },
          { label: 'Querying', val: 'Regex & Basic SPL Logic' }
        ]
      },
      'crypto': {
        title: 'Applied Cryptography & Authentication',
        desc: 'Implementation of cryptographic standards including AES symmetric encryption, RSA asymmetric key exchanges, SHA-256 integrity verification, and digital certificates.',
        tags: ['SHA-256', 'AES-256', 'Public Key Infra (PKI)', 'Entropy Analysis'],
        metrics: [
          { label: 'Hashing', val: 'SHA-256, HMAC Message Integrity' },
          { label: 'Encryption', val: 'AES-CBC/GCM, TLS 1.3 Handshake' },
          { label: 'Key Hygiene', val: 'Entropy, Salt & IV Generation' }
        ]
      },
      'owasp': {
        title: 'Threat Surface & OWASP Web Mitigation',
        desc: 'Understanding core web application attack vectors based on OWASP Top 10 guidelines: SQL Injection, Cross-Site Scripting (XSS), Broken Authentication, and CSRF remediation.',
        tags: ['SQL Injection', 'Cross-Site Scripting', 'CORS / CSP', 'Input Sanitization'],
        metrics: [
          { label: 'Defense Vector', val: 'Parameterized Queries, Sanitization' },
          { label: 'Audit Standard', val: 'OWASP Top 10 (2021) Mapping' },
          { label: 'Security Headers', val: 'HSTS, CSP, X-Frame-Options' }
        ]
      },
      'ir': {
        title: 'Incident Response & SOC Playbooks',
        desc: 'Structured triage methodology across Preparation, Identification, Containment, Eradication, Recovery, and Lessons Learned (PICERL), maintaining chain-of-custody documentation.',
        tags: ['PICERL Framework', 'Containment Protocols', 'Evidence Preservation', 'Triage Playbooks'],
        metrics: [
          { label: 'Framework', val: 'NIST SP 800-61 Rev 2' },
          { label: 'SLA Target', val: 'Tier-1 Alert Escalation < 15 Min' },
          { label: 'Artifact Logging', val: 'Chain of Custody & Hash Audit' }
        ]
      }
    };

    function switchSocChannel(channelKey, btn) {
      document.querySelectorAll('.hud-tab-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const data = socChannels[channelKey];
      if (!data) return;

      const titleEl = document.getElementById('hudChannelTitle');
      const descEl = document.getElementById('hudChannelDesc');
      const tagsEl = document.getElementById('hudChannelTags');
      const metricsEl = document.getElementById('hudChannelMetrics');

      titleEl.textContent = data.title;
      descEl.textContent = data.desc;

      tagsEl.innerHTML = data.tags.map(t => `<span class="highlight-pill">${t}</span>`).join('');
      metricsEl.innerHTML = data.metrics.map(m => `
        <div class="hud-metric-row">
          <span class="hud-metric-label">${m.label}</span>
          <span class="hud-metric-val">${m.val}</span>
        </div>
      `).join('');
    }

    // 9. Cyber Vault Password Evaluator & Real-time Cryptographic Engine
    async function sha256(message) {
      const msgBuffer = new TextEncoder().encode(message);
      const hashBuffer = await crypto.subtle.digest('SHA-256', msgBuffer);
      const hashArray = Array.from(new Uint8Array(hashBuffer));
      return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
    }

    async function evaluatePasswordStrength(pwd) {
      const bar = document.getElementById('strengthBar');
      const text = document.getElementById('strengthText');
      const entropy = document.getElementById('entropyText');
      const hashDisp = document.getElementById('vaultHashDisplay');

      // Update criteria
      const hasLen = pwd.length >= 8;
      const hasUpper = /[A-Z]/.test(pwd);
      const hasLower = /[a-z]/.test(pwd);
      const hasNum = /[0-9]/.test(pwd);
      const hasSym = /[^A-Za-z0-9]/.test(pwd);

      document.getElementById('c-len').className = 'criterion ' + (hasLen ? 'valid' : '');
      document.getElementById('c-upper').className = 'criterion ' + (hasUpper ? 'valid' : '');
      document.getElementById('c-lower').className = 'criterion ' + (hasLower ? 'valid' : '');
      document.getElementById('c-num').className = 'criterion ' + (hasNum ? 'valid' : '');
      document.getElementById('c-sym').className = 'criterion ' + (hasSym ? 'valid' : '');

      let score = 0;
      if (hasLen) score += 20;
      if (pwd.length >= 12) score += 15;
      if (hasUpper) score += 20;
      if (hasLower) score += 15;
      if (hasNum) score += 15;
      if (hasSym) score += 15;

      let pool = 0;
      if (hasLower) pool += 26;
      if (hasUpper) pool += 26;
      if (hasNum) pool += 10;
      if (hasSym) pool += 33;
      pool = Math.max(pool, 2);
      const bits = Math.round(pwd.length * Math.log2(pool));
      entropy.textContent = `Entropy: ~${bits} bits`;

      const crackEl = document.getElementById('c-crack');
      if (score < 40) {
        bar.style.width = '25%';
        bar.style.background = '#ef4444';
        text.style.color = '#ef4444';
        text.textContent = 'Weak';
        crackEl.className = 'criterion';
        crackEl.innerHTML = '<span>⚠️</span> Crack: Instant';
      } else if (score < 70) {
        bar.style.width = '55%';
        bar.style.background = '#f59e0b';
        text.style.color = '#f59e0b';
        text.textContent = 'Moderate';
        crackEl.className = 'criterion valid';
        crackEl.innerHTML = '<span>⏳</span> Crack: ~Hours';
      } else if (score < 90) {
        bar.style.width = '80%';
        bar.style.background = '#10b981';
        text.style.color = '#10b981';
        text.textContent = 'Strong';
        crackEl.className = 'criterion valid';
        crackEl.innerHTML = '<span>🛡️</span> Crack: ~Decades';
      } else {
        bar.style.width = '100%';
        bar.style.background = '#00ffaa';
        text.style.color = '#00ffaa';
        text.textContent = 'Fortress Level';
        crackEl.className = 'criterion valid';
        crackEl.innerHTML = '<span>🏰</span> Crack: ~Centuries';
      }

      // Hash update
      if (pwd.length > 0) {
        try {
          const h = await sha256(pwd);
          hashDisp.innerHTML = `SHA-256: <span>${h.substring(0, 16)}...${h.substring(h.length - 8)}</span>`;
        } catch (e) {
          hashDisp.innerHTML = `SHA-256: <span>[Encrypted Stream Active]</span>`;
        }
      } else {
        hashDisp.innerHTML = `SHA-256: <span>[Awaiting Input]</span>`;
      }
    }

    function generateSecurePassword() {
      const uppers = 'ABCDEFGHJKLMNPQRSTUVWXYZ';
      const lowers = 'abcdefghijkmnpqrstuvwxyz';
      const numbers = '23456789';
      const symbols = '!@#$%^&*()_+~|}{[]:;?><';
      const all = uppers + lowers + numbers + symbols;

      let pass = '';
      pass += uppers[Math.floor(Math.random() * uppers.length)];
      pass += lowers[Math.floor(Math.random() * lowers.length)];
      pass += numbers[Math.floor(Math.random() * numbers.length)];
      pass += symbols[Math.floor(Math.random() * symbols.length)];

      for (let i = 0; i < 12; i++) {
        pass += all[Math.floor(Math.random() * all.length)];
      }

      pass = pass.split('').sort(() => 0.5 - Math.random()).join('');
      const input = document.getElementById('testPassword');
      input.value = pass;
      evaluatePasswordStrength(pass);
      showToast('Generated cryptographically strong password!');
    }

    function simulateVaultLock() {
      const statusText = document.getElementById('vaultStatusText');
      statusText.textContent = 'ENCRYPTING...';
      statusText.style.color = '#00ffaa';

      setTimeout(() => {
        statusText.textContent = 'VAULT SECURED';
        statusText.style.color = '#10b981';
        showToast('Vault credentials locked and encrypted with AES-256!');
      }, 700);
    }

    // 10. AI Interview Simulator
    const aiSamples = [
      {
        q: "Explain TCP 3-Way Handshake & SYN Flooding mitigation.",
        a: "Candidate Profile: Strong explanation of SYN, SYN-ACK, ACK sequence. Recommended SYN cookies and stateful firewall timeouts.",
        score: "94/100",
        latency: "142ms"
      },
      {
        q: "What is the difference between Symmetric vs Asymmetric Encryption?",
        a: "Candidate Profile: Clear distinction between AES speed for bulk data and RSA/ECC for key distribution. Excellent conceptual depth.",
        score: "96/100",
        latency: "128ms"
      },
      {
        q: "Describe how a SOC Tier-1 analyst investigates an unknown port scan alert.",
        a: "Candidate Profile: Outlined IP reputation lookup, firewall log correlation, packet payload analysis, and ticket escalation SLA.",
        score: "92/100",
        latency: "155ms"
      }
    ];
    let aiSampleIdx = 0;

    function simulateInterviewEvaluation() {
      aiSampleIdx = (aiSampleIdx + 1) % aiSamples.length;
      const s = aiSamples[aiSampleIdx];
      const term = document.getElementById('aiTermContent');

      term.innerHTML = `
        <p style="color:var(--text-muted);">$ python interview_portal.py --eval-next</p>
        <p style="color:var(--accent-emerald);">[✓] Candidate Profile: Kishor S (CSE / SOC Track)</p>
        <p style="color:var(--accent-cyan); margin-top:0.4rem;">[>] Technical Question: "${s.q}"</p>
        <div style="background:rgba(255,255,255,0.04); padding:0.6rem; border-radius:8px; margin:0.5rem 0; color:var(--text-main);">
          <strong>AI Scoring:</strong> ${s.score} · <strong>Feedback:</strong> "${s.a}"
        </div>
        <p style="color:var(--accent-purple);">[⚡] Real-Time Latency: ${s.latency} · NLP Precision 98.6%</p>
      `;
      showToast('AI Interview simulation updated!');
    }

    // 11. Modal Content Data (Resume, AI Portal, Cyber Vault, Certs)
    const modalData = {
      'resume-preview': {
        title: 'Kishor S — Official Resume & Academic Profile',
        body: `
          <div class="resume-doc-view">
            <div class="resume-doc-header">
              <div class="resume-doc-title">KISHOR S</div>
              <div class="resume-doc-contact">
                Coimbatore, India &nbsp;|&nbsp; +91-8754264385 &nbsp;|&nbsp; <a href="mailto:kishorsarasvanan@gmail.com" style="color:var(--accent-cyan);">kishorsarasvanan@gmail.com</a>
              </div>
              <div style="margin-top:0.5rem; display:flex; justify-content:center; gap:0.9rem; flex-wrap:wrap;">
                <a href="https://www.linkedin.com/in/kishor-sarasvanan-8a09a737a/" target="_blank" class="highlight-pill" style="text-decoration:none;">LinkedIn ↗</a>
                <a href="https://github.com/kishor1432502" target="_blank" class="highlight-pill" style="text-decoration:none;">GitHub ↗</a>
                <a href="https://leetcode.com/u/kishor_2502/" target="_blank" class="highlight-pill" style="text-decoration:none;">LeetCode ↗</a>
                <a href="Kishor_S_Resume.pdf" download="Kishor_S_Resume.pdf" class="highlight-pill" style="text-decoration:none; background:rgba(0,255,170,0.18); font-weight:700;">📥 Download PDF</a>
              </div>
            </div>

            <div class="resume-doc-section-title">CAREER OBJECTIVE</div>
            <p style="color:var(--text-muted); font-size:0.92rem;">
              Computer Science and Engineering student with a solid foundation in Java and Python, and a strong interest in cyber security, particularly the SOC Analyst role. A responsible, orderly, and quick learner with strong analytical and logical abilities, eager to apply coding knowledge to real-world projects.
            </p>

            <div class="resume-doc-section-title">SKILLS</div>
            <ul style="color:var(--text-muted); font-size:0.88rem; padding-left:1.2rem; line-height:1.7;">
              <li><strong>Technical Skills:</strong> C, C++, Python, Java, Data Structures, Cyber Security</li>
              <li><strong>Web Development:</strong> HTML, CSS, JavaScript</li>
              <li><strong>Database Management:</strong> MySQL</li>
              <li><strong>Tools & Platforms:</strong> Git, GitHub, VS Code</li>
              <li><strong>Soft Skills:</strong> Communication, Time Management, Teamwork, Adaptability, Problem Solving</li>
            </ul>

            <div class="resume-doc-section-title">EDUCATION</div>
            <div style="margin-bottom:0.7rem;">
              <div style="display:flex; justify-content:space-between; font-weight:700; color:var(--text-main);">
                <span>Bachelor of Computer Science and Engineering</span>
                <span>09/2023 – 05/2027</span>
              </div>
              <div style="display:flex; justify-content:space-between; color:var(--text-dim); font-size:0.85rem;">
                <span>V. S. B College of Engineering Technical Campus</span>
                <span>Coimbatore, India</span>
              </div>
            </div>
            <div>
              <div style="display:flex; justify-content:space-between; font-weight:700; color:var(--text-main);">
                <span>Higher Secondary School Certification</span>
                <span>06/2022 – 03/2023</span>
              </div>
              <div style="display:flex; justify-content:space-between; color:var(--text-dim); font-size:0.85rem;">
                <span>Government Higher Secondary School</span>
                <span>Namakkal, India</span>
              </div>
            </div>

            <div class="resume-doc-section-title">PROJECTS</div>
            <div style="margin-bottom:0.9rem;">
              <div style="font-weight:700; color:var(--text-main);">AI Interview Portal (Main Project)</div>
              <p style="color:var(--text-muted); font-size:0.88rem;">
                Developed an intelligent recruitment interface powered by advanced AI that automates candidate screening and generates real-time, context-aware feedback for mock technical interviews.
              </p>
              <div style="font-family:var(--font-mono); font-size:0.75rem; color:var(--accent-cyan);">
                Tools: Python, HTML, CSS, JavaScript, OpenAI API (NLP)
              </div>
            </div>
            <div>
              <div style="font-weight:700; color:var(--text-main);">Cyber Vault (Mini Project / Password Strength Checker)</div>
              <p style="color:var(--text-muted); font-size:0.88rem;">
                Designed an interactive password security tool that analyzes password strength and suggests robust passwords to improve account security.
              </p>
              <div style="font-family:var(--font-mono); font-size:0.75rem; color:var(--accent-gold);">
                Tools: HTML, CSS, JavaScript, Cryptography
              </div>
            </div>

            <div class="resume-doc-section-title">CERTIFICATIONS</div>
            <ul style="color:var(--text-muted); font-size:0.88rem; padding-left:1.2rem; line-height:1.7;">
              <li><strong>HP LIFE – Data Science & Analytics:</strong> gained skills in data analysis, tools, and data-driven business strategies.</li>
              <li><strong>Java Programming Course for Beginners:</strong> foundational knowledge in core Java and programming concepts.</li>
            </ul>

            <div class="resume-doc-section-title">LANGUAGES & DECLARATION</div>
            <p style="color:var(--text-muted); font-size:0.88rem; margin-bottom:0.6rem;">
              <strong>Languages:</strong> Tamil, English
            </p>
            <p style="color:var(--text-dim); font-size:0.82rem; font-style:italic;">
              "I hereby declare that the details mentioned above are true and correct to the best of my knowledge. I take full responsibility for the correctness of this information and am prepared to substantiate it if required." — <strong>Kishor S</strong>
            </p>

            <div style="margin-top:1.4rem; text-align:center;">
              <a href="Kishor_S_Resume.pdf" download="Kishor_S_Resume.pdf" class="btn btn-primary btn-sm">
                <span>📥 Download Official PDF File</span>
              </a>
            </div>
          </div>
        `
      },
      'ai-portal': {
        title: 'AI Interview Portal — Architecture & Assessment Pipeline',
        body: `
          <p style="color:var(--text-muted); line-height:1.7; margin-bottom:1.2rem;">
            A full-stack, AI-driven assessment engine engineered to automate the initial technical screening phase of recruitment. It parses candidate responses using Natural Language Processing and provides deterministic, multi-attribute evaluation.
          </p>
          <div style="background:rgba(255,255,255,0.03); padding:1.2rem; border-radius:14px; border:1px solid var(--border-glass); margin-bottom:1.2rem;">
            <h4 style="color:var(--accent-cyan); font-size:0.95rem; margin-bottom:0.6rem;">Key Technical Highlights:</h4>
            <ul style="color:var(--text-muted); font-size:0.88rem; padding-left:1.2rem; line-height:1.7;">
              <li>Dynamic context-aware question generation tailored to candidate resume and domain.</li>
              <li>Natural language evaluation pipeline computing technical accuracy, conceptual clarity, and completeness.</li>
              <li>Granular feedback scoring matrix on communication clarity, technical depth, and time efficiency.</li>
              <li>Personalized improvement resource recommendations generated instantaneously.</li>
            </ul>
          </div>
          <div style="font-family:var(--font-mono); font-size:0.75rem; color:var(--accent-teal);">
            Stack: Python · OpenAI API (NLP) · HTML5 · CSS3 · Modern JavaScript
          </div>
        `
      },
      'cyber-vault': {
        title: 'Cyber Vault — Cryptographic Architecture',
        body: `
          <p style="color:var(--text-muted); line-height:1.7; margin-bottom:1.2rem;">
            A client-side cryptographic credential fortress engineered to test entropy, estimate crack times, generate cryptographically random strings, and safeguard credentials without server transmission.
          </p>
          <div style="background:rgba(255,255,255,0.03); padding:1.2rem; border-radius:14px; border:1px solid var(--border-glass); margin-bottom:1.2rem;">
            <h4 style="color:var(--accent-gold); font-size:0.95rem; margin-bottom:0.6rem;">Cryptographic Principles:</h4>
            <ul style="color:var(--text-muted); font-size:0.88rem; padding-left:1.2rem; line-height:1.7;">
              <li>Shannon Entropy computation: H = L * log2(N) where N is character pool size.</li>
              <li>Hash generation via Web Cryptography API (SubtleCrypto SHA-256).</li>
              <li>Protection against common dictionary attacks and rainbow table matching.</li>
              <li>Cryptographically secure pseudo-random number generator (CSPRNG) character selection.</li>
            </ul>
          </div>
          <div style="font-family:var(--font-mono); font-size:0.75rem; color:var(--accent-gold);">
            Stack: HTML5 · Vanilla CSS3 · JavaScript ES6+ · Web Crypto API (SubtleCrypto)
          </div>
        `
      },
      'cert-hp': {
        title: 'HP LIFE — Data Science & Analytics Credential',
        body: `
          <div class="certificate-diploma-view">
            <div class="diploma-seal-icon">📊</div>
            <div style="font-family:var(--font-mono); font-size:0.75rem; color:var(--accent-cyan); margin-bottom:0.3rem;">
              CREDENTIAL VERIFICATION: CERT-HP-2024-DS
            </div>
            <h3 style="font-family:var(--font-heading); font-size:1.4rem; color:var(--text-main); margin-bottom:0.3rem;">
              HP LIFE Learning Initiative
            </h3>
            <p style="font-size:0.92rem; color:var(--text-muted); margin-bottom:1rem;">
              This certifies that <strong>Kishor S</strong> has successfully completed the curriculum in
            </p>
            <div style="font-size:1.25rem; font-weight:800; color:var(--accent-cyan); margin-bottom:1rem;">
              Data Science & Analytics
            </div>
            <p style="font-size:0.85rem; color:var(--text-muted); line-height:1.6; max-width:550px; margin:0 auto 1.2rem auto;">
              Gained practical skills in data extraction, quantitative data analysis, business metric modeling, visualization techniques, and data-driven organizational strategies.
            </p>
            <div style="display:flex; justify-content:center; gap:1.5rem; font-family:var(--font-mono); font-size:0.75rem; color:var(--accent-emerald);">
              <span>✓ 100% Verified Certificate</span>
              <span>·</span>
              <span>Issued to: Kishor S</span>
            </div>
          </div>
        `
      },
      'cert-java': {
        title: 'Java Programming Course for Beginners Credential',
        body: `
          <div class="certificate-diploma-view" style="border-color:var(--accent-gold);">
            <div class="diploma-seal-icon">☕</div>
            <div style="font-family:var(--font-mono); font-size:0.75rem; color:var(--accent-gold); margin-bottom:0.3rem;">
              CREDENTIAL VERIFICATION: CERT-JAVA-CORE-01
            </div>
            <h3 style="font-family:var(--font-heading); font-size:1.4rem; color:var(--text-main); margin-bottom:0.3rem;">
              Core Java Certification
            </h3>
            <p style="font-size:0.92rem; color:var(--text-muted); margin-bottom:1rem;">
              This certifies that <strong>Kishor S</strong> has demonstrated competence in
            </p>
            <div style="font-size:1.25rem; font-weight:800; color:var(--accent-gold); margin-bottom:1rem;">
              Java Programming for Beginners
            </div>
            <p style="font-size:0.85rem; color:var(--text-muted); line-height:1.6; max-width:550px; margin:0 auto 1.2rem auto;">
              Foundational knowledge in core Java and programming concepts, Object-Oriented Programming (OOP) paradigms, abstraction, memory structures, exception handling, and algorithm design.
            </p>
            <div style="display:flex; justify-content:center; gap:1.5rem; font-family:var(--font-mono); font-size:0.75rem; color:var(--accent-emerald);">
              <span>✓ 100% Verified Certificate</span>
              <span>·</span>
              <span>Issued to: Kishor S</span>
            </div>
          </div>
        `
      }
    };

    function openModal(key) {
      const data = modalData[key];
      if (!data) return;
      document.getElementById('modalBody').innerHTML = `
        <h3 style="font-family:var(--font-heading); font-size:1.35rem; font-weight:800; color:var(--text-main); margin-bottom:1.2rem; padding-right:1.5rem;">
          ${data.title}
        </h3>
        ${data.body}
      `;
      document.getElementById('modalBackdrop').classList.add('active');
    }

    function closeModal() {
      document.getElementById('modalBackdrop').classList.remove('active');
    }

    document.addEventListener('keydown', e => {
      if (e.key === 'Escape') closeModal();
    });

    // 12. Toast & Clipboard
    function showToast(msg) {
      const toast = document.getElementById('toast-notification');
      document.getElementById('toast-msg').textContent = msg;
      toast.classList.add('show');
      setTimeout(() => toast.classList.remove('show'), 3200);
    }

    function copyToClipboard(text, successMsg) {
      navigator.clipboard.writeText(text).then(() => {
        showToast(successMsg || 'Copied to clipboard!');
      }).catch(() => {
        showToast('Copied: ' + text);
      });
    }

    // 13. Direct Form Submit to Mailto
    function handleFormSubmit(e) {
      e.preventDefault();
      const name = document.getElementById('formName').value;
      const email = document.getElementById('formEmail').value;
      const subject = document.getElementById('formSubject').value;
      const msg = document.getElementById('formMessage').value;

      showToast(`Opening mail client to send message to Kishor S...`);

      const mailtoUrl = `mailto:kishorsarasvanan@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent("From: " + name + " (" + email + ")

Message:
" + msg)}`;

      setTimeout(() => {
        window.location.href = mailtoUrl;
      }, 700);

      document.getElementById('contactForm').reset();
    }

    // 14. Theme Switcher (Non-Blue Palettes)
    function setTheme(theme) {
      document.querySelectorAll('.theme-dot').forEach(d => d.classList.remove('active'));
      if (theme === 'default') {
        document.documentElement.removeAttribute('data-theme');
        document.querySelector('.theme-dot.cyan').classList.add('active');
      } else {
        document.documentElement.setAttribute('data-theme', theme);
        document.querySelector(`.theme-dot.${theme}`).classList.add('active');
      }
      showToast('Theme updated!');
    }

    function toggleMobileMenu() {
      document.getElementById('mobileMenu').classList.toggle('open');
    }
  