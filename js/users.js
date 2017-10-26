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

function loadAll() {
    //Load both users and followees div
    loadUsersWithFilter("");
    loadFollowees();
}

function loadUsersWithFilter(usernameFilter) {
    //Get users div and load with filter
    usersDiv = document.getElementById("userlist");
    loadUserdiv(usersDiv, false, usernameFilter);
}

function loadFollowees(){
    //Get followees div and load
    followeesDiv = document.getElementById("followeelist");
    loadUserdiv(followeesDiv, true, "");
}

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

    //Iterate JSON array and append message
    for (var i = 0; i < usersArray.length; i++) {
        var imagePath = usersArray[i]["image"];
        var username = usersArray[i]["username"];
        if(usernameFilter == "" || username.includes(usernameFilter))
            appendUser(usersDiv, imagePath, username);
    }
}

function appendUser(usersDiv, imagePath, username) {
    //Create the new tweet, add text and image
    var userDiv = document.createElement("div");
    userDiv.setAttribute("followingUserDiv", username);
    userDiv.className = "col-sm-3";

    //Add pic
    var imageDiv = document.createElement("img");
    imageDiv.setAttribute('src', imagePath);
    userDiv.appendChild(imageDiv);

    //Add button
    var buttonDiv = document.createElement("div");
    buttonDiv.appendChild(getFollowButton(username));
    userDiv.appendChild(buttonDiv);

    //Add username
    var usernameDiv = document.createElement("p");
    usernameDiv.innerHTML += username;
    userDiv.appendChild(usernameDiv);

    //Append to users div
    usersDiv.appendChild(userDiv);
}

function getFollowButton(username) {
    var isFollowing = isFollowingUser(username);
    var buttonElement = document.createElement("button");        
    buttonElement.setAttribute("onclick", "toggleFollow(\"" + username + "\")");
    buttonElement.setAttribute("userButton", username);
    
    if(isFollowing) {
        buttonElement.className = "btn btn-danger";
        buttonElement.innerHTML = "unfollow";
    }
    else {
        buttonElement.className = "btn btn-default";
        buttonElement.innerHTML = "follow";
    }
    return buttonElement;
}

function filterUsers() {
    //get users div and reload it with filter
    var nameFilter = document.getElementById("namefilter").value;
    loadUsersWithFilter(nameFilter);
}

function toggleFollow(username) {
    //first figure out status
    var isFollowing = isFollowingUser(username);

    //add/remove user from following array
    if(isFollowing)
        followees.push(user);
    else
        followees.splice(followees.indexOf(user), 1);

    //update button text+color
    var userButtons = document.querySelectorAll("[userButton=\"" + username + "\"]");
    for (var i = 0; i < userButtons.length; i++) {
        userButtons[i] = getFollowButton(username);
    }

    //add/remove div from followees div
    if(isFollowing)
        document.querySelector("[followingUserDiv=\"" + username + "\"]").remove();
}

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

window.onload = loadAll;