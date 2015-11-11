var usernamecok="";
var pending_requests;

function init_pending_requests()
{
	//localStorage.clear()
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
				"</br>Place:"+pending_requests[i].post.place+
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
	applicant_sessions_applied = JSON.parse(localStorage.getItem(applicant_username+"_3"));
	alert("1")
	applicant_scheduled_session = JSON.parse(localStorage.getItem(applicant_username+"_1"));
	alert(applicant_scheduled_session)
	if (applicant_scheduled_session == null) applicant_scheduled_session = [];
	
	for (j=0; j < applicant_sessions_applied.length; j++)
	{
		alert("2 in for ")
		if (applicant_sessions_applied[j].place == pending_requests[i].post.place &&
		applicant_sessions_applied[j].fromhour == pending_requests[i].post.fromhour &&
		applicant_sessions_applied[j].fromminute == pending_requests[i].post.fromminute &&
		applicant_sessions_applied[j].tohour == pending_requests[i].post.tohour &&
		applicant_sessions_applied[j].tominute == pending_requests[i].post.tominute &&
		applicant_sessions_applied[j].subject == pending_requests[i].post.subject &&
		applicant_sessions_applied[j].recurrence == pending_requests[i].post.recurrence &&
		applicant_sessions_applied[j].homework == pending_requests[i].post.homework &&
		applicant_sessions_applied[j].lecture_review == pending_requests[i].post.lecture_review &&
		applicant_sessions_applied[j].examstudy == pending_requests[i].post.examstudy &&
		applicant_sessions_applied[j].notes == pending_requests[i].post.notes &&
		applicant_sessions_applied[j].description == pending_requests[i].post.description
		)
		{
			alert("3 in if"+applicant_sessions_applied[j].subject)
			applicant_schedule_add=Object.create(request);
			alert("3.1")
			alert(applicant_schedule_add.post)
			applicant_schedule_add.username = usernamecok
			alert("3.2"+applicant_schedule_add.username)
			applicant_schedule_add.post = applicant_sessions_applied[j]
			/*
			applicant_schedule_add.post.fromhour = pending_requests[i].post.fromhour
			applicant_schedule_add.post.fromminute = pending_requests[i].post.fromminute
			applicant_schedule_add.post.tohour = pending_requests[i].post.tohour
			applicant_schedule_add.post.tominute = pending_requests[i].post.tominute
			applicant_schedule_add.post.subject = pending_requests[i].post.subject
			applicant_schedule_add.post.recurrence = pending_requests[i].post.recurrence
			alert("3.5")
			applicant_schedule_add.post.homework = pending_requests[i].post.homework
			applicant_schedule_add.post.lecture_review = pending_requests[i].post.lecture_review
			applicant_schedule_add.post.examstudy = pending_requests[i].post.examstudy
			applicant_schedule_add.post.notes == pending_requests[i].post.notes
			applicant_schedule_add.post.description = pending_requests[i].post.description
			*/
			alert("3.9")
			
			//applicant_schedule_add = applicant_sessions_applied.splice(j,1)
			applicant_sessions_applied.splice(j,1)
			alert("4"+applicant_schedule_add.post.subject)
			applicant_scheduled_session.push(applicant_schedule_add)
			alert("5"+applicant_scheduled_session[0].post.subject)
			applicant_scheduled_session = JSON.stringify(applicant_scheduled_session)
			alert("6"+applicant_scheduled_session[0])
			localStorage.setItem(applicant_username+"_1", applicant_scheduled_session)
			alert("applicant schedule session = "+applicant_schedule_add.post.subject)
			applicant_sessions_applied = JSON.stringify(applicant_sessions_applied)
			localStorage.setItem(applicant_username+"_3", applicant_sessions_applied)
			
			break;
		}
	}
	
	
	/*
	reply.subject = pending_requests[i].post.subject
	//myscheduled[i].place = pending_requests[i].post.place //we do not have this feature
	//myscheduled[i].date = pending_requests[i].post.date //no this feature
	//myscheduled[i].recurrence = pending_requests[i].post.recurrence //no this feature
	*/
	//localStorage.setItem(applicant_username+"_3",applicant_sessions_applied);
	alert(applicant_username)
	document.getElementById("PR_test_area").innerHTML=applicant_scheduled_session//applicant_sessions_applied[0].place
	//applicant_scheduled_session = JSON.parse(localStorage.getItem(applicant_username+"_1"));
	document.getElementById("PR_test_area").innerHTML=applicant_scheduled_session[0].post.subject//applicant_sessions_applied[0].place
	
	PR_delete(i)
}

function PR_deny(i)
{
	alert("denied")
	document.getElementById("PR_test_area").innerHTML=applicant_scheduled_session//applicant_sessions_applied[0].place
	PR_delete(i)
}
function PR_delete(i)
{
	
	//pending_requests=localStorage.getItem(usernamecok+"_9");
	pending_requests.splice(i,1)
	pending_requests = JSON.stringify(pending_requests)
	localStorage.setItem(usernamecok+"_9", pending_requests)
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