// Initialize Firebase
var config = {
  apiKey: "AIzaSyB9jdGjUZRcU8yx7nRx4_2gJObUqHm0Tu0",
  authDomain: "homework-7-train-time.firebaseapp.com",
  databaseURL: "https://homework-7-train-time.firebaseio.com",
  projectId: "homework-7-train-time",
  storageBucket: "",
  messagingSenderId: "57418653354"
};
firebase.initializeApp(config);

// make firebase database easier to work with
var database = firebase.database();

// on click function
$('#submitBtn').on('click', function() {
  // prevent default behavior
  event.preventDefault();

  // line up our variables
  var name;
  var destination;
  var firstTrainTime;
  var frequency;
  var nextTrain;
  var minutesAway;

  // get user input
  name = $('#trainName').val().trim();
  destination = $('#destination').val().trim();
  departureTime = $('#departureTime').val().trim();
  frequency = $('#frequency').val().trim();

  // testing
  console.log(name);
  console.log(destination);
  console.log(departureTime);
  console.log(frequency);

  // DONE: calc next arrival here
  var firstTrainConverted = moment(departureTime, "HH:mm").subtract(1, "years");

  var currentTime = moment();

  var diffTime = currentTime.diff(firstTrainConverted, "minutes");

  var tRemainder = diffTime % frequency;

  var tMinutesTillTrain = frequency - tRemainder;

  var nextTrain = moment().add(tMinutesTillTrain, "minutes");

  // DONE: calc minutes away here
  var minutesAway = nextTrain.diff(currentTime, "minutes");

  // DONE: push into database here
  database.ref().push({
    name: name,
    destination: destination,
    departureTime: departureTime,
    frequency: frequency,
    nextTrain: nextTrain.toLocaleString(),
    minutesAway: minutesAway,
    dateAdded: firebase.database.ServerValue.TIMESTAMP
  });

});

// DONE: add watcher - don't do limitToLast(1)
database.ref().on("child_added", function(childSnapshot) {

  // DONE: push into the html card
  var sv = childSnapshot.val();

  var nextTrainFormatted = moment(sv.nextTrain).format("hh:mm A");

  // testing
  // console.log(sv.name);
  // console.log(sv.destination);
  // console.log(sv.departureTime);
  // console.log(sv.frequency);
  // console.log("next train from firebase: " + sv.nextTrain);
  // console.log(sv.minutesAway);

  // variable to hold html
  var html =
    '<tr class="something">' +
    '<td>' + sv.name + '</td>' +
    '<td>' + sv.destination + '</td>' +
    '<td>' + sv.frequency + '</td>' +
    '<td>' + nextTrainFormatted + '</td>' +
    '<td>' + sv.minutesAway + '</td>' +
    '</tr>';

  // push the html to hte page
  $('#outPutRow').append(html);

  // DONE: handle the errors
}, function(errorObject) {

  console.log('You suck at life: ' + errorObject.code);

});
