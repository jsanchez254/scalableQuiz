//WILL ADD MORE ANSWERS SO THEY CAN BE STORED IN DATABASE

export function addMoreAnswers(){
    var parent = document.getElementById("parentAnswer");
    var input = document.createElement("input");
    var label = document.createElement("label");
    label.className = "label";
    input.className = "input";
    input.placeholder = "Enter new Answer";
    label.innerHTML = "Answer"
    parent.append(label);
    parent.append(input);
}
