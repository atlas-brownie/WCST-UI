import { ModelBase } from 'app/shared';

export class Home extends ModelBase {
    mockProperty: any;

    constructor(properties?: any) {
        super();
        this.override(properties);
    }
}
