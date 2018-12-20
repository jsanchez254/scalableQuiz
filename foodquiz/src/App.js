import React, { Component } from 'react';
import axios from "axios";


//IMPORT CSS
import "./assets/css/questionary.css";

//IMPORT SEMANTIC UI
import { Container, Icon } from 'semantic-ui-react'

//IMPORT COMPONENTS
import Q1 from "./components/question1";
import Q2 from "./components/question2";
import FinalResult from "./components/finalResult";

//IMPORT JAVASCRIPT
import {counter1, optionHandler, finalResults, restart, donefunc} from "./assets/js/questionLogic.js"

class App extends Component {
  state = {
    question: "",
    answers: [],
    counter: 0
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
  ///********MOUNT YET AGAIN************/

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

  handleNextCounter = (value) =>{
    this.handleOption(value)
    this.setState({counter: this.state.counter++})
    console.log("HELLO", this.state.counter);
    const counter = {
      counter : this.state.counter
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

    if(this.state.counter == 1){
      donefunc();
    }

  }

  handleCounter = (position) =>{
    counter1(position);
  }

  handleOption = (answer) =>{
    optionHandler(answer);
  }

  handleFinalResults = () =>{
    const counter = 0;
    this.setState({counter})
    this.moungAgain();
    finalResults();
  }

  handleRestart = () =>{
    restart();
  }

  render() {
    return (
      <React.Fragment>
          <Container>
            <center><h1 className = "title">ANSWER THIS QUIZ FIND WHAT KIND OF FOOD YOU FEEL LIKE EATING <br/>BASED ON JESUS' RECOMMENDATION</h1></center>
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
                    </div>

                        <div id = "finalResult"><FinalResult/></div>
                        <div className = "columns">
                          <div className = "column is-4">
                            {/* <div className = "buttons">
                              <button className = "button is-success" onClick = {() =>this.handleCounter("PREVIOUS")}><Icon name = "arrow alternate circle left" /></button>
                              <button className = "button is-success" onClick = {() =>this.handleCounter("NEXT")}><Icon name = "arrow alternate circle right" /></button>
                            </div> */}
                          </div>
                          <div className = "column is-2 is-offset-6">
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
              </div>
          </Container>
      </React.Fragment>
    );
  }
}

export default App;
