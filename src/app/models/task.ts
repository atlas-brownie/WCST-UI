import { ModelBase } from 'app/shared';

export class Task extends ModelBase {
    dueDate: string;
    taskName: string;
    assignee: string;
    status: string;
    vin: string;
    frequency: number;
    recurring: boolean;
    description: string;

    constructor(properties?: any) {
        super();
        this.override(properties);
    }
}
