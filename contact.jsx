/* global React, ObsidianGraph */

/* ============================================================
   Contact / Start a project — multi-step form
   ------------------------------------------------------------
   4-pane horizontal slide:
     0  KIND      — what kind of project (radio cards)
     1  SHAPE     — timeline + budget (radio chips)
     2  DETAILS   — name, email, freeform message
     3  SENT      — confirmation
   Header shows step pips + the alt "channels" (email / studio).
   ============================================================ */

const META_C = {
  fontFamily: "'Geist Mono', ui-monospace, monospace",
  fontSize: 11, fontWeight: 500,
  letterSpacing: "0.18em", textTransform: "uppercase",
};
const TEXT_C       = "#fff";
const TEXT_C_SOFT  = "rgba(255,255,255,0.78)";
const TEXT_C_MUTE  = "rgba(255,255,255,0.55)";
const TEXT_C_DEEP  = "rgba(255,255,255,0.35)";
const RULE_C       = "1px solid rgba(255,255,255,0.10)";

const KINDS = [
  { id: "website",    icon: "◇", label: "Website",            sub: "Marketing, editorial, e-commerce, booking" },
  { id: "app",        icon: "◈", label: "Web app / dashboard", sub: "Internal tools, portals, reporting" },
  { id: "automation", icon: "◉", label: "Automation",         sub: "Pipelines, integrations, scheduled jobs" },
  { id: "infra",      icon: "◎", label: "Infrastructure",     sub: "Hosting, deploys, monitoring" },
  { id: "unsure",     icon: "◌", label: "Not sure yet",       sub: "Let's start with a conversation" },
];

const TIMELINES = ["This month", "1–3 months", "3–6 months", "Just exploring"];
const BUDGETS   = ["Under 10k", "10–25k", "25–50k", "50k+", "Not sure"];

/* ------------------------------------------------------------
   Form delivery config
   ------------------------------------------------------------
   Point FORM_ENDPOINT at a form backend (Formspree, a Vercel
   serverless function, Resend proxy, etc.) and submissions POST
   there as JSON. Leave it empty and the form gracefully falls
   back to composing a pre-filled email to the studio — so the
   form is never a dead end, even before a backend is wired up.
   ------------------------------------------------------------ */
const FORM_ENDPOINT = ""; // e.g. "https://formspree.io/f/abcdwxyz"
const STUDIO_EMAIL  = "studio@ovlk.tech";

function buildMailto({ kind, timeline, budget, name, email, details }) {
  const k = KINDS.find((x) => x.id === kind);
  const subject = `Project enquiry — ${k ? k.label : "OVLK Tech"}`;
  const body = [
    `Name: ${name || "—"}`,
    `Email: ${email || "—"}`,
    `Kind: ${k ? k.label : "—"}`,
    `Timeline: ${timeline || "—"}`,
    `Budget: ${budget || "—"}`,
    "",
    "Details:",
    details || "—",
  ].join("\n");
  return `mailto:${STUDIO_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}

function ContactSection({ density, accent }) {
  const py = density === "compact" ? 120 : 180;

  return (
    <section id="contact" className="ovlk-section" data-screen-label="Contact" style={{
      position: "relative",
      padding: `${py}px 0 ${py - 60}px`,
      background: "var(--ovlk-bg, #0a2230)",
      overflow: "hidden",
    }}>
      {/* Echo of the hero graph — non-interactive */}
      <div style={{ position: "absolute", inset: 0, opacity: 0.32, pointerEvents: "none" }}>
        <ObsidianGraph interactive={false} />
      </div>
      <div style={{
        position: "absolute", inset: 0, pointerEvents: "none",
        background:
          "radial-gradient(ellipse 65% 80% at 18% 50%, var(--ovlk-bg, #0a2230) 0%, var(--ovlk-bg-70, rgba(10,34,48,0.7)) 45%, transparent 80%)",
      }} />

      <div className="ovlk-pad" style={{ position: "relative", zIndex: 2, maxWidth: "82rem", margin: "0 auto", padding: "0 36px" }}>
        {/* Eyebrow */}
        <span className="reveal" style={{
          ...META_C, color: TEXT_C_MUTE,
          display: "inline-flex", alignItems: "center", gap: 14,
        }}>
          <span style={{ color: accent }}>05</span>
          <span style={{ color: TEXT_C_DEEP }}>//</span>
          <span>Contact</span>
        </span>

        {/* Headline */}
        <h2 className="reveal" style={{
          marginTop: 36,
          fontFamily: "'Geist', 'Helvetica Neue', Helvetica, Arial, sans-serif",
          fontWeight: 600,
          fontSize: "clamp(2.75rem, 8.5vw, 8.5rem)",
          lineHeight: 0.95, letterSpacing: "-0.045em",
          color: TEXT_C, margin: "36px 0 0",
          maxWidth: "16ch",
        }}>Tell us what you're building.</h2>

        {/* Lede + CTA pair */}
        <div className="reveal ovlk-cols-2" style={{
          marginTop: 56,
          display: "grid", gridTemplateColumns: "1.4fr 1fr",
          gap: 56, alignItems: "end",
        }}>
          <p style={{
            margin: 0, maxWidth: "44rem",
            fontFamily: "'Geist', sans-serif", fontSize: 18, lineHeight: 1.55,
            color: TEXT_C_SOFT, letterSpacing: "-0.005em",
          }}>
            We take a few projects at a time. Tell us what you're shaping and
            we'll come back to you within a working day — usually the same one.
          </p>
          <div className="ovlk-cta-row" style={{ display: "flex", justifyContent: "flex-end" }}>
            <a href="/start"
               className="ovlk-btn-primary"
               style={{ whiteSpace: "nowrap", height: 44, fontSize: 12 }}>
              <span className="ovlk-btn-label" style={{ paddingRight: 18 }}>Start a project</span>
              <span className="ovlk-btn-aside" aria-hidden="true"
                    style={{ width: 36, height: 36, margin: "3px 3px 3px 0", flex: "0 0 36px" }}>
                <svg viewBox="0 0 12 12" className="ovlk-btn-arrow is-outgoing"
                     xmlns="http://www.w3.org/2000/svg" fill="none"
                     style={{ width: 14, height: 14 }}>
                  <path d="M8.91 9.09L9 3L2.91 3.09L2.90 4.32L6.86 4.25L2.56 8.56L3.44 9.44L7.75 5.14L7.69 9.11L8.91 9.09Z" fill="currentColor"/>
                </svg>
                <svg viewBox="0 0 12 12" className="ovlk-btn-arrow is-incoming"
                     xmlns="http://www.w3.org/2000/svg" fill="none"
                     style={{ width: 14, height: 14 }}>
                  <path d="M8.91 9.09L9 3L2.91 3.09L2.90 4.32L6.86 4.25L2.56 8.56L3.44 9.44L7.75 5.14L7.69 9.11L8.91 9.09Z" fill="currentColor"/>
                </svg>
              </span>
            </a>
          </div>
        </div>

        {/* Alt-channel meta row */}
        <div className="reveal ovlk-cols-4" style={{
          marginTop: 80, paddingTop: 32, borderTop: RULE_C,
          display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 48,
        }}>
          {[
            { label: "Channels", value: "Form, email, or phone" },
            { label: "Email",    value: "studio@ovlk.tech", href: "mailto:studio@ovlk.tech" },
            { label: "Studio",   value: "Ventura, California" },
            { label: "Response", value: "Within a working day" },
          ].map((col) => (
            <div key={col.label}>
              <p style={{ ...META_C, color: TEXT_C_MUTE, margin: 0 }}>{col.label}</p>
              {col.href ? (
                <a href={col.href}
                  className="ovlk-link-sweep"
                  style={{
                    display: "inline-block", marginTop: 18,
                    fontFamily: "'Geist', sans-serif", fontWeight: 400, fontSize: 18,
                    letterSpacing: "-0.012em",
                    color: TEXT_C,
                  }}
                >{col.value}</a>
              ) : (
                <p style={{
                  margin: "18px 0 0",
                  fontFamily: "'Geist', sans-serif", fontWeight: 400, fontSize: 18,
                  letterSpacing: "-0.012em", color: TEXT_C,
                }}>{col.value}</p>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ============================================================
   ProjectForm — the multi-step intake form. Lives on its own
   page (Start a project.html). Hosts the same Kind / Shape /
   Details / Sent flow that used to live in ContactSection.
   ============================================================ */
function ProjectForm({ accent }) {
  const [step, setStep]       = React.useState(0);
  const [kind, setKind]       = React.useState(null);
  const [timeline, setTimeline] = React.useState(null);
  const [budget, setBudget]   = React.useState(null);
  const [name, setName]       = React.useState("");
  const [email, setEmail]     = React.useState("");
  const [details, setDetails] = React.useState("");
  const [sending, setSending] = React.useState(false);
  const [error, setError]     = React.useState(null);
  const [viaEmail, setViaEmail] = React.useState(false);

  const stepNames = ["Kind", "Shape", "Details", "Sent"];

  const canAdvance = (() => {
    if (step === 0) return kind != null;
    if (step === 1) return timeline != null && budget != null;
    if (step === 2) return name.trim() && /.+@.+\..+/.test(email);
    return true;
  })();

  async function submit() {
    const payload = { kind, timeline, budget, name, email, details, source: "ovlk.tech /start" };
    setSending(true);
    setError(null);
    try {
      if (FORM_ENDPOINT) {
        const res = await fetch(FORM_ENDPOINT, {
          method: "POST",
          headers: { "Content-Type": "application/json", "Accept": "application/json" },
          body: JSON.stringify(payload),
        });
        if (!res.ok) throw new Error(`Request failed (${res.status})`);
        setViaEmail(false);
      } else {
        // No backend wired up yet — hand off to the user's email client
        window.location.href = buildMailto(payload);
        setViaEmail(true);
      }
      setSending(false);
      setStep(3);
    } catch (e) {
      setSending(false);
      setError(`Couldn't send that just now — please email ${STUDIO_EMAIL} directly.`);
    }
  }

  function next() {
    if (!canAdvance || sending) return;
    if (step === 2) { submit(); }
    else { setStep((s) => Math.min(3, s + 1)); }
  }
  function back() { setStep((s) => Math.max(0, s - 1)); }
  function reset() {
    setStep(0); setKind(null); setTimeline(null); setBudget(null);
    setName(""); setEmail(""); setDetails(""); setError(null); setViaEmail(false);
  }

  return (
    <div style={{
      border: RULE_C, background: "rgba(255,255,255,0.015)",
      backdropFilter: "blur(8px)",
    }}>
      {/* Step header */}
      <div style={{
        display: "flex", justifyContent: "space-between", alignItems: "center",
        padding: "20px 28px", borderBottom: RULE_C,
      }}>
        <div style={{ ...META_C, color: TEXT_C_MUTE,
          display: "inline-flex", alignItems: "center", gap: 12,
        }}>
          <span style={{ color: accent }}>{String(Math.min(step + 1, stepNames.length)).padStart(2, "0")}</span>
          <span style={{ color: TEXT_C_DEEP }}>//</span>
          <span>{stepNames[step]}</span>
        </div>
        <div style={{ display: "flex", gap: 6 }}>
          {stepNames.map((_, i) => (
            <span key={i} style={{
              width: 24, height: 2,
              background: i <= step ? accent : "rgba(255,255,255,0.15)",
              transition: "background 240ms ease",
            }} />
          ))}
        </div>
      </div>

      {/* Step body */}
      <div style={{ padding: "48px 28px 28px", minHeight: 460 }}>
        {step === 0 && (
          <StepKind kind={kind} setKind={setKind} accent={accent} />
        )}
        {step === 1 && (
          <StepShape
            timeline={timeline} setTimeline={setTimeline}
            budget={budget} setBudget={setBudget}
            accent={accent}
          />
        )}
        {step === 2 && (
          <StepDetails
            name={name} setName={setName}
            email={email} setEmail={setEmail}
            details={details} setDetails={setDetails}
            accent={accent}
          />
        )}
        {step === 3 && (
          <StepSent
            accent={accent}
            summary={{ kind, timeline, budget, name, email }}
            viaEmail={viaEmail}
            onReset={reset}
          />
        )}
      </div>

      {/* Error banner */}
      {error && step < 3 && (
        <div role="alert" style={{
          margin: "0 28px", padding: "14px 16px",
          border: "1px solid rgba(200,90,63,0.5)",
          background: "rgba(200,90,63,0.12)",
          color: "#f0c4ba",
          fontFamily: "'Geist', sans-serif", fontSize: 13.5, lineHeight: 1.5,
        }}>
          {error}{" "}
          <a href={`mailto:${STUDIO_EMAIL}`} className="ovlk-link-sweep" style={{ color: "#fff" }}>
            {STUDIO_EMAIL}
          </a>
        </div>
      )}

      {/* Step footer */}
      {step < 3 && (
        <div style={{
          display: "flex", justifyContent: "space-between", alignItems: "center",
          padding: "20px 28px", borderTop: RULE_C, gap: 24,
        }}>
          <button onClick={back} disabled={step === 0}
            className="ovlk-btn-ghost is-back"
            style={step === 0 ? { visibility: "hidden" } : undefined}>
            <span className="ovlk-btn-arrow-inline" aria-hidden="true">←</span>
            <span>Back</span>
          </button>
          <div style={{ ...META_C, color: TEXT_C_DEEP }}>
            {step + 1} / {stepNames.length}
          </div>
          <PrimaryBtn onClick={next} disabled={!canAdvance || sending} sending={sending}>
            {sending ? "Sending" : (step === 2 ? "Send" : "Next")}
          </PrimaryBtn>
        </div>
      )}
    </div>
  );
}

/* ---------- Step 1: Kind ---------- */
function StepKind({ kind, setKind, accent }) {
  return (
    <div>
      <p style={{
        ...META_C, color: TEXT_C_MUTE, margin: "0 0 28px",
      }}>What kind of project?</p>
      <div className="ovlk-kind-grid" style={{
        display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
        gap: 0,
        border: RULE_C,
      }}>
        {KINDS.map((k, i) => {
          const isSel = kind === k.id;
          return (
            <button key={k.id}
              onClick={() => setKind(k.id)}
              className={"ovlk-tcard ovlk-kind-card" + (isSel ? " is-active" : "")}
              style={{
                borderRight: i < KINDS.length - 1 ? RULE_C : "none",
              }}>
              <div className="ovlk-tcard-icon">{k.icon}</div>
              <div style={{
                fontFamily: "'Geist', sans-serif", fontWeight: 500,
                fontSize: 17, letterSpacing: "-0.015em", color: TEXT_C,
              }}>{k.label}</div>
              <div style={{
                fontFamily: "'Geist', sans-serif", fontSize: 13.5, lineHeight: 1.45,
                color: TEXT_C_MUTE,
              }}>{k.sub}</div>
            </button>
          );
        })}
      </div>
    </div>
  );
}

/* ---------- Step 2: Shape ---------- */
function StepShape({ timeline, setTimeline, budget, setBudget, accent }) {
  return (
    <div style={{ display: "grid", gap: 56 }}>
      <div>
        <p style={{ ...META_C, color: TEXT_C_MUTE, margin: "0 0 18px" }}>Timeline</p>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 10 }}>
          {TIMELINES.map((t) => (
            <Chip key={t} active={timeline === t} onClick={() => setTimeline(t)} accent={accent}>{t}</Chip>
          ))}
        </div>
      </div>
      <div>
        <p style={{ ...META_C, color: TEXT_C_MUTE, margin: "0 0 18px" }}>Budget (USD)</p>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 10 }}>
          {BUDGETS.map((b) => (
            <Chip key={b} active={budget === b} onClick={() => setBudget(b)} accent={accent}>{b}</Chip>
          ))}
        </div>
        <p style={{
          marginTop: 24, maxWidth: "44ch",
          fontFamily: "'Geist', sans-serif", fontSize: 13.5, lineHeight: 1.55,
          color: TEXT_C_MUTE,
        }}>
          Rough range only — we'll shape the actual scope with you. We bill by the week
          and you can pause anytime.
        </p>
      </div>
    </div>
  );
}

function Chip({ active, onClick, accent, children }) {
  return (
    <button onClick={onClick}
      className={"ovlk-chip" + (active ? " is-active" : "")}>
      {children}
    </button>
  );
}

/* ---------- Step 3: Details ---------- */
function StepDetails({ name, setName, email, setEmail, details, setDetails, accent }) {
  return (
    <div style={{ display: "grid", gap: 28 }}>
      <Field label="Name">
        <input value={name} onChange={(e) => setName(e.target.value)}
          placeholder="Your name"
          style={inputStyle(accent)} />
      </Field>
      <Field label="Email">
        <input value={email} onChange={(e) => setEmail(e.target.value)}
          placeholder="you@business.com" type="email"
          style={inputStyle(accent)} />
      </Field>
      <Field label="Tell us more (optional)">
        <textarea value={details} onChange={(e) => setDetails(e.target.value)}
          placeholder="What's the actual problem? What's been tried? Anything we should know."
          rows={5}
          style={{ ...inputStyle(accent), resize: "vertical", minHeight: 120 }} />
      </Field>
    </div>
  );
}

function Field({ label, children }) {
  return (
    <label style={{ display: "block" }}>
      <span style={{ ...META_C, color: TEXT_C_MUTE, display: "block", marginBottom: 12 }}>{label}</span>
      {children}
    </label>
  );
}

function inputStyle(accent) {
  return {
    width: "100%",
    background: "transparent",
    border: "none",
    borderBottom: "1px solid rgba(255,255,255,0.18)",
    color: "#fff",
    padding: "10px 0",
    fontFamily: "'Geist', sans-serif",
    fontSize: 17, lineHeight: 1.5,
    outline: "none",
    boxSizing: "border-box",
    letterSpacing: "-0.01em",
    transition: "border-color 200ms ease",
  };
}

/* ---------- Step 4: Sent ---------- */
function StepSent({ accent, summary, viaEmail, onReset }) {
  const k = KINDS.find((x) => x.id === summary.kind);
  return (
    <div style={{ paddingTop: 16 }}>
      <div style={{
        display: "inline-flex", alignItems: "center", gap: 12,
        ...META_C, color: accent,
      }}>
        <span style={{
          width: 8, height: 8, borderRadius: "50%", background: accent,
          boxShadow: `0 0 12px ${accent}88`,
        }} />
        {viaEmail ? "Almost there" : "Sent"}
      </div>
      <h3 style={{
        marginTop: 24,
        fontFamily: "'Geist', sans-serif", fontWeight: 500,
        fontSize: "clamp(1.7rem, 3vw, 2.4rem)", letterSpacing: "-0.025em",
        lineHeight: 1.15, color: "#fff",
      }}>{viaEmail
        ? `We've opened an email for you, ${summary.name || "friend"} — just hit send.`
        : `Thanks, ${summary.name || "friend"} — we'll be in touch within a working day.`}</h3>
      {viaEmail && (
        <p style={{
          marginTop: 14, maxWidth: "42ch",
          fontFamily: "'Geist', sans-serif", fontSize: 14.5, lineHeight: 1.6,
          color: TEXT_C_MUTE,
        }}>
          If nothing popped up, reach us directly at{" "}
          <a href={`mailto:${STUDIO_EMAIL}`} className="ovlk-link-sweep" style={{ color: "#fff" }}>{STUDIO_EMAIL}</a>.
        </p>
      )}

      <div className="ovlk-cols-4" style={{
        marginTop: 40, paddingTop: 28, borderTop: RULE_C,
        display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 24,
      }}>
        {[
          ["Kind",     k ? k.label : "—"],
          ["Timeline", summary.timeline || "—"],
          ["Budget",   summary.budget || "—"],
          ["Reply to", summary.email || "—"],
        ].map(([l, v]) => (
          <div key={l}>
            <p style={{ ...META_C, color: TEXT_C_MUTE, margin: 0 }}>{l}</p>
            <p style={{
              margin: "12px 0 0",
              fontFamily: "'Geist', sans-serif", fontSize: 15.5,
              color: TEXT_C, letterSpacing: "-0.005em",
            }}>{v}</p>
          </div>
        ))}
      </div>

      <div style={{ marginTop: 40, display: "flex", gap: 16 }}>
        <button onClick={onReset} className="ovlk-btn-ghost">
          <span>Send another</span>
          <span className="ovlk-btn-arrow-inline" aria-hidden="true">→</span>
        </button>
      </div>
    </div>
  );
}

/* ---------- buttons ---------- */
/* The flagship haptic button — cream pill with mint accent aside,
   stacked arrows that fly off / re-enter on hover. Spring transform,
   offset shadow that collapses on press. All visual rules live in
   the global stylesheet under .ovlk-btn-primary. */
function PrimaryBtn({ onClick, disabled, sending, children }) {
  return (
    <button onClick={onClick} disabled={disabled}
      className="ovlk-btn-primary"
      aria-disabled={disabled || undefined}>
      <span className="ovlk-btn-label">
        {children}{sending ? "…" : ""}
      </span>
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
    </button>
  );
}

/* ---------- Footer ---------- */
function Footer({ accent }) {
  return (
    <footer className="ovlk-pad" style={{ padding: "96px 36px 40px", background: "var(--ovlk-bg, #0a2230)", borderTop: RULE_C }}>
      <div className="ovlk-footer-grid" style={{ maxWidth: "82rem", margin: "0 auto",
        display: "grid", gridTemplateColumns: "repeat(12, 1fr)", gap: 32 }}>
        <div style={{ gridColumn: "span 4" }}>
          <p style={{ ...META_C, color: TEXT_C, margin: 0,
            display: "inline-flex", alignItems: "center", gap: 10,
          }}>
            <svg width="12" height="12" viewBox="0 0 14 14">
              <rect x="2.5" y="2.5" width="9" height="9" transform="rotate(45 7 7)"
                fill="none" stroke="currentColor" strokeWidth="1" />
            </svg>
            OVLK / TECH
          </p>
          <p style={{
            marginTop: 16, maxWidth: "26rem",
            fontFamily: "'Geist', sans-serif",
            fontSize: 14, lineHeight: 1.6, color: TEXT_C_MUTE,
          }}>
            Practical software for business owners. A small studio in Ventura, California.
          </p>
        </div>

        <div style={{ gridColumn: "span 2" }}>
          <p style={{ ...META_C, color: TEXT_C_DEEP, margin: 0 }}>Site</p>
          <ul style={{ marginTop: 16, padding: 0, listStyle: "none" }}>
            {[["01","Approach","studio"],["02","What we build","services"],["03","Process","process"],["04","Work","work"],["05","Contact","contact"]].map(([n,l,id]) => (
              <li key={l} style={{ marginTop: 10 }}>
                <a href={`#${id}`}
                  className="ovlk-link-sweep"
                  style={{
                    fontFamily: "'Geist', sans-serif", fontSize: 13,
                    display: "inline-flex", gap: 8, alignItems: "baseline",
                  }}>
                  <span style={{ ...META_C, fontSize: 10, color: TEXT_C_DEEP }}>{n}</span>
                  <span>{l}</span>
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div style={{ gridColumn: "span 3" }}>
          <p style={{ ...META_C, color: TEXT_C_DEEP, margin: 0 }}>Studio</p>
          <p style={{
            marginTop: 16,
            fontFamily: "'Geist', sans-serif", fontSize: 13, lineHeight: 1.6,
            color: TEXT_C_SOFT,
          }}>
            Ventura, California<br/>
            <span style={{ ...META_C, fontSize: 10, letterSpacing: "0.28em", color: TEXT_C_DEEP }}>
              34.2746° N // 119.2290° W
            </span>
          </p>
        </div>

        <div style={{ gridColumn: "span 3" }}>
          <p style={{ ...META_C, color: TEXT_C_DEEP, margin: 0 }}>Channels</p>
          <ul style={{ marginTop: 16, padding: 0, listStyle: "none" }}>
            <li style={{ marginTop: 10 }}>
              <a href="mailto:studio@ovlk.tech"
                className="ovlk-link-sweep"
                style={{
                  fontFamily: "'Geist', sans-serif", fontSize: 13,
                }}>studio@ovlk.tech ↗</a>
            </li>
            <li style={{ marginTop: 10 }}>
              <a href="#" onClick={(e) => e.preventDefault()}
                className="ovlk-link-sweep"
                style={{
                  fontFamily: "'Geist', sans-serif", fontSize: 13,
                }}>GitHub ↗</a>
            </li>
          </ul>
        </div>

        <div style={{ gridColumn: "span 12", marginTop: 56, height: 1, background: "rgba(255,255,255,0.10)" }} />

        <div className="ovlk-footer-base" style={{
          gridColumn: "span 12", marginTop: 16,
          display: "flex", justifyContent: "space-between",
          ...META_C, fontSize: 10, letterSpacing: "0.28em", color: TEXT_C_DEEP,
        }}>
          <span>© 2026 · OVLK Tech · Overlook Strategy</span>
          <span>v0.1 // built at the coast</span>
        </div>
      </div>
    </footer>
  );
}

Object.assign(window, { ContactSection, ProjectForm, Footer });
