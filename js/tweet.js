function loadTweets() {
    //Get the tweets div
    tweetDiv = document.getElementById("tweets");

    //The DOM way is the fastest to clear the div (and most correct)
    while(tweetDiv.firstChild){
        tweetDiv.removeChild(tweetDiv.firstChild);
    }

    //Iterate JSON array and append message
    tweets.forEach(function(tweet) { 
        appendTweet(tweetDiv, getUserImage(tweet.username), tweet.username, tweet.text);
    });
}

function submitTweet() {
    var messageDiv = document.getElementById("tweetBody");
    var message = messageDiv.value.replace(/\r?\n/g, '<br />');
    tweets.push({username: placeholderCurrentUsername, text: message});

    var tweetsDiv = document.getElementById("tweets");
    appendTweet(tweetDiv, getUserImage(placeholderCurrentUsername), placeholderCurrentUsername, message);
    messageDiv.value = "";
}

function appendTweet(tweetDiv, imagePath, username, message) {
    // Now create the new tweet, add text and image
    var currentTweet = document.createElement("li");
    currentTweet.className = "media my-3";

    //Add pic
    var imageDiv = document.createElement("img");
    imageDiv.setAttribute('src', imagePath);
    imageDiv.className = "img-thumbnail mr-3";
    currentTweet.appendChild(imageDiv);

    //Add username message
    var tweetBody = document.createElement("p");
    tweetBody.className = "media-body";
    var usernameDiv = document.createElement("p");
    usernameDiv.className = "name";
    usernameDiv.innerHTML += username;
    tweetBody.appendChild(usernameDiv);
    tweetBody.innerHTML += message;
    currentTweet.appendChild(tweetBody);

    tweetDiv.appendChild(currentTweet);
}

window.onload = loadTweets;