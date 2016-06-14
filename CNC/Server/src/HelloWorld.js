var express = require('express');
var app     = express();
var parser  = require('body-parser');
var cors    = require('cors');

app.use(cors());
app.use(parser.urlencoded({ extended: true }));
app.use(parser.json());

app.get('/', (req, res) => {
    res.send('Hello world!');
});

//app.listen(3000, () => {
//    console.log('Example listening on http://localhost:3000');
//});

app.get('/api/Tasks', (req, res) => {
    res.send('No Task id given');
});

app.get('/api/Tasks/:id', (req, res) => {
    res.send("Task id was " + req.params.id);
});

// Other middlewares and routes

app.post('/api/Tasks/:id', (req, res) => {
    console.log('Received data', req.body);
    res.json({ id: req.params.id, body: req.body});
});

//Error Handling
app.use(function(err,req,res,next) {
	res.json({message : 'NOT OK'});
});

app.listen(3000);