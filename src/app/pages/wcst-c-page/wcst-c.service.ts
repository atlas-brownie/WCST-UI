import { WcstC } from 'app/models';
import { AppHttpService } from 'app/shared';
import { ServiceOptions } from 'app/shared';
import { ServiceState } from 'app/models';

export const getDocumentStatus$ = (guid: string) => {
    // const guid = ServiceState.documentUploadLocation.data.attributes.guid;

    console.log('getDocumentStatus$ guid=', guid);

    const serviceOptions: ServiceOptions = {
        serviceKey: 'getDocumentStatus$',
        localDataPath: '/wcst-c.json',
        servicePath: `/uploads/${guid}`,
        params: {}
    };

    return AppHttpService.get$<WcstC>(WcstC, serviceOptions);
    // httpSubject.subscribe(({ payload }: any) => {
    //     store.dispatch(wcstCSlice.actions.loadWcstC(payload));
    // });
    // return httpSubject;
};

export const getCurrentGuid = (): string => {
    if (ServiceState.documentUploadLocation.data) return ServiceState.documentUploadLocation.data.attributes.guid;
    else return '';
};
