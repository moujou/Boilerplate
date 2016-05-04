var toggleButton = function(id){
	
    if (document.getElementById(id).innerHTML == "Start") {
		document.getElementById(id).innerHTML = "Stop";
		sendActionInfo(id,"true");
		

    } else {
        document.getElementById(id).innerHTML = "Start";
        sendActionInfo(id,"false");
    }
};

var refreshButtonTask = function() {
	taskRequest();
}

var refreshButtonStatus = function() {
	initialize();
}

var sendActionInfo = function(id, cmd) {
	
	var xhr  = new XMLHttpRequest();
	
	xhr.open('POST', 'http://botnet.artificial.engineering:8080/api/Status');

	xhr.setRequestHeader('Content-Type', 'application/json');
	xhr.setRequestHeader('Token', 'cc444569854e9de0b084ab2b8b1532b2');
	xhr.responseType = 'json';
	
	var mo;
	if(cmd == "false"){
		mo = false;
	} else {
		mo = true;
	}

	data = {'id': parseInt(id,10), 'status': mo};

	xhr.send(JSON.stringify(data));
}

var sendApiTask = function(id, type, data) {
	
	var xhr = new XMLHttpRequest();
	
	xhr.open('POST', 'http://botnet.artificial.engineering:8080/api/Tasks');

	xhr.setRequestHeader('Content-Type', 'application/json');
	xhr.setRequestHeader('Token', 'cc444569854e9de0b084ab2b8b1532b2');
	xhr.responseType = 'json';
	
	data = {"id" : parseInt(id,10), 
			"type" : type, 
			"data" : {'input': data,
					'output' : null} 
	};
	xhr.send(JSON.stringify(data));
};