from django.shortcuts import render
from django.http import JsonResponse
from .globals import clients

import json
from . import api

def http_request(func):
    def wrapper(request, *args, **kwargs):
        if 'client_id' in kwargs:
            client_id = kwargs['client_id']
            if client_id not in clients:
                print(client_id)
                print(clients)
                print("error")
                return JsonResponse('error: not found client_id: ' + client_id, safe=False)

        output = func(request, *args, **kwargs)
        print(output)
        return JsonResponse(output, encoder=api.ComplexEncoder, safe=False)
    return wrapper

# Create your views here.
@http_request
def get_all(request):
    return api.get_all()

@http_request
def insert(request, client_id, track_id):
    return api.insert(client_id, track_id)

@http_request
def delete(request, track_id):
    return api.delete(track_id)

@http_request
def upvote(request, client_id, track_id):
    return api.upvote(client_id, track_id)

@http_request
def downvote(request, client_id, track_id):
    return api.downvote(client_id, track_id)

@http_request
def register_client(request, kerberos):
    return api.register_client(kerberos)

