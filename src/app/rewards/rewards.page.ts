import { Component, OnInit } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';


interface Reward {
  title: string;
  streak: number;
  date: string;
}

interface Habit {
  name: string;
  streak: number;
}

@Component({
  selector: 'app-rewards',
  templateUrl: './rewards.page.html',
  styleUrls: ['./rewards.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule]
})
export class RewardsPage implements OnInit {

  rewards: Reward[] = [];
  habits: Habit[] = [];

  currentStreak = 0;
  totalGrowth = 0;
  runnerPosition = 0;
  gardenLevel = 1;
  progressOffset = 314;

  milestones = [
    { streak: 3, icon: '🌱' },
    { streak: 7, icon: '🌿' },
    { streak: 14, icon: '🌳' },
    { streak: 30, icon: '🏆' }
  ];

  ngOnInit() {
    this.loadHabits();
    this.loadRewards();
    this.calculateStats();
    this.calculateProgress();
    this.startRunnerAnimation();
  }

  loadHabits() {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    const habitKey = `habits_${user.email}`;
    this.habits = JSON.parse(localStorage.getItem(habitKey) || '[]');
  }

  loadRewards() {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    const rewardKey = `rewards_${user.email}`;
    this.rewards = JSON.parse(localStorage.getItem(rewardKey) || '[]');
  }

  calculateStats() {
    if (!this.habits.length) return;

    this.currentStreak = Math.max(...this.habits.map(h => h.streak), 0);

    this.totalGrowth = this.habits.reduce(
      (sum, habit) => sum + habit.streak,
      0
    );

    this.gardenLevel = Math.floor(this.currentStreak / 5) + 1;
  }

  calculateProgress() {
    const percent = Math.min(this.currentStreak * 5, 100);
    this.progressOffset = 314 - (314 * percent) / 100;
  }

  startRunnerAnimation() {
    const target = Math.min(this.currentStreak * 3, 100);
    let position = 0;

    const interval = setInterval(() => {
      if (position >= target) {
        clearInterval(interval);
      } else {
        position++;
        this.runnerPosition = position;
      }
    }, 15);
  }
}
