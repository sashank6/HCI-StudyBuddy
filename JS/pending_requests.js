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
	//myscheduledsessions();
	//displayrequest_sessions();
	display_rightribbon();
	document.getElementById("username_display").innerHTML="<a href=profile_"+usernamecok+".html>"+usernamecok+"</a>";
	pending_num_display()
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

function purpose(obj)
{
	var data="";
	var tesr=[]
	
	if(obj.homework)
		tesr.push("Homework");
	if(obj.examstudy)
		tesr.push("Study for Exam");
	if(obj.notes)
		tesr.push("Share Notes");
	if(obj.lecture_review)
		tesr.push("Lecture Review");
	if(obj.other)
		tesr.push("Other");
	var r=0;
	for(r=0;r<tesr.length-1;r++)
		data+=" "+tesr[r]+",";
	data+=" "+tesr[r];
	//alert(data);
	return data;
}
function display_pendingrequests()
{
	
	//pending_requests=JSON.parse(pending_requests);
	
	var temp="";
	pending_requests=localStorage.getItem(usernamecok+"_9");
	
	
	if(pending_requests==null || pending_requests == "[]")
	{
		temp="<p>You do not have any requests pending!</p>";
	}
	else
	{
		pending_requests=JSON.parse(pending_requests);
		
		for (i = 0; i < pending_requests.length; i++)
		{

			
			temp+="<onclick=\"PR_detail("+i+")\"><b>"+"<a href=\"profile_"+pending_requests[i].username+".html\" >"+pending_requests[i].username+"</a>"+"</b> is asking to join <b>"+pending_requests[i].post.subject+"</b></br>"+
				"<b>Purpose:</b>"+purpose(pending_requests[i].post)+"</br><b>Date:</b>"+pending_requests[i].post.date+
				"</br><b>Time:</b>"+convert_time(pending_requests[i].post.fromhour, pending_requests[i].post.fromminute, pending_requests[i].post.tohour, pending_requests[i].post.tominute)+
				"</br><b>Location:</b>"+pending_requests[i].post.place+
				"</br><b>Recurrence:</b>"+recurrence_freq(pending_requests[i].post.recurrence)+"</br>"+

				"<input type=\"button\" value=\"Accept request\" id=\"PR_accept\" onclick=\"PR_accept("+i+",1)\"></button>"+
				"<input type=\"button\" value=\"Deny request\" id=\"PR_deny\" onclick=\"PR_accept("+i+")\",0></button>"
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

function PR_accept(i,decision)
{
	applicant_username = pending_requests[i].username
	applicant_sessions_applied = JSON.parse(localStorage.getItem(applicant_username+"_3"));
	applicant_scheduled_session = JSON.parse(localStorage.getItem(applicant_username+"_1"));
	my_post_session = JSON.parse(localStorage.getItem(usernamecok+"_2"));
	if (applicant_scheduled_session == null) applicant_scheduled_session = [];
	
	for (j=0; j < applicant_sessions_applied.length; j++)
	{
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
			for (k=0; k < my_post_session.length; k++)
			{
				if (my_post_session[k].place == pending_requests[i].post.place &&
				my_post_session[k].fromhour == pending_requests[i].post.fromhour &&
				my_post_session[k].fromminute == pending_requests[i].post.fromminute &&
				my_post_session[k].tohour == pending_requests[i].post.tohour &&
				my_post_session[k].tominute == pending_requests[i].post.tominute &&
				my_post_session[k].subject == pending_requests[i].post.subject &&
				my_post_session[k].recurrence == pending_requests[i].post.recurrence &&
				my_post_session[k].homework == pending_requests[i].post.homework &&
				my_post_session[k].lecture_review == pending_requests[i].post.lecture_review &&
				my_post_session[k].examstudy == pending_requests[i].post.examstudy &&
				my_post_session[k].notes == pending_requests[i].post.notes &&
				my_post_session[k].description == pending_requests[i].post.description
				)
				{
					my_post_session[k].member_joined += 1;
					my_post_session = JSON.stringify(my_post_session)
					localStorage.setItem(usernamecok+"_2",my_post_session)
					break;
				}
				
					
			}
					
			
			
			applicant_schedule_add=Object.create(request);
			applicant_schedule_add.username = usernamecok
			applicant_sessions_applied[j].member_joined += 1;
			applicant_schedule_add.post = applicant_sessions_applied[j]
			
			//applicant_schedule_add = applicant_sessions_applied.splice(j,1)
			applicant_sessions_applied.splice(j,1)
			applicant_scheduled_session.push(applicant_schedule_add)
			applicant_scheduled_session = JSON.stringify(applicant_scheduled_session)
			if (decision == 1) localStorage.setItem(applicant_username+"_1", applicant_scheduled_session)
			
			applicant_sessions_applied = JSON.stringify(applicant_sessions_applied)
			localStorage.setItem(applicant_username+"_3", applicant_sessions_applied)
			
			break;
		}
	}
	
	
	pending_requests.splice(i,1)
	pending_requests = JSON.stringify(pending_requests)
	localStorage.setItem(usernamecok+"_9", pending_requests)
	display_pendingrequests()
	pending_num_display()
	

}
