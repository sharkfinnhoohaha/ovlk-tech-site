/* global React, ReactDOM,
   Nav, Hero, IntroBlock, ServicesGrid, ProcessSection, FeaturedWork,
   ContactSection, Footer, useScrollReveal,
   useTweaks, TweaksPanel, TweakSection, TweakColor, TweakRadio, TweakSelect, TweakToggle */

/* ============================================================
   App — wires every section, theming, and the Tweaks panel.
   ============================================================ */

const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
  "bg": "off-black",
  "density": "calm",
  "accent": "#c85a3f",
  "serviceStyle": "list",
  "heroVariant": "graph",
  "showStudio": true,
  "showServices": true,
  "showProcess": true,
  "showWork": true
}/*EDITMODE-END*/;

// Background presets keyed by tweak value
const BG_PRESETS = {
  "navy":      { bg: "#0a2230", bg55: "rgba(10,34,48,0.55)",  bg70: "rgba(10,34,48,0.70)" },
  "abyss":     { bg: "#061620", bg55: "rgba(6,22,32,0.55)",   bg70: "rgba(6,22,32,0.70)" },
  "off-black": { bg: "#070a14", bg55: "rgba(7,10,20,0.55)",  bg70: "rgba(7,10,20,0.70)" },
};

// Accent presets
const ACCENT_OPTIONS = [
  "#4a9d97", // mint — design system default
  "#c08a4f", // sand
  "#c85a3f", // sunset
  "#7aa8ff", // electric
];

function App() {
  const [t, setTweak] = useTweaks(TWEAK_DEFAULTS);
  useScrollReveal();

  // Apply CSS vars to :root so children can pick up the bg color
  React.useEffect(() => {
    const preset = BG_PRESETS[t.bg] || BG_PRESETS.navy;
    document.documentElement.style.setProperty("--ovlk-bg", preset.bg);
    document.documentElement.style.setProperty("--ovlk-bg-55", preset.bg55);
    document.documentElement.style.setProperty("--ovlk-bg-70", preset.bg70);
    document.documentElement.style.setProperty("--ovlk-accent", t.accent);
    document.body.style.background = preset.bg;
  }, [t.bg, t.accent]);

  // Re-trigger scroll-reveal observation when sections toggle on/off
  React.useEffect(() => {
    if (window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const obs = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          e.target.classList.add("is-in");
          obs.unobserve(e.target);
        }
      });
    }, { rootMargin: "0px 0px -10% 0px", threshold: 0.05 });
    document.querySelectorAll(".reveal:not(.is-in)").forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  }, [t.showStudio, t.showServices, t.showProcess, t.showWork, t.serviceStyle, t.heroVariant]);

  const sectionsOn = {
    studio:   t.showStudio,
    services: t.showServices,
    process:  t.showProcess,
    work:     t.showWork,
    contact:  true,
  };

  return (
    <div data-screen-label="OVLK / TECH Home">
      <Nav accent={t.accent} sectionsOn={sectionsOn} />
      <Hero variant={t.heroVariant} accent={t.accent} />

      {t.showStudio   && <IntroBlock      density={t.density} accent={t.accent} />}
      {t.showServices && <ServicesGrid    style={t.serviceStyle} density={t.density} accent={t.accent} />}
      {t.showProcess  && <ProcessSection  density={t.density} accent={t.accent} />}
      {t.showWork     && <FeaturedWork    density={t.density} accent={t.accent} />}

      <ContactSection density={t.density} accent={t.accent} />
      <Footer accent={t.accent} />

      <TweaksPanel title="Tweaks">
        <TweakSection label="Surface" />
        <TweakSelect label="Background" value={t.bg}
          options={["navy", "abyss", "off-black"]}
          onChange={(v) => setTweak("bg", v)} />
        <TweakRadio label="Density" value={t.density}
          options={["calm", "compact"]}
          onChange={(v) => setTweak("density", v)} />
        <TweakColor label="Accent" value={t.accent}
          options={ACCENT_OPTIONS}
          onChange={(v) => setTweak("accent", v)} />

        <TweakSection label="Hero" />
        <TweakSelect label="Variant" value={t.heroVariant}
          options={["graph", "type-only", "ticker"]}
          onChange={(v) => setTweak("heroVariant", v)} />

        <TweakSection label="Services" />
        <TweakSelect label="Row style" value={t.serviceStyle}
          options={["list", "cards", "numbered"]}
          onChange={(v) => setTweak("serviceStyle", v)} />

        <TweakSection label="Sections" />
        <TweakToggle label="Approach"      value={t.showStudio}   onChange={(v) => setTweak("showStudio", v)} />
        <TweakToggle label="What we build" value={t.showServices} onChange={(v) => setTweak("showServices", v)} />
        <TweakToggle label="Process"       value={t.showProcess}  onChange={(v) => setTweak("showProcess", v)} />
        <TweakToggle label="Selected work" value={t.showWork}     onChange={(v) => setTweak("showWork", v)} />
      </TweaksPanel>
    </div>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<App />);
