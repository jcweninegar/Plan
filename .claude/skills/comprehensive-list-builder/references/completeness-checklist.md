# The Completeness Pass

A list isn't comprehensive because it feels long — it's comprehensive because you actively
tried to break it and couldn't find much. This is the step that earns the "~95% nothing
missed" bar, and it's the one most easily skipped because the list already *looks* done. Do
it deliberately, as a separate pass, after you think you're finished.

## 1. Diff against a fresh taxonomy

Pull up at least one structured breakdown of the domain you did **not** use while building.
Go through it item by item and mark each as: already covered, newly added, or deliberately
excluded (and why). Anything that's "newly added" this late is proof the pass is working —
and a hint there may be more where it came from.

## 2. Scan the negative space, category by category

For each category, don't re-read what's *in* it — ask what's **adjacent to it that's
missing**. Gaps cluster at the edges of categories, not their centers. Useful prompts:

- "What's the rare/expensive/seasonal version of the items here?"
- "What's the opposite or complement of what's listed?"
- "If someone's situation were slightly different, what would they add here?"

## 3. Hunt the long tail explicitly

The obvious 70% takes care of itself. Comprehensiveness is decided in the remaining 30% —
the items that apply to *some* people, *some* of the time. They're the first forgotten and
the ones that make a user think "wow, it even thought of that." Deliberately probe for:

- **Occasional / seasonal** — annual fees, holidays, gifts, taxes, registrations, renewals.
- **Life-stage / situational** — childcare, eldercare, tuition, pet costs, alimony/child
  support, accessibility needs.
- **Easily-forgotten recurring** — subscriptions, app fees, storage units, HOA/strata fees,
  bank/card fees, tips/gratuities, parking, tolls, memberships.
- **Contingent / risk** — insurance deductibles, medical copays, repairs, emergencies.
- **"Only some people"** — hobbies, instruments, collections, professional dues, second
  homes, boats, niche health needs.

(The examples above are spending-flavored because that's the anchor use case — generalize the
*kinds* of long tail, not the specific items, to whatever domain you're in.)

## 4. The "where would this go?" test

Invent a handful of tricky-but-real items for the domain and try to file each one. Every item
should have **one obvious home**. Two failure modes to catch:

- **No home** → you're missing a category. Add it.
- **Multiple plausible homes** → your categories overlap (not mutually exclusive); tighten the
  boundary or merge, so a future user isn't confused about where to look or enters something
  twice.

## 5. MECE check

- **Mutually Exclusive:** scan for items that appear in (or could belong to) more than one
  category. Resolve so each has a canonical home.
- **Collectively Exhaustive:** is there any part of the domain no category covers? A common
  patch is a clearly-scoped "Other / miscellaneous" bucket — but use it as a deliberate catch-
  all, not as cover for laziness about a branch you should have built out.

## 6. State the residual risk honestly

Don't imply uniform confidence. Close by telling the user, briefly:

- Which areas are **well-covered** (multiple sources agreed, saturation reached).
- Which are **thinner** (single source, fast-moving, or niche) and might warrant a closer look.
- Any **deliberate exclusions** and the reasoning, so a gap that was a *choice* isn't mistaken
  for an oversight.

A calibrated "here's where I'm less sure" is far more useful — and more trustworthy — than a
blanket "this is everything."
