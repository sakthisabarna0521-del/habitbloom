import { Component, OnInit } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { HeaderComponent } from '../shared/header/header.component';
import { FooterComponent } from '../shared/footer/footer.component';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-opening',
  templateUrl: './opening.page.html',
  styleUrls: ['./opening.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, RouterModule, HeaderComponent, FooterComponent]
})
export class OpeningPage implements OnInit {

  constructor(private router: Router) {}

  isOpen: boolean = false;
suggestion: string = '';
quote: string = '';

ngOnInit() {
  this.generateSuggestion();
  this.generateQuote();
}

toggleAssistant() {
  this.isOpen = !this.isOpen;
}

generateSuggestion() {
  const habits = [
    'Drink 2L water today 💧',
    'Take a 5 min walk 🚶',
    'Read 5 pages 📖',
    'Meditate 3 mins 🧘',
    'Write one gratitude 📝'
  ];
  this.suggestion = habits[Math.floor(Math.random() * habits.length)];
}

generateQuote() {
  const quotes = [
    'Small habits create big results 🌱',
    'Consistency beats motivation 🔥',
    'Progress > Perfection 🎯',
    'You are growing daily 🌿',
    'Every streak matters 🏆'
  ];
  this.quote = quotes[Math.floor(Math.random() * quotes.length)];
}

checkMood(mood: string) {
  if (mood === 'Happy') {

   Swal.fire({
      icon: 'success',
      title: 'That’s the spirit! 🌟',
      text: 'Keep growing and stay consistent!',
      confirmButtonColor: '#111827',
      heightAuto: false,
      target: document.body
    });

  } else if (mood === 'Neutral') {

     Swal.fire({
      icon: 'info',
      title: 'Let’s build momentum 💪',
      text: 'Even small actions count today!',
      confirmButtonColor: '#111827',
      heightAuto: false,
      target: document.body
    });


  } else {

     Swal.fire({
      icon: 'warning',
      title: 'It’s okay 🌿',
      text: 'Start small. One step is enough today.',
      confirmButtonColor: '#111827',
      heightAuto: false,
      target: document.body
    });
    
  }
}
}
