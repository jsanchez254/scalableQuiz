export function addSections(comments, paths, outputs, change){
    let parent = document.getElementById("sectionEdit");
    let linkParent  = document.getElementById("linkParent");
    let outputParent  = document.getElementById("outputParent");

    //create DOM elements
    for(let i = 0; i < comments.length(); i++){
        //CREATE COMMENT HTML
        let label = document.createElement("label");
        label.innerHTML = "Comment " + i + 1;
        let article = document.createElement("article");
        article.className = "media";
        let divComment = document.createElement("div");
        divComment.className = "media-content";
        let divField = document.createElement("div");
        divField.className = "field";
        let pComment = document.createElement("p");
        pComment.className = "control";
        let texarea = document.createElement("texarea");
        textarea.className = "textarea";
        textarea.placeholder = "Add a comment";
        textarea.name = "comment" + (i + 1);
        //append stuff together
        textarea.addEventListener("onchange", change());
        pComment.append(texarea);
        divField.append(pComment);
        divComment.append(divField);
        article.append(divComment);
        //CREATE PATH INPUT ELEMENT
        //CREATE OUTPUT INPUT ELEMENT
    }
}




<label className = "label">Comment:</label>
{/* <div className = "field"> */}
    <article className="media">
        <div className="media-content">
            <div className="field">
                <p className="control">
                    <textarea type ="text" name = "comment" className="textarea"
                    onChange = {this.handleChange} placeholder="Add a comment..."/>
                </p>
            </div>
        </div>
    </article>
// </div>

<div className = "field">
    <div className = "columns">
        <div className = "column is-6">
            <label className = "label"> Path: </label>
            <input name = "path" className = "input"
            onChange = {this.handleChange} placeholder = "Enter Path EX: 223"/>
        </div>
        <div className = "column is-6">
            <label className = "label"> Outcome: </label>
            <input name = "outcome" className = "input"
            onChange = {this.handleChange} placeholder = "Enter Outcome of Path"/>
        </div>
    </div>
</div>