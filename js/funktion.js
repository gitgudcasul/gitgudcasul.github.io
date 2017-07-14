if ( window.addEventListener ) {  
  var state = 0, konami = [38,38,40,40,37,39,37,39,66,65];  
  window.addEventListener("keydown", function(e) {  
    if ( e.keyCode == konami[state] ) state++;  
    else state = 0;  
    if ( state == 10 )  
      window.location = "https://www.youtube.com/watch?v=1Bix44C1EzY";  //you can write your own code here
    }, true);  
}

var app = angular.module("app", ["firebase"]);


  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyBpiLeJGC0TGoB5wOx0SvoxQ0P6v6um1iQ",
    authDomain: "kommentarertest.firebaseapp.com",
    databaseURL: "https://kommentarertest.firebaseio.com",
    projectId: "kommentarertest",
    storageBucket: "",
    messagingSenderId: "1081996521741"
  };
firebase.initializeApp(config);

// Vi skapar en kommentarer-fabrik som hämtar blogg-inlägg från firebase
app.factory("kommentarer", function($firebaseArray) {
    // skapa en referens till var i databasen kommentarerna finns
    var ref = firebase.database().ref().child("kommentarer");
    return $firebaseArray(ref);
  }
);

// Här i "controllern" så kan vi bestämma vad som ska hända med vår HTML
app.controller("KommentarCtrl", function($scope, kommentarer) {
    // Vi gör så att vi kan komma åt inläggen i kommentarer-fabriken med ng-model
    $scope.kommentarer = kommentarer;

    $scope.kommentar = {
        text: "",
        skribent: ""
    };
    // Vi skapar en funktion som vi kan köra i ng-submit för att skicka kommentaren till databasen
    $scope.addComment = function() {
        // Här lägger vi till vårt inlägg ($scope.kommentar) till listan med inlägg.
        // Det sparas automatiskt i Firebase-databasen.
        $scope.kommentarer.$add($scope.kommentar);

        // Tömmer texten i textfälten
        $scope.kommentar = {
            text: "",
            skribent: ""
        };
    };
  }
);
