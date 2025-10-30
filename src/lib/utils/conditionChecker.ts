// lib/utils/conditionChecker.ts
/**
 * Generic condition checker that eliminates repetitive if-statement logic
 * Can be used for events, dialogues, choices, and any conditional logic
 */

export type ComparisonOperator = 'gte' | 'lte' | 'gt' | 'lt' | 'eq' | 'neq';

export interface Condition<T = any> {
  field: string;
  operator: ComparisonOperator;
  value: any;
  customCheck?: (context: T) => boolean;
}

export interface ConditionalRule<T = any> {
  conditions?: Condition<T>[];
  allOf?: ConditionalRule<T>[]; // All must be true (AND)
  anyOf?: ConditionalRule<T>[]; // At least one must be true (OR)
  noneOf?: ConditionalRule<T>[]; // None must be true (NOT)
  customCheck?: (context: T) => boolean;
}

/**
 * Get nested property value using dot notation
 */
export function getNestedValue(obj: any, path: string): any {
  return path.split('.').reduce((current, key) => current?.[key], obj);
}

/**
 * Compare two values based on operator
 */
export function compareValues(actual: any, operator: ComparisonOperator, expected: any): boolean {
  switch (operator) {
    case 'gte': return actual >= expected;
    case 'lte': return actual <= expected;
    case 'gt': return actual > expected;
    case 'lt': return actual < expected;
    case 'eq': return actual === expected;
    case 'neq': return actual !== expected;
    default: return false;
  }
}

/**
 * Check if a single condition is met
 */
export function checkCondition<T>(condition: Condition<T>, context: T): boolean {
  // Custom check takes precedence
  if (condition.customCheck) {
    return condition.customCheck(context);
  }

  const actualValue = getNestedValue(context, condition.field);
  return compareValues(actualValue, condition.operator, condition.value);
}

/**
 * Check if all conditions in a rule are met
 */
export function checkConditionalRule<T>(rule: ConditionalRule<T>, context: T): boolean {
  // Custom check takes precedence
  if (rule.customCheck) {
    return rule.customCheck(context);
  }

  // Check basic conditions (implicit AND)
  if (rule.conditions) {
    const allConditionsMet = rule.conditions.every(condition => 
      checkCondition(condition, context)
    );
    if (!allConditionsMet) return false;
  }

  // Check allOf (AND)
  if (rule.allOf) {
    const allMet = rule.allOf.every(subRule => 
      checkConditionalRule(subRule, context)
    );
    if (!allMet) return false;
  }

  // Check anyOf (OR)
  if (rule.anyOf) {
    const anyMet = rule.anyOf.some(subRule => 
      checkConditionalRule(subRule, context)
    );
    if (!anyMet) return false;
  }

  // Check noneOf (NOT)
  if (rule.noneOf) {
    const noneMet = rule.noneOf.every(subRule => 
      !checkConditionalRule(subRule, context)
    );
    if (!noneMet) return false;
  }

  return true;
}

/**
 * Helper to create common condition types
 */
export const ConditionHelpers = {
  minStat: (field: string, value: number): Condition => ({
    field,
    operator: 'gte',
    value,
  }),

  maxStat: (field: string, value: number): Condition => ({
    field,
    operator: 'lte',
    value,
  }),

  hasFlag: (flags: string[], flag: string): Condition => ({
    field: 'flags',
    operator: 'eq',
    value: true,
    customCheck: (context: any) => {
      const flagSet = context.flags as Set<string>;
      return flagSet?.has(flag) || flags.includes(flag);
    },
  }),

  inLocation: (locations: string | string[]): Condition => ({
    field: 'currentLocation',
    operator: 'eq',
    value: Array.isArray(locations) ? locations[0] : locations,
    customCheck: (context: any) => {
      const current = context.currentLocation;
      return Array.isArray(locations) 
        ? locations.includes(current)
        : current === locations;
    },
  }),

  timeRange: (minHour: number, maxHour: number): ConditionalRule => ({
    conditions: [
      { field: 'hour', operator: 'gte', value: minHour },
      { field: 'hour', operator: 'lt', value: maxHour },
    ],
  }),

  hasCompletedEvent: (eventId: string): Condition => ({
    field: 'completedEvents',
    operator: 'eq',
    value: true,
    customCheck: (context: any) => {
      const completed = context.completedEvents as string[];
      return completed?.includes(eventId) || false;
    },
  }),

  hasNotCompletedEvent: (eventId: string): Condition => ({
    field: 'completedEvents',
    operator: 'eq',
    value: false,
    customCheck: (context: any) => {
      const completed = context.completedEvents as string[];
      return !completed?.includes(eventId);
    },
  }),
};
