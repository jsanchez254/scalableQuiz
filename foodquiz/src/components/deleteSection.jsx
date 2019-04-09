import React, { Component } from 'react';
import axios from "axios";
import {Link} from 'react-router-dom';

class deleteSection extends Component {
    state = {
        paths: [],
        descriptions: [],
        sections: []
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
        })
    }
    
    render() { 
        return (
            <React.Fragment>
                <div className = "columns">
                    <Link id = "deleteOption" to = "/deleteQuestion" className = "column is-6">
                        <span>Delete Question Information</span>
                    </Link>
                    <Link id = "deleteOption" to = "/deleteSection" className = "column is-6">
                        <span>Delete Section Information</span>
                    </Link>
                </div>
            </React.Fragment>
          );
    }
}
 
export default deleteSection;