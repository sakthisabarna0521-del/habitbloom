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

  saveHabit() {

  if (!this.habitName.trim()) return;

  const user = JSON.parse(localStorage.getItem('user') || '{}');
  const habitKey = `habits_${user.email}`;

  const existing = JSON.parse(localStorage.getItem(habitKey) || '[]');

  const newHabit = {
    id: Date.now(),
    name: this.habitName,
    description: this.habitDescription,
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
