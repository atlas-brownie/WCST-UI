import { ModelBase } from '../model-base';

describe('Model Base', () => {
    it('creates without error', () => {
        const modelBase = new ModelBase();
        expect(modelBase).toBeTruthy();
    });
});
