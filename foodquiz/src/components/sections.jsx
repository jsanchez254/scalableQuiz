import React, { Component } from 'react';
import Section from "./questions";
import axios from 'axios';
class Sections extends Component {
    state = {
        section: "",
        sections: []
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
        console.log("INDEX: ", index);
        const secID = {
            secID: index
        }
        axios.post("http://localhost:5000/postArrangeID", {secID})
        .then(res => {
            const section = <Section secID = {index}/>
            this.setState({section});
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
                {this.state.section}
            </React.Fragment>
          );
    }
}
 
export default Sections;