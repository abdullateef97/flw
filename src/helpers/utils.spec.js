const { fieldChecker } = require("./utils");

describe('fieldChecker', () => {
  it('should return ann error if field is not passed', () => {
    const fieldName = 'boy';
    try {
      fieldChecker(null, fieldName)
    } catch (error) {
      expect(error.message).toEqual(`${fieldName} is required.`)
    }
  })
})