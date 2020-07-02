import React from 'react';
import { mount } from 'enzyme';
import { AppProviders } from 'app/setupTests';
import { ComponentsPage } from '../components-page.container';

const componentTree = mount(
    <AppProviders>
        <ComponentsPage />
    </AppProviders>
);

describe('ComponentsPage', () => {
    it('renders without error', () => {
        expect(componentTree).toBeTruthy();
    });
});
