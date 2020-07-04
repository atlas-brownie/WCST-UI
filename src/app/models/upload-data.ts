import { ModelBase } from 'app/shared';

export class UploadData extends ModelBase {
    VIN: string;
    MODEL: string;
    YEAR: number;
    MILES: number;
    TAG: string;

    constructor(properties?: any) {
        super();
        this.override(properties);
    }
}
