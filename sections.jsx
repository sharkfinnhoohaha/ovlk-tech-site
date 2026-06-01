/* global React */

/* ============================================================
   Sections: Studio · What we build · Process · Selected work
   ============================================================ */

const META = {
  fontFamily: "'Geist Mono', ui-monospace, monospace",
  fontSize: 11, fontWeight: 500,
  letterSpacing: "0.18em", textTransform: "uppercase",
};
const META_SM = { ...META, fontSize: 10, letterSpacing: "0.22em", fontWeight: 400 };

const RULE = "1px solid rgba(255,255,255,0.10)";
const TEXT      = "#fff";
const TEXT_SOFT = "rgba(255,255,255,0.78)";
const TEXT_MUTE = "rgba(255,255,255,0.55)";
const TEXT_DEEP = "rgba(255,255,255,0.35)";

function SectionHeader({ idx, label, title, deck, accent }) {
  return (
    <header className="reveal" style={{
      paddingBottom: 36, borderBottom: RULE,
    }}>
      <div style={{ marginBottom: 32 }}>
        <span style={{
          ...META, color: TEXT_MUTE,
          display: "inline-flex", alignItems: "center", gap: 14,
        }}>
          <span style={{ color: accent }}>{idx}</span>
          <span style={{ color: TEXT_DEEP }}>//</span>
          <span>{label}</span>
        </span>
      </div>
      <div>
        <h2 style={{
          fontFamily: "'Geist', ui-sans-serif, system-ui, sans-serif",
          fontWeight: 500, fontSize: "clamp(2.25rem, 5.6vw, 4.5rem)",
          lineHeight: 1.02, letterSpacing: "-0.045em",
          color: TEXT, margin: 0, maxWidth: "22ch",
        }}>{title}</h2>
        {deck && (
          <p style={{
            marginTop: 24, maxWidth: "40rem",
            fontFamily: "'Geist', ui-sans-serif, system-ui, sans-serif",
            fontWeight: 400, fontSize: 16.5, lineHeight: 1.6,
            color: TEXT_SOFT, letterSpacing: "-0.005em",
          }}>{deck}</p>
        )}
      </div>
    </header>
  );
}

function pad(density, calm, compact) { return density === "compact" ? compact : calm; }

// Section padding scale by density — calm = generous, compact = tight
const PY_CALM    = 180;
const PY_COMPACT = 96;

/* ---------- Studio / Approach ---------- */
function IntroBlock({ density, accent }) {
  const py = pad(density, PY_CALM, PY_COMPACT);
  return (
    <section id="studio" className="ovlk-section" data-screen-label="Approach" style={{ padding: `${py}px 0` }}>
      <div className="ovlk-pad" style={{ maxWidth: "82rem", margin: "0 auto", padding: "0 36px" }}>
        <SectionHeader
          idx="01" label="Approach" accent={accent}
          title="A studio of one, shaped to your project."
          deck="OVLK Tech is new — by design. Every engagement starts with a conversation, not a package. We listen for the actual problem, then build the smallest durable thing that solves it."
        />

        <div className="reveal ovlk-cols-2" style={{
          marginTop: 64,
          display: "grid", gridTemplateColumns: "1fr 1fr", gap: 96,
        }}>
          <div>
            <p style={{
              fontFamily: "'Geist', ui-sans-serif, system-ui, sans-serif",
              fontSize: 16.5, lineHeight: 1.6, letterSpacing: "-0.005em",
              color: TEXT_SOFT, margin: 0,
            }}>
              No tiers. No packages. No "starter / pro / enterprise". The shape of the work
              comes from your business — its scale, its operations, the people who'll use
              what we build.
            </p>
          </div>
          <div>
            <p style={{
              fontFamily: "'Geist', ui-sans-serif, system-ui, sans-serif",
              fontSize: 16.5, lineHeight: 1.6, letterSpacing: "-0.005em",
              color: TEXT_SOFT, margin: 0,
            }}>
              Pragmatic stack — TypeScript, Next.js, modern infrastructure. Built so your
              team can run it without us. We bill by the week, and we hand off cleanly.
            </p>
          </div>
        </div>

        {/* 3 stat-style facts */}
        <div className="reveal ovlk-cols-3" style={{
          marginTop: 96,
          display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 0,
          borderTop: RULE,
        }}>
          {[
            ["01", "Built around you", "A small studio means we shape scope, cadence and pace to your team — not a fixed playbook."],
            ["02", "Weekly billing", "Pause, scale up, scale down. No retainers, no contracts."],
            ["03", "Clean handoff", "Documentation, ownership, and the keys. Your code, your call."],
          ].map(([n, h, p], i) => (
            <div key={n} className="ovlk-stat-cell" style={{
              padding: i === 0 ? "48px 40px 40px 0" : "48px 40px 40px 40px",
              borderRight: i < 2 ? RULE : "none",
            }}>
              <span style={{ ...META_SM, color: accent }}>{n}</span>
              <h4 style={{
                marginTop: 18,
                fontFamily: "'Geist', ui-sans-serif, system-ui, sans-serif",
                fontWeight: 500, fontSize: 20,
                letterSpacing: "-0.025em", color: TEXT, margin: "18px 0 0",
              }}>{h}</h4>
              <p style={{
                marginTop: 14, fontFamily: "'Geist', ui-sans-serif, system-ui, sans-serif",
                fontSize: 14, lineHeight: 1.6, letterSpacing: "-0.003em",
                color: TEXT_MUTE,
              }}>{p}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------- What we build (with three styles) ---------- */
const SERVICES = [
  { idx: "01", title: "Websites & marketing sites",
    summary: "Fast, hand-built marketing sites and editorial platforms. Real CMS, real SEO, real load times. The site you can actually update.",
    color: "#6db09a", tag: "Websites",
    examples: ["Marketing & brand sites", "E-commerce", "Editorial / blog", "Booking & scheduling"] },
  { idx: "02", title: "Web applications & dashboards",
    summary: "Internal tools and customer-facing apps that replace spreadsheets and shared docs. Built around how your team actually works.",
    color: "#6b8aae", tag: "Applications",
    examples: ["Admin dashboards", "Customer portals", "Reporting & analytics", "Inventory & ops"] },
  { idx: "03", title: "Automation & pipelines",
    summary: "Data pipelines, integrations, scheduled jobs. The plumbing that ties your tools together so nothing falls through the cracks.",
    color: "#b0747a", tag: "Automation",
    examples: ["API integrations", "ETL & data sync", "Scheduled jobs", "Webhooks & alerts"] },
  { idx: "04", title: "Infrastructure & hosting",
    summary: "Hosting, deploys, monitoring, backups. Quiet infrastructure that doesn't fight you and doesn't wake anyone up.",
    color: "#8e7eaa", tag: "Infrastructure",
    examples: ["Vercel & Cloudflare", "Supabase & databases", "CI/CD", "Monitoring & backups"] },
];

function ServicesGrid({ style: variant = "list", density, accent }) {
  const py = pad(density, PY_CALM, PY_COMPACT);
  return (
    <section id="services" className="ovlk-section" data-screen-label="What we build" style={{ padding: `${py}px 0` }}>
      <div className="ovlk-pad" style={{ maxWidth: "82rem", margin: "0 auto", padding: "0 36px" }}>
        <SectionHeader
          idx="02" label="What we build" accent={accent}
          title="Four shapes the work usually takes."
          deck="Most projects look like one of these — or some mix of them. The point isn't the category, it's that we've shipped enough of each to know where the rocks are."
        />

        {variant === "list" && <ServicesList accent={accent} />}
        {variant === "cards" && <ServicesCards accent={accent} />}
        {variant === "numbered" && <ServicesNumbered accent={accent} />}
      </div>
    </section>
  );
}

function ServicesList({ accent }) {
  const [hoverIdx, setHoverIdx] = React.useState(null);
  return (
    <ul className="reveal" style={{ listStyle: "none", padding: 0, margin: "56px 0 0" }}
        onMouseLeave={() => setHoverIdx(null)}>
      {SERVICES.map((s, i) => {
        const isHover = hoverIdx === i;
        const isDim   = hoverIdx !== null && hoverIdx !== i;
        return (
          <li key={s.idx}
              className="ovlk-service-row"
              onMouseEnter={() => setHoverIdx(i)}
              style={{
                display: "grid",
                gridTemplateColumns: "80px 1fr auto",
                gap: 32, alignItems: "baseline",
                padding: "32px 0",
                paddingLeft: isHover ? 16 : 0,
                borderBottom: RULE,
                transition: "padding 280ms var(--ease-out-quart), opacity 280ms ease",
                opacity: isDim ? 0.38 : 1,
                cursor: "pointer",
              }}>
            <span style={{
              ...META, color: isHover ? s.color : TEXT_DEEP,
              display: "inline-flex", alignItems: "center", gap: 8,
              transition: "color 200ms ease",
            }}>
              <span style={{
                width: 6, height: 6, borderRadius: "50%",
                background: s.color, opacity: isHover ? 1 : 0.6,
              }} />
              {s.idx}
            </span>
            <div>
              <h3 style={{
                fontFamily: "'Geist', ui-sans-serif, system-ui, sans-serif",
                fontWeight: 500, fontSize: "clamp(1.45rem, 2.1vw, 1.95rem)",
                lineHeight: 1.15, letterSpacing: "-0.025em",
                color: TEXT, margin: 0,
              }}>{s.title}</h3>
              <p style={{
                marginTop: 12, maxWidth: "44rem",
                fontFamily: "'Geist', ui-sans-serif, system-ui, sans-serif",
                fontSize: 15.5, lineHeight: 1.6, color: TEXT_SOFT,
              }}>{s.summary}</p>
              {/* Examples reveal on hover (always shown on touch via CSS) */}
              <div className="ovlk-service-examples" style={{
                marginTop: 16,
                maxHeight: isHover ? 36 : 0, opacity: isHover ? 1 : 0,
                overflow: "hidden",
                transition: "max-height 360ms var(--ease-out-quart), opacity 240ms ease",
                display: "flex", gap: 8, flexWrap: "wrap",
              }}>
                {s.examples.map((ex) => (
                  <span key={ex} style={{
                    ...META_SM, color: TEXT_MUTE,
                    padding: "6px 10px",
                    border: "1px solid rgba(255,255,255,0.12)",
                  }}>{ex}</span>
                ))}
              </div>
            </div>
            <span className="ovlk-service-arrow" style={{
              fontFamily: "'Geist Mono', ui-monospace, monospace",
              fontSize: 18, color: isHover ? TEXT : TEXT_DEEP,
              transform: isHover ? "translate(8px, -2px)" : "none",
              transition: "transform 280ms var(--ease-out-quart), color 200ms ease",
            }}>↗</span>
          </li>
        );
      })}
    </ul>
  );
}

function ServicesCards({ accent }) {
  return (
    <div className="reveal ovlk-cols-2" style={{
      marginTop: 56,
      display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24,
    }}>
      {SERVICES.map((s) => (
        <div key={s.idx} style={{
          padding: 32, border: RULE,
          background: "rgba(255,255,255,0.015)",
          display: "flex", flexDirection: "column", gap: 16,
          transition: "background 240ms ease, border-color 240ms ease",
          cursor: "pointer",
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.background = "rgba(255,255,255,0.04)";
          e.currentTarget.style.borderColor = "rgba(255,255,255,0.20)";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.background = "rgba(255,255,255,0.015)";
          e.currentTarget.style.borderColor = "rgba(255,255,255,0.10)";
        }}
        >
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <span style={{
              ...META, color: s.color,
              display: "inline-flex", alignItems: "center", gap: 8,
            }}>
              <span style={{ width: 6, height: 6, borderRadius: "50%", background: s.color }} />
              {s.idx} · {s.tag}
            </span>
            <span style={{ ...META_SM, color: TEXT_DEEP }}>↗</span>
          </div>
          <h3 style={{
            fontFamily: "'Geist', sans-serif", fontWeight: 500,
            fontSize: 24, letterSpacing: "-0.02em", lineHeight: 1.2,
            color: TEXT, margin: 0,
          }}>{s.title}</h3>
          <p style={{
            fontFamily: "'Geist', sans-serif",
            fontSize: 14.5, lineHeight: 1.6, color: TEXT_SOFT, margin: 0,
          }}>{s.summary}</p>
          <div style={{ display: "flex", gap: 6, flexWrap: "wrap", marginTop: 8 }}>
            {s.examples.map((ex) => (
              <span key={ex} style={{
                ...META_SM, color: TEXT_MUTE,
                padding: "5px 8px",
                border: "1px solid rgba(255,255,255,0.10)",
              }}>{ex}</span>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

function ServicesNumbered({ accent }) {
  return (
    <div className="reveal" style={{ marginTop: 56 }}>
      {SERVICES.map((s) => (
        <div key={s.idx} className="ovlk-num-row" style={{
          display: "grid",
          gridTemplateColumns: "160px 1fr 1fr",
          gap: 48, alignItems: "start",
          padding: "48px 0",
          borderBottom: RULE,
        }}>
          <div>
            <div style={{
              fontFamily: "'Geist', sans-serif", fontWeight: 600,
              fontSize: 84, lineHeight: 0.9, letterSpacing: "-0.04em",
              color: s.color,
            }}>{s.idx}</div>
            <div style={{ ...META, color: TEXT_MUTE, marginTop: 12 }}>{s.tag}</div>
          </div>
          <div>
            <h3 style={{
              fontFamily: "'Geist', sans-serif", fontWeight: 500,
              fontSize: 28, letterSpacing: "-0.02em", lineHeight: 1.15,
              color: TEXT, margin: 0,
            }}>{s.title}</h3>
            <p style={{
              marginTop: 16,
              fontFamily: "'Geist', sans-serif",
              fontSize: 15.5, lineHeight: 1.6, color: TEXT_SOFT,
            }}>{s.summary}</p>
          </div>
          <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
            {s.examples.map((ex, i) => (
              <li key={ex} style={{
                padding: "10px 0",
                borderBottom: i < s.examples.length - 1 ? "1px solid rgba(255,255,255,0.06)" : "none",
                display: "flex", justifyContent: "space-between", alignItems: "center",
                fontFamily: "'Geist', sans-serif", fontSize: 14.5, color: TEXT_SOFT,
              }}>
                <span>{ex}</span>
                <span style={{ ...META_SM, color: TEXT_DEEP }}>{String(i + 1).padStart(2, "0")}</span>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}

/* ---------- Process ---------- */
function ProcessSection({ density, accent }) {
  const py = pad(density, PY_CALM, PY_COMPACT);
  const steps = [
    { n: "01", t: "Conversation",
      d: "A call, a coffee, an email thread — whatever works. We listen for the actual problem and what's already been tried.",
      meta: "Free · 30–60 min",
      tag: "Listen" },
    { n: "02", t: "Shape",
      d: "A short written shape — what we'd build, what we wouldn't, the timeline, the cost. You decide whether to proceed.",
      meta: "1 week · fixed price",
      tag: "Sketch" },
    { n: "03", t: "Build",
      d: "Weekly check-ins, live preview links, no rituals or theatre. You see the work as it happens. Scope adjusts when it should.",
      meta: "By the week · pause anytime",
      tag: "Ship" },
    { n: "04", t: "Hand-off",
      d: "Code in your repo, infrastructure in your accounts, docs your team can read. We're available for as long as you need us.",
      meta: "Yours to keep",
      tag: "Hand off" },
  ];
  const [active, setActive] = React.useState(0);
  const [hovering, setHovering] = React.useState(false);
  const stepRefs = React.useRef([]);

  // Auto-advance, pause on hover/focus
  React.useEffect(() => {
    if (hovering) return;
    const id = setInterval(() => setActive((a) => (a + 1) % steps.length), 5800);
    return () => clearInterval(id);
  }, [hovering, steps.length]);

  // Keyboard nav when section is focused / hovered
  React.useEffect(() => {
    function onKey(e) {
      if (!hovering) return;
      if (e.key === "ArrowDown" || e.key === "ArrowRight") {
        e.preventDefault();
        setActive((a) => (a + 1) % steps.length);
      } else if (e.key === "ArrowUp" || e.key === "ArrowLeft") {
        e.preventDefault();
        setActive((a) => (a - 1 + steps.length) % steps.length);
      }
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [hovering, steps.length]);

  // Indicator (active rail) position
  const railTop = active * 64 + 19; // matches step row height + offset

  return (
    <section id="process" className="ovlk-section" data-screen-label="Process" style={{ padding: `${py}px 0` }}
      onMouseEnter={() => setHovering(true)}
      onMouseLeave={() => setHovering(false)}>
      <div className="ovlk-pad" style={{ maxWidth: "82rem", margin: "0 auto", padding: "0 36px" }}>
        <SectionHeader
          idx="03" label="Process" accent={accent}
          title="How we work, in four steps."
          deck="No proposal-document theatre, no kickoff slides. The work starts the day you say go."
        />

        <div className="reveal ovlk-process-grid" style={{
          marginTop: 64,
          display: "grid", gridTemplateColumns: "1fr 1.15fr", gap: 80,
          alignItems: "start",
        }}>
          {/* LEFT — step list, tactile */}
          <div style={{ position: "relative" }}>
            {/* Vertical hairline */}
            <div style={{
              position: "absolute", left: 28, top: 0, bottom: 0,
              width: 1, background: "rgba(255,255,255,0.08)",
            }} />
            {/* Active rail — slides to active step */}
            <div style={{
              position: "absolute", left: 27, top: railTop,
              width: 3, height: 26,
              background: accent, boxShadow: `0 0 16px ${accent}88`,
              transition: "top 380ms var(--ease-out-quart), background 200ms ease",
            }} />

            <ol style={{ listStyle: "none", padding: 0, margin: 0 }}>
              {steps.map((s, i) => {
                const isActive = active === i;
                const isPast   = i < active;
                return (
                  <li key={s.n}
                      ref={(el) => (stepRefs.current[i] = el)}
                      onClick={() => setActive(i)}
                      onMouseEnter={() => setActive(i)}
                      role="button" tabIndex={0}
                      style={{
                        height: 64, display: "grid",
                        gridTemplateColumns: "60px 1fr",
                        gap: 24, alignItems: "center",
                        padding: "0 0 0 56px",
                        cursor: "pointer", userSelect: "none",
                        transition: "transform 280ms var(--apple-ease, ease)",
                        transform: isActive ? "translateX(6px)" : "translateX(0)",
                      }}>
                    <span style={{
                      ...META,
                      color: isActive ? accent : (isPast ? TEXT_MUTE : TEXT_DEEP),
                      transition: "color 280ms var(--apple-ease, ease)",
                    }}>{s.n}</span>
                    <span style={{
                      fontFamily: "'Geist', sans-serif",
                      fontWeight: isActive ? 500 : 400,
                      fontSize: isActive ? 22 : 19,
                      letterSpacing: "-0.022em",
                      color: isActive ? TEXT : (isPast ? TEXT_SOFT : TEXT_MUTE),
                      transition: "color 280ms var(--apple-ease, ease), font-size 320ms var(--apple-ease, ease)",
                    }}>{s.t}</span>
                  </li>
                );
              })}
            </ol>

            <div className="ovlk-process-hint" style={{
              marginTop: 36, paddingTop: 24, borderTop: RULE,
              display: "flex", gap: 24, alignItems: "center",
              ...META_SM, color: TEXT_DEEP,
            }}>
              <span>Auto-advances</span>
              <span>·</span>
              <span>Use ← →</span>
              <span>·</span>
              <span>Or hover any step</span>
            </div>
          </div>

          {/* RIGHT — animated visualization */}
          <div className="ovlk-process-stage" style={{
            position: "relative",
            border: RULE,
            background: "rgba(255,255,255,0.015)",
            padding: 36,
            minHeight: 460,
            display: "flex", flexDirection: "column",
          }}>
            {/* Step ticker */}
            <div style={{
              display: "flex", justifyContent: "space-between", alignItems: "center",
              paddingBottom: 28, borderBottom: RULE,
            }}>
              <span style={{
                ...META, color: accent,
                display: "inline-flex", alignItems: "center", gap: 12,
              }}>
                <span style={{
                  width: 8, height: 8, borderRadius: "50%", background: accent,
                  boxShadow: `0 0 12px ${accent}88`,
                }} />
                Step {steps[active].n}
              </span>
              <span style={{ ...META_SM, color: TEXT_DEEP }}>
                {String(active + 1).padStart(2, "0")} / {String(steps.length).padStart(2, "0")}
              </span>
            </div>

            {/* Animated visualization */}
            <div style={{
              flex: 1, position: "relative",
              margin: "32px -8px", minHeight: 220,
              overflow: "hidden",
            }}>
              <ProcessVisual step={active} accent={accent} />
            </div>

            {/* Step copy */}
            <div style={{ position: "relative" }}>
              <h3 key={`title-${active}`} className="process-fade-in" style={{
                fontFamily: "'Geist', sans-serif", fontWeight: 500,
                fontSize: "clamp(1.6rem, 2.5vw, 2.1rem)",
                letterSpacing: "-0.025em", lineHeight: 1.15,
                color: TEXT, margin: 0,
              }}>{steps[active].t}</h3>
              <p key={`body-${active}`} className="process-fade-in" style={{
                marginTop: 18, maxWidth: "32rem",
                fontFamily: "'Geist', sans-serif", fontSize: 16, lineHeight: 1.65,
                color: TEXT_SOFT, animationDelay: "60ms",
              }}>{steps[active].d}</p>

              <div style={{
                marginTop: 28, paddingTop: 20, borderTop: RULE,
                display: "flex", justifyContent: "space-between", alignItems: "center",
              }}>
                <span style={{ ...META_SM, color: TEXT_DEEP }}>{steps[active].meta}</span>
                <button onClick={() => setActive((a) => (a + 1) % steps.length)}
                  className="ovlk-btn-ghost"
                >
                  <span>{active < steps.length - 1 ? "Next step" : "Restart"}</span>
                  <span className="ovlk-btn-arrow-inline" aria-hidden="true">
                    {active < steps.length - 1 ? "→" : "↺"}
                  </span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* Animated SVG per step — one persistent scene that re-renders on step change */
function ProcessVisual({ step, accent }) {
  return (
    <div key={step} className="process-visual-frame" style={{
      position: "absolute", inset: 0,
      display: "flex", alignItems: "center", justifyContent: "center",
    }}>
      {step === 0 && <VisualConversation accent={accent} />}
      {step === 1 && <VisualShape accent={accent} />}
      {step === 2 && <VisualBuild accent={accent} />}
      {step === 3 && <VisualHandoff accent={accent} />}
    </div>
  );
}

function VisualConversation({ accent }) {
  // Two nodes + a flow of message lines crossing between them
  const stroke = "rgba(255,255,255,0.45)";
  return (
    <svg viewBox="0 0 480 220" style={{ width: "100%", height: "100%", maxHeight: 240 }}>
      <defs>
        <linearGradient id="msgGrad" x1="0" x2="1">
          <stop offset="0%" stopColor={accent} stopOpacity="0" />
          <stop offset="50%" stopColor={accent} stopOpacity="0.9" />
          <stop offset="100%" stopColor={accent} stopOpacity="0" />
        </linearGradient>
      </defs>
      {/* left node */}
      <g className="pv-pop" style={{ animationDelay: "0ms" }}>
        <circle cx="80" cy="110" r="22" fill="none" stroke={stroke} strokeWidth="1" />
        <circle cx="80" cy="110" r="6" fill={accent} />
        <text x="80" y="160" fill="rgba(255,255,255,0.55)" fontSize="10"
          fontFamily="'Geist Mono',monospace" letterSpacing="0.22em" textAnchor="middle">YOU</text>
      </g>
      {/* right node */}
      <g className="pv-pop" style={{ animationDelay: "120ms" }}>
        <circle cx="400" cy="110" r="22" fill="none" stroke={stroke} strokeWidth="1" />
        <circle cx="400" cy="110" r="6" fill="#fff" />
        <text x="400" y="160" fill="rgba(255,255,255,0.55)" fontSize="10"
          fontFamily="'Geist Mono',monospace" letterSpacing="0.22em" textAnchor="middle">OVLK</text>
      </g>
      {/* moving message lines */}
      {[0, 1, 2].map((i) => (
        <line key={i} x1="102" y1={88 + i * 22} x2="378" y2={88 + i * 22}
          stroke="url(#msgGrad)" strokeWidth="1.2"
          strokeDasharray="6 6"
          className="pv-msg" style={{ animationDelay: `${180 + i * 140}ms` }} />
      ))}
      {/* dots floating between */}
      {[0, 1, 2].map((i) => (
        <circle key={`d${i}`} cx="240" cy={88 + i * 22} r="2" fill={accent}
          className="pv-pulse" style={{ animationDelay: `${280 + i * 180}ms` }} />
      ))}
    </svg>
  );
}

function VisualShape({ accent }) {
  // A document outline being drawn line by line — sketch of a proposal
  const s = "rgba(255,255,255,0.45)";
  return (
    <svg viewBox="0 0 480 220" style={{ width: "100%", height: "100%", maxHeight: 240 }}>
      {/* Page frame */}
      <rect x="80" y="20" width="320" height="180" fill="none" stroke={s} strokeWidth="1"
        className="pv-draw-rect" />
      {/* Title rule */}
      <line x1="100" y1="48" x2="220" y2="48" stroke="#fff" strokeWidth="2"
        className="pv-draw-line" style={{ animationDelay: "120ms" }} />
      {/* body lines */}
      {[78, 96, 114, 132, 150].map((y, i) => (
        <line key={y} x1="100" y1={y} x2={100 + 200 - (i % 2) * 60} y2={y}
          stroke={s} strokeWidth="1"
          className="pv-draw-line" style={{ animationDelay: `${220 + i * 90}ms` }} />
      ))}
      {/* highlighted accent line — the "shape" being agreed */}
      <rect x="100" y="164" width="120" height="22" fill={`${accent}33`}
        stroke={accent} strokeWidth="1"
        className="pv-pop" style={{ animationDelay: "700ms" }} />
      {/* checkmark */}
      <g className="pv-pop" style={{ animationDelay: "880ms" }}>
        <circle cx="240" cy="175" r="11" fill={accent} />
        <polyline points="234,175 239,180 248,170" fill="none"
          stroke="var(--ovlk-bg, #0a2230)" strokeWidth="2"
          strokeLinecap="round" strokeLinejoin="round" />
      </g>
    </svg>
  );
}

function VisualBuild({ accent }) {
  // Module bars stacking + connecting lines being drawn
  return (
    <svg viewBox="0 0 480 220" style={{ width: "100%", height: "100%", maxHeight: 240 }}>
      {/* Build progress rail */}
      <line x1="40" y1="200" x2="440" y2="200" stroke="rgba(255,255,255,0.12)" strokeWidth="1" />
      <line x1="40" y1="200" x2="440" y2="200" stroke={accent} strokeWidth="2"
        className="pv-progress" />
      {/* Modules — bars rising up */}
      {[
        { x: 70,  w: 50, h: 80,  d: 0,    label: "auth" },
        { x: 130, w: 50, h: 130, d: 140,  label: "data" },
        { x: 190, w: 50, h: 100, d: 280,  label: "ui" },
        { x: 250, w: 50, h: 150, d: 420,  label: "api" },
        { x: 310, w: 50, h: 90,  d: 560,  label: "ci" },
        { x: 370, w: 50, h: 120, d: 700,  label: "deploy" },
      ].map((m) => (
        <g key={m.label}>
          <rect x={m.x} y={200 - m.h} width={m.w} height={m.h}
            fill={`${accent}1c`} stroke={accent} strokeWidth="1"
            className="pv-rise"
            style={{ animationDelay: `${m.d}ms`, transformOrigin: `${m.x + m.w/2}px 200px` }} />
          <text x={m.x + m.w/2} y={216} fill="rgba(255,255,255,0.55)"
            fontSize="9" fontFamily="'Geist Mono',monospace"
            letterSpacing="0.18em" textAnchor="middle"
            className="pv-fade-in" style={{ animationDelay: `${m.d + 200}ms` }}>{m.label}</text>
        </g>
      ))}
    </svg>
  );
}

function VisualHandoff({ accent }) {
  // Repository / key being handed from left to right
  const s = "rgba(255,255,255,0.4)";
  return (
    <svg viewBox="0 0 480 220" style={{ width: "100%", height: "100%", maxHeight: 240 }}>
      {/* OVLK box */}
      <rect x="40"  y="80" width="120" height="60" fill="none" stroke={s} strokeWidth="1" />
      <text x="100" y="115" fill="rgba(255,255,255,0.55)" fontSize="10"
        fontFamily="'Geist Mono',monospace" letterSpacing="0.22em" textAnchor="middle">OVLK</text>
      {/* You box */}
      <rect x="320" y="80" width="120" height="60" fill="none" stroke={accent} strokeWidth="1.2" />
      <text x="380" y="115" fill="#fff" fontSize="10"
        fontFamily="'Geist Mono',monospace" letterSpacing="0.22em" textAnchor="middle">YOU</text>
      {/* Connecting arrow */}
      <line x1="160" y1="110" x2="320" y2="110" stroke={accent} strokeWidth="1.2"
        strokeDasharray="4 4" className="pv-dash" />
      {/* Token moving along the line */}
      <g className="pv-travel">
        <rect x="-12" y="-8" width="24" height="16" fill={accent} />
        <text x="0" y="3" fill="var(--ovlk-bg,#0a2230)" fontSize="9"
          fontFamily="'Geist Mono',monospace" letterSpacing="0.2em" textAnchor="middle">KEY</text>
      </g>
      {/* artifact list under YOU */}
      {["code", "infra", "docs", "keys"].map((l, i) => (
        <text key={l} x="380" y={165 + i * 14}
          fill="rgba(255,255,255,0.6)" fontSize="10"
          fontFamily="'Geist Mono',monospace" letterSpacing="0.18em" textAnchor="middle"
          className="pv-fade-in" style={{ animationDelay: `${500 + i * 100}ms` }}>
          ✓ {l}
        </text>
      ))}
    </svg>
  );
}

/* ---------- Selected work ---------- */
function FeaturedWork({ density, accent }) {
  const py = pad(density, PY_CALM, PY_COMPACT);
  const cases = [
    { client: "North Coast Hospitality", year: 2026, status: "Active",
      title: "Operations dashboard for a hospitality group",
      summary: "Internal Next.js tooling replacing a spreadsheet sprawl across three properties — reservations, staffing, and nightly operations in one view.",
      tags: ["Web app", "Internal tool", "Supabase"],
      tone: "rgba(107,138,174,0.10)", color: "#6b8aae",
    },
    { client: "Bluffside Press", year: 2026, status: "Active",
      title: "Editorial platform for a coastal magazine",
      summary: "A Sanity-led editorial stack with a tight visual-editing surface for a six-person desk. Drafts to publish in one keystroke.",
      tags: ["Website", "Headless CMS", "Editorial"],
      tone: "rgba(109,176,154,0.10)", color: "#6db09a",
    },
    { client: "Pier and Point", year: 2025, status: "Shipped",
      title: "Booking & inventory for a beachside outfitter",
      summary: "A weekend booking flow plus inventory pipeline that syncs across Square, the website, and the staff iPad. No more double-bookings.",
      tags: ["E-commerce", "Automation", "Booking"],
      tone: "rgba(176,116,122,0.10)", color: "#b0747a",
    },
  ];

  return (
    <section id="work" className="ovlk-section" data-screen-label="Selected work" style={{ padding: `${py}px 0` }}>
      <div className="ovlk-pad" style={{ maxWidth: "82rem", margin: "0 auto", padding: "0 36px" }}>
        <SectionHeader
          idx="04" label="Selected work" accent={accent}
          title="A short list, on purpose."
          deck="OVLK Tech is new in 2026. These are the engagements currently running — recent and active rather than a long retrospective."
        />

        <div className="reveal" style={{ marginTop: 64 }}>
          {cases.map((c, i) => (
            <a key={c.title} href="#" onClick={(e) => e.preventDefault()}
               style={{ textDecoration: "none", color: "inherit", display: "block" }}>
              <div className="ovlk-case-row" style={{
                display: "grid",
                gridTemplateColumns: "1.2fr 1fr",
                gap: 56, alignItems: "center",
                padding: "56px 0",
                borderTop: i === 0 ? RULE : "none",
                borderBottom: RULE,
                transition: "padding 280ms var(--ease-out-quart)",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.querySelector(".case-arrow").style.transform = "translate(8px, -2px)";
                e.currentTarget.querySelector(".case-img").style.transform = "scale(1.015)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.querySelector(".case-arrow").style.transform = "none";
                e.currentTarget.querySelector(".case-img").style.transform = "none";
              }}
              >
                <div>
                  <div style={{ ...META_SM, color: TEXT_DEEP, display: "flex", gap: 14, alignItems: "center" }}>
                    <span>{c.client}</span>
                    <span>·</span>
                    <span>{c.year}</span>
                    <span>·</span>
                    <span style={{ color: c.status === "Active" ? accent : TEXT_DEEP,
                      display: "inline-flex", alignItems: "center", gap: 6 }}>
                      <span style={{ width: 5, height: 5, borderRadius: "50%",
                        background: c.status === "Active" ? accent : TEXT_DEEP }} />
                      {c.status}
                    </span>
                  </div>
                  <h3 style={{
                    marginTop: 18,
                    fontFamily: "'Geist', sans-serif", fontWeight: 500,
                    fontSize: "clamp(1.6rem, 2.4vw, 2.2rem)",
                    lineHeight: 1.15, letterSpacing: "-0.025em",
                    color: TEXT, margin: "18px 0 0",
                    display: "flex", alignItems: "baseline", gap: 16,
                  }}>
                    <span>{c.title}</span>
                    <span className="case-arrow" style={{
                      fontFamily: "'Geist Mono', monospace", fontSize: 18, color: TEXT_DEEP,
                      transition: "transform 280ms var(--ease-out-quart)",
                    }}>↗</span>
                  </h3>
                  <p style={{
                    marginTop: 16, maxWidth: "34rem",
                    fontFamily: "'Geist', sans-serif",
                    fontSize: 15.5, lineHeight: 1.6, color: TEXT_SOFT,
                  }}>{c.summary}</p>
                  <div style={{ marginTop: 24, display: "flex", gap: 8, flexWrap: "wrap" }}>
                    {c.tags.map((t) => (
                      <span key={t} style={{
                        ...META_SM, color: TEXT_MUTE,
                        padding: "6px 10px",
                        border: "1px solid rgba(255,255,255,0.10)",
                      }}>{t}</span>
                    ))}
                  </div>
                </div>
                <div className="case-img" style={{
                  aspectRatio: "4 / 3",
                  border: RULE,
                  background: c.tone,
                  position: "relative", overflow: "hidden",
                  transition: "transform 480ms var(--ease-out-quart)",
                }}>
                  <CaseGraphic color={c.color} variant={i} />
                </div>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}

/* Decorative placeholder graphic per case study */
function CaseGraphic({ color, variant }) {
  if (variant === 0) {
    // dashboard wireframe
    return (
      <svg viewBox="0 0 400 300" preserveAspectRatio="none" style={{
        position: "absolute", inset: 0, width: "100%", height: "100%",
        opacity: 0.55,
      }}>
        <g stroke={color} strokeWidth="1" fill="none" opacity="0.7">
          <rect x="20" y="20" width="100" height="60" />
          <rect x="130" y="20" width="100" height="60" />
          <rect x="240" y="20" width="140" height="60" />
          <rect x="20" y="90" width="360" height="100" />
          <rect x="20" y="200" width="170" height="80" />
          <rect x="200" y="200" width="180" height="80" />
        </g>
        <g stroke={color} strokeWidth="1.2" fill="none">
          <polyline points="40,160 80,140 120,150 160,120 200,130 240,110 280,125 320,100 360,115" />
        </g>
      </svg>
    );
  }
  if (variant === 1) {
    // editorial column
    return (
      <svg viewBox="0 0 400 300" preserveAspectRatio="none" style={{
        position: "absolute", inset: 0, width: "100%", height: "100%",
        opacity: 0.55,
      }}>
        <g stroke={color} strokeWidth="1" opacity="0.7" fill="none">
          <rect x="40" y="40" width="220" height="140" />
          <rect x="280" y="40" width="80" height="40" />
          <rect x="280" y="90" width="80" height="40" />
          <rect x="280" y="140" width="80" height="40" />
        </g>
        <g stroke={color} strokeWidth="1" opacity="0.5">
          <line x1="60" y1="60" x2="240" y2="60" />
          <line x1="60" y1="75" x2="200" y2="75" />
          <line x1="60" y1="200" x2="240" y2="200" />
          <line x1="60" y1="215" x2="180" y2="215" />
          <line x1="60" y1="230" x2="220" y2="230" />
          <line x1="60" y1="245" x2="140" y2="245" />
        </g>
      </svg>
    );
  }
  // booking calendar grid
  return (
    <svg viewBox="0 0 400 300" preserveAspectRatio="none" style={{
      position: "absolute", inset: 0, width: "100%", height: "100%",
      opacity: 0.55,
    }}>
      <g stroke={color} strokeWidth="1" fill="none" opacity="0.7">
        {Array.from({ length: 5 }).map((_, r) =>
          Array.from({ length: 7 }).map((__, c) => (
            <rect key={`${r}-${c}`} x={30 + c * 50} y={50 + r * 42} width="44" height="36" />
          ))
        )}
      </g>
      <g fill={color} opacity="0.55">
        <rect x="80" y="92" width="44" height="36" />
        <rect x="180" y="134" width="94" height="36" />
        <rect x="230" y="218" width="44" height="36" />
      </g>
    </svg>
  );
}

Object.assign(window, { IntroBlock, ServicesGrid, ProcessSection, FeaturedWork, SectionHeader, META, META_SM, RULE, TEXT, TEXT_SOFT, TEXT_MUTE, TEXT_DEEP });
