import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';
import _ from 'lodash';

class CourseList extends Component {
    renderList() {
        return this.props.courses.map(course => {
            const link = this.props.match.params.course === course.title ?
                <span className={"text-warning"}>{course.title}</span> :
                <Link to={`/course/${course.title}`}>
                    {course.title}
                </Link>
            ;

            return (
                <li
                    key={course.title}
                    className="list-group-item" >
                    {link}
                </li>
             );
        });
    }

    render() {
        if(_.keys(this.props.match.params).length === 0)
            return <Redirect to={`/course/${this.props.courses[0].title}`} />;

        return (
            <ul className="list-group col-sm-4">
                    {this.renderList()}
            </ul>
        )
    }
}

function mapStateToProps({ courses }) {
    return { courses };
}

export default connect(mapStateToProps)(CourseList);