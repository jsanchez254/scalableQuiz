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


//used to delete elements that will later be posted on backend for changes
export function deleteQuestion(event){
    let parent = event.target.parentNode; 
    parent.nextElementSibling.remove();
    parent.remove();
}

export function deleteAnswer(event){
    event.target.parentNode.remove();
}


