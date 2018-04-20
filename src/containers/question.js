import React, { Component } from 'react';

class Question extends Component {
    constructor(props) {
        super(props);
        this.state = { value: '' };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        this.setState({ value: event.target.value });
    }

    handleSubmit(event) {
        event.preventDefault();
        const {value} = this.state;
        this.setState({ value: '' });
        this.props.onSubmit(value);
    }

    getQuestionText(question, type) {
        let text;
        switch(type) {
            case 'kte':
                text = question.kanji === '' ?
                    question.syllabies :
                    question.kanji + " - " + question.syllabies
                ;
                break;
            default:
                text = question.english;
        }
        return (<span>{text}</span>)
    }

    render() {
        const { question, score, count, type, index } = this.props;

        return(
            <form onSubmit={this.handleSubmit}>
                <p>{this.getQuestionText(question, type)}</p>
                <input className={"form-control"} type={"text"} placeholder={"response"} value={this.state.value} onChange={this.handleChange} />
                <br />
                <input type="submit" value={"Submit"} className="btn btn-primary" />
                <br />
                <p>Sore: {score} - {index}/{count}</p>
                <br />
            </form>
        );
    }
}

export default Question;