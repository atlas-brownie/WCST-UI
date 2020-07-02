import React, { FunctionComponent, ReactElement } from 'react';
import { environment } from 'environments/environment';
import { SigninMock } from './signin-alternatives/signin-mock.container';
import { SigninAWS } from './signin-alternatives/signin-aws.container';

export interface SigninPageProps {}

export const SigninPage: FunctionComponent<SigninPageProps> = (props): ReactElement => {
    const { authenticationService } = environment.featureflags;

    // Update config json to match the authentication service you would wish to use.
    // Options are:  aws, mock
    switch (authenticationService) {
        case 'aws': {
            return <SigninAWS {...props} />;
        }
        default: {
            return <SigninMock {...props} />;
        }
    }
};
