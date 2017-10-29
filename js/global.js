//Current username because we have no authentication
var placeholderCurrentUsername = "Hector";

//Holds username and text for each message
var tweets = [
     {username: 'Bobo', text: 'hello followers!'},
     {username: 'Elvis', text: 'this exercise is really easy!'},
     {username: 'Mimi', text: 'I want to go to sleep'}
]; 

//Image path and username of each user
var users = [
{ image: 'image/1.jpg', username:  'Alice' },
{ image: 'image/2.jpg', username:  'Bobo' },
{ image: 'image/3.jpg', username:  'Charlie' },
{ image: 'image/4.jpg', username:  'Dan' },
{ image: 'image/5.jpg', username:  'Elvis' },
{ image: 'image/1.jpg', username:  'Finn' },
{ image: 'image/2.jpg', username:  'Gunther' },
{ image: 'image/3.jpg', username:  'Hector' },
{ image: 'image/4.jpg', username:  'Mimi' }
];

//Usernames of followees
var followees = [
    'Bobo', 'Elvis', 'Finn'
];

function getUserImage(username) {
    var userIndex = users.
        map(function (element) {return element.username;}).
        indexOf(username);
    return users[userIndex]["image"];
}