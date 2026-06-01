/* global React, ObsidianGraph */

/* ============================================================
   Hero — three variants:
   - "graph"  : node-graph backdrop (default)
   - "type"   : oversized type only, hairline-rule scaffolding
   - "ticker" : a coordinate / status ticker fills the right side
   ============================================================ */

function Hero({ variant = "graph", accent }) {
  return (
    <section id="top" style={{
      position: "relative",
      height: "100svh",
      minHeight: 600,
      background: "var(--ovlk-bg, #0a2230)",
      color: "#fff",
      overflow: "hidden",
    }}>
      {variant === "graph" && (
        <>
          <div className="ovlk-hero-graph" style={{ position: "absolute", inset: 0, opacity: 0.92 }}>
            <ObsidianGraph />
          </div>
          <div style={{
            position: "absolute", inset: 0, pointerEvents: "none",
            background:
              "radial-gradient(ellipse 70% 60% at 22% 38%, var(--ovlk-bg, #0a2230) 0%, var(--ovlk-bg-55, rgba(10,34,48,0.55)) 45%, transparent 80%)",
          }} />
          <div style={{
            position: "absolute", left: 0, right: 0, bottom: 0, height: 160,
            pointerEvents: "none",
            background: "linear-gradient(to bottom, transparent 0%, var(--ovlk-bg, #0a2230) 100%)",
          }} />
        </>
      )}

      {variant === "type-only" && <TypeOnlyBackdrop accent={accent} />}
      {variant === "ticker" && <TickerBackdrop accent={accent} />}

      <div className="ovlk-hero-inner" style={{
        position: "relative", zIndex: 2,
        padding: "108px 36px 44px",
        display: "flex", flexDirection: "column", justifyContent: "space-between",
        height: "100%",
        maxWidth: "90rem", margin: "0 auto",
        pointerEvents: "none",
      }}>
        <style>{`.hero-pe-on { pointer-events: auto; }`}</style>

        {/* Eyebrow */}
        <div className="hero-pe-on reveal" style={{
          display: "flex", alignItems: "center",
          fontFamily: "'Geist Mono', ui-monospace, monospace",
          fontSize: 11.5, letterSpacing: "0.22em", textTransform: "uppercase",
          color: "rgba(255,255,255,0.55)", fontWeight: 500,
        }}>
          <span>00</span>
          <span style={{ margin: "0 18px", color: "rgba(255,255,255,0.32)" }}>//</span>
          <span>New studio · 2026</span>
          <span style={{ margin: "0 18px", color: "rgba(255,255,255,0.32)" }}>//</span>
          <span style={{ color: accent }}>Taking on projects</span>
        </div>

        {/* Headline */}
        <div className="hero-pe-on reveal" style={{ paddingTop: 32, paddingBottom: 32, maxWidth: "1100px" }}>
          <h1 style={{
            fontFamily: "'Geist', 'Helvetica Neue', Helvetica, Arial, sans-serif",
            fontWeight: 500,
            fontSize: "clamp(2.75rem, 7vw, 6.75rem)",
            lineHeight: 0.95,
            letterSpacing: "-0.05em",
            color: "#fff",
            margin: 0,
            textWrap: "balance",
          }}>
            Practical software,<br/>
            <span style={{ color: "rgba(255,255,255,0.42)" }}>shaped to fit.</span>
          </h1>

          <p style={{
            marginTop: 28, maxWidth: "38rem",
            fontFamily: "'Geist', ui-sans-serif, system-ui, sans-serif",
            fontWeight: 400, fontSize: 16.5, lineHeight: 1.6,
            letterSpacing: "-0.005em",
            color: "rgba(255,255,255,0.68)",
          }}>
            OVLK Tech builds custom websites, dashboards, internal tools and the automation
            that ties them together — for business owners who want software that fits their
            operation, not the other way around.
          </p>
        </div>

        {/* Bottom rule + legend */}
        <div className="hero-pe-on reveal">
          <div style={{ height: 1, background: "rgba(255,255,255,0.10)" }} />
          <div className="ovlk-hero-legend" style={{
            display: "grid", gridTemplateColumns: "1fr 1fr 1fr 1fr",
            gap: 36, paddingTop: 18,
          }}>
            {[
              ["Websites",   "#6db09a"],
              ["Applications","#6b8aae"],
              ["Automation", "#b0747a"],
              ["Infrastructure","#8e7eaa"],
            ].map(([l, c]) => (
              <span key={l} style={{
                display: "inline-flex", alignItems: "center", gap: 10,
                fontFamily: "'Geist Mono', ui-monospace, monospace",
                fontSize: 10.5, letterSpacing: "0.22em",
                textTransform: "uppercase", color: "rgba(255,255,255,0.6)",
              }}>
                <span style={{
                  width: 7, height: 7, borderRadius: "50%", background: c,
                  boxShadow: `0 0 8px ${c}66`,
                }} />
                {l}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------- variant: type-only ---------- */
function TypeOnlyBackdrop({ accent }) {
  return (
    <>
      {/* Hairline scaffolding: vertical + horizontal grid rules */}
      <div style={{
        position: "absolute", inset: 0, pointerEvents: "none",
        display: "grid", gridTemplateColumns: "repeat(6, 1fr)",
      }}>
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} style={{
            borderLeft: i === 0 ? "none" : "1px solid rgba(255,255,255,0.04)",
          }} />
        ))}
      </div>
      {/* huge ghost OVLK */}
      <div style={{
        position: "absolute", right: -40, bottom: -120,
        fontFamily: "'Geist', sans-serif", fontWeight: 700,
        fontSize: "min(60vw, 900px)", lineHeight: 1,
        color: "rgba(255,255,255,0.025)", letterSpacing: "-0.06em",
        pointerEvents: "none", userSelect: "none",
      }}>OVLK</div>
      {/* soft accent halo */}
      <div style={{
        position: "absolute", left: "60%", top: "30%",
        width: 600, height: 600, borderRadius: "50%",
        background: `radial-gradient(circle, ${accent}26, transparent 65%)`,
        filter: "blur(40px)", pointerEvents: "none",
      }} />
    </>
  );
}

/* ---------- variant: lat/long ticker ---------- */
function TickerBackdrop({ accent }) {
  const [time, setTime] = React.useState(new Date());
  React.useEffect(() => {
    const id = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(id);
  }, []);
  const monoStyle = {
    fontFamily: "'Geist Mono', ui-monospace, monospace",
    fontSize: 11, letterSpacing: "0.22em", textTransform: "uppercase",
    color: "rgba(255,255,255,0.55)",
  };
  const rows = [
    ["34.2746° N", "Lat"],
    ["119.2290° W", "Lon"],
    ["8m ASL", "Elev"],
    [time.toLocaleTimeString("en-US", { hour12: false, timeZone: "America/Los_Angeles" }), "PT"],
    ["v0.1", "Build"],
    ["Sunset 7:42 PM", "Local"],
    ["NW 9kt", "Wind"],
    ["62°F", "Air"],
    ["64°F", "Sea"],
    ["8s", "Swell"],
  ];
  return (
    <div style={{
      position: "absolute", inset: 0,
      display: "grid", gridTemplateColumns: "1fr 1fr",
      pointerEvents: "none",
    }}>
      <div />
      <div style={{
        borderLeft: "1px solid rgba(255,255,255,0.06)",
        padding: "144px 48px 96px",
        display: "flex", flexDirection: "column", justifyContent: "flex-end",
        gap: 18,
      }}>
        {rows.map(([v, l], i) => (
          <div key={i} style={{
            display: "grid", gridTemplateColumns: "50px 1fr auto", alignItems: "baseline",
            paddingBottom: 16, borderBottom: "1px solid rgba(255,255,255,0.05)",
          }}>
            <span style={{ ...monoStyle, color: "rgba(255,255,255,0.35)" }}>{String(i + 1).padStart(2, "0")}</span>
            <span style={{ ...monoStyle }}>{l}</span>
            <span style={{
              fontFamily: "'Geist Mono', ui-monospace, monospace",
              fontSize: 14, color: i === 3 ? accent : "rgba(255,255,255,0.85)",
              fontVariantNumeric: "tabular-nums",
            }}>{v}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

window.Hero = Hero;
