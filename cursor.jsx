/* global React */

/* ============================================================
   CursorFollow — soft accent halo that follows the cursor with lag.
   Hidden when reduced motion is preferred or on touch devices.
   Two layers: a tight inner dot, a wide diffused halo with more lag.
   ============================================================ */

function CursorFollow({ accent, enabled = true }) {
  const dotRef  = React.useRef(null);
  const haloRef = React.useRef(null);

  React.useEffect(() => {
    if (!enabled) return;
    if (window.matchMedia && window.matchMedia("(pointer: coarse)").matches) return;
    if (window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let mx = window.innerWidth / 2, my = window.innerHeight / 2;
    let dx = mx, dy = my; // dot
    let hx = mx, hy = my; // halo
    let visible = false;
    let raf;

    function move(e) {
      mx = e.clientX; my = e.clientY;
      if (!visible) {
        visible = true;
        if (dotRef.current)  dotRef.current.style.opacity  = "1";
        if (haloRef.current) haloRef.current.style.opacity = "1";
      }
    }
    function leave() {
      visible = false;
      if (dotRef.current)  dotRef.current.style.opacity  = "0";
      if (haloRef.current) haloRef.current.style.opacity = "0";
    }

    window.addEventListener("mousemove", move);
    window.addEventListener("mouseleave", leave);
    document.addEventListener("mouseleave", leave);

    function tick() {
      dx += (mx - dx) * 0.30;
      dy += (my - dy) * 0.30;
      hx += (mx - hx) * 0.10;
      hy += (my - hy) * 0.10;
      if (dotRef.current)  dotRef.current.style.transform  = `translate3d(${dx - 4}px, ${dy - 4}px, 0)`;
      if (haloRef.current) haloRef.current.style.transform = `translate3d(${hx - 160}px, ${hy - 160}px, 0)`;
      raf = requestAnimationFrame(tick);
    }
    raf = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("mousemove", move);
      window.removeEventListener("mouseleave", leave);
      document.removeEventListener("mouseleave", leave);
    };
  }, [enabled, accent]);

  if (!enabled) return null;

  return (
    <>
      <div ref={haloRef} aria-hidden="true" style={{
        position: "fixed", top: 0, left: 0,
        width: 320, height: 320, borderRadius: "50%",
        background: `radial-gradient(circle, ${accent}28, transparent 65%)`,
        pointerEvents: "none", zIndex: 9998,
        opacity: 0, transition: "opacity 300ms ease",
        mixBlendMode: "screen",
        willChange: "transform",
      }} />
      <div ref={dotRef} aria-hidden="true" style={{
        position: "fixed", top: 0, left: 0,
        width: 8, height: 8, borderRadius: "50%",
        background: "#fff",
        pointerEvents: "none", zIndex: 9999,
        opacity: 0, transition: "opacity 200ms ease",
        boxShadow: `0 0 12px ${accent}cc`,
        willChange: "transform",
      }} />
    </>
  );
}

/* ============================================================
   useScrollReveal — adds .is-in to .reveal elements on intersect.
   Used by Hero, SectionHeaders, lists, etc.
   ============================================================ */

function useScrollReveal() {
  React.useEffect(() => {
    if (window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      document.querySelectorAll(".reveal").forEach((el) => el.classList.add("is-in"));
      return;
    }
    const obs = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          e.target.classList.add("is-in");
          obs.unobserve(e.target);
        }
      });
    }, { rootMargin: "0px 0px -10% 0px", threshold: 0.05 });

    const els = document.querySelectorAll(".reveal");
    els.forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  }, []);
}

Object.assign(window, { CursorFollow, useScrollReveal });
