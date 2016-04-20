var toggleButton = function(id){
	
    if (document.getElementById(id).innerHTML == "Start") {
		document.getElementById(id).innerHTML = "Stop";
    } else {
        document.getElementById(id).innerHTML = "Start";
    }
};