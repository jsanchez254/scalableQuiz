import React, { Component } from 'react';
import { Link} from 'react-router-dom';

import { Icon } from 'semantic-ui-react';

class NavBar extends Component {
    state = {  }
    render() { 
        return (
            <React.Fragment>
                <nav className = "navbar is-dark">
                    <div className = "navbar-end">
                        <Link  className = "navbar-item" to = "/quizQuestions">
                            <Icon name='question circle'  size = "large"/> <span>Answer Quiz</span>
                        </Link>
                        <Link  className = "navbar-item" to = "/postNewQuestion">
                            <Icon name='plus circle'  size = "large"/><span>Post Question/Path</span>
                        </Link>
                        <Link  className = "navbar-item" to = "/manageQuestion">
                            <Icon name='edit'  size = "large"/><span>Manage Question/Path</span>
                        </Link>
                    </div>
                </nav>
            </React.Fragment>
          );
    }
}
 
export default NavBar;