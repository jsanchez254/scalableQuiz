var arr = [];

//restart questionary by clearing array and displaying only first question again!
export function restart(){
    arr = [];
    document.getElementById("finalResult").style.display = "none";
    document.getElementById("again").style.display = "none";
    document.getElementById("done").style.display = "none";
    document.getElementById("temp").style.display = "block";
}


//display outcomes based on user's answers
export function finalResults(output){
    let finalResult = "";
    for(var i = 0; i < arr.length; i++){
        finalResult += arr[i];
    }
    console.log("FINAL RESULT IS !! ", finalResult);
    document.getElementById("temp").style.display = "none";
    document.getElementById("done").style.display = "none";
    document.getElementById("finalResult").style.display = "block";
    //LINE THAT WILL EVENTUALLY REPLACE ALL BELOW
    document.getElementById("finalResult").innerHTML = output;
    document.getElementById("again").style.display = "block";
}

//handle next when answering
export function optionHandler(answer){
    arr.push(answer);
    console.log(arr);
}

export function donefunc(){
    document.getElementById("done").style.display = "block";
}