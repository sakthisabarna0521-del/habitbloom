import { Component } from '@angular/core';
import { NotificationService } from './services/notification.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
  standalone: false,

})
export class AppComponent {
 constructor(private notificationService: NotificationService) {
  this.initializeApp();
}

async initializeApp() {
  await this.notificationService.requestPermission();

  const saved = localStorage.getItem('habitTimes');
  const times = saved ? JSON.parse(saved) : {
    morning: { hour: 7, minute: 0 },
    afternoon: { hour: 12, minute: 30 },
    evening: { hour: 18, minute: 0 },
    night: { hour: 21, minute: 0 }
  };

  this.notificationService.scheduleAllUserNotifications(times);
}
}
