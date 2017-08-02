Twitter = require('twitter')
base64 = require('node-base64-image')
config = require('./config')
greetings = require('./greetings')


var client = new Twitter({
	consumer_key: config.consumer_key,
	consumer_secret: config.consumer_secret,
	access_token_key: config.access_token_key,
	access_token_secret: config.access_token_secret
})


// get a random dog from Dog API endpoint
function getDog(result){
	https = require('https')
	url = 'https://dog.ceo/api/breeds/image/random'

	https.get(url, function(res){
    body = ''

    res.on('data', function(chunk){
        body += chunk
    })

   	res.on('end', encodeImage)
	})
}


// encode the image to base64
function encodeImage(result){		
	imageURL = JSON.parse(body).message
	base64.encode(imageURL, { string: true }, postImage)
}


// upload image to twitter
function postImage(error, image){
	if (error) {
		console.log(error)
	}

	client.post('media/upload', {media_data: image}, getTweet)
}


// select random tweet to use from array
function getTweet(error, media, result) {
	greeting = greetings[Math.floor(Math.random()*greetings.length)]

  if (!error) {
    // Lets tweet it
    var status = {
      status: greeting,
      media_ids: media.media_id_string // Pass the media id string
    }


    // post the tweet
    client.post('statuses/update', status, function(error, result) {
			if (error) {
		    console.log(error)
		  }
		})
  }
}


getDog();