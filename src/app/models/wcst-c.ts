import { ModelBase } from 'app/shared';

export class WcstC extends ModelBase {
    data: any = {};

    constructor(properties?: any) {
        super();
        this.override(properties);
    }
}
