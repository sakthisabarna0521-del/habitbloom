import { Component } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class SignupPage {

  name = '';
  email = '';
  password = '';
  confirmPassword = '';

  constructor(private auth: AuthService, private router: Router) {}

  registerUser() {

    // 🔴 Empty fields validation
    if (!this.name || !this.email || !this.password || !this.confirmPassword) {

      Swal.fire({
        icon: 'error',
        title: 'Signup Failed',
        text: 'All fields are required',
        confirmButtonColor: '#111827',
        heightAuto: false,
        target: document.body
      });

      return;
    }

    // 🔴 Password mismatch
    if (this.password !== this.confirmPassword) {

      Swal.fire({
        icon: 'warning',
        title: 'Password Mismatch',
        text: 'Passwords do not match',
        confirmButtonColor: '#111827',
        heightAuto: false,
        target: document.body
      });

      return;
    }

    // 🟢 Signup API call
    this.auth.signup(this.name, this.email, this.password).subscribe({

      next: () => {

        Swal.fire({
          icon: 'success',
          title: 'Account Created 🎉',
          text: 'Welcome to HabitBloom!',
          confirmButtonColor: '#111827',
          heightAuto: false,
          target: document.body,
          customClass: {
            popup: 'swal-popup-front'
          }
        }).then(() => {
          this.router.navigate(['/login']);
        });

      },

      error: (err) => {

        Swal.fire({
          icon: 'error',
          title: 'Signup Failed',
          text: err.error?.error || 'Something went wrong',
          confirmButtonColor: '#111827',
          heightAuto: false,
          target: document.body
        });

      }

    });
  }
}
