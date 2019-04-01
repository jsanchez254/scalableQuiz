import React, { Component } from 'react';
import axios from "axios";

// import {deleteOptions} from "../assets/js/deleteQuestion";
import {Icon} from "semantic-ui-react";
import {deleteQuestion, deleteAnswer, accordion} from "../assets/js/deleteQuestion";
class DeleteQuestion extends Component {
    state = {
        questions: [],
        answers: [],
        deleteSection: "please work"
      }

    //WILL MAKE SUBMIT REQUEST WHEN WE DELETE WHAT WE WANT FROM QUESTIONS AND ANSWERS
    handleSubmit = () =>{
        axios.post("http://localhost:5000/deleteQA")
        .then(res =>{
            console.log(res.data);
        })
    }
    
    componentDidMount(){
        axios.get("http://localhost:5000/fetchEverything")
        .then(res => {
                const questions = res.data[0];
                const answers = res.data[1];
                this.setState(questions);
                this.setState(answers);
                console.log(questions);
                const deleteSection = questions.map((value, index) => 
                    <div id = "deleteParent">
                        <div className = "questionsParent" name = {"QContent" + index}>
                            {value} 
                            <Icon onClick = {(event) => accordion(event)}  className = "questionContent" name = "angle down"/>
                            <Icon onClick = {(event) => deleteQuestion(event)} value = {index} id = "deleteIcon" name = "close icon"/>
                        </div>
                        <ul className = "answersParent">
                            {answers[index].map((avalue, index) =>
                               <li className = "childElement">
                                    {avalue} <Icon onClick = {(event) => deleteAnswer(event)} value = {index} id = "deleteIconAns" name = "close icon"/>
                               </li> 
                            )}
                        </ul>
                    </div>
                )
                this.setState({deleteSection})
            }
        )
    }
    render() { 
        return (
            <React.Fragment>
                <h1 className = "title">DELETE QUESTION:</h1>
                {this.state.deleteSection}
                <hr/>
                <button onClick =  {()=> {this.handleSubmit()}} className = "button is-danger">SUBMIT CHANGES</button>
            </React.Fragment>
          );
    }
}
 
export default DeleteQuestion;