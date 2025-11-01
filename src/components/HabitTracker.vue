<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';

interface Habit {
  id: string;
  name: string;
  color: string;
  streak: number;
  completions: Record<string, boolean>;
}

const habits = ref<Habit[]>([]);
const newHabitName = ref('');
const selectedColor = ref('#6366f1');

const colors = [
  '#6366f1',
  '#ec4899',
  '#8b5cf6',
  '#14b8a6',
  '#f59e0b',
  '#ef4444',
  '#10b981',
  '#3b82f6',
];

// Get today's date string
const getTodayString = () => {
  return new Date().toISOString().split('T')[0];
};

// Get last 7 days
const last7Days = computed(() => {
  const days = [];
  for (let i = 6; i >= 0; i--) {
    const date = new Date();
    date.setDate(date.getDate() - i);
    days.push({
      date: date.toISOString().split('T')[0],
      label: date.toLocaleDateString('en-US', { weekday: 'short' }),
    });
  }
  return days;
});

// Load habits from localStorage
onMounted(() => {
  const stored = localStorage.getItem('habits');
  if (stored) {
    habits.value = JSON.parse(stored);
  }
});

// Save habits to localStorage
const saveHabits = () => {
  localStorage.setItem('habits', JSON.stringify(habits.value));
};

// Add new habit
const addHabit = () => {
  if (!newHabitName.value.trim()) return;

  const newHabit: Habit = {
    id: Date.now().toString(),
    name: newHabitName.value.trim(),
    color: selectedColor.value,
    streak: 0,
    completions: {},
  };

  habits.value.push(newHabit);
  newHabitName.value = '';
  saveHabits();
};

// Toggle habit completion
const toggleCompletion = (habit: Habit, date: string) => {
  if (!habit.completions[date]) {
    habit.completions[date] = true;
  } else {
    delete habit.completions[date];
  }

  // Calculate streak
  habit.streak = calculateStreak(habit);
  saveHabits();
};

// Calculate current streak
const calculateStreak = (habit: Habit): number => {
  let streak = 0;
  const today = new Date();

  for (let i = 0; i < 365; i++) {
    const date = new Date(today);
    date.setDate(date.getDate() - i);
    const dateString = date.toISOString().split('T')[0];

    if (habit.completions[dateString]) {
      streak++;
    } else {
      break;
    }
  }

  return streak;
};

// Delete habit
const deleteHabit = (id: string) => {
  habits.value = habits.value.filter(h => h.id !== id);
  saveHabits();
};

// Get completion percentage for today
const getTodayCompletion = computed(() => {
  if (habits.value.length === 0) return 0;
  const today = getTodayString();
  const completed = habits.value.filter(h => h.completions[today]).length;
  return Math.round((completed / habits.value.length) * 100);
});
</script>

<template>
  <div class="max-w-4xl mx-auto p-4 sm:p-6">
    <!-- Header -->
    <div class="mb-6 sm:mb-8">
      <h1
        class="text-3xl sm:text-4xl font-bold text-slate-800 dark:text-white mb-2">
        Habit Tracker
      </h1>
      <p class="text-sm sm:text-base text-slate-600 dark:text-slate-400">
        Build consistency, one day at a time
      </p>
    </div>

    <!-- Today's Progress -->
    <div
      class="bg-white dark:bg-slate-800 rounded-xl sm:rounded-2xl shadow-lg p-4 sm:p-6 mb-4 sm:mb-6">
      <div class="flex items-center justify-between mb-3 sm:mb-4">
        <h2
          class="text-lg sm:text-xl font-semibold text-slate-800 dark:text-white">
          Today's Progress
        </h2>
        <span
          class="text-2xl sm:text-3xl font-bold text-indigo-600 dark:text-indigo-400">
          {{ getTodayCompletion }}%
        </span>
      </div>
      <div
        class="w-full bg-slate-200 dark:bg-slate-700 rounded-full h-2.5 sm:h-3">
        <div
          class="bg-gradient-to-r from-indigo-500 to-purple-500 h-2.5 sm:h-3 rounded-full transition-all duration-500"
          :style="{ width: getTodayCompletion + '%' }"></div>
      </div>
    </div>
    <!-- Add New Habit -->
    <div
      class="bg-white dark:bg-slate-800 rounded-xl sm:rounded-2xl shadow-lg p-4 sm:p-6 mb-4 sm:mb-6">
      <h2
        class="text-lg sm:text-xl font-semibold text-slate-800 dark:text-white mb-3 sm:mb-4">
        Add New Habit
      </h2>
      <div class="flex flex-col gap-3">
        <input
          v-model="newHabitName"
          @keyup.enter="addHabit"
          type="text"
          placeholder="e.g., Drink 8 glasses of water"
          class="w-full px-3 py-2.5 sm:px-4 sm:py-3 rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-800 dark:text-white focus:ring-2 focus:ring-indigo-500 outline-none text-sm sm:text-base" />
        <div class="flex items-center gap-2">
          <div class="flex flex-wrap gap-1.5 flex-1">
            <button
              v-for="color in colors"
              :key="color"
              @click="selectedColor = color"
              class="w-8 h-8 sm:w-10 sm:h-10 rounded-lg transition-transform active:scale-95 sm:hover:scale-110"
              :class="{
                'ring-2 ring-slate-400 scale-95 sm:scale-110':
                  selectedColor === color,
              }"
              :style="{ backgroundColor: color }"></button>
          </div>
          <button
            @click="addHabit"
            class="px-5 sm:px-6 py-2.5 sm:py-3 bg-indigo-600 hover:bg-indigo-700 active:bg-indigo-800 text-white font-medium rounded-lg transition-colors text-sm sm:text-base whitespace-nowrap">
            Add
          </button>
        </div>
      </div>
    </div>

    <!-- Habits List -->
    <div v-if="habits.length === 0" class="text-center py-8 sm:py-12">
      <p class="text-slate-500 dark:text-slate-400 text-base sm:text-lg px-4">
        No habits yet. Add your first habit to get started! 🚀
      </p>
    </div>

    <div v-else class="space-y-3 sm:space-y-4">
      <div
        v-for="habit in habits"
        :key="habit.id"
        class="bg-white dark:bg-slate-800 rounded-xl sm:rounded-2xl shadow-lg p-4 sm:p-6 hover:shadow-xl transition-shadow">
        <div
          class="flex items-start sm:items-center justify-between mb-3 sm:mb-4 gap-2">
          <div class="flex items-center gap-2 sm:gap-3 flex-1 min-w-0">
            <div
              class="w-3 h-3 sm:w-4 sm:h-4 rounded-full flex-shrink-0"
              :style="{ backgroundColor: habit.color }"></div>
            <h3
              class="text-base sm:text-lg font-semibold text-slate-800 dark:text-white truncate">
              {{ habit.name }}
            </h3>
          </div>
          <div class="flex items-center gap-2 sm:gap-4 flex-shrink-0">
            <div class="text-right">
              <p class="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
                Streak
              </p>
              <p
                class="text-xl sm:text-2xl font-bold text-orange-500 leading-tight">
                {{ habit.streak }} 🔥
              </p>
            </div>
            <button
              @click="deleteHabit(habit.id)"
              class="text-slate-400 hover:text-red-500 active:text-red-600 transition-colors p-1">
              <svg
                class="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24">
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>

        <div class="grid grid-cols-7 gap-1 sm:gap-2">
          <button
            v-for="day in last7Days"
            :key="day.date"
            @click="toggleCompletion(habit, day.date)"
            class="flex flex-col items-center justify-center gap-1 sm:gap-2 py-2 sm:py-3 rounded-md sm:rounded-lg transition-all active:scale-95"
            :class="
              habit.completions[day.date]
                ? 'bg-gradient-to-br shadow-md'
                : 'bg-slate-100 dark:bg-slate-700 active:bg-slate-200 dark:active:bg-slate-600'
            "
            :style="
              habit.completions[day.date]
                ? {
                    backgroundImage: `linear-gradient(to bottom right, ${habit.color}, ${habit.color}dd)`,
                    color: 'white',
                  }
                : {}
            ">
            <span
              class="text-[10px] sm:text-xs font-medium leading-tight"
              :class="
                habit.completions[day.date]
                  ? 'text-white'
                  : 'text-slate-600 dark:text-slate-300'
              ">
              {{ day.label }}
            </span>
            <span class="text-base sm:text-xl leading-none">
              {{ habit.completions[day.date] ? '✓' : '○' }}
            </span>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
