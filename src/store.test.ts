import { initialBenefitsStatusState } from './reducers';

// sessionStorage.getItem('state') is called when the store is imported at application start up.
// To be able to pass in artibray values for testing purposes, the store is reset between tests
// and then initialized after setting sessionStorage.

beforeEach(() => {
  sessionStorage.clear();
  jest.resetModules();
});

describe('loadApplicationState', () => {
  it('returns a blank application when sessionStorage is empty', async () => {
    const store = (await import('./store')).default;
    const state = store.getState();
    expect(state.benefitsStatus).toEqual(initialBenefitsStatusState);
  });
});
