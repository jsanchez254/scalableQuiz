import React, { Component } from 'react';
import axios from "axios";
import {Table} from "semantic-ui-react";
class DisplaySection extends Component {
    state = {
        info: ""
      }
    componentDidMount (){
        axios.get("http://localhost:5000/deleteSection")
            .then(res =>{
                let sections = res.data[0];
                let paths = res.data[1];
                let comments = res.data[2];
                let links = res.data[3];                
                const info = sections.map((value, index) => 
                    <React.Fragment>
                    <Table.Row>
                        <Table.Cell><span className = "questions1"><span className = "index1"></span>{value}</span></Table.Cell>
                        <Table.Cell>
                            {paths[index].map((answer, index) =>
                                <React.Fragment>
                                    <span className = "index1"></span> <span className = "answers1">{answer} <br/></span>  
                                </React.Fragment>
                            )}
                        </Table.Cell>
                        <Table.Cell>
                            {comments[index].map((answer, index) =>
                                <React.Fragment>
                                    <span className = "answers2">{answer} <br/></span>  
                                </React.Fragment>
                            )}
                        </Table.Cell>
                        <Table.Cell>
                            {links[index].map((answer, index) =>
                                <React.Fragment>
                                    <span className = "answers2">{answer} <br/></span>  
                                </React.Fragment>
                            )}
                        </Table.Cell>
                    </Table.Row>
                
                </React.Fragment>
                )
                this.setState({info});
            }
        )
    }
    render() { 
        return (
            <React.Fragment>
                <Table celled inverted selectable>
                    <Table.Header>
                        <Table.Row>
                            <Table.HeaderCell>SECTIONS</Table.HeaderCell>
                            <Table.HeaderCell>PATHS</Table.HeaderCell>
                            <Table.HeaderCell>COMMENTS</Table.HeaderCell>
                            <Table.HeaderCell>LINK</Table.HeaderCell>
                        </Table.Row>
                    </Table.Header>
                    <Table.Body>
                       {this.state.info}
                    </Table.Body>
                </Table>
            </React.Fragment>
          );
    }
}
 
export default DisplaySection;