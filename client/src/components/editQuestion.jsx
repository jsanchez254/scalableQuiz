import React, { Component } from 'react';
import axios from "axios";

//IMPORT JS
import {createAnswerBoxes} from "../assets/js/addMoreAnswers";

class EditQuestion extends Component {
    state = {
        questions: [], // will store all questions that display on drop down menu
        answers: [],    //will store answers that are fetched when questions is selected
        directTo: [], //will store directTo paths to be edited
        actualQuestion: "", //will store question selected from dropdown menu
        q_id: ""    //will store id of question selected
      }
    
    handleAnswersAndDirect = (name, value) =>{
        //handle whether we are talking about direct to input or answer input
        var option = 1;
        if(name[0] === 'o'){
            option = 0;
        }
            const answers = this.state.answers;
            const directTo = this.state.directTo;
            let index = name[6]; //get index of answer updated
            //FOR ANSWER ARRAY THAT WILL BE POSTED
            //if answer index does not exist then push it into the array
            if(typeof answers[index] === "undefined" && name !== "postQuestion"){
                if(option === 1){
                    answers.push(value);
                }
                else{
                    directTo.push(value);
                }
            }
            else{
                if(option === 1){
                    answers[index] = value;
                }
                else{
                    directTo[index] = value;
                }
            }
            this.setState({answers});
            this.setState({directTo});
    }

    handleChange = (event) =>{
        this.setState({[event.target.name] : event.target.value});

        //HANDLES QUESTION UPDATE
        console.log(event.target.value);
        if(event.target.name === "question"){
            const actualQuestion = event.target.value;
            console.log(event.target.value);
            this.setState({actualQuestion});
            this.handleQuestion(event.target.value);
        }
        //HANDLE ANSWER UPDATE
        else{
            this.handleAnswersAndDirect(event.target.name, event.target.value);
        }
    }

    handleQuestion = (question) =>{
        const question1 = {
            question1: question
        }
        axios.post("http://localhost:5000/editAnswersFetch", {question1})
            .then(res =>{
                //FETCH Q_ID AND ANSWERS
                const q_id = res.data[1];
                const answers = res.data[0];
                const directTo = res.data[2];
                console.log(res.data);
                answers.pop();
                this.setState({directTo});
                this.setState({answers});
                this.setState({q_id});
                //CREATE BOXES FOR ANSWERS DEPEDNING ON QUESTION SELECTED
                createAnswerBoxes(answers, this.handleChange, directTo);
            })
    }

    handleSubmit = (event) =>{
        event.preventDefault();
        const post = {
            answers : this.state.answers,
            directTo : this.state.directTo,
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
                <h1 className = "title">EDIT QUESTION:</h1>
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
                    <center><h1>ANSWERS...</h1></center><br/>
                    <div className = "columns" id = "editQuestion">
                        <div className = "column is-6">
                            <div id = "answerBox" className = "field">
                                {/* HERE A BUNCH OF ELEMENTS WILL BE CREATED WITH DOM MANIPULATION */}
                            </div>
                        </div>
                        <div className = "column is-6">
                            <div id = "directToBox" className = "field">
                                {/* HERE A BUNCH OF ELEMENTS WILL BE CREATED WITH DOM MANIPULATION */}
                            </div>           
                        </div>
                    </div>
                    <div className = "field">
                        <button className = "button is-success">EDIT!</button>
                    </div>
                </form>
                <h1 className = "title">EDIT PATH:</h1>
            </React.Fragment>
          );
    }
}
 
export default EditQuestion;