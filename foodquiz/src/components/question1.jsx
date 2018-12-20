import React, { Component } from 'react';

class question1 extends Component {
    state = {  }
    render() { 
        return (
            <React.Fragment>
                <span className = "question">What kind of food do you feel like eating?</span>
                <div className = "questionBox">
                    <div className = "options" onClick = {()=>this.props.handleOption(1)}>SALTY</div><br/><br/>
                    <div className = "options" onClick = {()=>this.props.handleOption(2)}>GREASY</div><br/> <br/>
                    <div className = "options" onClick = {()=>this.props.handleOption(3)}>SWEET</div><br/>
                </div>
            </React.Fragment>
          );
    }
}
 
export default question1;