//Image path and username of each user
var users = [
    { image: 'image/1.jpg', username:  'Alice' },
    { image: 'image/2.jpg', username:  'Bob' },
    { image: 'image/3.jpg', username:  'Charlie' },
    { image: 'image/4.jpg', username:  'Dan' },
    { image: 'image/5.jpg', username:  'Elvis' },
    { image: 'image/1.jpg', username:  'Finn' },
    { image: 'image/2.jpg', username:  'Gunther' },
    { image: 'image/3.jpg', username:  'Hector' }
];

//Usernames of followees
var followees = [
    'Bob', 'Elvis', 'Finn'
];

//After page load, load all users
window.onload = loadAll;

//Loads both users and followees, called at page load
function loadAll() {
    //Load both users and followees div
    loadUsersWithFilter("");
    loadFollowees();
}

//Loads users list by filter
function loadUsersWithFilter(usernameFilter) {
    //Get users div and load with filter
    usersDiv = document.getElementById("userlist");
    loadUserdiv(usersDiv, false, usernameFilter);
}

//Loads followees list
function loadFollowees(){
    //Get followees div and load
    followeesDiv = document.getElementById("followeelist");
    loadUserdiv(followeesDiv, true, "");
}

//Loads a users div, with or without followees and username filter
function loadUserdiv(usersDiv, isFolloweesOnly, usernameFilter) {
    //Fetch users array
    var usersArray = [];
    if(isFolloweesOnly) {
        for (var i = 0; i < users.length; i++)
            if(followees.includes(users[i]["username"]))
                usersArray.push(users[i]);
    }
    else
        usersArray = users;

    //The DOM way is the fastest to clear the div (and most correct)
    while (usersDiv.firstChild)
        usersDiv.removeChild(usersDiv.firstChild);

    //Iterate JSON array and add each user to the div, with name filter
    //StackOverflow says loops are better and more readable than filter()
    for (var i = 0; i < usersArray.length; i++) {
        var username = usersArray[i]["username"];
        imagePath = usersArray[i]["image"];
        if(usernameFilter == "" || username.toLowerCase().includes(usernameFilter.toLowerCase()))
            appendUser(usersDiv, imagePath, username);
    }
}

//Appends a user (with username and image path) to a div
function appendUser(usersDiv, imagePath, username) {
    //Create the new container div, using an attribute for later fetching
    var userDiv = document.createElement("div");
    userDiv.setAttribute("followingUserDiv", username);
    userDiv.className = "my-2 mx-2 mx-sm-3 mx-lg-5";

    //Add pic
    var imageDiv = document.createElement("img");
    imageDiv.setAttribute('src', imagePath);
    userDiv.appendChild(imageDiv);

    //Add button (without following status)
    var buttonDiv = document.createElement("div");
    buttonDiv.className = "mt-2 mb-1";
    var buttonElement = document.createElement("button");
    buttonElement.setAttribute("onclick", "toggleFollow(\"" + username + "\")");
    buttonElement.setAttribute("userButton", username);
    buttonElement.innerHTML = username;
    buttonDiv.appendChild(buttonElement);
    userDiv.appendChild(buttonDiv);

    //Add username
    var usernameDiv = document.createElement("p");
    usernameDiv.innerHTML += username;
    userDiv.appendChild(usernameDiv);

    //Append to users div
    usersDiv.appendChild(userDiv);

    //Update following status
    updateUserFollowingStatus(username);
}


//Reloads the users div with a filter
function filterUsers(filterDiv) {
    //reload users div with filter
    loadUsersWithFilter(filterDiv.value);
}

//Toggles between user followed/unfollowed state
function toggleFollow(username) {
    //Figure out current status
    var isFollowing = isFollowingUser(username);

    //Add/remove user from followees array
    if(isFollowing)
        followees.splice(followees.indexOf(username), 1);
    else
        followees.push(username);

    //Update buttons and followee div
    updateUserFollowingStatus(username);
}

//Updates a user's following status, both its button and followee div
function updateUserFollowingStatus(username) {
    //Figure out current status
    var isFollowing = isFollowingUser(username);

    //update button text+color
    var userButtons = document.querySelectorAll("[userButton=\"" + username + "\"]");
    for (var i = 0; i < userButtons.length; i++) {
        if(isFollowing) {
            userButtons[i].className = "btn btn-danger";
            userButtons[i].innerHTML = "unfollow";
        }
        else {
            userButtons[i].className = "btn btn-default";
            userButtons[i].innerHTML = "follow";
        }
    }

    //Add/remove div from followees div
    followeesDiv = document.getElementById("followeelist");
    if(isFollowing){
        //If not already in followee div, fetch from user div and append
        followeeDiv = followeesDiv.querySelector("[followingUserDiv=\"" + username + "\"]");
        if(followeeDiv == null) {
            followeeDiv = document.querySelector("[followingUserDiv=\"" + username + "\"]").cloneNode(true);
            followeesDiv.appendChild(followeeDiv);
        }
    }
    else {
        //Fetch followee div, then check if it exists and remove it
        followeeDiv = followeesDiv.querySelector("[followingUserDiv=\"" + username + "\"]");
        if(followeeDiv != null)
            followeeDiv.remove();
    }
}

//Iterate over followee array, find followee
function isFollowingUser(username) {
    //figure out whether following
    var following = false;
    for (var i = 0; i < followees.length; i++) {
        if (followees[i] == username) {
            return true;
        }
    }
    return false;
}
