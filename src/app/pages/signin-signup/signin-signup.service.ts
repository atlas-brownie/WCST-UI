import { Auth } from 'aws-amplify';
import { createSlice } from '@reduxjs/toolkit';
import { Subject, from, defer, of } from 'rxjs';
import { GenericResponse, User, AppHttpService } from 'app/shared';
import { switchMap, catchError } from 'rxjs/operators';
import { IListOfValueItem } from 'app/shared';

const awsAmplifyAuth$ = (authAction: Promise<any>): Subject<GenericResponse> => {
    const subject = new Subject<GenericResponse>();
    defer(() => from<Promise<any>>(authAction))
        .pipe(
            switchMap((payload: any) => {
                return of<GenericResponse>({ error: null, payload: [payload] });
            }),
            catchError((error) => {
                return of<GenericResponse>({ error, payload: [] });
            })
        )
        .subscribe(subject);
    return subject;
};

//Docs: https://docs.amplify.aws/lib/auth/emailpassword/q/platform/js
export const signIn$ = (email: string, password: string): Subject<GenericResponse> => {
    return awsAmplifyAuth$(Auth.signIn(email, password));
};

export function signUp$(email: string, password: string) {
    return awsAmplifyAuth$(
        Auth.signUp({
            username: email,
            password,
            attributes: {
                email
            }
        })
    );
}

export function signupVerifyCode$(email: string, code: string) {
    return awsAmplifyAuth$(Auth.confirmSignUp(email, code));
}

export function resendConfirmationCode$(email: string) {
    return awsAmplifyAuth$(Auth.resendSignUp(email));
}

//Docs: https://docs.amplify.aws/lib/auth/manageusers/q/platform/js#password-operations
export function getForgotPasswordCode$(email: string) {
    return awsAmplifyAuth$(Auth.forgotPassword(email));
}

export function resetPassword$(email: string, confirmationCode: string, newPassword: string) {
    return awsAmplifyAuth$(Auth.forgotPasswordSubmit(email, confirmationCode, newPassword));
}

export function signOut$() {
    return awsAmplifyAuth$(Auth.signOut({ global: true }));
}

const initialCredentialsState = null;
export const credentialsSlice = createSlice({
    name: 'credentials',
    initialState: initialCredentialsState,
    reducers: {
        setCredentials: (_, action) => {
            if (action.payload && action.payload[0]) {
                return action.payload[0];
            } else {
                return null;
            }
        }
    }
});
export const selectCredentials = (state: any): any => {
    return state.credentials;
};

export const getAWSUsers$ = () => {
    return AppHttpService.get$<User>(User, { serviceKey: 'getAWSUsers$', localDataPath: '/mockUser.json' });
};

export const getMockSelectOptions = (userList: User[]): IListOfValueItem[] => {
    const options = userList.map<IListOfValueItem>(
        (user: User): IListOfValueItem => {
            const lovItem: IListOfValueItem = { code: user.email || '', description: `${user.firstName}/${user.email}` || '', other: user };
            return lovItem;
        }
    );
    const defaultOption: IListOfValueItem = { code: undefined, description: '' };
    return [defaultOption].concat(options);
};

export const getMockUsers$ = () => {
    return AppHttpService.get$<User>(User, { serviceKey: 'getMockUsers$', localDataPath: '/mockUser.json' });
};
