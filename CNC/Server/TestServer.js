var express = require('express');
var app 	= express();
var parser  = require('body-parser');
var cors    = require('cors');
var fs	    = require('fs');
						
app.use(cors());

app.use(parser.urlencoded({ extended: true }));
app.use(parser.json());

var datenbankStatus =  [];
	
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

fs.readFile('./tasks.txt','utf8', (err, data) => {
	if (err) throw err;
	
	datenbankTasks = JSON.parse(data.toString());
});

app.get('/api/Tasks', (req, res) => {
	
	if(datenbankTasks instanceof Array) {
		res.send(JSON.stringify(datenbankTasks));
	}
});

app.listen(3000);