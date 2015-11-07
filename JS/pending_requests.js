var usernamecok="";
function init_pending_requests()
{
	var usrverif=document.cookie;
	if(usrverif=="")
		window.location="login.html";
	var temparray=usrverif.split("=");
	usernamecok=temparray[1];
}



function display_pendingrequests()
{
	var pending_requests=localStorage.getItem(usernamecok+"_9");
	var temp="";
	if(pending_requests==null)
	{
		
	}
}