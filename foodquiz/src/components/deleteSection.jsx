import React, { Component } from 'react';
import axios from "axios";
import {Link} from 'react-router-dom';
import {Icon} from "semantic-ui-react";
import {accordion} from "../assets/js/deleteQuestion";

class deleteSection extends Component {
    state = {
        paths: [],
        comment: [],
        sections: [],
        outcome: [],
        deleteSection: ""
      }

    componentDidMount (){
        axios.get("http://localhost:5000/deleteSection")
        .then(res =>{
            const sections = res.data[0];
            const paths = res.data[1];
            const comment = res.data[2];
            const outcome = res.data[3];
            this.setState({sections});
            this.setState({outcome});
            this.setState({paths});
            this.setState({comment});

            const deleteSection = sections.map((value, indexo) => 
                <React.Fragment>
                    <div id = "deleteParent">
                        <div className = "questionsParent" name = {(indexo + 1)}>
                            {value} 
                            <Icon onClick = {(e) => accordion(e)} className = "questionContent" name = "angle down"/>
                            <Icon value = {indexo} id = "deleteIcon" name = "close icon"/>
                        </div>
                        <div id = "parentPath">
                            {comment[indexo].map((value, index) =>
                                <div id = "contentPath" >
                                        <div className = "columns">                                            
                                            <div className = "column is-6">
                                                {paths[indexo][index]}
                                            </div>                                    
                                            <div className = "column is-6">
                                                {outcome[indexo][index]}
                                            </div>                                       
                                        </div>                                
                                    <span>{value}</span>
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
                <button className = "button is-danger">SUBMIT CHANGES</button>
            </React.Fragment>
          );
    }
}
 
export default deleteSection;