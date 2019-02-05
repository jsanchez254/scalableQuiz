import React, { Component } from 'react';
import axios from "axios";
import FetchQ from "./fetchQuestions.jsx";

//IMPORT JS FILES
import {increment , getAnswer1} from "../assets/js/incrementByThree.js";

class newQuestion extends Component {
    state = {
        path: "",
        keepTrackAnswer: -1,
        questions: [],
        answers: [],
        postQuestion: "",
        answer1: "",
        answer2: "",
        answer3: ""
      }


    handleChange = (event) => {
        this.setState({[event.target.name] : event.target.value});
        console.log(event.target.value);
    }

    handleSubmit = (event) =>{
        event.preventDefault();
        
        const newQuestion  = {
            postQuestion: this.state.postQuestion,
            answer1: this.state.answer1,
            answer2: this.state.answer2,
            answer3: this.state.answer3
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

    handleAnswer = () =>{
        let po = increment();
        // console.log("PO", po);
        return increment();
    }

    getAnswer = () =>{
        let po = getAnswer1();
        console.log("HU ", po);
        return po;
    }

    render() { 
        return (
            <React.Fragment>
                <div>
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
                                            <br/>
                                            <br/>
                                            </React.Fragment>);
                                        }
                                    )}
                                </td>
                                <td>
                                    {this.state.answers.map((answer, index) => {
                                        return(<React.Fragment>
                                            {answer} <br/>
                                        </React.Fragment>)
                                        }
                                    )}
                                </td>
                            </tr>
                        </tbody>

                    </table>
                </div>
                <br/>
                <h1 className = "title">POST NEW QUESTION: </h1>
                <form onSubmit = {this.handleSubmit} className = "box">
                <div className = "field ">
                    <label className = "label"> Question </label>
                    
                    <input name = "postQuestion" className = "input" 
                    onChange = {this.handleChange
                    } placeholder = "Enter new Question"/>

                    <label className = "label"> Answer 1 </label>
                    
                    <input name = "answer1" className = "input" 
                    onChange = {this.handleChange
                    } placeholder = "Enter new Answer"/>

                    <label className = "label"> Answer 2 </label>
                    
                    <input name = "answer2" className = "input" 
                    onChange = {this.handleChange
                    } placeholder = "Enter new Answer"/>

                    <label className = "label"> Answer 3 </label>
                    
                    <input name = "answer3" className = "input" 
                    onChange = {this.handleChange
                    } placeholder = "Enter new Answer"/>
        
                </div>
                
                <div className = "field">
                    <button type = "submit" value = "Submit" className = "button is-success">
                        CREATE QUESTION
                    </button>
                </div>

                </form>
            </React.Fragment>
          );
    }
}
 
export default newQuestion;