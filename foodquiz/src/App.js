import React, { Component } from 'react';

import {
  BrowserRouter as Router,
  Route
} from 'react-router-dom';

//IMPORT CSS
import "./assets/css/questionary.css";

//IMPORT SEMANTIC UI
import { Container } from 'semantic-ui-react'

//IMPORT COMPONENTS
import Questions from "./components/questions";
import postNewQuestion from "./components/postNewQuestion";
import NavBar from './components/navbar';
import EditQuestion from "./components/editQuestion";
import CurrentQuestion from "./components/currentInfo";
import currentInfo from './components/currentInfo';

class App extends Component {
  render() {
    return (
      <React.Fragment>
          <Router>
            <div>
              <Route path = "/" component = {NavBar}/>
              <Container>
                <br/>
                <Route exact path  = {['/quizQuestions', '/']} component = {Questions}/>
                <Route path = "/postNewQuestion" component = {postNewQuestion} />
                <Route path = "/manageQuestion" component = {EditQuestion} />
                <Route path = "/currentInfo" component = {currentInfo} />
              </Container>
            </div>
          </Router>
      </React.Fragment>
    );
  }
}

export default App;
