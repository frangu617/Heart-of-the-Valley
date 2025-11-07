// // Create src/lib/eventManager.ts
// //@ts-nocheck
// import { CharacterEvent } from "@/data/events/types";
// import { RandomEvent } from "@/data/events/randomEvents";
// import { getCharacterEvents } from "@/data/events/index";
// import { Girl } from "@/data/characters";
// import { PlayerStats } from "@/data/characters";


// export class EventManager {
//   private eventQueue: (CharacterEvent | RandomEvent)[] = [];
//   private eventHistory: Map<string, number> = new Map();
//   private eventRelationships: Map<string, string[]> = new Map();

//   // Check for ambient character events (not just when selecting)
//   checkAmbientCharacterEvents(
//     location: string,
//     hour: number,
//     girls: Girl[],
//     player: PlayerStats
//   ): CharacterEvent | null {
//     const presentGirls = girls.filter((g) => g.location === location);

//     for (const girl of presentGirls) {
//       const events = getCharacterEvents(girl.name);
//       const ambientEvents = events.filter(
//         (e) =>
//           e.ambientTrigger &&
//           this.checkEventEligibility(e, girl, player, location, hour)
//       );

//       // Roll for each eligible event
//       for (const event of ambientEvents) {
//         const chance = event.triggerChance ?? 100;
//         if (Math.random() * 100 < chance) {
//           return event;
//         }
//       }
//     }
//     return null;
//   }

//   // Make events influence each other
//   getEventChanceModifier(eventId: string): number {
//     let modifier = 0;
//     this.eventHistory.forEach((count, historyEventId) => {
//       const event = this.findEvent(historyEventId);
//       if (event?.modifyNextEventChance?.[eventId]) {
//         modifier += event.modifyNextEventChance[eventId] * count;
//       }
//     });
//     return modifier;
//   }
// }
