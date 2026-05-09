# 🌊 HabitFlow – Daily Growth Tracker

## 📁 Folder Structure
```
habitflow/
│
├── index.html          ← Main file (open this in browser)
│
├── css/
│   ├── style.css       ← Shared styles (navbar, layout, cards)
│   └── pages.css       ← Page-specific styles (auth, dashboard, etc.)
│
└── js/
    ├── data.js         ← All data & localStorage (LOAD FIRST)
    ├── auth.js         ← Login, Signup, OTP, Logout
    ├── habits.js       ← CRUD: Add, Read, Update, Delete habits
    ├── progress.js     ← Charts, mood tracking, stats, AI quote
    └── app.js          ← Navigation, profile, app startup (LOAD LAST)
```

---

## 🚀 How to Run Locally
1. Open the `habitflow` folder in VS Code
2. Click **Go Live** (bottom right of VS Code)
3. Opens at: http://127.0.0.1:5500/index.html
4. Sign up with any email → use the OTP shown on screen
5. Start adding habits!

---

## 📚 What Each JS File Does (for learning)

| File | Responsibility | Key Functions |
|------|---------------|---------------|
| `data.js` | All data & helpers | `save()`, `today()`, `isCompleted()` |
| `auth.js` | User accounts | `handleLogin()`, `handleSignup()`, `verifyOTP()` |
| `habits.js` | CRUD operations | `addHabit()`, `toggleHabit()`, `confirmDelete()` |
| `progress.js` | Charts & stats | `renderProgress()`, `setMood()`, `loadFooterQuote()` |
| `app.js` | Navigation | `switchMainTab()`, `enterApp()`, `saveProfile()` |

---

## 🌐 How to Deploy on Netlify (FREE)

### Method 1 — Drag & Drop (Easiest)
1. Go to [netlify.com](https://netlify.com) → Sign up free
2. Click **"Add new site"** → **"Deploy manually"**
3. Drag your entire `habitflow` folder into the box
4. Wait 10 seconds → Get a free URL like `https://amazing-app-123.netlify.app` 🎉

### Method 2 — GitHub (Recommended for portfolio)
1. Create a [github.com](https://github.com) account
2. Create a new repository called `habitflow`
3. Upload all your files
4. Go to Netlify → **"Import from Git"** → Connect GitHub → Select repo
5. Click **Deploy** → Live URL in 30 seconds!

---

## ⚙️ Optional: Enable Real Email OTP
1. Go to [emailjs.com](https://emailjs.com) → Sign up free
2. Create a service (connect your Gmail)
3. Create a template with these variables:
   - `{{to_name}}` — recipient name
   - `{{to_email}}` — recipient email
   - `{{otp_code}}` — the 6-digit code
4. Open `js/auth.js` and replace:
```javascript
const EJS_SERVICE  = 'YOUR_SERVICE_ID'   // ← paste here
const EJS_TEMPLATE = 'YOUR_TEMPLATE_ID'  // ← paste here
const EJS_KEY      = 'YOUR_PUBLIC_KEY'   // ← paste here
```

---

## 🏆 Features (great for resume!)
- ✅ Full Authentication (Signup, Login, OTP Verification, Logout)
- ✅ CRUD Operations (Create, Read, Update, Delete habits)
- ✅ Daily Mood Tracking with 5 moods
- ✅ Progress Visualization (28-day heatmap, mood chart, breakdown bars)
- ✅ Streak Tracking 🔥
- ✅ AI-powered motivational quotes (Claude API)
- ✅ localStorage persistence (data saved even after closing browser)
- ✅ Fully Responsive (mobile friendly)
- ✅ Clean modular code structure

---

Built with ❤️ — HabitFlow Portfolio Project
