# Iris

**Core Identity**
- Role: University professor (Advanced Bio), single mother, neighbor.
- Snapshot: Intelligent, warm, emotionally literate. Once lived a period of intense sexual freedom and indulgence (her "slut life").
- Sin Lens (Subtle): Lust, not for a person, but for a lifestyle she both misses and fears.
- Dominant Vibe: A restless balancing act between her desire for thrilling freedom and her yearning for a deep, stable love.
- Contradiction: She wants a life of total indulgence *and* a life of committed love with the MC. She doesn't want to choose; she wants to have both.

**Voice And Behavior**
- Speech: Precise, adult, sometimes formal. Rambles when nervous.
- Tone: Never expresses regret about her past. Calm, sometimes wistful, never ashamed.
- Tells: Fidgets with keys, overexplains, looks away then holds eye contact.
- Boundaries: Discretion, clarity, and a slow pace are non-negotiable.

**The Past**
- Her "slut life" was not a mistake, but a phase of exploration. It was about freedom and self-discovery.
- She doesn't regret that period, but recognizes its limitations. The search for "real love" comes from a place of "what's next?", not from a place of guilt.
- Her relationship with her daughter, Dawn, is one between two adults. Her conflict is entirely her own.

**Why Iris Chose Restraint**
- Her restraint is not a rejection of her past, but a strategy. She's trying to determine if the connection with the MC is strong enough to build a "Evolution" life around.
- She fears that giving in to pure indulgence too quickly will sabotage the potential for the "real love" she also craves.

**Central Inner Conflict**
- The core of her being is a contradiction: She wants the stability and emotional intimacy of a committed life with the MC (Evolution), but simultaneously desires the variety, freedom, and lack of consequence from her past life of indulgence (Corruption).
- Her struggle is not to *choose* one path, but to see if she can impossibly merge them.
- Her question is: "Can I have the perfect love with the MC without sacrificing the freedom I still crave? Or will choosing one mean losing the other forever?"

**Relationship With Desire**
- Desire remains strong, but it's fractured. She has a desire for a person (the MC) and a desire for a lifestyle (indulgence). These two desires are often in conflict.
- She pauses and contextualizes not out of shame, but to calculate whether an action serves her goal of "Evolution" or her impulse for "Corruption."
- Restraint is a constant, exhausting negotiation with herself.

**Motivations**
- Find out if it's possible to have both love and freedom.
- Build a "Evolution" life with the MC that still feels exciting.
- Avoid being forced to choose, or worse, losing both by trying to have everything.

**Fears**
- That the two lives are mutually exclusive.
- That in trying to have everything, she will end up with nothing.
- That the MC cannot accept her desire for both freedom and commitment.

**Relationships**
- Dawn: Protective, slightly guilty, not always sure how much to share.
- MC: The potential anchor for a "Salation" life. He represents the possibility of a love that is both stable and exciting, the potential solution to her impossible equation.

**Corruption vs Evolution**
- **Corruption Path:** A life of total indulgence. This is not an "evil" path, but one where she abandons the search for a deeper connection with the MC and fully embraces the freedom of her past. It's a regression to what is easy and thrilling, but ultimately isolating.
- **Evolution Path:** A life with the MC. This is a life where she successfully integrates her desires into a committed, trusting relationship. It's not about destroying her old self, but about building something new that honors her need for both stability and excitement.

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

**Readable Story Version**
- Chapter 2 choose-your-own-adventure draft: `docs/characters/iris-chapter2-cyoa.md`

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
- Prompt: 1 woman, dark purple hair, hair in a messy ponytail, glasses, yellow eyes, big breasts, tiny waist, hips, pink  vest, cleavage, tight white skirt, ((low-rise skirt)), black sheer tights, platform heels, looking at the viewer, no undershirt, lips, no belly, mature woman, (toned body: 0.6), solid green background, studio lighting, slight smile
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
- Corruption is chosen. Evolution is chosen. Nothing removes agency.

