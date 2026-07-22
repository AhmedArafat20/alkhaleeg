// خط القطع — shared site scripts
const WHATSAPP_NUMBER = "966502567359"; // 0502567359 in international format
const PHONE_NUMBER = "0502567359";

document.addEventListener("DOMContentLoaded", () => {
  /* ---------- Mobile menu ---------- */
  const menuToggle = document.querySelector(".menu-toggle");
  const navLinks = document.querySelector(".nav-links");
  if (menuToggle && navLinks) {
    menuToggle.addEventListener("click", () => {
      navLinks.classList.toggle("open");
      const isOpen = navLinks.classList.contains("open");
      menuToggle.textContent = isOpen ? "✕" : "☰";
      document.body.classList.toggle("menu-open", isOpen);
    });
    navLinks.querySelectorAll("a").forEach(a => {
      a.addEventListener("click", () => {
        navLinks.classList.remove("open");
        menuToggle.textContent = "☰";
        document.body.classList.remove("menu-open");
      });
    });
  }

  /* ---------- Reveal on scroll ---------- */
  const revealEls = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window && revealEls.length) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add("in");
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15 });
    revealEls.forEach(el => io.observe(el));
  } else {
    revealEls.forEach(el => el.classList.add("in"));
  }

  /* ---------- Floating buttons: wire numbers ---------- */
  document.querySelectorAll("[data-whatsapp-link]").forEach(el => {
    const msg = el.getAttribute("data-whatsapp-msg") || "مرحباً، أرغب بالاستفسار عن خدمات قص وتكسير الجدران بالليزر.";
    el.href = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(msg)}`;
  });
  document.querySelectorAll("[data-call-link]").forEach(el => {
    el.href = `tel:+${WHATSAPP_NUMBER}`;
  });

  /* ---------- Project filter (projects.html) ---------- */
  const filterBtns = document.querySelectorAll(".filter-btn");
  const tiles = document.querySelectorAll(".project-tile");
  if (filterBtns.length && tiles.length) {
    filterBtns.forEach(btn => {
      btn.addEventListener("click", () => {
        filterBtns.forEach(b => b.classList.remove("active"));
        btn.classList.add("active");
        const cat = btn.getAttribute("data-filter");
        tiles.forEach(tile => {
          const match = cat === "all" || tile.getAttribute("data-cat") === cat;
          tile.style.display = match ? "" : "none";
        });
      });
    });
  }

  /* ---------- Lightbox ---------- */
  const lightbox = document.querySelector(".lightbox");
  if (lightbox && tiles.length) {
    const lbImg = lightbox.querySelector("img");
    const lbCap = lightbox.querySelector(".lightbox-cap");
    const visibleTiles = () => Array.from(tiles).filter(t => t.style.display !== "none");
    let current = 0;

    const openAt = (index) => {
      const list = visibleTiles();
      if (!list.length) return;
      current = (index + list.length) % list.length;
      const tile = list[current];
      const img = tile.querySelector("img");
      lbImg.src = img.src;
      lbCap.textContent = tile.getAttribute("data-caption") || img.alt || "";
      lightbox.classList.add("open");
    };

    tiles.forEach((tile, i) => {
      tile.addEventListener("click", () => {
        const list = visibleTiles();
        const idx = list.indexOf(tile);
        openAt(idx);
      });
    });

    lightbox.querySelector(".lightbox-close").addEventListener("click", () => {
      lightbox.classList.remove("open");
    });
    lightbox.querySelector(".lightbox-prev")?.addEventListener("click", () => openAt(current - 1));
    lightbox.querySelector(".lightbox-next")?.addEventListener("click", () => openAt(current + 1));
    lightbox.addEventListener("click", (e) => {
      if (e.target === lightbox) lightbox.classList.remove("open");
    });
    document.addEventListener("keydown", (e) => {
      if (!lightbox.classList.contains("open")) return;
      if (e.key === "Escape") lightbox.classList.remove("open");
      if (e.key === "ArrowRight") openAt(current + 1);
      if (e.key === "ArrowLeft") openAt(current - 1);
    });
  }

  /* ---------- Contact form -> WhatsApp ---------- */
  const contactForm = document.querySelector("#contact-form");
  if (contactForm) {
    contactForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const name = contactForm.querySelector("#c-name").value.trim();
      const phone = contactForm.querySelector("#c-phone").value.trim();
      const service = contactForm.querySelector("#c-service").value;
      const message = contactForm.querySelector("#c-message").value.trim();

      const lines = [
        "طلب تواصل جديد من الموقع:",
        `الاسم: ${name}`,
        `الجوال: ${phone}`,
        `الخدمة المطلوبة: ${service}`,
        message ? `التفاصيل: ${message}` : null
      ].filter(Boolean);

      const text = encodeURIComponent(lines.join("\n"));
      const successBox = document.querySelector(".form-success");
      if (successBox) successBox.classList.add("show");

      window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${text}`, "_blank");
      contactForm.reset();
    });
  }
});

document.addEventListener('DOMContentLoaded', function () {
  document.querySelectorAll('.service-image .sub-img').forEach(function (img) {
    img.addEventListener('click', function (e) {
      e.stopPropagation();
      document.querySelectorAll('.service-image .sub-img.expanded').forEach(function (other) {
        if (other !== img) other.classList.remove('expanded');
      });
      img.classList.toggle('expanded');
    });
  });
});