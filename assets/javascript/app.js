$( document ).ready(function() {
    console.log( "ready!" );



  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyAe21dlE8hmrkN563ND0zFWqhxX7vWnZQE",
    authDomain: "trainscheduler-e420d.firebaseapp.com",
    databaseURL: "https://trainscheduler-e420d.firebaseio.com",
    projectId: "trainscheduler-e420d",
    storageBucket: "trainscheduler-e420d.appspot.com",
    messagingSenderId: "327348294660"
  };
  firebase.initializeApp(config);

var trainData = firebase.database()
var destinationData = firebase.database()
var firstData = firebase.database()
var frequencyData =firebase.database()

    $("#search").on("click", function(){
        console.log("hello")

        var trainName = $("#name").val()
        var newTrain = {
            name: trainName
        }
        console.log(newTrain)
        trainData.ref().push(newTrain)

        var destinationName = $("#destination").val()
        var newDestination = {
            Destination: destinationName
        }
        console.log(newDestination)
        destinationData.ref().push(newDestination)
 
        var firstTrainTime = $("#first-train").val()
        var newFirstTrainTime = {
            FirstTrain: firstTrainTime
        }
        console.log(newFirstTrainTime)
        firstData.ref().push(newFirstTrainTime)

        var frequency = $("#frequency").val()
        var newFrequency = {
            trainFrequency: frequency
        }
        console.log(newFrequency)
        frequencyData.ref().push(newFrequency)
    })
// var childSnapshot
    trainData.ref().on("child_added", function(childSnapShot, prevChildKey){
        console.log(childSnapShot.val())
    })
    destinationData.ref().on("child_added", function(childSnapShot, prevChildKey){
        console.log(childSnapShot.val())
    })
    firstData.ref().on("child_added", function(childSnapShot, prevChildKey){
        console.log(childSnapShot.val())
    })
    frequencyData.ref().on("child_added", function(childSnapShot, prevChildKey){
        console.log(childSnapShot.val())
    })
    
    var tFrequency = 8;

    var firstTime = "01:30";
    
    var firstTimeConverted = moment(firstTime, "HH:mm").subtract(1, "years");
    console.log(firstTimeConverted);

    var currentTime = moment();
    console.log("CURRENT TIME: " + moment(currentTime).format("hh:mm"));

    var diffTime = moment().diff(moment(firstTimeConverted), "minutes");
    console.log("DIFFERENCE IN TIME: " + diffTime);

    var tRemainder = diffTime % tFrequency;
    console.log(tRemainder);

    var tMinutesTillTrain = tFrequency - tRemainder;
    console.log("MINUTES TILL TRAIN: " + tMinutesTillTrain);

    var nextTrain = moment().add(tMinutesTillTrain, "minutes");
    console.log("ARRIVAL TIME: " + moment(nextTrain).format("hh:mm"));

    // end document.ready
})