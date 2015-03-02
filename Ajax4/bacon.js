var xmlHttp = createXMLHttpRequestObject();

function createXMLHttpRequestObject() {
	var xmlHttp;
	
	if (window.XMLHttpRequest){
		xmlHttp = new XMLHttpRequest();
	} else {
		xmlHttp = new ActiveXObject("Microsoft.XMLHTTP");
	}
	return xmlHttp;
}

function process(){
	alert('process fired');
	if (xmlHttp){
		try {
			
			 /* ***** For handling a text file ****** */
			xmlHttp.open("GET", "bacon.txt", true);
			xmlHttp.onreadystatechange = handleServerResponse;
			xmlHttp.send(null);
			
			/* ****** for handling an XML file ******
			xmlHttp.open("GET", "tuna.xml", true);
			xmlHttp.onreadystatechange = handleServerResponse;
			xmlHttp.send(null); */
		}
		catch (e){
			alert(e.toString() );
		}
	}
}

function handleServerResponse(){
	theD = document.getElementById('theD');
	if (xmlHttp.readyState == 1){
		theD.innerHTML += "Status 1: server connection established <br/>";
	} else if(xmlHttp.readyState == 2){
		theD.innerHTML += "Status 2: request received <br/>";
	} else if(xmlHttp.readyState == 3){
		theD.innerHTML += "Status 3: processing request <br/>";
	} else if(xmlHttp.readyState == 4) /* response is ready. This line is all that is required */{
		if (xmlHttp.status==200) {
			try {
				alert('handled bitch');
				/* process .txt response */ 
				text = xmlHttp.responseText;
				theD.innerHTML += "Status 4: processing request <br/>";
				theD.innerHTML += text;  
				
				/* function to handle XML response */
				// handleResponse();
			} catch (e){
				alert(e.toString())
			}
		} else {
			alert(xmlHttp.statusText)
		}
	} 
}

// handle the response from the server
funtion handleResponse(){
	var xmlResponse = xmlHttp.responseXML;
	root = xmlResponse.documentElement;
	names = root.getElementsByTagName('name');
	ssns = root.getElementsByTagName('ssn');
	
	var stuff = "";
	for (var i=0; i<names.length; i++;){
		stuff += names.item(i).firstChild.data + " - " + ssns.item(i).firstChild.data "<br/>";
	}
	
	theD = document.getElementById('theD');
	theD.innerHTML = stuff;
}



