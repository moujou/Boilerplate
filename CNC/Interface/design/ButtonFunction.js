var toggleButton = function(id){
	
    if (document.getElementById(id).innerHTML == "Start") {
		document.getElementById(id).innerHTML = "Stop";
    } else {
        document.getElementById(id).innerHTML = "Start";
    }
};

var refreshButtonTask = function() {
	taskRequest();
}

var refreshButtonStatus = function() {
	initialize();
}