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
	var fromhour=document.getElementById("from-hour").selectedIndex;
	var fromminute=document.getElementById("from-minute").selectedIndex;
	var tohour=document.getElementById("to-hour").selectedIndex;
	var tominute=document.getElementById("to-minute").selectedIndex;
	var homework=document.getElementById("homework").selected;
	var examstudy=document.getElementById("examstudy").selected;
	var lecture_review=document.getElementById("lecture_review").selected;
	var notes=document.getElementById("notes").selected;
	var other=document.getElementById("other").selected;

	
	
	
	
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