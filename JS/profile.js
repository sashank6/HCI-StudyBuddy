
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
			
			
		}
		
	}
}

function init_profile() {
    var usrverif = document.cookie;
    if (usrverif == "")
        window.location = "login.html";

    var temparray = usrverif.split("=");
    usernamecok = temparray[1];
    name = usernamecok;

	myscheduledsessions();
	PF_init();
	displayrequest_sessions();	
	displaypost_sessions();
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
		    temp += "<div><p><u>" + request_sessions[i].subject + " with " + request_sessions[i].username + "</u></p><p> Location: " + request_sessions[i].place + "</p><p> Date: " + request_sessions[i].date + "</p><p> Time: " + request_sessions[i].fromhour + ":" + request_sessions[i].fromminute + "-" + request_sessions[i].tohour + ":" + request_sessions[i].tominute + "</p><p> Recurrence: " + request_sessions[i].recurrence + "</p></div>";
		}
		document.getElementById("requestedsessions").innerHTML=temp;
	}
}

function displaypostobjectdata(obj) {
    //alert(obj.subject);
    var data = "";
    data += "<u>" + obj.subject + "</u>";
    data += "<p><strong>Date:</strong> " + obj.date + "</p>";
    data += "<p>Time: " + convert_time(obj.fromhour, obj.fromminute, obj.tohour, obj.tominute) + "</p>";
    data += "<p>Location: " + obj.place + "</p>";
    data += "<p>Recurrence: " + recurrence_freq(obj.recurrence) + "</p>";
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

function displaypost_sessions() {
    var post_sessions = localStorage.getItem(usernamecok + "_2");
    if (post_sessions == null) {
        document.getElementById("requestpostsessions").innerHTML = "You didn't post any sessions";
    }
    else {
        post_sessions = JSON.parse(post_sessions);
        var tempPost = "";
        for (var i = 0; i < post_sessions.length; i++) {
            tempPost += displaypostobjectdata(post_sessions[i]);
        }
        alert(tempPost);
        document.getElementById("requestpostsessions").innerHTML = tempPost;
    }
}