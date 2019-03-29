import React, { Component } from 'react';
import axios from 'axios';

import {Redirect} from 'react-router-dom';

class Sections extends Component {
    state = {
        section: "",
        sections: [],
        Link: ""
      }

    componentDidMount (){
        axios.get("http://localhost:5000/fetchSectionNames")
        .then(res =>{
            const sections = res.data;
            this.setState({sections});
            console.log(this.state.sections);
        })
    }
      

    handleSectionID = (index) =>{
        // restart();
        const secID = {
            secID: index
        }
        axios.post("http://localhost:5000/postArrangeID", {secID})
        .then(res => {
            // const section = <Section secID = {index} secName = {this.state.sections[index-1]}/>
            // this.setState({section});
            const Link = (<Redirect to = "/quizQuestions"/>)
            this.setState({Link});
            console.log(res.data);
        })
    }

    render() { 
        return (
            <React.Fragment>
                <div className = "columns is-multiline">
                    {this.state.sections.map((msg, index) => {
                            return(
                                <div className = "column is-3">
                                    <button  className = "sections" onClick = {()=> this.handleSectionID(index + 1)}>{msg}</button>
                                </div>
                            );
                            }
                        )
                    }
                </div>
                {this.state.Link}
                {/* {this.state.section} */}
            </React.Fragment>
          );
    }
}
 
export default Sections;