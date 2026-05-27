import { AlignJustify, Calendar, ChevronRight, GanttChart, Grip, KanbanSquare, LayoutList, List, Menu, Minus, MoreVertical, PanelBottomClose, PanelBottomOpen, PanelLeftClose, PanelLeftOpen, PanelRight, PanelRightClose, PanelRightOpen, PanelTopClose, PanelTopOpen, Plus, Settings, Settings2, SidebarClose, SidebarOpen, SlidersHorizontal } from "lucide-react";
import { useState } from "react";

const ACCENT = "#2563EB";

const BlockRow = ({ title, viewType = "kanban", expanded = false, nested = false, showCount = false, count = 0, children }) => (
  <div style={{
    background: "#fff",
    border: nested ? "none" : `1px solid ${ACCENT}`,
    borderBottom: nested ? `1px solid ${ACCENT}30` : undefined,
    borderRadius: nested ? 0 : 10,
    overflow: "hidden",
    fontFamily: "Helvetica Neue, Arial, sans-serif",
  }}>
    <div style={{ display: "flex", alignItems: "center", height: 56 }}>
      {/* View type icon */}
      <button style={{ width: 48, height: 48, display: "flex", alignItems: "center", justifyContent: "center", background: "none", border: "none", cursor: "pointer", flexShrink: 0 }}>
        {viewType === "calendar" ? <Calendar size={24} color={ACCENT} strokeWidth={1.5} /> :
         viewType === "gantt" ? <GanttChart size={24} color={ACCENT} strokeWidth={1.5} /> :
         <KanbanSquare size={24} color={ACCENT} strokeWidth={1.5} />}
      </button>
      {/* Title */}
      <span style={{ flex: 1, fontSize: nested ? 13 : 11, fontWeight: nested ? 500 : 700, letterSpacing: nested ? 0 : ".1em", textTransform: nested ? "none" : "uppercase", color: "#111" }}>
        {title}
      </span>
      {/* Detail */}
      <button style={{ width: 48, height: 48, display: "flex", alignItems: "center", justifyContent: "center", background: "none", border: "none", cursor: "pointer", flexShrink: 0 }}>
        <List size={24} color="#888" strokeWidth={1.5} />
      </button>
      {/* Expand */}
      <button style={{ width: 48, height: 48, display: "flex", alignItems: "center", justifyContent: "center", background: "none", border: "none", cursor: "pointer", flexShrink: 0 }}>
        {expanded ? <PanelTopClose size={24} color="#888" strokeWidth={1.5} /> : <PanelTopOpen size={24} color="#888" strokeWidth={1.5} />}
      </button>
    </div>

    {/* Block count indicator */}
    {showCount && count > 0 && !expanded && (
      <div>
        <div style={{ height: 1.5, background: ACCENT }} />
        <div style={{ padding: "6px 14px" }}>
          <span style={{ fontSize: 10, letterSpacing: ".1em", textTransform: "uppercase", color: ACCENT, opacity: .7, fontWeight: 600 }}>
            {count} {count === 1 ? "block" : "blocks"}
          </span>
        </div>
      </div>
    )}

    {/* Expanded state */}
    {expanded && (
      <div style={{ borderTop: `1px solid ${ACCENT}` }}>
        {children}
        <div style={{ padding: "10px 14px", cursor: "pointer" }}>
          <span style={{ fontSize: 11, letterSpacing: ".12em", textTransform: "uppercase", fontWeight: 600, color: ACCENT, opacity: .6, display: "flex", alignItems: "center", gap: 4 }}>
            <Plus size={14} color="#888" strokeWidth={2} /> Add
          </span>
        </div>
      </div>
    )}
  </div>
);

const DashedAdd = () => (
  <div style={{ border: `1.5px dashed ${ACCENT}`, borderRadius: 10, padding: "18px", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", opacity: .5, fontFamily: "Helvetica Neue, Arial, sans-serif" }}>
    <span style={{ fontSize: 11, letterSpacing: ".12em", textTransform: "uppercase", fontWeight: 600, color: ACCENT, display: "flex", alignItems: "center", gap: 6 }}>
      <Plus size={14} color="#888" strokeWidth={2} /> Add
    </span>
  </div>
);

const Section = ({ title, children }) => (
  <div style={{ marginBottom: 32 }}>
    <div style={{ fontSize: 10, letterSpacing: ".16em", textTransform: "uppercase", color: "#bbb", fontFamily: "Helvetica Neue, Arial, sans-serif", marginBottom: 12, fontWeight: 600 }}>{title}</div>
    <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
      {children}
    </div>
  </div>
);

export default function IconPreview() {
  const [drawerOpen, setDrawerOpen] = useState(false);
  return (
    <div style={{ fontFamily: "Helvetica Neue, Arial, sans-serif", padding: 24, background: "#f5f5f5", minHeight: "100vh" }}>
      <div style={{ fontSize: 22, fontWeight: 800, color: ACCENT, letterSpacing: "-0.02em", marginBottom: 4 }}>Plan.</div>
      <div style={{ fontSize: 10, letterSpacing: ".14em", textTransform: "uppercase", color: "#bbb", marginBottom: 32 }}>Block States & Icon Reference</div>

      {/* Home page header */}
      <Section title="Home Page Header">
        <div style={{ background:"#fff", borderRadius:10, overflow:"hidden" }}>
          <div style={{ display:"flex", alignItems:"flex-start", justifyContent:"space-between", padding:"20px 4px 16px 12px" }}>
            <div style={{ fontSize:42, fontWeight:800, color:ACCENT, letterSpacing:"-0.03em", lineHeight:1 }}>Plan.</div>
            <div style={{ display:"flex", alignItems:"center" }}>
              <button style={{ width:48, height:48, display:"flex", alignItems:"center", justifyContent:"center", background:"none", border:"none", cursor:"pointer" }}>
                <List size={24} color="#bbb" strokeWidth={1.5} />
              </button>
              <button onClick={() => setDrawerOpen(d => !d)} style={{ width:48, height:48, display:"flex", alignItems:"center", justifyContent:"center", background:"none", border:"none", cursor:"pointer" }}>
                {drawerOpen
                  ? <PanelRightClose size={24} color={ACCENT} strokeWidth={1.5} />
                  : <PanelRightOpen size={24} color="#bbb" strokeWidth={1.5} />
                }
              </button>
            </div>
          </div>
          <div style={{ height:1.5, background:ACCENT }} />
        </div>
        <div style={{ fontSize:9, color:"#bbb", letterSpacing:".1em", textTransform:"uppercase", textAlign:"center" }}>
          Tap the panel icon to toggle ↑
        </div>
      </Section>
      <Section title="Icon Set">
        <div style={{ background: "#fff", borderRadius: 10, padding: 20, display: "flex", gap: 24, flexWrap: "wrap" }}>
          {[
            { Icon: KanbanSquare, label: "Kanban" },
            { Icon: Calendar, label: "Calendar" },
            { Icon: GanttChart, label: "Gantt" },
            { Icon: List, label: "Detail" },
            { Icon: Plus, label: "Expand / Add" },
            { Icon: Minus, label: "Collapse" },
            { Icon: ChevronRight, label: "Drill in" },
          ].map(({ Icon, label }) => (
            <div key={label} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 8 }}>
              <div style={{ width: 48, height: 48, display: "flex", alignItems: "center", justifyContent: "center", background: "#f8f8f7", borderRadius: 10, border: "1px solid #ebebea" }}>
                <Icon size={24} color={ACCENT} strokeWidth={1.5} />
              </div>
              <span style={{ fontSize: 9, color: "#888", textAlign: "center", letterSpacing: ".06em", textTransform: "uppercase" }}>{label}</span>
            </div>
          ))}
        </div>
      </Section>

      {/* Menu / nav icon candidates */}
      <Section title="Menu Icon Candidates (far right of header)">
        <div style={{ background:"#fff", borderRadius:10, padding:20, display:"flex", gap:16, flexWrap:"wrap" }}>
          {[
            { name:"Menu", Icon: Menu },
            { name:"AlignJustify", Icon: AlignJustify },
            { name:"MoreVertical", Icon: MoreVertical },
            { name:"SlidersHorizontal", Icon: SlidersHorizontal },
            { name:"Settings", Icon: Settings },
            { name:"Settings2", Icon: Settings2 },
            { name:"Grip", Icon: Grip },
            { name:"LayoutList", Icon: LayoutList },
            { name:"List", Icon: List },
            { name:"PanelRight", Icon: PanelRight },
            { name:"SidebarOpen", Icon: SidebarOpen },
            { name:"SidebarClose", Icon: SidebarClose },
            { name:"PanelRightClose", Icon: PanelRightClose },
            { name:"PanelRightOpen", Icon: PanelRightOpen },
            { name:"PanelLeftClose", Icon: PanelLeftClose },
            { name:"PanelLeftOpen", Icon: PanelLeftOpen },
            { name:"PanelBottomClose", Icon: PanelBottomClose },
            { name:"PanelBottomOpen", Icon: PanelBottomOpen },
            { name:"PanelTopClose", Icon: PanelTopClose },
            { name:"PanelTopOpen", Icon: PanelTopOpen },
          ].map(({ name, Icon }) => (
            <div key={name} style={{ display:"flex", flexDirection:"column", alignItems:"center", gap:8, width:72 }}>
              <div style={{ width:48, height:48, display:"flex", alignItems:"center", justifyContent:"center", border:"1px solid #ebebea", borderRadius:10, background:"#fafafa" }}>
                <Icon size={24} color="#555" strokeWidth={1.5} />
              </div>
              <span style={{ fontSize:9, color:"#999", textAlign:"center", lineHeight:1.3 }}>{name}</span>
            </div>
          ))}
        </div>
        {/* Preview in header context */}
        <div style={{ fontSize:9, color:"#bbb", letterSpacing:".1em", textTransform:"uppercase", marginTop:8, marginBottom:4 }}>In header context</div>
        <div style={{ display:"flex", flexDirection:"column", gap:8 }}>
          {[
            { name:"Menu", Icon: Menu },
            { name:"AlignJustify", Icon: AlignJustify },
            { name:"SlidersHorizontal", Icon: SlidersHorizontal },
            { name:"Settings2", Icon: Settings2 },
          ].map(({ name, Icon }) => (
            <div key={name}>
              <div style={{ fontSize:8, color:"#ccc", marginBottom:2 }}>{name}</div>
              <div style={{ background:"#fff", borderRadius:10, overflow:"hidden" }}>
                <div style={{ display:"flex", alignItems:"flex-start", justifyContent:"space-between", padding:"20px 4px 16px 12px" }}>
                  <div style={{ fontSize:36, fontWeight:800, color:ACCENT, letterSpacing:"-0.03em", lineHeight:1 }}>Plan.</div>
                  <button style={{ width:48, height:48, display:"flex", alignItems:"center", justifyContent:"center", background:"none", border:"none", cursor:"pointer" }}>
                    <Icon size={24} color="#bbb" strokeWidth={1.5} />
                  </button>
                </div>
                <div style={{ height:1.5, background:ACCENT }} />
              </div>
            </div>
          ))}
        </div>
      </Section>

      {/* Collapsed — top level */}}
      <Section title="Collapsed — Top Level">
        <BlockRow title="Routines" viewType="kanban" />
        <BlockRow title="Morning" viewType="calendar" />
        <BlockRow title="Goals" viewType="gantt" />
      </Section>

      {/* Collapsed with block count */}
      <Section title="Collapsed — With Nested Blocks (over 1hr)">
        <BlockRow title="Deep Work" viewType="kanban" showCount count={3} />
        <BlockRow title="Weekly Planning" viewType="calendar" showCount count={1} />
      </Section>

      {/* Expanded */}
      <Section title="Expanded — With Nested Blocks">
        <BlockRow title="Deep Work" viewType="kanban" expanded>
          <BlockRow title="Write spec doc" viewType="kanban" nested />
          <BlockRow title="Code review" viewType="kanban" nested />
          <BlockRow title="Team sync" viewType="kanban" nested />
        </BlockRow>
      </Section>

      {/* Nested blocks (text-only add) */}
      <Section title="Nested Block Row">
        <div style={{ background: "#fff", border: `1px solid ${ACCENT}`, borderRadius: 10, overflow: "hidden" }}>
          <BlockRow title="Write spec doc" viewType="kanban" nested />
          <BlockRow title="Code review" viewType="kanban" nested />
        </div>
      </Section>

      {/* Full screen / drill-in header */}
      <Section title="Full Screen — Headers Stacked">
        <div style={{ background:"#fff", borderRadius:10, overflow:"hidden" }}>
          {/* Main Plan. header */}
          <div style={{ display:"flex", alignItems:"flex-start", justifyContent:"space-between", padding:"20px 4px 16px 12px" }}>
            <div style={{ fontSize:42, fontWeight:800, color:ACCENT, letterSpacing:"-0.03em", lineHeight:1 }}>Plan.</div>
            <div style={{ display:"flex", alignItems:"center" }}>
              <button style={{ width:48, height:48, display:"flex", alignItems:"center", justifyContent:"center", background:"none", border:"none", cursor:"pointer" }}>
                <List size={24} color="#bbb" strokeWidth={1.5} />
              </button>
              <button style={{ width:48, height:48, display:"flex", alignItems:"center", justifyContent:"center", background:"none", border:"none", cursor:"pointer" }}>
                <PanelRightClose size={24} color={ACCENT} strokeWidth={1.5} />
              </button>
            </div>
          </div>
          <div style={{ height:1.5, background:ACCENT }} />
          {/* Block sub-header nests directly below */}
          <div style={{ display:"flex", alignItems:"center", padding:"0 4px", height:56, borderBottom:`1px solid ${ACCENT}` }}>
            <button style={{ width:48, height:48, display:"flex", alignItems:"center", justifyContent:"center", background:"none", border:"none", cursor:"pointer" }}>
              <ChevronRight size={24} color="#aaa" strokeWidth={1.5} style={{ transform:"rotate(180deg)" }} />
            </button>
            <button style={{ width:48, height:48, display:"flex", alignItems:"center", justifyContent:"center", background:"none", border:"none", cursor:"pointer" }}>
              <KanbanSquare size={24} color={ACCENT} strokeWidth={1.5} />
            </button>
            <span style={{ flex:1, fontSize:15, fontWeight:700, color:"#111" }}>Deep Work</span>
            <button style={{ width:48, height:48, display:"flex", alignItems:"center", justifyContent:"center", background:"none", border:"none", cursor:"pointer" }}>
              <List size={24} color="#888" strokeWidth={1.5} />
            </button>
          </div>
        </div>
      </Section>

      {/* Persistent dashed add container */}
      <Section title="Persistent Add Container (tap to open inline row)">
        <DashedAdd />
      </Section>

      {/* Inline block row add */}
      <Section title="Add — Inline (looks like collapsed block)">
        <div style={{ background:"#fff", border:`1px solid ${ACCENT}`, borderRadius:10, overflow:"hidden" }}>
          <div style={{ display:"flex", alignItems:"center", height:56 }}>
            <button style={{ width:48, height:48, display:"flex", alignItems:"center", justifyContent:"center", background:"none", border:"none", cursor:"pointer", flexShrink:0 }}>
              <KanbanSquare size={24} color={ACCENT} strokeWidth={1.5} />
            </button>
            <input
              placeholder="Title..."
              style={{ flex:1, fontSize:11, fontWeight:700, letterSpacing:".1em", textTransform:"uppercase", fontFamily:"Helvetica Neue, Arial, sans-serif", background:"none", border:"none", outline:"none", color:"#111", padding:"0 4px" }}
            />
            <button style={{ width:48, height:48, display:"flex", alignItems:"center", justifyContent:"center", background:"none", border:"none", cursor:"pointer", flexShrink:0 }}>
              <List size={24} color="#bbb" strokeWidth={1.5} />
            </button>
            <button style={{ width:48, height:48, display:"flex", alignItems:"center", justifyContent:"center", background:"none", border:"none", cursor:"pointer", flexShrink:0 }}>
              <PanelTopOpen size={24} color="#888" strokeWidth={1.5} />
            </button>
          </div>
        </div>
      </Section>

      {/* ── VIEW PREVIEWS ── */}

      <div style={{ fontSize:10, letterSpacing:".2em", textTransform:"uppercase", color:"#999", fontFamily:"Helvetica Neue, Arial, sans-serif", marginBottom:16, marginTop:32, fontWeight:700, borderBottom:"1px solid #e0e0e0", paddingBottom:8 }}>KANBAN</div>
      <div style={{ display:"flex", gap:24, overflowX:"auto", paddingBottom:16, alignItems:"flex-start" }}>

        <div style={{ flexShrink:0 }}>
          <div style={{ fontSize:9, letterSpacing:".14em", textTransform:"uppercase", color:"#bbb", textAlign:"center", marginBottom:8, fontFamily:"Helvetica Neue, Arial, sans-serif" }}>1 — All Collapsed</div>
                  <div style={{ width:290, background:"#1a1a1a", borderRadius:48, padding:"12px 6px", boxShadow:"0 28px 64px rgba(0,0,0,.4), inset 0 0 0 2px #3a3a3a", position:"relative" }}>
            <div style={{ position:"absolute", left:-3, top:80, width:3, height:28, background:"#2a2a2a", borderRadius:"2px 0 0 2px" }}/>
            <div style={{ position:"absolute", left:-3, top:116, width:3, height:44, background:"#2a2a2a", borderRadius:"2px 0 0 2px" }}/>
            <div style={{ position:"absolute", right:-3, top:120, width:3, height:60, background:"#2a2a2a", borderRadius:"0 2px 2px 0" }}/>
            <div style={{ width:80, height:24, background:"#1a1a1a", borderRadius:12, margin:"0 auto 6px" }}/>
            <div style={{ background:"#fff", borderRadius:36, overflow:"hidden", height:580, display:"flex", flexDirection:"column" }}>
              <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", padding:"10px 20px 0", height:36, flexShrink:0 }}>
                <span style={{ fontSize:12, fontWeight:700, color:"#111" }}>9:41</span>
                <div style={{ width:14, height:7, border:"1.5px solid #111", borderRadius:2, position:"relative" }}><div style={{ position:"absolute", left:1, top:1, bottom:1, width:"70%", background:"#111", borderRadius:1 }}/></div>
              </div>              <div style={{ display:"flex", alignItems:"flex-start", justifyContent:"space-between", padding:"12px 4px 10px 12px", flexShrink:0 }}>
                <div style={{ fontSize:30, fontWeight:800, color:ACCENT, letterSpacing:"-0.03em", lineHeight:1 }}>Plan.</div>
                <div style={{ display:"flex" }}>
                  <button style={{ width:44, height:44, display:"flex", alignItems:"center", justifyContent:"center", background:"none", border:"none" }}><List size={20} color="#bbb" strokeWidth={1.5}/></button>
                  <button style={{ width:44, height:44, display:"flex", alignItems:"center", justifyContent:"center", background:"none", border:"none" }}><PanelRightOpen size={20} color="#bbb" strokeWidth={1.5}/></button>
                </div>
              </div>
              <div style={{ height:1.5, background:ACCENT, flexShrink:0 }}/>              <div style={{ flex:1, padding:"12px 8px 0", overflow:"hidden" }}>
                {["Routines","Projects","Goals","Habits"].map((t,i)=>(
                  <div key={i} style={{ display:"flex", alignItems:"center", height:52, border:`1px solid ${ACCENT}`, borderRadius:9, marginBottom:8 }}>
                    <button style={{ width:44, height:44, display:"flex", alignItems:"center", justifyContent:"center", background:"none", border:"none" }}><KanbanSquare size={20} color={ACCENT} strokeWidth={1.5}/></button>
                    <span style={{ flex:1, fontSize:10, fontWeight:700, letterSpacing:".08em", textTransform:"uppercase", color:"#111" }}>{t}</span>
                    <button style={{ width:44, height:44, display:"flex", alignItems:"center", justifyContent:"center", background:"none", border:"none" }}><List size={20} color="#888" strokeWidth={1.5}/></button>
                    <button style={{ width:44, height:44, display:"flex", alignItems:"center", justifyContent:"center", background:"none", border:"none" }}><PanelTopOpen size={20} color="#888" strokeWidth={1.5}/></button>
                  </div>
                ))}
                <div style={{ border:`1.5px dashed ${ACCENT}`, borderRadius:9, padding:"12px", display:"flex", alignItems:"center", justifyContent:"center", opacity:.5 }}>
                  <span style={{ fontSize:10, letterSpacing:".12em", textTransform:"uppercase", fontWeight:600, color:ACCENT }}>+ Add</span>
                </div>
              </div>              <div style={{ height:68, borderTop:"1px solid #ebebea", display:"flex", alignItems:"center", padding:"0 12px", flexShrink:0 }}>
                <div style={{ display:"flex", flexDirection:"column", alignItems:"center", gap:2, minWidth:44 }}><KanbanSquare size={20} color={ACCENT} strokeWidth={1.5}/><span style={{ fontSize:8, letterSpacing:".08em", textTransform:"uppercase", color:ACCENT, fontWeight:600 }}>Home</span></div>
                <div style={{ flex:1, display:"flex", justifyContent:"center", gap:20 }}>
                  <div style={{ display:"flex", flexDirection:"column", alignItems:"center", gap:2 }}><Calendar size={20} color={"#aaa"} strokeWidth={1.5}/><span style={{ fontSize:8, color:"#aaa", fontWeight:400 }}>Monday</span></div>
                  <div style={{ display:"flex", flexDirection:"column", alignItems:"center", gap:2 }}><GanttChart size={20} color={"#aaa"} strokeWidth={1.5}/><span style={{ fontSize:8, color:"#aaa", fontWeight:400 }}>Sprint</span></div>
                </div>
                <div style={{ display:"flex", alignItems:"center" }}><div style={{ width:1, height:20, background:"#e0e0e0", marginRight:10 }}/><PanelTopOpen size={22} color={ACCENT} strokeWidth={1.5}/></div>
              </div>
              <div style={{ height:20, display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0 }}><div style={{ width:100, height:4, background:"#111", borderRadius:2, opacity:.2 }}/></div>
            </div>
          </div>
        </div>

        <div style={{ flexShrink:0 }}>
          <div style={{ fontSize:9, letterSpacing:".14em", textTransform:"uppercase", color:"#bbb", textAlign:"center", marginBottom:8, fontFamily:"Helvetica Neue, Arial, sans-serif" }}>2 — Expanded + Nested</div>
                  <div style={{ width:290, background:"#1a1a1a", borderRadius:48, padding:"12px 6px", boxShadow:"0 28px 64px rgba(0,0,0,.4), inset 0 0 0 2px #3a3a3a", position:"relative" }}>
            <div style={{ position:"absolute", left:-3, top:80, width:3, height:28, background:"#2a2a2a", borderRadius:"2px 0 0 2px" }}/>
            <div style={{ position:"absolute", left:-3, top:116, width:3, height:44, background:"#2a2a2a", borderRadius:"2px 0 0 2px" }}/>
            <div style={{ position:"absolute", right:-3, top:120, width:3, height:60, background:"#2a2a2a", borderRadius:"0 2px 2px 0" }}/>
            <div style={{ width:80, height:24, background:"#1a1a1a", borderRadius:12, margin:"0 auto 6px" }}/>
            <div style={{ background:"#fff", borderRadius:36, overflow:"hidden", height:580, display:"flex", flexDirection:"column" }}>
              <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", padding:"10px 20px 0", height:36, flexShrink:0 }}>
                <span style={{ fontSize:12, fontWeight:700, color:"#111" }}>9:41</span>
                <div style={{ width:14, height:7, border:"1.5px solid #111", borderRadius:2, position:"relative" }}><div style={{ position:"absolute", left:1, top:1, bottom:1, width:"70%", background:"#111", borderRadius:1 }}/></div>
              </div>              <div style={{ display:"flex", alignItems:"flex-start", justifyContent:"space-between", padding:"12px 4px 10px 12px", flexShrink:0 }}>
                <div style={{ fontSize:30, fontWeight:800, color:ACCENT, letterSpacing:"-0.03em", lineHeight:1 }}>Plan.</div>
                <div style={{ display:"flex" }}>
                  <button style={{ width:44, height:44, display:"flex", alignItems:"center", justifyContent:"center", background:"none", border:"none" }}><List size={20} color="#bbb" strokeWidth={1.5}/></button>
                  <button style={{ width:44, height:44, display:"flex", alignItems:"center", justifyContent:"center", background:"none", border:"none" }}><PanelRightOpen size={20} color="#bbb" strokeWidth={1.5}/></button>
                </div>
              </div>
              <div style={{ height:1.5, background:ACCENT, flexShrink:0 }}/>              <div style={{ flex:1, padding:"12px 8px 0", overflow:"hidden" }}>
                <div style={{ display:"flex", alignItems:"center", height:52, border:`1px solid ${ACCENT}`, borderRadius:9, marginBottom:8 }}>
                  <button style={{ width:44, height:44, display:"flex", alignItems:"center", justifyContent:"center", background:"none", border:"none" }}><KanbanSquare size={20} color={ACCENT} strokeWidth={1.5}/></button>
                  <span style={{ flex:1, fontSize:10, fontWeight:700, letterSpacing:".08em", textTransform:"uppercase", color:"#111" }}>Routines</span>
                  <button style={{ width:44, height:44, display:"flex", alignItems:"center", justifyContent:"center", background:"none", border:"none" }}><List size={20} color="#888" strokeWidth={1.5}/></button>
                  <button style={{ width:44, height:44, display:"flex", alignItems:"center", justifyContent:"center", background:"none", border:"none" }}><PanelTopOpen size={20} color="#888" strokeWidth={1.5}/></button>
                </div>
                <div style={{ border:`1px solid ${ACCENT}`, borderRadius:9, marginBottom:8, overflow:"hidden" }}>
                  <div style={{ display:"flex", alignItems:"center", height:52 }}>
                    <button style={{ width:44, height:44, display:"flex", alignItems:"center", justifyContent:"center", background:"none", border:"none" }}><KanbanSquare size={20} color={ACCENT} strokeWidth={1.5}/></button>
                    <span style={{ flex:1, fontSize:10, fontWeight:700, letterSpacing:".08em", textTransform:"uppercase", color:"#111" }}>Projects</span>
                    <button style={{ width:44, height:44, display:"flex", alignItems:"center", justifyContent:"center", background:"none", border:"none" }}><List size={20} color="#888" strokeWidth={1.5}/></button>
                    <button style={{ width:44, height:44, display:"flex", alignItems:"center", justifyContent:"center", background:"none", border:"none" }}><PanelTopClose size={20} color="#888" strokeWidth={1.5}/></button>
                  </div>
                  <div style={{ borderTop:`1px solid ${ACCENT}` }}>
                    {["Coffee Shop App","Portfolio Site","Design System"].map((t,i)=>(
                      <div key={i} style={{ display:"flex", alignItems:"center", height:46, borderBottom:`1px solid ${ACCENT}20` }}>
                        <button style={{ width:44, height:44, display:"flex", alignItems:"center", justifyContent:"center", background:"none", border:"none" }}><KanbanSquare size={18} color={ACCENT} strokeWidth={1.5}/></button>
                        <span style={{ flex:1, fontSize:12, fontWeight:500, color:"#111" }}>{t}</span>
                        <button style={{ width:44, height:44, display:"flex", alignItems:"center", justifyContent:"center", background:"none", border:"none" }}><List size={18} color="#888" strokeWidth={1.5}/></button>
                        <button style={{ width:44, height:44, display:"flex", alignItems:"center", justifyContent:"center", background:"none", border:"none" }}><PanelTopOpen size={18} color="#888" strokeWidth={1.5}/></button>
                      </div>
                    ))}
                    <div style={{ padding:"8px 14px" }}><span style={{ fontSize:10, color:"#888" }}>+ Add</span></div>
                  </div>
                </div>
                <div style={{ display:"flex", alignItems:"center", height:52, border:`1px solid ${ACCENT}`, borderRadius:9 }}>
                  <button style={{ width:44, height:44, display:"flex", alignItems:"center", justifyContent:"center", background:"none", border:"none" }}><KanbanSquare size={20} color={ACCENT} strokeWidth={1.5}/></button>
                  <span style={{ flex:1, fontSize:10, fontWeight:700, letterSpacing:".08em", textTransform:"uppercase", color:"#111" }}>Goals</span>
                  <button style={{ width:44, height:44, display:"flex", alignItems:"center", justifyContent:"center", background:"none", border:"none" }}><List size={20} color="#888" strokeWidth={1.5}/></button>
                  <button style={{ width:44, height:44, display:"flex", alignItems:"center", justifyContent:"center", background:"none", border:"none" }}><PanelTopOpen size={20} color="#888" strokeWidth={1.5}/></button>
                </div>
              </div>              <div style={{ height:68, borderTop:"1px solid #ebebea", display:"flex", alignItems:"center", padding:"0 12px", flexShrink:0 }}>
                <div style={{ display:"flex", flexDirection:"column", alignItems:"center", gap:2, minWidth:44 }}><KanbanSquare size={20} color={ACCENT} strokeWidth={1.5}/><span style={{ fontSize:8, letterSpacing:".08em", textTransform:"uppercase", color:ACCENT, fontWeight:600 }}>Home</span></div>
                <div style={{ flex:1, display:"flex", justifyContent:"center", gap:20 }}>
                  <div style={{ display:"flex", flexDirection:"column", alignItems:"center", gap:2 }}><Calendar size={20} color={"#aaa"} strokeWidth={1.5}/><span style={{ fontSize:8, color:"#aaa", fontWeight:400 }}>Monday</span></div>
                  <div style={{ display:"flex", flexDirection:"column", alignItems:"center", gap:2 }}><GanttChart size={20} color={"#aaa"} strokeWidth={1.5}/><span style={{ fontSize:8, color:"#aaa", fontWeight:400 }}>Sprint</span></div>
                </div>
                <div style={{ display:"flex", alignItems:"center" }}><div style={{ width:1, height:20, background:"#e0e0e0", marginRight:10 }}/><PanelTopOpen size={22} color={ACCENT} strokeWidth={1.5}/></div>
              </div>
              <div style={{ height:20, display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0 }}><div style={{ width:100, height:4, background:"#111", borderRadius:2, opacity:.2 }}/></div>
            </div>
          </div>
        </div>

        <div style={{ flexShrink:0 }}>
          <div style={{ fontSize:9, letterSpacing:".14em", textTransform:"uppercase", color:"#bbb", textAlign:"center", marginBottom:8, fontFamily:"Helvetica Neue, Arial, sans-serif" }}>3 — Full Screen</div>
                  <div style={{ width:290, background:"#1a1a1a", borderRadius:48, padding:"12px 6px", boxShadow:"0 28px 64px rgba(0,0,0,.4), inset 0 0 0 2px #3a3a3a", position:"relative" }}>
            <div style={{ position:"absolute", left:-3, top:80, width:3, height:28, background:"#2a2a2a", borderRadius:"2px 0 0 2px" }}/>
            <div style={{ position:"absolute", left:-3, top:116, width:3, height:44, background:"#2a2a2a", borderRadius:"2px 0 0 2px" }}/>
            <div style={{ position:"absolute", right:-3, top:120, width:3, height:60, background:"#2a2a2a", borderRadius:"0 2px 2px 0" }}/>
            <div style={{ width:80, height:24, background:"#1a1a1a", borderRadius:12, margin:"0 auto 6px" }}/>
            <div style={{ background:"#fff", borderRadius:36, overflow:"hidden", height:580, display:"flex", flexDirection:"column" }}>
              <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", padding:"10px 20px 0", height:36, flexShrink:0 }}>
                <span style={{ fontSize:12, fontWeight:700, color:"#111" }}>9:41</span>
                <div style={{ width:14, height:7, border:"1.5px solid #111", borderRadius:2, position:"relative" }}><div style={{ position:"absolute", left:1, top:1, bottom:1, width:"70%", background:"#111", borderRadius:1 }}/></div>
              </div>              <div style={{ display:"flex", alignItems:"flex-start", justifyContent:"space-between", padding:"12px 4px 10px 12px", flexShrink:0 }}>
                <div style={{ fontSize:30, fontWeight:800, color:ACCENT, letterSpacing:"-0.03em", lineHeight:1 }}>Plan.</div>
                <div style={{ display:"flex" }}>
                  <button style={{ width:44, height:44, display:"flex", alignItems:"center", justifyContent:"center", background:"none", border:"none" }}><List size={20} color="#bbb" strokeWidth={1.5}/></button>
                  <button style={{ width:44, height:44, display:"flex", alignItems:"center", justifyContent:"center", background:"none", border:"none" }}><PanelRightClose size={20} color={ACCENT} strokeWidth={1.5}/></button>
                </div>
              </div>
              <div style={{ height:1.5, background:ACCENT, flexShrink:0 }}/>              <div style={{ display:"flex", alignItems:"center", height:50, padding:"0 4px", borderBottom:"`1px solid ${ACCENT}`", flexShrink:0 }}>
                <button style={{ width:44, height:44, display:"flex", alignItems:"center", justifyContent:"center", background:"none", border:"none" }}><ChevronRight size={20} color="#aaa" strokeWidth={1.5} style={{ transform:"rotate(180deg)" }}/></button>
                <button style={{ width:44, height:44, display:"flex", alignItems:"center", justifyContent:"center", background:"none", border:"none" }}><KanbanSquare size={20} color={ACCENT} strokeWidth={1.5}/></button>
                <span style={{ flex:1, fontSize:13, fontWeight:700, color:"#111" }}>Projects</span>
                <button style={{ width:44, height:44, display:"flex", alignItems:"center", justifyContent:"center", background:"none", border:"none" }}><List size={20} color="#888" strokeWidth={1.5}/></button>
              </div>              <div style={{ flex:1, padding:"12px 8px 0", overflow:"hidden" }}>
                {["Coffee Shop App","Portfolio Site","Design System","Mobile App"].map((t,i)=>(
                  <div key={i} style={{ display:"flex", alignItems:"center", height:52, border:`1px solid ${ACCENT}`, borderRadius:9, marginBottom:8 }}>
                    <button style={{ width:44, height:44, display:"flex", alignItems:"center", justifyContent:"center", background:"none", border:"none" }}><KanbanSquare size={20} color={ACCENT} strokeWidth={1.5}/></button>
                    <span style={{ flex:1, fontSize:10, fontWeight:700, letterSpacing:".08em", textTransform:"uppercase", color:"#111" }}>{t}</span>
                    <button style={{ width:44, height:44, display:"flex", alignItems:"center", justifyContent:"center", background:"none", border:"none" }}><List size={20} color="#888" strokeWidth={1.5}/></button>
                    <button style={{ width:44, height:44, display:"flex", alignItems:"center", justifyContent:"center", background:"none", border:"none" }}><PanelTopOpen size={20} color="#888" strokeWidth={1.5}/></button>
                  </div>
                ))}
                <div style={{ border:`1.5px dashed ${ACCENT}`, borderRadius:9, padding:"12px", display:"flex", alignItems:"center", justifyContent:"center", opacity:.5 }}>
                  <span style={{ fontSize:10, letterSpacing:".12em", textTransform:"uppercase", fontWeight:600, color:ACCENT }}>+ Add</span>
                </div>
              </div>              <div style={{ height:68, borderTop:"1px solid #ebebea", display:"flex", alignItems:"center", padding:"0 12px", flexShrink:0 }}>
                <div style={{ display:"flex", flexDirection:"column", alignItems:"center", gap:2, minWidth:44 }}><KanbanSquare size={20} color={ACCENT} strokeWidth={1.5}/><span style={{ fontSize:8, letterSpacing:".08em", textTransform:"uppercase", color:ACCENT, fontWeight:600 }}>Home</span></div>
                <div style={{ flex:1, display:"flex", justifyContent:"center", gap:20 }}>
                  <div style={{ display:"flex", flexDirection:"column", alignItems:"center", gap:2 }}><Calendar size={20} color={"#aaa"} strokeWidth={1.5}/><span style={{ fontSize:8, color:"#aaa", fontWeight:400 }}>Monday</span></div>
                  <div style={{ display:"flex", flexDirection:"column", alignItems:"center", gap:2 }}><GanttChart size={20} color={"#aaa"} strokeWidth={1.5}/><span style={{ fontSize:8, color:"#aaa", fontWeight:400 }}>Sprint</span></div>
                </div>
                <div style={{ display:"flex", alignItems:"center" }}><div style={{ width:1, height:20, background:"#e0e0e0", marginRight:10 }}/><PanelTopOpen size={22} color={ACCENT} strokeWidth={1.5}/></div>
              </div>
              <div style={{ height:20, display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0 }}><div style={{ width:100, height:4, background:"#111", borderRadius:2, opacity:.2 }}/></div>
            </div>
          </div>
        </div>
      </div>
      <div style={{ fontSize:10, letterSpacing:".2em", textTransform:"uppercase", color:"#999", fontFamily:"Helvetica Neue, Arial, sans-serif", marginBottom:16, marginTop:32, fontWeight:700, borderBottom:"1px solid #e0e0e0", paddingBottom:8 }}>CALENDAR</div>
      <div style={{ display:"flex", gap:24, overflowX:"auto", paddingBottom:16, alignItems:"flex-start" }}>

        <div style={{ flexShrink:0 }}>
          <div style={{ fontSize:9, letterSpacing:".14em", textTransform:"uppercase", color:"#bbb", textAlign:"center", marginBottom:8, fontFamily:"Helvetica Neue, Arial, sans-serif" }}>1 — All Blocks</div>
                  <div style={{ width:290, background:"#1a1a1a", borderRadius:48, padding:"12px 6px", boxShadow:"0 28px 64px rgba(0,0,0,.4), inset 0 0 0 2px #3a3a3a", position:"relative" }}>
            <div style={{ position:"absolute", left:-3, top:80, width:3, height:28, background:"#2a2a2a", borderRadius:"2px 0 0 2px" }}/>
            <div style={{ position:"absolute", left:-3, top:116, width:3, height:44, background:"#2a2a2a", borderRadius:"2px 0 0 2px" }}/>
            <div style={{ position:"absolute", right:-3, top:120, width:3, height:60, background:"#2a2a2a", borderRadius:"0 2px 2px 0" }}/>
            <div style={{ width:80, height:24, background:"#1a1a1a", borderRadius:12, margin:"0 auto 6px" }}/>
            <div style={{ background:"#fff", borderRadius:36, overflow:"hidden", height:580, display:"flex", flexDirection:"column" }}>
              <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", padding:"10px 20px 0", height:36, flexShrink:0 }}>
                <span style={{ fontSize:12, fontWeight:700, color:"#111" }}>9:41</span>
                <div style={{ width:14, height:7, border:"1.5px solid #111", borderRadius:2, position:"relative" }}><div style={{ position:"absolute", left:1, top:1, bottom:1, width:"70%", background:"#111", borderRadius:1 }}/></div>
              </div>              <div style={{ display:"flex", alignItems:"flex-start", justifyContent:"space-between", padding:"12px 4px 10px 12px", flexShrink:0 }}>
                <div style={{ fontSize:30, fontWeight:800, color:ACCENT, letterSpacing:"-0.03em", lineHeight:1 }}>Plan.</div>
                <div style={{ display:"flex" }}>
                  <button style={{ width:44, height:44, display:"flex", alignItems:"center", justifyContent:"center", background:"none", border:"none" }}><List size={20} color="#bbb" strokeWidth={1.5}/></button>
                  <button style={{ width:44, height:44, display:"flex", alignItems:"center", justifyContent:"center", background:"none", border:"none" }}><PanelRightOpen size={20} color="#bbb" strokeWidth={1.5}/></button>
                </div>
              </div>
              <div style={{ height:1.5, background:ACCENT, flexShrink:0 }}/>              <div style={{ display:"flex", alignItems:"center", height:50, padding:"0 4px", borderBottom:"`1px solid ${ACCENT}`", flexShrink:0 }}>
                <button style={{ width:44, height:44, display:"flex", alignItems:"center", justifyContent:"center", background:"none", border:"none" }}><ChevronRight size={20} color="#aaa" strokeWidth={1.5} style={{ transform:"rotate(180deg)" }}/></button>
                <button style={{ width:44, height:44, display:"flex", alignItems:"center", justifyContent:"center", background:"none", border:"none" }}><Calendar size={20} color={ACCENT} strokeWidth={1.5}/></button>
                <span style={{ flex:1, fontSize:13, fontWeight:700, color:"#111" }}>Monday</span>
                <button style={{ width:44, height:44, display:"flex", alignItems:"center", justifyContent:"center", background:"none", border:"none" }}><List size={20} color="#888" strokeWidth={1.5}/></button>
              </div>              <div style={{ flex:1, overflow:"hidden", display:"flex" }}>
                <div style={{ width:38, flexShrink:0 }}>
                  {[8,9,10,11,12,13].map(h=>(
                    <div key={h} style={{ height:56, display:"flex", alignItems:"flex-start", justifyContent:"flex-end", paddingRight:5, paddingTop:3 }}>
                      <span style={{ fontSize:8, fontWeight:600, color:"${ACCENT}90" }}>{h<12?`${h}AM`:h===12?"12PM":`${h-12}PM`}</span>
                    </div>
                  ))}
                </div>
                <div style={{ flex:1, position:"relative", borderLeft:"1.5px solid ${ACCENT}70" }}>
                  <svg style={{ position:"absolute", inset:0, width:"100%", height:336, pointerEvents:"none" }}>
                    <defs>
                      <pattern id="chA" width="100%" height="56" patternUnits="userSpaceOnUse">
                        <line x1="0" y1="14" x2="100%" y2="14" stroke="${ACCENT}35" strokeWidth="0.75"/>
                        <line x1="0" y1="28" x2="100%" y2="28" stroke="${ACCENT}35" strokeWidth="0.75"/>
                        <line x1="0" y1="42" x2="100%" y2="42" stroke="${ACCENT}35" strokeWidth="0.75"/>
                        <line x1="0" y1="56" x2="100%" y2="56" stroke="${ACCENT}70" strokeWidth="1"/>
                      </pattern>
                      <pattern id="cvA" width="14" height="100%" patternUnits="userSpaceOnUse">
                        <line x1="14" y1="0" x2="14" y2="100%" stroke="${ACCENT}20" strokeWidth="0.75"/>
                      </pattern>
                    </defs>
                    <rect width="100%" height="336" fill="url(#cvA)"/>
                    <rect width="100%" height="336" fill="url(#chA)"/>
                  </svg>
                  <div style={{ position:"relative", height:336 }}>
                    {[{t:"Check Email",top:56,h:56},{t:"Deep Work",top:112,h:112},{t:"Lunch",top:224,h:56}].map((b,i)=>(
                      <div key={i} style={{ position:"absolute", top:b.top, left:2, right:2, height:b.h, background:"#fff", border:"1px solid ${ACCENT}", borderRadius:7, overflow:"hidden", zIndex:2 }}>
                        <div style={{ display:"flex", alignItems:"center", height:Math.min(b.h,50) }}>
                          <button style={{ width:40, height:40, display:"flex", alignItems:"center", justifyContent:"center", background:"none", border:"none" }}><KanbanSquare size={18} color={ACCENT} strokeWidth={1.5}/></button>
                          <span style={{ flex:1, fontSize:10, fontWeight:600, color:"#111" }}>{b.t}</span>
                          <button style={{ width:40, height:40, display:"flex", alignItems:"center", justifyContent:"center", background:"none", border:"none" }}><List size={18} color="#888" strokeWidth={1.5}/></button>
                          <button style={{ width:40, height:40, display:"flex", alignItems:"center", justifyContent:"center", background:"none", border:"none" }}><PanelTopOpen size={18} color="#888" strokeWidth={1.5}/></button>
                        </div>
                        {b.h > 56 && <><div style={{ height:1.5, background:"${ACCENT}40" }}/><div style={{ padding:"3px 8px" }}><span style={{ fontSize:8, letterSpacing:".1em", textTransform:"uppercase", color:"ACCENT", fontWeight:600 }}>2 blocks</span></div></>}
                        <div style={{ position:"absolute", bottom:0, left:"50%", transform:"translateX(-50%)", width:24, height:10, display:"flex", alignItems:"center", justifyContent:"center" }}><div style={{ width:18, height:2, background:"${ACCENT}50", borderRadius:1 }}/></div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>              <div style={{ height:68, borderTop:"1px solid #ebebea", display:"flex", alignItems:"center", padding:"0 12px", flexShrink:0 }}>
                <div style={{ display:"flex", flexDirection:"column", alignItems:"center", gap:2, minWidth:44 }}><KanbanSquare size={20} color={ACCENT} strokeWidth={1.5}/><span style={{ fontSize:8, letterSpacing:".08em", textTransform:"uppercase", color:ACCENT, fontWeight:600 }}>Home</span></div>
                <div style={{ flex:1, display:"flex", justifyContent:"center", gap:20 }}>
                  <div style={{ display:"flex", flexDirection:"column", alignItems:"center", gap:2 }}><Calendar size={20} color={ACCENT} strokeWidth={1.5}/><span style={{ fontSize:8, color:ACCENT, fontWeight:600 }}>Monday</span></div>
                  <div style={{ display:"flex", flexDirection:"column", alignItems:"center", gap:2 }}><GanttChart size={20} color={"#aaa"} strokeWidth={1.5}/><span style={{ fontSize:8, color:"#aaa", fontWeight:400 }}>Sprint</span></div>
                </div>
                <div style={{ display:"flex", alignItems:"center" }}><div style={{ width:1, height:20, background:"#e0e0e0", marginRight:10 }}/><PanelTopOpen size={22} color={ACCENT} strokeWidth={1.5}/></div>
              </div>
              <div style={{ height:20, display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0 }}><div style={{ width:100, height:4, background:"#111", borderRadius:2, opacity:.2 }}/></div>
            </div>
          </div>
        </div>

        <div style={{ flexShrink:0 }}>
          <div style={{ fontSize:9, letterSpacing:".14em", textTransform:"uppercase", color:"#bbb", textAlign:"center", marginBottom:8, fontFamily:"Helvetica Neue, Arial, sans-serif" }}>2 — Expanded + Count</div>
                  <div style={{ width:290, background:"#1a1a1a", borderRadius:48, padding:"12px 6px", boxShadow:"0 28px 64px rgba(0,0,0,.4), inset 0 0 0 2px #3a3a3a", position:"relative" }}>
            <div style={{ position:"absolute", left:-3, top:80, width:3, height:28, background:"#2a2a2a", borderRadius:"2px 0 0 2px" }}/>
            <div style={{ position:"absolute", left:-3, top:116, width:3, height:44, background:"#2a2a2a", borderRadius:"2px 0 0 2px" }}/>
            <div style={{ position:"absolute", right:-3, top:120, width:3, height:60, background:"#2a2a2a", borderRadius:"0 2px 2px 0" }}/>
            <div style={{ width:80, height:24, background:"#1a1a1a", borderRadius:12, margin:"0 auto 6px" }}/>
            <div style={{ background:"#fff", borderRadius:36, overflow:"hidden", height:580, display:"flex", flexDirection:"column" }}>
              <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", padding:"10px 20px 0", height:36, flexShrink:0 }}>
                <span style={{ fontSize:12, fontWeight:700, color:"#111" }}>9:41</span>
                <div style={{ width:14, height:7, border:"1.5px solid #111", borderRadius:2, position:"relative" }}><div style={{ position:"absolute", left:1, top:1, bottom:1, width:"70%", background:"#111", borderRadius:1 }}/></div>
              </div>              <div style={{ display:"flex", alignItems:"flex-start", justifyContent:"space-between", padding:"12px 4px 10px 12px", flexShrink:0 }}>
                <div style={{ fontSize:30, fontWeight:800, color:ACCENT, letterSpacing:"-0.03em", lineHeight:1 }}>Plan.</div>
                <div style={{ display:"flex" }}>
                  <button style={{ width:44, height:44, display:"flex", alignItems:"center", justifyContent:"center", background:"none", border:"none" }}><List size={20} color="#bbb" strokeWidth={1.5}/></button>
                  <button style={{ width:44, height:44, display:"flex", alignItems:"center", justifyContent:"center", background:"none", border:"none" }}><PanelRightOpen size={20} color="#bbb" strokeWidth={1.5}/></button>
                </div>
              </div>
              <div style={{ height:1.5, background:ACCENT, flexShrink:0 }}/>              <div style={{ display:"flex", alignItems:"center", height:50, padding:"0 4px", borderBottom:"`1px solid ${ACCENT}`", flexShrink:0 }}>
                <button style={{ width:44, height:44, display:"flex", alignItems:"center", justifyContent:"center", background:"none", border:"none" }}><ChevronRight size={20} color="#aaa" strokeWidth={1.5} style={{ transform:"rotate(180deg)" }}/></button>
                <button style={{ width:44, height:44, display:"flex", alignItems:"center", justifyContent:"center", background:"none", border:"none" }}><Calendar size={20} color={ACCENT} strokeWidth={1.5}/></button>
                <span style={{ flex:1, fontSize:13, fontWeight:700, color:"#111" }}>Monday</span>
                <button style={{ width:44, height:44, display:"flex", alignItems:"center", justifyContent:"center", background:"none", border:"none" }}><List size={20} color="#888" strokeWidth={1.5}/></button>
              </div>              <div style={{ flex:1, overflow:"hidden", display:"flex" }}>
                <div style={{ width:38, flexShrink:0 }}>
                  {[9,10,11,12].map(h=>(
                    <div key={h} style={{ height:72, display:"flex", alignItems:"flex-start", justifyContent:"flex-end", paddingRight:5, paddingTop:3 }}>
                      <span style={{ fontSize:8, fontWeight:600, color:`${ACCENT}90` }}>{h<12?`${h}AM`:"12PM"}</span>
                    </div>
                  ))}
                </div>
                <div style={{ flex:1, position:"relative", borderLeft:`1.5px solid ${ACCENT}70` }}>
                  <svg style={{ position:"absolute", inset:0, width:"100%", height:288, pointerEvents:"none" }}>
                    <defs>
                      <pattern id="chB" width="100%" height="72" patternUnits="userSpaceOnUse">
                        <line x1="0" y1="18" x2="100%" y2="18" stroke={`${ACCENT}35`} strokeWidth="0.75"/>
                        <line x1="0" y1="36" x2="100%" y2="36" stroke={`${ACCENT}35`} strokeWidth="0.75"/>
                        <line x1="0" y1="54" x2="100%" y2="54" stroke={`${ACCENT}35`} strokeWidth="0.75"/>
                        <line x1="0" y1="72" x2="100%" y2="72" stroke={`${ACCENT}70`} strokeWidth="1"/>
                      </pattern>
                      <pattern id="cvB" width="18" height="100%" patternUnits="userSpaceOnUse">
                        <line x1="18" y1="0" x2="18" y2="100%" stroke={`${ACCENT}20`} strokeWidth="0.75"/>
                      </pattern>
                    </defs>
                    <rect width="100%" height="288" fill="url(#cvB)"/>
                    <rect width="100%" height="288" fill="url(#chB)"/>
                  </svg>
                  <div style={{ position:"relative", height:288 }}>
                    <div style={{ position:"absolute", top:0, left:2, right:2, height:72, background:"#fff", border:`1px solid ${ACCENT}`, borderRadius:7, overflow:"hidden", zIndex:2 }}>
                      <div style={{ display:"flex", alignItems:"center", height:52 }}>
                        <button style={{ width:40, height:40, display:"flex", alignItems:"center", justifyContent:"center", background:"none", border:"none" }}><KanbanSquare size={18} color={ACCENT} strokeWidth={1.5}/></button>
                        <span style={{ flex:1, fontSize:10, fontWeight:600, color:"#111" }}>Morning Standup</span>
                        <button style={{ width:40, height:40, display:"flex", alignItems:"center", justifyContent:"center", background:"none", border:"none" }}><List size={18} color="#888" strokeWidth={1.5}/></button>
                        <button style={{ width:40, height:40, display:"flex", alignItems:"center", justifyContent:"center", background:"none", border:"none" }}><PanelTopOpen size={18} color="#888" strokeWidth={1.5}/></button>
                      </div>
                    </div>
                    <div style={{ position:"absolute", top:72, left:2, right:2, height:180, background:"#fff", border:`1px solid ${ACCENT}`, borderRadius:7, overflow:"hidden", zIndex:2 }}>
                      <div style={{ display:"flex", alignItems:"center", height:50 }}>
                        <button style={{ width:40, height:40, display:"flex", alignItems:"center", justifyContent:"center", background:"none", border:"none" }}><KanbanSquare size={18} color={ACCENT} strokeWidth={1.5}/></button>
                        <span style={{ flex:1, fontSize:10, fontWeight:600, color:"#111" }}>Deep Work</span>
                        <button style={{ width:40, height:40, display:"flex", alignItems:"center", justifyContent:"center", background:"none", border:"none" }}><List size={18} color="#888" strokeWidth={1.5}/></button>
                        <button style={{ width:40, height:40, display:"flex", alignItems:"center", justifyContent:"center", background:"none", border:"none" }}><PanelTopClose size={18} color="#888" strokeWidth={1.5}/></button>
                      </div>
                      <div style={{ borderTop:`1px solid ${ACCENT}` }}>
                        {["Write spec","Code review"].map((t,i)=>(
                          <div key={i} style={{ display:"flex", alignItems:"center", height:40, borderBottom:`1px solid ${ACCENT}15` }}>
                            <button style={{ width:38, height:38, display:"flex", alignItems:"center", justifyContent:"center", background:"none", border:"none" }}><KanbanSquare size={16} color={ACCENT} strokeWidth={1.5}/></button>
                            <span style={{ flex:1, fontSize:10, color:"#111" }}>{t}</span>
                            <button style={{ width:38, height:38, display:"flex", alignItems:"center", justifyContent:"center", background:"none", border:"none" }}><List size={16} color="#888" strokeWidth={1.5}/></button>
                            <button style={{ width:38, height:38, display:"flex", alignItems:"center", justifyContent:"center", background:"none", border:"none" }}><PanelTopOpen size={16} color="#888" strokeWidth={1.5}/></button>
                          </div>
                        ))}
                        <div style={{ padding:"5px 8px" }}><span style={{ fontSize:9, color:"#888" }}>+ Add</span></div>
                      </div>
                      <div style={{ position:"absolute", bottom:0, left:"50%", transform:"translateX(-50%)", width:24, height:10, display:"flex", alignItems:"center", justifyContent:"center" }}><div style={{ width:18, height:2, background:`${ACCENT}50`, borderRadius:1 }}/></div>
                    </div>
                  </div>
                </div>
              </div>              <div style={{ height:68, borderTop:"1px solid #ebebea", display:"flex", alignItems:"center", padding:"0 12px", flexShrink:0 }}>
                <div style={{ display:"flex", flexDirection:"column", alignItems:"center", gap:2, minWidth:44 }}><KanbanSquare size={20} color={ACCENT} strokeWidth={1.5}/><span style={{ fontSize:8, letterSpacing:".08em", textTransform:"uppercase", color:ACCENT, fontWeight:600 }}>Home</span></div>
                <div style={{ flex:1, display:"flex", justifyContent:"center", gap:20 }}>
                  <div style={{ display:"flex", flexDirection:"column", alignItems:"center", gap:2 }}><Calendar size={20} color={ACCENT} strokeWidth={1.5}/><span style={{ fontSize:8, color:ACCENT, fontWeight:600 }}>Monday</span></div>
                  <div style={{ display:"flex", flexDirection:"column", alignItems:"center", gap:2 }}><GanttChart size={20} color={"#aaa"} strokeWidth={1.5}/><span style={{ fontSize:8, color:"#aaa", fontWeight:400 }}>Sprint</span></div>
                </div>
                <div style={{ display:"flex", alignItems:"center" }}><div style={{ width:1, height:20, background:"#e0e0e0", marginRight:10 }}/><PanelTopOpen size={22} color={ACCENT} strokeWidth={1.5}/></div>
              </div>
              <div style={{ height:20, display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0 }}><div style={{ width:100, height:4, background:"#111", borderRadius:2, opacity:.2 }}/></div>
            </div>
          </div>
        </div>

        <div style={{ flexShrink:0 }}>
          <div style={{ fontSize:9, letterSpacing:".14em", textTransform:"uppercase", color:"#bbb", textAlign:"center", marginBottom:8, fontFamily:"Helvetica Neue, Arial, sans-serif" }}>3 — Full Screen</div>
                  <div style={{ width:290, background:"#1a1a1a", borderRadius:48, padding:"12px 6px", boxShadow:"0 28px 64px rgba(0,0,0,.4), inset 0 0 0 2px #3a3a3a", position:"relative" }}>
            <div style={{ position:"absolute", left:-3, top:80, width:3, height:28, background:"#2a2a2a", borderRadius:"2px 0 0 2px" }}/>
            <div style={{ position:"absolute", left:-3, top:116, width:3, height:44, background:"#2a2a2a", borderRadius:"2px 0 0 2px" }}/>
            <div style={{ position:"absolute", right:-3, top:120, width:3, height:60, background:"#2a2a2a", borderRadius:"0 2px 2px 0" }}/>
            <div style={{ width:80, height:24, background:"#1a1a1a", borderRadius:12, margin:"0 auto 6px" }}/>
            <div style={{ background:"#fff", borderRadius:36, overflow:"hidden", height:580, display:"flex", flexDirection:"column" }}>
              <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", padding:"10px 20px 0", height:36, flexShrink:0 }}>
                <span style={{ fontSize:12, fontWeight:700, color:"#111" }}>9:41</span>
                <div style={{ width:14, height:7, border:"1.5px solid #111", borderRadius:2, position:"relative" }}><div style={{ position:"absolute", left:1, top:1, bottom:1, width:"70%", background:"#111", borderRadius:1 }}/></div>
              </div>              <div style={{ display:"flex", alignItems:"flex-start", justifyContent:"space-between", padding:"12px 4px 10px 12px", flexShrink:0 }}>
                <div style={{ fontSize:30, fontWeight:800, color:ACCENT, letterSpacing:"-0.03em", lineHeight:1 }}>Plan.</div>
                <div style={{ display:"flex" }}>
                  <button style={{ width:44, height:44, display:"flex", alignItems:"center", justifyContent:"center", background:"none", border:"none" }}><List size={20} color="#bbb" strokeWidth={1.5}/></button>
                  <button style={{ width:44, height:44, display:"flex", alignItems:"center", justifyContent:"center", background:"none", border:"none" }}><PanelRightClose size={20} color={ACCENT} strokeWidth={1.5}/></button>
                </div>
              </div>
              <div style={{ height:1.5, background:ACCENT, flexShrink:0 }}/>              <div style={{ display:"flex", alignItems:"center", height:50, padding:"0 4px", borderBottom:"`1px solid ${ACCENT}`", flexShrink:0 }}>
                <button style={{ width:44, height:44, display:"flex", alignItems:"center", justifyContent:"center", background:"none", border:"none" }}><ChevronRight size={20} color="#aaa" strokeWidth={1.5} style={{ transform:"rotate(180deg)" }}/></button>
                <button style={{ width:44, height:44, display:"flex", alignItems:"center", justifyContent:"center", background:"none", border:"none" }}><Calendar size={20} color={ACCENT} strokeWidth={1.5}/></button>
                <span style={{ flex:1, fontSize:13, fontWeight:700, color:"#111" }}>Monday</span>
                <button style={{ width:44, height:44, display:"flex", alignItems:"center", justifyContent:"center", background:"none", border:"none" }}><List size={20} color="#888" strokeWidth={1.5}/></button>
              </div>              <div style={{ flex:1, overflow:"hidden", display:"flex" }}>
                <div style={{ width:38, flexShrink:0 }}>
                  {[8,9,10,11,12,13].map(h=>(
                    <div key={h} style={{ height:56, display:"flex", alignItems:"flex-start", justifyContent:"flex-end", paddingRight:5, paddingTop:3 }}>
                      <span style={{ fontSize:8, fontWeight:600, color:"${ACCENT}90" }}>{h<12?`${h}AM`:h===12?"12PM":`${h-12}PM`}</span>
                    </div>
                  ))}
                </div>
                <div style={{ flex:1, position:"relative", borderLeft:"1.5px solid ${ACCENT}70" }}>
                  <svg style={{ position:"absolute", inset:0, width:"100%", height:336, pointerEvents:"none" }}>
                    <defs>
                      <pattern id="chC" width="100%" height="56" patternUnits="userSpaceOnUse">
                        <line x1="0" y1="14" x2="100%" y2="14" stroke="${ACCENT}35" strokeWidth="0.75"/>
                        <line x1="0" y1="28" x2="100%" y2="28" stroke="${ACCENT}35" strokeWidth="0.75"/>
                        <line x1="0" y1="42" x2="100%" y2="42" stroke="${ACCENT}35" strokeWidth="0.75"/>
                        <line x1="0" y1="56" x2="100%" y2="56" stroke="${ACCENT}70" strokeWidth="1"/>
                      </pattern>
                      <pattern id="cvC" width="14" height="100%" patternUnits="userSpaceOnUse">
                        <line x1="14" y1="0" x2="14" y2="100%" stroke="${ACCENT}20" strokeWidth="0.75"/>
                      </pattern>
                    </defs>
                    <rect width="100%" height="336" fill="url(#cvC)"/>
                    <rect width="100%" height="336" fill="url(#chC)"/>
                  </svg>
                  <div style={{ position:"relative", height:336 }}>
                    {[{t:"Check Email",top:56,h:56},{t:"Deep Work",top:112,h:112},{t:"Lunch",top:224,h:56}].map((b,i)=>(
                      <div key={i} style={{ position:"absolute", top:b.top, left:2, right:2, height:b.h, background:"#fff", border:"1px solid ${ACCENT}", borderRadius:7, overflow:"hidden", zIndex:2 }}>
                        <div style={{ display:"flex", alignItems:"center", height:Math.min(b.h,50) }}>
                          <button style={{ width:40, height:40, display:"flex", alignItems:"center", justifyContent:"center", background:"none", border:"none" }}><KanbanSquare size={18} color={ACCENT} strokeWidth={1.5}/></button>
                          <span style={{ flex:1, fontSize:10, fontWeight:600, color:"#111" }}>{b.t}</span>
                          <button style={{ width:40, height:40, display:"flex", alignItems:"center", justifyContent:"center", background:"none", border:"none" }}><List size={18} color="#888" strokeWidth={1.5}/></button>
                          <button style={{ width:40, height:40, display:"flex", alignItems:"center", justifyContent:"center", background:"none", border:"none" }}><PanelTopOpen size={18} color="#888" strokeWidth={1.5}/></button>
                        </div>
                        {b.h > 56 && <><div style={{ height:1.5, background:"${ACCENT}40" }}/><div style={{ padding:"3px 8px" }}><span style={{ fontSize:8, letterSpacing:".1em", textTransform:"uppercase", color:"ACCENT", fontWeight:600 }}>2 blocks</span></div></>}
                        <div style={{ position:"absolute", bottom:0, left:"50%", transform:"translateX(-50%)", width:24, height:10, display:"flex", alignItems:"center", justifyContent:"center" }}><div style={{ width:18, height:2, background:"${ACCENT}50", borderRadius:1 }}/></div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>              <div style={{ height:68, borderTop:"1px solid #ebebea", display:"flex", alignItems:"center", padding:"0 12px", flexShrink:0 }}>
                <div style={{ display:"flex", flexDirection:"column", alignItems:"center", gap:2, minWidth:44 }}><KanbanSquare size={20} color={ACCENT} strokeWidth={1.5}/><span style={{ fontSize:8, letterSpacing:".08em", textTransform:"uppercase", color:ACCENT, fontWeight:600 }}>Home</span></div>
                <div style={{ flex:1, display:"flex", justifyContent:"center", gap:20 }}>
                  <div style={{ display:"flex", flexDirection:"column", alignItems:"center", gap:2 }}><Calendar size={20} color={ACCENT} strokeWidth={1.5}/><span style={{ fontSize:8, color:ACCENT, fontWeight:600 }}>Monday</span></div>
                  <div style={{ display:"flex", flexDirection:"column", alignItems:"center", gap:2 }}><GanttChart size={20} color={"#aaa"} strokeWidth={1.5}/><span style={{ fontSize:8, color:"#aaa", fontWeight:400 }}>Sprint</span></div>
                </div>
                <div style={{ display:"flex", alignItems:"center" }}><div style={{ width:1, height:20, background:"#e0e0e0", marginRight:10 }}/><PanelTopOpen size={22} color={ACCENT} strokeWidth={1.5}/></div>
              </div>
              <div style={{ height:20, display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0 }}><div style={{ width:100, height:4, background:"#111", borderRadius:2, opacity:.2 }}/></div>
            </div>
          </div>
        </div>
      </div>
      <div style={{ fontSize:10, letterSpacing:".2em", textTransform:"uppercase", color:"#999", fontFamily:"Helvetica Neue, Arial, sans-serif", marginBottom:16, marginTop:32, fontWeight:700, borderBottom:"1px solid #e0e0e0", paddingBottom:8 }}>GANTT</div>
      <div style={{ display:"flex", gap:24, overflowX:"auto", paddingBottom:16, alignItems:"flex-start" }}>

        <div style={{ flexShrink:0 }}>
          <div style={{ fontSize:9, letterSpacing:".14em", textTransform:"uppercase", color:"#bbb", textAlign:"center", marginBottom:8, fontFamily:"Helvetica Neue, Arial, sans-serif" }}>1 — All Bars</div>
                  <div style={{ width:290, background:"#1a1a1a", borderRadius:48, padding:"12px 6px", boxShadow:"0 28px 64px rgba(0,0,0,.4), inset 0 0 0 2px #3a3a3a", position:"relative" }}>
            <div style={{ position:"absolute", left:-3, top:80, width:3, height:28, background:"#2a2a2a", borderRadius:"2px 0 0 2px" }}/>
            <div style={{ position:"absolute", left:-3, top:116, width:3, height:44, background:"#2a2a2a", borderRadius:"2px 0 0 2px" }}/>
            <div style={{ position:"absolute", right:-3, top:120, width:3, height:60, background:"#2a2a2a", borderRadius:"0 2px 2px 0" }}/>
            <div style={{ width:80, height:24, background:"#1a1a1a", borderRadius:12, margin:"0 auto 6px" }}/>
            <div style={{ background:"#fff", borderRadius:36, overflow:"hidden", height:580, display:"flex", flexDirection:"column" }}>
              <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", padding:"10px 20px 0", height:36, flexShrink:0 }}>
                <span style={{ fontSize:12, fontWeight:700, color:"#111" }}>9:41</span>
                <div style={{ width:14, height:7, border:"1.5px solid #111", borderRadius:2, position:"relative" }}><div style={{ position:"absolute", left:1, top:1, bottom:1, width:"70%", background:"#111", borderRadius:1 }}/></div>
              </div>              <div style={{ display:"flex", alignItems:"flex-start", justifyContent:"space-between", padding:"12px 4px 10px 12px", flexShrink:0 }}>
                <div style={{ fontSize:30, fontWeight:800, color:ACCENT, letterSpacing:"-0.03em", lineHeight:1 }}>Plan.</div>
                <div style={{ display:"flex" }}>
                  <button style={{ width:44, height:44, display:"flex", alignItems:"center", justifyContent:"center", background:"none", border:"none" }}><List size={20} color="#bbb" strokeWidth={1.5}/></button>
                  <button style={{ width:44, height:44, display:"flex", alignItems:"center", justifyContent:"center", background:"none", border:"none" }}><PanelRightOpen size={20} color="#bbb" strokeWidth={1.5}/></button>
                </div>
              </div>
              <div style={{ height:1.5, background:ACCENT, flexShrink:0 }}/>              <div style={{ display:"flex", alignItems:"center", height:50, padding:"0 4px", borderBottom:"`1px solid ${ACCENT}`", flexShrink:0 }}>
                <button style={{ width:44, height:44, display:"flex", alignItems:"center", justifyContent:"center", background:"none", border:"none" }}><ChevronRight size={20} color="#aaa" strokeWidth={1.5} style={{ transform:"rotate(180deg)" }}/></button>
                <button style={{ width:44, height:44, display:"flex", alignItems:"center", justifyContent:"center", background:"none", border:"none" }}><GanttChart size={20} color={ACCENT} strokeWidth={1.5}/></button>
                <span style={{ flex:1, fontSize:13, fontWeight:700, color:"#111" }}>Sprint 12</span>
                <button style={{ width:44, height:44, display:"flex", alignItems:"center", justifyContent:"center", background:"none", border:"none" }}><List size={20} color="#888" strokeWidth={1.5}/></button>
              </div>              <div style={{ flex:1, overflow:"hidden" }}>
                <div style={{ display:"flex", paddingLeft:68, borderBottom:"1px solid ${ACCENT}40" }}>
                  {"MTWTFSSMTW".split("").map((d,i)=>(
                    <div key={i} style={{ width:22, flexShrink:0, textAlign:"center", padding:"3px 0", fontSize:8, fontWeight:600, color:"${ACCENT}80" }}>{d}</div>
                  ))}
                </div>
                {[{t:"Coffee Shop",s:0,d:4},{t:"Portfolio",s:2,d:5},{t:"Design Sys",s:5,d:3},{t:"Mobile App",s:1,d:6},{t:"API Layer",s:4,d:4},{t:"Marketing",s:0,d:7}].map((b,i)=>(
                  <div key={i} style={{ display:"flex", alignItems:"center", height:44, borderBottom:"1px solid ${ACCENT}15" }}>
                    <div style={{ width:68, flexShrink:0, fontSize:9, fontWeight:500, color:"#111", paddingLeft:6, overflow:"hidden", textOverflow:"ellipsis", whiteSpace:"nowrap" }}>{b.t}</div>
                    <div style={{ display:"flex", position:"relative" }}>
                      {Array.from({length:10}).map((_,j)=>(<div key={j} style={{ width:22, height:36, borderRight:"1px solid ${ACCENT}15" }}/>))}
                      <div style={{ position:"absolute", top:6, left:b.s*22+2, width:b.d*22-4, height:24, background:ACCENT, borderRadius:4, display:"flex", alignItems:"center", paddingLeft:4 }}>
                        <span style={{ fontSize:8, color:"#fff", fontWeight:600, overflow:"hidden", whiteSpace:"nowrap" }}>{b.t}</span>
                      </div>
                    </div>
                  </div>
                ))}
                <div style={{ padding:"8px 12px" }}><span style={{ fontSize:10, letterSpacing:".1em", textTransform:"uppercase", fontWeight:600, color:"#888" }}>+ Add</span></div>
              </div>              <div style={{ height:68, borderTop:"1px solid #ebebea", display:"flex", alignItems:"center", padding:"0 12px", flexShrink:0 }}>
                <div style={{ display:"flex", flexDirection:"column", alignItems:"center", gap:2, minWidth:44 }}><KanbanSquare size={20} color={ACCENT} strokeWidth={1.5}/><span style={{ fontSize:8, letterSpacing:".08em", textTransform:"uppercase", color:ACCENT, fontWeight:600 }}>Home</span></div>
                <div style={{ flex:1, display:"flex", justifyContent:"center", gap:20 }}>
                  <div style={{ display:"flex", flexDirection:"column", alignItems:"center", gap:2 }}><Calendar size={20} color={"#aaa"} strokeWidth={1.5}/><span style={{ fontSize:8, color:"#aaa", fontWeight:400 }}>Monday</span></div>
                  <div style={{ display:"flex", flexDirection:"column", alignItems:"center", gap:2 }}><GanttChart size={20} color={ACCENT} strokeWidth={1.5}/><span style={{ fontSize:8, color:ACCENT, fontWeight:600 }}>Sprint</span></div>
                </div>
                <div style={{ display:"flex", alignItems:"center" }}><div style={{ width:1, height:20, background:"#e0e0e0", marginRight:10 }}/><PanelTopOpen size={22} color={ACCENT} strokeWidth={1.5}/></div>
              </div>
              <div style={{ height:20, display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0 }}><div style={{ width:100, height:4, background:"#111", borderRadius:2, opacity:.2 }}/></div>
            </div>
          </div>
        </div>

        <div style={{ flexShrink:0 }}>
          <div style={{ fontSize:9, letterSpacing:".14em", textTransform:"uppercase", color:"#bbb", textAlign:"center", marginBottom:8, fontFamily:"Helvetica Neue, Arial, sans-serif" }}>2 — Expanded Bar</div>
                  <div style={{ width:290, background:"#1a1a1a", borderRadius:48, padding:"12px 6px", boxShadow:"0 28px 64px rgba(0,0,0,.4), inset 0 0 0 2px #3a3a3a", position:"relative" }}>
            <div style={{ position:"absolute", left:-3, top:80, width:3, height:28, background:"#2a2a2a", borderRadius:"2px 0 0 2px" }}/>
            <div style={{ position:"absolute", left:-3, top:116, width:3, height:44, background:"#2a2a2a", borderRadius:"2px 0 0 2px" }}/>
            <div style={{ position:"absolute", right:-3, top:120, width:3, height:60, background:"#2a2a2a", borderRadius:"0 2px 2px 0" }}/>
            <div style={{ width:80, height:24, background:"#1a1a1a", borderRadius:12, margin:"0 auto 6px" }}/>
            <div style={{ background:"#fff", borderRadius:36, overflow:"hidden", height:580, display:"flex", flexDirection:"column" }}>
              <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", padding:"10px 20px 0", height:36, flexShrink:0 }}>
                <span style={{ fontSize:12, fontWeight:700, color:"#111" }}>9:41</span>
                <div style={{ width:14, height:7, border:"1.5px solid #111", borderRadius:2, position:"relative" }}><div style={{ position:"absolute", left:1, top:1, bottom:1, width:"70%", background:"#111", borderRadius:1 }}/></div>
              </div>              <div style={{ display:"flex", alignItems:"flex-start", justifyContent:"space-between", padding:"12px 4px 10px 12px", flexShrink:0 }}>
                <div style={{ fontSize:30, fontWeight:800, color:ACCENT, letterSpacing:"-0.03em", lineHeight:1 }}>Plan.</div>
                <div style={{ display:"flex" }}>
                  <button style={{ width:44, height:44, display:"flex", alignItems:"center", justifyContent:"center", background:"none", border:"none" }}><List size={20} color="#bbb" strokeWidth={1.5}/></button>
                  <button style={{ width:44, height:44, display:"flex", alignItems:"center", justifyContent:"center", background:"none", border:"none" }}><PanelRightOpen size={20} color="#bbb" strokeWidth={1.5}/></button>
                </div>
              </div>
              <div style={{ height:1.5, background:ACCENT, flexShrink:0 }}/>              <div style={{ display:"flex", alignItems:"center", height:50, padding:"0 4px", borderBottom:"`1px solid ${ACCENT}`", flexShrink:0 }}>
                <button style={{ width:44, height:44, display:"flex", alignItems:"center", justifyContent:"center", background:"none", border:"none" }}><ChevronRight size={20} color="#aaa" strokeWidth={1.5} style={{ transform:"rotate(180deg)" }}/></button>
                <button style={{ width:44, height:44, display:"flex", alignItems:"center", justifyContent:"center", background:"none", border:"none" }}><GanttChart size={20} color={ACCENT} strokeWidth={1.5}/></button>
                <span style={{ flex:1, fontSize:13, fontWeight:700, color:"#111" }}>Sprint 12</span>
                <button style={{ width:44, height:44, display:"flex", alignItems:"center", justifyContent:"center", background:"none", border:"none" }}><List size={20} color="#888" strokeWidth={1.5}/></button>
              </div>              <div style={{ flex:1, overflow:"hidden" }}>
                <div style={{ display:"flex", paddingLeft:68, borderBottom:`1px solid ${ACCENT}40` }}>
                  {"MTWTFSSMTW".split("").map((d,i)=>(
                    <div key={i} style={{ width:22, flexShrink:0, textAlign:"center", padding:"3px 0", fontSize:8, fontWeight:600, color:`${ACCENT}80` }}>{d}</div>
                  ))}
                </div>
                <div style={{ display:"flex", alignItems:"center", height:44, borderBottom:`1px solid ${ACCENT}15` }}>
                  <div style={{ width:68, flexShrink:0, fontSize:9, fontWeight:500, color:"#111", paddingLeft:6 }}>Coffee Shop</div>
                  <div style={{ display:"flex", position:"relative" }}>
                    {Array.from({length:10}).map((_,j)=>(<div key={j} style={{ width:22, height:36, borderRight:`1px solid ${ACCENT}15` }}/>))}
                    <div style={{ position:"absolute", top:6, left:2, width:86, height:24, background:ACCENT, borderRadius:4, display:"flex", alignItems:"center", paddingLeft:4 }}><span style={{ fontSize:8, color:"#fff", fontWeight:600 }}>Coffee Shop</span></div>
                  </div>
                </div>
                <div style={{ borderBottom:`1px solid ${ACCENT}15` }}>
                  <div style={{ display:"flex", alignItems:"center", height:44 }}>
                    <div style={{ width:68, flexShrink:0, fontSize:9, fontWeight:700, color:ACCENT, paddingLeft:6 }}>Portfolio</div>
                    <div style={{ display:"flex", position:"relative" }}>
                      {Array.from({length:10}).map((_,j)=>(<div key={j} style={{ width:22, height:36, borderRight:`1px solid ${ACCENT}15` }}/>))}
                      <div style={{ position:"absolute", top:6, left:44, width:108, height:24, background:ACCENT, borderRadius:4, display:"flex", alignItems:"center", paddingLeft:4 }}><span style={{ fontSize:8, color:"#fff", fontWeight:600 }}>Portfolio</span></div>
                    </div>
                  </div>
                  <div style={{ borderTop:`1px solid ${ACCENT}`, background:`${ACCENT}06` }}>
                    {["Homepage","About","Portfolio grid"].map((t,i)=>(
                      <div key={i} style={{ display:"flex", alignItems:"center", height:38, paddingLeft:68, borderBottom:`1px solid ${ACCENT}10` }}>
                        <button style={{ width:36, height:36, display:"flex", alignItems:"center", justifyContent:"center", background:"none", border:"none" }}><KanbanSquare size={16} color={ACCENT} strokeWidth={1.5}/></button>
                        <span style={{ flex:1, fontSize:10, color:"#111" }}>{t}</span>
                        <button style={{ width:36, height:36, display:"flex", alignItems:"center", justifyContent:"center", background:"none", border:"none" }}><List size={16} color="#888" strokeWidth={1.5}/></button>
                      </div>
                    ))}
                    <div style={{ padding:"4px 68px 6px" }}><span style={{ fontSize:9, color:"#888" }}>+ Add</span></div>
                  </div>
                </div>
                {[{t:"Design Sys",s:5,d:3},{t:"Mobile App",s:1,d:6}].map((b,i)=>(
                  <div key={i} style={{ display:"flex", alignItems:"center", height:44, borderBottom:`1px solid ${ACCENT}15` }}>
                    <div style={{ width:68, flexShrink:0, fontSize:9, fontWeight:500, color:"#111", paddingLeft:6 }}>{b.t}</div>
                    <div style={{ display:"flex", position:"relative" }}>
                      {Array.from({length:10}).map((_,j)=>(<div key={j} style={{ width:22, height:36, borderRight:`1px solid ${ACCENT}15` }}/>))}
                      <div style={{ position:"absolute", top:6, left:b.s*22+2, width:b.d*22-4, height:24, background:ACCENT, borderRadius:4, display:"flex", alignItems:"center", paddingLeft:4 }}><span style={{ fontSize:8, color:"#fff", fontWeight:600, overflow:"hidden", whiteSpace:"nowrap" }}>{b.t}</span></div>
                    </div>
                  </div>
                ))}
              </div>              <div style={{ height:68, borderTop:"1px solid #ebebea", display:"flex", alignItems:"center", padding:"0 12px", flexShrink:0 }}>
                <div style={{ display:"flex", flexDirection:"column", alignItems:"center", gap:2, minWidth:44 }}><KanbanSquare size={20} color={ACCENT} strokeWidth={1.5}/><span style={{ fontSize:8, letterSpacing:".08em", textTransform:"uppercase", color:ACCENT, fontWeight:600 }}>Home</span></div>
                <div style={{ flex:1, display:"flex", justifyContent:"center", gap:20 }}>
                  <div style={{ display:"flex", flexDirection:"column", alignItems:"center", gap:2 }}><Calendar size={20} color={"#aaa"} strokeWidth={1.5}/><span style={{ fontSize:8, color:"#aaa", fontWeight:400 }}>Monday</span></div>
                  <div style={{ display:"flex", flexDirection:"column", alignItems:"center", gap:2 }}><GanttChart size={20} color={ACCENT} strokeWidth={1.5}/><span style={{ fontSize:8, color:ACCENT, fontWeight:600 }}>Sprint</span></div>
                </div>
                <div style={{ display:"flex", alignItems:"center" }}><div style={{ width:1, height:20, background:"#e0e0e0", marginRight:10 }}/><PanelTopOpen size={22} color={ACCENT} strokeWidth={1.5}/></div>
              </div>
              <div style={{ height:20, display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0 }}><div style={{ width:100, height:4, background:"#111", borderRadius:2, opacity:.2 }}/></div>
            </div>
          </div>
        </div>

        <div style={{ flexShrink:0 }}>
          <div style={{ fontSize:9, letterSpacing:".14em", textTransform:"uppercase", color:"#bbb", textAlign:"center", marginBottom:8, fontFamily:"Helvetica Neue, Arial, sans-serif" }}>3 — Full Screen</div>
                  <div style={{ width:290, background:"#1a1a1a", borderRadius:48, padding:"12px 6px", boxShadow:"0 28px 64px rgba(0,0,0,.4), inset 0 0 0 2px #3a3a3a", position:"relative" }}>
            <div style={{ position:"absolute", left:-3, top:80, width:3, height:28, background:"#2a2a2a", borderRadius:"2px 0 0 2px" }}/>
            <div style={{ position:"absolute", left:-3, top:116, width:3, height:44, background:"#2a2a2a", borderRadius:"2px 0 0 2px" }}/>
            <div style={{ position:"absolute", right:-3, top:120, width:3, height:60, background:"#2a2a2a", borderRadius:"0 2px 2px 0" }}/>
            <div style={{ width:80, height:24, background:"#1a1a1a", borderRadius:12, margin:"0 auto 6px" }}/>
            <div style={{ background:"#fff", borderRadius:36, overflow:"hidden", height:580, display:"flex", flexDirection:"column" }}>
              <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", padding:"10px 20px 0", height:36, flexShrink:0 }}>
                <span style={{ fontSize:12, fontWeight:700, color:"#111" }}>9:41</span>
                <div style={{ width:14, height:7, border:"1.5px solid #111", borderRadius:2, position:"relative" }}><div style={{ position:"absolute", left:1, top:1, bottom:1, width:"70%", background:"#111", borderRadius:1 }}/></div>
              </div>              <div style={{ display:"flex", alignItems:"flex-start", justifyContent:"space-between", padding:"12px 4px 10px 12px", flexShrink:0 }}>
                <div style={{ fontSize:30, fontWeight:800, color:ACCENT, letterSpacing:"-0.03em", lineHeight:1 }}>Plan.</div>
                <div style={{ display:"flex" }}>
                  <button style={{ width:44, height:44, display:"flex", alignItems:"center", justifyContent:"center", background:"none", border:"none" }}><List size={20} color="#bbb" strokeWidth={1.5}/></button>
                  <button style={{ width:44, height:44, display:"flex", alignItems:"center", justifyContent:"center", background:"none", border:"none" }}><PanelRightClose size={20} color={ACCENT} strokeWidth={1.5}/></button>
                </div>
              </div>
              <div style={{ height:1.5, background:ACCENT, flexShrink:0 }}/>              <div style={{ display:"flex", alignItems:"center", height:50, padding:"0 4px", borderBottom:"`1px solid ${ACCENT}`", flexShrink:0 }}>
                <button style={{ width:44, height:44, display:"flex", alignItems:"center", justifyContent:"center", background:"none", border:"none" }}><ChevronRight size={20} color="#aaa" strokeWidth={1.5} style={{ transform:"rotate(180deg)" }}/></button>
                <button style={{ width:44, height:44, display:"flex", alignItems:"center", justifyContent:"center", background:"none", border:"none" }}><GanttChart size={20} color={ACCENT} strokeWidth={1.5}/></button>
                <span style={{ flex:1, fontSize:13, fontWeight:700, color:"#111" }}>Sprint 12</span>
                <button style={{ width:44, height:44, display:"flex", alignItems:"center", justifyContent:"center", background:"none", border:"none" }}><List size={20} color="#888" strokeWidth={1.5}/></button>
              </div>              <div style={{ flex:1, overflow:"hidden" }}>
                <div style={{ display:"flex", paddingLeft:68, borderBottom:"1px solid ${ACCENT}40" }}>
                  {"MTWTFSSMTW".split("").map((d,i)=>(
                    <div key={i} style={{ width:22, flexShrink:0, textAlign:"center", padding:"3px 0", fontSize:8, fontWeight:600, color:"${ACCENT}80" }}>{d}</div>
                  ))}
                </div>
                {[{t:"Coffee Shop",s:0,d:4},{t:"Portfolio",s:2,d:5},{t:"Design Sys",s:5,d:3},{t:"Mobile App",s:1,d:6},{t:"API Layer",s:4,d:4},{t:"Marketing",s:0,d:7}].map((b,i)=>(
                  <div key={i} style={{ display:"flex", alignItems:"center", height:44, borderBottom:"1px solid ${ACCENT}15" }}>
                    <div style={{ width:68, flexShrink:0, fontSize:9, fontWeight:500, color:"#111", paddingLeft:6, overflow:"hidden", textOverflow:"ellipsis", whiteSpace:"nowrap" }}>{b.t}</div>
                    <div style={{ display:"flex", position:"relative" }}>
                      {Array.from({length:10}).map((_,j)=>(<div key={j} style={{ width:22, height:36, borderRight:"1px solid ${ACCENT}15" }}/>))}
                      <div style={{ position:"absolute", top:6, left:b.s*22+2, width:b.d*22-4, height:24, background:ACCENT, borderRadius:4, display:"flex", alignItems:"center", paddingLeft:4 }}>
                        <span style={{ fontSize:8, color:"#fff", fontWeight:600, overflow:"hidden", whiteSpace:"nowrap" }}>{b.t}</span>
                      </div>
                    </div>
                  </div>
                ))}
                <div style={{ padding:"8px 12px" }}><span style={{ fontSize:10, letterSpacing:".1em", textTransform:"uppercase", fontWeight:600, color:"#888" }}>+ Add</span></div>
              </div>              <div style={{ height:68, borderTop:"1px solid #ebebea", display:"flex", alignItems:"center", padding:"0 12px", flexShrink:0 }}>
                <div style={{ display:"flex", flexDirection:"column", alignItems:"center", gap:2, minWidth:44 }}><KanbanSquare size={20} color={ACCENT} strokeWidth={1.5}/><span style={{ fontSize:8, letterSpacing:".08em", textTransform:"uppercase", color:ACCENT, fontWeight:600 }}>Home</span></div>
                <div style={{ flex:1, display:"flex", justifyContent:"center", gap:20 }}>
                  <div style={{ display:"flex", flexDirection:"column", alignItems:"center", gap:2 }}><Calendar size={20} color={"#aaa"} strokeWidth={1.5}/><span style={{ fontSize:8, color:"#aaa", fontWeight:400 }}>Monday</span></div>
                  <div style={{ display:"flex", flexDirection:"column", alignItems:"center", gap:2 }}><GanttChart size={20} color={ACCENT} strokeWidth={1.5}/><span style={{ fontSize:8, color:ACCENT, fontWeight:600 }}>Sprint</span></div>
                </div>
                <div style={{ display:"flex", alignItems:"center" }}><div style={{ width:1, height:20, background:"#e0e0e0", marginRight:10 }}/><PanelTopOpen size={22} color={ACCENT} strokeWidth={1.5}/></div>
              </div>
              <div style={{ height:20, display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0 }}><div style={{ width:100, height:4, background:"#111", borderRadius:2, opacity:.2 }}/></div>
            </div>
          </div>
        </div>
      </div>
      <div style={{ fontSize:10, letterSpacing:".2em", textTransform:"uppercase", color:"#999", fontFamily:"Helvetica Neue, Arial, sans-serif", marginBottom:16, marginTop:32, fontWeight:700, borderBottom:"1px solid #e0e0e0", paddingBottom:8 }}>APP STATES</div>
      <div style={{ display:"flex", gap:24, overflowX:"auto", paddingBottom:16, alignItems:"flex-start" }}>

        <div style={{ flexShrink:0 }}>
          <div style={{ fontSize:9, letterSpacing:".14em", textTransform:"uppercase", color:"#bbb", textAlign:"center", marginBottom:8, fontFamily:"Helvetica Neue, Arial, sans-serif" }}>Drag in Progress</div>
                  <div style={{ width:290, background:"#1a1a1a", borderRadius:48, padding:"12px 6px", boxShadow:"0 28px 64px rgba(0,0,0,.4), inset 0 0 0 2px #3a3a3a", position:"relative" }}>
            <div style={{ position:"absolute", left:-3, top:80, width:3, height:28, background:"#2a2a2a", borderRadius:"2px 0 0 2px" }}/>
            <div style={{ position:"absolute", left:-3, top:116, width:3, height:44, background:"#2a2a2a", borderRadius:"2px 0 0 2px" }}/>
            <div style={{ position:"absolute", right:-3, top:120, width:3, height:60, background:"#2a2a2a", borderRadius:"0 2px 2px 0" }}/>
            <div style={{ width:80, height:24, background:"#1a1a1a", borderRadius:12, margin:"0 auto 6px" }}/>
            <div style={{ background:"#fff", borderRadius:36, overflow:"hidden", height:580, display:"flex", flexDirection:"column" }}>
              <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", padding:"10px 20px 0", height:36, flexShrink:0 }}>
                <span style={{ fontSize:12, fontWeight:700, color:"#111" }}>9:41</span>
                <div style={{ width:14, height:7, border:"1.5px solid #111", borderRadius:2, position:"relative" }}><div style={{ position:"absolute", left:1, top:1, bottom:1, width:"70%", background:"#111", borderRadius:1 }}/></div>
              </div>              <div style={{ display:"flex", alignItems:"flex-start", justifyContent:"space-between", padding:"12px 4px 10px 12px", flexShrink:0 }}>
                <div style={{ fontSize:30, fontWeight:800, color:ACCENT, letterSpacing:"-0.03em", lineHeight:1 }}>Plan.</div>
                <div style={{ display:"flex" }}>
                  <button style={{ width:44, height:44, display:"flex", alignItems:"center", justifyContent:"center", background:"none", border:"none" }}><List size={20} color="#bbb" strokeWidth={1.5}/></button>
                  <button style={{ width:44, height:44, display:"flex", alignItems:"center", justifyContent:"center", background:"none", border:"none" }}><PanelRightOpen size={20} color="#bbb" strokeWidth={1.5}/></button>
                </div>
              </div>
              <div style={{ height:1.5, background:ACCENT, flexShrink:0 }}/>              <div style={{ flex:1, padding:"12px 8px 0", overflow:"hidden", position:"relative" }}>
                <div style={{ position:"absolute", top:36, left:24, right:8, zIndex:10, transform:"rotate(-3deg) scale(1.04)", boxShadow:`0 20px 48px ${ACCENT}44, 0 6px 16px rgba(0,0,0,.14)`, border:`1.5px solid ${ACCENT}`, borderRadius:9, background:"#fff", display:"flex", alignItems:"center", height:52 }}>
                  <button style={{ width:44, height:44, display:"flex", alignItems:"center", justifyContent:"center", background:"none", border:"none" }}><KanbanSquare size={20} color={ACCENT} strokeWidth={1.5}/></button>
                  <span style={{ flex:1, fontSize:10, fontWeight:700, letterSpacing:".08em", textTransform:"uppercase", color:"#111" }}>Projects</span>
                  <button style={{ width:44, height:44, display:"flex", alignItems:"center", justifyContent:"center", background:"none", border:"none" }}><List size={20} color="#888" strokeWidth={1.5}/></button>
                </div>
                <div style={{ display:"flex", alignItems:"center", height:52, border:`1px solid ${ACCENT}30`, borderRadius:9, marginBottom:8, opacity:.25 }}>
                  <button style={{ width:44, height:44, display:"flex", alignItems:"center", justifyContent:"center", background:"none", border:"none" }}><KanbanSquare size={20} color={ACCENT} strokeWidth={1.5}/></button>
                  <span style={{ flex:1, fontSize:10, fontWeight:700, letterSpacing:".08em", textTransform:"uppercase", color:"#111" }}>Routines</span>
                </div>
                <div style={{ height:52, border:`2px dashed ${ACCENT}`, borderRadius:9, marginBottom:8, background:`${ACCENT}10` }}/>
                {["Goals","Habits"].map((t,i)=>(
                  <div key={i} style={{ display:"flex", alignItems:"center", height:52, border:`1px solid ${ACCENT}`, borderRadius:9, marginBottom:8 }}>
                    <button style={{ width:44, height:44, display:"flex", alignItems:"center", justifyContent:"center", background:"none", border:"none" }}><KanbanSquare size={20} color={ACCENT} strokeWidth={1.5}/></button>
                    <span style={{ flex:1, fontSize:10, fontWeight:700, letterSpacing:".08em", textTransform:"uppercase", color:"#111" }}>{t}</span>
                    <button style={{ width:44, height:44, display:"flex", alignItems:"center", justifyContent:"center", background:"none", border:"none" }}><List size={20} color="#888" strokeWidth={1.5}/></button>
                    <button style={{ width:44, height:44, display:"flex", alignItems:"center", justifyContent:"center", background:"none", border:"none" }}><PanelTopOpen size={20} color="#888" strokeWidth={1.5}/></button>
                  </div>
                ))}
              </div>              <div style={{ height:68, borderTop:"1px solid #ebebea", display:"flex", alignItems:"center", padding:"0 12px", flexShrink:0 }}>
                <div style={{ display:"flex", flexDirection:"column", alignItems:"center", gap:2, minWidth:44 }}><KanbanSquare size={20} color={ACCENT} strokeWidth={1.5}/><span style={{ fontSize:8, letterSpacing:".08em", textTransform:"uppercase", color:ACCENT, fontWeight:600 }}>Home</span></div>
                <div style={{ flex:1, display:"flex", justifyContent:"center", gap:20 }}>
                  <div style={{ display:"flex", flexDirection:"column", alignItems:"center", gap:2 }}><Calendar size={20} color={"#aaa"} strokeWidth={1.5}/><span style={{ fontSize:8, color:"#aaa", fontWeight:400 }}>Monday</span></div>
                  <div style={{ display:"flex", flexDirection:"column", alignItems:"center", gap:2 }}><GanttChart size={20} color={"#aaa"} strokeWidth={1.5}/><span style={{ fontSize:8, color:"#aaa", fontWeight:400 }}>Sprint</span></div>
                </div>
                <div style={{ display:"flex", alignItems:"center" }}><div style={{ width:1, height:20, background:"#e0e0e0", marginRight:10 }}/><PanelTopOpen size={22} color={ACCENT} strokeWidth={1.5}/></div>
              </div>
              <div style={{ height:20, display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0 }}><div style={{ width:100, height:4, background:"#111", borderRadius:2, opacity:.2 }}/></div>
            </div>
          </div>
        </div>

        <div style={{ flexShrink:0 }}>
          <div style={{ fontSize:9, letterSpacing:".14em", textTransform:"uppercase", color:"#bbb", textAlign:"center", marginBottom:8, fontFamily:"Helvetica Neue, Arial, sans-serif" }}>Add — Inline</div>
                  <div style={{ width:290, background:"#1a1a1a", borderRadius:48, padding:"12px 6px", boxShadow:"0 28px 64px rgba(0,0,0,.4), inset 0 0 0 2px #3a3a3a", position:"relative" }}>
            <div style={{ position:"absolute", left:-3, top:80, width:3, height:28, background:"#2a2a2a", borderRadius:"2px 0 0 2px" }}/>
            <div style={{ position:"absolute", left:-3, top:116, width:3, height:44, background:"#2a2a2a", borderRadius:"2px 0 0 2px" }}/>
            <div style={{ position:"absolute", right:-3, top:120, width:3, height:60, background:"#2a2a2a", borderRadius:"0 2px 2px 0" }}/>
            <div style={{ width:80, height:24, background:"#1a1a1a", borderRadius:12, margin:"0 auto 6px" }}/>
            <div style={{ background:"#fff", borderRadius:36, overflow:"hidden", height:580, display:"flex", flexDirection:"column" }}>
              <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", padding:"10px 20px 0", height:36, flexShrink:0 }}>
                <span style={{ fontSize:12, fontWeight:700, color:"#111" }}>9:41</span>
                <div style={{ width:14, height:7, border:"1.5px solid #111", borderRadius:2, position:"relative" }}><div style={{ position:"absolute", left:1, top:1, bottom:1, width:"70%", background:"#111", borderRadius:1 }}/></div>
              </div>              <div style={{ display:"flex", alignItems:"flex-start", justifyContent:"space-between", padding:"12px 4px 10px 12px", flexShrink:0 }}>
                <div style={{ fontSize:30, fontWeight:800, color:ACCENT, letterSpacing:"-0.03em", lineHeight:1 }}>Plan.</div>
                <div style={{ display:"flex" }}>
                  <button style={{ width:44, height:44, display:"flex", alignItems:"center", justifyContent:"center", background:"none", border:"none" }}><List size={20} color="#bbb" strokeWidth={1.5}/></button>
                  <button style={{ width:44, height:44, display:"flex", alignItems:"center", justifyContent:"center", background:"none", border:"none" }}><PanelRightOpen size={20} color="#bbb" strokeWidth={1.5}/></button>
                </div>
              </div>
              <div style={{ height:1.5, background:ACCENT, flexShrink:0 }}/>              <div style={{ flex:1, padding:"12px 8px 0", overflow:"hidden" }}>
                {["Routines","Goals"].map((t,i)=>(
                  <div key={i} style={{ display:"flex", alignItems:"center", height:52, border:`1px solid ${ACCENT}`, borderRadius:9, marginBottom:8 }}>
                    <button style={{ width:44, height:44, display:"flex", alignItems:"center", justifyContent:"center", background:"none", border:"none" }}><KanbanSquare size={20} color={ACCENT} strokeWidth={1.5}/></button>
                    <span style={{ flex:1, fontSize:10, fontWeight:700, letterSpacing:".08em", textTransform:"uppercase", color:"#111" }}>{t}</span>
                    <button style={{ width:44, height:44, display:"flex", alignItems:"center", justifyContent:"center", background:"none", border:"none" }}><List size={20} color="#888" strokeWidth={1.5}/></button>
                    <button style={{ width:44, height:44, display:"flex", alignItems:"center", justifyContent:"center", background:"none", border:"none" }}><PanelTopOpen size={20} color="#888" strokeWidth={1.5}/></button>
                  </div>
                ))}
                <div style={{ display:"flex", alignItems:"center", height:52, border:`1px solid ${ACCENT}`, borderRadius:9, marginBottom:8 }}>
                  <button style={{ width:44, height:44, display:"flex", alignItems:"center", justifyContent:"center", background:"none", border:"none" }}><KanbanSquare size={20} color={ACCENT} strokeWidth={1.5}/></button>
                  <div style={{ flex:1, fontSize:10, fontWeight:700, letterSpacing:".08em", textTransform:"uppercase", color:"#bbb" }}>Title...</div>
                  <button style={{ width:44, height:44, display:"flex", alignItems:"center", justifyContent:"center", background:"none", border:"none" }}><List size={20} color="#ccc" strokeWidth={1.5}/></button>
                  <button style={{ width:44, height:44, display:"flex", alignItems:"center", justifyContent:"center", background:"none", border:"none" }}><PanelTopOpen size={20} color="#ccc" strokeWidth={1.5}/></button>
                </div>
                <div style={{ display:"flex", alignItems:"center", height:52, border:`1px solid ${ACCENT}`, borderRadius:9 }}>
                  <button style={{ width:44, height:44, display:"flex", alignItems:"center", justifyContent:"center", background:"none", border:"none" }}><KanbanSquare size={20} color={ACCENT} strokeWidth={1.5}/></button>
                  <span style={{ flex:1, fontSize:10, fontWeight:700, letterSpacing:".08em", textTransform:"uppercase", color:"#111" }}>Habits</span>
                  <button style={{ width:44, height:44, display:"flex", alignItems:"center", justifyContent:"center", background:"none", border:"none" }}><List size={20} color="#888" strokeWidth={1.5}/></button>
                  <button style={{ width:44, height:44, display:"flex", alignItems:"center", justifyContent:"center", background:"none", border:"none" }}><PanelTopOpen size={20} color="#888" strokeWidth={1.5}/></button>
                </div>
              </div>              <div style={{ height:68, borderTop:"1px solid #ebebea", display:"flex", alignItems:"center", padding:"0 12px", flexShrink:0 }}>
                <div style={{ display:"flex", flexDirection:"column", alignItems:"center", gap:2, minWidth:44 }}><KanbanSquare size={20} color={ACCENT} strokeWidth={1.5}/><span style={{ fontSize:8, letterSpacing:".08em", textTransform:"uppercase", color:ACCENT, fontWeight:600 }}>Home</span></div>
                <div style={{ flex:1, display:"flex", justifyContent:"center", gap:20 }}>
                  <div style={{ display:"flex", flexDirection:"column", alignItems:"center", gap:2 }}><Calendar size={20} color={"#aaa"} strokeWidth={1.5}/><span style={{ fontSize:8, color:"#aaa", fontWeight:400 }}>Monday</span></div>
                  <div style={{ display:"flex", flexDirection:"column", alignItems:"center", gap:2 }}><GanttChart size={20} color={"#aaa"} strokeWidth={1.5}/><span style={{ fontSize:8, color:"#aaa", fontWeight:400 }}>Sprint</span></div>
                </div>
                <div style={{ display:"flex", alignItems:"center" }}><div style={{ width:1, height:20, background:"#e0e0e0", marginRight:10 }}/><PanelTopOpen size={22} color={ACCENT} strokeWidth={1.5}/></div>
              </div>
              <div style={{ height:20, display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0 }}><div style={{ width:100, height:4, background:"#111", borderRadius:2, opacity:.2 }}/></div>
            </div>
          </div>
        </div>

        <div style={{ flexShrink:0 }}>
          <div style={{ fontSize:9, letterSpacing:".14em", textTransform:"uppercase", color:"#bbb", textAlign:"center", marginBottom:8, fontFamily:"Helvetica Neue, Arial, sans-serif" }}>Block Detail</div>
                  <div style={{ width:290, background:"#1a1a1a", borderRadius:48, padding:"12px 6px", boxShadow:"0 28px 64px rgba(0,0,0,.4), inset 0 0 0 2px #3a3a3a", position:"relative" }}>
            <div style={{ position:"absolute", left:-3, top:80, width:3, height:28, background:"#2a2a2a", borderRadius:"2px 0 0 2px" }}/>
            <div style={{ position:"absolute", left:-3, top:116, width:3, height:44, background:"#2a2a2a", borderRadius:"2px 0 0 2px" }}/>
            <div style={{ position:"absolute", right:-3, top:120, width:3, height:60, background:"#2a2a2a", borderRadius:"0 2px 2px 0" }}/>
            <div style={{ width:80, height:24, background:"#1a1a1a", borderRadius:12, margin:"0 auto 6px" }}/>
            <div style={{ background:"#fff", borderRadius:36, overflow:"hidden", height:580, display:"flex", flexDirection:"column" }}>
              <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", padding:"10px 20px 0", height:36, flexShrink:0 }}>
                <span style={{ fontSize:12, fontWeight:700, color:"#111" }}>9:41</span>
                <div style={{ width:14, height:7, border:"1.5px solid #111", borderRadius:2, position:"relative" }}><div style={{ position:"absolute", left:1, top:1, bottom:1, width:"70%", background:"#111", borderRadius:1 }}/></div>
              </div>              <div style={{ display:"flex", alignItems:"center", height:52, padding:"0 4px", borderBottom:`1px solid ${ACCENT}`, flexShrink:0 }}>
                <button style={{ width:44, height:44, display:"flex", alignItems:"center", justifyContent:"center", background:"none", border:"none" }}><ChevronRight size={20} color="#aaa" strokeWidth={1.5} style={{ transform:"rotate(180deg)" }}/></button>
                <button style={{ width:44, height:44, display:"flex", alignItems:"center", justifyContent:"center", background:"none", border:"none" }}><KanbanSquare size={20} color={ACCENT} strokeWidth={1.5}/></button>
                <span style={{ flex:1, fontSize:13, fontWeight:700, color:"#111" }}>Coffee Shop App</span>
                <div style={{ width:38, height:38, borderRadius:"50%", border:`2px solid ${ACCENT}`, display:"flex", alignItems:"center", justifyContent:"center", position:"relative", marginRight:4 }}>
                  <svg style={{ position:"absolute", inset:0 }} viewBox="0 0 38 38">
                    <circle cx="19" cy="19" r="16" fill="none" stroke={`${ACCENT}20`} strokeWidth="2.5"/>
                    <circle cx="19" cy="19" r="16" fill="none" stroke={ACCENT} strokeWidth="2.5" strokeDasharray="100.5" strokeDashoffset="25" strokeLinecap="round" transform="rotate(-90 19 19)"/>
                  </svg>
                  <span style={{ fontSize:7, fontWeight:700, color:ACCENT }}>22:30</span>
                </div>
              </div>              <div style={{ flex:1, padding:"14px 16px", overflow:"hidden" }}>
                <div style={{ fontSize:18, fontWeight:800, color:"#111", borderBottom:`2px solid ${ACCENT}`, paddingBottom:8, marginBottom:14 }}>Coffee Shop App</div>
                <div style={{ fontSize:9, letterSpacing:".12em", textTransform:"uppercase", color:"#aaa", marginBottom:3 }}>Description</div>
                <div style={{ fontSize:11, color:"#555", marginBottom:14, lineHeight:1.5, borderBottom:"1px solid #f0f0f0", paddingBottom:12 }}>Build a mobile app for local coffee shops to manage orders and loyalty.</div>
                <div style={{ display:"flex", gap:12, marginBottom:14 }}>
                  <div style={{ flex:1 }}><div style={{ fontSize:9, letterSpacing:".1em", textTransform:"uppercase", color:"#aaa", marginBottom:2 }}>Begin</div><div style={{ fontSize:10, color:"#111", borderBottom:"1px solid #ebebea", paddingBottom:6 }}>May 26 · 9 AM</div></div>
                  <div style={{ flex:1 }}><div style={{ fontSize:9, letterSpacing:".1em", textTransform:"uppercase", color:"#aaa", marginBottom:2 }}>End</div><div style={{ fontSize:10, color:"#111", borderBottom:"1px solid #ebebea", paddingBottom:6 }}>Jun 15 · 5 PM</div></div>
                </div>
                <div style={{ fontSize:9, letterSpacing:".12em", textTransform:"uppercase", color:"#aaa", marginBottom:6 }}>Checklist</div>
                {[{t:"Define scope",done:true},{t:"Design mockups",done:true},{t:"Build MVP",done:false},{t:"User testing",done:false}].map((item,i)=>(
                  <div key={i} style={{ display:"flex", alignItems:"center", gap:8, padding:"6px 0", borderBottom:"1px solid #f4f4f4" }}>
                    <div style={{ width:14, height:14, borderRadius:3, border:`1.5px solid ${item.done ? ACCENT : "#ccc"}`, background:item.done?ACCENT:"none", display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0 }}>{item.done && <span style={{ color:"#fff", fontSize:8 }}>✓</span>}</div>
                    <span style={{ fontSize:10, color:item.done?"#aaa":"#111", textDecoration:item.done?"line-through":"none" }}>{item.t}</span>
                  </div>
                ))}
              </div>              <div style={{ height:68, borderTop:"1px solid #ebebea", display:"flex", alignItems:"center", padding:"0 12px", flexShrink:0 }}>
                <div style={{ display:"flex", flexDirection:"column", alignItems:"center", gap:2, minWidth:44 }}><KanbanSquare size={20} color={ACCENT} strokeWidth={1.5}/><span style={{ fontSize:8, letterSpacing:".08em", textTransform:"uppercase", color:ACCENT, fontWeight:600 }}>Home</span></div>
                <div style={{ flex:1, display:"flex", justifyContent:"center", gap:20 }}>
                  <div style={{ display:"flex", flexDirection:"column", alignItems:"center", gap:2 }}><Calendar size={20} color={"#aaa"} strokeWidth={1.5}/><span style={{ fontSize:8, color:"#aaa", fontWeight:400 }}>Monday</span></div>
                  <div style={{ display:"flex", flexDirection:"column", alignItems:"center", gap:2 }}><GanttChart size={20} color={"#aaa"} strokeWidth={1.5}/><span style={{ fontSize:8, color:"#aaa", fontWeight:400 }}>Sprint</span></div>
                </div>
                <div style={{ display:"flex", alignItems:"center" }}><div style={{ width:1, height:20, background:"#e0e0e0", marginRight:10 }}/><PanelTopOpen size={22} color={ACCENT} strokeWidth={1.5}/></div>
              </div>
              <div style={{ height:20, display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0 }}><div style={{ width:100, height:4, background:"#111", borderRadius:2, opacity:.2 }}/></div>
            </div>
          </div>
        </div>

        <div style={{ flexShrink:0 }}>
          <div style={{ fontSize:9, letterSpacing:".14em", textTransform:"uppercase", color:"#bbb", textAlign:"center", marginBottom:8, fontFamily:"Helvetica Neue, Arial, sans-serif" }}>Nav Drawer Open</div>
                  <div style={{ width:290, background:"#1a1a1a", borderRadius:48, padding:"12px 6px", boxShadow:"0 28px 64px rgba(0,0,0,.4), inset 0 0 0 2px #3a3a3a", position:"relative" }}>
            <div style={{ position:"absolute", left:-3, top:80, width:3, height:28, background:"#2a2a2a", borderRadius:"2px 0 0 2px" }}/>
            <div style={{ position:"absolute", left:-3, top:116, width:3, height:44, background:"#2a2a2a", borderRadius:"2px 0 0 2px" }}/>
            <div style={{ position:"absolute", right:-3, top:120, width:3, height:60, background:"#2a2a2a", borderRadius:"0 2px 2px 0" }}/>
            <div style={{ width:80, height:24, background:"#1a1a1a", borderRadius:12, margin:"0 auto 6px" }}/>
            <div style={{ background:"#2563EB", borderRadius:36, overflow:"hidden", height:580, display:"flex", flexDirection:"column" }}>
              <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", padding:"10px 20px 0", height:36, flexShrink:0 }}>
                <span style={{ fontSize:12, fontWeight:700, color:"#fff" }}>9:41</span>
                <div style={{ width:14, height:7, border:"1.5px solid rgba(255,255,255,.7)", borderRadius:2, position:"relative" }}><div style={{ position:"absolute", left:1, top:1, bottom:1, width:"70%", background:"rgba(255,255,255,.7)", borderRadius:1 }}/></div>
              </div>              <div style={{ display:"flex", alignItems:"flex-start", justifyContent:"space-between", padding:"12px 4px 10px 16px", flexShrink:0 }}>
                <div style={{ fontSize:28, fontWeight:800, color:"#fff", letterSpacing:"-0.03em", lineHeight:1 }}>Plan.</div>
                <button style={{ width:44, height:44, display:"flex", alignItems:"center", justifyContent:"center", background:"none", border:"none" }}><PanelRightClose size={20} color="#fff" strokeWidth={1.5}/></button>
              </div>
              <div style={{ flex:1, padding:"0 16px", overflow:"hidden" }}>
                {["Routines","Projects","Goals","Habits","Morning"].map((t,i)=>(
                  <div key={i} style={{ display:"flex", alignItems:"center", height:48 }}>
                    <button style={{ width:40, height:40, display:"flex", alignItems:"center", justifyContent:"center", background:"none", border:"none" }}><KanbanSquare size={20} color="rgba(255,255,255,.7)" strokeWidth={1.5}/></button>
                    <span style={{ flex:1, fontSize:13, fontWeight:500, color:"rgba(255,255,255,.85)" }}>{t}</span>
                    <button style={{ width:40, height:40, display:"flex", alignItems:"center", justifyContent:"center", background:"none", border:"none" }}><PanelTopOpen size={18} color="rgba(255,255,255,.35)" strokeWidth={1.5}/></button>
                  </div>
                ))}
              </div>
              <div style={{ borderTop:"1px solid rgba(255,255,255,.15)", padding:"10px 16px 8px", flexShrink:0 }}>
                <div style={{ display:"flex", alignItems:"center", height:44 }}>
                  <button style={{ width:40, height:40, display:"flex", alignItems:"center", justifyContent:"center", background:"none", border:"none" }}><List size={20} color="rgba(255,255,255,.5)" strokeWidth={1.5}/></button>
                  <span style={{ flex:1, fontSize:13, fontWeight:500, color:"rgba(255,255,255,.7)" }}>Settings</span>
                  <button style={{ padding:"6px 12px", background:"rgba(255,255,255,.15)", border:"1px solid rgba(255,255,255,.2)", borderRadius:20 }}><span style={{ fontSize:14 }}>☀</span></button>
                </div>
                <div style={{ display:"flex", alignItems:"center", gap:10, background:"rgba(255,255,255,.12)", border:"1px solid rgba(255,255,255,.2)", borderRadius:28, padding:"8px 14px 8px 8px", marginTop:4 }}>
                  <div style={{ width:28, height:28, borderRadius:"50%", background:ACCENT, border:"2px solid #fff" }}/>
                  <div style={{ flex:1 }}><div style={{ fontSize:8, letterSpacing:".14em", textTransform:"uppercase", color:"rgba(255,255,255,.45)", marginBottom:1 }}>Mood</div><div style={{ fontSize:11, fontWeight:600, color:"#fff" }}>Focused</div></div>
                  <div style={{ display:"flex", gap:4 }}>{["#7C3AED","#C2410C","#1C1C1E","#166534","#0F4C75"].map((c,i)=>(<div key={i} style={{ width:8, height:8, borderRadius:"50%", background:c }}/>))}</div>
                </div>
              </div>              <div style={{ height:68, borderTop:"1px solid rgba(255,255,255,.12)", display:"flex", alignItems:"center", padding:"0 12px", flexShrink:0 }}>
                <div style={{ display:"flex", flexDirection:"column", alignItems:"center", gap:2, minWidth:44 }}><KanbanSquare size={20} color="rgba(255,255,255,.9)" strokeWidth={1.5}/><span style={{ fontSize:8, letterSpacing:".08em", textTransform:"uppercase", color:"rgba(255,255,255,.9)", fontWeight:600 }}>Home</span></div>
                <div style={{ flex:1, display:"flex", justifyContent:"center", gap:20 }}>
                  <div style={{ display:"flex", flexDirection:"column", alignItems:"center", gap:2 }}><Calendar size={20} color="rgba(255,255,255,.35)" strokeWidth={1.5}/><span style={{ fontSize:8, color:"rgba(255,255,255,.35)" }}>Monday</span></div>
                  <div style={{ display:"flex", flexDirection:"column", alignItems:"center", gap:2 }}><GanttChart size={20} color="rgba(255,255,255,.35)" strokeWidth={1.5}/><span style={{ fontSize:8, color:"rgba(255,255,255,.35)" }}>Sprint</span></div>
                </div>
                <div style={{ display:"flex", alignItems:"center" }}><div style={{ width:1, height:20, background:"rgba(255,255,255,.15)", marginRight:10 }}/><PanelTopOpen size={22} color="rgba(255,255,255,.9)" strokeWidth={1.5}/></div>
              </div>              <div style={{ height:20, display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0 }}><div style={{ width:100, height:4, background:"rgba(255,255,255,.4)", borderRadius:2, opacity:.2 }}/></div>
              <div style={{ height:20, display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0 }}><div style={{ width:100, height:4, background:"rgba(255,255,255,.4)", borderRadius:2, opacity:.2 }}/></div>
            </div>
          </div>
        </div>

        <div style={{ flexShrink:0 }}>
          <div style={{ fontSize:9, letterSpacing:".14em", textTransform:"uppercase", color:"#bbb", textAlign:"center", marginBottom:8, fontFamily:"Helvetica Neue, Arial, sans-serif" }}>Dark Mode — Kanban</div>
                  <div style={{ width:290, background:"#1a1a1a", borderRadius:48, padding:"12px 6px", boxShadow:"0 28px 64px rgba(0,0,0,.4), inset 0 0 0 2px #3a3a3a", position:"relative" }}>
            <div style={{ position:"absolute", left:-3, top:80, width:3, height:28, background:"#2a2a2a", borderRadius:"2px 0 0 2px" }}/>
            <div style={{ position:"absolute", left:-3, top:116, width:3, height:44, background:"#2a2a2a", borderRadius:"2px 0 0 2px" }}/>
            <div style={{ position:"absolute", right:-3, top:120, width:3, height:60, background:"#2a2a2a", borderRadius:"0 2px 2px 0" }}/>
            <div style={{ width:80, height:24, background:"#1a1a1a", borderRadius:12, margin:"0 auto 6px" }}/>
            <div style={{ background:"#111", borderRadius:36, overflow:"hidden", height:580, display:"flex", flexDirection:"column" }}>
              <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", padding:"10px 20px 0", height:36, flexShrink:0 }}>
                <span style={{ fontSize:12, fontWeight:700, color:"#fff" }}>9:41</span>
                <div style={{ width:14, height:7, border:"1.5px solid rgba(255,255,255,.7)", borderRadius:2, position:"relative" }}><div style={{ position:"absolute", left:1, top:1, bottom:1, width:"70%", background:"rgba(255,255,255,.7)", borderRadius:1 }}/></div>
              </div>              <div style={{ display:"flex", alignItems:"flex-start", justifyContent:"space-between", padding:"12px 4px 10px 12px", flexShrink:0 }}>
                <div style={{ fontSize:30, fontWeight:800, color:"#fff", letterSpacing:"-0.03em", lineHeight:1 }}>Plan.</div>
                <div style={{ display:"flex" }}>
                  <button style={{ width:44, height:44, display:"flex", alignItems:"center", justifyContent:"center", background:"none", border:"none" }}><List size={20} color="rgba(255,255,255,.4)" strokeWidth={1.5}/></button>
                  <button style={{ width:44, height:44, display:"flex", alignItems:"center", justifyContent:"center", background:"none", border:"none" }}><PanelRightOpen size={20} color="rgba(255,255,255,.4)" strokeWidth={1.5}/></button>
                </div>
              </div>
              <div style={{ height:1.5, background:ACCENT, flexShrink:0 }}/>              <div style={{ flex:1, padding:"12px 8px 0", overflow:"hidden" }}>
                {["Routines","Projects","Goals","Habits"].map((t,i)=>(
                  <div key={i} style={{ display:"flex", alignItems:"center", height:52, border:`1px solid ${ACCENT}`, borderRadius:9, marginBottom:8, background:ACCENT }}>
                    <button style={{ width:44, height:44, display:"flex", alignItems:"center", justifyContent:"center", background:"none", border:"none" }}><KanbanSquare size={20} color="#fff" strokeWidth={1.5}/></button>
                    <span style={{ flex:1, fontSize:10, fontWeight:700, letterSpacing:".08em", textTransform:"uppercase", color:"#fff" }}>{t}</span>
                    <button style={{ width:44, height:44, display:"flex", alignItems:"center", justifyContent:"center", background:"none", border:"none" }}><List size={20} color="rgba(255,255,255,.6)" strokeWidth={1.5}/></button>
                    <button style={{ width:44, height:44, display:"flex", alignItems:"center", justifyContent:"center", background:"none", border:"none" }}><PanelTopOpen size={20} color="rgba(255,255,255,.6)" strokeWidth={1.5}/></button>
                  </div>
                ))}
                <div style={{ border:"1.5px dashed rgba(255,255,255,.2)", borderRadius:9, padding:"12px", display:"flex", alignItems:"center", justifyContent:"center", opacity:.6 }}>
                  <span style={{ fontSize:10, letterSpacing:".12em", textTransform:"uppercase", fontWeight:600, color:"rgba(255,255,255,.6)" }}>+ Add</span>
                </div>
              </div>              <div style={{ height:68, borderTop:"1px solid rgba(255,255,255,.12)", display:"flex", alignItems:"center", padding:"0 12px", flexShrink:0 }}>
                <div style={{ display:"flex", flexDirection:"column", alignItems:"center", gap:2, minWidth:44 }}><KanbanSquare size={20} color={'rgba(255,255,255,.9)'} strokeWidth={1.5}/><span style={{ fontSize:8, letterSpacing:".08em", textTransform:"uppercase", color:'rgba(255,255,255,.9)', fontWeight:600 }}>Home</span></div>
                <div style={{ flex:1, display:"flex", justifyContent:"center", gap:20 }}>
                  <div style={{ display:"flex", flexDirection:"column", alignItems:"center", gap:2 }}><Calendar size={20} color={'rgba(255,255,255,.35)'} strokeWidth={1.5}/><span style={{ fontSize:8, color:'rgba(255,255,255,.35)', fontWeight:400 }}>Monday</span></div>
                  <div style={{ display:"flex", flexDirection:"column", alignItems:"center", gap:2 }}><GanttChart size={20} color={'rgba(255,255,255,.35)'} strokeWidth={1.5}/><span style={{ fontSize:8, color:'rgba(255,255,255,.35)', fontWeight:400 }}>Sprint</span></div>
                </div>
                <div style={{ display:"flex", alignItems:"center" }}><div style={{ width:1, height:20, background:"rgba(255,255,255,.15)", marginRight:10 }}/><PanelTopOpen size={22} color={'rgba(255,255,255,.9)'} strokeWidth={1.5}/></div>
              </div>
              <div style={{ height:20, display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0 }}><div style={{ width:100, height:4, background:"rgba(255,255,255,.4)", borderRadius:2, opacity:.2 }}/></div>
            </div>
          </div>
        </div>

        <div style={{ flexShrink:0 }}>
          <div style={{ fontSize:9, letterSpacing:".14em", textTransform:"uppercase", color:"#bbb", textAlign:"center", marginBottom:8, fontFamily:"Helvetica Neue, Arial, sans-serif" }}>Dark Mode — Calendar</div>
                  <div style={{ width:290, background:"#1a1a1a", borderRadius:48, padding:"12px 6px", boxShadow:"0 28px 64px rgba(0,0,0,.4), inset 0 0 0 2px #3a3a3a", position:"relative" }}>
            <div style={{ position:"absolute", left:-3, top:80, width:3, height:28, background:"#2a2a2a", borderRadius:"2px 0 0 2px" }}/>
            <div style={{ position:"absolute", left:-3, top:116, width:3, height:44, background:"#2a2a2a", borderRadius:"2px 0 0 2px" }}/>
            <div style={{ position:"absolute", right:-3, top:120, width:3, height:60, background:"#2a2a2a", borderRadius:"0 2px 2px 0" }}/>
            <div style={{ width:80, height:24, background:"#1a1a1a", borderRadius:12, margin:"0 auto 6px" }}/>
            <div style={{ background:"#111", borderRadius:36, overflow:"hidden", height:580, display:"flex", flexDirection:"column" }}>
              <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", padding:"10px 20px 0", height:36, flexShrink:0 }}>
                <span style={{ fontSize:12, fontWeight:700, color:"#fff" }}>9:41</span>
                <div style={{ width:14, height:7, border:"1.5px solid rgba(255,255,255,.7)", borderRadius:2, position:"relative" }}><div style={{ position:"absolute", left:1, top:1, bottom:1, width:"70%", background:"rgba(255,255,255,.7)", borderRadius:1 }}/></div>
              </div>              <div style={{ display:"flex", alignItems:"flex-start", justifyContent:"space-between", padding:"12px 4px 10px 12px", flexShrink:0 }}>
                <div style={{ fontSize:30, fontWeight:800, color:"#fff", letterSpacing:"-0.03em", lineHeight:1 }}>Plan.</div>
                <div style={{ display:"flex" }}>
                  <button style={{ width:44, height:44, display:"flex", alignItems:"center", justifyContent:"center", background:"none", border:"none" }}><List size={20} color="rgba(255,255,255,.4)" strokeWidth={1.5}/></button>
                  <button style={{ width:44, height:44, display:"flex", alignItems:"center", justifyContent:"center", background:"none", border:"none" }}><PanelRightClose size={20} color={ACCENT} strokeWidth={1.5}/></button>
                </div>
              </div>
              <div style={{ height:1.5, background:ACCENT, flexShrink:0 }}/>              <div style={{ display:"flex", alignItems:"center", height:50, padding:"0 4px", borderBottom:"1px solid rgba(255,255,255,.2)", flexShrink:0 }}>
                <button style={{ width:44, height:44, display:"flex", alignItems:"center", justifyContent:"center", background:"none", border:"none" }}><ChevronRight size={20} color="rgba(255,255,255,.4)" strokeWidth={1.5} style={{ transform:"rotate(180deg)" }}/></button>
                <button style={{ width:44, height:44, display:"flex", alignItems:"center", justifyContent:"center", background:"none", border:"none" }}><Calendar size={20} color="rgba(255,255,255,.8)" strokeWidth={1.5}/></button>
                <span style={{ flex:1, fontSize:13, fontWeight:700, color:"#fff" }}>Monday</span>
                <button style={{ width:44, height:44, display:"flex", alignItems:"center", justifyContent:"center", background:"none", border:"none" }}><List size={20} color="rgba(255,255,255,.4)" strokeWidth={1.5}/></button>
              </div>              <div style={{ flex:1, overflow:"hidden", display:"flex" }}>
                <div style={{ width:38, flexShrink:0 }}>
                  {[8,9,10,11,12,13].map(h=>(
                    <div key={h} style={{ height:56, display:"flex", alignItems:"flex-start", justifyContent:"flex-end", paddingRight:5, paddingTop:3 }}>
                      <span style={{ fontSize:8, fontWeight:600, color:"rgba(255,255,255,.4)" }}>{h<12?`${h}AM`:h===12?"12PM":`${h-12}PM`}</span>
                    </div>
                  ))}
                </div>
                <div style={{ flex:1, position:"relative", borderLeft:"1.5px solid rgba(255,255,255,.15)" }}>
                  <svg style={{ position:"absolute", inset:0, width:"100%", height:336, pointerEvents:"none" }}>
                    <defs>
                      <pattern id="chD" width="100%" height="56" patternUnits="userSpaceOnUse">
                        <line x1="0" y1="14" x2="100%" y2="14" stroke="rgba(255,255,255,.07)" strokeWidth="0.75"/>
                        <line x1="0" y1="28" x2="100%" y2="28" stroke="rgba(255,255,255,.07)" strokeWidth="0.75"/>
                        <line x1="0" y1="42" x2="100%" y2="42" stroke="rgba(255,255,255,.07)" strokeWidth="0.75"/>
                        <line x1="0" y1="56" x2="100%" y2="56" stroke="rgba(255,255,255,.14)" strokeWidth="1"/>
                      </pattern>
                      <pattern id="cvD" width="14" height="100%" patternUnits="userSpaceOnUse">
                        <line x1="14" y1="0" x2="14" y2="100%" stroke="rgba(255,255,255,.04)" strokeWidth="0.75"/>
                      </pattern>
                    </defs>
                    <rect width="100%" height="336" fill="url(#cvD)"/>
                    <rect width="100%" height="336" fill="url(#chD)"/>
                  </svg>
                  <div style={{ position:"relative", height:336 }}>
                    {[{t:"Check Email",top:56,h:56},{t:"Deep Work",top:112,h:112},{t:"Lunch",top:224,h:56}].map((b,i)=>(
                      <div key={i} style={{ position:"absolute", top:b.top, left:2, right:2, height:b.h, background:ACCENT, border:"1px solid rgba(255,255,255,.25)", borderRadius:7, overflow:"hidden", zIndex:2 }}>
                        <div style={{ display:"flex", alignItems:"center", height:Math.min(b.h,50) }}>
                          <button style={{ width:40, height:40, display:"flex", alignItems:"center", justifyContent:"center", background:"none", border:"none" }}><KanbanSquare size={18} color={"#fff"} strokeWidth={1.5}/></button>
                          <span style={{ flex:1, fontSize:10, fontWeight:600, color:"#fff" }}>{b.t}</span>
                          <button style={{ width:40, height:40, display:"flex", alignItems:"center", justifyContent:"center", background:"none", border:"none" }}><List size={18} color="rgba(255,255,255,.6)" strokeWidth={1.5}/></button>
                          <button style={{ width:40, height:40, display:"flex", alignItems:"center", justifyContent:"center", background:"none", border:"none" }}><PanelTopOpen size={18} color="rgba(255,255,255,.6)" strokeWidth={1.5}/></button>
                        </div>
                        {b.h > 56 && <><div style={{ height:1.5, background:"rgba(255,255,255,.3)" }}/><div style={{ padding:"3px 8px" }}><span style={{ fontSize:8, letterSpacing:".1em", textTransform:"uppercase", color:"rgba(255,255,255,.7)", fontWeight:600 }}>2 blocks</span></div></>}
                        <div style={{ position:"absolute", bottom:0, left:"50%", transform:"translateX(-50%)", width:24, height:10, display:"flex", alignItems:"center", justifyContent:"center" }}><div style={{ width:18, height:2, background:"rgba(255,255,255,.4)", borderRadius:1 }}/></div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>              <div style={{ height:68, borderTop:"1px solid rgba(255,255,255,.12)", display:"flex", alignItems:"center", padding:"0 12px", flexShrink:0 }}>
                <div style={{ display:"flex", flexDirection:"column", alignItems:"center", gap:2, minWidth:44 }}><KanbanSquare size={20} color={'rgba(255,255,255,.9)'} strokeWidth={1.5}/><span style={{ fontSize:8, letterSpacing:".08em", textTransform:"uppercase", color:'rgba(255,255,255,.9)', fontWeight:600 }}>Home</span></div>
                <div style={{ flex:1, display:"flex", justifyContent:"center", gap:20 }}>
                  <div style={{ display:"flex", flexDirection:"column", alignItems:"center", gap:2 }}><Calendar size={20} color={ACCENT} strokeWidth={1.5}/><span style={{ fontSize:8, color:ACCENT, fontWeight:600 }}>Monday</span></div>
                  <div style={{ display:"flex", flexDirection:"column", alignItems:"center", gap:2 }}><GanttChart size={20} color={'rgba(255,255,255,.35)'} strokeWidth={1.5}/><span style={{ fontSize:8, color:'rgba(255,255,255,.35)', fontWeight:400 }}>Sprint</span></div>
                </div>
                <div style={{ display:"flex", alignItems:"center" }}><div style={{ width:1, height:20, background:"rgba(255,255,255,.15)", marginRight:10 }}/><PanelTopOpen size={22} color={'rgba(255,255,255,.9)'} strokeWidth={1.5}/></div>
              </div>
              <div style={{ height:20, display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0 }}><div style={{ width:100, height:4, background:"rgba(255,255,255,.4)", borderRadius:2, opacity:.2 }}/></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
