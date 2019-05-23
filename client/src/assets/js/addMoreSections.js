var currentIndex; //keep track of current DOM element created


export function addSections(comments, paths, outputs, handleChange){
    let parent = document.getElementById("sectionEdit");
    // let pathParent  = document.getElementById("pathParent");
    // let outputParent  = document.getElementById("outputParent");

    //KILL children if there is any DIEEE!!!!
    if(parent.childNodes.length > 0){
        while(parent.childNodes.length){
            parent.removeChild(parent.childNodes[0]);
        }
    }

    //create DOM elements
    for(let i = 0; i < comments.length; i++){
        //CREATE WRAPPERS
        //used for comment
        let mainDivWrapper = document.createElement("div");
        let columnWrapper = document.createElement("div");
        let breako =  document.createElement("br");
        columnWrapper.className = "columns";
        //used for paths
        let column1Wrapper = document.createElement("div");
        //used for outputs
        let column2Wrapper = document.createElement("div");
        column1Wrapper.className = "column is-6";
        column2Wrapper.className = "column is-6";
        columnWrapper.append(breako);
        //create fields for both columns
        let field1 = document.createElement("div");
        field1.className = "field1";  
        let field2 = document.createElement("div");
        field2.className = "field2";  
        let field3 = document.createElement("div");
        field3.className = "field3";        
        columnWrapper.append(column1Wrapper);
        columnWrapper.append(column2Wrapper);
        mainDivWrapper.append(columnWrapper);

        //CREATE PATH INPUT ELEMENT
        let label1 = document.createElement("label");
        label1.className = "label";
        let input1 = document.createElement("input");
        input1.addEventListener("change", handleChange);
        label1.innerHTML = "Path " + (i  + 1) + ":";
        input1.className = "input";
        input1.name = "path" + i;
        input1.value = paths[i];
        field1.append(label1);
        field1.append(input1);
        column1Wrapper.append(field1);

        //CREATE OUTPUT INPUT ELEMENT
        let label2 = document.createElement("label");
        label2.className = "label";
        let input2 = document.createElement("input");
        input2.addEventListener("change", handleChange);
        label2.innerHTML = "Outcome " + (i + 1) + ":";
        input2.className = "input";
        input2.name = "outcome" + i;
        input2.value = outputs[i];
        field2.append(label2);
        field2.append(input2);
        column2Wrapper.append(field2);

         //CREATE COMMENT HTML
         let label = document.createElement("label");
         label.className = "label";
         label.innerHTML = "Comment " + (i + 1) + ":";
         let article = document.createElement("article");
         article.className = "media";
         let divComment = document.createElement("div");
         divComment.className = "media-content";
         let divField = document.createElement("div");
         divField.className = "field";
         let pComment = document.createElement("p");
         pComment.className = "control";
         let textarea = document.createElement("textarea");
         textarea.className = "textarea";
         textarea.name = "comment" + i;
         //append stuff together
         textarea.addEventListener("change", handleChange);
         textarea.value = comments[i];
         pComment.append(textarea);
         divField.append(pComment);
         divComment.append(divField);
         article.append(divComment);

         field3.append(label);
         field3.append(article);
         mainDivWrapper.append(field3);

        //LAST WRAPPER

        mainDivWrapper.append(breako);
        parent.append(mainDivWrapper);

    }
}





