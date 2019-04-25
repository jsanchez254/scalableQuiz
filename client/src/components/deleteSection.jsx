import React, { Component } from 'react';
import axios from "axios";
import {Link} from 'react-router-dom';
import {Icon} from "semantic-ui-react";
import {accordion} from "../assets/js/deleteQuestion";
import {deleteSec, deletePath, getSection} from "../assets/js/deleteSection";

class deleteSection extends Component {
    state = {
        paths: [],
        comment: [],
        sections: [],
        outcome: [],
        sectionID: [],
        pathID: [],
        deleteSection: ""
      }

    handleDeleteSection = () => {
       const section = getSection();
       axios.post("http://localhost:5000/deleteSection", {section})
       .then(res => {
           console.log(res.data);
       })
    }

    componentDidMount (){
        axios.get("http://localhost:5000/deleteSection")
        .then(res =>{
            const sections = res.data[0];
            const paths = res.data[1];
            const comment = res.data[2];
            const outcome = res.data[3];
            const sectionID = res.data[4];
            const pathID = res.data[5];
            console.log("PATHS: ", pathID);
            this.setState({pathID});
            this.setState({sectionID});
            this.setState({sections});
            this.setState({outcome});
            this.setState({paths});
            this.setState({comment});

            const deleteSection = sections.map((value, indexo) => 
                <React.Fragment>
                    <div id = "deleteSection">
                        <div className = "questionsParent" name = {sectionID[indexo]}>
                            {value} 
                            <Icon onClick = {(e) => accordion(e)} className = "questionContent" name = "angle down"/>
                            <Icon onClick = {(e) => deleteSec(e)} value = {indexo} id = "deleteIcon" name = "close icon"/>
                        </div>
                        <div id = "parentPath">
                            {comment[indexo].map((value, index) =>
                                <div id = "contentPath" name = {pathID[indexo][index]}>
                                        <div className = "columns">                                            
                                            <div className = "column is-4 is-offset-1">
                                                {paths[indexo][index]}<br/>
                                                <span>{value}</span>
                                            </div>                                    
                                            <div className = "column is-7">
                                                {outcome[indexo][index]}<Icon onClick = {(e) => deletePath(e)} value = {index} id = "deleteIconAns" name = "close icon"/>
                                            </div>                                   
                                        </div>
                                                                               
                                </div>
                            )}
                    
                        </div>
                    </div>
            </React.Fragment>
            )   
            this.setState({deleteSection});
        })
    }
    
    render() { 
        return (
            <React.Fragment>
                <div className = "columns">
                    <Link id = "deleteOption" to = "/deleteQuestion" className = "column is-6">
                        <span>Delete Question Information</span>
                    </Link>
                    <Link id = "deleteOption" to = "/deleteSection" className = "column is-6 activeDelete">
                        <span>Delete Section Information</span>
                    </Link>
                </div>
                {this.state.deleteSection}
                <hr/>
                <button onClick = {() => this.handleDeleteSection()} className = "button is-danger">SUBMIT CHANGES</button>
            </React.Fragment>
          );
    }
}
 
export default deleteSection;