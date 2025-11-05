// lib/core/eventSystem.ts
/**
 * Generic event system that works for any type of event
 * Eliminates duplication across character events, random events, location events, etc.
 */

import {
  ConditionalRule,
  checkConditionalRule,
} from "../utils/conditionChecker";

export interface BaseEvent<
  TContext extends EventContext = EventContext,
  TRewards = unknown
> {
  id: string;
  name: string;
  description?: string;
  priority: number;
  repeatable: boolean;
  cooldownHours?: number;
  conditions?: ConditionalRule<TContext>;
  rewards?: TRewards;
  tags?: string[]; // For categorization and filtering
}

export interface EventHistory {
  eventId: string;
  lastTriggered: {
    timestamp: number; // Game time or real timestamp
    metadata?: Record<string, unknown>; // Additional context
  };
  timesTriggered: number;
}

export interface EventContext {
  currentTime: number;
  eventHistory: EventHistory[];
  [key: string]: unknown;
}

/**
 * Generic event manager that handles any type of event
 */
export class EventManager<
  TEvent extends BaseEvent<TContext>,
  TContext extends EventContext
> {
  private events: TEvent[] = [];

  constructor(events?: TEvent[]) {
    if (events) {
      this.events = events;
    }
  }

  /**
   * Register a new event
   */
  addEvent(event: TEvent): void {
    this.events.push(event);
  }

  /**
   * Register multiple events
   */
  addEvents(events: TEvent[]): void {
    this.events.push(...events);
  }

  /**
   * Remove an event by ID
   */
  removeEvent(eventId: string): void {
    this.events = this.events.filter((e) => e.id !== eventId);
  }

  /**
   * Get an event by ID
   */
  getEvent(eventId: string): TEvent | undefined {
    return this.events.find((e) => e.id === eventId);
  }

  /**
   * Get events by tag
   */
  getEventsByTag(tag: string): TEvent[] {
    return this.events.filter((e) => e.tags?.includes(tag));
  }

  /**
   * Check if an event is on cooldown
   */
  isOnCooldown(event: TEvent, context: TContext): boolean {
    if (!event.cooldownHours) return false;

    const history = context.eventHistory.find((h) => h.eventId === event.id);
    if (!history) return false;

    const hoursSinceLastTrigger =
      context.currentTime - history.lastTriggered.timestamp;
    return hoursSinceLastTrigger < event.cooldownHours;
  }

  /**
   * Check if an event has been completed
   */
  hasBeenCompleted(eventId: string, context: TContext): boolean {
    return context.eventHistory.some(
      (h) => h.eventId === eventId && h.timesTriggered > 0
    );
  }

  /**
   * Check if an event can trigger
   */
  canTrigger(event: TEvent, context: TContext): boolean {
    // Check if already completed and not repeatable
    if (!event.repeatable && this.hasBeenCompleted(event.id, context)) {
      return false;
    }

    // Check cooldown
    if (this.isOnCooldown(event, context)) {
      return false;
    }

    // Check conditions
    if (event.conditions) {
      return checkConditionalRule(event.conditions, context);
    }

    return true;
  }

  /**
   * Find the best event to trigger based on priority
   */
  findTriggeredEvent(
    context: TContext,
    filter?: (event: TEvent) => boolean
  ): TEvent | null {
    // Sort by priority (highest first)
    const sortedEvents = [...this.events].sort(
      (a, b) => b.priority - a.priority
    );

    for (const event of sortedEvents) {
      // Apply custom filter if provided
      if (filter && !filter(event)) {
        continue;
      }

      if (this.canTrigger(event, context)) {
        return event;
      }
    }

    return null;
  }

  /**
   * Find all events that can trigger
   */
  findAllTriggeredEvents(
    context: TContext,
    filter?: (event: TEvent) => boolean
  ): TEvent[] {
    return this.events
      .filter((event) => {
        if (filter && !filter(event)) return false;
        return this.canTrigger(event, context);
      })
      .sort((a, b) => b.priority - a.priority);
  }

  /**
   * Record that an event was triggered
   */
  recordTrigger(
    eventId: string,
    eventHistory: EventHistory[],
    currentTime: number,
    metadata?: Record<string, unknown>
  ): EventHistory[] {
    const existingIndex = eventHistory.findIndex((h) => h.eventId === eventId);

    if (existingIndex >= 0) {
      // Update existing history
      const updated = [...eventHistory];
      updated[existingIndex] = {
        ...updated[existingIndex],
        lastTriggered: { timestamp: currentTime, metadata },
        timesTriggered: updated[existingIndex].timesTriggered + 1,
      };
      return updated;
    } else {
      // Add new history entry
      return [
        ...eventHistory,
        {
          eventId,
          lastTriggered: { timestamp: currentTime, metadata },
          timesTriggered: 1,
        },
      ];
    }
  }

  /**
   * Get statistics for an event
   */
  getEventStats(eventId: string, context: TContext) {
    const history = context.eventHistory.find((h) => h.eventId === eventId);
    const event = this.getEvent(eventId);

    return {
      event,
      timesTriggered: history?.timesTriggered || 0,
      lastTriggered: history?.lastTriggered,
      canTriggerNow: event ? this.canTrigger(event, context) : false,
      isOnCooldown: event ? this.isOnCooldown(event, context) : false,
    };
  }

  /**
   * Get all events
   */
  getAllEvents(): TEvent[] {
    return [...this.events];
  }

  /**
   * Clear all events
   */
  clearEvents(): void {
    this.events = [];
  }
}

/**
 * Create a specialized event manager for a specific event type
 */
export function createEventManager<
  TEvent extends BaseEvent<TContext>,
  TContext extends EventContext
>(events?: TEvent[]): EventManager<TEvent, TContext> {
  return new EventManager<TEvent, TContext>(events);
}

/**
 * Helper to create event factory functions
 */
export function createEventFactory<TEvent extends BaseEvent<any>>(
  defaults: Partial<TEvent>
) {
  return (overrides: Partial<TEvent> & Pick<TEvent, "id" | "name">): TEvent => {
    return {
      ...defaults,
      ...overrides,
    } as TEvent;
  };
}
