import { IHashStringNumber } from './model-base';
import { environment } from 'environments/environment';

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
}

export const ServiceLocator = new ServiceLocatorClass();
