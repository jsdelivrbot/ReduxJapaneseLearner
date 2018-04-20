import React, { Component } from 'react';
import { HashRouter, Route, Switch } from 'react-router-dom';

import CourseList from '../containers/course-list';
import LessonList from '../containers/lesson-list';
import CourseTest from '../containers/course-test';
import LessonLearn from '../containers/lesson-learn';

export default class App extends Component {
  render() {
    return (
        <HashRouter>
            <div>
                <Switch>
                    <Route path="/course/:course/lesson/:lesson/learn" component={LessonLearn} />
                    <Route path="/course/:title/test/:slug" component={CourseTest} />
                    <Route path="/course/:course" component={LessonList}/>
                    <Route path="/" component={CourseList} />
                </Switch>
            </div>
        </HashRouter>
    );
  }
}
