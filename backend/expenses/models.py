from django.db import models

class Expense(models.Model):

    CATEGORY_CHOICES = [
        ('Food','Food'),
        ('Travel','Travel'),
        ('Shopping','Shopping'),
        ('Other','Other')
    ]

    title = models.CharField(max_length=200)
    amount = models.DecimalField(max_digits=10, decimal_places=2)
    category = models.CharField(max_length=20, choices=CATEGORY_CHOICES)
    date = models.DateField(auto_now_add=True)

    def __str__(self):
        return f"{self.title} - {self.amount}"