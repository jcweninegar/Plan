// Plan. — Exploration artboards
// Two design questions: (1) what does drag look like during reflow,
// (2) what's inside a block when you tap in.

import React from 'react';
import { IconMore } from './icons';

export function ExploreDragState() {
  return (
    <div style={{
      width: 1280, height: 740,
      background: 'var(--bg)',
      fontFamily: 'var(--font-sans)',
      color: 'var(--ink)',
      position: 'relative',
      overflow: 'hidden',
      padding: 40,
    }}>
      {/* hint label */}
      <div style={{ display: 'flex', alignItems: 'baseline', gap: 14, marginBottom: 24 }}>
        <h2 style={{ margin: 0, fontSize: 22, fontWeight: 600, letterSpacing: -0.4 }}>Drag · drop state</h2>
        <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--ink-3)', textTransform: 'uppercase', letterSpacing: '.08em' }}>
          Coffee w/ Maya · To do → Doing
        </span>
      </div>

      {/* the 4 kanban columns */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 18, alignItems: 'start', position: 'relative' }}>
        <DragColumn
          title="To do"
          count={5}
          highlight={false}
          dim
          items={[
            { title: 'Coffee w/ Maya',  project: 'PERSONAL',    ghost: true },
            { title: 'Pitch deck v3',   project: 'DESIGN' },
            { title: 'Plan Q3 roadmap', project: 'RESEARCH' },
            { title: 'Groceries run',   project: 'PERSONAL' },
            { title: 'Long run',        project: 'PERSONAL' },
          ]}
        />
        <DragColumn
          title="Doing"
          count={4}
          highlight
          insertAt={1}
          items={[
            { title: 'Synthesize user research', project: 'RESEARCH' },
            { title: 'Ship v2.1 release',         project: 'ENGINEERING' },
            { title: 'API rewrite',               project: 'ENGINEERING' },
            { title: 'Reading list',              project: 'PERSONAL' },
          ]}
        />
        <DragColumn
          title="Review"
          count={1}
          items={[
            { title: 'Review onboarding flow', project: 'DESIGN' },
          ]}
        />
        <DragColumn
          title="Done"
          count={2}
          items={[
            { title: 'Team weekly',  project: 'ROUTINE' },
            { title: 'Morning pages', project: 'ROUTINE' },
          ]}
        />

        {/* the dragged block — overlay floating above */}
        <DraggedBlock />
      </div>

      {/* legend */}
      <div style={{ marginTop: 36, display: 'flex', gap: 32, alignItems: 'flex-start' }}>
        <Legend dot={<GhostDot />} title="Ghost" body="The block's home before drag — fades to 30%, dashed border kept so the user knows where it came from." />
        <Legend dot={<DropDot />} title="Drop indicator" body="A 2px accent line slides between cards to preview where it'll land. Animates as the cursor moves." />
        <Legend dot={<DraggedDot />} title="Floating card" body="Lifts +6px, rotates 1.5°, casts a soft shadow. Stays attached to the cursor with a 60fps spring." />
        <Legend dot={<ColDot />} title="Active column" body="Subtle accent tint behind the column the cursor is over — gives the move directional intent." />
      </div>
    </div>
  );
}

function DragColumn({ title, count, items, highlight, dim, insertAt }) {
  return (
    <div style={{
      borderRadius: 'var(--r-md)',
      background: highlight ? 'var(--accent-tint)' : 'transparent',
      transition: 'background .2s ease',
      padding: 8,
    }}>
      <div className="deco" style={{ position: 'static', height: 30, display: 'flex', alignItems: 'center', gap: 8, paddingLeft: 4 }}>
        <span style={{ color: highlight ? 'var(--accent)' : 'var(--ink-3)' }}>{title.toUpperCase()}</span>
        <span style={{ fontFamily: 'var(--font-mono)', color: 'var(--ink-4)', fontSize: 10 }}>{String(count).padStart(2, '0')}</span>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
        {items.map((it, i) => (
          <React.Fragment key={i}>
            {insertAt === i && <DropIndicator />}
            {it.ghost
              ? <GhostBlock title={it.title} project={it.project} />
              : <KanbanCard title={it.title} project={it.project} dim={dim} />}
          </React.Fragment>
        ))}
        {insertAt === items.length && <DropIndicator />}
      </div>
    </div>
  );
}

function KanbanCard({ title, project, dim }) {
  return (
    <div className="block s-todo" style={{ position: 'relative', height: 72, opacity: dim ? 0.45 : 1 }}>
      <div className="block-inner">
        <span style={{ color: 'var(--s)', display: 'flex' }}>
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"><circle cx="12" cy="12" r="6" /></svg>
        </span>
        <div className="block-title">{title}</div>
        <div className="block-meta">{project}</div>
        <span className="block-dot" />
      </div>
    </div>
  );
}

function GhostBlock({ title, project }) {
  return (
    <div style={{
      position: 'relative',
      height: 72,
      border: '1.5px dashed var(--border-strong)',
      background: 'transparent',
      borderRadius: 'var(--r-md)',
      opacity: 0.45,
    }}>
      <div style={{
        position: 'absolute', inset: 0,
        display: 'flex', alignItems: 'center', gap: 10,
        padding: '12px 14px',
        fontFamily: 'var(--font-mono)', fontSize: 10.5, color: 'var(--ink-4)',
        textTransform: 'uppercase', letterSpacing: '.08em',
      }}>
        <span>moving…</span>
      </div>
    </div>
  );
}

function DropIndicator() {
  return (
    <div style={{
      position: 'relative',
      height: 0,
      margin: '4px 4px',
    }}>
      <div style={{
        position: 'absolute', left: 0, right: 0, top: -1,
        height: 3,
        background: 'var(--accent)',
        borderRadius: 2,
        boxShadow: '0 0 0 4px var(--accent-tint)',
      }} />
      <div style={{
        position: 'absolute', left: -4, top: -5,
        width: 8, height: 8, borderRadius: '50%',
        background: 'var(--accent)',
        boxShadow: '0 0 0 3px var(--accent-tint)',
      }} />
    </div>
  );
}

function DraggedBlock() {
  return (
    <div style={{
      position: 'absolute',
      top: 96, left: '32%',
      width: 280, height: 78,
      transform: 'rotate(-1.5deg)',
      pointerEvents: 'none',
      zIndex: 10,
    }}>
      {/* cursor */}
      <svg width="22" height="22" viewBox="0 0 22 22" style={{ position: 'absolute', top: -4, left: -6, color: 'var(--ink)' }}>
        <path d="M2 1 L2 16 L7 12 L10 19 L13 18 L10 12 L17 12 Z" fill="white" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" />
      </svg>

      <div className="block s-todo" style={{
        position: 'static',
        background: 'var(--surface)',
        border: '1.5px solid var(--accent)',
        boxShadow: '0 18px 40px rgba(20, 18, 12, 0.18), 0 2px 6px rgba(20, 18, 12, 0.08), 0 0 0 4px var(--accent-tint)',
        height: 78,
      }}>
        <div className="block-inner">
          <span style={{ color: 'var(--accent)', display: 'flex' }}>
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"><circle cx="12" cy="12" r="6" /></svg>
          </span>
          <div className="block-title">Coffee w/ Maya</div>
          <div className="block-meta">PERSONAL</div>
          <span className="block-dot" style={{ background: 'var(--accent)' }} />
        </div>
      </div>

      {/* trail */}
      <div style={{
        position: 'absolute',
        top: 14, left: -52, width: 60, height: 50,
        opacity: 0.25,
      }}>
        <svg width="60" height="50" viewBox="0 0 60 50">
          <path d="M0 40 Q 20 35, 30 25 T 60 10" stroke="var(--accent)" strokeWidth="1.5" fill="none" strokeDasharray="2 4" strokeLinecap="round" />
        </svg>
      </div>
    </div>
  );
}

function GhostDot()   { return <div style={{ width: 22, height: 22, border: '1.5px dashed var(--border-strong)', borderRadius: 4, background: 'transparent' }} />; }
function DropDot()    { return <div style={{ width: 22, height: 6, background: 'var(--accent)', borderRadius: 3, boxShadow: '0 0 0 3px var(--accent-tint)', marginTop: 8 }} />; }
function DraggedDot() { return <div style={{ width: 22, height: 22, border: '1.5px solid var(--accent)', borderRadius: 4, background: 'var(--surface)', boxShadow: '0 4px 10px rgba(0,0,0,.14)', transform: 'rotate(-3deg)' }} />; }
function ColDot()     { return <div style={{ width: 22, height: 22, borderRadius: 4, background: 'var(--accent-tint)' }} />; }

function Legend({ dot, title, body }) {
  return (
    <div style={{ display: 'flex', gap: 12, flex: 1, minWidth: 0, maxWidth: 280 }}>
      <div style={{ width: 22, flexShrink: 0, display: 'flex', alignItems: 'flex-start', paddingTop: 2 }}>{dot}</div>
      <div style={{ minWidth: 0 }}>
        <div style={{ fontFamily: 'var(--font-mono)', fontSize: 10.5, color: 'var(--ink-3)', textTransform: 'uppercase', letterSpacing: '.08em', marginBottom: 4 }}>{title}</div>
        <div style={{ fontSize: 12.5, color: 'var(--ink-2)', lineHeight: 1.55 }}>{body}</div>
      </div>
    </div>
  );
}

// ─── Mobile · Block detail ─────────────────────────────────
export function ExploreBlockDetail() {
  return (
    <div style={{
      width: 390, height: 844,
      background: 'var(--bg)',
      fontFamily: 'var(--font-sans)',
      color: 'var(--ink)',
      position: 'relative',
      overflow: 'hidden',
      display: 'flex', flexDirection: 'column',
    }}>
      <div className="mobile-statusbar" style={{ flex: '0 0 auto' }}>
        <span>9:41</span>
        <div style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
          <svg width="17" height="11" viewBox="0 0 17 11" fill="currentColor">
            <rect x="0" y="7" width="3" height="4" rx="0.5" />
            <rect x="4.5" y="5" width="3" height="6" rx="0.5" />
            <rect x="9" y="3" width="3" height="8" rx="0.5" />
            <rect x="13.5" y="1" width="3" height="10" rx="0.5" />
          </svg>
          <svg width="25" height="11" viewBox="0 0 25 11" fill="none">
            <rect x="0.5" y="0.5" width="21" height="10" rx="2.5" stroke="currentColor" opacity="0.4" />
            <rect x="22.5" y="3.5" width="1.5" height="4" rx="0.6" fill="currentColor" opacity="0.4" />
            <rect x="2" y="2" width="16" height="7" rx="1.5" fill="currentColor" />
          </svg>
        </div>
      </div>

      {/* Nav bar */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '4px 8px 14px 8px', flex: '0 0 auto' }}>
        <button style={{ display: 'flex', alignItems: 'center', gap: 4, padding: '8px 10px', border: 'none', background: 'transparent', color: 'var(--ink-2)', fontSize: 13, fontFamily: 'var(--font-sans)', cursor: 'pointer' }}>
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"><path d="M9 2L4 7l5 5" /></svg>
          Studio
        </button>
        <div className="crumb" style={{ fontSize: 11 }}>
          <span>This week</span>
          <span className="crumb-sep">/</span>
          <span className="crumb-current">Ship v2.1</span>
        </div>
        <button style={{ width: 36, height: 36, borderRadius: 18, background: 'var(--surface-2)', border: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--ink-2)', cursor: 'pointer' }}>
          <IconMore size={16} />
        </button>
      </div>

      <div style={{ flex: 1, overflow: 'auto', padding: '0 20px 20px' }}>
        {/* Title + icon */}
        <div style={{ display: 'flex', alignItems: 'flex-start', gap: 14, padding: '8px 0 18px' }}>
          <div style={{ width: 44, height: 44, borderRadius: 12, border: '1.5px solid var(--accent)', background: 'var(--accent-tint)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, marginTop: 2 }}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--accent)" strokeWidth="1.6" strokeLinecap="round"><circle cx="12" cy="12" r="7" /></svg>
          </div>
          <div style={{ minWidth: 0, flex: 1 }}>
            <h1 style={{ margin: 0, fontSize: 24, fontWeight: 600, letterSpacing: -0.6, lineHeight: 1.15 }}>Ship v2.1 release</h1>
            <div style={{ display: 'flex', gap: 6, alignItems: 'center', marginTop: 6 }}>
              <span style={{ display: 'inline-flex', alignItems: 'center', gap: 5, padding: '3px 8px', background: 'var(--accent-tint)', color: 'var(--accent)', borderRadius: 999, fontFamily: 'var(--font-mono)', fontSize: 10, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '.08em' }}>
                <span style={{ width: 5, height: 5, borderRadius: '50%', background: 'var(--accent)' }} />
                Doing
              </span>
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: 10.5, color: 'var(--ink-3)', letterSpacing: '.05em' }}>· ENGINEERING · WED MAY 14</span>
            </div>
          </div>
        </div>

        {/* meta strip */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 1, border: '1px solid var(--border)', borderRadius: 10, overflow: 'hidden', background: 'var(--border)', marginBottom: 18 }}>
          {[
            { label: 'View as',   value: 'Kanban', mono: false },
            { label: 'Schedule',  value: '2:00 – 5:00pm', mono: true },
            { label: 'Project',   value: 'Engineering' },
            { label: 'Estimate',  value: '3 h · 2 left', mono: true },
          ].map((m, i) => (
            <div key={i} style={{ background: 'var(--surface)', padding: '10px 12px' }}>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: 9.5, color: 'var(--ink-3)', textTransform: 'uppercase', letterSpacing: '.1em', marginBottom: 3 }}>{m.label}</div>
              <div style={{ fontSize: 13, fontWeight: 500, color: 'var(--ink)', fontFamily: m.mono ? 'var(--font-mono)' : 'var(--font-sans)' }}>{m.value}</div>
            </div>
          ))}
        </div>

        {/* Children */}
        <div className="section-label" style={{ padding: '0 0 8px' }}>Inside this block</div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 6, marginBottom: 18 }}>
          {[
            { t: 'Cut release branch',    done: true },
            { t: 'Smoke test prod build', done: true },
            { t: 'Update CHANGELOG',      done: false, doing: true },
            { t: 'Tag v2.1 + push',       done: false },
            { t: 'Post in #releases',     done: false },
          ].map((c, i) => (
            <div key={i} style={{
              display: 'flex', alignItems: 'center', gap: 10,
              padding: '10px 12px',
              background: c.doing ? '#FFFBF9' : 'var(--surface)',
              border: `1px solid ${c.doing ? 'var(--accent)' : 'var(--border)'}`,
              borderRadius: 10,
            }}>
              <span style={{
                width: 16, height: 16, borderRadius: '50%',
                border: '1.5px solid ' + (c.done ? 'var(--ink-3)' : c.doing ? 'var(--accent)' : 'var(--border-strong)'),
                background: c.done ? 'var(--ink-3)' : 'transparent',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                flexShrink: 0,
              }}>
                {c.done && <svg width="9" height="9" viewBox="0 0 9 9" fill="none" stroke="white" strokeWidth="1.8" strokeLinecap="round"><path d="M2 5l2 2 3-4" /></svg>}
              </span>
              <span style={{ flex: 1, fontSize: 13.5, color: c.done ? 'var(--ink-3)' : 'var(--ink)', textDecoration: c.done ? 'line-through' : 'none', textDecorationColor: 'var(--ink-4)' }}>{c.t}</span>
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: 'var(--ink-4)', textTransform: 'uppercase' }}>
                {c.doing ? 'Now' : c.done ? '· done' : ''}
              </span>
            </div>
          ))}
          <div style={{
            display: 'flex', alignItems: 'center', gap: 8,
            padding: '10px 12px',
            border: '1.5px dashed var(--border-strong)',
            borderRadius: 10,
            color: 'var(--ink-3)',
            fontFamily: 'var(--font-mono)', fontSize: 11, textTransform: 'uppercase', letterSpacing: '.08em',
            cursor: 'pointer',
          }}>
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"><path d="M6 2v8M2 6h8" /></svg>
            <span>Add child block</span>
          </div>
        </div>

        {/* Notes */}
        <div className="section-label" style={{ padding: '0 0 8px' }}>Notes</div>
        <div style={{
          background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 10,
          padding: '14px 14px', fontSize: 13.5, color: 'var(--ink-2)', lineHeight: 1.55,
        }}>
          Cutting from <span style={{ fontFamily: 'var(--font-mono)', fontSize: 12, background: 'var(--subtle)', padding: '1px 6px', borderRadius: 4 }}>release/2.1</span>. Onboarding flow polish landed; calendar morph still flickers on Safari 17.
        </div>

        {/* Activity */}
        <div className="section-label" style={{ padding: '18px 0 8px' }}>Activity</div>
        {[
          { who: 'You',  what: 'moved to Doing',           when: '12m' },
          { who: 'Maya', what: 'commented · "ready when"', when: '1h'  },
          { who: 'You',  what: 'created from inbox',        when: 'Mon' },
        ].map((a, i) => (
          <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '8px 4px' }}>
            <div style={{ width: 26, height: 26, borderRadius: 13, background: 'var(--ink)', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 10, fontWeight: 600 }}>
              {a.who === 'You' ? 'AM' : a.who[0]}
            </div>
            <span style={{ flex: 1, fontSize: 12.5, color: 'var(--ink-2)' }}><strong style={{ color: 'var(--ink)', fontWeight: 500 }}>{a.who}</strong> {a.what}</span>
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: 'var(--ink-4)' }}>{a.when}</span>
          </div>
        ))}
      </div>

      {/* Action bar */}
      <div style={{
        flex: '0 0 auto',
        padding: '12px 16px 28px',
        borderTop: '1px solid var(--border)',
        background: 'var(--surface)',
        display: 'flex', gap: 8, alignItems: 'center',
      }}>
        <button style={{
          flex: 1, height: 44, borderRadius: 12, border: 'none',
          background: 'var(--ink)', color: '#fff',
          fontSize: 14, fontWeight: 500, fontFamily: 'var(--font-sans)', cursor: 'pointer',
        }}>Mark done</button>
        <button style={{
          width: 44, height: 44, borderRadius: 12, border: '1px solid var(--border)',
          background: 'var(--surface)', cursor: 'pointer',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          color: 'var(--ink-2)',
        }}>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"><circle cx="12" cy="12" r="9" /><path d="M9 12l2 2 4-4" /></svg>
        </button>
        <button style={{
          width: 44, height: 44, borderRadius: 12, border: '1px solid var(--border)',
          background: 'var(--surface)', cursor: 'pointer',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          color: 'var(--ink-2)',
        }}>
          <IconMore size={18} />
        </button>
      </div>

      <div className="mobile-home-indicator" />
    </div>
  );
}

// ─── Focus mode (mobile) — Pomodoro full-screen ─────────────
export function ExploreFocusMobile() {
  const total = 25 * 60;
  const elapsed = 7 * 60 + 12;
  const left = total - elapsed;
  const progress = elapsed / total;
  const C = 2 * Math.PI * 110;
  const fmt = (s) => `${String(Math.floor(s / 60)).padStart(2, '0')}:${String(s % 60).padStart(2, '0')}`;

  return (
    <div style={{
      width: 390, height: 844,
      background: 'linear-gradient(180deg, #1A1814 0%, #29251E 100%)',
      color: '#FAFAF8',
      position: 'relative', overflow: 'hidden',
      display: 'flex', flexDirection: 'column',
      fontFamily: 'var(--font-sans)',
    }}>
      <div style={{ height: 44, display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 22px 0 28px', flex: '0 0 auto' }}>
        <span style={{ fontSize: 14, fontWeight: 600 }}>9:41</span>
        <div style={{ display: 'flex', alignItems: 'center', gap: 5, color: '#fff' }}>
          <svg width="17" height="11" viewBox="0 0 17 11" fill="currentColor">
            <rect x="0" y="7" width="3" height="4" rx="0.5" /><rect x="4.5" y="5" width="3" height="6" rx="0.5" />
            <rect x="9" y="3" width="3" height="8" rx="0.5" /><rect x="13.5" y="1" width="3" height="10" rx="0.5" />
          </svg>
          <svg width="25" height="11" viewBox="0 0 25 11" fill="none">
            <rect x="0.5" y="0.5" width="21" height="10" rx="2.5" stroke="currentColor" opacity="0.4" />
            <rect x="22.5" y="3.5" width="1.5" height="4" rx="0.6" fill="currentColor" opacity="0.4" />
            <rect x="2" y="2" width="16" height="7" rx="1.5" fill="currentColor" />
          </svg>
        </div>
      </div>
      <div style={{ padding: '8px 18px 12px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <button style={{ width: 36, height: 36, borderRadius: 18, background: 'rgba(255,255,255,0.08)', border: 'none', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"><path d="M3 7h8" /></svg>
        </button>
        <div style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'rgba(255,255,255,0.55)', textTransform: 'uppercase', letterSpacing: '.1em' }}>
          Focus · Cycle 2 of 4
        </div>
        <button style={{ width: 36, height: 36, borderRadius: 18, background: 'rgba(255,255,255,0.08)', border: 'none', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"><path d="M11 9V6a4 4 0 1 0-8 0v3l-1 2h10z" /><path d="M5 12a2 2 0 0 0 4 0" /></svg>
        </button>
      </div>

      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '8px 32px' }}>
        <div style={{ position: 'relative', width: 260, height: 260 }}>
          <svg width="260" height="260" viewBox="0 0 260 260">
            <circle cx="130" cy="130" r="110" stroke="rgba(255,255,255,0.08)" strokeWidth="6" fill="none" />
            <circle cx="130" cy="130" r="110" stroke="var(--accent)" strokeWidth="6" fill="none"
              strokeLinecap="round"
              strokeDasharray={`${progress * C} ${C}`}
              transform="rotate(-90 130 130)" />
            {[0, 0.2, 0.4, 0.6, 0.8].map((t, i) => {
              const a = (t * 2 * Math.PI) - Math.PI / 2;
              return <line key={i} x1={130 + Math.cos(a) * 100} y1={130 + Math.sin(a) * 100} x2={130 + Math.cos(a) * 92} y2={130 + Math.sin(a) * 92} stroke="rgba(255,255,255,0.2)" strokeWidth="2" strokeLinecap="round" />;
            })}
          </svg>
          <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: 'rgba(255,255,255,0.5)', textTransform: 'uppercase', letterSpacing: '.16em', marginBottom: 8 }}>Remaining</div>
            <div style={{ fontSize: 64, fontWeight: 200, letterSpacing: '-2px', fontFamily: 'var(--font-mono)', color: '#fff', lineHeight: 1 }}>{fmt(left)}</div>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'rgba(255,255,255,0.4)', marginTop: 8 }}>{fmt(elapsed)} / {fmt(total)}</div>
          </div>
        </div>

        <div style={{ marginTop: 36, display: 'flex', alignItems: 'center', gap: 14, padding: '14px 18px', background: 'rgba(255,255,255,0.06)', borderRadius: 14, border: '1px solid rgba(255,255,255,0.1)', minWidth: 280 }}>
          <div style={{ width: 38, height: 38, borderRadius: 10, background: 'var(--accent-tint-strong)', border: '1.5px solid var(--accent)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--accent)" strokeWidth="1.6" strokeLinecap="round"><circle cx="12" cy="12" r="7" /></svg>
          </div>
          <div style={{ minWidth: 0, flex: 1 }}>
            <div style={{ fontSize: 15, fontWeight: 500, letterSpacing: '-0.2px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>Ship v2.1 release</div>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: 'rgba(255,255,255,0.45)', textTransform: 'uppercase', letterSpacing: '.08em', marginTop: 2 }}>Engineering · 3 of 5 done</div>
          </div>
        </div>

        <div style={{ display: 'flex', gap: 8, marginTop: 22 }}>
          {[0, 1, 2, 3].map((i) => (
            <div key={i} style={{
              width: i === 1 ? 28 : 8, height: 8, borderRadius: 4,
              background: i < 1 ? 'var(--accent)' : i === 1 ? 'var(--accent)' : 'rgba(255,255,255,0.15)',
            }} />
          ))}
        </div>
        <div style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: 'rgba(255,255,255,0.45)', textTransform: 'uppercase', letterSpacing: '.1em', marginTop: 10 }}>
          25m focus · 5m break · then a long break
        </div>
      </div>

      <div style={{ padding: '0 24px 18px', display: 'flex', gap: 12, alignItems: 'center', flex: '0 0 auto' }}>
        <button style={{ width: 56, height: 56, borderRadius: 28, background: 'rgba(255,255,255,0.08)', border: 'none', color: '#fff', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor"><rect x="3" y="3" width="10" height="10" rx="1" /></svg>
        </button>
        <button style={{ flex: 1, height: 56, borderRadius: 28, background: 'var(--accent)', border: 'none', color: '#fff', cursor: 'pointer', fontSize: 16, fontWeight: 600, fontFamily: 'var(--font-sans)', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8 }}>
          <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor"><rect x="3" y="3" width="3" height="10" rx="1" /><rect x="10" y="3" width="3" height="10" rx="1" /></svg>
          Pause
        </button>
        <button style={{ width: 56, height: 56, borderRadius: 28, background: 'rgba(255,255,255,0.08)', border: 'none', color: '#fff', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor"><path d="M4 3l7 5-7 5z" /><rect x="11" y="3" width="2" height="10" rx="1" /></svg>
        </button>
      </div>

      <div style={{ height: 22, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
        <div style={{ width: 110, height: 4, background: '#fff', borderRadius: 2, opacity: .35 }} />
      </div>
    </div>
  );
}

// ─── Focus mode (desktop) — Pomodoro persistent in dock + on-block ring ──
export function ExploreFocusDesktop() {
  const progress = 0.29;
  const C = 2 * Math.PI * 13;
  return (
    <div style={{
      width: 1280, height: 740,
      background: 'var(--bg)',
      fontFamily: 'var(--font-sans)',
      color: 'var(--ink)',
      position: 'relative', overflow: 'hidden',
      padding: 40,
    }}>
      <div style={{ display: 'flex', alignItems: 'baseline', gap: 14, marginBottom: 28 }}>
        <h2 style={{ margin: 0, fontSize: 22, fontWeight: 600, letterSpacing: -0.4 }}>Focus mode · always-on</h2>
        <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--ink-3)', textTransform: 'uppercase', letterSpacing: '.08em' }}>
          Block · timer · context — never hidden
        </span>
      </div>

      <div style={{ position: 'relative', background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 'var(--r-lg)', padding: 28, height: 460 }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 18 }}>
          {[
            { c: 'To do',  n: '05', items: [{ t: 'Coffee w/ Maya', p: 'PERSONAL' }, { t: 'Pitch deck v3', p: 'DESIGN' }, { t: 'Plan Q3 roadmap', p: 'RESEARCH' }] },
            { c: 'Doing',  n: '04', active: true },
            { c: 'Review', n: '01', items: [{ t: 'Review onboarding', p: 'DESIGN' }] },
            { c: 'Done',   n: '02', items: [{ t: 'Team weekly', p: 'ROUTINE' }, { t: 'Morning pages', p: 'ROUTINE' }] },
          ].map((col, ci) => (
            <div key={ci} style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              <div className="deco" style={{ position: 'static', height: 26, display: 'flex', alignItems: 'center', gap: 8 }}>
                <span>{col.c.toUpperCase()}</span>
                <span style={{ fontFamily: 'var(--font-mono)', color: 'var(--ink-4)', fontSize: 10 }}>{col.n}</span>
              </div>
              {col.active ? (
                <>
                  <div className="block s-doing is-doing" style={{
                    position: 'static', height: 82,
                    border: '1.5px solid var(--accent)',
                    boxShadow: '0 0 0 4px var(--accent-tint), var(--shadow-md)',
                    background: '#FFFBF9',
                  }}>
                    <div className="block-inner">
                      <span style={{ color: 'var(--accent)', display: 'flex' }}>
                        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"><circle cx="12" cy="12" r="6" /></svg>
                      </span>
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <div className="block-title">Ship v2.1 release</div>
                        <div style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: 'var(--accent)', textTransform: 'uppercase', letterSpacing: '.08em', marginTop: 2, fontWeight: 600 }}>
                          FOCUS · 17:48 LEFT
                        </div>
                      </div>
                      <svg width="32" height="32" viewBox="0 0 32 32" style={{ flexShrink: 0 }}>
                        <circle cx="16" cy="16" r="13" stroke="var(--border)" strokeWidth="2.5" fill="none" />
                        <circle cx="16" cy="16" r="13" stroke="var(--accent)" strokeWidth="2.5" fill="none"
                          strokeLinecap="round"
                          strokeDasharray={`${progress * C} ${C}`}
                          transform="rotate(-90 16 16)" />
                        <circle cx="16" cy="16" r="2.5" fill="var(--accent)" />
                      </svg>
                    </div>
                  </div>
                  <SimpleCard title="Synthesize user research" project="RESEARCH" />
                  <SimpleCard title="API rewrite" project="ENGINEERING" />
                  <SimpleCard title="Reading list" project="PERSONAL" dim />
                </>
              ) : (
                col.items.map((it, j) => <SimpleCard key={j} title={it.t} project={it.p} dim={ci === 3} />)
              )}
            </div>
          ))}
        </div>

        <div style={{ position: 'absolute', left: '50%', bottom: 24, transform: 'translateX(-50%)' }}>
          <FocusDock progress={progress} />
        </div>
      </div>

      <div style={{ marginTop: 22, display: 'flex', gap: 36 }}>
        <Legend dot={<RingDot p={progress} />} title="On-block ring" body="Tiny progress arc on the focused block — visible peripherally without leaving the work." />
        <Legend dot={<PillDot />} title="Dock timer pill" body="Persistent across views; click → expands into focus mode. Time, block name, controls — no context switch." />
        <Legend dot={<CtxDot />} title="Quick controls" body="Pause / +5 min / skip live in the pill. Tapping the title jumps back to the block detail." />
      </div>
    </div>
  );
}

function SimpleCard({ title, project, dim }) {
  return (
    <div className="block s-todo" style={{ position: 'static', height: 72, opacity: dim ? 0.55 : 1 }}>
      <div className="block-inner">
        <span style={{ color: 'var(--s)', display: 'flex' }}>
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"><circle cx="12" cy="12" r="6" /></svg>
        </span>
        <div className="block-title">{title}</div>
        <div className="block-meta">{project}</div>
        <span className="block-dot" />
      </div>
    </div>
  );
}

function FocusDock({ progress }) {
  const C = 2 * Math.PI * 12;
  return (
    <div className="dock" style={{ gap: 4, padding: 6 }}>
      <div className="dock-item is-active"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6"><circle cx="12" cy="12" r="3" fill="currentColor" stroke="none" /></svg></div>
      <div className="dock-item"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6"><rect x="4.5" y="4.5" width="15" height="15" rx="1" /></svg></div>
      <div className="dock-item"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"><path d="M5 13v6h14v-6M5 13l3-8h8l3 8" /></svg></div>
      <div className="dock-divider" />
      <div style={{
        display: 'flex', alignItems: 'center', gap: 10,
        background: 'var(--accent-tint)',
        border: '1.5px solid var(--accent)',
        padding: '4px 12px 4px 6px',
        borderRadius: 999, height: 38,
        cursor: 'pointer',
      }}>
        <svg width="28" height="28" viewBox="0 0 28 28">
          <circle cx="14" cy="14" r="12" stroke="var(--accent-tint-strong)" strokeWidth="2.5" fill="none" />
          <circle cx="14" cy="14" r="12" stroke="var(--accent)" strokeWidth="2.5" fill="none"
            strokeLinecap="round"
            strokeDasharray={`${progress * C} ${C}`}
            transform="rotate(-90 14 14)" />
          <rect x="9" y="9" width="3" height="10" rx="1" fill="var(--accent)" />
          <rect x="16" y="9" width="3" height="10" rx="1" fill="var(--accent)" />
        </svg>
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <span style={{ fontSize: 12.5, fontWeight: 600, color: 'var(--ink)', letterSpacing: '-0.1px', lineHeight: 1.2 }}>Ship v2.1</span>
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: 10.5, color: 'var(--accent)', fontWeight: 600, lineHeight: 1.2 }}>17:48</span>
        </div>
      </div>
      <div className="dock-item" title="+5 min"><svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"><circle cx="8" cy="8" r="6" /><path d="M8 5v3l2 1" /></svg></div>
      <div className="dock-item" title="Skip"><svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor"><path d="M3 3l7 5-7 5z" /><rect x="10" y="3" width="2" height="10" rx="1" /></svg></div>
      <div className="dock-divider" />
      <div className="dock-item is-creator">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M12 5v14M5 12h14" /></svg>
      </div>
    </div>
  );
}

function RingDot({ p }) {
  const C = 2 * Math.PI * 8;
  return (
    <svg width="22" height="22" viewBox="0 0 22 22">
      <circle cx="11" cy="11" r="8" stroke="var(--border-strong)" strokeWidth="2" fill="none" />
      <circle cx="11" cy="11" r="8" stroke="var(--accent)" strokeWidth="2" fill="none" strokeLinecap="round" strokeDasharray={`${p * C} ${C}`} transform="rotate(-90 11 11)" />
    </svg>
  );
}
function PillDot() {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 4, padding: '3px 6px', background: 'var(--accent-tint)', border: '1.5px solid var(--accent)', borderRadius: 999 }}>
      <div style={{ width: 6, height: 6, borderRadius: '50%', background: 'var(--accent)' }} />
      <span style={{ fontFamily: 'var(--font-mono)', fontSize: 8, fontWeight: 600, color: 'var(--accent)' }}>17:48</span>
    </div>
  );
}
function CtxDot() {
  return (
    <svg width="22" height="22" viewBox="0 0 22 22" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" style={{ color: 'var(--accent)' }}>
      <rect x="4" y="6" width="3" height="10" rx="1" fill="currentColor" />
      <rect x="9" y="6" width="3" height="10" rx="1" fill="currentColor" />
      <path d="M15 8l4 3-4 3z" fill="currentColor" />
    </svg>
  );
}

// ─── Mobile calendar drag-to-reschedule ─────────────────────
export function ExploreCalendarDrag() {
  const hours = [7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18];
  const hourH = 50;
  const gutterW = 44;
  const blocks = [
    { t: 'Morning pages',   project: 'ROUTINE',   start: 7,  h: 1,   doing: false },
    { t: 'Coffee w/ Maya',  project: 'PERSONAL',  start: 9,  h: 1,   doing: false },
    { t: 'Ship v2.1',       project: 'ENGINEERING', start: 14, h: 3, doing: true, dragging: true },
    { t: 'Reading',         project: 'PERSONAL',  start: 18, h: 1,   doing: false },
  ];
  // The block being dragged: visually offset, target sits where it'll land
  const dragged = blocks.find((b) => b.dragging);
  const targetStart = 11; // user is hovering 11AM
  const targetTop = (targetStart - hours[0]) * hourH + 2;
  const targetH = dragged.h * hourH - 4;

  return (
    <div style={{
      width: 390, height: 844,
      background: 'var(--bg)',
      fontFamily: 'var(--font-sans)',
      color: 'var(--ink)',
      position: 'relative', overflow: 'hidden',
      display: 'flex', flexDirection: 'column',
    }}>
      {/* status bar */}
      <div style={{ height: 44, display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 22px 0 28px', flex: '0 0 auto', fontSize: 14, fontWeight: 600 }}>
        <span>9:41</span>
        <div style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
          <svg width="17" height="11" viewBox="0 0 17 11" fill="currentColor">
            <rect x="0" y="7" width="3" height="4" rx="0.5" /><rect x="4.5" y="5" width="3" height="6" rx="0.5" />
            <rect x="9" y="3" width="3" height="8" rx="0.5" /><rect x="13.5" y="1" width="3" height="10" rx="0.5" />
          </svg>
          <svg width="25" height="11" viewBox="0 0 25 11" fill="none">
            <rect x="0.5" y="0.5" width="21" height="10" rx="2.5" stroke="currentColor" opacity="0.4" />
            <rect x="2" y="2" width="16" height="7" rx="1.5" fill="currentColor" />
          </svg>
        </div>
      </div>

      {/* title */}
      <div style={{ padding: '6px 20px 14px', flex: '0 0 auto' }}>
        <div style={{ fontFamily: 'var(--font-mono)', fontSize: 10.5, color: 'var(--accent)', textTransform: 'uppercase', letterSpacing: '.1em', fontWeight: 600, marginBottom: 4 }}>
          Hold + drag · 400ms
        </div>
        <h1 style={{ margin: 0, fontSize: 22, fontWeight: 600, letterSpacing: -0.4 }}>Wednesday · May 14</h1>
      </div>

      {/* calendar */}
      <div style={{ flex: 1, padding: '0 16px 16px', overflow: 'hidden' }}>
        <div style={{ height: '100%', overflow: 'auto', background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 12, position: 'relative' }}>
          <div style={{ display: 'flex' }}>
            <div style={{ width: gutterW, flexShrink: 0, paddingTop: 4 }}>
              {hours.map((h) => (
                <div key={h} style={{ height: hourH, display: 'flex', alignItems: 'flex-start', justifyContent: 'flex-end', paddingRight: 6, paddingTop: 4 }}>
                  <span style={{ fontFamily: 'var(--font-mono)', fontSize: 10, fontWeight: 500, color: 'var(--ink-3)' }}>
                    {h < 12 ? `${h}AM` : h === 12 ? '12PM' : `${h - 12}PM`}
                  </span>
                </div>
              ))}
            </div>
            <div style={{ flex: 1, position: 'relative', borderLeft: '1px solid var(--border)' }}>
              {hours.map((h) => (<div key={h} style={{ height: hourH, borderBottom: '1px solid var(--subtle)' }} />))}

              {/* Static blocks */}
              {blocks.filter((b) => !b.dragging).map((b, i) => {
                const top = (b.start - hours[0]) * hourH + 2;
                return (
                  <div key={i} style={{
                    position: 'absolute', top, left: 4, right: 6,
                    height: b.h * hourH - 4,
                    background: 'var(--surface)',
                    border: '1px solid var(--border-strong)',
                    borderLeft: '3px solid var(--border-strong)',
                    borderRadius: 8,
                    padding: '6px 10px',
                    opacity: 0.6,
                  }}>
                    <div style={{ fontSize: 12, fontWeight: 500, color: 'var(--ink-2)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{b.t}</div>
                    <div style={{ fontFamily: 'var(--font-mono)', fontSize: 9.5, color: 'var(--ink-3)', textTransform: 'uppercase', letterSpacing: '.06em', marginTop: 2 }}>{b.project}</div>
                  </div>
                );
              })}

              {/* The dotted landing target — sits flat where the block will drop */}
              <div style={{
                position: 'absolute', top: targetTop, left: 4, right: 6,
                height: targetH,
                border: '2px dashed var(--accent)',
                borderRadius: 8,
                background: 'var(--accent-tint)',
                pointerEvents: 'none',
              }}>
                <div style={{ position: 'absolute', top: 6, left: 8, fontFamily: 'var(--font-mono)', fontSize: 9.5, color: 'var(--accent)', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '.08em' }}>
                  Drop here · 11:00 – 2:00
                </div>
              </div>

              {/* Corner ticks on the target so they're visible past the tilted card */}
              <Tick top={targetTop} left={4} dir="tl" />
              <Tick top={targetTop + targetH} left={4} dir="bl" />

              {/* The dragged block — tilted + offset up-right, hovering above */}
              <div style={{
                position: 'absolute',
                top: targetTop - 18,
                left: 28, right: -14,
                height: targetH,
                background: '#FFFBF9',
                border: '1.5px solid var(--accent)',
                borderLeft: '4px solid var(--accent)',
                borderRadius: 10,
                padding: '8px 12px',
                transform: 'rotate(-2.5deg)',
                transformOrigin: 'top left',
                boxShadow: '0 22px 44px rgba(20,18,12,0.22), 0 4px 10px rgba(20,18,12,0.10), 0 0 0 4px var(--accent-tint)',
                zIndex: 5,
              }}>
                <div style={{ display: 'flex', alignItems: 'baseline', gap: 6 }}>
                  <span style={{ fontSize: 14, fontWeight: 600, color: 'var(--ink)', letterSpacing: '-0.2px' }}>Ship v2.1</span>
                  <span style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: 'var(--accent)', fontWeight: 600, letterSpacing: '.06em', textTransform: 'uppercase' }}>· 3h</span>
                </div>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: 9.5, color: 'var(--ink-3)', textTransform: 'uppercase', letterSpacing: '.06em', marginTop: 3 }}>
                  ENGINEERING · was 2:00pm
                </div>
                {/* Time-change pill */}
                <div style={{
                  position: 'absolute', top: -12, right: 14,
                  background: 'var(--accent)', color: '#fff',
                  padding: '3px 9px', borderRadius: 999,
                  fontFamily: 'var(--font-mono)', fontSize: 10, fontWeight: 700, letterSpacing: '.06em',
                  boxShadow: '0 4px 10px rgba(20,18,12,0.18)',
                }}>−3h · 11:00 AM</div>
              </div>

              {/* Finger / cursor hint at the bottom-right of the dragged block */}
              <svg width="32" height="32" viewBox="0 0 32 32" style={{ position: 'absolute', top: targetTop + targetH - 30, right: -34, zIndex: 6 }}>
                <circle cx="16" cy="16" r="14" fill="var(--accent)" opacity="0.25" />
                <circle cx="16" cy="16" r="8" fill="var(--accent)" opacity="0.6" />
              </svg>
            </div>
          </div>
        </div>
      </div>

      {/* hint legend */}
      <div style={{ padding: '0 20px 20px', flex: '0 0 auto', display: 'flex', flexDirection: 'column', gap: 8 }}>
        {[
          { num: '1', t: 'Hold for 400 ms', s: 'Card tilts -2.5° and lifts on a soft shadow. Haptic tick.' },
          { num: '2', t: 'Offset up + right', s: 'So you can read the dotted target underneath — the top-left + bottom-left ticks stay visible for precision.' },
          { num: '3', t: 'Drop to reschedule', s: 'Snap to 15-min slots. Hover another block to nest. Hold over the dock to save as a routine template.' },
        ].map((s) => (
          <div key={s.num} style={{ display: 'flex', gap: 10, alignItems: 'flex-start' }}>
            <div style={{
              width: 22, height: 22, borderRadius: 11, background: 'var(--accent-tint)', color: 'var(--accent)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontFamily: 'var(--font-mono)', fontSize: 11, fontWeight: 700, flexShrink: 0,
            }}>{s.num}</div>
            <div style={{ minWidth: 0 }}>
              <div style={{ fontSize: 13, fontWeight: 600, color: 'var(--ink)', letterSpacing: '-0.1px' }}>{s.t}</div>
              <div style={{ fontSize: 11.5, color: 'var(--ink-3)', lineHeight: 1.45, marginTop: 1 }}>{s.s}</div>
            </div>
          </div>
        ))}
      </div>

      <div style={{ height: 22, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
        <div style={{ width: 110, height: 4, background: '#111', borderRadius: 2, opacity: .2 }} />
      </div>
    </div>
  );
}

function Tick({ top, left, dir }) {
  const isBottom = dir.startsWith('b');
  return (
    <div style={{
      position: 'absolute',
      top: isBottom ? top - 10 : top,
      left,
      width: 10, height: 10,
      borderTop: !isBottom ? '2px solid var(--accent)' : 'none',
      borderBottom: isBottom ? '2px solid var(--accent)' : 'none',
      borderLeft: '2px solid var(--accent)',
      pointerEvents: 'none',
      zIndex: 4,
    }} />
  );
}
