import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthService } from '../services/auth';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: true,
  imports: [IonicModule, FormsModule, CommonModule]
})
export class LoginPage {

  username = '';
  email = '';
  password = '';

  constructor(private auth: AuthService, private router: Router) {}

  loginUser() {

    if (!this.username || !this.email || !this.password) {

      Swal.fire({
        icon: 'error',
        title: 'Login Failed',
        text: 'All fields required',
        confirmButtonColor: '#111827',
        heightAuto: false,
        target: document.body
      });

      return;
    }

    this.auth.login(this.username, this.email, this.password).subscribe({

      next: (res: any) => {

        localStorage.setItem('access', res.access);
        localStorage.setItem('refresh', res.refresh);

        const user = {
          name: this.username,
          email: this.email,
          profile: 'assets/profile.png'
        };

        localStorage.setItem('user', JSON.stringify(user));

        Swal.fire({
          icon: 'success',
          title: 'Login Successful 🚀',
          text: 'Welcome back!',
          confirmButtonColor: '#111827',
          heightAuto: false,
          target: document.body,
          customClass: {
            popup: 'swal-popup-front'
          }
        }).then(() => {
          this.router.navigate(['/dashboard']);
        });
      },

      error: (err: any) => {

        Swal.fire({
          icon: 'error',
          title: 'Login Failed',
          text: err.error?.error || 'Invalid credentials',
          confirmButtonColor: '#111827',
          heightAuto: false,
          target: document.body
        });

      }

    });
  }
}
