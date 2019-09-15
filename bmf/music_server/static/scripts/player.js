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
  if (event.data == YT.PlayerState.ENDED) {
    removeCurrent();
    console.log("playing next");
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

function updatePlaylist(playlist) {
  $("#current").empty();
  $("#songs").empty();
  for(var i = 0; i < playlist.length; i++) {
    var track = playlist[i].track;
    if (i == 0) {
      $("#current").append("<div class=\"list-group-item\" style=\"border:1px solid black;\"style=\"border:1px solid black;\"><span id = \"upvote\" class=\"glyphicon glyphicon-arrow-up\"></span><span id=\"downvote\" class=\"glyphicon glyphicon-arrow-down\"></span><div class=\"song-rating col-sm-1\">" + playlist[i].rating + "</div><div class = \"song-name col-sm-7\">" + track.name + "</div></div>");
    } else {
      $("#songs").append("<div class=\"list-group-item\" style=\"border:1px solid black;\"style=\"border:1px solid black;\"><span id = \"upvote\" class=\"glyphicon glyphicon-arrow-up\"></span><span id=\"downvote\" class=\"glyphicon glyphicon-arrow-down\"></span><div class=\"song-rating col-sm-1\">" + playlist[i].rating + "</div><div class = \"song-name col-sm-7\">" + track.name + "</div></div>");
    }
  }
}

function removeCurrent() {
  remove(playlist[0].track.track_id);
}

function remove(track_id) {
  console.log("removing track: " + track_id)
  var removeUrl = "/api/delete/" + track_id + "/"
  $.get(removeUrl);
}

document.getElementById("refresh").onclick = function() {
  console.log("refreshing");
  loadVideos(() => {});
}

console.log("onload");
loadVideos(() => {})