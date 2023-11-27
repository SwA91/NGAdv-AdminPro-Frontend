
export class Hospital {
    constructor(
        public name: string,
        public _id?: string,
        public img?: string,
        public user?: _HospitalUser,
    ) { }
}

interface _HospitalUser {
    id: string;
    name: string;
    img: string;
}