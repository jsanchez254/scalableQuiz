import React, { Component } from 'react';
import axios from "axios";

class EditQuestion extends Component {
    state = {
        questions: [],
        answers: [],
        actualQuestion: ""
      }


    handleChange = (event) =>{
        this.setState({[event.target.name] : event.target.value});
        //HANDLES CASE WHEN WE SELECT SOMETHING TO EDIT
        if(event.target.name == "question"){
            const actualQuestion = event.target.value;
            console.log(event.target.value);
            this.setState({actualQuestion});
            this.handleQuestion(event.target.value);
        }
    }

    handleQuestion = (question) =>{
        const question1 = {
            question1: question
        }
        axios.post("http://localhost:5000/editAnswersFetch", {question1})
            .then(res =>{
                const answers = res.data;
                this.setState({answers});
                console.log(res.data);
            })
    }

    handleSubmit = () =>{
        const post = {
            answers : this.state.answers
        }
        axios.post("http://localhost:5000/updateQuestion", {post})
        .then(res => {
            console.log(res.data);
        })
    }

    componentDidMount(){
        axios.get("http://localhost:5000/getAllQuestions" )
        .then(res => {
            const questions = res.data;
            this.setState({questions});
            console.log("do something!");
            console.log(res.data);
        })
    }
      
    render() { 
        return (
            <React.Fragment>
                <h1 className = "title">MANAGE QUESTION/PATH</h1>
                <form onSubmit = {this.handleSubmit} className = "box">  
                    <div className = "field">            
                        <label className = "label">Pick Question to Edit: </label>
                        <div className = "select">
                            <select name = "question" onChange = {this.handleChange}>
                                <option>Edit Question</option>
                                {this.state.questions.map((msg, index) => 
                                    <option value = {msg[0]} key = {index}>{msg[0]}</option>  
                                )}
                            </select>
                        </div>   
                    </div>
                    <div className = "field">
                        <label className = "label">Question:</label>
                        <input value = {this.state.actualQuestion} className = "input"/> 
                    </div>
                    <div className = "field">
                        <label className = "label">Answer 1:</label>
                        <input value = {this.state.answers[0]} className = "input"/> 
                    </div>
                    <div className = "field">
                        <label className = "label">Answer 2:</label>
                        <input value = {this.state.answers[1]} className = "input"/> 
                    </div>
                    <div className = "field">
                        <label className = "label">Answer 3:</label>
                        <input value = {this.state.answers[2]} className = "input"/> 
                    </div>
                    <field>
                        <button className = "button is-success">EDIT!</button>
                    </field>
                </form>
            </React.Fragment>
          );
    }
}
 
export default EditQuestion;