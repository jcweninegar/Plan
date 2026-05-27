// Plan. — Desktop prototype (1440 × 900 inside the artboard)
// Sidebar + breadcrumb chrome + morphing workspace + bottom dock.

import React from 'react';
import { Workspace, ViewSwitch } from './workspace';
import {
  IconHome, IconCalendar, IconInbox, IconKanban, IconRoutine,
  IconTimeline, IconGrip, IconTask, IconFilter, IconMore,
  IconSearch, Wordmark, IconCreator, IconChev,
} from './icons';
import { BLOCKS, PROJECTS } from './data';

// Week navigator with prev/next + range + Today.
const WEEKS = [
  { start: 5,  end: 11, label: 'Last week' },
  { start: 12, end: 18, label: 'This week' },
  { start: 19, end: 25, label: 'Next week' },
];
function WeekPicker() {
  const [idx, setIdx] = React.useState(1);
  const w = WEEKS[idx];
  return (
    <div style={{ display: 'inline-flex', alignItems: 'center', gap: 4 }}>
      <button onClick={() => setIdx(Math.max(0, idx - 1))} title="Previous week"
        style={{ width: 26, height: 26, borderRadius: 6, border: 'none', background: 'transparent', cursor: idx === 0 ? 'not-allowed' : 'pointer', color: 'var(--ink-3)', display: 'flex', alignItems: 'center', justifyContent: 'center', opacity: idx === 0 ? 0.35 : 1 }}>
        <IconChev dir="left" size={14} />
      </button>
      <button title="Pick a date"
        style={{ border: '1px solid var(--border)', background: 'var(--surface)', borderRadius: 6, padding: '4px 10px', cursor: 'pointer', fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--ink-2)', letterSpacing: '0.04em' }}>
        MAY&nbsp;{w.start}&nbsp;–&nbsp;{w.end}
      </button>
      <button onClick={() => setIdx(Math.min(WEEKS.length - 1, idx + 1))} title="Next week"
        style={{ width: 26, height: 26, borderRadius: 6, border: 'none', background: 'transparent', cursor: idx === WEEKS.length - 1 ? 'not-allowed' : 'pointer', color: 'var(--ink-3)', display: 'flex', alignItems: 'center', justifyContent: 'center', opacity: idx === WEEKS.length - 1 ? 0.35 : 1 }}>
        <IconChev dir="right" size={14} />
      </button>
      {idx !== 1 && (
        <button onClick={() => setIdx(1)}
          style={{ marginLeft: 4, border: '1px solid var(--accent)', background: 'var(--accent-tint)', color: 'var(--accent)', borderRadius: 6, padding: '4px 10px', cursor: 'pointer', fontFamily: 'var(--font-sans)', fontSize: 11, fontWeight: 600, letterSpacing: '0.02em' }}>
          Today
        </button>
      )}
    </div>
  );
}

export function DesktopShell() {
  const [view, setView] = React.useState('kanban');
  const [openProject, setOpenProject] = React.useState('Studio');
  const [creatorOpen, setCreatorOpen] = React.useState(false);

  // Inner workspace dims (1280 - 200 sidebar - 64 padding = 1016)
  const wsFrame = { w: 1016, h: 600 };

  return (
    <div style={{
      width: 1280, height: 860,
      background: 'var(--bg)',
      fontFamily: 'var(--font-sans)',
      color: 'var(--ink)',
      position: 'relative',
      display: 'flex',
      overflow: 'hidden',
    }}>
      <DesktopSidebar view={view} setView={setView} openProject={openProject} setOpenProject={setOpenProject} />

      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', minWidth: 0, position: 'relative' }}>
        <DesktopTopbar />

        {/* Title row */}
        <div style={{
          padding: '22px 32px 16px',
          display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', gap: 24,
        }}>
          <div style={{ minWidth: 0 }}>
            <div className="crumb" style={{ marginBottom: 6 }}>
              <span>Workspace</span>
              <span className="crumb-sep">/</span>
              <span>Studio</span>
              <span className="crumb-sep">/</span>
              <span className="crumb-current">This week</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: 14, whiteSpace: 'nowrap' }}>
              <h1 style={{ margin: 0, fontSize: 30, fontWeight: 600, letterSpacing: -0.7 }}>This week</h1>
              <WeekPicker />
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--ink-4)', letterSpacing: 0.04 }}>
                · 12&nbsp;BLOCKS
              </span>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: 8, flex: '0 0 auto' }}>
            <ViewSwitch view={view} onView={setView} />
            <div style={{ width: 1, height: 22, background: 'var(--border)' }} />
            <button className="btn btn-ghost" aria-label="Filter"><IconFilter size={15} /></button>
            <button className="btn btn-ghost" aria-label="More"><IconMore size={15} /></button>
          </div>
        </div>

        {/* Workspace */}
        <div style={{ flex: 1, padding: '0 32px 100px', overflow: 'hidden' }}>
          <Workspace mode="desktop" frame={wsFrame} view={view} onView={setView} scrollableX={false} />
        </div>

        {/* Floating dock */}
        <div style={{
          position: 'absolute',
          left: '50%', bottom: 28,
          transform: 'translateX(-50%)',
          zIndex: 10,
        }}>
          <Dock creatorOpen={creatorOpen} setCreatorOpen={setCreatorOpen} />
        </div>
      </div>
    </div>
  );
}

function DesktopTopbar() {
  return (
    <div style={{
      height: 56,
      padding: '0 32px',
      display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      borderBottom: '1px solid var(--border)',
      background: 'var(--bg)',
      flex: '0 0 auto',
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 24 }}>
        <Wordmark size={20} />
        <div style={{ width: 1, height: 16, background: 'var(--border)' }} />
        <nav style={{ display: 'flex', gap: 4 }}>
          <a className="btn btn-ghost" style={{ fontWeight: 500 }}>Workspace</a>
          <a className="btn btn-ghost" style={{ color: 'var(--ink-3)' }}>Library</a>
          <a className="btn btn-ghost" style={{ color: 'var(--ink-3)' }}>Settings</a>
        </nav>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
        <div className="search" style={{ width: 260, whiteSpace: 'nowrap' }}>
          <IconSearch size={14} />
          <span style={{ flex: 1, overflow: 'hidden', textOverflow: 'ellipsis' }}>Jump to a block…</span>
          <kbd>⌘ K</kbd>
        </div>
        <div style={{
          width: 32, height: 32, borderRadius: '50%',
          background: 'var(--ink)', color: 'white',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: 12, fontWeight: 500,
        }}>AM</div>
      </div>
    </div>
  );
}

function DesktopSidebar({ view, setView, openProject, setOpenProject }) {
  return (
    <aside style={{
      width: 200,
      flex: '0 0 200px',
      borderRight: '1px solid var(--border)',
      background: 'var(--surface)',
      padding: '20px 12px 100px',
      display: 'flex', flexDirection: 'column',
      overflow: 'auto',
    }}>
      <div className="section-label">Spaces</div>
      <div className="tree">
        {[
          { id: 'studio',   label: 'Studio',   count: 12, status: null,                Icon: IconHome,  active: true,  pulse: false },
          { id: 'personal', label: 'Personal', count: 4,  status: '1 due · 2 overdue', Icon: IconHome,  active: false, pulse: true  },
          { id: 'inbox',    label: 'Inbox',    count: 7,  status: '3 new this week',   Icon: IconInbox, active: false, pulse: true  },
        ].map((s) => (
          <div key={s.id}>
            <div className={`tree-row ${s.active ? 'is-active' : ''}`}>
              <span className="tree-grip"><s.Icon size={14} /></span>
              <span className="tree-label">{s.label}</span>
              {s.pulse && <span className="tree-pulse" title="Activity since last visit" />}
              <span className="tree-count">{String(s.count).padStart(2, '0')}</span>
            </div>
            {!s.active && s.status && (
              <div style={{
                padding: '0 10px 4px 38px',
                fontFamily: 'var(--font-mono)',
                fontSize: 10,
                color: 'var(--ink-3)',
                letterSpacing: '0.02em',
                marginTop: -2,
              }}>{s.status}</div>
            )}
          </div>
        ))}
      </div>

      <div className="section-label">Projects</div>
      <div className="tree">
        {PROJECTS.map((p) => (
          <div key={p} className="tree-row">
            <span className="tree-grip"><IconGrip size={14} /></span>
            <span className="tree-icon"><IconTask size={11} stroke={1.6} /></span>
            <span className="tree-label">{p}</span>
            <span className="tree-count">{String(BLOCKS.filter(b => b.project === p).length).padStart(2, '0')}</span>
          </div>
        ))}
      </div>

      <div className="section-label">Pinned views</div>
      <div className="tree">
        <div className="tree-row">
          <span className="tree-grip"><IconGrip size={14} /></span>
          <span className="tree-icon"><IconKanban size={12} stroke={1.6} /></span>
          <span className="tree-label">This week · board</span>
        </div>
        <div className="tree-row">
          <span className="tree-grip"><IconGrip size={14} /></span>
          <span className="tree-icon"><IconRoutine size={12} stroke={1.6} /></span>
          <span className="tree-label">Morning routine</span>
        </div>
        <div className="tree-row">
          <span className="tree-grip"><IconGrip size={14} /></span>
          <span className="tree-icon"><IconTimeline size={12} stroke={1.6} /></span>
          <span className="tree-label">Q3 plan</span>
        </div>
      </div>

      <div style={{ flex: 1 }} />

      {/* Visual: "drag any block here" hint */}
      <div style={{
        padding: 14,
        border: '1px dashed var(--border-strong)',
        borderRadius: 'var(--r-md)',
        fontFamily: 'var(--font-mono)',
        fontSize: 10.5,
        color: 'var(--ink-3)',
        textTransform: 'uppercase',
        letterSpacing: 0.08,
        lineHeight: 1.55,
      }}>
        Drop a block here to<br />pin it to your sidebar.
      </div>
    </aside>
  );
}

function Dock({ creatorOpen, setCreatorOpen }) {
  const items = [
    { id: 'home', Icon: IconHome },
    { id: 'today', Icon: IconCalendar, active: true },
    { id: 'inbox', Icon: IconInbox },
    { id: 'div' },
    // user-pinned blocks
    { id: 'p1', Icon: IconKanban },
    { id: 'p2', Icon: IconRoutine },
    { id: 'p3', Icon: IconTimeline },
    { id: 'div' },
    { id: 'creator', creator: true },
  ];
  return (
    <div className="dock">
      {items.map((it, i) => {
        if (it.id === 'div') return <div key={i} className="dock-divider" />;
        if (it.creator) return (
          <div key={i} className={`dock-item is-creator`} onClick={() => setCreatorOpen(!creatorOpen)}>
            <IconCreator open={creatorOpen} size={18} />
          </div>
        );
        const { Icon } = it;
        return (
          <div key={i} className={`dock-item ${it.active ? 'is-active' : ''}`}>
            <Icon size={17} stroke={1.6} />
          </div>
        );
      })}
    </div>
  );
}
