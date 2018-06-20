$(document).ready(function () {
    console.log("ready!");



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

    var database = firebase.database()
    var name
    var destinationName
    var firstTrainTime
    var frequency
    var firstTrain

    $("#search").on("click", function () {
        console.log("hello")

        name = $("#name").val()
        destinationName = $("#destination").val()
        firstTrainTime = $("#first-train").val()
        frequency = $("#frequency").val()
        var newTrain = {
            name: name,
            destination: destinationName,
            firstTrain: firstTrainTime,
            trainFrequency: frequency,
            dateAdded: firebase.database.ServerValue.TIMESTAMP
        }
        console.log(newTrain)
        database.ref().push(newTrain)
    })


    
    // var childSnapshot
    database.ref().on("child_added", function (childSnapshot, prevChildKey) {
        console.log(childSnapshot.val().name);
        console.log(childSnapshot.val().destination);
        console.log(childSnapshot.val().firstTrain);
        console.log(childSnapshot.val().trainFrequency);

        var firstTime = firstTrain;
        var tFrequency
        frequency = tFrequency

        var firstTimeConverted = moment(firstTime, "HH:mm").subtract(1, "years");
        // console.log(firstTimeConverted);

        var currentTime = moment();
        // console.log("CURRENT TIME: " + moment(currentTime).format("hh:mm"));

        var diffTime = moment().diff(moment(firstTimeConverted), "minutes");
        // console.log("DIFFERENCE IN TIME: " + diffTime);

        var tRemainder = diffTime % tFrequency;
        // console.log(tRemainder);

        var tMinutesTillTrain = tFrequency - tRemainder;
        console.log("MINUTES TILL TRAIN: " + tMinutesTillTrain);

        var nextTrain = moment().add(tMinutesTillTrain, "minutes");
        console.log("ARRIVAL TIME: " + moment(nextTrain).format("hh:mm"));
    
        $("#tbdata").append("<tr class='member-name'> <td class='member-destination' >" + childSnapshot.val().name +
        "</td> <td class='member-destination'> " + childSnapshot.val().destination +
          " </td><td class='member-FirstTrain'> " + childSnapshot.val().firstTrain +
            " </td><td class='member-frequency'> " + childSnapshot.val().trainFrequency + 
            " </td><td class='member-nextTrain'> " + moment(nextTrain).format("hh:mm") + 
            " </td><td class='member-tminutesTillTrain'> " + tMinutesTillTrain + " </td></tr>");
          
    
    })
    // function calculateTimes(freq, firstTrain) {
    //     var tFrequency = freq;

        // var firstTime = firstTrain;
        // var tFrequency
        // frequency = tFrequency

        // var firstTimeConverted = moment(firstTime, "HH:mm").subtract(1, "years");
        // console.log(firstTimeConverted);

        // var currentTime = moment();
        // console.log("CURRENT TIME: " + moment(currentTime).format("hh:mm"));

        // var diffTime = moment().diff(moment(firstTimeConverted), "minutes");
        // console.log("DIFFERENCE IN TIME: " + diffTime);

        // var tRemainder = diffTime % tFrequency;
        // console.log(tRemainder);

        // var tMinutesTillTrain = tFrequency - tRemainder;
        // console.log("MINUTES TILL TRAIN: " + tMinutesTillTrain);

        // var nextTrain = moment().add(tMinutesTillTrain, "minutes");
        // console.log("ARRIVAL TIME: " + moment(nextTrain).format("hh:mm"));
    


    // $("<tbody>").append("<tr class='member-name'> " + childSnapshot.val().name +
    //     " <td class='member-destination'> " + childSnapshot.val().destination +
    //       " </td><td class='member-FirstTrain'> " + childSnapshot.val().FirstTrain +
    //         " </td><td class='member-frequency'> " + childSnapshot.val().frequency + 
    //         " </td><td class='member-nextTrain'> " + childSnapshot.val().nextTrain + 
    //         " </td><td class='member-tminutesTillTrain'> " + childSnapshot.val().tminutesTillTrain + " </td></tr>");
          
        }, function(errorObject) {
            console.log("Errors handled: " + errorObject.code);
          });

// database.ref().orderByChild("dateAdded").limitToLast(1).on("child.added", function (snapshot) {

// });
// $("#name").text(snapshot.val().name);
// $("#destination").text(snapshot.val().destination);
// $("#first-time").text(snapshot.val().firstTrain);
// $("#frequency").text(snapshot.val().frequency);

    // end document.ready
// })