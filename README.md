# 🎯 Habit Tracker

A modern, interactive habit tracking application built with Astro, Vue.js, and TailwindCSS.

## ✨ Features

- **Daily Tracking**: Track your habits across the last 7 days with visual indicators
- **Streak Counter**: Automatic streak calculation to keep you motivated 🔥
- **Custom Colors**: Choose from 8 vibrant colors for each habit
- **Progress Overview**: See your daily completion percentage at a glance
- **Local Storage**: All data is saved locally in your browser
- **Dark Mode Ready**: Beautiful gradient backgrounds with dark mode support
- **Responsive Design**: Works seamlessly on desktop and mobile devices

## 🚀 Tech Stack

- **[Astro](https://astro.build)** - Fast, modern static site framework
- **[Vue.js 3](https://vuejs.org)** - Progressive JavaScript framework with Composition API
- **[TailwindCSS 4](https://tailwindcss.com)** - Utility-first CSS framework
- **TypeScript** - Type safety and better developer experience

## 🛠️ Getting Started

### Prerequisites

- Node.js 18+ 
- npm or pnpm

### Installation

```bash
cd habit-tracker
npm install
```

### Development

```bash
npm run dev
```

Open [http://localhost:4321](http://localhost:4321) in your browser.

### Build

```bash
npm run build
```

### Preview Production Build

```bash
npm run preview
```

## 📝 Usage

1. **Add a Habit**: Enter a habit name and choose a color, then click "Add"
2. **Track Daily**: Click on the day buttons to mark habits as complete
3. **Build Streaks**: Complete habits consecutively to build your streak
4. **Monitor Progress**: Check your daily completion percentage
5. **Delete Habits**: Click the X button to remove habits you no longer want to track

## 🎨 Customization

The app uses TailwindCSS, so you can easily customize:
- Colors in `src/components/HabitTracker.vue`
- Layout in `src/layouts/Layout.astro`
- Global styles in `src/styles/global.css`

## 📱 Features to Add (Resume Enhancement Ideas)

- Export/import habit data (JSON/CSV)
- Monthly/yearly calendar view
- Habit statistics and insights
- Reminder notifications
- Social sharing of streaks
- Goals and milestones
- Categories for habits
- Backend API integration (optional)

## 📄 License

MIT
