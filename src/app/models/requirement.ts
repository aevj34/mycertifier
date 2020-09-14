
export class Requirement {

    constructor(
        public childId?: string,
        public parentId?: string,
        public _id?: string,
        public childName?: string,
        public unsubscribe?: boolean,
    ) { }

}