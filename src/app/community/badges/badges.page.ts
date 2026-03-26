import { Component } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-badges',
  templateUrl: './badges.page.html',
  styleUrls: ['./badges.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule]
})
export class BadgesPage {

  user = "Sakthi";

  badges = [

    {
      name: "7 Day Warrior",
      icon: "🔥",
      unlocked: true,
      date: "10 Mar 2026",
      goal: "7 day streak"
    },

    {
      name: "Consistency Master",
      icon: "🏅",
      unlocked: true,
      date: "18 Mar 2026",
      goal: "15 day streak"
    },

    {
      name: "30 Day Legend",
      icon: "👑",
      unlocked: false,
      goal: "30 day streak"
    },

    {
      name: "100 Day Titan",
      icon: "⚡",
      unlocked: false,
      goal: "100 day streak"
    },

    {
      name: "Habit Champion",
      icon: "🏆",
      unlocked: false,
      goal: "200 day streak"
    }

  ];

  get badgesUnlocked(){
    return this.badges.filter(b => b.unlocked).length;
  }

  openBadge(badge:any){

    if(badge.unlocked){
      alert(`🏆 ${badge.name}\nUnlocked on ${badge.date}`);
    }
    else{
      alert(`🔒 ${badge.name}\nComplete ${badge.goal}`);
    }

  }

}
