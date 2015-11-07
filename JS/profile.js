
function myscheduledsessions()
{
	var myscheduled=localStorage.getItem(usernamecok+"_1");
	if(myscheduled==null)
	{
		
		document.getElementById("myscheduledsessions").innerHTML="<p> You do not have any sessions scheduled </p>";
	}
	else
	{
		var temp="";
		for(var i=0;i<myscheduled.length;i++)
		{
			
			
		}
		
	}
}

function init_profile() {
	myscheduledsessions();
	PF_init();
	displayrequest_sessions();
}


function displayrequest_sessions()
{
	var request_sessions=localStorage.getItem(usernamecok+"_3");
	if(request_sessions==null)
	{
		document.getElementById("requestedsessions").innerHTML="You didn't request any sessions";
	}
	else
	{
		request_sessions=JSON.parse(request_sessions);
		var temp="";
		for(var i=0;i<request_sessions.length;i++)
		{
			temp+="<div><p>"+request_sessions[i].subject+" with "+request_sessions[i].username+"</p></div>";
		}
		document.getElementById("requestedsessions").innerHTML=temp;
	}
}