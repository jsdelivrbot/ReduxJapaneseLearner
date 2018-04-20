import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import _ from 'lodash';

class LessonLearn extends Component {
    renderLesson(vocabs) {
        return vocabs.map((word, index) => {
            return (
                <tr key={index}>
                    <td>{word.kanji}</td>
                    <td>{word.syllabies}</td>
                    <td>{word.romaji}</td>
                    <td>{word.english}</td>
                </tr>
            );
        });
    }

    render() {
        const title = this.props.match.params.course;
        const course = _.filter(this.props.courses, course => course.title === title);
        if (course.length === 0) return (<p>404 Course not found.</p>);

        const index  = this.props.match.params.lesson;
        const lesson = _.filter(course[0].lessons, lesson => lesson.index === index);
        if (lesson.length === 0) return (<p>404 Lesson not found.</p>);

        return (
            <div>
                <table className="table table-bordered">
                    <thead>
                        <tr>
                            <td>Kanji</td><td>Kana</td><td>Romaji</td><td>English</td>
                        </tr>
                    </thead>
                    <tbody>
                        {this.renderLesson(lesson[0].vocab)}
                    </tbody>
                </table>
                <p>
                    <Link to={`/`} >Home</Link><span> - </span>
                    <Link to={`/course/${course[0].title}`} >Back to course</Link>
                </p>
            </div>
        )
    }
}

function mapStateToProps({ courses }) {
    return { courses }
}

export default connect(mapStateToProps)(LessonLearn);