import { ModelBase } from 'app/shared';

export class TaskDetail extends ModelBase {
    vehicle: string;
    tag: string;
    vin: string;
    lid: string;
    eqcode: string;
    rpnn: string;
    sin: string;
    miles: string;
    year: string;
    model: string;
    status: object;
    priority: object;
    effort: object;
    owner: object;
    assignee: object;
    description: string;
    comments: string;
    dueDate: string;
    frequency: number;
    recurring: boolean;
    //file: object;

    constructor(properties?: any) {
        super();
        this.override(properties);
    }
}
