/* global React */

/* ============================================================
   Obsidian-style graph backdrop for OVLK / TECH
   ------------------------------------------------------------
   Hover-only interaction (no zoom, no pan, no drag):
     • Force-directed layout settles on its own and breathes
     • Hover a node → it lights up, neighbours brighten,
       second-degree neighbours dim less than the rest,
       a pulse ring expands from the focused node, and an
       animated dash flows from focused → each neighbour
     • Labels fade in on the focused node + its neighbours
     • Hover detection listens on `window` so nodes positioned
       behind hero text still react
   Muted palette throughout.
   ============================================================ */

(function () {
  const { useEffect, useRef, useState } = React;

  const PALETTE = {
    web:      "#5e9c8c",
    apps:     "#5d7896",
    automate: "#9b6a72",
    infra:    "#7e6f95",
    studio:   "#9a8862",
  };

  const NODES = [
    { id: "ovlk",        label: "OVLK / TECH",         group: "studio",   size: 14 },
    { id: "websites",    label: "websites",            group: "web",      size: 12 },
    { id: "apps",        label: "applications",        group: "apps",     size: 12 },
    { id: "automation",  label: "automation",          group: "automate", size: 11 },
    { id: "infra",       label: "infrastructure",      group: "infra",    size: 11 },

    { id: "marketing",   label: "marketing-site",      group: "web", size: 7 },
    { id: "ecommerce",   label: "e-commerce",          group: "web", size: 7 },
    { id: "landing",     label: "landing-pages",       group: "web", size: 5 },
    { id: "cms",         label: "headless-cms",        group: "web", size: 6 },
    { id: "blog",        label: "editorial",           group: "web", size: 5 },
    { id: "booking",     label: "online-booking",      group: "web", size: 5 },

    { id: "dashboard",   label: "admin-dashboard",     group: "apps", size: 8 },
    { id: "internal",    label: "internal-tools",      group: "apps", size: 7 },
    { id: "portal",      label: "customer-portal",     group: "apps", size: 6 },
    { id: "reporting",   label: "reporting",           group: "apps", size: 6 },
    { id: "auth",        label: "auth",                group: "apps", size: 5 },
    { id: "billing",     label: "billing",             group: "apps", size: 5 },
    { id: "inventory",   label: "inventory",           group: "apps", size: 5 },

    { id: "pipelines",   label: "data-pipelines",      group: "automate", size: 7 },
    { id: "integration", label: "integrations",        group: "automate", size: 7 },
    { id: "scheduled",   label: "scheduled-jobs",      group: "automate", size: 5 },
    { id: "webhooks",    label: "webhooks",            group: "automate", size: 5 },
    { id: "etl",         label: "etl",                 group: "automate", size: 5 },
    { id: "scraping",    label: "ingest",              group: "automate", size: 5 },

    { id: "vercel",      label: "vercel",              group: "infra", size: 5 },
    { id: "cloudflare",  label: "cloudflare",          group: "infra", size: 5 },
    { id: "supabase",    label: "supabase",            group: "infra", size: 5 },
    { id: "monitoring",  label: "monitoring",          group: "infra", size: 5 },
    { id: "ci",          label: "ci-cd",               group: "infra", size: 5 },
    { id: "backups",     label: "backups",             group: "infra", size: 4 },

    { id: "ventura",     label: "ventura-ca",          group: "studio", size: 6 },
    { id: "discovery",   label: "discovery",           group: "studio", size: 6 },
    { id: "handoff",     label: "handoff",             group: "studio", size: 5 },
    { id: "now",         label: "now",                 group: "studio", size: 4 },
  ];

  const EDGES = [
    ["ovlk","websites"], ["ovlk","apps"], ["ovlk","automation"], ["ovlk","infra"],
    ["ovlk","discovery"], ["ovlk","handoff"], ["ovlk","ventura"],
    ["websites","marketing"], ["websites","ecommerce"], ["websites","landing"],
    ["websites","cms"], ["websites","blog"], ["websites","booking"],
    ["cms","marketing"], ["cms","blog"], ["ecommerce","billing"],
    ["apps","dashboard"], ["apps","internal"], ["apps","portal"], ["apps","reporting"],
    ["apps","auth"], ["apps","billing"], ["apps","inventory"],
    ["dashboard","reporting"], ["portal","auth"], ["inventory","reporting"],
    ["automation","pipelines"], ["automation","integration"], ["automation","scheduled"],
    ["automation","webhooks"], ["automation","etl"], ["automation","scraping"],
    ["pipelines","etl"], ["integration","webhooks"], ["scheduled","backups"],
    ["infra","vercel"], ["infra","cloudflare"], ["infra","supabase"],
    ["infra","monitoring"], ["infra","ci"], ["infra","backups"],
    ["vercel","ci"], ["supabase","auth"], ["cloudflare","monitoring"],
    ["apps","integration"], ["dashboard","pipelines"], ["websites","vercel"],
    ["ecommerce","supabase"], ["portal","integration"], ["reporting","etl"],
    ["discovery","handoff"], ["ventura","now"],
  ];

  function ObsidianGraph({ interactive = true }) {
    const canvasRef = useRef(null);
    const wrapRef   = useRef(null);
    const stateRef  = useRef(null);

    useEffect(() => {
      const canvas = canvasRef.current;
      const wrap   = wrapRef.current;
      const ctx    = canvas.getContext("2d");

      const mq = (q) => (window.matchMedia ? window.matchMedia(q).matches : false);
      const reduceMotion = mq("(prefers-reduced-motion: reduce)");
      const coarse       = mq("(pointer: coarse)");
      // Hover interaction only makes sense with a fine pointer (desktop)
      const canHover = interactive && !coarse;

      const idIdx = new Map(NODES.map((n, i) => [n.id, i]));
      const nodes = NODES.map((n, i) => ({ ...n, x: 0, y: 0, vx: 0, vy: 0, _seed: i }));
      const edges = EDGES
        .map(([a, b]) => [idIdx.get(a), idIdx.get(b)])
        .filter(([a, b]) => a != null && b != null);

      // Adjacency + second-degree
      const adj = nodes.map(() => new Set());
      edges.forEach(([a, b]) => { adj[a].add(b); adj[b].add(a); });
      const adj2 = nodes.map((_, i) => {
        const s = new Set();
        for (const j of adj[i]) {
          for (const k of adj[j]) {
            if (k !== i && !adj[i].has(k)) s.add(k);
          }
        }
        return s;
      });

      // Mouse state — pure hover, no buttons
      const ix = { mouseX: -9999, mouseY: -9999, hover: -1 };

      function resize() {
        const dpr = Math.min(window.devicePixelRatio || 1, 2);
        const r = wrap.getBoundingClientRect();
        canvas.width  = Math.floor(r.width  * dpr);
        canvas.height = Math.floor(r.height * dpr);
        canvas.style.width  = r.width  + "px";
        canvas.style.height = r.height + "px";
        ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
        stateRef.current = { w: r.width, h: r.height, dpr };
      }
      resize();
      window.addEventListener("resize", onResize, { passive: true });

      // Layout centre — biased right on wide screens (room for hero copy
      // on the left), centred on narrow screens so nothing clips off-edge.
      function centre() {
        const { w, h } = stateRef.current;
        return { cx: w * (w < 760 ? 0.5 : 0.72), cy: h * 0.5 };
      }

      // Initial spiral by cluster. Radius scales to the viewport so the
      // cloud fits a phone as gracefully as a desktop.
      const groups = ["web","apps","automate","infra","studio"];
      const groupAngle = Object.fromEntries(
        groups.map((g, i) => [g, (i / groups.length) * Math.PI * 2])
      );
      function layoutInit() {
        const { cx, cy } = centre();
        const base = Math.min(stateRef.current.w, stateRef.current.h);
        nodes.forEach((n, i) => {
          const ga = groupAngle[n.group];
          const r0 = base * 0.20 + (i % 7) * (base * 0.028);
          const jitter = (Math.sin(i * 7.13) + Math.cos(i * 3.7)) * base * 0.07;
          n.x = cx + Math.cos(ga + (i * 0.31)) * (r0 + jitter);
          n.y = cy + Math.sin(ga + (i * 0.31)) * (r0 + jitter);
          n.vx = 0; n.vy = 0;
        });
      }
      layoutInit();

      function onMove(e) {
        const r = canvas.getBoundingClientRect();
        const mx = e.clientX - r.left;
        const my = e.clientY - r.top;
        const inBounds = mx >= 0 && mx <= r.width && my >= 0 && my <= r.height;
        const had = ix.mouseX > -9000;
        if (inBounds) { ix.mouseX = mx; ix.mouseY = my; start(); }
        else if (had) { ix.mouseX = -9999; ix.mouseY = -9999; start(); }
        // else: pointer is away from the graph (e.g. scrolled past) — stay parked
      }
      function onLeave() { ix.mouseX = -9999; ix.mouseY = -9999; start(); }

      // Window-level mousemove so nodes behind overlay text still react
      if (canHover) {
        window.addEventListener("mousemove", onMove);
        canvas.addEventListener("mouseleave", onLeave);
      }

      // ---- Loop control ----
      // The graph settles, then we *stop* the rAF loop entirely — a static,
      // calm cloud at rest instead of a forever-running simulation. Hover
      // (desktop) or resize wakes it again; it re-settles and re-parks.
      let raf = null, running = false, idleFrames = 0;
      let t = 0;
      let labelAlpha    = 0;
      let lastHover     = -1;
      let hoverProgress = 0;
      let pulse         = 0;

      function start() {
        if (running || reduceMotion) return;
        running = true; idleFrames = 0;
        raf = requestAnimationFrame(tick);
      }
      function stop() {
        running = false;
        if (raf) cancelAnimationFrame(raf);
        raf = null;
      }

      let resizeTimer = null;
      function onResize() {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(() => {
          resize();
          if (reduceMotion) { settleStatic(); return; }
          start(); // re-settle into the new centre
        }, 150);
      }

      // Advance the force model one step; returns total kinetic energy.
      function physicsStep() {
        const { w, h } = stateRef.current;
        const { cx, cy } = centre();
        for (let i = 0; i < nodes.length; i++) {
          const a = nodes[i];
          for (let j = i + 1; j < nodes.length; j++) {
            const b = nodes[j];
            let dx = a.x - b.x, dy = a.y - b.y;
            let d2 = dx*dx + dy*dy;
            if (d2 < 1) d2 = 1;
            const d = Math.sqrt(d2);
            const f = 1800 / d2;
            const fx = (dx / d) * f;
            const fy = (dy / d) * f;
            a.vx += fx; a.vy += fy;
            b.vx -= fx; b.vy -= fy;
          }
          a.vx += (cx - a.x) * 0.0011;
          a.vy += (cy - a.y) * 0.0009;
        }
        for (const [ai, bi] of edges) {
          const a = nodes[ai], b = nodes[bi];
          const dx = b.x - a.x, dy = b.y - a.y;
          const d  = Math.sqrt(dx*dx + dy*dy) || 1;
          const target = 90;
          const f = (d - target) * 0.012;
          const fx = (dx / d) * f, fy = (dy / d) * f;
          a.vx += fx; a.vy += fy;
          b.vx -= fx; b.vy -= fy;
        }
        let energy = 0;
        for (let i = 0; i < nodes.length; i++) {
          const n = nodes[i];
          n.vx *= 0.86; n.vy *= 0.86;
          n.x += n.vx;  n.y += n.vy;
          energy += n.vx * n.vx + n.vy * n.vy;
        }
        return energy;
      }

      // Reduced-motion / static instances: settle synchronously, paint once.
      function settleStatic() {
        for (let k = 0; k < 240; k++) physicsStep();
        render(-1);
      }

      function tick() {
        t += 1;
        pulse += 0.022;
        const energy = physicsStep();

        // Hover detection (fine pointer only)
        let hover = -1, hoverDist = Infinity;
        if (canHover && ix.mouseX > -9000) {
          for (let i = 0; i < nodes.length; i++) {
            const n = nodes[i];
            const dx = n.x - ix.mouseX, dy = n.y - ix.mouseY;
            const d2 = dx*dx + dy*dy;
            const hitR = Math.max(11, n.size + 6);
            if (d2 < hitR * hitR && d2 < hoverDist) { hover = i; hoverDist = d2; }
          }
        }
        ix.hover = hover;

        if (hover !== lastHover) {
          labelAlpha = 0;
          lastHover  = hover;
        }
        const hoverTarget = hover !== -1 ? 1 : 0;
        hoverProgress += (hoverTarget - hoverProgress) * 0.14;
        labelAlpha    += (hoverTarget - labelAlpha)    * 0.12;

        render(hover);

        // Park the loop once nothing's hovered. Fast-park when the layout
        // has clearly settled; otherwise a hard frame cap guarantees we stop
        // even if the force model keeps a tiny residual jitter forever.
        const active = hover !== -1 || hoverProgress > 0.01;
        if (active) idleFrames = 0; else idleFrames += 1;
        const settled = energy < 0.08;
        if (!active && idleFrames > (settled ? 20 : 280)) { stop(); return; }
        raf = requestAnimationFrame(tick);
      }

      function render(hover) {
        const { w, h } = stateRef.current;
        // ---- Render ----
        ctx.clearRect(0, 0, w, h);

        // Edges
        for (const [ai, bi] of edges) {
          const a = nodes[ai], b = nodes[bi];
          const isHot = hover !== -1 && (hover === ai || hover === bi);
          const isLink2 = hover !== -1 && !isHot && (
            (adj[hover].has(ai) && adj[ai].has(bi)) ||
            (adj[hover].has(bi) && adj[bi].has(ai))
          );
          const baseAlpha = 0.11;
          let alpha = baseAlpha;
          if (hover !== -1) {
            const target = isHot ? 0.50 : isLink2 ? 0.20 : 0.04;
            alpha = baseAlpha + (target - baseAlpha) * hoverProgress;
          }
          ctx.strokeStyle = `rgba(255,255,255,${alpha})`;
          ctx.lineWidth   = isHot ? 1.2 + 0.4 * hoverProgress : 0.7;
          ctx.beginPath();
          ctx.moveTo(a.x, a.y);
          ctx.lineTo(b.x, b.y);
          ctx.stroke();
        }

        // Animated dash flowing along focused → neighbour edges
        if (hover !== -1 && hoverProgress > 0.02) {
          const hot = nodes[hover];
          ctx.save();
          ctx.setLineDash([6, 8]);
          ctx.lineDashOffset = -((t * 0.6) % 14);
          for (const j of adj[hover]) {
            const n = nodes[j];
            ctx.strokeStyle = `rgba(255,255,255,${0.55 * hoverProgress})`;
            ctx.lineWidth = 1.4;
            ctx.beginPath();
            ctx.moveTo(hot.x, hot.y);
            ctx.lineTo(n.x, n.y);
            ctx.stroke();
          }
          ctx.restore();
        }

        // Solid dots
        for (let i = 0; i < nodes.length; i++) {
          const n = nodes[i];
          const isHot   = hover === i;
          const isLink  = hover !== -1 && adj[hover].has(i);
          const isLink2 = hover !== -1 && !isHot && !isLink && adj2[hover].has(i);
          const color   = PALETTE[n.group];

          const baseAlpha = 0.82;
          let alpha = baseAlpha;
          if (hover !== -1) {
            const target = isHot ? 1 : isLink ? 0.95 : isLink2 ? 0.55 : 0.20;
            alpha = baseAlpha + (target - baseAlpha) * hoverProgress;
          }
          ctx.globalAlpha = alpha;
          ctx.fillStyle = color;
          const scale = isHot   ? 1 + 0.12 * hoverProgress
                       : isLink ? 1 + 0.05 * hoverProgress
                       :          1;
          ctx.beginPath();
          ctx.arc(n.x, n.y, n.size * scale, 0, Math.PI * 2);
          ctx.fill();

          if (isHot) {
            ctx.strokeStyle = `rgba(255,255,255,${0.85 * hoverProgress})`;
            ctx.lineWidth = 1.5;
            ctx.stroke();
          }
          ctx.globalAlpha = 1;
        }

        // Expanding pulse rings on focused node
        if (hover !== -1 && hoverProgress > 0.05) {
          const hot = nodes[hover];
          for (let p = 0; p < 2; p++) {
            const phase = (pulse + p * 0.5) % 1;
            const r = hot.size * (1.2 + phase * 2.4);
            const a = (1 - phase) * 0.45 * hoverProgress;
            ctx.strokeStyle = `rgba(255,255,255,${a})`;
            ctx.lineWidth = 1.2;
            ctx.beginPath();
            ctx.arc(hot.x, hot.y, r, 0, Math.PI * 2);
            ctx.stroke();
          }
        }

        // Labels — focused node + immediate neighbours
        if (hover !== -1 && labelAlpha > 0.02) {
          ctx.textBaseline = "middle";
          for (let i = 0; i < nodes.length; i++) {
            const isHot  = hover === i;
            const isLink = adj[hover].has(i);
            if (!isHot && !isLink) continue;
            const n = nodes[i];
            ctx.font = isHot
              ? "500 12px 'Geist Mono', ui-monospace, monospace"
              : "11px 'Geist Mono', ui-monospace, monospace";
            ctx.globalAlpha = isHot ? labelAlpha : labelAlpha * 0.75;
            ctx.fillStyle = isHot ? "#ffffff" : "rgba(255,255,255,0.72)";
            ctx.fillText(n.label, n.x + n.size + 10, n.y);
          }
          ctx.globalAlpha = 1;
        }
      }

      // Boot: reduced-motion paints a single settled frame; everyone else
      // runs the loop until it settles, then parks itself.
      if (reduceMotion) settleStatic();
      else start();

      return () => {
        stop();
        clearTimeout(resizeTimer);
        window.removeEventListener("resize", onResize);
        if (canHover) {
          window.removeEventListener("mousemove", onMove);
          canvas.removeEventListener("mouseleave", onLeave);
        }
      };
    }, [interactive]);

    return (
      <div ref={wrapRef} style={{ position: "absolute", inset: 0 }}>
        <canvas ref={canvasRef} style={{ display: "block" }} />
      </div>
    );
  }

  window.ObsidianGraph = ObsidianGraph;
})();
