from django.db import models

class Task(models.Model):

    PRIORITY_CHOICES = [
        ('High','High'),
        ('Medium','Medium'),
        ('Low','Low')
    ]

    title = models.CharField(max_length=200)
    description = models.TextField(blank=True)
    priority = models.CharField(max_length=10, choices=PRIORITY_CHOICES)
    completed = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.title
