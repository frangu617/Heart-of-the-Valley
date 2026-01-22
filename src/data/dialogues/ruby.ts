import { Dialogue } from "./index";

const rubyTrainerOfferAccept: Dialogue = {
  id: "ruby_trainer_offer_accept",
  lines: [
    { speaker: "You", text: "Yeah, alright. I could use the guidance." },
    { speaker: "You", text: "Better than learning the hard way." },
    { speaker: "Ruby", text: "Smart answer. I like smart answers.", expression: "happy" },
    {
      speaker: "Ruby",
      text: "We'll start with basics. Fix your form, build a real foundation.",
      expression: "happy",
    },
    {
      speaker: "Ruby",
      text: "No ego lifting, no skipping leg day, no whining after the first set.",
      expression: "neutral",
    },
    { speaker: "You", text: "You drive a hard bargain." },
    {
      speaker: "Ruby",
      text: "This isn't a bargain. It's a commitment.",
      expression: "excited",
    },
    {
      speaker: "Ruby",
      text: "You show up, you listen, you work. I handle the rest. Deal?",
      expression: "excited",
    },
    { speaker: "You", text: "Deal." },
    {
      speaker: "Ruby",
      text: "Good. Finish your water, then meet me by the squat rack.",
      expression: "happy",
    },
    {
      speaker: "Ruby",
      text: "If you're going to do this, we're doing it right.",
      expression: "happy",
    },
  ],
};

const rubyTrainerOfferDecline: Dialogue = {
  id: "ruby_trainer_offer_decline",
  lines: [
    {
      speaker: "You",
      text: "I appreciate the offer, but I kind of wanted to figure it out on my own first.",
    },
    { speaker: "Ruby", text: "Huh. One of those.", expression: "annoyed" },
    { speaker: null, text: "Ruby studies you for a moment, then shrugs." },
    {
      speaker: "Ruby",
      text: "Your call. It's your body you're gambling with.",
      expression: "neutral",
    },
    {
      speaker: "Ruby",
      text: "If you change your mind, I'm here most days. Look for the one actually using the equipment right.",
      expression: "happy",
    },
    { speaker: "You", text: "I'll keep that in mind." },
    { speaker: "Ruby", text: "Do that.", expression: "neutral" },
  ],
};

const rubyEvent2Push: Dialogue = {
  id: "ruby_event_2_push",
  lines: [
    { speaker: "You", text: "I'm on it. Watch this." },
    {
      speaker: null,
      text: "You grit your teeth and shoulder the weight. It's heavier than usual, but you force out the reps.",
    },
    {
      speaker: "Ruby",
      text: "Lower! Control it! Don't let it crush you!",
      expression: "angry",
    },
    {
      speaker: null,
      text: "She's spotting you, but her eyes are intense, almost desperate. She's shouting cues that feel like they're about more than just the weights.",
    },
    {
      speaker: "Ruby",
      text: "Push! Come on! You have to be stronger than that! Don't be weak!",
      expression: "angry",
    },
    {
      speaker: null,
      text: "You slam the weights back onto the rack, gasping for air. Ruby stares at you, chest heaving, before she seems to realize where she is.",
    },
    { speaker: "Ruby", text: "Right. Good. That was... acceptable.", expression: "neutral" },
    {
      speaker: null,
      text: "She turns away quickly, rubbing the back of her neck.",
    },
    {
      speaker: "Ruby",
      text: "Just... keep that energy. I can't deal with anyone wasting my time today.",
      expression: "sad",
    },
  ],
};

const rubyEvent2Break: Dialogue = {
  id: "ruby_event_2_break",
  lines: [
    { speaker: "You", text: "Whoa, easy there, tiger. Did someone piss in your protein shake?" },
    {
      speaker: null,
      text: "You try to give her a disarming smile. It doesn't work.",
    },
    {
      speaker: "Ruby",
      text: "Do you think this is funny? You think my time is a joke?",
      expression: "angry",
    },
    {
      speaker: null,
      text: "She glares at you, her eyes glassy. For a second, she looks like she might actually cry, but she swallows it down instantly.",
    },
    {
      speaker: "Ruby",
      text: "Ugh. Forget it. Just... forget it.",
      expression: "neutral",
    },
    {
      speaker: null,
      text: "She waves a hand dismissively, turning her back to you.",
    },
    {
      speaker: "Ruby",
      text: "Take five if you're going to whine. I don't care.",
      expression: "neutral",
    },
  ],
};

const rubyEvent3Flirt: Dialogue = {
  id: "ruby_event_3_flirt",
  lines: [
    { speaker: "You", text: "Just admiring the view. You work hard for it." },
    {
      speaker: null,
      text: "Ruby laughs, a flush rising on her cheeks that isn't just from the exercise.",
    },
    {
      speaker: "Ruby",
      text: "Damn right I do. And if you keep working this hard, maybe you'll look half as good as me someday.",
      expression: "excited",
    },
  ],
};

const rubyEvent3Sincere: Dialogue = {
  id: "ruby_event_3_sincere",
  lines: [
    { speaker: "You", text: "I'm just impressed. You're a great teacher, Ruby." },
    { speaker: null, text: "She lowers her arms, looking suddenly bashful." },
    {
      speaker: "Ruby",
      text: "Oh. Well... thanks. I try. Most people just want a cheerleader, not a coach.",
      expression: "shy",
    },
  ],
};

export const rubyDialogues: Record<string, Dialogue> = {
  Chat: {
    id: "ruby_chat",
    requiresFirstTimeOnly: true,
    lines: [
      {
        speaker: "Ruby",
        text: "{playerName}! Time for your session!",
        expression: "happy",
      },
      { speaker: "You", text: "Hey Ruby, ready to kick my ass today?" },
      {
        speaker: "Ruby",
        text: "You know it! But hey... can I ask you something personal?",
        expression: "neutral",
      },
      { speaker: "You", text: "Sure, what's up?" },
      {
        speaker: "Ruby",
        text: "Do you ever... think about us? Like, not just as trainer and client?",
        expression: "sad",
      },
      {
        speaker: "You",
        text: "How do you respond?",
        choices: [
          {
            text: "Not really, you're like a sister to me.",
            affectionChange: -8,
            moodChange: -15,
            trustChange: -5,
          },
          {
            text: "Sometimes. Why do you ask?",
            affectionChange: 5,
            moodChange: 5,
            trustChange: 8,
          },
          {
            text: "I value our friendship too much to complicate it.",
            affectionChange: -3,
            moodChange: -5,
            trustChange: 2,
          },
        ],
      },
      {
        speaker: "Ruby",
        text: "Just... curious. Let's get to work.",
        expression: "neutral",
      },
    ],
  },
  ruby_trainer_offer_accept: rubyTrainerOfferAccept,
  ruby_trainer_offer_decline: rubyTrainerOfferDecline,
  ruby_event_2_push: rubyEvent2Push,
  ruby_event_2_break: rubyEvent2Break,
  ruby_event_3_flirt: rubyEvent3Flirt,
  ruby_event_3_sincere: rubyEvent3Sincere,
};
