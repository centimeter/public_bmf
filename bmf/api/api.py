from .globals import *
from . import youtube
from threading import Lock
import queue
import random
import string

class Client():
    def __init__(self, client_id, kerberos):
        self.client_id = client_id
        self.kerberos = kerberos
        self.lock = Lock()
        self.requests = 0
    
    def make_request(self):
        with self.lock:
            self.requests += 1

    def __str__(self):
        return str({'client_id': self.client_id, 'kerberos': self.kerberos})

class ClientRequestedTracks():
    def __init__(self, client_id, track_id):
        self.client = clients[client_id]
        self.track = youtube.video(track_id)
        self.voters = {}
        self.score = 0
        self.lock = Lock()

    def upvote(self, client_id):
        self.vote(client_id, 1)

    def downvote(self, client_id):
        self.vote(client_id, -1)

    def vote(self, client_id, value):
        with self.lock:
            if client_id in self.voters:
                if self.voters[client_id] == value:
                    pass
                else:
                    self.voters[client_id] = value
                    self.score += 2*value
            else:
                self.voters[client_id] = value
                self.score += value
    
    def __str__(self):
        return str({'client': str(self.client), 'track': str(self.track)})

def get_all():
    return sorted(playlist.values(), key=lambda x: x.score, reverse=True)

def insert(client_id, track_id):
    if track_id in playlist:
        return get_all()
    
    with playlist_lock:
        client = clients[client_id]
        client.make_request()

        track = ClientRequestedTracks(client_id, track_id)
        playlist[track_id] = track

        return get_all()

def register_client(kerberos):
    if kerberos in kerberoi:
        return kerberoi[kerberos]

    with clients_lock:
        client_id = ''.join(random.choice(string.ascii_letters + string.digits) for i in range(8))
        client = Client(client_id, kerberos)
        clients[client_id] = client
        kerberoi[kerberos] = client_id
        return client_id

def upvote(client_id, track_id):
    if client_id in clients and track_id in playlist:
        playlist[track_id].upvote(client_id, track_id)

    return get_all()

def downvote(client_id, track_id):
    if client_id in clients and track_id in playlist:
        playlist[track_id].downvote(client_id, track_id)

    return get_all()

def delete(client_id, track_id):
    if track_id not in playlist:
         return get_all()
    
    with playlist_lock:
        client = clients[client_id]
        client.make_request()

        playlist.pop(track_id)
        return get_all()

clients['asdfasdf'] = Client('asdfasdf', 'adelay')