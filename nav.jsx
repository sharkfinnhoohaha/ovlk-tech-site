/* global React */

/* ============================================================
   Nav — fixed top bar.
   Matches the design system reference: three-column grid,
   mark + mono nav + CTA. Background turns translucent on scroll.
   Active section is auto-tracked via IntersectionObserver.
   ============================================================ */

function Nav({ accent, sectionsOn }) {
  const allItems = [
    { id: "studio",   label: "Approach" },
    { id: "services", label: "What we build" },
    { id: "process",  label: "Process" },
    { id: "work",     label: "Work" },
    { id: "contact",  label: "Contact" },
  ];
  const items = allItems.filter(it => sectionsOn[it.id] !== false);

  const [scrolled, setScrolled] = React.useState(false);
  const [active, setActive] = React.useState(null);

  React.useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  React.useEffect(() => {
    const obs = new IntersectionObserver((entries) => {
      // Pick the entry highest on screen that's intersecting
      const visible = entries.filter(e => e.isIntersecting)
        .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
      if (visible[0]) setActive(visible[0].target.id);
    }, { rootMargin: "-40% 0px -55% 0px", threshold: 0 });

    items.forEach((it) => {
      const el = document.getElementById(it.id);
      if (el) obs.observe(el);
    });
    return () => obs.disconnect();
  }, [items.map(i => i.id).join(",")]);

  const monoStyle = {
    fontFamily: "'Geist Mono', ui-monospace, monospace",
    fontSize: 11.5, fontWeight: 500,
    letterSpacing: "0.18em", textTransform: "uppercase",
    textDecoration: "none",
  };

  function scrollTo(e, id) {
    e.preventDefault();
    const el = document.getElementById(id);
    if (el) {
      const top = el.getBoundingClientRect().top + window.scrollY - 12;
      if (window.smoothScrollTo) window.smoothScrollTo(top);
      else window.scrollTo({ top, behavior: "smooth" });
    }
  }

  return (
    <header style={{
      position: "fixed", top: 0, left: 0, right: 0, zIndex: 50,
      background: scrolled ? "rgba(255,255,255,0.025)" : "transparent",
      backdropFilter: scrolled ? "blur(22px) saturate(120%)" : "none",
      WebkitBackdropFilter: scrolled ? "blur(22px) saturate(120%)" : "none",
      borderBottom: scrolled ? "1px solid rgba(255,255,255,0.05)" : "1px solid transparent",
      transition: "background 320ms var(--apple-ease, ease), border-color 320ms var(--apple-ease, ease), backdrop-filter 320ms var(--apple-ease, ease)",
    }}>
      <nav style={{
        display: "grid",
        gridTemplateColumns: "1fr auto 1fr",
        alignItems: "center",
        height: 68, padding: "0 36px",
        maxWidth: "90rem", margin: "0 auto",
      }}>
        {/* MARK */}
        <a href="#top" onClick={(e) => scrollTo(e, "top")} style={{
          ...monoStyle,
          color: "#fff",
          display: "inline-flex", alignItems: "center", gap: 12,
          whiteSpace: "nowrap", justifySelf: "start",
        }}>
          <svg width="14" height="14" viewBox="0 0 14 14" style={{ display: "block" }}>
            <rect
              x="2.5" y="2.5" width="9" height="9"
              transform="rotate(45 7 7)"
              fill="none" stroke="currentColor" strokeWidth="1"
            />
          </svg>
          <span>OVLK</span>
          <span style={{ color: "rgba(255,255,255,0.32)", margin: "0 -2px" }}>/</span>
          <span>TECH</span>
        </a>

        {/* SECTION NAV */}
        <ul style={{
          display: "flex", gap: 32, listStyle: "none", margin: 0, padding: 0,
          justifyContent: "center", alignItems: "center",
          justifySelf: "center",
        }}>
          {items.map((it) => {
            const isActive = it.id === active;
            return (
              <li key={it.id} style={{
                display: "inline-flex", alignItems: "center", gap: 8,
              }}>
                <a href={`#${it.id}`} onClick={(e) => scrollTo(e, it.id)}
                  className={"ovlk-link-sweep" + (isActive ? " is-active" : "")}
                  style={{
                    ...monoStyle,
                    /* override the sweep's default muted color so the
                       eyebrow tracking + uppercase reads correctly */
                    color: isActive ? "#fff" : "rgba(255,255,255,0.62)",
                  }}
                >{it.label}</a>
                {isActive && (
                  <span style={{
                    width: 6, height: 6, borderRadius: "50%",
                    background: accent,
                    display: "inline-block",
                    boxShadow: `0 0 12px ${accent}88`,
                    animation: "ovlk-chip-pop 320ms var(--ovlk-spring) both",
                  }} />
                )}
              </li>
            );
          })}
        </ul>

        {/* CTA — haptic tactile button, mirrors the design system
            tactile-btn-dark pattern. Cream pill, mint accent aside
            with a stacked-arrow flyout on hover. */}
        <div style={{ justifySelf: "end" }}>
          <a href="#contact" onClick={(e) => scrollTo(e, "contact")}
             className="ovlk-btn-primary"
             style={{ whiteSpace: "nowrap" }}>
            <span className="ovlk-btn-label">Start a project</span>
            <span className="ovlk-btn-aside" aria-hidden="true">
              <svg viewBox="0 0 12 12" className="ovlk-btn-arrow is-outgoing"
                   xmlns="http://www.w3.org/2000/svg" fill="none">
                <path d="M8.91 9.09L9 3L2.91 3.09L2.90 4.32L6.86 4.25L2.56 8.56L3.44 9.44L7.75 5.14L7.69 9.11L8.91 9.09Z" fill="currentColor"/>
              </svg>
              <svg viewBox="0 0 12 12" className="ovlk-btn-arrow is-incoming"
                   xmlns="http://www.w3.org/2000/svg" fill="none">
                <path d="M8.91 9.09L9 3L2.91 3.09L2.90 4.32L6.86 4.25L2.56 8.56L3.44 9.44L7.75 5.14L7.69 9.11L8.91 9.09Z" fill="currentColor"/>
              </svg>
            </span>
          </a>
        </div>
      </nav>
    </header>
  );
}

window.Nav = Nav;
