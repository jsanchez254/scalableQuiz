import React, { Component } from 'react';
import axios from "axios";

//IMPORT SEMANTIC
import {Icon} from "semantic-ui-react";

//IMPORT JS
import {addMoreAnswers} from "../assets/js/addMoreAnswers.js";

class newQuestion extends Component {
    state = {
        path: "",
        outcome: "",
        keepTrackAnswer: -1,
        questions: [],
        answers: [],
        postQuestion: "",
        postAnswers: [], //array used to store answers that will be posted
        indexAnswer: 1
    }

    handleChange = (event) => {
        this.setState({[event.target.name] : event.target.value});
        //POST ANSWERS
        const postAnswers = this.state.postAnswers;
        let index = event.target.name[6]; //get index of answer updated
        //if answer index does not exist then push it into the array
        if(typeof postAnswers[index] == "undefined" && event.target.name != "postQuestion"){
            postAnswers.push(event.target.value);
        }
        else{
            postAnswers[index] = event.target.value;
        }
        //update state of answers array
        this.setState({postAnswers});
    }

    //handle submit for creating a new path with outcome
    handleSubmit1 = (event) =>{
        event.preventDefault();
        const newPath = {
            path: this.state.path,
            outcome: this.state.outcome
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
            postAnswers: this.state.postAnswers
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
            console.log(questions);
            this.setState({questions});
            this.setState({answers});
        })
    }
    
    giveMeSpace = (index) =>{
        if(index % 3 === 0){
            return (<br/>);
        }
        return;
    }
    render() { 
        return (
            <React.Fragment>
                <div className = "columns">
                    <div className = "column is-6">
                        <h1 className = "title">CURRENT QUESTIONS AND ANSWERS: </h1>
                        <table className = "table">
                            <thead>
                                <tr>
                                    <th>QUESTIONS</th>
                                    <th>ANSWERS</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>
                                        {this.state.questions.map((question, index) => {                                    
                                        return (<React.Fragment>
                                                {question} <br/>
                                                <br/><br/><br/>
                                                </React.Fragment>);
                                            }
                                        )}
                                    </td>
                                    <td>
                                        {this.state.answers.map((answer, index) => {
                                            return(<React.Fragment>
                                                {answer}
                                                {this.giveMeSpace(index + 1)}
                                                <br/>
                                            </React.Fragment>)
                                            }
                                        )}
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>

                <br/>
                <div className = "column is-6">  
                        <h1 className = "title">POST NEW QUESTION: </h1>                                        
                        <form className = "box">
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
                            <div className = "field">
                                    {/* when clicked it will add input element */}
                                    <div name = "addAnswer" onClick = {() => addMoreAnswers(this.handleChange)} className = "addMoreAnswers">
                                        Add More Answers <Icon name = "plus square"/>
                                    </div>
                            </div>
                        
                            <div className = "field">
                                <button onClick = {this.handleSubmit} name = "submit" type = "submit" value = "Submit" className = "button is-info">
                                    CREATE QUESTION
                                </button>
                            </div>
                        </form>

                        <br/>
                        <h1 className = "title">CREATE NEW PATH AND OUTCOME: </h1>   
                        <form onSubmit = {this.handleSubmit1} className = "box">
                            <div className = "field">
                                <label className = "label"> Path </label>
                                <input name = "path" className = "input"
                                onChange = {this.handleChange} placeholder = "Enter Path"/>

                                <label className = "label"> Outcome </label>
                                <input name = "outcome" className = "input"
                                onChange = {this.handleChange} placeholder = "Enter Outcome of Path"/>
                            </div>
                            <div className = "field">
                            <button type = "submit" value = "Submit" className = "button is-info">
                                    CREATE NEW PATH
                            </button>
                            </div>
                        </form>
                        <br/>
                    </div>
                </div>
            </React.Fragment>
          );
    }
}
 
export default newQuestion;