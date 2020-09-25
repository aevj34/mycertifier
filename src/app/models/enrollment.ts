import { EnrollmentDetail } from './enrollment-detail';

export class Enrollment {

    constructor(
        public studentId?: string,
        public observation?: number,
        public enrollmentDate?: string,
        public enrollmentDateShow?: string,
        public studentImg?: string,
        public studentName?: string,
        public studentLastName?: string,
        public studentSecondLastName?: string,
        public studentEmail?: string,
        public studentPhone?: string,
        public studentDocument?: string,
        public studentRuc?: string,
        public enrollmentDetails?: EnrollmentDetail[],
        public subTotal?: number,
        public totalIgv?: number,
        public total?: number,
        public _id?: string,
        public unsubscribe?: boolean,
    ) { }

}
