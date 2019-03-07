import React, { Component } from 'react';
import axios from "axios";
class currentInfo extends Component {
    state = {  
        questions: [],
        answers: [],
        created: 0,
        info: ""
    }

    componentDidMount(){
        axios.get("http://localhost:5000/fetchEverything")
        .then(res => {
            let temp = res.data;
            const questions = temp[0];
            const answers = temp[1];
            console.log(answers);
            const created = 1;
            this.setState({created});
            this.setState({questions});
            this.setState({answers});
            const info =  this.state.questions.map((msg, index) => 
                <React.Fragment>
                    <tr>
                        <td><span className = "questions1">{msg}</span></td>
                        <td>
                            {this.state.answers[index].map((answer, index) =>
                                <React.Fragment>
                                    <span className = "index1">{index + 1} -</span> <span className = "answers1">{answer} <br/></span>  
                                </React.Fragment>
                            )}
                        </td>
                    </tr>
                
                </React.Fragment>
            )
            this.setState({info});
        })
    }
    render() { 
        return ( 
            <React.Fragment>
                <div class="block">
                    <table class="table is-striped is-fullwidth">
                        <thead>
                            <tr>
                                <th className = "title1">QUESTIONS</th>
                                <th className = "title1">ANSWERS</th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.state.info}
                        </tbody>
                    </table>
                </div>                             
            </React.Fragment>
         );
    }
}
 
export default currentInfo;