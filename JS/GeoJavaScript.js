
/**
* Submits data and puts it in the 3rd column.
* */
function submitData() {
    var SelectedValue;
    var i;
    var GroupSize;
    var strPrintOut;

    
    //Go to validation function:
    if (postStudySessionValidation() == false) 
    {
        return false;
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

    //Find selected text in FromAmPm ddl:
    var e = document.DemoForm.FromAmPm;
    var strFromAmPm = e.options[e.selectedIndex].text;

    //Find selected text in ToAmPm ddl:
    var e2 = document.DemoForm.ToAmPm;
    var strToAmPm = e2.options[e.selectedIndex].text;

    //DEBUG: uncomment to debug.
    // alert(strFromAmPm);

    //Creating a block of html and text to display the new entry:
    strPrintOut = "<div style=\"background-color:#FFFF66;\"> <p style=\"font-weight:bold;font-size:small;\">" + document.DemoForm.subjectID.value.toString() + 
    ": "+ document.DemoForm.subjectName.value.toString()+"</p>" +
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

   /**
   * Makes the Submit button appear and the 
   * "Post Another Session?" button disapear
   *   also clears all fields for next entry.
   **/
  function EnableClickButton() {

 
      //Time:
      document.DemoForm.FromHr.value = "";
      document.DemoForm.FromMin.value = "";
      document.DemoForm.ToHr.value = "";
      document.DemoForm.ToMin.value = "";

      //Location:
      document.DemoForm.sessionlocation.value = "";

      //Subject, Date:
      document.DemoForm.subjectID.value = "";
      document.DemoForm.subjectName.value = "";
      document.DemoForm.datepickr.value = "";

      //Checkboxes:
      document.DemoForm.homework.checked = false;
      document.DemoForm.lecture_review.checked = false;
      document.DemoForm.examstudy.checked = false;
      document.DemoForm.notes.checked = false;
      document.DemoForm.other.checked = false;

      //Freq;
      document.DemoForm

      //Group Min & Max:
      document.DemoForm.groupMin.value = 1;
      document.DemoForm.groupMax.value = 2;

      //Reoccurance / Freq.
      document.DemoForm.selectOccurance.selectedIndex = 0;
      

      //Group Radio button:
      document.DemoForm.RadioGroup[1].checked = true;
      document.DemoForm.RadioGroup[0].checked = false;
      makeGroupDivInvisible();

      //Session Notes:
      document.DemoForm.sessionNotes.value = "";

      //Switch buttons:
      document.DemoForm.ClickButton.style.display = "block"; //visible.
      document.DemoForm.ClickEnablePost.style.display = "none"; //invisible.

  }

  /**
  * Makes the Group min 
  *  and max input fields appear.
  **/
  function makeGroupDivVisible() {

      document.getElementById('groupMinMaxDiv').style.display = "block";     

  }
  /**
  * Makes the Group min and
  *   max input fields disappear.
  **/
  function makeGroupDivInvisible() {

      document.getElementById('groupMinMaxDiv').style.display = "none";

  }

  /**
  * Validates fields...most of them -- most
  *    cases, well should be all of them.
  **/
  function postStudySessionValidation() 
  {

      //Subject validation:
     var subID  = document.DemoForm.subjectID.value.trim();
      if ( subID.toString() == "") {

          alert("You must type a course ID!");
          return false;
      }

     var subName  = document.DemoForm.subjectName.value.trim();
      if ( subName.toString() == "") {

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

      // Occurance Validation (Anything but "--Select--"):
      //Find selected text in selectOccurance ddl:
       var e = document.DemoForm.selectOccurance;
       var strFreq = e.options[e.selectedIndex].text;
       if (strFreq == "-- Select --")
     {
         alert('Please enter a valid session frequency or occurance; Monthly, Weekly,Daily, Daily (M-F), or Once');
         return false;
     }

  }

