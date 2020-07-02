import { ModelBase } from 'app/shared';

export class Inventory extends ModelBase {
    make: string;
    model:  string;
    year: string;
    vin:  string;
    mileage:  string;
    status:  string;

    constructor(properties?: any) {
        super();
        this.override(properties);
    }
}
