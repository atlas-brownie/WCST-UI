import { VAHttpResponseHandler } from 'app/shared';
// import { ServiceState } from 'app/models';

export const getWhatServerSees$ = (guid: string) => {
    // const guid = ServiceState.documentUploadLocation.data.attributes.guid;
    // const guid = '8aafe39f-af5f-4f5c-86e2-0504b510d2cd';
    const locationUrl = `https://sandbox-api.va.gov/services/vba_documents/v1/uploads/${guid}/download`;

    const oReq = new XMLHttpRequest();
    oReq.open('GET', locationUrl, true);
    oReq.setRequestHeader('apikey', VAHttpResponseHandler.getAPIKey());
    oReq.responseType = 'blob';
    oReq.onload = function (oEvent) {
        if (oReq.status === 200) {
            const disposition = oReq.getResponseHeader('Content-Disposition') || '';
            const matches = /"([^"]*)"/.exec(disposition);
            const filename = matches != null && matches[1] ? matches[1] : 'filename=';

            const blob = new Blob([oReq.response], { type: 'application/zip' });
            const link = document.createElement('a');
            link.href = window.URL.createObjectURL(blob);
            link.download = filename;
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        } else {
            console.log('failed return from GET ZIP Files');
        }
    };

    oReq.send();
};
