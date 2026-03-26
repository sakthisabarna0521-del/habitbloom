import { Component } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-leaderboard',
  templateUrl: './leaderboard.page.html',
  styleUrls: ['./leaderboard.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule]
})
export class LeaderboardPage {

  currentUser = 'Sakthi';

  users = [
    { name: 'Sakthi', streak: 45 },
    { name: 'Arun', streak: 38 },
    { name: 'Meena', streak: 30 },
    { name: 'Kavi', streak: 22 },
    { name: 'John', streak: 18 },
    { name: 'Ayesha', streak: 15 },
    { name: 'Rohit', streak: 12 },
  ];

}
