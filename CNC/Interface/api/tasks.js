var taskRequest = function() {

	var xhr = new XMLHttpRequest();
	var content = document.querySelector('#task-overview tbody');

	xhr.open('GET', 'http://localhost:3000/api/Tasks');

	xhr.responseType = 'json';
	xhr.setRequestHeader('Content-Type', 'application/json');
	xhr.setRequestHeader('Token', 'cc444569854e9de0b084ab2b8b1532b2');

	xhr.onload = function() {
		var data = xhr.response;
		
		if(data !== null) {
			if (data instanceof Array) {

				var code = '';

				for (var d = 0, dl = data.length; d < dl; d++) {

					var entry = data[d];
					
					code += '<tr>';
					code += '<td>' + entry.id + '</td>';
					code += '<td>' + entry.type + '</td>';
					code += '<td>' + entry.data.input + '</td>';
					code += '<td>' + entry.data.output + '</td>';
					code += '</tr>';
				}
				content.innerHTML = code;
			} else {
				content.innerHTML = 'FAIL';
			}
		}
	};

	xhr.send(null);

};

var sendApiTask = function(type, data) {
	
	var xhr = new XMLHttpRequest();
	
	xhr.open('POST', 'http://localhost:3000/api/Tasks');

	xhr.setRequestHeader('Content-Type', 'application/json');
	xhr.setRequestHeader('Token', 'cc444569854e9de0b084ab2b8b1532b2');
	xhr.responseType = 'json';
	
	data = {"type" : type, 
			"data" : {'input': data,
					'output' : null} 
	};
	xhr.send(JSON.stringify(data));
};

function testTask() {
	
	var typeInput = document.getElementById('type').value;
  	var dataInput = document.getElementById('data').value;
	var xhr = new XMLHttpRequest();

	xhr.open('POST', "http://localhost:3000/api/Tasks", true);
  
  	xhr.responseType = 'json';
  	xhr.setRequestHeader('Content-Type', 'application/json');
  	xhr.setRequestHeader('Token', 'cc444569854e9de0b084ab2b8b1532b2');

	var data = {
		id : 3,  //hier eine ID einfügen
		data: { input : 'BOT'	
		}	
	};

	xhr.send(JSON.stringify(data));
}