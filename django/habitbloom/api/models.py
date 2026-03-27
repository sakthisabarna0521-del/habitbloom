from django.db import models
from django.contrib.auth.models import User
from django.utils.timezone import now


class Habit(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    title = models.CharField(max_length=200)
    description = models.TextField(blank=True)
    frequency = models.CharField(max_length=20)
    streak = models.IntegerField(default=0)
    total_completions = models.IntegerField(default=0)
    last_completed = models.DateField(null=True, blank=True)
    plant_stage = models.IntegerField(default=1)
    created_at = models.DateTimeField(auto_now_add=True)

    
    # 🌱 NEW FIELDS
    streak = models.IntegerField(default=0)
    total_completions = models.IntegerField(default=0)
    plant_stage = models.IntegerField(default=1)

    def update_plant_stage(self):
        count = self.total_completions

        if count >= 30:
            self.plant_stage = 5
        elif count >= 15:
            self.plant_stage = 4
        elif count >= 8:
            self.plant_stage = 3
        elif count >= 4:
            self.plant_stage = 2
        else:
            self.plant_stage = 1

        self.save()

    def __str__(self):
        return self.title


class HabitLog(models.Model):
    habit = models.ForeignKey(Habit, on_delete=models.CASCADE)
    date = models.DateField(default=now)
    completed = models.BooleanField(default=True)

    def __str__(self):
        return f"{self.habit.title} - {self.date}"