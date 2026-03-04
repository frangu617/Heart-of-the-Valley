# Iris Story Beats (Implemented)

## Scope
Covers Iris content currently implemented in code:
- Chapter 1 (events 1-6)
- Chapter 2 (events 1-5 + related random-loop fallout)
- Chapter 3 (events 1-2 + Dawn fallback/summon handoff logic)

## Chapter 1: First Contact to First Kiss

### 1) Coffee Collision (`iris_university_intro`)
1. On the player’s first day, Iris collides with him in the university hallway and spills coffee.
2. Flirty tension is immediate; she offers to make it up with coffee.
3. Player can accept or decline.
4. Outcome flags:
- `hasMetIris`
- `irisNeedsNewShirt`
- `irisCoffeeAccepted` or `irisCoffeeDeclined`

### 2) Cafe Follow-Up (`iris_coffee_meetup_event` or `iris_coffee_forced_meet_event`)
1. If accepted, they have a planned meetup and bond over work/life.
2. If declined, they still run into each other later at the cafe and reconnect.
3. Both routes converge on:
- `irisCoffeeMet`

### 3) Hallway Invite (`iris_hallway_invite_event`)
1. Iris invites the player into her apartment to meet Dawn.
2. Dawn is not home, creating private one-on-one tension with Iris.
3. Route tone splits here:
- Confident/forward tone sets `irisDomPath`
- Softer/flustered tone sets `irisSubPath`
4. Apartment access opens:
- `irisApartmentUnlocked`

### 4) Mall Bump (`iris_mall_bump_dom` / `iris_mall_bump_sub`)
1. They run into each other at the mall.
2. Dom path: Iris is playful, teasing, and intentional.
3. Sub path: Iris is flustered, shy, and vulnerable.
4. Both versions reinforce attraction and set up a more deliberate next step.

### 5) Chapter 1 Finale (`iris_chapter_1_finale_dom` / `iris_chapter_1_finale_sub`)
1. Late-night hallway confrontation/hesitation after drinks.
2. Strong branching based on player response.
3. Main turning-point outcome: first real kiss and emotional panic/retreat.
4. Chapter close flag:
- `irisCh1FinaleComplete`

## Chapter 2: Define Terms, Choose Public vs Private, Set the Date

### 1) The Morning After (`iris_ch2_ev1`)
1. Iris and player process the kiss.
2. Core question: what this is, and how to handle risk/discretion.
3. Dominance direction gets reinforced through choices.
4. Progress flag:
- `irisCh2Ev1_Done`

### 2) Public Encounter (`iris_ch2_ev2_sub/dom/neutral`)
1. Route-specific chance encounter outside strict work framing.
2. They continue negotiating chemistry vs caution.
3. Progress flag:
- `irisCh2Ev2_Done`

### 3) No More Hiding (`iris_ch2_ev3_sub/dom/neutral`)
1. Iris forces a direct decision about secrecy/public behavior.
2. Player chooses:
- Accept public openness (careful but not fake) -> `irisSchoolKissUnlocked`
- Refuse public escalation -> `irisPublicRefused`
3. Progress flag:
- `irisCh2Ev3_Done`

### 4) The Turning Point (`iris_ch2_ev4_*`)
1. Branches resolve fallout from Event 3 and set pre-date direction.
2. Accepted branches (sub/dom/balanced) generally lead to date lock-in:
- `irisDatePlanned`
3. Dom accepted additionally enables daily public kiss loop:
- `irisDomAcceptedKissLoopActive`
4. Dom denied starts unresolved tension loop:
- `irisDomDeniedKissLoopActive`
5. Event progress:
- `irisCh2Ev4_Done`

### 5) Dom-Denied Loop and Confrontation (Random Event Chain)
1. If dom-denied branch is active, Iris can be seen kissing others repeatedly:
- `irisDomDeniedSeen1` -> `irisDomDeniedSeen2` -> `irisDomDeniedSeen3`
2. Confrontation event forces a fork:
- Exclusive route -> `irisDomDeniedExclusive` + `irisDatePlanned`
- Explore/shared route -> `irisDomDeniedExplore` + `irisNtrSeeded` + `irisDatePlanned`

### 6) Nightclub Date at Velvet (`iris_ch2_ev5_sub/dom/neutral_date`)
1. Player meets Iris at Velvet for the planned date.
2. A younger Iris lookalike appears first at the bar (mystery girl seed).
3. Iris arrives; route-specific emotional/sexual dynamic plays out.
4. Chapter close flags:
- `irisCh2Complete`
- `metMysteryGirl`

## Chapter 3: Post-Date Realignment and Dawn Reveal Start

### 1) After Velvet (`iris_c3_ev1_*`)
1. Iris and player define the current relationship lane post-Ch2:
- Dom / Sub / Middle
2. If player kissed another girl, alternate “kissed other” openers trigger.
3. Player can keep current lane or attempt lane shifts.
4. Lane shifts are tested via argument/values “quiz” sequences (success/fail outcomes).
5. Chapter 3 setup flags:
- `irisCh3Ev1_Done`
- Origin flags: `irisC3PathOriginDom/Sub/Middle`
- Current/lock/shift flags: `irisC3PathCurrent*`, `irisC3PathLocked`, `irisC3PathShift*`

### 2) Unknown Voice (`iris_c3_ev2_dawn_callout`)
1. After a brief Iris interaction at university, the Velvet mystery girl confronts the player.
2. She demonstrates knowledge of his behavior and keeps control of the interaction.
3. She still withholds identity in this first callout.
4. Rewards/progress:
- `irisCh3Ev2_Done`
- `hasSeenDawn`
- Dawn unlock in roster (`unlockCharacters: ["Dawn"]`)

### 3) Fallback and Summon (Currently Wired Progression)
1. If player stalls after the callout, fallback flow can trigger:
- `dawnFallbackReady` -> `iris_c3_ev2_dawn_callout_fallback`
- then `dawnSummonQueued` / `dawnSummonQueuedTonight`
2. Summon auto-resolves at the nightclub via phone call dialogue:
- `iris_c3_ev2_dawn_summon_call`
3. At summon resolution, Dawn is explicitly revealed/unlocked as Dawn:
- `dawnSummonTriggered`
- `hasSeenDawn`
- `hasMetDawn`
- `metDawn`

## Current Story Endpoint
Current implemented Iris line is at the Dawn handoff stage in Chapter 3:
1. Iris Chapter 3 Event 1 complete (lane defined and optionally shifted).
2. Mystery-girl callout complete.
3. Dawn escalation/fallback/summon hooks are implemented and can push the story into Dawn-facing content.
