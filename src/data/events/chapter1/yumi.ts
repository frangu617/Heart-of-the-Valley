import { CharacterEvent } from "./types";

export const yumiEvents: CharacterEvent[] = [
  {
    id: "yumi_tutor_request_event",
    name: "Tutor Request",
    description: "Yumi asks for extra tutoring after class.",
    priority: 240,
    repeatable: false,
    conditions: {
      minAffection: 0,
      minTrust: 0,
      minHour: 0,
      maxHour: 24,
      requiredLocation: "Classroom",
    },
    dialogue: {
      id: "yumi_tutor_request_event",
      lines: [
        {
          speaker: null,
          text: "The first lecture of the semester finally winds down.",
        },
        {
          speaker: null,
          text: "You shut down the projector. The room, which was buzzing with nervous energy an hour ago, is now empty.",
        },
        {
          speaker: null,
          text: "You start packing your laptop into your bag, ready to head back to your office.",
        },
        {
          speaker: null,
          text: "A timid voice breaks the silence. \"Excuse me? Professor?\"",
        },
        {
          speaker: null,
          text: "You look up. There is still one student left.",
        },
        {
          speaker: null,
          text: "She's standing near the front row, holding a notebook close to her chest.",
        },
        { speaker: "You", text: "Yes? Can I help you with something?" },
        {
          speaker: "Yumi",
          text: "I'm Yumi. I just wanted to introduce myself since I'll be in your class this semester.",
          expression: "happy",
        },
        {
          speaker: "You",
          text: "Nice to meet you, Yumi. I'm {playerName}. Did everything make sense today? I know the syllabus review can be a bit boring.",
        },
        {
          speaker: "Yumi",
          text: "Oh, no! It wasn't boring at all.",
          expression: "happy",
        },
        {
          speaker: null,
          text: "She steps a little closer, her eyes bright with admiration.",
        },
        {
          speaker: "Yumi",
          text: "When you started talking about the core concept, you made it sound so simple. Like it was a language you speak fluently.",
          expression: "excited",
        },
        {
          speaker: "Yumi",
          text: "I've had other teachers before, but they just read from the book. You actually sound like a real pro. Like you've lived it.",
          expression: "excited",
        },
        {
          speaker: "You",
          text: "Well... I spent a lot of time in the trenches before I started teaching. Old habits die hard.",
        },
        {
          speaker: "Yumi",
          text: "That's exactly what I want to be.",
          expression: "neutral",
        },
        {
          speaker: null,
          text: "Her expression turns serious, determined.",
        },
        {
          speaker: "Yumi",
          text: "I want to be that good one day. I want to be able to just look at a problem and know the answer, like you do.",
          expression: "neutral",
        },
        {
          speaker: "You",
          text: "It just takes practice, Yumi. And a lot of late nights.",
        },
        {
          speaker: "Yumi",
          text: "I know. And I'm willing to work hard.",
          expression: "shy",
        },
        {
          speaker: null,
          text: "She hesitates, shifting her weight. The confidence wavers just a little.",
        },
        {
          speaker: "Yumi",
          text: "But... I also know I'm a little slower than some of the other students. Sometimes I get stuck on the basics.",
          expression: "shy",
        },
        {
          speaker: "Yumi",
          text: "I really don't want to fall behind. I want to be the best in the class.",
          expression: "shy",
        },
        {
          speaker: "Yumi",
          text: "I was wondering... if you had any office hours? Or maybe... if you could help me with some extra tutoring?",
          expression: "shy",
        },
        {
          speaker: null,
          text: "She seems genuinely motivated. It's rare to see a student this enthusiastic on day one.",
        },
        {
          speaker: "You",
          text: "What do you tell her?",
          choices: [
            {
              text: "Tell her to stick to regular office hours.",
              affectionChange: 1,
              nextDialogueId: "yumi_tutor_request_office_hours",
            },
            {
              text: "Offer her private tutoring.",
              affectionChange: 3,
              nextDialogueId: "yumi_tutor_request_private",
            },
          ],
        },
      ],
    },
    rewards: {
      setFlags: ["hasMetYumi"],
      unlockCharacters: ["Yumi"],
    },
  },
  {
    id: "yumi_private_tutoring_event",
    name: "First Tutoring Session",
    description: "Yumi arrives for one-on-one tutoring in your office.",
    priority: 230,
    repeatable: false,
    conditions: {
      minAffection: 5,
      minTrust: 0,
      minHour: 0,
      maxHour: 24,
      requiredLocation: "Office",
      requiredPreviousEvents: ["yumi_tutor_request_event"],
    },
    dialogue: {
      id: "yumi_private_tutoring_event",
      lines: [
        {
          speaker: null,
          text: "Yumi arrives on time, though she hesitates for a second before knocking. She seems eager to learn but nervous about the one-on-one setting.",
        },
        {
          speaker: "Yumi",
          text: "I'm ready, Professor. I brought the assignment.",
          expression: "happy",
        },
        {
          speaker: "You",
          text: "Have a seat. Let's see where you're getting stuck.",
        },
        {
          speaker: null,
          text: "She pulls up a chair and opens her laptop. You lean in, scanning the work she's done so far.",
        },
        {
          speaker: "You",
          text: "I see what you're doing here. You're trying to force the solution, and it's making the code messy.",
        },
        {
          speaker: null,
          text: "She shrinks back slightly, looking worried that she's already failing.",
        },
        {
          speaker: "You",
          text: "How do you correct her?",
          choices: [
            {
              text: "Be gentle and encouraging (Nice Teacher)",
              affectionChange: 2,
              nextDialogueId: "yumi_tutor1_gentle",
            },
            {
              text: "Be stern and critical (Mean Teacher)",
              affectionChange: -1,
              nextDialogueId: "yumi_tutor1_stern",
            },
          ],
        },
      ],
    },
    rewards: {
      playerMoney: 15,
      playerStats: {
        intelligence: 1,
      },
    },
  },
  {
    id: "yumi_tutoring_event_2_dom",
    name: "Tutoring, Round Two (Teasing)",
    description: "Yumi pushes your boundaries during a late session.",
    priority: 220,
    repeatable: false,
    conditions: {
      minAffection: 10,
      minTrust: 0,
      minHour: 0,
      maxHour: 24,
      requiredLocation: "Office",
      requiredPreviousEvents: ["yumi_private_tutoring_event"],
      requiredFlags: ["yumiDomPath"],
    },
    dialogue: {
      id: "yumi_tutoring_event_2_dom",
      lines: [
        {
          speaker: null,
          text: "It's late afternoon. The hallway outside is quiet, most of the faculty having gone home for the day.",
        },
        {
          speaker: null,
          text: "You hear a soft knock, and before you can even answer, the door opens.",
        },
        {
          speaker: "Yumi",
          text: "Hi, Professor. Ready for round two?",
          expression: "happy",
        },
        {
          speaker: null,
          text: "Yumi slips inside. There's a faint, alluring scent clinging to her--something new.",
        },
        {
          speaker: null,
          text: "She locks the door behind her with a definitive click.",
        },
        {
          speaker: "You",
          text: "You're eager today, Yumi. Did you bring the new assignment?",
        },
        {
          speaker: "Yumi",
          text: "I did. But I think I messed up the logic again.",
          expression: "neutral",
        },
        {
          speaker: null,
          text: "She walks over to your desk. Instead of pulling up the chair across from you like last time, she stands right next to your chair.",
        },
        { speaker: "You", text: "Do you want to pull up a seat?" },
        {
          speaker: "Yumi",
          text: "It's okay. I can see better from here.",
          expression: "neutral",
        },
        {
          speaker: null,
          text: "She leans over your shoulder to place her laptop on your desk. She is close. You can feel the warmth radiating from her arm, and a lock of her hair brushes against your sleeve.",
        },
        {
          speaker: "Yumi",
          text: "See? This section. The logic is flawed.",
          expression: "neutral",
        },
        {
          speaker: null,
          text: "You try to focus on the code, but her proximity is distracting. She isn't pulling away.",
        },
        {
          speaker: "Yumi",
          text: "I bet you don't let other students get this close to your work.",
          expression: "happy",
        },
        {
          speaker: null,
          text: "She turns her head, looking at you through her lashes with a confident, challenging grin.",
        },
        {
          speaker: "Yumi",
          text: "I feel like I'm getting special treatment. Am I?",
          expression: "happy",
        },
        {
          speaker: "You",
          text: "How do you respond?",
          choices: [
            {
              text: "Play along (Flirt back).",
              affectionChange: 3,
              nextDialogueId: "yumi_tutor2_dom_play",
            },
            {
              text: "Establish boundaries (Professional).",
              affectionChange: -1,
              nextDialogueId: "yumi_tutor2_dom_boundaries",
            },
          ],
        },
      ],
    },
    rewards: {
      playerMoney: 15,
      playerStats: {
        intelligence: 1,
      },
    },
  },
  {
    id: "yumi_tutoring_event_2_sub",
    name: "Tutoring, Round Two (Seeking Praise)",
    description: "Yumi looks for approval during a late session.",
    priority: 220,
    repeatable: false,
    conditions: {
      minAffection: 10,
      minTrust: 0,
      minHour: 0,
      maxHour: 24,
      requiredLocation: "Office",
      requiredPreviousEvents: ["yumi_private_tutoring_event"],
      requiredFlags: ["yumiSubPath"],
    },
    dialogue: {
      id: "yumi_tutoring_event_2_sub",
      lines: [
        {
          speaker: null,
          text: "It's late afternoon. The hallway outside is quiet, most of the faculty having gone home for the day.",
        },
        {
          speaker: null,
          text: "You hear a soft knock, and before you can even answer, the door opens.",
        },
        {
          speaker: "Yumi",
          text: "Hi, Professor. Ready for round two?",
          expression: "shy",
        },
        {
          speaker: null,
          text: "Yumi slips inside. There's a faint, alluring scent clinging to her--something new.",
        },
        {
          speaker: null,
          text: "She locks the door behind her with a definitive click.",
        },
        {
          speaker: "You",
          text: "You're eager today, Yumi. Did you bring the new assignment?",
        },
        {
          speaker: "Yumi",
          text: "I did. But I think I messed up the logic again.",
          expression: "shy",
        },
        {
          speaker: null,
          text: "She walks over to your desk. Instead of pulling up the chair across from you like last time, she stands right next to your chair.",
        },
        { speaker: "You", text: "Do you want to pull up a seat?" },
        {
          speaker: "Yumi",
          text: "It's okay. I can see better from here.",
          expression: "shy",
        },
        {
          speaker: null,
          text: "She leans over your shoulder to place her laptop on your desk. She is close. You can feel the warmth radiating from her arm, and a lock of her hair brushes against your sleeve.",
        },
        {
          speaker: "Yumi",
          text: "See? This section. The logic is flawed.",
          expression: "shy",
        },
        {
          speaker: null,
          text: "You try to focus on the code, but her proximity is distracting. She isn't pulling away.",
        },
        {
          speaker: "Yumi",
          text: "I really focused this time. I checked it three times before I came in.",
          expression: "shy",
        },
        {
          speaker: null,
          text: "She shifts her weight, her hip bumping gently against your shoulder. She doesn't pull away, as if she's waiting to see if you'll allow it.",
        },
        {
          speaker: "Yumi",
          text: "I want to be a good student for you, Professor. Am I doing okay?",
          expression: "shy",
        },
        {
          speaker: "You",
          text: "How do you respond?",
          choices: [
            {
              text: "Praise her (You take the lead).",
              affectionChange: 3,
              nextDialogueId: "yumi_tutor2_sub_praise",
            },
            {
              text: "Correct her posture (Stern/Professional).",
              affectionChange: -1,
              nextDialogueId: "yumi_tutor2_sub_correct",
            },
          ],
        },
      ],
    },
    rewards: {
      playerMoney: 15,
      playerStats: {
        intelligence: 1,
      },
    },
  },
  {
    id: "yumi_classroom_flirt_dom",
    name: "Classroom Flirt (Bold)",
    description: "Yumi flirts openly after class.",
    priority: 210,
    repeatable: false,
    conditions: {
      minAffection: 15,
      minTrust: 0,
      minHour: 0,
      maxHour: 24,
      requiredLocation: "Classroom",
      requiredPreviousEvents: ["yumi_tutoring_event_2_dom"],
      requiredFlags: ["yumiDomPath"],
    },
    dialogue: {
      id: "yumi_classroom_flirt_dom",
      lines: [
        {
          speaker: null,
          text: "The lecture is over. The students have filed out, leaving the room in a sudden, heavy silence.",
        },
        {
          speaker: null,
          text: "You are at the whiteboard, erasing a complex logic diagram.",
        },
        {
          speaker: null,
          text: "You put the eraser down and turn around, dusting the chalk from your hands.",
        },
        {
          speaker: null,
          text: "You aren't alone. Yumi is still there, leaning against the front row desk, watching you.",
        },
        {
          speaker: "Yumi",
          text: "You work too hard, Professor. You look tense.",
          expression: "happy",
        },
        {
          speaker: "You",
          text: "It comes with the territory, Yumi. Did you have a question?",
        },
        {
          speaker: null,
          text: "She pushes off the desk and walks right up to the podium. She enters your personal space without hesitation.",
        },
        {
          speaker: "Yumi",
          text: "No question. I just noticed something.",
          expression: "happy",
        },
        {
          speaker: null,
          text: "She reaches out. For a split second, you think she's going to hit you, but her hand lands softly on your lapel.",
        },
        {
          speaker: "Yumi",
          text: "You have marker dust right here. It looks messy.",
          expression: "happy",
        },
        {
          speaker: null,
          text: "She brushes her hand against your chest--slowly. It's not really a cleaning motion; it's a caress disguised as helpfulness.",
        },
        { speaker: "You", text: "Yumi..." },
        {
          speaker: "Yumi",
          text: "I like a man who takes care of his appearance. You should let me look after you more often.",
          expression: "happy",
        },
        {
          speaker: "Yumi",
          text: "I'm very detail-oriented. I notice things other girls miss.",
          expression: "happy",
        },
        {
          speaker: "You",
          text: "How do you respond to her boldness?",
          choices: [
            {
              text: "Let her continue (Enjoy it).",
              affectionChange: 2,
              nextDialogueId: "yumi_classroom_flirt_dom_enjoy",
            },
            {
              text: "Check her behavior (Tease back).",
              affectionChange: 3,
              nextDialogueId: "yumi_classroom_flirt_dom_tease",
            },
          ],
        },
      ],
    },
  },
  {
    id: "yumi_classroom_flirt_sub",
    name: "Classroom Flirt (Shy)",
    description: "You tease a shy Yumi after class.",
    priority: 210,
    repeatable: false,
    conditions: {
      minAffection: 15,
      minTrust: 0,
      minHour: 0,
      maxHour: 24,
      requiredLocation: "Classroom",
      requiredPreviousEvents: ["yumi_tutoring_event_2_sub"],
      requiredFlags: ["yumiSubPath"],
    },
    dialogue: {
      id: "yumi_classroom_flirt_sub",
      lines: [
        {
          speaker: null,
          text: "The lecture is over. The students have filed out, leaving the room in a sudden, heavy silence.",
        },
        {
          speaker: null,
          text: "You are at the whiteboard, erasing a complex logic diagram.",
        },
        {
          speaker: null,
          text: "You put the eraser down and turn around, dusting the chalk from your hands.",
        },
        {
          speaker: null,
          text: "You aren't alone. Yumi is still there, packing her bag slowly and glancing at you every few seconds.",
        },
        {
          speaker: "You",
          text: "Yumi?",
        },
        {
          speaker: "Yumi",
          text: "Oh! Yes, Professor? I was just leaving! I didn't mean to loiter.",
          expression: "shy",
        },
        {
          speaker: "You",
          text: "You're fine. Actually, hold still for a second.",
        },
        {
          speaker: "Yumi",
          text: "H-hold still?",
          expression: "shy",
        },
        {
          speaker: null,
          text: "You step into her personal space. She freezes, her eyes going wide, her breath hitching in her throat.",
        },
        {
          speaker: null,
          text: "You reach out and gently brush a stray lock of hair behind her ear. Your fingers linger near her cheek for just a moment longer than necessary.",
        },
        { speaker: "You", text: "There. Your hair was in your eyes." },
        {
          speaker: null,
          text: "Her face turns a brilliant shade of crimson. She leans into your touch instinctively before realizing what she's doing.",
        },
        {
          speaker: "Yumi",
          text: "Oh... I... thank you.",
          expression: "shy",
        },
        {
          speaker: "You",
          text: "What do you do?",
          choices: [
            {
              text: "Push it a little further.",
              affectionChange: 3,
              nextDialogueId: "yumi_classroom_flirt_sub_push",
            },
            {
              text: "Keep it sweet.",
              affectionChange: 2,
              nextDialogueId: "yumi_classroom_flirt_sub_sweet",
            },
          ],
        },
      ],
    },
  },
  {
    id: "yumi_chapter_1_finale_dom",
    name: "Chapter 1 Finale (Teasing Yumi)",
    description: "A rainy office confession turns into a kiss.",
    priority: 200,
    repeatable: false,
    conditions: {
      minAffection: 20,
      minTrust: 0,
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
  },
  {
    id: "yumi_chapter_1_finale_sub",
    name: "Chapter 1 Finale (Gentle Yumi)",
    description: "A rainy office night turns tender.",
    priority: 200,
    repeatable: false,
    conditions: {
      minAffection: 20,
      minTrust: 0,
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
  },
];
