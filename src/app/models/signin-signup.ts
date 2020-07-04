import { ModelBase } from 'app/shared';

export class SigninForm extends ModelBase {
    email: string;
    password: string;

    constructor(properties?: any) {
        super();
        this.override(properties);
    }
}

export class SignupForm extends SigninForm {
    confirmPassword: string;

    constructor(properties?: any) {
        super();
        this.override(properties);
    }
}

export class SignupVerificationForm extends ModelBase {
    email: string;
    verificationCode: string;

    constructor(properties?: any) {
        super();
        this.override(properties);
    }
}

export class ForgotPasswordForm extends ModelBase {
    email: string;

    constructor(properties?: any) {
        super();
        this.override(properties);
    }
}

export class ResetPasswordForm extends ModelBase {
    email: string;
    confirmationCode: string;
    newPassword: string;

    constructor(properties?: any) {
        super();
        this.override(properties);
    }
}
