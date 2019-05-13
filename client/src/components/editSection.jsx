import React, { Component } from 'react';
import axios from "axios";

import {addSections} from "../assets/js/addMoreSections";

class editPath extends Component {
    state = {
        sections: [],
        section: "",
        actualSection: ""
      }
    
    handleChange = (event) =>{
        this.setState({[event.target.name]: event.target.value});
        console.log(event.target.value);
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
                                <option>Edit Question</option>
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
                    <center>SECTIONS:</center>
                    <div id  = "sectionEdit">     
               
                    </div>            
                </form>
            </React.Fragment>
          );
    }
}
 
export default editPath;