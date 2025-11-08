// lib/utils/conditionChecker.ts
/**
 * Generic condition checker that eliminates repetitive if-statement logic
 * Can be used for events, dialogues, choices, and any conditional logic
 */

export type ComparisonOperator = "gte" | "lte" | "gt" | "lt" | "eq" | "neq";

export interface Condition<T = unknown> {
  field: string;
  operator: ComparisonOperator;
  value: unknown;
  customCheck?: (context: T) => boolean;
}

export interface ConditionalRule<T = unknown> {
  conditions?: Condition<T>[];
  allOf?: ConditionalRule<T>[]; // All must be true (AND)
  anyOf?: ConditionalRule<T>[]; // At least one must be true (OR)
  noneOf?: ConditionalRule<T>[]; // None must be true (NOT)
  customCheck?: (context: T) => boolean;
}

/**
 * Get nested property value using dot notation
 */
export function getNestedValue(obj: unknown, path: string): unknown {
  // Type guard to ensure obj is an object
  if (!obj || typeof obj !== "object") {
    return undefined;
  }

  return path.split(".").reduce<unknown>((current: unknown, key: string) => {
    if (current && typeof current === "object" && key in current) {
      return (current as Record<string, unknown>)[key];
    }
    return undefined;
  }, obj);
}

/**
 * Compare two values based on operator
 */
export function compareValues(
  actual: unknown,
  operator: ComparisonOperator,
  expected: unknown
): boolean {
  // Type guard for numeric comparisons
  const isNumericComparison = (op: ComparisonOperator) =>
    op === "gte" || op === "lte" || op === "gt" || op === "lt";

  if (isNumericComparison(operator)) {
    // Ensure both values are numbers for numeric comparisons
    if (typeof actual !== "number" || typeof expected !== "number") {
      return false;
    }
  }

  switch (operator) {
    case "gte":
      return (actual as number) >= (expected as number);
    case "lte":
      return (actual as number) <= (expected as number);
    case "gt":
      return (actual as number) > (expected as number);
    case "lt":
      return (actual as number) < (expected as number);
    case "eq":
      return actual === expected;
    case "neq":
      return actual !== expected;
    default:
      return false;
  }
}

/**
 * Check if a single condition is met
 */
export function checkCondition<T>(
  condition: Condition<T>,
  context: T
): boolean {
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
export function checkConditionalRule<T>(
  rule: ConditionalRule<T>,
  context: T
): boolean {
  // Custom check takes precedence
  if (rule.customCheck) {
    return rule.customCheck(context);
  }

  // Check basic conditions (implicit AND)
  if (rule.conditions) {
    const allConditionsMet = rule.conditions.every((condition) =>
      checkCondition(condition, context)
    );
    if (!allConditionsMet) return false;
  }

  // Check allOf (AND)
  if (rule.allOf) {
    const allMet = rule.allOf.every((subRule) =>
      checkConditionalRule(subRule, context)
    );
    if (!allMet) return false;
  }

  // Check anyOf (OR)
  if (rule.anyOf) {
    const anyMet = rule.anyOf.some((subRule) =>
      checkConditionalRule(subRule, context)
    );
    if (!anyMet) return false;
  }

  // Check noneOf (NOT)
  if (rule.noneOf) {
    const noneMet = rule.noneOf.every(
      (subRule) => !checkConditionalRule(subRule, context)
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
    operator: "gte",
    value,
  }),

  maxStat: (field: string, value: number): Condition => ({
    field,
    operator: "lte",
    value,
  }),

  hasFlag: <T extends { flags?: Set<string> }>(
    flags: string[],
    flag: string
  ): Condition<T> => ({
    field: "flags",
    operator: "eq",
    value: true,
    customCheck: (context: T) => {
      const flagSet = context.flags as Set<string> | undefined;
      return flagSet?.has(flag) || flags.includes(flag);
    },
  }),

  inLocation: <T extends { currentLocation?: string }>(
    locations: string | string[]
  ): Condition<T> => ({
    field: "currentLocation",
    operator: "eq",
    value: Array.isArray(locations) ? locations[0] : locations,
    customCheck: (context: T) => {
      const current = context.currentLocation;
      return Array.isArray(locations)
        ? locations.includes(current || "")
        : current === locations;
    },
  }),

  timeRange: (minHour: number, maxHour: number): ConditionalRule => ({
    conditions: [
      { field: "hour", operator: "gte", value: minHour },
      { field: "hour", operator: "lt", value: maxHour },
    ],
  }),

  hasCompletedEvent: <T extends { completedEvents?: string[] }>(
    eventId: string
  ): Condition<T> => ({
    field: "completedEvents",
    operator: "eq",
    value: true,
    customCheck: (context: T) => {
      const completed = context.completedEvents as string[] | undefined;
      return completed?.includes(eventId) || false;
    },
  }),

  hasNotCompletedEvent: <T extends { completedEvents?: string[] }>(
    eventId: string
  ): Condition<T> => ({
    field: "completedEvents",
    operator: "eq",
    value: false,
    customCheck: (context: T) => {
      const completed = context.completedEvents as string[] | undefined;
      return !completed?.includes(eventId);
    },
  }),
};
