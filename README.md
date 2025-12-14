# Our First-Year Story 💕

Romantic single-page React experience that walks through your first-year milestones, photo memories, heartfelt notes, and an interactive "Unlock our future" puzzle.

## 🌟 Features

- **Interactive Timeline**: Beautiful monthly timeline of your relationship milestones
- **Memory Gallery**: Photo gallery with your special moments
- **Love Notes**: Heartfelt messages and memories
- **Interactive Map**: Track countries you've visited together with region-based selection
- **Puzzle Unlock**: Interactive puzzle to unlock your future together
- **Relationship Stats**: Days, hours, and minutes together
- **Love Meter**: Fun compatibility quiz
- **And much more!**

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

- Update copy, timeline events, gallery captions, puzzle clues, and closing toast in `src/data/content.ts`.
- Drop your own images into `public/assets/gallery` and match their filenames to the `image` fields.
- The celebratory note that appears after the puzzle is solved lives in `ClosingToast`.
- To change the background music, swap the `SONG_URL` constant inside `AmbientAudioToggle.tsx`.

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
