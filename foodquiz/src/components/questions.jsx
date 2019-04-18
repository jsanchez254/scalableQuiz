import React, { Component } from 'react';
import axios from "axios";

import {donefunc, finalResults, restart} from "../assets/js/questionLogic.js"

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
    axios.get("http://localhost:5000/fetchAnswerAndQuestion")
      .then(res => {
        console.log(res.data);
        const answers = res.data[1];
        this.setState({answers});
        const question = res.data[0];
        this.setState({question});
      })
  }
  ///********************************/

  componentDidMount(){
      axios.get("http://localhost:5000/fetchAnswerAndQuestion")
      .then(res => {
        console.log(res.data);
        const answers = res.data[1];
        this.setState({answers});
        const question = res.data[0];
        this.setState({question});
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
       
        const counter = {
          answerNum : value
        };

        axios.post("http://localhost:5000/fetchAnswerAndQuestion", {counter})
        .then(res =>{
          console.log(res.data);
          const answers = res.data[1];
          this.setState({answers});
          const question = res.data[0];
          this.setState({question});
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
      //RESTART PATH VALUE
      this.setState({path: ""});
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
                <center><h1 className = "title">{this.props.secName}</h1></center>
                <div className = "questionary">
                  <div className = "columns">
                      <div className = "column is-8 is-offset-2">
                        <div className = "box has-text-centered">
                          <div className = "questionBox">
                              {/* RENDERED AS COUNTER PROCEEDS AND FETCHES DIFFERENT QUESTIOS AND ANSWERS FROM BACKEND */}
                              <div id = "temp">
                                  <span className = "question">{this.state.question}</span>
                                  {this.state.answers.map((msg, index) => 
                                  <div key = {index} className = "options" onClick = {()=>this.handleNextCounter(index + 1)}>{msg[0]}</div>)}
                              </div>
                              {/* OUTPUT OF PATH  */}
<<<<<<< HEAD
                              <a href = "blank" id = "finalResult">{""}</a>
=======
                              <div id = "finalResult">
                                <span id = "textOutput"></span><br/>
                                <a href = "blank" id = "linkOutput">{""}</a>
                              </div>
>>>>>>> b8d48936083b55f5a850ee79ee8db9edb6e11bd8
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