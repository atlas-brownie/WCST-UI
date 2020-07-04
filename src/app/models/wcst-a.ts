import { ModelBase } from 'app/shared';

export class WcstA extends ModelBase {
    constructor(properties?: any) {
        super();
        this.override(properties);
    }
}

export class ServiceStateClass extends ModelBase {
    documentUploadLocation: any = {};

    constructor(properties?: any) {
        super();
        this.override(properties);
    }
}

export const ServiceState = new ServiceStateClass();
