import type { Dialogue } from "../../../dialogues";
import type { CharacterEvent } from "../../types";

// Event 5: The Nightclub Date
// Description: You take Iris on a date at Velvet.
// Chain: main inline → encounter → after_encounter → bar → floor → glimpse → booth → end

// ─── DAWN ENCOUNTER (first sighting, by the bar) ────────────────────────────

const iris_ch2_date_encounter_sub: Dialogue = {
  id: "iris_ch2_date_encounter_sub",
  lines: [
    {
      speaker: null,
      text: "You get to Velvet early. The bass hits you in the chest before you're through the door. You find the bar, order something you won't taste, and wait.",
    },
    {
      speaker: null,
      text: "You spot a figure a few feet away. Dark hair, Iris's build — back to you. You close the distance.",
    },
    { speaker: "You", text: "Iris?" },
    {
      speaker: null,
      text: "She turns. It's not Iris. She's younger — same dark hair, same amber eyes, but sharper around the edges. Her gaze goes straight to your mouth, then back up.",
      imageSlide: "/images/characters/dawn/date/neutral.webp",
    },
    { speaker: "???", text: "...", imageSlide: "/images/characters/dawn/date/happy.webp" },
    { speaker: "You", text: "Sorry. I thought you were someone else." },
    {
      speaker: null,
      text: "She doesn't respond. She gives you a long, unhurried look — like she's memorizing something — then turns and melts into the crowd.",
      nextDialogueId: "iris_ch2_date_after_encounter_sub",
    },
  ],
};

const iris_ch2_date_encounter_dom: Dialogue = {
  id: "iris_ch2_date_encounter_dom",
  lines: [
    {
      speaker: null,
      text: "Velvet is already packed. You get there early, plant yourself at the bar, and scan the room.",
    },
    {
      speaker: null,
      text: "You spot a silhouette that reads like Iris — same posture, same hair. You step up behind her and put a hand at her lower back.",
    },
    { speaker: "You", text: "There you are." },
    {
      speaker: null,
      text: "The woman turns. Not Iris. Younger, sharper — the same face but with something pointed in it. She clocks your hand on her back and doesn't move away from it.",
      imageSlide: "/images/characters/dawn/date/neutral.webp",
    },
    { speaker: "???", text: "...", imageSlide: "/images/characters/dawn/date/happy.webp" },
    { speaker: "You", text: "My mistake. I thought you were someone else." },
    {
      speaker: null,
      text: "She says nothing. She holds your gaze for exactly one beat too long, then gives you a slow, amused smile and walks away.",
      nextDialogueId: "iris_ch2_date_after_encounter_dom",
    },
  ],
};

const iris_ch2_date_encounter_neutral: Dialogue = {
  id: "iris_ch2_date_encounter_neutral",
  lines: [
    {
      speaker: null,
      text: "You get there a few minutes early and find the bar. The music is loud enough that thinking requires effort.",
    },
    {
      speaker: null,
      text: "You spot someone leaning against the counter, dark hair, Iris's general shape. You step up beside her.",
    },
    { speaker: "You", text: "Hey — ready to order?" },
    {
      speaker: null,
      text: "She turns. Not Iris. Younger, curious, the same eyes but they hold something more watchful. She looks at you like she's asking a question she already knows the answer to.",
      imageSlide: "/images/characters/dawn/date/neutral.webp",
    },
    { speaker: "???", text: "...", imageSlide: "/images/characters/dawn/date/happy.webp" },
    { speaker: "You", text: "Sorry. I mistook you for my date." },
    {
      speaker: null,
      text: "She smiles — small, friendly, a fraction too knowing — and walks away without a word.",
      nextDialogueId: "iris_ch2_date_after_encounter_neutral",
    },
  ],
};

// ─── IRIS ARRIVES (after Dawn encounter) ────────────────────────────────────

const iris_ch2_date_after_encounter_sub: Dialogue = {
  id: "iris_ch2_date_after_encounter_sub",
  lines: [
    {
      speaker: null,
      text: "You're still watching the crowd when Iris slides in beside you. Her cheeks are warm and her breath is a little quick — she walked fast to get here.",
    },
    {
      speaker: "Iris",
      text: "Hey. Sorry — this place is packed. Did I miss anything?",
      expression: "happy",
    },
    {
      speaker: "Iris",
      text: "I saw you with someone for a second. I didn't get a good look.",
      expression: "shy",
    },
    {
      speaker: "Iris",
      text: "I know I shouldn't care. I just... noticed.",
      expression: "shy",
    },
    {
      speaker: "Iris",
      text: "I had two drinks at the door while I waited. I get honest too fast when I'm buzzed.",
      expression: "shy",
    },
    {
      speaker: "Iris",
      text: "I'm trying not to do the thing where I act on impulse and spend tomorrow panicking about it.",
      expression: "neutral",
    },
    {
      speaker: "You",
      text: "What do you tell her?",
      choices: [
        { text: "You won't believe this, but I just saw your twin.", affectionChange: 1 },
        { text: "Nothing. Just admiring the view.", affectionChange: 0 },
      ],
    },
    {
      speaker: null,
      text: "She steps in close. Her perfume cuts through the bass and smoke — something warm, not sharp.",
    },
    {
      speaker: "You",
      text: "How do you greet her?",
      choices: [
        { text: "Offer your arm. Stay with me.", affectionChange: 2 },
        { text: "Let your eyes linger. You look dangerous tonight.", affectionChange: 0, lustChange: 1 },
        { text: "Brush her fingers. Been thinking about this all day.", affectionChange: 1, lustChange: 1 },
      ],
    },
    {
      speaker: "Iris",
      text: "Then don't waste the night.",
      expression: "happy",
      nextDialogueId: "iris_ch2_date_bar_sub",
    },
  ],
};

const iris_ch2_date_after_encounter_dom: Dialogue = {
  id: "iris_ch2_date_after_encounter_dom",
  lines: [
    {
      speaker: null,
      text: "Iris steps into your space with an easy sway. She's been pre-loading — you can tell by the way her shoulders sit, loose in a way they never are at work.",
    },
    {
      speaker: "Iris",
      text: "Hey. Sorry I'm a minute late. This place is packed.",
      expression: "happy",
    },
    {
      speaker: "Iris",
      text: "I caught you at the bar talking to someone. I didn't get a good look.",
      expression: "seductive",
    },
    {
      speaker: "Iris",
      text: "Who was she? If she's cute, maybe I should steal her number.",
      expression: "happy",
    },
    {
      speaker: "Iris",
      text: "Two cocktails before I got here. My filter is basically gone.",
      expression: "seductive",
    },
    {
      speaker: "Iris",
      text: "If I start getting reckless, remind me I said I wanted this to be real, not just heat.",
      expression: "neutral",
    },
    {
      speaker: "You",
      text: "What do you tell her?",
      choices: [
        { text: "You won't believe this, but I just saw your twin.", affectionChange: 1 },
        { text: "Nobody. Just waiting for you.", affectionChange: 0 },
      ],
    },
    {
      speaker: null,
      text: "She steps in close, perfume and bass mixing in your chest.",
    },
    {
      speaker: "You",
      text: "How do you greet her?",
      choices: [
        { text: "Offer your arm and smile.", affectionChange: 1 },
        { text: "Let your eyes do the work. You look dangerous tonight.", affectionChange: 0, lustChange: 1 },
        { text: "Brush her fingers. Been waiting for this all day.", affectionChange: 1, lustChange: 1 },
      ],
    },
    {
      speaker: "Iris",
      text: "Then don't waste the night.",
      expression: "happy",
      nextDialogueId: "iris_ch2_date_bar_dom",
    },
  ],
};

const iris_ch2_date_after_encounter_neutral: Dialogue = {
  id: "iris_ch2_date_after_encounter_neutral",
  lines: [
    {
      speaker: null,
      text: "Iris reaches you with a soft laugh, shoulders relaxed in a way that isn't entirely sober.",
    },
    {
      speaker: "Iris",
      text: "Hey! Sorry I'm a minute late. This place is packed.",
      expression: "happy",
    },
    {
      speaker: "Iris",
      text: "I saw you talking to someone at the bar. I didn't get a good look.",
      expression: "neutral",
    },
    {
      speaker: "Iris",
      text: "Who was she?",
      expression: "neutral",
    },
    {
      speaker: "Iris",
      text: "I had one drink at coat check. Maybe two. My guard is lower than usual.",
      expression: "neutral",
    },
    {
      speaker: "Iris",
      text: "I like being open with you. I just don't want to slip back into old habits.",
      expression: "shy",
    },
    {
      speaker: "You",
      text: "What do you tell her?",
      choices: [
        { text: "You won't believe this, but I just saw your twin.", affectionChange: 1 },
        { text: "Nothing. Just admiring the view.", affectionChange: 0 },
      ],
    },
    {
      speaker: null,
      text: "She steps in close. Her perfume cuts through the smoke and bass.",
    },
    {
      speaker: "You",
      text: "How do you greet her?",
      choices: [
        { text: "Offer your arm and smile.", affectionChange: 1 },
        { text: "Let your eyes linger. You look dangerous tonight.", affectionChange: 0, lustChange: 1 },
        { text: "Brush her fingers. Been waiting for this all day.", affectionChange: 1, lustChange: 1 },
      ],
    },
    {
      speaker: "Iris",
      text: "Then don't waste the night.",
      expression: "happy",
      nextDialogueId: "iris_ch2_date_bar_neutral",
    },
  ],
};

// ─── BAR SCENE (first real conversation) ────────────────────────────────────

const iris_ch2_date_bar_sub: Dialogue = {
  id: "iris_ch2_date_bar_sub",
  lines: [
    {
      speaker: null,
      text: "You find a spot at the end of the bar where the volume drops a few notches. She orders something without thinking about it — she knows what she likes.",
    },
    {
      speaker: "Iris",
      text: "I almost texted you to cancel.",
      expression: "shy",
    },
    {
      speaker: null,
      text: "She says it like she's done deliberating and this is just the leftover.",
    },
    {
      speaker: "Iris",
      text: "Dawn called to ask if I was nervous. I told her no.",
      expression: "shy",
    },
    {
      speaker: "Iris",
      text: "That was a lie.",
      expression: "neutral",
    },
    {
      speaker: "You",
      text: "What do you say?",
      choices: [
        {
          text: "I would've come found you.",
          affectionChange: 2,
        },
        {
          text: "What made you stay?",
          affectionChange: 1,
          lustChange: 1,
        },
      ],
    },
    {
      speaker: "Iris",
      text: "What brought you here? To this city, this job. You had to have had options.",
      expression: "neutral",
    },
    {
      speaker: null,
      text: "She's not making small talk. She's actually asking.",
    },
    {
      speaker: null,
      text: "You answer. She listens — really listens, the kind of quiet that means she's filing it.",
    },
    {
      speaker: "Iris",
      text: "You came here to start over.",
      expression: "neutral",
    },
    {
      speaker: null,
      text: "You didn't say that. She noticed anyway.",
    },
    {
      speaker: "Iris",
      text: "I did too. About five years ago. It's a good city for it.",
      expression: "shy",
    },
    {
      speaker: null,
      text: "First real thing she's said about herself. It lands quietly.",
    },
    {
      speaker: "Iris",
      text: "You're very good at making people feel like they're the only thing in the room.",
      expression: "neutral",
    },
    {
      speaker: null,
      text: "She's not fishing for a compliment. She's just saying a true thing.",
    },
    {
      speaker: "You",
      text: "How do you answer?",
      choices: [
        {
          text: "Is that a problem?",
          affectionChange: 0,
          lustChange: 1,
        },
        {
          text: "Takes one to know one.",
          affectionChange: 2,
        },
      ],
    },
    {
      speaker: null,
      text: "She smiles. Touches her glass. Looks at the crowd for a moment.",
      nextDialogueId: "iris_ch2_date_floor_sub",
    },
  ],
};

const iris_ch2_date_bar_dom: Dialogue = {
  id: "iris_ch2_date_bar_dom",
  lines: [
    {
      speaker: null,
      text: "You find a spot at the bar. She's already comfortable — she arrived ready.",
    },
    {
      speaker: "Iris",
      text: "I've been composing an agenda. You were almost late.",
      expression: "seductive",
    },
    {
      speaker: "You",
      text: "I'm not late.",
      expression: "neutral",
    },
    {
      speaker: "Iris",
      text: "I know. I'm ahead of schedule.",
      expression: "happy",
    },
    {
      speaker: null,
      text: "She slides a drink toward you without asking what you want. It's the right call.",
    },
    {
      speaker: "Iris",
      text: "I told Dawn I was going out. She asked if it was a date.",
      expression: "neutral",
    },
    {
      speaker: "Iris",
      text: "I said yes.",
      expression: "neutral",
    },
    {
      speaker: null,
      text: "A beat.",
    },
    {
      speaker: "Iris",
      text: "She said good.",
      expression: "shy",
    },
    {
      speaker: "You",
      text: "How do you answer?",
      choices: [
        {
          text: "How'd that feel?",
          affectionChange: 2,
        },
        {
          text: "Smart kid.",
          affectionChange: 1,
          lustChange: 1,
        },
      ],
    },
    {
      speaker: "Iris",
      text: "Strange. In a good way.",
      expression: "neutral",
    },
    {
      speaker: "Iris",
      text: "Fair warning — I get honest when I drink. I'm at honest-but-managed right now. Give it an hour.",
      expression: "seductive",
    },
    {
      speaker: "You",
      text: "What do you say to that?",
      choices: [
        {
          text: "I'll be ready.",
          affectionChange: 0,
          lustChange: 2,
        },
        {
          text: "You're already pretty honest.",
          affectionChange: 2,
        },
      ],
    },
    {
      speaker: null,
      text: "She picks up her glass and holds it toward you. A toast to nothing specific.",
      nextDialogueId: "iris_ch2_date_floor_dom",
    },
  ],
};

const iris_ch2_date_bar_neutral: Dialogue = {
  id: "iris_ch2_date_bar_neutral",
  lines: [
    {
      speaker: null,
      text: "You find a spot near the end of the bar where the volume drops enough to have a conversation. She orders without looking at the menu.",
    },
    {
      speaker: "Iris",
      text: "What made you take the job here? You had to have had other options.",
      expression: "neutral",
    },
    {
      speaker: null,
      text: "Not small talk. She's actually asking.",
    },
    {
      speaker: null,
      text: "You answer. She listens — really listens.",
    },
    {
      speaker: "Iris",
      text: "You came here to start over.",
      expression: "neutral",
    },
    {
      speaker: null,
      text: "You didn't say that. She noticed it anyway.",
    },
    {
      speaker: "You",
      text: "What do you say?",
      choices: [
        {
          text: "Maybe.",
          affectionChange: 1,
        },
        {
          text: "Is it that obvious?",
          affectionChange: 1,
          lustChange: 1,
        },
      ],
    },
    {
      speaker: "Iris",
      text: "I did too. About five years ago. It's a good city for it.",
      expression: "shy",
    },
    {
      speaker: null,
      text: "First real thing she's said about herself tonight. She says it simply, like it doesn't cost her anything. It probably does.",
    },
    {
      speaker: "Iris",
      text: "I keep waiting for the part where this feels professional. Like I should be taking notes.",
      expression: "happy",
    },
    {
      speaker: "You",
      text: "What do you say?",
      choices: [
        {
          text: "You're off the clock.",
          affectionChange: 2,
        },
        {
          text: "I won't tell anyone.",
          affectionChange: 1,
          lustChange: 1,
        },
      ],
    },
    {
      speaker: null,
      text: "She laughs. Properly, not politely. It changes her whole face.",
      nextDialogueId: "iris_ch2_date_floor_neutral",
    },
  ],
};

// ─── DANCE FLOOR ────────────────────────────────────────────────────────────

const iris_ch2_date_floor_sub: Dialogue = {
  id: "iris_ch2_date_floor_sub",
  lines: [
    {
      speaker: null,
      text: "She nods toward the floor. It's not a suggestion.",
    },
    {
      speaker: "Iris",
      text: "Do you dance?",
      expression: "happy",
    },
    {
      speaker: "You",
      text: "No.",
    },
    {
      speaker: "Iris",
      text: "Me neither.",
      expression: "happy",
    },
    {
      speaker: null,
      text: "She takes your hand and pulls you toward it anyway.",
    },
    {
      speaker: null,
      text: "She's terrible. You're worse. Neither of you comments on this.",
    },
    {
      speaker: null,
      text: "After a minute it stops mattering. The floor is too loud for it to matter.",
    },
    {
      speaker: null,
      text: "She leans closer to talk over the music. Her breath is warm against your ear.",
    },
    {
      speaker: "Iris",
      text: "I didn't let myself do this for a long time.",
      expression: "shy",
    },
    {
      speaker: null,
      text: "She says it like she's been holding it somewhere and finally put it down.",
    },
    {
      speaker: "You",
      text: "What do you say?",
      choices: [
        {
          text: "Do what?",
          affectionChange: 2,
        },
        {
          text: "What changed?",
          affectionChange: 1,
          lustChange: 1,
        },
      ],
    },
    {
      speaker: "Iris",
      text: "I'll tell you somewhere quieter.",
      expression: "shy",
      nextDialogueId: "iris_ch2_date_booth_sub",
    },
  ],
};

const iris_ch2_date_floor_dom: Dialogue = {
  id: "iris_ch2_date_floor_dom",
  lines: [
    {
      speaker: null,
      text: "She pulls him toward the floor. Not an invitation — a directive.",
    },
    {
      speaker: null,
      text: "She fits against you like she's done the math. Her hand on your shoulder, her weight shifting with the bass.",
    },
    {
      speaker: null,
      text: "She says something against your ear. The music swallows half of it. You only catch the end.",
    },
    {
      speaker: null,
      text: "She doesn't repeat it.",
    },
    {
      speaker: null,
      text: "You dance. Beat by beat — her hand tightening, her tilting her head back to look at you, the moment she shifts her weight and you either anchor or follow.",
    },
    {
      speaker: "You",
      text: "What do you do?",
      choices: [
        {
          text: "Hold her still.",
          affectionChange: 0,
          lustChange: 2,
          dominanceChange: 1,
        },
        {
          text: "Match her pace.",
          affectionChange: 1,
          lustChange: 1,
        },
      ],
    },
    {
      speaker: "Iris",
      text: "There you are.",
      expression: "seductive",
      nextDialogueId: "iris_ch2_date_booth_dom",
    },
  ],
};

const iris_ch2_date_floor_neutral: Dialogue = {
  id: "iris_ch2_date_floor_neutral",
  lines: [
    {
      speaker: null,
      text: "Midway through the second drink she nods at the floor.",
    },
    {
      speaker: "Iris",
      text: "I don't actually dance. But I'm willing to be bad at it if you are.",
      expression: "happy",
    },
    {
      speaker: null,
      text: "You go. It's awkward for exactly thirty seconds. Then it isn't.",
    },
    {
      speaker: null,
      text: "The music is loud enough that talking requires full commitment. You both commit.",
    },
    {
      speaker: "Iris",
      text: "The first time I went out after Dawn was born was three years after she arrived. I walked in somewhere like this and remembered I was still myself.",
      expression: "shy",
    },
    {
      speaker: null,
      text: "He doesn't fill the silence. She notices.",
    },
    {
      speaker: "Iris",
      text: "Too much?",
      expression: "shy",
    },
    {
      speaker: "You",
      text: "What do you say?",
      choices: [
        {
          text: "No. Keep going.",
          affectionChange: 2,
        },
        {
          text: "That's a lot to carry alone.",
          affectionChange: 1,
          lustChange: 1,
        },
      ],
    },
    {
      speaker: "Iris",
      text: "I'm not carrying it. Not anymore.",
      expression: "neutral",
      nextDialogueId: "iris_ch2_date_booth_neutral",
    },
  ],
};

// ─── QUIET CORNER (booth) ────────────────────────────────────────────────────

const iris_ch2_date_booth_sub: Dialogue = {
  id: "iris_ch2_date_booth_sub",
  lines: [
    {
      speaker: null,
      text: "You find a corner booth where the bass is muffled enough to hear clearly. She slides in across from you and wraps both hands around her glass.",
    },
    {
      speaker: "Iris",
      text: "Dawn started university this year.",
      expression: "neutral",
    },
    {
      speaker: "Iris",
      text: "I used to tell myself I had to wait until she was settled. Until she didn't need me in the same way.",
      expression: "neutral",
    },
    {
      speaker: "Iris",
      text: "But she called me before I came here tonight and asked if I was nervous. And I said no, and she laughed and said good, and hung up.",
      expression: "shy",
    },
    {
      speaker: "Iris",
      text: "She doesn't need me to wait anymore.",
      expression: "shy",
    },
    {
      speaker: null,
      text: "It lands quietly. She's not sad about it. She's something closer to free.",
    },
    {
      speaker: "You",
      text: "What do you say?",
      choices: [
        {
          text: "You waited long enough.",
          affectionChange: 2,
        },
        {
          text: "What do you want now?",
          affectionChange: 1,
          lustChange: 1,
        },
      ],
    },
    {
      speaker: null,
      text: "She reaches across the table and puts her hand over his. Just that. No performance.",
    },
    {
      speaker: "Iris",
      text: "Something honest. Something I can't make academic.",
      expression: "shy",
    },
    {
      speaker: "Iris",
      text: "I think I'd like another drink. Then I'd like to go home.",
      expression: "neutral",
    },
    {
      speaker: null,
      text: "She means it as a close to the night. But the way she says it isn't entirely.",
      nextDialogueId: "iris_ch2_date_end_sub",
    },
  ],
};

const iris_ch2_date_booth_dom: Dialogue = {
  id: "iris_ch2_date_booth_dom",
  lines: [
    {
      speaker: null,
      text: "She pulls you to a corner booth. Done competing with the volume.",
    },
    {
      speaker: "Iris",
      text: "I said I wanted this to be real, not just heat.",
      expression: "neutral",
    },
    {
      speaker: "Iris",
      text: "I still mean that.",
      expression: "neutral",
    },
    {
      speaker: null,
      text: "A beat.",
    },
    {
      speaker: "Iris",
      text: "But tonight I'm a little tired of being responsible.",
      expression: "seductive",
    },
    {
      speaker: "You",
      text: "What do you say?",
      choices: [
        {
          text: "Then don't be.",
          affectionChange: 0,
          lustChange: 2,
          dominanceChange: 1,
        },
        {
          text: "Tell me what that looks like.",
          affectionChange: 2,
        },
      ],
    },
    {
      speaker: "Iris",
      text: "Carefully.",
      expression: "seductive",
    },
    {
      speaker: null,
      text: "She looks at him for a long moment. Like she's decided something.",
    },
    {
      speaker: "Iris",
      text: "Honest. Without negotiating every step first.",
      expression: "neutral",
      nextDialogueId: "iris_ch2_date_end_dom",
    },
  ],
};

const iris_ch2_date_booth_neutral: Dialogue = {
  id: "iris_ch2_date_booth_neutral",
  lines: [
    {
      speaker: null,
      text: "You find a quieter corner and sit. The music is still there but muffled enough to think.",
    },
    {
      speaker: null,
      text: "She's looser than you've ever seen her. Not drunk. Just unpacked.",
    },
    {
      speaker: "Iris",
      text: "I keep waiting to feel stupid about this.",
      expression: "neutral",
    },
    {
      speaker: null,
      text: "A pause.",
    },
    {
      speaker: "Iris",
      text: "I don't.",
      expression: "neutral",
    },
    {
      speaker: "You",
      text: "What do you say?",
      choices: [
        {
          text: "Good.",
          affectionChange: 2,
        },
        {
          text: "Would it stop you?",
          affectionChange: 1,
          lustChange: 1,
        },
      ],
    },
    {
      speaker: "Iris",
      text: "Probably not. Which is new.",
      expression: "shy",
    },
    {
      speaker: null,
      text: "She doesn't move toward the exit. Neither does he.",
      nextDialogueId: "iris_ch2_date_end_neutral",
    },
  ],
};

// ─── THE GOODBYE (her door) ──────────────────────────────────────────────────

const iris_ch2_date_end_sub: Dialogue = {
  id: "iris_ch2_date_end_sub",
  lines: [
    {
      speaker: null,
      text: "Outside her building. The city is quieter here. She has her key in her hand but hasn't turned toward the door.",
    },
    {
      speaker: null,
      text: "She looks at him.",
    },
    {
      speaker: "Iris",
      text: "I thought I'd forgotten how to want something without turning it into a project.",
      expression: "shy",
    },
    {
      speaker: null,
      text: "A beat.",
    },
    {
      speaker: "Iris",
      text: "I didn't.",
      expression: "shy",
    },
    {
      speaker: null,
      text: "She steps in and kisses him. Slow. Not uncertain.",
    },
    {
      speaker: null,
      text: "When she pulls back her forehead rests against his for one moment.",
      expression: "kissingMC",
    },
    {
      speaker: "Iris",
      text: "Good night, {playerName}.",
      expression: "happy",
    },
    {
      speaker: null,
      text: "She goes inside. He stands there for a moment.",
    },
    {
      speaker: "You",
      text: "New city. Good night. Good start.",
      isThought: true,
    },
  ],
};

const iris_ch2_date_end_dom: Dialogue = {
  id: "iris_ch2_date_end_dom",
  lines: [
    {
      speaker: null,
      text: "Outside her building. She doesn't reach for her keys right away.",
    },
    {
      speaker: null,
      text: "She kisses him before he can say anything. Fierce. Short.",
    },
    {
      speaker: null,
      text: "When she steps back she's breathing differently.",
      expression: "kissingMC",
    },
    {
      speaker: "Iris",
      text: "I'm going to go in before I do something I'd want to repeat.",
      expression: "seductive",
    },
    {
      speaker: "You",
      text: "What do you say?",
      choices: [
        {
          text: "Too late.",
          affectionChange: 0,
          lustChange: 2,
        },
        {
          text: "Same time next week?",
          affectionChange: 2,
        },
      ],
    },
    {
      speaker: null,
      text: "She gives a short laugh and goes inside without looking back. The door clicks shut.",
    },
    {
      speaker: null,
      text: "He walks home.",
    },
  ],
};

const iris_ch2_date_end_neutral: Dialogue = {
  id: "iris_ch2_date_end_neutral",
  lines: [
    {
      speaker: null,
      text: "Outside. Cool air. You walked here — the city quiet between the two of you.",
    },
    {
      speaker: null,
      text: "She turns to face him.",
    },
    {
      speaker: "Iris",
      text: "This was good.",
      expression: "happy",
    },
    {
      speaker: null,
      text: "He says yes, it was.",
    },
    {
      speaker: "Iris",
      text: "I'm not going to overthink it tonight.",
      expression: "neutral",
    },
    {
      speaker: null,
      text: "She kisses him — soft, deliberate, unhurried.",
      expression: "kissingMC",
    },
    {
      speaker: null,
      text: "When she pulls back she's smiling.",
    },
    {
      speaker: "Iris",
      text: "Good night.",
      expression: "happy",
    },
    {
      speaker: null,
      text: "She goes inside. He stands there long enough to watch the light in her window come on.",
    },
  ],
};

// ─── EXPORTS ─────────────────────────────────────────────────────────────────

export const irisEvent5Dialogues: Record<string, Dialogue> = {
  iris_ch2_date_encounter_sub,
  iris_ch2_date_encounter_dom,
  iris_ch2_date_encounter_neutral,
  iris_ch2_date_after_encounter_sub,
  iris_ch2_date_after_encounter_dom,
  iris_ch2_date_after_encounter_neutral,
  iris_ch2_date_bar_sub,
  iris_ch2_date_bar_dom,
  iris_ch2_date_bar_neutral,
  iris_ch2_date_floor_sub,
  iris_ch2_date_floor_dom,
  iris_ch2_date_floor_neutral,
  iris_ch2_date_booth_sub,
  iris_ch2_date_booth_dom,
  iris_ch2_date_booth_neutral,
  iris_ch2_date_end_sub,
  iris_ch2_date_end_dom,
  iris_ch2_date_end_neutral,
};

export const irisEvent5Events: CharacterEvent[] = [
  {
    id: "iris_ch2_ev5_sub_date",
    name: "The Nightclub Date",
    description: "You take Iris on a date to Velvet.",
    quest: {
      title: "The Date",
      description: "You've planned a date with Iris at Velvet. It's time.",
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
          text: "You and Iris agreed to meet at Velvet. The bass hits you in the chest before you're through the door — the kind of place that swallows you whole.",
        },
        {
          speaker: null,
          text: "You get there early. Find the bar. Order something you won't taste.",
          nextDialogueId: "iris_ch2_date_encounter_sub",
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
    description: "You take Iris on a date to Velvet.",
    quest: {
      title: "The Date",
      description: "You've planned a date with Iris at Velvet. It's time.",
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
          text: "Velvet. The line is long, the bass is physical, the inside smells like expensive cologne and something cheaper underneath. You arrive first.",
        },
        {
          speaker: null,
          text: "You claim a spot at the bar and scan the room.",
          nextDialogueId: "iris_ch2_date_encounter_dom",
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
    description: "You take Iris on a date to Velvet.",
    quest: {
      title: "The Date",
      description: "You've planned a date with Iris at Velvet. It's time.",
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
          text: "Velvet. You agreed to meet at the bar — easy to find, easy to escape from if one of you loses their nerve. Neither of you will.",
        },
        {
          speaker: null,
          text: "You get there early. Wait by the counter.",
          nextDialogueId: "iris_ch2_date_encounter_neutral",
        },
      ],
    },
    rewards: {
      girlStats: { affection: 20, love: 5 },
      setFlags: ["irisCh2Complete", "metMysteryGirl"],
    },
  },
];
