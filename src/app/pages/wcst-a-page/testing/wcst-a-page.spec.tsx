const React = require('react');
import { mount } from 'enzyme';
import { AppProviders } from 'app/setupTests';
import { WcstAPage } from '../wcst-a-page.container';

const componentTree = mount (
    <AppProviders>
        <WcstAPage />
    </AppProviders>
)

describe('WcstAPage', () => {
    it('renders without error', () => {
        expect(componentTree).toBeTruthy();
    });
});