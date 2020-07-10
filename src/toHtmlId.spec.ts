import 'jest';

import * as toHtmlId from './toHtmlId';

describe('toHtmlId', () => {
  it('returns "toHtmlId"', () => {
    expect(toHtmlId);
  });

  it('removes leading digit', () => {
    expect(toHtmlId.toHtmlId('1abc')).toEqual('abc');
  });
});
