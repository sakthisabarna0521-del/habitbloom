import { Component, AfterViewInit, OnDestroy } from '@angular/core';
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
export class AnalyticsPage implements AfterViewInit, OnDestroy {

  habits: Habit[] = [];
  totalCompletions = 0;
  completionPercentage = 0;

  isLoading = true;

  streakChart: any;
  progressChart: any;

  ngAfterViewInit() {
    this.loadData();

    setTimeout(() => {
      this.createCharts();
      this.isLoading = false;
    }, 300);
  }

  loadData() {
    try {
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

    } catch (e) {
      console.error("Analytics load error", e);
    }
  }

  createCharts() {

    if (this.habits.length === 0) return;

    // 🔥 destroy old charts (important fix)
    if (this.streakChart) this.streakChart.destroy();
    if (this.progressChart) this.progressChart.destroy();

    const habitNames = this.habits.map(h => h.name);
    const streakData = this.habits.map(h => h.streak);

    // Streak Chart
    this.streakChart = new Chart("streakChart", {
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

    // Progress Chart
    this.progressChart = new Chart("progressChart", {
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

  ngOnDestroy() {
    if (this.streakChart) this.streakChart.destroy();
    if (this.progressChart) this.progressChart.destroy();
  }
}
