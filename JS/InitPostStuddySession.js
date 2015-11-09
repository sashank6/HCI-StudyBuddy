function PostStudySession_Init() {
    var usrverif = document.cookie;
    if (usrverif == "")
    window.location = "login.html";
    var temparray = usrverif.split("=");
    usernamecok = temparray[1];
    name = usernamecok;
	alert(name);
	document.getElementById("username_display_post").innerHTML=usernamecok;
}


function requestpostsessions(i)
 {
     var ssPost = Object.create(post);
     var GroupSize;
     var SelectedValue;

     //Group/Partner:
         GroupSize = document.DemoForm.RadioGroup.length;
         for (i = 0; i <= GroupSize; i++) {

             if (document.DemoForm.RadioGroup[i].checked) {
                 SelectedValue = document.DemoForm.RadioGroup[i].value;

                 if (SelectedValue == "Study Group") {
                     ssPost.group = true;
                     ssPost.partner = false;
                     ssPost.minsize = document.DemoForm.groupMax.value;
                     ssPost.maxsize = document.DemoForm.groupMin.value;
                 } else {//Partner case

                     ssPost.group = false;
                     ssPost.partner = true;
                     ssPost.minsize = 0;
                     ssPost.maxsize = 0;
                 }

                 break;
             }

             //Time:
             ssPost.fromhour = document.DemoForm.FromHr.value;
             ssPost.fromminute = document.DemoForm.FromMin.value;
             ssPost.tohour = document.DemoFormToHr.value;
             ssPost.tominute = document.DemoFormToMin.value

             if (document.DemoForm.homework.checked == checked) {
                 ssPost.homework = true;

             } else {
                 ssPolst.homework = false;
             }

             if (document.DemoForm.examstudy.checked == checked) {
                 ssPost.lecture_review = true;

             } 
             else{
                    ssPost.lecture_review = false;
                 }

             if(document.DemoForm.examstudy.checked == checked)
             {
                   ssPost.examstudy = true;
             } 
             else{
                   ssPost.examstudy = false;
             }

     if(document.DemoForm.notes.checked == checked){

           ssPost.notes = true;
       
       }else{
         ssPost.notes= false;
       }


     if(document.DemoForm.other.checked == checked){
          
          ssPost.other = true;

       }else{

         ssPost.notes= false;
       }


     ssPost.subject        = document.DemoForm.subjectID.value.toString();
     ssPost.description    = document.DemoForm.subjectName.value.toString();
     ssPost.place          = document.DemoForm.sessionlocation.value.toString();
     ssPost.recurrence     = document.DemoForm.selectOccurance.value;
     ssPost.username       = usernamecok;

    var post_sessions = localStorage.getItem(usernamecok + "_2");
    if (post_sessions == null) {
        post_sessions = [];
        post_sessions.push(filsessions[i]);
    }
    else {
        post_sessions = JSON.parse(post_sessions);
        post_sessions.push(filsessions[i]);
    }
    var t = JSON.stringify(post_sessions);
    localStorage.setItem(usernamecok + "_2", t);
    displaypost_sessions();

}


function displaypost_sessions()
{
	var post_sessions=localStorage.getItem(usernamecok+"_2");
	if(request_sessions==null)
	{
		document.getElementById("requestpostsessions").innerHTML="You didn't post any sessions";
	}
	else
	{
		post_sessions=JSON.parse(post_sessions);
		var temp="";
		for(var i=0;i<post_sessions.length;i++)
		{
		    temp += "<div><p><u>" + post_sessions[i].subject + " with " + post_sessions[i].username + "</u></p><p> Location: " + request_sessions[i].place + "</p><p> Date: " + request_sessions[i].date + "</p><p> Time: " + request_sessions[i].fromhour +":"+ request_sessions[i].fromminute + "-" + request_sessions[i].tohour +":"+ request_sessions[i].tominute + "</p><p> Recurrence: " +  request_sessions[i].recurrence + "</p></div>";
		}
		document.getElementById("requestpostsessions").innerHTML=temp;
	}
}