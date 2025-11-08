// // src/lib/eventSystem.ts
// import {
//   CharacterEvent,
//   EventConditions,
//   EventHistory,
//   CharacterEventState,
//   GameplayFlag,
// } from "@/data/events/types";
// import { Girl, PlayerStats } from "@/data/characters";
// import { DayOfWeek, DAYS_OF_WEEK } from "@/data/gameConstants";

// /**
//  * Calculate total game hours elapsed
//  */
// export function calculateGameTime(day: DayOfWeek, hour: number): number {
//   const dayIndex = DAYS_OF_WEEK.indexOf(day);
//   return dayIndex * 24 + hour;
// }



// /**
//  * Check if an event's conditions are met
//  */
// export function checkEventConditions(
//   conditions: EventConditions,
//   girl: Girl,
//   player: PlayerStats,
//   currentLocation: string,
//   day: DayOfWeek,
//   hour: number,
//   completedEvents: string[],
//   gameplayFlags?: Set<GameplayFlag>
// ): boolean {
//   // Check girl stats
//   if (
//     conditions.minAffection !== undefined &&
//     girl.stats.affection < conditions.minAffection
//   )
//     return false;
//   if (conditions.minLust !== undefined && girl.stats.lust < conditions.minLust)
//     return false;
//   if (
//     conditions.minTrust !== undefined &&
//     girl.stats.trust < conditions.minTrust
//   )
//     return false;
//   if (conditions.minLove !== undefined && girl.stats.love < conditions.minLove)
//     return false;
//   if (conditions.minMood !== undefined && girl.stats.mood < conditions.minMood)
//     return false;

//   if (
//     conditions.maxAffection !== undefined &&
//     girl.stats.affection > conditions.maxAffection
//   )
//     return false;
//   if (conditions.maxLust !== undefined && girl.stats.lust > conditions.maxLust)
//     return false;

//   // Check player stats
//   if (
//     conditions.minPlayerIntelligence !== undefined &&
//     player.intelligence < conditions.minPlayerIntelligence
//   )
//     return false;
//   if (
//     conditions.minPlayerFitness !== undefined &&
//     player.fitness < conditions.minPlayerFitness
//   )
//     return false;
//   if (
//     conditions.minPlayerStyle !== undefined &&
//     player.style < conditions.minPlayerStyle
//   )
//     return false;
//   if (
//     conditions.minPlayerMoney !== undefined &&
//     player.money < conditions.minPlayerMoney
//   )
//     return false;

//   // Check time
//   if (conditions.minHour !== undefined && hour < conditions.minHour)
//     return false;
//   if (conditions.maxHour !== undefined && hour >= conditions.maxHour)
//     return false;
//   if (conditions.specificDay !== undefined && day !== conditions.specificDay)
//     return false;

//   // Check location
//   if (
//     conditions.requiredLocation !== undefined &&
//     currentLocation !== conditions.requiredLocation
//   )
//     return false;

//   // Check previous events
//   if (conditions.requiredPreviousEvents) {
//     for (const requiredEvent of conditions.requiredPreviousEvents) {
//       if (!completedEvents.includes(requiredEvent)) return false;
//     }
//   }

//   if (conditions.blockedByEvents) {
//     for (const blockedEvent of conditions.blockedByEvents) {
//       if (completedEvents.includes(blockedEvent)) return false;
//     }
//   }

//   // Check required flags
//   if (conditions.requiredFlags && gameplayFlags) {
//     for (const flag of conditions.requiredFlags) {
//       if (!gameplayFlags.has(flag)) {
//         console.log(`❌ Event blocked: missing flag '${flag}'`);
//         return false;
//       }
//     }
//   }

//   // Check blocked flags
//   if (conditions.blockedByFlags && gameplayFlags) {
//     for (const flag of conditions.blockedByFlags) {
//       if (gameplayFlags.has(flag)) {
//         console.log(`❌ Event blocked: has flag '${flag}'`);
//         return false;
//       }
//     }
//   }
//   return true;
// }

// /**
//  * Check if an event is on cooldown
//  */
// export function isEventOnCooldown(
//   event: CharacterEvent,
//   eventHistory: EventHistory | undefined,
//   currentGameTime: number
// ): boolean {
//   if (!eventHistory || !event.cooldownHours) return false;

//   const hoursSinceLastTrigger =
//     currentGameTime - eventHistory.lastTriggered.gameTime;
//   return hoursSinceLastTrigger < event.cooldownHours;
// }

// /**
//  * Find the highest priority event that can trigger
//  */
// export function findTriggeredEvent(
//   events: CharacterEvent[],
//   girl: Girl,
//   player: PlayerStats,
//   currentLocation: string,
//   day: DayOfWeek,
//   hour: number,
//   eventState: CharacterEventState | undefined,
//   gameplayFlags?: Set<GameplayFlag>
// ): CharacterEvent | null {
//   const currentGameTime = calculateGameTime(day, hour);

//   // Get list of completed events
//   const completedEvents =
//     eventState?.eventHistory
//       .filter((h) => h.timesTriggered > 0)
//       .map((h) => h.eventId) || [];

//   // Sort by priority (highest first)
//   const sortedEvents = [...events].sort((a, b) => b.priority - a.priority);

//   for (const event of sortedEvents) {
//     // Skip if not repeatable and already completed
//     if (!event.repeatable && completedEvents.includes(event.id)) {
//       continue;
//     }

//     // Check cooldown
//     const history = eventState?.eventHistory.find(
//       (h) => h.eventId === event.id
//     );
//     if (isEventOnCooldown(event, history, currentGameTime)) {
//       continue;
//     }

//     // Check conditions
//     if (
//       checkEventConditions(
//         event.conditions,
//         girl,
//         player,
//         currentLocation,
//         day,
//         hour,
//         completedEvents,
//         gameplayFlags
//       )
//     ) {
//       return event;
//     }
//   }

//   return null;
// }

// /**
//  * Record that an event was triggered
//  */
// export function recordEventTrigger(
//   eventState: CharacterEventState,
//   eventId: string,
//   day: DayOfWeek,
//   hour: number
// ): CharacterEventState {
//   const gameTime = calculateGameTime(day, hour);
//   const existingHistory = eventState.eventHistory.find(
//     (h) => h.eventId === eventId
//   );

//   if (existingHistory) {
//     // Update existing history
//     return {
//       ...eventState,
//       lastInteractionTime: gameTime,
//       eventHistory: eventState.eventHistory.map((h) =>
//         h.eventId === eventId
//           ? {
//               ...h,
//               lastTriggered: { day, hour, gameTime },
//               timesTriggered: h.timesTriggered + 1,
//             }
//           : h
//       ),
//     };
//   } else {
//     // Add new history entry
//     return {
//       ...eventState,
//       lastInteractionTime: gameTime,
//       eventHistory: [
//         ...eventState.eventHistory,
//         {
//           eventId,
//           lastTriggered: { day, hour, gameTime },
//           timesTriggered: 1,
//         },
//       ],
//     };
//   }
// }
