"use client";

import { motion } from "framer-motion";

/* ── Monochrome wave pairs (black & white only) ─────────────────── */
const WAVES = [
  {
    d1: "M0,420 C240,380 480,460 720,420 C960,380 1200,460 1440,420 L1440,800 L0,800 Z",
    d2: "M0,400 C240,445 480,375 720,410 C960,445 1200,375 1440,400 L1440,800 L0,800 Z",
    c1: "M0,420 C240,380 480,460 720,420 C960,380 1200,460 1440,420",
    c2: "M0,400 C240,445 480,375 720,410 C960,445 1200,375 1440,400",
    fillOpacity: 0.045,
    lineOpacity: 0.35,
    strokeWidth: "1.5",
    duration: 9,
    delay: 0,
  },
  {
    d1: "M0,460 C200,420 440,490 680,455 C920,420 1160,490 1440,460 L1440,800 L0,800 Z",
    d2: "M0,440 C200,480 440,415 680,448 C920,482 1160,415 1440,445 L1440,800 L0,800 Z",
    c1: "M0,460 C200,420 440,490 680,455 C920,420 1160,490 1440,460",
    c2: "M0,440 C200,480 440,415 680,448 C920,482 1160,415 1440,445",
    fillOpacity: 0.03,
    lineOpacity: 0.22,
    strokeWidth: "1",
    duration: 12,
    delay: 1.5,
  },
  {
    d1: "M0,490 C280,452 520,510 760,488 C1000,466 1240,510 1440,490 L1440,800 L0,800 Z",
    d2: "M0,472 C280,510 520,468 760,476 C1000,498 1240,468 1440,476 L1440,800 L0,800 Z",
    c1: "M0,490 C280,452 520,510 760,488 C1000,466 1240,510 1440,490",
    c2: "M0,472 C280,510 520,468 760,476 C1000,498 1240,468 1440,476",
    fillOpacity: 0.02,
    lineOpacity: 0.14,
    strokeWidth: "0.8",
    duration: 15,
    delay: 3,
  },
];

export function HomeGraphicBackground() {
  return (
    <div
      className="pointer-events-none fixed inset-0 -z-10 overflow-hidden"
      aria-hidden="true"
    >
      {/* ── 1. Water-Flow Waves (white/gray) ───────────────────────── */}
      <svg
        className="absolute inset-0 h-full w-full"
        viewBox="0 0 1440 800"
        preserveAspectRatio="xMidYMid slice"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          {WAVES.map((w, i) => (
            <linearGradient key={i} id={`wg${i}`} x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%"   stopColor="#ffffff" stopOpacity="0" />
              <stop offset="30%"  stopColor="#ffffff" stopOpacity={w.fillOpacity} />
              <stop offset="70%"  stopColor="#ffffff" stopOpacity={w.fillOpacity} />
              <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
            </linearGradient>
          ))}
          <filter id="wglow" x="-10%" y="-80%" width="120%" height="260%">
            <feGaussianBlur stdDeviation="3" result="b" />
            <feMerge><feMergeNode in="b" /><feMergeNode in="SourceGraphic" /></feMerge>
          </filter>
        </defs>

        {/* Wave fill areas */}
        {WAVES.map((w, i) => (
          <motion.path
            key={`f${i}`}
            fill={`url(#wg${i})`}
            animate={{ d: [w.d1, w.d2, w.d1] }}
            transition={{ duration: w.duration, repeat: Infinity, ease: "easeInOut", delay: w.delay }}
          />
        ))}

        {/* Wave crest glow lines */}
        {WAVES.map((w, i) => (
          <motion.path
            key={`c${i}`}
            fill="none"
            stroke="#ffffff"
            strokeWidth={w.strokeWidth}
            strokeOpacity={w.lineOpacity}
            filter="url(#wglow)"
            animate={{ d: [w.c1, w.c2, w.c1] }}
            transition={{ duration: w.duration, repeat: Infinity, ease: "easeInOut", delay: w.delay }}
          />
        ))}
      </svg>

      {/* ── 2. Soft white aurora blooms (breathing) ─────────────────── */}
      <motion.span
        className="absolute -left-[5%] -top-[5%] h-[700px] w-[700px] rounded-full blur-[120px]"
        style={{ background: "radial-gradient(circle, rgba(255,255,255,0.10) 0%, rgba(255,255,255,0.04) 55%, transparent 75%)" }}
        animate={{ scale: [1, 1.1, 1], x: [0, 25, 0], y: [0, -18, 0] }}
        transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.span
        className="absolute -right-[8%] top-[10%] h-[600px] w-[600px] rounded-full blur-[110px]"
        style={{ background: "radial-gradient(circle, rgba(255,255,255,0.08) 0%, rgba(200,200,200,0.03) 55%, transparent 75%)" }}
        animate={{ scale: [1.04, 0.93, 1.04], x: [0, -20, 0], y: [0, 15, 0] }}
        transition={{ duration: 22, repeat: Infinity, ease: "easeInOut", delay: 2 }}
      />
      <motion.span
        className="absolute left-[20%] top-[44%] h-[500px] w-[500px] rounded-full blur-[130px]"
        style={{ background: "radial-gradient(circle, rgba(255,255,255,0.06) 0%, transparent 70%)" }}
        animate={{ scale: [1, 1.08, 1], x: [0, 35, 0], y: [0, -25, 0] }}
        transition={{ duration: 26, repeat: Infinity, ease: "easeInOut", delay: 4 }}
      />
      <motion.span
        className="absolute -bottom-[8%] left-[50%] h-[650px] w-[850px] -translate-x-1/2 rounded-full blur-[130px]"
        style={{ background: "radial-gradient(ellipse at center, rgba(255,255,255,0.09) 0%, rgba(255,255,255,0.04) 45%, transparent 70%)" }}
        animate={{ scale: [1, 1.06, 1] }}
        transition={{ duration: 20, repeat: Infinity, ease: "easeInOut", delay: 1 }}
      />

      {/* ── 3. White dot grid ───────────────────────────────────────── */}
      <div
        className="absolute inset-0 bg-grid opacity-[0.14]"
        style={{
          maskImage: "radial-gradient(ellipse 100% 85% at 50% 28%, black 15%, transparent 100%)",
          WebkitMaskImage: "radial-gradient(ellipse 100% 85% at 50% 28%, black 15%, transparent 100%)",
        }}
      />

      {/* ── 4. Circuit lines + node beacons (white/gray) ────────────── */}
      <svg className="absolute inset-0 h-full w-full" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="cl" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%"   stopColor="#ffffff" stopOpacity="0" />
            <stop offset="40%"  stopColor="#ffffff" stopOpacity="0.5" />
            <stop offset="100%" stopColor="#aaaaaa" stopOpacity="0.2" />
          </linearGradient>
          <linearGradient id="cr" x1="100%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%"   stopColor="#ffffff" stopOpacity="0" />
            <stop offset="40%"  stopColor="#cccccc" stopOpacity="0.45" />
            <stop offset="100%" stopColor="#888888" stopOpacity="0.18" />
          </linearGradient>
          <filter id="ng">
            <feGaussianBlur stdDeviation="2.5" result="g" />
            <feMerge><feMergeNode in="g" /><feMergeNode in="SourceGraphic" /></feMerge>
          </filter>
        </defs>

        <motion.path
          d="M -50 280 L 140 280 L 230 370 L 230 580 L 300 650"
          stroke="url(#cl)" strokeWidth="1.5" fill="none"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 1 }}
          transition={{ duration: 2.4, ease: "easeInOut", delay: 0.6 }}
        />
        <motion.path
          d="M 1490 140 L 1280 140 L 1180 240 L 1180 490 L 1100 570"
          stroke="url(#cr)" strokeWidth="1.5" fill="none"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 1 }}
          transition={{ duration: 2.4, ease: "easeInOut", delay: 1.1 }}
        />

        {/* Nodes */}
        <circle cx="230" cy="370" r="4"  fill="#ffffff" opacity="0.7" filter="url(#ng)" />
        <circle cx="230" cy="370" r="9"  stroke="#ffffff" strokeWidth="1" fill="none" opacity="0.3" />
        <circle cx="1180" cy="240" r="4" fill="#cccccc" opacity="0.65" filter="url(#ng)" />
        <circle cx="1180" cy="240" r="9" stroke="#cccccc" strokeWidth="1" fill="none" opacity="0.28" />
      </svg>

      {/* ── 5. HUD mono labels ───────────────────────────────────────── */}
      <div className="absolute left-6 top-24 hidden font-mono text-[10px] tracking-widest md:block">
        <div className="flex items-center gap-2 text-white/40">
          <motion.span
            className="h-1.5 w-1.5 rounded-full bg-white"
            animate={{ opacity: [1, 0.2, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
          <span>SYS.ONLINE // 2026</span>
        </div>
        <div className="mt-1 text-white/20">PORTFOLIO // ACTIVE</div>
      </div>
      <div className="absolute right-6 top-24 hidden text-right font-mono text-[10px] tracking-widest md:block">
        <div className="text-white/40">[ FULL-STACK // NODE ]</div>
        <div className="mt-1 text-white/20">INTERACTIVE // LIVE</div>
      </div>

      {/* ── 6. Crosshairs (white, staggered entrance) ───────────────── */}
      {([
        { left: "11%", top: "32%", delay: 0 },
        { left: "87%", top: "40%", delay: 0.5 },
        { left: "6%",  top: "65%", delay: 1.0 },
        { left: "90%", top: "78%", delay: 1.5 },
      ] as const).map((c, i) => (
        <motion.div
          key={i}
          className="absolute hidden text-white/25 lg:block"
          style={{ left: c.left, top: c.top }}
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: [0, 0.5, 0.3, 0.5], scale: [0.5, 1, 1] }}
          transition={{ duration: 1.2, delay: c.delay, repeat: Infinity, repeatDelay: 8 }}
        >
          <svg width="22" height="22" viewBox="0 0 22 22" fill="none" stroke="currentColor" strokeWidth="1.2">
            <line x1="11" y1="2"  x2="11" y2="20" />
            <line x1="2"  y1="11" x2="20" y2="11" />
            <circle cx="11" cy="11" r="3" strokeWidth="0.8" opacity="0.6" />
          </svg>
        </motion.div>
      ))}

      {/* ── 7. Rotating wireframe shapes (white border) ─────────────── */}
      <motion.div
        className="absolute -right-16 top-[52%] hidden h-60 w-60 rounded-[36px] border border-white/10 lg:block"
        animate={{ rotate: 360 }}
        transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
      />
      <motion.div
        className="absolute -left-20 top-[70%] hidden h-72 w-72 rounded-full border border-white/8 lg:block"
        animate={{ rotate: -360 }}
        transition={{ duration: 75, repeat: Infinity, ease: "linear" }}
      />

      {/* ── 8. Film grain for depth ──────────────────────────────────── */}
      <div className="absolute inset-0 grain opacity-35" />
    </div>
  );
}
