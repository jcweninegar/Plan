import React from 'react';
import { BLOCKS, LAYOUTS } from './data';
import {
  IconRoutine, IconCalendar, IconTask,
  IconList, IconKanban, IconTimeline,
  IconFilter, IconMore,
} from './icons';

// Plan. — The morphing workspace
// Single set of blocks. View switch animates the SAME nodes to new positions.

export const getInnerDims = (mode, view, frame) => {
  if (mode === 'mobile') {
    if (view === 'kanban') return { w: 1156, h: 1400 };
    if (view === 'gantt')  return { w: 760, h: frame.h };
    if (view === 'list')   return { w: frame.w, h: 1800 };
  }
  return { w: frame.w, h: frame.h };
};

// ─── Block ───────────────────────────────────────────────────
export function Block({ block, pos, isPeeked, onClick }) {
  if (!pos) return null;
  const { x, y, w, h, detail } = pos;
  const statusCls = `s-${block.status} is-${block.status}`;
  const icon =
    block.type === 'cycle' ? <IconRoutine size={13} stroke={1.6} />
    : block.type === 'event' ? <IconCalendar size={12} stroke={1.6} />
    : <IconTask size={13} stroke={1.6} />;

  return (
    <div className={`block ${statusCls} ${isPeeked ? 'is-peeked' : ''}`} data-detail={detail}
      style={{ transform: `translate(${x}px, ${y}px)`, width: w, height: h }}
      onClick={(e) => { e.stopPropagation(); onClick && onClick(); }}>
      <div className="block-inner">
        {detail === 'bar' ? (
          <>
            <span style={{ color: 'var(--s)', display: 'flex' }}>{icon}</span>
            <div className="block-title">{block.title}</div>
            <div className="block-meta">{block.durDays >= 1 ? `${block.durDays}d` : `${Math.round(block.durDays * 24)}h`}</div>
          </>
        ) : detail === 'compact' ? (
          <>
            <span className="block-dot" />
            <div className="block-title">{block.title}</div>
          </>
        ) : (
          <>
            <span style={{ color: 'var(--s)', display: 'flex' }}>{icon}</span>
            <div className="block-title">{block.title}</div>
            <div className="block-meta">{block.project}</div>
            <span className="block-dot" />
            <span className="block-peek-chev" title="See inside">
              <svg width="11" height="11" viewBox="0 0 11 11" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"><path d="M4 2l3 3.5L4 9" /></svg>
            </span>
          </>
        )}
      </div>
      {/* Resize handles — hover-only affordance */}
      <span className="block-resize block-resize-r" title="Drag to resize" />
      <span className="block-resize block-resize-b" title="Drag to resize" />
      <span className="block-resize block-resize-br" title="Drag to resize" />
    </div>
  );
}

// Popover anchored to a block — shows "what's inside" + actions.
function BlockPeek({ block, pos, innerW, onClose }) {
  const POPOVER_W = 280;
  const flipRight = (pos.x + POPOVER_W) > innerW - 16;
  const left = flipRight ? Math.max(8, pos.x + pos.w - POPOVER_W) : pos.x;
  const top = pos.y + pos.h + 10;

  const children = [
    { t: 'Cut release branch',    done: true  },
    { t: 'Smoke test prod build', done: true  },
    { t: 'Update CHANGELOG',      done: false, doing: true },
    { t: 'Tag v2.1 + push',       done: false },
  ];
  const accent = block.status === 'doing' ? 'var(--accent)' : 'var(--border-strong)';

  return (
    <>
      <div onClick={onClose}
        style={{ position: 'absolute', inset: 0, zIndex: 10, background: 'transparent', cursor: 'default' }} />

      <div style={{
        position: 'absolute',
        left, top,
        width: POPOVER_W,
        zIndex: 11,
        background: 'var(--surface)',
        border: '1px solid var(--border)',
        borderLeft: `3px solid ${accent}`,
        borderRadius: 'var(--r-md)',
        boxShadow: 'var(--shadow-lg)',
        overflow: 'hidden',
        animation: 'block-peek-in .18s ease-out',
        fontFamily: 'var(--font-sans)',
      }}>
        <div style={{ padding: '12px 14px 8px' }}>
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: 9.5, color: 'var(--ink-3)', textTransform: 'uppercase', letterSpacing: '.1em', marginBottom: 4 }}>
            {block.project} · {block.status}
          </div>
          <div style={{ display: 'flex', alignItems: 'flex-start', gap: 8, justifyContent: 'space-between' }}>
            <h3 style={{ margin: 0, fontSize: 15, fontWeight: 600, letterSpacing: '-0.2px', lineHeight: 1.2 }}>{block.title}</h3>
            <button onClick={onClose} style={{ background: 'transparent', border: 'none', cursor: 'pointer', color: 'var(--ink-3)', padding: 2, marginTop: 2, lineHeight: 1, fontSize: 16 }}>×</button>
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 1, background: 'var(--border)', margin: '0 -1px' }}>
          {[
            { label: 'Day',      value: ['Mon','Tue','Wed','Thu','Fri','Sat','Sun'][block.day] + ' May ' + (12 + block.day), mono: true },
            { label: 'Schedule', value: `${block.startHour}–${block.startHour + block.durHours}`, mono: true },
            { label: 'Estimate', value: block.durDays >= 1 ? `${block.durDays} d` : `${Math.round(block.durDays * 24)} h`, mono: true },
            { label: 'View as',  value: 'Kanban', mono: false },
          ].map((m, i) => (
            <div key={i} style={{ background: 'var(--surface)', padding: '8px 12px' }}>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: 9, color: 'var(--ink-3)', textTransform: 'uppercase', letterSpacing: '.1em', marginBottom: 2 }}>{m.label}</div>
              <div style={{ fontSize: 11.5, fontWeight: 500, color: 'var(--ink)', fontFamily: m.mono ? 'var(--font-mono)' : 'var(--font-sans)' }}>{m.value}</div>
            </div>
          ))}
        </div>

        <div style={{ padding: '10px 14px 6px' }}>
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: 9.5, color: 'var(--ink-3)', textTransform: 'uppercase', letterSpacing: '.1em', marginBottom: 8 }}>
            Inside · {children.length} blocks
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
            {children.map((c, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <span style={{
                  width: 13, height: 13, borderRadius: '50%',
                  border: '1.5px solid ' + (c.done ? 'var(--ink-3)' : c.doing ? 'var(--accent)' : 'var(--border-strong)'),
                  background: c.done ? 'var(--ink-3)' : 'transparent',
                  flexShrink: 0,
                }} />
                <span style={{ flex: 1, fontSize: 12, color: c.done ? 'var(--ink-3)' : 'var(--ink-2)', textDecoration: c.done ? 'line-through' : 'none', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{c.t}</span>
                {c.doing && <span style={{ fontFamily: 'var(--font-mono)', fontSize: 9, color: 'var(--accent)', textTransform: 'uppercase', letterSpacing: '.1em', fontWeight: 600 }}>Now</span>}
              </div>
            ))}
          </div>
        </div>

        <div style={{ padding: '6px 8px 10px', display: 'flex', gap: 6 }}>
          <button onClick={onClose}
            style={{ flex: 1, padding: '8px 12px', background: 'var(--ink)', color: 'white', border: 'none', borderRadius: 'var(--r-sm)', fontSize: 12, fontWeight: 500, cursor: 'pointer', fontFamily: 'var(--font-sans)' }}>
            Open block
          </button>
          <button
            style={{ padding: '8px 12px', background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 'var(--r-sm)', fontSize: 12, fontWeight: 500, cursor: 'pointer', fontFamily: 'var(--font-sans)', color: 'var(--ink-2)' }}>
            Morph to…
          </button>
        </div>
      </div>
    </>
  );
}

// ─── Decorations ─────────────────────────────────────────────
export function Decoration({ d }) {
  const baseStyle = {
    position: 'absolute',
    left: d.x, top: d.y, width: d.w, height: d.h,
  };
  if (d.kind === 'col-head') {
    return (
      <div className="deco" style={{ ...baseStyle, display: 'flex', alignItems: 'center', gap: 8, paddingLeft: 4 }}>
        <span contentEditable suppressContentEditableWarning
          onClick={(e) => e.stopPropagation()}
          style={{ outline: 'none', cursor: 'text', pointerEvents: 'auto', padding: '2px 4px', borderRadius: 4 }}
          onFocus={(e) => { e.currentTarget.style.background = 'var(--surface)'; e.currentTarget.style.boxShadow = 'inset 0 0 0 1px var(--border-strong)'; }}
          onBlur={(e) => { e.currentTarget.style.background = ''; e.currentTarget.style.boxShadow = ''; }}>
          {d.text}
        </span>
        <span style={{ fontFamily: 'var(--font-mono)', color: 'var(--ink-4)', fontSize: 10 }}>{String(d.count).padStart(2, '0')}</span>
      </div>
    );
  }
  if (d.kind === 'col-add') {
    return (
      <div style={{
        ...baseStyle,
        pointerEvents: 'auto',
        display: 'flex', alignItems: 'center', justifyContent: 'flex-start', gap: 6,
        cursor: 'pointer', padding: '0 8px',
        border: '1px dashed var(--border-strong)',
        borderRadius: 'var(--r-sm)',
        color: 'var(--ink-3)',
        fontFamily: 'var(--font-sans)',
        fontSize: 12, fontWeight: 500,
        transition: 'background .12s ease, color .12s ease, border-color .12s ease',
      }}
      onMouseEnter={(e) => { e.currentTarget.style.background = 'var(--accent-tint)'; e.currentTarget.style.color = 'var(--accent)'; e.currentTarget.style.borderColor = 'var(--accent)'; }}
      onMouseLeave={(e) => { e.currentTarget.style.background = ''; e.currentTarget.style.color = 'var(--ink-3)'; e.currentTarget.style.borderColor = 'var(--border-strong)'; }}>
        <svg width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"><path d="M6 2v8M2 6h8" /></svg>
        <span>Add column</span>
      </div>
    );
  }
  if (d.kind === 'day-head') {
    return (
      <div className="deco" style={{ ...baseStyle, display: 'flex', flexDirection: 'column', justifyContent: 'flex-start', padding: '2px 6px', textAlign: 'left' }}>
        <span style={{ fontSize: 10, color: 'var(--ink-4)' }}>{d.text}</span>
        <span style={{ fontFamily: 'var(--font-sans)', fontSize: 16, fontWeight: 500, color: 'var(--ink-2)', letterSpacing: -0.3, marginTop: 2 }}>{d.num}</span>
      </div>
    );
  }
  if (d.kind === 'day-cell') {
    return (
      <div style={{ ...baseStyle, background: 'var(--surface)', borderRadius: 8, border: '1px solid var(--border)' }} />
    );
  }
  if (d.kind === 'day-mark') {
    return (
      <div className="deco" style={{ ...baseStyle, display: 'flex', alignItems: 'center', gap: 6, paddingLeft: 6 }}>
        <span>{d.text}</span>
        <span style={{ fontFamily: 'var(--font-sans)', fontSize: 13, fontWeight: 500, color: 'var(--ink-2)', letterSpacing: -0.2 }}>{d.num}</span>
      </div>
    );
  }
  if (d.kind === 'row-label') {
    return (
      <div className="deco" style={{ ...baseStyle, display: 'flex', alignItems: 'center', paddingLeft: 2, fontSize: 11.5, color: 'var(--ink-2)', fontWeight: 500, textTransform: 'none', letterSpacing: 0, fontFamily: 'var(--font-sans)' }}>
        {d.text}
      </div>
    );
  }
  if (d.kind === 'rule-v') {
    return <div style={{ ...baseStyle, background: 'var(--border)' }} />;
  }
  if (d.kind === 'rule-h') {
    return <div style={{ ...baseStyle, background: 'var(--border)' }} />;
  }
  if (d.kind === 'group-h') {
    return (
      <div className="deco" style={{ ...baseStyle, display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingLeft: 2 }}>
        <span style={{ fontSize: 11, color: 'var(--ink-3)' }}>{d.text}</span>
        <span style={{ height: 1, flex: 1, background: 'var(--border)', marginLeft: 12 }} />
      </div>
    );
  }
  return null;
}

// ─── View switcher pill ─────────────────────────────────────
export const VIEW_DEFS = [
  { id: 'list',     label: 'Tasks',    Icon: IconList },
  { id: 'kanban',   label: 'Board',    Icon: IconKanban },
  { id: 'calendar', label: 'Calendar', Icon: IconCalendar },
  { id: 'gantt',    label: 'Timeline', Icon: IconTimeline },
];

export function ViewSwitch({ view, onView, compact = false }) {
  const ref = React.useRef(null);
  const [thumb, setThumb] = React.useState({ left: 0, width: 0 });
  React.useLayoutEffect(() => {
    if (!ref.current) return;
    const btn = ref.current.querySelector(`button[data-id="${view}"]`);
    if (btn) setThumb({ left: btn.offsetLeft, width: btn.offsetWidth });
  }, [view, compact]);
  return (
    <div className="view-switch" ref={ref}>
      <div className="pill-thumb" style={{ transform: `translateX(${thumb.left - 3}px)`, width: thumb.width }} />
      {VIEW_DEFS.map(({ id, label, Icon }) => (
        <button key={id} data-id={id} aria-pressed={view === id} onClick={() => onView(id)}>
          <Icon size={compact ? 14 : 15} stroke={1.6} />
          {!compact && <span>{label}</span>}
        </button>
      ))}
    </div>
  );
}

// ─── Workspace ──────────────────────────────────────────────
export function Workspace({ mode = 'desktop', frame, view, onView, scrollableX = true }) {
  const inner = getInnerDims(mode, view, frame);
  const layoutFn = LAYOUTS[view];
  const opts = {};
  if (mode === 'mobile') {
    if (view === 'kanban') { opts.cardH = 64; opts.gap = 10; }
    if (view === 'calendar') { opts.gap = 3; opts.cellH = 22; }
    if (view === 'gantt') { opts.labelW = 76; opts.rowH = 52; }
    if (view === 'list') { opts.rowH = 56; }
  }
  const layout = layoutFn(inner, opts);
  const computedInnerH = Math.max(inner.h, ...Object.values(layout.blocks).map(p => p.y + p.h + 20), 200);

  const [peekedId, setPeekedId] = React.useState(null);
  const peekedBlock = peekedId ? BLOCKS.find((b) => b.id === peekedId) : null;
  const peekedPos = peekedId ? layout.blocks[peekedId] : null;

  return (
    <div style={{
      position: 'relative',
      width: frame.w, height: frame.h,
      overflow: scrollableX ? 'auto' : 'auto',
      background: 'transparent',
    }}>
      <div style={{
        position: 'relative',
        width: inner.w,
        height: computedInnerH,
        minHeight: '100%',
      }}>
        {layout.decos.map(d => <Decoration key={`${view}-${d.id}`} d={d} />)}
        {BLOCKS.map(b => (
          <Block key={b.id} block={b} pos={layout.blocks[b.id]}
            isPeeked={b.id === peekedId}
            onClick={() => setPeekedId(peekedId === b.id ? null : b.id)} />
        ))}
        {peekedBlock && peekedPos && (
          <BlockPeek block={peekedBlock} pos={peekedPos} innerW={inner.w} onClose={() => setPeekedId(null)} />
        )}
      </div>
    </div>
  );
}
