# Drum Pattern Quiz App

A web-based drum pattern quiz application that helps users learn to recognize and recreate drum patterns by ear. Listen to drum patterns, recreate them on a sequencer grid, and track your progress through a structured curriculum.

**Live App:** https://gjjones.github.io

## Features

### Complete Curriculum
- **14 progressive lessons** covering fundamental to advanced drumming concepts
- **210 total patterns** (15 per lesson) with difficulty ratings
- **4 curriculum phases:**
  - Phase 1: Foundation (Lessons 1-6) - Basic grooves and 16th note concepts
  - Phase 2: Review - Diagnostic and reinforcement (future expansion)
  - Phase 3: Extended Phrases (Lessons 7-9) - Two-bar phrasing, fills, variation
  - Phase 4: Advanced Mastery (Lessons 10-14) - Complete grooves, linear drumming, advanced techniques

### Smart Learning Experience
- **Adaptive difficulty:** First-time users see 10 patterns (easy + medium), returning users see all 15
- **Difficulty selector:** Filter by Easy (5), Medium (5), Hard (5), or All (15) for targeted practice
- **Visual feedback:** Color-coded difficulty badges (green/amber/red)
- **Warmup mode:** -15 BPM tempo reduction for building muscle memory

### Progress Tracking & Analytics
- **Quality-based metrics:** Track 22+ pedagogical qualities (syncopation, ghost-notes, tom-fills, etc.)
- **Spaced repetition:** Smart review intervals based on performance
- **Progress dashboard:** 5 metric cards showing completion, accuracy, and trends
- **Linear regression analysis:** Track improvement over time
- **Personalized recommendations:** AI-driven lesson suggestions

### Playback Options
- **MIDI output:** Connect to external drum modules or DAWs via Web MIDI API
- **Sample playback:** Built-in 808 drum kit using Web Audio API
- **Dual playback modes:**
  - Hidden Mode: Plays the correct answer pattern
  - Your Mode: Plays your current grid input for self-checking

### Professional Features
- **7 instruments:** Hi-Hat (HH), Open Hi-Hat (OH), Snare (SN), Kick (KD), High Tom (HT), Mid Tom (MT), Low Tom (LT)
- **Precise timing:** Web Audio API scheduler for accurate rhythm
- **8th and 16th note grids:** 16-step and 32-step patterns (2-measure phrases)
- **Tempo range:** 81-89 BPM (optimized for learning)
- **LocalStorage persistence:** Progress saved locally, no account required

## Local Development

### Prerequisites
- Node.js (v18 or higher recommended)
- npm (comes with Node.js)

### Setup

```bash
# Clone the repository
git clone https://github.com/gjjones/gjjones.github.io.git
cd gjjones.github.io

# Install dependencies
npm install

# Start development server
npm run dev
# App will open at http://localhost:3000
```

### Build for Production

```bash
# Create production build
npm run build

# Output will be in ./dist directory
```

### Available Scripts

- `npm run dev` - Start development server with hot reload
- `npm run build` - Build optimized production bundle
- `npm run preview` - Preview production build locally

## Tech Stack

### Core Technologies
- **React 19** - UI framework with hooks
- **TanStack Router** - Type-safe routing
- **Rspack** - Fast bundler (Rust-powered webpack alternative)

### Audio & MIDI
- **Web MIDI API** - Hardware MIDI device integration
- **Web Audio API** - Sample playback and precise timing
- No external audio libraries - native browser APIs only

### Storage & Deployment
- **LocalStorage** - Client-side progress persistence
- **GitHub Pages** - Static site hosting
- **GitHub Actions** - Automated deployment on push to master

## Project Structure

```
src/
├── components/          # React components
│   ├── DifficultySelector.jsx
│   ├── DifficultyBadge.jsx
│   ├── Header/
│   ├── LessonMenu.jsx
│   └── ProgressDashboard.jsx
├── data/               # Lesson data and curriculum
│   ├── lessons/        # 14 lesson files (lesson1.js - lesson14.js)
│   └── curriculumPhases.js
├── hooks/              # Custom React hooks
│   └── useProgressTracking.jsx
├── routes/             # Page routes
│   ├── QuizRoute.jsx   # Main quiz interface
│   └── MenuRoute.jsx
└── utils/              # Utility functions
    ├── patternUtils.js      # Pattern creation helpers
    ├── difficultyUtils.js   # Difficulty filtering logic
    └── curriculumLoader.js  # Lesson registration
```

## Lesson Pedagogy

### Pattern Structure
Each pattern includes:
- **Step data:** 2D array defining note placements across instruments
- **Resolution:** 8th or 16th note grid
- **Tempo:** 81-89 BPM range
- **Quality tags:** 1-3 pedagogical qualities (e.g., `syncopation`, `ghost-notes`)
- **Difficulty rating:** Easy, Medium, or Hard

### Quality-Based Learning
Patterns are tagged with 22+ qualities that map to drumming skills:
- Foundational: `downbeat-identification`, `upbeat-identification`, `rhythmic-anchoring`
- Technical: `16th-note-subdivision`, `ghost-notes`, `open-hihat-choking`
- Musical: `syncopation`, `backbeat-placement`, `displaced-backbeat`
- Advanced: `linear-drumming`, `tom-fills`, `complete-groove`

Progress tracking focuses on quality mastery rather than just completion rates.

## Deployment

The app automatically deploys to GitHub Pages on every push to the `master` branch.

**Live URL:** https://gjjones.github.io

### Manual Deployment
```bash
# Build and deploy
npm run build
# Push dist/ folder to gh-pages branch (handled by GitHub Actions)
```

## Known Limitations

### Browser Support
- **MIDI mode:** Requires browsers with Web MIDI API support (Chrome, Edge, Opera)
- **Audio mode:** Works in all modern browsers (Chrome, Firefox, Safari, Edge)
- Best experience on desktop browsers

### Storage
- Progress data stored in browser LocalStorage
- Not synced across devices or browsers
- Clearing browser data will reset progress

### Mobile
- Current UI optimized for desktop
- Mobile experience is functional but not fully optimized
- Touch interactions work but may need adjustments

### Audio
- MIDI requires external sound module or software synthesizer
- Sample playback included (808 kit auto-loads)
- No built-in metronome click track

## Development Notes

### Pattern Creation
Patterns are created using the `createPattern()` utility:

```javascript
import { createPattern } from '../utils/patternUtils.js';

const pattern = createPattern(
  steps,              // 2D array: instruments × time steps
  resolution,         // 'eighth' or 'sixteenth'
  tempo,              // 81-89 BPM
  qualities,          // ['syncopation', 'ghost-notes']
  difficulty          // 'easy', 'medium', or 'hard'
);
```

### Adding New Lessons
1. Create lesson file: `src/data/lessons/lesson[N].js`
2. Define 15 patterns (5 easy, 5 medium, 5 hard)
3. Export lesson object with metadata
4. Register in `src/data/lessons/index.js`
5. Update curriculum phase in `src/data/curriculumPhases.js`

See existing lesson files for reference structure.

## Contributing

This is a personal learning project. If you have suggestions or find bugs, feel free to open an issue.

## License

MIT License - See LICENSE file for details

## Acknowledgments

Built for personal drum education and music teaching. Inspired by ear training methodologies and spaced repetition learning systems.
