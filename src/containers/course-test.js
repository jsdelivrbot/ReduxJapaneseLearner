import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import _ from 'lodash';

import PreviousAnswer from './previous-answer';
import TestType from './test-type';
import Question from './question';

class CourseTest extends Component {
    constructor() {
        super();
        this.state = {};

        this.startTest = this.startTest.bind(this);
        this.onQuestionAnswer = this.onQuestionAnswer.bind(this);
    }

    componentWillMount() {
        this.setState( this.setUpLesson() );
    }

    setUpLesson() {
        const { title, slug } = this.props.match.params;
        const course = _.filter(this.props.courses, course => course.title === title);
        if (course.length === 0) return {};

        const indexes = slug.split('-');
        const lessons = _.filter(course[0].lessons, lesson => _.indexOf(indexes, lesson.index) !== -1);
        if (lessons.length === 0) return {};

        return { lessons };
    }

    startTest(type) {
        const index = 1;
        let questions = [];
        const { lessons } = this.state;
        _.each(lessons, lesson => questions = _.concat(questions, lesson.vocab));
        questions = _.shuffle(questions);
        this.setState({ questions, score: 0, count: questions.length, type, index });
    }

    onQuestionAnswer(answer) {
        let { questions, score, index, type } = this.state;
        const question = questions[0];
        const expected = type === 'etr' ? question.romaji : question.english;
        const valid = this.answerCheck(question, type, answer);
        if (valid) score++;

        index++;
        questions = _.takeRight(questions, questions.length - 1);
        this.setState({ questions, score, index, answer, expected, valid });
    }

    answerCheck(question, type, value) {
        return (type === 'etr' && question.romaji === value)
            || (type === 'kte' && question.english === value)
            ;
    }

    renderStartBlock() {
        return (<TestType startTest={this.startTest} />);
    }

    renderQuestionBlock() {
        const { expected, answer, valid,
            questions, type, score, count, index } = this.state;
        return (
            <div>
                <Question
                    onSubmit={this.onQuestionAnswer}
                    question={questions[0]}
                    score={score}
                    count={count}
                    index={index}
                    type={type}
                />
                <PreviousAnswer
                    expected={expected}
                    answer={answer}
                    valid={valid}
                />
            </div>
        );
    }

    renderEndBlock() {
        const { expected, answer, valid, score, count } = this.state;
        return(
                <div>
                <p>Score : {score}/{count}</p>
                <PreviousAnswer
                    expected={expected}
                    answer={answer}
                    valid={valid}
                />
            </div>
        );
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
        if (!this.state.lessons) {
            return (<p>Error loading. <Link to={`/`}>Back to home</Link>.</p>)
        }

        const { title } = this.props.match.params;

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