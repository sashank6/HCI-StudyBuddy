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

     ssPost.group = 
     ssPost.minsize=
     ssPost.maxsizepartner=
     ssPost.fromhour=
     ssPost.fromminute=
     ssPost.tohour=
     ssPost.tominute=
     ssPost.homework=
     ssPost.examstudy=
     ssPost.lecture_review=
     ssPost.notes=
     ssPost.other=
     ssPost.subject=
     ssPost.description=
     ssPost.place=
     ssPost.recurrence=
     ssPost.username=

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