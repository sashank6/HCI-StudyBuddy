function Identify() {
    var SelectedValue;
    var i;
    var GroupSize;
    var strPrintOut;
    
    GroupSize = document.DemoForm.RadioGroup.length;
    for (i = 0; i <= GroupSize; i++) 
    {
        if (document.DemoForm.RadioGroup[i].checked) 
        {
            SelectedValue = document.DemoForm.RadioGroup[i].value;
           // alert("Radio Button: "+SelectedValue);
            break;
        }
    }

    if (document.getElementById('datepickr').value.toString() == "") {

        alert("You must select a date!");
        return;
    }

    

    //Find selected text in FromAmPm ddl:
    var e = document.DemoForm.FromAmPm;
    var strFromAmPm = e.options[e.selectedIndex].text;

    //Find selected text in ToAmPm ddl:
    var e2 = document.DemoForm.ToAmPm;
    var strToAmPm = e2.options[e.selectedIndex].text;

    alert(strFromAmPm);

    strPrintOut = "<div style=\"background-color:#FFFF66;\"><p style=\"font-weight:bold;font-size:small;\">" + document.getElementById('datepickr').value.toString() + "</p>" +
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

       document.DemoForm.ClickEnablePost.style.display = "block";
       document.DemoForm.ClickButton.style.display = "none";

   }


  function EnableClickButton() 
  {
      document.DemoForm.ClickButton.style.display = "block";
      document.DemoForm.ClickEnablePost.style.display = "none";

      document.DemoForm.subject.value = "";
      document.DemoForm.datepickr.value = "";
      document.DemoForm.homework.checked = false;
      document.DemoForm.lecture_review.checked = false;
      document.DemoForm.examstudy.checked = false;
      document.DemoForm.notes.checked = false;
      document.DemoForm.other.checked = false;
  }

  function makeGroupDivVisible() {

      document.getElementById('groupMinMaxDiv').style.display = "block";
      

  }

  function makeGroupDivInvisible() {

      document.getElementById('groupMinMaxDiv').style.display = "none";

  }


