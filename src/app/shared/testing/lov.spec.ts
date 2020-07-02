import { LOV, IListOfValueItem } from '../lov';

const options: Array<IListOfValueItem> = [];
const selectedValues: Array<any> = [];
const selectedOptions: Array<IListOfValueItem> = [];
const modelBase = new LOV({ options, selectedValues, selectedOptions });
const lovItem = { lovTypeA: [{ someCode: 'A', someValue: 'AAAAAAAA' }], lovTypeB: { someCode: 'B', someValue: 'BBBBBB' } };

describe('LOV Model', () => {
    it('creates without error', () => {
        expect(modelBase).toBeTruthy();
    });
    it('runs toString', () => {
        modelBase.toString();
    });
    it('runs toStringSelectedValues', () => {
        modelBase.toStringSelectedValues();
    });
    it('runs toStringSelectedOptions', () => {
        modelBase.toStringSelectedOptions();
    });
    it('runs mapOverSelected', () => {
        modelBase.mapOverSelected((item) => {
            return item;
        });
    });
    it('runs mapFacetToLovModel', () => {
        LOV.mapFacetToLovModel(lovItem);
    });
    it('no selected items', () => {
        modelBase.selectedValues = undefined;
        modelBase.mapOverSelected((item) => {
            return item;
        });
    });
});
