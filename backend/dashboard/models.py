from django.http import JsonResponse
from tasks.models import Task
from expenses.models import Expense
from goals.models import Goal
from noteshub.models import Note

def dashboard_summary(request):

    data = {
        "total_tasks": Task.objects.count(),
        "completed_tasks": Task.objects.filter(completed=True).count(),
        "total_expenses": Expense.objects.count(),
        "total_goals": Goal.objects.count(),
        "total_notes": Note.objects.count(),
    }

    return JsonResponse(data)