var killChild = 0;

export function deleteQuestion(index){
    // let deleteParent = document.getElementById("deleteParent");
    let questionParent = document.getElementsByClassName("questionsParent");
    questionParent[index - killChild].remove();
    killChild+=1;
    
}

export function deleteAnswer(index){

}