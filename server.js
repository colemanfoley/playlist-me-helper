var http = require("http");
var Rdio = require('rdio-node').Rdio;

// Create a new instance
var r = new Rdio({
  consumerKey: 'ar4rzrs9vetnf8gq5rmw4avb'
, consumerSecret: 'PZ5QyvM3A2'
});

var requestListener = function (request, response) {
  console.log("Serving request type " + request.method + " for url " + request.url);
  var statusCode = 200;
  var fullQuery = "";
  request.on('data', function(chunk) {
    fullQuery += chunk.toString();
  });
  var headers = defaultCorsHeaders;
  headers['Content-Type'] = "text/plain";
  response.writeHead(statusCode, headers);

  request.on('end', function (argument) {
    r.makeRequest('search', {query: fullQuery, types: 'Track'}, function() {
      response.end(JSON.stringify(arguments[1].result.results[0]));
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