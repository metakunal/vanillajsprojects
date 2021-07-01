function checkloveper(){
    var name=document.querySelector("#name").value;
    var lname=document.querySelector("#lname").value;

    if(name===""){
        alert("Fields cannot be empty !!");
    }else if(name.length<=2){
        alert("Name should of minimum 3 characters !!");
    }else if(!isNaN(name)) {
        alert("Name cannot be just numbers !!");
    }

    else if(lname===""){
        alert("Fields cannot be empty !!");
    }else if(lname.length<=2){
        alert("Name should of minimum 3 characters !!");
    }else if(!isNaN(lname)) {
        alert("Name cannot be just numbers !!");
    } else {
        var lr=Math.floor(Math.random()*100)+1;
        console.log(lr);
        document.querySelector("#lovevalue").value=lr+" %";
    }

   
}