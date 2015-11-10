function PostStudySession_Init() {
    var usrverif = document.cookie;
    if (usrverif == "")
    window.location = "login.html";
    var temparray = usrverif.split("=");
    usernamecok = temparray[1];
    name = usernamecok;
	alert(name);
	displaypost_sessions();
	//document.getElementById("username_display_post").innerHTML=usernamecok;
}


function requestpostsessions()
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
             ssPost.tohour = document.DemoForm.ToHr.value;
             ssPost.tominute = document.DemoForm.ToMin.value

             if (document.DemoForm.homework.checked) {
                 ssPost.homework = true;

             } else {
                 ssPolst.homework = false;
             }

             if (document.DemoForm.examstudy.checked) {
                 ssPost.lecture_review = true;

             } 
             else{
                    ssPost.lecture_review = false;
                 }

             if(document.DemoForm.examstudy.checked)
             {
                   ssPost.examstudy = true;
             } 
             else{
                   ssPost.examstudy = false;
             }

     if(document.DemoForm.notes.checked){

           ssPost.notes = true;
       
       }else{
         ssPost.notes= false;
       }


     if(document.DemoForm.other.checked){
          
          ssPost.other = true;

       }else{

         ssPost.notes= false;
       }


     ssPost.subject        = document.DemoForm.subjectID.value.toString();
     ssPost.description    = document.DemoForm.subjectName.value.toString();
     ssPost.place          = document.DemoForm.sessionlocation.value.toString();
     ssPost.recurrence     = document.DemoForm.selectOccurance.value;
     ssPost.username       = usernamecok;
	// alert(JSON.stringify(ssPost));
    var post_sessions = localStorage.getItem(usernamecok + "_2");
    if (post_sessions == null) {
        post_sessions = [];
        post_sessions.push(ssPost);
    }
    else {
        post_sessions = JSON.parse(post_sessions);
        post_sessions.push(ssPost);
    }
    var t = JSON.stringify(post_sessions);
    localStorage.setItem(usernamecok + "_2", t);
	var ty=localStorage.getItem("@-*!");
	var globalsession=JSON.parse(ty);
	if(globalsession==null)
	{
		globalsession=[];
		globalsession.push(ssPost);
	}
	else
		globalsession.push(ssPost);
	localStorage.setItem("@-*!",JSON.stringify(globalsession));
    displaypost_sessions();

}
}
function displayobjectdata(obj)
{
	//alert(obj.subject);
	var data="";
	data+="<u>"+obj.subject+"</u>";
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
	return data+"</br>";
	
}

function displaypost_sessions()
{
	var post_sessions=localStorage.getItem(usernamecok+"_2");
	if(post_sessions==null)
	{
		document.getElementById("requestpostsessions").innerHTML="You didn't post any sessions";
	}
	else
	{
		post_sessions=JSON.parse(post_sessions);
		var temp="";
		for(var i=0;i<post_sessions.length;i++)
		{
			temp+=displayobjectdata(post_sessions[i]);
		}
		alert(temp);
		document.getElementById("requestpostsessions").innerHTML=temp;
	}
}