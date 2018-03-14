/* global moment firebase */
// Initialize Firebase

var config = {
    apiKey: "AIzaSyAiKCgIO3xkNwng2X2_kAJ7-uZoKai1oBc",
    authDomain: "api-progect-7fb01.firebaseapp.com",
    databaseURL: "https://api-progect-7fb01.firebaseio.com",
    projectId: "api-progect-7fb01",
    storageBucket: "api-progect-7fb01.appspot.com",
    messagingSenderId: "421896182610"
  };
  firebase.initializeApp(config);
  
// Create a variable to reference the database
var database = firebase.database();

//Initial Values
//  var trainName = "";
//  var destination = "";
//  var firstTrainTime = "";
//  var tFrequency = "";  

// Button for adding Trains

$('#add-train-btn').on("click", function(event) {
 event.preventDefault();

        // Grabs user unput
        var trainName = $("#train-name-input").val().trim();
        var destination = $("#destination-input").val().trim();
        var firstTrainTime =$('#first-train-time-input').val().trim();
        var tFrequency = $("#frequecy-input").val().trim();
        
        //   trainName = $("#train-name-input").val().trim();
        //   destination = $("#destination-input").val().trim();
        //   firstTrainTime =$('#first-train-time-input').val().trim();
        //   tFrequency = $("#frequecy-input").val().trim();
        
        // Creating local "temporary" object for holding train data

        var newTrain = {
            name: trainName,
            destina: destination,
            firstTime: firstTrainTime,
            freque: tFrequency
        };

        //Upload train data to the database
        //  database.ref().push(newTrain);
        database.ref().set(newTrain);

        // database.ref().set({
        //     name: trainName,
        //      destina: destination,
        //      firstTrain: firstTrainTime,
        //      freque: frequency
            
        // });
        // });
            console.log(newTrain.name);
            console.log(newTrain.destina);
            console.log(newTrain.firstTime);
            console.log(newTrain.freque);
            // });
            //  console.log(name);
            //  console.log(destina);
            //  console.log(firstTrain);
            //  console.log(freque);

            //  //Clears all of the text-boxes
            $("#train-name-input").val("");
            $("#destination-input").val("");
            $('#first-train-time-input').val("");
            $("#frequecy-input").val("");

});

// // Create Firebase event for adding train to the database and a row
database.ref().on("child_added", function(childSnapshot, prevChildKey){
    console.log(childSnapshot.val());

        //     //Store everything into a variable.
            var trainName = childSnapshot.val().name;
            var destination = childSnapshot.val().destina;
            var firstTrainTime = childSnapshot.val().firstTime;
            var tFrequency = childSnapshot.val().freque;

        //     //Train info
            
            console.log(trainName);
            console.log(destination);
            console.log(firstTrainTime);
            // console.log(tFequency);

        //     //Prettify first train time
            var firstTrainTimePretty = moment.unix(firstTrainTime).format("HH:mm");

        // First Time (pushed back 1 year to make sure it comes before current time)

        //  var firstTimeConverted = moment(firstTime, "HH:mm").subtract(1, "years");
        //  console.log(firstTimeConverted);

        var firstTrainTime = "10:00";
        var tFrequency = 8;


        var firstTimeConverted = moment(firstTrainTime , "HH:mm A").subtract(1, "years");
        console.log(firstTimeConverted);

        // Current Time
        var currentTime = moment();
        console.log("CURRENT TIME: " + moment(currentTime).format("hh:mm A"));

        // Difference between the times
        var diffTime = moment().diff(moment(firstTimeConverted), "minutes");
        console.log("DIFFERENCE IN TIME: " + diffTime);

        // Time apart (remainder)
        var tRemainder = diffTime % tFrequency;
        console.log(tRemainder);

        // Minute Until Train
        var tMinutesTillTrain = tFrequency - tRemainder;
        console.log("Minutes Away: " + tMinutesTillTrain);

        // Next Train
        //  var nextTrain = moment().add(tMinutesTillTrain, "minutes");
        var nextTrain = moment().add(tMinutesTillTrain, "minutes").format("hh:mm A");
        //  console.log("Next Arrival: " + moment(nextTrain).format("hh:mm A"));
        // console.log("Next Arrival: " + moment(nextTrain));

        //Add data into the table
        $('#schedule-table > tbody')
        .append(`<tr>
                        <td>${trainName}</td>
                        <td>${destination}</td>
                        <td>${tFrequency}</td>
                        <td>${nextTrain}</td>
                        <td>${tMinutesTillTrain}</td>
                </tr>`)
})

