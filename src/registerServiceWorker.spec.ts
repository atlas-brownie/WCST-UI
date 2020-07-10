import 'jest';

import register, { unregister } from './registerServiceWorker';

describe('registerServiceWorker', () => {
  it('returns "registerServiceWorker"', () => {
    expect(register());
  });
});

describe('unregisterServiceWorker', () => {
  it('returns "unregisterServiceWorker"', () => {
    expect(unregister());
  });
});
