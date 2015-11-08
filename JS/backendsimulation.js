var studysession=[]
var searchlist=[]
var default_data = true
var post={group:false,minsize:0,maxsize:0,partner:false,fromhour:0,fromminute:0,tohour:0,tominute:0,homework:false,examstudy:false,startminute:0,endminute:0,lecture_review:false,notes:false,other:false,subject:"",description:"",place:"",recurrence:0,username:"",comments:""};
var request={username:"",post:null}
//profile global
var name = "Cheng Lin"
var university = "Wash. U. in St. Louis"
var email = "clin3@wustl.edu";
var major = "engineeing";
//var course = ["CSE511","</br>CSE541","</br>CSE556"];
//var course_temp = course;

//request session
var request_session = [];
var request_button = [];
var usernamecok;
//message
var MS_list = [];
var filsessions=[];
function init()
{
	
	var usrverif=document.cookie;
	if(usrverif=="")
		window.location="login.html";
	var temparray=usrverif.split("=");
	usernamecok=temparray[1];
	name=usernamecok;
	//localStorage.clear();
	var hour_html="<option> </option>";
	var minute_html="<option> </option>";
	for(var i=1;i<=12;i++)
		hour_html+="<option>"+i+"</option>";
	for(var i=0;i<60;i++)
		//if (i < 10) minute_html+="<option>0"+i+"</option>"
		minute_html+="<option>"+i+"</option>"
	document.getElementById("from-hour").innerHTML=hour_html;
	document.getElementById("to-hour").innerHTML=hour_html;
	document.getElementById("from-minute").innerHTML=minute_html;
	document.getElementById("to-minute").innerHTML=minute_html;
	PF_name(false);
	//document.getElementById("PF_name").innerHTML = name;		
	PF_university(false);
	//document.getElementById("PF_university").innerHTML = university;		
	
	var ss1=Object.create(post);
	var ss2=Object.create(post);
	var ss3=Object.create(post);
	var ss4=Object.create(post);
	ss1.subject="CSE541"
	ss1.description="Some Description";
	ss1.group=true
	ss1.minsize=2
	ss1.maxsize=5
	ss1.partner=false
	ss1.fromhour=13
	ss1.tohour=15
	ss1.fromminute=23
	ss1.tominute=29
	ss1.homework=false
	ss1.examstudy=true
	ss1.lecture_review=true
	ss1.notes=false
	ss1.other=false
	ss1.username="buddy";
	ss1.startminute=803;
	ss1.endminute=910;
	ss1.recurrence = 5;

	ss2.subject="CSE511"
	ss2.description="XDDDD";
	ss2.group=false
	ss2.minsize=1
	ss2.maxsize=1
	ss2.partner=true
	ss2.fromhour=1
	ss2.tohour=5
	ss2.fromminute=59
	ss2.tominute=0
	ss2.homework=true
	ss2.examstudy=true
	ss2.lecture_review=false
	ss2.notes=true
	ss2.other=false
	ss2.username = "Jim";
	ss2.recurrence = 1;
	
	ss3.subject="CSE556"
	ss3.description="Human CI";
	ss3.group=false
	ss3.partner=true
	ss3.fromhour=1
	ss3.tohour=15
	ss3.fromminute=23
	ss3.tominute=1
	ss3.homework=true
	ss3.examstudy=false
	ss3.lecture_review=false
	ss3.notes=true
	ss3.other = true
	ss3.username = "lawl";
	ss3.recurrence = 1;
	
	ss4.subject="ESE444"
	ss4.description="QQXD";
	ss4.group=false
	ss4.partner=false
	ss4.fromhour=1
	ss4.tohour=15
	ss4.fromminute=23
	ss4.tominute=1
	ss4.homework=true
	ss4.examstudy=false
	ss4.lecture_review=false
	ss4.notes=true
	ss4.other = true
	ss4.username = "Sarah";
	ss4.recurrence = 3;
	
	studysession.push(ss1);
	studysession.push(ss2);
	studysession.push(ss3);
	studysession.push(ss4);
	displaysearchlist();
	applyfilter();
	myscheduledsessions();
	displayrequest_sessions();
	
	
	
}
function convert_time(fhour,fminute,thour,tminute)
{
	var temp="";
	if (fminute < 10) fminute = "0"+fminute
	if (tminute < 10) tminute = "0"+tminute
	if(fhour>12)
		temp+=parseInt(fhour-12)+":"+fminute+"pm";
	else
		temp+=fhour+":"+fminute+"am";
	temp+="-"
	if(thour>12)
		temp+=parseInt(thour-12)+":"+tminute+"pm";
	else
		temp+=thour+":"+tminute+"am";
	return temp;
	
	
		
}
function invalidate_cookie()
{
	deleteAllCookies();
	window.location="login.html";
}
function deleteAllCookies() {
    var cookies = document.cookie.split(";");

    for (var i = 0; i < cookies.length; i++) {
    	var cookie = cookies[i];
    	var eqPos = cookie.indexOf("=");
    	var name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
    	document.cookie = name + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT";
    }
}
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
		    temp += "<div><p><u>" + myscheduled[i].subject + " with " + myscheduled[i].username + "</u></p><p> Location: " + myscheduled[i].place + "</p><p> Date: " + myscheduled[i].date + "</p><p> Time: " + myscheduled[i].fromhour+":"+myscheduled[i].fromminute +"-"+ myscheduled[i].tohour +myscheduled[i].tominute + "</p><p> Recurrence: " + myscheduled[i].recurrence + "</p></div>";
			
		}
		
	}
}

function requestsessions(i)
{
	
	var request_sessions=localStorage.getItem(usernamecok+"_3");
	if(request_sessions==null)
	{
		request_sessions=[];
		request_sessions.push(filsessions[i]);
	}
	else
	{
		request_sessions=JSON.parse(request_sessions);
		request_sessions.push(filsessions[i]);
	}
	var t=JSON.stringify(request_sessions);
	localStorage.setItem(usernamecok+"_3",t);
	displayrequest_sessions();
	var end_user=filsessions[i].username;
	var requests_enduser=localStorage.getItem(end_user+"_9");
	newobject=Object.create(request);
	newobject.username=usernamecok;
	newobject.post=filsessions[i];
	if(requests_enduser==null)
	{
		requests_enduser=[];
		requests_enduser.push(newobject);
	}
	else
	{
		requests_enduser=JSON.parse(requests_enduser);
		requests_enduser.push(newobject);
	}
	t=JSON.stringify(requests_enduser);
	alert(end_user);
	alert(t);
	localStorage.setItem(end_user+"_9",t);
	applyfilter();
	
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
		    temp += "<div><p><u>" + request_sessions[i].subject + " with " + request_sessions[i].username + "</u></p><p> Location: " + request_sessions[i].place + "</p><p> Date: " + request_sessions[i].date + "</p><p> Time: " + request_sessions[i].fromhour +":"+ request_sessions[i].fromminute + "-" + request_sessions[i].tohour +":"+ request_sessions[i].tominute + "</p><p> Recurrence: " +  request_sessions[i].recurrence + "</p></div>";
		}
		document.getElementById("requestedsessions").innerHTML=temp;
	}
}


function init_post_session()
{
	var PS_course="<option> Select a Course </option>";
	PS_course+="<option>"+"CSE 556 Human Computer Interaction"+"</option>";
	document.getElementById("PS_course").innerHTML=PS_course;
}
function init_message_session()
{
	PF_name(false);
	PF_university(false);
	MS_inbox();
}
function init_profile()
{
	PF_name(false);
	PF_university(false);
	PF_email(false);
	PF_major(false);
//	PF_course(false);
}
function verification()
{
	
	var verification=document.getElementById("verification").value;
	if(verification == "cse556")
		window.location="home.html";
}
function register()
{
	var email=document.getElementById("email").value;
	var username=document.getElementById("username1").value;
	var password=document.getElementById("password1").value;
	var confirmpassword=document.getElementById("confirmpassword").value;
	if(password==confirmpassword)
		window.location="verification.html";
}
function isdefault(group,minsize,maxsize,partner,startminute,endminute,homework,examstudy,lecture_review,notes,other,recur_index)
{
	//alert(group,minsize,maxsize,partner,fromhour,fromminute,tohour,tominute,homework,examstudy,lecture_review,notes,other);
	return (group==false && minsize==0 && maxsize==0 && partner==false && startminute==0&&endminute==0 && homework==false && examstudy==false && lecture_review==false && notes==false && other==false && recur_index==0);
}
function applyfilter()
{
	var group=false;
	var minsize=0;
	var maxsize=0;
	if(document.getElementById("group").checked)
	{
		group=true;
		minsize=document.getElementById("minsize").selectedIndex+1;
		maxsize=document.getElementById("maxsize").selectedIndex+1;
	}
	var partner=document.getElementById("partner").checked;
	var date=document.getElementById("selectDate").checked;
	var fromhour=document.getElementById("from-hour").selectedIndex;
	var fromminute=document.getElementById("from-minute").selectedIndex-1;
	var tohour=document.getElementById("to-hour").selectedIndex;
	var tominute=document.getElementById("to-minute").selectedIndex-1;
	var homework=document.getElementById("homework").checked;
	var examstudy=document.getElementById("examstudy").checked;
	var lecture_review=document.getElementById("lecture_review").checked;
	var notes=document.getElementById("notes").checked;
	var other=document.getElementById("other").checked;
	var fromap = document.getElementById("from-hour-ap").selectedIndex;
	var toap = document.getElementById("to-hour-ap").selectedIndex;
	if (fromap == 1) {
	    if (fromhour < 12) {
	        fromhour += 12;
	    }
	}
	if (toap == 1) {
	    if (tohour < 12) {
	        tohour += 12;
	    }
	}
	if(fromminute==-1)
		fromminute++;
	if(tominute==-1)
		tominute++;
	
	var startminute=fromhour*60+fromminute;
	var endminute=tohour*60+tominute;
	var recur_index=document.getElementById("recur_select").selectedIndex;
	alert(recur_index);
	//alert("Apply Filter");
	searchresults(group,minsize,maxsize,partner,startminute,endminute,homework,examstudy,lecture_review,notes,other,recur_index);
	
	
	
	
}
function removesearchlist(f)
{
	searchlist.splice(f,1);
	displaysearchlist();
	applyfilter();
}
function displaysearchlist()
{
	var temp="";
	for(var i=0;i<searchlist.length;i++)
		temp+="<span class =\"box\"><span class=\"cross\" onclick=\"removesearchlist("+i+")\">X </span>"+searchlist[i]+"</span>";
	document.getElementById("selected_subjects").innerHTML=temp;
		
}
function addsearchlist()
{
	var sub=document.getElementById("main_search").value;
	searchlist.push(sub.toUpperCase());
	displaysearchlist();
	document.getElementById("main_search").value="";
	applyfilter();
}
function filter_subjectresults()
{
	var refined=[]
	for(var i=0;i<studysession.length;i++)
	{
		var x=searchlist.indexOf(studysession[i].subject);
		if(x>-1)
		{
			refined.push(studysession[i]);
		}
	}
	return refined;
}
function displayobjectdata(obj,i)
{
	//alert(obj.subject);
	
	var data="";
	data+="<h2>"+obj.subject+"-"+obj.description+"</h2>";
	
	data+="<p>User: "+obj.username+"</p>"           //where can we get the info of username?
	data+="<p>Date: Not Implemented</p>";
	data+="<p>Time: "+convert_time(obj.fromhour,obj.fromminute,obj.tohour,obj.tominute)+"</p>";
	data += "<p>Location:" + obj.place + "</p>";
	data += "<p>Recurrence: " + recurrence_freq(obj.recurrence) + "</p>";
	data+="<p> Purpose:";
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
	
	data+="<p>"+obj.comments+"</p>"
	if (isInRequestSession(obj))
		data+="<button> waiting for approval</button>";
	else
		data+="<button onclick=\"requestsessions("+i+")\">"+"Request to join"+"</button>";
	data+="<hr/>"
	
	
	return data;
	
}

function recurrence_freq(index)
{
    temp = "";
    if(index ==1)
    {
        temp += "Once"
        return temp;
    }
    else if (index == 2) {
        temp += "Monthly"
        return temp;
    }
    else if (index == 3) {
        temp += "Weekly"
        return temp;
    }
    else if (index == 4) {
        temp += "Daily"
        return temp;
    }
    else if (index == 5) {
        temp += "Daily(M-F)"
        return temp;
    }
}


function isInRequestSession(obj)
{
	request_string = localStorage.getItem(usernamecok+"_3")
	request_list = JSON.parse(request_string)
	for (i = 0; i < request_list.length; i++)
	{
		//may still need to and location, recurrence, etc if those conditions are added into filter
		if (request_list[i].subject == obj.subject && request_list[i].fromhour == obj.fromhour && request_list[i].fromminute == obj.fromminute)
			if (request_list[i].tohour == obj.tohour && request_list[i].tominute == obj.tominute)
				return true
	
	}
	return false	
	
	
}

//function searchresults(group,minsize,maxsize,partner,fromhour,fromminute,tohour,tominute,homework,examstudy,lecture_review,notes,other)

function searchresults(group,minsize,maxsize,partner,startminute,endminute,homework,examstudy,lecture_review,notes,other,recurrence)

{
    default_mode = isdefault(group, minsize, maxsize, partner, startminute, endminute, homework, examstudy, lecture_review, notes, other, recurrence)
	//alert(group+""+minsize+""+maxsize+""+partner+""+fromhour+fromminute+tohour+tominute+homework+examstudy+lecture_review+notes+other);
	alert(default_mode);
	default_course=searchlist.length==0;
	var temp="";
	if(default_mode && default_course)
	{
		filsessions=studysession;
	for(var i=0;i<filsessions.length;i++)
		//if (isInArray("</br><h4>"+studysession[i].subject+"</h4></br>"+studysession[i].description, request_session) == false)
			//{alert("XD")}
			//request_button.push("Join!")
		//temp+="<div><h4>"+studysession[i].subject+"<button onclick=\"request("+i+")\">"+request_button[i]+"</button>"+"</h4>"+"<p>"+studysession[i].description+"</p></div>";
		if(usernamecok!=filsessions[i].username)
		temp+="<div>"+displayobjectdata(filsessions[i],i)+"</div>";
	document.getElementById("results").innerHTML=temp;
	
	}
	else
	{
		var newsessions=[];
		if(searchlist.length >0)
		newsessions=filter_subjectresults();
		else
			newsessions=studysession;
			
		 //group:false,minsize:0,maxsize:0,partner:false,fromhour:0,fromminute:0,tohour:0,tominute:0,homework:false,examstudy:false,lecture_review:false,notes:false,other:false,subject:"",description:""
		if(default_mode==true)
		{
			filsessions=newsessions;
		}
		else
			if(default_mode==false)	
		{
			filsessions=[];
			for(var i=0;i<newsessions.length;i++)
		{
			//alert();
			var p;
			if(group)
			{
			p=(newsessions[i].group==group && newsessions[i].minsize>=minsize && newsessions[i].maxsize<=maxsize) 
			if(p)	
			{
			filsessions.push(newsessions[i]);
			continue;
			}
			
			}
			
			if(partner)
			{
			
				
				p=(newsessions[i].partner==true);
				if(p)
				{
				filsessions.push(newsessions[i]);
				continue;
				
				}	
			}
		
			if(homework)
			{
				p=newsessions[i].homework==true;
				if(p)
				{
				filsessions.push(newsessions[i]);
				continue;
				}	
				
			}
			
			if(examstudy)
			{
				p=newsessions[i].examstudy==true;
				if(p)
				{
				filsessions.push(newsessions[i]);
				continue;
			}
				
			}
			
			if(lecture_review)
			{
				p=newsessions[i].lecture_review==true;
				if(p)
				{
				filsessions.push(newsessions[i]);	
				continue;
			}
				
				
			}
			
			if(notes)
			{
				p=newsessions[i].notes==true;
				if(p)
				{
				filsessions.push(newsessions[i]);
				continue;
			}
				
			}

			if (recurrence>0) {
			    p = (newsessions[i].recurrence == recurrence);
			    if (p) {
			        filsessions.push(newsessions[i]);
			        continue;
			    }

			}
			
			if(newsessions[i].startminute>=startminute&&newsessions[i].endminute<=endminute)
			{
				filsessions.push(newsessions[i]);
				//alert("time"+i);
				continue;
			}
			
				if(other)
			{
				p=newsessions[i].other==true;
				if(p)
				{
					filsessions.push(newsessions[i]);
					continue;
				}
				
			}
			
		}
			}
	
		//alert(filsessions.length);
		temp="";
		for(var i=0;i<filsessions.length;i++)
			if(usernamecok!=filsessions[i].username)
			temp+="<div>"+displayobjectdata(filsessions[i],i)+"</div>";
		document.getElementById("results").innerHTML=temp;
			
			}
		

}

/*function request(i)
{
	if (isInArray("</br><h4>"+studysession[i].subject+"</h4></br>"+studysession[i].description, request_session))
		alert("Already Joined!")
	else
		request_session.push("</br><h4>"+studysession[i].subject+"</h4></br>"+studysession[i].description)
	document.getElementById("request_session").innerHTML = request_session;	
}*/



function isInArray(value, array) {
  return array.indexOf(value) > -1;
}

function onchangegroup()
{
	if(document.getElementById("group").checked)
	{
		document.getElementById("ifgroupchecked").innerHTML="Size: <select id=\"minsize\" onkeydown=\"if (event.keyCode == 13) document.getElementById('applyfilter').click()\"><option>1</option><option>2</option><option>3</option><option>4</option></select>-<select id=\"maxsize\" onkeydown=\"if (event.keyCode == 13) document.getElementById('applyfilter').click()\"><option>1</option><option>2</option><option>3</option><option>4</option><option>5</option></select>";
	}
	else
	{
		document.getElementById("ifgroupchecked").innerHTML="";
	}
}
function PS_add_session()
{
	PS_add = false
	if(document.getElementById("PS_add_session").click)
	{
		document.getElementById("PS_if_session_added").innerHTML="Start time: <input type=\"text\" id=\"PS_start\" onkeydown=\"if (event.keyCode == 13) document.getElementById('PS_post').click()\"/><br/>"+
			"End time: <input type=\"text\" id=\"PS_end\" onkeydown=\"if (event.keyCode == 13) document.getElementById('PS_post').click()\"/><br/>"+
			"Date: <input type=\"date\" name=\"selectDate\" id=\"PS_selectDate\" onkeydown=\"if (event.keyCode == 13) document.getElementById('PS_post').click()\"/><br/>"+
			"Recurrence: <select id=\"PS_recurrence\" onkeydown=\"if (event.keyCode == 13) document.getElementById('PS_post').click()\"><option>once</option><option>weekly</option><option>monthly</option><option>yearly</option></select></br>"
	}
}
function PS_post()
{
	
	
	
}


function PF_save()
{
	PF_name(true);
	PF_university(true);
	PF_email(true);
	PF_major(true);
//	PF_course(true);
	//alert(name+"\n"+university+"\n"+major+"\n"+email+"\n"+course+"\n"+course_temp);
}

/*function PF_addcourse()
{
	course_temp.push("</br>"+document.getElementById("coursename").value)
	document.getElementById("PF_course").innerHTML = course_temp;	
	
}*/
function PF_name(write)
{
	if (write)
		name = document.getElementById("PF_name").value
	else
		document.getElementById("PF_name").innerHTML = name;
		document.getElementById("PF_name").defaultValue = name;
}

function PF_university(write)
{
	if (write)
		university = document.getElementById("PF_university").value
	else
		document.getElementById("PF_university").innerHTML = university;		
		document.getElementById("PF_university").defaultValue = university;		
}

function PF_email(write)
{
	if (write)
		email = document.getElementById("PF_email").value
	else
		document.getElementById("PF_email").innerHTML = email;	
		document.getElementById("PF_email").defaultValue = email;	
}

function PF_major(write)
{
	if (write)
		major = document.getElementById("PF_major").value
	else
		document.getElementById("PF_major").innerHTML = major;	
		document.getElementById("PF_major").defaultValue = major;	
}

/*function PF_course(write)
{
	if (write)
		course = course_temp
	//else
	//	document.getElementById("PF_course").innerHTML = course_temp;	
	document.getElementById("PF_course").innerHTML = course;			
}*/



function MS_new()
{

	//alert("XD")
	document.getElementById("MS_detail").innerHTML = "To: <input type=\"text\" id=\"MS_to\" onkeydown=\"if (event.keyCode == 13) document.getElementById('MS_send').click()\"/><br/>"+
					"Subject: <input type=\"text\" id=\"MS_subject\" onkeydown=\"if (event.keyCode == 13) document.getElementById('MS_send').click()\"/><br/>"+
					"Message: </br>"+
					"<textarea name=\"paragraph_text\" cols=\"50\" rows=\"10\" id=\"MS_message\"></textarea></br>"+
					"<input type=\"button\" value=\"Send Message\" id =\"MS_send\" onclick=\"MS_send()\"/>"
					
}

function MS_send()
{
	document.getElementById("MS_to").value = ""
	document.getElementById("MS_subject").value = ""
	document.getElementById("MS_message").value = ""
	alert("Message sent!")
}

function MS_inbox()
{
	var MS_type={MS_subject:"Welcome to Study Buddy!",MS_outline:"Welcome to Study Buddy, this email will guide you through the popular features of StudyBuddy"}
	var MS1=Object.create(MS_type);
	var MS2=Object.create(MS_type);
	var MS3=Object.create(MS_type);
	var MS4=Object.create(MS_type);
	var MS5=Object.create(MS_type);
	
	MS1.MS_subject = "QQ"
	MS1.MS_outline = "XDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDD"
	
	MS3.MS_subject = "33333"
	MS3.MS_outline = "XD333333333333DDDDDDDDDDDDDDDDDDDDD"
	
	MS4.MS_subject = "4444444"
	MS4.MS_outline = "XDDDDDD444444444444DDDDDDDDDDDDDDDDDDDDDDDDD"
	
	MS5.MS_subject = "QQ5555"
	MS5.MS_outline = "XDDDDDDDDDDDD5555D"
	
	MS_list.push(MS1)
	MS_list.push(MS2)
	MS_list.push(MS3)
	MS_list.push(MS4)
	MS_list.push(MS5)
	
	
	//document.getElementById("MS_inbox").innerHTML = MS1.MS_subject + MS1.MS_outline
	MS_msgbox(MS_list)

	
}
function MS_msgbox(msg_list)
{
	var MS_inbox_list =""
	for (var i = 0; i < msg_list.length; i++)
	{
		
	
		 MS_inbox_list += "<style>div.transbox{border: 1px solid black;opacity:0.6;}"+
			"div.transbox p{margin: 5%;font-weight: bold;}</style><div class=\"background\"><div class=\"transbox\" onclick=\"MS_show_msg("+i+")\">"+
			"<text>"+msg_list[i].MS_subject+"</br></text>"+
			"<p>"+msg_list[i].MS_outline.substring(0, 45)+"..."+"</p></div></div>"
	}
	document.getElementById("MS_inbox").innerHTML = MS_inbox_list
}

function MS_delete(i)
{
	MS_list.splice(i,1)
	MS_msgbox(MS_list)
	if (MS_list.length > 0)
		if (i != MS_list.length)
			MS_show_msg(i)
		else
			MS_show_msg(i-1)
	else
		document.getElementById("MS_detail").innerHTML = "No message in the box"
	
}

function MS_show_msg(i)
{

	document.getElementById("MS_detail").innerHTML = "<text>"+MS_list[i].MS_subject+"</br></text><p>"+MS_list[i].MS_outline+"</p>"+
		"<input type=\"button\" value=\"Delete\" id=\"MS_delete\" onclick=\"MS_delete("+i+")\"></button>"
}

function user_link(username)
{
    if (username == "buddy")
        var result = str.link("profile_Bob.html");       //where is the user profile link? I couldn't find it
    else if (username == "Jim")
        var result = str.link("profile_Jim.html");
    else if (username == "lawl")
        var result = str.link("profile_lawl.html");
    else if (username == "Sarah")
        var result = str.link("profile_Sarah.html");
    else if (username == "George")
        var result = str.link("***George profile page***");
    document.getElementById("user_profile").innerHTML = result;
}