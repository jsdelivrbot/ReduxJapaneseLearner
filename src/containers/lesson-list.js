import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import _ from 'lodash';

import CourseList from "./course-list";

class LessonList extends Component {
    constructor(props) {
        super(props);
        this.state = { lessons: [] };

        this.onStartTestClick = this.onStartTestClick.bind(this);
    }

    onStartTestClick() {
        if (this.state.lessons.length !== 0) this.setState({ redirect: true });
    }

    checkboxClicked(lesson) {
        let { lessons } = this.state;
        if (_.indexOf(lessons, lesson) !== -1) {
            _.pull(lessons, lesson);
        } else {
            lessons = _.concat(lessons, lesson);
        }
        this.setState({ lessons });
    }

    renderList(lessons) {
        return lessons.map(lesson=> {
            return (
                <tr
                    key={lesson.index} >
                    <td>{lesson.title}</td>
                    <td>{lesson.vocab.length}</td>
                    <td>
                        <input onChange={() => this.checkboxClicked(lesson.index)} type="checkbox" />
                    </td>
                    <td>
                        <Link to={`/course/${this.props.match.params.course}/lesson/${lesson.index}/learn`}>
                            Learn
                        </Link>
                    </td>
                </tr>
            );
        });
    }

    render() {
        const title = this.props.match.params.course;
        const course = _.filter(this.props.courses, course => course.title === title);

        if (course.length === 0) return (<p>404 Course not found.</p>);

        if (this.state.redirect) {
            const str = this.state.lessons.sort().join('-');
            return <Redirect to={`/course/${course[0].title}/test/${str}`}/>;
        }

        return (
            <div className="row">
                <CourseList {...this.props} />
                <div className="col-sm-8">
                    <table className="table table-bordered">
                        <thead>
                            <tr>
                                <td>Name</td>
                                <td>Vocab</td>
                                <td>Test</td>
                                <td>Learn</td>
                            </tr>
                        </thead>
                        <tbody>
                            {this.renderList(course[0].lessons)}
                        </tbody>
                    </table>
                    <button
                        type="button"
                        className={`btn btn-${this.state.lessons.length === 0 ? 'disabled' : 'primary'}`}
                        onClick={() => this.onStartTestClick(course.title)}
                    >Start test</button>
                </div>
            </div>
        )
    }
}

function mapStateToProps({ courses }) {
    return { courses }
}

export default connect(mapStateToProps)(LessonList);