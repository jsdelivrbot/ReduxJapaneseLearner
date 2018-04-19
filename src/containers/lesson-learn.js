import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import _ from 'lodash';

class LessonLearn extends Component {
    renderLesson(vocabs) {
        return vocabs.map(word=> {
            return (
                <tr>
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
        console.log(course);
        if (course.length === 0) return (<p>404 Course not found.</p>);

        const index  = this.props.match.params.lesson;
        const lesson = _.filter(course[0].lessons, lesson => lesson.index === index);
        console.log(course[0].lessons);
        console.log(index);
        console.log(lesson);
        if (lesson.length === 0) return (<p>404 Lesson not found.</p>);

        return (
            <div>
                <table className="table table-bordered">
                    {this.renderLesson(lesson[0].vocab)}
                </table>
                <Link to={`/`} >Home</Link> - <Link to={`/course/${course[0].title}`} >Back to course</Link>
            </div>
        )
    }
}

function mapStateToProps({ courses }) {
    return { courses }
}

export default connect(mapStateToProps)(LessonLearn);