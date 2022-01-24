var mainApp={};

(function () {
    var firebase = app_FireBase;
    var uid = null;
    firebase.auth().onAuthStateChanged(function(user) { 
        if (user) {
          // user is signed in.
          uid = user.uid;
        } else{
            uid=null;
            window.location.replace("login.html");
            // user is logged out and transferred to login page
        }
      });

      function logOut(){
          firebase.auth().signOut(); // log out function
      }
      mainApp.logOut = logOut;
}) ()