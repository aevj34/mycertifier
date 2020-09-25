import { CurricularPlan } from './curricular-plan';
import { CourseGroup } from './course-group';
import { CourseType } from './course-type';
import { Requirement } from 'src/app/models/requirement';


export class Course {

    constructor(  
        public name?: string,
        public code?: string,
        public curricularPlanId?: number,
        public image?: string,
        public theoreticalHours?: number,
        public practicalHours?: number,
        public courseGroupId?: number,
        public courseTypeId?: number,
        public courseGroupName?: string,
        public courseTypeName?: string,
        public credits?: number,
        public sumilla?: string,
        public destinedTo?: string,
        public number?: number,
        public entryRequirements?: string,
        public generalObjectives?: string,
        public contents?: string,
        public requirements?: Requirement[],
        public price?: number,
        public isDollar?: boolean,
        public selectedMoney?: string,
        public unsubscribe?: boolean,
        public _id?: string
    ) { }

}
