import 'jest';

import { defaultFlexContainer, desktopOnly, mobileOnly } from './vadsUtils';

describe('defaultFlexContainer', () => {
  it('returns "defaultFlexContainer"', () => {
    expect(defaultFlexContainer()).toBe(
      'vads-u-display--flex vads-u-flex-direction--row vads-u-flex-wrap--wrap',
    );
  });
});

describe('mobileOnly', () => {
  it('returns "mobileOnly"', () => {
    expect(mobileOnly()).toBe('vads-u-display--block medium-screen:vads-u-display--none');
  });
});

describe('desktopOnly', () => {
  it('returns "desktopOnly"', () => {
    expect(desktopOnly()).toBe('vads-u-display--none medium-screen:vads-u-display--block');
  });
});
