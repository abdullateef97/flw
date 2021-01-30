const { ruleValidation } = require('./ruleValidation');

describe('rule validation', () => {
  it('should throw an error if rule is null, empty or not passed', () => {
    try {
      ruleValidation(null);
      throw new Error('error');
    } catch (error) {
      expect(error.httpCode).toEqual(400);
      expect(error.message).toEqual('rule is required.');
    }
  })
  it('should throw an error if field is not passed', () => {
    try {
      ruleValidation({condition: 'eq',});
      throw new Error('error');
    } catch (error) {
      expect(error.httpCode).toEqual(400);
      expect(error.message).toEqual('field is required.');
    }
  })

  it('should throw an error if condition is not passed', () => {
    try {
      ruleValidation({field: 'eq',});
      throw new Error('error');
    } catch (error) {
      expect(error.httpCode).toEqual(400);
      expect(error.message).toEqual('condition is required.');
    }
  })

  it('should throw an error if condition_value is not passed', () => {
    try {
      ruleValidation({field: 'boy', condition: 'eq'});
      throw new Error('error');
    } catch (error) {
      expect(error.httpCode).toEqual(400);
      expect(error.message).toEqual('condition_value is required.');
    }
  })
})