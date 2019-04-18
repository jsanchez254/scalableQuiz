import React, { Component } from 'react';
import { Link} from 'react-router-dom';

import { Icon } from 'semantic-ui-react';
import {dropDown} from "../assets/js/deleteQuestion";
class NavBar extends Component {
    state = {  }
    render() { 
        return (
            <React.Fragment>
                <nav className = "navbar is-success">
                    <div className = "navbar-end">
                        <Link  className = "navbar-item" to = "/sections">
                            <Icon name='book'  size = "large"/> <span>Sections</span>
                        </Link>
                        <Link  className = "navbar-item" to = "/currentInfo">
                            <Icon name='info circle'  size = "large"/> <span>Current Info</span>
                        </Link>
                        <Link  className = "navbar-item" to = "/questionOrder">
                            <Icon name='exchange'  size = "large"/><span>Manage Sections</span>
                        </Link>

                        <div className = "navbar-item has-dropdown is-hoverable" size = "2x" onClick = {() => dropDown()} >
                            <div className = "navbar-link">
                                <span id = "underline"><Icon name='sitemap'  size = "large"/><span>Manage Questions/Paths</span></span>
                            </div>

                            <div className = "navbar-dropdown" id = "dropMenu">
                                <Link className = "navbar-item" to = "/manageQuestion">
                                    <Icon name='edit'  size = "large"/><span>Edit Question/Path</span>
                                </Link>
                                <Link className = "navbar-item" to = "/postNewQuestion">
                                    <Icon name='plus circle'  size = "large"/><span>Post Question/Path</span>
                                </Link>
                                <Link className = "navbar-item" to = "/deleteQuestion">
                                    <Icon name='minus circle'  size = "large"/><span>Delete Question/Path</span>
                                </Link>
                            </div>
                        </div>
                    </div>
                </nav>
            </React.Fragment>
          );
    }
}
 
export default NavBar;