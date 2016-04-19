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
				code += '<td><button class="button" id="button_id' + entry.id + '" onClick="toggleText(this.id);">Start</button></td>';
				code += '</tr>';

			}

			content.innerHTML = code;

		} else {

			content.innerHTML = 'Failed to load :(';

		}
	
	};
	
	xhr.send(null);

};