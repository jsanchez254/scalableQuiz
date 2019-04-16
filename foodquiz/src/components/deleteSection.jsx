import React, { Component } from 'react';
import axios from "axios";
import {Link} from 'react-router-dom';
import {Icon} from "semantic-ui-react";
class deleteSection extends Component {
    state = {
        paths: [],
        descriptions: [],
        sections: [],
        deleteSection: ""
      }

    componentDidMount (){
        axios.get("http://localhost:5000/deleteSection")
        .then(res =>{
            const sections = res.data[0];
            const paths = res.data[1];
            const descriptions = res.data[2];
            this.setState({sections});
            this.setState({paths});
            this.setState({descriptions});

            const deleteSection = sections.map((value, index) => 
                <React.Fragment>
                    <div name = {(index + 1)}>
                        {value} 
                    </div>
                    <ul>
                        {paths[index].map((avalue, index) =>
                        <li>
                                {avalue}
                        </li> 
                        )}
                    </ul>
            </React.Fragment>
            )   
            this.setState({deleteSection});
        })
    }
    
    render() { 
        return (
            <React.Fragment>
                <div className = "columns">
                    <Link id = "deleteOption" to = "/deleteQuestion" className = "column is-6">
                        <span>Delete Question Information</span>
                    </Link>
                    <Link id = "deleteOption" to = "/deleteSection" className = "column is-6 activeDelete">
                        <span>Delete Section Information</span>
                    </Link>
                </div>
                {this.state.deleteSection}
                <hr/>
                <button className = "button is-danger">SUBMIT CHANGES</button>
            </React.Fragment>
          );
    }
}
 
export default deleteSection;