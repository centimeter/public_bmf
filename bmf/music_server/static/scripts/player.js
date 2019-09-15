// 2. This code loads the IFrame Player API code asynchronously.
var tag = document.createElement('script');

tag.src = "https://www.youtube.com/iframe_api";
var firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

// 3. This function creates an <iframe> (and YouTube player)
//    after the API code downloads.
var player;
var playlist;
function onYouTubeIframeAPIReady() {
  loadVideos()
  
  if(playlist.length > 0) {
    player = new YT.Player('player', {
      height: '390',
      width: '640',
      videoId: playlist[0].track.track_id,
      events: {
        'onReady': onPlayerReady,
        'onStateChange': onPlayerStateChange
      }
    });
  }
}

// 4. The API will call this function when the video player is ready.
function onPlayerReady(event) {
  event.target.playVideo();
}

// 5. The API calls this function when the player's state changes.
//    The function indicates that when playing a video (state=1),
//    the player should play for six seconds and then stop.
var done = false;
function onPlayerStateChange(event) {
  console.log(event)
  if (event.data == YT.PlayerState.ENDED) {
    removeTop();
    loadVideos(function() {
      if(playlist.length > 0) {
        player.loadVideoById(playlist[0].track.track_id);
      }
    });
  }
}

function loadVideos(callback) {
  var loadUrl = "/api/get_all"
  $.get(loadUrl, function(data, status) {
    playlist = data;
    updatePlaylist(playlist);
    callback();
  });

}

function updatePlaylist(data) {
  document.getElementById('playlist').innerHTML = data;
}

function removeTop() {
  remove(playlist[0].track.track_id);
}

function remove(track_id) {
  console.log("removing track: " + track_id)
  var removeUrl = "/api/delete/" + track_id + "/"
  $.get(removeUrl, function(data, status) {
    playlist = data;
    console.log(playlist);
    updatePlaylist(playlist);
  });
}

document.getElementById("refresh").onclick = function() {
  loadVideos();
}

loadVideos()