import { Inventory } from '../inventory';

describe('Inventory Model', () => {
    it('creates without error', () => {
        const modelBase = new Inventory();
        expect(modelBase).toBeTruthy();
    });
});
