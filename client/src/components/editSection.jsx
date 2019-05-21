import React, { Component } from 'react';
import axios from "axios";

import {addSections} from "../assets/js/addMoreSections";

class editPath extends Component {
    state = {
        sections: [],
        section: "",
        actualSection: "",
        paths: [], //will store all paths that are edited on edit section option
        outcomes: [], //will store all outcomes that are edited on edit section option
        comments: [] //will store all comments that are edited on edit section option
      }
    
    handleAppendEdit = (result, name, value) =>{
        let t = this.state.paths;
        //get index of input value based on its element name tag
        let index = name.substr((result.length), (name.length - 1));
        //check and see to which array value will be stored
        if(result === "outcome"){
            let outcomes = this.state.outcomes;
            if(typeof outcomes[index] === "undefined")
                outcomes.push(value);
            else
                outcomes[index] = value;
            this.setState({outcomes: outcomes});
        }
        else if(result === "comment"){
            let comments = this.state.comments;
            if(typeof comments[index] === "undefined")
                comments.push(value);
            else
                comments[index] = value;
            this.setState({comments: comments});
        }
        else if(result === "path"){
            let paths = this.state.paths;
            if(typeof paths[index] === "undefined")
                paths.push(value);
            else
                paths[index] = value;
            this.setState({paths: paths});
        }
        console.log("PATHS AQUI: ", this.state.paths);
        
    }
    
    handleChange = (event) =>{
        this.setState({[event.target.name]: event.target.value});    
        //check what kind of input we are doing so we can save input into the right array
        let str = event.target.name;
        if(str.search("outcome") !== -1)
            this.handleAppendEdit("outcome", event.target.name, event.target.value);
        else if(str.search("path") !== -1)
            this.handleAppendEdit("path", event.target.name, event.target.value);
        else if(str.search("comment") !== -1)
            this.handleAppendEdit("comment", event.target.name, event.target.value);
        //check to see if change sections so we can render its data into DOM elements
        if(event.target.name === "section"){
            this.setState({actualSection: event.target.value});
            this.handleFetchSectionData(event.target.value, this.handleChange);
        }
    }

    handleFetchSectionData = (sectionValue, handleChange) =>{
        const section = {
            section : sectionValue
        }
        console.log(section.section);
        axios.post("http://localhost:5000/postSection", {section})
        .then(res =>{
            let paths = res.data[0];
            let comments = res.data[1];
            let outputs = res.data[2];  
            if(res.data !== "FAIL")  
                addSections(comments, paths, outputs, handleChange);
        })
    }

    componentDidMount = () =>{
        axios.get("http://localhost:5000/fetchSectionNames")
        .then(res =>{
            const sections = res.data;
            this.setState({sections});
        })
    }
    
    handleSubmit = (event) =>{
        event.preventDefault();
    }
    render() { 
        return (
            <React.Fragment>
                <form onSubmit = {this.handleSubmit} className = "box">
                    <div className = "field">            
                        <label className = "label">Pick Section to Edit: </label>
                        <div className = "select">
                            <select name = "section" onChange = {this.handleChange}>
                                <option>Edit Section</option>
                                {this.state.sections.map((msg, index) => 
                                    <option id = {index + 1} value = {msg[0]} key = {index}>{msg[0]}</option>  
                                )}
                            </select>
                        </div>   
                    </div>
                    <div className = "field">
                        <label className = "label">Section:</label>
                        <input name = "actualSection" value = {this.state.actualSection} 
                        onChange = {this.handleChange} className = "input"/>                         
                    </div>            
                    <center>SECTIONS...</center>
                    <div id  = "sectionEdit">     
                    <br/>
                    </div> 
                    <br/>
                    <div className = "field">
                        <button className = "button is-success">EDIT</button>
                    </div>           
                </form>
            </React.Fragment>
          );
    }
}
 
export default editPath;