# 🔥 Firebase Setup Guide

This guide will help you set up Firebase to store your anniversary app data online instead of locally.

## 📋 Prerequisites

- A Google account (Gmail account works)
- 10-15 minutes of time

## 🚀 Step-by-Step Setup

### Step 1: Create Firebase Project

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Click **"Add project"** or **"Create a project"**
3. Enter a project name (e.g., "anniversary-app")
4. Click **"Continue"**
5. **Disable Google Analytics** (optional, you can enable later if needed)
6. Click **"Create project"**
7. Wait for project creation (30 seconds)
8. Click **"Continue"**

### Step 2: Register Your Web App

1. In your Firebase project, click the **Web icon** (`</>`) or **"Add app"** > **Web**
2. Register app nickname: `anniversary-app` (or any name)
3. **Check** "Also set up Firebase Hosting" (optional, but recommended)
4. Click **"Register app"**
5. **Copy the Firebase configuration object** - it looks like this:

```javascript
const firebaseConfig = {
  apiKey: "AIza...",
  authDomain: "your-project.firebaseapp.com",
  projectId: "your-project-id",
  storageBucket: "your-project.appspot.com",
  messagingSenderId: "123456789",
  appId: "1:123456789:web:abc123"
};
```

### Step 3: Enable Firestore Database

1. In Firebase Console, click **"Firestore Database"** in the left menu
2. Click **"Create database"**
3. Select **"Start in test mode"** (for now - we'll secure it later)
4. Choose a location (pick the closest to you)
5. Click **"Enable"**

### Step 4: Skip Firebase Storage (Not Needed!)

**Good news!** You don't need Firebase Storage. Images are stored as base64 directly in Firestore, which is **completely FREE** on the Spark plan!

- ✅ No Blaze plan required
- ✅ Images stored in Firestore (free tier: 1GB)
- ✅ No additional setup needed

### Step 5: Configure Your App

1. In your project folder, create a file named `.env` in the root directory
2. Add your Firebase config values:

```env
VITE_FIREBASE_API_KEY=your-api-key-here
VITE_FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your-project-id
VITE_FIREBASE_STORAGE_BUCKET=your-project.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=123456789
VITE_FIREBASE_APP_ID=1:123456789:web:abc123
```

**Important:** Replace all the values with your actual Firebase config values from Step 2.

### Step 6: Secure Your Database (Important!)

1. Go to **Firestore Database** > **Rules** tab
2. Replace the rules with:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Allow read/write access to all documents (for now)
    // TODO: Add authentication for better security
    match /{document=**} {
      allow read, write: if true;
    }
  }
}
```

3. Click **"Publish"**

### Step 7: Skip Storage Rules (Not Needed!)

Since we're not using Firebase Storage, you can skip this step entirely!

### Step 8: Test Your Setup

1. Restart your development server:
   ```bash
   # Stop the server (Ctrl+C)
   # Then start it again
   npm run dev
   ```

2. Open your app in the browser
3. Try adding a country or uploading a photo
4. Check Firebase Console:
   - **Firestore Database** > **Data** tab - you should see collections with your data
   - Images are stored as base64 in Firestore documents (not in Storage)

## ✅ Verification Checklist

- [ ] Firebase project created
- [ ] Web app registered
- [ ] Firestore Database enabled
- [ ] `.env` file created with config values
- [ ] Firestore rules updated
- [ ] App tested and working

## 🎉 You're Done!

Your app now stores data online! All your:
- ✅ Photos are stored as base64 in Firestore (FREE - no Blaze plan needed!)
- ✅ Countries are stored in Firestore
- ✅ Gallery, timeline, and notes are stored in Firestore
- ✅ Data syncs across all devices
- ✅ Everything works on the FREE Spark plan!

## 🔒 Security Note (Optional but Recommended)

For better security, you can:
1. Enable Firebase Authentication
2. Update Firestore/Storage rules to require authentication
3. Add password protection to your app

For now, the current setup works fine for personal use.

## 🆘 Troubleshooting

### "Firebase not configured" error
- Check that `.env` file exists in the root directory
- Make sure all `VITE_FIREBASE_*` variables are set
- Restart your dev server after creating `.env`

### "Permission denied" error
- Check Firestore and Storage rules are published
- Make sure rules allow read/write access

### Images not uploading
- Images are converted to base64 and stored in Firestore
- Check browser console for errors
- Make sure image files are valid (JPG, PNG, etc.)

### Data not saving
- Check Firestore is enabled
- Check Firestore rules allow writes
- Check browser console for errors

## 📚 Additional Resources

- [Firebase Documentation](https://firebase.google.com/docs)
- [Firestore Documentation](https://firebase.google.com/docs/firestore)
- [Firebase Storage Documentation](https://firebase.google.com/docs/storage)

## 💰 Pricing - 100% FREE!

Firebase **Spark plan (FREE)** is all you need:
- **Firestore**: 1GB storage, 50K reads/day, 20K writes/day
- **Images**: Stored as base64 in Firestore (no Storage needed!)
- **No Blaze plan required** - everything works on the free tier!

For a personal anniversary app, you'll likely stay within the free tier. Even with many photos, base64 images stored in Firestore are completely free!

---

**Need help?** Check the console for error messages or review the Firebase Console for any issues.
