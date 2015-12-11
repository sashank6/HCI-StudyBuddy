function PostStudySession_Init() {
    var usrverif = document.cookie;
    if (usrverif == "")
    window.location = "login.html";
    var temparray = usrverif.split("=");
    usernamecok = temparray[1];
    name = usernamecok;
    PF_name(false);
    PF_university(false);
    myscheduledsessions();
    //displayrequest_sessions();
    //displaypost_sessions();

	//document.getElementById("username_display_post").innerHTML=usernamecok;
	display_rightribbon();	pending_num_display()
}
function requestpostsessions()
{
	//();
     var ssPost = Object.create(post);
     var GroupSize;
     var SelectedValue;

     //Go to validation function:
     if (postStudySessionValidation() == false) {
         return false;
     }
     //Group/Partner:
     GroupSize = document.DemoForm.RadioGroup.length;
     var i;





     for (i = 0; i <= GroupSize; i++) {
         if (document.DemoForm.RadioGroup[i].checked) {
             //("after if RadioGroup.checked");
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

     }

             //("after FOR LOOP");
             //Date:
             ssPost.date = document.getElementById('datepickr').value.toString()
             //Time:             ssPost.fromhour = document.DemoForm.FromHr.value;
			 ssPost.fromhour = parseInt(document.DemoForm.FromHr.value);
             ssPost.fromminute = parseInt(document.DemoForm.FromMin.value);
             ssPost.tohour = parseInt(document.DemoForm.ToHr.value);
             ssPost.tominute = parseInt(document.DemoForm.ToMin.value);

			 var fromamp=document.DemoForm.FromAmPm.value;
			 var toamp=document.DemoForm.ToAmPm.value;
			 if(fromamp==2)
				 ssPost.fromhour+=12;
			 if(toamp==2)
				 ssPost.tohour+=12;
			 ssPost.startminute=ssPost.fromhour*60+ssPost.fromminute;
			 ssPost.endminute=ssPost.tohour*60+ssPost.tominute;
			 
			 
			 

             if (document.DemoForm.homework.checked) {
                 ssPost.homework = true;
             } else {
                 ssPost.homework = false;
             }
             if (document.DemoForm.lecture_review.checked) {
                 ssPost.lecture_review = true;
             }
             else {
                 ssPost.lecture_review = false;
             }

             if (document.DemoForm.examstudy.checked) {
                 ssPost.examstudy = true;
             }
             else {
                 ssPost.examstudy = false;
             }

             if (document.DemoForm.notes.checked) {
                 ssPost.notes = true;
             } else {
                 ssPost.notes = false;
             }


             if (document.DemoForm.other.checked) {

                 ssPost.other = true;

             } else {

                 ssPost.notes = false;
             }

     ssPost.subject        = document.DemoForm.subjectID.value.toString();
     ssPost.description    = document.DemoForm.subjectName.value.toString();
     ssPost.place          = document.DemoForm.sessionlocation.value.toString();
     ssPost.recurrence     = document.DemoForm.selectOccurance.value;
	 ssPost.comments=	document.DemoForm.sessionNotes.value;
     ssPost.username = usernamecok;
     
	 //(JSON.stringify(ssPost));
	// //(JSON.stringify(ssPost));
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
	localStorage.setItem("@-*!", JSON.stringify(globalsession));
	//alert("JUST"+localStorage.getItem("@-*!"));

	document.DemoForm.ClickEnablePost.style.display = "block"; //visible
	document.DemoForm.ClickButton.style.display = "none"; //invisible
    display_rightribbon();

}
function displaypostobjectdata(obj)
{
	////(obj.subject);
	var data="";
	data+="<u>"+obj.subject+"</u>";
	data += "<p><b>Date: </b>" + obj.date + "</p>";
	data += "<p><b>Time: </b>" + convert_time(obj.fromhour, obj.fromminute, obj.tohour, obj.tominute) + "</p>";
	data += "<p><b>Location: </b>" + obj.place + "</p>";
	data += "<p><b>Recurrence: </b>" + recurrence_freq(obj.recurrence) + "</p>";
	data += "<p><b> Purpose: </b>";
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
	return data + "<br /><br />";
	
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
		var tempPost="";
		for(var i=0;i<post_sessions.length;i++)
		{
			tempPost+=displaypostobjectdata(post_sessions[i]);
		}
		document.getElementById("requestpostsessions").innerHTML=tempPost;
	}
}


/**
* Validates fields...most of them -- most
*    cases, well should be all of them.
**/
function postStudySessionValidation() {

    //Subject validation:
    var subID = document.DemoForm.subjectID.value.trim();
    if (subID.toString() == "") {

        //("You must type a course ID!");
        return false;
    }

    var subName = document.DemoForm.subjectName.value.trim();
    if (subName.toString() == "") {

        //("You must type a course name!");
        return false;
    }

    var sessloc = document.DemoForm.sessionlocation.value.trim();
    if (sessloc.toString() == "") {

        //("You must type a session location!");
        return false;
    }

    //Date validation:
    if (document.getElementById('datepickr').value.toString() == "") {

        //("You must select a date!");
        return false;
    }

    //Time Validation:
    var frmHrVal = document.DemoForm.FromHr.value.trim();
    var frmMinVal = document.DemoForm.FromMin.value.trim();
    var toHrVal = document.DemoForm.ToHr.value.trim();
    var toMinVal = document.DemoForm.ToMin.value.trim();

    if (frmHrVal == "") {
        //('Please enter a valid hour value 1-12 for your "\From Time\".');
        return false;
    }

    if (frmMinVal == "") {
        //('Please enter a valid minutes value 0-59 for your \"From Time\".');
        return false;
    }

    if (toHrVal == "") {
        //('Please enter a valid hour value 1-12 for your "\To Time\".');
        return false;
    }

    if (toMinVal == "") {
        //('Please enter a valid minutes value 0-59 for your \"To Time\".');
        return false;
    }

    //Cannot post date in past:
    var date = new Date(document.DemoForm.datepickr.value.toString());
    var yesterday = new Date(); // its today at this point will change to yesterday below!
    var today = new Date(); //this is today man!

    var x = 1; // go back to yesterday!
    yesterday.setDate(yesterday.getDate() - x); //now its yesterday

    var monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

    if (date <= yesterday) {
        //(document.DemoForm.datepickr.value.toString() + " is less than today's\ndate: " + monthNames[today.getMonth()] + " "
                 + today.getDate() + ", " + today.getFullYear() + ". Please pick\ntoday's date, or later.";
        return false;
    }


    //Test hours and minutes:
    if (testhour(document.DemoForm.FromHr.value, "From Hour") == false) {
        return false;
    }

    if (testmin(document.DemoForm.FromMin.value, "From Minute") == false) {
        return false;
    }

    if (testhour(document.DemoForm.ToHr.value, "To Hour") == false) {
        return false;
    }

    if (testmin(document.DemoForm.ToMin.value, "To Minute") == false) {
        return false;
    }


   
   

    // Occurance Validation (Anything but "--Select--"):
    //Find selected text in selectOccurance ddl:
    var e = document.DemoForm.selectOccurance;
    var strFreq = e.options[e.selectedIndex].text;
    if (strFreq == "-- Select --") {
        //('Please enter a valid session frequency or occurance;\nMonthly, Weekly,Daily, Daily (M-F), or Once');
        return false;
    }

}


function testhour(val,name){

    if (val > 12) {
 
      //("The "+name+" value: " + val + ", is invalid. Please pick a\nvalue less than or equal to 12");
      return false;
  } else {
     
      return true;
    }

}


function testmin(val, name) {

    ////("In testmin()");
    if (val > 59) {
        //("The " + name + "value: " + val + ", is invalid. Please pick a\nvalue less than or equal to 59");
        
        return false;
    } else {
        
        return true;
    }

}

function myscheduledsessions() {
    var myscheduled = localStorage.getItem(usernamecok + "_1");
    if (myscheduled == null) {

        document.getElementById("myscheduledsessions").innerHTML = "<p> You do not have any sessions scheduled </p>";
    }
    else {
        var temp = "";
        for (var i = 0; i < myscheduled.length; i++) {
            temp += "<br /><div><p><u>" + myscheduled[i].subject + " with " + myscheduled[i].username + "</u></p><p> Location: " + myscheduled[i].place + "</p><p> Date: " + myscheduled[i].date + "</p><p> Time: " + convert_time(myscheduled[i].fromhour, myscheduled[i].fromminute, myscheduled[i].tohour, myscheduled[i].tominute) + "</p><p> Recurrence: " + recurrence_freq(myscheduled[i].recurrence) + "</p></div>";

        }
        document.getElementById("myscheduledsessions").innerHTML = temp
    }
}


function displayrequest_sessions() {
    var request_sessions = localStorage.getItem(usernamecok + "_3");
    if (request_sessions == null) {
        document.getElementById("requestedsessions").innerHTML = "You didn't request any sessions";
    }
    else {
        request_sessions = JSON.parse(request_sessions);
        var temp = "";
        for (var i = 0; i < request_sessions.length; i++) {
            temp += "<br /><div><p><u>" + request_sessions[i].subject + " with " + request_sessions[i].username + "</u></p><p> Location: " + request_sessions[i].place + "</p><p> Date: " + request_sessions[i].date + "</p><p> Time: " + convert_time(request_sessions[i].fromhour, request_sessions[i].fromminute, request_sessions[i].tohour, request_sessions[i].tominute) + "</p><p> Recurrence: " + recurrence_freq(request_sessions[i].recurrence) + "</p></div>";
        }
        document.getElementById("requestedsessions").innerHTML = temp;
    }
}