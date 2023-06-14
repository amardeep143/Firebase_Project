// Initialize Firebase
const firebaseConfig = {
    apiKey: "AIzaSyAl6Cmm8LYMchanY07YwDlJW3TrMhwKplY",
    authDomain: "webdevelopment-33674.firebaseapp.com",
    databaseURL: "https://webdevelopment-33674-default-rtdb.firebaseio.com",
    projectId: "webdevelopment-33674",
    storageBucket: "webdevelopment-33674.appspot.com",
    messagingSenderId: "85052799820",
    appId: "1:85052799820:web:f81320444a35bcbd43ade9",
    measurementId: "G-77FCTN8G6B"
  };

  firebase.initializeApp(firebaseConfig);
  
  // Get a reference to the database service
  var database = firebase.database();
  
  // Submit form data to Firebase on form submission
  document.getElementById("userForm").addEventListener("submit", submitForm);
  
  function submitForm(e) {
    e.preventDefault();
    
    // Get user input values
    var name = getInputValue("name");
    var email = getInputValue("email");
    var message = getInputValue("message");
    
    // Save user data to Firebase
    saveUserData(name, email, message);
    
    // Clear form fields
    document.getElementById("userForm").reset();
  }
  
  // Get form input value by input field ID
  function getInputValue(id) {
    return document.getElementById(id).value;
  }
  
  // Save user data to Firebase
  function saveUserData(name, email, message) {
    var newDataRef = database.ref("users").push();
    newDataRef.set({
      name: name,
      email: email,
      message: message
    });
  }
  
  // Display user data in a table format on the webpage
  database.ref("users").on("value", function(snapshot) {
    var userData = snapshot.val();
    var tableBody = document.querySelector("#userData tbody");
    tableBody.innerHTML = "";
    
    for (var key in userData) {
      var name = userData[key].name;
      var email = userData[key].email;
      var message = userData[key].message;
      
      var newRow = document.createElement("tr");
      newRow.innerHTML = "<td>" + name + "</td><td>" + email + "</td><td>" + message + "</td>";
      tableBody.appendChild(newRow);
    }
  });
  