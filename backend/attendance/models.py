from django.db import models

class Attendance(models.Model):

    subject = models.CharField(max_length=200)
    classes_attended = models.IntegerField()
    total_classes = models.IntegerField()

    def attendance_percentage(self):
        if self.total_classes == 0:
            return 0
        return (self.classes_attended / self.total_classes) * 100

    def __str__(self):
        return self.subject