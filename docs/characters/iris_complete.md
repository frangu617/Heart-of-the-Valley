# Iris Complete Bible + Story So Far

## Core Identity
- Role: University professor (Advanced Bio), single mother, neighbor.
- Snapshot: Intelligent, warm, emotionally literate. Once lived a period of intense sexual freedom and indulgence.
- Sin Lens (Subtle): Lust as a pull toward intimacy she keeps trying to make careful and real.
- Dominant Vibe: Thoughtful restraint, desire versus responsibility.
- Contradiction: Wants to be chosen, fears gossip and fallout.

## Voice And Behavior
- Speech: Precise, adult, sometimes formal. Rambles when nervous.
- Tone: Never expresses regret about her past. Calm, sometimes wistful, never ashamed.
- Tells: Fidgets with keys, overexplains, looks away then holds eye contact.
- Boundaries: Discretion, clarity, and a slow pace are non-negotiable.

## Motherhood
- Motherhood was not a calling. It arrived as a fact, not an identity.
- She did not regret her past; she stopped centering it to avoid deciding Dawn's life by proximity.
- Editing herself was an act of care, not guilt.

## Why Iris Chose Restraint
- Not because her past was wrong.
- Because she believes parents influence children even when they are silent.
- She chose to edit herself rather than endorse, warn, or model.

## Central Inner Conflict
- Not moral, but existential.
- She misses being unfiltered and wanting without translating desire into consequences.
- Her question is not "Should I want this?" but "Am I allowed to want this without shaping someone else's life?"

## Relationship With Desire
- Desire remains strong; the friction around it has increased.
- She pauses and contextualizes more, out of responsibility, not shame.
- Restraint is effortful and felt.

## Motivations
- Keep her job and sanity.
- Protect Dawn.
- Find something honest that does not feel like a mistake.

## Fears
- Gossip and exposure.
- Losing control or becoming reckless.
- Letting Dawn down.

## Relationships
- Dawn: Protective, slightly guilty, not always sure how much to share.
- MC: Does not awaken anything new; he reminds her of what she already is. With him she feels like a woman again, not a signal.

## Corruption vs Salvation
- Corruption Path: The MC validates her nostalgia and frames her past as truer. She chooses indulgence freely, becoming more visible, more secretive, more alive. The cost comes later through influence rather than collapse.
- Salvation Path: The MC validates her desire without pushing regression. She learns she can be visible without becoming a template. Restraint becomes conscious rather than burdensome.

## Agency Rule
- Iris is never compelled. Pressure exists but is resistible.
- When she gives in, it is because she wants to, not because she must.
- Her choices matter.

## Story So Far (Implemented Canon)

### Chapter 1
1. Coffee Collision (`iris_university_intro`):
- Iris spills coffee on the MC in the university hallway.
- First tone set: competent but flustered, warm but guarded.

2. Coffee Meetup (`iris_coffee_meetup_event`) or Unexpected Cafe Run-In (`iris_coffee_forced_meet_event`):
- If accepted, chemistry builds in a planned cafe follow-up.
- If declined, fate still forces a second encounter and keeps the thread alive.

3. Hallway Invite (`iris_hallway_invite_event`):
- Iris invites the MC inside and introduces Dawn.
- Private attraction begins colliding with public/family consequences.

4. Mall Bump:
- `iris_mall_bump_dom` (Confident Iris) or `iris_mall_bump_sub` (Shy Iris).
- Route tone clarifies while attraction deepens.

5. Chapter 1 Finale:
- `iris_chapter_1_finale_dom` or `iris_chapter_1_finale_sub`.
- Late-night hallway confrontation/confession resolves into first-kiss territory and launches Chapter 2 emotional fallout.

### Chapter 2
1. The Morning After (`iris_ch2_ev1`):
- First contact after the kiss.
- Recalibration beat: attraction remains, but discretion and consequences are explicitly discussed.

2. Public Encounter (`iris_ch2_ev2_sub`, `iris_ch2_ev2_dom`, `iris_ch2_ev2_neutral`):
- They run into each other outside formal spaces.
- Stakes shift from private tension to being seen.

3. No More Hiding (`iris_ch2_ev3_sub`, `iris_ch2_ev3_dom`, `iris_ch2_ev3_neutral`):
- Iris pushes a direct decision about secrecy at school.
- Accept path unlocks public school kiss behavior (`irisSchoolKissUnlocked`).
- Deny path records refusal (`irisPublicRefused`).

4. The Turning Point (pre-date convergence):
- `iris_ch2_ev4_sub_accepted`
- `iris_ch2_ev4_sub_denied`
- `iris_ch2_ev4_dom_accepted`
- `iris_ch2_ev4_dom_denied_start`
- `iris_ch2_ev4_balanced_accepted`
- `iris_ch2_ev4_balanced_denied`

Outcome logic:
- Most branches set `irisDatePlanned` and move directly to date setup.
- Dom denied starts unresolved loop (`irisDomDeniedKissLoopActive`) before date lock.
- Confrontation event (`iris_ch2_ev4_dom_denied_confront`) later forces:
- Exclusive recommit (`irisDomDeniedExclusive`)
- Explore/open lane (`irisDomDeniedExplore`, seeds `irisNtrSeeded`)

5. The Nightclub Date:
- `iris_ch2_ev5_sub_date`
- `iris_ch2_ev5_dom_date`
- `iris_ch2_ev5_neutral_date`
- Date executes with route flavor and includes mystery-girl pressure that raises Dawn-thread stakes.

## Dynamic Follow-Up Systems Already Live
- Dom accepted public kiss loop: `irisDomAcceptedKissLoopActive`, once-per-day random kiss behavior.
- Dom denied "kissing others" loop: sequential random events (`irisDomDeniedSeen1/2/3`) with lust-weighted triggering.
- Post-confrontation behavior split:
- Exclusive: disables "kiss others" style behavior.
- Explore: keeps exploratory lane active and preserves downstream NTR branch potential.

## Open Threads (Not Fully Written Yet)
- Full downstream consumption of `irisNtrSeeded` in later chapter-specific story content.
- Dawn/Iris endgame escalation payoff beyond current Chapter 2 date content.

## Stable Diffusion
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

## Global Design Rule
- All characters act freely. Pressure exists, but it can always be resisted.
- Corruption is chosen. Salvation is chosen. Nothing removes agency.

## Full Story Script (Verbatim From Implemented Events)
This section contains the full implemented Iris story scripts exactly as written in event files, including route branches, choices, and dialogue lines.

### src\data\events\chapter1\iris\event1.ts
```ts
import type { Dialogue } from "../../../dialogues";
import { CharacterEvent } from "../../types";

// Event 1: Coffee Collision
// Description: Iris spills coffee on you in the university hallway.

const irisIntroStayStill: Dialogue = {
  id: "iris_intro_stay_still",
  lines: [
    {
      speaker: null,
      text: "She drops to one knee to scoop up your papers. Her pink blouse pulls tight across her chest as she leans forward, buttons straining, black lace bra briefly visible. The short white skirt rides up her thighs, fishnets stretching as she reaches.",
    },
    {
      speaker: null,
      text: "She tilts her head back to look up at you, amber eyes locking onto yours through her glasses, lips parted slightly.",
    },
    {
      speaker: null,
      text: "Jesus Christ. Coffee's burning my skin and all I can think about is how those tits look like they'd overflow my hands. Focus, idiot.",
    },
    { speaker: "You", text: "Nah, I'm okay. Just... really fucking hot coffee." },
    {
      speaker: null,
      text: "First day and I'm drenched, hard as a rock already, and staring at the hottest woman I've seen since I moved here. Great job, me.",
    },
    {
      speaker: "Iris",
      text: "I'm Iris, by the way--I teach Advanced Bio here. I was nose-deep in my book and didn't see you coming. I feel terrible about this shirt.",
      expression: "neutral",
    },
    {
      speaker: null,
      text: "She reaches out, fingers splaying across the wet patch on your chest, checking the damage.",
    },
    {
      speaker: "Iris",
      text: "This one's toast now. It did fit you well.",
      expression: "neutral",
    },
    {
      speaker: null,
      text: "She pulls her hand away quickly, expression apologetic.",
    },
    { speaker: "You", text: "It'll wash. Probably. Maybe." },
    {
      speaker: "Iris",
      text: "Still, I owe you. What's your name? I should at least know who I just marked with my coffee.",
      expression: "happy",
    },
    {
      speaker: "You",
      text: "I'm {playerName}. New instructor. Apparently christened with caffeine on day one.",
    },
    {
      speaker: "Iris",
      text: "First day? That's brutal. I basically ruined your big debut.",
      expression: "surprised",
    },
    {
      speaker: "Iris",
      text: "Let me fix it. There's a great little cafe off campus--I'll buy you a fresh one, no more wardrobe casualties. Deal?",
      expression: "happy",
    },
    {
      speaker: "You",
      text: "What do you say?",
      choices: [
        {
          text: "Yeah, that sounds good",
          affectionChange: 1,
          nextDialogueId: "iris_intro_stay_accept",
        },
        {
          text: "Maybe another time",
          affectionChange: 0,
          nextDialogueId: "iris_intro_stay_decline",
        },
      ],
    },
  ],
};

const irisIntroStayAccept: Dialogue = {
  id: "iris_intro_stay_accept",
  lines: [
    {
      speaker: null,
      text: "She's offering coffee and bending over backward--literally. I'd be an idiot to say no to more time staring at that body.",
    },
    {
      speaker: "You",
      text: "You know what? Yeah. I could use something hot that isn't currently glued to my nipples.",
    },
    {
      speaker: "Iris",
      text: "Perfect! Give me your number so we don't lose each other.",
      expression: "happy",
    },
    {
      speaker: null,
      text: "She pulls out her phone, smile warm and a little embarrassed.",
    },
    { speaker: "You", text: "Tomorrow? I should be dry by then." },
    {
      speaker: "Iris",
      text: "Tomorrow works great. I'll text you the spot.",
      expression: "happy",
    },
    {
      speaker: null,
      text: "You swap numbers and head off to class, still smelling like coffee.",
    },
    {
      speaker: null,
      text: "Shirt's fucked, dick's half-hard, and I just met the hottest disaster in my life. I should head to the mall for a new shirt.",
      choices: [
        {
          text: "Head to class",
          affectionChange: 0,
          setFlags: ["irisCoffeeAccepted"],
        },
      ],
    },
  ],
};

const irisIntroStayDecline: Dialogue = {
  id: "iris_intro_stay_decline",
  lines: [
    {
      speaker: "You",
      text: "Appreciate it, but I'm still trying to figure out where the hell everything is.",
    },
    {
      speaker: "Iris",
      text: "Totally get it. No rush.",
      expression: "neutral",
    },
    {
      speaker: "Iris",
      text: "But the offer's always open. Bio wing, room 304--if you need a map, a book, or just... company.",
      expression: "neutral",
    },
    { speaker: "You", text: "Thanks. I'll remember." },
    {
      speaker: null,
      text: "Shirt's fucked, dick's half-hard, and I just met the hottest disaster in my life. I should head to the mall for a new shirt.",
      choices: [
        {
          text: "Head to class",
          affectionChange: 0,
          setFlags: ["irisCoffeeDeclined"],
        },
      ],
    },
  ],
};

const irisIntroStepBack: Dialogue = {
  id: "iris_intro_step_back",
  lines: [
    { speaker: null, text: "You pull your arm away. Her hand drops without fuss." },
    {
      speaker: null,
      text: "She bends to grab the papers, skirt riding high on thick thighs, fishnets digging into soft flesh.",
    },
    {
      speaker: null,
      text: "Coffee all over me and now this view. Fuck my life.",
    },
    { speaker: "You", text: "It's fine. Just coffee." },
    {
      speaker: "Iris",
      text: "I'm Iris--I teach Advanced Bio here. Still, I hate that I soaked you on your first day. That shirt fit you well.",
      expression: "neutral",
    },
    {
      speaker: null,
      text: "Her eyes flick to the wet stain, then back to your face.",
    },
    { speaker: "You", text: "{playerName}. New here." },
    {
      speaker: "Iris",
      text: "Well, welcome to the circus, {playerName}. If you ever want a coffee that stays where it belongs, cafe's close. I'd love to make this right.",
      expression: "happy",
    },
    {
      speaker: "You",
      text: "What do you say?",
      choices: [
        {
          text: "Yeah, I'd like that",
          affectionChange: 1,
          nextDialogueId: "iris_intro_step_accept",
        },
        {
          text: "Maybe another time",
          affectionChange: 0,
          nextDialogueId: "iris_intro_step_decline",
        },
        {
          text: "Not right now",
          affectionChange: 0,
          nextDialogueId: "iris_intro_step_not_now",
        },
      ],
    },
  ],
};

const irisIntroStepAccept: Dialogue = {
  id: "iris_intro_step_accept",
  lines: [
    {
      speaker: null,
      text: "She's offering coffee and looking at me like that. Brain says run, dick says stay. Fuck it.",
    },
    {
      speaker: "You",
      text: "You know what? Yeah... yeah, that actually sounds really good right now.",
    },
    {
      speaker: "You",
      text: "I mean, after this mess, I could use something warm that isn't burning holes in my shirt.",
    },
    {
      speaker: "Iris",
      text: "See? I knew you'd come around.",
      expression: "happy",
    },
    {
      speaker: null,
      text: "She laughs softly, the sound low and warm, then tilts her head, studying you with those amber eyes.",
    },
    {
      speaker: "Iris",
      text: "You still look a little dazed. Coffee shock, maybe?",
      expression: "happy",
    },
    {
      speaker: null,
      text: "She lets the question hang with a small smile, waiting for your answer.",
    },
    { speaker: null, text: "Busted. Great." },
    { speaker: "You", text: "Definitely the coffee. Mostly." },
    { speaker: "Iris", text: "Uh-huh. Sure it is.", expression: "happy" },
    {
      speaker: null,
      text: "She gives a quick, playful smile, then pulls her phone from her pocket.",
    },
    {
      speaker: "Iris",
      text: "Here--put your number in so we don't lose each other. I don't want you escaping before I can buy you that replacement coffee.",
      expression: "happy",
    },
    {
      speaker: null,
      text: "She holds the phone out to you, screen already open to contacts.",
    },
    { speaker: null, text: "You type it in and hand the phone back." },
    { speaker: "Iris", text: "Perfect.", expression: "happy" },
    {
      speaker: null,
      text: "She taps a few times, and your phone buzzes almost instantly with a text: Iris - don't forget tomorrow. And sorry again about the shirt.",
    },
    {
      speaker: "Iris",
      text: "There. Now you've got mine too. I'll text you the cafe details tonight.",
      expression: "happy",
    },
    {
      speaker: null,
      text: "She pockets her phone, smile lingering like she knows exactly how much she's thrown you off balance.",
    },
    { speaker: "You", text: "Got it. Tomorrow then." },
    {
      speaker: null,
      text: "Shirt's fucked, dick's half-hard, and I just met the hottest disaster in my life. I should head to the mall for a new shirt.",
      choices: [
        {
          text: "Head to class",
          affectionChange: 0,
          setFlags: ["irisCoffeeAccepted"],
        },
      ],
    },
  ],
};

const irisIntroStepDecline: Dialogue = {
  id: "iris_intro_step_decline",
  lines: [
    {
      speaker: "You",
      text: "Appreciate it, but I'm still trying to figure out where the hell everything is.",
    },
    {
      speaker: "Iris",
      text: "Totally get it. No rush.",
      expression: "neutral",
    },
    {
      speaker: "Iris",
      text: "But the offer's always open. Bio wing, room 304--if you need a map, a book, or just... company.",
      expression: "neutral",
    },
    { speaker: "You", text: "Thanks. I'll remember." },
    {
      speaker: null,
      text: "Shirt's fucked, dick's half-hard, and I just met the hottest disaster in my life. I should head to the mall for a new shirt.",
      choices: [
        {
          text: "Head to class",
          affectionChange: 0,
          setFlags: ["irisCoffeeDeclined"],
        },
      ],
    },
  ],
};

const irisIntroStepNotNow: Dialogue = {
  id: "iris_intro_step_not_now",
  lines: [
    { speaker: "You", text: "Thanks, but I'm swamped getting my shit together." },
    { speaker: "Iris", text: "No problem at all.", expression: "neutral" },
    {
      speaker: "Iris",
      text: "But if you change your mind, Bio wing, room 304. Door's open.",
      expression: "neutral",
    },
    { speaker: "You", text: "Got it." },
    {
      speaker: null,
      text: "Shirt's fucked, dick's half-hard, and I just met the hottest disaster in my life. I should head to the mall for a new shirt.",
      choices: [
        {
          text: "Head to class",
          affectionChange: 0,
          setFlags: ["irisCoffeeDeclined"],
        },
      ],
    },
  ],
};

export const irisEvent1Dialogues: Record<string, Dialogue> = {
  iris_intro_stay_still: irisIntroStayStill,
  iris_intro_stay_accept: irisIntroStayAccept,
  iris_intro_stay_decline: irisIntroStayDecline,
  iris_intro_step_back: irisIntroStepBack,
  iris_intro_step_accept: irisIntroStepAccept,
  iris_intro_step_decline: irisIntroStepDecline,
  iris_intro_step_not_now: irisIntroStepNotNow,
};

export const irisEvent1Events: CharacterEvent[] = [
  {
    id: "iris_university_intro",
    name: "Coffee Collision",
    description: "Iris spills coffee on you in the university hallway.",
    quest: {
      title: "Go to work at the university",
      description: "Head to the University Hallway to start your first day.",
    },
    priority: 300,
    repeatable: false,
    conditions: {
      minAffection: 0,
      minHour: 0,
      maxHour: 24,
      requiredLocation: "University Hallway",
    },
    dialogue: {
      id: "iris_university_intro",
      lines: [
        {
          speaker: null,
          text: "The hallway throbs with morning chaos--students shoving past, lockers banging, the whole place smelling like cheap body spray and desperation.",
        },
        {
          speaker: "You",
          text: "Late on the first damn day. Perfect. This campus hates me already.",
          isThought: true,
        },
        {
          speaker: null,
          text: "You wrestle a wrinkled map and a stack of syllabi that's one bump from disaster, trying to carve a path through the crowd.",
        },
        { speaker: null, text: "You whip around the corner--" },
        { speaker: "You", text: "Oh, for fuck's sake!" },
        {
          speaker: null,
          text: "Scalding coffee explodes across your chest, soaking through the fabric in seconds. Papers flutter everywhere like they're trying to escape you.",
        },
        {
          speaker: "Iris",
          text: "Oh my god, I am so sorry! Are you alright? Did it burn you?",
          expression: "surprised",
        },
        {
          speaker: null,
          text: "Her hand clamps onto your forearm--warm, firm, fingers curling like she owns the contact.",
        },
        {
          speaker: "You",
          text: "How do you react?",
          choices: [
            {
              text: "Let it linger",
              affectionChange: 2,
              nextDialogueId: "iris_intro_stay_still",
            },
            {
              text: "Step back",
              affectionChange: 0,
              nextDialogueId: "iris_intro_step_back",
            },
          ],
        },
      ],
    },
    rewards: {
      setFlags: ["hasMetIris", "irisNeedsNewShirt"],
    },
  },
];

```

### src\data\events\chapter1\iris\event2.ts
```ts
import type { Dialogue } from "../../../dialogues";
import { CharacterEvent } from "../../types";

// Event 2: Coffee Meetup
// Description: Meet Iris at the cafe after accepting her offer.

const irisIntroCoffeeDate: Dialogue = {
  id: "iris_intro_coffee_yes",
  lines: [
    {
      speaker: null,
      text: "You walk together to the nearby cafe. The morning air is crisp and refreshing.",
      imageSlide: "/images/locations/cafe/morning.png",
    },
    {
      speaker: "Iris",
      text: "I... I'm glad you agreed to come with me.",
      expression: "happy",
    },
    {
      speaker: null,
      text: "You both order coffee and find a quiet corner table.",
    },
    {
      speaker: "Iris",
      text: "You know, {playerName}... we've worked together for a while now, but we rarely talk outside of work.",
      expression: "neutral",
    },
    {
      speaker: "You",
      text: "You're right. We should do this more often.",
    },
    {
      speaker: "Iris",
      text: "I'd... I'd like that very much.",
      expression: "love",
    },
    {
      speaker: null,
      text: "You spend a pleasant hour talking about books, teaching, and life. The conversation flows naturally.",
    },
    {
      speaker: "Iris",
      text: "Thank you for this, {playerName}. It means a lot to me.",
      expression: "happy",
    },
    {
      speaker: null,
      text: "As you finish your coffee, you feel like this was the start of something special.",
    },
  ],
};

const irisRegularCoffeeDate: Dialogue = {
  id: "iris_regular_coffee",
  lines: [
    {
      speaker: null,
      text: "You walk together to the nearby cafe.",
      imageSlide: "/images/locations/cafe/morning.png",
    },
    {
      speaker: null,
      text: "You enjoy a cup of coffee together",
      imageSlide: "/images/locations/cafe/afternoon.png",
    },
  ],
};

const irisSexyCoffeeDate: Dialogue = {
  id: "iris_sexy_coffee",
  lines: [
    {
      speaker: null,
      text: "You walk together to the nearby cafe.",
      imageSlide: "/images/locations/cafe/morning.png",
    },
    {
      speaker: null,
      text: "You enjoy a cup of coffee together",
      imageSlide: "/images/locations/cafe/afternoon.png",
    },
    {
      speaker: "Iris",
      text: "You're so sexy, {playerName}.",
    },
    {
      speaker: "Iris",
      text: "I want you so bad!",
      choices: [
        {
          text: "Lets get out of here.",
          affectionChange: 10,
          moodChange: 10,
          nextDialogueId: "iris_after_coffee_sex",
          condition: {
            minLove: 75,
          },
        },
        {
          text: "Not today.",
          affectionChange: -10,
          moodChange: -10,
        },
      ],
    },
  ],
};

const irisAfterCoffeeSex: Dialogue = {
  id: "iris_after_coffee_sex",
  lines: [
    {
      speaker: null,
      text: "You walk away from the cafe.",
      imageSlide: "/images/locations/cafe/afternoon.png",
    },
    {
      speaker: "Iris",
      text: "I want you to fuck me so bad!",
      imageSlide: "images/events/Iris_living_room_sex.png",
    },
    {
      speaker: "Iris",
      text: "You're so big, I still can't get used to it",
      imageSlide: "images/events/Iris_living_room_sex.png",
    },
    {
      speaker: null,
      text: "You have sex with Iris",
      imageSlide: "images/events/Iris_living_room_sex.png",
    },
  ],
};

export const irisEvent2Dialogues: Record<string, Dialogue> = {
  iris_intro_coffee_yes: irisIntroCoffeeDate,
  iris_regular_coffee: irisRegularCoffeeDate,
  iris_sexy_coffee: irisSexyCoffeeDate,
  iris_after_coffee_sex: irisAfterCoffeeSex,
};

export const irisEvent2Events: CharacterEvent[] = [
  {
    id: "iris_coffee_meetup_event",
    name: "Coffee Meetup",
    description: "Meet Iris at the cafe after accepting her offer.",
    quest: {
      title: "Meet Iris for Coffee",
      description:
        "You agreed to meet Iris at the Cafe. She's waiting to make up for the coffee incident.",
    },
    priority: 250,
    repeatable: false,
    conditions: {
      minAffection: 0,
      minHour: 0,
      maxHour: 24,
      requiredLocation: "Cafe",
      requiredFlags: ["hasMetIris", "irisCoffeeAccepted"],
    },
    dialogue: {
      id: "iris_coffee_meetup_event",
      lines: [
        {
          speaker: null,
          text: "You arrive at the cafe, the hum of grinders and soft music wrapping around you. A familiar wave catches your eye.",
        },
        {
          speaker: "Iris",
          text: "Hey! Thanks for meeting me. I promise this coffee stays in the cup.",
          expression: "happy",
        },
        {
          speaker: null,
          text: "She lifts two drinks triumphantly, a playful smile easing any leftover awkwardness.",
        },
        {
          speaker: "Iris",
          text: "I took a guess and got you a dark roast. You looked like you needed something strong.",
          expression: "happy",
        },
        { speaker: "You", text: "Already an improvement over last time." },
        {
          speaker: "Iris",
          text: "I still feel bad about the shirt. Let me know what the dry cleaning costs, okay?",
          expression: "neutral",
        },
        {
          speaker: "Iris",
          text: "Also... I'm glad you said yes. Campus feels less intimidating when you know someone.",
          expression: "happy",
        },
        {
          speaker: null,
          text: "You take a seat by the window. The coffee is actually decent--strong, hot, and thankfully contained.",
        },
        {
          speaker: null,
          text: "You both settle into a corner table, trading first-day war stories as the morning rush swirls around you.",
        },
        {
          speaker: "You",
          text: "So, Biology, right? I assume that means you're the one dissecting frogs while the rest of us are just trying to get the projector to work.",
        },
        { speaker: null, text: "Iris laughs, relaxing into her chair." },
        {
          speaker: "Iris",
          text: "It's a little more complex than frogs. I teach Advanced Anatomy and Physiology.",
          expression: "happy",
        },
        {
          speaker: "Iris",
          text: "It's fascinating, really. Understanding the mechanics of how we work. Every muscle, every nerve firing... it's like a perfect machine.",
          expression: "excited",
        },
        {
          speaker: null,
          text: "She pauses, realizing she's geeking out, her cheeks flushing slightly.",
        },
        {
          speaker: "Iris",
          text: "Sorry. I get a little carried away. My students usually glaze over by now.",
          expression: "shy",
        },
        {
          speaker: "You",
          text: "How do you respond?",
          choices: [
            {
              text: "I like the passion (Flirt)",
              affectionChange: 3,
              moodChange: 1,
            },
            {
              text: "It sounds intense (Friendly)",
              affectionChange: 2,
              moodChange: 1,
            },
          ],
        },
        {
          speaker: "Iris",
          text: "Anyway, if you ever want to see the 'perfect machine' in action... or just need a quiet place to work...",
          expression: "happy",
        },
        {
          speaker: "Iris",
          text: "My office is in the Science block. Room 304. It's usually quieter than the staff lounge.",
          expression: "happy",
        },
        { speaker: "You", text: "I might take you up on that." },
      ],
    },
    rewards: {
      setFlags: ["irisCoffeeMet"],
    },
  },
];

```

### src\data\events\chapter1\iris\event3.ts
```ts
import type { Dialogue } from "../../../dialogues";
import { CharacterEvent } from "../../types";

// Event 3: Unexpected Cafe Run-In
// Description: Run into Iris at the cafe after turning her down.

export const irisEvent3Dialogues: Record<string, Dialogue> = {
};

export const irisEvent3Events: CharacterEvent[] = [
  {
    id: "iris_coffee_forced_meet_event",
    name: "Unexpected Cafe Run-In",
    description: "Run into Iris at the cafe after turning her down.",
    quest: {
      title: "Cafe Run-In",
      description: "Stop by the Cafe. You might run into Iris again.",
    },
    priority: 240,
    repeatable: false,
    conditions: {
      minAffection: 0,
      minHour: 0,
      maxHour: 24,
      requiredLocation: "Cafe",
      requiredFlags: ["hasMetIris", "irisCoffeeDeclined"],
    },
    dialogue: {
      id: "iris_coffee_forced_meet_event",
      lines: [
        {
          speaker: null,
          text: "The cafe hums with low conversation and clinking mugs. As you step in, a familiar voice calls your name.",
        },
        {
          speaker: "Iris",
          text: "Oh! Hey. I didn't expect to see you here.",
          expression: "surprised",
        },
        {
          speaker: "Iris",
          text: "I was just thinking about you. Want to sit for a minute?",
          expression: "neutral",
        },
        {
          speaker: "You",
          text: "What do you do?",
          choices: [
            {
              text: "Join her",
              affectionChange: 1,
            },
            {
              text: "Keep it brief",
              affectionChange: 0,
            },
          ],
        },
        {
          speaker: null,
          text: "Whether you sit or keep it brief, the tension between you eases a little.",
        },
        {
          speaker: "Iris",
          text: "Maybe next time we can actually plan it.",
          expression: "happy",
        },
        {
          speaker: null,
          text: "You leave with a fresh cup and a lingering sense that this meeting was overdue.",
        },
      ],
    },
    rewards: {
      setFlags: ["irisCoffeeMet"],
    },
  },
];

```

### src\data\events\chapter1\iris\event4.ts
```ts
import type { Dialogue } from "../../../dialogues";
import { CharacterEvent } from "../../types";

// Event 4: Hallway Invite
// Description: Iris invites you inside to meet Dawn.

const irisHallwayInviteDom: Dialogue = {
  id: "iris_hallway_invite_dom",
  lines: [
    { speaker: "Iris", text: "Great! Come on in.", expression: "happy" },
    {
      speaker: null,
      text: "Iris's apartment is warm and lived-in. Books are stacked on every surface, and there's a faint smell of vanilla.",
    },
    { speaker: "Iris", text: "Dawn? Come say hi!", expression: "happy" },
    { speaker: null, text: "Silence." },
    { speaker: "Iris", text: "Dawn?", expression: "neutral" },
    {
      speaker: null,
      text: "She checks the other room and comes back with a sigh.",
    },
    {
      speaker: "Iris",
      text: "Of course. She must be at her friend's place down the hall. I completely forgot.",
      expression: "happy",
    },
    { speaker: "You", text: "The myth remains a myth." },
    { speaker: "Iris", text: "Sorry about that. But... since you're here...", expression: "neutral" },
    {
      speaker: null,
      text: "She leans against the kitchen counter, looking at you. The atmosphere shifts slightly without the kid around.",
    },
    {
      speaker: "Iris",
      text: "It's actually nice to have you to myself for a minute.",
      expression: "happy",
    },
    {
      speaker: "Iris",
      text: "You know, you look different outside of the university. Less... stiff.",
      expression: "happy",
    },
    { speaker: "You", text: "I try to leave the elbow patches at the office." },
    {
      speaker: null,
      text: "She laughs, stepping closer. She enters your personal space naturally.",
    },
    { speaker: "Iris", text: "Good. I like this version.", expression: "happy" },
    {
      speaker: null,
      text: "She reaches out, straightening your collar. Her fingers linger against your neck.",
    },
    { speaker: "Iris", text: "You have a little tension right here. You should be careful.", expression: "neutral" },
    { speaker: "Iris", text: "Stress is a killer. You need to take care of yourself.", expression: "neutral" },
    { speaker: "You", text: "Are you volunteering?" },
    {
      speaker: "Iris",
      text: "Maybe. I'm very good at anatomy, remember? I know how to fix tension.",
      expression: "happy",
    },
    {
      speaker: null,
      text: "She drops her voice, her eyes locking onto yours.",
    },
    {
      speaker: "Iris",
      text: "Don't be a stranger, {playerName}. If you want company, knock.",
      expression: "seductive",
    },
    {
      speaker: null,
      text: "You step back into the hallway, her words lingering.",
      choices: [
        {
          text: "Head home",
          affectionChange: 1,
          setFlags: ["irisDomPath"],
        },
      ],
    },
  ],
};

const irisHallwayInviteSub: Dialogue = {
  id: "iris_hallway_invite_sub",
  lines: [
    {
      speaker: "Iris",
      text: "I promise. Come on.",
      expression: "shy",
    },
    {
      speaker: null,
      text: "Iris's apartment is warm and lived-in. Books are stacked on every surface, and there's a faint smell of vanilla.",
    },
    { speaker: "Iris", text: "Dawn? Come say hi!", expression: "happy" },
    { speaker: null, text: "Silence." },
    { speaker: "Iris", text: "Dawn?", expression: "neutral" },
    {
      speaker: null,
      text: "She checks the other room and comes back with a sigh.",
    },
    {
      speaker: "Iris",
      text: "Of course. She must be at her friend's place down the hall. I completely forgot.",
      expression: "happy",
    },
    { speaker: "You", text: "The myth remains a myth." },
    { speaker: "Iris", text: "Sorry about that. But... since you're here...", expression: "neutral" },
    {
      speaker: null,
      text: "She leans against the kitchen counter, looking at you. The atmosphere shifts slightly without the kid around.",
    },
    {
      speaker: null,
      text: "Iris tucks a strand of hair behind her ear, looking a little flushed.",
    },
    {
      speaker: "Iris",
      text: "It's... actually kind of nice that she's not here. It's been a long week.",
      expression: "shy",
    },
    { speaker: null, text: "She glances at you, then quickly looks away." },
    {
      speaker: "Iris",
      text: "I don't usually invite neighbors in like this. I hope it's not weird.",
      expression: "shy",
    },
    {
      speaker: "You",
      text: "How do you respond?",
      choices: [
        {
          text: "It's not weird. You look great. (Flirt)",
          affectionChange: 2,
          nextDialogueId: "iris_hallway_invite_sub_flirt",
        },
        {
          text: "It's fine. Nice place. (Friendly)",
          affectionChange: 1,
          nextDialogueId: "iris_hallway_invite_sub_friendly",
        },
      ],
    },
  ],
};

const irisHallwayInviteSubFlirt: Dialogue = {
  id: "iris_hallway_invite_sub_flirt",
  lines: [
    {
      speaker: "You",
      text: "It's not weird at all. Besides, it gives me a chance to see you relax.",
    },
    { speaker: "You", text: "You look great, Iris." },
    { speaker: null, text: "She blinks, her face turning pink." },
    {
      speaker: "Iris",
      text: "Oh! Thank you. I... I wasn't expecting...",
      expression: "surprised",
    },
    { speaker: null, text: "She smiles, biting her lip." },
    {
      speaker: "Iris",
      text: "I'm glad you came in. Really.",
      expression: "happy",
    },
    {
      speaker: "Iris",
      text: "Well... I shouldn't keep you. I'm sure you have things to do.",
      expression: "neutral",
    },
    {
      speaker: "Iris",
      text: "But maybe we can do this again? Intentionally next time?",
      expression: "shy",
    },
    { speaker: "You", text: "I'd like that." },
    {
      speaker: null,
      text: "You step back into the hallway, her smile still warming your chest.",
      choices: [
        {
          text: "Head home",
          affectionChange: 0,
          setFlags: ["irisSubPath"],
        },
      ],
    },
  ],
};

const irisHallwayInviteSubFriendly: Dialogue = {
  id: "iris_hallway_invite_sub_friendly",
  lines: [
    { speaker: "You", text: "Not weird. You have a nice place here." },
    { speaker: "Iris", text: "Thanks. It's chaotic, but it's home.", expression: "happy" },
    {
      speaker: "Iris",
      text: "Well... I shouldn't keep you. I'm sure you have things to do.",
      expression: "neutral",
    },
    {
      speaker: "Iris",
      text: "But maybe we can do this again? Intentionally next time?",
      expression: "shy",
    },
    { speaker: "You", text: "I'd like that." },
    {
      speaker: null,
      text: "You step back into the hallway, her voice still in your ears.",
      choices: [
        {
          text: "Head home",
          affectionChange: 0,
          setFlags: ["irisSubPath"],
        },
      ],
    },
  ],
};

export const irisEvent4Dialogues: Record<string, Dialogue> = {
  iris_hallway_invite_dom: irisHallwayInviteDom,
  iris_hallway_invite_sub: irisHallwayInviteSub,
  iris_hallway_invite_sub_flirt: irisHallwayInviteSubFlirt,
  iris_hallway_invite_sub_friendly: irisHallwayInviteSubFriendly,
};

export const irisEvent4Events: CharacterEvent[] = [
  {
    id: "iris_hallway_invite_event",
    name: "Hallway Invite",
    description: "Iris invites you inside to meet Dawn.",
    quest: {
      title: "Neighborly Introduction",
      description:
        "You've gotten to know Iris a little. Maybe you'll see her around the apartment building.",
    },
    priority: 230,
    repeatable: false,
    conditions: {
      minAffection: 0,
      minHour: 18,
      maxHour: 24,
      requiredLocation: "Hallway",
      requiredFlags: ["irisCoffeeMet"],
    },
    dialogue: {
      id: "iris_hallway_invite_event",
      lines: [
        {
          speaker: null,
          text: "You are walking down the hallway, fumbling with your keys, when a door opens a few feet away.",
        },
        {
          speaker: null,
          text: "Iris steps out, holding a trash bag. She spots you and freezes, then breaks into a smile.",
        },
        {
          speaker: "Iris",
          text: "Oh! {playerName}. I keep forgetting we're neighbors.",
          expression: "happy",
        },
        { speaker: "You", text: "Hard to miss me. I'm the one making noise at 2 AM." },
        { speaker: "Iris", text: "Actually, that's usually me. Grading papers.", expression: "happy" },
        { speaker: null, text: "She tosses the bag into the chute and wipes her hands." },
        {
          speaker: "Iris",
          text: "You know, you should come in for a second. I've been meaning to introduce you to my daughter, Dawn.",
          expression: "neutral",
        },
        {
          speaker: "Iris",
          text: "She's heard me talk about the 'Coffee Shirt Guy' enough times. She thinks you're a myth.",
          expression: "happy",
        },
        {
          speaker: "You",
          text: "How do you answer?",
          choices: [
            {
              text: "I'd love to meet her.",
              affectionChange: 1,
              nextDialogueId: "iris_hallway_invite_dom",
            },
            {
              text: "Sure, if you promise no coffee spills.",
              affectionChange: 1,
              nextDialogueId: "iris_hallway_invite_sub",
            },
          ],
        },
      ],
    },
  },
];

```

### src\data\events\chapter1\iris\event5.ts
```ts
import type { Dialogue } from "../../../dialogues";
import { CharacterEvent } from "../../types";

// Event 5: Mall Bump (Confident Iris)
// Descriptions: Run into Iris at the mall when she's feeling bold. | Run into Iris at the mall when she's flustered.

export const irisEvent5Dialogues: Record<string, Dialogue> = {
};

export const irisEvent5Events: CharacterEvent[] = [
  {
    id: "iris_mall_bump_dom",
    name: "Mall Bump (Confident Iris)",
    description: "Run into Iris at the mall when she's feeling bold.",
    quest: {
      title: "A Day Out",
      description:
        "It's a good day to get out of the apartment. You never know who you might run into at the Mall.",
    },
    priority: 220,
    repeatable: false,
    conditions: {
      minAffection: 0,
      minHour: 0,
      maxHour: 24,
      requiredLocation: "Mall",
      requiredPreviousEvents: ["iris_hallway_invite_event"],
      requiredFlags: ["irisNeedsNewShirt", "irisDomPath"],
    },
    dialogue: {
      id: "iris_mall_bump_dom",
      lines: [
        {
          speaker: null,
          text: "The mall is busy today, a wash of noise and fluorescent light.",
        },
        {
          speaker: null,
          text: "You're navigating the crowd near the fountain when you spot a familiar figure wrestling with too many shopping bags.",
        },
        {
          speaker: null,
          text: "Even from the back, the curve of her hips in those jeans is unmistakable.",
        },
        {
          speaker: null,
          text: "She turns, a bag slipping from her grip just as you step in to catch it. Your hands brush against hers--her skin is warm.",
        },
        { speaker: "You", text: "Careful. You're dropping the goods." },
        {
          speaker: "Iris",
          text: "I knew someone would come to my rescue if I looked helpless enough.",
          expression: "happy",
        },
        {
          speaker: "Iris",
          text: "Didn't expect it to be you, though. That's a nice bonus.",
          expression: "happy",
        },
        { speaker: "You", text: "So this was a trap?" },
        { speaker: "Iris", text: "Let's call it a strategy. I bought way too much.", expression: "happy" },
        {
          speaker: null,
          text: "She glances at the bag you caught. It has a distinct lace pattern on the packaging.",
        },
        { speaker: "Iris", text: "Especially that one. You have good reflexes.", expression: "happy" },
        {
          speaker: "You",
          text: "How do you respond?",
          choices: [
            {
              text: "Tease her back (Flirty)",
              affectionChange: 2,
              moodChange: 1,
            },
            {
              text: "Just help her (Friendly)",
              affectionChange: 1,
            },
          ],
        },
        {
          speaker: null,
          text: "You walk together towards the exit. She walks close to you, her shoulder brushing yours intentionally.",
        },
        { speaker: "Iris", text: "You know... since you've already handled the merchandise...", expression: "seductive" },
        {
          speaker: "Iris",
          text: "I bought something a little impractical. Very expensive.",
          expression: "seductive",
        },
        {
          speaker: "Iris",
          text: "I might ask for a second opinion later.",
          expression: "seductive",
        },
        { speaker: "You", text: "I'm available for consultations." },
        { speaker: "Iris", text: "I'll bet you are.", expression: "seductive" },
      ],
    },
  },
  {
    id: "iris_mall_bump_sub",
    name: "Mall Bump (Shy Iris)",
    description: "Run into Iris at the mall when she's flustered.",
    quest: {
      title: "A Day Out",
      description:
        "It's a good day to get out of the apartment. You never know who you might run into at the Mall.",
    },
    priority: 220,
    repeatable: false,
    conditions: {
      minAffection: 0,
      minHour: 0,
      maxHour: 24,
      requiredLocation: "Mall",
      requiredPreviousEvents: ["iris_hallway_invite_event"],
      requiredFlags: ["irisNeedsNewShirt", "irisSubPath"],
    },
    dialogue: {
      id: "iris_mall_bump_sub",
      lines: [
        {
          speaker: null,
          text: "The mall is busy today, a wash of noise and fluorescent light.",
        },
        {
          speaker: null,
          text: "You're navigating the crowd near the fountain when you spot a familiar figure wrestling with too many shopping bags.",
        },
        {
          speaker: null,
          text: "Even from the back, the curve of her hips in those jeans is unmistakable.",
        },
        {
          speaker: null,
          text: "She turns, a bag slipping from her grip just as you step in to catch it. Your hands brush against hers--her skin is warm.",
        },
        { speaker: "You", text: "Careful. You're dropping the goods." },
        {
          speaker: "Iris",
          text: "Oh! {playerName}! I... I didn't see you there!",
          expression: "surprised",
        },
        {
          speaker: null,
          text: "She scrambles to adjust her grip, looking mortified that you caught her struggling.",
        },
        {
          speaker: "Iris",
          text: "I thought I could manage all this in one trip. Hubris, clearly.",
          expression: "shy",
        },
        { speaker: "You", text: "What did you buy? The whole store?" },
        { speaker: "Iris", text: "Just... things. Retail therapy got out of hand.", expression: "shy" },
        {
          speaker: null,
          text: "She notices you holding the bag you caught--the one with the lingerie logo--and her eyes go wide. She quickly tries to snatch it back.",
        },
        { speaker: "Iris", text: "That one isn't... it's just socks! Boring socks!", expression: "shy" },
        {
          speaker: "You",
          text: "How do you respond?",
          choices: [
            {
              text: "Take charge and help (Dominant/Flirty)",
              affectionChange: 2,
              moodChange: 1,
            },
            {
              text: "Be gentle (Friendly)",
              affectionChange: 1,
            },
          ],
        },
        {
          speaker: null,
          text: "You walk towards the exit. She stays close to your side, seemingly grateful for the protection from the crowd.",
        },
        { speaker: "Iris", text: "Thanks for the rescue. Again.", expression: "shy" },
        {
          speaker: "Iris",
          text: "Um... about that bag you caught...",
          expression: "shy",
        },
        {
          speaker: "Iris",
          text: "It wasn't socks. It's... something for special occasions.",
          expression: "shy",
        },
        { speaker: null, text: "She glances up at you, then quickly away." },
        {
          speaker: "Iris",
          text: "Maybe... if you're lucky... you'll find out what it is someday.",
          expression: "shy",
        },
      ],
    },
  },
];

```

### src\data\events\chapter1\iris\event6.ts
```ts
import type { Dialogue } from "../../../dialogues";
import { CharacterEvent } from "../../types";

// Event 6: Chapter 1 Finale (Confident Iris)
// Descriptions: Iris confronts you in the hallway late at night. | Iris hesitates in the hallway late at night.

const irisFinaleDomChallenge: Dialogue = {
  id: "iris_finale_dom_challenge",
  lines: [
    {
      speaker: null,
      text: "Iris laughs softly, though it sounds a bit breathless.",
    },
    {
      speaker: "Iris",
      text: "Maybe I am. Maybe I'm tired of being polite neighbors.",
      expression: "happy",
    },
    {
      speaker: null,
      text: "She steps closer, invading your personal space. She reaches out, her hand resting flat against your chest, right over your heart.",
    },
    {
      speaker: null,
      text: "Her fingers curl slightly into the fabric, as if she's testing the boundary.",
    },
    { speaker: "Iris", text: "Your heart is beating fast.", expression: "neutral" },
    {
      speaker: "You",
      text: "What do you do?",
      choices: [
        {
          text: "Lean into her touch.",
          affectionChange: 2,
          nextDialogueId: "iris_finale_dom_success",
        },
        {
          text: "Step back.",
          affectionChange: -1,
          nextDialogueId: "iris_finale_dom_fail_back",
        },
      ],
    },
  ],
};

const irisFinaleDomDeflect: Dialogue = {
  id: "iris_finale_dom_deflect",
  lines: [
    {
      speaker: "Iris",
      text: "Work, work, work. You need to learn when to switch off.",
      expression: "neutral",
    },
    {
      speaker: null,
      text: "She steps closer, invading your personal space. She reaches out, her hand resting flat against your chest, right over your heart.",
    },
    {
      speaker: null,
      text: "Her fingers curl slightly into the fabric, as if she's testing the boundary.",
    },
    { speaker: "Iris", text: "Your heart is beating fast.", expression: "neutral" },
    {
      speaker: "You",
      text: "What do you do?",
      choices: [
        {
          text: "Lean into her touch.",
          affectionChange: 1,
          nextDialogueId: "iris_finale_dom_fail_lean",
        },
        {
          text: "Step back.",
          affectionChange: -1,
          nextDialogueId: "iris_finale_dom_fail_back",
        },
      ],
    },
  ],
};

const irisFinaleDomSuccess: Dialogue = {
  id: "iris_finale_dom_success",
  lines: [
    {
      speaker: null,
      text: "You don't pull away. You lean slightly forward, letting her feel the rhythm.",
    },
    { speaker: "You", text: "You have that effect on people." },
    { speaker: null, text: "Her eyes darken, her resolve slipping." },
    {
      speaker: null,
      text: "She moves her hand up to your neck, her thumb grazing your pulse point. Her voice drops, thick with something she's trying to suppress.",
    },
    {
      speaker: "Iris",
      text: "I've been thinking about you. About how much you hold back.",
      expression: "seductive",
    },
    {
      speaker: "Iris",
      text: "I hate it when you hold back.",
      expression: "seductive",
    },
    { speaker: null, text: "She grips your shirt, pulling you down. It's impulsive, almost rough." },
    { speaker: "Iris", text: "I told myself I'd be careful.", expression: "shy" },
    { speaker: "Iris", text: "But I want to.", expression: "shy" },
    {
      speaker: null,
      text: "Before you can respond, she kisses you. It's not a question; it's a demand.",
    },
    {
      speaker: null,
      text: "Her lips are hungry, pressing against yours with a desperate energy. It feels like she's losing a fight with herself, and you're the collateral damage.",
    },
    { speaker: null, text: "For a moment, you surrender to it, the heat between you spiking." },
    { speaker: null, text: "Then, she breaks the kiss abruptly." },
    {
      speaker: null,
      text: "She stares at you, chest heaving, eyes wide as the reality of what she just did crashes in.",
    },
    { speaker: "Iris", text: "I... oh god.", expression: "surprised" },
    {
      speaker: "Iris",
      text: "I didn't mean to... I mean, I did, but...",
      expression: "surprised",
    },
    { speaker: null, text: "She panics, turning on her heel." },
    { speaker: "Iris", text: "I have to go!", expression: "surprised" },
    {
      speaker: null,
      text: "She sprints back to her apartment, slamming the door shut behind her.",
    },
  ],
};

const irisFinaleDomFailBack: Dialogue = {
  id: "iris_finale_dom_fail_back",
  lines: [
    { speaker: null, text: "You take a half-step back." },
    { speaker: "You", text: "Iris, what are you doing?" },
    {
      speaker: null,
      text: "She frowns, frustration flashing across her face, but she steps forward again to close the gap.",
    },
    {
      speaker: null,
      text: "She moves her hand up to your neck, her thumb grazing your pulse point. Her voice drops, thick with something she's trying to suppress.",
    },
    {
      speaker: "Iris",
      text: "I've been thinking about you. About how much you hold back.",
      expression: "sad",
    },
    {
      speaker: "Iris",
      text: "I hate it when you hold back.",
      expression: "sad",
    },
    { speaker: null, text: "She searches your face, then sighs, the moment breaking." },
    {
      speaker: "Iris",
      text: "Never mind. I'm just... tired. Forget I said anything.",
      expression: "sad",
    },
    {
      speaker: null,
      text: "She walks past you, heading back to her room without looking back.",
    },
  ],
};

const irisFinaleDomFailLean: Dialogue = {
  id: "iris_finale_dom_fail_lean",
  lines: [
    {
      speaker: null,
      text: "You don't pull away. You lean slightly forward, letting her feel the rhythm.",
    },
    { speaker: "You", text: "You have that effect on people." },
    { speaker: null, text: "Her eyes darken, her resolve slipping." },
    {
      speaker: null,
      text: "She moves her hand up to your neck, her thumb grazing your pulse point. Her voice drops, thick with something she's trying to suppress.",
    },
    {
      speaker: "Iris",
      text: "I've been thinking about you. About how much you hold back.",
      expression: "sad",
    },
    {
      speaker: "Iris",
      text: "I hate it when you hold back.",
      expression: "sad",
    },
    { speaker: null, text: "She searches your face, then sighs, the moment breaking." },
    {
      speaker: "Iris",
      text: "Never mind. I'm just... tired. Forget I said anything.",
      expression: "sad",
    },
    {
      speaker: null,
      text: "She walks past you, heading back to her room without looking back.",
    },
  ],
};

const irisFinaleSubStepCloser: Dialogue = {
  id: "iris_finale_sub_step_closer",
  lines: [
    {
      speaker: null,
      text: "You close the distance between you. She doesn't retreat; she looks up at you, eyes wide.",
    },
    { speaker: "Iris", text: "I just... wanted to see you.", expression: "shy" },
    {
      speaker: null,
      text: "She looks at her feet, then back up at you, biting her lip.",
    },
    {
      speaker: "Iris",
      text: "Every time I see you, I feel like... like I'm waiting for something to happen.",
      expression: "shy",
    },
    {
      speaker: "You",
      text: "What do you do?",
      choices: [
        {
          text: "Take charge. (Touch her chin)",
          affectionChange: 2,
          nextDialogueId: "iris_finale_sub_success",
        },
        {
          text: "Ask her. 'What do you want to happen?'",
          affectionChange: 0,
          nextDialogueId: "iris_finale_sub_fail_ask",
        },
      ],
    },
  ],
};

const irisFinaleSubStayBack: Dialogue = {
  id: "iris_finale_sub_stay_back",
  lines: [
    { speaker: "Iris", text: "Yeah. Here you are.", expression: "shy" },
    {
      speaker: null,
      text: "She looks at her feet, then back up at you, biting her lip.",
    },
    {
      speaker: "Iris",
      text: "Every time I see you, I feel like... like I'm waiting for something to happen.",
      expression: "shy",
    },
    {
      speaker: "You",
      text: "What do you do?",
      choices: [
        {
          text: "Take charge. (Touch her chin)",
          affectionChange: 1,
          nextDialogueId: "iris_finale_sub_fail_take_charge",
        },
        {
          text: "Ask her. 'What do you want to happen?'",
          affectionChange: 0,
          nextDialogueId: "iris_finale_sub_fail_ask",
        },
      ],
    },
  ],
};

const irisFinaleSubSuccess: Dialogue = {
  id: "iris_finale_sub_success",
  lines: [
    {
      speaker: null,
      text: "You reach out, gently lifting her chin so she has to look at you.",
    },
    { speaker: "You", text: "Then let's make something happen." },
    { speaker: null, text: "She shudders under your touch, her breath hitching." },
    { speaker: "You", text: "Iris. Look at me." },
    {
      speaker: null,
      text: "You don't give her time to overthink. You wrap an arm around her waist and pull her into you.",
    },
    { speaker: "Iris", text: "Oh--!", expression: "surprised" },
    {
      speaker: null,
      text: "You kiss her deeply, swallowing her surprise. You kiss her with intent, possessive and firm, letting her know exactly where she stands.",
    },
    {
      speaker: null,
      text: "She melts instantly, her hands clutching your shoulders, making a soft, desperate sound against your mouth.",
    },
    {
      speaker: null,
      text: "When you finally pull back, she looks completely unraveled. Her face is flushed, her lips swollen.",
    },
    { speaker: "Iris", text: "I...", expression: "surprised" },
    {
      speaker: null,
      text: "She touches her lips, looking at you with a mix of desire and total panic.",
    },
    { speaker: "Iris", text: "I can't... this is...", expression: "surprised" },
    { speaker: null, text: "Overwhelmed, she spins around." },
    { speaker: "Iris", text: "Goodnight!", expression: "surprised" },
    {
      speaker: null,
      text: "She practically runs back to her apartment, the door clicking shut a second later.",
    },
  ],
};

const irisFinaleSubFailTakeCharge: Dialogue = {
  id: "iris_finale_sub_fail_take_charge",
  lines: [
    {
      speaker: null,
      text: "You reach out, gently lifting her chin so she has to look at you.",
    },
    { speaker: "You", text: "Then let's make something happen." },
    { speaker: null, text: "She shudders under your touch, her breath hitching." },
    {
      speaker: null,
      text: "The moment hangs in the air, heavy and awkward, but neither of you moves to break it.",
    },
    { speaker: "Iris", text: "I should... probably go back inside. Dawn might wake up.", expression: "sad" },
    { speaker: "You", text: "Yeah. Goodnight, Iris." },
    { speaker: null, text: "She slips back into her apartment, leaving you in the hall." },
  ],
};

const irisFinaleSubFailAsk: Dialogue = {
  id: "iris_finale_sub_fail_ask",
  lines: [
    { speaker: "Iris", text: "I don't know... something.", expression: "shy" },
    {
      speaker: null,
      text: "The moment hangs in the air, heavy and awkward, but neither of you moves to break it.",
    },
    { speaker: "Iris", text: "I should... probably go back inside. Dawn might wake up.", expression: "sad" },
    { speaker: "You", text: "Yeah. Goodnight, Iris." },
    { speaker: null, text: "She slips back into her apartment, leaving you in the hall." },
  ],
};

export const irisEvent6Dialogues: Record<string, Dialogue> = {
  iris_finale_dom_challenge: irisFinaleDomChallenge,
  iris_finale_dom_deflect: irisFinaleDomDeflect,
  iris_finale_dom_success: irisFinaleDomSuccess,
  iris_finale_dom_fail_back: irisFinaleDomFailBack,
  iris_finale_dom_fail_lean: irisFinaleDomFailLean,
  iris_finale_sub_step_closer: irisFinaleSubStepCloser,
  iris_finale_sub_stay_back: irisFinaleSubStayBack,
  iris_finale_sub_success: irisFinaleSubSuccess,
  iris_finale_sub_fail_take_charge: irisFinaleSubFailTakeCharge,
  iris_finale_sub_fail_ask: irisFinaleSubFailAsk,
};

export const irisEvent6Events: CharacterEvent[] = [
  {
    id: "iris_chapter_1_finale_dom",
    name: "Chapter 1 Finale (Confident Iris)",
    description: "Iris confronts you in the hallway late at night.",
    quest: {
      title: "Late Night Encounters",
      description:
        "After a long day, it's time to head home. The apartment building is usually quiet at night...",
    },
    priority: 210,
    repeatable: false,
    conditions: {
      minAffection: 0,
      minHour: 20,
      maxHour: 24,
      requiredLocation: "Hallway",
      requiredPreviousEvents: ["iris_hallway_invite_event", "iris_mall_bump_dom"],
      requiredFlags: ["irisDomPath"],
    },
    dialogue: {
      id: "iris_chapter_1_finale_dom",
      lines: [
        {
          speaker: null,
          text: "It's late. The hallway is quiet, the hum of the vending machine the only sound.",
        },
        {
          speaker: null,
          text: "You're fumbling with your keys when you hear a door click open down the hall.",
        },
        {
          speaker: null,
          text: "It's Iris. She steps out, looking tired, maybe heading to check the mail one last time.",
        },
        {
          speaker: null,
          text: "She spots you and stops, a flicker of surprise crossing her face before it settles into something unreadable.",
        },
        {
          speaker: "Iris",
          text: "You're always in my way, {playerName}. Or maybe I'm in yours.",
          expression: "neutral",
        },
        { speaker: "You", text: "I live here, Iris. I'm just going home." },
        {
          speaker: null,
          text: "She stops right in front of you, blocking your path to your door. She doesn't move aside.",
        },
        { speaker: "Iris", text: "Are you? You look restless.", expression: "neutral" },
        {
          speaker: "You",
          text: "How do you answer?",
          choices: [
            {
              text: "Challenge her. 'And you look like you're up to something.'",
              affectionChange: 1,
              nextDialogueId: "iris_finale_dom_challenge",
            },
            {
              text: "Deflect. 'Long day at work.'",
              affectionChange: 0,
              nextDialogueId: "iris_finale_dom_deflect",
            },
          ],
        },
      ],
    },
    rewards: {
      setFlags: ["irisCh1FinaleComplete"],
    },
  },
  {
    id: "iris_chapter_1_finale_sub",
    name: "Chapter 1 Finale (Shy Iris)",
    description: "Iris hesitates in the hallway late at night.",
    quest: {
      title: "Late Night Encounters",
      description:
        "After a long day, it's time to head home. The apartment building is usually quiet at night...",
    },
    priority: 210,
    repeatable: false,
    conditions: {
      minAffection: 0,
      minHour: 20,
      maxHour: 24,
      requiredLocation: "Hallway",
      requiredPreviousEvents: ["iris_hallway_invite_event", "iris_mall_bump_sub"],
      requiredFlags: ["irisSubPath"],
    },
    dialogue: {
      id: "iris_chapter_1_finale_sub",
      lines: [
        {
          speaker: null,
          text: "It's late. The hallway is quiet, the hum of the vending machine the only sound.",
        },
        {
          speaker: null,
          text: "You're fumbling with your keys when you hear a door click open down the hall.",
        },
        {
          speaker: null,
          text: "It's Iris. She steps out, looking tired, maybe heading to check the mail one last time.",
        },
        {
          speaker: null,
          text: "She spots you and stops, a flicker of surprise crossing her face before it settles into something unreadable.",
        },
        {
          speaker: null,
          text: "She stops a few feet away, hugging her arms around herself. She looks nervous, shifting her weight from foot to foot.",
        },
        {
          speaker: "Iris",
          text: "I... I couldn't sleep. I was just going to get some water.",
          expression: "shy",
        },
        { speaker: "You", text: "Late night for both of us then." },
        { speaker: "Iris", text: "Yeah. I guess so.", expression: "shy" },
        {
          speaker: null,
          text: "She hesitates, looking at you with a softness that catches you off guard.",
        },
        { speaker: "Iris", text: "I'm... actually glad I ran into you.", expression: "shy" },
        {
          speaker: "You",
          text: "How do you respond?",
          choices: [
            {
              text: "Step closer. 'Glad? Why?'",
              affectionChange: 1,
              nextDialogueId: "iris_finale_sub_step_closer",
            },
            {
              text: "Stay back. 'Well, here I am.'",
              affectionChange: 0,
              nextDialogueId: "iris_finale_sub_stay_back",
            },
          ],
        },
      ],
    },
    rewards: {
      setFlags: ["irisCh1FinaleComplete"],
    },
  },
];

```

### src\data\events\chapter2\iris\event1.ts
```ts
import type { Dialogue } from "../../../dialogues";
import { CharacterEvent } from "../../types";

// Event 1: The Morning After
// Description: You see Iris for the first time since the kiss.

const iris_ch2_ev1_intro: Dialogue = {
  id: "iris_ch2_ev1_intro",
  lines: [
    {
      speaker: null,
      text: "Late morning in the university hallway, you round a corner and almost bump into Iris.",
    },
    { speaker: null, text: "She looks like she has been waiting for you." },
    { speaker: "Iris", text: "Oh. I was actually looking for you.", expression: "neutral" },
    { speaker: "Iris", text: "About last night.", expression: "shy" },
    {
      speaker: "Iris",
      text: "I keep replaying it and I do not know if I am relieved or terrified.",
      expression: "neutral",
    },
    { speaker: "Iris", text: "I do not usually do impulsive.", expression: "neutral" },
    { speaker: "Iris", text: "It felt good. It also felt reckless.", expression: "shy" },
    { speaker: "Iris", text: "So tell me the truth.", expression: "neutral" },
    { speaker: "Iris", text: "What did it feel like to you?", expression: "neutral" },
    {
      speaker: "You",
      text: "How do you answer?",
      choices: [
        {
          text: "Take the lead. \"It felt right, and I want more.\"",
          affectionChange: 1,
          lustChange: 1,
          dominanceChange: -2,
          nextDialogueId: "iris_ch2_ev1_sub_intro",
        },
        {
          text: "Offer her control. \"If you want to lead, I am listening.\"",
          affectionChange: 1,
          lustChange: 0,
          dominanceChange: 2,
          nextDialogueId: "iris_ch2_ev1_dom_intro",
        },
        {
          text: "Be calm and adult. \"I do not regret it, but we should be smart.\"",
          affectionChange: 1,
          lustChange: 0,
          dominanceChange: 0,
          nextDialogueId: "iris_ch2_ev1_neutral_dialogue",
        },
      ],
    },
  ],
};

const iris_ch2_ev1_sub_intro: Dialogue = {
  id: "iris_ch2_ev1_sub_intro",
  lines: [
    { speaker: null, text: "She swallows, then nods once." },
    { speaker: "Iris", text: "Direct. I can work with direct.", expression: "neutral" },
    {
      speaker: "Iris",
      text: "Part of me wanted you to take the lead.",
      expression: "shy",
    },
    { speaker: "Iris", text: "It made me feel... chosen.", expression: "shy" },
    {
      speaker: "Iris",
      text: "But I need to know if that is real or just heat.",
      expression: "neutral",
    },
    { speaker: "Iris", text: "Say it clearly.", expression: "neutral" },
    {
      speaker: "You",
      text: "What do you say about the kiss?",
      choices: [
        {
          text: "Be warm. \"It felt right, and I want it again.\"",
          affectionChange: 1,
          lustChange: 1,
          dominanceChange: -1,
          nextDialogueId: "iris_ch2_ev1_sub_reassure",
        },
        {
          text: "Neg her. \"You were a mess, but I could work with it.\"",
          affectionChange: -1,
          lustChange: 0,
          dominanceChange: -2,
          nextDialogueId: "iris_ch2_ev1_sub_give_space",
        },
        {
          text: "Stay neutral. \"It happened. We can keep control.\"",
          affectionChange: 0,
          lustChange: 0,
          dominanceChange: -1,
          nextDialogueId: "iris_ch2_ev1_sub_react_neutral",
        },
      ],
    },
  ],
};

const iris_ch2_ev1_sub_reassure: Dialogue = {
  id: "iris_ch2_ev1_sub_reassure",
  lines: [
    { speaker: "Iris", text: "That helps.", expression: "happy" },
    { speaker: "Iris", text: "I was worried you would laugh it off.", expression: "shy" },
    { speaker: null, text: "She fidgets with her keys, then starts talking too fast." },
    { speaker: "Iris", text: "I have a lot to juggle. Students. Papers. A kid at home.", expression: "neutral" },
    { speaker: "Iris", text: "If this becomes gossip, it stops being ours.", expression: "neutral" },
    { speaker: "Iris", text: "And I hate that I even have to say that.", expression: "shy" },
    { speaker: "Iris", text: "But I also do not want to pretend nothing happened.", expression: "neutral" },
    { speaker: "Iris", text: "So I am talking too much. Sorry.", expression: "shy" },
    { speaker: "Iris", text: "Tell me what you want.", expression: "neutral" },
    {
      speaker: "You",
      text: "How do you respond to the ramble?",
      choices: [
        {
          text: "Be kind. \"You are allowed to want this.\"",
          affectionChange: 1,
          lustChange: 1,
          dominanceChange: -1,
          nextDialogueId: "iris_ch2_ev1_sub_final_nice",
        },
        {
          text: "Be sharp. \"Stop overthinking. Just trust me.\"",
          affectionChange: -1,
          lustChange: 0,
          dominanceChange: -2,
          nextDialogueId: "iris_ch2_ev1_sub_final_mean",
        },
        {
          text: "Laugh it off. \"You are cute when you ramble.\"",
          affectionChange: 1,
          lustChange: 0,
          dominanceChange: -1,
          nextDialogueId: "iris_ch2_ev1_sub_final_laugh",
        },
      ],
    },
  ],
};

const iris_ch2_ev1_sub_give_space: Dialogue = {
  id: "iris_ch2_ev1_sub_give_space",
  lines: [
    { speaker: "Iris", text: "That is... blunt.", expression: "neutral" },
    { speaker: "Iris", text: "I can take blunt, but do not make me feel small.", expression: "neutral" },
    { speaker: null, text: "She straightens, steadying herself." },
    { speaker: "Iris", text: "I am not a toy you pick up when convenient.", expression: "neutral" },
    { speaker: "Iris", text: "I still have rules. I still have a life.", expression: "neutral" },
    { speaker: "Iris", text: "If this happens again, it has to mean something.", expression: "shy" },
    { speaker: "Iris", text: "I am rambling because I am nervous.", expression: "shy" },
    { speaker: "Iris", text: "And because I want this and that scares me.", expression: "shy" },
    { speaker: "Iris", text: "So say what you actually want.", expression: "neutral" },
    {
      speaker: "You",
      text: "How do you respond?",
      choices: [
        {
          text: "Be kind. \"You are not small. I want you.\"",
          affectionChange: 1,
          lustChange: 1,
          dominanceChange: -1,
          nextDialogueId: "iris_ch2_ev1_sub_final_nice",
        },
        {
          text: "Be harsh. \"Then stop wobbling and decide.\"",
          affectionChange: -1,
          lustChange: 0,
          dominanceChange: -2,
          nextDialogueId: "iris_ch2_ev1_sub_final_mean",
        },
        {
          text: "Call it cute. \"You are adorable when you spiral.\"",
          affectionChange: 1,
          lustChange: 0,
          dominanceChange: -1,
          nextDialogueId: "iris_ch2_ev1_sub_final_laugh",
        },
      ],
    },
  ],
};

const iris_ch2_ev1_sub_react_neutral: Dialogue = {
  id: "iris_ch2_ev1_sub_react_neutral",
  lines: [
    { speaker: "Iris", text: "Step by step. That is fair.", expression: "neutral" },
    { speaker: "Iris", text: "That is probably the smartest answer in the building.", expression: "happy" },
    { speaker: null, text: "She exhales, then keeps talking anyway." },
    { speaker: "Iris", text: "I am juggling a lot. Students, grading, home.", expression: "neutral" },
    { speaker: "Iris", text: "If this turns into gossip, it gets messy.", expression: "neutral" },
    { speaker: "Iris", text: "But I also do not want to pretend it never happened.", expression: "shy" },
    { speaker: "Iris", text: "So I am stuck between careful and honest.", expression: "neutral" },
    { speaker: "Iris", text: "Tell me where you want this to go.", expression: "neutral" },
    {
      speaker: "You",
      text: "How do you respond?",
      choices: [
        {
          text: "Be kind. \"I want you, and I will be careful.\"",
          affectionChange: 1,
          lustChange: 1,
          dominanceChange: -1,
          nextDialogueId: "iris_ch2_ev1_sub_final_nice",
        },
        {
          text: "Be sharp. \"Then let me decide and follow.\"",
          affectionChange: -1,
          lustChange: 0,
          dominanceChange: -2,
          nextDialogueId: "iris_ch2_ev1_sub_final_mean",
        },
        {
          text: "Laugh it off. \"You are cute when you plan.\"",
          affectionChange: 1,
          lustChange: 0,
          dominanceChange: -1,
          nextDialogueId: "iris_ch2_ev1_sub_final_laugh",
        },
      ],
    },
  ],
};

const iris_ch2_ev1_sub_final_nice: Dialogue = {
  id: "iris_ch2_ev1_sub_final_nice",
  lines: [
    { speaker: "Iris", text: "Okay. Carefully, then.", expression: "happy" },
    { speaker: "Iris", text: "But if you are taking the lead, then take it.", expression: "shy" },
    { speaker: null, text: "You close the distance." },
    { speaker: null, text: "You steal a kiss, slow and certain." },
    { speaker: "Iris", text: "Okay.", expression: "shy" },
    { speaker: null, text: "She leans into you, breathless." },
  ],
};

const iris_ch2_ev1_sub_final_mean: Dialogue = {
  id: "iris_ch2_ev1_sub_final_mean",
  lines: [
    { speaker: "Iris", text: "Then be consistent.", expression: "neutral" },
    { speaker: "Iris", text: "No games. No disappearing.", expression: "neutral" },
    { speaker: null, text: "You lift her chin and close the gap." },
    { speaker: null, text: "You take a kiss, firm and unapologetic." },
    { speaker: "Iris", text: "Do not make me regret that.", expression: "neutral" },
    { speaker: null, text: "She does not pull away." },
  ],
};

const iris_ch2_ev1_sub_final_laugh: Dialogue = {
  id: "iris_ch2_ev1_sub_final_laugh",
  lines: [
    { speaker: "Iris", text: "Cute is... one way to put it.", expression: "happy" },
    { speaker: "Iris", text: "Fine. I will take cute.", expression: "happy" },
    { speaker: null, text: "You grin and pull her close." },
    { speaker: null, text: "You steal a quick kiss that turns slower." },
    { speaker: "Iris", text: "We should not do this in the hallway.", expression: "happy" },
    { speaker: null, text: "You agree and let her go." },
  ],
};

const iris_ch2_ev1_dom_intro: Dialogue = {
  id: "iris_ch2_ev1_dom_intro",
  lines: [
    { speaker: null, text: "She studies you, a spark of approval in her eyes." },
    { speaker: "Iris", text: "So you want me to lead.", expression: "neutral" },
    { speaker: "Iris", text: "I did not hate taking control.", expression: "seductive" },
    { speaker: "Iris", text: "It felt... honest.", expression: "neutral" },
    { speaker: "Iris", text: "But I will not do it if you are going to flinch.", expression: "neutral" },
    { speaker: "Iris", text: "Tell me what you want.", expression: "neutral" },
    {
      speaker: "You",
      text: "What do you say about the kiss?",
      choices: [
        {
          text: "Encourage her. \"I liked you taking control.\"",
          affectionChange: 1,
          lustChange: 1,
          dominanceChange: 1,
          nextDialogueId: "iris_ch2_ev1_dom_playful",
        },
        {
          text: "Push back. \"You were too much.\"",
          affectionChange: -1,
          lustChange: -1,
          dominanceChange: -2,
          nextDialogueId: "iris_ch2_ev1_dom_direct",
        },
        {
          text: "Stay neutral. \"I want clarity, not a power trip.\"",
          affectionChange: 0,
          lustChange: 0,
          dominanceChange: 0,
          nextDialogueId: "iris_ch2_ev1_dom_react_neutral",
        },
      ],
    },
  ],
};

const iris_ch2_ev1_dom_playful: Dialogue = {
  id: "iris_ch2_ev1_dom_playful",
  lines: [
    { speaker: "Iris", text: "Good. I do not want to pretend I am timid.", expression: "happy" },
    { speaker: "Iris", text: "I like when you listen.", expression: "seductive" },
    { speaker: null, text: "She steps closer, voice low." },
    { speaker: "Iris", text: "I have limits. Work is work.", expression: "neutral" },
    { speaker: "Iris", text: "If we do this, it is on our terms.", expression: "neutral" },
    { speaker: "Iris", text: "And I will not chase you.", expression: "neutral" },
    { speaker: "Iris", text: "That is me rambling again.", expression: "shy" },
    { speaker: "Iris", text: "Tell me if that scares you.", expression: "neutral" },
    {
      speaker: "You",
      text: "How do you respond?",
      choices: [
        {
          text: "Be kind. \"It does not scare me. I trust you.\"",
          affectionChange: 1,
          lustChange: 1,
          dominanceChange: 1,
          nextDialogueId: "iris_ch2_ev1_dom_final_nice",
        },
        {
          text: "Be sharp. \"Do not push too far.\"",
          affectionChange: -1,
          lustChange: 0,
          dominanceChange: -2,
          nextDialogueId: "iris_ch2_ev1_dom_final_mean",
        },
        {
          text: "Laugh it off. \"You are scary and cute.\"",
          affectionChange: 1,
          lustChange: 0,
          dominanceChange: 1,
          nextDialogueId: "iris_ch2_ev1_dom_final_laugh",
        },
      ],
    },
  ],
};

const iris_ch2_ev1_dom_direct: Dialogue = {
  id: "iris_ch2_ev1_dom_direct",
  lines: [
    { speaker: "Iris", text: "Too much?", expression: "neutral" },
    { speaker: "Iris", text: "Then say that before you let me get that close.", expression: "neutral" },
    { speaker: null, text: "Her expression hardens for a moment." },
    { speaker: "Iris", text: "I am not apologizing for wanting you.", expression: "neutral" },
    { speaker: "Iris", text: "But I will not push someone who does not want it.", expression: "neutral" },
    { speaker: "Iris", text: "So be clear.", expression: "neutral" },
    { speaker: "Iris", text: "Do you want this, or do you want distance?", expression: "neutral" },
    {
      speaker: "You",
      text: "How do you respond?",
      choices: [
        {
          text: "Be kind. \"I want it. Just slower.\"",
          affectionChange: 1,
          lustChange: 1,
          dominanceChange: 1,
          nextDialogueId: "iris_ch2_ev1_dom_final_nice",
        },
        {
          text: "Be sharp. \"Do not test me.\"",
          affectionChange: -1,
          lustChange: 0,
          dominanceChange: -2,
          nextDialogueId: "iris_ch2_ev1_dom_final_mean",
        },
        {
          text: "Laugh it off. \"Distance is not what I want.\"",
          affectionChange: 1,
          lustChange: 0,
          dominanceChange: 1,
          nextDialogueId: "iris_ch2_ev1_dom_final_laugh",
        },
      ],
    },
  ],
};

const iris_ch2_ev1_dom_react_neutral: Dialogue = {
  id: "iris_ch2_ev1_dom_react_neutral",
  lines: [
    { speaker: "Iris", text: "Clarity. I can do that.", expression: "neutral" },
    { speaker: "Iris", text: "I do not want a power trip either.", expression: "neutral" },
    { speaker: null, text: "She nods, thinking." },
    { speaker: "Iris", text: "I want something honest, not performative.", expression: "neutral" },
    { speaker: "Iris", text: "If we do this, it is because we both want it.", expression: "neutral" },
    { speaker: "Iris", text: "And because we can handle it.", expression: "neutral" },
    { speaker: "Iris", text: "So tell me where you stand.", expression: "neutral" },
    {
      speaker: "You",
      text: "How do you respond?",
      choices: [
        {
          text: "Be kind. \"I want it. And I trust you.\"",
          affectionChange: 1,
          lustChange: 1,
          dominanceChange: 1,
          nextDialogueId: "iris_ch2_ev1_dom_final_nice",
        },
        {
          text: "Be sharp. \"Then do not push your luck.\"",
          affectionChange: -1,
          lustChange: 0,
          dominanceChange: -2,
          nextDialogueId: "iris_ch2_ev1_dom_final_mean",
        },
        {
          text: "Laugh it off. \"I stand right here.\"",
          affectionChange: 1,
          lustChange: 0,
          dominanceChange: 1,
          nextDialogueId: "iris_ch2_ev1_dom_final_laugh",
        },
      ],
    },
  ],
};

const iris_ch2_ev1_dom_final_nice: Dialogue = {
  id: "iris_ch2_ev1_dom_final_nice",
  lines: [
    { speaker: "Iris", text: "Then listen.", expression: "seductive" },
    { speaker: "Iris", text: "We keep it discreet, and I take the lead when we are alone.", expression: "neutral" },
    { speaker: null, text: "She hooks a finger under your collar." },
    { speaker: null, text: "She steals a kiss, slow and deliberate." },
    { speaker: "Iris", text: "That is ours.", expression: "happy" },
    { speaker: null, text: "She pulls back with a satisfied smile." },
  ],
};

const iris_ch2_ev1_dom_final_mean: Dialogue = {
  id: "iris_ch2_ev1_dom_final_mean",
  lines: [
    { speaker: "Iris", text: "Do not provoke me and then act surprised.", expression: "neutral" },
    { speaker: "Iris", text: "If you want distance, ask. If you want me, be honest.", expression: "neutral" },
    { speaker: null, text: "She closes the gap and kisses you anyway, testing your reaction." },
    { speaker: "Iris", text: "That is your warning.", expression: "neutral" },
    { speaker: null, text: "You do not stop her." },
    { speaker: null, text: "She leaves you a little breathless." },
  ],
};

const iris_ch2_ev1_dom_final_laugh: Dialogue = {
  id: "iris_ch2_ev1_dom_final_laugh",
  lines: [
    { speaker: "Iris", text: "Cute, huh?", expression: "happy" },
    { speaker: "Iris", text: "Then you will survive this.", expression: "happy" },
    { speaker: null, text: "She steps in, taking a kiss while you laugh." },
    { speaker: "Iris", text: "We are not doing this in the hallway again.", expression: "neutral" },
    { speaker: null, text: "She brushes her thumb over your lip." },
    { speaker: null, text: "She walks away like she owns the moment." },
  ],
};

const iris_ch2_ev1_neutral_dialogue: Dialogue = {
  id: "iris_ch2_ev1_neutral_dialogue",
  lines: [
    { speaker: null, text: "She lets out a slow breath." },
    { speaker: "Iris", text: "Thank you for saying it like an adult.", expression: "neutral" },
    { speaker: "Iris", text: "I liked the kiss. That is the truth.", expression: "shy" },
    { speaker: "Iris", text: "I also like my job and my sanity.", expression: "neutral" },
    { speaker: "Iris", text: "So I want something careful and real.", expression: "neutral" },
    { speaker: "Iris", text: "Tell me what you want.", expression: "neutral" },
    {
      speaker: "You",
      text: "What do you say about the kiss?",
      choices: [
        {
          text: "Be warm. \"I liked it. I want more.\"",
          affectionChange: 1,
          lustChange: 1,
          dominanceChange: 0,
          nextDialogueId: "iris_ch2_ev1_neutral_react_nice",
        },
        {
          text: "Be mean. \"Do not make a big deal of it.\"",
          affectionChange: -1,
          lustChange: -1,
          dominanceChange: -1,
          nextDialogueId: "iris_ch2_ev1_neutral_react_mean",
        },
        {
          text: "Be neutral. \"I want us to be careful.\"",
          affectionChange: 0,
          lustChange: 0,
          dominanceChange: 0,
          nextDialogueId: "iris_ch2_ev1_neutral_react_neutral",
        },
      ],
    },
  ],
};

const iris_ch2_ev1_neutral_react_nice: Dialogue = {
  id: "iris_ch2_ev1_neutral_react_nice",
  lines: [
    { speaker: "Iris", text: "I am glad you said that.", expression: "happy" },
    { speaker: "Iris", text: "I was worried it would sound needy.", expression: "shy" },
    { speaker: null, text: "She laughs softly, then keeps talking." },
    { speaker: "Iris", text: "I overthink everything.", expression: "neutral" },
    { speaker: "Iris", text: "If this becomes a rumor, it hurts both of us.", expression: "neutral" },
    { speaker: "Iris", text: "But pretending it did not happen feels worse.", expression: "shy" },
    { speaker: "Iris", text: "So I am trying to be honest without being reckless.", expression: "neutral" },
    { speaker: "Iris", text: "Does that make sense?", expression: "neutral" },
    {
      speaker: "You",
      text: "How do you respond?",
      choices: [
        {
          text: "Be kind. \"It makes sense. I am with you.\"",
          affectionChange: 1,
          lustChange: 1,
          dominanceChange: 0,
          nextDialogueId: "iris_ch2_ev1_neutral_final_nice",
        },
        {
          text: "Be sharp. \"Then stop spinning it out.\"",
          affectionChange: -1,
          lustChange: 0,
          dominanceChange: -1,
          nextDialogueId: "iris_ch2_ev1_neutral_final_mean",
        },
        {
          text: "Laugh it off. \"You are cute when you worry.\"",
          affectionChange: 1,
          lustChange: 0,
          dominanceChange: 0,
          nextDialogueId: "iris_ch2_ev1_neutral_final_laugh",
        },
      ],
    },
  ],
};

const iris_ch2_ev1_neutral_react_mean: Dialogue = {
  id: "iris_ch2_ev1_neutral_react_mean",
  lines: [
    { speaker: "Iris", text: "Ouch.", expression: "neutral" },
    { speaker: "Iris", text: "You could have said that without the sting.", expression: "neutral" },
    { speaker: null, text: "She steadies her breath." },
    { speaker: "Iris", text: "I am not asking for a declaration. I am asking for respect.", expression: "neutral" },
    { speaker: "Iris", text: "If you do not want this, say so.", expression: "neutral" },
    { speaker: "Iris", text: "If you do, do not make me feel foolish.", expression: "neutral" },
    {
      speaker: "You",
      text: "How do you respond?",
      choices: [
        {
          text: "Be kind. \"You are not foolish. I want this.\"",
          affectionChange: 1,
          lustChange: 1,
          dominanceChange: 0,
          nextDialogueId: "iris_ch2_ev1_neutral_final_nice",
        },
        {
          text: "Be sharp. \"Then toughen up.\"",
          affectionChange: -1,
          lustChange: 0,
          dominanceChange: -1,
          nextDialogueId: "iris_ch2_ev1_neutral_final_mean",
        },
        {
          text: "Laugh it off. \"I am not trying to be cruel.\"",
          affectionChange: 1,
          lustChange: 0,
          dominanceChange: 0,
          nextDialogueId: "iris_ch2_ev1_neutral_final_laugh",
        },
      ],
    },
  ],
};

const iris_ch2_ev1_neutral_react_neutral: Dialogue = {
  id: "iris_ch2_ev1_neutral_react_neutral",
  lines: [
    { speaker: "Iris", text: "Fair.", expression: "neutral" },
    { speaker: "Iris", text: "That is probably the right speed.", expression: "neutral" },
    { speaker: null, text: "She starts to ramble anyway." },
    { speaker: "Iris", text: "I do not want to hide, but I also do not want a scene.", expression: "neutral" },
    { speaker: "Iris", text: "I want it to feel like ours.", expression: "neutral" },
    { speaker: "Iris", text: "Not a secret, just private.", expression: "neutral" },
    { speaker: "Iris", text: "So... where do we land?", expression: "neutral" },
    {
      speaker: "You",
      text: "How do you respond?",
      choices: [
        {
          text: "Be kind. \"We land together.\"",
          affectionChange: 1,
          lustChange: 1,
          dominanceChange: 0,
          nextDialogueId: "iris_ch2_ev1_neutral_final_nice",
        },
        {
          text: "Be sharp. \"We land if you stop hesitating.\"",
          affectionChange: -1,
          lustChange: 0,
          dominanceChange: -1,
          nextDialogueId: "iris_ch2_ev1_neutral_final_mean",
        },
        {
          text: "Laugh it off. \"We land somewhere nice.\"",
          affectionChange: 1,
          lustChange: 0,
          dominanceChange: 0,
          nextDialogueId: "iris_ch2_ev1_neutral_final_laugh",
        },
      ],
    },
  ],
};

const iris_ch2_ev1_neutral_final_nice: Dialogue = {
  id: "iris_ch2_ev1_neutral_final_nice",
  lines: [
    { speaker: "Iris", text: "Okay. We take it slow.", expression: "happy" },
    { speaker: "Iris", text: "No sneaking, just choices.", expression: "neutral" },
    { speaker: null, text: "You lean in together." },
    { speaker: null, text: "The kiss is mutual and unhurried." },
    { speaker: "Iris", text: "We will figure it out.", expression: "happy" },
    { speaker: null, text: "You both step back, a little lighter." },
  ],
};

const iris_ch2_ev1_neutral_final_mean: Dialogue = {
  id: "iris_ch2_ev1_neutral_final_mean",
  lines: [
    { speaker: "Iris", text: "Then we set a boundary.", expression: "neutral" },
    { speaker: "Iris", text: "No games. No half answers.", expression: "neutral" },
    { speaker: null, text: "You still close the distance, careful." },
    { speaker: null, text: "The kiss is brief, like a promise and a warning." },
    { speaker: "Iris", text: "Do not make me regret being honest.", expression: "neutral" },
    { speaker: null, text: "You nod." },
  ],
};

const iris_ch2_ev1_neutral_final_laugh: Dialogue = {
  id: "iris_ch2_ev1_neutral_final_laugh",
  lines: [
    { speaker: "Iris", text: "Cute is acceptable.", expression: "happy" },
    { speaker: "Iris", text: "I can live with cute.", expression: "happy" },
    { speaker: null, text: "You both laugh, then lean in at the same time." },
    { speaker: null, text: "The kiss is mutual and a little shy." },
    { speaker: "Iris", text: "We should go before someone sees.", expression: "happy" },
    { speaker: null, text: "You agree." },
  ],
};

export const irisEvent1Dialogues: Record<string, Dialogue> = {
  iris_ch2_ev1_intro: iris_ch2_ev1_intro,
  iris_ch2_ev1_sub_intro: iris_ch2_ev1_sub_intro,
  iris_ch2_ev1_sub_reassure: iris_ch2_ev1_sub_reassure,
  iris_ch2_ev1_sub_give_space: iris_ch2_ev1_sub_give_space,
  iris_ch2_ev1_sub_react_neutral: iris_ch2_ev1_sub_react_neutral,
  iris_ch2_ev1_sub_final_nice: iris_ch2_ev1_sub_final_nice,
  iris_ch2_ev1_sub_final_mean: iris_ch2_ev1_sub_final_mean,
  iris_ch2_ev1_sub_final_laugh: iris_ch2_ev1_sub_final_laugh,
  iris_ch2_ev1_dom_intro: iris_ch2_ev1_dom_intro,
  iris_ch2_ev1_dom_playful: iris_ch2_ev1_dom_playful,
  iris_ch2_ev1_dom_direct: iris_ch2_ev1_dom_direct,
  iris_ch2_ev1_dom_react_neutral: iris_ch2_ev1_dom_react_neutral,
  iris_ch2_ev1_dom_final_nice: iris_ch2_ev1_dom_final_nice,
  iris_ch2_ev1_dom_final_mean: iris_ch2_ev1_dom_final_mean,
  iris_ch2_ev1_dom_final_laugh: iris_ch2_ev1_dom_final_laugh,
  iris_ch2_ev1_neutral_dialogue: iris_ch2_ev1_neutral_dialogue,
  iris_ch2_ev1_neutral_react_nice: iris_ch2_ev1_neutral_react_nice,
  iris_ch2_ev1_neutral_react_mean: iris_ch2_ev1_neutral_react_mean,
  iris_ch2_ev1_neutral_react_neutral: iris_ch2_ev1_neutral_react_neutral,
  iris_ch2_ev1_neutral_final_nice: iris_ch2_ev1_neutral_final_nice,
  iris_ch2_ev1_neutral_final_mean: iris_ch2_ev1_neutral_final_mean,
  iris_ch2_ev1_neutral_final_laugh: iris_ch2_ev1_neutral_final_laugh,
};

export const irisEvent1Events: CharacterEvent[] = [
  {
    id: "iris_ch2_ev1",
    name: "The Morning After",
    description: "You see Iris for the first time since the kiss.",
    quest: { title: "The Morning After", description: "Find Iris at the university to clear the air." },
    priority: 190, repeatable: false,
    conditions: { requiredFlags: ["irisCh1FinaleComplete"], minAffection: 10, minLust: 10 },
    dialogue: iris_ch2_ev1_intro,
    rewards: { setFlags: ["irisCh2Ev1_Done"] },
  },
];

```

### src\data\events\chapter2\iris\event2.ts
```ts
import type { Dialogue } from "../../../dialogues";
import { CharacterEvent } from "../../types";

// Event 2: Public Encounter
// Description: You run into Iris outside of work.

const iris_ch2_ev2_sub_dialogue: Dialogue = {
    id: "iris_ch2_ev2_sub_dialogue",
    lines: [
        { speaker: null, text: "You spot Iris at the mall, staring blankly at a shop window. She seems lonely, lost in her own world." },
        { speaker: "Iris", text: "Oh. Hey, {playerName}.", expression: "surprised" },
        { speaker: "Iris", text: "I did not hear you walk up.", expression: "shy" },
        { speaker: "You", text: "How do you approach her?", choices: [
            { text: "Be gentle. \"You okay?\"", affectionChange: 1, lustChange: 0, dominanceChange: -1 },
            { text: "Be teasing. \"Daydreaming again?\"", affectionChange: 0, lustChange: 1, dominanceChange: 0 },
            { text: "Be neutral. \"Long day?\"", affectionChange: 0, lustChange: 0, dominanceChange: 1 }
        ]},
        { speaker: "Iris", text: "I was just thinking. It is been a while since I wandered around by myself.", expression: "sad" },
        { speaker: "Iris", text: "After last night, I could not focus on work.", expression: "neutral" },
        { speaker: "Iris", text: "I kept replaying it.", expression: "shy" },
        { speaker: "Iris", text: "Part of me felt brave. Part of me felt reckless.", expression: "neutral" },
        { speaker: "You", text: "How do you answer?", choices: [
            { text: "Reassure her. \"It felt right.\"", affectionChange: 1, lustChange: 1, dominanceChange: -1 },
            { text: "Keep it light. \"We did not hurt anyone.\"", affectionChange: 0, lustChange: 0, dominanceChange: 0 },
            { text: "Be careful. \"We should be smart about it.\"", affectionChange: 0, lustChange: 0, dominanceChange: 1 }
        ]},
        { speaker: "Iris", text: "Thank you. I needed a normal answer.", expression: "shy" },
        { speaker: "Iris", text: "I am not used to letting someone see me like that.", expression: "neutral" },
        { speaker: "Iris", text: "Especially you.", expression: "shy" },
        { speaker: "Iris", text: "Do you regret it?", expression: "neutral" },
        { speaker: "You", text: "What do you say?", choices: [
            { text: "No. \"Not even a little.\"", affectionChange: 1, lustChange: 1, dominanceChange: -1 },
            { text: "Not sure. \"I am still sorting it out.\"", affectionChange: 0, lustChange: 0, dominanceChange: 0 },
            { text: "Cautious. \"It was nice, but risky.\"", affectionChange: 0, lustChange: 0, dominanceChange: 1 }
        ]},
        { speaker: "Iris", text: "Okay. I can work with that.", expression: "neutral" },
        { speaker: "Iris", text: "I do not want to hide. I just want to be careful.", expression: "neutral" },
        { speaker: "Iris", text: "So maybe we keep it small for now.", expression: "shy" },
        { speaker: null, text: "She glances back at the window, then at you." },
        { speaker: "Iris", text: "Do you want to walk with me?", expression: "shy" },
        { speaker: "You", text: "Your answer?", choices: [
            { text: "Of course. \"I am here.\"", affectionChange: 1, lustChange: 0, dominanceChange: -1 },
            { text: "Only if you relax a little.", affectionChange: 0, lustChange: 1, dominanceChange: 0 },
            { text: "I would like that.", affectionChange: 0, lustChange: 0, dominanceChange: 1 }
        ]},
        { speaker: null, text: "You walk together through the mall, letting the noise fill the quiet." },
        { speaker: "Iris", text: "Thank you for finding me.", expression: "happy" },
        { speaker: "Iris", text: "It feels less lonely.", expression: "shy" },
        { speaker: null, text: "Her smile softens, and the tension in her shoulders eases." },
        { speaker: "Iris", text: "We should get back. Classes will start soon.", expression: "neutral" },
        { speaker: "Iris", text: "But... not the last time, okay?", expression: "happy" },
        { speaker: null, text: "She hesitates, then gives you a small, hopeful nod." },
        { speaker: "You", text: "How do you leave it?", choices: [
            { text: "Promise. \"Not the last time.\"", affectionChange: 1, lustChange: 0, dominanceChange: -1 },
            { text: "Tease. \"Only if you keep looking at me like that.\"", affectionChange: 0, lustChange: 1, dominanceChange: 0 },
            { text: "Neutral. \"We will see.\"", affectionChange: 0, lustChange: 0, dominanceChange: 1 }
        ]},
        { speaker: "Iris", text: "Text me later.", expression: "happy" },
        { speaker: null, text: "She slips back into the crowd, but the distance feels smaller now." }
    ]
};

const iris_ch2_ev2_dom_dialogue: Dialogue = {
    id: "iris_ch2_ev2_dom_dialogue",
    lines: [
        { speaker: null, text: "You spot Iris at a cafe, confidently reading a book and sipping a latte." },
        { speaker: null, text: "She looks up as if sensing you, and a slow smirk spreads across her face." },
        { speaker: "Iris", text: "Fancy seeing you here, Professor.", expression: "happy" },
        { speaker: "Iris", text: "Come on. Sit.", expression: "seductive" },
        { speaker: "You", text: "How do you respond?", choices: [
            { text: "Play along. \"Yes, ma'am.\"", affectionChange: 0, lustChange: 1, dominanceChange: 1 },
            { text: "Tease. \"You saving a seat for me?\"", affectionChange: 1, lustChange: 0, dominanceChange: 0 },
            { text: "Keep it cool. \"Sure.\"", affectionChange: 0, lustChange: 0, dominanceChange: -1 }
        ]},
        { speaker: "Iris", text: "Good.", expression: "happy" },
        { speaker: "Iris", text: "I like it when you do not hesitate.", expression: "seductive" },
        { speaker: "Iris", text: "About last night...", expression: "neutral" },
        { speaker: "Iris", text: "I took control and you let me.", expression: "neutral" },
        { speaker: "Iris", text: "Tell me that was not a mistake.", expression: "neutral" },
        { speaker: "You", text: "What do you say?", choices: [
            { text: "Encourage her. \"It was not a mistake. I liked it.\"", affectionChange: 1, lustChange: 1, dominanceChange: 1 },
            { text: "Set limits. \"I liked it, but we go slow.\"", affectionChange: 1, lustChange: 0, dominanceChange: 0 },
            { text: "Push back. \"Do not get ahead of yourself.\"", affectionChange: -1, lustChange: 0, dominanceChange: -1 }
        ]},
        { speaker: "Iris", text: "Good. Then we are clear.", expression: "neutral" },
        { speaker: "Iris", text: "Work is work. We keep that clean.", expression: "neutral" },
        { speaker: "Iris", text: "But outside of work?", expression: "seductive" },
        { speaker: "Iris", text: "I want to be honest with you.", expression: "neutral" },
        { speaker: "Iris", text: "And I want you to be honest back.", expression: "neutral" },
        { speaker: "You", text: "How do you reply?", choices: [
            { text: "Agree. \"You will get honesty.\"", affectionChange: 1, lustChange: 0, dominanceChange: 1 },
            { text: "Challenge her. \"Then show me.\"", affectionChange: 0, lustChange: 1, dominanceChange: 1 },
            { text: "Neutral. \"We will keep it clean.\"", affectionChange: 0, lustChange: 0, dominanceChange: -1 }
        ]},
        { speaker: "Iris", text: "That is better.", expression: "happy" },
        { speaker: "Iris", text: "You are easy to tempt.", expression: "seductive" },
        { speaker: null, text: "She taps the edge of your cup with her finger." },
        { speaker: "Iris", text: "I should get back to campus.", expression: "neutral" },
        { speaker: "Iris", text: "But before I go...", expression: "seductive" },
        { speaker: "You", text: "How do you handle it?", choices: [
            { text: "Let her lead.", affectionChange: 0, lustChange: 1, dominanceChange: 1 },
            { text: "Meet her halfway.", affectionChange: 1, lustChange: 0, dominanceChange: 0 },
            { text: "Playfully stop her.", affectionChange: -1, lustChange: 0, dominanceChange: -1 }
        ]},
        { speaker: null, text: "Iris leans in and steals a kiss, slow and deliberate." },
        { speaker: null, text: "Her eyes linger on you for a beat longer than necessary." },
        { speaker: "Iris", text: "That is for later.", expression: "happy" },
        { speaker: "Iris", text: "Text me when you are free.", expression: "neutral" },
        { speaker: "You", text: "Your answer?", choices: [
            { text: "Soon.\"", affectionChange: 0, lustChange: 1, dominanceChange: 1 },
            { text: "Tonight.\"", affectionChange: 1, lustChange: 0, dominanceChange: 0 },
            { text: "We will see.\"", affectionChange: 0, lustChange: 0, dominanceChange: -1 }
        ]},
        { speaker: "Iris", text: "Do not keep me waiting.", expression: "seductive" },
        { speaker: null, text: "She leaves with a confident smile, and you finish your coffee slowly." }
    ]
};

const iris_ch2_ev2_neutral_dialogue: Dialogue = {
    id: "iris_ch2_ev2_neutral_dialogue",
    lines: [
        { speaker: null, text: "While browsing in a bookstore, you reach for a novel just as someone else does." },
        { speaker: null, text: "It is Iris. You both laugh." },
        { speaker: "Iris", text: "Great minds, I guess.", expression: "happy" },
        { speaker: "Iris", text: "Or we just have good taste.", expression: "happy" },
        { speaker: "You", text: "How do you respond?", choices: [
            { text: "Flirt. \"Then we should read together.\"", affectionChange: 1, lustChange: 1, dominanceChange: 0 },
            { text: "Tease. \"You are copying my shelf.\"", affectionChange: 0, lustChange: 0, dominanceChange: 1 },
            { text: "Neutral. \"I have good taste, yes.\"", affectionChange: 0, lustChange: 0, dominanceChange: -1 }
        ]},
        { speaker: "Iris", text: "I could get used to this kind of coincidence.", expression: "happy" },
        { speaker: "Iris", text: "It has been a strange week.", expression: "neutral" },
        { speaker: "Iris", text: "Last night made it stranger.", expression: "shy" },
        { speaker: "Iris", text: "I keep thinking about it.", expression: "neutral" },
        { speaker: "Iris", text: "And I keep wondering if you regret it.", expression: "neutral" },
        { speaker: "You", text: "What do you say?", choices: [
            { text: "Honest. \"I do not regret it.\"", affectionChange: 1, lustChange: 1, dominanceChange: 0 },
            { text: "Careful. \"It was nice, but risky.\"", affectionChange: 0, lustChange: 0, dominanceChange: 1 },
            { text: "Playful. \"It is living rent free in my head too.\"", affectionChange: 1, lustChange: 0, dominanceChange: -1 }
        ]},
        { speaker: "Iris", text: "That makes me feel better.", expression: "happy" },
        { speaker: "Iris", text: "I want this to be good, not messy.", expression: "neutral" },
        { speaker: "Iris", text: "I do not want to rush it.", expression: "neutral" },
        { speaker: "Iris", text: "But I also do not want to pretend it did not happen.", expression: "shy" },
        { speaker: "Iris", text: "That is the part that keeps looping in my head.", expression: "neutral" },
        { speaker: null, text: "She brushes the edge of the book with her thumb." },
        { speaker: "Iris", text: "It is strange, being this honest with you.", expression: "shy" },
        { speaker: "Iris", text: "It also feels... good.", expression: "happy" },
        { speaker: "Iris", text: "So I keep asking myself what is fair to both of us.", expression: "neutral" },
        { speaker: "Iris", text: "And I ramble. Sorry.", expression: "shy" },
        { speaker: "You", text: "How do you respond?", choices: [
            { text: "Kind. \"I like hearing you talk.\"", affectionChange: 1, lustChange: 0, dominanceChange: 0 },
            { text: "Light. \"It is cute.\"", affectionChange: 0, lustChange: 0, dominanceChange: -1 },
            { text: "Direct. \"Say what you want.\"", affectionChange: 0, lustChange: 0, dominanceChange: 1 }
        ]},
        { speaker: "Iris", text: "I want something honest and slow.", expression: "neutral" },
        { speaker: "Iris", text: "Coffee is easier than hallways.", expression: "happy" },
        { speaker: "Iris", text: "And books are easier than rumors.", expression: "neutral" },
        { speaker: null, text: "She smiles and taps the cover of the book you both reached for." },
        { speaker: "Iris", text: "Maybe we trade notes sometime.", expression: "happy" },
        { speaker: "You", text: "Your answer?", choices: [
            { text: "Yes. \"Pick a day.\"", affectionChange: 1, lustChange: 0, dominanceChange: 0 },
            { text: "Flirt. \"Only if you promise to behave.\"", affectionChange: 0, lustChange: 1, dominanceChange: 0 },
            { text: "Neutral. \"We will see.\"", affectionChange: 0, lustChange: 0, dominanceChange: 1 }
        ]},
        { speaker: "Iris", text: "Deal.", expression: "happy" },
        { speaker: null, text: "You part with an easy smile and a shared book in hand." }
    ]
};

export const irisEvent2Dialogues: Record<string, Dialogue> = {
  iris_ch2_ev2_sub_dialogue: iris_ch2_ev2_sub_dialogue,
  iris_ch2_ev2_dom_dialogue: iris_ch2_ev2_dom_dialogue,
  iris_ch2_ev2_neutral_dialogue: iris_ch2_ev2_neutral_dialogue,
};

export const irisEvent2Events: CharacterEvent[] = [
  {
    id: "iris_ch2_ev2_sub",
    name: "Public Encounter",
    description: "You run into Iris outside of work.",
    quest: { title: "Chance Encounter", description: "You might run into Iris while out and about." },
    priority: 180, repeatable: false,
    conditions: {
      requiredFlags: ["irisCh2Ev1_Done"],
      requiredLocation: "Mall",
      minAffection: 15,
      minLust: 10,
      maxDominance: -10,
    },
    dialogue: iris_ch2_ev2_sub_dialogue,
    rewards: { girlStats: { affection: 2 }, setFlags: ["irisCh2Ev2_Done"] },
  },
  {
    id: "iris_ch2_ev2_dom",
    name: "Public Encounter",
    description: "You run into Iris outside of work.",
    quest: { title: "Chance Encounter", description: "You might run into Iris while out and about." },
    priority: 180, repeatable: false,
    conditions: {
      requiredFlags: ["irisCh2Ev1_Done"],
      requiredLocation: "Cafe",
      minAffection: 15,
      minLust: 10,
      minDominance: 10,
    },
    dialogue: iris_ch2_ev2_dom_dialogue,
    rewards: { girlStats: { affection: 1, lust: 1 }, setFlags: ["irisCh2Ev2_Done"] },
  },
  {
    id: "iris_ch2_ev2_neutral",
    name: "Public Encounter",
    description: "You run into Iris outside of work.",
    quest: { title: "Chance Encounter", description: "You might run into Iris while out and about." },
    priority: 180, repeatable: false,
    conditions: {
      requiredFlags: ["irisCh2Ev1_Done"],
      requiredLocation: "Mall",
      minAffection: 15,
      minLust: 10,
      minDominance: -9,
      maxDominance: 9,
    }, // Assuming a bookstore is in the mall
    dialogue: iris_ch2_ev2_neutral_dialogue,
    rewards: { girlStats: { affection: 2 }, setFlags: ["irisCh2Ev2_Done"] },
  },
];

```

### src\data\events\chapter2\iris\event3.ts
```ts
import type { Dialogue } from "../../../dialogues";
import { CharacterEvent } from "../../types";

// Event 3: No More Hiding
// Description: Iris forces a decision about keeping things secret at school.

const iris_ch2_ev3_sub_dialogue: Dialogue = {
  id: "iris_ch2_ev3_sub_dialogue",
  lines: [
    {
      speaker: null,
      text: "You catch Iris in the faculty corridor between classes. She hesitates, then pulls you toward an empty classroom door.",
    },
    {
      speaker: "Iris",
      text: "We have to be careful. This place is all eyes and rumors.",
      expression: "neutral",
    },
    {
      speaker: "Iris",
      text: "But I am tired of hiding. I do not want to pretend you are just a colleague.",
      expression: "shy",
    },
    {
      speaker: "Iris",
      text: "I want to be able to look at you without flinching.",
      expression: "shy",
    },
    {
      speaker: "Iris",
      text: "So... what do we do?",
      expression: "neutral",
    },
    {
      speaker: "You",
      text: "How do you answer?",
      choices: [
        {
          text: "We stop hiding. Quiet, but not secret.",
          affectionChange: 1,
          dominanceChange: 1,
          setFlags: ["irisSchoolKissUnlocked"],
        },
        {
          text: "We keep it quiet. Not at school.",
          affectionChange: -1,
          dominanceChange: -1,
          setFlags: ["irisPublicRefused"],
        },
      ],
    },
  ],
};

const iris_ch2_ev3_dom_dialogue: Dialogue = {
  id: "iris_ch2_ev3_dom_dialogue",
  lines: [
    {
      speaker: null,
      text: "Iris stops you in the hallway with a look that does not ask permission.",
    },
    { speaker: "Iris", text: "I am done sneaking.", expression: "seductive" },
    {
      speaker: "Iris",
      text: "We stop hiding what this is, or we stop this entirely.",
      expression: "neutral",
    },
    {
      speaker: "Iris",
      text: "Pick one.",
      expression: "neutral",
    },
    {
      speaker: "You",
      text: "What do you say?",
      choices: [
        {
          text: "Agree. No more hiding.",
          affectionChange: 1,
          dominanceChange: -1,
          setFlags: ["irisSchoolKissUnlocked"],
        },
        {
          text: "No. Not here.",
          affectionChange: -2,
          dominanceChange: 1,
          setFlags: ["irisPublicRefused"],
        },
      ],
    },
  ],
};

const iris_ch2_ev3_neutral_dialogue: Dialogue = {
  id: "iris_ch2_ev3_neutral_dialogue",
  lines: [
    {
      speaker: null,
      text: "You and Iris end up alone in a quiet office, the door half shut and the campus hum muted outside.",
    },
    {
      speaker: "Iris",
      text: "We keep circling the same problem. It is dangerous here.",
      expression: "neutral",
    },
    {
      speaker: "Iris",
      text: "I am tired of hiding, but I am also not ready to be official.",
      expression: "shy",
    },
    {
      speaker: "Iris",
      text: "I want to keep exploring this... without pretending it is nothing.",
      expression: "neutral",
    },
    {
      speaker: null,
      text: "You can hear students laughing down the hall, the sound reminding you both exactly where you are.",
    },
    {
      speaker: "Iris",
      text: "I do not want to be reckless, but I also do not want to be erased.",
      expression: "shy",
    },
    {
      speaker: "Iris",
      text: "So maybe it is simple. We are honest with each other. We are careful with everyone else.",
      expression: "neutral",
    },
    {
      speaker: null,
      text: "You sit with that for a moment, the two of you balancing on a line between fear and wanting.",
    },
    {
      speaker: "Iris",
      text: "Maybe we do this carefully. No labels yet. Just honesty.",
      expression: "happy",
    },
    {
      speaker: "Iris",
      text: "If we keep exploring, it has to mean something.",
      expression: "neutral",
    },
    {
      speaker: "You",
      text: "How do you answer?",
      choices: [
        {
          text: "Keep exploring. No labels yet.",
          affectionChange: 1,
          dominanceChange: 0,
          setFlags: ["irisSchoolKissUnlocked"],
        },
        {
          text: "This is too risky. We should pull back.",
          affectionChange: -2,
          dominanceChange: 1,
          setFlags: ["irisPublicRefused"],
        },
      ],
    },
  ],
};

export const irisEvent3Dialogues: Record<string, Dialogue> = {
  iris_ch2_ev3_sub_dialogue: iris_ch2_ev3_sub_dialogue,
  iris_ch2_ev3_dom_dialogue: iris_ch2_ev3_dom_dialogue,
  iris_ch2_ev3_neutral_dialogue: iris_ch2_ev3_neutral_dialogue,
};

export const irisEvent3Events: CharacterEvent[] = [
  {
    id: "iris_ch2_ev3_sub",
    name: "No More Hiding",
    description: "Iris wants to stop hiding at school.",
    quest: {
      title: "No More Hiding",
      description: "Talk to Iris at the university and decide how public this should be.",
    },
    priority: 170,
    repeatable: false,
    conditions: {
      requiredFlags: ["irisCh2Ev2_Done"],
      requiredLocation: "University Hallway",
      minHour: 9,
      maxHour: 17,
      maxDominance: -10,
    },
    dialogue: iris_ch2_ev3_sub_dialogue,
    rewards: { setFlags: ["irisCh2Ev3_Done"] },
  },
  {
    id: "iris_ch2_ev3_dom",
    name: "No More Hiding",
    description: "Iris wants to stop hiding at school.",
    quest: {
      title: "No More Hiding",
      description: "Talk to Iris at the university and decide how public this should be.",
    },
    priority: 170,
    repeatable: false,
    conditions: {
      requiredFlags: ["irisCh2Ev2_Done"],
      requiredLocation: "University Hallway",
      minHour: 9,
      maxHour: 17,
      minDominance: 10,
    },
    dialogue: iris_ch2_ev3_dom_dialogue,
    rewards: { setFlags: ["irisCh2Ev3_Done"] },
  },
  {
    id: "iris_ch2_ev3_neutral",
    name: "No More Hiding",
    description: "Iris wants to stop hiding at school.",
    quest: {
      title: "No More Hiding",
      description: "Talk to Iris at the university and decide how public this should be.",
    },
    priority: 170,
    repeatable: false,
    conditions: {
      requiredFlags: ["irisCh2Ev2_Done"],
      requiredLocation: "University Hallway",
      minHour: 9,
      maxHour: 17,
      minDominance: -9,
      maxDominance: 9,
    },
    dialogue: iris_ch2_ev3_neutral_dialogue,
    rewards: { setFlags: ["irisCh2Ev3_Done"] },
  },
];

```

### src\data\events\chapter2\iris\event4.ts
```ts
import type { Dialogue } from "../../../dialogues";
import type { CharacterEvent } from "../../types";

// Event 4: The Turning Point
// Description: Route-specific fallout after "No More Hiding", before the nightclub date.

const iris_ch2_ev4_sub_accepted_dialogue: Dialogue = {
  id: "iris_ch2_ev4_sub_accepted_dialogue",
  lines: [
    {
      speaker: null,
      text: "You find Iris in the hallway between classes. She is already watching for you before you speak, gaze lingering a beat too long.",
    },
    {
      speaker: "Iris",
      text: "I have been lighter all day.",
      expression: "happy",
    },
    {
      speaker: "Iris",
      text: "I keep catching myself looking for you in every corridor, wondering if you'll pull me in again.",
      expression: "shy",
    },
    {
      speaker: "Iris",
      text: "I know that sounds dangerous. I just feel steadier when you are close.",
      expression: "shy",
    },
    {
      speaker: "You",
      text: "You do not have to shrink around me.",
    },
    {
      speaker: "Iris",
      text: "I am trying not to lean too hard, but I like what we are becoming.",
      expression: "neutral",
    },
    {
      speaker: "You",
      text: "How do you answer?",
      choices: [
        {
          text: "Warmly. Lean if you need to.",
          affectionChange: 2,
          lustChange: 0,
          dominanceChange: -1,
        },
        {
          text: "Playful. Careful, I might get used to that.",
          affectionChange: 1,
          lustChange: 1,
          dominanceChange: 0,
        },
        {
          text: "Grounded. Stay close, but keep your footing.",
          affectionChange: 1,
          lustChange: 0,
          dominanceChange: 1,
        },
      ],
    },
    {
      speaker: null,
      text: "She exhales slowly, some of the tension leaving her shoulders.",
    },
    {
      speaker: "Iris",
      text: "I do not want to play detached anymore.",
      expression: "neutral",
    },
    {
      speaker: "Iris",
      text: "When we pass each other and pretend nothing happened, it stings.",
      expression: "shy",
    },
    {
      speaker: "You",
      text: "Then stop pretending with me.",
    },
    {
      speaker: "Iris",
      text: "Even hearing that helps.",
      expression: "happy",
    },
    {
      speaker: "Iris",
      text: "I started memorizing your schedule without meaning to.",
      expression: "shy",
    },
    {
      speaker: "You",
      text: "That sounds like a confession.",
    },
    {
      speaker: "Iris",
      text: "It is one.",
      expression: "neutral",
    },
    {
      speaker: "Iris",
      text: "I wait for your footsteps more than I should.",
      expression: "shy",
    },
    {
      speaker: "You",
      text: "How do you respond?",
      choices: [
        {
          text: "Reassure her. I look for you too.",
          affectionChange: 2,
          lustChange: 0,
          dominanceChange: -1,
        },
        {
          text: "Tease gently. So I am a habit now.",
          affectionChange: 1,
          lustChange: 1,
          dominanceChange: 0,
        },
        {
          text: "Set balance. Wanting me is fine. Losing yourself is not.",
          affectionChange: 0,
          lustChange: 0,
          dominanceChange: 1,
        },
      ],
    },
    {
      speaker: "Iris",
      text: "I can still stand on my own. I just do not want distance anymore.",
      expression: "neutral",
    },
    {
      speaker: "Iris",
      text: "I like when you choose me clearly.",
      expression: "happy",
    },
    {
      speaker: null,
      text: "A class bell rings nearby, and students begin to fill the hall.",
    },
    {
      speaker: "You",
      text: "Then hear this clearly.",
    },
    {
      speaker: "You",
      text: "We are done circling.",
    },
    {
      speaker: "Iris",
      text: "You sound certain.",
      expression: "neutral",
    },
    {
      speaker: "You",
      text: "I am.",
    },
    {
      speaker: "Iris",
      text: "Then say it plain.",
      expression: "shy",
    },
    {
      speaker: "You",
      text: "Your answer?",
      choices: [
        {
          text: "You and me. Date. Soon.",
          affectionChange: 1,
          lustChange: 1,
          dominanceChange: 1,
        },
        {
          text: "Friday night. No excuses.",
          affectionChange: 1,
          lustChange: 0,
          dominanceChange: 2,
        },
        {
          text: "I am taking you out. Consider this settled.",
          affectionChange: 2,
          lustChange: 0,
          dominanceChange: 1,
        },
      ],
    },
    {
      speaker: "Iris",
      text: "That almost sounded like an order.",
      expression: "happy",
    },
    {
      speaker: "You",
      text: "It is. No hiding, no dithering.",
    },
    {
      speaker: "Iris",
      text: "Good. Then I accept.",
      expression: "happy",
    },
    {
      speaker: "Iris",
      text: "What night works for you?",
      expression: "neutral",
    },
    {
      speaker: "You",
      text: "Pick the plan.",
      choices: [
        {
          text: "Late dinner, then we walk the city.",
          affectionChange: 2,
          lustChange: 0,
          dominanceChange: -1,
        },
        {
          text: "Drinks first. Keep it light.",
          affectionChange: 1,
          lustChange: 1,
          dominanceChange: 0,
        },
        {
          text: "Your call. I just want your time.",
          affectionChange: 2,
          lustChange: 0,
          dominanceChange: 0,
        },
      ],
    },
    {
      speaker: "Iris",
      text: "Then I will be ready.",
      expression: "happy",
    },
    {
      speaker: null,
      text: "She trails her fingers across your hand a second longer than casual, smiling like she finally gets to stop pretending.",
    },
  ],
};

const iris_ch2_ev4_sub_denied_dialogue: Dialogue = {
  id: "iris_ch2_ev4_sub_denied_dialogue",
  lines: [
    {
      speaker: null,
      text: "Iris meets you at the edge of the faculty hall, both hands around a cooling cup of coffee, lipstick faint on the rim.",
    },
    {
      speaker: "Iris",
      text: "About before... I know you said no to public. I heard you.",
      expression: "neutral",
    },
    {
      speaker: "Iris",
      text: "I am not here to argue with that boundary.",
      expression: "neutral",
    },
    {
      speaker: "You",
      text: "You look like you rehearsed this.",
    },
    {
      speaker: "Iris",
      text: "I did. Twice in the parking lot.",
      expression: "shy",
    },
    {
      speaker: "Iris",
      text: "I am not asking for drama. Just one clean chance.",
      expression: "neutral",
    },
    {
      speaker: "You",
      text: "How do you respond?",
      choices: [
        {
          text: "Soften. You already have my attention.",
          affectionChange: 2,
          lustChange: 0,
          dominanceChange: -1,
        },
        {
          text: "Stay cautious. Say exactly what you want.",
          affectionChange: 1,
          lustChange: 0,
          dominanceChange: 1,
        },
        {
          text: "Lighten it. Rehearsed lines are usually good lines.",
          affectionChange: 1,
          lustChange: 1,
          dominanceChange: 0,
        },
      ],
    },
    {
      speaker: null,
      text: "Her grip on the cup loosens a little.",
    },
    {
      speaker: "Iris",
      text: "I am asking for one date where we both show up honestly, without pretending we do not want each other.",
      expression: "neutral",
    },
    {
      speaker: "Iris",
      text: "Quiet place. No campus eyes. No mixed signals.",
      expression: "neutral",
    },
    {
      speaker: "Iris",
      text: "If you still do not want it after that, I will take the answer and move cleanly.",
      expression: "shy",
    },
    {
      speaker: "You",
      text: "No pressure?",
    },
    {
      speaker: "Iris",
      text: "No pressure. Just intent.",
      expression: "neutral",
    },
    {
      speaker: "You",
      text: "How do you answer?",
      choices: [
        {
          text: "One date sounds fair.",
          affectionChange: 2,
          lustChange: 0,
          dominanceChange: 0,
        },
        {
          text: "I need clear boundaries if we do this.",
          affectionChange: 1,
          lustChange: 0,
          dominanceChange: 1,
        },
        {
          text: "I can try again, if we keep it simple.",
          affectionChange: 1,
          lustChange: 1,
          dominanceChange: -1,
        },
      ],
    },
    {
      speaker: "Iris",
      text: "I can do careful.",
      expression: "neutral",
    },
    {
      speaker: "Iris",
      text: "I can do patient.",
      expression: "neutral",
    },
    {
      speaker: "Iris",
      text: "I just do not want silence deciding for us.",
      expression: "shy",
    },
    {
      speaker: null,
      text: "A few students pass, and she waits until they are gone before speaking again.",
    },
    {
      speaker: "You",
      text: "Then pitch the date.",
    },
    {
      speaker: "Iris",
      text: "Dinner. Somewhere neutral.",
      expression: "neutral",
    },
    {
      speaker: "Iris",
      text: "You can leave early if it feels wrong. No guilt trip.",
      expression: "neutral",
    },
    {
      speaker: "You",
      text: "Pick your tone.",
      choices: [
        {
          text: "I can do one real date.",
          affectionChange: 2,
          lustChange: 0,
          dominanceChange: 0,
        },
        {
          text: "I will try, but we stay honest all night.",
          affectionChange: 1,
          lustChange: 0,
          dominanceChange: 1,
        },
        {
          text: "You are getting your chance. Do not waste it.",
          affectionChange: 0,
          lustChange: 1,
          dominanceChange: 2,
        },
      ],
    },
    {
      speaker: "Iris",
      text: "That is all I asked for.",
      expression: "happy",
    },
    {
      speaker: "You",
      text: "One rule.",
    },
    {
      speaker: "Iris",
      text: "Name it.",
      expression: "neutral",
    },
    {
      speaker: "You",
      text: "If something feels off, we say it immediately.",
    },
    {
      speaker: "Iris",
      text: "Agreed.",
      expression: "happy",
    },
    {
      speaker: "You",
      text: "When do we go?",
      choices: [
        {
          text: "Tomorrow night.",
          affectionChange: 1,
          lustChange: 0,
          dominanceChange: 1,
        },
        {
          text: "End of the week, after classes.",
          affectionChange: 1,
          lustChange: 0,
          dominanceChange: 0,
        },
        {
          text: "You choose the night. I will show up.",
          affectionChange: 2,
          lustChange: 0,
          dominanceChange: -1,
        },
      ],
    },
    {
      speaker: "Iris",
      text: "Then it is a date.",
      expression: "happy",
    },
    {
      speaker: "Iris",
      text: "No drama. Just us trying again.",
      expression: "happy",
    },
    {
      speaker: null,
      text: "She leaves looking calmer than when she arrived, and your next step with her feels finally defined.",
    },
  ],
};

const iris_ch2_ev4_dom_accepted_dialogue: Dialogue = {
  id: "iris_ch2_ev4_dom_accepted_dialogue",
  lines: [
    {
      speaker: null,
      text: "Iris catches your sleeve, backs you lightly toward the wall, and keeps you just out of hallway traffic.",
    },
    {
      speaker: "Iris",
      text: "We skipped a step.",
      expression: "neutral",
    },
    {
      speaker: "Iris",
      text: "We kissed first and pretended that counted as planning.",
      expression: "seductive",
    },
    {
      speaker: "Iris",
      text: "It does not.",
      expression: "neutral",
    },
    {
      speaker: "You",
      text: "You sound annoyed.",
    },
    {
      speaker: "Iris",
      text: "Focused, not annoyed.",
      expression: "happy",
    },
    {
      speaker: "You",
      text: "How do you answer?",
      choices: [
        {
          text: "Play along. All right professor. Fix the syllabus.",
          affectionChange: 1,
          lustChange: 1,
          dominanceChange: 1,
        },
        {
          text: "Challenge her. You can ask, you know.",
          affectionChange: 0,
          lustChange: 0,
          dominanceChange: -1,
        },
        {
          text: "Meet her energy. Then tell me the missing step.",
          affectionChange: 1,
          lustChange: 0,
          dominanceChange: 0,
        },
      ],
    },
    {
      speaker: null,
      text: "She smirks, clearly pleased you are not backing away.",
    },
    {
      speaker: "Iris",
      text: "From now on, if I want to kiss you, I will. No warning.",
      expression: "seductive",
    },
    {
      speaker: "Iris",
      text: "Hallway, parking lot, wherever we cross paths.",
      expression: "seductive",
    },
    {
      speaker: "You",
      text: "That sounds reckless.",
    },
    {
      speaker: "Iris",
      text: "That sounds honest.",
      expression: "neutral",
    },
    {
      speaker: "You",
      text: "How do you reply?",
      choices: [
        {
          text: "Try me.",
          affectionChange: 0,
          lustChange: 2,
          dominanceChange: 1,
        },
        {
          text: "Warn me before you ruin my focus.",
          affectionChange: 1,
          lustChange: 0,
          dominanceChange: 0,
        },
        {
          text: "Keep it subtle at school.",
          affectionChange: 0,
          lustChange: 0,
          dominanceChange: 1,
        },
      ],
    },
    {
      speaker: "Iris",
      text: "Good. Now the missing step is a date.",
      expression: "neutral",
    },
    {
      speaker: "Iris",
      text: "A real one, not stolen minutes between obligations.",
      expression: "neutral",
    },
    {
      speaker: "You",
      text: "You are really not asking.",
    },
    {
      speaker: "Iris",
      text: "Correct.",
      expression: "happy",
    },
    {
      speaker: null,
      text: "Students file past. She does not step back.",
    },
    {
      speaker: "Iris",
      text: "Pick a night.",
      expression: "neutral",
    },
    {
      speaker: "Iris",
      text: "And do not hide behind your schedule.",
      expression: "seductive",
    },
    {
      speaker: "You",
      text: "How do you commit?",
      choices: [
        {
          text: "Friday. I am not moving it.",
          affectionChange: 1,
          lustChange: 1,
          dominanceChange: 1,
        },
        {
          text: "You pick the place. I will be there.",
          affectionChange: 2,
          lustChange: 0,
          dominanceChange: 0,
        },
        {
          text: "I will set the night. You bring the attitude.",
          affectionChange: 0,
          lustChange: 1,
          dominanceChange: 2,
        },
      ],
    },
    {
      speaker: "Iris",
      text: "Better.",
      expression: "happy",
    },
    {
      speaker: "Iris",
      text: "Dress like you mean it.",
      expression: "seductive",
    },
    {
      speaker: "You",
      text: "Anything else, professor?",
    },
    {
      speaker: "Iris",
      text: "Yes.",
      expression: "neutral",
    },
    {
      speaker: "Iris",
      text: "When we cross paths before then, do not be surprised.",
      expression: "seductive",
    },
    {
      speaker: "You",
      text: "How do you leave it?",
      choices: [
        {
          text: "I am counting on it.",
          affectionChange: 0,
          lustChange: 2,
          dominanceChange: 1,
        },
        {
          text: "Do your worst.",
          affectionChange: 0,
          lustChange: 1,
          dominanceChange: 2,
        },
        {
          text: "Keep me guessing.",
          affectionChange: 1,
          lustChange: 1,
          dominanceChange: 0,
        },
      ],
    },
    {
      speaker: null,
      text: "She steals a quick kiss anyway, thumb at your jaw, and lets you go with a satisfied smile.",
    },
    {
      speaker: "Iris",
      text: "Good. Date first. Nightclub after.",
      expression: "happy",
    },
    {
      speaker: null,
      text: "She steps back into the crowd like she just issued a formal directive and expects compliance.",
    },
  ],
};

const iris_ch2_ev4_dom_denied_start_dialogue: Dialogue = {
  id: "iris_ch2_ev4_dom_denied_start_dialogue",
  lines: [
    {
      speaker: null,
      text: "Iris stops beside you after class, posture controlled, voice low.",
    },
    {
      speaker: "Iris",
      text: "I am not here to argue your boundary.",
      expression: "neutral",
    },
    {
      speaker: "Iris",
      text: "You said no to public. I heard you.",
      expression: "neutral",
    },
    {
      speaker: "Iris",
      text: "I am still upset. And still wound tight, if I am being honest.",
      expression: "shy",
    },
    {
      speaker: "You",
      text: "At me?",
    },
    {
      speaker: "Iris",
      text: "At timing. At myself. At how much I wanted that kiss.",
      expression: "neutral",
    },
    {
      speaker: "You",
      text: "How do you respond?",
      choices: [
        {
          text: "I never wanted to humiliate you.",
          affectionChange: 1,
          lustChange: 0,
          dominanceChange: -1,
        },
        {
          text: "I set a line. I am not apologizing for that.",
          affectionChange: -1,
          lustChange: 0,
          dominanceChange: 2,
        },
        {
          text: "Then tell me what this did to you.",
          affectionChange: 1,
          lustChange: 0,
          dominanceChange: 0,
        },
      ],
    },
    {
      speaker: null,
      text: "She watches your face for a long second before continuing.",
    },
    {
      speaker: "Iris",
      text: "That kiss opened something I had sealed for years, and it has not gone quiet since.",
      expression: "shy",
    },
    {
      speaker: "Iris",
      text: "Now every room feels charged.",
      expression: "neutral",
    },
    {
      speaker: "Iris",
      text: "I catch myself leaning into strangers just to burn it off.",
      expression: "neutral",
    },
    {
      speaker: "You",
      text: "You are telling me before it gets messy.",
    },
    {
      speaker: "Iris",
      text: "I am telling you because it is already messy.",
      expression: "neutral",
    },
    {
      speaker: "You",
      text: "How do you answer?",
      choices: [
        {
          text: "Then slow down before you hurt yourself.",
          affectionChange: 1,
          lustChange: 0,
          dominanceChange: 1,
        },
        {
          text: "I cannot control that for you.",
          affectionChange: 0,
          lustChange: 0,
          dominanceChange: 2,
        },
        {
          text: "I would rather hear ugly truth than silence.",
          affectionChange: 2,
          lustChange: 0,
          dominanceChange: -1,
        },
      ],
    },
    {
      speaker: "Iris",
      text: "I am not asking permission.",
      expression: "neutral",
    },
    {
      speaker: "Iris",
      text: "I am warning you where my head is.",
      expression: "neutral",
    },
    {
      speaker: null,
      text: "A bell rings. Neither of you moves.",
    },
    {
      speaker: "You",
      text: "What do you need right now?",
    },
    {
      speaker: "Iris",
      text: "Space to be honest.",
      expression: "neutral",
    },
    {
      speaker: "Iris",
      text: "And room to fail once or twice without a lecture.",
      expression: "shy",
    },
    {
      speaker: "You",
      text: "Your answer?",
      choices: [
        {
          text: "I can give you room, not indifference.",
          affectionChange: 2,
          lustChange: 0,
          dominanceChange: -1,
        },
        {
          text: "Do what you need. I will not chase.",
          affectionChange: -1,
          lustChange: 1,
          dominanceChange: 2,
        },
        {
          text: "Be honest with me when it gets worse.",
          affectionChange: 1,
          lustChange: 0,
          dominanceChange: 0,
        },
      ],
    },
    {
      speaker: "Iris",
      text: "Good.",
      expression: "neutral",
    },
    {
      speaker: "Iris",
      text: "If you see me cross a line, do not pretend you did not.",
      expression: "neutral",
    },
    {
      speaker: "Iris",
      text: "But do not claim ownership either.",
      expression: "neutral",
    },
    {
      speaker: "You",
      text: "So this is unresolved.",
    },
    {
      speaker: "Iris",
      text: "Very.",
      expression: "neutral",
    },
    {
      speaker: "Iris",
      text: "When I can say it clearly, I will come find you.",
      expression: "shy",
    },
    {
      speaker: "You",
      text: "How do you leave it?",
      choices: [
        {
          text: "I will listen when you are ready.",
          affectionChange: 2,
          lustChange: 0,
          dominanceChange: -1,
        },
        {
          text: "Do not drag this forever.",
          affectionChange: 0,
          lustChange: 0,
          dominanceChange: 1,
        },
        {
          text: "Then we wait and see what survives.",
          affectionChange: 0,
          lustChange: 1,
          dominanceChange: 0,
        },
      ],
    },
    {
      speaker: "Iris",
      text: "That is enough for now.",
      expression: "neutral",
    },
    {
      speaker: null,
      text: "She steps away before either of you can pretend this is settled.",
    },
    {
      speaker: "Iris",
      text: "I am not done with this. I am just not clean about it yet.",
      expression: "neutral",
    },
    {
      speaker: null,
      text: "Then she disappears into the hallway crowd, leaving the tension unresolved.",
    },
  ],
};

const iris_ch2_ev4_balanced_accepted_dialogue: Dialogue = {
  id: "iris_ch2_ev4_balanced_accepted_dialogue",
  lines: [
    {
      speaker: null,
      text: "Iris finds you in a quiet stretch of hallway and matches your pace, shoulder brushing yours every few steps.",
    },
    {
      speaker: "Iris",
      text: "I like where we landed.",
      expression: "happy",
    },
    {
      speaker: "Iris",
      text: "Not reckless, not frozen. Just honest.",
      expression: "neutral",
    },
    {
      speaker: "You",
      text: "You sound relieved.",
    },
    {
      speaker: "Iris",
      text: "I am.",
      expression: "happy",
    },
    {
      speaker: "Iris",
      text: "For once we did not perform for fear or ego.",
      expression: "neutral",
    },
    {
      speaker: "You",
      text: "How do you respond?",
      choices: [
        {
          text: "We handled it like adults.",
          affectionChange: 2,
          lustChange: 0,
          dominanceChange: 0,
        },
        {
          text: "I like you better when you are this direct.",
          affectionChange: 1,
          lustChange: 1,
          dominanceChange: 1,
        },
        {
          text: "Good. Keep it this clean.",
          affectionChange: 0,
          lustChange: 0,
          dominanceChange: 1,
        },
      ],
    },
    {
      speaker: null,
      text: "She gives a small laugh and relaxes into the moment.",
    },
    {
      speaker: "Iris",
      text: "I want this to keep moving.",
      expression: "neutral",
    },
    {
      speaker: "Iris",
      text: "Not fast. Just deliberate.",
      expression: "neutral",
    },
    {
      speaker: "You",
      text: "Then set the pace.",
    },
    {
      speaker: "Iris",
      text: "One real date. Phones down. No mixed signals.",
      expression: "neutral",
    },
    {
      speaker: "You",
      text: "How do you answer?",
      choices: [
        {
          text: "Yes. One real date.",
          affectionChange: 2,
          lustChange: 0,
          dominanceChange: 0,
        },
        {
          text: "Only if we keep school and personal separate.",
          affectionChange: 1,
          lustChange: 0,
          dominanceChange: 1,
        },
        {
          text: "I am in. You pick the tone.",
          affectionChange: 1,
          lustChange: 1,
          dominanceChange: -1,
        },
      ],
    },
    {
      speaker: "Iris",
      text: "Thank you.",
      expression: "happy",
    },
    {
      speaker: "Iris",
      text: "I want clarity more than fireworks.",
      expression: "neutral",
    },
    {
      speaker: null,
      text: "She adjusts the strap on her bag and glances down the hall.",
    },
    {
      speaker: "Iris",
      text: "At school, we stay careful.",
      expression: "neutral",
    },
    {
      speaker: "Iris",
      text: "Outside school, I do not want to pretend you are nothing.",
      expression: "shy",
    },
    {
      speaker: "You",
      text: "How do you reply?",
      choices: [
        {
          text: "Agreed. Quiet here, honest elsewhere.",
          affectionChange: 2,
          lustChange: 0,
          dominanceChange: 0,
        },
        {
          text: "I can do that if we stay consistent.",
          affectionChange: 1,
          lustChange: 0,
          dominanceChange: 1,
        },
        {
          text: "I do not mind a little ambiguity.",
          affectionChange: 0,
          lustChange: 1,
          dominanceChange: -1,
        },
      ],
    },
    {
      speaker: "Iris",
      text: "Good. Then we are aligned.",
      expression: "happy",
    },
    {
      speaker: "You",
      text: "And the date?",
    },
    {
      speaker: "Iris",
      text: "Soon.",
      expression: "neutral",
    },
    {
      speaker: "You",
      text: "Name the day.",
    },
    {
      speaker: "Iris",
      text: "Friday works if your schedule does.",
      expression: "neutral",
    },
    {
      speaker: "You",
      text: "Pick the plan.",
      choices: [
        {
          text: "Dinner and a long walk.",
          affectionChange: 2,
          lustChange: 0,
          dominanceChange: -1,
        },
        {
          text: "Cocktails and music.",
          affectionChange: 1,
          lustChange: 1,
          dominanceChange: 0,
        },
        {
          text: "Simple coffee date, no pressure.",
          affectionChange: 1,
          lustChange: 0,
          dominanceChange: 0,
        },
      ],
    },
    {
      speaker: "Iris",
      text: "Perfect.",
      expression: "happy",
    },
    {
      speaker: "Iris",
      text: "No games. Just show up and stay close.",
      expression: "happy",
    },
    {
      speaker: "You",
      text: "I will be there on time.",
    },
    {
      speaker: "Iris",
      text: "Good. I am done second-guessing this.",
      expression: "happy",
    },
    {
      speaker: null,
      text: "You trade a steady look and part ways with an easy certainty between you.",
    },
  ],
};

const iris_ch2_ev4_balanced_denied_dialogue: Dialogue = {
  id: "iris_ch2_ev4_balanced_denied_dialogue",
  lines: [
    {
      speaker: null,
      text: "Iris catches you by the faculty door, expression steady but searching, as if she has decided not to flinch.",
    },
    {
      speaker: "Iris",
      text: "You said no to public. I respect that.",
      expression: "neutral",
    },
    {
      speaker: "Iris",
      text: "I am not here to reopen that fight.",
      expression: "neutral",
    },
    {
      speaker: "You",
      text: "Then why are you here?",
    },
    {
      speaker: "Iris",
      text: "A reset.",
      expression: "neutral",
    },
    {
      speaker: "Iris",
      text: "One date, clear terms, no theatrics. Just chemistry and honesty.",
      expression: "neutral",
    },
    {
      speaker: "You",
      text: "How do you respond?",
      choices: [
        {
          text: "A reset sounds fair.",
          affectionChange: 2,
          lustChange: 0,
          dominanceChange: 0,
        },
        {
          text: "I need specifics before I agree.",
          affectionChange: 1,
          lustChange: 0,
          dominanceChange: 1,
        },
        {
          text: "Only if this stays simple.",
          affectionChange: 1,
          lustChange: 1,
          dominanceChange: -1,
        },
      ],
    },
    {
      speaker: null,
      text: "She nods, as if she expected you to ask for structure.",
    },
    {
      speaker: "Iris",
      text: "Quiet place. No campus. No mixed messages.",
      expression: "neutral",
    },
    {
      speaker: "Iris",
      text: "We talk like adults and see if this still has traction.",
      expression: "neutral",
    },
    {
      speaker: "You",
      text: "And if it feels off?",
    },
    {
      speaker: "Iris",
      text: "Then we end early. No guilt, no scene.",
      expression: "neutral",
    },
    {
      speaker: "You",
      text: "How do you answer?",
      choices: [
        {
          text: "Good. Clean exits matter.",
          affectionChange: 1,
          lustChange: 0,
          dominanceChange: 1,
        },
        {
          text: "I can work with that.",
          affectionChange: 1,
          lustChange: 0,
          dominanceChange: 0,
        },
        {
          text: "I would rather try than overthink.",
          affectionChange: 2,
          lustChange: 1,
          dominanceChange: -1,
        },
      ],
    },
    {
      speaker: "Iris",
      text: "Exactly.",
      expression: "happy",
    },
    {
      speaker: "Iris",
      text: "I do not want distance to harden into habit.",
      expression: "shy",
    },
    {
      speaker: "Iris",
      text: "I would rather test this than guess forever.",
      expression: "neutral",
    },
    {
      speaker: null,
      text: "Voices echo from a nearby classroom, then fade again.",
    },
    {
      speaker: "You",
      text: "What are you hoping for from this?",
    },
    {
      speaker: "Iris",
      text: "A chance to feel close without pressure.",
      expression: "neutral",
    },
    {
      speaker: "Iris",
      text: "A night where neither of us performs.",
      expression: "shy",
    },
    {
      speaker: "You",
      text: "How do you reply?",
      choices: [
        {
          text: "Then let us make it straightforward.",
          affectionChange: 2,
          lustChange: 0,
          dominanceChange: 0,
        },
        {
          text: "I can meet you halfway, not all the way.",
          affectionChange: 1,
          lustChange: 0,
          dominanceChange: 1,
        },
        {
          text: "I am in, but I need consistency from you.",
          affectionChange: 1,
          lustChange: 0,
          dominanceChange: 0,
        },
      ],
    },
    {
      speaker: "Iris",
      text: "Then we can do this.",
      expression: "happy",
    },
    {
      speaker: "You",
      text: "Boundaries stay intact.",
    },
    {
      speaker: "Iris",
      text: "Yes.",
      expression: "neutral",
    },
    {
      speaker: "Iris",
      text: "You get honesty. I get consistency.",
      expression: "neutral",
    },
    {
      speaker: "You",
      text: "Set the date.",
      choices: [
        {
          text: "Tomorrow evening.",
          affectionChange: 1,
          lustChange: 0,
          dominanceChange: 1,
        },
        {
          text: "Friday after work.",
          affectionChange: 1,
          lustChange: 0,
          dominanceChange: 0,
        },
        {
          text: "Your pick. I will commit.",
          affectionChange: 2,
          lustChange: 0,
          dominanceChange: -1,
        },
      ],
    },
    {
      speaker: "Iris",
      text: "Done.",
      expression: "happy",
    },
    {
      speaker: "Iris",
      text: "No tragedy, no ultimatums. Just a date, and no pretending.",
      expression: "happy",
    },
    {
      speaker: "You",
      text: "Then we keep it simple and see what happens.",
    },
    {
      speaker: null,
      text: "She gives you a relieved nod and heads down the hall, looking lighter than when she arrived.",
    },
  ],
};

export const irisEvent4Dialogues: Record<string, Dialogue> = {
  iris_ch2_ev4_sub_accepted_dialogue,
  iris_ch2_ev4_sub_denied_dialogue,
  iris_ch2_ev4_dom_accepted_dialogue,
  iris_ch2_ev4_dom_denied_start_dialogue,
  iris_ch2_ev4_balanced_accepted_dialogue,
  iris_ch2_ev4_balanced_denied_dialogue,
};

export const irisEvent4Events: CharacterEvent[] = [
  {
    id: "iris_ch2_ev4_sub_accepted",
    name: "The Turning Point",
    description: "Sub route accepted branch before the date.",
    quest: {
      title: "The Turning Point",
      description: "Talk to Iris after your decision in No More Hiding.",
    },
    priority: 160,
    repeatable: false,
    conditions: {
      requiredFlags: ["irisCh2Ev3_Done", "irisSchoolKissUnlocked"],
      blockedByFlags: ["irisDatePlanned", "irisCh2Complete"],
      requiredLocation: "University Hallway",
      minHour: 9,
      maxHour: 18,
      maxDominance: -10,
    },
    dialogue: iris_ch2_ev4_sub_accepted_dialogue,
    rewards: {
      girlStats: { affection: 2, love: 1 },
      setFlags: ["irisCh2Ev4_Done", "irisDatePlanned"],
    },
  },
  {
    id: "iris_ch2_ev4_sub_denied",
    name: "The Turning Point",
    description: "Sub route denied branch before the date.",
    quest: {
      title: "The Turning Point",
      description: "Talk to Iris after your decision in No More Hiding.",
    },
    priority: 160,
    repeatable: false,
    conditions: {
      requiredFlags: ["irisCh2Ev3_Done", "irisPublicRefused"],
      blockedByFlags: ["irisDatePlanned", "irisCh2Complete"],
      requiredLocation: "University Hallway",
      minHour: 9,
      maxHour: 18,
      maxDominance: -10,
    },
    dialogue: iris_ch2_ev4_sub_denied_dialogue,
    rewards: {
      girlStats: { affection: 1 },
      setFlags: ["irisCh2Ev4_Done", "irisDatePlanned"],
    },
  },
  {
    id: "iris_ch2_ev4_dom_accepted",
    name: "The Turning Point",
    description: "Dom route accepted branch before the date.",
    quest: {
      title: "The Turning Point",
      description: "Talk to Iris after your decision in No More Hiding.",
    },
    priority: 160,
    repeatable: false,
    conditions: {
      requiredFlags: ["irisCh2Ev3_Done", "irisSchoolKissUnlocked"],
      blockedByFlags: ["irisDatePlanned", "irisCh2Complete"],
      requiredLocation: "University Hallway",
      minHour: 9,
      maxHour: 18,
      minDominance: 10,
    },
    dialogue: iris_ch2_ev4_dom_accepted_dialogue,
    rewards: {
      girlStats: { lust: 1, affection: 1 },
      setFlags: [
        "irisCh2Ev4_Done",
        "irisDatePlanned",
        "irisDomAcceptedKissLoopActive",
      ],
    },
  },
  {
    id: "iris_ch2_ev4_dom_denied_start",
    name: "The Turning Point",
    description: "Dom route denied branch starts the unresolved loop before the date.",
    quest: {
      title: "The Turning Point",
      description: "Talk to Iris after your decision in No More Hiding.",
    },
    priority: 160,
    repeatable: false,
    conditions: {
      requiredFlags: ["irisCh2Ev3_Done", "irisPublicRefused"],
      blockedByFlags: ["irisDatePlanned", "irisCh2Complete"],
      requiredLocation: "University Hallway",
      minHour: 9,
      maxHour: 18,
      minDominance: 10,
    },
    dialogue: iris_ch2_ev4_dom_denied_start_dialogue,
    rewards: {
      girlStats: { lust: 1 },
      setFlags: ["irisCh2Ev4_Done", "irisDomDeniedKissLoopActive"],
    },
  },
  {
    id: "iris_ch2_ev4_balanced_accepted",
    name: "The Turning Point",
    description: "Balanced route accepted branch before the date.",
    quest: {
      title: "The Turning Point",
      description: "Talk to Iris after your decision in No More Hiding.",
    },
    priority: 161,
    repeatable: false,
    conditions: {
      requiredFlags: ["irisCh2Ev3_Done", "irisSchoolKissUnlocked"],
      blockedByFlags: ["irisDatePlanned", "irisCh2Complete"],
      requiredLocation: "University Hallway",
      minHour: 9,
      maxHour: 18,
      minDominance: -9,
      maxDominance: 9,
    },
    dialogue: iris_ch2_ev4_balanced_accepted_dialogue,
    rewards: {
      girlStats: { affection: 2, love: 1 },
      setFlags: ["irisCh2Ev4_Done", "irisDatePlanned"],
    },
  },
  {
    id: "iris_ch2_ev4_balanced_denied",
    name: "The Turning Point",
    description: "Balanced route denied branch before the date.",
    quest: {
      title: "The Turning Point",
      description: "Talk to Iris after your decision in No More Hiding.",
    },
    priority: 161,
    repeatable: false,
    conditions: {
      requiredFlags: ["irisCh2Ev3_Done", "irisPublicRefused"],
      blockedByFlags: ["irisDatePlanned", "irisCh2Complete"],
      requiredLocation: "University Hallway",
      minHour: 9,
      maxHour: 18,
      minDominance: -9,
      maxDominance: 9,
    },
    dialogue: iris_ch2_ev4_balanced_denied_dialogue,
    rewards: {
      girlStats: { affection: 1 },
      setFlags: ["irisCh2Ev4_Done", "irisDatePlanned"],
    },
  },
];

```

### src\data\events\chapter2\iris\event5.ts
```ts
import type { Dialogue } from "../../../dialogues";
import type { CharacterEvent } from "../../types";

// Event 5: The Nightclub Date
// Description: You take Iris on a date to a nightclub.

const iris_ch2_date_encounter_sub: Dialogue = {
  id: "iris_ch2_date_encounter_sub",
  lines: [
    {
      speaker: null,
      text: "You arrive at the bar a few minutes early. You and Iris agreed to meet by the counter.",
    },
    {
      speaker: null,
      text: "A woman with Iris's dark hair is waiting near the spot, back to you.",
    },
    { speaker: "You", text: "Iris?" },
    {
      speaker: null,
      text: "She turns. It's not Iris. It's a younger woman, her face framed by the same dark hair, but her eyes hold a mischievous glint as they flick to your mouth.",
    },
    { speaker: "???", text: "...", expression: "happy" },
    { speaker: "You", text: "Oh, I'm so sorry. I thought you were someone else." },
    {
      speaker: null,
      text: "She doesn't respond. She just gives you a slow, knowing smile before turning and melting back into the crowd.",
    },
  ],
};

const iris_ch2_date_after_encounter: Dialogue = {
  id: "iris_ch2_date_after_encounter",
  lines: [
    {
      speaker: "Iris",
      text: "Hey! Sorry I'm a minute late. This place is packed. Did I miss anything?",
      expression: "happy",
    },
    {
      speaker: "You",
      text: "What do you tell her?",
      choices: [
        { text: "You won't believe this, but I just saw your twin.", affectionChange: 1 },
        { text: "Nothing, just admiring the view.", affectionChange: 0 },
      ],
    },
    {
      speaker: null,
      text: "She steps in close enough that her perfume cuts through the smoke and bass.",
    },
    {
      speaker: "You",
      text: "How do you greet her?",
      choices: [
        {
          text: "Offer your arm and smile.",
          affectionChange: 1,
        },
        {
          text: "Let your eyes linger. You look dangerous tonight.",
          affectionChange: 0,
          lustChange: 1,
        },
        {
          text: "Brush her fingers. Been waiting for this all day.",
          affectionChange: 1,
          lustChange: 1,
        },
      ],
    },
    {
      speaker: "Iris",
      text: "Then do not waste the night.",
      expression: "happy",
    },
  ],
};

const iris_ch2_date_encounter_dom: Dialogue = {
  id: "iris_ch2_date_encounter_dom",
  lines: [
    {
      speaker: null,
      text: "You arrive at the bar a few minutes early. You and Iris agreed to meet by the counter.",
    },
    {
      speaker: null,
      text: "You spot a familiar silhouette and walk up behind her with a hand at her lower back.",
    },
    { speaker: "You", text: "There you are." },
    {
      speaker: null,
      text: "The woman turns. It's not Iris. It's a younger woman, her face framed by the same dark hair, but her eyes hold a challenging glint that dares you to react.",
    },
    { speaker: "???", text: "...", expression: "happy" },
    { speaker: "You", text: "Oh. My mistake. I thought you were someone else." },
    {
      speaker: null,
      text: "She doesn't respond. She just gives you a slow, amused smile before turning and vanishing into the crowd.",
    },
  ],
};

const iris_ch2_date_encounter_neutral: Dialogue = {
  id: "iris_ch2_date_encounter_neutral",
  lines: [
    {
      speaker: null,
      text: "You arrive at the bar a few minutes early. You and Iris agreed to meet by the counter.",
    },
    {
      speaker: null,
      text: "Someone with the same dark hair is leaning there, and you step up beside her.",
    },
    { speaker: "You", text: "Hey-ready to order?" },
    {
      speaker: null,
      text: "She turns. It's not Iris. It's a younger woman, her face framed by the same dark hair, her eyes filled with curiosity that lingers a beat too long.",
    },
    { speaker: "???", text: "...", expression: "happy" },
    { speaker: "You", text: "Sorry about that. I mistook you for my date." },
    {
      speaker: null,
      text: "She doesn't respond. She just gives you a small, friendly smile before turning and walking away.",
    },
  ],
};

export const irisEvent5Dialogues: Record<string, Dialogue> = {
  iris_ch2_date_encounter_sub,
  iris_ch2_date_after_encounter,
  iris_ch2_date_encounter_dom,
  iris_ch2_date_encounter_neutral,
};

export const irisEvent5Events: CharacterEvent[] = [
  {
    id: "iris_ch2_ev5_sub_date",
    name: "The Nightclub Date",
    description: "You take Iris on a date to a nightclub.",
    quest: {
      title: "The Date",
      description: "You've planned a date with Iris. It's time for a fun night out.",
    },
    priority: 150,
    repeatable: false,
    conditions: {
      requiredFlags: ["irisDatePlanned"],
      requiredLocation: "Nightclub",
      maxDominance: -10,
    },
    dialogue: {
      id: "iris_ch2_ev5_sub_date",
      lines: [
        {
          speaker: null,
          text: "You and Iris plan to meet at a trendy nightclub called 'Velvet'. It's dark and loud, the bass thumping through the walls.",
        },
        {
          speaker: null,
          text: "You arrive a few minutes early and head to the bar where you said you'd meet.",
        },
        {
          speaker: null,
          text: "You spot someone who looks like Iris from behind and walk over.",
          nextDialogueId: "iris_ch2_date_encounter_sub",
        },
        {
          speaker: null,
          text: "A moment later, Iris shows up.",
          nextDialogueId: "iris_ch2_date_after_encounter",
        },
        {
          speaker: "Iris",
          text: "It's... a lot. I have not been in a room this loud in years.",
          expression: "shy",
        },
        {
          speaker: "You",
          text: "How do you steady her?",
          choices: [
            {
              text: "Offer your hand. Then stay with me.",
              affectionChange: 2,
              dominanceChange: -1,
            },
            {
              text: "Lean close and murmur. Keep your eyes on me.",
              affectionChange: 1,
              lustChange: 1,
            },
            {
              text: "Tease softly. You can hide behind me for the first song.",
              affectionChange: 1,
              dominanceChange: 1,
            },
          ],
        },
        {
          speaker: null,
          text: "She threads her fingers through yours, grip warm and a little unsteady.",
        },
        {
          speaker: null,
          text: "You find a quieter corner booth. As the music settles into the background, your knees brush beneath the table.",
        },
        {
          speaker: "You",
          text: "How do you keep the mood?",
          choices: [
            {
              text: "Ask about the reckless nights she used to love.",
              affectionChange: 1,
              lustChange: 1,
            },
            {
              text: "Keep it present. Tonight is about us, not old ghosts.",
              affectionChange: 2,
            },
            {
              text: "Tell her she looks impossible to ignore tonight.",
              affectionChange: 1,
              lustChange: 1,
            },
          ],
        },
        {
          speaker: null,
          text: "By the time you walk her home, she lingers at her door and kisses you slowly, trusting and unhurried.",
        },
      ],
    },
    rewards: {
      girlStats: { affection: 20, love: 5 },
      setFlags: ["irisCh2Complete", "metMysteryGirl"],
    },
  },
  {
    id: "iris_ch2_ev5_dom_date",
    name: "The Nightclub Date",
    description: "You take Iris on a date to a nightclub.",
    quest: {
      title: "The Date",
      description: "You've planned a date with Iris. It's time for a fun night out.",
    },
    priority: 150,
    repeatable: false,
    conditions: {
      requiredFlags: ["irisDatePlanned"],
      requiredLocation: "Nightclub",
      minDominance: 10,
    },
    dialogue: {
      id: "iris_ch2_ev5_dom_date",
      lines: [
        {
          speaker: null,
          text: "You and Iris plan to meet at a trendy nightclub called 'Velvet'. The bass is thumping and the line is long.",
        },
        {
          speaker: null,
          text: "You arrive first and wait at the bar, scanning the crowd.",
        },
        {
          speaker: null,
          text: "You spot a familiar silhouette and close the distance.",
          nextDialogueId: "iris_ch2_date_encounter_dom",
        },
        {
          speaker: null,
          text: "A moment later, Iris shows up.",
          nextDialogueId: "iris_ch2_date_after_encounter",
        },
        {
          speaker: "Iris",
          text: "I hope you can keep up, Professor.",
          expression: "seductive",
        },
        {
          speaker: "You",
          text: "How do you answer?",
          choices: [
            {
              text: "Pull her straight to the dance floor.",
              affectionChange: 1,
              lustChange: 2,
              dominanceChange: 1,
            },
            {
              text: "Keep her close at the bar first and make her wait.",
              affectionChange: 1,
              lustChange: 1,
            },
            {
              text: "Lean to her ear. You started this. Do not slow down now.",
              affectionChange: 0,
              lustChange: 2,
              dominanceChange: 1,
            },
          ],
        },
        {
          speaker: null,
          text: "The night turns into a push-and-pull of dancing, sharp smiles, and hands that keep finding each other.",
        },
        {
          speaker: "You",
          text: "At the edge of the dance floor, what do you do?",
          choices: [
            {
              text: "Spin her in close and keep her there.",
              affectionChange: 1,
              lustChange: 2,
            },
            {
              text: "Hold eye contact and make her come to you.",
              affectionChange: 0,
              lustChange: 2,
              dominanceChange: 1,
            },
            {
              text: "Break the tension with a low, private joke.",
              affectionChange: 2,
              lustChange: 1,
            },
          ],
        },
        {
          speaker: null,
          text: "The date stays electric to the end, finishing with a fierce, possessive kiss at her door that leaves both of you breathless.",
        },
      ],
    },
    rewards: {
      girlStats: { affection: 15, lust: 10 },
      setFlags: ["irisCh2Complete", "metMysteryGirl"],
    },
  },
  {
    id: "iris_ch2_ev5_neutral_date",
    name: "The Nightclub Date",
    description: "You take Iris on a date to a nightclub.",
    quest: {
      title: "The Date",
      description: "You've planned a date with Iris. It's time for a fun night out.",
    },
    priority: 150,
    repeatable: false,
    conditions: {
      requiredFlags: ["irisDatePlanned"],
      requiredLocation: "Nightclub",
      minDominance: -9,
      maxDominance: 9,
    },
    dialogue: {
      id: "iris_ch2_ev5_neutral_date",
      lines: [
        {
          speaker: null,
          text: "You and Iris plan to meet at a nightclub you both agreed on. It's lively, but the bar is easy to spot.",
        },
        { speaker: null, text: "You get there early and wait by the counter." },
        {
          speaker: null,
          text: "Someone with the same dark hair is leaning there, and you step up beside her.",
          nextDialogueId: "iris_ch2_date_encounter_neutral",
        },
        {
          speaker: null,
          text: "A moment later, Iris shows up.",
          nextDialogueId: "iris_ch2_date_after_encounter",
        },
        {
          speaker: "Iris",
          text: "This is fun! It's nice to just feel like a normal person out on a Friday night.",
          expression: "happy",
        },
        {
          speaker: "You",
          text: "How do you set the tone?",
          choices: [
            {
              text: "Warm and close. Keep your hand at the small of her back.",
              affectionChange: 2,
            },
            {
              text: "Playful. Trade teasing comments while you watch the crowd.",
              affectionChange: 1,
              lustChange: 1,
            },
            {
              text: "Quiet and intimate. Guide her to a calmer corner booth.",
              affectionChange: 2,
              dominanceChange: -1,
            },
          ],
        },
        {
          speaker: null,
          text: "Conversation comes easily as you people-watch and share a drink, your shoulders touching more often than either of you comments on.",
        },
        {
          speaker: "You",
          text: "Later in the night?",
          choices: [
            {
              text: "Tell her she looks even better when she relaxes.",
              affectionChange: 1,
              lustChange: 1,
            },
            {
              text: "Ask for one slow dance away from the crowd.",
              affectionChange: 2,
            },
            {
              text: "Keep talking, let the tension build naturally.",
              affectionChange: 1,
              lustChange: 0,
            },
          ],
        },
        {
          speaker: null,
          text: "The date ends with a soft, intimate kiss at her door, lingering just long enough to promise more.",
        },
      ],
    },
    rewards: {
      girlStats: { affection: 20, love: 5 },
      setFlags: ["irisCh2Complete", "metMysteryGirl"],
    },
  },
];

```

## Iris Random Event Scripts (Verbatim)
These are Iris-specific random events currently implemented in src/data/events/chapter1/randomEvents.ts.

### src/data/events/chapter1/randomEvents.ts (Iris excerpts)
```ts
// Event: meet_iris_cafe
  {
    id: "meet_iris_cafe",
    name: "Random Coffee with Iris",
    type: "encounter",
    characterName: "Iris",
    probability: 5,
    conditions: {
      locations: ["Cafe"],
      hourRange: { min: 12, max: 18 },
      requiredCharactersPresent: ["Iris"],
    },
    dialogue: {
      id: "meet_iris_cafe_dialogue",
      lines: [
        {
          speaker: null,
          text: "You're at the cafe when you spot Iris sitting alone with a book.",
        },
        {
          speaker: "Iris",
          text: "Oh! {playerName}, what a coincidence!",
          expression: "happy",
        },
        {
          speaker: "You",
          text: "Hey Iris! Mind if I join you?",
        },
        {
          speaker: "Iris",
          text: "I... I'd like that, actually.",
          expression: "neutral",
        },
        {
          speaker: null,
          text: "You spend time chatting over coffee. It feels natural and easy.",
        },
      ],
    },
    rewards: {
      girlAffection: { Iris: 3 },
    },
  },

// Event: iris_workplace_hallway_whisper
  {
    id: "iris_workplace_hallway_whisper",
    name: "Hallway Whisper",
    type: "encounter",
    characterName: "Iris",
    probability: 25,
    probabilityByNeeds: true,
    conditions: {
      locations: ["University Hallway"],
      hourRange: { min: 9, max: 15 },
      requiredFlags: ["irisCh2Ev2_Done"],
      blockedFlags: ["irisCh2Ev3_Done", "irisDatePlanned", "irisCh2Complete"],
      requiredCharactersPresent: ["Iris"],
    },
    dialogue: {
      id: "iris_workplace_hallway_whisper_dialogue",
      lines: [
        {
          speaker: null,
          text: "You round a corner in the hallway and nearly collide with Iris. She catches your arm and pulls you into the shadow of a bulletin board.",
        },
        {
          speaker: "Iris",
          text: "We should not be doing this here.",
          expression: "shy",
        },
        {
          speaker: "You",
          text: "Then why did you pull me in?",
        },
        {
          speaker: "Iris",
          text: "Because I could not walk past you like nothing happened.",
          expression: "neutral",
        },
        {
          speaker: null,
          text: "Her fingers linger on your sleeve. She glances down the hall, then back to you.",
        },
        {
          speaker: "Iris",
          text: "Just... a second.",
          expression: "shy",
        },
        {
          speaker: null,
          text: "She leans in and brushes a quick, secret kiss against your lips before stepping away.",
        },
      ],
    },
    rewards: {
      girlAffection: { Iris: 1 },
      playerStats: { mood: 2 },
    },
  },

// Event: iris_workplace_copy_room
  {
    id: "iris_workplace_copy_room",
    name: "Copy Room Confession",
    type: "encounter",
    characterName: "Iris",
    probability: 25,
    probabilityByNeeds: true,
    conditions: {
      locations: ["University Hallway"],
      hourRange: { min: 11, max: 17 },
      requiredFlags: ["irisCh2Ev2_Done"],
      blockedFlags: ["irisCh2Ev3_Done", "irisDatePlanned", "irisCh2Complete"],
      requiredCharactersPresent: ["Iris"],
    },
    dialogue: {
      id: "iris_workplace_copy_room_dialogue",
      lines: [
        {
          speaker: null,
          text: "You step into the copy room as Iris is reloading paper. She looks up and smiles before she remembers where she is.",
        },
        {
          speaker: "Iris",
          text: "Hi. I should not be happy to see you here.",
          expression: "shy",
        },
        {
          speaker: "You",
          text: "And yet you are.",
        },
        {
          speaker: null,
          text: "The copier hums, masking your voices. Iris inches closer, careful but drawn in.",
        },
        {
          speaker: "Iris",
          text: "We are going to get in trouble.",
          expression: "neutral",
        },
        {
          speaker: "You",
          text: "Then let us be quick.",
        },
        {
          speaker: null,
          text: "She gives you a soft, fleeting kiss and immediately steps back to her papers.",
        },
      ],
    },
    rewards: {
      girlAffection: { Iris: 1 },
      playerStats: { mood: 2 },
    },
  },

// Event: iris_workplace_parking_lot
  {
    id: "iris_workplace_parking_lot",
    name: "Parking Lot Goodbye",
    type: "encounter",
    characterName: "Iris",
    probability: 25,
    probabilityByNeeds: true,
    conditions: {
      locations: ["University Parking Lot"],
      hourRange: { min: 15, max: 19 },
      requiredFlags: ["irisCh2Ev2_Done"],
      blockedFlags: ["irisCh2Ev3_Done", "irisDatePlanned", "irisCh2Complete"],
      requiredCharactersPresent: ["Iris"],
    },
    dialogue: {
      id: "iris_workplace_parking_lot_dialogue",
      lines: [
        {
          speaker: null,
          text: "You spot Iris by her car, arms full of books. She pauses when she sees you and waits for the lot to clear.",
        },
        {
          speaker: "Iris",
          text: "We should not do this out here.",
          expression: "neutral",
        },
        {
          speaker: "You",
          text: "Then say goodbye and walk away.",
        },
        {
          speaker: null,
          text: "She steps in close anyway, eyes soft.",
        },
        {
          speaker: "Iris",
          text: "I cannot seem to.",
          expression: "shy",
        },
        {
          speaker: null,
          text: "She gives you a small, careful kiss, then backs away with a nervous smile.",
        },
      ],
    },
    rewards: {
      girlAffection: { Iris: 1 },
      playerStats: { mood: 2 },
    },
  },

// Event: iris_dom_accepted_daily_kiss
  {
    id: "iris_dom_accepted_daily_kiss",
    name: "Claimed In Passing",
    type: "encounter",
    characterName: "Iris",
    probability: 16,
    maxTriggersPerDay: 1,
    conditions: {
      locations: ["University Hallway", "University Parking Lot", "Cafe", "Mall"],
      hourRange: { min: 9, max: 22 },
      requiredCharactersPresent: ["Iris"],
      requiredFlags: ["irisDomAcceptedKissLoopActive", "irisDatePlanned"],
      blockedFlags: ["irisCh2Complete"],
    },
    dialogue: {
      id: "iris_dom_accepted_daily_kiss_dialogue",
      lines: [
        {
          speaker: null,
          text: "Iris intercepts you mid-step, one hand on your chest like she already decided this moment was hers.",
        },
        {
          speaker: "Iris",
          text: "No running today. You still owe me a proper date.",
          expression: "seductive",
        },
        {
          speaker: null,
          text: "She kisses you anyway, slow and certain, then lets you go before anyone can ask questions.",
        },
        {
          speaker: "Iris",
          text: "Nightclub. Do not make me schedule your life for you.",
          expression: "happy",
        },
      ],
    },
    rewards: {
      girlAffection: { Iris: 1 },
      playerStats: { mood: 1 },
    },
  },

// Event: iris_dom_denied_kiss_other_1
  {
    id: "iris_dom_denied_kiss_other_1",
    name: "Restless Slip",
    type: "observation",
    characterName: "Iris",
    probability: 6,
    probabilityByGirlStat: {
      girlName: "Iris",
      stat: "lust",
      multiplier: 0.45,
      max: 45,
    },
    conditions: {
      locations: ["University Hallway", "University Parking Lot", "Cafe", "Mall", "City"],
      hourRange: { min: 9, max: 22 },
      requiredCharactersPresent: ["Iris"],
      requiredFlags: ["irisDomDeniedKissLoopActive", "irisPublicRefused"],
      blockedFlags: ["irisDomDeniedSeen1", "irisDomDeniedExclusive", "irisCh2Complete"],
    },
    dialogue: {
      id: "iris_dom_denied_kiss_other_1_dialogue",
      lines: [
        {
          speaker: null,
          text: "You catch Iris too close to a stranger near the edge of the crowd. She laughs, then kisses him like she needs to prove something to herself.",
        },
        {
          speaker: null,
          text: "She notices you a beat too late. Her expression tightens, then smooths out.",
        },
        {
          speaker: "You",
          text: "Keep moving.",
          choices: [
            {
              text: "Walk on.",
              affectionChange: -1,
              setFlags: ["irisDomDeniedSeen1"],
            },
          ],
        },
      ],
    },
  },

// Event: iris_dom_denied_kiss_other_2
  {
    id: "iris_dom_denied_kiss_other_2",
    name: "Second Time",
    type: "observation",
    characterName: "Iris",
    probability: 6,
    probabilityByGirlStat: {
      girlName: "Iris",
      stat: "lust",
      multiplier: 0.45,
      max: 45,
    },
    conditions: {
      locations: ["University Hallway", "University Parking Lot", "Cafe", "Mall", "City"],
      hourRange: { min: 9, max: 22 },
      requiredCharactersPresent: ["Iris"],
      requiredFlags: [
        "irisDomDeniedKissLoopActive",
        "irisPublicRefused",
        "irisDomDeniedSeen1",
      ],
      blockedFlags: ["irisDomDeniedSeen2", "irisDomDeniedExclusive", "irisCh2Complete"],
    },
    dialogue: {
      id: "iris_dom_denied_kiss_other_2_dialogue",
      lines: [
        {
          speaker: null,
          text: "Again. Different person, same pattern. Iris leans in first this time, then steps back with a breathless half-smile that does not reach her eyes.",
        },
        {
          speaker: null,
          text: "When she spots you, she looks away first.",
        },
        {
          speaker: "You",
          text: "Leave it for now.",
          choices: [
            {
              text: "Keep your distance.",
              affectionChange: -1,
              setFlags: ["irisDomDeniedSeen2"],
            },
          ],
        },
      ],
    },
  },

// Event: iris_dom_denied_kiss_other_3
  {
    id: "iris_dom_denied_kiss_other_3",
    name: "Pattern Confirmed",
    type: "observation",
    characterName: "Iris",
    probability: 6,
    probabilityByGirlStat: {
      girlName: "Iris",
      stat: "lust",
      multiplier: 0.45,
      max: 45,
    },
    conditions: {
      locations: ["University Hallway", "University Parking Lot", "Cafe", "Mall", "City"],
      hourRange: { min: 9, max: 22 },
      requiredCharactersPresent: ["Iris"],
      requiredFlags: [
        "irisDomDeniedKissLoopActive",
        "irisPublicRefused",
        "irisDomDeniedSeen2",
      ],
      blockedFlags: ["irisDomDeniedSeen3", "irisDomDeniedExclusive", "irisCh2Complete"],
    },
    dialogue: {
      id: "iris_dom_denied_kiss_other_3_dialogue",
      lines: [
        {
          speaker: null,
          text: "Third time. Iris catches your eye before she does it, like she is daring herself to keep going.",
        },
        {
          speaker: null,
          text: "The kiss is quick. The aftermath is not. She lingers in place, jaw tight.",
        },
        {
          speaker: "You",
          text: "You let the moment pass.",
          choices: [
            {
              text: "Say nothing.",
              affectionChange: 0,
              setFlags: ["irisDomDeniedSeen3"],
            },
          ],
        },
      ],
    },
  },

// Event: iris_dom_denied_kiss_other_loop
  {
    id: "iris_dom_denied_kiss_other_loop",
    name: "Still Burning",
    type: "observation",
    characterName: "Iris",
    probability: 7,
    probabilityByGirlStat: {
      girlName: "Iris",
      stat: "lust",
      multiplier: 0.5,
      max: 50,
    },
    conditions: {
      locations: ["University Hallway", "University Parking Lot", "Cafe", "Mall", "City"],
      hourRange: { min: 9, max: 22 },
      requiredCharactersPresent: ["Iris"],
      requiredFlags: ["irisDomDeniedKissLoopActive", "irisDomDeniedSeen3"],
      blockedFlags: ["irisDomDeniedExclusive", "irisCh2Complete"],
    },
    dialogue: {
      id: "iris_dom_denied_kiss_other_loop_dialogue",
      lines: [
        {
          speaker: null,
          text: "Iris disappears into someone else's space for a minute, then reappears composed, but the heat in her expression is unmistakable.",
        },
        {
          speaker: null,
          text: "Whatever you unlocked in her is still active.",
        },
      ],
    },
  },

// Event: iris_dom_denied_confrontation
  {
    id: "iris_dom_denied_confrontation",
    name: "What You Opened",
    type: "encounter",
    characterName: "Iris",
    probability: 40,
    probabilityByGirlStat: {
      girlName: "Iris",
      stat: "lust",
      multiplier: 0.35,
      max: 35,
    },
    conditions: {
      locations: ["University Hallway", "University Parking Lot", "Cafe", "Mall", "City"],
      hourRange: { min: 9, max: 23 },
      requiredCharactersPresent: ["Iris"],
      minGirlStats: [
        { girlName: "Iris", stat: "affection", value: 18 },
        { girlName: "Iris", stat: "lust", value: 20 },
      ],
      requiredFlags: ["irisDomDeniedKissLoopActive", "irisDomDeniedSeen3"],
      blockedFlags: [
        "irisDatePlanned",
        "irisDomDeniedExclusive",
        "irisDomDeniedExplore",
        "irisCh2Complete",
      ],
    },
    dialogue: {
      id: "iris_dom_denied_confrontation_dialogue",
      lines: [
        {
          speaker: null,
          text: "Iris steps into your path and does not pretend this is casual.",
        },
        {
          speaker: "Iris",
          text: "That kiss we shared cracked something open in me.",
          expression: "neutral",
        },
        {
          speaker: "Iris",
          text: "I tried to put it back in the box. I cannot.",
          expression: "shy",
        },
        {
          speaker: "Iris",
          text: "So tell me what we are doing. Exclusive, or not.",
          expression: "neutral",
        },
        {
          speaker: "You",
          text: "How do you answer?",
          choices: [
            {
              text: "Stop kissing others. If this continues, it is with me.",
              affectionChange: 1,
              setFlags: ["irisDomDeniedExclusive", "irisDatePlanned"],
            },
            {
              text: "Keep exploring. Just stop cutting me out of it.",
              affectionChange: 0,
              lustChange: 1,
              setFlags: ["irisDomDeniedExplore", "irisNtrSeeded", "irisDatePlanned"],
            },
          ],
        },
        {
          speaker: "Iris",
          text: "Fine. Then we test this properly. One date. No dodging.",
          expression: "seductive",
        },
      ],
    },
  },

// Event: iris_dom_denied_player_kiss_exclusive
  {
    id: "iris_dom_denied_player_kiss_exclusive",
    name: "Exclusive Habit",
    type: "encounter",
    characterName: "Iris",
    probability: 18,
    maxTriggersPerDay: 1,
    conditions: {
      locations: ["University Hallway", "University Parking Lot", "Cafe", "Mall"],
      hourRange: { min: 9, max: 22 },
      requiredCharactersPresent: ["Iris"],
      requiredFlags: ["irisDomDeniedExclusive", "irisDatePlanned"],
      blockedFlags: ["irisCh2Complete"],
    },
    dialogue: {
      id: "iris_dom_denied_player_kiss_exclusive_dialogue",
      lines: [
        {
          speaker: null,
          text: "Iris catches your sleeve, glances around, then kisses you like she is confirming a contract.",
        },
        {
          speaker: "Iris",
          text: "Better. This I can work with.",
          expression: "happy",
        },
      ],
    },
    rewards: {
      girlAffection: { Iris: 1 },
      playerStats: { mood: 1 },
    },
  },

// Event: iris_dom_denied_player_kiss_shared
  {
    id: "iris_dom_denied_player_kiss_shared",
    name: "Shared Current",
    type: "encounter",
    characterName: "Iris",
    probability: 18,
    maxTriggersPerDay: 1,
    conditions: {
      locations: ["University Hallway", "University Parking Lot", "Cafe", "Mall", "City"],
      hourRange: { min: 9, max: 23 },
      requiredCharactersPresent: ["Iris"],
      requiredFlags: ["irisDomDeniedExplore", "irisDatePlanned"],
      blockedFlags: ["irisCh2Complete"],
    },
    dialogue: {
      id: "iris_dom_denied_player_kiss_shared_dialogue",
      lines: [
        {
          speaker: null,
          text: "Iris closes the distance with a grin that says she has stopped pretending to be restrained.",
        },
        {
          speaker: "Iris",
          text: "If we are exploring, you are part of it. Understood?",
          expression: "seductive",
        },
        {
          speaker: null,
          text: "She kisses you hard, then slips back into the crowd like she planned the whole beat.",
        },
      ],
    },
    rewards: {
      girlAffection: { Iris: 1 },
      playerStats: { mood: 1 },
    },
  },

// Event: see_iris_studying
  {
    id: "see_iris_studying",
    name: "See Iris Lost in Thought",
    type: "observation",
    probability: 10,
    conditions: {
      locations: ["Cafe"],
    },
    dialogue: {
      id: "see_iris_studying_dialogue",
      lines: [
        {
          speaker: null,
          text: "You notice Iris sitting alone at a table, staring out the window thoughtfully.",
        },
        {
          speaker: null,
          text: "She looks a bit sad or contemplative.",
          choices: [
            {
              text: "Go talk to her",
              affectionChange: 3,
              moodChange: 2,
            },
            {
              text: "Leave her be, she seems to need space",
              affectionChange: 1,
              moodChange: 1,
            },
          ],
        },
      ],
    },
  },

```
