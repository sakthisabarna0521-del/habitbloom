import { Component } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-ai-suggestions',
  templateUrl: './ai-suggestions.page.html',
  styleUrls: ['./ai-suggestions.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class AiSuggestionsPage {

  goal = '';

  generatedHabits:any[] = [];

  routine:any[] = [];

  successProbability = 0;


  generateHabits(){

    this.generatedHabits = [

      {
        title:'Wake up before 6 AM',
        icon:'🌅',
        level:'Hard',
        reason:'Morning routines boost productivity'
      },

      {
        title:'Meditate 10 minutes',
        icon:'🧘',
        level:'Medium',
        reason:'Improves mental clarity'
      },

      {
        title:'Drink 2L water',
        icon:'💧',
        level:'Easy',
        reason:'Keeps body hydrated'
      }

    ];


    this.routine = [

      {time:'6:00 AM', task:'Wake up & stretch'},
      {time:'6:15 AM', task:'Meditation'},
      {time:'7:00 AM', task:'Healthy breakfast'},
      {time:'9:00 PM', task:'Reflection journal'}

    ];

    this.successProbability = Math.floor(Math.random()*40)+60;

  }

}
