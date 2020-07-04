import { ModelBase } from 'app/shared';

export class Applicant extends ModelBase {
    id?: string;
    firstName: string;
    lastName?: string;
    email: string;
    phoneNumber: string;
    gender?: string;

    static default = {
        id: 'DEFAULT-ID',
        firstName: '',
        lastName: '',
        email: '',
        phoneNumber: '',
        gender: ''
    };

    constructor(properties?: any) {
        super();
        this.override(properties);
    }
}
