import { ModelBase } from 'app/shared';

export class Profile extends ModelBase {
    id?: string;
    firstName: string;
    lastName?: string;
    email: string;
    phoneNumber: string;
    gender?: string;

    // "id":"JM3TB2CV4F0254398","firstName":"Sherie","lastName":"Dabourne","email":"sdabourne1@ebay.co.uk","phoneNumber":"998-216-0574","gender":"Female"

    static default = new Profile({
        id: 'DEFAULT-ID',
        firstName: '',
        email: '',
        gender: '',
        lastName: '',
        phoneNumber: ''
    });

    constructor(properties?: any) {
        super();
        this.override(properties);
    }
}
