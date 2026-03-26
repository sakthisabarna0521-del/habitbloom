import { Component, OnInit } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

import { HeaderComponent } from '../shared/header/header.component';
import { FooterComponent } from '../shared/footer/footer.component';

interface Feature {
  icon: string;
  title: string;
  desc: string;
}

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
  standalone: true,
  imports: [
    IonicModule,
    CommonModule,
    HeaderComponent,
    FooterComponent
  ]
})
export class HomePage implements OnInit {

  isLoggedIn = false;
  selectedFeature: Feature | null = null;
  clickSound = new Audio('assets/sounds/click.mp3');

  features: Feature[] = [
    {
      icon: '🌱',
      title: 'Track Daily Habits',
      desc: 'Visualize your consistency with interactive growth analytics.'
    },
    {
      icon: '🔥',
      title: 'Build Powerful Streaks',
      desc: 'Maintain momentum and unlock long streak achievements.'
    },
    {
      icon: '🌸',
      title: 'Unlock Blooms',
      desc: 'Complete cycles and watch your garden transform beautifully.'
    }
  ];

  constructor(private router: Router) {}

  ngOnInit() {
    const loginStatus = localStorage.getItem('loggedIn');
    this.isLoggedIn = loginStatus === 'true';
  }

  openFeature(feature: Feature) {
    this.playSound();
    this.selectedFeature = feature;
  }

  closePopup() {
    this.selectedFeature = null;
  }

  playSound() {
    this.clickSound.currentTime = 0;
    this.clickSound.play();
  }
}
