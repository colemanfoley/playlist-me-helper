var http = require("http");
var Rdio = require('rdio-node').Rdio;

var r = new Rdio({
  consumerKey: 'ar4rzrs9vetnf8gq5rmw4avb'
, consumerSecret: 'PZ5QyvM3A2'
});

var requestListener = function (request, response) {
  console.log(request);
  var headers = defaultCorsHeaders;
  var statusCode = 200;
  headers['Content-Type'] = "text/plain";
  response.writeHead(statusCode, headers);

  var fullQuery = "";
  request.on('data', function(chunk) {
    fullQuery += chunk;
  });

  request.on('end', function (argument) {
    console.log(argument);
    JSON.parse(fullQuery);
    r.makeRequest('search', {query: fullQuery, types: 'Track'}, function() {
      response.end(JSON.stringify(arguments[1].result.results));
    });
  });
};

var defaultCorsHeaders = {
  "access-control-allow-origin": "*",
  "access-control-allow-methods": "GET, POST, PUT, DELETE, OPTIONS",
  "access-control-allow-headers": "content-type, accept",
  "access-control-max-age": 10 // Seconds.
};

var port = 8080;
var ip = "127.0.0.1";

var server = http.createServer(requestListener);
console.log("Listening on http://" + ip + ":" + port);
server.listen(port, ip);