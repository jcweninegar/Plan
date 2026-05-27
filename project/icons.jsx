// Plan. — The Geometric Alphabet
// Pure geometry, thin lines. No literal icons.
// Every icon is a single SVG with stroke-width:1.5 or solid primitive.

const PI = ({ size = 16, stroke = 1.5, children, style }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none"
    stroke="currentColor" strokeWidth={stroke}
    strokeLinecap="round" strokeLinejoin="round"
    style={{ flex: '0 0 auto', display: 'block', ...style }}>
    {children}
  </svg>
);

// ∙  Home / Center of Gravity
const IconHome = (p) => (
  <PI {...p}><circle cx="12" cy="12" r="3" fill="currentColor" stroke="none" /></PI>
);

// +  Universal Creator — rotates 45° to close
const IconCreator = ({ open, ...p }) => (
  <PI {...p} stroke={2}>
    <g style={{ transformOrigin: '12px 12px', transition: 'transform .25s var(--ease-out, ease)',
                transform: open ? 'rotate(45deg)' : 'rotate(0deg)' }}>
      <path d="M12 5v14M5 12h14" />
    </g>
  </PI>
);

// ∣∣∣  Kanban
const IconKanban = (p) => (
  <PI {...p}>
    <path d="M6 5v14M12 5v9M18 5v12" />
  </PI>
);

// □  Calendar
const IconCalendar = (p) => (
  <PI {...p}>
    <rect x="4.5" y="4.5" width="15" height="15" rx="1" />
  </PI>
);

// —  Timeline / Gantt
const IconTimeline = (p) => (
  <PI {...p}>
    <path d="M4 9h9M7 15h13" />
  </PI>
);

// list / task — three short rules
const IconList = (p) => (
  <PI {...p}>
    <path d="M4 7h16M4 12h16M4 17h10" />
  </PI>
);

// ∘  Task / Slot
const IconTask = (p) => (
  <PI {...p}>
    <circle cx="12" cy="12" r="6" />
  </PI>
);

// ↻  Routine / Cycle (broken ring)
const IconRoutine = (p) => (
  <PI {...p}>
    <path d="M19 12a7 7 0 1 1-3-5.7" />
    <path d="M19 4v4h-4" />
  </PI>
);

// ::  Grip — anything draggable
const IconGrip = (p) => (
  <PI {...p} stroke={0}>
    <g fill="currentColor">
      <circle cx="9" cy="7" r="1.1" />
      <circle cx="15" cy="7" r="1.1" />
      <circle cx="9" cy="12" r="1.1" />
      <circle cx="15" cy="12" r="1.1" />
      <circle cx="9" cy="17" r="1.1" />
      <circle cx="15" cy="17" r="1.1" />
    </g>
  </PI>
);

// Search / spy: empty circle with tail
const IconSearch = (p) => (
  <PI {...p}>
    <circle cx="10.5" cy="10.5" r="5.5" />
    <path d="M15 15l4 4" />
  </PI>
);

// Filter — two converging rules
const IconFilter = (p) => (
  <PI {...p}>
    <path d="M5 7h14M8 12h8M11 17h2" />
  </PI>
);

// More — three dots horizontal
const IconMore = (p) => (
  <PI {...p} stroke={0}>
    <g fill="currentColor">
      <circle cx="6" cy="12" r="1.4" />
      <circle cx="12" cy="12" r="1.4" />
      <circle cx="18" cy="12" r="1.4" />
    </g>
  </PI>
);

// Inbox — open square with notch
const IconInbox = (p) => (
  <PI {...p}>
    <path d="M5 13v6h14v-6M5 13l3-8h8l3 8M5 13h4l1 2h4l1-2h4" />
  </PI>
);

// Triangle expand / collapse
const IconChev = ({ dir = 'down', ...p }) => (
  <PI {...p}>
    <path d={
      dir === 'down' ? 'M6 9l6 6 6-6'
      : dir === 'right' ? 'M9 6l6 6-6 6'
      : dir === 'up' ? 'M6 15l6-6 6 6'
      : 'M15 6l-6 6 6 6'
    } />
  </PI>
);

// "Plan." wordmark — simple text in display weight
const Wordmark = ({ size = 22 }) => (
  <div style={{
    fontFamily: 'var(--font-sans)',
    fontSize: size,
    fontWeight: 600,
    letterSpacing: -0.6,
    color: 'var(--ink)',
    display: 'inline-flex',
    alignItems: 'baseline',
    gap: 0,
  }}>
    Plan<span style={{ color: 'var(--accent)' }}>.</span>
  </div>
);

// Block-type icon → resolves block type to icon component
const BlockIcon = ({ type, ...p }) => {
  switch (type) {
    case 'cycle': return <IconRoutine {...p} />;
    case 'event': return <IconCalendar {...p} stroke={1.6} />;
    default: return <IconTask {...p} />;
  }
};

Object.assign(window, {
  IconHome, IconCreator, IconKanban, IconCalendar, IconTimeline, IconList,
  IconTask, IconRoutine, IconGrip, IconSearch, IconFilter, IconMore,
  IconInbox, IconChev, Wordmark, BlockIcon,
});
