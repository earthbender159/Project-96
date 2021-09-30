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
document.getElementById("user_name").innerHTML = "Welcome " + user_name + "!"; 
function addRoom(){
    room_name = document.getElementById("room_name").value; 
    firebase.database().ref("/").child(room_name).update({
        purpose: "adding room name"
    }); 
    localStorage.setItem("room_name", room_name); 
    window.location = "kwitter_page.html"; 
}
function getData() {firebase.database().ref("/").on('value', function(snapshot) {document.getElementById("output").innerHTML = "";snapshot.forEach(function(childSnapshot) {childKey  = childSnapshot.key;
    Room_names = childKey;
   //Start code
   console.log("Room Name - " + Room_names)
   row = "<div class = 'room_name' id ="+Room_names+" onclick = 'redirectToRoomName(this.id)'>#"+Room_names+"</div><hr>"; 
   document.getElementById("output").innerHTML += row; 
   //End code
   });});}
getData();
function redirectToRoomName(Name){
    console.log(Name); 
    localStorage.setItem("room_name", Name); 
    window.location = "kwitter_page.html"; 
}
function logout(){
    localStorage.removeItem("user_name"); 
    localStorage.removeItem("room_name"); 
    window.location = "index.html"
}