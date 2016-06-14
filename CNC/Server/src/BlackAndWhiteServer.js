var express = require('express');
var app 	= express();
var parser  = require('body-parser');
var cors    = require('cors');
var fs	    = require('fs');

var admin	   = 'cc444569854e9de0b084ab2b8b1532b2';
var taskCounter = 0;
var statusCounter = 0;
var datenbankStatus =  [];
var datenbankTasks = [];
						
app.use(cors());

app.use(parser.urlencoded({ extended: true }));
app.use(parser.json());


//GET - STATUS
app.get('/api/Status', (req, res) => {
	if(datenbankStatus instanceof Array) {
		res.send(JSON.stringify(datenbankStatus));
	}
});

app.get('/api/Status/:id', (req, res) => {
	if(datenbankStatus instanceof Array) {
		
		var gefundenesObjekt = datenbankStatus.find(function(object) { return object.id == req.params.id; });
		
		if(gefundenesObjekt != undefined) {
			res.send(JSON.stringify(gefundenesObjekt));
		} else {
			res.send(JSON.stringify("Fail - Status: Kein Status mit der ID: " 
									+ req.params.id + " vorhanden!"));
		}
	}
});

//POST - STATUS
app.post('/api/Status', (req, res) => {
	
	var gefundenesObjekt = datenbankStatus.find(function(object) { return object.id == req.body.id; });
	
	if(pruefeAufToken(req.get('Token'))) {
		if(gefundenesObjekt != undefined) {
			if(req.body.status == false) {
				gefundenesObjekt.workload = 0;
			} else {
				gefundenesObjekt.workload = 1;	
			}
			
			fs.writeFile('./status.txt', JSON.stringify(datenbankStatus), (err) => {
					if (err) throw err;
			});
			
			res.send(JSON.stringify({message:'OK'}));
		} else {
			
			if(req.body.id === undefined) { //Falls der BOT was schickt
				req.body.id = ersteFreieID(datenbankStatus, statusCounter); //geht auch mit statusCounter
			
				schreibeNeuerStatus(req.body);
				
				fs.writeFile('./status.txt', JSON.stringify(datenbankStatus), (err) => {
					if (err) throw err;
				});
				
				res.send(JSON.stringify({message:'OK'}));
			} else {
				res.send(JSON.stringify({message:'NOT OK'}));
			}
		}

	} else {
		console.log("Status - Fail: Keine Erlaubnis (Falscher Token)");
		res.send(JSON.stringify({message:'NOT OK'}));
	}
});


//LESEN - STATUS
fs.readFile('./status.txt','utf8', (err, data) => {
	if (err) throw err;
	
	datenbankStatus = JSON.parse(data.toString());
});

//GET - TASKS

app.get('/api/Tasks', (req, res) => {
	if(datenbankTasks instanceof Array) {
		res.send(JSON.stringify(datenbankTasks));
	}
});

app.get('/api/Tasks/:id', (req, res) => {
	if(datenbankTasks instanceof Array) {
		
		var gefundenesObjekt = datenbankTasks.find(function(object) { return object.id == req.params.id; });
		
		if(gefundenesObjekt !== undefined) {
			res.send(JSON.stringify(gefundenesObjekt));
		} else {
			res.send(JSON.stringify("Fail - Status: Kein Task mit der ID: " 
									+ req.params.id + " vorhanden!"));
		}
	}
});

//TASKS - POST
app.post('/api/Tasks', (req, res) => {
	var gefundenesObjekt;
	
	if(pruefeAufToken(req.get('Token'))) {
		if(req.body.data.input !== "") {
			
			gefundenesObjekt = datenbankTasks.find(function(object) { return object.id == req.body.id; });
			
			if(gefundenesObjekt != undefined) {
				modifiziereTask(gefundenesObjekt, req.body, res);
			} else {
				
				//Falls ein Task ohne ID gesendet wurde 
				if(req.body.id === undefined) {
					req.body.id = ersteFreieID(datenbankTasks, taskCounter); // geht auch nur mit taskCounter
					schreibeNeuerTask(req.body, res);
				} else {
					res.send(JSON.stringify({message:'NOT OK'}));
				}
			}
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
	console.log("Server gestartet...");
	
	if(currentTaskFile["size"] != 0) {
		fs.readFile('./task.txt','utf8', (err, data) => {
			if (err) throw err;
			
			datenbankTasks = JSON.parse(data.toString());
			taskCounter = datenbankTasks.length;
			statusCounter = datenbankStatus.length;
		});
		console.log("Tasks Gelesen");
	}
});

//FUNKTIONEN
var pruefeAufToken = function(requestToken) {
	return admin === requestToken;
};

var modifiziereTask = function(gefundenesObj, reqObj, response) {
	datenbankTasks[datenbankTasks.indexOf(gefundenesObj)] = reqObj;
	console.log("Task an mit der ID: " + reqObj.id + " wurde modifiziert.");
	response.send(JSON.stringify({message:'OK'}));
};

var schreibeNeuerTask = function(reqObj, response) {
	datenbankTasks.push(reqObj);
	console.log("Task an mit der ID: " + reqObj.id + " wurde geschrieben.");
	taskCounter++;
	response.send(JSON.stringify({message:'OK'}));
};

var schreibeNeuerStatus = function(reqObj) {
	datenbankStatus.push(reqObj);
	console.log("Status - Succses: Ein neuer Status wurde angelegt");
	statusCounter++;
}

var ersteFreieID = function(datenbank, counter) {
	var ID;
	var gefundenesObjekt;
	
	for (var i = 0; i < datenbank.length; i++) {
		gefundenesObjekt = datenbank.find(function(object) { return object.id == i; });
		
		//Wenn es keine ID mit der Nummer "i" gibt
		if(gefundenesObjekt === undefined) {
			return ID = i;
		}
	}
	return ID = counter;
};