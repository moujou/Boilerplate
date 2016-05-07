var initialize = function() {

	var xhr    = new XMLHttpRequest();
	var content = document.querySelector('#status-overview tbody');
	

	xhr.open('GET', 'http://botnet.artificial.engineering:8080/api/Status');
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