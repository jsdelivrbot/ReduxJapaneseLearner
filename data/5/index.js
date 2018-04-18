import Course1 from './1';
import Course2 from './2';

export default function() {
    return [
        {index: '1', title:'I am a student.', vocab: Course1()},
        {index: '2', title:'Who is this person?', vocab: Course2()},
    ]
}