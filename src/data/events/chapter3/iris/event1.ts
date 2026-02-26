import type { Dialogue } from "../../../dialogues";
import type { CharacterEvent } from "../../types";

// Event 1: After Velvet
// Description: You and Iris bump into each other and define Chapter 3's relationship lane.

type QuizChoice = {
  text: string;
  pass: boolean;
  affectionChange: number;
  lustChange?: number;
  dominanceChange?: number;
};

type QuizQuestion = {
  prompt: string;
  options: [QuizChoice, QuizChoice, QuizChoice];
};

const buildArgumentQuiz = (
  prefix: string,
  questions: QuizQuestion[],
  successDialogueId: string,
  failDialogueId: string,
): Record<string, Dialogue> => {
  const dialogues: Record<string, Dialogue> = {};

  questions.forEach((question, index) => {
    const id = `${prefix}_q${index + 1}`;
    const nextPassId =
      index === questions.length - 1
        ? successDialogueId
        : `${prefix}_q${index + 2}`;

    dialogues[id] = {
      id,
      lines: [
        { speaker: "Iris", text: question.prompt, expression: "neutral" },
        {
          speaker: "You",
          text: "Your answer?",
          choices: question.options.map((choice) => ({
            text: choice.text,
            affectionChange: choice.affectionChange,
            lustChange: choice.lustChange,
            dominanceChange: choice.dominanceChange,
            nextDialogueId: choice.pass ? nextPassId : failDialogueId,
          })),
        },
      ],
    };
  });

  return dialogues;
};

const mildShiftQuestions: QuizQuestion[] = [
  {
    prompt: "Define the core rule in one line.",
    options: [
      {
        text: "No hidden moves. We talk before resentment forms.",
        pass: true,
        affectionChange: 1,
      },
      {
        text: "We keep it vague and trust momentum.",
        pass: false,
        affectionChange: -1,
      },
      {
        text: "Clear expectations and explicit review points.",
        pass: true,
        affectionChange: 1,
      },
    ],
  },
  {
    prompt: "If jealousy appears?",
    options: [
      {
        text: "Name it early and renegotiate if needed.",
        pass: true,
        affectionChange: 1,
      },
      {
        text: "Hide it to avoid conflict.",
        pass: false,
        affectionChange: -1,
      },
      {
        text: "Treat it as signal, not accusation.",
        pass: true,
        affectionChange: 1,
      },
    ],
  },
  {
    prompt: "How do we protect trust while changing lanes?",
    options: [
      {
        text: "Slow transitions with explicit consent checks.",
        pass: true,
        affectionChange: 1,
      },
      {
        text: "Force consistency and never revisit the decision.",
        pass: false,
        affectionChange: -1,
      },
      {
        text: "Keep exits clean and spoken, not implied.",
        pass: true,
        affectionChange: 1,
      },
    ],
  },
  {
    prompt: "What do we do with boredom?",
    options: [
      {
        text: "Treat it as data and adjust intentionally.",
        pass: true,
        affectionChange: 1,
      },
      {
        text: "Pretend it is not there so we keep peace.",
        pass: false,
        affectionChange: -1,
      },
      {
        text: "Add novelty inside agreed boundaries.",
        pass: true,
        affectionChange: 1,
      },
    ],
  },
  {
    prompt: "Final check: why should I trust your proposal?",
    options: [
      {
        text: "Because I am choosing structure, not avoiding discomfort.",
        pass: true,
        affectionChange: 1,
      },
      {
        text: "Because this sounds mature on paper.",
        pass: false,
        affectionChange: -1,
      },
      {
        text: "Because we can revisit if the fit is wrong.",
        pass: true,
        affectionChange: 1,
      },
    ],
  },
];

const hardShiftQuestions: QuizQuestion[] = [
  {
    prompt: "Why shift now, and why this lane?",
    options: [
      {
        text: "Because this gives desire structure without denying it.",
        pass: true,
        affectionChange: 1,
      },
      {
        text: "Because I am uncomfortable with uncertainty.",
        pass: false,
        affectionChange: -1,
      },
      {
        text: "Because this lane looks easiest.",
        pass: false,
        affectionChange: -1,
      },
    ],
  },
  {
    prompt: "How do we avoid turning this into control theater?",
    options: [
      {
        text: "By making standards mutual and naming accountability.",
        pass: true,
        affectionChange: 1,
      },
      {
        text: "Whoever has leverage decides.",
        pass: false,
        affectionChange: -1,
      },
      {
        text: "We skip details and trust chemistry.",
        pass: false,
        affectionChange: -1,
      },
    ],
  },
  {
    prompt: "What is non-negotiable?",
    options: [
      {
        text: "No hidden deals, no delayed truths, no contempt.",
        pass: true,
        affectionChange: 1,
      },
      {
        text: "Outcome matters more than process.",
        pass: false,
        affectionChange: -1,
      },
      {
        text: "No limits when desire spikes.",
        pass: false,
        affectionChange: -1,
      },
    ],
  },
  {
    prompt: "If one of us wavers mid-course?",
    options: [
      {
        text: "Pause, clarify, and choose again in daylight.",
        pass: true,
        affectionChange: 1,
      },
      {
        text: "Push through so momentum is not lost.",
        pass: false,
        affectionChange: -1,
      },
      {
        text: "Silence it until it fades.",
        pass: false,
        affectionChange: -1,
      },
    ],
  },
  {
    prompt: "Why should I believe this is conviction, not panic?",
    options: [
      {
        text: "Because I am offering terms I will also be measured by.",
        pass: true,
        affectionChange: 1,
      },
      {
        text: "Because it is safer than your current plan.",
        pass: false,
        affectionChange: -1,
      },
      {
        text: "Because any change is better than this.",
        pass: false,
        affectionChange: -1,
      },
    ],
  },
];

const veryHardShiftQuestions: QuizQuestion[] = [
  {
    prompt: "You are asking for a complete pivot. Why should I even consider it?",
    options: [
      {
        text: "Because the pivot has strict terms, not vague promises.",
        pass: true,
        affectionChange: 1,
      },
      {
        text: "Because I need reassurance immediately.",
        pass: false,
        affectionChange: -1,
        dominanceChange: -1,
      },
      {
        text: "Because this is what people are supposed to do.",
        pass: false,
        affectionChange: -1,
        dominanceChange: -1,
      },
    ],
  },
  {
    prompt: "What cost are you personally willing to pay to make this work?",
    options: [
      {
        text: "Immediate transparency, even when it makes me look bad.",
        pass: true,
        affectionChange: 1,
      },
      {
        text: "I expect you to absorb most of that cost.",
        pass: false,
        affectionChange: -1,
        dominanceChange: -1,
      },
      {
        text: "I am not sure yet, we can improvise.",
        pass: false,
        affectionChange: -1,
      },
    ],
  },
  {
    prompt: "How do you stop this from becoming emotional whiplash?",
    options: [
      {
        text: "Fixed review points, explicit boundaries, clean exits.",
        pass: true,
        affectionChange: 1,
      },
      {
        text: "By insisting we never question the decision.",
        pass: false,
        affectionChange: -1,
      },
      {
        text: "By hoping we settle naturally.",
        pass: false,
        affectionChange: -1,
      },
    ],
  },
  {
    prompt: "If your argument fails right now, what then?",
    options: [
      {
        text: "I accept that and hold the current lane without punishment.",
        pass: true,
        affectionChange: 1,
      },
      {
        text: "I keep pushing until you yield.",
        pass: false,
        affectionChange: -1,
        dominanceChange: -1,
      },
      {
        text: "I pull away so you regret refusing.",
        pass: false,
        affectionChange: -1,
        dominanceChange: -1,
      },
    ],
  },
  {
    prompt: "Last chance. Why should I trust you with this level of influence?",
    options: [
      {
        text: "Because I am asking for responsibility, not ownership.",
        pass: true,
        affectionChange: 1,
      },
      {
        text: "Because I want certainty and this gives it.",
        pass: false,
        affectionChange: -1,
      },
      {
        text: "Because if it breaks, we can blame timing.",
        pass: false,
        affectionChange: -1,
      },
    ],
  },
];

const iris_c3_ev1_dom_start: Dialogue = {
  id: "iris_c3_ev1_dom_start",
  lines: [
    {
      speaker: null,
      text: "You and Iris nearly collide between errands. She does not bother pretending she was not hoping to run into you.",
    },
    {
      speaker: "Iris",
      text: "Last night did not scare me. It made me want to explore harder.",
      expression: "happy",
    },
    { speaker: "You", text: "Would monogamy not be better for us?" },
    {
      speaker: "Iris",
      text: "Better for calm, maybe. Not better for truth. I am not shrinking to feel safe.",
      expression: "neutral",
    },
    {
      speaker: "You",
      text: "How do you respond?",
      choices: [
        {
          text: "Accept her frame and stay open.",
          affectionChange: 1,
          lustChange: 1,
          dominanceChange: 1,
          nextDialogueId: "iris_c3_ev1_dom_keep_end",
        },
        {
          text: "Accept, but argue for structured middle.",
          affectionChange: 0,
          nextDialogueId: "iris_c3_ev1_dom_to_middle_intro",
        },
        {
          text: "Refuse and argue for focused exclusivity/sub.",
          affectionChange: -1,
          dominanceChange: -1,
          nextDialogueId: "iris_c3_ev1_dom_to_sub_intro",
        },
      ],
    },
  ],
};

const iris_c3_ev1_dom_start_kissed_other: Dialogue = {
  id: "iris_c3_ev1_dom_start_kissed_other",
  lines: [
    {
      speaker: null,
      text: "You and Iris nearly collide between errands. She catches your sleeve with a playful look.",
    },
    {
      speaker: "Iris",
      text: "I heard you kissed someone else. I am not mad. I am impressed you stopped pretending.",
      expression: "happy",
    },
    {
      speaker: "Iris",
      text: "Last night did not scare me. It made me want to explore harder.",
      expression: "seductive",
    },
    { speaker: "You", text: "Would monogamy not be better for us?" },
    {
      speaker: "Iris",
      text: "Better for calm, maybe. Not better for truth. I am not shrinking to feel safe.",
      expression: "neutral",
    },
    {
      speaker: "You",
      text: "How do you respond?",
      choices: [
        {
          text: "Accept her frame and stay open.",
          affectionChange: 1,
          lustChange: 1,
          dominanceChange: 1,
          nextDialogueId: "iris_c3_ev1_dom_keep_end",
        },
        {
          text: "Accept, but argue for structured middle.",
          affectionChange: 0,
          nextDialogueId: "iris_c3_ev1_dom_to_middle_intro",
        },
        {
          text: "Refuse and argue for focused exclusivity/sub.",
          affectionChange: -1,
          dominanceChange: -1,
          nextDialogueId: "iris_c3_ev1_dom_to_sub_intro",
        },
      ],
    },
  ],
};

const iris_c3_ev1_sub_start: Dialogue = {
  id: "iris_c3_ev1_sub_start",
  lines: [
    {
      speaker: null,
      text: "Iris runs into you and lingers instead of moving on.",
    },
    {
      speaker: "Iris",
      text: "Last night made me want more, but part of me thinks monogamy might protect us.",
      expression: "shy",
    },
    {
      speaker: "You",
      text: "Protection can turn into avoidance. I do not want us small just to feel safe.",
    },
    { speaker: "Iris", text: "All right. Then choose the lane.", expression: "neutral" },
    {
      speaker: "You",
      text: "How do you set the direction?",
      choices: [
        {
          text: "Keep the current sub dynamic.",
          affectionChange: 1,
          dominanceChange: 1,
          nextDialogueId: "iris_c3_ev1_sub_keep_end",
        },
        {
          text: "Argue for a middle lane.",
          affectionChange: 1,
          nextDialogueId: "iris_c3_ev1_sub_to_middle_intro",
        },
        {
          text: "Push her toward dom.",
          affectionChange: 0,
          dominanceChange: -1,
          nextDialogueId: "iris_c3_ev1_sub_to_dom_intro",
        },
      ],
    },
  ],
};

const iris_c3_ev1_sub_start_kissed_other: Dialogue = {
  id: "iris_c3_ev1_sub_start_kissed_other",
  lines: [
    {
      speaker: null,
      text: "Iris runs into you and smiles like she already knows the rumor mill.",
    },
    {
      speaker: "Iris",
      text: "I heard about that kiss. No scandal from me. I want honesty, not theater.",
      expression: "happy",
    },
    {
      speaker: "Iris",
      text: "Last night made me want more, but part of me thinks monogamy might protect us.",
      expression: "shy",
    },
    {
      speaker: "You",
      text: "Protection can turn into avoidance. I do not want us small just to feel safe.",
    },
    { speaker: "Iris", text: "All right. Then choose the lane.", expression: "neutral" },
    {
      speaker: "You",
      text: "How do you set the direction?",
      choices: [
        {
          text: "Keep the current sub dynamic.",
          affectionChange: 1,
          dominanceChange: 1,
          nextDialogueId: "iris_c3_ev1_sub_keep_end",
        },
        {
          text: "Argue for a middle lane.",
          affectionChange: 1,
          nextDialogueId: "iris_c3_ev1_sub_to_middle_intro",
        },
        {
          text: "Push her toward dom.",
          affectionChange: 0,
          dominanceChange: -1,
          nextDialogueId: "iris_c3_ev1_sub_to_dom_intro",
        },
      ],
    },
  ],
};

const iris_c3_ev1_middle_start: Dialogue = {
  id: "iris_c3_ev1_middle_start",
  lines: [
    {
      speaker: null,
      text: "You and Iris bump into each other and the conversation immediately goes serious.",
    },
    {
      speaker: "Iris",
      text: "Monogamy gives stability, but it can become autopilot.",
      expression: "neutral",
    },
    {
      speaker: "Iris",
      text: "Open structures give range, but they can fragment trust.",
      expression: "neutral",
    },
    {
      speaker: "You",
      text: "Then the adult question is costs and rules, not labels.",
    },
    {
      speaker: "Iris",
      text: "Exactly. Pick what we test first.",
      expression: "happy",
    },
    {
      speaker: "You",
      text: "What lane do you choose?",
      choices: [
        {
          text: "Keep the middle lane.",
          affectionChange: 1,
          nextDialogueId: "iris_c3_ev1_middle_keep_end",
        },
        {
          text: "Pull toward sub/monogamy focus.",
          affectionChange: 1,
          nextDialogueId: "iris_c3_ev1_middle_to_sub_intro",
        },
        {
          text: "Pull toward dom/open exploration.",
          affectionChange: 1,
          nextDialogueId: "iris_c3_ev1_middle_to_dom_intro",
        },
      ],
    },
  ],
};

const iris_c3_ev1_middle_start_kissed_other: Dialogue = {
  id: "iris_c3_ev1_middle_start_kissed_other",
  lines: [
    {
      speaker: null,
      text: "You and Iris bump into each other and she opens with a calm smile.",
    },
    {
      speaker: "Iris",
      text: "I heard about your kiss. No drama. Just do not lie about what you want.",
      expression: "happy",
    },
    {
      speaker: "Iris",
      text: "Monogamy gives stability, but it can become autopilot.",
      expression: "neutral",
    },
    {
      speaker: "Iris",
      text: "Open structures give range, but they can fragment trust.",
      expression: "neutral",
    },
    {
      speaker: "You",
      text: "Then the adult question is costs and rules, not labels.",
    },
    {
      speaker: "Iris",
      text: "Exactly. Pick what we test first.",
      expression: "happy",
    },
    {
      speaker: "You",
      text: "What lane do you choose?",
      choices: [
        {
          text: "Keep the middle lane.",
          affectionChange: 1,
          nextDialogueId: "iris_c3_ev1_middle_keep_end",
        },
        {
          text: "Pull toward sub/monogamy focus.",
          affectionChange: 1,
          nextDialogueId: "iris_c3_ev1_middle_to_sub_intro",
        },
        {
          text: "Pull toward dom/open exploration.",
          affectionChange: 1,
          nextDialogueId: "iris_c3_ev1_middle_to_dom_intro",
        },
      ],
    },
  ],
};

const iris_c3_ev1_dom_keep_end: Dialogue = {
  id: "iris_c3_ev1_dom_keep_end",
  lines: [
    { speaker: "Iris", text: "Good. We keep exploring openly and honestly.", expression: "seductive" },
    {
      speaker: null,
      text: "You lock in the dom/open lane.",
      setFlags: ["irisC3PathCurrentDom", "irisC3PathLocked"],
    },
  ],
};

const iris_c3_ev1_sub_keep_end: Dialogue = {
  id: "iris_c3_ev1_sub_keep_end",
  lines: [
    { speaker: "Iris", text: "All right. I stay with your lead.", expression: "happy" },
    {
      speaker: null,
      text: "You lock in the sub/focused lane.",
      setFlags: ["irisC3PathCurrentSub", "irisC3PathLocked"],
    },
  ],
};

const iris_c3_ev1_middle_keep_end: Dialogue = {
  id: "iris_c3_ev1_middle_keep_end",
  lines: [
    { speaker: "Iris", text: "Middle lane, then. Deliberate and alive.", expression: "happy" },
    {
      speaker: null,
      text: "You lock in the balanced lane.",
      setFlags: ["irisC3PathCurrentMiddle", "irisC3PathLocked"],
    },
  ],
};

const iris_c3_ev1_dom_to_middle_intro: Dialogue = {
  id: "iris_c3_ev1_dom_to_middle_intro",
  lines: [
    { speaker: "Iris", text: "Hard sell. Convince me this is structure, not fear.", expression: "neutral" },
    { speaker: null, text: "She waits for precision.", nextDialogueId: "iris_c3_ev1_dom_to_middle_q1" },
  ],
};

const iris_c3_ev1_dom_to_sub_intro: Dialogue = {
  id: "iris_c3_ev1_dom_to_sub_intro",
  lines: [
    { speaker: "Iris", text: "Very hard sell. Make the case without trying to own me.", expression: "neutral" },
    { speaker: null, text: "She does not blink.", nextDialogueId: "iris_c3_ev1_dom_to_sub_q1" },
  ],
};

const iris_c3_ev1_sub_to_middle_intro: Dialogue = {
  id: "iris_c3_ev1_sub_to_middle_intro",
  lines: [
    { speaker: "Iris", text: "I can hear that case. Prove it stays clear.", expression: "neutral" },
    { speaker: null, text: "She gives you room to persuade her.", nextDialogueId: "iris_c3_ev1_sub_to_middle_q1" },
  ],
};

const iris_c3_ev1_sub_to_dom_intro: Dialogue = {
  id: "iris_c3_ev1_sub_to_dom_intro",
  lines: [
    { speaker: "Iris", text: "That is a hard pivot. Show me you mean it.", expression: "neutral" },
    { speaker: null, text: "She studies your face.", nextDialogueId: "iris_c3_ev1_sub_to_dom_q1" },
  ],
};

const iris_c3_ev1_middle_to_sub_intro: Dialogue = {
  id: "iris_c3_ev1_middle_to_sub_intro",
  lines: [
    { speaker: "Iris", text: "All right. Make the case for tighter focus.", expression: "neutral" },
    { speaker: null, text: "She nods once.", nextDialogueId: "iris_c3_ev1_middle_to_sub_q1" },
  ],
};

const iris_c3_ev1_middle_to_dom_intro: Dialogue = {
  id: "iris_c3_ev1_middle_to_dom_intro",
  lines: [
    { speaker: "Iris", text: "Then justify widening the frame.", expression: "neutral" },
    { speaker: null, text: "She folds her arms and waits.", nextDialogueId: "iris_c3_ev1_middle_to_dom_q1" },
  ],
};

const iris_c3_ev1_dom_to_middle_success: Dialogue = {
  id: "iris_c3_ev1_dom_to_middle_success",
  lines: [
    { speaker: "Iris", text: "Fine. Middle lane. Structured and honest.", expression: "happy" },
    {
      speaker: null,
      text: "You pull the lane toward center.",
      setFlags: ["irisC3PathShiftAttempted", "irisC3PathShiftSucceeded", "irisC3PathCurrentMiddle"],
    },
  ],
};

const iris_c3_ev1_dom_to_middle_fail: Dialogue = {
  id: "iris_c3_ev1_dom_to_middle_fail",
  lines: [
    { speaker: "Iris", text: "No. That argument does not hold.", expression: "neutral" },
    {
      speaker: null,
      text: "The status quo remains dom/open.",
      setFlags: ["irisC3PathShiftAttempted", "irisC3PathCurrentDom"],
    },
  ],
};

const iris_c3_ev1_dom_to_sub_success: Dialogue = {
  id: "iris_c3_ev1_dom_to_sub_success",
  lines: [
    { speaker: "Iris", text: "Against my instincts, yes. We test focused exclusivity.", expression: "shy" },
    {
      speaker: null,
      text: "You shift to sub/focused.",
      setFlags: ["irisC3PathShiftAttempted", "irisC3PathShiftSucceeded", "irisC3PathCurrentSub"],
    },
  ],
};

const iris_c3_ev1_dom_to_sub_fail: Dialogue = {
  id: "iris_c3_ev1_dom_to_sub_fail",
  lines: [
    { speaker: "Iris", text: "No. If anything, that just confirmed my lane.", expression: "seductive" },
    {
      speaker: null,
      text: "The refusal reinforces dom/open.",
      setFlags: ["irisC3PathShiftAttempted", "irisC3PathCurrentDom"],
    },
  ],
};

const iris_c3_ev1_sub_to_middle_success: Dialogue = {
  id: "iris_c3_ev1_sub_to_middle_success",
  lines: [
    { speaker: "Iris", text: "All right. Middle lane works if we keep it explicit.", expression: "happy" },
    {
      speaker: null,
      text: "You shift to middle.",
      setFlags: ["irisC3PathShiftAttempted", "irisC3PathShiftSucceeded", "irisC3PathCurrentMiddle"],
    },
  ],
};

const iris_c3_ev1_sub_to_middle_fail: Dialogue = {
  id: "iris_c3_ev1_sub_to_middle_fail",
  lines: [
    { speaker: "Iris", text: "Not yet. We keep the current frame.", expression: "neutral" },
    {
      speaker: null,
      text: "The status quo remains sub/focused.",
      setFlags: ["irisC3PathShiftAttempted", "irisC3PathCurrentSub"],
    },
  ],
};

const iris_c3_ev1_sub_to_dom_success: Dialogue = {
  id: "iris_c3_ev1_sub_to_dom_success",
  lines: [
    { speaker: "Iris", text: "All right. I lead, but we do it clean.", expression: "seductive" },
    {
      speaker: null,
      text: "You shift to dom/open.",
      setFlags: ["irisC3PathShiftAttempted", "irisC3PathShiftSucceeded", "irisC3PathCurrentDom"],
    },
  ],
};

const iris_c3_ev1_sub_to_dom_fail: Dialogue = {
  id: "iris_c3_ev1_sub_to_dom_fail",
  lines: [
    { speaker: "Iris", text: "No. We keep this lane.", expression: "neutral" },
    {
      speaker: null,
      text: "The status quo remains sub/focused.",
      setFlags: ["irisC3PathShiftAttempted", "irisC3PathCurrentSub"],
    },
  ],
};

const iris_c3_ev1_middle_to_sub_success: Dialogue = {
  id: "iris_c3_ev1_middle_to_sub_success",
  lines: [
    { speaker: "Iris", text: "Focused lane, then. I can work with that.", expression: "happy" },
    {
      speaker: null,
      text: "You shift to sub/focused.",
      setFlags: ["irisC3PathShiftAttempted", "irisC3PathShiftSucceeded", "irisC3PathCurrentSub"],
    },
  ],
};

const iris_c3_ev1_middle_to_sub_fail: Dialogue = {
  id: "iris_c3_ev1_middle_to_sub_fail",
  lines: [
    { speaker: "Iris", text: "Not convinced. We stay balanced.", expression: "neutral" },
    {
      speaker: null,
      text: "The status quo remains middle.",
      setFlags: ["irisC3PathShiftAttempted", "irisC3PathCurrentMiddle"],
    },
  ],
};

const iris_c3_ev1_middle_to_dom_success: Dialogue = {
  id: "iris_c3_ev1_middle_to_dom_success",
  lines: [
    { speaker: "Iris", text: "Fair. We widen the frame and keep it accountable.", expression: "happy" },
    {
      speaker: null,
      text: "You shift to dom/open.",
      setFlags: ["irisC3PathShiftAttempted", "irisC3PathShiftSucceeded", "irisC3PathCurrentDom"],
    },
  ],
};

const iris_c3_ev1_middle_to_dom_fail: Dialogue = {
  id: "iris_c3_ev1_middle_to_dom_fail",
  lines: [
    { speaker: "Iris", text: "No. That sounded like speed, not structure.", expression: "neutral" },
    {
      speaker: null,
      text: "The status quo remains middle.",
      setFlags: ["irisC3PathShiftAttempted", "irisC3PathCurrentMiddle"],
    },
  ],
};

const irisDomToMiddleQuiz = buildArgumentQuiz(
  "iris_c3_ev1_dom_to_middle",
  hardShiftQuestions,
  "iris_c3_ev1_dom_to_middle_success",
  "iris_c3_ev1_dom_to_middle_fail",
);

const irisDomToSubQuiz = buildArgumentQuiz(
  "iris_c3_ev1_dom_to_sub",
  veryHardShiftQuestions,
  "iris_c3_ev1_dom_to_sub_success",
  "iris_c3_ev1_dom_to_sub_fail",
);

const irisSubToMiddleQuiz = buildArgumentQuiz(
  "iris_c3_ev1_sub_to_middle",
  mildShiftQuestions,
  "iris_c3_ev1_sub_to_middle_success",
  "iris_c3_ev1_sub_to_middle_fail",
);

const irisSubToDomQuiz = buildArgumentQuiz(
  "iris_c3_ev1_sub_to_dom",
  hardShiftQuestions,
  "iris_c3_ev1_sub_to_dom_success",
  "iris_c3_ev1_sub_to_dom_fail",
);

const irisMiddleToSubQuiz = buildArgumentQuiz(
  "iris_c3_ev1_middle_to_sub",
  mildShiftQuestions,
  "iris_c3_ev1_middle_to_sub_success",
  "iris_c3_ev1_middle_to_sub_fail",
);

const irisMiddleToDomQuiz = buildArgumentQuiz(
  "iris_c3_ev1_middle_to_dom",
  mildShiftQuestions,
  "iris_c3_ev1_middle_to_dom_success",
  "iris_c3_ev1_middle_to_dom_fail",
);

export const irisEvent1Dialogues: Record<string, Dialogue> = {
  iris_c3_ev1_dom_start,
  iris_c3_ev1_dom_start_kissed_other,
  iris_c3_ev1_sub_start,
  iris_c3_ev1_sub_start_kissed_other,
  iris_c3_ev1_middle_start,
  iris_c3_ev1_middle_start_kissed_other,
  iris_c3_ev1_dom_keep_end,
  iris_c3_ev1_sub_keep_end,
  iris_c3_ev1_middle_keep_end,
  iris_c3_ev1_dom_to_middle_intro,
  iris_c3_ev1_dom_to_sub_intro,
  iris_c3_ev1_sub_to_middle_intro,
  iris_c3_ev1_sub_to_dom_intro,
  iris_c3_ev1_middle_to_sub_intro,
  iris_c3_ev1_middle_to_dom_intro,
  iris_c3_ev1_dom_to_middle_success,
  iris_c3_ev1_dom_to_middle_fail,
  iris_c3_ev1_dom_to_sub_success,
  iris_c3_ev1_dom_to_sub_fail,
  iris_c3_ev1_sub_to_middle_success,
  iris_c3_ev1_sub_to_middle_fail,
  iris_c3_ev1_sub_to_dom_success,
  iris_c3_ev1_sub_to_dom_fail,
  iris_c3_ev1_middle_to_sub_success,
  iris_c3_ev1_middle_to_sub_fail,
  iris_c3_ev1_middle_to_dom_success,
  iris_c3_ev1_middle_to_dom_fail,
  ...irisDomToMiddleQuiz,
  ...irisDomToSubQuiz,
  ...irisSubToMiddleQuiz,
  ...irisSubToDomQuiz,
  ...irisMiddleToSubQuiz,
  ...irisMiddleToDomQuiz,
};

export const irisEvent1Events: CharacterEvent[] = [
  {
    id: "iris_c3_ev1_dom_kissed_other",
    name: "After Velvet",
    description: "You and Iris talk after the nightclub date.",
    quest: {
      title: "After Velvet",
      description: "Catch up with Iris and define what comes next.",
    },
    priority: 145,
    repeatable: false,
    conditions: {
      requiredFlags: ["irisCh2Complete", "playerKissedAnotherGirl"],
      blockedByFlags: ["irisCh3Ev1_Done"],
      minDominance: 10,
      minAffection: 20,
    },
    dialogue: iris_c3_ev1_dom_start_kissed_other,
    rewards: {
      setFlags: ["irisCh3Ev1_Done", "irisC3PathOriginDom"],
    },
  },
  {
    id: "iris_c3_ev1_dom",
    name: "After Velvet",
    description: "You and Iris talk after the nightclub date.",
    quest: {
      title: "After Velvet",
      description: "Catch up with Iris and define what comes next.",
    },
    priority: 144,
    repeatable: false,
    conditions: {
      requiredFlags: ["irisCh2Complete"],
      blockedByFlags: ["irisCh3Ev1_Done", "playerKissedAnotherGirl"],
      minDominance: 10,
      minAffection: 20,
    },
    dialogue: iris_c3_ev1_dom_start,
    rewards: {
      setFlags: ["irisCh3Ev1_Done", "irisC3PathOriginDom"],
    },
  },
  {
    id: "iris_c3_ev1_sub_kissed_other",
    name: "After Velvet",
    description: "You and Iris talk after the nightclub date.",
    quest: {
      title: "After Velvet",
      description: "Catch up with Iris and define what comes next.",
    },
    priority: 145,
    repeatable: false,
    conditions: {
      requiredFlags: ["irisCh2Complete", "playerKissedAnotherGirl"],
      blockedByFlags: ["irisCh3Ev1_Done"],
      maxDominance: -10,
      minAffection: 20,
    },
    dialogue: iris_c3_ev1_sub_start_kissed_other,
    rewards: {
      setFlags: ["irisCh3Ev1_Done", "irisC3PathOriginSub"],
    },
  },
  {
    id: "iris_c3_ev1_sub",
    name: "After Velvet",
    description: "You and Iris talk after the nightclub date.",
    quest: {
      title: "After Velvet",
      description: "Catch up with Iris and define what comes next.",
    },
    priority: 144,
    repeatable: false,
    conditions: {
      requiredFlags: ["irisCh2Complete"],
      blockedByFlags: ["irisCh3Ev1_Done", "playerKissedAnotherGirl"],
      maxDominance: -10,
      minAffection: 20,
    },
    dialogue: iris_c3_ev1_sub_start,
    rewards: {
      setFlags: ["irisCh3Ev1_Done", "irisC3PathOriginSub"],
    },
  },
  {
    id: "iris_c3_ev1_middle_kissed_other",
    name: "After Velvet",
    description: "You and Iris talk after the nightclub date.",
    quest: {
      title: "After Velvet",
      description: "Catch up with Iris and define what comes next.",
    },
    priority: 145,
    repeatable: false,
    conditions: {
      requiredFlags: ["irisCh2Complete", "playerKissedAnotherGirl"],
      blockedByFlags: ["irisCh3Ev1_Done"],
      minDominance: -9,
      maxDominance: 9,
      minAffection: 20,
    },
    dialogue: iris_c3_ev1_middle_start_kissed_other,
    rewards: {
      setFlags: ["irisCh3Ev1_Done", "irisC3PathOriginMiddle"],
    },
  },
  {
    id: "iris_c3_ev1_middle",
    name: "After Velvet",
    description: "You and Iris talk after the nightclub date.",
    quest: {
      title: "After Velvet",
      description: "Catch up with Iris and define what comes next.",
    },
    priority: 144,
    repeatable: false,
    conditions: {
      requiredFlags: ["irisCh2Complete"],
      blockedByFlags: ["irisCh3Ev1_Done", "playerKissedAnotherGirl"],
      minDominance: -9,
      maxDominance: 9,
      minAffection: 20,
    },
    dialogue: iris_c3_ev1_middle_start,
    rewards: {
      setFlags: ["irisCh3Ev1_Done", "irisC3PathOriginMiddle"],
    },
  },
];

