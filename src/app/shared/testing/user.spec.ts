import { User } from '../user';

describe('User Model', () => {
    it('creates without error', () => {
        const modelBase = new User({ roles: ['ANY_ROLE'] });
        expect(modelBase).toBeTruthy();
    });
    it('runs has role true', () => {
        const modelBase = new User({ roles: ['ANY_ROLE'] });
        expect(modelBase.hasRole('ANY_ROLE')).toBeTruthy();
    });
    it('runs has role false', () => {
        const modelBase = new User({ roles: ['ANY_ROLE'] });
        expect(modelBase.hasRole('DOES_NOT_HAVE_ROLE')).toBeFalsy();
    });
    it('runs get persona', () => {
        const modelBase = new User({ firstName: 'Any Name', roles: ['ANY_ROLE'] });
        expect(modelBase.persona).toBeTruthy();
    });
});
