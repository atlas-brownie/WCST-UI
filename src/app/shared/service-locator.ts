import { IHashStringNumber, IHashString } from './model-base';
import { environment } from 'environments/environment';
import { KeycloakConfig } from 'keycloak-js';
import { User } from './user';

export interface ServiceOptions {
    serviceKey?: string | null; // update config-local and config when you add a new service
    servicePath?: string | null;
    localDataPath?: string;
    params?: IHashStringNumber;
    forceMock?: boolean;
}

class ServiceLocatorClass {
    serviceOptions: ServiceOptions;

    protected replaceServicePathTokensWithValues(): string {
        const { servicePath, params = {} } = this.serviceOptions;

        return Object.keys(params).reduce((previousPath: string, paramKey: string) => {
            return previousPath.replace(`{${paramKey}}`, `${params[paramKey]}`);
        }, servicePath || '');
    }

    public getKeycloakOptions(): KeycloakConfig {
        return environment.keycloak;
    }

    public getBaseURL() {
        return environment.baseURL;
    }

    // TODO: getHeader needs to be a method in the response handler
    public getHeaders(user: User, headers?: IHashString): IHashString | undefined {
        const { authenticationService } = environment.featureflags;
        if (authenticationService === 'keycloak') {
            const authenticationHeaders = user.keycloak
                ? {
                      Authorization: `Bearer ${user.keycloak.token}`
                  }
                : undefined;
            return authenticationHeaders;
        } else return headers;
    }
    public getUrl(serviceOptions: ServiceOptions): string {
        this.serviceOptions = serviceOptions;
        const { forceMock = false } = this.serviceOptions;

        let localMockData = false;
        if (serviceOptions.serviceKey) {
            const serviceDefinition = environment.featureflags.services[serviceOptions.serviceKey] || { localMockData: false };
            localMockData = serviceDefinition.localMockData;
        }

        if (localMockData || forceMock) {
            return `${environment.localMockPath}${this.serviceOptions.localDataPath || '/NO_LOCAL_DATA_PATH'}`;
        } else {
            return encodeURI(`${environment.baseURL}${environment.rootAPIPath}${environment.APIVersion}${this.replaceServicePathTokensWithValues()}`);
        }
    }
    public getUnencodedUrl(serviceOptions: ServiceOptions): string {
        this.serviceOptions = serviceOptions;
        const { forceMock = false } = this.serviceOptions;

        let localMockData = false;
        if (serviceOptions.serviceKey) {
            const serviceDefinition = environment.featureflags.services[serviceOptions.serviceKey] || { localMockData: false };
            localMockData = serviceDefinition.localMockData;
        }

        if (localMockData || forceMock) {
            return `${environment.localMockPath}${this.serviceOptions.localDataPath || '/NO_LOCAL_DATA_PATH'}`;
        } else {
            return `${environment.baseURL}${environment.rootAPIPath}${environment.APIVersion}${this.replaceServicePathTokensWithValues()}`;
        }
    }
}

export const ServiceLocator = new ServiceLocatorClass();
