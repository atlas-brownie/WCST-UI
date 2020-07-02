import React from 'react';
import { mount } from 'enzyme';
import { AppProviders } from 'app/setupTests';
import { DropDown } from '../DropDown';

mount(
    <AppProviders>
        <DropDown rowData={[]} />
    </AppProviders>
);

describe('DropDown', () => {
    it('renders without error', () => {});
});
