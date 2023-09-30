

var count=0;
function completed()
{

    var comp="completed";
    var red="to be read";
    if(count%2==0)
    {
        document.getElementsByClassName("read").innerHTML=comp;
        document.getElementsByClassName("read").style.backgroundColor="white";
    }
    else{
        
        document.getElementsByClassName("read").innerHTML=red;
        document.getElementsByClassName("read").style.backgroundColor="rgb(76, 148, 172)";
    }
    count++;
}