// config/gameConfig.ts
/**
 * Centralized game configuration
 * Makes it easy to adjust game balance and settings in one place
 */

import { StatConfig } from '../lib/utils/statManager';
import { PlayerStats, GirlStats } from '../lib/game/characterEventSystem';

/**
 * Stat limits configuration
 */
export const STAT_LIMITS = {
  player: {
    energy: { min: 0, max: 100 },
    mood: { min: 0, max: 100 },
    hunger: { min: 0, max: 100 },
    fitness: { min: 0, max: 100 },
    intelligence: { min: 0, max: 100 },
    style: { min: 0, max: 100 },
    money: { min: 0, max: 999999 },
  } as StatConfig,

  girl: {
    affection: { min: 0, max: 100 },
    lust: { min: 0, max: 100 },
    mood: { min: 0, max: 100 },
    trust: { min: 0, max: 100 },
    love: { min: 0, max: 100 },
  } as StatConfig,
};

/**
 * Time configuration
 */
export const TIME_CONFIG = {
  DAYS_OF_WEEK: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'] as const,
  START_DAY: 'Monday' as const,
  START_HOUR: 8,
  MAX_HOUR: 24,
  HOURS_PER_DAY: 24,
  
  // Time periods
  MORNING: { start: 6, end: 12 },
  AFTERNOON: { start: 12, end: 18 },
  EVENING: { start: 18, end: 22 },
  NIGHT: { start: 22, end: 6 },
};

export type DayOfWeek = typeof TIME_CONFIG.DAYS_OF_WEEK[number];

/**
 * Activity costs configuration
 */
export const ACTIVITY_COSTS = {
  // Energy costs
  energy: {
    workout: 15,
    study: 10,
    work: 20,
    cook: 5,
    date: 10,
    sleep: -50, // Negative means it restores
    eat: 0,
    shop: 5,
  },

  // Time costs (in hours)
  time: {
    workout: 2,
    study: 2,
    work: 3,
    cook: 1,
    date: 3,
    sleep: 8,
    eat: 1,
    shop: 1,
  },

  // Money costs
  money: {
    fastFood: 10,
    restaurant: 30,
    fancyRestaurant: 80,
    coffee: 5,
    movie: 15,
    shopping: 50,
  },
};

/**
 * Activity rewards configuration
 */
export const ACTIVITY_REWARDS = {
  workout: {
    player: { fitness: 2, mood: -5 },
  },
  study: {
    player: { intelligence: 2, mood: -3 },
  },
  work: {
    player: { money: 50, mood: -10 },
  },
  cook: {
    player: { hunger: -30, mood: 5 },
  },
  sleep: {
    player: { energy: 100, mood: 10 },
  },
  eat: {
    player: { hunger: -40, mood: 5 },
  },
};

/**
 * Relationship thresholds
 */
export const RELATIONSHIP_THRESHOLDS = {
  friend: { affection: 20, trust: 15 },
  goodFriend: { affection: 40, trust: 30 },
  romantic: { affection: 60, trust: 50, love: 30 },
  partner: { affection: 80, trust: 70, love: 60 },
  soulmate: { affection: 95, trust: 90, love: 90 },
};

/**
 * Event priority levels
 */
export const EVENT_PRIORITIES = {
  CRITICAL: 100,     // Story-critical events, first meetings
  HIGH: 80,          // Important character development
  NORMAL: 50,        // Regular interactions
  LOW: 30,           // Flavor text, optional content
  AMBIENT: 10,       // Background events
};

/**
 * Cooldown presets (in hours)
 */
export const COOLDOWN_PRESETS = {
  NONE: 0,
  SHORT: 24,         // Once per day
  MEDIUM: 48,        // Every other day
  LONG: 168,         // Once per week
  VERY_LONG: 336,    // Once every two weeks
};

/**
 * Default starting stats
 */
export const DEFAULT_STATS = {
  player: {
    name: 'You',
    energy: 100,
    mood: 50,
    hunger: 50,
    fitness: 10,
    intelligence: 10,
    style: 10,
    money: 100,
    inventory: [],
  } as PlayerStats,

  girl: {
    affection: 0,
    lust: 0,
    mood: 50,
    trust: 0,
    love: 0,
  } as GirlStats,
};

/**
 * Character personalities and their traits
 */
export const PERSONALITY_TRAITS = {
  Shy: {
    trustGainMultiplier: 0.8,
    affectionGainMultiplier: 0.9,
    preferredLocations: ['Library', 'Cafe', 'Park'],
  },
  Confident: {
    trustGainMultiplier: 1.2,
    affectionGainMultiplier: 1.1,
    preferredLocations: ['Gym', 'Mall', 'Club'],
  },
  Jealous: {
    trustGainMultiplier: 0.7,
    affectionGainMultiplier: 1.0,
    lustLossOnOtherInteraction: 5,
  },
  Independent: {
    trustGainMultiplier: 1.0,
    affectionGainMultiplier: 0.9,
    respectsPersonalSpace: true,
  },
  Bold: {
    trustGainMultiplier: 1.1,
    affectionGainMultiplier: 1.2,
    lustGainMultiplier: 1.3,
  },
};

/**
 * Location categories
 */
export const LOCATION_CATEGORIES = {
  home: ['Bedroom', 'Kitchen', 'Living Room', 'Bathroom'],
  campus: ['Classroom', 'Library', 'Cafeteria', 'Hallway'],
  public: ['Mall', 'Cafe', 'Park', 'Cinema', 'Restaurant'],
  fitness: ['Gym'],
  nightlife: ['Club', 'Bar'],
};

/**
 * Helper to get time of day
 */
export function getTimeOfDay(hour: number): 'morning' | 'afternoon' | 'evening' | 'night' {
  if (hour >= TIME_CONFIG.MORNING.start && hour < TIME_CONFIG.AFTERNOON.start) {
    return 'morning';
  } else if (hour >= TIME_CONFIG.AFTERNOON.start && hour < TIME_CONFIG.EVENING.start) {
    return 'afternoon';
  } else if (hour >= TIME_CONFIG.EVENING.start && hour < TIME_CONFIG.NIGHT.start) {
    return 'evening';
  } else {
    return 'night';
  }
}

/**
 * Helper to get next day
 */
export function getNextDay(currentDay: DayOfWeek): DayOfWeek {
  const currentIndex = TIME_CONFIG.DAYS_OF_WEEK.indexOf(currentDay);
  const nextIndex = (currentIndex + 1) % TIME_CONFIG.DAYS_OF_WEEK.length;
  return TIME_CONFIG.DAYS_OF_WEEK[nextIndex];
}

/**
 * Helper to calculate game time
 */
export function calculateGameTime(day: DayOfWeek, hour: number): number {
  const dayIndex = TIME_CONFIG.DAYS_OF_WEEK.indexOf(day);
  return (dayIndex >= 0 ? dayIndex : 0) * TIME_CONFIG.HOURS_PER_DAY + hour;
}

/**
 * Game balance configuration (easy to adjust for difficulty)
 */
export const GAME_BALANCE = {
  // How quickly stats decay
  statDecayRates: {
    energy: 5, // per hour
    mood: 2,
    hunger: 3,
  },

  // Relationship stat gains/losses
  relationshipMultipliers: {
    positive: 1.0,
    negative: 1.5, // Easier to lose than gain
  },

  // Random event chances
  randomEventChance: 0.15, // 15% chance per location change

  // Unlock requirements
  characterUnlockRequirements: {
    Yumi: { playerIntelligence: 15 },
    Gwen: { playerStyle: 20 },
    Dawn: { flags: ['hasMetIris'] },
    Ruby: { playerFitness: 20 },
  },
};

/**
 * UI Configuration
 */
export const UI_CONFIG = {
  animationDuration: 300, // ms
  toastDuration: 3000, // ms
  autoSaveInterval: 300000, // 5 minutes in ms
  
  colors: {
    primary: 'purple',
    secondary: 'pink',
    success: 'green',
    warning: 'yellow',
    danger: 'red',
  },
  
  statColors: {
    affection: '#e91e63', // pink
    trust: '#2196f3', // blue
    love: '#f44336', // red
    lust: '#9c27b0', // purple
    mood: '#ffeb3b', // yellow
  },
};
