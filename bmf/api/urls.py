from django.urls import path

from . import views

urlpatterns = [
    path('get_all/', views.get_all, name='get'),
    path('insert/<str:client_id>/<str:track_id>/', views.insert, name='insert'),
    path('upvote/<str:client_id>/<str:track_id>/', views.upvote, name='upvote'),
    path('downvote/<str:client_id>/<str:track_id>/', views.downvote, name='downvote'),
    path('register_client/<str:kerberos>/', views.register_client, name='register')
]