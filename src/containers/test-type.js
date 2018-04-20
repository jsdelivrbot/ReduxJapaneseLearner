import React, { Component } from 'react';

class TestType extends Component {
    render() {
        return(
            <div>
                <button
                    onClick={() => this.props.startTest('eto')}
                    type="button"
                    className="btn btn-primary"
                >English to romaji.</button>
                <br /><br />
                <button
                    onClick={() => this.props.startTest('kto')}
                    type="button"
                    className="btn btn-primary"
                >Kanji (kana) to english.</button>
                <br /><br />
            </div>
        );
    }
}

export default TestType;