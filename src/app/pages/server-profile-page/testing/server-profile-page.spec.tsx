import React from 'react';
import { mount } from 'enzyme';
import { AppProviders } from 'app/setupTests';
import { ServerProfilePage } from '../server-profile-page.container';

const componentTree = mount (
    <AppProviders>
        <ServerProfilePage />
    </AppProviders>
)

describe('ServerProfilePage', () => {
    it('renders without error', () => {
        expect(componentTree).toBeTruthy();
    });
});