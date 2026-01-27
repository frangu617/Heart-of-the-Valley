import type { Dialogue } from "../../dialogues";
import { CharacterEvent } from "../types";

const yumiTutorRequestOfficeHours: Dialogue = {
  id: "yumi_tutor_request_office_hours",
  lines: [
    {
      speaker: "You",
      text: "I appreciate the enthusiasm, Yumi. It's good to see.",
    },
    {
      speaker: "You",
      text: "My office hours are listed on the syllabus. If you get stuck, just drop by then.",
    },
    {
      speaker: null,
      text: "She looks a little disappointed she didn't get a more personal commitment, but she nods politely.",
    },
    {
      speaker: "Yumi",
      text: "Oh. Okay. I'll make sure to check the schedule.",
      expression: "sad",
    },
    {
      speaker: "You",
      text: "Don't worry. If you work hard, you'll do fine.",
    },
    {
      speaker: "Yumi",
      text: "Right. Thank you, Professor. Welcome to the school.",
      expression: "sad",
    },
    {
      speaker: null,
      text: "She gives you a small bow and heads out the door.",
    },
  ],
};

const yumiTutorRequestPrivate: Dialogue = {
  id: "yumi_tutor_request_private",
  lines: [
    {
      speaker: "You",
      text: "You know, it's rare to see someone who actually wants to learn the craft, not just pass the test.",
    },
    {
      speaker: "You",
      text: "If you're really serious about becoming a pro, I can help you out.",
    },
    {
      speaker: "You",
      text: "I can set aside some time for one-on-one tutoring in my office so you stay ahead of the curve.",
    },
    {
      speaker: "Yumi",
      text: "Really? You'd do that? That would be amazing!",
      expression: "happy",
    },
    {
      speaker: null,
      text: "Her face lights up completely.",
    },
    {
      speaker: "You",
      text: "Just bring your notes and come by my office whenever you're free.",
    },
    {
      speaker: "Yumi",
      text: "I will! Thank you so much, Professor.",
      expression: "shy",
    },
    {
      speaker: null,
      text: "She beams at you, looking genuinely happy.",
    },
    {
      speaker: "Yumi",
      text: "I promise I won't waste your time. I'm going to be your best student.",
      expression: "happy",
    },
    {
      speaker: null,
      text: "She walks out of the classroom with a bounce in her step, clutching her notebook like it's a prize.",
    },
    {
      speaker: null,
      text: "She seems like a good kid. Hopefully, she keeps that energy up for the rest of the semester.",
    },
  ],
};

const yumiTutor1Gentle: Dialogue = {
  id: "yumi_tutor1_gentle",
  lines: [
    {
      speaker: "You",
      text: "Hey, don't panic. It's a common mistake. You're just overthinking it.",
    },
    {
      speaker: "You",
      text: "Think of it like writing a rough draft. You got the ideas down, now we just need to polish it.",
    },
    {
      speaker: "Yumi",
      text: "Oh. Okay. A rough draft. That makes me feel better.",
      expression: "shy",
    },
    {
      speaker: null,
      text: "She relaxes, her shoulders dropping. She smiles at you, feeling safe to make mistakes.",
    },
    {
      speaker: "Yumi",
      text: "So... how do we polish it?",
      expression: "shy",
    },
    {
      speaker: "You",
      text: "Look at this section here. If we simplify this logic, everything else falls into place.",
    },
    {
      speaker: null,
      text: "She nods intently, wiping away her earlier hesitation. She leans over the keyboard.",
    },
    {
      speaker: "Yumi",
      text: "Okay. I think I see it. I just need to move this...",
      expression: "neutral",
    },
    {
      speaker: null,
      text: "She starts typing. It's instantaneous. Her fingers fly across the keys in a rhythmic blur.",
    },
    {
      speaker: null,
      text: "She isn't hunting and pecking; she's executing commands with the muscle memory of someone who lives on a computer.",
    },
    { speaker: "You", text: "You're surprisingly fast." },
    {
      speaker: "Yumi",
      text: "Gotta go fast, right? Efficiency.",
      expression: "neutral",
    },
    { speaker: "You", text: "It's fine. Just... impressive." },
    {
      speaker: null,
      text: "The session continues for another twenty minutes until the code finally runs clean.",
    },
    {
      speaker: "Yumi",
      text: "It worked! It's running!",
      expression: "excited",
    },
    {
      speaker: null,
      text: "She throws her hands up, almost doing a victory pose before remembering where she is.",
    },
    {
      speaker: "Yumi",
      text: "I mean... good. That is... acceptable.",
      expression: "shy",
    },
    { speaker: "You", text: "You did good work today, Yumi." },
    {
      speaker: null,
      text: "She beams, closing her laptop with a satisfying snap.",
    },
    {
      speaker: "Yumi",
      text: "Thanks, Professor! I knew I could get it. I just needed a little backup.",
      expression: "happy",
    },
    {
      speaker: null,
      text: "She packs up her things and leaves. You have a feeling she's going to be a regular in your office.",
    },
    {
      speaker: null,
      text: "You finish the session and get back to work.",
      choices: [
        {
          text: "Wrap up for today",
          affectionChange: 0,
          setFlags: ["yumiDomPath"],
        },
      ],
    },
  ],
};

const yumiTutor1Stern: Dialogue = {
  id: "yumi_tutor1_stern",
  lines: [
    {
      speaker: "You",
      text: "Yumi, this is inefficient. You're cluttering the whole thing.",
    },
    {
      speaker: "You",
      text: "If you want to be a professional, you can't write sloppy code like this. You need to focus.",
    },
    {
      speaker: "Yumi",
      text: "I... I'm sorry. I didn't realize it was that bad.",
      expression: "sad",
    },
    {
      speaker: null,
      text: "She looks down at her lap, her face flushing with embarrassment. She seems smaller, more meek.",
    },
    {
      speaker: "Yumi",
      text: "I'll fix it. Just tell me what to do.",
      expression: "sad",
    },
    {
      speaker: "You",
      text: "Look at this section here. If we simplify this logic, everything else falls into place.",
    },
    {
      speaker: null,
      text: "She nods intently, wiping away her earlier hesitation. She leans over the keyboard.",
    },
    {
      speaker: "Yumi",
      text: "Okay. I think I see it. I just need to move this...",
      expression: "neutral",
    },
    {
      speaker: null,
      text: "She starts typing. It's instantaneous. Her fingers fly across the keys in a rhythmic blur.",
    },
    {
      speaker: null,
      text: "She isn't hunting and pecking; she's executing commands with the muscle memory of someone who lives on a computer.",
    },
    { speaker: "You", text: "You're surprisingly fast." },
    {
      speaker: "Yumi",
      text: "S-sorry! Is it too loud? I can type softer!",
      expression: "shy",
    },
    { speaker: "You", text: "It's fine. Just... impressive." },
    {
      speaker: null,
      text: "The session continues for another twenty minutes until the code finally runs clean.",
    },
    {
      speaker: "Yumi",
      text: "It worked! It's running!",
      expression: "excited",
    },
    {
      speaker: null,
      text: "She throws her hands up, almost doing a victory pose before remembering where she is.",
    },
    {
      speaker: "Yumi",
      text: "I mean... good. That is... acceptable.",
      expression: "shy",
    },
    { speaker: "You", text: "You did good work today, Yumi." },
    {
      speaker: null,
      text: "She offers a small, obedient bow from her chair.",
    },
    {
      speaker: "Yumi",
      text: "Thank you, Professor. I'll try to be less sloppy next time. I promise.",
      expression: "shy",
    },
    {
      speaker: null,
      text: "She packs up her things and leaves. You have a feeling she's going to be a regular in your office.",
    },
    {
      speaker: null,
      text: "You finish the session and get back to work.",
      choices: [
        {
          text: "Wrap up for today",
          affectionChange: 0,
          setFlags: ["yumiSubPath"],
        },
      ],
    },
  ],
};

const yumiTutor2DomPlay: Dialogue = {
  id: "yumi_tutor2_dom_play",
  lines: [
    {
      speaker: "You",
      text: "Well, maybe you are. You're certainly the only one bold enough to invade my personal space like this.",
    },
    {
      speaker: null,
      text: "You turn your chair slightly to face her, meeting her challenge head-on.",
    },
    {
      speaker: "Yumi",
      text: "Good. I like being special. It motivates me to work harder.",
      expression: "happy",
    },
    {
      speaker: "Yumi",
      text: "Maybe if I get an A on this assignment, you can show me what other special privileges I get?",
      expression: "happy",
    },
    { speaker: "You", text: "Focus on the code first, Yumi." },
    { speaker: "Yumi", text: "Fine. But I'm holding you to that.", expression: "happy" },
    {
      speaker: "You",
      text: "Anyway, let's fix this last error. You need a clean check here, not a quick hack.",
    },
    {
      speaker: null,
      text: "Yumi leans over to type the fix. Her hands move quickly, but her mood has clearly shifted based on your earlier reaction.",
    },
    { speaker: "Yumi", text: "Fixed. It's running now.", expression: "happy" },
    { speaker: "You", text: "Good work. You're improving fast." },
    {
      speaker: "Yumi",
      text: "Thanks to you. I wouldn't be able to do this alone.",
      expression: "happy",
    },
    {
      speaker: null,
      text: "She packs up her laptop. Before she leaves, she pauses at the door.",
    },
    {
      speaker: "Yumi",
      text: "See you in class, Professor. Try not to miss me too much.",
      expression: "happy",
    },
    { speaker: null, text: "She winks, then slips out the door." },
    {
      speaker: null,
      text: "You settle back into your chair, replaying the moment.",
      choices: [
        { text: "Wrap up for today", affectionChange: 5 },
      ],
    },
  ],
};

const yumiTutor2DomBoundaries: Dialogue = {
  id: "yumi_tutor2_dom_boundaries",
  lines: [
    {
      speaker: "You",
      text: "Yumi, you're crowding me. I can't grade if you're hovering.",
    },
    {
      speaker: null,
      text: "You slide your chair back, creating a deliberate gap between you two.",
    },
    {
      speaker: "Yumi",
      text: "Okay, okay. Message received. Just checking if you were paying attention.",
      expression: "neutral",
    },
    { speaker: "You", text: "I'm always paying attention. Now look at the screen." },
    { speaker: "Yumi", text: "Right. The screen.", expression: "neutral" },
    {
      speaker: "You",
      text: "Anyway, let's fix this last error. You need a clean check here, not a quick hack.",
    },
    {
      speaker: null,
      text: "Yumi leans over to type the fix. Her hands move quickly, but her mood has clearly shifted based on your earlier reaction.",
    },
    { speaker: "Yumi", text: "Fixed. It's running now.", expression: "happy" },
    { speaker: "You", text: "Good work. You're improving fast." },
    {
      speaker: "Yumi",
      text: "Thanks to you. I wouldn't be able to do this alone.",
      expression: "happy",
    },
    {
      speaker: null,
      text: "She packs up her laptop. Before she leaves, she pauses at the door.",
    },
    {
      speaker: "Yumi",
      text: "See you in class, Professor. Try not to miss me too much.",
      expression: "happy",
    },
    { speaker: null, text: "She winks, then slips out the door." },
    {
      speaker: null,
      text: "You settle back into your chair, replaying the moment.",
      choices: [
        { text: "Wrap up for today", affectionChange: 5 },
      ],
    },
  ],
};

const yumiTutor2SubPraise: Dialogue = {
  id: "yumi_tutor2_sub_praise",
  lines: [
    { speaker: "You", text: "You're doing very well, Yumi." },
    {
      speaker: null,
      text: "You don't move away. Instead, you lean back, letting your arm rest against hers.",
    },
    {
      speaker: "You",
      text: "You're smart, obedient, and you listen to instructions. That's a rare combination.",
    },
    {
      speaker: null,
      text: "Her face turns a bright shade of red. She looks down, biting her lip, clearly enjoying the praise.",
    },
    {
      speaker: "Yumi",
      text: "Thank you... I... I really like hearing you say that.",
      expression: "shy",
    },
    {
      speaker: "Yumi",
      text: "I'll keep being good. I promise. Just tell me what you need me to do.",
      expression: "shy",
    },
    {
      speaker: "You",
      text: "Anyway, let's fix this last error. You need a clean check here, not a quick hack.",
    },
    {
      speaker: null,
      text: "Yumi leans over to type the fix. Her hands move quickly, but her mood has clearly shifted based on your earlier reaction.",
    },
    { speaker: "Yumi", text: "Fixed. It's running now.", expression: "happy" },
    { speaker: "You", text: "Good work. You're improving fast." },
    {
      speaker: "Yumi",
      text: "Thanks to you. I wouldn't be able to do this alone.",
      expression: "happy",
    },
    {
      speaker: null,
      text: "She packs up her laptop. Before she leaves, she pauses at the door.",
    },
    {
      speaker: "Yumi",
      text: "I'll study hard for the next one. I won't let you down.",
      expression: "shy",
    },
    { speaker: null, text: "She gives a small, respectful bow before quietly leaving the room." },
    {
      speaker: null,
      text: "You settle back into your chair, replaying the moment.",
      choices: [
        { text: "Wrap up for today", affectionChange: 5 },
      ],
    },
  ],
};

const yumiTutor2SubCorrect: Dialogue = {
  id: "yumi_tutor2_sub_correct",
  lines: [
    {
      speaker: "You",
      text: "You're doing fine, but you're too close. Take a step back so we can focus.",
    },
    {
      speaker: null,
      text: "She flinches as if you scolded her. She immediately steps back, clasping her hands behind her back.",
    },
    {
      speaker: "Yumi",
      text: "I'm sorry! I didn't mean to... I'll stand here. Sorry.",
      expression: "sad",
    },
    { speaker: "You", text: "It's fine. Just pay attention to the logic." },
    { speaker: "Yumi", text: "Yes, sir.", expression: "sad" },
    {
      speaker: "You",
      text: "Anyway, let's fix this last error. You need a clean check here, not a quick hack.",
    },
    {
      speaker: null,
      text: "Yumi leans over to type the fix. Her hands move quickly, but her mood has clearly shifted based on your earlier reaction.",
    },
    { speaker: "Yumi", text: "Fixed. It's running now.", expression: "happy" },
    { speaker: "You", text: "Good work. You're improving fast." },
    {
      speaker: "Yumi",
      text: "Thanks to you. I wouldn't be able to do this alone.",
      expression: "happy",
    },
    {
      speaker: null,
      text: "She packs up her laptop. Before she leaves, she pauses at the door.",
    },
    {
      speaker: "Yumi",
      text: "I'll study hard for the next one. I won't let you down.",
      expression: "shy",
    },
    { speaker: null, text: "She gives a small, respectful bow before quietly leaving the room." },
    {
      speaker: null,
      text: "You settle back into your chair, replaying the moment.",
      choices: [
        { text: "Wrap up for today", affectionChange: 5 },
      ],
    },
  ],
};

const yumiClassroomFlirtDomEnjoy: Dialogue = {
  id: "yumi_classroom_flirt_dom_enjoy",
  lines: [
    { speaker: "You", text: "Is that so? And what else do you notice?" },
    {
      speaker: null,
      text: "You don't move away. You let her hand linger on your chest.",
    },
    {
      speaker: null,
      text: "Yumi's smile widens. She traces the line of your collar with her thumb.",
    },
    { speaker: "Yumi", text: "I notice that you're not stopping me.", expression: "happy" },
    {
      speaker: "Yumi",
      text: "Maybe I should stay after class more often. Help you... decompress.",
      expression: "happy",
    },
    {
      speaker: null,
      text: "She finally steps back, smoothing her own skirt, looking thoroughly pleased with herself.",
    },
    {
      speaker: "Yumi",
      text: "Get some rest, Professor. You look better when you're not frowning.",
      expression: "happy",
    },
    {
      speaker: null,
      text: "Yumi walks to the door with a sway in her hips, looking back once to make sure you're watching her leave.",
    },
    {
      speaker: null,
      text: "That girl is going to be the death of my tenure if I'm not careful.",
    },
    {
      speaker: null,
      text: "You gather your notes and head out.",
      choices: [
        { text: "Wrap up for today", affectionChange: 5 },
      ],
    },
  ],
};

const yumiClassroomFlirtDomTease: Dialogue = {
  id: "yumi_classroom_flirt_dom_tease",
  lines: [
    {
      speaker: "You",
      text: "Careful, Yumi. People might think you're teacher's pet.",
    },
    {
      speaker: null,
      text: "You catch her hand gently by the wrist, stopping her motion but holding her gaze.",
    },
    {
      speaker: "Yumi",
      text: "Oh, Professor. I aim much higher than pet.",
      expression: "happy",
    },
    {
      speaker: null,
      text: "She finally steps back, smoothing her own skirt, looking thoroughly pleased with herself.",
    },
    {
      speaker: "Yumi",
      text: "Get some rest, Professor. You look better when you're not frowning.",
      expression: "happy",
    },
    {
      speaker: null,
      text: "Yumi walks to the door with a sway in her hips, looking back once to make sure you're watching her leave.",
    },
    {
      speaker: null,
      text: "That girl is going to be the death of my tenure if I'm not careful.",
    },
    {
      speaker: null,
      text: "You gather your notes and head out.",
      choices: [
        { text: "Wrap up for today", affectionChange: 5 },
      ],
    },
  ],
};

const yumiClassroomFlirtSubPush: Dialogue = {
  id: "yumi_classroom_flirt_sub_push",
  lines: [
    {
      speaker: "You",
      text: "You were very focused today. I caught you staring at me quite a few times.",
    },
    { speaker: "You", text: "I didn't mind it." },
    {
      speaker: "Yumi",
      text: "I-I wasn't staring! I mean... I was looking at the board! Mostly!",
      expression: "shy",
    },
    {
      speaker: null,
      text: "She looks down, fidgeting with her hands, clearly happy that you noticed her.",
    },
    {
      speaker: "Yumi",
      text: "I just... like listening to you talk.",
      expression: "shy",
    },
    {
      speaker: null,
      text: "She grabs her bag, looking like she might faint from the attention.",
    },
    {
      speaker: "Yumi",
      text: "I... I should go! Before I miss my... bus! Train! Walking!",
      expression: "shy",
    },
    {
      speaker: null,
      text: "Yumi hurries out of the room, looking back once with a shy, beaming smile before disappearing into the hallway.",
    },
    {
      speaker: null,
      text: "That girl is going to be the death of my tenure if I'm not careful.",
    },
    {
      speaker: null,
      text: "You gather your notes and head out.",
      choices: [
        { text: "Wrap up for today", affectionChange: 5 },
      ],
    },
  ],
};

const yumiClassroomFlirtSubSweet: Dialogue = {
  id: "yumi_classroom_flirt_sub_sweet",
  lines: [
    {
      speaker: "You",
      text: "You look nice today, Yumi. The color suits you.",
    },
    {
      speaker: "Yumi",
      text: "Th-thank you, Professor! I... I tried to dress up a little.",
      expression: "shy",
    },
    {
      speaker: null,
      text: "She grabs her bag, looking like she might faint from the attention.",
    },
    {
      speaker: "Yumi",
      text: "I... I should go! Before I miss my... bus! Train! Walking!",
      expression: "shy",
    },
    {
      speaker: null,
      text: "Yumi hurries out of the room, looking back once with a shy, beaming smile before disappearing into the hallway.",
    },
    {
      speaker: null,
      text: "That girl is going to be the death of my tenure if I'm not careful.",
    },
    {
      speaker: null,
      text: "You gather your notes and head out.",
      choices: [
        { text: "Wrap up for today", affectionChange: 5 },
      ],
    },
  ],
};

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
      text: "I'm going to kiss you now. And you aren't going to stop me.",
      expression: "angry",
    },
    {
      speaker: null,
      text: "She smashes her lips against yours. It's forceful, messy, and desperate.",
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
      text: "She struts out of the office, swinging her hips, leaving you sitting there with lipstick on your face.",
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
      text: "She basically runs out of the room, tripping slightly over the doorframe in her haste.",
    },
    { speaker: "You", text: "Cute. Definitely cute." },
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

export const yumiStoryDialogues: Record<string, Dialogue> = {
  yumi_tutor_request_office_hours: yumiTutorRequestOfficeHours,
  yumi_tutor_request_private: yumiTutorRequestPrivate,
  yumi_tutor1_gentle: yumiTutor1Gentle,
  yumi_tutor1_stern: yumiTutor1Stern,
  yumi_tutor2_dom_play: yumiTutor2DomPlay,
  yumi_tutor2_dom_boundaries: yumiTutor2DomBoundaries,
  yumi_tutor2_sub_praise: yumiTutor2SubPraise,
  yumi_tutor2_sub_correct: yumiTutor2SubCorrect,
  yumi_classroom_flirt_dom_enjoy: yumiClassroomFlirtDomEnjoy,
  yumi_classroom_flirt_dom_tease: yumiClassroomFlirtDomTease,
  yumi_classroom_flirt_sub_push: yumiClassroomFlirtSubPush,
  yumi_classroom_flirt_sub_sweet: yumiClassroomFlirtSubSweet,
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
