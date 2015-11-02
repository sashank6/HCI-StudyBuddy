var studysession=[]
var searchlist=[]
function init()
{
	var hour_html="<option> </option>";
	var minute_html="<option> </option>";
	for(var i=0;i<24;i++)
		hour_html+="<option>"+i+"</option>";
	for(var i=0;i<60;i++)
		minute_html+="<option>"+i+"</option>"
	document.getElementById("from-hour").innerHTML=hour_html;
	document.getElementById("to-hour").innerHTML=hour_html;
	document.getElementById("from-minute").innerHTML=minute_html;
	document.getElementById("to-minute").innerHTML=minute_html;
	var post={group:false,minsize:0,maxsize:0,partner:false,fromhour:0,fromminute:0,tohour:0,tominute:0,homework:false,examstudy:false,lecture_review:false,notes:false,other:false,subject:"",description:""}
	var ss1=Object.create(post);
	var ss2=Object.create(post);
	var ss3=Object.create(post);
	ss1.subject="CSE541"
	ss1.description="Some Description";
	ss1.group=true
	ss1.minsize=2
	ss1.maxsize=5
	studysession.push(ss1);
	displaysearchlist();
	applyfilter();
	
	
	
}
function init_post_session()
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
	return (group==false && minsize==0 && maxsize==0 && partner==false && fromhour==-1 && fromminute==-1 && tohour==-1 && tominute==-1 && homework==false && examstudy==false && lecture_review==false && notes==false && other==false && searchlist.length==0);
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
	
	alert("Apply Filter");
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
	alert(group+""+minsize+""+maxsize+""+partner+""+fromhour+fromminute+tohour+tominute+homework+examstudy+lecture_review+notes+other);
	var temp="";
	if(default_mode)
	{
	
	for(var i=0;i<studysession.length;i++)
		temp+="<div><h4>"+studysession[i].subject+"</h4>"+"<p>"+studysession[i].description+"</p></div>";
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
		
		for(var i=0;i<newsessions.length;i++)
		{
			var p;
			if(group)
			{
			p=(newsessions[i].group==group && newsessions[i].minsize>=minsize && newsessions[i].maxsize<=maxsize) 
			if(p)	
			filsessions.push(newsessions[i]);
			}
			else
			if(partner)
			{
				p=newsessions[i].partner==true;
				if(p)
				filsessions.push(newsessions[i]);	
			}
			else
			if(homework)
			{
				p=newsessions[i].homework==true;
				if(p)
				filsessions.push(newsessions[i]);	
			}
			else
			if(examstudy)
			{
				p=newsessions[i].examstudy==true;
				if(p)
				filsessions.push(newsessions[i]);	
			}
			else
			if(lecture_review)
			{
				p=newsessions[i].lecture_review==true;
				if(p)
				filsessions.push(newsessions[i]);	
				
			}
			else
			if(notes)
			{
				p=newsessions[i].notes==true;
				if(p)
				filsessions.push(newsessions[i]);
			}
			else
			if(newsessions[i].fromhour >=fromhour && newsessions[i].tohour <=tohour && newsessions[i].fromminute >=fromminute && newsessions[i].tominute<=tominute)
			{
				filsessions.push(newsessions[i]);
			}
		}
		alert(filsessions.length);
		for(var i=0;i<filsessions.length;i++)
			temp+="<div><h4>"+filsessions[i].subject+"</h4>"+"<p>"+studysession[i].description+"</p></div>";
		document.getElementById("results").innerHTML=temp;
			
			}
		

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