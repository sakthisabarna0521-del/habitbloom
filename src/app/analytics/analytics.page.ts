import { Component, AfterViewInit } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { Chart, registerables } from 'chart.js';
import { HeaderComponent } from "../shared/header/header.component";
import { FooterComponent } from '../shared/footer/footer.component';

Chart.register(...registerables);

interface Habit {
  name: string;
  streak: number;
  lastCompleted: string | null;
}

@Component({
  selector: 'app-analytics',
  templateUrl: './analytics.page.html',
  styleUrls: ['./analytics.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, HeaderComponent, FooterComponent]
})
export class AnalyticsPage implements AfterViewInit {

  habits: Habit[] = [];
  totalCompletions = 0;
  completionPercentage = 0;

  ngAfterViewInit() {
    this.loadData();
    this.createCharts();
  }

  loadData() {

    const user = JSON.parse(localStorage.getItem('user') || '{}');
    const habitKey = `habits_${user.email}`;

    const data = localStorage.getItem(habitKey);
    this.habits = data ? JSON.parse(data) : [];

    const today = new Date().toLocaleDateString();

    this.totalCompletions =
      this.habits.filter(h => h.lastCompleted === today).length;

    const totalHabits = this.habits.length;

    this.completionPercentage =
      totalHabits > 0
        ? Math.round((this.totalCompletions / totalHabits) * 100)
        : 0;
  }

  createCharts() {

    if (this.habits.length === 0) return;

    const habitNames = this.habits.map(h => h.name);
    const streakData = this.habits.map(h => h.streak);

    // Streak Chart
    new Chart("streakChart", {
      type: 'bar',
      data: {
        labels: habitNames,
        datasets: [{
          label: 'Streak',
          data: streakData,
          backgroundColor: '#000'
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: { legend: { display: false } },
        scales: {
          y: { beginAtZero: true, ticks: { stepSize: 1 } },
          x: { ticks: { font: { size: 12 } } }
        }
      }
    });

    // Completion Doughnut Chart
    new Chart("progressChart", {
      type: 'doughnut',
      data: {
        labels: ['Completed Today', 'Remaining'],
        datasets: [{
          data: [
            this.totalCompletions,
            this.habits.length - this.totalCompletions
          ],
          backgroundColor: ['#000', '#ccc']
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            position: 'bottom',
            labels: { boxWidth: 12 }
          }
        }
      }
    });
  }
}
