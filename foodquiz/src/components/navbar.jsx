import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';

class NavBar extends Component {
    state = {  }
    render() { 
        return (
            <React.Fragment>
                <nav className = "navbar is-primary">
                    <div className = "navbar-end">
                        <Link  className = "navbar-item" to = "/quizQuestions">
                            <span>Answer Quiz</span>
                        </Link>
                        <Link  className = "navbar-item" to = "/postNewQuestion">
                            <span>Post Question</span>
                        </Link>
                    </div>
                </nav>
            </React.Fragment>
          );
    }
}
 
export default NavBar;