import React, { Component } from 'react';
import Section from "./questions";
class Sections extends Component {
    state = {
        section: "",
        sections: []
      }

      

    handleSectionID = () =>{
        const section = <Section id = {1}/>
        this.setState({section});
    }

    render() { 
        return (
            <React.Fragment>
                <h1>TESTING</h1>
                <button onClick = {()=> this.handleSectionID()}>APPEAR</button>
                {this.state.section}
            </React.Fragment>
          );
    }
}
 
export default Sections;