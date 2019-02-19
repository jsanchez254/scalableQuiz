import React, { Component } from 'react';
import axios from "axios";

import {donefunc, finalResults, restart} from "../assets/js/questionLogic.js"

//IMPORT COMPONENTS
import FinalResult from "./finalResult";

//IMPORT JS FILES
import {optionHandler} from "../assets/js/questionLogic.js"

class questions extends Component {
    state = {
        question: "",
        answers: [],
        counter1: 1,
        path: ""
      }
    ///********MOUNT YET AGAIN************/
  moungAgain = () => {
    axios.get("http://localhost:5000/fetchQuestion")
    .then(res => {
      let temp = res.data;
      temp = temp[0];
      temp = temp[0];
      const question = temp;
      this.setState({question});
    })
    axios.get("http://localhost:5000/fetchAnswers")
    .then(res => {
      let temp = res.data;
      const answers = temp;
      this.setState({answers});
    })
  }
  ///********************************/

  componentDidMount(){
    axios.get("http://localhost:5000/fetchQuestion")
      .then(res => {
        let temp = res.data;
        temp = temp[0];
        temp = temp[0];
        const question = temp;
        this.setState({question});
      })

    axios.get("http://localhost:5000/fetchAnswers")
    .then(res => {
      let temp = res.data;
      const answers = temp;
      this.setState({answers});
    })

    }

    //will be triggered everytime we click next
    handleNextCounter = (value) =>{
        //UPDATE PATH
        const path = this.state.path + value;
        this.setState({path});

        console.log("THIS PATH WORKS!! ", path);

        this.handleOption(value);
        const counter1 = this.state.counter1 + 1;
        this.setState({counter1})
        console.log("HELLO", this.state.counter1);
        const counter = {
        counter : this.state.counter1
        };
        axios.post("http://localhost:5000/fetchQuestion", {counter})
        .then(res => {
            let temp = res.data;
            temp = temp[0];
            temp = temp[0];
            const question = temp;
            this.setState({question});
        })

        axios.post("http://localhost:5000/fetchAnswers", {counter})
        .then(res => {
        let temp = res.data;
        const answers = temp;
        this.setState({answers});
        })

        if(this.state.counter1 === 1){
        donefunc();
        }

    }

  //will be triggered when we call submit!
  handleFinalResults = () =>{
    const counter = 0;
    this.setState({counter})
    this.moungAgain();

    const path = this.state.path;

    axios.post("http://localhost:5000/returnOutcome", {path})
    .then(res => {
      finalResults(res.data);
      console.log(res.data);
    })
  }

  //will be triggered when we click again
  handleRestart = () =>{
    //SET COUNTER EQUAL TO WHAT IT USED TO BE
    const counter1 = 1;
    this.setState({counter1});
    restart();
  }

  handleOption = (answer) =>{
    optionHandler(answer);
  }

    render() { 
        return ( 
            <React.Fragment>
                <center><h1 className = "title">ANSWER THIS QUIZ FIND WHAT KIND OF FOOD YOU FEEL 
                LIKE EATING <br/>BASED ON JESUS' RECOMMENDATION</h1></center>
                <div className = "questionary">
                  <div className = "columns">
                      <div className = "column is-8 is-offset-2">
                        <div className = "box has-text-centered">
                          <div className = "questionBox">
                              {/* RENDERED AS COUNTER PROCEEDS AND FETCHES DIFFERENT QUESTIOS AND ANSWERS FROM BACKEND */}
                              <div id = "temp">
                                  <span className = "question">{this.state.question}</span>
                                  {this.state.answers.map((msg, index) => 
                                  <div className = "options" onClick = {()=>this.handleNextCounter(index + 1)}>{msg[0]}</div>)}
                              </div>
                              {/* OUTPUT OF PATH  */}
                              <div id = "finalResult"><FinalResult/></div>
                          </div>
                          <div className = "column is-2 is-offset-10">
                              <div id = "again">                   
                                  <button className = "button is-warning" onClick =  {()=> this.handleRestart()}>AGAIN?</button>
                              </div>
                              <div id = "done">
                                  <button className = "button is-danger" onClick = {() => this.handleFinalResults()}>DONE</button>
                              </div>
                          </div>
                        </div>
                      </div>
                  </div>
                </div>
            </React.Fragment>
         );
    }
}
 
export default questions;