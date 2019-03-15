import React, { Component } from 'react';
import axios from "axios";

class arrangeQuestion extends Component {
    state = {
        sets: [], //SETS THAT CAN BE CREATED BY QUESTIONS GIVEN
        arrangement: "", //WILL STORE NEW ARRANGEMENT OF QUESTIONS
        arrangement1: "",
        section: "",
        setToUpdate: ""
      }

      componentDidMount () {
          axios.get("http://localhost:5000/fetchSectionNames")
          .then(res =>{
              const sets = res.data;
              console.log(sets);
              this.setState({sets});
          })
      }

    handleChange = (event) =>{
        this.setState({[event.target.name] : event.target.value});
        console.log(event.target.value);
    }

    //HANDLE SUBMIT WHEN UPDATING CURRENT SECTION
    handleSubmit = (event) =>{
        event.preventDefault();
        const newOrder = {
            sets: this.state.setToUpdate,
            arrangement: this.state.arrangement
        }
        axios.post("http://localhost:5000/arrangeQuestion", {newOrder})
        .then(res =>{
            console.log(res.data);
        })
    }

    //HANDLE SUBMIT WHEN CREATING SECTION
    handleSubmit1 = (event) =>{
        event.preventDefault();
        const newOrder = {
            section: this.state.section,
            arrangement1: this.state.arrangement1
        }
        axios.post("http://localhost:5000/postNewSection", {newOrder})
        .then(res =>{
            console.log(res.data);
        })
    }

    render() { 
        return (
            <React.Fragment>
                <h1 className = "title">UPDATE SECTION ORDER: </h1> 
                <form className = "box">
                    <div className = "field">            
                        <label className = "label">Pick Question to Edit: </label>
                        <div className = "select">
                            <select name = "setToUpdate" onChange = {this.handleChange}>
                                <option>Edit Question</option>
                                {this.state.sets.map((msg, index) => 
                                    <option id = {index + 1} value = {msg[0]} key = {index}>{msg[0]}</option>  
                                )}
                            </select>
                        </div>   
                    </div>
                    <div className = "field ">
                        <label className = "label">Question Order: </label>
                        
                        <input name = "arrangement" className = "input" 
                        onChange = {this.handleChange
                        } placeholder = "Enter New Question Order"/>
                    </div>
                    <div className = "field">
                        <button onClick = {this.handleSubmit} name = "submit" type = "submit" value = "Submit" className = "button is-warning">
                            ARRANGE QUESTIONS
                        </button>
                    </div>
                </form>

                <h1 className = "title">POST NEW SECTION WITH QUESTIONS: </h1> 
                <form className = "box">
                    <div className = "field ">
                        <label className = "label">Section Name: </label>
                        
                        <input name = "section" className = "input" 
                        onChange = {this.handleChange
                        } placeholder = "Enter New Section"/>

                        <label className = "label">Question Order: </label>
                        
                        <input name = "arrangement1" className = "input" 
                        onChange = {this.handleChange
                        } placeholder = "Enter New Question Order"/>
                    </div>
                    <button onClick = {this.handleSubmit1} name = "submit" type = "submit" value = "Submit" className = "button is-info">
                            CREATE NEW SECTION
                    </button>
                </form>
            </React.Fragment>
          );
    }
}
 
export default arrangeQuestion;