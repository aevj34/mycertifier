
export class EnrollmentDetail {

    constructor(
        public enrollmentId?: string,
        public courseId?: number,
        public turnId?: number,
        public sectionId?: number,
        public programmingId?: string,
        public studentId?: string,
        public studentImg?: string,
        public studentName?: string,
        public studentLastName?: string,
        public studentSecondLastName?: string,
        public studentEmail?: string,
        public studentPhone?: string,
        public courseName?: string,
        public _id?: string,
        public unsubscribe?: boolean,
    ) { }

}