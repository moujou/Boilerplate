var toggleButton = function(id){
	
    if (document.getElementById(id).innerHTML == "Start") {
		document.getElementById(id).innerHTML = "Stop";
		sendActionInfo(id,"false");

    } else {
        document.getElementById(id).innerHTML = "Start";
        sendActionInfo(id,"true");
    }
};

var refreshButtonTask = function() {
	taskRequest();
}

var refreshButtonStatus = function() {
	initialize();
}

var sendActionInfo(id, cmd) {

	var xhr    = new XMLHttpRequest();
	var content = document.querySelector('#status-overview tbody');
	

	xhr.open('POST', 'http://botnet.artificial.engineering:8080/api/Status');

	xhr.responseType = 'json';

	data = {'id': id, 'status': cmd};

	xhr.send(JSON.stringify(data));
}