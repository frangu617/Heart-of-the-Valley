# 💖 Dating Sim Adventure

A narrative-driven dating simulation game built with Next.js, featuring dynamic character relationships, time management, and branching storylines.

## 🎮 Game Features

### Core Gameplay
- **Time Management System**: 24-hour day/night cycle with weekly schedules
- **Character Schedules**: Each character has unique daily routines and locations
- **Relationship Building**: Track affection, trust, love, lust, and mood for each character
- **Player Stats**: Manage energy, mood, hunger, fitness, intelligence, and style
- **Dynamic Events**: Random encounters and character-specific story events

### Characters
- **Iris**: Shy literature professor and mother of Dawn
- **Dawn**: Confident young woman, Iris's daughter
- **Ruby**: Athletic personal trainer at the gym
- **Yumi**: Independent student in your programming class
- **Gwen**: Bold neighbor with a mysterious side

### Game Systems
- **Dialogue System**: Choice-based conversations with stat impacts
- **Event System**: Conditional story events based on relationships and stats
- **Location Activities**: Context-sensitive activities at each location
- **Save/Load System**: Local storage persistence
- **Mobile-Responsive**: Phone menu and optimized mobile UI
- **Dark Mode**: Full dark theme support

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- npm, yarn, pnpm, or bun

### Installation

```bash
# Clone the repository
git clone <your-repo-url>

# Install dependencies
npm install

# Run development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to start playing!

## 🎨 Asset Organization

### Character Images
Located in `/public/images/characters/[character_name]/`

**Outfit Categories:**
- `home/` - Pajamas/sleepwear (used at night in home locations)
- `casual/` - Everyday clothes (daytime home & general locations)
- `gym/` - Athletic wear
- `university/` - Professional/academic attire
- `beach/` - Swimwear
- `date/` - Elegant outfits

**Expression Variants:**
- `neutral.png` - Default expression
- `happy.png` - Positive interactions
- `sad.png` - Negative situations  
- `love.png` - Romantic moments
- `shy.png` - Embarrassed/nervous
- `excited.png` - Excited moments
- `angry.png` - Angry situations


### Location Backgrounds
Located in `/public/images/locations/[location_name]/`

**Time Variants:**
- `morning.png` (6am-12pm)
- `afternoon.png` (12pm-6pm) - Default fallback
- `evening.png` (6pm-10pm)
- `night.png` (10pm-6am)

## 🏗️ Project Structure

```
src/
├── app/
│   ├── page.tsx           # Main game component
│   ├── globals.css        # Global styles & animations
│   └── layout.tsx         # Root layout
├── components/            # React components
│   ├── CharacterOverlay.tsx
│   ├── DialogueBox.tsx
│   ├── LocationActivities.tsx
│   ├── PhoneMenu.tsx
│   └── ...
├── data/                  # Game data & config
│   ├── characters.ts      # Character definitions
│   ├── dialogues/         # Dialogue trees
│   ├── events/           # Story events
│   ├── locations.ts      # Location graph
│   └── ...
└── lib/                   # Utility functions
    ├── characterImages.ts
    ├── eventSystem.ts
    ├── schedule.ts
    └── ...
```

## 🎯 Development Roadmap

- [ ] Complete character event chains
- [ ] Add more random events
- [ ] Expand dialogue trees with more branching
- [ ] Implement achievement system
- [ ] Add music and sound effects
- [ ] Create ending variations based on relationships
- [ ] Add more locations and activities

## 🛠️ Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **State Management**: React Hooks
- **Storage**: LocalStorage API

## 📝 License

This project is for educational and portfolio purposes.

## 🤝 Contributing

This is a personal project, but feedback and suggestions are welcome!