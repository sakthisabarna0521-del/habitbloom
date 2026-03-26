import { Component } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-friends',
  templateUrl: './friends.page.html',
  styleUrls: ['./friends.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class FriendsPage {

  searchText = '';

  suggestedUsers = [

    {
      name:'Arun',
      bio:'Fitness enthusiast 💪',
      following:false
    },

    {
      name:'Meena',
      bio:'Meditation lover 🧘',
      following:false
    },

    {
      name:'Karthik',
      bio:'Productivity hacker ⚡',
      following:false
    }

  ];

  friends = [

    {
      name:'Rahul',
      streak:32,
      following:true
    },

    {
      name:'Priya',
      streak:21,
      following:true
    }

  ];

  toggleFollow(user:any){

    user.following = !user.following;

  }

}
