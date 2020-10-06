import { EnrollmentDetail } from './enrollment-detail';
import { Student } from './student';

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
        public student?: Student,
        public dnis?: File,
        public payments?: File,
        public revalidations?: File[],
        public experiences?: File[],
        public _id?: string,
        public unsubscribe?: boolean,
    ) { }

}
