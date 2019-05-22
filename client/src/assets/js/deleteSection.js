//section content to be deleted
var sectionDeleted = []

//section constructor
function section (id, paths, deleteSec){
    this.secID = id;
    this.pathID = paths;
    this.deleteSec = deleteSec;
}


//used to delete entire section with paths
export function deleteSec(event){
    var parent = event.target.parentNode;
    var secID = parent.getAttribute("name");
    var brother = parent.nextElementSibling;
    brother = brother.children;

    //store path IDs
    var paths = []
    for(let i = 0; i < brother.length; i++){
        paths.push(brother[i].getAttribute("name"));
    }

    //check if section to be deleted was already created
    var alreadyCreated = false;
    var i = 0;
    for(i = 0; i < sectionDeleted.length; i++){
        if(secID === sectionDeleted[i].secID){
            alreadyCreated = true;
            break;
        }
    }
    //if alredy created, then check what paths to insert
    if(alreadyCreated){
        sectionDeleted[i].deleteSec = "yes";
        for(let j = 0; j < brother.length; j++){
            for(let k = 0; k < sectionDeleted[i].pathID.length; k++){
                if(brother[j].getAttribute("name") === sectionDeleted[i].pathID[k]){
                    continue;
                }
                else{
                    sectionDeleted[i].pathID.push(brother[j].getAttribute("name"));
                    break;
                }
            }
        }
    }
    else{
        var newSection = new section(secID, paths, "yes");
        sectionDeleted.push(newSection);
    }    
    parent.parentNode.remove();
}

//delete individual paths
export function deletePath(event){
    var parent = event.target.parentNode;
    parent = parent.parentNode;
    parent = parent.parentNode;
    var pathID = parent.getAttribute("name");
    var secID = parent.parentNode;
    secID = secID.previousElementSibling.getAttribute("name");
    
    //check if section to be deleted was already created
    var alreadyCreated = false;
    var i = 0;
    for(i = 0; i < sectionDeleted.length; i++){
        if(secID === sectionDeleted[i].secID){
            alreadyCreated = true;
            break;
        }
    }

    if(alreadyCreated){
        sectionDeleted[i].pathID.push(pathID);
    }
    else{
        var paths = [];
        paths.push(pathID);
        var newSection = new section(secID, paths, "no");
        sectionDeleted.push(newSection);
    }
    

    parent.remove();
}

//return section object array
export function getSection(){
    return sectionDeleted;
}