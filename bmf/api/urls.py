from django.urls import path

from . import views

urlpatterns = [
    path('get_all/', views.get_all, name='get'),
    path('insert/<int:client_id>/<str:track_id>/', views.insert, name='insert'),
    path('upvote/<int:client_id>/<str:track_id>/', views.upvote, name='upvote'),
    path('downvote/<int:client_id>/<str:track_id>/', views.downvote, name='downvote'),
]