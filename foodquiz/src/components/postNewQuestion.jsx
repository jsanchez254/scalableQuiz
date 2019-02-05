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
                    {this.state.questions.map((question, index) => {
                            
                            return (<React.Fragment>
                                        <h1> {question} </h1>
                                        <ul>
                                            {this.handleAnswer()}
                                            <li>{this.state.answers[this.getAnswer() + 1]}</li>
                                            <li>{this.state.answers[0]}</li>
                                            <li>{this.state.answers[this.getAnswer() + 3]}</li>
                                        </ul>
                                    </React.Fragment>);
                        }
                    )}
                </div>
            </React.Fragment>
          );
    }
}
 
export default newQuestion;