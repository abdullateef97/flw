/* eslint-disable camelcase */
const {
  dataValidation,
  doesFieldExistInDataObject,
  eqCondition,
  neqCondition,
  gtCondition,
  gteCondition,
  containsCondition,
} = require("./dataValidation");

describe('dataValidation', () => {
  it('should return an error if data is not passed', () => {
    try {
      dataValidation({}, null);
      throw new Error('error');
    } catch (error) {
      expect(error.httpCode).toEqual(400);
      expect(error.message).toEqual('data is required.')
    }
  })

  it('should return an error if data is of invalid type', () => {
    try {
      dataValidation({}, 1);
      throw new Error('error');
    } catch (error) {
      expect(error.httpCode).toEqual(400);
      expect(error.message).toEqual('data should be either an array, object or string.')
    }
  })

  it('should return an error if field is missing from data', () => {
    try {
      dataValidation({field: 'key'}, {fw: 'test'});
      throw new Error('error');
    } catch (error) {
      expect(error.httpCode).toEqual(400);
      expect(error.message).toEqual('field key is missing from data.')
    }
  })

  it('should return an ok response if condition is true', () => {
    const rule = {
      field: 'key',
      condition: 'eq',
      condition_value: 'fw',
    };
    const reqData = {
      key: 'fw',
    };
    const { message, data } = dataValidation(rule, reqData);
    expect(message).toEqual('field key successfully validated.');
    expect(data).toHaveProperty('validation');
    const { validation } = data;
    expect(validation.error).toBe(false);
    expect(validation.field).toEqual(rule.field);
    expect(validation.field_value).toEqual(reqData.key)
    expect(validation.condition).toEqual(rule.condition)
    expect(validation.condition_value).toEqual(rule.condition_value);
  })

  it('should throw a badRequest response if condition is false', () => {
    const rule = {
      field: 'key',
      condition: 'eq',
      condition_value: 'fw',
    };
    const reqData = {
      key: 'fwe',
    };
    try {
      dataValidation(rule, reqData);
      throw new Error();
    } catch(error) {
      expect(error.message).toEqual('field key failed validation.');
      expect(error.data).toHaveProperty('validation');
      const { validation } = error.data;
      expect(validation.error).toBe(true);
      expect(validation.field).toEqual(rule.field);
      expect(validation.field_value).toEqual(reqData.key)
      expect(validation.condition).toEqual(rule.condition)
      expect(validation.condition_value).toEqual(rule.condition_value);
    }
  })

  it('should return the right field value for a nested field', () => {
    const rule = {
      field: 'key.level',
      condition: 'eq',
      condition_value: 'fw',
    };
    const reqData = {
      key: {
        level: 'fw'
      },
    };
    const { message, data } = dataValidation(rule, reqData);
    expect(message).toEqual('field key.level successfully validated.');
    expect(data).toHaveProperty('validation');
    const { validation } = data;
    expect(validation.error).toBe(false);
    expect(validation.field).toEqual(rule.field);
    expect(validation.field_value).toEqual('fw')
  })
});

describe('doesFieldExistInDataObject', () => {
  const data = {
    key: 'value'
  }
  it('should return true when field can be found in data', () => {
    const { exists, field_value } = doesFieldExistInDataObject(data, 'key');
    expect(exists).toBe(true);
    expect(field_value).toEqual('value')
  })

  it('should return false when field can be found in data', () => {
    const { exists } = doesFieldExistInDataObject(data, 'key1');
    expect(exists).toBe(false);
  })

  it('should return true for a one level nested notation if field is found in data', () => {
    data.key = {
      level: 'value'
    }
    const {exists, field_value} = doesFieldExistInDataObject(data, 'key.level');
    expect(exists).toBe(true);
    expect(field_value).toEqual('value')
  })

  it('should return false for a one level nested notation if field is not found in data', () => {
    data.key = {
      level: 'value'
    }
    const {exists} = doesFieldExistInDataObject(data, 'key.level1');
    expect(exists).toBe(false);
  })

  it('should return true for a two levels nested notation if field is found in data', () => {
    data.key = {
      level: {
        deep: 'value'
      }
    }
    const {exists, field_value} = doesFieldExistInDataObject(data, 'key.level.deep');
    expect(exists).toBe(true);
    expect(field_value).toEqual('value')
  })
})

describe('eqCondition', () => {
  const rule = {
    field: 'key',
    condition: 'eq',
    condition_value: 'fw',
  };
  const data = {
    key: 'fw',
  };
  it('should return true if field value equals condition_value', () => {
    expect(eqCondition(data.key, rule.condition_value)).toBe(true)
  })
  it('should return false if field value does not equal condition_value', () => {
    data.key = 'fwe'
    expect(eqCondition(data.key, rule.condition_value)).toBe(false)
  })
})

describe('neqCondition', () => {
  const rule = {
    field: 'key',
    condition: 'eq',
    condition_value: 'fw',
  };
  const data = {
    key: 'fw',
  };
  it('should return false if field value equals condition_value', () => {
    expect(neqCondition(data.key, rule.condition_value)).toBe(false)
  })
  it('should return true if field value does not equal condition_value', () => {
    data.key = 'fwe'
    expect(neqCondition(data.key, rule.condition_value)).toBe(true)
  })
})

describe('gtCondition', () => {
  const rule = {
    field: 'key',
    condition: 'eq',
    condition_value: 300,
  };
  const data = {
    key: 330,
  };
  it('should return true if field value is greater than condition_value', () => {
    expect(gtCondition(data.key, rule.condition_value)).toBe(true)
  })
  it('should return false if field value is less that condition_value', () => {
    data.key = 250
    expect(gtCondition(data.key, rule.condition_value)).toBe(false)
  })
})

describe('gteCondition', () => {
  const rule = {
    field: 'key',
    condition: 'eq',
    condition_value: 300,
  };
  const data = {
    key: 330,
  };
  it('should return true if field value is greater than condition_value', () => {
    expect(gteCondition(data.key, rule.condition_value)).toBe(true)
  })

  it('should return true if field value equals condition_value', () => {
    data.key = 300
    expect(gteCondition(data.key, rule.condition_value)).toBe(true)
  })

  it('should return false if field value is less that condition_value', () => {
    data.key = 250
    expect(gteCondition(data.key, rule.condition_value)).toBe(false)
  })
})

describe('containsCondition', () => {
  const rule = {
    field: 'key',
    condition: 'eq',
    condition_value: 'fw',
  };
  const data = {
    key: ['fw', 'ps'],
  };
  it('should return true if field value contains condition_value', () => {
    expect(containsCondition(data.key, rule.condition_value)).toBe(true)
  })
  it('should return false if field value does not not contain condition_value', () => {
    rule.condition_value = 'fwe'
    expect(containsCondition(data.key, rule.condition_value)).toBe(false)
  })
})