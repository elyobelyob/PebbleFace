var UI = require('ui');
var ajax = require('ajax');
var emonResponse;

// Create a Card with title and subtitle
var main = new UI.Card({
  body:'Fetching...'
});

// Display the Card
main.show();

// Construct URL
var apikey = '05c4fc62d8910d12edd517acfbd7d44e';
var host = "http://elyob.no-ip.org";
var URL = host + '/emoncms/feed/list.json?apikey=' + apikey ;
var feedids = [7,11,14,8,12,15,20];

// Make the request
var appsList = parseApps(emonResponse);

main.body(appsList);

main.on('click', 'select', function(e) {
  console.log("Select pressed");
  main.body('Fetching...');
  var appsList = parseApps(emonResponse);

  main.body(appsList);

});

function parseApps(data) {
// Make the request
ajax(
  {
    url: URL,
    type: 'json'
  },
  function(data) {
    // Success!
    var jsonLength = data.length;
    var i;
    var i2;
    var feedidsLength = feedids.length;
    var out_message="";

    // Extract data
    emonResponse = data;  // Initialized earlier
    for (i = 0; i < feedidsLength; i++) {
      for (i2 = 0; i2 < jsonLength; i2++) {
        if (feedids[i] == emonResponse[i2].id) {
           out_message += (emonResponse[i2].name) + ' ' + (+(Math.round(emonResponse[i2].value + "e+1")  + "e-1")) + '\n';
        }
      }
    }    
    
    // Show to user
    main.body(out_message);
  },
  function(error) {
    // Failure!
    console.log('Failed fetching emoncms data: ' + error);
  }
);
}