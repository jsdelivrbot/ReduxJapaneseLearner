import { combineReducers } from 'redux';

import CoursesReducer from './reducer_courses';

const rootReducer = combineReducers({
	courses: CoursesReducer
});

export default rootReducer;
