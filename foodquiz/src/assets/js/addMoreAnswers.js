var x = 3;
//WILL ADD MORE ANSWERS SO THEY CAN BE STORED IN DATABASE
//CREATE NEW LABEL AND INPUT ELEMENTS SO THAT USER CAN INPUT MORE THINGS
export function addMoreAnswers(handleChange){
    //used so we can name our inputs differently to be sent to database
    x += 1;
    var parent = document.getElementById("parentAnswer");
    var input = document.createElement("input");
    var label = document.createElement("label");
    label.className = "label";
    input.className = "input";
    input.id = "input1";
    //add event listener to save state of value in new created input elements
    input.addEventListener("change", handleChange);
    input.name = "answer" + (x-1);
    input.placeholder = "Enter new Answer";
    label.innerHTML = "Answer " + x;
    parent.append(label);
    parent.append(input);
}

export function createAnswerBoxes(boxes, handleChange){
    let length = boxes.length;
    let answerBox = document.getElementById("answerBox");
    //KILL children if there is any DIEEE!!!!
    if(answerBox.childNodes.length > 0){
        while(answerBox.childNodes.length){
            answerBox.removeChild(answerBox.childNodes[0]);
        }
    }
    for(let i = 0; i < length; i++){
        let newBox = document.createElement("input");
        newBox.className = "input";
        newBox.value = boxes[i];
        newBox.name = "answer" + i;
        newBox.addEventListener("change", handleChange);

        let newLabel = document.createElement("label");
        newLabel.className = "label";
        newLabel.innerHTML = "Answer " + (i + 1) + ":";

        answerBox.append(newLabel);
        answerBox.append(newBox);
    }
}
                        