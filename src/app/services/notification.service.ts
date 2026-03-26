import { Injectable } from '@angular/core';

export interface UserHabitTimes {
  morning: { hour: number; minute: number };
  afternoon: { hour: number; minute: number };
  evening: { hour: number; minute: number };
  night: { hour: number; minute: number };
}

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  async requestPermission() {
    console.log('✅ Notification permission granted (mock)');
  }

  async scheduleAllUserNotifications(times: UserHabitTimes) {
    console.log('📅 Scheduling notifications:', times);
  }
}
