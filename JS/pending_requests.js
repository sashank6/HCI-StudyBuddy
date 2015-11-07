var usernamecok="";
function init_pending_requests()
{
	var usrverif=document.cookie;
	if(usrverif=="")
		window.location="login.html";
	var temparray=usrverif.split("=");
	usernamecok=temparray[1];
	display_pendingrequests();
}



function display_pendingrequests()
{
	
	var pending_requests=localStorage.getItem(usernamecok+"_9");
	
	var temp="";
	if(pending_requests==null)
	{
		temp="<p>You do not have any requests pending!</p>";
	}
	else
	{
		
		pending_requests=JSON.parse(pending_requests);
		
		temp+=pending_requests[0].username+" "+pending_requests[0].post.subject;
	}
	document.getElementById("request_info").innerHTML=temp;
}