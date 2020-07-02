const React = require('react');
import { mount } from 'enzyme';
import { AppProviders } from 'app/setupTests';
import { SupervisorReviewPage } from '../supervisor-review-page.container';

const componentTree = mount (
    <AppProviders>
        <SupervisorReviewPage />
    </AppProviders>
)

describe('SupervisorReviewPage', () => {
    it('renders without error', () => {
        expect(componentTree).toBeTruthy();
    });
});