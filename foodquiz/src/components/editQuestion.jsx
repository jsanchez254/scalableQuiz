import React, { Component } from 'react';
import axios from "axios";

//IMPORT JS
import {createAnswerBoxes} from "../assets/js/addMoreAnswers";

class EditQuestion extends Component {
    state = {
        questions: [],
        answers: [],
        actualQuestion: ""
      }

    handleChange = (event) =>{
        this.setState({[event.target.name] : event.target.value});
        //HANDLES CASE WHEN WE SELECT SOMETHING TO EDIT
        if(event.target.name == "question"){
            const actualQuestion = event.target.value;
            console.log(event.target.value);
            this.setState({actualQuestion});
            this.handleQuestion(event.target.value);
        }
    }

    handleQuestion = (question) =>{
        const question1 = {
            question1: question
        }
        axios.post("http://localhost:5000/editAnswersFetch", {question1})
            .then(res =>{
                const answers = res.data;
                this.setState({answers});
                //CREATE NECESSARY ANSWER BOXES FOR QUESTIONS THAT HAVE MORE THAN 3 OPTIONS
                createAnswerBoxes(answers);
            })
    }

    handleSubmit = () =>{
        const post = {
            answers : this.state.answers
        }
        axios.post("http://localhost:5000/updateQuestion", {post})
        .then(res => {
            console.log(res.data);
        })
    }

    componentDidMount(){
        axios.get("http://localhost:5000/getAllQuestions" )
        .then(res => {
            const questions = res.data;
            this.setState({questions});
            console.log("do something!");
            console.log(res.data);
        })
    }
      
    render() { 
        return (
            <React.Fragment>
                <h1 className = "title">MANAGE QUESTION/PATH</h1>
                <form onSubmit = {this.handleSubmit} className = "box">  
                    <div className = "field">            
                        <label className = "label">Pick Question to Edit: </label>
                        <div className = "select">
                            <select name = "question" onChange = {this.handleChange}>
                                <option>Edit Question</option>
                                {this.state.questions.map((msg, index) => 
                                    <option value = {msg[0]} key = {index}>{msg[0]}</option>  
                                )}
                            </select>
                        </div>   
                    </div>
                    <div className = "field">
                        <label className = "label">Question:</label>
                        <input value = {this.state.actualQuestion} className = "input"/> 
                    </div>
                    <center><h1>ANSWERS...</h1></center>
                    <div id = "answerBox" className = "field">
                        {/* HERE A BUNCH OF ELEMENTS WILL BE CREATED WITH DOM MANIPULATION */}
                    </div>
                    <div className = "field">
                        <button className = "button is-success">EDIT!</button>
                    </div>
                </form>
            </React.Fragment>
          );
    }
}
 
export default EditQuestion;