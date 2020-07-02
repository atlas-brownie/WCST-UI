import React from 'react';
import { mount } from 'enzyme';
import { AppProviders } from 'app/setupTests';
import { ReviewDetailPanel } from '../review-detail-panel.container';

const componentTree = mount(<AppProviders>{/* <ReviewDetailPanel /> */}</AppProviders>);

describe('ReviewDetailPanel', () => {
    it('renders without error', () => {
        //expect(componentTree).toBeTruthy();
    });
});
