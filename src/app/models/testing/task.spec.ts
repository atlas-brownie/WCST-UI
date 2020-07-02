import { shallow } from 'enzyme';
import { Task } from '../task';

describe('Task Model', () => {
    it('creates without error', () => {
        const modelBase = new Task();
        expect(modelBase).toBeTruthy();
    });
});
