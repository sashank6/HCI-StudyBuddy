function display_request_sessions(obj)
{
	
	var temp="";
	temp += "<br /><div><p><u>" + obj.subject + " with " + obj.username + "</u></p><p> Location: " + obj.place + "</p><p> Date: " + obj.date + "</p><p> Time: " + convert_time(obj.fromhour,obj.fromminute,obj.tohour,obj.tominute)+ "</p><p> Recurrence: " +  recurrence_freq(obj.recurrence) + "</p><p> People joined: " +  obj.member_joined + "</p></div>";
	return temp;
}
function displaypostobjectdata(obj) {
    ////(obj.subject);
    var data = "";
    data += "<u>" + obj.subject + "</u>";
    data += "<p><strong>Date:</strong> " + obj.date + "</p>";
    data += "<p>Time: " + convert_time(obj.fromhour, obj.fromminute, obj.tohour, obj.tominute) + "</p>";
    data += "<p>Location: " + obj.place + "</p>";
    data += "<p>Recurrence: " + recurrence_freq(obj.recurrence) + "</p>";
	data += "<p>Member joined: " + obj.member_joined + "</p>";
    data += "<p> Purpose: ";
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
			sche+="<p>"+display_request_sessions(scheduled_sessions[i])+"</p>";
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