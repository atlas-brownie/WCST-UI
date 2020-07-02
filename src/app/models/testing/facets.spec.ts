import { shallow } from 'enzyme';
import { FacetsLOV } from '../facets';
import { LOV } from '../../shared';

describe('FacetsLOV Model', () => {
    it('renders without error', () => {
        const modelBase = new FacetsLOV();
        expect(modelBase).toBeTruthy();
    });

    it('asSelectedArray', () => {
        const data = {
            selectedValues: ['1']
        };
        const result = 'filters=mark_types:1&filters=design_codes:1&filters=color_spaces:1&filters=colors:1';
        const modelBase = new FacetsLOV({
            mark_types: new LOV(data),
            design_codes: new LOV(data),
            color_space: new LOV(data),
            colors: new LOV(data)
        });
        const obj = modelBase.asSelectedArray();
        expect(obj).toEqual(result);
    });
});
