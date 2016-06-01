var fs = require('fs');

fs.readFile('./tasks.txt', 'utf8', (err, data) => {

	if (err) throw err;

	console.log("yeee"); // false
};

//fs.writeFile('./task.txt', 'Hallo', (err) => {
	

	//console.log("yeee"); 
//});								//schreiben