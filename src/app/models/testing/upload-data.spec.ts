import { shallow } from 'enzyme';
import { UploadData } from '../upload-data';

describe('UploadData Model', () => {
    it('creates without error', () => {
        const modelBase = new UploadData();
        expect(modelBase).toBeTruthy();
    });
});
