import React from 'react';
import { mount } from 'enzyme';
import { AppProviders } from 'app/setupTests';
import { ThumbnailView } from '../thumbnail-view.container';

mount(
    <AppProviders>
        <ThumbnailView />
    </AppProviders>
);

describe('ThumbnailView', () => {
    it('renders without error', () => {});
});
