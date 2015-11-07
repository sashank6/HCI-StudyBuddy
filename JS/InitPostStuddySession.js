function PostStudySession_Init() {
    var usrverif = document.cookie;
    if (usrverif == "")
    window.location = "login.html";
    var temparray = usrverif.split("=");
    usernamecok = temparray[1];
    name = usernamecok;
}


function requestsessions(i)
 {
     var ssPost = Object.create(post);

     ssPost.group          = document.DemoForm.value;
     ssPost.minsize        = document.DemoForm.value;
     ssPost.maxsize        = document.DemoForm.value;
     ssPost.partner        = document.DemoForm.value;
     ssPost.fromhour       = document.DemoForm.value;
     ssPost.fromminute     = document.DemoForm.value;
     ssPost.tohour         = document.DemoForm.value;
     ssPost.tominute       = document.DemoForm.value;
     ssPost.homework       = document.DemoForm.value;
     ssPost.examstudy      = document.DemoForm.value;
     ssPost.lecture_review = document.DemoForm.value;
     ssPost.notes          = document.DemoForm.value;
     ssPost.other          = document.DemoForm.value;
     ssPost.subject        = document.DemoForm.value;
     ssPost.description    = document.DemoForm.value;
     ssPost.place          = document.DemoForm.value;
     ssPost.recurrence     = document.DemoForm.value;
     ssPost.username       = usernamecok;

    var request_sessions = localStorage.getItem(usernamecok + "_2");
    if (request_sessions == null) {
        request_sessions = [];
        request_sessions.push(filsessions[i]);
    }
    else {
        request_sessions = JSON.parse(request_sessions);
        request_sessions.push(filsessions[i]);
    }
    var t = JSON.stringify(request_sessions);
    localStorage.setItem(usernamecok + "_2", t);
    displayrequest_sessions();

}