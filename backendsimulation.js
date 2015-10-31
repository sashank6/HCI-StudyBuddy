var studysession=[]
var searchlist=[]
function init()
{
	var hour_html="";
	var minute_html="";
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
	searchresults();
	
	
	
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
	if(verification == "CSE556")
		window.location="home.html";
}
function register()
{
	var email=document.getElementById("email").value;
	var username=document.getElementById("username").value;
	var password=document.getElementById("password").value;
	var confirmpassword=document.getElementById("confirmpassword").value;
	if(email != "d" && username!="d" && password==confirmpassword)
		window.location="verification.html";
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
	var fromminute=document.getElementById("from-minute").selectedIndex;
	var tohour=document.getElementById("to-hour").selectedIndex;
	var tominute=document.getElementById("to-minute").selectedIndex;
	var homework=document.getElementById("homework").checked;
	var examstudy=document.getElementById("examstudy").checked;
	var lecture_review=document.getElementById("lecture_review").checked;
	var notes=document.getElementById("notes").checked;
	var other=document.getElementById("other").checked;
	alert(group+","+minsize+","+maxsize+","+partner+","+fromhour+","+fromminute+","+tohour+","+tominute+","+homework+","+examstudy+","+lecture_review+","+notes+","+other);
	
	searchresults();
	
	
	
	
}
function removesearchlist(f)
{
	searchlist.splice(f,1);
	displaysearchlist();
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
	searchlist.push(sub);
	displaysearchlist();
	document.getElementById("main_search").value="";
}
function searchresults()
{
	var temp="";
	for(var i=0;i<studysession.length;i++)
		temp+="<div><h4>"+studysession[i].subject+"</h4>"+"<p>"+studysession[i].description+"</p></div>";
	document.getElementById("results").innerHTML=temp;
}


function onchangegroup()
{
	if(document.getElementById("group").checked)
	{
		document.getElementById("ifgroupchecked").innerHTML="Size: <select id=\"minsize\"><option>1</option><option>2</option><option>3</option><option>4</option></select>-<select id=\"maxsize\"><option>1</option><option>2</option><option>3</option><option>4</option><option>5</option></select>";
	}
	else
	{
		document.getElementById("ifgroupchecked").innerHTML="";
	}
}