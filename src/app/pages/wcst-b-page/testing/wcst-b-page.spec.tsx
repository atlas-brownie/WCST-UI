const React = require('react');
import { mount } from 'enzyme';
import { AppProviders } from 'app/setupTests';
import { WcstBPage } from '../wcst-b-page.container';

const componentTree = mount (
    <AppProviders>
        <WcstBPage />
    </AppProviders>
)

describe('WcstBPage', () => {
    it('renders without error', () => {
        expect(componentTree).toBeTruthy();
    });
});