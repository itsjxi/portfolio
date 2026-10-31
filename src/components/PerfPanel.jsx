import React, { useState, useEffect, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './PerfPanel.css';

/* ─── Helpers ────────────────────────────────────────────── */
const round = (n, d = 1) => (typeof n === 'number' ? +n.toFixed(d) : '—');
const ms = (n) => (typeof n === 'number' ? `${round(n)} ms` : '—');
const kb = (n) => (typeof n === 'number' ? `${round(n / 1024)} KB` : '—');
const rating = (metric, value) => {
  const thresholds = {
    fcp:  [1800, 3000],
    lcp:  [2500, 4000],
    fid:  [100, 300],
    cls:  [0.1, 0.25],
    ttfb: [800, 1800],
    inp:  [200, 500],
  };
  const [good, poor] = thresholds[metric] || [Infinity, Infinity];
  if (value <= good) return 'good';
  if (value <= poor) return 'needs-improvement';
  return 'poor';
};

/* ─── Collect all available perf data ───────────────────── */
function collectMetrics() {
  const nav = performance.getEntriesByType('navigation')[0];
  const paint = {};
  performance.getEntriesByType('paint').forEach((e) => {
    if (e.name === 'first-contentful-paint') paint.fcp = e.startTime;
    if (e.name === 'first-paint') paint.fp = e.startTime;
  });

  const resources = performance.getEntriesByType('resource');
  const totalTransfer = resources.reduce((s, r) => s + (r.transferSize || 0), 0);
  const totalResources = resources.length;
  const byType = resources.reduce((acc, r) => {
    const type = r.initiatorType || 'other';
    acc[type] = (acc[type] || 0) + 1;
    return acc;
  }, {});

  const mem = performance.memory ?? null;

  return {
    // Navigation timing
    ttfb: nav ? round(nav.responseStart - nav.startTime) : null,
    domInteractive: nav ? round(nav.domInteractive) : null,
    domComplete: nav ? round(nav.domComplete) : null,
    loadEvent: nav ? round(nav.loadEventEnd - nav.loadEventStart) : null,
    totalLoad: nav ? round(nav.loadEventEnd) : null,

    // Paint
    fp: paint.fp ? round(paint.fp) : null,
    fcp: paint.fcp ? round(paint.fcp) : null,

    // Resources
    totalTransfer,
    totalResources,
    byType,

    // Memory (Chrome only)
    jsHeapUsed: mem ? mem.usedJSHeapSize : null,
    jsHeapTotal: mem ? mem.totalJSHeapSize : null,
    jsHeapLimit: mem ? mem.jsHeapSizeLimit : null,

    // Connection
    connection: navigator.connection
      ? {
          effectiveType: navigator.connection.effectiveType,
          downlink: navigator.connection.downlink,
          rtt: navigator.connection.rtt,
          saveData: navigator.connection.saveData,
        }
      : null,
  };
}

/* ─── Row component ──────────────────────────────────────── */
function Row({ label, value, ratingKey }) {
  const numVal = typeof value === 'string' ? parseFloat(value) : value;
  const r = ratingKey && typeof numVal === 'number' ? rating(ratingKey, numVal) : null;
  return (
    <div className="perf-row">
      <span className="perf-row-label">{label}</span>
      <span className={`perf-row-value ${r ? `perf-${r}` : ''}`}>
        {value ?? <span className="perf-na">n/a</span>}
        {r && <span className={`perf-badge perf-badge--${r}`}>{r === 'needs-improvement' ? 'ok' : r}</span>}
      </span>
    </div>
  );
}

/* ─── Section wrapper ────────────────────────────────────── */
function Group({ title, children }) {
  return (
    <div className="perf-group">
      <h3 className="perf-group-title">{title}</h3>
      {children}
    </div>
  );
}

/* ─── Main component ─────────────────────────────────────── */
export default function PerfPanel() {
  const [open, setOpen] = useState(false);
  const [metrics, setMetrics] = useState(null);
  const [webVitals, setWebVitals] = useState({ lcp: null, cls: null, fid: null, inp: null });
  const clsSession = useRef({ score: 0, start: 0, lastShift: 0, max: 0 });
  const interactionDurations = useRef(new Map());

  const refresh = useCallback(() => setMetrics(collectMetrics()), []);

  useEffect(() => {
    if (!open) return;
    refresh();

    // Web Vitals via PerformanceObserver
    const observers = [];

    try {
      const lcpObs = new PerformanceObserver((list) => {
        const entries = list.getEntries();
        const last = entries[entries.length - 1];
        setWebVitals((v) => ({ ...v, lcp: round(last.startTime) }));
      });
      lcpObs.observe({ type: 'largest-contentful-paint', buffered: true });
      observers.push(lcpObs);
    } catch (_) {}

    try {
      const clsObs = new PerformanceObserver((list) => {
        const session = clsSession.current;
        list.getEntries().forEach((entry) => {
          if (entry.hadRecentInput) return;
          if (!session.lastShift || entry.startTime - session.lastShift > 1000 || entry.startTime - session.start > 5000) {
            session.score = 0;
            session.start = entry.startTime;
          }
          session.score += entry.value;
          session.lastShift = entry.startTime;
          session.max = Math.max(session.max, session.score);
        });
        setWebVitals((v) => ({ ...v, cls: round(session.max, 4) }));
      });
      clsObs.observe({ type: 'layout-shift', buffered: true });
      observers.push(clsObs);
    } catch (_) {}

    try {
      const fidObs = new PerformanceObserver((list) => {
        const e = list.getEntries()[0];
        setWebVitals((v) => ({ ...v, fid: round(e.processingStart - e.startTime) }));
      });
      fidObs.observe({ type: 'first-input', buffered: true });
      observers.push(fidObs);
    } catch (_) {}

    try {
      const inpObs = new PerformanceObserver((list) => {
        const durations = interactionDurations.current;
        list.getEntries().forEach((entry) => {
          if (!entry.interactionId) return;
          durations.set(entry.interactionId, Math.max(durations.get(entry.interactionId) || 0, entry.duration));
        });
        const max = Math.max(0, ...durations.values());
        if (max > 0) setWebVitals((v) => ({ ...v, inp: round(max) }));
      });
      inpObs.observe({ type: 'event', buffered: true, durationThreshold: 16 });
      observers.push(inpObs);
    } catch (_) {}

    return () => observers.forEach((o) => o.disconnect());
  }, [open, refresh]);

  const m = metrics;

  return (
    <>
      {/* Trigger button — fixed bottom-right */}
      <button
        className="perf-trigger"
        onClick={() => setOpen((v) => !v)}
        aria-label="Toggle performance panel"
        title="Page Performance"
        data-cursor
      >
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/>
        </svg>
        <span className="perf-trigger-label">Perf</span>
      </button>

      {/* Panel */}
      <AnimatePresence>
        {open && (
          <>
            {/* Backdrop — click outside to close */}
            <motion.div
              className="perf-backdrop"
              aria-hidden="true"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={() => setOpen(false)}
            />

            <motion.aside
              className="perf-panel"
              role="complementary"
              aria-label="Page performance data"
              initial={{ opacity: 0, x: 480 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 480 }}
              transition={{ type: 'spring', stiffness: 340, damping: 34 }}
            >
            {/* Header */}
            <div className="perf-header">
              <div>
                <h2 className="perf-title">Performance</h2>
                <p className="perf-subtitle">Real browser metrics</p>
              </div>
              <div className="perf-header-actions">
                <button className="perf-refresh" onClick={refresh} title="Refresh" aria-label="Refresh metrics" data-cursor>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="23 4 23 10 17 10"/><path d="M20.49 15a9 9 0 1 1-2.12-9.36L23 10"/>
                  </svg>
                </button>
                <button className="perf-close" onClick={() => setOpen(false)} aria-label="Close panel" data-cursor>✕</button>
              </div>
            </div>

            <div className="perf-body">
              {/* Core Web Vitals */}
              <Group title="Core Web Vitals">
                <Row label="LCP — Largest Contentful Paint" value={webVitals.lcp !== null ? `${webVitals.lcp} ms` : null} ratingKey="lcp" />
                <Row label="CLS — Cumulative Layout Shift"  value={webVitals.cls !== null ? webVitals.cls : null}             ratingKey="cls" />
                <Row label="FID — First Input Delay"        value={webVitals.fid !== null ? `${webVitals.fid} ms` : null}    ratingKey="fid" />
                <Row label="INP — Interaction to Next Paint" value={webVitals.inp !== null ? `${webVitals.inp} ms` : null}   ratingKey="inp" />
              </Group>

              {/* Paint & Loading */}
              <Group title="Paint &amp; Loading">
                <Row label="First Paint (FP)"          value={m ? ms(m.fp)            : null} ratingKey={null} />
                <Row label="First Contentful Paint"    value={m ? ms(m.fcp)           : null} ratingKey="fcp" />
                <Row label="Time to First Byte (TTFB)" value={m ? ms(m.ttfb)          : null} ratingKey="ttfb" />
                <Row label="DOM Interactive"           value={m ? ms(m.domInteractive): null} />
                <Row label="DOM Complete"              value={m ? ms(m.domComplete)   : null} />
                <Row label="Load Event Duration"       value={m ? ms(m.loadEvent)     : null} />
                <Row label="Total Page Load"           value={m ? ms(m.totalLoad)     : null} />
              </Group>

              {/* Resources */}
              <Group title="Resources">
                <Row label="Total Resources"    value={m ? m.totalResources             : null} />
                <Row label="Total Transferred"  value={m ? kb(m.totalTransfer)          : null} />
                {m?.byType && Object.entries(m.byType).map(([type, count]) => (
                  <Row key={type} label={`  ↳ ${type}`} value={`${count} file${count !== 1 ? 's' : ''}`} />
                ))}
              </Group>

              {/* Memory — Chrome only */}
              {m?.jsHeapUsed !== null && (
                <Group title="JS Memory (Chrome)">
                  <Row label="Heap Used"  value={m ? kb(m.jsHeapUsed)  : null} />
                  <Row label="Heap Total" value={m ? kb(m.jsHeapTotal) : null} />
                  <Row label="Heap Limit" value={m ? kb(m.jsHeapLimit) : null} />
                </Group>
              )}

              {/* Network */}
              {m?.connection && (
                <Group title="Network">
                  <Row label="Effective Type" value={m.connection.effectiveType} />
                  <Row label="Downlink"        value={`${m.connection.downlink} Mbps`} />
                  <Row label="RTT"             value={`${m.connection.rtt} ms`} />
                  <Row label="Data Saver"      value={m.connection.saveData ? 'On' : 'Off'} />
                </Group>
              )}

              {/* Legend */}
              <div className="perf-legend">
                <span className="perf-badge perf-badge--good">good</span>
                <span className="perf-badge perf-badge--needs-improvement">ok</span>
                <span className="perf-badge perf-badge--poor">poor</span>
                <span className="perf-legend-note">Based on Google CWV thresholds</span>
              </div>
            </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
