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

var database = firebase.database();

$('#submitBtn').on('click', function() {
  event.preventDefault();

  var name;
  var destination;
  var firstTrainTime;
  var frequency;
  var nextTrain;
  var minutesAway;

  name = $('#trainName').val().trim();
  destination = $('#destination').val().trim();
  departureTime = $('#departureTime').val().trim();
  frequency = $('#frequency').val().trim();

  // testing
  console.log(name);
  console.log(destination);
  console.log(departureTime);
  console.log(frequency);

  // TODO: calc next arrival here
  var firstTrainConverted = moment(departureTime, "HH:mm").subtract(1, "years");
  console.log(firstTrainConverted);

  var currentTime = moment();

  var diffTime = currentTime.diff(firstTrainConverted, "minutes");
  console.log(diffTime);

  var tRemainder = diffTime % frequency;
  console.log(tRemainder);

  var tMinutesTillTrain = frequency - tRemainder;
  console.log("MINUTES TILL TRAIN: " + tMinutesTillTrain);

  var nextTrain = moment().add(tMinutesTillTrain, "minutes");
  console.log("ARRIVAL TIME: " + moment(nextTrain).format("hh:mm"));

  // TODO: calc minutes away here
  var minutesAway = nextTrain.diff(currentTime, "minutes");
  console.log("Minutes away: " + minutesAway);

  // TODO: push into database here
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

  // TODO: push into the html card
  var sv = childSnapshot.val();

  var nextTrainFormatted = moment(sv.nextTrain).format("hh:mm");

  // testing
  // console.log(sv.name);
  // console.log(sv.destination);
  // console.log(sv.departureTime);
  // console.log(sv.frequency);
  console.log("next train from firebase: " + sv.nextTrain);
  // console.log(sv.minutesAway);

  var html =
    '<tr class="something">' +
    '<td>' + sv.name + '</td>' +
    '<td>' + sv.destination + '</td>' +
    '<td>' + sv.frequency + '</td>' +
    '<td>' + nextTrainFormatted + '</td>' +
    '<td>' + sv.minutesAway + '</td>' +
    '</tr>';

  $('#outPutRow').append(html);

  // DONE: handle the errors
}, function(errorObject) {

  console.log('You suck at life: ' + errorObject.code);

});
