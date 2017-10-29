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
    if(isFolloweesOnly)
        usersArray = users.filter((user) => followees.includes(user.username));
    else
        usersArray = users;

    //The DOM way is the fastest to clear the div (and most correct)
    while (usersDiv.firstChild)
        usersDiv.removeChild(usersDiv.firstChild);

    //Iterate JSON array and add each user to the div, with name filter
    //StackOverflow says loops are better and more readable than filter()
    users
        .filter((user) => user.username.toLowerCase().includes(usernameFilter.toLowerCase()))
        .forEach((user) => appendUser(usersDiv, user.image, user.username));
}

//Appends a user (with username and image path) to a div
function appendUser(usersDiv, imagePath, username) {
    //Create the new container div, using an attribute for later fetching
    var userDiv = document.createElement("div");
    userDiv.setAttribute("followingUserDiv", username);
    if(usersDiv.id.includes("userlist"))
        userDiv.className = "col-3";

    //Add pic
    var imageDiv = document.createElement("img");
    imageDiv.setAttribute('src', imagePath);
    imageDiv.className = "img-thumbnail";
    userDiv.appendChild(imageDiv);

    //Add button (without following status)
    var buttonDiv = document.createElement("div");
    buttonDiv.className = "mt-2 mb-1";
    var buttonElement = document.createElement("button");
    buttonElement.className = "btn";
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
    var isFollowing = followees.includes(username);

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
    var isFollowing = followees.includes(username);

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
        //If not already in followee div, append
        followeeDiv = followeesDiv.querySelector("[followingUserDiv=\"" + username + "\"]");
        if(followeeDiv == null)
            appendUser(followeesDiv, getUserImage(username), username);
    }
    else {
        //Fetch followee div, then check if it exists and remove it
        followeeDiv = followeesDiv.querySelector("[followingUserDiv=\"" + username + "\"]");
        if(followeeDiv != null)
            followeeDiv.remove();
    }
}