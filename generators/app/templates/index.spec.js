/* eslint-env jest */
const sum = require('./')

describe('sum', () => {
  it('should add to numbers', () => {
    expect(sum(1, 2)).toMatchSnapshot()
  })
})
