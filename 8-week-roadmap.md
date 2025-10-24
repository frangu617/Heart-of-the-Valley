# Heart of the Valley – 8nWeek Vertical Slice Roadmap
(Updated)
This document summarizes the 8nweek production roadmap for Heart of the Valley (HotV), integrating
recent improvements such as Zustand global state, save versioning, racencondition fixes, and a
scenenbased architecture.

## Week 1 — Architecture Split & Core State Store
Goal: Make the project easier to extend and debug by moving scene logic out of page.tsx and using
Zustand for global state. Deliverables: - GameRoot scene router - Scene separation (Menu, Dialogue,
Exploration) - Global store (gameStore, uiStore) - Strict TypeScript types and shared interfaces

## Week 2 — Energy + Daily Goals System
Goal: Add short-term gameplay loops and resource management. Deliverables: - Energy system with
pernaction costs - Daily goals JSON and UI - Save/load with save versioning and migration

## Week 3 — Branch Compression & Route Signals
Goal: Keep narrative scalable and reactive. Deliverables: - Route tracking and visual indicators -
Dialogue branch compression (shared checkpoints) - Persistent continuity flags
(lenoreIgnoredLastNight, etc.)

## Week 4 — Layered Visuals & Transitions
Goal: Improve immersion through smooth transitions and multinlayer rendering. Deliverables: -
SceneLayerManager component - Midground blending and transitions - Preloading for dialogue media

## Week 5 — Event Scheduler (Random → Scheduled Arcs)
Goal: Make the world feel persistent and predictable once conditions are met. Deliverables: - Weekly
schedule JSON - Scheduler engine for conditional events - Debug overlay for condition traces

## Week 6 — Menus, Phone UX, Gallery/CG Unlocks
Goal: Create retention and metanprogression systems. Deliverables: - In-game phone UI (messages,
map, tasks) - Gallery unlock system - Mobile accessibility and onenhand play UX

## Week 7 — Content Lock for the Vertical Slice
Goal: Deliver a coherent 45–60 minute playable slice. Deliverables: - Two full character arcs (Iris,
Lenore) - Mininjob gameplay segment - Routenbased narrative choices and endings

## Week 8 — QA, Build Hygiene, and Shipping
Goal: Stabilize builds and prepare for release. Deliverables: - Build consistency (Next.js route manifest
fix, Git hygiene) - Tutorial and onboarding - Error handling, crash guards, and regression testing

### Integrated Improvements
Additional Recommendations Integrated: - Context/Reducer for UI subnstates + Zustand for global
state. - Save versioning with migrations. - Dialogue renentrancy guards and loading states. - Memoized
event lookups with Maps. - Error boundaries and Debug overlay for development