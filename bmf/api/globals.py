from threading import Lock

kerberoi = {'adelay':'asdfasdf'}
clients = {}
tracks = {}
playlist = {}

clients_lock = Lock()
playlist_lock = Lock()