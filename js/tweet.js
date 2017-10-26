var tweets = [
         {username: 'Bobo', text: 'hello followers!'},
         {username: 'Elvis', text: 'this exercise is really easy!'},
         {username: 'Mimi', text: 'I want to go to sleep'}
    ]; 

function loadTweets() {
    //Get the tweets div
    tweetDiv = document.getElementById("tweets");

    //The DOM way is the fastest to clear the div (and most correct)
    while(tweetDiv.firstChild){
        tweetDiv.removeChild(tweetDiv.firstChild);
    }

    //Iterate JSON array and append message
    for (var i = 0; i < tweets.length; i++){
        var username = tweets[i]["username"];
        var message = tweets[i]["text"];
        appendTweet(tweetDiv, "image/1.jpg", username, message);
    }
}

function submitTweet() {
    var username = "Ben";
    var message = document.getElementById("tweetBody").value;
    tweets.push({username: username, text: message});
    loadTweets();
}

function appendTweet(tweetDiv, imagePath, username, message) {
    // Now create the new tweet, add text and image
    var currentTweet = document.createElement("li");
    currentTweet.className = "media my-3";

    //Add pic
    var imageDiv = document.createElement("img");
    imageDiv.setAttribute('src', imagePath);
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