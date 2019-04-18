import React, { Component } from 'react';
import axios from "axios";

//IMPORT SEMANTIC
import {Icon} from "semantic-ui-react";

//IMPORT JS
import {addMoreAnswers, deleteAnswer} from "../assets/js/addMoreAnswers.js";

class newQuestion extends Component {
    state = {
        path: "",
        outcome: "",
        keepTrackAnswer: -1,
        questions: [],
        answers: [],
        postQuestion: "",
        postAnswers: [], //array used to store answers that will be posted
        postAnswersToQuestion: [], //array used to store direct to quetion ID
        indexAnswer: 1,
        sections: [], // SECTIONS TO BE DISPLAYED FOR PATHS
<<<<<<< HEAD
        setToUpdate: "" //section to be updated for path
=======
        setToUpdate: "", //section to be updated for path
        comment: "" //comment that will be posted along path
>>>>>>> b8d48936083b55f5a850ee79ee8db9edb6e11bd8
    }

    handleAnswersAndDirect = (name, value) =>{
        //handle whether we are talking about direct to input or answer input
        var option = 1;
        if(name[0] === 'o'){
            option = 0;
        }
            const postAnswers = this.state.postAnswers;
            const postAnswersToQuestion = this.state.postAnswersToQuestion;
            let index = name[6]; //get index of answer updated
            //FOR ANSWER ARRAY THAT WILL BE POSTED
            //if answer index does not exist then push it into the array
            if(typeof postAnswers[index] === "undefined" && name !== "postQuestion"){
                if(option === 1){
                    postAnswers.push(value);
                }
                else{
                    postAnswersToQuestion.push(value);
                }
            }
            else{
                if(option === 1){
                    postAnswers[index] = value;
                }
                else{
                    postAnswersToQuestion[index] = value;
                }
            }
            this.setState({postAnswers});
            this.setState({postAnswersToQuestion});
            
            // if(option == 1){
            //     console.log("ANSWERS:\n", this.state.postAnswers);
            // }
            // else{
            //     console.log("DIRECT T0:\n", this.state.postAnswersToQuestion);
            // }
    }

    handleChange = (event) => {
        this.setState({[event.target.name] : event.target.value});
        this.handleAnswersAndDirect(event.target.name, event.target.value);
    }

    //handle submit for creating a new path with outcome
    handleSubmit1 = (event) =>{
        event.preventDefault();
        const newPath = {
            path: this.state.path,
            outcome: this.state.outcome,
<<<<<<< HEAD
            section: this.state.setToUpdate
=======
            section: this.state.setToUpdate,
            comment: this.state.comment
>>>>>>> b8d48936083b55f5a850ee79ee8db9edb6e11bd8
        }
        axios.post("http://localhost:5000/postPath" , {newPath})
        .then(res => {
            console.log(res.data);
        })
    }

    // handle submit for creating a new question with answers
    handleSubmit = (event) =>{
        event.preventDefault();
        const newQuestion  = {
            postQuestion: this.state.postQuestion,
            postAnswers: this.state.postAnswers,
            postDirection: this.state.postAnswersToQuestion
        };
        axios.post("http://localhost:5000/postQuestion", {newQuestion})
        .then(res => {
            console.log(res.data)
        })
    }

    componentDidMount(){
        axios.get("http://localhost:5000/fetchEverything")
        .then(res => {
            let temp = res.data;
            const questions = temp[0];
            const answers = temp[1];
            console.log(answers);
            this.setState({questions});
            this.setState({answers});
        })
        axios.get("http://localhost:5000/fetchSectionNames")
        .then(res =>{
            const sections = res.data;
            this.setState({sections});
            console.log(this.state.sections);
        })
    }
    
    render() { 
        return (
            <React.Fragment>
                <h1 className = "title">POST NEW QUESTION: </h1>                                        
                <form className = "box">
                    <div className = "columns" id = "postQuestion">
                        <div className = "column is-6">
                            <div className = "field " id = "parentAnswer">
                                <label className = "label"> Question </label>
                                
                                <input name = "postQuestion" className = "input" 
                                onChange = {this.handleChange
                                } placeholder = "Enter new Question"/>

                                <label className = "label"> Answer 1 </label>
                                
                                <input name = "answer0" className = "input" 
                                onChange = {this.handleChange
                                } placeholder = "Enter new Answer"/>

                                <label className = "label"> Answer 2 </label>
                                
                                <input name = "answer1" className = "input" 
                                onChange = {this.handleChange
                                } placeholder = "Enter new Answer"/>

                                <label className = "label"> Answer 3 </label>
                                
                                <input name = "answer2" className = "input" 
                                onChange = {this.handleChange
                                } placeholder = "Enter new Answer"/>
                            </div>
                        </div>
                        <div className = "column is-6">
                            <div className = "field " id = "directTo">
                                
                                <label className = "label"> Direct To: </label>
                                
                                <input name = "onswer0" className = "input" 
                                onChange = {this.handleChange
                                } placeholder = "Enter Question Number to be Directed to"/>

                                <label className = "label"> Direct To: </label>
                                
                                <input name = "onswer1" className = "input" 
                                onChange = {this.handleChange
                                } placeholder = "Enter Question Number to be Directed to"/>

                                <label className = "label"> Direct To: </label>
                                
                                <input name = "onswer2" className = "input" 
                                onChange = {this.handleChange
                                } placeholder = "Enter Question Number to be Directed to"/> 
                            </div>
                        </div>
                    </div>
                    
                    <div className = "field">
                            {/* when clicked it will add input element */}
                            <div className = "columns">
                                <div className = "column is-6">
                                    <div name = "addAnswer" onClick = {() => addMoreAnswers(this.handleChange)} className = "addMoreAnswers">
                                        Add More Answers <Icon name = "plus square"/>
                                    </div>
                                </div>
                                <div className = "column is-6">
                                    <div onClick = {() => deleteAnswer()} className = "deleteAnswer">
                                        Delete Answer <Icon name = "minus square"/>
                                    </div>
                                </div>
                            </div>
                    </div>
                
                    <div className = "field">
                        <button onClick = {this.handleSubmit} name = "submit" type = "submit" value = "Submit" className = "button is-info">
                            CREATE QUESTION
                        </button>
                    </div>
                </form>

                <br/>
                <h1 className = "title">POST NEW PATH AND OUTCOME: </h1>   
                <form onSubmit = {this.handleSubmit1} className = "box">
                    <div className = "field">            
                        <label className = "label">Pick Section For Path: </label>
                        <div className = "select">
                            <select name = "setToUpdate" onChange = {this.handleChange}>
                                <option>Pick Section</option>
                                {this.state.sections.map((msg, index) => 
                                    <option id = {index + 1} value = {msg[0]} key = {index}>{msg[0]}</option>  
                                )}
                            </select>
                        </div>   
                    </div>
<<<<<<< HEAD
                    <div className = "field">
                        <label className = "label"> Path </label>
                        <input name = "path" className = "input"
                        onChange = {this.handleChange} placeholder = "Enter Path EX: 223"/>

                        <label className = "label"> Outcome </label>
                        <input name = "outcome" className = "input"
                        onChange = {this.handleChange} placeholder = "Enter Outcome of Path"/>
=======
                    <label className = "label">Comment:</label>
                    <div className = "field">
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
                    </div>

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
>>>>>>> b8d48936083b55f5a850ee79ee8db9edb6e11bd8
                    </div>
                    <div className = "field">
                    <button type = "submit" value = "Submit" className = "button is-info">
                            CREATE NEW PATH
                    </button>
                    </div>
                </form>
                <br/>
            </React.Fragment>
          );
    }
}
 
export default newQuestion;