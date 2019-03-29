var x = 3;
//WILL ADD MORE ANSWERS SO THEY CAN BE STORED IN DATABASE
//CREATE NEW LABEL AND INPUT ELEMENTS SO THAT USER CAN INPUT MORE THINGS
export function addMoreAnswers(handleChange){
    //used so we can name our inputs differently to be sent to database
    var parent = document.getElementById("parentAnswer");
    if(parent.childNodes.length === 8){
        x = 3;
    }
    var input = document.createElement("input");
    var label = document.createElement("label");
    x += 1;
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

    //CREATE DIRECT TO QUESTION ELEMENTS
    var parent1 = document.getElementById("directTo");
    var input1 = document.createElement("input");
    var label1 = document.createElement("label");
    label1.className = "label";
    input1.className = "input";
    input1.id = "input1";
    //add event listener to save state of value in new created input elements
    input1.addEventListener("change", handleChange);
    input1.name = "onswer" + (x-1);
    input1.placeholder = "Enter Question Number to be Directed to";
    label1.innerHTML = "Direct To ";
    parent1.append(label1);
    parent1.append(input1);
}


//delete one answer and directTo
export function deleteAnswer(){
    let parent = document.getElementById("parentAnswer");
    let parent1 = document.getElementById("directTo");
    let indexDelete1 = parent1.childNodes.length - 1;
    let indexDelete = parent.childNodes.length - 1;
    if(indexDelete + 1 === 8)
        x = 3;
    let i = 0;
    while(i < 2){
        if(indexDelete > 4){
            parent.removeChild(parent.childNodes[indexDelete - i]);
            parent1.removeChild(parent1.childNodes[indexDelete1 - i]);
        }
        i++;
    }
    if(indexDelete > 4)
        x-=1;
}

export function createAnswerBoxes(boxes, handleChange, directTo){
    let length = boxes.length;
    let answerBox = document.getElementById("answerBox");
    let directToBox = document.getElementById("directToBox");
    //KILL children if there is any DIEEE!!!!
    if(answerBox.childNodes.length > 0){
        while(answerBox.childNodes.length){
            answerBox.removeChild(answerBox.childNodes[0]);
            directToBox.removeChild(directToBox.childNodes[0]);
        }
    }
    for(let i = 0; i < length; i++){
        let newBox = document.createElement("input");
        newBox.className = "input";
        newBox.value = boxes[i];
        newBox.name = "answer" + i;
        newBox.addEventListener("change", handleChange);

        let newBox2 = document.createElement("input");
        newBox2.className = "input";
        newBox2.value = directTo[i];
        newBox2.name = "onswer" + i;
        newBox2.addEventListener("change", handleChange);

        let newLabel = document.createElement("label");
        newLabel.className = "label";
        newLabel.innerHTML = "Answer " + (i + 1) + ":";

        let newLabel2 = document.createElement("label");
        newLabel2.className = "label";
        newLabel2.innerHTML = "Direct To " + (i + 1) + ":";

        answerBox.append(newLabel);
        answerBox.append(newBox);
        directToBox.append(newLabel2);
        directToBox.append(newBox2);
    }
}

                        