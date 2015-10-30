function onchangegroup()
{
	if(document.getElementById("group").checked)
	{
		document.getElementById("ifgroupchecked").innerHTML="Size: <select id=\"minsize\"><option>1</option><option>2</option><option>3</option><option>4</option></select>-<select id=\"maxsize\"><option>1</option><option>2</option><option>3</option><option>4</option><option>5</option></select>";
	}
	else
	{
		document.getElementById("ifgroupchecked").innerHTML="";
	}
}