import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import _ from 'lodash';
import TestType from "./test-type";

class CourseTest extends Component {
    constructor() {
        super();
        this.state = { loaded: false, step: 'start' }

        this.startTest = this.startTest.bind(this);
    }

    componentWillMount() {
        this.setState( this.setUpLesson() );
    }

    setUpLesson() {
        const { title, slug } = this.props.match.params;
        const course = _.filter(this.props.courses, course => course.title === title);
        if (course.length === 0) return { loaded: false };

        const indexes = slug.split('-');
        const lessons = _.filter(course[0].lessons, lesson => _.indexOf(indexes, lesson.index) !== -1);
        if (lessons.length === 0) return { loaded: false };

        return { loaded: true, lessons };
    }

    startTest(type) {
        let questions = [];
        const { lessons } = this.state;
        _.each(lessons, lesson => questions = _.concat(questions, lesson.vocab));
        questions = _.shuffle(questions);
        this.setState({ questions, score: 0, count: questions.length, type });
    }

    onQuestionAnswer(correct) {
        const { questions, score } = this.state;
    }

    renderStartBlock() {
        return (<TestType startTest={this.startTest} />);
    }

    renderQuestionBlock() {
        const { questions, type, score, count } = this.state;
        return (<Question
            onClick={() => this.onQuestionAnswer}
            question={questions[0]}
            score
            count
            type
        />);
    }

    renderEndBlock() {

    }

    renderStepBlock() {
        if (this.state.questions === undefined) {
            return this.renderStartBlock();
        } else if (this.state.questions.length !== 0) {
            return this.renderQuestionBlock();
        } else {
            return this.renderEndBlock();
        }
    }

    render() {
        if (!this.state.loaded) {
            return (<p>Error loading. <Link to={`/`}>Back to home</Link>.</p>)
        }

        const { title } = this.props.match.params;
        const { lesson } = this.state;
        console.log(this.state.questions);

        return (
            <div>
                { this.renderStepBlock() }
                <p><Link to={`/`}>Home</Link> - <Link to={`/course/${title}`}>Back to course</Link></p>
            </div>
        )
    }
}

function mapStateToProps({ courses }) {
    return { courses }
}

export default connect(mapStateToProps)(CourseTest);