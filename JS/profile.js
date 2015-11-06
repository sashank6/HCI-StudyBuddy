
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
}