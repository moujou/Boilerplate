var initialize = function() {

	var xhr    = new XMLHttpRequest();
	var content = document.querySelector('#status-overview tbody');
	

	xhr.open('GET', 'http://localhost:3000/api/Status');
	xhr.responseType = 'json';
	
	xhr.onload = function() {
	
		var data = xhr.response;
		if (data instanceof Array) {

			var code = '';

			for (var d = 0, dl = data.length; d < dl; d++) {

				var entry = data[d];

				code += '<tr>';
				code += '<td>' + entry.id + '</td>';
				code += '<td>' + entry.ip + '</td>';
				code += '<td>' + entry.task + '</td>';
				code += '<td>' + entry.workload + '</td>';
				code += '<td><button class="button" id="' + entry.id +'" onclick="toggleButton(this.id);">';
				
				if (entry.workload === 0) {
					code += 'Start</button></td>';
				} else {
					code += 'Stop</button></td>';
				}
			}

			content.innerHTML = code;
			
				for (var d = 0, dl = data.length; d < dl; d++) {

				var entry = data[d];

				if (entry.workload === 0) {
					document.getElementById(entry.id).style.background = "#006600";
				} else {
					document.getElementById(entry.id).style.background = "#990000";
				}
			}
			

		} else {

			content.innerHTML = 'FAIL';

		}
	
	};
	
	xhr.send(null);

};

function testStatus() {
	
	var statusType = document.getElementById('type').value;
  	var statusData = document.getElementById('data').value;
	var xhr = new XMLHttpRequest();

	xhr.open('POST', "http://localhost:3000/api/status", true);
  
  	xhr.responseType = 'json';
  	xhr.setRequestHeader('Content-Type', 'application/json');
  	xhr.setRequestHeader('Token', 'cc444569854e9de0b084ab2b8b1532b2');

	var data = { //keine ID einfügen
		ip: '1.33.7',
		task: 0,
		workload:0
	};

	xhr.send(JSON.stringify(data));
}