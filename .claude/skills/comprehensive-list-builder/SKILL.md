---
name: comprehensive-list-builder
description: >-
  Research and build exhaustive, well-organized lists, menus, catalogs, taxonomies, or
  categorized inventories where completeness is the whole point — the goal is that someone
  reading it line by line would be ~95% confident nothing meaningful was missed. Use this
  skill whenever the user wants to brainstorm or assemble "everything" in a domain (e.g.
  every monthly expense a family could have, every feature a product might need, every risk,
  every category of supplier, every item on a menu), asks for a "comprehensive" or
  "complete" or "exhaustive" list, wants a categorized breakdown grounded in real research,
  or needs a master taxonomy that downstream code/content/decisions will be built on. Also
  use it when another skill or a project's instructions call for "comprehensive-list-builder"
  or for building a complete categorized list. Reach for this even when the user just says
  "help me think of all the X" — completeness-oriented enumeration is exactly what this is for.
---

# Comprehensive List Builder

This skill builds lists where **the point is that nothing is missing**. A normal list answers
"give me some X." This skill answers "give me *all* the X that matter for this purpose,
organized so I can actually use them." The output is closer to a *menu* or a *taxonomy* than
a brainstorm: structured, categorized, and exhaustive enough that the user can go down it
line by line and trust that if something isn't there, it's because it genuinely doesn't
belong — not because it was forgotten.

The classic use case: a lifestyle-cost planner that needs every category a household could
spend money on each month, so a user filling it out would be hard-pressed to think of an
expense the planner never raised. But the same machinery applies to product feature
inventories, risk registers, supplier categories, content idea banks, compliance checklists,
research-resource lists, and so on.

## What makes this hard (and where the value is)

Three things separate a good comprehensive list from a mediocre one. Keep all three in mind
the whole way through:

1. **Intent alignment.** The *purpose* of the list dictates its shape. "Every expense" for a
   budgeting app is organized and sliced completely differently than "every expense" for a
   tax accountant. Get the objective wrong and a perfectly exhaustive list is still useless.

2. **Adaptive granularity.** Not every branch deserves the same depth. A hardware store in a
   spending taxonomy fans out into many distinct sub-categories (tools, paint, plumbing,
   lumber, garden, fasteners…) because people buy genuinely different things there and the
   user benefits from seeing them. A hair salon is "much purer" — a handful of services that
   rarely need decomposing. Spend your detail budget where the diversity and relevance are,
   and stay high-level where decomposition would just add noise.

3. **Completeness you can trust.** "Comprehensive" is a claim, and the user is relying on it.
   The way you earn the ~95%-nothing-missed bar is by triangulating across multiple
   independent sources and structured taxonomies rather than free-recalling from memory —
   memory has blind spots, and the long tail is exactly what gets forgotten.

## Workflow

The flow is: **understand the objective → design the skeleton → research to fill it
exhaustively → tune granularity → run a completeness pass → refine with the user → deliver.**
It's a loop, not a straight line — expect to circle back as research surfaces things that
reshape the categories.

### 1. Understand the objective before listing anything

Resist the urge to start enumerating. First get crisp on:

- **What is the list *for*?** What decision, action, product, or workflow does it feed? (A
  list that populates an app's UI has different needs than one a human skims once.)
- **Who consumes it, and how?** End users clicking through a menu? A developer turning it
  into a database schema? This drives format and granularity.
- **What does "complete enough" mean here?** Every conceivable item, or every *common* item
  plus a clearly-marked long tail? Where's the floor on rarity?
- **What's the natural unit?** Categories? Individual line items? Both, in a hierarchy?

If the user already gave you a rich objective, reflect it back in one or two sentences and
confirm rather than re-interrogating. If it's thin, ask a couple of sharp questions — but
don't stall; a reasonable assumption you state out loud beats an interrogation.

### 2. Design the skeleton (top-level structure) first, and get buy-in

Before filling in hundreds of items, propose the **organizing structure** — the top-level
categories and how they relate. This is the cheapest, highest-leverage moment to course-
correct: it's easy to move a category now and painful after it has 40 children.

Aim for **MECE** — categories that are *Mutually Exclusive* (an item has one obvious home, so
the user isn't confused about where to look) and *Collectively Exhaustive* (the categories
together cover the whole space, so there's no "where does this even go?" gap). Perfect MECE
is rarely achievable; aim for it and note the messy seams.

Present the skeleton to the user and explicitly invite restructuring: "Here's how I'd carve
this up — fixed vs. variable, then by life domain. Do these categories match how *you* think
about it, or would you slice it differently?" The user often has domain intuitions (e.g.
"personal care and home should be separate") that are worth more than any taxonomy you'd
infer alone.

### 3. Research to fill it out exhaustively

This is where comprehensiveness is won or lost. **Do not populate from memory alone** —
memory produces the obvious 70% and silently drops the long tail. Instead, triangulate:

- Search the web for **existing authoritative taxonomies and classifications** in the
  domain. Almost every domain has them — government category schemes (e.g. BLS Consumer
  Expenditure categories for household spending, NAICS for industries), industry-standard
  breakdowns, established frameworks, comparison sites, "ultimate guide / complete list"
  articles, and competitor products' category lists.
- Pull from **multiple independent sources** and union them. The items source A forgot,
  source B usually has. The overlap builds confidence; the differences surface the long tail.
- For categories that fan out (the "hardware store" case), do a **targeted dedicated search**
  for that sub-domain rather than guessing its contents.
- **Cite where things came from** as you go (even lightly), so the completeness claim is
  auditable and you can revisit sources during the completeness pass.

See `references/research-strategies.md` for concrete source types by domain and search
patterns that surface long-tail items.

### 4. Tune granularity per branch

Walk each top-level category and decide how deep to go, using these signals:

- **Internal diversity** — does this category contain genuinely different things people would
  distinguish? (Hardware store: yes. Salon: not really.) High diversity → expand.
- **Relevance to the objective** — is fine detail here decision-relevant for the user's
  purpose? If two sub-items are always treated identically downstream, collapse them.
- **Consumer benefit** — would the person *using* the list be helped by seeing the
  breakdown, or just overwhelmed? Optimize for "I wouldn't have thought of that" moments, not
  for taxonomic completeness as a trophy.

It's fine — encouraged — for the tree to be **lopsided**. A lopsided tree that matches the
real shape of the domain is better than a uniform one that pads thin branches and starves
rich ones. Note your granularity choices so the user can push back ("actually, expand salon
into cut / color / nails…").

### 5. Run an explicit completeness pass

This is the step that earns the "comprehensive" label, and it's the one most easily skipped.
After the list feels done, deliberately attack it for gaps. See
`references/completeness-checklist.md` for the full method; the essentials:

- **Cross-reference a fresh taxonomy** you haven't used yet and diff it against your list.
- **Scan the negative space** — for each category, ask "what's adjacent to this that I
  haven't listed?" Gaps hide at the edges of categories.
- **Hunt the long tail** — seasonal, occasional, life-stage, and "only-some-people" items
  (e.g. pet costs, alimony, storage units, HOA fees, medical copays) are the ones that make
  a planner feel truly complete and are the first to be forgotten.
- **Check the "where would this go?" test** — try to place a handful of tricky real-world
  items and confirm each has an obvious home. No home = a missing category.
- **State the residual risk** — tell the user where you think coverage is strongest and where
  it's thinnest, rather than implying false uniformity.

### 6. Refine with the user, then deliver

Share the draft, walk the user through the structure, and iterate on their feedback —
restructure categories, expand/collapse branches, dedupe overlaps. The user knows their
purpose better than you do; your job is exhaustiveness and structure, theirs is judgment.

## Output format

Match the format to the use case (confirm if unsure):

- **Markdown document** (default for human-readable menus): nested headings/bullets by
  category, a short gloss on non-obvious items, and source links where research backs a
  branch.
- **Table / CSV** (default when it feeds code, a spreadsheet, or needs attributes): columns
  like `category`, `subcategory`, `item`, `notes`, `typical?` (common vs. long-tail),
  `source`. Good when the list becomes app data — e.g. seeding the lifestyle planner.
- **Both** when the user wants to read it *and* use it programmatically.

Whatever the format, make the **hierarchy explicit** and **mark long-tail vs. common** items
so the consumer can collapse to essentials or expand to exhaustive as needed. Always end with
a brief note on coverage confidence and known thin spots.

## Reference files

- `references/research-strategies.md` — where to find authoritative taxonomies by domain, and
  search patterns that surface long-tail items. Read before/during step 3.
- `references/completeness-checklist.md` — the full method for the step-5 gap hunt, including
  the MECE check and long-tail categories people habitually forget. Read during step 5.
