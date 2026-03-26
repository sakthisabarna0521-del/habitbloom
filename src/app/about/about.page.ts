import { Component } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from '../shared/header/header.component';
import { FooterComponent } from '../shared/footer/footer.component';

@Component({
  selector: 'app-about',
  templateUrl: './about.page.html',
  styleUrls: ['./about.page.scss'],
  standalone: true,
  imports: [
    IonicModule,
    CommonModule,
    HeaderComponent,
    FooterComponent
  ]
})
export class AboutPage {
  reviews = [
    { text: "Habit Bloom transformed my mornings! 🌞 Tracking habits became fun.", user: "Priya K." },
    { text: "I love the visual garden. Every streak feels rewarding!", user: "Arjun R." },
    { text: "Finally, a habit tracker that motivates instead of nagging.", user: "Meera S." }
  ];
}
