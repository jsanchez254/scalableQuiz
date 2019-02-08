import burrito from "../img/burrito.jpg";
import double from "../img/double_double.png";
import iceCream from "../img/iceCream.png";
import baconBurger from "../img/baconBurger.jpg";
import cheesecake from "../img/cheesecake.jpg";
import popcorn from "../img/popcorn.jpg";
import cake from "../img/cake.jpg";
import california from "../img/california.jpg";
import pizza from "../img/pizza.jpg";

var counter = 0;
var arr = [];

//restart questionary by clearing array and displaying only first question again!
export function restart(){
    arr = [];
    counter = 0;
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
    // document.getElementById("finalResult").innerHTML = output;
    if(finalResult === "12"){
        document.getElementById("imagen").src = burrito;
        console.log("okay");
    }
    else if(finalResult === "23"){
        document.getElementById("imagen").src = double;
    }
    else if(finalResult === "31"){
        document.getElementById("imagen").src = iceCream;
    }

    else if(finalResult === "11"){
        document.getElementById("imagen").src = popcorn;
    }

    else if(finalResult === "13"){
        document.getElementById("imagen").src = baconBurger;
    }

    else if(finalResult === "32"){
        document.getElementById("imagen").src = cheesecake;
    }

    else if(finalResult === "33"){
        document.getElementById("imagen").src = cake;
    }
    
    else if(finalResult === "21"){
        document.getElementById("imagen").src = pizza;
    }

    else if(finalResult === "22"){
        document.getElementById("imagen").src = california;
    }

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