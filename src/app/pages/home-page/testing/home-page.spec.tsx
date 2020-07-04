import React from 'react';
import { mount } from 'enzyme';
import { AppProviders } from 'app/setupTests';
import { HomePage } from '../home-page.container';

const componentTree = mount (
    <AppProviders>
        <HomePage />
    </AppProviders>
)

describe('HomePage', () => {
    it('renders without error', () => {
        expect(componentTree).toBeTruthy();
    });
});