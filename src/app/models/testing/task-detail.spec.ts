import { shallow } from 'enzyme';
import { TaskDetail } from '../task-detail';

describe('TaskDetail Model', () => {
    it('creates without error', () => {
        const modelBase = new TaskDetail();
        expect(modelBase).toBeTruthy();
    });
});
