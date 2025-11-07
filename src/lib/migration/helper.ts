// // Helpers to bridge old and new systems during migration

// import { EventConditions } from "@/data/events/types";
// import {
//   ConditionalRule,
//   ConditionHelpers,
//   Condition,
// } from "../utils/conditionChecker";

// /**
//  * Convert old EventConditions to new ConditionalRule
//  * Use this during gradual migration
//  */
// export function convertOldConditions(old: EventConditions): ConditionalRule {
//   const conditions: Condition[] = [];

//   if (old.minAffection !== undefined) {
//     conditions.push(
//       ConditionHelpers.minStat("girl.stats.affection", old.minAffection)
//     );
//   }
//   if (old.minLust !== undefined) {
//     conditions.push(ConditionHelpers.minStat("girl.stats.lust", old.minLust));
//   }
//   if (old.minTrust !== undefined) {
//     conditions.push(ConditionHelpers.minStat("girl.stats.trust", old.minTrust));
//   }
//   if (old.minLove !== undefined) {
//     conditions.push(ConditionHelpers.minStat("girl.stats.love", old.minLove));
//   }
//   if (old.minHour !== undefined && old.maxHour !== undefined) {
//     const timeRule = ConditionHelpers.timeRange(old.minHour, old.maxHour);
//     if (timeRule.conditions) {
//       conditions.push(...timeRule.conditions);
//     }
//   }
//   if (old.requiredLocation) {
//     conditions.push(ConditionHelpers.inLocation(old.requiredLocation));
//   }

//   return { conditions };
// }
