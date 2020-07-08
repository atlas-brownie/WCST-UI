import 'jest';

import { desktopOnly, mobileOnly } from './vadsUtils';

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
