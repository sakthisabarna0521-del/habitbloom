import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AiAssistantService {

  analyzeHabit(period: string, misses: number) {

    if (misses >= 3) {
      return {
        type: 'warning',
        message: `⚠️ You are missing ${period} habit often. Try shifting it earlier.`
      };
    }

    if (misses === 2) {
      return {
        type: 'suggestion',
        message: `💡 Slight adjustment in ${period} timing may improve consistency.`
      };
    }

    return {
      type: 'good',
      message: `🔥 ${period} habit consistency looks strong! Keep going.`
    };
  }

  generateMotivation(streak: number) {

    if (streak < 3) {
      return "Start small. Consistency beats intensity.";
    }

    if (streak < 7) {
      return "Momentum building. Protect your streak.";
    }

    return "Elite discipline mode activated.";
  }

}
