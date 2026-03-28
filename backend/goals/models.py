from django.db import models

class Goal(models.Model):

    title = models.CharField(max_length=200)
    description = models.TextField()
    target_date = models.DateField()
    completed = models.BooleanField(default=False)

    def __str__(self):
        return self.title