var express = require('express');
var http = require('http');
var path = require('path');
var bodyParser = require('body-parser');

var app = express();

app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({extended: true}));

app.get('/process/login', function(req, res) {  
    var paramId = req.param('id');
     
    console.log('/process/login transaction, id: '+ paramId);
 
    res.write("Success");
    res.end();
});
 
http.createServer(app).listen(3000, function() {
    console.log('Express server port 3000 is binded.');
});
