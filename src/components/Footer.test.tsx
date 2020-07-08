import * as React from 'react';

import 'jest';

import { shallow } from 'enzyme';
import Footer from './Footer';

describe('Footer', () => {
  it('renders', () => {
    const wrapper = shallow(<Footer />);
    expect(wrapper.exists()).toBe(true);
  });

  it('should render the site disclaimer', () => {
    const wrapper = shallow(<Footer />);

    expect(wrapper.find('.vads-l-grid-container').length).toBe(1);
  });
});
