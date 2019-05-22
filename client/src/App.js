import React, { Component } from 'react';

import {
  BrowserRouter as Router,
  Route
} from 'react-router-dom';

//IMPORT CSS
import "./assets/css/questionary.css";
import "./assets/css/deleteQA.css";
import "./assets/css/sectionEdit.css";

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
import DeleteSection from "./components/deleteSection";
import DisplaySection from "./components/displaySections";

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
                <Route path = "/deleteSection" component = {DeleteSection}/>
                <Route path = "/currentSection" component = {DisplaySection}/>
              </Container>
            </div>
          </Router>
      </React.Fragment>
    );
  }
}

export default App;
