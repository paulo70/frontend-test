import * as test from './test';

describe('tests', function() {
  it('check if the parameter is valid', function() {
    let obj;
    expect(test.isRequestOK(obj)).toEqual(4)
  });
});