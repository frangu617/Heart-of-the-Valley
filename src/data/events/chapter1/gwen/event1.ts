import type { Dialogue } from "../../../dialogues";
import { CharacterEvent } from "../../types";

// Event 1: Hallway Intro
// Description: First meeting with Gwen in the hallway with a guarded-but-curious tone.
//
// FLOW MAP
// EVENT START: gwen_hallway_intro_event (Hallway, any time, hasMetIris+hasMetYumi+hasMetRuby)
//   - [Greet her first.] -> gwen_intro_player_lead
//   - [Wait for her to greet you first.] -> gwen_intro_gwen_lead
// gwen_intro_player_lead
//   - [Offer coffee when schedules line up.] -> gwen_intro_player_close_warm
//   - [Keep it polite and brief.] -> gwen_intro_player_close_neutral
//   - [Light tease.] -> gwen_intro_player_close_tease
// gwen_intro_gwen_lead
//   - [Match her pace and offer coffee.] -> gwen_intro_gwen_close_warm
//   - [Play it safe and wish her luck.] -> gwen_intro_gwen_close_neutral
//   - [Push a little and tease.] -> gwen_intro_gwen_close_tease
// Rewards: hasMetGwen, gwenIntroDone

// FROM: gwen_hallway_intro_event -> [Greet her first.]
const gwenIntroPlayerLead: Dialogue = {
  id: "gwen_intro_player_lead",
  lines: [
    { speaker: "You", text: "Hey. I just moved in. I'm {playerName}." },
    {
      speaker: null,
      text: "She blinks once like she was halfway through leaving, then stays put.",
    },
    {
      speaker: "Gwen",
      text: "Gwen. Yeah, figured you were the new neighbor.",
      expression: "neutral",
    },
    {
      speaker: null,
      text: "Her tone is flat but not cold. Guarded, not hostile.",
    },
    {
      speaker: "Gwen",
      text: "Saw you carrying boxes all week. Computer monitor, folding chair, that sad lamp with no shade.",
      expression: "neutral",
    },
    { speaker: "You", text: "So my stealth approach failed." },
    {
      speaker: "Gwen",
      text: "Completely. Hallway sees everything.",
      expression: "happy",
    },
    {
      speaker: null,
      text: "She almost smiles after saying it, then smooths her face back to neutral.",
    },
    {
      speaker: "Gwen",
      text: "Building this small means we're going to run into each other a lot. Weird hours included.",
      expression: "neutral",
    },
    {
      speaker: "Gwen",
      text: "If you hear my door at two in the morning, it's not an emergency. It's just... my schedule.",
      expression: "shy",
    },
    { speaker: "You", text: "Good to know. I was going to assume you were either haunted or very dramatic." },
    {
      speaker: "Gwen",
      text: "Could be both.",
      expression: "happy",
    },
    {
      speaker: null,
      text: "Another tiny smile, gone quickly. She twirls her keys around her finger like she needs her hands busy.",
    },
    {
      speaker: "Gwen",
      text: "Most new neighbors are one of two types. Too friendly in week one or allergic to eye contact.",
      expression: "neutral",
    },
    {
      speaker: "Gwen",
      text: "You're somewhere in the middle. It's... less annoying.",
      expression: "neutral",
    },
    { speaker: "You", text: "That might be the nicest thing anyone's said to me this week." },
    {
      speaker: "Gwen",
      text: "Don't get used to it.",
      expression: "happy",
    },
    {
      speaker: null,
      text: "The pause after that feels off in a familiar way, like two people trying to pick up a conversation they somehow never had.",
    },
    {
      speaker: "Gwen",
      text: "I work nights at the cl... at a place downtown. Loud place. Lots of lights.",
      expression: "neutral",
    },
    {
      speaker: null,
      text: "She cuts herself off halfway through the word and shifts her weight, suddenly careful.",
    },
    { speaker: "You", text: "You don't have to explain it to me." },
    {
      speaker: "Gwen",
      text: "I know. I just don't like people filling in blanks for me.",
      expression: "neutral",
    },
    {
      speaker: "Gwen",
      text: "What about you? What do you do?",
      expression: "neutral",
    },
    {
      speaker: "You",
      text: "I teach programming at the university. First day was today.",
    },
    {
      speaker: "Gwen",
      text: "First day and you still look mostly alive. That's impressive.",
      expression: "neutral",
    },
    { speaker: "You", text: "I was expecting worse." },
    {
      speaker: "Gwen",
      text: "Students try to test new teachers fast. Same way crowds test new dancers.",
      expression: "neutral",
    },
    {
      speaker: "Gwen",
      text: "Different stage, same species.",
      expression: "happy",
    },
    {
      speaker: null,
      text: "You laugh before you mean to. She notices, then looks almost relieved you did.",
    },
    {
      speaker: "Gwen",
      text: "Anyway, I should let you get back to whatever new teachers do after day one. Collapse, probably.",
      expression: "neutral",
    },
    {
      speaker: "You",
      text: "Mostly replay every awkward moment and pretend that's productivity.",
    },
    {
      speaker: "Gwen",
      text: "Great. So we're both professionals.",
      expression: "happy",
    },
    {
      speaker: null,
      text: "She leans against the wall by the mailboxes, less like she's trying to leave now, more like she's deciding how much of herself to let into the room.",
    },
    {
      speaker: "Gwen",
      text: "This is going to sound weird for a first conversation.",
      expression: "shy",
    },
    {
      speaker: "Gwen",
      text: "You ever meet someone and feel like you already know what their silence sounds like?",
      expression: "neutral",
    },
    {
      speaker: "You",
      text: "Yeah. It's disorienting.",
    },
    {
      speaker: "Gwen",
      text: "Exactly.",
      expression: "neutral",
    },
    {
      speaker: null,
      text: "Her shoulders ease a fraction, like the answer mattered more than she expected.",
    },
    {
      speaker: "Gwen",
      text: "I don't usually do this part. The normal-neighbor small talk. I'm bad at it sober.",
      expression: "shy",
    },
    {
      speaker: "You",
      text: "You're doing fine.",
    },
    {
      speaker: "Gwen",
      text: "You don't have enough data to say that yet.",
      expression: "happy",
    },
    {
      speaker: null,
      text: "Another pause. Not empty. Just both of you waiting to see if the other person is going to ruin the moment first.",
    },
    {
      speaker: "Gwen",
      text: "Most people either come in way too hot with me or keep me at arm's length because they think it'll be easier.",
      expression: "neutral",
    },
    {
      speaker: "Gwen",
      text: "Middle ground is rarer than people think.",
      expression: "neutral",
    },
    {
      speaker: "You",
      text: "I'm a programmer. We trust stable middle layers.",
    },
    {
      speaker: "Gwen",
      text: "Nerd line. Noted.",
      expression: "happy",
    },
    {
      speaker: "You",
      text: "How do you handle the first-meeting awkwardness?",
      choices: [
        {
          text: "Offer coffee when schedules line up.",
          affectionChange: 2,
          dominanceChange: -1,
          nextDialogueId: "gwen_intro_player_close_warm",
        },
        {
          text: "Keep it polite and brief.",
          affectionChange: 0,
          nextDialogueId: "gwen_intro_player_close_neutral",
        },
        {
          text: "Light tease: hallway got better today.",
          affectionChange: 1,
          lustChange: 1,
          nextDialogueId: "gwen_intro_player_close_tease",
        },
      ],
    },
  ],
};

// FROM: gwen_hallway_intro_event -> [Wait for her to greet you first.]
const gwenIntroGwenLead: Dialogue = {
  id: "gwen_intro_gwen_lead",
  lines: [
    {
      speaker: null,
      text: "She studies you for two beats, like deciding whether conversation is worth the effort.",
    },
    {
      speaker: "Gwen",
      text: "You're the new one across the hall, right?",
      expression: "neutral",
    },
    { speaker: "You", text: "Yeah. {playerName}." },
    {
      speaker: "Gwen",
      text: "Gwen.",
      expression: "neutral",
    },
    {
      speaker: null,
      text: "She gives your name a small nod like filing it away for later.",
    },
    {
      speaker: "Gwen",
      text: "Saw your boxes all week. You looked like you were trying to move in without being perceived.",
      expression: "neutral",
    },
    { speaker: "You", text: "How'd that go for me?" },
    {
      speaker: "Gwen",
      text: "Two out of ten. Maybe three for effort.",
      expression: "happy",
    },
    {
      speaker: null,
      text: "The joke lands dry, but it lands.",
    },
    {
      speaker: "Gwen",
      text: "Building's tiny. People notice each other whether they want to or not.",
      expression: "neutral",
    },
    {
      speaker: "Gwen",
      text: "So we should probably at least be civil before hallway politics invent a feud.",
      expression: "neutral",
    },
    { speaker: "You", text: "Civil sounds manageable." },
    {
      speaker: "Gwen",
      text: "Good. Also, my hours are weird. If you hear me come in late, ignore it unless there's fire.",
      expression: "shy",
    },
    {
      speaker: "You",
      text: "Noted. Fire gets help. Weird hours get headphones.",
    },
    {
      speaker: "Gwen",
      text: "Exactly.",
      expression: "happy",
    },
    {
      speaker: null,
      text: "She rolls her keys between her fingers, then catches herself doing it and stops.",
    },
    {
      speaker: "Gwen",
      text: "I do night work at the cl... at a place downtown. Long shifts. Loud crowd.",
      expression: "neutral",
    },
    {
      speaker: null,
      text: "The almost-word hangs there. She lets it hang.",
    },
    {
      speaker: "Gwen",
      text: "What about you?",
      expression: "neutral",
    },
    { speaker: "You", text: "I teach programming. Just started." },
    {
      speaker: "Gwen",
      text: "Teacher. First day?",
      expression: "neutral",
    },
    { speaker: "You", text: "Yeah." },
    {
      speaker: "Gwen",
      text: "Then we're both pretending we have our lives together this week.",
      expression: "happy",
    },
    {
      speaker: null,
      text: "You laugh. She does too, briefly, then catches herself and looks down the hall.",
    },
    {
      speaker: "Gwen",
      text: "Did it go okay? The teaching thing.",
      expression: "neutral",
    },
    {
      speaker: "You",
      text: "Better than I expected. Still felt like I was faking confidence half the time.",
    },
    {
      speaker: "Gwen",
      text: "That's the trick. Most people just never admit it out loud.",
      expression: "neutral",
    },
    {
      speaker: null,
      text: "Another silence settles. Not empty. Just careful. It feels less like strangers and more like a conversation restarting after a long interruption.",
    },
    {
      speaker: "Gwen",
      text: "You get that too, right? That weird almost-familiar thing.",
      expression: "shy",
    },
    {
      speaker: "You",
      text: "Yeah. Like we're late to a conversation we never scheduled.",
    },
    {
      speaker: "Gwen",
      text: "Exactly.",
      expression: "neutral",
    },
    {
      speaker: null,
      text: "She exhales and looks down the hallway toward her door, then back at you again like she's arguing with herself in real time.",
    },
    {
      speaker: "Gwen",
      text: "I'm not great at people when I'm off-shift. I can be loud at work and then silent for twelve hours after.",
      expression: "neutral",
    },
    {
      speaker: "Gwen",
      text: "Makes me look colder than I am.",
      expression: "shy",
    },
    {
      speaker: "You",
      text: "You don't read cold. You read careful.",
    },
    {
      speaker: "Gwen",
      text: "Careful is probably the honest word.",
      expression: "neutral",
    },
    {
      speaker: "Gwen",
      text: "People usually want either the version of me that's easy to party with, or no version at all.",
      expression: "neutral",
    },
    {
      speaker: "Gwen",
      text: "Middle version confuses them.",
      expression: "shy",
    },
    {
      speaker: "You",
      text: "I'm okay with confusing.",
    },
    {
      speaker: null,
      text: "That earns you a look that's half skeptical, half amused.",
    },
    {
      speaker: "Gwen",
      text: "You say that now. We'll test it later.",
      expression: "happy",
    },
    {
      speaker: null,
      text: "She taps her key against the rail, a small metallic beat that fills the space where either of you could bail out.",
    },
    {
      speaker: "Gwen",
      text: "Anyway. Before this turns into a hallway therapy session.",
      expression: "neutral",
    },
    {
      speaker: "You",
      text: "What do you do with that pause?",
      choices: [
        {
          text: "Match her pace and offer coffee sometime.",
          affectionChange: 2,
          dominanceChange: -1,
          nextDialogueId: "gwen_intro_gwen_close_warm",
        },
        {
          text: "Play it safe and wish her luck.",
          affectionChange: 0,
          nextDialogueId: "gwen_intro_gwen_close_neutral",
        },
        {
          text: "Push a little: finish that job sentence next time.",
          affectionChange: 1,
          lustChange: 1,
          dominanceChange: 1,
          nextDialogueId: "gwen_intro_gwen_close_tease",
        },
      ],
    },
  ],
};

// FROM: gwen_intro_player_lead -> [Offer coffee when schedules line up.]
const gwenIntroPlayerCloseWarm: Dialogue = {
  id: "gwen_intro_player_close_warm",
  lines: [
    { speaker: "You", text: "If your schedule ever lines up, coffee's on me." },
    {
      speaker: null,
      text: "She narrows her eyes like she's checking for a hidden angle, then seems satisfied there isn't one.",
    },
    {
      speaker: "Gwen",
      text: "Maybe. I don't do cheerful mornings, but I can do coffee.",
      expression: "shy",
    },
    {
      speaker: "You",
      text: "Afternoons, then. Neutral territory.",
    },
    {
      speaker: "Gwen",
      text: "Afternoons are usually when I'm pretending to be a functional human before work.",
      expression: "neutral",
    },
    {
      speaker: "Gwen",
      text: "Could work.",
      expression: "shy",
    },
    {
      speaker: null,
      text: "The words are casual, but she says them slower, like she doesn't offer this often.",
    },
    {
      speaker: "Gwen",
      text: "You're calmer than most people in this building.",
      expression: "neutral",
    },
    { speaker: "You", text: "First-day exhaustion. Might be temporary." },
    {
      speaker: "Gwen",
      text: "Still. I like it.",
      expression: "shy",
    },
    {
      speaker: null,
      text: "She reaches for the stair rail, then looks back at you.",
    },
    {
      speaker: "Gwen",
      text: "Apartment 3B. If you knock, knock like a normal person, not like the building's on fire.",
      expression: "happy",
    },
    { speaker: "You", text: "Noted." },
    {
      speaker: "Gwen",
      text: "See you around, {playerName}.",
      expression: "neutral",
    },
    {
      speaker: null,
      text: "She takes two steps toward her door, then stops like she remembered something mid-motion.",
    },
    {
      speaker: "Gwen",
      text: "And hey... thanks for not doing the weird neighbor interview thing.",
      expression: "shy",
    },
    {
      speaker: null,
      text: "You part in opposite directions. Halfway down the corridor, both of you glance back once, like each of you forgot one line you meant to say.",
      nextDialogueId: "gwen_intro_shared_exit",
    },
  ],
};

// FROM: gwen_intro_player_lead -> [Keep it polite and brief.]
const gwenIntroPlayerCloseNeutral: Dialogue = {
  id: "gwen_intro_player_close_neutral",
  lines: [
    { speaker: "You", text: "Nice meeting you, Gwen. See you around." },
    {
      speaker: "Gwen",
      text: "Yeah. See you around.",
      expression: "neutral",
    },
    {
      speaker: null,
      text: "She gives a short nod, the kind that ends conversations cleanly without shutting the door on future ones.",
    },
    {
      speaker: "Gwen",
      text: "Good luck with the university thing.",
      expression: "neutral",
    },
    { speaker: "You", text: "Thanks. Good luck with your shifts." },
    {
      speaker: "Gwen",
      text: "I'll need it.",
      expression: "shy",
    },
    {
      speaker: null,
      text: "She turns away with measured steps, then slows at her door for just a second before going inside.",
      nextDialogueId: "gwen_intro_shared_exit",
    },
  ],
};

// FROM: gwen_intro_player_lead -> [Light tease.]
const gwenIntroPlayerCloseTease: Dialogue = {
  id: "gwen_intro_player_close_tease",
  lines: [
    { speaker: "You", text: "For the record, this hallway got better today." },
    {
      speaker: null,
      text: "She stares at you a beat too long, deciding whether to roll her eyes or laugh.",
    },
    {
      speaker: "Gwen",
      text: "Careful. That's almost charming.",
      expression: "happy",
    },
    {
      speaker: "You",
      text: "Almost? Brutal.",
    },
    {
      speaker: "Gwen",
      text: "I grade on a curve.",
      expression: "happy",
    },
    {
      speaker: null,
      text: "She shakes her head, but this time she doesn't hide the smile.",
    },
    {
      speaker: "Gwen",
      text: "Don't waste all your good lines in a stairwell. Save one for when I look less dead.",
      expression: "neutral",
    },
    {
      speaker: "You",
      text: "So there is a next round.",
    },
    {
      speaker: "Gwen",
      text: "Maybe. Depends if you keep pace.",
      expression: "happy",
    },
    {
      speaker: null,
      text: "She disappears into her apartment still smiling, and you stand there a second longer than necessary before moving.",
      nextDialogueId: "gwen_intro_shared_exit",
    },
  ],
};

// FROM: gwen_intro_gwen_lead -> [Match her pace and offer coffee sometime.]
const gwenIntroGwenCloseWarm: Dialogue = {
  id: "gwen_intro_gwen_close_warm",
  lines: [
    { speaker: "You", text: "If you ever want a quiet coffee, let me know." },
    {
      speaker: null,
      text: "Her expression shifts, subtle but real, like the offer surprised her in a good way.",
    },
    {
      speaker: "Gwen",
      text: "Quiet coffee sounds... unexpectedly nice.",
      expression: "shy",
    },
    {
      speaker: "Gwen",
      text: "No promises on timing. My schedule's chaos.",
      expression: "neutral",
    },
    {
      speaker: "You",
      text: "I can work with chaos. I teach freshmen now.",
    },
    {
      speaker: "Gwen",
      text: "Fair point.",
      expression: "happy",
    },
    {
      speaker: null,
      text: "She almost laughs, then checks herself and tucks a loose strand of hair behind her ear.",
    },
    {
      speaker: "Gwen",
      text: "If I text you at a weird hour, that's me being normal. Don't panic.",
      expression: "neutral",
    },
    { speaker: "You", text: "Noted." },
    {
      speaker: "Gwen",
      text: "Apartment 3B. In case hallway diplomacy fails and we need formal channels.",
      expression: "happy",
    },
    {
      speaker: null,
      text: "She starts to leave, pauses, and adds one last thing without facing you.",
    },
    {
      speaker: "Gwen",
      text: "And... welcome to the building, {playerName}.",
      expression: "shy",
      nextDialogueId: "gwen_intro_shared_exit",
    },
  ],
};

// FROM: gwen_intro_gwen_lead -> [Play it safe and wish her luck.]
const gwenIntroGwenCloseNeutral: Dialogue = {
  id: "gwen_intro_gwen_close_neutral",
  lines: [
    { speaker: "You", text: "Good luck with your shifts." },
    {
      speaker: "Gwen",
      text: "Thanks. Good luck with the new job.",
      expression: "neutral",
    },
    {
      speaker: null,
      text: "She nods once, precise and polite.",
    },
    {
      speaker: "Gwen",
      text: "You'll probably hear me coming in late a lot this month.",
      expression: "neutral",
    },
    { speaker: "You", text: "I'll survive." },
    {
      speaker: "Gwen",
      text: "Good. So will I.",
      expression: "neutral",
    },
    {
      speaker: null,
      text: "The moment ends cleanly. Not warm, not cold, just two people setting the first line between them and leaving it there.",
      nextDialogueId: "gwen_intro_shared_exit",
    },
  ],
};

// FROM: gwen_intro_gwen_lead -> [Push a little: finish that job sentence next time.]
const gwenIntroGwenCloseTease: Dialogue = {
  id: "gwen_intro_gwen_close_tease",
  lines: [
    { speaker: "You", text: "You can finish that job sentence next time." },
    {
      speaker: null,
      text: "Her eyes narrow like you stepped one inch over a line she didn't draw out loud.",
    },
    {
      speaker: "Gwen",
      text: "Bold for day one.",
      expression: "neutral",
    },
    {
      speaker: "You",
      text: "Curious, not entitled.",
    },
    {
      speaker: null,
      text: "That makes her pause. The tension eases just a little.",
    },
    {
      speaker: "Gwen",
      text: "Good answer.",
      expression: "happy",
    },
    {
      speaker: "Gwen",
      text: "Maybe you earn chapter two. Maybe you don't.",
      expression: "happy",
    },
    {
      speaker: "Gwen",
      text: "Either way, don't pretend you know me yet.",
      expression: "neutral",
    },
    { speaker: "You", text: "Wasn't planning to." },
    {
      speaker: "Gwen",
      text: "Then we're fine.",
      expression: "neutral",
    },
    {
      speaker: null,
      text: "She leaves with a half-smile that could be a warning or an invitation. You suspect she likes not forcing you to pick.",
      nextDialogueId: "gwen_intro_shared_exit",
    },
  ],
};

const gwenIntroSharedExit: Dialogue = {
  id: "gwen_intro_shared_exit",
  lines: [
    {
      speaker: null,
      text: "The hallway quiet settles back in after she leaves, but it doesn't feel the same anymore.",
    },
    {
      speaker: null,
      text: "You stand there with your hand still half-raised, like the conversation ended one sentence earlier than it was supposed to.",
    },
    {
      speaker: "You",
      text: "That was either a normal neighbor conversation or the beginning of a very specific kind of trouble.",
      isThought: true,
    },
    {
      speaker: null,
      text: "You replay the details in pieces: the smudged eyeliner, the way she guarded certain words, the quick shifts between dry humor and caution.",
    },
    {
      speaker: null,
      text: "She talked like someone reaching out with one hand while keeping the other near the exit.",
    },
    {
      speaker: "You",
      text: "She's careful. Not distant. That's different.",
      isThought: true,
    },
    {
      speaker: null,
      text: "You head back toward your apartment, then pause at your own door as another thought catches up with you.",
    },
    {
      speaker: "You",
      text: "And yeah, she's exactly my type. Which doesn't narrow anything down because apparently every beautiful woman is my type.",
      isThought: true,
    },
    {
      speaker: null,
      text: "You think about the way she clipped her own sentence in half at \"cl...\" and how quickly she switched to neutral after almost showing too much.",
    },
    {
      speaker: null,
      text: "It wasn't shame. It felt more like control. Like she decides in layers what version of herself people get, and when.",
    },
    {
      speaker: "You",
      text: "Guarded people don't scare me. They're usually the most honest once they trust you.",
      isThought: true,
    },
    {
      speaker: null,
      text: "Then again, trusting someone in a hallway after one conversation is exactly how people end up in situations they can't walk back from.",
    },
    {
      speaker: null,
      text: "You should probably keep this simple. Neighbor. Small talk. Nothing complicated.",
    },
    {
      speaker: null,
      text: "You immediately know that's not going to happen.",
    },
    {
      speaker: "You",
      text: "First day at work, first conversation across the hall, and I'm already overthinking both. Great start.",
      isThought: true,
    },
    {
      speaker: null,
      text: "Through the wall you hear a drawer shut, then silence again. She is close enough to be part of your routine now, even if neither of you says it yet.",
    },
    {
      speaker: null,
      text: "You drop your keys on the counter and stand there listening to the apartment breathe, waiting for the feeling to pass.",
    },
    {
      speaker: null,
      text: "It doesn't.",
    },
    {
      speaker: null,
      text: "The lock clicks behind you. Through the wall, faint music starts in another unit, then cuts off just as quickly.",
    },
    {
      speaker: null,
      text: "First days are supposed to be simple: unpack, survive work, sleep.",
    },
    {
      speaker: null,
      text: "Now there's a name across the hall, a half-finished sentence about her job, and a feeling you might be stepping into something you don't understand yet.",
    },
    {
      speaker: "You",
      text: "Maybe that's fine. Maybe that's exactly what I wanted without saying it out loud.",
      isThought: true,
    },
    {
      speaker: null,
      text: "Either way, you'll see her again.",
    },
    {
      speaker: null,
      text: "And next time, you'll both have to decide whether this stays hallway-small-talk... or turns into something harder to keep contained.",
    },
  ],
};

export const gwenEvent1Dialogues: Record<string, Dialogue> = {
  gwen_intro_player_lead: gwenIntroPlayerLead,
  gwen_intro_gwen_lead: gwenIntroGwenLead,
  gwen_intro_player_close_warm: gwenIntroPlayerCloseWarm,
  gwen_intro_player_close_neutral: gwenIntroPlayerCloseNeutral,
  gwen_intro_player_close_tease: gwenIntroPlayerCloseTease,
  gwen_intro_gwen_close_warm: gwenIntroGwenCloseWarm,
  gwen_intro_gwen_close_neutral: gwenIntroGwenCloseNeutral,
  gwen_intro_gwen_close_tease: gwenIntroGwenCloseTease,
  gwen_intro_shared_exit: gwenIntroSharedExit,
  // Backward-compat aliases for prior Chapter 1 Event 1 dialogue ids.
  gwen_intro_help_first: gwenIntroPlayerLead,
  gwen_intro_playful_first: gwenIntroPlayerLead,
  gwen_intro_watchful_first: gwenIntroGwenLead,
  gwen_intro_after_first: gwenIntroGwenLead,
  gwen_intro_respectful: gwenIntroPlayerCloseWarm,
  gwen_intro_curious: gwenIntroGwenCloseTease,
  gwen_intro_boundary: gwenIntroPlayerCloseNeutral,
};

export const gwenEvent1Events: CharacterEvent[] = [
  {
    id: "gwen_hallway_intro_event",
    name: "Hallway Intro",
    description: "Meet Gwen for the first time in the hallway.",
    quest: {
      title: "Meet the Neighbor",
      description: "Check the hallway after you've met Iris, Yumi, and Ruby.",
    },
    priority: 240,
    repeatable: false,
    conditions: {
      minHour: 0,
      maxHour: 24,
      requiredLocation: "Hallway",
      requiredFlags: ["hasMetIris", "hasMetYumi", "hasMetRuby"],
    },
    dialogue: {
      id: "gwen_hallway_intro_event",
      lines: [
        {
          speaker: null,
          text: "The hallway is quiet for once, that dead hour between people leaving for work and people coming back from whatever they do at night.",
        },
        {
          speaker: null,
          text: "A woman in a dark hoodie stands by the mailboxes with keys looped around one finger, black boots tapping lightly against the tile.",
        },
        {
          speaker: null,
          text: "Smudged eyeliner, tired eyes, posture halfway between guarded and bored. She looks like she expects to be interrupted and resents it in advance.",
        },
        {
          speaker: "You",
          text: "Emo or not, she's gorgeous. My taste has range, as long as beautiful is involved.",
          isThought: true,
        },
        {
          speaker: null,
          text: "She glances up when your door clicks shut. For one second the look on her face is oddly familiar, like this moment has happened before in a different life.",
        },
        {
          speaker: null,
          text: "Then the expression closes, just enough to remind you it hasn't.",
        },
        {
          speaker: "You",
          text: "Who breaks the silence?",
          choices: [
            {
              text: "Greet her first.",
              affectionChange: 1,
              dominanceChange: -1,
              nextDialogueId: "gwen_intro_player_lead",
            },
            {
              text: "Wait for her to greet you first.",
              affectionChange: 0,
              dominanceChange: 1,
              nextDialogueId: "gwen_intro_gwen_lead",
            },
          ],
        },
      ],
    },
    rewards: {
      setFlags: ["hasMetGwen", "gwenIntroDone"],
      unlockCharacters: ["Gwen"],
    },
  },
];
