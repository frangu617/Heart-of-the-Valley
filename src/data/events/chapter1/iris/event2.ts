import type { Dialogue } from "../../../dialogues";
import { CharacterEvent } from "../../types";

// Event 2: Coffee Meetup
// Description: First intentional meeting with Iris at the cafe.
//
// ─── FLOW MAP ────────────────────────────────────────────────────────────────
// EVENT START: iris_coffee_meetup_event  (Cafe, 8–20h, hasMetIris + irisCoffeeAccepted)
//   ├─ ["I'd stay for the lecture."]          → iris_coffee_ev2_flirt
//   │    ├─ ["I wanted to build something..."] → iris_coffee_ev2_flirt_depth   END [irisCoffeeMet]
//   │    └─ ["The 8 AM lectures..."]           → iris_coffee_ev2_flirt_light   END [irisCoffeeMet]
//   ├─ ["You clearly love it..."]             → iris_coffee_ev2_friendly
//   │    ├─ ["Prestige wasn't the point..."]  → iris_coffee_ev2_friendly_build END [irisCoffeeMet]
//   │    └─ ["Right fit, right time..."]      → iris_coffee_ev2_friendly_timing END [irisCoffeeMet]
//   └─ ["Do your students actually..."]       → iris_coffee_ev2_reserved       END [irisCoffeeMet]
// Rewards on all paths: irisCoffeeMet
// ─────────────────────────────────────────────────────────────────────────────

// ─── FLIRT PATH ──────────────────────────────────────────────────────────────

// FROM: iris_coffee_meetup_event → ["I'd stay for the lecture."]
const iris_coffee_ev2_flirt: Dialogue = {
  id: "iris_coffee_ev2_flirt",
  lines: [
    {
      speaker: "You",
      text: "I'd stay for the lecture.",
    },
    {
      speaker: null,
      text: "She blinks. Holds eye contact a half-second longer than she probably meant to.",
    },
    {
      speaker: "Iris",
      text: "That is... not the usual reaction.",
      expression: "happy",
    },
    {
      speaker: "You",
      text: "Most people aren't asking the right questions.",
    },
    {
      speaker: null,
      text: "She looks down at her coffee, then back up. Holds it this time.",
    },
    {
      speaker: "Iris",
      text: "That is either a genuine compliment or you are very good at sounding like you mean things.",
      expression: "shy",
    },
    {
      speaker: "You",
      text: "Can't it be both?",
    },
    {
      speaker: "Iris",
      text: "She traces the rim of her cup with one finger. Maybe. I am going to assume you mean it and be embarrassingly pleased about it.",
      expression: "happy",
    },
    {
      speaker: null,
      text: "The light through the window shifts. The grinder at the counter goes again. Neither of you rushes to fill the pause.",
    },
    {
      speaker: "Iris",
      text: "Can I ask — why teaching? You could presumably do something in tech that pays considerably better and involves fewer students arguing rubrics they haven't read.",
      expression: "neutral",
    },
    {
      speaker: "You",
      text: "What do you tell her?",
      choices: [
        {
          text: "\"I wanted to build something that lasts. Code disappears. How people think doesn't.\"",
          affectionChange: 3,
          nextDialogueId: "iris_coffee_ev2_flirt_depth",
        },
        {
          text: "\"The 8 AM lectures are the only thing keeping me from going completely feral.\"",
          affectionChange: 1,
          lustChange: 1,
          nextDialogueId: "iris_coffee_ev2_flirt_light",
        },
      ],
    },
  ],
};

// FROM: iris_coffee_ev2_flirt → ["I wanted to build something that lasts..."]
const iris_coffee_ev2_flirt_depth: Dialogue = {
  id: "iris_coffee_ev2_flirt_depth",
  lines: [
    {
      speaker: null,
      text: "She is quiet for a moment. Not waiting for her turn — actually thinking.",
    },
    {
      speaker: "Iris",
      text: "That is a better answer than I was expecting.",
      expression: "neutral",
    },
    {
      speaker: "You",
      text: "What were you expecting?",
    },
    {
      speaker: "Iris",
      text: "Something about stable hours. Benefits. The pension plan.",
      expression: "happy",
    },
    {
      speaker: "You",
      text: "I have one of those too.",
    },
    {
      speaker: "Iris",
      text: "Ha.",
      expression: "happy",
    },
    {
      speaker: null,
      text: "She sets her cup down and is quiet again, but it is not an uncomfortable quiet. She is deciding how honest she wants to be in return.",
    },
    {
      speaker: "Iris",
      text: "I teach because I could not stop thinking about it. I was halfway through a research position and I kept finding myself more interested in watching people understand something than in the data itself.",
      expression: "neutral",
    },
    {
      speaker: "Iris",
      text: "She pauses. That sounds worse than I meant it to.",
      expression: "shy",
    },
    {
      speaker: "You",
      text: "It doesn't.",
    },
    {
      speaker: "Iris",
      text: "Biology is just... She looks at her hands for a moment, then at you. It is about understanding what things are made of. What drives them.",
      expression: "neutral",
    },
    {
      speaker: "Iris",
      text: "I find that applies to a lot of things outside of tissue samples.",
      expression: "happy",
    },
    {
      speaker: null,
      text: "She watches you with an expression you cannot quite place. Not guarded — more like she is looking at something and trying to figure out if it is what it appears to be.",
    },
    {
      speaker: "Iris",
      text: "I have a daughter. Dawn. She is seventeen and already sharper than me in most things I care about.",
      expression: "neutral",
    },
    {
      speaker: "Iris",
      text: "She is the reason I stopped staying in the lab until midnight. And the reason I started caring more about how I explain things than just whether the explanation is technically correct.",
      expression: "neutral",
    },
    {
      speaker: null,
      text: "She says it without ceremony — not a confession, just information she decided you were allowed to have.",
    },
    {
      speaker: "Iris",
      text: "You should come by the office sometime. Science block, room 304. It is quieter than the staff lounge and the coffee machine is the good one. No one fights over it.",
      expression: "happy",
    },
    {
      speaker: "You",
      text: "I'll find 304.",
    },
    {
      speaker: "Iris",
      text: "She picks up her keys — finally — and drops them into her bag. I am glad you came. After the shirt situation I was not sure you would.",
      expression: "shy",
    },
    {
      speaker: "You",
      text: "The shirt survived.",
    },
    {
      speaker: "Iris",
      text: "I know. I still feel bad. She stands, straightening her jacket. Same time next week, maybe. If you want.",
      expression: "happy",
    },
    {
      speaker: null,
      text: "She leaves first, weaving through tables with an ease she did not have when you walked in. The implication of 'same time next week' sits in the air after the door swings shut.",
    },
    {
      speaker: null,
      text: "The coffee she ordered for you was dark roast. No additions. She guessed right on the first try.",
      choices: [
        {
          text: "Head back",
          affectionChange: 0,
        },
      ],
    },
  ],
};

// FROM: iris_coffee_ev2_flirt → ["The 8 AM lectures are the only thing..."]
const iris_coffee_ev2_flirt_light: Dialogue = {
  id: "iris_coffee_ev2_flirt_light",
  lines: [
    {
      speaker: "Iris",
      text: "She laughs — unguarded, real. Is it working?",
      expression: "happy",
    },
    {
      speaker: "You",
      text: "Marginally.",
    },
    {
      speaker: "Iris",
      text: "I respect that. She leans back. The honest answer is that I stayed because there is no feeling like watching someone understand something for the first time. That click.",
      expression: "neutral",
    },
    {
      speaker: "Iris",
      text: "It sounds small. It is not.",
      expression: "happy",
    },
    {
      speaker: "You",
      text: "No. It isn't.",
    },
    {
      speaker: null,
      text: "She looks at you for a moment like she is recalibrating something.",
    },
    {
      speaker: "Iris",
      text: "You know, you are easier to talk to than I expected. She says it like it surprised her.",
      expression: "shy",
    },
    {
      speaker: "You",
      text: "What were you expecting?",
    },
    {
      speaker: "Iris",
      text: "I do not know. Someone more guarded. You seem like someone who keeps their cards close.",
      expression: "neutral",
    },
    {
      speaker: "You",
      text: "You're not wrong.",
    },
    {
      speaker: "Iris",
      text: "Then I am choosing to take this as a compliment. She smiles at her coffee.",
      expression: "happy",
    },
    {
      speaker: null,
      text: "She stays another fifteen minutes. The conversation stays light — the university's broken printer, a student she has already had to have the plagiarism talk with, the fact that the staff lounge always smells faintly of burnt microwave popcorn. You let her talk. She clearly needed to.",
    },
    {
      speaker: "Iris",
      text: "Science block, room 304. Better coffee, no burnt smell. Come by if you need a quiet afternoon.",
      expression: "neutral",
    },
    {
      speaker: "You",
      text: "I'll keep it in mind.",
    },
    {
      speaker: "Iris",
      text: "Good. She picks up her keys and stands. I am glad you said yes to this. She says it simply, without reading too much into it.",
      expression: "happy",
    },
    {
      speaker: null,
      text: "She gives you a small wave at the door. The easy kind. Like you have done this before.",
      choices: [
        {
          text: "Head back",
          affectionChange: 0,
        },
      ],
    },
  ],
};

// ─── FRIENDLY PATH ───────────────────────────────────────────────────────────

// FROM: iris_coffee_meetup_event → ["You clearly love it. That's rarer than people think."]
const iris_coffee_ev2_friendly: Dialogue = {
  id: "iris_coffee_ev2_friendly",
  lines: [
    {
      speaker: "You",
      text: "You clearly love it. That's rarer than people think.",
    },
    {
      speaker: null,
      text: "Something in her posture loosens. Not relief — more like she stepped off a surface she wasn't certain about.",
    },
    {
      speaker: "Iris",
      text: "It is rare. Most of my colleagues have gone purely clinical. Which is fine, but — She stops. I still get excited when a student finally understands the sodium-potassium pump. I have been teaching it for six years.",
      expression: "happy",
    },
    {
      speaker: "You",
      text: "The sodium-potassium pump.",
    },
    {
      speaker: "Iris",
      text: "It is the reason your heart is beating right now. It is not a boring subject.",
      expression: "neutral",
    },
    {
      speaker: "You",
      text: "I'll defer to the expert.",
    },
    {
      speaker: "Iris",
      text: "She smiles — a real one, not the polite careful version. Sorry. I have a habit of making every conversation eventually about biology. My daughter says I do it at dinner too.",
      expression: "shy",
    },
    {
      speaker: "You",
      text: "How old is she?",
    },
    {
      speaker: "Iris",
      text: "Seventeen. Too smart for her own good, or mine. She pauses. You will probably meet her at some point if you end up around the building much.",
      expression: "neutral",
    },
    {
      speaker: null,
      text: "She says it matter-of-factly, not as a warning and not as an invitation.",
    },
    {
      speaker: "Iris",
      text: "What made you choose this university? It is not exactly the most prestigious posting.",
      expression: "neutral",
    },
    {
      speaker: "You",
      text: "What do you tell her?",
      choices: [
        {
          text: "\"Prestige wasn't the point. I wanted somewhere I could build something, not just fill a slot.\"",
          affectionChange: 2,
          nextDialogueId: "iris_coffee_ev2_friendly_build",
        },
        {
          text: "\"Right fit, right time. I wasn't overthinking it.\"",
          affectionChange: 1,
          nextDialogueId: "iris_coffee_ev2_friendly_timing",
        },
      ],
    },
  ],
};

// FROM: iris_coffee_ev2_friendly → ["Prestige wasn't the point..."]
const iris_coffee_ev2_friendly_build: Dialogue = {
  id: "iris_coffee_ev2_friendly_build",
  lines: [
    {
      speaker: "Iris",
      text: "She is quiet. Then: That is exactly why I came here. I turned down better-resourced positions. Better funding, better facilities.",
      expression: "neutral",
    },
    {
      speaker: "Iris",
      text: "I wanted to be somewhere the department actually needed me. Not somewhere that could swap me out with the next hire and not notice for a semester.",
      expression: "neutral",
    },
    {
      speaker: "You",
      text: "How's that working out?",
    },
    {
      speaker: "Iris",
      text: "She smiles. Ask me in another year. Right now it is good. Better than good, some weeks.",
      expression: "happy",
    },
    {
      speaker: null,
      text: "The conversation eases after that. She asks about your first week. You talk about the projector that freezes on startup, the student who already emailed to dispute a grading rubric he has not read, the fact that your office chair squeaks on every third rotation. She commiserates with the fluency of someone who has had every version of this exact conversation.",
    },
    {
      speaker: "Iris",
      text: "The facilities are genuinely terrible. You just get used to working around them.",
      expression: "happy",
    },
    {
      speaker: "You",
      text: "Reassuring.",
    },
    {
      speaker: "Iris",
      text: "I try. She finishes her coffee. Science block, room 304. The chair does not squeak, the coffee machine is the good one, and no one will walk in and ask you to sign something.",
      expression: "happy",
    },
    {
      speaker: "You",
      text: "That last one alone is worth the trip.",
    },
    {
      speaker: "Iris",
      text: "I thought so. She starts gathering her things, keys going into her bag. This was better than I expected it to be. She sounds like she means it, not like she is filling a pause.",
      expression: "shy",
    },
    {
      speaker: "You",
      text: "Better than the alternative.",
    },
    {
      speaker: "Iris",
      text: "The shirt. Yes. She laughs quietly. Same time next week, maybe. If you are free.",
      expression: "happy",
    },
    {
      speaker: null,
      text: "She leaves with a small wave at the door. It's the wave of someone who has already decided they'll be back.",
      choices: [
        {
          text: "Head back",
          affectionChange: 0,
        },
      ],
    },
  ],
};

// FROM: iris_coffee_ev2_friendly → ["Right fit, right time. I wasn't overthinking it."]
const iris_coffee_ev2_friendly_timing: Dialogue = {
  id: "iris_coffee_ev2_friendly_timing",
  lines: [
    {
      speaker: "Iris",
      text: "She tilts her head slightly. That is a very non-answer.",
      expression: "neutral",
    },
    {
      speaker: "You",
      text: "It's a very non-answer question.",
    },
    {
      speaker: "Iris",
      text: "Fair. She considers this. I asked because I turned down better offers to come here. I like knowing when someone else made a deliberate choice rather than just landing somewhere.",
      expression: "neutral",
    },
    {
      speaker: "You",
      text: "It was deliberate.",
    },
    {
      speaker: "Iris",
      text: "Good. She seems satisfied with that. That is enough.",
      expression: "happy",
    },
    {
      speaker: null,
      text: "She turns the conversation to smaller things after that. The staff lounge that always smells of burnt popcorn. The broken printer on the third floor that has been 'being serviced' since apparently before she arrived. A student she has already had to have the plagiarism conversation with before the second week started.",
    },
    {
      speaker: null,
      text: "You listen. She talks like someone who needed to say things out loud to a person who is not yet part of the politics of it.",
    },
    {
      speaker: "Iris",
      text: "I mean — sorry. You did not sign up for my full year's worth of complaints.",
      expression: "shy",
    },
    {
      speaker: "You",
      text: "I didn't mind.",
    },
    {
      speaker: "Iris",
      text: "Science block, room 304. Quieter. Better coffee. Come by if you need an afternoon that doesn't involve the broken printer.",
      expression: "neutral",
    },
    {
      speaker: "You",
      text: "I'll find it.",
    },
    {
      speaker: "Iris",
      text: "She gathers her things. Keys into the bag, finally. I am glad you came. She says it clearly, without the overexplaining this time.",
      expression: "happy",
    },
    {
      speaker: null,
      text: "She says goodbye at the door with a small wave. The kind that suggests she will be thinking about whether she said too much for about the next hour.",
      choices: [
        {
          text: "Head back",
          affectionChange: 0,
        },
      ],
    },
  ],
};

// ─── RESERVED PATH ───────────────────────────────────────────────────────────

// FROM: iris_coffee_meetup_event → ["Do your students actually check out that fast?"]
const iris_coffee_ev2_reserved: Dialogue = {
  id: "iris_coffee_ev2_reserved",
  lines: [
    {
      speaker: "You",
      text: "Do your students actually check out that fast?",
    },
    {
      speaker: "Iris",
      text: "She pauses. Then, evenly: Most of them. The ones who don't tend to end up in research.",
      expression: "neutral",
    },
    {
      speaker: null,
      text: "She recalibrates. Not cold — just adjusting to a slightly different register. The nervous energy settles into something more composed.",
    },
    {
      speaker: "Iris",
      text: "It is fine. Not everyone is built for it. What do you teach?",
      expression: "neutral",
    },
    {
      speaker: "You",
      text: "Advanced programming. Computer Science.",
    },
    {
      speaker: "Iris",
      text: "So you work with systems. Logical hierarchies. Everything operating within a defined structure.",
      expression: "neutral",
    },
    {
      speaker: "You",
      text: "More or less.",
    },
    {
      speaker: "Iris",
      text: "Biology is the same, honestly. Different language. She meets your eyes. I just use words like 'cascade failure' instead of 'runtime error.' The principles are identical — a system trying to maintain itself under stress.",
      expression: "neutral",
    },
    {
      speaker: "You",
      text: "Now you've got my attention.",
    },
    {
      speaker: "Iris",
      text: "She smiles — controlled, but real. Good. That is the same feeling I am trying to create in a lecture hall of twenty-two year olds.",
      expression: "happy",
    },
    {
      speaker: null,
      text: "The conversation stays in that register — two people who know their fields well, finding the overlaps. It is not warm exactly, but it is not impersonal either. It is the conversation of two people who respect competence.",
    },
    {
      speaker: "Iris",
      text: "You know — the human body is basically a distributed system running several thousand processes simultaneously, most of them without any conscious input from the operator. She pauses. Does that framing bother you or does it help?",
      expression: "neutral",
    },
    {
      speaker: "You",
      text: "Helps.",
    },
    {
      speaker: "Iris",
      text: "Good. Most people find it reductive. I find it clarifying.",
      expression: "neutral",
    },
    {
      speaker: "Iris",
      text: "Humans are uncomfortable being described as machines. Even very elegant, very complicated ones.",
      expression: "neutral",
    },
    {
      speaker: "You",
      text: "Ego gets in the way.",
    },
    {
      speaker: "Iris",
      text: "Always. She finishes her coffee and sets the cup down with a small, decisive click. Science block, room 304. If you need quiet or want to continue this conversation in an environment where no one is going to interrupt us to ask about the broken printer.",
      expression: "neutral",
    },
    {
      speaker: "You",
      text: "Strong pitch.",
    },
    {
      speaker: "Iris",
      text: "I am a scientist. I lead with evidence. She stands, picking up her bag without fumbling this time. I am glad you came. I mean that straightforwardly.",
      expression: "neutral",
    },
    {
      speaker: null,
      text: "She leaves with a nod at the door. Not flustered — clear. The exit of someone who decided exactly how much to give and gave precisely that.",
      choices: [
        {
          text: "Head back",
          affectionChange: 0,
        },
      ],
    },
  ],
};

// ─── DIALOGUES RECORD ────────────────────────────────────────────────────────

export const irisEvent2Dialogues: Record<string, Dialogue> = {
  iris_coffee_ev2_flirt,
  iris_coffee_ev2_flirt_depth,
  iris_coffee_ev2_flirt_light,
  iris_coffee_ev2_friendly,
  iris_coffee_ev2_friendly_build,
  iris_coffee_ev2_friendly_timing,
  iris_coffee_ev2_reserved,
};

// ─── CHARACTER EVENTS ────────────────────────────────────────────────────────

export const irisEvent2Events: CharacterEvent[] = [
  {
    id: "iris_coffee_meetup_event",
    name: "Coffee Meetup",
    description: "Meet Iris at the cafe after accepting her offer.",
    quest: {
      title: "Meet Iris for Coffee",
      description:
        "You agreed to meet Iris at the Cafe. She is waiting to make up for the coffee incident.",
    },
    priority: 250,
    repeatable: false,
    conditions: {
      minAffection: 0,
      minHour: 8,
      maxHour: 20,
      requiredLocation: "Cafe",
      requiredFlags: ["hasMetIris", "irisCoffeeAccepted"],
    },
    dialogue: {
      id: "iris_coffee_meetup_event",
      lines: [
        {
          speaker: null,
          text: "The cafe is the kind of place that feels smaller than it is. Corner tables, afternoon light through fogged glass, the grinder going every few minutes behind the counter.",
          imageSlide: "/images/locations/cafe/morning.png",
        },
        {
          speaker: null,
          text: "You spot Iris at a table near the window before she spots you. She is sitting upright with two drinks already in front of her, her keys on the table, her own coffee going slightly cold beside them.",
        },
        {
          speaker: null,
          text: "She sees you and something in her shoulders eases — relief, maybe, that you actually showed.",
        },
        {
          speaker: "Iris",
          text: "Hey. I got here early so I went ahead and ordered. Dark roast, no sugar — you look like someone who doesn't add anything to coffee. I took a guess.",
          expression: "happy",
        },
        {
          speaker: "You",
          text: "Right on both counts.",
        },
        {
          speaker: "Iris",
          text: "Good. I was nervous about the guess. She wraps both hands around her own cup.",
          expression: "shy",
        },
        {
          speaker: null,
          text: "Her keys are still on the table. She picks them up, sets them down.",
        },
        {
          speaker: "Iris",
          text: "I still feel terrible about yesterday. That was — She stops, exhales. Not the start I would have planned.",
          expression: "neutral",
        },
        {
          speaker: "You",
          text: "The coffee was memorable, at least.",
        },
        {
          speaker: "Iris",
          text: "That is one way to put it. She smiles, but it is the kind that comes with embarrassment attached. I promise I am usually more coordinated. I was late, I had too many books under one arm, I turned a corner without looking and —",
          expression: "happy",
        },
        {
          speaker: null,
          text: "She catches herself.",
        },
        {
          speaker: "Iris",
          text: "I am doing the thing where I overexplain, aren't I.",
          expression: "shy",
        },
        {
          speaker: "You",
          text: "Little bit.",
        },
        {
          speaker: "Iris",
          text: "Sorry. I do that when I am nervous. She picks up the keys again, sets them down again. You take a seat across from her.",
          expression: "shy",
        },
        {
          speaker: "Iris",
          text: "So. New instructor. What department?",
          expression: "neutral",
        },
        {
          speaker: "You",
          text: "Computer Science. Advanced programming.",
        },
        {
          speaker: "Iris",
          text: "Oh. So you spend all day looking at code while I spend all day looking at organs. We are basically doing the same job.",
          expression: "neutral",
        },
        {
          speaker: "You",
          text: "The campus needs both.",
        },
        {
          speaker: "Iris",
          text: "It does. She smiles a little more easily. I teach Advanced Anatomy and Physiology. Most people's eyes glaze over before I finish the word 'physiology.'",
          expression: "happy",
        },
        {
          speaker: "Iris",
          text: "It is genuinely fascinating though. Every muscle, every nerve firing — the whole system running on electrical signals and chemical gradients. A machine that built itself from nothing.",
          expression: "excited",
        },
        {
          speaker: null,
          text: "She pauses. Glances up. She knows she has started lecturing.",
        },
        {
          speaker: "Iris",
          text: "I am doing it again.",
          expression: "shy",
        },
        {
          speaker: "You",
          text: "How do you respond?",
          choices: [
            {
              text: "\"I'd stay for the lecture.\"",
              affectionChange: 2,
              lustChange: 1,
              nextDialogueId: "iris_coffee_ev2_flirt",
            },
            {
              text: "\"You clearly love it. That's rarer than people think.\"",
              affectionChange: 2,
              nextDialogueId: "iris_coffee_ev2_friendly",
            },
            {
              text: "\"Do your students actually check out that fast?\"",
              affectionChange: 1,
              nextDialogueId: "iris_coffee_ev2_reserved",
            },
          ],
        },
      ],
    },
    rewards: {
      setFlags: ["irisCoffeeMet"],
    },
  },
];
