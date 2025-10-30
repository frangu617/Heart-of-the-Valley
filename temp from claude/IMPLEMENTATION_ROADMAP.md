# Implementation Roadmap

## Phase 1: Foundation (Week 1)

### Day 1-2: Set Up Core Utilities
1. **Add utility files to your project**
   ```bash
   # Copy these files to your src/ directory
   src/lib/utils/conditionChecker.ts
   src/lib/utils/statManager.ts
   src/lib/core/eventSystem.ts
   ```

2. **Add configuration file**
   ```bash
   src/config/gameConfig.ts
   ```

3. **Test utilities in isolation**
   ```typescript
   // Create a test file to verify utilities work
   import { checkConditionalRule, ConditionHelpers } from './lib/utils/conditionChecker';
   import { applyStatChanges, STAT_LIMITS } from './lib/utils/statManager';
   
   // Test condition checker
   const testContext = {
     girl: { stats: { affection: 50 } },
     hour: 14,
   };
   
   const condition = {
     conditions: [
       ConditionHelpers.minStat('girl.stats.affection', 40),
       ConditionHelpers.timeRange(12, 18),
     ],
   };
   
   console.log(checkConditionalRule(condition, testContext)); // Should be true
   
   // Test stat manager
   const stats = { affection: 90, trust: 50 };
   const newStats = applyStatChanges(
     stats,
     { affection: 15, trust: 5 },
     { affection: { max: 100 }, trust: { max: 100 } }
   );
   console.log(newStats); // { affection: 100, trust: 55 }
   ```

### Day 3-4: Game-Specific Systems
1. **Add character event system**
   ```bash
   src/lib/game/characterEventSystem.ts
   ```

2. **Create migration helper file**
   ```typescript
   // src/lib/migration/helpers.ts
   // Helpers to bridge old and new systems during migration
   
   import { EventConditions } from '@/data/events/types';
   import { ConditionalRule, ConditionHelpers } from '../utils/conditionChecker';
   
   /**
    * Convert old EventConditions to new ConditionalRule
    * Use this during gradual migration
    */
   export function convertOldConditions(old: EventConditions): ConditionalRule {
     const conditions = [];
     
     if (old.minAffection !== undefined) {
       conditions.push(ConditionHelpers.minStat('girl.stats.affection', old.minAffection));
     }
     if (old.minLust !== undefined) {
       conditions.push(ConditionHelpers.minStat('girl.stats.lust', old.minLust));
     }
     if (old.minTrust !== undefined) {
       conditions.push(ConditionHelpers.minStat('girl.stats.trust', old.minTrust));
     }
     if (old.minLove !== undefined) {
       conditions.push(ConditionHelpers.minStat('girl.stats.love', old.minLove));
     }
     if (old.minHour !== undefined && old.maxHour !== undefined) {
       conditions.push({ field: 'hour', operator: 'gte', value: old.minHour });
       conditions.push({ field: 'hour', operator: 'lt', value: old.maxHour });
     }
     if (old.requiredLocation) {
       conditions.push(ConditionHelpers.inLocation(old.requiredLocation));
     }
     
     return { conditions };
   }
   ```

### Day 5: Documentation
1. Review REFACTORING_GUIDE.md
2. Review BEFORE_AFTER.md
3. Plan your migration strategy

---

## Phase 2: Pilot Migration (Week 2)

### Pick ONE character to migrate first (suggested: Dawn)

#### Step 1: Backup Original Files
```bash
cp src/data/events/dawn.ts src/data/events/dawn.original.ts
cp src/data/dialogues/dawn.ts src/data/dialogues/dawn.original.ts
```

#### Step 2: Create New Event File
```typescript
// src/data/events/dawn.new.ts
import {
  createCharacterEvents,
  CharacterEventConditions,
  EVENT_PRIORITIES,
  COOLDOWN_PRESETS,
} from '@/lib/game/characterEventSystem';

export const dawnEvents = createCharacterEvents('Dawn', [
  // Migrate events one by one
  {
    id: 'dawn_first_meeting',
    name: 'First Meeting with Dawn',
    priority: EVENT_PRIORITIES.CRITICAL,
    repeatable: false,
    
    conditions: CharacterEventConditions.firstMeeting(
      'Classroom',
      ['hasMetIris']
    ),
    
    dialogue: {
      id: 'dawn_first_meeting',
      lines: [/* copy from original */],
    },
    
    rewards: {
      setFlags: ['hasMetDawn'],
      unlockCharacters: ['Dawn'],
    },
  },
  
  // Add more events...
]);
```

#### Step 3: Update Event Index
```typescript
// src/data/events/index.ts

// Old import
// import { dawnEvents } from './dawn';

// New import (use .new temporarily)
import { dawnEvents } from './dawn.new';

// Rest remains the same
export function getCharacterEvents(characterName: string) {
  // ...
}
```

#### Step 4: Update Main Page to Use New Event Manager
```typescript
// In src/app/page.tsx

// Add import
import { CharacterEventManager } from '@/lib/game/characterEventSystem';

// Create event manager (do this once, outside component)
const eventManager = new CharacterEventManager();

// In your component
useEffect(() => {
  // Load all events into manager
  eventManager.clearEvents();
  eventManager.addEvents(dawnEvents);
  eventManager.addEvents(irisEvents);
  // ... other characters
}, []);

// Replace old findTriggeredEvent calls with:
const event = eventManager.findCharacterEvent('Dawn', context);
```

#### Step 5: Test Thoroughly
- [ ] First meeting triggers correctly
- [ ] Repeatable events work
- [ ] Cooldowns function
- [ ] Stats update properly
- [ ] Flags are set correctly

#### Step 6: If Successful, Commit Changes
```bash
# Once Dawn works perfectly
git add .
git commit -m "Migrated Dawn events to new system"

# Delete old file
rm src/data/events/dawn.original.ts
```

---

## Phase 3: Full Migration (Week 3-4)

### Migrate Remaining Characters
Use the same process for each character:
1. Ruby
2. Yumi
3. Gwen
4. Iris

**Tip:** You can do these in parallel if multiple developers are working on it.

### Checklist Per Character
```markdown
- [ ] Create new event file
- [ ] Migrate all events
- [ ] Update imports
- [ ] Test all events trigger correctly
- [ ] Test stat changes work
- [ ] Test dialogue flows
- [ ] Commit changes
- [ ] Delete old file
```

---

## Phase 4: Component Updates (Week 4-5)

### Update Components to Use New Systems

#### CharacterOverlay.tsx
```typescript
// Before
const handleStatChange = (changes: Partial<GirlStats>) => {
  setPlayer(prev => ({
    ...prev,
    stats: {
      ...prev.stats,
      affection: Math.max(0, Math.min(100, prev.stats.affection + (changes.affection || 0))),
      trust: Math.max(0, Math.min(100, prev.stats.trust + (changes.trust || 0))),
      // ...
    }
  }));
};

// After
import { applyStatChanges, STAT_LIMITS } from '@/lib/utils/statManager';

const handleStatChange = (changes: Partial<GirlStats>) => {
  setPlayer(prev => ({
    ...prev,
    stats: applyStatChanges(prev.stats, changes, STAT_LIMITS.girl),
  }));
};
```

#### LocationActivities.tsx
```typescript
// Replace magic numbers with config
import { ACTIVITY_COSTS, ACTIVITY_REWARDS } from '@/config/gameConfig';

const workout = () => {
  spendTime(ACTIVITY_COSTS.time.workout);
  setPlayer(prev => applyStatChanges(
    prev,
    {
      energy: -ACTIVITY_COSTS.energy.workout,
      ...ACTIVITY_REWARDS.workout.player,
    },
    STAT_LIMITS.player
  ));
};
```

#### StatsPanel.tsx
```typescript
// Use centralized configuration
import { STAT_LIMITS, RELATIONSHIP_THRESHOLDS } from '@/config/gameConfig';

// Display stat bars with limits
const StatBar = ({ value, stat }: { value: number, stat: keyof GirlStats }) => {
  const limit = STAT_LIMITS.girl[stat];
  const percentage = (value / (limit.max || 100)) * 100;
  // ...
};

// Show relationship level
const getRelationshipLevel = (stats: GirlStats) => {
  if (meetsStatRequirements(stats, RELATIONSHIP_THRESHOLDS.soulmate)) return 'Soulmate';
  if (meetsStatRequirements(stats, RELATIONSHIP_THRESHOLDS.partner)) return 'Partner';
  if (meetsStatRequirements(stats, RELATIONSHIP_THRESHOLDS.romantic)) return 'Romantic';
  if (meetsStatRequirements(stats, RELATIONSHIP_THRESHOLDS.goodFriend)) return 'Good Friend';
  if (meetsStatRequirements(stats, RELATIONSHIP_THRESHOLDS.friend)) return 'Friend';
  return 'Acquaintance';
};
```

---

## Phase 5: Cleanup & Optimization (Week 5-6)

### Remove Old Code
1. **Delete old eventSystem.ts**
   ```bash
   # Backup first!
   cp src/lib/eventSystem.ts src/lib/eventSystem.old.ts
   # Then delete
   rm src/lib/eventSystem.ts
   ```

2. **Clean up unused types**
   - Review `src/data/events/types.ts`
   - Remove or update deprecated types
   - Ensure no breaking changes

3. **Update documentation**
   - Update README with new patterns
   - Document common patterns for team
   - Create examples for common use cases

### Performance Optimization
```typescript
// Memoize event managers
const eventManagers = useMemo(() => ({
  character: new CharacterEventManager(allCharacterEvents),
  random: new EventManager(randomEvents),
  location: new EventManager(locationEvents),
}), [allCharacterEvents, randomEvents, locationEvents]);

// Memoize condition checks
const canTriggerEvent = useMemo(
  () => eventManager.canTrigger(event, context),
  [event, context]
);
```

### Add Monitoring
```typescript
// Log event triggers for debugging
const triggerEvent = (event: CharacterEvent) => {
  console.log(`[EVENT] Triggered: ${event.name}`, {
    character: event.characterName,
    priority: event.priority,
    repeatable: event.repeatable,
  });
  
  // Your existing event trigger logic
};
```

---

## Phase 6: Advanced Features (Week 6+)

### Add New Features Now That Foundation Is Solid

#### Feature 1: Event Chains
```typescript
// Easy to implement with new system
export const dawnDateChain = createCharacterEvents('Dawn', [
  {
    id: 'dawn_date_1',
    name: 'First Date',
    conditions: CharacterEventConditions.minGirlStats({ affection: 40 }),
    rewards: { setFlags: ['dawnFirstDateComplete'] },
  },
  {
    id: 'dawn_date_2',
    name: 'Second Date',
    conditions: {
      allOf: [
        CharacterEventConditions.minGirlStats({ affection: 60 }),
        CharacterEventConditions.hasFlags('dawnFirstDateComplete'),
      ],
    },
    rewards: { setFlags: ['dawnSecondDateComplete'] },
  },
  // More dates in the chain...
]);
```

#### Feature 2: Dynamic Event Generation
```typescript
// Generate similar events with variations
const locations = ['Cafe', 'Park', 'Cinema'];
const chatEvents = locations.map(location => 
  createCharacterEvent({
    id: `dawn_chat_${location.toLowerCase()}`,
    name: `Chat at ${location}`,
    characterName: 'Dawn',
    repeatable: true,
    cooldownHours: COOLDOWN_PRESETS.SHORT,
    conditions: CharacterEventConditions.repeatableEncounter(
      location,
      20,
      15
    ),
    dialogue: generateChatDialogue('Dawn', location),
    rewards: { girlStats: { affection: 2, trust: 1 } },
  })
);
```

#### Feature 3: Event Analytics
```typescript
// Track event performance
const eventStats = eventManager.getAllEvents().map(event => ({
  id: event.id,
  name: event.name,
  ...eventManager.getEventStats(event.id, context),
}));

// Find popular events
const popularEvents = eventStats
  .filter(s => s.timesTriggered > 0)
  .sort((a, b) => b.timesTriggered - a.timesTriggered)
  .slice(0, 10);

console.table(popularEvents);
```

---

## Testing Strategy

### Unit Tests
```typescript
// Test condition checker
describe('ConditionChecker', () => {
  it('should check min stat correctly', () => {
    const condition = ConditionHelpers.minStat('stats.affection', 50);
    const context = { stats: { affection: 60 } };
    expect(checkCondition(condition, context)).toBe(true);
  });
});

// Test stat manager
describe('StatManager', () => {
  it('should clamp values to max', () => {
    const stats = { affection: 95 };
    const newStats = applyStatChanges(
      stats,
      { affection: 10 },
      { affection: { max: 100 } }
    );
    expect(newStats.affection).toBe(100);
  });
});
```

### Integration Tests
```typescript
describe('Event System', () => {
  it('should trigger correct event based on priority', () => {
    const manager = new CharacterEventManager([event1, event2]);
    const triggered = manager.findTriggeredEvent(context);
    expect(triggered?.id).toBe('highest_priority_event');
  });
  
  it('should respect cooldowns', () => {
    const manager = new CharacterEventManager([repeatableEvent]);
    const first = manager.findTriggeredEvent(context);
    expect(first).toBeTruthy();
    
    // Immediately try again
    const second = manager.findTriggeredEvent(context);
    expect(second).toBeFalsy(); // On cooldown
  });
});
```

---

## Success Metrics

Track these to measure success of refactoring:

- [ ] Lines of code reduced by 40%+
- [ ] Time to add new character < 1 hour
- [ ] Time to add new event < 10 minutes
- [ ] Bug fix time reduced by 50%+
- [ ] No regression in functionality
- [ ] Improved type safety (fewer `any` types)
- [ ] Better test coverage
- [ ] Positive team feedback

---

## Rollback Plan

If issues arise:

1. **Keep old files during migration**
   ```bash
   # Don't delete .original files until fully tested
   src/data/events/*.original.ts
   ```

2. **Use feature flags**
   ```typescript
   const USE_NEW_EVENT_SYSTEM = process.env.NEXT_PUBLIC_NEW_EVENTS === 'true';
   
   const event = USE_NEW_EVENT_SYSTEM
     ? eventManager.findCharacterEvent('Dawn', context)
     : findTriggeredEvent(oldEvents, context);
   ```

3. **Git branches**
   ```bash
   # Work on a feature branch
   git checkout -b refactor/event-system
   
   # Can always revert
   git checkout main
   ```

---

## Support & Questions

If you encounter issues:

1. Review BEFORE_AFTER.md for examples
2. Check REFACTORING_GUIDE.md for patterns
3. Look at refactored Dawn events as reference
4. Test in isolation before integrating

Remember: **Gradual migration is safer than big bang!**
