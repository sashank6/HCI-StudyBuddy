function loginverify()
{
	var username=document.getElementById("username").value;
	var password=document.getElementById("password").value;
	if(usernamevalidate(username)&&passwordvalidate(password))
	{	
	if((username=="sashank" && password=="hci556a")||
	   (username=="buddy" && password=="hci556a")||
	   
	   //added 4
	   (username=="Sarah92" && password=="italy101")||
	   (username=="JimMechE" && password=="helpm3")||
	   (username=="bobEE" && password=="webd3v")||
	   (username=="lawlschool" && password=="f3dupjur"))
	
	{
		document.cookie="username="+username;
		window.location="home.html";
	}
	else
	{
		/*throw error username or password invalid*/
		
		document.getElementById("errormessage").innerHTML="Username or password is invalid";
	}
	}
	else
	{
		/*throw error incorrect password format*/
		
		document.getElementById("errormessage").innerHTML="Username or password is invalid";
	}
}

function registervalidate()
{
	var email=document.getElementById("email").value;
	var username=document.getElementById("username1").value;
	var password=document.getElementById("password1").value;
	var confirmpassword=document.getElementById("confirmpassword").value;
	var msg="";
	if(validate_email(email))
	{
		if(usernamevalidate(username))
		{
			if(password==confirmpassword)
			{
				if(passwordvalidate(password))
				{
					window.location="verification.html";
				}
				else
				{
					msg="Password is invalid";
				}
			}
			else
			{
				msg="Password's don't match";
			}
				
		}
		else
		{
			msg="username entered is invalid";
		}
	}
	else
	{
		msg="Invalid email please input your wustl.edu email";
	}
	document.getElementById("register_error_message").innerHTML=msg;
}

function validate_email(email)
{
	var pattern=/(^[a-zA-Z]+[0-9_a-zA-Z]*)@wustl.edu/;
	return pattern.test(email);
}


function usernamevalidate(username)
{
	var pattern=/^([a-zA-Z0-9]){4,10}$/;
	return pattern.test(username);
}
function passwordvalidate(password)
{
	var pattern=/^[a-zA-Z0-9]{6,8}$/;
	return pattern.test(password);
}


