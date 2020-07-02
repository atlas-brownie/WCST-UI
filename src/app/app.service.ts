import { version } from '../../package.json';
import configDevelopment from 'assets/config-local.json';
import configProduction from 'assets/config.json';
import { environment } from 'environments/environment';
import { createSlice } from '@reduxjs/toolkit';
import { User, store } from 'app/shared';
import Amplify from 'aws-amplify';
import { AppHttpService, ModelBase } from 'app/shared';

export const pingServer$ = () => {
    if (environment.featureflags.healthCheck) {
        const httpSubject = AppHttpService.get$<ModelBase>(ModelBase, { servicePath: '/ping' });
        httpSubject.subscribe(({ message, error }: any) => {
            console.log('HEALTH CHECK PING:');
            let health;
            let outputMessage = message;
            message && (health = message === 'Success');
            if (!message) {
                health = false;
                outputMessage = 'Unknown Error';
            }
            console.log(outputMessage);
            error && console.log(error);
            store.dispatch(healthCheckSuccessSlice.actions.setHealth(health));
        });

        return httpSubject;
    } else {
        console.log('SERVER HEALTH CHECK DISABLED');
    }
};

const setAmplifyConfiguration = (config: any) => {
    const {
        amazonCognito: { region, userPoolId, domain, userPoolWebClientId, cookieDomain, cookieSecure }
    } = config;
    Amplify.configure({
        Auth: {
            // REQUIRED only for Federated Authentication - Amazon Cognito Identity Pool ID
            // identityPoolId: 'XX-XXXX-X:XXXXXXXX-XXXX-1234-abcd-1234567890ab',

            // REQUIRED - Amazon Cognito Region
            region,

            // OPTIONAL - Amazon Cognito Federated Identity Pool Region
            // Required only if it's different from Amazon Cognito Region
            // identityPoolRegion: amazonCognitoRegion,

            // OPTIONAL - Amazon Cognito User Pool ID
            userPoolId,

            // OPTIONAL - Amazon Cognito Web Client ID (26-char alphanumeric string)
            userPoolWebClientId,

            // OPTIONAL - Enforce user authentication prior to accessing AWS resources or not
            mandatorySignIn: true,

            // OPTIONAL - Configuration for cookie storage
            // Note: if the secure flag is set to true, then the cookie transmission requires a secure protocol
            cookieStorage: {
                // REQUIRED - Cookie domain (only required if cookieStorage is provided)
                domain: cookieDomain,
                // OPTIONAL - Cookie path
                path: '/',
                // OPTIONAL - Cookie expiration in days
                expires: 365,
                // OPTIONAL - Cookie secure flag
                // Either true or false, indicating if the cookie transmission requires a secure protocol (https).
                secure: cookieSecure
            },

            // OPTIONAL - customized storage object
            storage: null,

            // OPTIONAL - Manually set the authentication flow type. Default is 'USER_SRP_AUTH'
            // authenticationFlowType: 'USER_PASSWORD_AUTH',
            authenticationFlowType: 'USER_SRP_AUTH',

            // OPTIONAL - Manually set key value pairs that can be passed to Cognito Lambda Triggers
            clientMetadata: null,

            // OPTIONAL - Hosted UI configuration
            oauth: {
                domain,
                scope: ['email', 'profile', 'openid'],
                // redirectSignIn: 'http://localhost:3000/',
                // redirectSignOut: 'http://localhost:3000/',
                responseType: 'code' // or 'token', note that REFRESH token will only be generated when the responseType is code
            }
        }
    });
};

// You can get the current config object

export const loadConfiguration = (done?: any) => {
    const env = process.env.NODE_ENV;

    // Decide which config file to use; assume production
    let config: any = configProduction;
    if (env === 'development') {
        config = configDevelopment;
    }

    setAmplifyConfiguration(config);

    // Apply config values to global environment settings
    environment.version = version;
    Object.keys(config).forEach((key) => {
        Object.defineProperty(environment, key, { value: config[key] });
    });
    done && done();
};

// const initialUserState = new User({ firstName: 'Patricia', lastName: '', roles: ['PLAYER_COACH'], email: null });
const initialUserState = null;
export const userSlice = createSlice({
    name: 'user',
    initialState: initialUserState,
    reducers: {
        changeUser: (_, action) => {
            return action.payload;
        }
    }
});
export const selectUser = (state: any): User => state.user;

const initialHealthCheck = false;
export const healthCheckSuccessSlice = createSlice({
    name: 'health',
    initialState: initialHealthCheck,
    reducers: {
        setHealth: (_, action) => {
            return action.payload;
        }
    }
});
export const selectHealth = (state: any): boolean => state.health;
