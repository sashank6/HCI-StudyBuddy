var studysession=[]
var searchlist=[]
var default_data = true

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

function init()
{
	var hour_html="<option> </option>";
	var minute_html="<option> </option>";
	for(var i=1;i<=12;i++)
		hour_html+="<option>"+i+"</option>";
	for(var i=0;i<60;i++)
		minute_html+="<option>"+i+"</option>"
	document.getElementById("from-hour").innerHTML=hour_html;
	document.getElementById("to-hour").innerHTML=hour_html;
	document.getElementById("from-minute").innerHTML=minute_html;
	document.getElementById("to-minute").innerHTML=minute_html;
	PF_name(false);
	//document.getElementById("PF_name").innerHTML = name;		
	PF_university(false);
	//document.getElementById("PF_university").innerHTML = university;		
	var post={group:false,minsize:0,maxsize:0,partner:false,fromhour:0,fromminute:0,tohour:0,tominute:0,homework:false,examstudy:false,lecture_review:false,notes:false,other:false,subject:"",description:""}
	var ss1=Object.create(post);
	var ss2=Object.create(post);
	var ss3=Object.create(post);
	var ss4=Object.create(post);
	ss1.subject="CSE541"
	ss1.description="George wants to review the lecture (GOMS) at Whitaker Hall 216 on Nov. 7 (Saturday) from 2-4pm. <br> <br> Cheng wants to study for the exam";
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
	
	ss2.subject="CSE511"
	ss2.description="XDDDD";
	ss2.group=false
	ss2.minsize=1
	ss2.maxsize=1
	ss2.partner=true
	ss2.fromhour=1
	ss2.tohour=5
	ss2.fromminute=59
	ss2.tominute=00
	ss2.homework=true
	ss2.examstudy=true
	ss2.lecture_review=false
	ss2.notes=true
	ss2.other=false
	
	ss3.subject="CSE556"
	ss3.description="QQQQQ";
	ss3.group=false
	ss3.partner=true
	ss3.fromhour=1
	ss3.tohour=15
	ss3.fromminute=23
	ss3.tominute=01
	ss3.homework=true
	ss3.examstudy=false
	ss3.lecture_review=false
	ss3.notes=true
	ss3.other=true
	
	ss4.subject="ESE444"
	ss4.description="QQXD";
	ss4.group=false
	ss4.partner=false
	ss4.fromhour=1
	ss4.tohour=15
	ss4.fromminute=23
	ss4.tominute=01
	ss4.homework=true
	ss4.examstudy=false
	ss4.lecture_review=false
	ss4.notes=true
	ss4.other=true
	
	studysession.push(ss1);
	studysession.push(ss2);
	studysession.push(ss3);
	studysession.push(ss4);
	displaysearchlist();
	applyfilter();
	
	
	
}
function init_post_session()
{
	var PS_course="<option> Select a Course </option>";
	PS_course+="<option>"+"CSE 556 Human Computer Interaction"+"</option>";
	document.getElementById("PS_course").innerHTML=PS_course;
}
function init_message_session()
{
	var PS_course="<option> Select a Course </option>";
	PS_course+="<option>"+"CSE 556 Human Computer Interaction"+"</option>";
	document.getElementById("PS_course").innerHTML=PS_course;
}
function login()
{
	var username=document.getElementById("username").value;
	var password=document.getElementById("password").value;
	if(username=="sashank" && password=="hci")
		window.location="home.html";
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
function isdefault(group,minsize,maxsize,partner,fromhour,fromminute,tohour,tominute,homework,examstudy,lecture_review,notes,other)
{
	//alert(group,minsize,maxsize,partner,fromhour,fromminute,tohour,tominute,homework,examstudy,lecture_review,notes,other);
	return (group==false && minsize==0 && maxsize==0 && partner==false && fromhour==-1 && fromminute==-1 && tohour==-1 && tominute==-1 && homework==false && examstudy==false && lecture_review==false && notes==false && other==false);
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
	var fromhour=document.getElementById("from-hour").selectedIndex-1;
	var fromminute=document.getElementById("from-minute").selectedIndex-1;
	var tohour=document.getElementById("to-hour").selectedIndex-1;
	var tominute=document.getElementById("to-minute").selectedIndex-1;
	var homework=document.getElementById("homework").checked;
	var examstudy=document.getElementById("examstudy").checked;
	var lecture_review=document.getElementById("lecture_review").checked;
	var notes=document.getElementById("notes").checked;
	var other=document.getElementById("other").checked;
	
	//alert("Apply Filter");
	searchresults(group,minsize,maxsize,partner,fromhour,fromminute,tohour,tominute,homework,examstudy,lecture_review,notes,other);
	
	
	
	
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
		temp+="<span><span onclick=\"removesearchlist("+i+")\">X</span>"+searchlist[i]+"</span>";
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
function searchresults(group,minsize,maxsize,partner,fromhour,fromminute,tohour,tominute,homework,examstudy,lecture_review,notes,other)
{
	default_mode=isdefault(group,minsize,maxsize,partner,fromhour,fromminute,tohour,tominute,homework,examstudy,lecture_review,notes,other)
	//alert(group+""+minsize+""+maxsize+""+partner+""+fromhour+fromminute+tohour+tominute+homework+examstudy+lecture_review+notes+other);
	default_course=searchlist.length==0;
	var temp="";
	if(default_mode && default_course)
	{
	
	for(var i=0;i<studysession.length;i++)
		//if (isInArray("</br><h4>"+studysession[i].subject+"</h4></br>"+studysession[i].description, request_session) == false)
			//{alert("XD")}
			//request_button.push("Join!")
		//temp+="<div><h4>"+studysession[i].subject+"<button onclick=\"request("+i+")\">"+request_button[i]+"</button>"+"</h4>"+"<p>"+studysession[i].description+"</p></div>";
		temp+="<div><h4>"+studysession[i].subject+"</h4>"+"<p>"+studysession[i].description+"<button onclick=\"request("+i+")\">"+"Request to join"+"</button>"+"</p></div>";
	document.getElementById("results").innerHTML=temp;
	
	}
	else
	{
		var newsessions=[];
		if(searchlist.length >0)
		newsessions=filter_subjectresults();
		else
			newsessions=studysession;
			
		var filsessions=[]; //group:false,minsize:0,maxsize:0,partner:false,fromhour:0,fromminute:0,tohour:0,tominute:0,homework:false,examstudy:false,lecture_review:false,notes:false,other:false,subject:"",description:""
		if(default_mode==true)
		{
			filsessions=newsessions;
		}
		else
		for(var i=0;i<newsessions.length;i++)
		{
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
			
			if(newsessions[i].fromhour >=fromhour && newsessions[i].tohour <=tohour && newsessions[i].fromminute >=fromminute && newsessions[i].tominute<=tominute)
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
	
		//alert(filsessions.length);
		temp="";
		for(var i=0;i<filsessions.length;i++)
			temp+="<div><h4>"+filsessions[i].subject+"</h4>"+"<p>"+filsessions[i].description+"</p></div>";
		document.getElementById("results").innerHTML=temp;
			
			}
		

}

function request(i)
{
	if (isInArray("</br><h4>"+studysession[i].subject+"</h4></br>"+studysession[i].description, request_session))
		alert("Already Joined!")
	else
		request_session.push("</br><h4>"+studysession[i].subject+"</h4></br>"+studysession[i].description)
	document.getElementById("request_session").innerHTML = request_session;	
}

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


function PF_init()
{
	PF_name(false);
	PF_university(false);
	PF_email(false);
	PF_major(false);
//	PF_course(false);
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