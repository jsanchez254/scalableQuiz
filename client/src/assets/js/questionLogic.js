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
    document.getElementById("temp").style.display = "none";
    document.getElementById("done").style.display = "none";
    document.getElementById("finalResult").style.display = "block";
    //LINE THAT WILL EVENTUALLY REPLACE ALL BELOW
    if(output[0].length > 1){
        document.getElementById("linkOutput").innerHTML = output[0];
        document.getElementById("textOutput").innerHTML = output[1];
        document.getElementById("linkOutput").href = output[0];
    }
    else{
        document.getElementById("textOutput").innerHTML = output;
        document.getElementById("linkOutput").innerHTML = "";
    }

    document.getElementById("again").style.display = "block";
}

//handle next when answering
export function optionHandler(answer){
    arr.push(answer);
}

export function donefunc(){
    document.getElementById("done").style.display = "block";
}
