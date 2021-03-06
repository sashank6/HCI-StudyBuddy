function display_request_sessions(obj) //obj data is [username subject location ...]
{
	var temp="";
	temp += "<br /><div><p><b><strong><u>" + obj.subject + " with " + obj.username + "</u></strong></b></p><p><b><strong> Location:</strong></b> " + obj.place + "</p><p><b><strong> Date:</strong></b> " + obj.date + "</p><p><b><strong> Time: </strong></b>" + convert_time(obj.fromhour,obj.fromminute,obj.tohour,obj.tominute)+ "</p><p><b><strong> Recurrence: </strong></b>" +  recurrence_freq(obj.recurrence) + "</p><p><b><strong> People_joined: </strong></b>" +  obj.member_joined + "</p></div>";
	return temp;
}
function display_request_sessions2(obj) //obj data in my scheduled session has is [username, post] while subject, location .. etc is under post
{
	var temp="";
	temp += "<br /><div><p><b><strong><u>" + obj.post.subject + " with " + obj.username + "</u></strong></b></p><p><b><strong> Location: </strong></b>" + obj.post.place + "</p><p><b><strong> Date: </strong></b>" + obj.post.date + "</p><p><b><strong> Time: </strong></b>" + convert_time(obj.post.fromhour,obj.post.fromminute,obj.post.tohour,obj.post.tominute)+ "</p><p><b><strong> Recurrence: </strong></b>" +  recurrence_freq(obj.post.recurrence) + "</p><p><b><strong> People joined: </strong></b>" +  obj.post.member_joined + "</p></div>";
	return temp;
}
function displaypostobjectdata(obj) {
    
    var data = "";
    data += "<b><strong><u>" + obj.subject + "</u></b></strong>";
    data += "<p><b><strong>Date:</strong></b> " + obj.date + "</p>";
    data += "<p><b><strong>Time:</strong></b> " + convert_time(obj.fromhour, obj.fromminute, obj.tohour, obj.tominute) + "</p>";
    data += "<p><b><strong>Location:</strong></b> " + obj.place + "</p>";
    data += "<p><b><strong>Recurrence:</strong></b> " + recurrence_freq(obj.recurrence) + "</p>";
	data += "<p><b><strong>Member joined:</strong></b> " + obj.member_joined + "</p>";
    data += "<p> <b><strong>Purpose:</strong></b> ";
    var tesr = []
    if (obj.homework)
        tesr.push("Homework");
    if (obj.examstudy)
        tesr.push("Study for Exam");
    if (obj.notes)
        tesr.push("Share Notes");
    if (obj.lecture_review)
        tesr.push("Lecture Review");
    if (obj.other)
        tesr.push("Other");
    var r = 0;
    for (r = 0; r < tesr.length - 1; r++)
        data += " " + tesr[r] + ",";
    data += " " + tesr[r];
    return data + "<br /><br />";

}
function display_rightribbon()
{
	var sche=""
	var main="";
	var scheduled_sessions=localStorage.getItem(usernamecok+"_1");
	//alert(scheduled_sessions);
	if(scheduled_sessions==null)
	{
		sche="You do not have any Sessions Scheduled";
	}
	else
	{
		scheduled_sessions=JSON.parse(scheduled_sessions);
		
		for(var i=0;i<scheduled_sessions.length;i++)
			sche+="<p>"+display_request_sessions2(scheduled_sessions[i])+"</p>";
	}
	main+="<h3>My Scheduled Sessions</h3>";
	main+="<div>"+sche+"</div>";
	sche="";
	scheduled_sessions=localStorage.getItem(usernamecok+"_3");
	////(scheduled_sessions);
	//(main);
	if(scheduled_sessions==null)
	{
		sche="You do not have any Requested Sessions";
	}
	else
	{
		scheduled_sessions=JSON.parse(scheduled_sessions);
		for(var i=0;i<scheduled_sessions.length;i++)
			sche+="<p>"+display_request_sessions(scheduled_sessions[i])+"</p>";
	}
	main+="<h3>My Requested Sessions</h3>";
	main+="<div>"+sche+"</div>";
	//(sche);
	sche="";
	scheduled_sessions=localStorage.getItem(usernamecok+"_2");
	////(scheduled_sessions);
	if(scheduled_sessions==null)
	{
		sche="You do not have any Sessions Posted";
	}
	else
	{
		scheduled_sessions=JSON.parse(scheduled_sessions);
		for(var i=0;i<scheduled_sessions.length;i++)
			sche+="<p>"+displaypostobjectdata(scheduled_sessions[i])+"</p>";
	}
	main+="<h3>My Posted Sessions</h3>";
	main+="<div>"+sche+"</div>";
	document.getElementById("col3").innerHTML=main;
	
	
	
}