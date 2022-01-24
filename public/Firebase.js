var app_FireBase = {};
var database = {};
(function () {
    // Initialize Firebase
    var firebaseConfig = {
        apiKey: "AIzaSyCHgMgwTaOtimsAyc7GsEr2fj3cNPNO1X0",
        authDomain: "tom-database-1c231.firebaseapp.com",
        databaseURL: "https://tom-database-1c231-default-rtdb.europe-west1.firebasedatabase.app",
        projectId: "tom-database-1c231",
        storageBucket: "tom-database-1c231.appspot.com",
        messagingSenderId: "993671769430",
        appId: "1:993671769430:web:43a5eb173f6b264b987af7", 
        measurementId: "G-5D2SW2MVXG"
    };
    firebase.initializeApp(firebaseConfig);
    database = firebase.database();
    app_FireBase = firebase;
})()