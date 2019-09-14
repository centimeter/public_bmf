from django.shortcuts import render
from django.http import HttpResponse

# Create your views here.
def index(request):
	temp = request.build_absolute_uri()
	return render(request,'homepage.html', {'abs_url': temp})
	#return HttpResponse("music server index! hello world")

def player(request):
	return render(request, 'player.html')
