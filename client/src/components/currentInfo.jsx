import React, { Component } from 'react';
import axios from "axios";
import {Table} from "semantic-ui-react";
class currentInfo extends Component {
    state = {  
        questions: [],
        answers: [],
        directTo: [],
        created: 0,
        info: ""
    }
    componentDidMount(){
        axios.get("http://localhost:5000/fetchEverything")
        .then(res => {
            let temp = res.data;
            const questions = temp[0];
            const answers = temp[1];
            const directTo = temp[2];
            console.log("AQUI ", res.data);
            const created = 1;
            this.setState({created});
            this.setState({questions});
            this.setState({answers});
            this.setState({directTo});
            const info =  this.state.questions.map((msg, index) => 
                <React.Fragment>
                    <Table.Row>
                        <Table.Cell><span className = "questions1"><span className = "index1">{index + 1} -</span>{msg}</span></Table.Cell>
                        <Table.Cell>
                            {this.state.answers[index].map((answer, index) =>
                                <React.Fragment>
                                    <span className = "index1"></span> <span className = "answers1">{answer} <br/></span>  
                                </React.Fragment>
                            )}
                        </Table.Cell>
                        <Table.Cell>
                            {this.state.directTo[index].map((answer, index) =>
                                <React.Fragment>
                                    <span className = "answers2">{answer} <br/></span>  
                                </React.Fragment>
                            )}
                        </Table.Cell>
                    </Table.Row>
                
                </React.Fragment>
            )
            this.setState({info});
        })
    }
    render() { 
        return ( 
            <React.Fragment>
                <div class="block">
                    <Table celled inverted selectable>
                        <Table.Header>
                            <Table.Row>
                                <Table.HeaderCell>QUESTIONS</Table.HeaderCell>
                                <Table.HeaderCell>ANSWERS</Table.HeaderCell>
                                <Table.HeaderCell>DIRECT TO</Table.HeaderCell>
                            </Table.Row>
                        </Table.Header>
                        <Table.Body>
                            {this.state.info}
                        </Table.Body>
                    </Table>
                </div>                             
            </React.Fragment>
         );
    }
}
 
export default currentInfo;