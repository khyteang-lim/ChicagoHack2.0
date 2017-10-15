var express = require('express');
var app = express();
var storeData = require("./storeData.js");

app.get('/', function (req, res) {
    res.send('Hello World!')
})

app.post('/personId', function(req, res) {
    var personId = req.param('personId');
    var accountId = req.param('accountId');
    var statusCode = storeData.storePersonId(personId, accountId);
});

app.post('/capture', function(req, res) {
    var imageUrl = storeData.storeImage("");
});

app.post('/addUser', function(req, res) {
  var personId = req.param('personId');
  var addUser = storeData.addUserToMapping(personId);
});

app.listen(5000, function () {
    console.log("Store Server listen on port 5000");
})