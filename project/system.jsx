// Plan. — The Geometric Alphabet artboard
// Shows the icon system, color, type ramp.

function SystemArtboard() {
  return (
    <div style={{
      width: 1200, height: 900,
      background: 'var(--bg)',
      fontFamily: 'var(--font-sans)',
      color: 'var(--ink)',
      padding: 56,
      position: 'relative',
      overflow: 'hidden',
    }}>
      {/* Header */}
      <div style={{ marginBottom: 40 }}>
        <div style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--ink-3)', textTransform: 'uppercase', letterSpacing: '0.12em', marginBottom: 10 }}>
          Design language
        </div>
        <div style={{ display: 'flex', alignItems: 'baseline', gap: 18 }}>
          <h1 style={{ margin: 0, fontSize: 56, fontWeight: 600, letterSpacing: -1.6 }}>The Geometric Alphabet</h1>
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: 12, color: 'var(--ink-3)' }}>· v0.1</span>
        </div>
        <p style={{ marginTop: 14, fontSize: 15, color: 'var(--ink-2)', maxWidth: 640, lineHeight: 1.55 }}>
          Pure geometry. Every interaction has a single shape. Shapes never duplicate meaning;
          a block is a block whether it's a task, a calendar, or a routine. Thin-line everything.
        </p>
      </div>

      {/* Icons grid */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(4, 1fr)',
        gap: 1,
        background: 'var(--border)',
        border: '1px solid var(--border)',
        marginBottom: 48,
      }}>
        {[
          { Icon: IconHome,     glyph: '∙',   name: 'Home',           note: 'Center of gravity' },
          { Icon: IconCreator,  glyph: '+',   name: 'Universal +',    note: 'Rotates 45° to close' },
          { Icon: IconKanban,   glyph: '∣∣∣', name: 'Board',          note: 'Kanban view' },
          { Icon: IconCalendar, glyph: '□',   name: 'Calendar',       note: 'Time grid' },
          { Icon: IconTimeline, glyph: '—',   name: 'Timeline',       note: 'Gantt view' },
          { Icon: IconTask,     glyph: '∘',   name: 'Task',           note: 'Open slot' },
          { Icon: IconRoutine,  glyph: '↻',   name: 'Routine',        note: 'Recurring cycle' },
          { Icon: IconGrip,     glyph: '::',  name: 'Grip',           note: 'Drag · nest · pin' },
        ].map(({ Icon, glyph, name, note }, i) => (
          <div key={i} style={{ background: 'var(--surface)', padding: '28px 22px', display: 'flex', gap: 22, alignItems: 'center' }}>
            <div style={{
              width: 60, height: 60,
              border: '1px solid var(--border)',
              borderRadius: 'var(--r-md)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              background: 'var(--surface)',
              color: 'var(--ink)',
              flex: '0 0 auto',
            }}>
              <Icon size={24} stroke={1.5} />
            </div>
            <div style={{ minWidth: 0 }}>
              <div style={{ display: 'flex', alignItems: 'baseline', gap: 8, marginBottom: 4 }}>
                <span style={{ fontSize: 16, fontWeight: 500, letterSpacing: -0.2 }}>{name}</span>
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: 12, color: 'var(--ink-4)' }}>{glyph}</span>
              </div>
              <div style={{ fontSize: 12, color: 'var(--ink-3)', fontFamily: 'var(--font-mono)', textTransform: 'uppercase', letterSpacing: '0.06em' }}>{note}</div>
            </div>
          </div>
        ))}
      </div>

      {/* Bottom row: color + type */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 32 }}>
        <div>
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--ink-3)', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 14 }}>
            Color
          </div>
          <div style={{ display: 'flex', gap: 1, background: 'var(--border)', border: '1px solid var(--border)' }}>
            {[
              { hex: '#FAFAF8', name: 'Canvas', light: true },
              { hex: '#F0EFEB', name: 'Subtle', light: true },
              { hex: '#D4D3CD', name: 'Border', light: true },
              { hex: '#8B8B83', name: 'Mute',   light: true },
              { hex: '#15140F', name: 'Ink',    light: false },
              { hex: '#FF5C2B', name: 'Plan.',  light: false },
            ].map(({ hex, name, light }, i) => (
              <div key={i} style={{
                background: hex, height: 110, flex: 1,
                padding: '12px 14px',
                display: 'flex', flexDirection: 'column', justifyContent: 'space-between',
                color: light ? 'var(--ink-2)' : 'rgba(255,255,255,0.95)',
              }}>
                <span style={{ fontSize: 13, fontWeight: 500 }}>{name}</span>
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: 10.5, opacity: 0.75 }}>{hex}</span>
              </div>
            ))}
          </div>
        </div>

        <div>
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--ink-3)', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 14 }}>
            Type · Geist
          </div>
          <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', padding: '18px 22px' }}>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: 12, paddingBottom: 8, borderBottom: '1px solid var(--border)' }}>
              <span style={{ fontSize: 38, fontWeight: 600, letterSpacing: -1, lineHeight: 1 }}>Build your world</span>
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: 10.5, color: 'var(--ink-4)', marginLeft: 'auto' }}>38 · 600</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: 12, padding: '10px 0', borderBottom: '1px solid var(--border)' }}>
              <span style={{ fontSize: 20, fontWeight: 500, letterSpacing: -0.3 }}>Stop fighting your tools</span>
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: 10.5, color: 'var(--ink-4)', marginLeft: 'auto' }}>20 · 500</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: 12, padding: '10px 0', borderBottom: '1px solid var(--border)' }}>
              <span style={{ fontSize: 14, fontWeight: 400, color: 'var(--ink-2)' }}>A block isn't just a note. It's a container.</span>
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: 10.5, color: 'var(--ink-4)', marginLeft: 'auto' }}>14 · 400</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: 12, padding: '10px 0 0' }}>
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--ink-3)', textTransform: 'uppercase', letterSpacing: '0.08em' }}>SHIP V2.1 · IN MOTION</span>
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: 10.5, color: 'var(--ink-4)', marginLeft: 'auto' }}>Geist Mono</span>
            </div>
          </div>
        </div>
      </div>

      {/* Corner marks for hi-fi feel */}
      <div style={{ position: 'absolute', top: 16, left: 16 }}><div className="corner-mark" /></div>
      <div style={{ position: 'absolute', top: 16, right: 16, transform: 'rotate(90deg)' }}><div className="corner-mark" /></div>
      <div style={{ position: 'absolute', bottom: 16, left: 16, transform: 'rotate(-90deg)' }}><div className="corner-mark" /></div>
      <div style={{ position: 'absolute', bottom: 16, right: 16, transform: 'rotate(180deg)' }}><div className="corner-mark" /></div>
    </div>
  );
}

Object.assign(window, { SystemArtboard });
