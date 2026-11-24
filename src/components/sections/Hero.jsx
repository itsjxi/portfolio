import React, { useEffect, useRef, useState } from 'react';
import { Check, Flag, Minus, Pause, Play, Plus, SkipBack, SkipForward } from 'lucide-react';
import { PERSON, yearsSince } from '../../data/content.js';
import './Hero.css';

export default function Hero() {
  return (
    <section className="hero page" aria-labelledby="hero-title">
      <div className="hero-copy">
        <p className="hero-status">
          <span className="hero-status-dot" aria-hidden="true" />
          Open to senior frontend roles
        </p>
        <h1 id="hero-title" className="hero-title">{PERSON.name}</h1>
        <p className="hero-lead">
          Frontend engineer at WebEngage. I design and build product interfaces, from the first
          sketch to the edge case at row one million.
        </p>
        <p className="hero-sub">
          {yearsSince()} years of React. At WebEngage I build AI agents, a canvas image editor and the
          shared components they all run on.
        </p>
        <div className="hero-actions">
          <a className="btn btn-primary" href={`mailto:${PERSON.email}`}>Email me</a>
          <a className="btn btn-quiet" href="#work">See my work</a>
        </div>
      </div>

      <Workbench />
    </section>
  );
}

/*
 * The workbench is a small canvas of working pieces from each project.
 * The Gap stepper and Radius slider restyle the canvas itself.
 */
function Workbench() {
  const [gap, setGap] = useState(16);
  const [radius, setRadius] = useState(24);

  return (
    <div
      className="bench"
      style={{ '--gap': `${gap}px`, '--r': `${radius}px` }}
      aria-label="Interactive previews of four projects"
      role="group"
    >
      <div className="bench-bar tile">
        <Stepper label="Gap" value={gap} min={8} max={28} step={4} onChange={setGap} />
        <label className="bench-slider">
          <span>Radius</span>
          <input
            type="range"
            min="8"
            max="32"
            step="1"
            value={radius}
            onChange={(e) => setRadius(Number(e.target.value))}
            style={{ '--fill': `${((radius - 8) / 24) * 100}%` }}
          />
        </label>
      </div>

      <Frame name="vanilla-data-grid" href="#data-grid" className="slot-grid">
        <GridTile />
      </Frame>
      <Frame name="focusspace" href="#focusspace" className="slot-habits">
        <HabitsTile />
      </Frame>
      <Frame name="kinetic" href="#kinetic" className="slot-player">
        <PlayerTile />
      </Frame>
      <Frame name="scratch-visual-editor" href="#scratch" className="slot-scratch">
        <ScratchTile />
      </Frame>
    </div>
  );
}

function Frame({ name, href, className, children }) {
  return (
    <div className={`frame ${className}`}>
      <a className="frame-label" href={href}>{name}</a>
      {children}
    </div>
  );
}

function Stepper({ label, value, min, max, step, onChange }) {
  return (
    <div className="stepper" role="group" aria-label={`${label}: ${value} pixels`}>
      <span className="stepper-label">{label}</span>
      <button
        type="button"
        aria-label={`Decrease ${label.toLowerCase()}`}
        disabled={value <= min}
        onClick={() => onChange(Math.max(min, value - step))}
      >
        <Minus size={16} strokeWidth={2.5} />
      </button>
      <output className="stepper-value" aria-live="polite">{value}</output>
      <button
        type="button"
        aria-label={`Increase ${label.toLowerCase()}`}
        disabled={value >= max}
        onClick={() => onChange(Math.min(max, value + step))}
      >
        <Plus size={16} strokeWidth={2.5} />
      </button>
    </div>
  );
}

/* Data grid: virtual scrolling keeps the DOM small, whatever the row count. */
const SIZES = [
  { key: '1K', rows: 1_000 },
  { key: '100K', rows: 100_000 },
  { key: '1M', rows: 1_000_000 },
];

function GridTile() {
  const [size, setSize] = useState(SIZES[2]);
  const [virtual, setVirtual] = useState(true);
  const inDom = virtual ? Math.min(30, size.rows) : size.rows;
  const heavy = !virtual && size.rows > 10_000;

  return (
    <div className="tile grid-tile">
      <div className="grid-controls">
        <div className="segmented" role="radiogroup" aria-label="Row count">
          {SIZES.map((s) => (
            <button
              key={s.key}
              type="button"
              role="radio"
              aria-checked={size.key === s.key}
              className={size.key === s.key ? 'is-on' : ''}
              onClick={() => setSize(s)}
            >
              {s.key}
            </button>
          ))}
        </div>
        <label className="switch">
          <input type="checkbox" checked={virtual} onChange={(e) => setVirtual(e.target.checked)} />
          <span className="switch-track" aria-hidden="true"><span className="switch-thumb" /></span>
          <span className="switch-text">Virtual scrolling</span>
        </label>
      </div>

      <dl className="grid-readout">
        <div>
          <dt>Rows</dt>
          <dd>{size.rows.toLocaleString('en-US')}</dd>
        </div>
        <div>
          <dt>Rows in the DOM</dt>
          <dd className={heavy ? 'is-bad' : ''}>{inDom.toLocaleString('en-US')}</dd>
        </div>
      </dl>
      <p className="grid-note" aria-live="polite">
        {virtual
          ? 'Only the rows on screen exist. They are reused as you scroll.'
          : heavy
            ? 'Without virtualisation the browser builds every row, and the page stalls.'
            : 'At a thousand rows, building every one is still fine. Try 1M.'}
      </p>
    </div>
  );
}

/* FocusSpace: a habit list with a streak. */
const HABITS = [
  { id: 'deep', label: 'Two hours of deep work' },
  { id: 'review', label: 'Review open PRs' },
  { id: 'walk', label: 'Walk 8,000 steps' },
];

function HabitsTile() {
  const [done, setDone] = useState({ deep: true });
  const count = HABITS.filter((h) => done[h.id]).length;

  return (
    <div className="tile habits-tile">
      <ul className="habits">
        {HABITS.map((h) => (
          <li key={h.id}>
            <label className={done[h.id] ? 'is-done' : ''}>
              <input
                type="checkbox"
                checked={!!done[h.id]}
                onChange={() => setDone((d) => ({ ...d, [h.id]: !d[h.id] }))}
              />
              <span className="habit-check" aria-hidden="true">
                <Check size={14} strokeWidth={3} />
              </span>
              {h.label}
            </label>
          </li>
        ))}
      </ul>
      <p className="habits-foot">
        {count === HABITS.length ? 'Day complete. Streak: 6 days' : `${count} of ${HABITS.length} done today`}
      </p>
    </div>
  );
}

/* Kinetic: the mini player. Track names come from the app's demo library. */
const TRACKS = [
  { title: 'Neon Drift', artist: 'Solaris', length: 192 },
  { title: 'Gravity Well', artist: 'Voidwalker', length: 214 },
  { title: 'Crystalline', artist: 'Aurora Waves', length: 176 },
];

function fmt(s) {
  return `${Math.floor(s / 60)}:${String(Math.floor(s % 60)).padStart(2, '0')}`;
}

function PlayerTile() {
  const [index, setIndex] = useState(0);
  const [playing, setPlaying] = useState(false);
  const [time, setTime] = useState(23);
  const track = TRACKS[index];

  useEffect(() => {
    if (!playing) return undefined;
    const id = setInterval(() => {
      setTime((t) => {
        if (t + 1 >= track.length) {
          setIndex((i) => (i + 1) % TRACKS.length);
          return 0;
        }
        return t + 1;
      });
    }, 1000);
    return () => clearInterval(id);
  }, [playing, track.length]);

  const go = (delta) => {
    setIndex((i) => (i + delta + TRACKS.length) % TRACKS.length);
    setTime(0);
  };

  return (
    <div className="tile player-tile">
      <div className={`player-art ${playing ? 'is-playing' : ''}`} aria-hidden="true">
        <span className="player-ring" />
      </div>
      <div className="player-body">
        <p className="player-title">{track.title}</p>
        <p className="player-artist">{track.artist}</p>
        <div
          className="player-bar"
          role="progressbar"
          aria-label="Track position"
          aria-valuemin={0}
          aria-valuemax={track.length}
          aria-valuenow={time}
          aria-valuetext={`${fmt(time)} of ${fmt(track.length)}`}
        >
          <span style={{ width: `${(time / track.length) * 100}%` }} />
        </div>
        <div className="player-times" aria-hidden="true">
          <span>{fmt(time)}</span>
          <span>{fmt(track.length)}</span>
        </div>
        <div className="player-controls">
          <button type="button" aria-label="Previous track" onClick={() => go(-1)}>
            <SkipBack size={18} fill="currentColor" />
          </button>
          <button
            type="button"
            className="player-play"
            aria-label={playing ? 'Pause' : 'Play'}
            onClick={() => setPlaying((p) => !p)}
          >
            {playing ? <Pause size={20} fill="currentColor" /> : <Play size={20} fill="currentColor" />}
          </button>
          <button type="button" aria-label="Next track" onClick={() => go(1)}>
            <SkipForward size={18} fill="currentColor" />
          </button>
        </div>
      </div>
    </div>
  );
}

/* Scratch: run a three-block script on a tiny stage. */
function ScratchTile() {
  const [running, setRunning] = useState(false);
  const [x, setX] = useState(0); // 0..100 (% of the stage)
  const dir = useRef(1);
  const raf = useRef(0);

  useEffect(() => {
    if (!running) return undefined;
    let steps = 0;
    let last = performance.now();
    const tick = (now) => {
      if (now - last > 40) {
        last = now;
        steps += 1;
        setX((v) => {
          let next = v + dir.current * 6;
          if (next >= 100 || next <= 0) {
            dir.current *= -1; // if on edge, bounce
            next = Math.max(0, Math.min(100, next));
          }
          return next;
        });
      }
      if (steps < 60) raf.current = requestAnimationFrame(tick);
      else setRunning(false);
    };
    raf.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf.current);
  }, [running]);

  return (
    <div className="tile scratch-tile">
      <div className="blocks" aria-hidden="true">
        <span className={`block block-hat ${running ? 'is-live' : ''}`}>
          when <Flag size={12} fill="#2f9e44" color="#2f9e44" /> clicked
        </span>
        <span className="block block-loop">repeat <i>60</i></span>
        <span className="block block-motion block-inner">move <i>6</i> steps</span>
        <span className="block block-motion block-inner">if on edge, bounce</span>
      </div>
      <div className="stage">
        <span className="sprite" style={{ left: `calc(${x}% * 0.82 + 4%)` }} aria-hidden="true" />
        <button
          type="button"
          className="stage-run"
          onClick={() => setRunning((r) => !r)}
          aria-pressed={running}
        >
          {running ? 'Stop' : 'Run'}
        </button>
      </div>
    </div>
  );
}
