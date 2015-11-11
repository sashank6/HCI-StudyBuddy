var usernamecok="";
var pending_requests;

function init_pending_requests()
{
	var usrverif=document.cookie;
	if(usrverif=="")
		window.location="login.html";
	var temparray=usrverif.split("=");
	usernamecok=temparray[1];
	display_pendingrequests();
	myscheduledsessions();
	displayrequest_sessions();
	document.getElementById("username_display").innerHTML="<a href=profile_"+usernamecok+".html>"+usernamecok+"</a>";
}

/*
{"username":"buddy",
"post":{"
subject":"CSE541","
description":"Some Description","
group":true,"
minsize":2,"
maxsize":5,"
partner":false,"
fromhour":13,"
tohour":15,"
fromminute":23,"
tominute":29,"
homework":false,"
examstudy":true,"
lecture_review":true,"
notes":false,"
other":false,"
username":"buddy"}},
*/
//{"username":"sashank","post":{"subject":"CSE541","description":"Some Description","group":true,"minsize":2,"maxsize":5,"partner":false,"fromhour":13,"tohour":15,"fromminute":23,"tominute":29,"homework":false,"examstudy":true,"lecture_review":true,"notes":false,"other":false,"username":"buddy"}}]

function display_pendingrequests()
{
	
	//pending_requests=JSON.parse(pending_requests);
	//localStorage.clear();
	var temp="";
	pending_requests=localStorage.getItem(usernamecok+"_9");
	
	
	if(pending_requests==null)
	{
		temp="<p>You do not have any requests pending!</p>";
	}
	else
	{
		
		pending_requests=JSON.parse(pending_requests);
		
		for (i = 0; i < pending_requests.length; i++)
		{
			
			temp+="<h3 onclick=\"PR_detail("+i+")\">"+pending_requests[i].username+"</h3>is asking to join<h3>"+pending_requests[i].post.subject+"</h3></br>"+
				"Purpose:"+pending_requests[i].post.description+"</br>Date:"+pending_requests[i].post.date+
				"</br>From:"+pending_requests[i].post.fromhour+":"+pending_requests[i].post.fromminute+
				"</br>To:"+pending_requests[i].post.tohour+":"+pending_requests[i].post.tominute+
				"</br>Location:"+pending_requests[i].post.place+
				"</br>Recurrence:"+pending_requests[i].post.recurrence+"</br>"+
				"<input type=\"button\" value=\"Accept\" id=\"PR_accept\" onclick=\"PR_accept("+i+")\"></button>"+
				"<input type=\"button\" value=\"Deny\" id=\"PR_deny\" onclick=\"PR_deny("+i+")\"></button>"
		}
	
	}
	document.getElementById("request_info").innerHTML=temp;
	
}

function PR_detail(i)
{
	alert("test")
	var pending_requests=localStorage.getItem(usernamecok+"_9");
	document.getElementById("pending_requests").innerHTML = "<h3>XDDDDD</h3>"
}

function PR_accept(i)
{
	alert("accepted")
	
	
	applicant_username = pending_requests[i].username
	applicant_sessions_applied=JSON.parse(localStorage.getItem(applicant_username+"_3"));
	
	for (j=0; j < applicant_sessions_applied.length; j++)
	{
		if (applicant_sessions_applied[j].place == pending_requests[i].post.location)
			alert("==")
	}
	
	
	/*
	reply.subject = pending_requests[i].post.subject
	//myscheduled[i].place = pending_requests[i].post.place //we do not have this feature
	//myscheduled[i].date = pending_requests[i].post.date //no this feature
	reply.fromhour = pending_requests[i].post.fromhour
	myscheduled[i].fromminute = pending_requests[i].post.fromminute
	myscheduled[i].tohour = pending_requests[i].post.tohour
	myscheduled[i].tominute = pending_requests[i].post.tominute
	//myscheduled[i].recurrence = pending_requests[i].post.recurrence //no this feature
	*/
	//localStorage.setItem(reply.username+"_9",t);
	alert(applicant_username)
	document.getElementById("PR_test_area").innerHTML=applicant_sessions_applied[0].place
	PR_delete(i)
}

function PR_deny(i)
{
	alert("denied")
	PR_delete(i)
}
function PR_delete(i)
{
	
	pending_requests.splice(i,1)
	//localStorage.setItem(usernamecok+"_9",pending_requests);
	display_pendingrequests()
}

function PR_test()
{
	alert("test")
	alert(usernamecok)
	//alert(end_user)
	a=localStorage.getItem(usernamecok+"_1");
	b=localStorage.getItem(usernamecok+"_3");
	c=localStorage.getItem(usernamecok+"_9");
	alert(a)
	alert(b)
	alert(c)
}