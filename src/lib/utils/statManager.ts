// lib/utils/statManager.ts
/**
 * Generic stat management utilities to avoid repetitive stat manipulation code
 */

export interface StatChange {
  [key: string]: number;
}

export interface StatLimits {
  min?: number;
  max?: number;
}

export interface StatConfig {
  [statName: string]: StatLimits;
}

/**
 * Apply stat changes to an object, with optional limits
 */
export function applyStatChanges<T extends Record<string, any>>(
  currentStats: T,
  changes: Partial<T>,
  config?: Partial<Record<keyof T, StatLimits>>
): T {
  const newStats = { ...currentStats };

  for (const [key, change] of Object.entries(changes)) {
    if (change === undefined) continue;

    const currentValue = newStats[key as keyof T];
    if (typeof currentValue !== 'number' || typeof change !== 'number') continue;

    let newValue = currentValue + change;

    // Apply limits if configured
    const limits = config?.[key as keyof T];
    if (limits) {
      if (limits.min !== undefined) {
        newValue = Math.max(limits.min, newValue);
      }
      if (limits.max !== undefined) {
        newValue = Math.min(limits.max, newValue);
      }
    }

    newStats[key as keyof T] = newValue as T[keyof T];
  }

  return newStats;
}

/**
 * Create a stat modifier function with preset limits
 */
export function createStatModifier<T extends Record<string, any>>(
  config: Partial<Record<keyof T, StatLimits>>
) {
  return (currentStats: T, changes: Partial<T>): T => {
    return applyStatChanges(currentStats, changes, config);
  };
}

/**
 * Batch apply stat changes to multiple entities
 */
export function batchApplyStats<T extends Record<string, any>>(
  entities: Record<string, T>,
  changes: Record<string, Partial<T>>,
  config?: Partial<Record<keyof T, StatLimits>>
): Record<string, T> {
  const result: Record<string, T> = {};

  for (const [entityId, entity] of Object.entries(entities)) {
    const entityChanges = changes[entityId];
    result[entityId] = entityChanges
      ? applyStatChanges(entity, entityChanges, config)
      : entity;
  }

  return result;
}

/**
 * Calculate stat change preview (useful for UI)
 */
export function previewStatChange<T extends Record<string, any>>(
  currentStats: T,
  changes: Partial<T>,
  config?: Partial<Record<keyof T, StatLimits>>
): {
  before: T;
  after: T;
  differences: Partial<Record<keyof T, number>>;
} {
  const after = applyStatChanges(currentStats, changes, config);
  const differences: Partial<Record<keyof T, number>> = {};

  for (const key of Object.keys(changes)) {
    const typedKey = key as keyof T;
    const beforeValue = currentStats[typedKey];
    const afterValue = after[typedKey];
    
    if (typeof beforeValue === 'number' && typeof afterValue === 'number') {
      differences[typedKey] = afterValue - beforeValue;
    }
  }

  return {
    before: currentStats,
    after,
    differences,
  };
}

/**
 * Check if stats meet minimum requirements
 */
export function meetsStatRequirements<T extends Record<string, any>>(
  currentStats: T,
  requirements: Partial<T>
): boolean {
  for (const [key, requiredValue] of Object.entries(requirements)) {
    const currentValue = currentStats[key as keyof T];
    
    if (typeof currentValue === 'number' && typeof requiredValue === 'number') {
      if (currentValue < requiredValue) return false;
    }
  }

  return true;
}

/**
 * Get missing stat requirements
 */
export function getMissingRequirements<T extends Record<string, any>>(
  currentStats: T,
  requirements: Partial<T>
): Partial<Record<keyof T, number>> {
  const missing: Partial<Record<keyof T, number>> = {};

  for (const [key, requiredValue] of Object.entries(requirements)) {
    const currentValue = currentStats[key as keyof T];
    
    if (typeof currentValue === 'number' && typeof requiredValue === 'number') {
      if (currentValue < requiredValue) {
        missing[key as keyof T] = requiredValue - currentValue;
      }
    }
  }

  return missing;
}

/**
 * Clamp a value between min and max
 */
export function clampValue(value: number, min?: number, max?: number): number {
  let result = value;
  if (min !== undefined) result = Math.max(min, result);
  if (max !== undefined) result = Math.min(max, result);
  return result;
}

/**
 * Interpolate between two stat states
 */
export function interpolateStats<T extends Record<string, any>>(
  from: T,
  to: T,
  progress: number // 0 to 1
): T {
  const result = { ...from };
  const clampedProgress = clampValue(progress, 0, 1);

  for (const key of Object.keys(to)) {
    const typedKey = key as keyof T;
    const fromValue = from[typedKey];
    const toValue = to[typedKey];

    if (typeof fromValue === 'number' && typeof toValue === 'number') {
      result[typedKey] = (fromValue + (toValue - fromValue) * clampedProgress) as T[keyof T];
    }
  }

  return result;
}
