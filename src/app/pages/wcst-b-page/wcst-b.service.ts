import { WcstB, WcstA } from 'app/models';
import { AppHttpService } from 'app/shared';
import { ServiceOptions } from 'app/shared';
import { ServiceState } from 'app/models';

export const getWcstB$ = () => {
    const serviceOptions: ServiceOptions = {
        serviceKey: 'getWcstB$',
        localDataPath: '/wcst-b.json',
        servicePath: '/wcst-b',
        params: {}
    };

    return AppHttpService.get$<WcstB>(WcstB, serviceOptions);
};

export const postDocumentUploadLocation$ = (metadataFile: File, contentFile: File | null) => {
    const data = new WcstA();
    const serviceOptions: ServiceOptions = {
        servicePath: '/uploads'
    };
    const subject = AppHttpService.post$<WcstA>(WcstA, serviceOptions, data);
    subject.subscribe(({ payload, error }) => {
        ServiceState.documentUploadLocation = payload[0];

        if (contentFile) {
            postWcstB$({ metadataFile, contentFile });
        }
    });
    return subject;
};

export const postWcstB$ = ({ metadataFile, contentFile }: { metadataFile: File; contentFile: File }) => {
    const locationUrl = ServiceState.documentUploadLocation.data.attributes.location;
    const formData = new FormData();
    formData.append('metadata', metadataFile);
    formData.append('content', contentFile);

    const oReq = new XMLHttpRequest();
    oReq.open('PUT', locationUrl, true);
    oReq.setRequestHeader('Content-Type', 'multipart/form-data');
    oReq.onload = function (oEvent) {
        if (oReq.status === 200) {
            console.log('success return from POST Files');
        } else {
            console.log('failed return from POST Files');
        }
    };

    oReq.send(formData);
};

export const getMetadataFile = (metadata: any) => {
    const file = new File([metadata], 'metadata.json', { type: 'application/json' });
    return file;
};

export const putWcstB$ = (id: string, data: WcstB) => {
    const httpSubject = AppHttpService.put$<WcstB>(WcstB, { servicePath: '/wcstB/{id}', params: { id } }, data);
    return httpSubject;
};

export const deleteWcstB$ = (id: string) => {
    const httpSubject = AppHttpService.delete$<WcstB>(WcstB, { servicePath: '/wcstB/{id}', params: { id } });
    return httpSubject;
};
