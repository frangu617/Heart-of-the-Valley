export type DialogueChoice = {
  text: string;
  affectionChange: number;
  moodChange?: number;
  trustChange?: number;
  nextDialogueId?: string; // For branching conversations
};

export type DialogueLine = {
  speaker: string | null; // null for narration
  text: string;
  expression?: string; // For character facial expressions
  imageSlide?: string; // For intro slideshow images
  choices?: DialogueChoice[]; // Optional choices for player
};

export type Dialogue = {
  id: string;
  lines: DialogueLine[];
  requiresFirstTimeOnly?: boolean; // For daily limit tracking
};

// Intro story - shorter, focused on Frank
export const introDialogue: Dialogue = {
  id: "intro",
  lines: [
    {
      speaker: null,
      text: "Monday morning. 6:30 AM. The alarm cuts through the silence.",
      imageSlide: "/images/intro/bedroom_morning.png",
    },
    {
      speaker: null,
      text: "You are Frank, 32 years old. Programming professor at the local university.",
      imageSlide: "/images/intro/frank_mirror.png",
    },
    {
      speaker: null,
      text: "Teaching has become your life. It's fulfilling, predictable, safe.",
      imageSlide: "/images/intro/frank_teaching.png",
    },
    {
      speaker: null,
      text: "Romance? You've decided it's simply... inefficient.",
      imageSlide: "/images/intro/frank_alone.png",
    },
    {
      speaker: null,
      text: "After watching your parents' marriage fall apart over trivial incompatibilities, you concluded that love is just statistically improbable.",
      imageSlide: "/images/intro/frank_calculating.png",
    },
    {
      speaker: null,
      text: "Why invest emotional energy into something with such a high failure rate?",
      imageSlide: "/images/intro/frank_office.png",
    },
    {
      speaker: null,
      text: "Better to focus on what you can control: your work, your routine, your peace of mind.",
      imageSlide: "/images/intro/frank_peaceful.png",
    },
    {
      speaker: null,
      text: "But lately, that peace feels more like... emptiness.",
      imageSlide: "/images/intro/frank_window.png",
    },
    {
      speaker: null,
      text: "Time to start your day.",
    },
  ],
};

// First meeting dialogues for each character
export const firstMeetingDialogues: Record<string, Dialogue> = {
  Iris: {
    id: "iris_first_meeting",
    lines: [
      {
        speaker: null,
        text: "You're walking down the university hallway when you notice a colleague at her office door.",
      },
      {
        speaker: "Iris",
        text: "Oh! Frank... good morning.",
        expression: "neutral",
      },
      {
        speaker: null,
        text: "Professor Iris - she teaches literature. You've seen her around campus, and you're pretty sure she lives in your apartment building too.",
      },
      {
        speaker: "Iris",
        text: "I was just heading to grab some coffee. Would you... like to join me?",
        expression: "neutral",
      },
      {
        speaker: null,
        text: "She fidgets with her book, avoiding direct eye contact.",
      },
      {
        speaker: "You",
        text: "What do you say?",
        choices: [
          {
            text: "Sure, I could use some coffee.",
            affectionChange: 3,
            moodChange: 2,
          },
          {
            text: "Maybe another time. I have work to do.",
            affectionChange: -2,
            moodChange: -3,
          },
        ],
      },
      {
        speaker: "Iris",
        text: "I understand. Have a good day, Frank.",
        expression: "neutral",
      },
    ],
  },
  Dawn: {
    id: "dawn_first_meeting",
    lines: [
      {
        speaker: null,
        text: "At the gym, a familiar energetic voice calls out to you.",
      },
      { speaker: "Dawn", text: "Uncle Frank! Hey!", expression: "happy" },
      {
        speaker: null,
        text: "Dawn - Iris's daughter. You've known her since she was a kid. She just turned 18.",
      },
      {
        speaker: "Dawn",
        text: "I didn't know you worked out here! That's so cool!",
        expression: "happy",
      },
      {
        speaker: "You",
        text: "Hey Dawn! Yeah, I've been coming here for a while.",
      },
      {
        speaker: "Dawn",
        text: "We should work out together sometime! It'll be fun!",
        expression: "happy",
      },
      {
        speaker: null,
        text: "There's something different about how she looks at you now. Not quite the same as before...",
      },
    ],
  },
  Gwen: {
    id: "gwen_first_meeting",
    lines: [
      {
        speaker: null,
        text: "As you're heading back to your apartment, you hear footsteps behind you in the hallway.",
      },
      {
        speaker: "Gwen",
        text: "Hey! Are you the new neighbor?",
        expression: "happy",
      },
      {
        speaker: null,
        text: "A woman with an energetic smile approaches you.",
      },
      {
        speaker: "You",
        text: "Not exactly new - I've been here about a year. Frank.",
      },
      {
        speaker: "Gwen",
        text: "Oh wow, really? I'm Gwen! I can't believe we haven't met sooner!",
        expression: "happy",
      },
      { speaker: "You", text: "Nice to meet you, Gwen." },
      {
        speaker: "Gwen",
        text: "I live just down the hall. We should hang out sometime! I know all the fun spots around here.",
        expression: "love",
      },
      {
        speaker: null,
        text: "She's already bubbling with ideas, her enthusiasm filling the hallway.",
      },
    ],
  },
  Yumi: {
    id: "yumi_first_meeting",
    lines: [
      {
        speaker: null,
        text: "After class, one of your students approaches your desk.",
      },
      {
        speaker: "Yumi",
        text: "Professor Frank? Do you have a moment?",
        expression: "neutral",
      },
      {
        speaker: null,
        text: "Yumi - one of your most dedicated students. Always asking insightful questions.",
      },
      { speaker: "You", text: "Of course, Yumi. What's on your mind?" },
      {
        speaker: "Yumi",
        text: "I wanted to ask about the advanced algorithm assignment...",
        expression: "neutral",
      },
      {
        speaker: null,
        text: "She explains her approach with impressive depth. Her eyes light up when discussing code.",
      },
      {
        speaker: "Yumi",
        text: "I really admire how you teach, Professor. You make complex concepts feel... elegant.",
        expression: "happy",
      },
    ],
  },
  Ruby: {
    id: "ruby_first_meeting",
    lines: [
      {
        speaker: null,
        text: "Your personal trainer approaches with her usual confident stride.",
      },
      {
        speaker: "Ruby",
        text: "Frank! Ready for today's session?",
        expression: "happy",
      },
      {
        speaker: null,
        text: "Ruby - your personal trainer for the past two years. Tough, dedicated, and surprisingly caring.",
      },
      { speaker: "You", text: "Ready to get destroyed, as usual." },
      {
        speaker: "Ruby",
        text: "That's the spirit! Let's go!",
        expression: "happy",
      },
      {
        speaker: null,
        text: "During your workout, she spots you on the bench press.",
      },
      {
        speaker: "Ruby",
        text: "You know, Frank... you're one of my favorite clients.",
        expression: "neutral",
      },
      {
        speaker: null,
        text: "For a moment, something flickers in her expression before she quickly looks away.",
      },
    ],
  },
};

// Character dialogues with choices
export const characterDialogues: Record<string, Record<string, Dialogue>> = {
  Iris: {
    Chat: {
      id: "iris_chat",
      requiresFirstTimeOnly: true,
      lines: [
        {
          speaker: "Iris",
          text: "Oh, Frank! I didn't expect to see you here...",
          expression: "neutral",
        },
        {
          speaker: "Iris",
          text: "How... how was your morning class?",
          expression: "neutral",
        },
        {
          speaker: "You",
          text: "How do you respond?",
          choices: [
            {
              text: "It was great! The students were really engaged today.",
              affectionChange: 2,
              moodChange: 1,
            },
            {
              text: "Same as always. Nothing special.",
              affectionChange: -1,
              moodChange: -1,
            },
            {
              text: "It would be better if I could spend more time with you.",
              affectionChange: 3,
              moodChange: 2,
              trustChange: 1,
            },
          ],
        },
        {
          speaker: "Iris",
          text: "I... I see. That's... that's good to hear.",
          expression: "happy",
        },
        {
          speaker: null,
          text: "Iris seems pleased with your answer. You notice a slight blush on her cheeks.",
        },
      ],
    },
    Hug: {
      id: "iris_hug",
      requiresFirstTimeOnly: true,
      lines: [
        { speaker: "You", text: "Can I give you a hug?" },
        { speaker: "Iris", text: "A hug? I... um...", expression: "neutral" },
        {
          speaker: null,
          text: "Iris looks uncertain, glancing around nervously.",
        },
        {
          speaker: "Iris",
          text: "I suppose that would be... alright.",
          expression: "happy",
        },
        {
          speaker: null,
          text: "You embrace Iris gently. She seems to relax slightly in your arms.",
        },
        {
          speaker: "Iris",
          text: "Thank you, Frank. That was... nice.",
          expression: "love",
        },
      ],
    },
    Kiss: {
      id: "iris_kiss",
      requiresFirstTimeOnly: true,
      lines: [
        { speaker: null, text: "You lean in closer to Iris." },
        {
          speaker: "Iris",
          text: "Frank, what are you...?",
          expression: "neutral",
        },
        {
          speaker: null,
          text: "You kiss her softly. Her eyes widen in surprise.",
        },
        {
          speaker: "Iris",
          text: "We... we shouldn't... Dawn might...",
          expression: "sad",
        },
        {
          speaker: "You",
          text: "What do you say?",
          choices: [
            {
              text: "You're right, I'm sorry. This was a mistake.",
              affectionChange: -5,
              moodChange: -10,
              trustChange: -3,
            },
            {
              text: "Don't worry about Dawn. This is about us.",
              affectionChange: 5,
              moodChange: 5,
              trustChange: 2,
            },
            {
              text: "We can take this slow. No pressure.",
              affectionChange: 8,
              moodChange: 8,
              trustChange: 5,
            },
          ],
        },
      ],
    },
  },
  Dawn: {
    Chat: {
      id: "dawn_chat",
      requiresFirstTimeOnly: true,
      lines: [
        {
          speaker: "Dawn",
          text: "Uncle Frank! There you are!",
          expression: "happy",
        },
        { speaker: "You", text: "Hey Dawn, what's up?" },
        {
          speaker: "Dawn",
          text: "I... I wanted to ask you something...",
          expression: "neutral",
        },
        {
          speaker: "Dawn",
          text: "Do you think I'm still just a kid to you?",
          expression: "sad",
        },
        {
          speaker: "You",
          text: "How do you respond?",
          choices: [
            {
              text: "Of course! You'll always be my little niece.",
              affectionChange: -5,
              moodChange: -10,
              trustChange: -2,
            },
            {
              text: "You've grown up a lot. I've noticed.",
              affectionChange: 5,
              moodChange: 5,
              trustChange: 3,
            },
            {
              text: "Why do you ask? Is something bothering you?",
              affectionChange: 3,
              moodChange: 3,
              trustChange: 4,
            },
          ],
        },
        {
          speaker: "Dawn",
          text: "I... never mind. Thanks for talking with me.",
          expression: "neutral",
        },
      ],
    },
    Hug: {
      id: "dawn_hug",
      requiresFirstTimeOnly: true,
      lines: [
        { speaker: "Dawn", text: "Can I... get a hug?", expression: "neutral" },
        {
          speaker: null,
          text: "Dawn looks at you expectantly, her expression more serious than usual.",
        },
        { speaker: "You", text: "Of course, come here." },
        {
          speaker: null,
          text: "You hug Dawn. She holds on a little longer than usual.",
        },
        {
          speaker: "Dawn",
          text: "Thanks, Uncle Frank... you're the best.",
          expression: "love",
        },
        { speaker: null, text: "You notice she's trembling slightly." },
      ],
    },
  },
  Gwen: {
    Chat: {
      id: "gwen_chat",
      requiresFirstTimeOnly: true,
      lines: [
        {
          speaker: "Gwen",
          text: "Frank! Perfect timing!",
          expression: "happy",
        },
        { speaker: "You", text: "What's going on, Gwen?" },
        {
          speaker: "Gwen",
          text: "I found this awesome new place we should all check out this weekend!",
          expression: "happy",
        },
        { speaker: "You", text: "Sounds fun! Who's coming?" },
        {
          speaker: "Gwen",
          text: "Well, I was thinking just the two of us actually. Unless you'd rather bring Dawn?",
          expression: "neutral",
          choices: [
            {
              text: "Just us sounds great!",
              affectionChange: 5,
              moodChange: 5,
            },
            {
              text: "Yeah, let's invite Dawn too.",
              affectionChange: -2,
              moodChange: -2,
            },
            {
              text: "Maybe we could all go - you, me, Dawn, and anyone else?",
              affectionChange: 1,
              moodChange: 1,
            },
          ],
        },
        {
          speaker: "Gwen",
          text: "Awesome! I'll plan everything!",
          expression: "love",
        },
      ],
    },
  },
  Yumi: {
    Chat: {
      id: "yumi_chat",
      requiresFirstTimeOnly: true,
      lines: [
        {
          speaker: "Yumi",
          text: "Professor Frank! Do you have a moment?",
          expression: "neutral",
        },
        { speaker: "You", text: "Of course, Yumi. What can I help you with?" },
        {
          speaker: "Yumi",
          text: "I was wondering... would you be willing to mentor me outside of class?",
          expression: "neutral",
        },
        {
          speaker: "Yumi",
          text: "I want to learn more about advanced programming, and you're the best teacher I know.",
          expression: "happy",
        },
        {
          speaker: "You",
          text: "How do you respond?",
          choices: [
            {
              text: "I'm flattered, but I don't do private tutoring.",
              affectionChange: -3,
              moodChange: -5,
              trustChange: -2,
            },
            {
              text: "Sure, I can spare some time. Let's set up a schedule.",
              affectionChange: 5,
              moodChange: 5,
              trustChange: 5,
            },
            {
              text: "That depends. What exactly are you looking to learn?",
              affectionChange: 2,
              moodChange: 2,
              trustChange: 3,
            },
          ],
        },
        {
          speaker: "Yumi",
          text: "Thank you so much, Professor! I really appreciate it.",
          expression: "love",
        },
      ],
    },
  },
  Ruby: {
    Chat: {
      id: "ruby_chat",
      requiresFirstTimeOnly: true,
      lines: [
        {
          speaker: "Ruby",
          text: "Frank! Time for your session!",
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
  },
};

// Default dialogue for when specific one doesn't exist
export const getDefaultDialogue = (
  characterName: string,
  actionLabel: string
): Dialogue => {
  return {
    id: `${characterName}_${actionLabel}_default`,
    requiresFirstTimeOnly: true,
    lines: [
      {
        speaker: null,
        text: `You ${actionLabel.toLowerCase()} with ${characterName}.`,
      },
      {
        speaker: characterName,
        text: "Thanks for spending time with me!",
        expression: "happy",
      },
    ],
  };
};
