# Heart of the Valley

Heart of the Valley is a narrative-driven dating sim built with Next.js. Manage time, stats, and relationships while exploring locations, meeting characters, and triggering branching story events.

## Features
- Time management with a 24-hour day/night cycle and weekly schedules
- Character relationships with affection, trust, love, lust, and mood
- Player stats for energy, mood, hunger, fitness, intelligence, and style
- Conditional story events and random encounters
- Location-based activities with stat effects
- Save/load via browser localStorage
- Mobile-friendly UI

## Getting Started

### Prerequisites
- Node.js 18+
- npm (or your preferred package manager)

### Install
```bash
git clone <your-repo-url>
cd Heart-of-the-Valley
npm install
```

### Run Dev Server
```bash
npm run dev
```
Open http://localhost:3000

### Build and Start
```bash
npm run build
npm run start
```

### Lint
```bash
npm run lint
```

## Content Authoring
- Characters: `src/data/characters.ts`
- Events: `src/data/events/` and `src/data/events/chapter1/`
- Dialogues: `src/data/dialogues/`
- Activities: `src/data/LocationActivities.ts`
- Schedules: `src/data/characterSchedules.ts`

## Assets

### Character Images
Expected path format:
```
public/images/characters/<character>/<category>/<expression>.webp
```

Categories (from `src/lib/characterImages.ts`):
- home
- gym
- university
- beach
- city
- casual
- date

Expressions map to relationship stance or dialogue expressions (for example: neutral, shy, confident, love, intimate).

### Location Backgrounds
Expected path format:
```
public/images/locations/<location_key>/<time_of_day>.png
```

`location_key` is lowercased with spaces replaced by underscores and apostrophes removed.  
`time_of_day` is one of: morning, afternoon, night.  
Note: "evening" falls back to "afternoon" in `src/lib/locationImages.ts`.

## Project Structure
```
src/
  app/
    page.tsx
    globals.css
    layout.tsx
  components/
    CharacterOverlay.tsx
    DialogueBox.tsx
    LocationActivities.tsx
    PhoneMenu.tsx
    ...
  data/
    characters.ts
    dialogues/
    events/
    locations.ts
    ...
  lib/
    characterImages.ts
    eventSystem.ts
    schedule.ts
    ...
public/
  images/
    characters/
    locations/
```

## Tech Stack
- Next.js 15 (App Router)
- React 19
- TypeScript
- Tailwind CSS

## Contributing
Feedback and suggestions are welcome. If you want to contribute, open an issue or a PR describing the change and its impact.

## License
This project is for educational and portfolio purposes.
