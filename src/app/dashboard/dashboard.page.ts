import { Component } from '@angular/core';
import { IonicModule, AlertController } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

interface Habit {
  name: string;
  description: string;
  frequency: 'Daily' | 'Weekly';
  plant: string;
  streak: number;
  lastCompleted: string | null;
  milestoneRewards: string[];
}

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class DashboardPage {

  user: any = {};
  lastLogin: string = new Date().toDateString();
  habits: Habit[] = [];

  completedToday = 0;
  currentStreak = 0;
  longestStreak = 0;

  // 🔥 Undo System
  showUndo = false;
  deletedHabit: Habit | null = null;
  deletedIndex = -1;
  undoTimeout: any;

  constructor(
    private router: Router,
    private alertController: AlertController
  ) {
    this.loadUser();
    this.loadHabits();
  }

 isProfileOpen = false;

toggleProfileDropdown() {
  this.isProfileOpen = !this.isProfileOpen;
}
  // ================= USER =================

  loadUser() {
    const storedUser = localStorage.getItem('user');
    this.user = storedUser ? JSON.parse(storedUser) : {
      name: 'Guest User',
      email: 'guest@email.com',
      profile: 'assets/profile.png'
    };
  }

  // ================= STORAGE =================

  getHabitKey() {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    return `habits_${user.email}`;
  }

  loadHabits() {
    const data = localStorage.getItem(this.getHabitKey());
    this.habits = data ? JSON.parse(data) : [];
    this.updateStats();
  }

  saveHabits() {
    localStorage.setItem(this.getHabitKey(), JSON.stringify(this.habits));
  }

  // ================= NAVIGATION (ALL ADDED BACK) =================

  goToDashboard() { this.router.navigate(['/dashboard']); }
  goToAddHabit() { this.router.navigate(['/add-habit']); }
  goToStreaks() { this.router.navigate(['/streaks']); }
  goToRewards() { this.router.navigate(['/rewards']); }
  goToCompletion() { this.router.navigate(['/completion']); }
  goToAnalytics() { this.router.navigate(['/analytics']); }
  goToGamification() { this.router.navigate(['/gamification']); }
  goToSettings() { this.router.navigate(['/settings']); }
  goToCommunity() { this.router.navigate(['/community']);}
  goToProfile() { this.router.navigate(['/profile']); }

  // ================= COMPLETE =================

  completeHabit(index: number) {

    const habit = this.habits[index];
    const today = new Date().toLocaleDateString();

    if (habit.lastCompleted !== today) {

      habit.lastCompleted = today;
      habit.streak++;

      if (!habit.milestoneRewards) {
        habit.milestoneRewards = [];
      }

      if (habit.streak % 7 === 0) {
        habit.milestoneRewards.push(`🌟 ${habit.streak}-day reward`);
      }

      this.saveHabits();
      this.updateStats();
    }
  }

  // ================= COMMUNITY =================


  shareAchievement(habit: any) {
  const message = `🔥 I completed ${habit.streak} day streak in HabitBloom! 🌱\nJoin with me and build habits 💪\n\nhttps://yourwebsite.com`;

  if (navigator.share) {
    navigator.share({
      title: 'My Habit Achievement',
      text: message
    });
  } else {
    navigator.clipboard.writeText(message);
    alert('Achievement copied to clipboard!');
  }
}
  // ================= DELETE + MESSENGER UNDO =================

  deleteHabit(index: number) {

    this.deletedHabit = { ...this.habits[index] };
    this.deletedIndex = index;

    this.habits.splice(index, 1);

    this.saveHabits();
    this.updateStats();

    this.showUndo = true;

    clearTimeout(this.undoTimeout);

    this.undoTimeout = setTimeout(() => {
      this.showUndo = false;
      this.deletedHabit = null;
    }, 5000);
  }

  undoDelete() {

    if (this.deletedHabit) {
      this.habits.splice(this.deletedIndex, 0, this.deletedHabit);
      this.saveHabits();
      this.updateStats();
    }

    clearTimeout(this.undoTimeout);
    this.showUndo = false;
    this.deletedHabit = null;
  }

  // ================= STATS =================

  updateStats() {

    this.completedToday = this.habits.filter(
      h => h.lastCompleted === new Date().toLocaleDateString()
    ).length;

    const streaks = this.habits.map(h => h.streak);

    this.currentStreak = streaks.length ? Math.max(...streaks) : 0;
    this.longestStreak = streaks.length ? Math.max(...streaks) : 0;
  }

  // ================= PLANT =================

  getPlantEmoji(streak: number): string {
    if (streak >= 30) return '🌳';
    if (streak >= 25) return '🌺';
    if (streak >= 15) return '🪴';
    if (streak >= 7) return '🌿';
    return '🌱';
  }

    // ================= LIFECYCLE =================

  ionViewWillEnter() {
    this.loadUser();   // 🔥 this refreshes profile image
  }

  // ================= LOGOUT =================

  logout() {
    localStorage.removeItem('user');
    this.router.navigate(['/login']);
  }
}
