# Iris

**Core Identity**
- Role: University professor (Advanced Bio), single mother, neighbor.
- Snapshot: Intelligent, warm, emotionally literate. Once lived a period of intense sexual freedom and indulgence.
- Sin Lens (Subtle): Lust as a pull toward intimacy she keeps trying to make careful and real.
- Dominant Vibe: Thoughtful restraint, desire versus responsibility.
- Contradiction: Wants to be chosen, fears gossip and fallout.

**Voice And Behavior**
- Speech: Precise, adult, sometimes formal. Rambles when nervous.
- Tone: Never expresses regret about her past. Calm, sometimes wistful, never ashamed.
- Tells: Fidgets with keys, overexplains, looks away then holds eye contact.
- Boundaries: Discretion, clarity, and a slow pace are non-negotiable.

**Motherhood**
- Motherhood was not a calling. It arrived as a fact, not an identity.
- She did not regret her past; she stopped centering it to avoid deciding Dawn's life by proximity.
- Editing herself was an act of care, not guilt.

**Why Iris Chose Restraint**
- Not because her past was wrong.
- Because she believes parents influence children even when they are silent.
- She chose to edit herself rather than endorse, warn, or model.

**Central Inner Conflict**
- Not moral, but existential.
- She misses being unfiltered and wanting without translating desire into consequences.
- Her question is not "Should I want this?" but "Am I allowed to want this without shaping someone else's life?"

**Relationship With Desire**
- Desire remains strong; the friction around it has increased.
- She pauses and contextualizes more, out of responsibility, not shame.
- Restraint is effortful and felt.

**Motivations**
- Keep her job and sanity.
- Protect Dawn.
- Find something honest that does not feel like a mistake.

**Fears**
- Gossip and exposure.
- Losing control or becoming reckless.
- Letting Dawn down.

**Relationships**
- Dawn: Protective, slightly guilty, not always sure how much to share.
- MC: Does not awaken anything new; he reminds her of what she already is. With him she feels like a woman again, not a signal.

**Corruption vs Salvation**
- Corruption Path: The MC validates her nostalgia and frames her past as truer. She chooses indulgence freely, becoming more visible, more secretive, more alive. The cost comes later through influence rather than collapse.
- Salvation Path: The MC validates her desire without pushing regression. She learns she can be visible without becoming a template. Restraint becomes conscious rather than burdensome.

**Agency And Influence (Important Rule)**
- Iris is never compelled. Pressure exists but is resistible.
- When she gives in, it is because she wants to, not because she must.
- Her choices matter.

**Story Outline**
**Chapter 1 (Implemented)**
1. Coffee spill meet-cute in the university hallway.
2. Cafe repair and flirtation, hints of warmth under her professionalism.
3. Apartment invite, Dawn introduced, tension rises.
4. Late-night hallway confession and first kiss.
**Chapter 2 (Target Sequence)**
1. Morning-after clarity talk, boundaries set.
2. Public encounters reinforce discretion and choice.
3. No more hiding: define whether you move forward or pull back in public.
4. Pre-date convergence beat (new): route-specific fallout and recommitment before the date.
5. Nightclub date and the mystery girl sighting raise stakes.

**Current Implementation Status (2026-02-13)**
- Completed in code:
- Chapter 1 Iris chain is implemented (event1 through event6).
- Chapter 2 Event 1 (`The Morning After`) is implemented.
- Chapter 2 Event 2 (`Public Encounter`) is implemented.
- Chapter 2 Event 3 (`No More Hiding`) is implemented.
- Chapter 2 Event 4 (`The Turning Point`) is implemented with route branches.
- Chapter 2 Event 5 (`The Nightclub Date`) is reindexed and implemented in `src/data/events/chapter2/iris/event5.ts`.
- Date planning moved out of Event 3 and into Event 4 branch outcomes.
- Dom accepted daily kiss loop is implemented with once-per-day cap.
- Dom denied loop is implemented with lust-weighted chance, 3-seen gating, confrontation, and exclusive/explore split.
- Random event engine supports:
- per-event daily trigger cap
- required character presence at location
- girl-stat-based probability scaling
- girl stat min/max gating
- random dialogue choice flag/stat persistence
- Still pending:
- Later chapter content that consumes `irisNtrSeeded` as a full downstream route.

**Chapter 2 Event 4 Spec (Before Nightclub Date)**
- Goal:
- Resolve emotional fallout from Event 3 and set up the date in a route-consistent way.
- Route key:
- `sub`: dominance band `<= -10`.
- `balanced`: dominance band `-9..9`.
- `dom`: dominance band `>= 10`.
- `accepted`: `irisSchoolKissUnlocked` is set.
- `denied`: `irisPublicRefused` is set.
- Base gate:
- Every Event 4 branch requires `irisCh2Ev3_Done` and blocks on `irisCh2Complete`.

**Event 4 Branch Events**
1. `iris_ch2_ev4_sub_accepted`
- Conditions: `irisCh2Ev3_Done`, `irisSchoolKissUnlocked`, `dominance <= -10`, blocked by `irisDatePlanned`.
- Priority: `160`.
- Tone: Iris is visibly happier and more attached (not clingy, still in-character).
- Outcome flags: `irisCh2Ev4_Done`, `irisDatePlanned`.
2. `iris_ch2_ev4_sub_denied`
- Conditions: `irisCh2Ev3_Done`, `irisPublicRefused`, `dominance <= -10`, blocked by `irisDatePlanned`.
- Priority: `160`.
- Tone: she asks for another chance and proposes a date without sounding dramatic or desperate.
- Outcome flags: `irisCh2Ev4_Done`, `irisDatePlanned`.
3. `iris_ch2_ev4_dom_accepted`
- Conditions: `irisCh2Ev3_Done`, `irisSchoolKissUnlocked`, `dominance >= 10`, blocked by `irisDatePlanned`.
- Priority: `160`.
- Tone: she calls out that you skipped the date phase and demands a real date now.
- Outcome flags: `irisCh2Ev4_Done`, `irisDatePlanned`, `irisDomAcceptedKissLoopActive`.
4. `iris_ch2_ev4_dom_denied_start`
- Conditions: `irisCh2Ev3_Done`, `irisPublicRefused`, `dominance >= 10`, blocked by `irisDatePlanned`.
- Priority: `160`.
- Tone: controlled frustration; the kiss re-opened a part of her she had shut down.
- Outcome flags: `irisCh2Ev4_Done`, `irisDomDeniedKissLoopActive`.
- Does not set `irisDatePlanned` yet.
5. `iris_ch2_ev4_balanced_accepted`
- Conditions: `irisCh2Ev3_Done`, `irisSchoolKissUnlocked`, `dominance -9..9`, blocked by `irisDatePlanned`.
- Priority: `161`.
- Tone: mature and steady; both agree on a proper date without pressure.
- Outcome flags: `irisCh2Ev4_Done`, `irisDatePlanned`.
6. `iris_ch2_ev4_balanced_denied`
- Conditions: `irisCh2Ev3_Done`, `irisPublicRefused`, `dominance -9..9`, blocked by `irisDatePlanned`.
- Priority: `161`.
- Tone: respectful reset after denial; recommit through a clear date plan.
- Outcome flags: `irisCh2Ev4_Done`, `irisDatePlanned`.
7. `iris_ch2_ev4_dom_denied_confront`
- Conditions:
- `irisDomDeniedKissLoopActive`
- `irisDomDeniedSeen3`
- `minAffection: 18`
- `minLust: 20`
- blocked by `irisDatePlanned`
- Priority: `158`.
- Trigger style: when player and Iris share a location and interact (same-place requirement).
- Choice A (exclusive): set `irisDomDeniedExclusive`, set `irisDatePlanned`.
- Choice B (explore): set `irisDomDeniedExplore`, `irisNtrSeeded`, set `irisDatePlanned`.

**Random Event Spec For Route 3 and 4**
1. Dom accepted daily kiss loop (`irisDomAcceptedKissLoopActive`)
- Event id: `iris_dom_accepted_daily_kiss`.
- Frequency target: at most once per in-game day.
- Behavior: Iris steals a kiss in public spaces, even when the player does not initiate.
2. Dom denied "kissing others" loop (`irisDomDeniedKissLoopActive`)
- Event ids: `iris_dom_denied_kiss_other_1`, `_2`, `_3` with sequential gates:
- `_1` sets `irisDomDeniedSeen1`
- `_2` requires `irisDomDeniedSeen1`, sets `irisDomDeniedSeen2`
- `_3` requires `irisDomDeniedSeen2`, sets `irisDomDeniedSeen3`
- Chance model: lust-weighted (higher Iris lust = higher trigger chance).
3. Post-confrontation behavior split
- If `irisDomDeniedExclusive`: disable "kiss others" events, allow player-only random kiss moments.
- If `irisDomDeniedExplore`: keep "kiss others" events, add player-included kiss variants, keep NTR lane available later.

**Flag Spec**
- Reuse existing:
- `irisCh2Ev3_Done`
- `irisSchoolKissUnlocked`
- `irisPublicRefused`
- `irisDatePlanned`
- `irisSubPath`
- `irisDomPath`
- `irisCh2Complete`
- Add new:
- `irisCh2Ev4_Done`
- `irisDomAcceptedKissLoopActive`
- `irisDomDeniedKissLoopActive`
- `irisDomDeniedSeen1`
- `irisDomDeniedSeen2`
- `irisDomDeniedSeen3`
- `irisDomDeniedExclusive`
- `irisDomDeniedExplore`
- `irisNtrSeeded`

**Required Engine Work (Before Full Implementation)**
- Implemented: random event choice-level flag/stat persistence.
- Implemented: per-event max triggers per day.
- Implemented: girl-stat weighted random chance and girl-stat gating.
- Implemented: Event 3 no longer sets `irisDatePlanned`; Event 4 stage now owns date setup.
- Implemented: neutral Event 3 accept now explicitly sets `irisSchoolKissUnlocked`.

**Implementation Checklist**
- [x] Chapter 2 Event 1 implemented.
- [x] Chapter 2 Event 2 implemented.
- [x] Chapter 2 Event 3 implemented.
- [x] Add new Chapter 2 Event 4 branch file(s) before nightclub date.
- [x] Move date-planning responsibility from Event 3 to Event 4 branches.
- [x] Add new Iris Chapter 2 flags to `GameplayFlag`.
- [x] Implement dom-accepted once-per-day kiss loop.
- [x] Implement dom-denied lust-weighted kiss-others loop and 3-seen gating.
- [x] Implement dom-denied confrontation choice (exclusive vs explore).
- [x] Rename/reindex Chapter 2 Iris files so date is explicitly Event 5.
- [ ] Hook `irisNtrSeeded` into later chapter-specific NTR/non-NTR story events.

**Stable Diffusion**
- Prompt: one woman, ((she is slender)), (( she has a slim body)), ((big breasts)), purple hair, ponytail, amber eyes, glasses, messy hair, woman has a tired look, woman has a tiny waist, mature woman, chroma key green background, college professor outfit, conservative outfit, full body, wide hips, chroma key green background, holding a cup of coffee, white skirt or pants, pink top
- Steps: 40
- Sampler: DPM++ 2M SDE
- Schedule type: Karras
- CFG scale: 3
- Seed: 4121422315
- Size: 768x1344
- Model hash: ae1a6067cb
- Model: novaCartoonXL_v40
- Style Selector Enabled: True
- Style Selector Randomize: False
- Style Selector Style: base
- ADetailer model: face_yolov8n.pt
- ADetailer prompt: biting her lower lip
- ADetailer confidence: 0.3
- ADetailer dilate erode: 4
- ADetailer mask blur: 4
- ADetailer denoising strength: 0.4
- ADetailer inpaint only masked: True
- ADetailer inpaint padding: 32
- ADetailer version: 25.3.0
- Version: f2.0.1v1.10.1-previous-669-gdfdcbab6
- Module 1: sdxl_vae
**Global Design Rule**
- All characters act freely. Pressure exists, but it can always be resisted.
- Corruption is chosen. Salvation is chosen. Nothing removes agency.
