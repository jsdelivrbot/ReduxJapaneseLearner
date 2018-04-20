import React, { Component } from 'react';

class PreviousAnswer extends Component {
    render() {
        const { expected, answer, valid } = this.props;

        if (expected === undefined) return (<p>No previous question.</p>);

        const className = valid ? 'text-success' : 'text-danger';
        return(
            <p className={className}>Answer : {answer} - Expected : {expected}.</p>
        );
    }
}

export default PreviousAnswer;