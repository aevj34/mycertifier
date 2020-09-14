import { Course } from './course';

export class CurricularPlan {

    constructor(
        public name?: string,
        public code?: string,
        public creationDate?: string,
        public creationDateShow?: string,
        public expiryDate?: string,
        public expiryDateShow?: string,
        public duration?: string,
        public observation?: string,
        public unsubscribe?: boolean,
        public courses?: Course[],
        public _id?: string
    ) { }

}
