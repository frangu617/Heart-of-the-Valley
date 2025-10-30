# Quick Reference Cheat Sheet

## 🎯 Common Patterns

### Condition Checking

```typescript
import { checkConditionalRule, ConditionHelpers, CharacterEventConditions } from '@/lib';

// Simple stat check
const hasEnoughAffection = checkConditionalRule({
  conditions: [ConditionHelpers.minStat('girl.stats.affection', 50)]
}, context);

// Multiple conditions (AND)
const canTrigger = checkConditionalRule({
  allOf: [
    CharacterEventConditions.atLocation('Gym'),
    CharacterEventConditions.timeRange(8, 20),
    CharacterEventConditions.minGirlStats({ affection: 30, trust: 20 }),
  ]
}, context);

// Multiple options (OR)
const atRightPlace = checkConditionalRule({
  anyOf: [
    CharacterEventConditions.atLocation('Cafe'),
    CharacterEventConditions.atLocation('Restaurant'),
  ]
}, context);

// Blocked by conditions (NOT)
const notBlocked = checkConditionalRule({
  noneOf: [
    CharacterEventConditions.hasFlags('dateCompleted'),
  ]
}, context);

// Custom logic
const custom = checkConditionalRule({
  customCheck: (ctx) => ctx.player.money >= 100 && ctx.hour < 22
}, context);
```

### Stat Management

```typescript
import { applyStatChanges, STAT_LIMITS, previewStatChange, meetsStatRequirements } from '@/lib';

// Apply stat changes with auto-clamping
const newStats = applyStatChanges(
  player,
  { fitness: 5, energy: -10, money: 50 },
  STAT_LIMITS.player
);

// Preview before applying (for UI)
const preview = previewStatChange(girl.stats, { affection: 10 }, STAT_LIMITS.girl);
// preview.before, preview.after, preview.differences

// Check if requirements met
const canUnlock = meetsStatRequirements(player, { fitness: 20, intelligence: 15 });
```

### Creating Events

```typescript
import { createCharacterEvents, CharacterEventConditions, EVENT_PRIORITIES, COOLDOWN_PRESETS } from '@/lib';

// Batch create events
export const characterEvents = createCharacterEvents('CharacterName', [
  {
    id: 'event_id',
    name: 'Event Name',
    priority: EVENT_PRIORITIES.NORMAL,
    repeatable: true,
    cooldownHours: COOLDOWN_PRESETS.MEDIUM,
    
    conditions: CharacterEventConditions.repeatableEncounter(
      'Location',
      minAffection,
      minTrust,
      minHour,
      maxHour
    ),
    
    dialogue: { id: 'dialogue_id', lines: [/* ... */] },
    
    rewards: {
      playerStats: { fitness: 2 },
      girlStats: { affection: 5, trust: 3 },
      setFlags: ['eventCompleted'],
    },
  },
]);
```

### Event Management

```typescript
import { CharacterEventManager } from '@/lib';

// Create manager
const eventManager = new CharacterEventManager(allEvents);

// Find event to trigger
const event = eventManager.findCharacterEvent('CharacterName', context);

// Check if can trigger
const canTrigger = eventManager.canTrigger(event, context);

// Record trigger
const newHistory = eventManager.recordTrigger(event.id, history, currentTime);

// Get stats
const stats = eventManager.getEventStats(event.id, context);
// stats.timesTriggered, stats.lastTriggered, stats.canTriggerNow
```

## 📋 Common Condition Builders

```typescript
// Location
CharacterEventConditions.atLocation('Gym')
CharacterEventConditions.atLocation(['Gym', 'Park']) // Multiple

// Time
CharacterEventConditions.timeRange(8, 20)

// Stats
CharacterEventConditions.minGirlStats({ affection: 40, trust: 30, love: 20 })
CharacterEventConditions.minPlayerStats({ fitness: 20, intelligence: 15 })

// Flags
CharacterEventConditions.hasFlags('flag1', 'flag2')
CharacterEventConditions.blockedByFlags('blockingFlag')

// Events
CharacterEventConditions.afterEvents('event1', 'event2')
CharacterEventConditions.beforeEvents('event1')

// Common patterns
CharacterEventConditions.firstMeeting('Location', ['requiredFlag'])
CharacterEventConditions.repeatableEncounter('Location', minAff, minTrust, minHour, maxHour)
```

## 🎮 Game Constants

```typescript
import { 
  EVENT_PRIORITIES,
  COOLDOWN_PRESETS,
  TIME_CONFIG,
  STAT_LIMITS,
  RELATIONSHIP_THRESHOLDS,
  ACTIVITY_COSTS,
  ACTIVITY_REWARDS,
} from '@/config/gameConfig';

// Event priorities
EVENT_PRIORITIES.CRITICAL    // 100
EVENT_PRIORITIES.HIGH        // 80
EVENT_PRIORITIES.NORMAL      // 50
EVENT_PRIORITIES.LOW         // 30

// Cooldowns (hours)
COOLDOWN_PRESETS.NONE        // 0
COOLDOWN_PRESETS.SHORT       // 24
COOLDOWN_PRESETS.MEDIUM      // 48
COOLDOWN_PRESETS.LONG        // 168
COOLDOWN_PRESETS.VERY_LONG   // 336

// Time
TIME_CONFIG.DAYS_OF_WEEK     // Array of days
TIME_CONFIG.START_DAY        // 'Monday'
TIME_CONFIG.START_HOUR       // 8
TIME_CONFIG.MORNING          // { start: 6, end: 12 }

// Stat limits
STAT_LIMITS.player           // { energy: { min: 0, max: 100 }, ... }
STAT_LIMITS.girl             // { affection: { min: 0, max: 100 }, ... }

// Relationship thresholds
RELATIONSHIP_THRESHOLDS.friend       // { affection: 20, trust: 15 }
RELATIONSHIP_THRESHOLDS.romantic     // { affection: 60, trust: 50, love: 30 }

// Activity costs
ACTIVITY_COSTS.energy.workout   // 15
ACTIVITY_COSTS.time.workout     // 2 hours
ACTIVITY_COSTS.money.restaurant // 30
```

## 🔧 Helper Functions

```typescript
import { 
  getTimeOfDay, 
  getNextDay, 
  calculateGameTime,
  clampValue,
  getMissingRequirements,
} from '@/lib';

// Time helpers
const timeOfDay = getTimeOfDay(14);        // 'afternoon'
const tomorrow = getNextDay('Monday');      // 'Tuesday'
const gameTime = calculateGameTime('Monday', 14); // 14

// Value helpers
const clamped = clampValue(105, 0, 100);   // 100

// Requirement helpers
const missing = getMissingRequirements(
  { affection: 40, trust: 20 },
  { affection: 60, trust: 50 }
);
// Returns: { affection: 20, trust: 30 }
```

## 💾 Context Object Structure

```typescript
interface CharacterEventContext {
  // Girl info
  girl: {
    name: string;
    stats: { affection, lust, trust, love, mood };
    location: string;
  };
  
  // Player info
  player: {
    name: string;
    energy, mood, hunger, fitness, intelligence, style, money: number;
    inventory: string[];
  };
  
  // Game state
  currentLocation: string;
  day: string;
  hour: number;
  currentTime: number; // Game hours elapsed
  
  // History
  completedEvents: string[];
  eventHistory: EventHistory[];
  flags: Set<GameplayFlag>;
}
```

## 🎨 Common Patterns

### Pattern 1: First Meeting Event
```typescript
{
  id: 'char_first_meeting',
  name: 'First Meeting',
  priority: EVENT_PRIORITIES.CRITICAL,
  repeatable: false,
  conditions: CharacterEventConditions.firstMeeting('Location', ['requiredFlag']),
  rewards: {
    setFlags: ['hasMetChar'],
    unlockCharacters: ['CharName'],
  },
}
```

### Pattern 2: Repeatable Location Event
```typescript
{
  id: 'char_location_event',
  name: 'Meet at Location',
  priority: EVENT_PRIORITIES.NORMAL,
  repeatable: true,
  cooldownHours: COOLDOWN_PRESETS.SHORT,
  conditions: CharacterEventConditions.repeatableEncounter('Location', 20, 15, 8, 22),
  rewards: {
    girlStats: { affection: 3, trust: 2 },
  },
}
```

### Pattern 3: Special Event with Complex Requirements
```typescript
{
  id: 'special_event',
  name: 'Special Event',
  priority: EVENT_PRIORITIES.HIGH,
  repeatable: false,
  conditions: {
    allOf: [
      CharacterEventConditions.atLocation(['Beach', 'Park']),
      CharacterEventConditions.timeRange(18, 22),
      CharacterEventConditions.minGirlStats({ affection: 60, love: 40 }),
      CharacterEventConditions.minPlayerStats({ money: 100 }),
      CharacterEventConditions.hasFlags('dateOneComplete', 'dateTwoComplete'),
      { customCheck: (ctx) => ctx.day === 'Saturday' },
    ],
  },
  rewards: {
    setFlags: ['specialEventComplete'],
    girlStats: { affection: 10, love: 15 },
  },
}
```

## 🚀 Quick Migration Checklist

### For Each Character:
- [ ] Create new event file using `createCharacterEvents`
- [ ] Convert conditions using `CharacterEventConditions`
- [ ] Replace magic numbers with config constants
- [ ] Test all events trigger correctly
- [ ] Update imports in event index
- [ ] Delete old file after confirmation

### For Each Component:
- [ ] Replace stat manipulation with `applyStatChanges`
- [ ] Replace magic numbers with config constants
- [ ] Use `meetsStatRequirements` for checks
- [ ] Use `STAT_LIMITS` for validation

### Global Updates:
- [ ] Replace `findTriggeredEvent` with `eventManager.findCharacterEvent`
- [ ] Replace manual history tracking with `eventManager.recordTrigger`
- [ ] Import from config instead of hardcoding values

## 📚 File Import Paths

```typescript
// Utilities
import { checkConditionalRule, ConditionHelpers } from '@/lib/utils/conditionChecker';
import { applyStatChanges, STAT_LIMITS, previewStatChange } from '@/lib/utils/statManager';

// Core systems
import { EventManager, createEventFactory } from '@/lib/core/eventSystem';

// Game systems
import { 
  CharacterEventManager,
  createCharacterEvents,
  CharacterEventConditions,
} from '@/lib/game/characterEventSystem';

// Configuration
import { 
  EVENT_PRIORITIES,
  COOLDOWN_PRESETS,
  TIME_CONFIG,
  STAT_LIMITS,
  RELATIONSHIP_THRESHOLDS,
  ACTIVITY_COSTS,
  ACTIVITY_REWARDS,
  GAME_BALANCE,
} from '@/config/gameConfig';
```

## 💡 Pro Tips

1. **Always use condition builders** - Don't manually check conditions
2. **Never hardcode numbers** - Use config constants
3. **Preview stat changes** - Before applying for better UX
4. **Compose conditions** - Use allOf/anyOf/noneOf for complex logic
5. **Test in isolation** - Utilities are pure functions, easy to test
6. **Keep events focused** - One event = one scenario
7. **Use meaningful IDs** - `char_location_action` format
8. **Document custom checks** - Add comments for custom logic
9. **Reuse patterns** - If you write something twice, make it a helper
10. **Profile performance** - Use React DevTools to check re-renders

## 🔥 Common Mistakes

❌ **Don't:** Manually check conditions
```typescript
if (girl.stats.affection >= 50 && location === 'Gym') { }
```

✅ **Do:** Use condition system
```typescript
if (checkConditionalRule(conditions, context)) { }
```

---

❌ **Don't:** Manually clamp stats
```typescript
stats.affection = Math.max(0, Math.min(100, stats.affection + 10));
```

✅ **Do:** Use stat manager
```typescript
applyStatChanges(stats, { affection: 10 }, STAT_LIMITS.girl);
```

---

❌ **Don't:** Hardcode values
```typescript
if (player.fitness >= 20) { }
```

✅ **Do:** Use config
```typescript
if (player.fitness >= GAME_BALANCE.characterUnlockRequirements.Ruby.playerFitness) { }
```

---

❌ **Don't:** Create events with raw objects
```typescript
const event = {
  id: 'event',
  conditions: { minAffection: 50, minTrust: 40, ... },
  // tons of boilerplate
};
```

✅ **Do:** Use factory functions
```typescript
const event = createCharacterEvent({
  id: 'event',
  conditions: CharacterEventConditions.repeatableEncounter('Gym', 50, 40, 8, 20),
});
```

---

Keep this cheat sheet handy for quick reference!
