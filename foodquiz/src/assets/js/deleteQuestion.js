//ACCORDION CODE FOR ANIMATION 
export function accordion(event){
    let qparent = event.target.parentNode;
    let panel = qparent.nextElementSibling;
    if (panel.style.maxHeight){
      panel.style.maxHeight = null;
      panel.style.display = "none";
    } else {
      panel.style.display = "block";
      panel.style.maxHeight = panel.scrollHeight + "px";
    } 
}

<<<<<<< HEAD
=======
//DROP DOWN ANIMATION
export function dropDown(){
    let drop = document.getElementById("dropMenu");
    if(drop.style.display == "none")
        drop.style.display = "block";
    else
        drop.style.display = "none";
}

>>>>>>> b8d48936083b55f5a850ee79ee8db9edb6e11bd8
//array that will store everything that will be deleted
var contentToBeDeleted = [];

//RETURN ARRAY THAT WILL BE USED TO DELETE
export function getDeleteContent(){
    return contentToBeDeleted;
}

//question constructor
function question (id, answers){
    this.qid = id;
    this.answers = answers;
}

//used to delete elements that will later be posted on backend for changes
export function deleteQuestion(event){
    //answers tgat will be deleted when post request is made
    let answers = [];
    let insert = true;
    //get parent where event was triggered
    let parent = event.target.parentNode; 
    let Qid = parent.getAttribute("name");  //get parent name
    let i =0;
    for(i = 0; i < contentToBeDeleted.length; i++){
        if(Qid == contentToBeDeleted[i].qid){
            insert = false;
            break;
        }
    }
    let temp = parent.nextElementSibling;
    temp = temp.childNodes;
    for(let i = 0; i < temp.length; i++){
        answers.push(temp[i].getAttribute("name"));
    }
    //get answers IDs since they will be deleted on database
    if(insert){
        let question1 = new question(Qid, answers);
        contentToBeDeleted.push(question1);
    }
    else{
        for(let j = 0; j < contentToBeDeleted[i].answers.length; j++)
            answers.push(contentToBeDeleted[i].answers[j]);
        contentToBeDeleted[i].answers = answers;
    }

    console.log("TO BE DELETED: ", contentToBeDeleted);
    
    //remove dom elements for question and answers
    parent.parentNode.style.paddingBottom = "0px";
    parent.nextElementSibling.remove();     
    parent.remove();
}

export function deleteAnswer(event){
    let Qid = event.target.parentNode.parentNode.previousElementSibling.getAttribute("name");
    let ansID = event.target.parentNode.getAttribute("name");
    //check if Qid is already set to be deleted
    let insert = true;
    let i =0;
    for(i = 0; i < contentToBeDeleted.length; i++){
        if(Qid == contentToBeDeleted[i].qid){
            insert = false;
            break;
        }
    }
    if(insert){
        let answers = [];
        answers.push(ansID);
        let question1 = new question(Qid, answers);
        contentToBeDeleted.push(question1);
    }
    else{
        let push = true;
        for(let j = 0; j < contentToBeDeleted[i].answers.length; j++){
            if(contentToBeDeleted[i].answers[j] == ansID)
                push = false;
        }
            if(push)
                contentToBeDeleted[i].answers.push(ansID);
    }
    console.log("TO BE DELETED: ", contentToBeDeleted);
    let bigPAPA = event.target.parentNode.parentNode;
    event.target.parentNode.remove();
    //if no more answers are left
    if(bigPAPA.childNodes.length == 0){
        bigPAPA.parentNode.style.paddingBottom = "0px";
        bigPAPA.previousElementSibling.remove();
        bigPAPA.remove();
    }
}


