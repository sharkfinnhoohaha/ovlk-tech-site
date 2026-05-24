/* ============================================================
   Flow — page-flow helpers
   - smoothScrollTo(targetY, duration?) : Apple-style scroll with
     cubic-out easing, used by nav + footer anchors
   - Hero parallax: scrolling past the hero translates + fades the
     copy and gently scales the graph; gives the page momentum
   ============================================================ */
(function () {
  // ---- Custom smooth scroll ----
  function ease(t) {
    // ease-out-quart — matches the global --apple-ease feel
    return 1 - Math.pow(1 - t, 4);
  }

  let scrollRaf = null;
  function smoothScrollTo(targetY, duration = 850) {
    if (scrollRaf) cancelAnimationFrame(scrollRaf);
    const startY = window.scrollY || window.pageYOffset;
    const dy = targetY - startY;
    if (Math.abs(dy) < 2) return;
    if (window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      window.scrollTo(0, targetY);
      return;
    }
    const start = performance.now();
    function step(now) {
      const t = Math.min(1, (now - start) / duration);
      window.scrollTo(0, startY + dy * ease(t));
      if (t < 1) scrollRaf = requestAnimationFrame(step);
      else scrollRaf = null;
    }
    scrollRaf = requestAnimationFrame(step);
  }
  // Any user wheel / keyboard scroll interrupts the smooth ride
  ["wheel", "touchstart", "keydown"].forEach((evt) => {
    window.addEventListener(evt, () => {
      if (scrollRaf) { cancelAnimationFrame(scrollRaf); scrollRaf = null; }
    }, { passive: true });
  });
  window.smoothScrollTo = smoothScrollTo;

  // Intercept all in-page anchor clicks so footer + form + nav all flow
  document.addEventListener("click", (e) => {
    const a = e.target.closest && e.target.closest("a[href^='#']");
    if (!a) return;
    const href = a.getAttribute("href");
    if (!href || href === "#" || href.length < 2) return;
    const id = href.slice(1);
    const el = document.getElementById(id);
    if (!el) return;
    e.preventDefault();
    const top = el.getBoundingClientRect().top + (window.scrollY || window.pageYOffset) - 12;
    smoothScrollTo(top);
  });

  // ---- Hero parallax / progressive fade ----
  // Translates hero copy up and fades it as you scroll past — gives the page
  // a sense of momentum without scroll-jacking.
  function installHeroParallax() {
    const hero = document.getElementById("top");
    if (!hero) return;
    const copyEls = hero.querySelectorAll(".hero-pe-on");
    if (!copyEls.length) return;
    if (window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let ticking = false;
    function update() {
      const y = window.scrollY || window.pageYOffset;
      const h = hero.getBoundingClientRect().height || window.innerHeight;
      // 0 at top, 1 when scrolled one hero height
      const t = Math.min(1, Math.max(0, y / h));
      // Ease-out — fades quickly at first then settles
      const fade = 1 - Math.pow(t, 1.4);
      copyEls.forEach((el, i) => {
        // Different elements drift at slightly different rates
        const speed = 0.20 + i * 0.06;
        el.style.transform = `translate3d(0, ${-y * speed}px, 0)`;
        el.style.opacity = String(Math.max(0, fade));
        el.style.willChange = "transform, opacity";
      });
      ticking = false;
    }
    function onScroll() {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(update);
      }
    }
    window.addEventListener("scroll", onScroll, { passive: true });
    update();
  }
  // Install after first paint so the hero is mounted
  if (document.readyState === "complete" || document.readyState === "interactive") {
    setTimeout(installHeroParallax, 80);
  } else {
    window.addEventListener("DOMContentLoaded", () => setTimeout(installHeroParallax, 80));
  }
})();
