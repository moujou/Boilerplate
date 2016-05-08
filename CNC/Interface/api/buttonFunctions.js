var toggleButton = function(id){
    if (document.getElementById(id).innerHTML === "Start") {
		document.getElementById(id).innerHTML = "Stop";
		document.getElementById(id).style.background = "#990000";
		sendActionInfo(id,"true");
    } else {
        document.getElementById(id).innerHTML = "Start";
		document.getElementById(id).style.background = "#006600";
        sendActionInfo(id,"false");
    }
};

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
};

var refreshButton = function() {
	
	var aktuelleSeite = window.location.hash;
	
	if(aktuelleSeite === "#status") {
		initialize();
	} else {
		taskRequest();
	}
};

