var express = require('express');
var http = require('http');
var path = require('path');
var bodyParser = require('body-parser');
var mysql = require('mysql');
var moment = require('moment');

var connection = mysql.createConnection({
	host: "quizy-instance-1.cu0vlp8fz14q.us-east-2.rds.amazonaws.com",
	user: "admin",
	password: "kang199801!",
	database: "greenery",
	dateStrings: "date"
});

var app = express();
 
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({extended: true}));

connection.connect();
 
app.get('/insert', function(req, res) { 
	let temp = req.query.temp;
	let humid = req.query.humid;
	let shumid = req.query.shumid;
	let createdDate = new Date();

	console.log('/insert proceed');
	console.log('temp : ' + temp);
	console.log('humid : ' + humid);
	console.log('shumid : ' + shumid);
 
        res.write("Success");
	res.end();

	//connection.connect();

	var sql = "INSERT INTO log (temperature, humidity, solid_humidity, created_at) VALUES (?, ?, ?, ?)";
	var param = [temp, humid, shumid, createdDate];


	connection.query(sql, param, function(err, rows, fields) {
		if (err) {
			console.log(err);
		} else {
			console.log(rows.insertId + ' rows inserted');
		}
	});
	//connection.end();
});

app.get('/select', function(req, res) {
	connection.query("SELECT * FROM func", function (err, results, fields) {
		if (err) throw err;
		res.write(JSON.stringify(results));
		res.end();
	});
});


http.createServer(app).listen(3000, function() {
    console.log('Express Port 3000 is activated.');
});
