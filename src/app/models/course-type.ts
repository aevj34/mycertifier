import { Course } from './course';

export class CourseType {

    constructor(
        public name?: string,
        public _id?: string,
        public courses?: Course[],
        public unsubscribe?: boolean,
    ) { }

}