import React, { Component } from 'react';
import axios from "axios";

//IMPORT JS
import {createAnswerBoxes} from "../assets/js/addMoreAnswers";

class EditQuestion extends Component {
    state = {
        questions: [], // will store all questions that display on drop down menu
        answers: [],    //will store answers that are fetched when questions is selected
        actualQuestion: "", //will store question selected from dropdown menu
        q_id: ""    //will store id of question selected
      }

    handleChange = (event) =>{
        this.setState({[event.target.name] : event.target.value});

        //HANDLES QUESTION UPDATE
        console.log(event.target.value);
        if(event.target.name == "question"){
            const actualQuestion = event.target.value;
            console.log(event.target.value);
            this.setState({actualQuestion});
            this.handleQuestion(event.target.value);
        }
        //HANDLE ANSWER UPDATE
        else{
            let index;
            //GET INDEX OF ANSWER TO BE STORED IN ARRAY
            if(typeof event.target.name[7] != "undefined"){
                index = event.target.name[6] + event.target.name[7]; 
            }
            else{
                index = event.target.name[6]; //get index of answer updated
            }
            const answers = this.state.answers;
            if(typeof answers[index] != "undefined"){
                answers[index] = event.target.value;
            }
            else{
                answers[index] = event.target.value;
            }
            console.log(answers[index]);
            console.log(index);
            //update state of answers array
            this.setState({answers});
        }
    }

    handleQuestion = (question) =>{
        const question1 = {
            question1: question
        }
        axios.post("http://localhost:5000/editAnswersFetch", {question1})
            .then(res =>{
                //FETCH Q_ID AND ANSWERS
                const q_id = res.data[res.data.length - 1];
                const answers = res.data;
                answers.pop();
                this.setState({answers});
                this.setState({q_id});
                //CREATE BOXES FOR ANSWERS DEPEDNING ON QUESTION SELECTED
                createAnswerBoxes(answers, this.handleChange);
            })
    }

    handleSubmit = (event) =>{
        event.preventDefault();
        const post = {
            answers : this.state.answers,
            actualQuestion: this.state.actualQuestion,
            q_id : this.state.q_id
        }
        axios.post("http://localhost:5000/updateQuestion", {post})
        .then(res => {
            console.log("COOL AID! ", res.data);
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
                                    <option id = {index + 1} value = {msg[0]} key = {index}>{msg[0]}</option>  
                                )}
                            </select>
                        </div>   
                    </div>
                    <div className = "field">
                        <label className = "label">Question:</label>
                        <input name = "actualQuestion" value = {this.state.actualQuestion} 
                        onChange = {this.handleChange} className = "input"/> 

                        
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