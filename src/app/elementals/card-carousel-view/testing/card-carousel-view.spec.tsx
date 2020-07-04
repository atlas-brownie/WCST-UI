import React from 'react';
import { mount } from 'enzyme';
import { AppProviders } from 'app/setupTests';
import { CardCarouselView } from '../card-carousel-view.container';

mount(
    <AppProviders>
        <CardCarouselView />
    </AppProviders>
);

describe('CardCarouselView', () => {
    it('renders without error', () => {});
});
