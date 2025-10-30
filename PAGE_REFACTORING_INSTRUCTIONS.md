# page.tsx Refactoring Instructions

## 🎯 Purpose of This Document

**Give this file back to Claude when you're ready to refactor page.tsx**

Say: "Here are my refactoring instructions for page.tsx" and paste this file or reference it.

---

## 📋 What to Keep in Mind When Refactoring

### KEEP These (Core Game Logic)
- ✅ State management (useState hooks)
- ✅ Game state machine (mainMenu, nameInput, intro, playing, paused, dialogue)
- ✅ Save/load functionality
- ✅ Time progression (hour, dayOfWeek)
- ✅ Location movement logic
- ✅ Character unlock system
- ✅ Scheduled encounters tracking
- ✅ UI rendering (JSX/components)
- ✅ Event hooks (useEffect, useMemo, useCallback)

### REMOVE/REPLACE These (Old Redundant Code)

#### 1. Event Condition Checking
**FIND patterns like:**
```typescript
function checkEventConditions(
  conditions: EventConditions,
  girl: Girl,
  player: PlayerStats,
  currentLocation: string,
  day: DayOfWeek,
  hour: number,
  completedEvents: string[],
  gameplayFlags?: Set<GameplayFlag>
): boolean {
  if (conditions.minAffection !== undefined && girl.stats.affection < conditions.minAffection)
    return false;
  // ... 30+ more lines of if statements
}
```

**REPLACE with:**
```typescript
import { CharacterEventManager } from '@/lib/game/characterEventSystem';

// Use the event manager instead
const eventManager = useMemo(() => 
  new CharacterEventManager(allCharacterEvents),
  [allCharacterEvents]
);
```

#### 2. Stat Manipulation
**FIND patterns like:**
```typescript
setPlayer(prev => ({
  ...prev,
  energy: Math.max(0, Math.min(100, prev.energy - 10)),
  fitness: Math.max(0, Math.min(100, prev.fitness + 5)),
}));

setGirl(prev => ({
  ...prev,
  stats: {
    ...prev.stats,
    affection: Math.max(0, Math.min(100, prev.stats.affection + 5)),
  }
}));
```

**REPLACE with:**
```typescript
import { applyStatChanges } from '@/lib/utils/statManager';
import { STAT_LIMITS } from '@/config/gameConfig';

setPlayer(prev => applyStatChanges(
  prev,
  { energy: -10, fitness: 5 },
  STAT_LIMITS.player
));

// For girl stats
const updatedGirl = {
  ...selectedGirl,
  stats: applyStatChanges(
    selectedGirl.stats,
    { affection: 5 },
    STAT_LIMITS.girl
  ),
};
```

#### 3. Event Triggering
**FIND patterns like:**
```typescript
const event = findTriggeredEvent(
  characterEvents,
  girl,
  player,
  currentLocation,
  day,
  hour,
  eventState,
  gameplayFlags
);
```

**REPLACE with:**
```typescript
const event = eventManager.findCharacterEvent(characterName, {
  girl,
  player,
  currentLocation,
  day: dayOfWeek,
  hour,
  currentTime: calculateGameTime(TIME_CONFIG.DAYS_OF_WEEK, dayOfWeek, hour),
  completedEvents: eventState?.eventHistory.map(h => h.eventId) || [],
  eventHistory: eventState?.eventHistory || [],
  flags: gameplayFlags,
});
```

#### 4. Event History Recording
**FIND patterns like:**
```typescript
const gameTime = getGameTimeHours(dayOfWeek, hour);
const lastTriggered = { day: dayOfWeek, hour, gameTime };

const idx = prevState.eventHistory.findIndex(e => e.eventId === eventId);
let updatedHistory: EventHistory[];
if (idx >= 0) {
  const existing = prevState.eventHistory[idx];
  updatedHistory = [...prevState.eventHistory];
  updatedHistory[idx] = {
    ...existing,
    lastTriggered,
    timesTriggered: (existing.timesTriggered ?? 0) + 1,
  };
} else {
  updatedHistory = [
    ...prevState.eventHistory,
    { eventId, lastTriggered, timesTriggered: 1 },
  ];
}
```

**REPLACE with:**
```typescript
const newHistory = eventManager.recordTrigger(
  eventId,
  currentEventHistory,
  calculateGameTime(TIME_CONFIG.DAYS_OF_WEEK, dayOfWeek, hour)
);

setCharacterEventStates(prev => ({
  ...prev,
  [characterName]: {
    ...prev[characterName],
    eventHistory: newHistory,
  },
}));
```

#### 5. Magic Numbers
**FIND patterns like:**
```typescript
if (hour >= 8 && hour < 20) { }
if (player.energy < 15) { }
if (girl.stats.affection >= 60 && girl.stats.trust >= 50) { }
```

**REPLACE with:**
```typescript
import { TIME_CONFIG, ACTIVITY_COSTS, RELATIONSHIP_THRESHOLDS } from '@/config/gameConfig';
import { meetsStatRequirements } from '@/lib/utils/statManager';

if (hour >= TIME_CONFIG.MORNING.start && hour < TIME_CONFIG.EVENING.start) { }
if (player.energy < ACTIVITY_COSTS.energy.workout) { }
if (meetsStatRequirements(girl.stats, RELATIONSHIP_THRESHOLDS.romantic)) { }
```

#### 6. Manual Cooldown Checking
**FIND patterns like:**
```typescript
if (!event.repeatable && completedEvents.includes(event.id)) {
  continue;
}

const history = eventState?.eventHistory.find(h => h.eventId === event.id);
if (history && event.cooldownHours) {
  const hoursSinceLastTrigger = currentGameTime - history.lastTriggered.gameTime;
  if (hoursSinceLastTrigger < event.cooldownHours) {
    continue;
  }
}
```

**REPLACE with:**
```typescript
// Event manager handles this automatically!
const event = eventManager.findCharacterEvent(characterName, context);
// Already checks cooldowns, repeatability, etc.
```

---

## 🔍 Specific Sections to Refactor

### Section 1: Imports (Top of File)
**ADD these new imports:**
```typescript
// New system imports
import { CharacterEventManager, calculateGameTime } from '@/lib/game/characterEventSystem';
import { applyStatChanges, meetsStatRequirements } from '@/lib/utils/statManager';
import { 
  STAT_LIMITS, 
  TIME_CONFIG, 
  ACTIVITY_COSTS, 
  ACTIVITY_REWARDS,
  RELATIONSHIP_THRESHOLDS,
  EVENT_PRIORITIES,
} from '@/config/gameConfig';
```

**KEEP these existing imports:**
```typescript
import { useEffect, useMemo, useState, useCallback } from "react";
// All component imports
// All data imports (characters, dialogues, etc.)
```

**REMOVE these (if they exist):**
```typescript
// Old imports that are replaced by new system
import { checkEventConditions, findTriggeredEvent, recordEventTrigger } from "../lib/eventSystem";
```

---

### Section 2: Helper Functions (Lines ~193-260 in your current file)

**DELETE these functions (replaced by new system):**
```typescript
// ❌ DELETE - replaced by eventManager.recordTrigger
const recordEventTrigger = (...) => { }

// ❌ DELETE - replaced by eventManager.isOnCooldown  
const isEventOnCooldown = (...) => { }

// ❌ DELETE - replaced by eventManager.findCharacterEvent
const findTriggeredEvent = (...) => { }

// ❌ DELETE - replaced by checkConditionalRule
const checkEventConditions = (...) => { }

// ❌ DELETE - replaced by calculateGameTime from config
const getGameTimeHours = (...) => { }
```

**KEEP these functions (game-specific logic):**
```typescript
// ✅ KEEP - game-specific
const spendTime = (hours: number) => { }

// ✅ KEEP - game-specific
const moveTo = (location: string) => { }

// ✅ KEEP - save/load logic
const saveGame = () => { }
const loadGame = () => { }

// ✅ KEEP - dialogue management
const startDialogue = (...) => { }
const endDialogue = (...) => { }

// ✅ KEEP - encounter management
const scheduleEncounter = (...) => { }
const checkScheduledEncounters = (...) => { }
```

---

### Section 3: Character Interaction Logic

**FIND code like this (around lines 400-600):**
```typescript
const handleInteraction = (action: string) => {
  if (!selectedGirl) return;
  
  // Manual stat updates
  setPlayer(prev => ({
    ...prev,
    energy: Math.max(0, prev.energy - 10),
  }));
  
  setGirlStatsOverrides(prev => ({
    ...prev,
    [selectedGirl.name]: {
      ...prev[selectedGirl.name],
      affection: Math.min(100, (prev[selectedGirl.name]?.affection || 0) + 5),
    },
  }));
  
  spendTime(2);
};
```

**REPLACE with:**
```typescript
const handleInteraction = (action: string) => {
  if (!selectedGirl) return;
  
  // Use new stat manager
  setPlayer(prev => applyStatChanges(
    prev,
    ACTIVITY_COSTS.energy[action] ? { energy: -ACTIVITY_COSTS.energy[action] } : {},
    STAT_LIMITS.player
  ));
  
  setGirlStatsOverrides(prev => {
    const currentStats = prev[selectedGirl.name] || selectedGirl.stats;
    const rewards = ACTIVITY_REWARDS[action]?.girl || { affection: 5 };
    
    return {
      ...prev,
      [selectedGirl.name]: applyStatChanges(
        currentStats,
        rewards,
        STAT_LIMITS.girl
      ),
    };
  });
  
  spendTime(ACTIVITY_COSTS.time[action] || 2);
};
```

---

### Section 4: Event Manager Setup

**ADD near the top of component (after state declarations):**
```typescript
// Create event manager (memoized)
const eventManager = useMemo(() => {
  const manager = new CharacterEventManager();
  
  // Load all character events
  manager.addEvents(dawnEvents);
  manager.addEvents(rubyEvents);
  manager.addEvents(yumiEvents);
  manager.addEvents(gwenEvents);
  manager.addEvents(irisEvents);
  
  return manager;
}, []); // Empty deps - events don't change
```

**REPLACE all event finding logic with:**
```typescript
// Old: findTriggeredEvent(events, girl, player, ...)
// New:
const event = eventManager.findCharacterEvent(selectedGirl.name, {
  girl: selectedGirl,
  player,
  currentLocation,
  day: dayOfWeek,
  hour,
  currentTime: calculateGameTime(TIME_CONFIG.DAYS_OF_WEEK, dayOfWeek, hour),
  completedEvents: characterEventStates[selectedGirl.name]?.eventHistory.map(h => h.eventId) || [],
  eventHistory: characterEventStates[selectedGirl.name]?.eventHistory || [],
  flags: gameplayFlags,
});
```

---

### Section 5: Stat Decay (If You Have It)

**FIND patterns like:**
```typescript
useEffect(() => {
  const interval = setInterval(() => {
    setPlayer(prev => ({
      ...prev,
      energy: Math.max(0, prev.energy - 5),
      hunger: Math.min(100, prev.hunger + 3),
    }));
  }, 60000); // Every minute
  
  return () => clearInterval(interval);
}, []);
```

**REPLACE with:**
```typescript
import { GAME_BALANCE } from '@/config/gameConfig';

useEffect(() => {
  const interval = setInterval(() => {
    setPlayer(prev => applyStatChanges(
      prev,
      {
        energy: -GAME_BALANCE.statDecayRates.energy,
        hunger: GAME_BALANCE.statDecayRates.hunger,
      },
      STAT_LIMITS.player
    ));
  }, 60000);
  
  return () => clearInterval(interval);
}, []);
```

---

## 📊 Before/After Size Estimate

**Current page.tsx:** ~1,333 lines

**After refactoring:** ~800-900 lines (40% reduction)

**Removed:**
- ~150 lines of condition checking
- ~100 lines of stat manipulation
- ~80 lines of event management
- ~100 lines of helper functions
- ~100 lines of redundant logic

**Added:**
- ~20 lines of imports
- ~30 lines of event manager setup
- ~20 lines of utility usage

**Net:** ~400-500 lines removed

---

## ✅ Refactoring Checklist

When refactoring page.tsx, go through this checklist:

### Imports
- [ ] Add new system imports (event manager, stat manager, config)
- [ ] Remove old eventSystem imports
- [ ] Verify all imports resolve correctly

### Helper Functions
- [ ] Delete `checkEventConditions` (use event manager)
- [ ] Delete `findTriggeredEvent` (use event manager)
- [ ] Delete `recordEventTrigger` (use event manager)
- [ ] Delete `isEventOnCooldown` (use event manager)
- [ ] Delete `getGameTimeHours` (use calculateGameTime from config)
- [ ] Keep game-specific helpers (spendTime, moveTo, saveGame, etc.)

### Event Management
- [ ] Create memoized event manager instance
- [ ] Replace all `findTriggeredEvent` calls with `eventManager.findCharacterEvent`
- [ ] Replace all manual event recording with `eventManager.recordTrigger`
- [ ] Remove manual cooldown/repeatability checks

### Stat Management
- [ ] Replace all `Math.max(0, Math.min(100, ...))` with `applyStatChanges`
- [ ] Replace player stat updates
- [ ] Replace girl stat updates
- [ ] Add STAT_LIMITS import and usage

### Magic Numbers
- [ ] Replace hardcoded hours with TIME_CONFIG
- [ ] Replace energy costs with ACTIVITY_COSTS
- [ ] Replace stat thresholds with RELATIONSHIP_THRESHOLDS
- [ ] Replace rewards with ACTIVITY_REWARDS

### Testing After Each Change
- [ ] Game loads without errors
- [ ] Can move between locations
- [ ] Can interact with characters
- [ ] Events trigger correctly
- [ ] Stats update properly
- [ ] Save/load works
- [ ] Time progression works

---

## 🚨 Critical Things NOT to Change

**DO NOT touch these:**
- ✅ Component structure (the JSX/render logic)
- ✅ State variable names (useState declarations)
- ✅ Props passed to components
- ✅ UI event handlers (onClick, etc.)
- ✅ Save/load serialization format
- ✅ Dialogue system
- ✅ Location graph navigation
- ✅ Character unlock logic (just refactor the stat checks)

**ONLY refactor the internals** - how conditions are checked, how stats are updated, how events are managed.

---

## 💡 Tips for Refactoring

1. **Do it section by section** - Don't try to refactor everything at once
2. **Test after each section** - Make sure game still works
3. **Use Find & Replace** - Search for patterns like `Math.max(0, Math.min(100`
4. **Keep a backup** - `cp page.tsx page.tsx.backup` before starting
5. **Use git** - Commit after each working section
6. **Comment out old code first** - Don't delete immediately, comment and test

---

## 🎯 Priority Order

Refactor in this order for safest migration:

1. **First:** Add imports and event manager setup (doesn't break anything)
2. **Second:** Replace stat management (easy to test)
3. **Third:** Replace event triggering (most impactful)
4. **Fourth:** Replace magic numbers (polish)
5. **Last:** Delete old helper functions (cleanup)

---

## 📝 Example Refactoring Session

```typescript
// STEP 1: Find this old code
const handleWorkout = () => {
  setPlayer(prev => ({
    ...prev,
    energy: Math.max(0, prev.energy - 15),
    fitness: Math.min(100, prev.fitness + 2),
    mood: Math.max(0, prev.mood - 5),
  }));
  spendTime(2);
};

// STEP 2: Replace with new system
const handleWorkout = () => {
  setPlayer(prev => applyStatChanges(
    prev,
    {
      energy: -ACTIVITY_COSTS.energy.workout,
      ...ACTIVITY_REWARDS.workout.player,
    },
    STAT_LIMITS.player
  ));
  spendTime(ACTIVITY_COSTS.time.workout);
};

// STEP 3: Test - Does workout still work? ✅
// STEP 4: Move to next function
```

---

## 🎓 When You're Ready

**Send this message to Claude:**

```
I'm ready to refactor my page.tsx file. Here are my instructions:
[paste this entire file or reference it]

My current page.tsx is [X] lines long. Please help me:
1. Identify what can be removed
2. Show me what to replace it with  
3. Keep it working the same way
4. Make it shorter and cleaner

[Then paste your page.tsx content]
```

---

## ✨ Expected Results

After refactoring page.tsx, you should have:
- ✅ 40% less code
- ✅ No more repetitive if-statements
- ✅ No more Math.max/min chains
- ✅ Centralized configuration
- ✅ Same functionality
- ✅ Easier to maintain
- ✅ Easier to add new features

**The game should work EXACTLY the same, just with cleaner code!**

---

## 🆘 If Something Breaks

1. Check console for errors
2. Verify imports are correct
3. Check that event manager is created
4. Verify stat limits are imported
5. Test one interaction at a time
6. If stuck, revert to backup and try smaller changes

---

**Save this file and give it back to Claude when you're ready to refactor page.tsx!**
