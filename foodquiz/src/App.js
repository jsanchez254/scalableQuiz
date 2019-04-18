import React, { Component } from 'react';

import {
  BrowserRouter as Router,
  Route
} from 'react-router-dom';

//IMPORT CSS
import "./assets/css/questionary.css";
import "./assets/css/deleteQA.css";

//IMPORT SEMANTIC UI
import { Container } from 'semantic-ui-react'

//IMPORT COMPONENTS
import Questions from "./components/questions";
import postNewQuestion from "./components/postNewQuestion";
import NavBar from './components/navbar';
import EditQuestion from "./components/editQuestion";
import currentInfo from './components/currentInfo';
import QuestionOrder from "./components/arrangeQuestions";
import Sections from "./components/sections";
import DeleteQuestion from "./components/deleteQuestion";
<<<<<<< HEAD
=======
import DeleteSection from "./components/deleteSection";
>>>>>>> b8d48936083b55f5a850ee79ee8db9edb6e11bd8

class App extends Component {
  render() {
    return (
      <React.Fragment>
          <Router>
            <div>
              <Route path = "/" component = {NavBar}/>
              <Container>
                <br/>
                <Route exact path  = {['/sections', '/']} component = {Sections}/>
                <Route path = "/quizQuestions" component = {Questions}/>
                <Route path = "/postNewQuestion" component = {postNewQuestion} />
                <Route path = "/questionOrder" component = {QuestionOrder} />
                <Route path = "/manageQuestion" component = {EditQuestion} />
                <Route path = "/currentInfo" component = {currentInfo} />
                <Route path = "/deleteQuestion" component = {DeleteQuestion}/>
<<<<<<< HEAD
=======
                <Route path = "/deleteSection" component = {DeleteSection}/>
>>>>>>> b8d48936083b55f5a850ee79ee8db9edb6e11bd8
              </Container>
            </div>
          </Router>
      </React.Fragment>
    );
  }
}

export default App;
