import React, { Component } from 'react';
import axios from "axios";

class editPath extends Component {
    state = {
        sections: [],
        section: ""
      }
    
    handleChange = (event) =>{
        this.setState({[event.target.name]: event.target.value});

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
                        <input name = "actualQuestion" value = {this.state.section} 
                        onChange = {this.handleChange} className = "input"/>                         
                    </div>
                    <div className = "field">
                        <center>SECTIONS:</center>
                        
                    </div>
                </form>
            </React.Fragment>
          );
    }
}
 
export default editPath;