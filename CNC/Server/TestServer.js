var express = require('express');
var app 	= express();
var parser  = require('body-parser');
var cors    = require('cors');
var fs	    = require('fs');
						
app.use(cors());

app.use(parser.urlencoded({ extended: true }));
app.use(parser.json());

var datenbankStatus =  [];

//GET - STATUS

app.get('/api/Status/:id', (req, res) => {
	
	if(datenbankTasks instanceof Array) {
		if(datenbankStatus[parseInt(req.params.id)] != null) {
			res.send(JSON.stringify(datenbankStatus[parseInt(req.params.id)]));
		} else {
			res.send(JSON.stringify("Fail - Status: Kein Status mit der ID: " 
									+ parseInt(req.params.id) + " vorhanden!"));
		}
	}
});

//POST - STATUS
app.post('api/Status', (req, res) => {
	var adminToken = 'cc444569854e9de0b084ab2b8b1532b2';
	var user 	   = req.get('Token');
	
});

//LESEN - STATUS
fs.readFile('./status.txt','utf8', (err, data) => {
	if (err) throw err;
	
	var tempStatusDatenbank = JSON.parse(data.toString());
	
	app.get('/api/Status', (req, res) => {
		if(tempStatusDatenbank) {
			res.send(JSON.stringify(tempStatusDatenbank));
		}
	});
	
	for(var i = 0; i < tempStatusDatenbank.length; i++) {
		if(tempStatusDatenbank[i] != null) {
			datenbankStatus[tempStatusDatenbank[i].id] = tempStatusDatenbank[i];
		}	
	}
});

//GET - TASKS

var datenbankTasks = [];

app.get('/api/Tasks', (req, res) => {
	
	if(datenbankTasks instanceof Array) {
		res.send(JSON.stringify(datenbankTasks));
	}
});

app.get('/api/Tasks/:id', (req, res) => {
	
	if(datenbankTasks instanceof Array) {
		if(datenbankTasks[parseInt(req.params.id)] != null) {
			res.send(JSON.stringify(datenbankTasks[parseInt(req.params.id)]));
		} else {
			res.send(JSON.stringify("Fail - Task: Kein Task mit der ID: " 
									+ parseInt(req.params.id) + " vorhanden!"));
		}
	}
});

//TASKS - POST
var taskCounter = 0;

app.post('/api/Tasks', (req, res) => {
	var admin	   = 'cc444569854e9de0b084ab2b8b1532b2';
	var user 	   = req.get('Token');
	
	if(user === admin) {
		if(req.body.data.input !== "") {
			req.body.id = taskCounter;
			datenbankTasks.push(req.body);
			taskCounter++;
			res.send(JSON.stringify({message:'OK'}));
		} else {
			console.log("Fail - Task: Leerer Task");
			res.send(JSON.stringify({message:'NOT OK'}));
		}
	} else {
		console.log("Task - Fail: Keine Erlaubnis (Falscher Token)");
	}
	
	fs.writeFile('./task.txt', JSON.stringify(datenbankTasks), (err) => {
		if(err) throw err;
	});
});

//TASKS LESEN + SERVER STARTEN
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