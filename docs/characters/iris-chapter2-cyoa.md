# Iris Chapter 2: A Hallway Full of Choices

_A choose-your-own-adventure style retelling of Iris Chapter 2 based on the current event flow in code._

## How to Read

Start at **Section 1**.
At each choice, jump to the section listed.

This version follows the implemented structure from:
- `src/data/events/chapter2/iris/event1.ts`
- `src/data/events/chapter2/iris/event2.ts`
- `src/data/events/chapter2/iris/event3.ts`
- `src/data/events/chapter2/iris/event4.ts`
- `src/data/events/chapter2/iris/event5.ts`

And one optional detour from:
- `src/data/events/chapter1/randomEvents.ts` (Dom-denied loop resolution)

---

## 1. The Morning After

Late morning. University hallway.
You round a corner and almost collide with Iris.
She has that look people get when they have been rehearsing a conversation for an hour.

"About last night," she says.
"I wanted it. I am not denying that. But I am also trying not to burn my life down."

She asks what the kiss meant to you.

- If you answer, "It felt right, and I want more," go to **2**.
- If you answer, "If you want to lead, I am listening," go to **3**.
- If you answer, "I do not regret it, but we should be smart," go to **4**.

## 2. Path of Heat and Reassurance (Sub Lean)

Iris softens, then spirals, then steadies.
She confesses she has been replaying your kiss, and that pretending hurts more than she expected.

By the end of the conversation, you both trade a careful hallway kiss and a fragile understanding:
you want this, but you both know the stakes.

Continue to your next encounter at the mall.
Go to **5**.

## 3. Path of Control and Consent (Dom Lean)

Iris meets your answer with a spark in her eyes.
"If I lead, I need honesty back," she says.

The conversation becomes a negotiation with tension under every sentence.
By the end, she steals the final kiss, like signing a contract in lipstick.

Continue to your next encounter at the cafe.
Go to **6**.

## 4. Path of Careful Clarity (Balanced Lean)

You give each other what adults almost never get in stories:
nuance.

Iris admits she wants you and wants safety.
You admit you want her and want this to survive contact with real life.

The kiss you share is mutual and measured, like both of you are testing whether "careful" can still be electric.

Continue to your next encounter at the mall bookstore.
Go to **7**.

## 5. Public Encounter: Mall Window (Sub Route)

You find Iris staring into a shop window, distant and unguarded.
She admits she has been lonely and overthinking the kiss.

You walk the mall together.
Nothing dramatic happens.
That is the point.
For once, closeness feels ordinary.

After this walk, she asks if you regret any of it.

- If you reassure her and keep showing up, go to **8**.
- If you dodge and keep it vague, go to **8**.

_(The route keeps moving either way, but tone shifts.)_

## 6. Public Encounter: Cafe Command (Dom Route)

You find Iris with a latte and a look that says she has already taken control of this scene.
She makes you sit.
She makes you answer.

"Work is work," she says.
"Outside work, no games."

You leave the table with a kiss and an instruction:
Text her later.

Go to **9**.

## 7. Public Encounter: Bookstore Truce (Balanced Route)

You both reach for the same book.
You both laugh.
It is almost suspiciously normal.

Iris talks about risk, reputation, and wanting something honest that does not turn into theater.
You answer in kind.

You part with a shared smile and no illusions.

Go to **10**.

## 8. No More Hiding (Sub Route Decision)

In the university corridor, Iris pulls you into a quieter pocket of space.
She is tired of pretending, but afraid of fallout.

"I can handle judgment," she says.
"I cannot handle Dawn getting blindsided by rumors."

You must choose a direction.

- If you choose, "We stop hiding. Quiet, but not secret," go to **11**.
- If you choose, "We keep it private. Not at school," go to **12**.

## 9. No More Hiding (Dom Route Decision)

Iris corners you with intent.
"No half-claims," she says.
"Either we stop hiding, or we stop this."

You must choose under pressure.

- If you choose, "No more hiding," go to **13**.
- If you choose, "Not here. Not public," go to **14**.

## 10. No More Hiding (Balanced Route Decision)

In a quiet office, you and Iris admit the same truth:
hiding forever turns desire into shame.

She asks for honesty with caution.
You decide whether this grows or retreats.

- If you choose, "Keep exploring, no labels yet," go to **15**.
- If you choose, "Too risky, we pull back," go to **16**.

## 11. Turning Point: Sub + Accepted

Iris is visibly lighter.
She confesses she has been looking for you between classes.
Not dependency, not performance, just relief.

You both stop circling.
You set a real date.

Go to **17**.

## 12. Turning Point: Sub + Denied

Iris does not fight your boundary.
She asks for one clean chance:
one date, outside campus, no mixed signals.

You agree to try again without drama.
Date set.

Go to **17**.

## 13. Turning Point: Dom + Accepted

Iris pins you near the wall and calls out the truth:
you skipped planning and jumped straight to intensity.

She sets terms.
You commit.
Date locked.

As she leaves, she warns you she may steal kisses before the date.
You believe her.

Go to **18**.

## 14. Turning Point: Dom + Denied (Unresolved Start)

Iris says she is not arguing your boundary.
She is warning you she is wound tight and not cleanly resolved.

No date is set yet.
Nothing is settled.

This branch can detour into a restless loop before the date unlocks.
Go to **20**.

## 15. Turning Point: Balanced + Accepted

You and Iris agree on the rarest thing:
clarity without theatrics.

One real date.
Quiet at school, honest elsewhere.
No games.

Go to **19**.

## 16. Turning Point: Balanced + Denied

Iris proposes a reset.
No fight, no pressure, no fake indifference.
One date to test whether this still has traction.

You agree on boundaries and exit rules.
Date set.

Go to **19**.

## 17. The Nightclub Date (Sub Ending Flavor)

You arrive early at Velvet.
For a moment, you mistake another dark-haired woman for Iris.
The stranger smiles, says nothing, and disappears.

Then Iris arrives.
Nervous at first.
You steady her.
The night becomes warm instead of loud.

At her door, the kiss is slow, trusting, and unhurried.

Go to **22**.

## 18. The Nightclub Date (Dom Ending Flavor)

You arrive early.
You mistake another woman for Iris from behind.
She turns, smiles like she knows more than she says, and vanishes into the crowd.

Iris arrives with a challenge in her eyes.
You match her.
The date is all push and pull: dance floor, eye contact, private dares.

At her door, the kiss is fierce and possessive.

Go to **22**.

## 19. The Nightclub Date (Balanced Ending Flavor)

At the bar, you mistake another dark-haired woman for Iris.
She gives you a quiet smile and drifts away.

Iris arrives and the night settles into something intimate and real:
shared drinks, easy talk, one slow dance, no pretending.

At her door, the kiss lingers like a promise.

Go to **22**.

## 20. Dom-Denied Detour: What the Kiss Unlocked

Because nothing resolved cleanly, Iris enters a restless loop.
You may witness her crossing lines with strangers more than once.
It looks less like cruelty and more like someone trying to outrun what she feels.

Eventually she confronts you directly:
"Exclusive, or not?"

- If you choose, "Stop kissing others. This is with me," go to **18**.
- If you choose, "Keep exploring. Do not cut me out," go to **18**.
- If you never confront it, go to **21**.

## 21. If You Keep Waiting

The chapter does not close.
The heat stays unresolved.
Iris is not gone, but she is not settled either.

Until a date is finally set, the story remains in suspension.

_You can return to Section 20 when ready to choose._

## 22. Chapter 2 Close: The Mystery Girl

No matter how the date felt, one detail sticks:
that lookalike at the bar.

A younger dark-haired woman.
A knowing smile.
No explanation.

By the end of the night, two truths are set:
- Iris Chapter 2 is complete.
- A new thread has opened.

_To be continued._

