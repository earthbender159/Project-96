const firebaseConfig = {
    apiKey: "AIzaSyClRe4IB99KxH0P0N4Ul1eOPFXnMRjTPlE",
    authDomain: "my-city-bot--kopb.firebaseapp.com",
    databaseURL: "https://my-city-bot--kopb-default-rtdb.firebaseio.com",
    projectId: "my-city-bot--kopb",
    storageBucket: "my-city-bot--kopb.appspot.com",
    messagingSenderId: "572088954845",
    appId: "1:572088954845:web:4cae527ec27df788131034"
  };
//ADD YOUR FIREBASE LINKS
firebase.initializeApp(firebaseConfig);
user_name = localStorage.getItem("user_name"); 
room_name = localStorage.getItem("room_name"); 

function send(){
    msg = document.getElementById("msg").value; 
    firebase.database().ref(room_name).push({
        name: user_name, 
        message: msg, 
        like: 0 
    }); 
} 
function getData() { firebase.database().ref("/"+room_name).on('value', function(snapshot) { document.getElementById("output").innerHTML = ""; snapshot.forEach(function(childSnapshot) { childKey  = childSnapshot.key; childData = childSnapshot.val(); if(childKey != "purpose") {
    firebase_message_id = childKey; 
    message_data = childData;
    //Start code
    console.log(firebase_message_id); 
    console.log(message_data); 
    console.log("-----------"); 

    name = message_data['name']; 
    message = message_data['message']; 
    like = message_data['like']; 

    part1 = "<h4> "+name+" <img class = 'user_tick' src = 'tick.png'></h4>"; 
    part2 = "<h4 class = 'message_h4'>"+message+"</h4>"; 
    part3 = "<button class = 'btn btn-warning' id ="+firebase_message_id+" value = "+like+" onclick = 'updateLike(this.id)'>"; 
    part4 = "<span class = 'glyphicon glyphicon-thumbs-up'> like = "+like+"</span</button><hr>"; 

    row = part1+part2+part3+part4; 
    document.getElementById("output").innerHTML += row; 
    //End code
}});  }); }
getData(); 

function updateLike(message_data){
    console.log("clicked on like button - "+message_data); 
    button_id = message_data; 
    likes = document.getElementById(button_id).value; 
    updated_likes = Number(likes)+ 1; 
    console.log(updated_likes); 

    firebase.database().ref(room_name).child(message_data).update({
        like : updated_likes 
    }); 
}
function logout(){
    localStorage.removeItem("user_name"); 
    localStorage.removeItem("room_name"); 
    window.location = "index.html"
} 