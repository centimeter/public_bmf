console.log("dostuff is working");
//this is a dummy var for testing, a list of song objects
var samplesongs = [
	{
		"track_id":"LzdHoFObxrg",
		"name":"The Deadener",
		"video_url":"https://www.youtube.com/watch?v=LzdHoFObxrg",
		"thumbnail_url": "https://i.ytimg.com/vi/LzdHoFObxrg/hqdefault.jpg?sqp=-oaymwEZCPYBEIoBSFXyq4qpAwsIARUAAIhCGAFwAQ==&rs=AOn4CLBXnr0IyyCYREWzl4uRW_pOJD8nBg",
		"client": {
			"client_id": "asdfa4543",
			"kerberos": "ctraweek"
		},
		"rating": 5
	},
	{
		"track_id":"LzdHoFObxrg",
		"name":"The Deadener",
		"video_url":"https://www.youtube.com/watch?v=LzdHoFObxrg",
		"thumbnail_url": "https://i.ytimg.com/vi/LzdHoFObxrg/hqdefault.jpg?sqp=-oaymwEZCPYBEIoBSFXyq4qpAwsIARUAAIhCGAFwAQ==&rs=AOn4CLBXnr0IyyCYREWzl4uRW_pOJD8nBg",
		"client": {
			"client_id": "asdfa4543",
			"kerberos": "ctraweek"
		},
		"rating": 6
	},
	{
		"track_id":"LzdHoFObxrg",
		"name":"The Deadener",
		"video_url":"https://www.youtube.com/watch?v=LzdHoFObxrg",
		"thumbnail_url": "https://i.ytimg.com/vi/LzdHoFObxrg/hqdefault.jpg?sqp=-oaymwEZCPYBEIoBSFXyq4qpAwsIARUAAIhCGAFwAQ==&rs=AOn4CLBXnr0IyyCYREWzl4uRW_pOJD8nBg",
		"client": {
			"client_id": "afsdghj",
			"kerberos": "georg"
		},
		"rating": 10
	}

];

for(var i = 0; i<samplesongs.length; i++){
	console.log("hi there")
	$("#songs").append("<div class=\"list-group-item\" style=\"border:1px solid black;\"style=\"border:1px solid black;\">" +  samplesongs[i].rating + " " + samplesongs[i].name + "\n" + samplesongs[i].client.kerberos + "</div>");
}
