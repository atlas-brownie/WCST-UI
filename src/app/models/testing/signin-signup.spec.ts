import { shallow } from 'enzyme';
import { SigninForm, SignupForm, SignupVerificationForm, ForgotPasswordForm, ResetPasswordForm } from '../signin-signup';

describe('SigninForm Model', () => {
    it('renders without error', () => {
        const modelBase = new SigninForm();
        expect(modelBase).toBeTruthy();
    });
});

describe('SignupForm Model', () => {
    it('renders without error', () => {
        const modelBase = new SignupForm();
        expect(modelBase).toBeTruthy();
    });
});

describe('SignupVerificationForm Model', () => {
    it('renders without error', () => {
        const modelBase = new SignupVerificationForm();
        expect(modelBase).toBeTruthy();
    });
});

describe('ForgotPassword Model', () => {
    it('renders without error', () => {
        const modelBase = new ForgotPasswordForm();
        expect(modelBase).toBeTruthy();
    });
});

describe('ResetPassword Model', () => {
    it('renders without error', () => {
        const modelBase = new ResetPasswordForm();
        expect(modelBase).toBeTruthy();
    });
});
