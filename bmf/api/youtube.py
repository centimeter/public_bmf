from apiclient import APIClient
from .globals import tracks
import json

YOUTUBE_API_ACCESS_KEY = "AIzaSyCRXGqKsNgRJ2vbrzGnCDp6NLq9ot8_WhY"
YOUTUBE_API_SERVICE_NAME = "youtube"
YOUTUBE_API_VERSION = "v3"

class NoTracksFoundException(Exception):
    pass

class YoutubeAPI(APIClient):
    BASE_URL = "https://www.googleapis.com/youtube/v3/"

    def video(self, v_id):
        return self.api_call('videos', part='snippet', id=v_id)

    def api_call(self, method, **params):
        return self.call(method, **params, key=YOUTUBE_API_ACCESS_KEY)

youtube = YoutubeAPI()

class Track():
    def __init__(self, track_id):
        self.track_id = track_id
        
        yt_response = youtube.video(track_id)
        if yt_response['pageInfo']['totalResults'] == 0:
            raise NoTracksFoundException( "No tracks were found for track_id: " + track_id)

        data = youtube.video(track_id)['items'][0]['snippet']
        self.title = data['title']
        self.video_url = "https://www.youtube.com/watch?v=" + track_id
        self.thumbnail_url = data['thumbnails']['default']['url']

    def __str__(self):
        return str({'track_id': self.track_id, 'title': self.title, 'video_url': self.video_url, 'thumbnail_url': self.thumbnail_url})

def video(track_id):
    if track_id not in tracks:
        tracks[track_id] = Track(track_id)
    return tracks[track_id]

