function Identify() {
    var SelectedValue;
    var i;
    var GroupSize;
    var strPrintOut;

    
    //Validation:
    if (document.DemoForm.subject.value.toString() == "") 
    {

        alert("You must type a course name!");
        return;
    }

    //Group or Partner
    GroupSize = document.DemoForm.RadioGroup.length;
    for (i = 0; i <= GroupSize; i++) 
    {
        if (document.DemoForm.RadioGroup[i].checked) 
        {
            SelectedValue = document.DemoForm.RadioGroup[i].value;

            if (SelectedValue == "Study Group")
            {
               if( document.DemoForm.groupMin.value == null)
               {
                   alert("You need to select a minumum group size!");
                   return;
               }

               if(document.DemoForm.groupMax.value == null)
               {
                   alert("You need to select a maximum group size!");
                   return;
               }

               if (document.DemoForm.groupMin.value > document.DemoForm.groupMax.value) 
               {
                   alert("Your minimum size is greater than you maximum size!");
                   return;
               }

            }
           break;
        }
    }

    if (document.getElementById('datepickr').value.toString() == "") {

        alert("You must select a date!");
        return;
    }


    var fromHr = document.DemoForm.FromHr.value.length
//   alert("Before time validation!");
//    if (document.DemoForm.FromHr.value.length == ||
//        document.DemoForm.FromMin.value == "" ||
//        documnet.DemoForm.ToHr.value    == "" ||
//        document.DemoForm.ToMin.value == "") 
//        {
//            alert("Your time range is invalid: please select a numeric time range!");
//            //return;
//        }
// alert("Got past time validation!");

    //Find selected text in FromAmPm ddl:
    var e = document.DemoForm.FromAmPm;
    var strFromAmPm = e.options[e.selectedIndex].text;

    //Find selected text in ToAmPm ddl:
    var e2 = document.DemoForm.ToAmPm;
    var strToAmPm = e2.options[e.selectedIndex].text;

    //DEBUG: uncomment to debug.
    // alert(strFromAmPm);

    strPrintOut = "<div style=\"background-color:#FFFF66;\"> <p style=\"font-weight:bold;font-size:small;\">" + document.DemoForm.subject.value.toString() + "</p>" +
    "<p style=\"font-weight:bold;font-size:small;\">" + document.getElementById('datepickr').value.toString() + "</p>" +
    "<p style=\"font-weight:bold;font-size:small;\"> FROM: " + document.DemoForm.FromHr.value.toString() + ":" + document.DemoForm.FromMin.value.toString() +
    " " + strFromAmPm + " - " + document.DemoForm.ToHr.value.toString() + ":" + document.DemoForm.ToMin.value.toString() +
     " " + strToAmPm + "</p><ul><li>";
    //alert("DATE WORKS:" + document.getElementById('datepickr').value.toString());
   
    if (document.DemoForm.homework.checked == true)
      {
          strPrintOut += document.DemoForm.homework.value + "</li><li>";
          
       }
        
      if (document.DemoForm.lecture_review.checked == true) {

          strPrintOut += document.DemoForm.lecture_review.value + "</li><li>";
       }


       if (document.DemoForm.examstudy.checked == true) {

           strPrintOut += document.DemoForm.examstudy.value + "</li><li>";
       }

       //Find selected text in selectOccurance ddl:
       var e = document.DemoForm.selectOccurance;
       var strFreq = e.options[e.selectedIndex].text;
       strPrintOut += strFreq + "</li><li>";

       //alert(strPrintOut);
       strPrintOut += SelectedValue + "</li></ul><br/></div><hr/>";
       document.getElementById("divOput").innerHTML += strPrintOut;

       document.DemoForm.ClickEnablePost.style.display = "block";//visible
       document.DemoForm.ClickButton.style.display = "none";//invisible

   }


  function EnableClickButton() {

      //Switch buttons:
      document.DemoForm.ClickButton.style.display = "block"; //visible.
      document.DemoForm.ClickEnablePost.style.display = "none"; //invisible.

      //Time:
      document.DemoForm.FromHr.value = "";
      document.DemoForm.FromMin.value = "";
      document.DemoForm.ToHr.value = "";
      document.DemoForm.ToMin.value = "";

      //Subject, Date:
      document.DemoForm.subject.value = "";
      document.DemoForm.datepickr.value = "";

      //Checkboxes:
      document.DemoForm.homework.checked = false;
      document.DemoForm.lecture_review.checked = false;
      document.DemoForm.examstudy.checked = false;
      document.DemoForm.notes.checked = false;
      document.DemoForm.other.checked = false;

      //Group Min & Max:
      document.DemoForm.groupMin.value = 1;
      document.DemoForm.groupMax.value = 2;

      //Group Radio button:
      document.DemoForm.RadioGroup[1].checked = true;
      document.DemoForm.RadioGroup[0].checked = false;
      makeGroupDivInvisible();
  }

  function makeGroupDivVisible() {

      document.getElementById('groupMinMaxDiv').style.display = "block";
      

  }

  function makeGroupDivInvisible() {

      document.getElementById('groupMinMaxDiv').style.display = "none";

  }


