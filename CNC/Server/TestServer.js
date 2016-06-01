var express = require('express');
var app 	= express();
var parser  = require('body-parser');
var cors    = require('cors');
var fs	    = require('fs');
						
app.use(cors());

app.use(parser.urlencoded({ extended: true }));
app.use(parser.json());

var datenbankStatus =  [];

app.post('api/Status', (req, res) => {
	var adminToken = 'cc444569854e9de0b084ab2b8b1532b2';
	var user 	   = req.get('Token');
	
});
	
fs.readFile('./status.txt','utf8', (err, data) => {
	if (err) throw err;
	
	datenbankStatus = JSON.parse(data.toString());
});

app.get('/api/Status', (req, res) => {
	if(datenbankStatus instanceof Array) {
		res.send(JSON.stringify(datenbankStatus));
	}
});

var datenbankTasks = [];

fs.readFile('./task.txt','utf8', (err, data) => {
	
	datenbankTasks = JSON.parse(data.toString());
});

app.get('/api/Tasks', (req, res) => {
	
	if(datenbankTasks instanceof Array) {
		res.send(JSON.stringify(datenbankTasks));
	}
});

app.post('/api/Tasks', (req, res) => {
	var admin	   = 'cc444569854e9de0b084ab2b8b1532b2';
	var user 	   = req.get('Token');
	
	if(req.body !== null) {
		datenbankTasks.push(req.body);
	} else {
		console.log("Fail - Task")
	}
	
	fs.writeFile('./task.txt', JSON.stringify(req.body), (err) => {
		if(err) throw err;
		
		console.log("Task geschrieben!");
	});
});

app.listen(3000);