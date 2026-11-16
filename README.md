# Our First-Year Story 💕

Romantic single-page React experience that walks through your first-year milestones, photo memories, heartfelt notes, and an interactive "Unlock our future" puzzle.

## What's in it

- **Our year**: an envelope that opens into the letter, then 2025 month by month, then a four-letter puzzle that unlocks a note
- **Letters**: the handwritten cards and letters, with zoom
- **Places**: a world map with flight paths from home and one stamp per country. The map outlines are generated: see `scripts/build-world-map.mjs`
- **Edit mode**: press `Ctrl+K` (`Cmd+K` on Mac). There is no visible button, on purpose.

Colours and fonts live in `tailwind.config.js`. Dates (day counter, anniversary) live in `story` at the bottom of `src/data/content.ts`. Home on the map is `HOME` in `src/data/countries.ts`.

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ and npm/pnpm/yarn

### Installation

```bash
# Install dependencies
npm install   # or pnpm install / yarn install

# Start development server
npm run dev   # or pnpm dev / yarn dev
```

Then visit `http://localhost:5174`.

## 📝 Customizing Content

- Update the heading, the opening letter, photo captions, puzzle clues and the closing note in `src/data/content.ts`.
- Drop photos into `public/media/photos/<Month>` and add them to `monthlyTimelineData`.
- The note that appears after the puzzle is solved is `closingToast` in the same file.
- To change the background music, swap the `SONG_URL` constant inside `MusicToggle.tsx`.

## 🌐 Deployment

### GitHub Pages (Automatic)

This repository is set up with GitHub Actions to automatically deploy to GitHub Pages:

1. Push your code to the `main` branch
2. Go to your repository Settings → Pages
3. Select "GitHub Actions" as the source
4. The site will be available at `https://[your-username].github.io/anniversary-app/`

**Note**: Make sure to update the `base` path in `vite.config.ts` if your repository name is different from `anniversary-app`.

### Manual Deployment

1. Run `npm run build`
2. Deploy the generated `dist` folder with Vercel, Netlify, or any static host

## ✅ Quick QA Checklist

- [ ] Test puzzle input on desktop + mobile (ensure audio toggle still accessible)
- [ ] Verify gallery images load from `public/assets/gallery`
- [ ] Confirm QR code in the Share card points to your deployed URL
- [ ] Toggle music on/off to ensure autoplay permissions are handled
- [ ] Run `npm run build && npm run preview` before sharing
- [ ] Test country selection on the interactive map

## 🛠️ Tech Stack

- **React 18** - UI framework
- **TypeScript** - Type safety
- **Vite** - Build tool
- **Tailwind CSS** - Styling
- **Framer Motion** - Animations
- **Canvas Confetti** - Celebrations

## 📄 License

This project is private and personal.

---

Made with ❤️ for your special anniversary
