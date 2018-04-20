import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';

class CourseList extends Component {
    renderList() {
        return this.props.courses.map(course => {
            return (
                <li
                    key={course.title}
                    className="list-group-item" >
                        <Link to={`/course/${course.title}`}>
                            {course.title}
                        </Link>
                </li>
             );
        });
    }

    render() {
        // if(!this.props.match.params.course)
        //     return <Redirect to={`/course/${this.props.courses[0].title}`} />;

        console.log(_.isEmpty(this.props.match.params));
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