import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-settings',
  standalone: true,
  templateUrl: './settings.page.html',
  styleUrls: ['./settings.page.scss'],
  imports: [IonicModule, CommonModule, FormsModule]
})
export class SettingsPage {

  user: any = {
    name: '',
    email: '',
    profile: 'assets/profile.png'
  };

  darkMode = false;
  reminders = false;
  reminderTime = '';

  constructor(
    private router: Router,
    private alertCtrl: AlertController
  ) {
    this.loadData();
  }

  /* ================= LOAD ================= */

  loadData() {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      this.user = JSON.parse(storedUser);
    }

    this.darkMode = JSON.parse(localStorage.getItem('darkMode') || 'false');
    this.reminders = JSON.parse(localStorage.getItem('reminders') || 'false');
    this.reminderTime = localStorage.getItem('reminderTime') || '';

    document.body.classList.toggle('dark-theme', this.darkMode);
  }

  /* ================= PROFILE ================= */

  saveProfile() {
    localStorage.setItem('user', JSON.stringify(this.user));
    window.alert('Profile updated successfully!');
  }

  onImageSelect(event: any) {
    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
      this.user.profile = reader.result;
      localStorage.setItem('user', JSON.stringify(this.user));
    };
    reader.readAsDataURL(file);
  }

  removeProfileImage() {
    this.user.profile = 'assets/profile.png';
    localStorage.setItem('user', JSON.stringify(this.user));
  }

  /* ================= DARK MODE ================= */

  toggleDarkMode() {
    document.body.classList.toggle('dark-theme', this.darkMode);
    localStorage.setItem('darkMode', JSON.stringify(this.darkMode));
  }

  /* ================= REMINDERS ================= */

  saveReminders() {
    localStorage.setItem('reminders', JSON.stringify(this.reminders));
    localStorage.setItem('reminderTime', this.reminderTime);
  }

  /* ================= PASSWORD ================= */

  async changePassword() {

    const alertBox = await this.alertCtrl.create({
      header: 'Change Password',
      inputs: [
        { name: 'current', type: 'password', placeholder: 'Current Password' },
        { name: 'new', type: 'password', placeholder: 'New Password' },
        { name: 'confirm', type: 'password', placeholder: 'Confirm Password' }
      ],
      buttons: [
        { text: 'Cancel', role: 'cancel' },
        {
          text: 'Update',
          handler: (data) => {

            if (!data.new || data.new.length < 6) {
              window.alert('Password must be at least 6 characters');
              return false;
            }

            if (data.new !== data.confirm) {
              window.alert('Passwords do not match');
              return false;
            }

            window.alert('Password updated successfully');
            return true;
          }
        }
      ]
    });

    await alertBox.present();
  }

  /* ================= DELETE HABITS ================= */

  deleteAllHabits() {
    const email = this.user.email;
    localStorage.removeItem(`habits_${email}`);
    window.alert('All habits deleted');
  }

  logout() {
    localStorage.removeItem('user');
    this.router.navigate(['/login']);
  }

}
