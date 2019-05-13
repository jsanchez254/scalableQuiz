export function addSections(comments, paths, outputs, handleChange){
    let parent = document.getElementById("sectionEdit");
    // let pathParent  = document.getElementById("pathParent");
    // let outputParent  = document.getElementById("outputParent");

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
        columnWrapper.append(column1Wrapper);
        columnWrapper.append(column2Wrapper);
        mainDivWrapper.append(columnWrapper);

        //CREATE PATH INPUT ELEMENT
        let label1 = document.createElement("label");
        label1.className = "label";
        let input1 = document.createElement("input");
        label1.innerHTML = "Path " + (i + 1);
        input1.className = "input";
        input1.name = "path" + (i + 1);
        input1.value = paths[i];
        column1Wrapper.append(label1);
        column1Wrapper.append(input1);

        //CREATE OUTPUT INPUT ELEMENT
        let label2 = document.createElement("label");
        label2.className = "label";
        let input2 = document.createElement("input");
        label2.innerHTML = "Outcome " + (i + 1);
        input2.className = "input";
        input2.name = "path" + (i + 1);
        input2.value = outputs[i];
        column2Wrapper.append(label2);
        column2Wrapper.append(input2);

         //CREATE COMMENT HTML
         let label = document.createElement("label");
         label.className = "label";
         label.innerHTML = "Comment " + (i + 1);
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
         textarea.name = "comment" + (i + 1);
         //append stuff together
         textarea.addEventListener("change", handleChange);
         textarea.value = comments[i];
         pComment.append(textarea);
         divField.append(pComment);
         divComment.append(divField);
         article.append(divComment);
         mainDivWrapper.append(label);
         mainDivWrapper.append(article);

        //LAST WRAPPER

        mainDivWrapper.append(breako);
        parent.append(mainDivWrapper);

    }
}

{/* <label className = "label"> Path: </label> */}
//             <input name = "path" className = "input"
//             onChange = {this.handleChange} placeholder = "Enter Path EX: 223"/>




// <label className = "label">Comment:</label>
// {/* <div className = "field"> */}
//     <article className="media">
//         <div className="media-content">
//             <div className="field">
//                 <p className="control">
//                     <textarea type ="text" name = "comment" className="textarea"
//                     onChange = {this.handleChange} placeholder="Add a comment..."/>
//                 </p>
//             </div>
//         </div>
//     </article>
// // </div>

// <div className = "field">
//     <div className = "columns">
//         <div className = "column is-6">
//             <label className = "label"> Path: </label>
//             <input name = "path" className = "input"
//             onChange = {this.handleChange} placeholder = "Enter Path EX: 223"/>
//         </div>
//         <div className = "column is-6">
//             <label className = "label"> Outcome: </label>
//             <input name = "outcome" className = "input"
//             onChange = {this.handleChange} placeholder = "Enter Outcome of Path"/>
//         </div>
//     </div>
// </div>