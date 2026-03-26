import { Component, ViewChild, ElementRef, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { HeaderComponent } from '../shared/header/header.component';
import { FooterComponent } from '../shared/footer/footer.component';

@Component({
  selector: 'app-gamification',
  templateUrl: './gamification.page.html',
  styleUrls: ['./gamification.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, HeaderComponent, FooterComponent]
})
export class GamificationPage implements OnInit {

  @ViewChild('motionPath') motionPath!: ElementRef<SVGPathElement>;

  moving = false;
  sproutX = 0;
  sproutY = 0;

  pathD = `
  M50 280
  C250 40, 450 420, 650 200
  S1050 40, 1250 280
  `;

  stages = [
    { name: 'Sprout', icon: '🌱', x: 50, y: 250, state: 'unlocked', lastCompleted: null },
    { name: 'Leaves', icon: '🌿', x: 300, y: 70, state: 'locked', lastCompleted: null },
    { name: 'Pot + Buds', icon: '🪴', x: 600, y: 250, state: 'locked', lastCompleted: null },
    { name: 'Blooming', icon: '🌸', x: 900, y: 80, state: 'locked', lastCompleted: null },
    { name: 'Tree', icon: '🌳', x: 1150, y: 250, state: 'locked', lastCompleted: null }
  ];

  ngOnInit() {
    this.checkWilt();
  }

  completeHabit(stage: any) {

    if (stage.state === 'locked') return;

    const index = this.stages.indexOf(stage);
    const nextStage = this.stages[index + 1];
    if (!nextStage) return;

    const path = this.motionPath.nativeElement;
    const pathLength = path.getTotalLength();

    const segments = this.stages.length - 1;
    const start = (index / segments) * pathLength;
    const end = ((index + 1) / segments) * pathLength;

    let current = start;
    this.moving = true;

    const animation = setInterval(() => {

      current += 8;

      const point = path.getPointAtLength(current);
      this.sproutX = point.x;
      this.sproutY = point.y;

      if (current >= end) {

        clearInterval(animation);

        stage.state = 'completed';
        stage.lastCompleted = new Date();
        nextStage.state = 'unlocked';

        this.moving = false;
      }

    }, 16);
  }

  checkWilt() {
    setInterval(() => {

      const now = new Date().getTime();

      this.stages.forEach(stage => {

        if (stage.lastCompleted) {

          const diff = now - new Date(stage.lastCompleted).getTime();
          const hours = diff / (1000 * 60 * 60);

          if (hours >= 24) {
            stage.state = 'wilted';
          }

        }

      });

    }, 60000);

  }
}
