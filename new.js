var https = require('https');
var request = require('request');
var zomatoUserKey = 'b52f7ba7b23e1fbb7f337b1fd39ae8f5';
var postheaders = {
  'Content-Type': 'application/json; charset=utf-8',
  'user-key': b52f7ba7b23e1fbb7f337b1fd39ae8f5
};

var optionspost = {
  host: 'developers.zomato.com', // here only the domain name
  path: '/api/v2.1/reviews', // the rest of the url with parameters if needed
  headers: postheaders,
  method: 'GET',
  // -------^----
  data: '{"res_id": "zoma.to/r/34343"}'
};
https.request(optionspost, function(error, response, body) {
  console.log('error', error);
  console.log('body', body);
  console.log('response', response);
});
fetch(url, fetchData)
.then(function() {
    // Handle response you get from the server
});
