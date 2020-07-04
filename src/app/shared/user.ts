import { ModelBase } from '.';

export class User extends ModelBase {
    id?: string;
    roles: string[];
    firstName?: string;
    lastName?: string;
    email?: string;
    password?: string;
    phoneNumber?: string;
    gender?: string;
    isAuthenticated: boolean;
    keycloak?: any;

    constructor(properties?: any) {
        super();
        this.override(properties);
        this.firstName = properties?.firstName ?? '';
        this.roles = properties?.roles ?? [];
    }

    hasRole(role: string) {
        for (const item of role.split('|')) {
            if (this.roles.includes(item)) {
                return true;
            }
        }
        return false;
    }

    get persona() {
        return this.firstName;
    }
}

export const UserDefault = new User({ id: 'DEFAULT-ID', firstName: '', lastName: '', roles: ['ANONYMOUS'], email: '', phoneNumber: '', gender: '', isAuthenticated: true });
