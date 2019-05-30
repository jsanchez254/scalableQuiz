import React, { Component } from 'react';
import axios from "axios";
import {Link} from 'react-router-dom';

// import {deleteOptions} from "../assets/js/deleteQuestion";
import {Icon, Transition} from "semantic-ui-react";
import {deleteQuestion, deleteAnswer, accordion, getDeleteContent} from "../assets/js/deleteQuestion";
class DeleteQuestion extends Component {
    state = {
        questions: [],
        answers: [],
        qid: [],
        deleteSection: "please work",
        visible: true,
        questionDeleted: ""
      }

    toggleVisibility = () => this.setState(prevState => ({visible: !prevState.visible}))

    //WILL MAKE SUBMIT REQUEST WHEN WE DELETE WHAT WE WANT FROM QUESTIONS AND ANSWERS
    handleSubmit = () =>{
        const content = getDeleteContent();
        axios.post("http://localhost:5000/deleteQA", {content})
        .then(res =>{
            this.setState({questionDeleted: res.data});
            this.toggleVisibility();
        })
    }
    
    componentDidMount(){
        axios.get("http://localhost:5000/fetchEverything")
        .then(res => {
                const questions = res.data[0];
                const answers = res.data[1];            
                const q_id = res.data[3];
                this.setState({q_id})
                this.setState(questions);
                this.setState(answers);
                const deleteSection = questions.map((value, index) => 
                    <React.Fragment>
                        <div id = "deleteParent">
                            <div className = "questionsParent" name = {q_id[index]}>
                                {value} 
                                <Icon onClick = {(event) => accordion(event)}  className = "questionContent" name = "angle down"/>
                                <Icon onClick = {(event) => deleteQuestion(event)} value = {index} id = "deleteIcon" name = "close icon"/>
                            </div>
                            <ul className = "answersParent">
                                {answers[index].map((avalue, index) =>
                                <li className = "childElement" name = {index + 1}>
                                        {avalue} <Icon onClick = {(event) => deleteAnswer(event)} value = {index} id = "deleteIconAns" name = "close icon"/>
                                </li> 
                                )}
                            </ul>
                        </div>
                    </React.Fragment>
                )
                this.setState({deleteSection})
            }
        )
    }
    render() { 
        return (
            <React.Fragment>
                <div className = "columns">
                    <Link id = "deleteOption" to = "/deleteQuestion" className = "column is-6 activeDelete">
                        <span>Delete Question Information</span>
                    </Link>
                    <Link id = "deleteOption" to = "/deleteSection" className = "column is-6">
                        <span>Delete Section Information</span>
                    </Link>

                </div>
                {this.state.deleteSection}
                <hr/>
                <button onClick =  {()=> {this.handleSubmit()}} className = "button is-danger">SUBMIT CHANGES</button>
                <Transition animation = "pulse" duration = "1000" visible = {this.state.visible}>
                        <h1 id = "postNewQuestion"><br/>{this.state.questionDeleted}</h1>
                </Transition>
            </React.Fragment>
          );
    }
}
 
export default DeleteQuestion;