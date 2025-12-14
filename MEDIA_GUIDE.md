# 📸 Media & Content Editing Guide

## 🎨 Adding Photos & Videos

### Step 1: Add Your Media Files

1. **Photos**: Add your photos to `public/media/photos/`
   - Supported formats: JPG, JPEG, PNG, GIF, WebP
   - Recommended size: 1200x800px or larger
   - Keep file sizes under 2MB each

2. **Videos**: Add your videos to `public/media/videos/`
   - Supported formats: MP4, WebM, MOV
   - Recommended: MP4 (H.264 codec)
   - Keep file sizes under 50MB each

### Step 2: Edit Content Using Admin Panel

1. **Open Admin Panel**: 
   - Click the floating edit button (bottom right) ✏️
   - Or press `Ctrl+K` (Windows/Linux) or `Cmd+K` (Mac)

2. **Edit Gallery**:
   - Go to the "Gallery" tab
   - Click "+ Add New Memory" to add new items
   - Update image/video paths (use `/media/photos/photo-1.jpg` or `/media/videos/video-1.mp4`)
   - Edit captions and alt text
   - Delete items you don't want

3. **Edit Other Content**:
   - **Hero**: Edit the main heading, subheading, dedication, and button text
   - **Timeline**: Edit milestone dates, locations, titles, and descriptions
   - **Notes**: Edit love note titles, bodies, and promises
   - **Closing**: Edit the closing message

4. **Save Changes**: Click "Save Changes" button

## 🎯 Tips & Best Practices

### Photo Naming
- Use descriptive names: `first-date.jpg`, `beach-picnic.jpg`
- Or numbered: `photo-1.jpg`, `photo-2.jpg`
- The website will automatically display them

### Video Tips
- Videos will autoplay on hover (muted)
- Click to play with sound
- Use MP4 format for best compatibility

### Content Editing
- All changes are saved to your browser's localStorage
- Changes persist across page refreshes
- Use "Reset to Defaults" to restore original content

## 🎨 New Features

### ✨ Countdown Timer
- Edit the target date in `App.tsx` (line with `CountdownTimer`)
- Change `targetDate="2025-12-14"` to your next anniversary date

### 💕 Love Meter Quiz
- Interactive quiz to test your relationship knowledge
- Fun way to engage with the content

### 🖼️ Photo Lightbox
- Click any photo in the gallery to view it fullscreen
- Works with both photos and videos

### 🎬 Video Support
- Videos automatically detected in the gallery
- Play button overlay on hover
- Fullscreen playback on click

## 🚀 Quick Start

1. Add photos to `public/media/photos/`
2. Add videos to `public/media/videos/`
3. Press `Ctrl+K` to open admin panel
4. Edit gallery items to point to your media files
5. Customize captions and text
6. Save and enjoy!

## 📝 File Structure

```
anniversary-app/
├── public/
│   ├── media/
│   │   ├── photos/          ← Add your photos here
│   │   │   ├── photo-1.jpg
│   │   │   ├── photo-2.jpg
│   │   │   └── ...
│   │   └── videos/           ← Add your videos here
│   │       ├── video-1.mp4
│   │       └── ...
│   └── assets/
└── src/
    ├── components/
    │   ├── AdminPanel.tsx    ← Content editing interface
    │   ├── MemoryGallery.tsx ← Gallery with lightbox
    │   └── ...
    └── utils/
        └── contentManager.ts  ← Content persistence
```

## 🎉 Have Fun!

This website is designed to be easily customizable. Add your memories, edit the text to match your story, and make it uniquely yours!

