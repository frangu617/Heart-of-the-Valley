import type { Dialogue } from "../../../dialogues";
import { CharacterEvent } from "../../types";

// Event 5: Breakup Celebration
// Description: Ruby ends her relationship right before your date.

const rubyCh1Ev5MallSub: Dialogue = {
  id: "ruby_ch1_ev5_mall_sub",
  lines: [
    { speaker: null, text: "Tomorrow night arrives with rain on the sidewalk and music leaking out of the bar door." },
    { speaker: null, text: "You claim a table near the back and check your phone." },
    { speaker: null, text: "One unread message from Ruby: Parking lot. One minute." },
    { speaker: null, text: "She appears a moment later, windblown and breathing hard." },
    { speaker: "Ruby", text: "Hi. Sorry. I'm late.", expression: "surprised" },
    { speaker: "You", text: "You okay?" },
    { speaker: "Ruby", text: "I did it.", expression: "neutral" },
    { speaker: "Ruby", text: "Ten minutes ago. Outside the gym lot. I ended it.", expression: "neutral" },
    { speaker: null, text: "She drops into the seat across from you, hands still shaking." },
    { speaker: "Ruby", text: "I gave him his key back and walked away before I could apologize.", expression: "sad" },
    { speaker: "Ruby", text: "I took one shot at the bar because my hands would not stop trembling.", expression: "shy" },
    { speaker: "You", text: "And now?" },
    { speaker: "Ruby", text: "Now I want this to be a date.", expression: "neutral" },
    { speaker: "Ruby", text: "A celebration. Not another emergency.", expression: "shy" },
    {
      speaker: "You",
      text: "How do you meet her in this moment?",
      choices: [
        {
          text: "I'm proud of you. Tonight is yours.",
          affectionChange: 2,
          dominanceChange: -1,
          nextDialogueId: "ruby_ch1_ev5_sub_proud",
        },
        {
          text: "Let's set rules so you do not slide back.",
          affectionChange: 1,
          dominanceChange: 1,
          nextDialogueId: "ruby_ch1_ev5_sub_rules",
        },
        {
          text: "Come dance with me before you overthink.",
          affectionChange: 1,
          lustChange: 2,
          nextDialogueId: "ruby_ch1_ev5_sub_dance",
        },
      ],
    },
  ],
};

const rubyCh1Ev5MallDom: Dialogue = {
  id: "ruby_ch1_ev5_mall_dom",
  lines: [
    { speaker: null, text: "Bass thumps through the bar as you step inside." },
    { speaker: null, text: "Ruby is already at the back rail, cheeks flushed, eyes bright." },
    { speaker: null, text: "Two empty shot glasses sit beside her." },
    { speaker: "Ruby", text: "There you are.", expression: "happy" },
    { speaker: null, text: "She grabs your hand and pulls you close enough to speak over the music." },
    { speaker: "Ruby", text: "I ended it thirty minutes ago. Outside his building.", expression: "neutral" },
    { speaker: "You", text: "How did it go?" },
    { speaker: "Ruby", text: "Loud. Ugly. Final.", expression: "neutral" },
    { speaker: "Ruby", text: "I took two shots so I would stop shaking before you got here.", expression: "shy" },
    { speaker: null, text: "Her smile is a little reckless, but clear." },
    { speaker: "Ruby", text: "Tonight is a celebration date, yeah?", expression: "happy" },
    {
      speaker: "You",
      text: "How do you take control of the night?",
      choices: [
        {
          text: "Say it. You are not going back.",
          affectionChange: 1,
          dominanceChange: 2,
          nextDialogueId: "ruby_ch1_ev5_dom_claim",
        },
        {
          text: "Good. Burn it off with me on the dance floor.",
          affectionChange: 0,
          lustChange: 2,
          dominanceChange: 1,
          nextDialogueId: "ruby_ch1_ev5_dom_heat",
        },
        {
          text: "Tell me what you want tonight.",
          affectionChange: 1,
          lustChange: 1,
          dominanceChange: 2,
          nextDialogueId: "ruby_ch1_ev5_dom_tempt",
        },
      ],
    },
  ],
};

const rubyCh1Ev5SubProud: Dialogue = {
  id: "ruby_ch1_ev5_sub_proud",
  lines: [
    { speaker: "You", text: "I am proud of you, Ruby. Seriously." },
    { speaker: null, text: "Her eyes go glassy for a second." },
    { speaker: "Ruby", text: "I don't know what to do with that sentence.", expression: "shy" },
    { speaker: "You", text: "Start by believing it." },
    {
      speaker: "Ruby",
      text: "Okay. Tonight I try.",
      expression: "happy",
      nextDialogueId: "ruby_ch1_ev5_sub_after",
    },
  ],
};

const rubyCh1Ev5SubRules: Dialogue = {
  id: "ruby_ch1_ev5_sub_rules",
  lines: [
    { speaker: "You", text: "Rule one: no apology texts tonight." },
    { speaker: "Ruby", text: "Done.", expression: "neutral" },
    { speaker: "You", text: "Rule two: if you panic, call me instead of him." },
    { speaker: "Ruby", text: "Done.", expression: "neutral" },
    { speaker: "You", text: "Rule three: this date counts as a new start." },
    { speaker: "Ruby", text: "I can do that.", expression: "happy" },
    {
      speaker: null,
      text: "She unlocks her phone, blocks his contact, and sets it face down.",
      nextDialogueId: "ruby_ch1_ev5_sub_after",
    },
  ],
};

const rubyCh1Ev5SubDance: Dialogue = {
  id: "ruby_ch1_ev5_sub_dance",
  lines: [
    { speaker: "You", text: "Come on. Dance floor. Now." },
    { speaker: "Ruby", text: "Now?" },
    { speaker: "You", text: "Before your brain starts a committee meeting." },
    { speaker: null, text: "She laughs, grabs your hand, and lets you pull her into the crowd." },
    { speaker: null, text: "The first song is messy and loud and exactly what she needs." },
    {
      speaker: "Ruby",
      text: "Okay. Yeah. This helps.",
      expression: "happy",
      nextDialogueId: "ruby_ch1_ev5_sub_after",
    },
  ],
};

const rubyCh1Ev5SubAfter: Dialogue = {
  id: "ruby_ch1_ev5_sub_after",
  lines: [
    { speaker: null, text: "Back at the table, Ruby raises her glass with both hands." },
    { speaker: "Ruby", text: "To not begging for crumbs anymore.", expression: "neutral" },
    { speaker: "You", text: "To freedom." },
    { speaker: null, text: "You clink glasses." },
    { speaker: "Ruby", text: "I wanted to kiss you for a while.", expression: "shy" },
    { speaker: "Ruby", text: "I just didn't want it to be another panic move.", expression: "sad" },
    { speaker: "You", text: "Then make it a choice." },
    { speaker: null, text: "She leans in slowly this time, giving you space to meet her halfway." },
    { speaker: null, text: "The kiss is soft, steady, and intentional." },
    { speaker: "Ruby", text: "Yeah. That felt real.", expression: "happy" },
    { speaker: null, text: "For the first time tonight, her shoulders finally relax." },
  ],
};

const rubyCh1Ev5DomClaim: Dialogue = {
  id: "ruby_ch1_ev5_dom_claim",
  lines: [
    { speaker: "You", text: "Say it out loud. You are not going back." },
    { speaker: null, text: "She holds your gaze without blinking." },
    { speaker: "Ruby", text: "I'm not going back.", expression: "neutral" },
    { speaker: "You", text: "Again." },
    { speaker: "Ruby", text: "I'm not going back.", expression: "happy" },
    {
      speaker: null,
      text: "The second time sounds like a vow.",
      nextDialogueId: "ruby_ch1_ev5_dom_after",
    },
  ],
};

const rubyCh1Ev5DomHeat: Dialogue = {
  id: "ruby_ch1_ev5_dom_heat",
  lines: [
    { speaker: "You", text: "Then move. Dance floor." },
    { speaker: "Ruby", text: "Yes, boss.", expression: "happy" },
    { speaker: null, text: "She drags you into the pulse of the room before the chorus drops." },
    { speaker: null, text: "Her laugh is wild and bright, breath warm against your ear." },
    { speaker: "Ruby", text: "Okay. This is way better than crying in a parking lot.", expression: "happy" },
    {
      speaker: null,
      text: "By the second song, the adrenaline has turned into pure momentum.",
      nextDialogueId: "ruby_ch1_ev5_dom_after",
    },
  ],
};

const rubyCh1Ev5DomTempt: Dialogue = {
  id: "ruby_ch1_ev5_dom_tempt",
  lines: [
    { speaker: "You", text: "Tell me what you want tonight." },
    { speaker: null, text: "She steps in until your chests almost touch." },
    { speaker: "Ruby", text: "I want to feel like my life is mine again.", expression: "neutral" },
    { speaker: "Ruby", text: "And I want you to kiss me like you mean it.", expression: "seductive" },
    { speaker: "You", text: "That can be arranged." },
    {
      speaker: null,
      text: "She grins, daring and unashamed.",
      nextDialogueId: "ruby_ch1_ev5_dom_after",
    },
  ],
};

const rubyCh1Ev5DomAfter: Dialogue = {
  id: "ruby_ch1_ev5_dom_after",
  lines: [
    { speaker: null, text: "You end up near the wall at the edge of the dance floor, breathing hard." },
    { speaker: "Ruby", text: "To being done with him.", expression: "neutral" },
    { speaker: "You", text: "To choosing better." },
    { speaker: null, text: "She catches your shirt, pulls you in, and kisses you hard." },
    { speaker: null, text: "Not panic. Not escape. Choice." },
    { speaker: "Ruby", text: "I still have bad habits.", expression: "shy" },
    { speaker: "Ruby", text: "But tonight I picked this on purpose.", expression: "happy" },
    { speaker: "You", text: "Keep picking it." },
    { speaker: "Ruby", text: "I will.", expression: "happy" },
  ],
};

export const rubyEvent5Dialogues: Record<string, Dialogue> = {
  ruby_ch1_ev5_mall_sub: rubyCh1Ev5MallSub,
  ruby_ch1_ev5_mall_dom: rubyCh1Ev5MallDom,
  ruby_ch1_ev5_sub_proud: rubyCh1Ev5SubProud,
  ruby_ch1_ev5_sub_rules: rubyCh1Ev5SubRules,
  ruby_ch1_ev5_sub_dance: rubyCh1Ev5SubDance,
  ruby_ch1_ev5_sub_after: rubyCh1Ev5SubAfter,
  ruby_ch1_ev5_dom_claim: rubyCh1Ev5DomClaim,
  ruby_ch1_ev5_dom_heat: rubyCh1Ev5DomHeat,
  ruby_ch1_ev5_dom_tempt: rubyCh1Ev5DomTempt,
  ruby_ch1_ev5_dom_after: rubyCh1Ev5DomAfter,
};

export const rubyEvent5Events: CharacterEvent[] = [
  {
    id: "ruby_ch1_ev5_mall_sub",
    name: "Breakup Celebration",
    description: "Ruby ends it right before your date, and the date becomes a celebration.",
    priority: 200,
    repeatable: false,
    conditions: {
      minAffection: 6,
      minHour: 18,
      maxHour: 24,
      requiredLocation: "Bar",
      requiredFlags: ["rubyTrainerAccepted", "rubyCh1Ev4Done"],
      maxDominance: 3,
    },
    dialogue: rubyCh1Ev5MallSub,
    rewards: {
      setFlags: ["rubyExConflictStarted", "ruby_chapter_1_completed"],
    },
  },
  {
    id: "ruby_ch1_ev5_mall_dom",
    name: "Breakup Celebration",
    description: "Ruby ends it right before your date, and the date becomes a celebration.",
    priority: 200,
    repeatable: false,
    conditions: {
      minAffection: 6,
      minHour: 18,
      maxHour: 24,
      requiredLocation: "Bar",
      requiredFlags: ["rubyTrainerAccepted", "rubyCh1Ev4Done"],
      minDominance: 4,
    },
    dialogue: rubyCh1Ev5MallDom,
    rewards: {
      setFlags: ["rubyExConflictStarted", "ruby_chapter_1_completed"],
    },
  },
];
