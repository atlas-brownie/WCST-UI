import { ModelBase } from 'app/shared';

export class SupervisorReview extends ModelBase {
    id: string;
    applicantEmail: string;
    applicantFirstname: string;
    applicantLastname: string;
    applicantPhone: string;
    applicationType: string;
    dateEntered: string;
    status: string;
    documentLinks: any;

    constructor(properties?: any) {
        super();
        this.override(properties);
    }

    removeUndefinded = () => {
        for (let key in this) {
            if (this[key] === undefined) {
                delete this[key];
            }
        }

        return this
    };
}
