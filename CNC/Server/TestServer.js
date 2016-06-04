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

app.get('/api/Tasks', (req, res) => {
	
	if(datenbankTasks instanceof Array) {
		res.send(JSON.stringify(datenbankTasks));
	}
});

app.get('/api/Tasks/:id', (req, res) => {
		
	var url = require('url');
	var pathname = url.parse(req.url).pathname;
	
	var idValue = parseInt(pathname.split('/')[3]);
	
	if(datenbankTasks instanceof Array) {
		if(datenbankTasks[parseInt(idValue)] != null) {
			res.send(JSON.stringify(datenbankTasks[parseInt(idValue)]));
		} else {
			res.send(JSON.stringify("Fail - Task: Kein Task mit der ID: " 
									+ parseInt(idValue) + " vorhanden!"));
		}
	}
});

var taskCounter = 0;

app.post('/api/Tasks', (req, res) => {
	var admin	   = 'cc444569854e9de0b084ab2b8b1532b2';
	var user 	   = req.get('Token');
	
	if(user === admin) {
		if(req.body.data.input !== "") {
			req.body.id = taskCounter;
			datenbankTasks.push(req.body);
			taskCounter++;
		} else {
			console.log("Fail - Task: Leerer Task");
		}
	} else {
		console.log("Task - Fail: Keine Erlaubnis (Falscher Token)");
	}
	
	fs.writeFile('./task.txt', JSON.stringify(datenbankTasks), (err) => {
		if(err) throw err;
	});
});

app.listen(3000, () => {
	
var currentTaskFile = fs.statSync('./task.txt');

	if(currentTaskFile["size"] != 0) {
		fs.readFile('./task.txt','utf8', (err, data) => {
			datenbankTasks = JSON.parse(data.toString());
			taskCounter = datenbankTasks.length;
		});
		console.log("Gelesen");
	}
});