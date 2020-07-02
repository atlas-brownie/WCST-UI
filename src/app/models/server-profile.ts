import { ModelBase } from 'app/shared';

export class ServerProfile extends ModelBase {
    mockProperty: any;

    constructor(properties?: any) {
        super();
        this.override(properties);
    }
}
