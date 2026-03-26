import { Component } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule]
})
export class ProfilePage {

  user: any = {};
  lastLogin: string = new Date().toDateString();

  totalHabits = 0;
  totalStreakDays = 0;
  totalRewards = 0;

  constructor(private router: Router) {
    this.loadUser();
    this.loadStats();
  }

  loadUser() {
    const storedUser = localStorage.getItem('user');
    this.user = storedUser ? JSON.parse(storedUser) : {
      name: 'Guest User',
      email: 'guest@email.com',
      profile: 'assets/profile.png'
    };
  }

  loadStats() {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    const habitKey = `habits_${user.email}`;
    const data = localStorage.getItem(habitKey);

    const habits = data ? JSON.parse(data) : [];

    this.totalHabits = habits.length;
    this.totalStreakDays = habits.reduce((sum: number, h: any) => sum + (h.streak || 0), 0);

    this.totalRewards = habits.reduce(
      (sum: number, h: any) => sum + (h.milestoneRewards?.length || 0),
      0
    );
  }

  goToDashboard() { this.router.navigate(['/dashboard']); }
  goToAnalytics() { this.router.navigate(['/analytics']); }
  goToStreaks() { this.router.navigate(['/streaks']); }
  goToRewards() { this.router.navigate(['/rewards']); }
  goToCompletion() { this.router.navigate(['/completion']); }
  goToSettings() { this.router.navigate(['/settings']); }

  logout() {
    localStorage.removeItem('user');
    this.router.navigate(['/login']);
  }
}
