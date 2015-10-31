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
	var post={group:false,minsize:0,maxsize:0,partner:false,fromhour:0,fromminute:0,tohour:0,tominute:0,homework:false,examstudy:false,lecture_review:false,notes:false,other:false}
	
	
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
	//var date=document.getElementById("selectDate").checked;
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
function searchresults()
{
	
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