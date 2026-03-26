import { Component } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-global-ranking',
  templateUrl: './global-ranking.page.html',
  styleUrls: ['./global-ranking.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule]
})
export class GlobalRankingPage {

  countries = [

    {
      name: 'India',
      flag: '🇮🇳',
      score: 950,
      users: [
        { name: 'Sakthi', streak: 45 },
        { name: 'Arun', streak: 38 },
        { name: 'Meena', streak: 30 }
      ]
    },

    {
      name: 'USA',
      flag: '🇺🇸',
      score: 880,
      users: [
        { name: 'John', streak: 40 },
        { name: 'Emma', streak: 35 },
        { name: 'Chris', streak: 28 }
      ]
    },

    {
      name: 'Japan',
      flag: '🇯🇵',
      score: 820,
      users: [
        { name: 'Kenji', streak: 42 },
        { name: 'Yuki', streak: 34 },
        { name: 'Hana', streak: 27 }
      ]
    }

  ];

}
