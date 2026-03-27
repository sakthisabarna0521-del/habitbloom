import { Component, OnInit } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';

interface Habit {
  name: string;
  history?: string[];
  streak: number;
}

@Component({
  selector: 'app-streaks',
  templateUrl: './streaks.page.html',
  styleUrls: ['./streaks.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule]
})
export class StreaksPage implements OnInit {

  habits: Habit[] = [];

  totalHabits = 0;
  bestHabit = '';
  longestStreak = 0;

  isLoading = true;

  ngOnInit() {
    this.init();
  }

  ionViewWillEnter() {
    this.init(); // 🔥 refresh when coming back
  }

  init() {
    this.isLoading = true;

    setTimeout(() => {
      this.loadHabits();
      this.calculateOverallStats();
      this.isLoading = false;
    }, 200);
  }

  loadHabits() {

    try {
      const user = JSON.parse(localStorage.getItem('user') || '{}');

      if (!user.email) {
        this.habits = [];
        return;
      }

      const habitKey = `habits_${user.email}`;
      const data = localStorage.getItem(habitKey);

      this.habits = data ? JSON.parse(data) : [];

      // ensure safe data
      this.habits.forEach(h => {
        if (!h.history) h.history = [];
        if (!h.streak) h.streak = 0;
      });

      this.totalHabits = this.habits.length;

    } catch (e) {
      console.error("Streak load error", e);
      this.habits = [];
    }
  }

  calculateOverallStats() {
    if (this.habits.length === 0) {
      this.bestHabit = '';
      this.longestStreak = 0;
      return;
    }

    const sorted = [...this.habits].sort((a, b) => b.streak - a.streak);

    this.bestHabit = sorted[0]?.name || '';
    this.longestStreak = sorted[0]?.streak || 0;
  }

  getRecentDays(history: string[] = []) {
    return history.slice(-7).reverse();
  }
}
