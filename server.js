var path    = require('path');
var express = require('express');
var app     = express();

var port = process.env.PORT || 8020;
app.set('port', port);

// static files
app.use(express.static(path.join(__dirname, 'public')));

app.get('/rest/foobar', (req, res) => {
  res.send(JSON.stringify({ 'json_response': 'ok' }));
});

// start server
app.listen(port, function() {
  console.log('*\n*\nExpress server listening on port '+ port + '.\n*\n*');
});