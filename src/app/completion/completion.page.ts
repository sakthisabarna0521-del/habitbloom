import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { HeaderComponent } from '../shared/header/header.component';
import { FooterComponent } from "../shared/footer/footer.component";
import Swal from 'sweetalert2';

interface Habit {
  id: number;
  total_completions: number;
  streak: number;
  growth: number;
  level: number;
  xp: number;
  lastCompletedDate: string | null;
}

@Component({
  selector: 'app-completion',
  templateUrl: './completion.page.html',
  styleUrls: ['./completion.page.scss'],
  standalone: true,
  imports: [CommonModule, IonicModule, FooterComponent, HeaderComponent],
})
export class CompletionPage implements OnInit {

  habit: Habit = {
    id: 0,
    total_completions: 0,
    streak: 0,
    growth: 0,
    level: 1,
    xp: 0,
    lastCompletedDate: null
  };

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.loadHabit();
    this.checkMissedDay();
  }

  // 🔥 LOAD USER DATA
  loadHabit() {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    const completionKey = `completionData_${user.email}`;
    const localData = localStorage.getItem(completionKey);

    if (localData) {
      this.habit = JSON.parse(localData);
    }
  }

  // 🚀 COMPLETE TODAY
  completeToday() {

    const today = new Date().toDateString();

    // ❌ Prevent double completion
    if (this.habit.lastCompletedDate === today) {

      Swal.fire({
        icon: 'info',
        title: 'Already Completed',
        text: 'You already finished today’s habit ✅',
        confirmButtonColor: '#111827',
        heightAuto: false,
        target: document.body
      });

      return;
    }

    // ✅ Update stats
    this.habit.total_completions++;
    this.habit.streak++;
    this.habit.xp += 10;
    this.habit.growth = Math.min(100, this.habit.growth + 5);
    this.habit.lastCompletedDate = today;

    let levelUp = false;

    // 🎮 LEVEL SYSTEM (100 XP = Level Up)
    if (this.habit.xp >= 100) {
      this.habit.level++;
      this.habit.xp = 0;
      levelUp = true;
    }

    this.saveData();

    // 🔥 7 Day Streak Reward
    if (this.habit.streak === 7) {
      Swal.fire({
        icon: 'success',
        title: '🔥 7 Day Streak!',
        text: 'Consistency unlocked! Keep growing 🌱',
        confirmButtonColor: '#000',
        heightAuto: false,
        target: document.body
      });
      return;
    }

    // 🎉 Level Up Popup
    if (levelUp) {
      Swal.fire({
        icon: 'success',
        title: '🎉 LEVEL UP!',
        html: `
          <b>You reached Level ${this.habit.level}</b><br>
          Your habit tree is evolving 🌳
        `,
        confirmButtonColor: '#000',
        backdrop: 'rgba(0,0,0,0.6)',
        heightAuto: false,
        target: document.body
      });
    } else {
      // ✅ Normal Completion Popup
      Swal.fire({
        icon: 'success',
        title: 'Great Job!',
        text: '+10 XP Added 🌟',
        confirmButtonColor: '#000',
        heightAuto: false,
        target: document.body
      });
    }
  }

  // ❌ AUTO RESET STREAK IF MISSED 1+ DAY
  checkMissedDay() {

    if (!this.habit.lastCompletedDate) return;

    const last = new Date(this.habit.lastCompletedDate);
    const now = new Date();

    const diff = now.getTime() - last.getTime();
    const days = diff / (1000 * 60 * 60 * 24);

    if (days >= 2) {
      this.habit.streak = 0;
      this.saveData();

      Swal.fire({
        icon: 'warning',
        title: 'Streak Lost!',
        text: 'You missed a day. Streak reset to 0.',
        confirmButtonColor: '#000',
        heightAuto: false,
        target: document.body
      });
    }
  }

  // 💾 SAVE DATA
  saveData() {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    const completionKey = `completionData_${user.email}`;
    localStorage.setItem(completionKey, JSON.stringify(this.habit));
  }
}
