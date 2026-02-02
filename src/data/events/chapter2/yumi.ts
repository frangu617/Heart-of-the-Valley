import { GameEvent } from '../types';
import {
  displayCharacter,
  hideCharacter,
  moveCharacter,
} from '@/lib/rewards';

export const YUMI_CHAPTER_2_EVENTS: GameEvent[] = [
  // Event 1: The Morning After
  {
    id: 'yumi-c2-event-1',
    title: 'The Morning After',
    location: 'University Hallway',
    time: 'Morning',
    isAvailable: (stats, flags) =>
      flags['yumi_chapter_1_completed'] && !flags['yumi_chapter_2_started'],
    trigger: (stats, flags) => {
      flags['yumi_chapter_2_started'] = true;
      return {};
    },
    scenes: [
      {
        id: 'yumi-c2-e1-s1-sub',
        isAvailable: (stats) => stats.yumi_sub_dom < 0,
        dialogue: [
          {
            speaker: 'Player',
            text: 'I see Yumi down the hall. She sees me and her cheeks flush. She quickly looks down at her books, trying to seem busy.',
          },
          {
            speaker: 'Player',
            text: "She's avoiding my eyes, but I can see a small, almost imperceptible smile on her face. She's waiting for me to make the first move.",
          },
        ],
        background: 'university_hallway_morning.png',
        character: 'Yumi',
        expression: 'Shy',
      },
      {
        id: 'yumi-c2-e1-s1-dom',
        isAvailable: (stats) => stats.yumi_sub_dom > 0,
        dialogue: [
          {
            speaker: 'Player',
            text: 'I spot Yumi by her locker. Our eyes meet, and her expression is unreadable, almost cold. All business.',
          },
          {
            speaker: 'Player',
            text: 'She gives me a slight nod, a clear signal. A moment later, my phone buzzes. "Empty classroom. 3rd floor. After this class. Be there."',
          },
        ],
        background: 'university_hallway_morning.png',
        character: 'Yumi',
        expression: 'Neutral',
      },
      {
        id: 'yumi-c2-e1-s1-neutral',
        isAvailable: (stats) => stats.yumi_sub_dom === 0,
        dialogue: [
          {
            speaker: 'Player',
            text: "There's Yumi. She sees me and offers a small, uncertain smile before turning away. It's impossible to tell what she's thinking.",
          },
          {
            speaker: 'Player',
            text: 'It's tense. The air is thick with unspoken words. Later, my phone vibrates. A text from her: "We should talk."',
          },
        ],
        background: 'university_hallway_morning.png',
        character: 'Yumi',
        expression: 'Neutral',
      },
    ],
  },

  // Event 2: The "Talk"
  {
    id: 'yumi-c2-event-2',
    title: 'The Talk',
    location: 'Classroom',
    time: 'Afternoon',
    isAvailable: (stats, flags) =>
      flags['yumi_chapter_2_started'] && !flags['yumi_c2_event_2_completed'],
    trigger: (stats, flags) => {
      flags['yumi_c2_event_2_completed'] = true;
      return {};
    },
    scenes: [
      // Sub Path
      {
        id: 'yumi-c2-e2-s1-sub',
        isAvailable: (stats) => stats.yumi_sub_dom < 0,
        dialogue: [
          {
            speaker: 'Player',
            text: 'She was already here, waiting. "Hi..."',
          },
          {
            speaker: 'Yumi',
            text: 'About the other night... I...',
            expression: 'Shy',
          },
        ],
        background: 'classroom_afternoon.png',
        character: 'Yumi',
        expression: 'Shy',
        choices: [
          {
            text: "I want more of what happened.",
            consequence: (stats, flags) => {
              stats.yumi_sub_dom -= 5;
              flags['yumi_relationship_secret'] = true;
              return {
                nextScene: 'yumi-c2-e2-s2-sub-push',
              };
            },
          },
          {
            text: 'Are you okay? I\'m worried about you.',
            consequence: (stats, flags) => {
              stats.love += 5;
              flags['yumi_relationship_secret'] = true;
              return {
                nextScene: 'yumi-c2-e2-s2-sub-caring',
              };
            },
          },
        ],
      },
      {
        id: 'yumi-c2-e2-s2-sub-push',
        dialogue: [
          {
            speaker: 'Yumi',
            text: 'Oh... M-me too. I really do. But we have to be... careful.',
            expression: 'Blushing',
          },
          {
            speaker: 'Player',
            text: 'We will be. This will be our secret.',
          },
        ],
        background: 'classroom_afternoon.png',
        character: 'Yumi',
        expression: 'Blushing',
      },
      {
        id: 'yumi-c2-e2-s2-sub-caring',
        dialogue: [
          {
            speaker: 'Yumi',
            text: "I'm... confused. But not scared. I liked it. I just don't know what this means for us.",
            expression: 'Sad',
          },
          {
            speaker: 'Player',
            text: 'It means we can explore it, together. As long as we keep it secret.',
          },
        ],
        background: 'classroom_afternoon.png',
        character: 'Yumi',
        expression: 'Hopeful',
      },

      // Dom Path
      {
        id: 'yumi-c2-e2-s1-dom',
        isAvailable: (stats) => stats.yumi_sub_dom > 0,
        dialogue: [
          {
            speaker: 'Yumi',
            text: 'Shut the door.',
            expression: 'Angry',
          },
          {
            speaker: 'Player',
            text: 'I do as she says. She has her arms crossed, her eyes are like ice.',
          },
          {
            speaker: 'Yumi',
            text: "Do you have any idea how much trouble you could be in? I'm a student. You're faculty. I could ruin your career with a single word.",
            expression: 'Angry',
          },
        ],
        background: 'classroom_afternoon.png',
        character: 'Yumi',
        expression: 'Angry',
        choices: [
          {
            text: 'Is that a threat, or are you enjoying the power?',
            consequence: (stats, flags) => {
              stats.yumi_sub_dom += 5;
              flags['yumi_relationship_secret_dom'] = true;
              return {
                nextScene: 'yumi-c2-e2-s2-dom-challenge',
              };
            },
          },
          {
            text: 'You\'re right. I\'m sorry.',
            consequence: (stats, flags) => {
              stats.yumi_sub_dom -= 5;
              flags['yumi_relationship_stalled'] = true;
              return {
                nextScene: 'yumi-c2-e2-s2-dom-apology',
              };
            },
          },
        ],
      },
      {
        id: 'yumi-c2-e2-s2-dom-challenge',
        dialogue: [
          {
            speaker: 'Yumi',
            text: 'A small, dangerous smile plays on her lips. "Maybe a little of both."',
            expression: 'Smug',
          },
          {
            speaker: 'Yumi',
            text: 'From now on, we do things my way. This stays between us. No one knows. Clear?',
            expression: 'Smug',
          },
          { speaker: 'Player', text: 'Crystal.' },
        ],
        background: 'classroom_afternoon.png',
        character: 'Yumi',
        expression: 'Smug',
      },
      {
        id: 'yumi-c2-e2-s2-dom-apology',
        dialogue: [
          {
            speaker: 'Yumi',
            text: 'Her face falls, the fire in her eyes replaced by disappointment. "Fine. Forget it ever happened."',
            expression: 'Sad',
          },
          {
            speaker: 'Player',
            text: 'She turns and walks out before I can say another word. I messed that up.',
          },
        ],
        background: 'classroom_afternoon.png',
        character: 'Yumi',
        expression: 'Sad',
      },

      // Neutral Path
      {
        id: 'yumi-c2-e2-s1-neutral',
        isAvailable: (stats) => stats.yumi_sub_dom === 0,
        dialogue: [
          {
            speaker: 'Yumi',
            text: 'Thanks for meeting me. We need to talk about what happened.',
            expression: 'Neutral',
          },
          {
            speaker: 'Yumi',
            text: 'It was... intense. And we both know it could cause problems for both of us if anyone found out.',
            expression: 'Worried',
          },
        ],
        background: 'classroom_afternoon.png',
        character: 'Yumi',
        expression: 'Worried',
        choices: [
          {
            text: "I don't want to forget it. I want to see where this goes.",
            consequence: (stats, flags) => {
              flags['yumi_relationship_secret_neutral'] = true;
              return {
                nextScene: 'yumi-c2-e2-s2-neutral-continue',
              };
            },
          },
          {
            text: 'Maybe we should just forget it happened.',
            consequence: (stats, flags) => {
              flags['yumi_romance_ended'] = true;
              return {
                nextScene: 'yumi-c2-e2-s2-neutral-end',
              };
            },
          },
        ],
      },
      {
        id: 'yumi-c2-e2-s2-neutral-continue',
        dialogue: [
          {
            speaker: 'Yumi',
            text: 'Okay. Me too. But we have to be smart about this. No labels. Extreme discretion. Can you agree to that?',
            expression: 'Hopeful',
          },
          { speaker: 'Player', text: 'I can.' },
        ],
        background: 'classroom_afternoon.png',
        character: 'Yumi',
        expression: 'Hopeful',
      },
      {
        id: 'yumi-c2-e2-s2-neutral-end',
        dialogue: [
          {
            speaker: 'Yumi',
            text: 'A flash of hurt crosses her face before she masks it. "Yeah. Maybe that\'s for the best." She leaves without looking back.',
            expression: 'Sad',
          },
        ],
        background: 'classroom_afternoon.png',
        character: 'Yumi',
        expression: 'Sad',
      },
    ],
  },
  // Event 3: The Rules of Engagement
  {
    id: 'yumi-c2-event-3',
    title: 'Rules of Engagement',
    location: 'Any',
    time: 'Any',
    isAvailable: (stats, flags) =>
      (flags['yumi_relationship_secret'] ||
        flags['yumi_relationship_secret_dom'] ||
        flags['yumi_relationship_secret_neutral']) &&
      !flags['yumi_c2_event_3_completed'],
    trigger: (stats, flags) => {
      flags['yumi_c2_event_3_completed'] = true;
      return {};
    },
    scenes: [
      {
        id: 'yumi-c2-e3-s1-sub',
        isAvailable: (stats, flags) => !!flags['yumi_relationship_secret'],
        dialogue: [
          {
            speaker: 'Player',
            text: 'My phone buzzes. It\'s a long message from Yumi, outlining a plan.',
          },
          {
            speaker: 'Yumi',
            text: '(Phone) "Okay, so I was thinking... maybe we shouldn\'t talk in the hallways? And we can use a special emoji to signal when we want to meet privately? Let me know what you think! 😊"',
          },
          {
            speaker: 'Player',
            text: 'It\'s a list of rules, disguised as suggestions. She\'s meticulously planning how to keep us secret. It\'s... kind of adorable.',
          },
        ],
        background: 'bedroom_night.png',
      },
      {
        id: 'yumi-c2-e3-s1-dom',
        isAvailable: (stats, flags) =>
          !!flags['yumi_relationship_secret_dom'],
        dialogue: [
          {
            speaker: 'Player',
            text: 'A new text from Yumi arrives. It\'s a list.',
          },
          {
            speaker: 'Yumi',
            text: '(Phone) "Rules. 1: You don\'t initiate contact. I do. 2: We are never seen arriving or leaving a location together. 3: Delete our chats at the end of each day. Acknowledge."',
          },
          {
            speaker: 'Player',
            text: 'They\'re not suggestions; they\'re orders. She\'s taking control of every aspect of this. I can\'t help but feel a thrill.',
          },
        ],
        background: 'bedroom_night.png',
      },
      {
        id: 'yumi-c2-e3-s1-neutral',
        isAvailable: (stats, flags) =>
          !!flags['yumi_relationship_secret_neutral'],
        dialogue: [
          {
            speaker: 'Player',
            text: 'I get a text from Yumi with a link to a shared document.',
          },
          {
            speaker: 'Yumi',
            text: '(Phone) "Drafting some ground rules for us to stay safe. Please add your thoughts. I figured this is the most organized way to handle it."',
          },
          {
            speaker: 'Player',
            text: 'It\'s a collaboratively-edited document titled \'Operational Secrecy\'. She\'s treating this like a project. It\'s surprisingly thorough.',
          },
        ],
        background: 'bedroom_night.png',
      },
    ],
  },
  // Event 4: Secret Meeting
  {
    id: 'yumi-c2-event-4',
    title: 'A Secret Meeting',
    location: 'Cafe',
    time: 'Afternoon',
    isAvailable: (stats, flags) =>
      flags['yumi_c2_event_3_completed'] && !flags['yumi_c2_event_4_completed'],
    trigger: (stats, flags) => {
      flags['yumi_c2_event_4_completed'] = true;
      return {};
    },
    scenes: [
      {
        id: 'yumi-c2-e4-s1',
        dialogue: [
          {
            speaker: 'Player',
            text: 'Following her instructions, I arrive at an off-campus cafe. She\'s already in a corner booth, looking out the window.',
          },
          {
            speaker: 'Yumi',
            text: 'You made it. Good.',
            expression: 'Smiling',
          },
          {
            speaker: 'Player',
            text: "We spend the next hour just talking. Not about the rules, or the university, but about us. Our lives, our hobbies. It's... nice. Normal, even.",
          },
        ],
        background: 'cafe_afternoon.png',
        character: 'Yumi',
        expression: 'Smiling',
      },
    ],
  },
  // Event 5: The First Date
  {
    id: 'yumi-c2-event-5',
    title: 'The First Date',
    location: 'Bar',
    time: 'Night',
    isAvailable: (stats, flags) =>
      flags['yumi_c2_event_4_completed'] && !flags['yumi_chapter_2_date'],
    trigger: (stats, flags) => {
      flags['yumi_chapter_2_date'] = true;
      flags['yumi_chapter_2_completed'] = true;
      return {};
    },
    scenes: [
      {
        id: 'yumi-c2-e5-s1',
        dialogue: [
          {
            speaker: 'Yumi',
            text: '(Phone) "Dress up. There\'s a bar downtown I want to show you. 9 PM. Don\'t be late."',
          },
          {
            speaker: 'Player',
            text: 'She chose a stylish, low-key place. A private booth in the back. It feels like a real date.',
          },
          {
            speaker: 'Yumi',
            text: "I'm glad you came. I... I'm enjoying this. Us.",
            expression: 'Happy',
          },
        ],
        background: 'bar_afternoon.jpg',
        character: 'Yumi',
        expression: 'Happy',
        rewards: [
          {
            type: 'stat',
            stat: 'love',
            value: 10,
          },
          {
            type: 'stat',
            stat: 'yumi_sub_dom',
            value: (stats) => (stats.yumi_sub_dom > 0 ? 1 : -1),
          },
        ],
        postTrigger: (stats, flags) => {
          if (flags['metDawn']) {
            return {
              nextScene: 'yumi-c2-e5-s2-met-dawn',
            };
          }
          return {};
        },
      },
      {
        id: 'yumi-c2-e5-s2-met-dawn',
        dialogue: [
          {
            speaker: 'Player',
            text: 'As we talk, I get that strange feeling again... of being watched.',
          },
          {
            speaker: 'Player',
            text: "I subtly scan the room, and for a split second, I think I see her. That girl from the nightclub. Dawn. But she's gone before I can be sure.",
          },
          {
            speaker: 'Yumi',
            text: 'Is something wrong?',
            expression: 'Worried',
          },
          {
            speaker: 'Player',
            text: "No, nothing. Just thought I saw someone I knew.",
          },
          {
            speaker: 'Player',
            text: "Yumi accepts the answer, but I see a flicker of something in her eyes. Concern? Or something else?",
          },
        ],
        background: 'bar_afternoon.jpg',
        character: 'Yumi',
        expression: 'Worried',
      },
    ],
  },
];