import React, { Component } from 'react';

class question2 extends Component {
    state = {  }
    render() { 
        return (
            <React.Fragment>
                <span className = "question">What proportion of this do you want?</span>
                <div className = "questionBox">
                    <div className = "options" onClick = {()=>this.props.handleOption(1)}>SMALL</div><br/><br/>
                    <div className = "options" onClick = {()=>this.props.handleOption(2)}>BIG</div><br/> <br/>
                    <div className = "options" onClick = {()=>this.props.handleOption(3)}>HUGE</div><br/>
                </div>
            </React.Fragment>
          );
    }
}
 
export default question2;