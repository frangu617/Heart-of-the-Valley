import type { Dialogue } from "../../../dialogues";
import { CharacterEvent } from "../../types";

// Event 5: Chapter 1 Finale (Teasing Yumi)
// Descriptions: A rainy office confession turns into a kiss. | A rainy office night turns tender.

const yumiFinaleDomRound2Scold: Dialogue = {
  id: "yumi_finale_dom_round2_scold",
  lines: [
    { speaker: null, text: "Yumi rolls her eyes." },
    { speaker: "Yumi", text: "You're no fun. It's just a desk.", expression: "annoyed" },
    {
      speaker: null,
      text: "She reaches out. Her fingers trace the line of your shirt buttons slowly, stopping at your tie.",
    },
    {
      speaker: null,
      text: "She wraps the fabric around her finger, tugging you gently forward.",
    },
    {
      speaker: "Yumi",
      text: "This tie is crooked. Or maybe... I just want you closer.",
      expression: "happy",
    },
    {
      speaker: "You",
      text: "What do you do?",
      choices: [
        {
          text: "Pull away. \"Don't touch me.\"",
          affectionChange: -1,
          nextDialogueId: "yumi_finale_dom_fail",
        },
        {
          text: "Lean in. \"Are you going to fix it, or just pull on it?\"",
          affectionChange: 1,
          nextDialogueId: "yumi_finale_dom_round3",
        },
      ],
    },
  ],
};

const yumiFinaleDomRound2Tease: Dialogue = {
  id: "yumi_finale_dom_round2_tease",
  lines: [
    { speaker: null, text: "She grins, leaning back on her hands." },
    {
      speaker: "Yumi",
      text: "Very. Especially since I can see you sweating.",
      expression: "happy",
    },
    {
      speaker: null,
      text: "She reaches out. Her fingers trace the line of your shirt buttons slowly, stopping at your tie.",
    },
    {
      speaker: null,
      text: "She wraps the fabric around her finger, tugging you gently forward.",
    },
    {
      speaker: "Yumi",
      text: "This tie is crooked. Or maybe... I just want you closer.",
      expression: "happy",
    },
    {
      speaker: "You",
      text: "What do you do?",
      choices: [
        {
          text: "Pull away. \"Don't touch me.\"",
          affectionChange: -1,
          nextDialogueId: "yumi_finale_dom_fail",
        },
        {
          text: "Lean in. \"Are you going to fix it, or just pull on it?\"",
          affectionChange: 1,
          nextDialogueId: "yumi_finale_dom_round3",
        },
      ],
    },
  ],
};

const yumiFinaleDomRound3: Dialogue = {
  id: "yumi_finale_dom_round3",
  lines: [
    {
      speaker: null,
      text: "She leans down. Her face is inches from yours. You can feel her breath on your skin.",
    },
    {
      speaker: null,
      text: "She moves past your lips to whisper directly into your ear.",
    },
    {
      speaker: "Yumi",
      text: "I bet you've thought about this. Me. Here. Late at night.",
      expression: "happy",
    },
    {
      speaker: "Yumi",
      text: "Tell me I'm wrong.",
      expression: "happy",
    },
    {
      speaker: "You",
      text: "What do you do?",
      choices: [
        {
          text: "Stay silent. (Stonewall)",
          affectionChange: 0,
          nextDialogueId: "yumi_finale_dom_fail",
        },
        {
          text: "Admit defeat. \"You're trouble, Yumi.\"",
          affectionChange: 1,
          nextDialogueId: "yumi_finale_dom_success",
        },
      ],
    },
  ],
};

const yumiFinaleDomSuccess: Dialogue = {
  id: "yumi_finale_dom_success",
  lines: [
    {
      speaker: null,
      text: "You let out a ragged breath, turning your head so your noses brush.",
    },
    { speaker: "You", text: "You are so much trouble." },
    { speaker: "Yumi", text: "The best kind.", expression: "happy" },
    { speaker: null, text: "Something snaps in the air between you." },
    { speaker: "Yumi", text: "That's it. I'm done playing.", expression: "angry" },
    { speaker: null, text: "She grabs your collar with both hands." },
    {
      speaker: "Yumi",
      text: "I'm going to kiss you now. Tell me to stop if you want to.",
      expression: "angry",
    },
    {
      speaker: null,
      text: "She kisses you hard, a little clumsy, more intent than practiced.",
    },
    {
      speaker: null,
      text: "You stop fighting it. You wrap your arms around her waist, pulling her onto your lap.",
    },
    {
      speaker: null,
      text: "She makes a surprised sound against your mouth, then melts into it. The aggression fades, replaced by pure heat.",
    },
    {
      speaker: null,
      text: "You move your hand down her waist, intending to pull her closer, but she suddenly breaks the kiss.",
    },
    { speaker: "Yumi", text: "Finally. I knew you had it in you.", expression: "happy" },
    { speaker: "You", text: "Where are you going? We were just getting started." },
    {
      speaker: null,
      text: "She wags a finger at you, backing toward the door.",
    },
    {
      speaker: "Yumi",
      text: "Ah, ah, ah. Don't get greedy, Professor. That was just a sample. A free trial.",
      expression: "happy",
    },
    {
      speaker: "Yumi",
      text: "You don't get the full package on the first date.",
      expression: "happy",
    },
    { speaker: "Yumi", text: "Dream of me tonight. I know you will.", expression: "happy" },
    {
      speaker: null,
      text: "She walks out with a practiced sway, leaving you sitting there with lipstick on your face.",
    },
    {
      speaker: null,
      text: "You take a slow breath and straighten your tie.",
      choices: [
        { text: "Let her go", affectionChange: 5 },
      ],
    },
  ],
};

const yumiFinaleDomFail: Dialogue = {
  id: "yumi_finale_dom_fail",
  lines: [
    {
      speaker: null,
      text: "She stares at you for a long moment, waiting for a spark that doesn't come.",
    },
    { speaker: null, text: "She hops off the desk." },
    {
      speaker: "Yumi",
      text: "You know... maybe I misread the situation. My bad.",
      expression: "sad",
    },
    { speaker: null, text: "She grabs her bag, looking disappointed." },
    { speaker: "Yumi", text: "I won't bother you again.", expression: "sad" },
    { speaker: null, text: "She slips out into the hallway, leaving the rain to fill the silence." },
  ],
};

const yumiFinaleSubRound2Gentle: Dialogue = {
  id: "yumi_finale_sub_round2_gentle",
  lines: [
    {
      speaker: "Yumi",
      text: "Really? I always thought they were plain... but thank you.",
      expression: "shy",
    },
    { speaker: null, text: "You step closer. You can smell her perfume--vanilla and rain." },
    {
      speaker: "You",
      text: "What do you do?",
      choices: [
        {
          text: "Grab her waist. (Too aggressive)",
          affectionChange: -1,
          nextDialogueId: "yumi_finale_sub_fail",
        },
        {
          text: "Gently tuck her hair back. (Gentle)",
          affectionChange: 1,
          nextDialogueId: "yumi_finale_sub_round3",
        },
      ],
    },
  ],
};

const yumiFinaleSubRound2Fast: Dialogue = {
  id: "yumi_finale_sub_round2_fast",
  lines: [
    {
      speaker: "Yumi",
      text: "Oh... um... thanks? That's... direct.",
      expression: "shy",
    },
    { speaker: null, text: "You step closer. You can smell her perfume--vanilla and rain." },
    {
      speaker: "You",
      text: "What do you do?",
      choices: [
        {
          text: "Grab her waist. (Too aggressive)",
          affectionChange: -1,
          nextDialogueId: "yumi_finale_sub_fail",
        },
        {
          text: "Gently tuck her hair back. (Gentle)",
          affectionChange: 1,
          nextDialogueId: "yumi_finale_sub_round3",
        },
      ],
    },
  ],
};

const yumiFinaleSubRound3: Dialogue = {
  id: "yumi_finale_sub_round3",
  lines: [
    {
      speaker: "You",
      text: "Yumi... looking at you right now... I'm finding it very hard to be professional.",
    },
    { speaker: "Yumi", text: "Then... maybe you shouldn't be.", expression: "shy" },
    {
      speaker: "You",
      text: "What do you do?",
      choices: [
        {
          text: "Lean in slowly.",
          affectionChange: 1,
          nextDialogueId: "yumi_finale_sub_success",
        },
        {
          text: "Grab her and kiss her deeply.",
          affectionChange: -1,
          nextDialogueId: "yumi_finale_sub_fail",
        },
      ],
    },
  ],
};

const yumiFinaleSubSuccess: Dialogue = {
  id: "yumi_finale_sub_success",
  lines: [
    {
      speaker: null,
      text: "You lower your head. She doesn't run. She rises on her tiptoes to meet you.",
    },
    {
      speaker: null,
      text: "Your lips meet. It's gentle at first, a question asked and answered.",
    },
    {
      speaker: null,
      text: "She whimpers softly, her hands clutching your shirt, holding you there.",
    },
    {
      speaker: null,
      text: "When you finally pull away, Yumi looks dazed. Her eyes are unfocused, her face bright red.",
    },
    { speaker: "Yumi", text: "I... we just...", expression: "shy" },
    { speaker: null, text: "The reality of kissing her teacher suddenly crashes down on her." },
    {
      speaker: "Yumi",
      text: "I... I have to go! My heart is beating too fast!",
      expression: "shy",
    },
    { speaker: null, text: "She grabs her bag, clutching it to her chest like a shield." },
    {
      speaker: "Yumi",
      text: "I'm sorry! I mean--thank you! I mean--goodnight!",
      expression: "shy",
    },
    {
      speaker: null,
      text: "She rushes out of the room, catching herself on the doorframe in her haste.",
    },
    { speaker: "You", text: "Charming. Definitely." },
    {
      speaker: null,
      text: "You sit back down, still feeling her warmth.",
      choices: [
        { text: "Let her go", affectionChange: 5 },
      ],
    },
  ],
};

const yumiFinaleSubFail: Dialogue = {
  id: "yumi_finale_sub_fail",
  lines: [
    {
      speaker: null,
      text: "You move to kiss her, but the moment is wrong. You moved too fast, or misread the signal.",
    },
    { speaker: null, text: "Yumi panics. She puts her hands on your chest and pushes you back." },
    { speaker: "Yumi", text: "N-no! Wait! I... I can't!", expression: "shy" },
    { speaker: null, text: "She grabs her bag, looking terrified." },
    { speaker: "Yumi", text: "I'm sorry! I have to go!", expression: "shy" },
    { speaker: null, text: "She bolts out of the office." },
  ],
};

export const yumiEvent5Dialogues: Record<string, Dialogue> = {
  yumi_finale_dom_round2_scold: yumiFinaleDomRound2Scold,
  yumi_finale_dom_round2_tease: yumiFinaleDomRound2Tease,
  yumi_finale_dom_round3: yumiFinaleDomRound3,
  yumi_finale_dom_success: yumiFinaleDomSuccess,
  yumi_finale_dom_fail: yumiFinaleDomFail,
  yumi_finale_sub_round2_gentle: yumiFinaleSubRound2Gentle,
  yumi_finale_sub_round2_fast: yumiFinaleSubRound2Fast,
  yumi_finale_sub_round3: yumiFinaleSubRound3,
  yumi_finale_sub_success: yumiFinaleSubSuccess,
  yumi_finale_sub_fail: yumiFinaleSubFail,
};

export const yumiEvent5Events: CharacterEvent[] = [
  {
    id: "yumi_chapter_1_finale_dom",
    name: "Chapter 1 Finale (Teasing Yumi)",
    description: "A rainy office confession turns into a kiss.",
    priority: 200,
    repeatable: false,
    conditions: {
      minAffection: 20,
      minHour: 0,
      maxHour: 24,
      requiredLocation: "Office",
      requiredPreviousEvents: ["yumi_classroom_flirt_dom"],
      requiredFlags: ["yumiDomPath"],
    },
    dialogue: {
      id: "yumi_chapter_1_finale_dom",
      lines: [
        {
          speaker: null,
          text: "It's pouring rain outside. The rhythmic drumming against the office window is the only sound in the room.",
        },
        {
          speaker: null,
          text: "You are at your desk, finishing up the final grades. Yumi is sitting on the small couch in the corner, ostensibly reading a book, but she hasn't turned a page in ten minutes.",
        },
        {
          speaker: "You",
          text: "Yumi, the rain isn't letting up. You should probably head back to the dorms before it gets worse.",
        },
        {
          speaker: "Yumi",
          text: "I don't mind the rain. Besides... I'm not ready to leave yet.",
          expression: "happy",
        },
        {
          speaker: null,
          text: "She walks around the desk. She doesn't stop at a respectful distance. She keeps coming until she is standing right between your knees.",
        },
        {
          speaker: "Yumi",
          text: "You've been ignoring me for an hour, Professor. It's rude.",
          expression: "happy",
        },
        { speaker: "You", text: "I'm grading papers, Yumi." },
        {
          speaker: "Yumi",
          text: "Are you? Because you've been reading the same sentence for five minutes.",
          expression: "happy",
        },
        {
          speaker: null,
          text: "She smirks. She knows she's affecting you. She decides to test exactly how much self-control you have left.",
        },
        {
          speaker: null,
          text: "She turns around and hops up onto the edge of your desk, pushing your papers aside with her hip. She crosses her legs, her heel brushing against your thigh.",
        },
        { speaker: "Yumi", text: "I think I'll sit here. The view is better.", expression: "happy" },
        {
          speaker: "You",
          text: "What do you do?",
          choices: [
            {
              text: "Scold her. \"Get off the desk, that's unprofessional.\"",
              affectionChange: -1,
              nextDialogueId: "yumi_finale_dom_round2_scold",
            },
            {
              text: "Tease her. \"Comfortable up there?\"",
              affectionChange: 1,
              nextDialogueId: "yumi_finale_dom_round2_tease",
            },
          ],
        },
      ],
    },
    rewards: {
      setFlags: ["yumi_chapter_1_completed"],
    },
  },
  {
    id: "yumi_chapter_1_finale_sub",
    name: "Chapter 1 Finale (Gentle Yumi)",
    description: "A rainy office night turns tender.",
    priority: 200,
    repeatable: false,
    conditions: {
      minAffection: 20,
      minHour: 0,
      maxHour: 24,
      requiredLocation: "Office",
      requiredPreviousEvents: ["yumi_classroom_flirt_sub"],
      requiredFlags: ["yumiSubPath"],
    },
    dialogue: {
      id: "yumi_chapter_1_finale_sub",
      lines: [
        {
          speaker: null,
          text: "It's pouring rain outside. The rhythmic drumming against the office window is the only sound in the room.",
        },
        {
          speaker: null,
          text: "You are at your desk, finishing up the final grades. Yumi is sitting on the small couch in the corner, ostensibly reading a book, but she hasn't turned a page in ten minutes.",
        },
        {
          speaker: "Yumi",
          text: "I should go. But... the rain makes me feel... lonely.",
          expression: "shy",
        },
        { speaker: "You", text: "You don't have to be lonely, Yumi." },
        {
          speaker: null,
          text: "You stand up. She doesn't back away, but she looks down, her heart clearly racing.",
        },
        {
          speaker: "You",
          text: "How do you ease the moment?",
          choices: [
            {
              text: "You have beautiful eyes. (Romantic)",
              affectionChange: 1,
              nextDialogueId: "yumi_finale_sub_round2_gentle",
            },
            {
              text: "You look sexy in this light. (Too fast)",
              affectionChange: -1,
              nextDialogueId: "yumi_finale_sub_round2_fast",
            },
          ],
        },
      ],
    },
    rewards: {
      setFlags: ["yumi_chapter_1_completed"],
    },
  },
];
