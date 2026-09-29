/**
 * main.js — Battlefield Control Rendering Engine
 * Pulls from window.PortfolioData & window.BriefingData to hydrate all dynamic HUD sections.
 */

(function () {
  const D = window.PortfolioData || {};

  function el(tag, className, html) {
    const node = document.createElement(tag);
    if (className) node.className = className;
    if (html !== undefined) node.innerHTML = html;
    return node;
  }

  function formatIssueDate(iso) {
    if (!iso) return "";
    const [year, month] = iso.split("-");
    const months = [
      "JAN", "FEB", "MAR", "APR", "MAY", "JUN",
      "JUL", "AUG", "SEP", "OCT", "NOV", "DEC",
    ];
    return `${months[parseInt(month, 10) - 1]} ${year}`;
  }

  // ---------- BRIEFING & IDENTITY DATA BINDING ----------
  function renderIdentityAndBriefing() {
    const briefing = window.BriefingData || {};
    const personal = D.personalInfo || {};
    
    // Merge both sources (BriefingData overrides personalInfo if duplicate fields exist)
    const data = { ...personal, ...briefing };

    // 1. Hydrate all [data-field] elements across the entire page
    document.querySelectorAll("[data-field]").forEach((element) => {
      const fieldName = element.getAttribute("data-field");
      const fieldValue = data[fieldName];

      if (fieldValue !== undefined && fieldValue !== null) {
        if (element.tagName === "IMG") {
          const parent = element.parentElement;
          const fallback = parent ? parent.querySelector(".avatar-fallback") : null;

          if (typeof fieldValue === "string" && fieldValue.trim() !== "") {
            element.src = fieldValue;
            element.alt = `${data.fullName || "Operative"} identification portrait`;

            element.onerror = () => {
              element.classList.add("hidden");
              element.style.display = "none";
              if (fallback) fallback.classList.remove("hidden");
            };
          } else {
            element.classList.add("hidden");
            element.style.display = "none";
            if (fallback) fallback.classList.remove("hidden");
          }
        } else {
          element.textContent = fieldValue;
        }
      }
    });

    // 2. Specific Link Bindings
    document.querySelectorAll("[data-field='email']").forEach((n) => {
      if (data.email) {
        n.textContent = data.email;
        n.href = `mailto:${data.email}`;
      }
    });
    document.querySelectorAll("[data-field='github']").forEach((n) => {
      if (data.github) n.href = data.github;
    });
    document.querySelectorAll("[data-field='linkedin']").forEach((n) => {
      if (data.linkedin) n.href = data.linkedin;
    });
  }

  // ---------- PROJECTS GRID ----------
  function renderProjects() {
    const grid = document.getElementById("projects-grid");
    if (!grid || !D.projects) return;
    grid.innerHTML = "";

    D.projects.forEach((project, index) => {
      const card = el("article", "hud-card project-card group");
      card.style.setProperty("--delay", `${index * 60}ms`);

      const techBadges = project.techStack
        .map((t) => `<span class="tech-badge">${t}</span>`)
        .join("");

      const liveLinkHtml = project.liveLink
        ? `<a href="${project.liveLink}" target="_blank" rel="noopener" class="link-chip">
             <i data-lucide="external-link" class="w-3.5 h-3.5"></i> Live Deploy
           </a>`
        : "";

      card.innerHTML = `
        <div class="corner-bracket corner-bracket--tl"></div>
        <div class="corner-bracket corner-bracket--br"></div>
        <div class="project-media">
          <img src="${project.imagePath}" alt="${project.title} preview" loading="lazy"
               onerror="this.style.display='none'; this.parentElement.classList.add('media-fallback')" />
          <div class="scanline-overlay"></div>
        </div>
        <div class="p-5">
          <h3 class="text-lg font-semibold tracking-tight mb-2">${project.title}</h3>
          <p class="text-sm opacity-75 leading-relaxed mb-4">${project.description}</p>
          <div class="flex flex-wrap gap-1.5 mb-5">${techBadges}</div>
          <div class="flex items-center gap-3 pt-3 border-t border-current/10">
            <a href="${project.githubLink}" target="_blank" rel="noopener" class="link-chip">
              <i data-lucide="github" class="w-3.5 h-3.5"></i> Source
            </a>
            ${liveLinkHtml}
          </div>
        </div>
      `;
      grid.appendChild(card);
    });

    if (window.lucide) window.lucide.createIcons();
  }

  // ---------- DEPLOYMENT / EXPERIENCE TIMELINE ----------
  function renderTimeline() {
    const timeline = document.getElementById("timeline-list");
    if (!timeline || !D.experiences) return;
    timeline.innerHTML = "";

    D.experiences.forEach((exp, index) => {
      const row = el("li", "timeline-row");
      row.style.setProperty("--delay", `${index * 60}ms`);

      const tags = exp.tags.map((t) => `<span class="tech-badge">${t}</span>`).join("");

      row.innerHTML = `
        <div class="timeline-node">
          <span class="timeline-dot"></span>
        </div>
        <div class="hud-card timeline-content">
          <div class="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1 mb-1">
            <h3 class="text-base font-semibold">${exp.role}</h3>
            <span class="text-xs font-mono uppercase tracking-wide opacity-60">${exp.period}</span>
          </div>
          <div class="text-sm opacity-70 mb-3">${exp.organization} — ${exp.location}</div>
          <p class="text-sm opacity-80 leading-relaxed mb-3">${exp.description}</p>
          <div class="flex flex-wrap gap-1.5">${tags}</div>
        </div>
      `;
      timeline.appendChild(row);
    });
  }

  // ---------- CERTIFICATIONS ----------
  function renderCertifications() {
    const grid = document.getElementById("certs-grid");
    if (!grid || !D.certifications) return;
    grid.innerHTML = "";

    D.certifications.forEach((cert) => {
      const card = el("div", "hud-card cert-card");
      card.innerHTML = `
        <div class="cert-icon">
          <i data-lucide="${cert.badgeIcon}" class="w-5 h-5"></i>
        </div>
        <div class="flex-1 min-w-0">
          <h4 class="text-sm font-semibold leading-snug mb-1">${cert.title}</h4>
          <div class="text-xs opacity-70 mb-1">${cert.issuer}</div>
          <div class="text-[11px] font-mono opacity-50 uppercase tracking-wide">
            ${formatIssueDate(cert.issueDate)} · ID ${cert.credentialId}
          </div>
        </div>
      `;
      grid.appendChild(card);
    });

    if (window.lucide) window.lucide.createIcons();
  }

  // ---------- SKILLS ----------
  function renderSkills() {
    const container = document.getElementById("skills-container");
    if (!container || !D.skills) return;
    container.innerHTML = "";

    const categoryLabels = {
      languages: "Languages",
      frameworks: "Frameworks",
      developerTools: "Developer Tools",
      coreFundamentals: "Core CS Fundamentals",
    };

    Object.entries(D.skills).forEach(([key, values]) => {
      const block = el("div", "skill-block");
      const badges = values.map((v) => `<span class="tech-badge">${v}</span>`).join("");
      block.innerHTML = `
        <h4 class="skill-block-title">${categoryLabels[key] || key}</h4>
        <div class="flex flex-wrap gap-1.5">${badges}</div>
      `;
      container.appendChild(block);
    });
  }

  // ---------- CONTACT FOOTER LINKS ----------
  function renderContactLinks() {
    if (!D.personalInfo) return;
    document.querySelectorAll("[data-social='github']").forEach((n) => (n.href = D.personalInfo.github));
    document.querySelectorAll("[data-social='linkedin']").forEach((n) => (n.href = D.personalInfo.linkedin));
    document.querySelectorAll("[data-social='email']").forEach((n) => (n.href = `mailto:${D.personalInfo.email}`));
  }

  // ---------- COMM TERMINAL FORM ----------
  function initCommForm() {
    const form = document.getElementById("comm-form");
    if (!form) return;
    const statusEl = document.getElementById("comm-status");

    form.addEventListener("submit", (e) => {
      e.preventDefault();
      const name = form.querySelector("[name='name']").value.trim();
      if (!statusEl) return;
      statusEl.textContent = `TRANSMISSION QUEUED — Standing by for reply, ${name || "Operative"}.`;
      statusEl.classList.remove("hidden");
      form.reset();
    });
  }

  // ---------- TACTICAL HUD LIVE CLOCK ([data-clock]) ----------
  function initClock() {
    const clockEls = document.querySelectorAll("[data-clock]");
    if (!clockEls.length) return;

    function tick() {
      const now = new Date();
      const hours = String(now.getHours()).padStart(2, "0");
      const minutes = String(now.getMinutes()).padStart(2, "0");
      const seconds = String(now.getSeconds()).padStart(2, "0");
      const timeStr = `${hours}:${minutes}:${seconds} GST`;
      
      clockEls.forEach((n) => (n.textContent = timeStr));
    }

    tick();
    setInterval(tick, 1000);
  }

  // ---------- SOCIALS -------------
  function renderSocials() {
  const heroActions = document.querySelector('.hero-actions');
  const contactSocials = document.querySelector('.contact-socials');

  const socialButtonsHTML = `
    <a href="${profileData.socials.github}" target="_blank" rel="noopener noreferrer" class="btn-social btn-github">
      <i class="fab fa-github"></i> GitHub
    </a>
    <a href="${profileData.socials.linkedin}" target="_blank" rel="noopener noreferrer" class="btn-social btn-linkedin">
      <i class="fab fa-linkedin"></i> LinkedIn
    </a>
  `;

  if (heroActions) heroActions.insertAdjacentHTML('beforeend', socialButtonsHTML);
  if (contactSocials) contactSocials.insertAdjacentHTML('beforeend', socialButtonsHTML);
}

document.addEventListener('DOMContentLoaded', renderSocials);

  // ---------- MOBILE NAV ----------
  function initMobileNav() {
    const btn = document.getElementById("nav-toggle");
    const menu = document.getElementById("mobile-menu");
    if (!btn || !menu) return;
    btn.addEventListener("click", () => {
      menu.classList.toggle("hidden");
    });
    menu.querySelectorAll("a").forEach((link) =>
      link.addEventListener("click", () => menu.classList.add("hidden"))
    );
  }

  // ---------- SMOOTH SCROLL ACTIVE STATE ----------
  function initScrollSpy() {
    const sections = document.querySelectorAll("main section[id]");
    const navLinks = document.querySelectorAll(".nav-link");
    if (!sections.length || !navLinks.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            navLinks.forEach((link) => {
              link.classList.toggle(
                "nav-link--active",
                link.getAttribute("href") === `#${entry.target.id}`
              );
            });
          }
        });
      },
      { rootMargin: "-40% 0px -50% 0px" }
    );
    sections.forEach((s) => observer.observe(s));
  }

  // ---------- INITIALIZATION ENGINE ----------
  function init() {
    renderIdentityAndBriefing();
    renderProjects();
    renderTimeline();
    renderCertifications();
    renderSkills();
    renderContactLinks();
    initCommForm();
    initClock();
    initMobileNav();
    initScrollSpy();

    const bootYear = document.getElementById("boot-year");
    if (bootYear) {
      bootYear.textContent = new Date().getFullYear();
    }

    if (window.lucide) {
      window.lucide.createIcons();
    }
  }

  document.addEventListener("DOMContentLoaded", init);
})();