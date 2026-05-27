// Plan. — shared block data + per-view geometry calculators
// The trick: the same block ids are positioned to different (x,y,w,h)
// in each view. The Block component transitions between them.

// Studio mix: a bit of work + a bit of life.
// startHour / durHours drive the Calendar view's vertical positioning.
const BLOCKS = [
  { id: 'b1',  title: 'Synthesize user research', status: 'doing',  project: 'Research',    day: 0, durDays: 2,   type: 'task',  startHour: 9,    durHours: 3 },
  { id: 'b2',  title: 'Team weekly',              status: 'done',   project: 'Routine',     day: 0, durDays: 0.4, type: 'event', startHour: 13,   durHours: 1 },
  { id: 'b3',  title: 'Morning pages',            status: 'done',   project: 'Routine',     day: 0, durDays: 5,   type: 'cycle', startHour: 7,    durHours: 1 },
  { id: 'b4',  title: 'Review onboarding flow',   status: 'review', project: 'Design',      day: 1, durDays: 1,   type: 'task',  startHour: 10,   durHours: 2 },
  { id: 'b5',  title: 'Coffee w/ Maya',           status: 'todo',   project: 'Personal',    day: 2, durDays: 0.3, type: 'event', startHour: 9,    durHours: 1 },
  { id: 'b6',  title: 'Ship v2.1 release',        status: 'doing',  project: 'Engineering', day: 2, durDays: 1,   type: 'task',  startHour: 14,   durHours: 3 },
  { id: 'b7',  title: 'Pitch deck v3',            status: 'todo',   project: 'Design',      day: 3, durDays: 1.4, type: 'task',  startHour: 10,   durHours: 2.5 },
  { id: 'b8',  title: 'API rewrite',              status: 'doing',  project: 'Engineering', day: 3, durDays: 2,   type: 'task',  startHour: 14,   durHours: 3 },
  { id: 'b9',  title: 'Plan Q3 roadmap',          status: 'todo',   project: 'Research',    day: 4, durDays: 1.5, type: 'task',  startHour: 9,    durHours: 4 },
  { id: 'b10', title: 'Groceries run',            status: 'todo',   project: 'Personal',    day: 5, durDays: 0.4, type: 'task',  startHour: 11,   durHours: 1 },
  { id: 'b11', title: 'Long run',                 status: 'todo',   project: 'Personal',    day: 6, durDays: 0.6, type: 'cycle', startHour: 8,    durHours: 1.5 },
  { id: 'b12', title: 'Reading list',             status: 'doing',  project: 'Personal',    day: 4, durDays: 0.5, type: 'task',  startHour: 15,   durHours: 1.5 },
];

const STATUSES = ['todo', 'doing', 'review', 'done'];
const STATUS_LABEL = { todo: 'To do', doing: 'Doing', review: 'Review', done: 'Done' };
const DAYS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
const PROJECTS = ['Research', 'Design', 'Engineering', 'Routine', 'Personal'];

// ─── view geometry ────────────────────────────────────────────
// Returns {
//   blocks: { id -> { x, y, w, h, detail, opacity } },
//   decos:  [ { kind, x, y, w?, h?, text?, opacity, id } ],
// }

function layoutList(dims, opts = {}) {
  const ROW_H = opts.rowH ?? 60;
  const GAP = opts.gap ?? 6;
  const result = { blocks: {}, decos: [] };
  // Group by project, render section headers between groups.
  let y = 0;
  PROJECTS.forEach((proj, pi) => {
    const items = BLOCKS.filter(b => b.project === proj);
    if (!items.length) return;
    result.decos.push({ kind: 'group-h', id: `gh-${proj}`, text: proj, x: 0, y: y, w: dims.w, h: 24 });
    y += 28;
    items.forEach((b) => {
      result.blocks[b.id] = { x: 0, y, w: dims.w, h: ROW_H - GAP, detail: 'full' };
      y += ROW_H;
    });
    y += 12;
  });
  return result;
}

function layoutKanban(dims, opts = {}) {
  const cols = STATUSES;
  const gap = opts.gap ?? 14;
  const addColW = opts.addColW ?? 120;
  const colW = (dims.w - addColW - gap * cols.length) / cols.length;
  const headH = 36;
  const cardH = opts.cardH ?? 72;
  const cardGap = 8;
  const result = { blocks: {}, decos: [] };
  cols.forEach((c, ci) => {
    const x = ci * (colW + gap);
    result.decos.push({ kind: 'col-head', id: `ch-${c}`, text: STATUS_LABEL[c], x, y: 0, w: colW, h: headH,
      count: BLOCKS.filter(b => b.status === c).length });
  });
  // Trailing "+ Add column" deco
  result.decos.push({
    kind: 'col-add', id: 'col-add',
    x: cols.length * (colW + gap), y: 0, w: addColW, h: headH,
  });
  cols.forEach((c, ci) => {
    const x = ci * (colW + gap);
    let y = headH + 4;
    BLOCKS.filter(b => b.status === c).forEach((b) => {
      result.blocks[b.id] = { x, y, w: colW, h: cardH, detail: 'full' };
      y += cardH + cardGap;
    });
  });
  return result;
}

function layoutCalendar(dims, opts = {}) {
  const gap = opts.gap ?? 8;
  const days = DAYS.length;
  const labelW = opts.labelW ?? 44;
  const colW = (dims.w - labelW - gap * (days - 1)) / days;
  const headH = 40;
  const hourStart = opts.hourStart ?? 7;
  const hourEnd = opts.hourEnd ?? 20; // 7am – 8pm = 13 hour rows
  const hours = hourEnd - hourStart;
  const hourH = opts.hourH ?? 44;
  const innerH = headH + hours * hourH + 8;

  const result = { blocks: {}, decos: [], innerH };

  // Day headers
  DAYS.forEach((d, di) => {
    const x = labelW + di * (colW + gap);
    result.decos.push({ kind: 'day-head', id: `dh-${d}`, text: d, num: di + 12, x, y: 0, w: colW, h: headH });
  });

  // Hour rail + hour rules
  for (let h = 0; h <= hours; h++) {
    const y = headH + h * hourH;
    result.decos.push({ kind: 'hour-label', id: `hl-${h}`, x: 0, y: y - 7, w: labelW - 6, h: 14, text: fmtHour(hourStart + h) });
    result.decos.push({ kind: 'hour-rule', id: `hr-${h}`, x: labelW - 4, y, w: dims.w - labelW + 4, h: 1 });
  }

  // Day cell backgrounds + vertical rules
  DAYS.forEach((d, di) => {
    const x = labelW + di * (colW + gap);
    result.decos.push({ kind: 'day-cell', id: `dc-${d}`, x, y: headH, w: colW, h: hours * hourH });
  });

  // Place blocks by time-of-day
  BLOCKS.forEach((b) => {
    const di = b.day;
    const x = labelW + di * (colW + gap) + 2;
    const yStart = headH + (b.startHour - hourStart) * hourH + 2;
    const h = b.durHours * hourH - 4;
    result.blocks[b.id] = { x, y: yStart, w: colW - 4, h: Math.max(24, h), detail: 'compact' };
  });
  return result;
}

function fmtHour(h) {
  const ampm = h < 12 ? 'AM' : 'PM';
  const hh = h === 0 ? 12 : h > 12 ? h - 12 : h;
  return `${hh}${ampm}`;
}

function layoutGantt(dims, opts = {}) {
  const days = DAYS.length;
  const labelW = opts.labelW ?? 96;
  const trackW = dims.w - labelW;
  const dayW = trackW / days;
  const headH = 32;
  const rowH = opts.rowH ?? 56;
  const result = { blocks: {}, decos: [] };
  // Day headers
  DAYS.forEach((d, di) => {
    result.decos.push({ kind: 'day-mark', id: `dm-${d}`, text: d, num: di + 12,
      x: labelW + di * dayW, y: 0, w: dayW, h: headH });
    result.decos.push({ kind: 'rule-v', id: `rv-${d}`, x: labelW + di * dayW, y: headH, w: 1, h: dims.h - headH });
  });
  // Project rows
  PROJECTS.forEach((p, pi) => {
    const y = headH + 8 + pi * rowH;
    result.decos.push({ kind: 'row-label', id: `rl-${p}`, text: p, x: 0, y, w: labelW, h: rowH });
    result.decos.push({ kind: 'rule-h', id: `rh-${p}`, x: 0, y: y + rowH - 4, w: dims.w, h: 1 });
  });
  // Blocks as bars
  BLOCKS.forEach((b) => {
    const pi = PROJECTS.indexOf(b.project);
    const y = headH + 8 + pi * rowH + 12;
    const x = labelW + b.day * dayW + 4;
    const w = Math.max(40, b.durDays * dayW - 8);
    result.blocks[b.id] = { x, y, w, h: rowH - 28, detail: 'bar' };
  });
  return result;
}

const LAYOUTS = {
  list: layoutList,
  kanban: layoutKanban,
  calendar: layoutCalendar,
  gantt: layoutGantt,
};

Object.assign(window, {
  BLOCKS, STATUSES, STATUS_LABEL, DAYS, PROJECTS, LAYOUTS,
  layoutList, layoutKanban, layoutCalendar, layoutGantt,
});
