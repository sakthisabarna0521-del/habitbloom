import { Component } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-public-profile',
  templateUrl: './public-profile.page.html',
  styleUrls: ['./public-profile.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule]
})
export class PublicProfilePage {

  user = {
    name: 'Sakthi',
    bio: 'Building better habits everyday 💪',
    followers: 120,
    following: 45
  };

  highlights = [
    {name:'7 Days', icon:'🔥'},
    {name:'30 Days', icon:'🏅'},
    {name:'Workout', icon:'💪'},
    {name:'Reading', icon:'📚'}
  ];

  posts = [
    {name:'Workout', streak:45, icon:'💪'},
    {name:'Reading', streak:30, icon:'📚'},
    {name:'Meditation', streak:12, icon:'🧘'},
    {name:'Coding', streak:60, icon:'💻'},
    {name:'Water', streak:15, icon:'💧'},
    {name:'Sleep', streak:22, icon:'😴'}
  ];

}
