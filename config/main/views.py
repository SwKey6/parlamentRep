from django.shortcuts import render, redirect
from .models import *

def main(request):
    return render(request, 'main/index.html')

def pressa(request):
    return render(request, 'main/pressa.html')

def pravo(request):
    return render(request, 'main/pravo.html')

def culture(request):
    return render(request, 'main/culture.html')

def news(request):
    return render(request, 'main/news.html')