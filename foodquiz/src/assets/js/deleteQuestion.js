//ACCORDION CODE, TO BE CONTINUED   
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

var contentToBeDeleted = [];

//will return content that will be deleted once its posted on the backend
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
    //get parent where event was triggered
    let parent = event.target.parentNode; 
    let Qid = parent.getAttribute("name");  //get parent name

    //get answers IDs since they will be deleted on database
    let temp = parent.nextElementSibling;
    temp = temp.childNodes;
    for(let i = 0; i < temp.length; i++){
        answers.push(temp[i].getAttribute("name"));
    }

    let question1 = new question(Qid, answers);
    contentToBeDeleted.push(question1);

    // console.log("TO BE DELETED: ", contentToBeDeleted);
    
    //remove dom elements for question and answers
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
        contentToBeDeleted[i].answers.push(ansID);
    }
    console.log("CONTENT TO BE DELETED: ", contentToBeDeleted);
    event.target.parentNode.remove();
}


