import React, { Component } from 'react';
import majoras from "../assets/img/burrito.jpg";

class finalResult extends Component {
    state = {
        img: majoras
      }
    render() { 
        return (  
            <React.Fragment>
                <img alt = "" id = "imagen" src = {this.state.img}/>
            </React.Fragment>
        );
    }
}
export default finalResult;