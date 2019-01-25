import React, { Component } from 'react';
import axios from "axios";
import FetchQ from "./fetchQuestions.jsx";

class newQuestion extends Component {
    state = {
        path: "",
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
            console.log(temp);
        })
    }

    render() { 
        return (
            <React.Fragment>
                <div>
                    
                </div>
            </React.Fragment>
          );
    }
}
 
export default newQuestion;