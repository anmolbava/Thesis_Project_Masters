from django.http import HttpResponse
from django.shortcuts import render

from .models import MyForms

def home(request):
    if request.method == "POST":
        print(request.POST)
    return render(request, "home.html")    
