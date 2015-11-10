function PostStudySession_Init() {
    var usrverif = document.cookie;
    if (usrverif == "")
    window.location = "login.html";
    var temparray = usrverif.split("=");
    usernamecok = temparray[1];
    name = usernamecok;
	alert(name);
	displaypost_sessions();
	document.getElementById("username_display_post").innerHTML=usernamecok;
}


function requestpostsessions()
 {
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


     alert("after validation" + GroupSize.toString());


     for (i = 0; i <= GroupSize; i++) {
         if (document.DemoForm.RadioGroup[i].checked) {
             alert("after if RadioGroup.checked");
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
             alert("after FOR LOOP");
             //Date:
             ssPost.date = document.getElementById('datepickr').value.toString()
             //Time:             ssPost.fromhour = document.DemoForm.FromHr.value;
             ssPost.fromminute = document.DemoForm.FromMin.value;
             ssPost.tohour = document.DemoForm.ToHr.value;
             ssPost.tominute = document.DemoForm.ToMin.value

             alert("after Time:");
             if (document.DemoForm.homework.checked) {
                 ssPost.homework = true;
             } else {
                 ssPost.homework = false;
             }
             if (document.DemoForm.examstudy.checked) {
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
             alert("after Checkboxes");

     ssPost.subject        = document.DemoForm.subjectID.value.toString();
     ssPost.description    = document.DemoForm.subjectName.value.toString();
     ssPost.place          = document.DemoForm.sessionlocation.value.toString();
     ssPost.recurrence     = document.DemoForm.selectOccurance.value;
     ssPost.username = usernamecok;
     
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
	localStorage.setItem("@-*!", JSON.stringify(globalsession));

	document.DemoForm.ClickEnablePost.style.display = "block"; //visible
	document.DemoForm.ClickButton.style.display = "none"; //invisible
    displaypost_sessions();

}
function displayobjectdata(obj)
{
	//alert(obj.subject);
	var data="";
	data+="<u>"+obj.subject+"</u>";
	data+="<p>Date"+obj.date+"</p>";
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


/**
* Validates fields...most of them -- most
*    cases, well should be all of them.
**/
function postStudySessionValidation() {

    //Subject validation:
    var subID = document.DemoForm.subjectID.value.trim();
    if (subID.toString() == "") {

        alert("You must type a course ID!");
        return false;
    }

    var subName = document.DemoForm.subjectName.value.trim();
    if (subName.toString() == "") {

        alert("You must type a course name!");
        return false;
    }

    var sessloc = document.DemoForm.sessionlocation.value.trim();
    if (sessloc.toString() == "") {

        alert("You must type a session location!");
        return false;
    }

    //Date validation:
    if (document.getElementById('datepickr').value.toString() == "") {

        alert("You must select a date!");
        return false;
    }

    //Time Validation:
    var frmHrVal = document.DemoForm.FromHr.value.trim();
    var frmMinVal = document.DemoForm.FromMin.value.trim();
    var toHrVal = document.DemoForm.ToHr.value.trim();
    var toMinVal = document.DemoForm.ToMin.value.trim();

    if (frmHrVal == "") {
        alert('Please enter a valid hour value 1-12 for your "\From Time\".');
        return false;
    }

    if (frmMinVal == "") {
        alert('Please enter a valid minutes value 0-59 for your \"From Time\".');
        return false;
    }

    if (toHrVal == "") {
        alert('Please enter a valid hour value 1-12 for your "\To Time\".');
        return false;
    }

    if (toMinVal == "") {
        alert('Please enter a valid minutes value 0-59 for your \"To Time\".');
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
        alert(document.DemoForm.datepickr.value.toString() + " is less than today's\ndate: " + monthNames[today.getMonth()] + " "
                 + today.getDate() + ", " + today.getFullYear() + ". Please pick\ntoday's date, or later.");
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


    //UNCOMMENT for DEBUGING...
   

    // Occurance Validation (Anything but "--Select--"):
    //Find selected text in selectOccurance ddl:
    var e = document.DemoForm.selectOccurance;
    var strFreq = e.options[e.selectedIndex].text;
    if (strFreq == "-- Select --") {
        alert('Please enter a valid session frequency or occurance;\nMonthly, Weekly,Daily, Daily (M-F), or Once');
        return false;
    }

    alert("END OF VALIDATION FUNCTION");
}


function testhour(val,name){

    if (val > 12) {
 
      alert("The "+name+" value: " + val + ", is invalid. Please pick a\nvalue less than or equal to 12");
      return false;
  } else {
     
      return true;
    }

}


function testmin(val, name) {

    //alert("In testmin()");
    if (val > 59) {
        alert("The " + name + "value: " + val + ", is invalid. Please pick a\nvalue less than or equal to 59");
        
        return false;
    } else {
        
        return true;
    }

}