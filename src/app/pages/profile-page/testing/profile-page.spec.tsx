import React from 'react';
import { mount } from 'enzyme';
import { AppProviders } from 'app/setupTests';
import { ProfilePage } from '../profile-page.container';

const componentTree = mount (
    <AppProviders>
        <ProfilePage />
    </AppProviders>
)

describe('ProfilePage', () => {
    it('renders without error', () => {
        expect(componentTree).toBeTruthy();
    });
});