import { Component } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-habit',
  templateUrl: './add-habit.page.html',
  styleUrls: ['./add-habit.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class AddHabitPage {

  habitName = '';
  habitDescription = '';
  habitFrequency = 'daily';
  plantType = 'sunflower';

  constructor(private router: Router) {}

  /* 🔥 added validation */
  validateHabit() {
    if (!this.habitName || !this.habitName.trim()) {
      alert("Please enter a habit name");
      return false;
    }

    if (!this.habitFrequency) {
      alert("Please select frequency");
      return false;
    }

    if (!this.plantType) {
      alert("Please choose a plant");
      return false;
    }

    return true;
  }

  saveHabit() {

    /* 🔥 added validation call */
    if (!this.validateHabit()) return;

    const user = JSON.parse(localStorage.getItem('user') || '{}');

    if (!user?.email) {
      alert("User not found");
      return;
    }

    const habitKey = `habits_${user.email}`;
    const existing = JSON.parse(localStorage.getItem(habitKey) || '[]');

    const newHabit = {
      id: Date.now(),
      name: this.habitName.trim(),
      description: this.habitDescription.trim(),
      frequency: this.habitFrequency,
      plant: this.plantType,
      streak: 0,
      stage: 1,
      deletable: true,
      userEmail: user.email
    };

    existing.push(newHabit);
    localStorage.setItem(habitKey, JSON.stringify(existing));

    this.router.navigateByUrl('/dashboard', { replaceUrl: true });
  }
}
