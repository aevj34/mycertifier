import { Teacher } from './teacher';
import { EnrollmentDetail } from './enrollment-detail';

export class Programming {

    constructor(  
        public curricularPlanId?: number,
        public classroomId?: number,
        public teacherId?: number,
        public courseId?: number,
        public teacherImg?: string,
        public teacherName?: string,
        public teacherLastName?: string,
        public email?: string,
        public teacherSecondLastName?: string,
        public turnId?: number,
        public sectionId?: number,
        public courseName?: string,
        public vacants?: number,
        public isFinish?: boolean,
        public price?: number,
        public isDollar?: boolean,
        public selectedMoney?: string,
        public priceShow?: string,
        public startDate?: string,
        public startDateShow?: string,
        public teacher?: Teacher,
        public students?: EnrollmentDetail[],
        public unsubscribe?: boolean,
        
        public _id?: string
    ) { }

}
