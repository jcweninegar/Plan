// Plan. — Version B
// User's aesthetic: bright blue #2563EB, Helvetica Neue, lucide-style icons,
// big bold "Plan." wordmark with 1.5px accent rule, row-as-block.

const B_ACCENT = '#2563EB';
const B_FONT = '"Helvetica Neue", Helvetica, Arial, sans-serif';

// ─── Lucide-style icons ─────────────────────────────────────
// Simple geometric primitives with 1.5px stroke, no flourishes.

const LI = ({ size = 20, color = 'currentColor', stroke = 1.5, children, style }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none"
    stroke={color} strokeWidth={stroke} strokeLinecap="round" strokeLinejoin="round"
    style={{ display: 'block', flex: '0 0 auto', ...style }}>
    {children}
  </svg>
);

const LIKanban = (p) => <LI {...p}><rect x="3.5" y="3.5" width="17" height="17" rx="2.5" /><path d="M9 7v10M15 7v6" /></LI>;
const LICalendar = (p) => <LI {...p}><rect x="3.5" y="5.5" width="17" height="15" rx="2" /><path d="M3.5 10h17M8 3.5v4M16 3.5v4" /></LI>;
const LIGantt = (p) => <LI {...p}><path d="M8 7h7M4 12h10M11 17h8" /></LI>;
const LIList = (p) => (
  <LI {...p}>
    <line x1="8" x2="21" y1="6"  y2="6"  />
    <line x1="8" x2="21" y1="12" y2="12" />
    <line x1="8" x2="21" y1="18" y2="18" />
    <line x1="3" x2="3.01" y1="6"  y2="6"  />
    <line x1="3" x2="3.01" y1="12" y2="12" />
    <line x1="3" x2="3.01" y1="18" y2="18" />
  </LI>
);
const LIPlus = (p) => <LI {...p} stroke={p.stroke ?? 2}><path d="M12 5v14M5 12h14" /></LI>;
const LIMinus = (p) => <LI {...p} stroke={p.stroke ?? 2}><path d="M5 12h14" /></LI>;
const LISearch = (p) => <LI {...p}><circle cx="11" cy="11" r="6" /><path d="M16 16l4 4" /></LI>;
const LIChev = ({ dir = 'right', ...p }) => (
  <LI {...p}>
    <path d={
      dir === 'right' ? 'M9 6l6 6-6 6'
      : dir === 'left' ? 'M15 6l-6 6 6 6'
      : dir === 'down' ? 'M6 9l6 6 6-6'
      : 'M6 15l6-6 6 6'
    } />
  </LI>
);
const LIPanelTopOpen = (p) => <LI {...p}><rect x="3" y="3" width="18" height="18" rx="2" /><path d="M3 9h18" /><path d="M10 15l2-2 2 2" /></LI>;
const LIPanelTopClose = (p) => <LI {...p}><rect x="3" y="3" width="18" height="18" rx="2" /><path d="M3 9h18" /><path d="M10 13l2 2 2-2" /></LI>;
const LIPanelRightOpen = (p) => <LI {...p}><rect x="3" y="3" width="18" height="18" rx="2" /><path d="M15 3v18" /><path d="M10 10l-2 2 2 2" /></LI>;
const LIPanelRightClose = (p) => <LI {...p}><rect x="3" y="3" width="18" height="18" rx="2" /><path d="M15 3v18" /><path d="M8 10l2 2-2 2" /></LI>;
const LIMore = (p) => <LI {...p} stroke={0}><g fill={p.color || 'currentColor'}><circle cx="12" cy="6" r="1.4" /><circle cx="12" cy="12" r="1.4" /><circle cx="12" cy="18" r="1.4" /></g></LI>;
const LIGrip = (p) => <LI {...p} stroke={0}><g fill={p.color || 'currentColor'}><circle cx="9" cy="6" r="1.1" /><circle cx="15" cy="6" r="1.1" /><circle cx="9" cy="12" r="1.1" /><circle cx="15" cy="12" r="1.1" /><circle cx="9" cy="18" r="1.1" /><circle cx="15" cy="18" r="1.1" /></g></LI>;
const LISettings = (p) => <LI {...p}><circle cx="12" cy="12" r="3" /><path d="M19.4 15a1.7 1.7 0 0 0 .3 1.8l.1.1a2 2 0 1 1-2.8 2.8l-.1-.1a1.7 1.7 0 0 0-1.8-.3 1.7 1.7 0 0 0-1 1.5V21a2 2 0 1 1-4 0v-.1a1.7 1.7 0 0 0-1.1-1.5 1.7 1.7 0 0 0-1.8.3l-.1.1a2 2 0 1 1-2.8-2.8l.1-.1a1.7 1.7 0 0 0 .3-1.8 1.7 1.7 0 0 0-1.5-1H3a2 2 0 1 1 0-4h.1a1.7 1.7 0 0 0 1.5-1.1 1.7 1.7 0 0 0-.3-1.8l-.1-.1a2 2 0 1 1 2.8-2.8l.1.1a1.7 1.7 0 0 0 1.8.3 1.7 1.7 0 0 0 1-1.5V3a2 2 0 1 1 4 0v.1a1.7 1.7 0 0 0 1 1.5 1.7 1.7 0 0 0 1.8-.3l.1-.1a2 2 0 1 1 2.8 2.8l-.1.1a1.7 1.7 0 0 0-.3 1.8 1.7 1.7 0 0 0 1.5 1H21a2 2 0 1 1 0 4h-.1a1.7 1.7 0 0 0-1.5 1z" /></LI>;

// View-type icon resolver
const ViewIcon = ({ kind, ...p }) => {
  if (kind === 'calendar') return <LICalendar {...p} />;
  if (kind === 'gantt')    return <LIGantt {...p} />;
  return <LIKanban {...p} />;
};

// ─── Wordmark ────────────────────────────────────────────────
const BWordmark = ({ size = 42 }) => (
  <div style={{
    fontFamily: B_FONT,
    fontSize: size,
    fontWeight: 800,
    color: B_ACCENT,
    letterSpacing: '-0.03em',
    lineHeight: 1,
  }}>Plan.</div>
);

// ─── Square 44px button ──────────────────────────────────────
const BBtn = ({ children, color = '#888', onClick, size = 44 }) => (
  <button onClick={onClick}
    style={{
      width: size, height: size,
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      background: 'none', border: 'none', cursor: 'pointer',
      flexShrink: 0, color,
    }}>{children}</button>
);

// ─── Block row (the atom of Version B) ───────────────────────
function BBlockRow({ title, viewType = 'kanban', expanded = false, nested = false, showCount = false, count = 0, onToggle, children, height = 52, iconSize = 20 }) {
  return (
    <div style={{
      background: '#fff',
      border: nested ? 'none' : `1px solid ${B_ACCENT}`,
      borderRadius: nested ? 0 : 9,
      overflow: 'hidden',
      fontFamily: B_FONT,
      marginBottom: nested ? 0 : 8,
    }}>
      <div style={{ display: 'flex', alignItems: 'center', height }}>
        <BBtn color={B_ACCENT} size={height - 8}>
          <ViewIcon kind={viewType} size={iconSize} color={B_ACCENT} />
        </BBtn>
        <span style={{
          flex: 1, minWidth: 0,
          fontSize: nested ? 12 : 10,
          fontWeight: nested ? 500 : 700,
          letterSpacing: nested ? 0 : '.08em',
          textTransform: nested ? 'none' : 'uppercase',
          color: '#111',
          overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap',
        }}>{title}</span>
        <BBtn size={height - 8}><LIList size={iconSize} color="#888" /></BBtn>
        <BBtn size={height - 8} onClick={onToggle}>
          {expanded ? <LIPanelTopClose size={iconSize} color="#888" /> : <LIPanelTopOpen size={iconSize} color="#888" />}
        </BBtn>
      </div>

      {showCount && count > 0 && !expanded && (
        <>
          <div style={{ height: 1.5, background: B_ACCENT }} />
          <div style={{ padding: '6px 14px' }}>
            <span style={{ fontSize: 9, letterSpacing: '.1em', textTransform: 'uppercase', color: B_ACCENT, opacity: .7, fontWeight: 600 }}>
              {count} {count === 1 ? 'block' : 'blocks'}
            </span>
          </div>
        </>
      )}

      {expanded && (
        <div style={{ borderTop: `1px solid ${B_ACCENT}` }}>
          {children}
          <div style={{ padding: '10px 14px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 6 }}>
            <LIPlus size={12} color="#888" />
            <span style={{ fontSize: 10, letterSpacing: '.12em', textTransform: 'uppercase', fontWeight: 600, color: B_ACCENT, opacity: .6 }}>Add</span>
          </div>
        </div>
      )}
    </div>
  );
}

// ─── Dashed add ──────────────────────────────────────────────
const BDashedAdd = ({ label = 'Add' }) => (
  <div style={{
    border: `1.5px dashed ${B_ACCENT}`,
    borderRadius: 9,
    padding: '14px',
    display: 'flex', alignItems: 'center', justifyContent: 'center',
    cursor: 'pointer', opacity: .55,
    marginBottom: 8,
    gap: 6,
  }}>
    <LIPlus size={13} color={B_ACCENT} />
    <span style={{ fontSize: 10, letterSpacing: '.12em', textTransform: 'uppercase', fontWeight: 600, color: B_ACCENT, fontFamily: B_FONT }}>{label}</span>
  </div>
);

// ─── Phone shell (the bezel from the user's sketch) ──────────
function BPhoneShell({ children, hideBezel = false }) {
  if (hideBezel) {
    return (
      <div style={{ width: 290, height: 600, background: '#fff', borderRadius: 12, overflow: 'hidden', fontFamily: B_FONT, display: 'flex', flexDirection: 'column' }}>
        {children}
      </div>
    );
  }
  return (
    <div style={{
      width: 290,
      background: '#1a1a1a',
      borderRadius: 48,
      padding: '12px 6px',
      boxShadow: '0 28px 64px rgba(0,0,0,.4), inset 0 0 0 2px #3a3a3a',
      position: 'relative',
      fontFamily: B_FONT,
    }}>
      {/* hardware buttons */}
      <div style={{ position: 'absolute', left: -3, top: 80, width: 3, height: 28, background: '#2a2a2a', borderRadius: '2px 0 0 2px' }} />
      <div style={{ position: 'absolute', left: -3, top: 116, width: 3, height: 44, background: '#2a2a2a', borderRadius: '2px 0 0 2px' }} />
      <div style={{ position: 'absolute', right: -3, top: 120, width: 3, height: 60, background: '#2a2a2a', borderRadius: '0 2px 2px 0' }} />
      {/* speaker / notch */}
      <div style={{ width: 80, height: 24, background: '#1a1a1a', borderRadius: 12, margin: '0 auto 6px' }} />

      <div style={{
        background: '#fff', borderRadius: 36, overflow: 'hidden',
        height: 600,
        display: 'flex', flexDirection: 'column',
      }}>
        {children}
      </div>
    </div>
  );
}

// ─── Phone-internal pieces ───────────────────────────────────
function BStatusBar() {
  return (
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px 20px 0', height: 36, flexShrink: 0 }}>
      <span style={{ fontSize: 12, fontWeight: 700, color: '#111' }}>9:41</span>
      <div style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
        <svg width="15" height="9" viewBox="0 0 15 9" fill="#111">
          <rect x="0" y="6" width="2.5" height="3" rx=".4" />
          <rect x="3.5" y="4" width="2.5" height="5" rx=".4" />
          <rect x="7" y="2" width="2.5" height="7" rx=".4" />
          <rect x="10.5" y="0" width="2.5" height="9" rx=".4" />
        </svg>
        <div style={{ width: 16, height: 8, border: '1.5px solid #111', borderRadius: 2, position: 'relative' }}>
          <div style={{ position: 'absolute', left: 1, top: 1, bottom: 1, width: '70%', background: '#111', borderRadius: 1 }} />
        </div>
      </div>
    </div>
  );
}

function BHeader({ open = false, onToggleDrawer }) {
  return (
    <>
      <div style={{
        display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between',
        padding: '12px 4px 10px 14px', flexShrink: 0,
      }}>
        <BWordmark size={32} />
        <div style={{ display: 'flex' }}>
          <BBtn title="Search"><LISearch size={20} color="#bbb" /></BBtn>
          <BBtn onClick={onToggleDrawer} title={open ? 'Close menu' : 'Open menu'}>
            {open
              ? <LIPanelRightClose size={20} color={B_ACCENT} />
              : <LIPanelRightOpen size={20} color="#bbb" />}
          </BBtn>
        </div>
      </div>
      <div style={{ height: 1.5, background: B_ACCENT, flexShrink: 0 }} />
    </>
  );
}

function BSubheader({ title, viewType = 'kanban', onBack }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', height: 50, padding: '0 4px', borderBottom: `1px solid ${B_ACCENT}`, flexShrink: 0 }}>
      <BBtn onClick={onBack}><LIChev dir="left" size={20} color="#aaa" /></BBtn>
      <BBtn color={B_ACCENT}><ViewIcon kind={viewType} size={20} color={B_ACCENT} /></BBtn>
      <span style={{ flex: 1, fontSize: 13, fontWeight: 700, color: '#111', letterSpacing: '-0.01em' }}>{title}</span>
      <BBtn><LIList size={20} color="#888" /></BBtn>
    </div>
  );
}

function BDock({ active = 'home' }) {
  const tabs = [
    { id: 'home',   label: 'Home',   Icon: LIKanban },
    { id: 'monday', label: 'Monday', Icon: LICalendar },
    { id: 'sprint', label: 'Sprint', Icon: LIGantt },
  ];
  return (
    <div style={{
      height: 70, borderTop: '1px solid #ebebea',
      display: 'flex', alignItems: 'stretch', padding: '0 8px',
      flexShrink: 0,
    }}>
      <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'space-around' }}>
        {tabs.map(({ id, label, Icon }) => {
          const on = id === active;
          return (
            <div key={id} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4, padding: '6px 4px', cursor: 'pointer' }}>
              <Icon size={20} color={on ? B_ACCENT : '#aaa'} />
              <span style={{ fontSize: 8, letterSpacing: '.08em', textTransform: 'uppercase', color: on ? B_ACCENT : '#aaa', fontWeight: on ? 600 : 500 }}>{label}</span>
            </div>
          );
        })}
      </div>
      <div style={{ display: 'flex', alignItems: 'center', paddingLeft: 8 }}>
        <div style={{ width: 1, height: 24, background: '#e0e0e0', marginRight: 10 }} />
        <div style={{ padding: '6px 4px', cursor: 'pointer' }}>
          <LIPanelTopOpen size={22} color={B_ACCENT} />
        </div>
      </div>
    </div>
  );
}

function BHomeIndicator() {
  return (
    <div style={{ height: 22, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
      <div style={{ width: 110, height: 4, background: '#111', borderRadius: 2, opacity: .2 }} />
    </div>
  );
}

// ─── Full-screen nav: dominant color, inverted, with mood selector ──────
// On open, the drawer takes the whole phone screen. The mood selector at the
// bottom lets the user pick a different dominant color (state lives in the
// drawer for prototype purposes).
const MOOD_PALETTE = [
  { id: 'cobalt',    color: '#2563EB', label: 'Cobalt' },
  { id: 'plum',      color: '#7C3AED', label: 'Plum' },
  { id: 'forest',    color: '#0F8A5B', label: 'Forest' },
  { id: 'ember',     color: '#E04A2A', label: 'Ember' },
  { id: 'sun',       color: '#F2B441', label: 'Sun' },
  { id: 'graphite',  color: '#1A1A1A', label: 'Graphite' },
];

function BDrawer({ open, onClose, current = 'Studio' }) {
  const [mood, setMood] = React.useState(MOOD_PALETTE[0]);
  const bg = mood.color;
  const sub = 'rgba(255,255,255,0.65)';
  const dim = 'rgba(255,255,255,0.45)';
  const line = 'rgba(255,255,255,0.16)';

  const spaces = [
    { id: 'Studio',   count: 12, status: '· 3 in motion' },
    { id: 'Personal', count: 4,  status: '· 1 due today',  pulse: true },
    { id: 'Inbox',    count: 7,  status: '· 3 new',        pulse: true },
  ];
  const pinned = [
    { t: 'This week · Board', i: LIKanban },
    { t: 'Monday',            i: LICalendar },
    { t: 'Sprint 12',         i: LIGantt },
    { t: 'Morning routine',   i: LIKanban },
  ];

  return (
    <aside style={{
      position: 'absolute', inset: 0,
      background: bg,
      transition: 'background .35s ease, transform .32s cubic-bezier(.2,.7,.25,1), opacity .25s ease',
      transform: open ? 'translateX(0)' : 'translateX(8%)',
      opacity: open ? 1 : 0,
      pointerEvents: open ? 'auto' : 'none',
      zIndex: 30,
      display: 'flex', flexDirection: 'column',
      color: '#fff',
      fontFamily: B_FONT,
      overflow: 'hidden',
    }}>
      {/* top bar */}
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', padding: '20px 12px 14px 18px', flexShrink: 0 }}>
        <div style={{ fontFamily: B_FONT, fontSize: 32, fontWeight: 800, letterSpacing: '-0.03em', lineHeight: 1, color: '#fff' }}>
          Plan<span style={{ opacity: 0.5 }}>.</span>
        </div>
        <button onClick={onClose}
          style={{
            width: 40, height: 40, borderRadius: 20,
            background: 'rgba(255,255,255,0.12)', border: 'none', color: '#fff', cursor: 'pointer',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"><path d="M3 3l8 8M11 3l-8 8" /></svg>
        </button>
      </div>

      {/* search */}
      <div style={{ padding: '0 18px 18px', flexShrink: 0 }}>
        <div style={{
          display: 'flex', alignItems: 'center', gap: 10,
          background: 'rgba(255,255,255,0.12)',
          border: '1px solid rgba(255,255,255,0.16)',
          padding: '10px 14px', borderRadius: 12,
        }}>
          <LISearch size={16} color="rgba(255,255,255,0.7)" />
          <span style={{ fontSize: 13, color: sub }}>Find or jump to a block…</span>
          <span style={{ marginLeft: 'auto', fontFamily: 'ui-monospace, monospace', fontSize: 10, padding: '2px 6px', borderRadius: 4, background: 'rgba(255,255,255,0.16)', color: sub, letterSpacing: '.04em' }}>⌘K</span>
        </div>
      </div>

      {/* content */}
      <div style={{ flex: 1, overflow: 'auto', padding: '0 18px' }}>
        <div style={{ fontSize: 10, letterSpacing: '.16em', textTransform: 'uppercase', color: dim, fontWeight: 700, padding: '0 0 12px' }}>Spaces</div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 4, marginBottom: 28 }}>
          {spaces.map((s) => {
            const on = s.id === current;
            return (
              <div key={s.id} style={{
                display: 'flex', alignItems: 'center', height: 52, padding: '0 14px',
                background: on ? 'rgba(255,255,255,0.18)' : 'rgba(255,255,255,0.06)',
                border: on ? '1px solid rgba(255,255,255,0.32)' : '1px solid rgba(255,255,255,0.10)',
                borderRadius: 12,
                cursor: 'pointer',
                position: 'relative',
              }}>
                <div style={{ width: 34, height: 34, borderRadius: 8, background: 'rgba(255,255,255,0.12)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  <LIKanban size={16} color="#fff" />
                </div>
                <div style={{ marginLeft: 12, flex: 1, minWidth: 0 }}>
                  <div style={{ fontSize: 15, fontWeight: 600, letterSpacing: '-0.2px' }}>{s.id}</div>
                  <div style={{ fontSize: 11, color: sub, marginTop: 1, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                    {String(s.count).padStart(2, '0')} blocks {s.status}
                  </div>
                </div>
                {s.pulse && (
                  <span style={{
                    width: 8, height: 8, borderRadius: 4,
                    background: '#fff',
                    boxShadow: '0 0 0 4px rgba(255,255,255,0.18)',
                    marginLeft: 8, flexShrink: 0,
                  }} />
                )}
              </div>
            );
          })}
        </div>

        <div style={{ fontSize: 10, letterSpacing: '.16em', textTransform: 'uppercase', color: dim, fontWeight: 700, padding: '0 0 10px' }}>Pinned views</div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 2, marginBottom: 22 }}>
          {pinned.map(({ t, i: Ic }, k) => (
            <div key={k} style={{ display: 'flex', alignItems: 'center', gap: 12, height: 42, padding: '0 8px', cursor: 'pointer', borderRadius: 8 }}>
              <LIGrip size={14} color="rgba(255,255,255,0.4)" />
              <Ic size={16} color="rgba(255,255,255,0.7)" />
              <span style={{ flex: 1, fontSize: 14, fontWeight: 500, color: '#fff', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{t}</span>
              <LIChev dir="right" size={14} color={dim} />
            </div>
          ))}
        </div>

        <div style={{ borderTop: `1px solid ${line}`, paddingTop: 18, marginBottom: 18 }}>
          <div style={{ fontSize: 10, letterSpacing: '.16em', textTransform: 'uppercase', color: dim, fontWeight: 700, padding: '0 0 12px' }}>Mood</div>
          <div style={{ display: 'flex', gap: 10, alignItems: 'center', flexWrap: 'wrap' }}>
            {MOOD_PALETTE.map((m) => {
              const on = m.id === mood.id;
              return (
                <button key={m.id} onClick={() => setMood(m)}
                  title={m.label}
                  style={{
                    width: 36, height: 36, borderRadius: 18,
                    background: m.color,
                    border: on ? '2px solid #fff' : `2px solid ${line}`,
                    boxShadow: on ? '0 0 0 4px rgba(255,255,255,0.18)' : 'none',
                    cursor: 'pointer',
                    transition: 'box-shadow .15s ease, border-color .15s ease',
                    padding: 0,
                  }} />
              );
            })}
          </div>
          <div style={{ fontFamily: 'ui-monospace, monospace', fontSize: 10, color: sub, letterSpacing: '.04em', marginTop: 10 }}>
            {mood.label.toUpperCase()} · applied to nav, accents, focus ring
          </div>
        </div>
      </div>

      {/* account footer */}
      <div style={{ flexShrink: 0, padding: '12px 18px 28px', borderTop: `1px solid ${line}`, display: 'flex', alignItems: 'center', gap: 12 }}>
        <div style={{ width: 38, height: 38, borderRadius: 19, background: 'rgba(255,255,255,0.18)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 13, fontWeight: 700, letterSpacing: '-0.3px' }}>AM</div>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ fontSize: 14, fontWeight: 600, color: '#fff', letterSpacing: '-0.2px' }}>Alex Mendez</div>
          <div style={{ fontSize: 10.5, color: sub, letterSpacing: '.02em' }}>alex@plan.app</div>
        </div>
        <button style={{ width: 36, height: 36, borderRadius: 18, background: 'rgba(255,255,255,0.12)', border: 'none', color: '#fff', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <LISettings size={16} color="#fff" />
        </button>
      </div>
    </aside>
  );
}

// ─── Screen frame: status bar + header (with drawer toggle) + content + dock ──
function BScreenFrame({ active = 'home', subheader = null, children, flush = false }) {
  const [drawer, setDrawer] = React.useState(false);
  return (
    <BPhoneShell>
      <BStatusBar />
      <BHeader open={drawer} onToggleDrawer={() => setDrawer((o) => !o)} />
      {subheader}
      <div style={{ flex: 1, position: 'relative', overflow: 'hidden' }}>
        <div style={{ height: '100%', overflow: 'hidden', padding: flush ? 0 : '14px 10px 0' }}>
          {children}
        </div>
        <BDrawer open={drawer} onClose={() => setDrawer(false)} />
      </div>
      <BDock active={active} />
      <BHomeIndicator />
    </BPhoneShell>
  );
}

// ─── Five mobile screens ─────────────────────────────────────
// 1) Home — all top-level blocks collapsed
function BScreenHome() {
  return (
    <BScreenFrame active="home">
      <BBlockRow title="Routines" viewType="kanban" />
      <BBlockRow title="Projects" viewType="kanban" showCount count={4} />
      <BBlockRow title="Goals" viewType="gantt" />
      <BBlockRow title="Habits" viewType="calendar" showCount count={3} />
      <BDashedAdd />
    </BScreenFrame>
  );
}

// 2) Expanded — Projects expanded with nested blocks
function BScreenExpanded() {
  return (
    <BScreenFrame active="home">
      <BBlockRow title="Routines" viewType="kanban" />
      <BBlockRow title="Projects" viewType="kanban" expanded>
        <BBlockRow title="Coffee Shop App" viewType="kanban" nested />
        <BBlockRow title="Portfolio Site" viewType="kanban" nested />
        <BBlockRow title="Design System" viewType="kanban" nested />
      </BBlockRow>
      <BBlockRow title="Goals" viewType="gantt" />
    </BScreenFrame>
  );
}

// 3) Drill-in — full screen "Projects" with breadcrumb
function BScreenDrillIn() {
  return (
    <BScreenFrame active="home" subheader={<BSubheader title="Projects" viewType="kanban" />}>
      <BBlockRow title="Coffee Shop App" viewType="kanban" showCount count={6} />
      <BBlockRow title="Portfolio Site" viewType="kanban" />
      <BBlockRow title="Design System" viewType="kanban" expanded>
        <BBlockRow title="Type ramp" viewType="kanban" nested />
        <BBlockRow title="Color tokens" viewType="kanban" nested />
        <BBlockRow title="Icons" viewType="kanban" nested />
      </BBlockRow>
      <BBlockRow title="Mobile App" viewType="gantt" />
      <BDashedAdd />
    </BScreenFrame>
  );
}

// 4) Calendar drill — Monday view with timeline + blocks
function BScreenCalendar() {
  const hours = [8, 9, 10, 11, 12, 13];
  const cellH = 60;
  const blocks = [
    { t: 'Check email',    top: 0,         h: cellH,     view: 'kanban'  },
    { t: 'Deep Work',      top: cellH,     h: cellH*2,   view: 'kanban', expanded: true },
    { t: 'Lunch',          top: cellH*3,   h: cellH,     view: 'calendar' },
    { t: 'Design review',  top: cellH*4,   h: cellH,     view: 'kanban' },
  ];
  return (
    <BScreenFrame active="monday" flush
      subheader={<BSubheader title="Monday · May 12" viewType="calendar" />}>
      <div style={{ flex: 1, height: '100%', overflow: 'hidden', display: 'flex' }}>
        <div style={{ width: 40, flexShrink: 0, paddingTop: 4 }}>
          {hours.map(h => (
            <div key={h} style={{ height: cellH, display: 'flex', alignItems: 'flex-start', justifyContent: 'flex-end', paddingRight: 5, paddingTop: 4 }}>
              <span style={{ fontSize: 9, fontWeight: 600, color: B_ACCENT, opacity: 0.7 }}>
                {h < 12 ? `${h}AM` : h === 12 ? '12PM' : `${h - 12}PM`}
              </span>
            </div>
          ))}
        </div>
        <div style={{ flex: 1, position: 'relative', borderLeft: `1.5px solid ${B_ACCENT}88` }}>
          <svg style={{ position: 'absolute', inset: 0, width: '100%', height: hours.length * cellH, pointerEvents: 'none' }}>
            {hours.map((h, i) => (
              <line key={h} x1="0" y1={i * cellH} x2="100%" y2={i * cellH} stroke={`${B_ACCENT}55`} strokeWidth=".75" />
            ))}
            {[15, 30, 45].map((min) => hours.map((h, i) => (
              <line key={`${h}-${min}`} x1="0" y1={i * cellH + (min/60) * cellH} x2="100%" y2={i * cellH + (min/60) * cellH} stroke={`${B_ACCENT}22`} strokeWidth=".5" />
            )))}
          </svg>
          <div style={{ position: 'relative' }}>
            {blocks.map((b, i) => (
              <div key={i} style={{
                position: 'absolute', top: b.top + 4, left: 4, right: 4, height: b.h - 8,
                background: '#fff', border: `1px solid ${B_ACCENT}`, borderRadius: 8,
                overflow: 'hidden',
              }}>
                <div style={{ display: 'flex', alignItems: 'center', height: 44 }}>
                  <BBtn color={B_ACCENT} size={40}><ViewIcon kind={b.view} size={18} color={B_ACCENT} /></BBtn>
                  <span style={{ flex: 1, fontSize: 10, fontWeight: 700, letterSpacing: '.06em', textTransform: 'uppercase', color: '#111', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{b.t}</span>
                  <BBtn size={40}><LIPanelTopOpen size={16} color="#888" /></BBtn>
                </div>
                {b.expanded && (
                  <>
                    <div style={{ height: 1, background: `${B_ACCENT}33` }} />
                    <div style={{ padding: '4px 12px' }}>
                      <span style={{ fontSize: 9, letterSpacing: '.1em', textTransform: 'uppercase', color: B_ACCENT, fontWeight: 600, opacity: 0.7 }}>3 blocks</span>
                    </div>
                  </>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </BScreenFrame>
  );
}

// 5) Gantt drill — Sprint timeline
// Each project has either {s, d} or {children:[{t,s,d}, ...]}. When a parent
// has children, its own bar is the union of child bars (so it tightens or
// stretches as children change) and a chevron toggles the children visible.
function BScreenGantt() {
  const [zoom, setZoom] = React.useState('week'); // week | month | quarter
  const Z = {
    week:    { totalDays: 12, dayW: 22, label: 'Week',    showWeekends: true,  dayLabels: 'MTWTFSSMTWTFS' },
    month:   { totalDays: 30, dayW: 12, label: 'Month',   showWeekends: false, dayLabels: null },
    quarter: { totalDays: 90, dayW: 6,  label: 'Quarter', showWeekends: false, dayLabels: null },
  }[zoom];

  const data = [
    { id: 'coffee',    t: 'Coffee Shop', s: 0, d: 4 },
    { id: 'portfolio', t: 'Portfolio',   children: [
      { t: 'Homepage', s: 2, d: 2 },
      { t: 'About',    s: 3, d: 2 },
      { t: 'Grid',     s: 5, d: 2 },
    ]},
    { id: 'ds',        t: 'Design Sys',  s: 5, d: 3 },
    { id: 'app',       t: 'Mobile App',  s: 1, d: 7 },
    { id: 'api',       t: 'API Layer',   s: 4, d: 4 },
    { id: 'mkt',       t: 'Marketing',   s: 0, d: 11 },
  ];

  const [expanded, setExpanded] = React.useState({ portfolio: true });
  const bounds = (p) => {
    if (!p.children) return { s: p.s, d: p.d };
    const minS = Math.min(...p.children.map((c) => c.s));
    const maxE = Math.max(...p.children.map((c) => c.s + c.d));
    return { s: minS, d: maxE - minS };
  };

  const labelW = 76;
  const trackW = Z.totalDays * Z.dayW;
  const showBarLabel = Z.dayW >= 18;

  return (
    <BScreenFrame active="sprint" flush
      subheader={<BSubheader title="Sprint 12" viewType="gantt" />}>
      {/* zoom selector */}
      <div style={{ display: 'flex', alignItems: 'center', padding: '8px 12px', gap: 6, borderBottom: `1px solid ${B_ACCENT}20`, background: '#fafafa' }}>
        <span style={{ fontSize: 9, letterSpacing: '.1em', textTransform: 'uppercase', color: '#888', fontWeight: 600, marginRight: 4 }}>Zoom</span>
        {['week', 'month', 'quarter'].map((z) => {
          const on = z === zoom;
          return (
            <button key={z} onClick={() => setZoom(z)}
              style={{
                flex: 1, padding: '6px 0',
                background: on ? '#fff' : 'transparent',
                border: on ? `1px solid ${B_ACCENT}` : '1px solid transparent',
                color: on ? B_ACCENT : '#888',
                fontFamily: B_FONT, fontSize: 9, fontWeight: 700, letterSpacing: '.08em', textTransform: 'uppercase',
                borderRadius: 5, cursor: 'pointer',
              }}>
              {z}
            </button>
          );
        })}
      </div>

      {/* scrollable gantt body */}
      <div style={{ overflowX: 'auto', overflowY: 'auto', maxHeight: '100%' }}>
        <div style={{ minWidth: labelW + trackW }}>
          {/* day strip */}
          <div style={{ display: 'flex', paddingLeft: labelW, borderBottom: `1px solid ${B_ACCENT}40`, background: '#fafafa', position: 'sticky', top: 0, zIndex: 2 }}>
            {Array.from({ length: Z.totalDays }).map((_, i) => {
              const showLabel = zoom === 'week'
                ? true
                : zoom === 'month'
                  ? i % 7 === 0
                  : i % 14 === 0;
              const isMonday = zoom === 'week' ? Z.dayLabels[i] === 'M' : i % 7 === 0;
              return (
                <div key={i} style={{
                  width: Z.dayW, textAlign: 'center', padding: '4px 0',
                  fontSize: 8, fontWeight: 600, color: `${B_ACCENT}99`,
                  borderLeft: isMonday && i > 0 ? `1px solid ${B_ACCENT}30` : 'none',
                }}>
                  {showLabel ? (
                    zoom === 'week' ? Z.dayLabels[i]
                    : zoom === 'month' ? `${i + 12}`
                    : `W${Math.floor(i / 7) + 1}`
                  ) : ''}
                </div>
              );
            })}
          </div>

          {data.map((p) => {
            const isExp = !!expanded[p.id];
            const { s, d } = bounds(p);
            const hasKids = !!p.children;
            return (
              <React.Fragment key={p.id}>
                <div style={{ display: 'flex', alignItems: 'center', height: 40, borderBottom: `1px solid ${B_ACCENT}15` }}>
                  <div style={{ width: labelW, flexShrink: 0, display: 'flex', alignItems: 'center', paddingLeft: 4, position: 'sticky', left: 0, background: '#fff', zIndex: 1 }}>
                    {hasKids ? (
                      <button onClick={() => setExpanded((e) => ({ ...e, [p.id]: !e[p.id] }))}
                        style={{ width: 20, height: 32, background: 'none', border: 0, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, padding: 0 }}>
                        <LIChev dir={isExp ? 'down' : 'right'} size={11} color={B_ACCENT} />
                      </button>
                    ) : <div style={{ width: 20, flexShrink: 0 }} />}
                    <span style={{ fontSize: 9, fontWeight: isExp ? 700 : 500, color: isExp ? B_ACCENT : '#111', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{p.t}</span>
                  </div>
                  <div style={{ display: 'flex', position: 'relative', flex: 1 }}>
                    {Array.from({ length: Z.totalDays }).map((_, j) => (
                      <div key={j} style={{ width: Z.dayW, height: 32, borderRight: `1px solid ${B_ACCENT}10`, flexShrink: 0 }} />
                    ))}
                    <div style={{
                      position: 'absolute', top: 4,
                      left: s * Z.dayW + 2, width: Math.max(6, d * Z.dayW - 4),
                      height: 24,
                      background: hasKids && isExp ? 'transparent' : B_ACCENT,
                      border: hasKids && isExp ? `1.5px solid ${B_ACCENT}` : 'none',
                      borderRadius: 5,
                      display: 'flex', alignItems: 'center', paddingLeft: 6,
                      transition: 'left .25s ease, width .25s ease, background .2s ease',
                    }}>
                      {showBarLabel && (
                        <span style={{ fontSize: 8, fontWeight: 700, color: hasKids && isExp ? B_ACCENT : '#fff', letterSpacing: '.02em', overflow: 'hidden', whiteSpace: 'nowrap' }}>{p.t}</span>
                      )}
                    </div>
                  </div>
                </div>

                {hasKids && isExp && (
                  <>
                    {p.children.map((c, k) => (
                      <div key={k} style={{ display: 'flex', alignItems: 'center', height: 30, borderBottom: `1px solid ${B_ACCENT}10`, background: `${B_ACCENT}05` }}>
                        <div style={{ width: labelW, flexShrink: 0, display: 'flex', alignItems: 'center', paddingLeft: 26, position: 'sticky', left: 0, background: `${B_ACCENT}05`, zIndex: 1 }}>
                          <div style={{ width: 6, height: 1, background: B_ACCENT, opacity: 0.4, marginRight: 4, flexShrink: 0 }} />
                          <span style={{ fontSize: 10, color: '#222', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{c.t}</span>
                        </div>
                        <div style={{ display: 'flex', position: 'relative', flex: 1 }}>
                          {Array.from({ length: Z.totalDays }).map((_, j) => (
                            <div key={j} style={{ width: Z.dayW, height: 22, borderRight: `1px solid ${B_ACCENT}05`, flexShrink: 0 }} />
                          ))}
                          <div style={{
                            position: 'absolute', top: 4,
                            left: c.s * Z.dayW + 3, width: Math.max(4, c.d * Z.dayW - 6),
                            height: 14, background: B_ACCENT, borderRadius: 3,
                            display: 'flex', alignItems: 'center', paddingLeft: 4,
                          }}>
                            {showBarLabel && (
                              <span style={{ fontSize: 7, color: '#fff', fontWeight: 600, overflow: 'hidden', whiteSpace: 'nowrap' }}>{c.t}</span>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                    <div style={{ display: 'flex', alignItems: 'center', height: 26, paddingLeft: 32, background: `${B_ACCENT}03`, borderBottom: `1px solid ${B_ACCENT}10`, cursor: 'pointer' }}>
                      <LIPlus size={11} color={B_ACCENT} />
                      <span style={{ marginLeft: 6, fontSize: 9, letterSpacing: '.1em', textTransform: 'uppercase', color: B_ACCENT, opacity: 0.7, fontWeight: 600 }}>Add child</span>
                    </div>
                  </>
                )}
              </React.Fragment>
            );
          })}
        </div>
      </div>
    </BScreenFrame>
  );
}

// ─── Desktop variant (same language, wider canvas) ───────────
function BDesktopShell() {
  const [view, setView] = React.useState('board');
  const views = [
    { id: 'board',    label: 'Board',    Icon: LIKanban   },
    { id: 'calendar', label: 'Calendar', Icon: LICalendar },
    { id: 'gantt',    label: 'Gantt',    Icon: LIGantt    },
  ];

  return (
    <div style={{
      width: 1280, height: 860,
      background: '#f5f5f5',
      fontFamily: B_FONT,
      position: 'relative',
      display: 'flex',
      overflow: 'hidden',
    }}>
      {/* Sidebar */}
      <aside style={{
        width: 260, flex: '0 0 260px',
        background: '#fff',
        borderRight: '1px solid #ebebea',
        display: 'flex', flexDirection: 'column',
      }}>
        <div style={{
          padding: '18px 4px 14px 18px',
          display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between',
        }}>
          <BWordmark size={36} />
          <BBtn size={40}><LISettings size={18} color="#aaa" /></BBtn>
        </div>
        <div style={{ height: 1.5, background: B_ACCENT }} />

        <div style={{ flex: 1, overflow: 'auto', padding: '16px 12px 0' }}>
          <div style={{ fontSize: 9, letterSpacing: '.14em', textTransform: 'uppercase', color: '#bbb', fontWeight: 600, padding: '0 6px 10px' }}>Spaces</div>
          {[
            { name: 'Studio',   count: 12, status: null },
            { name: 'Personal', count: 4,  status: '1 due · 2 overdue', pulse: true },
            { name: 'Inbox',    count: 7,  status: '3 new this week',   pulse: true },
          ].map((s, i) => (
            <div key={s.name}>
              <div style={{ display: 'flex', alignItems: 'center', height: 38, padding: '0 8px', borderRadius: 7, background: i === 0 ? `${B_ACCENT}10` : 'transparent', marginBottom: 2, cursor: 'pointer', position: 'relative' }}>
                <LIKanban size={16} color={i === 0 ? B_ACCENT : '#888'} />
                <span style={{ marginLeft: 10, fontSize: 13, fontWeight: i === 0 ? 600 : 500, color: i === 0 ? B_ACCENT : '#111' }}>{s.name}</span>
                {s.pulse && <span style={{ width: 7, height: 7, borderRadius: 4, background: B_ACCENT, marginLeft: 'auto', boxShadow: `0 0 0 4px ${B_ACCENT}22` }} />}
                <span style={{ marginLeft: s.pulse ? 6 : 'auto', fontSize: 10, fontWeight: 600, color: i === 0 ? B_ACCENT : '#aaa', letterSpacing: '.05em' }}>{String(s.count).padStart(2, '0')}</span>
              </div>
              {s.status && (
                <div style={{ padding: '0 8px 4px 34px', fontSize: 10, color: '#999', letterSpacing: '.02em' }}>{s.status}</div>
              )}
            </div>
          ))}

          <div style={{ fontSize: 9, letterSpacing: '.14em', textTransform: 'uppercase', color: '#bbb', fontWeight: 600, padding: '24px 6px 10px' }}>Pinned</div>
          {[
            { t: 'This week · Board', i: LIKanban },
            { t: 'Monday',            i: LICalendar },
            { t: 'Sprint 12',         i: LIGantt },
            { t: 'Morning routine',   i: LIKanban },
          ].map(({ t, i: Ic }, k) => (
            <div key={k} style={{ display: 'flex', alignItems: 'center', height: 36, padding: '0 8px', cursor: 'pointer', borderRadius: 7 }}>
              <LIGrip size={12} color="#ddd" />
              <span style={{ marginLeft: 6 }}><Ic size={16} color="#888" /></span>
              <span style={{ marginLeft: 10, fontSize: 13, color: '#444' }}>{t}</span>
            </div>
          ))}
        </div>

        {/* Account / avatar — pinned to bottom of sidebar */}
        <div style={{ borderTop: '1px solid #ebebea', padding: '12px 14px', display: 'flex', alignItems: 'center', gap: 12, cursor: 'pointer' }}>
          <div style={{ width: 34, height: 34, borderRadius: 17, background: '#111', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12, fontWeight: 600 }}>AM</div>
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ fontSize: 12.5, fontWeight: 600, color: '#111', letterSpacing: '-0.01em' }}>Alex Mendez</div>
            <div style={{ fontSize: 10, color: '#aaa', letterSpacing: '.02em', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>alex@plan.app</div>
          </div>
          <LIMore size={16} color="#bbb" />
        </div>
      </aside>

      {/* Main */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', minWidth: 0 }}>
        {/* Top bar */}
        <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', padding: '20px 28px 14px' }}>
          <div>
            <div style={{ fontSize: 10, letterSpacing: '.14em', textTransform: 'uppercase', color: '#aaa', fontWeight: 600, marginBottom: 6 }}>Studio · This week</div>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: 12 }}>
              <h1 style={{ margin: 0, fontSize: 32, fontWeight: 800, letterSpacing: '-0.02em', color: '#111' }}>This week</h1>
              <span style={{ fontSize: 11, letterSpacing: '.12em', textTransform: 'uppercase', fontWeight: 600, color: B_ACCENT, opacity: .7 }}>12 BLOCKS</span>
            </div>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <button style={{ border: `1.5px solid ${B_ACCENT}`, background: '#fff', color: B_ACCENT, fontWeight: 600, fontSize: 11, letterSpacing: '.1em', textTransform: 'uppercase', padding: '9px 16px', borderRadius: 7, cursor: 'pointer', fontFamily: B_FONT }}>
              <span style={{ marginRight: 4 }}>+</span> New block
            </button>
            <BBtn><LIMore size={20} color="#888" /></BBtn>
          </div>
        </div>
        <div style={{ height: 1.5, background: B_ACCENT, margin: '0 28px' }} />

        {/* Section header + view switcher */}
        <div style={{ display: 'flex', alignItems: 'center', padding: '14px 28px 12px', gap: 12 }}>
          <BBtn size={36}><LIChev dir="left" size={18} color="#aaa" /></BBtn>
          <BBtn color={B_ACCENT} size={36}>
            {(() => { const V = views.find((v) => v.id === view).Icon; return <V size={18} color={B_ACCENT} />; })()}
          </BBtn>
          <span style={{ fontSize: 13, fontWeight: 700, color: '#111', letterSpacing: '-0.01em' }}>Projects</span>
          <div style={{ display: 'flex', marginLeft: 'auto', gap: 4 }}>
            {views.map(({ id, label, Icon }) => {
              const on = id === view;
              return (
                <button key={id} onClick={() => setView(id)}
                  style={{
                    display: 'inline-flex', alignItems: 'center', gap: 5,
                    background: on ? '#fff' : '#fff',
                    border: on ? `1px solid ${B_ACCENT}` : '1px solid #ebebea',
                    color: on ? B_ACCENT : '#888',
                    fontWeight: on ? 700 : 600,
                    fontSize: 9, letterSpacing: '.08em', textTransform: 'uppercase',
                    padding: '6px 10px', borderRadius: 5,
                    fontFamily: B_FONT, cursor: 'pointer',
                    transition: 'color .15s ease, border-color .15s ease',
                  }}>
                  <Icon size={12} color={on ? B_ACCENT : '#aaa'} />
                  {label}
                </button>
              );
            })}
          </div>
        </div>

        {/* View content */}
        <div style={{ flex: 1, padding: '4px 28px 28px', overflow: 'auto' }}>
          {view === 'board' && <BDesktopBoard />}
          {view === 'calendar' && <BDesktopCalendar />}
          {view === 'gantt' && <BDesktopGantt />}
        </div>
      </div>
    </div>
  );
}

function BDesktopBoard() {
  return (
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px 20px', alignContent: 'start' }}>
      <BBlockRow title="Routines" viewType="kanban" height={64} iconSize={22} />
      <BBlockRow title="Projects" viewType="kanban" showCount count={4} height={64} iconSize={22} />
      <div style={{ gridColumn: '1 / -1' }}>
        <BBlockRow title="Design System" viewType="kanban" expanded height={64} iconSize={22}>
          <BBlockRow title="Type ramp" viewType="kanban" nested height={48} iconSize={18} />
          <BBlockRow title="Color tokens" viewType="kanban" nested height={48} iconSize={18} />
          <BBlockRow title="Icons" viewType="kanban" nested height={48} iconSize={18} />
        </BBlockRow>
      </div>
      <BBlockRow title="Goals" viewType="gantt" height={64} iconSize={22} />
      <BBlockRow title="Habits" viewType="calendar" showCount count={3} height={64} iconSize={22} />
      <BBlockRow title="Coffee Shop App" viewType="kanban" height={64} iconSize={22} />
      <BBlockRow title="Portfolio Site" viewType="kanban" height={64} iconSize={22} />
      <div style={{ gridColumn: '1 / -1' }}>
        <BDashedAdd label="New top-level block" />
      </div>
    </div>
  );
}

function BDesktopCalendar() {
  const hours = [7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19];
  const days = ['Mon 12', 'Tue 13', 'Wed 14', 'Thu 15', 'Fri 16', 'Sat 17', 'Sun 18'];
  const cellH = 44;
  const blocks = [
    { day: 0, t: 'Routines',           start: 7,  h: 1,   view: 'kanban'   },
    { day: 0, t: 'Team weekly',        start: 10, h: 1,   view: 'kanban'   },
    { day: 1, t: 'Review onboarding',  start: 10, h: 2,   view: 'kanban'   },
    { day: 2, t: 'Coffee w/ Maya',     start: 9,  h: 1,   view: 'kanban'   },
    { day: 2, t: 'Ship v2.1',          start: 14, h: 3,   view: 'kanban', expanded: true },
    { day: 3, t: 'Pitch deck v3',      start: 10, h: 2.5, view: 'kanban'   },
    { day: 3, t: 'API rewrite',        start: 14, h: 3,   view: 'kanban'   },
    { day: 4, t: 'Plan Q3 roadmap',    start: 9,  h: 4,   view: 'gantt'    },
    { day: 4, t: 'Reading',            start: 15, h: 1.5, view: 'kanban'   },
    { day: 5, t: 'Groceries',          start: 11, h: 1,   view: 'kanban'   },
    { day: 6, t: 'Long run',           start: 8,  h: 1.5, view: 'kanban'   },
  ];
  const gutterW = 56;
  return (
    <div style={{ background: '#fff', border: `1px solid #ebebea`, borderRadius: 8, overflow: 'hidden' }}>
      {/* day header */}
      <div style={{ display: 'flex', borderBottom: `1px solid ${B_ACCENT}40`, background: '#fafafa' }}>
        <div style={{ width: gutterW, flexShrink: 0 }} />
        {days.map((d) => (
          <div key={d} style={{ flex: 1, padding: '10px 12px', fontFamily: B_FONT, fontSize: 11, fontWeight: 700, color: '#111', letterSpacing: '-0.01em', borderLeft: `1px solid ${B_ACCENT}25` }}>{d}</div>
        ))}
      </div>
      {/* time grid */}
      <div style={{ display: 'flex', position: 'relative' }}>
        <div style={{ width: gutterW, flexShrink: 0 }}>
          {hours.map((h) => (
            <div key={h} style={{ height: cellH, padding: '4px 8px 0', textAlign: 'right' }}>
              <span style={{ fontSize: 10, fontWeight: 600, color: B_ACCENT, opacity: 0.7, letterSpacing: '.02em' }}>{h < 12 ? `${h} AM` : h === 12 ? '12 PM' : `${h - 12} PM`}</span>
            </div>
          ))}
        </div>
        {days.map((_, di) => (
          <div key={di} style={{ flex: 1, position: 'relative', borderLeft: `1px solid ${B_ACCENT}20` }}>
            {hours.map((h, i) => (
              <div key={h} style={{ height: cellH, borderBottom: `1px solid ${B_ACCENT}10` }} />
            ))}
            {blocks.filter((b) => b.day === di).map((b, i) => {
              const top = (b.start - hours[0]) * cellH + 2;
              const height = b.h * cellH - 4;
              return (
                <div key={i} style={{
                  position: 'absolute',
                  top, left: 3, right: 3,
                  height,
                  background: '#fff',
                  border: `1px solid ${B_ACCENT}`,
                  borderRadius: 6,
                  overflow: 'hidden',
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', height: 32 }}>
                    <BBtn color={B_ACCENT} size={28}><ViewIcon kind={b.view} size={14} color={B_ACCENT} /></BBtn>
                    <span style={{ flex: 1, fontSize: 10, fontWeight: 700, letterSpacing: '.04em', textTransform: 'uppercase', color: '#111', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{b.t}</span>
                  </div>
                  {b.expanded && (
                    <>
                      <div style={{ height: 1, background: `${B_ACCENT}33` }} />
                      <div style={{ padding: '3px 10px' }}>
                        <span style={{ fontSize: 9, letterSpacing: '.1em', textTransform: 'uppercase', color: B_ACCENT, fontWeight: 600, opacity: 0.7 }}>3 blocks</span>
                      </div>
                    </>
                  )}
                </div>
              );
            })}
          </div>
        ))}
      </div>
    </div>
  );
}

function BDesktopGantt() {
  const days = 'MTWTFSSMTWTF'.split('');
  const dayW = 50;
  const [expanded, setExpanded] = React.useState({ portfolio: true });

  const data = [
    { id: 'coffee',    t: 'Coffee Shop App', s: 0, d: 4 },
    { id: 'portfolio', t: 'Portfolio Site',  children: [
      { t: 'Homepage', s: 2, d: 2 },
      { t: 'About',    s: 3, d: 2 },
      { t: 'Grid',     s: 5, d: 2 },
    ]},
    { id: 'ds',        t: 'Design System',   s: 5, d: 3 },
    { id: 'app',       t: 'Mobile App',      s: 1, d: 7 },
    { id: 'api',       t: 'API Layer',       s: 4, d: 4 },
    { id: 'mkt',       t: 'Marketing',       s: 0, d: 11 },
  ];

  const bounds = (p) => {
    if (!p.children) return { s: p.s, d: p.d };
    const minS = Math.min(...p.children.map((c) => c.s));
    const maxE = Math.max(...p.children.map((c) => c.s + c.d));
    return { s: minS, d: maxE - minS };
  };

  return (
    <div style={{ background: '#fff', border: '1px solid #ebebea', borderRadius: 8, overflow: 'hidden' }}>
      <div style={{ display: 'flex', paddingLeft: 200, borderBottom: `1px solid ${B_ACCENT}40`, background: '#fafafa' }}>
        {days.map((d, i) => (
          <div key={i} style={{ width: dayW, textAlign: 'center', padding: '8px 0', fontSize: 10, fontWeight: 600, color: `${B_ACCENT}99`, letterSpacing: '.04em' }}>{d}</div>
        ))}
      </div>
      {data.map((p) => {
        const isExp = !!expanded[p.id];
        const { s, d } = bounds(p);
        const hasKids = !!p.children;
        return (
          <React.Fragment key={p.id}>
            <div style={{ display: 'flex', alignItems: 'center', height: 52, borderBottom: `1px solid ${B_ACCENT}15` }}>
              <div style={{ width: 200, flexShrink: 0, display: 'flex', alignItems: 'center', paddingLeft: 12 }}>
                {hasKids ? (
                  <button onClick={() => setExpanded((e) => ({ ...e, [p.id]: !e[p.id] }))}
                    style={{ width: 24, height: 28, background: 'none', border: 0, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 0 }}>
                    <LIChev dir={isExp ? 'down' : 'right'} size={13} color={B_ACCENT} />
                  </button>
                ) : <div style={{ width: 24, flexShrink: 0 }} />}
                <LIKanban size={16} color={isExp ? B_ACCENT : '#888'} />
                <span style={{ marginLeft: 8, fontSize: 12, fontWeight: isExp ? 700 : 600, color: isExp ? B_ACCENT : '#111', letterSpacing: '-0.01em' }}>{p.t}</span>
              </div>
              <div style={{ display: 'flex', position: 'relative', flex: 1 }}>
                {days.map((_, j) => <div key={j} style={{ width: dayW, height: 44, borderRight: `1px solid ${B_ACCENT}15`, flexShrink: 0 }} />)}
                <div style={{
                  position: 'absolute',
                  top: 8,
                  left: s * dayW + 3,
                  width: d * dayW - 6,
                  height: 28,
                  background: hasKids && isExp ? 'transparent' : B_ACCENT,
                  border: hasKids && isExp ? `1.5px solid ${B_ACCENT}` : 'none',
                  borderRadius: 6,
                  display: 'flex', alignItems: 'center', paddingLeft: 10,
                  transition: 'left .25s ease, width .25s ease, background .2s ease',
                }}>
                  <span style={{ fontSize: 10, fontWeight: 700, color: hasKids && isExp ? B_ACCENT : '#fff', letterSpacing: '.02em', overflow: 'hidden', whiteSpace: 'nowrap' }}>{p.t}</span>
                </div>
              </div>
            </div>
            {hasKids && isExp && (
              <>
                {p.children.map((c, k) => (
                  <div key={k} style={{ display: 'flex', alignItems: 'center', height: 40, borderBottom: `1px solid ${B_ACCENT}10`, background: `${B_ACCENT}05` }}>
                    <div style={{ width: 200, flexShrink: 0, display: 'flex', alignItems: 'center', paddingLeft: 48 }}>
                      <div style={{ width: 12, height: 1, background: B_ACCENT, opacity: 0.4, marginRight: 6 }} />
                      <span style={{ fontSize: 12, color: '#222' }}>{c.t}</span>
                    </div>
                    <div style={{ display: 'flex', position: 'relative', flex: 1 }}>
                      {days.map((_, j) => <div key={j} style={{ width: dayW, height: 32, borderRight: `1px solid ${B_ACCENT}08`, flexShrink: 0 }} />)}
                      <div style={{
                        position: 'absolute',
                        top: 6,
                        left: c.s * dayW + 4,
                        width: c.d * dayW - 8,
                        height: 20,
                        background: B_ACCENT,
                        borderRadius: 4,
                        display: 'flex', alignItems: 'center', paddingLeft: 8,
                      }}>
                        <span style={{ fontSize: 9, color: '#fff', fontWeight: 600, letterSpacing: '.02em', overflow: 'hidden', whiteSpace: 'nowrap' }}>{c.t}</span>
                      </div>
                    </div>
                  </div>
                ))}
                <div style={{ display: 'flex', alignItems: 'center', height: 32, paddingLeft: 56, background: `${B_ACCENT}03`, borderBottom: `1px solid ${B_ACCENT}10`, cursor: 'pointer' }}>
                  <LIPlus size={12} color={B_ACCENT} />
                  <span style={{ marginLeft: 6, fontSize: 10, letterSpacing: '.1em', textTransform: 'uppercase', color: B_ACCENT, opacity: 0.7, fontWeight: 600 }}>Add child</span>
                </div>
              </>
            )}
          </React.Fragment>
        );
      })}
    </div>
  );
}

Object.assign(window, {
  B_ACCENT, B_FONT,
  BScreenHome, BScreenExpanded, BScreenDrillIn, BScreenCalendar, BScreenGantt,
  BDesktopShell,
});
