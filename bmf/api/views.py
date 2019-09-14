from django.shortcuts import render
from django.http import HttpResponse
from .globals import clients

from . import api

def http_request(func):
    def wrapper(request, *args, **kwargs):
        if 'client_id' in kwargs:
            client_id = kwargs['client_id']
            if client_id not in clients:
                return HttpResponse('error')

        output = func(request, *args, **kwargs)
        return HttpResponse(output)
    return wrapper

# Create your views here.
@http_request
def get_all(request):
    return api.get_all()

@http_request
def insert(request, client_id, track_id):
    return api.insert(client_id, track_id)

@http_request
def upvote(request, client_id, track_id):
    return api.upvote(client_id, track_id)

@http_request
def downvote(request, client_id, track_id):
    return api.downvote(client_id, track_id)

@http_request
def register_client(request, kerberos):
    return api.register_client(kerberos)

