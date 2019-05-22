import React, { Component } from 'react';
import { Link} from 'react-router-dom';

import { Icon } from 'semantic-ui-react';
import {dropDown} from "../assets/js/deleteQuestion";
class NavBar extends Component {
    state = {  }
    render() { 
        return (
            <React.Fragment>
                <nav className = "navbar is-dark">
                    <div className = "navbar-end">
                        <Link  className = "navbar-item" to = "/sections">
                            <Icon name='object ungroup'  size = "large"/> <span>Sections</span>
                        </Link>                    
                        <Link  className = "navbar-item" to = "/questionOrder">
                            <Icon name='exchange'  size = "large"/><span>Manage Sections</span>
                        </Link>                    

                        <div className = "navbar-item has-dropdown is-hoverable" size = "2x">
                            <div className = "navbar-link">
                                <span id = "underline"><Icon name='info circle'  size = "large"/> <span>Current Information</span></span>
                            </div>

                            <div className = "navbar-dropdown">
                                <Link className = "navbar-item" to = "/currentInfo">
                                    <Icon name='question circle'  size = "large"/><span>Display Question</span>
                                </Link>
                                <Link className = "navbar-item" to = "/currentSection">
                                    <Icon name='object ungroup'  size = "large"/><span>Display Sections</span>
                                </Link>                               
                            </div>
                        </div>

                        <div className = "navbar-item has-dropdown is-hoverable" size = "2x" >
                            <div className = "navbar-link">
                                <span id = "underline"><Icon name='sitemap'  size = "large"/><span>Manage Questions/Paths</span></span>
                            </div>

                            <div className = "navbar-dropdown">
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