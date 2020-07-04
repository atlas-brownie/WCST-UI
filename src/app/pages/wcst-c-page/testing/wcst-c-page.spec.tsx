const React = require('react');
import { mount } from 'enzyme';
import { AppProviders } from 'app/setupTests';
import { WcstCPage } from '../wcst-c-page.container';

const componentTree = mount (
    <AppProviders>
        <WcstCPage />
    </AppProviders>
)

describe('WcstCPage', () => {
    it('renders without error', () => {
        expect(componentTree).toBeTruthy();
    });
});