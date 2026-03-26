import { Component } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-comments',
  templateUrl: './comments.page.html',
  styleUrls: ['./comments.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class CommentsPage {

  newComment = '';

  comments:any[] = [

    {
      user:'Arjun',
      text:'Completed my 10 day workout streak 💪',
      time:'2m ago',
      likes:12,
      streak:10
    },

    {
      user:'Meera',
      text:'Reading habit going strong 📚',
      time:'5m ago',
      likes:8,
      streak:7
    }

  ];

  addComment(){

    if(this.newComment.trim()){

      this.comments.unshift({

        user:'You',
        text:this.newComment,
        time:'now',
        likes:0,
        streak:1

      });

      this.newComment='';
    }

  }

  like(comment:any){
    comment.likes++;
  }

}
