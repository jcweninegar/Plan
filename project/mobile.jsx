// Plan. — Mobile prototype (390 × 844 iPhone-ish artboard)

function MobileShell() {
  const [view, setView] = React.useState('kanban');
  const [creatorOpen, setCreatorOpen] = React.useState(false);
  const [drawerOpen, setDrawerOpen] = React.useState(false);

  const wsFrame = { w: 358, h: 540 };

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
      {/* Status bar */}
      <div className="mobile-statusbar" style={{ flex: '0 0 auto' }}>
        <span>9:41</span>
        <div style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
          {/* signal */}
          <svg width="17" height="11" viewBox="0 0 17 11" fill="currentColor">
            <rect x="0" y="7" width="3" height="4" rx="0.5" />
            <rect x="4.5" y="5" width="3" height="6" rx="0.5" />
            <rect x="9" y="3" width="3" height="8" rx="0.5" />
            <rect x="13.5" y="1" width="3" height="10" rx="0.5" />
          </svg>
          {/* battery */}
          <svg width="25" height="11" viewBox="0 0 25 11" fill="none">
            <rect x="0.5" y="0.5" width="21" height="10" rx="2.5" stroke="currentColor" opacity="0.4" />
            <rect x="22.5" y="3.5" width="1.5" height="4" rx="0.6" fill="currentColor" opacity="0.4" />
            <rect x="2" y="2" width="16" height="7" rx="1.5" fill="currentColor" />
          </svg>
        </div>
      </div>

      {/* Header bar */}
      <div style={{
        padding: '4px 14px 14px 16px',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        flex: '0 0 auto',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
          <button onClick={() => setDrawerOpen(true)}
            title="Outliner"
            aria-label="Open outliner"
            style={{
              width: 36, height: 36, borderRadius: 10,
              background: 'var(--surface-2)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              color: 'var(--ink)', border: 'none', cursor: 'pointer',
            }}>
            <IconList size={18} stroke={1.6} />
          </button>
          <Wordmark size={20} />
        </div>
        <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
          <div title="Search" style={{
            width: 36, height: 36, borderRadius: 18,
            background: 'var(--surface-2)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            color: 'var(--ink-2)', cursor: 'pointer',
          }}>
            <IconSearch size={16} />
          </div>
          <div title="Account" style={{
            width: 36, height: 36, borderRadius: '50%',
            background: 'var(--ink)', color: 'white',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: 12, fontWeight: 500, cursor: 'pointer',
          }}>AM</div>
        </div>
      </div>

      {/* Title */}
      <div style={{ padding: '4px 20px 16px', flex: '0 0 auto' }}>
        <div style={{ fontFamily: 'var(--font-mono)', fontSize: 10.5, color: 'var(--ink-3)', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 6 }}>
          Studio · This week
        </div>
        <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between' }}>
          <h1 style={{ margin: 0, fontSize: 28, fontWeight: 600, letterSpacing: -0.7 }}>This week</h1>
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--ink-3)' }}>12 BLOCKS</span>
        </div>
      </div>

      {/* View switcher */}
      <div style={{ padding: '0 20px 14px', flex: '0 0 auto' }}>
        <MobileViewSwitch view={view} onView={setView} />
      </div>

      {/* Workspace */}
      <div style={{ flex: 1, padding: '0 16px', overflow: 'hidden', minHeight: 0 }}>
        {view === 'calendar'
          ? <MobileCalendarView />
          : <Workspace mode="mobile" frame={wsFrame} view={view} onView={setView} scrollableX={true} />}
      </div>

      {/* Dock */}
      <div style={{
        position: 'absolute', left: 0, right: 0, bottom: 30,
        display: 'flex', justifyContent: 'center',
        pointerEvents: 'none', zIndex: 10,
      }}>
        <div style={{ pointerEvents: 'auto' }}>
          <MobileDock creatorOpen={creatorOpen} setCreatorOpen={setCreatorOpen} view={view} setView={setView} />
        </div>
      </div>

      {/* Outliner drawer */}
      <MobileOutliner open={drawerOpen} onClose={() => setDrawerOpen(false)} />

      <div className="mobile-home-indicator" />
    </div>
  );
}

// Outliner drawer — slides in from the left with the project tree.
function MobileOutliner({ open, onClose }) {
  return (
    <>
      <div onClick={onClose}
        style={{
          position: 'absolute', inset: 0, zIndex: 20,
          background: 'rgba(20, 18, 12, 0.32)',
          opacity: open ? 1 : 0,
          pointerEvents: open ? 'auto' : 'none',
          transition: 'opacity .22s ease',
        }} />
      <aside style={{
        position: 'absolute', left: 0, top: 0, bottom: 0, zIndex: 21,
        width: 296,
        background: 'var(--surface)',
        boxShadow: '12px 0 32px rgba(20, 18, 12, 0.18)',
        transform: open ? 'translateX(0)' : 'translateX(-100%)',
        transition: 'transform .28s cubic-bezier(.2,.7,.25,1)',
        display: 'flex', flexDirection: 'column',
        fontFamily: 'var(--font-sans)',
      }}>
        <div style={{ height: 44 }} />
        <div style={{ padding: '8px 14px 14px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <Wordmark size={22} />
          <button onClick={onClose} title="Close"
            style={{ width: 34, height: 34, borderRadius: 17, border: 'none', background: 'var(--surface-2)', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--ink-2)' }}>
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"><path d="M3 3l6 6M9 3l-6 6" /></svg>
          </button>
        </div>

        <div style={{ padding: '0 10px 12px' }}>
          <div className="search" style={{ width: '100%' }}>
            <IconSearch size={14} />
            <span style={{ flex: 1, overflow: 'hidden', textOverflow: 'ellipsis' }}>Jump to a block…</span>
            <kbd>⌘ K</kbd>
          </div>
        </div>

        <div style={{ flex: 1, overflow: 'auto', padding: '0 10px 12px' }}>
          <div className="section-label">Spaces</div>
          <div className="tree">
            <div className="tree-row is-active">
              <span className="tree-grip"><IconHome size={14} /></span>
              <span className="tree-label">Studio</span>
              <span className="tree-count">12</span>
            </div>
            <div className="tree-row">
              <span className="tree-grip"><IconHome size={14} /></span>
              <span className="tree-label">Personal</span>
              <span className="tree-count">04</span>
            </div>
            <div className="tree-row">
              <span className="tree-grip"><IconInbox size={14} /></span>
              <span className="tree-label">Inbox</span>
              <span className="tree-count">07</span>
            </div>
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
        </div>

        <div style={{ borderTop: '1px solid var(--border)', padding: '12px 14px', display: 'flex', alignItems: 'center', gap: 10 }}>
          <div style={{ width: 32, height: 32, borderRadius: 16, background: 'var(--ink)', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12, fontWeight: 500 }}>AM</div>
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ fontSize: 13, fontWeight: 500, color: 'var(--ink)' }}>Alex Mendez</div>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: 'var(--ink-3)' }}>alex@plan.app</div>
          </div>
          <IconMore size={16} />
        </div>
      </aside>
    </>
  );
}

// Single-day mobile calendar: day chips at top, time gutter on the left,
// blocks positioned by start hour + duration. Replaces the 7-col grid (way
// too cramped at 358px wide) when the user is on a phone.
function MobileCalendarView() {
  const [day, setDay] = React.useState(2);
  const hours = [7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19];
  const hourH = 44;
  const gutterW = 44;
  const blocks = BLOCKS.filter((b) => b.day === day);

  return (
    <div style={{ height: '100%', display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
      <div style={{ display: 'flex', gap: 6, padding: '0 0 12px', overflowX: 'auto', flexShrink: 0 }}>
        {DAYS.map((d, di) => {
          const on = di === day;
          return (
            <button key={d} onClick={() => setDay(di)}
              style={{
                flex: '0 0 auto',
                display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
                minWidth: 44, height: 56, padding: '4px 8px',
                border: 'none', borderRadius: 12,
                background: on ? 'var(--ink)' : 'var(--surface-2)',
                color: on ? '#fff' : 'var(--ink-2)',
                cursor: 'pointer', fontFamily: 'var(--font-sans)',
                transition: 'background .15s ease, color .15s ease',
              }}>
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: 9, letterSpacing: '.1em', textTransform: 'uppercase', opacity: 0.7 }}>{d}</span>
              <span style={{ fontSize: 17, fontWeight: 600, letterSpacing: '-0.3px', marginTop: 2 }}>{di + 12}</span>
            </button>
          );
        })}
      </div>

      <div style={{ flex: 1, overflow: 'auto', background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 10 }}>
        <div style={{ display: 'flex', position: 'relative' }}>
          <div style={{ width: gutterW, flexShrink: 0, paddingTop: 4 }}>
            {hours.map((h) => (
              <div key={h} style={{ height: hourH, display: 'flex', alignItems: 'flex-start', justifyContent: 'flex-end', paddingRight: 6, paddingTop: 4 }}>
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: 10, fontWeight: 500, color: 'var(--ink-3)', letterSpacing: '.02em' }}>
                  {h < 12 ? `${h}AM` : h === 12 ? '12PM' : `${h - 12}PM`}
                </span>
              </div>
            ))}
          </div>
          <div style={{ flex: 1, position: 'relative', borderLeft: '1px solid var(--border)' }}>
            {hours.map((h) => (
              <div key={h} style={{ height: hourH, borderBottom: '1px solid var(--subtle)' }} />
            ))}
            {blocks.map((b) => {
              const top = (b.startHour - hours[0]) * hourH + 2;
              const height = b.durHours * hourH - 4;
              const accent = b.status === 'doing' ? 'var(--accent)' : 'var(--border-strong)';
              return (
                <div key={b.id} style={{
                  position: 'absolute',
                  top, left: 4, right: 6,
                  height: Math.max(28, height),
                  background: b.status === 'doing' ? '#FFFBF9' : 'var(--surface)',
                  border: `1px solid ${accent}`,
                  borderLeft: `3px solid ${accent}`,
                  borderRadius: 8,
                  overflow: 'hidden',
                  padding: '6px 10px',
                  display: 'flex', flexDirection: 'column', justifyContent: 'flex-start', gap: 2,
                }}>
                  <span style={{ fontSize: 12, fontWeight: 500, color: 'var(--ink)', letterSpacing: '-0.1px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{b.title}</span>
                  <span style={{ fontFamily: 'var(--font-mono)', fontSize: 9.5, color: 'var(--ink-3)', textTransform: 'uppercase', letterSpacing: '.06em' }}>
                    {fmtHourSlim(b.startHour)}–{fmtHourSlim(b.startHour + b.durHours)} · {b.project}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

function fmtHourSlim(h) {
  const hh = h % 12 === 0 ? 12 : h % 12;
  const m = Math.round((h - Math.floor(h)) * 60);
  return m ? `${hh}:${String(m).padStart(2, '0')}${h < 12 ? 'a' : 'p'}` : `${hh}${h < 12 ? 'a' : 'p'}`;
}

function MobileViewSwitch({ view, onView }) {
  const ref = React.useRef(null);
  const [thumb, setThumb] = React.useState({ left: 0, width: 0 });
  React.useLayoutEffect(() => {
    if (!ref.current) return;
    const btn = ref.current.querySelector(`button[data-id="${view}"]`);
    if (btn) setThumb({ left: btn.offsetLeft, width: btn.offsetWidth });
  }, [view]);
  return (
    <div className="view-switch" ref={ref} style={{ display: 'flex', width: '100%' }}>
      <div className="pill-thumb" style={{ transform: `translateX(${thumb.left - 3}px)`, width: thumb.width }} />
      {VIEW_DEFS.map(({ id, label, Icon }) => (
        <button key={id} data-id={id} aria-pressed={view === id} onClick={() => onView(id)}
          style={{ flex: 1, justifyContent: 'center', padding: '8px 0' }}>
          <Icon size={14} stroke={1.6} />
          <span style={{ fontSize: 12 }}>{label}</span>
        </button>
      ))}
    </div>
  );
}

function MobileDock({ creatorOpen, setCreatorOpen, view, setView, onInbox }) {
  const items = [
    { id: 'home',     title: 'Home',       Icon: IconHome,     action: () => setView('list'),     activeWhen: view === 'list' },
    { id: 'today',    title: 'Today',      Icon: IconCalendar, action: () => setView('calendar'), activeWhen: view === 'calendar' },
    { id: 'inbox',    title: 'Inbox · 3',  Icon: IconInbox,    action: () => onInbox && onInbox() },
    { id: 'div1',     divider: true },
    { id: 'pin-bd',   title: 'Board',      Icon: IconKanban,   action: () => setView('kanban'),    activeWhen: view === 'kanban' },
    { id: 'pin-gantt', title: 'Sprint',    Icon: IconTimeline, action: () => setView('gantt'),     activeWhen: view === 'gantt' },
    { id: 'div2',     divider: true },
    { id: 'create',   title: creatorOpen ? 'Close' : 'New block', creator: true, action: () => setCreatorOpen(!creatorOpen) },
  ];
  return (
    <div className="dock" style={{ padding: 5 }}>
      {items.map((it) => {
        if (it.divider) return <div key={it.id} className="dock-divider" />;
        if (it.creator) return (
          <div key={it.id} className="dock-item is-creator" title={it.title} onClick={it.action}>
            <IconCreator open={creatorOpen} size={17} />
          </div>
        );
        const Ic = it.Icon;
        return (
          <div key={it.id}
            className={`dock-item ${it.activeWhen ? 'is-active' : ''}`}
            title={it.title}
            onClick={it.action}>
            <Ic size={16} stroke={1.6} />
          </div>
        );
      })}
    </div>
  );
}

Object.assign(window, { MobileShell });
