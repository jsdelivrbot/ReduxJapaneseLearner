import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import _ from 'lodash';

import CourseList from "./course-list";

class LessonList extends Component {
    renderList(lessons) {
        return lessons.map(lesson=> {
            return (
                <tr
                    key={lesson.index} >
                    <td>
                        {lesson.title}
                    </td>
                    <td>
                        <Link to={`/course/${this.props.match.params.course}/lesson/${lesson.index}/learn`}>
                            Learn
                        </Link>
                    </td>
                    <td>
                        <Link to={`/course/${this.props.match.params.course}/lesson/${lesson.index}/test`}>
                            Test
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

        return (
            <div className="col">
                <CourseList /><br />
                <table className="table table-bordered col-xs-12">
                    {this.renderList(course[0].lessons)}
                </table>
            </div>
        )
    }
}

function mapStateToProps({ courses }) {
    return { courses }
}

export default connect(mapStateToProps)(LessonList);