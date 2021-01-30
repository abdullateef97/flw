/* eslint-disable camelcase */
const { badRequest, okRequest } = require("./responseHelpers");
const { fieldChecker } = require("./utils");

const eqCondition = (field_value, condition_value) => {
  return field_value === condition_value;
}

const neqCondition = (field_value, condition_value) => {
  return field_value !== condition_value;
}

const gtCondition = (field_value, condition_value) => {
  return field_value > condition_value;
}

const gteCondition = (field_value, condition_value) => {
  return field_value >= condition_value;
}

const containsCondition = (field_value, condition_value) => {
  return field_value.includes(condition_value);
}

const conditionInterpreter = (condition, field_value, condition_value) => {
  switch(condition) {
    case 'eq':
      return eqCondition(field_value, condition_value);
    case 'neq':
      return neqCondition(field_value, condition_value);
    case 'gt':
      return gtCondition(field_value, condition_value);
    case 'gte':
      return gteCondition(field_value, condition_value);
    case 'contains':
      return containsCondition(field_value, condition_value);
    default:
      throw badRequest(`condition ${condition} is invalid`);
  }
}

const doesFieldExistInDataObject = (data, field) => {
  let splitField;
  // this assumes that any field with '.' has nested objects
  if (field.includes('.')) {
    splitField = field.split('.');
    let isValid = true;
    let d = data
    // eslint-disable-next-line no-plusplus
    for(let i = 0; i < splitField.length; i++) {
      const s = splitField[i];
      if(d[s]) {
        d = d[s]
      } else {
        isValid = false;
        break;
      }
    }
    return {
      exists: isValid,
      field_value: d
    };
  }
  return {
    exists: !!data[field],
    field_value: data[field]
  }
}

const dataValidation = (rule, data) => {
  fieldChecker(data, 'data');

  const allowedDataTypes = ['object', 'string'];
  const dataType = typeof data;
  if (!allowedDataTypes.includes(dataType)) {
    throw badRequest('data should be either an array, object or string.');
  }
  const { field, condition, condition_value } = rule;
  // check if field specified in rule exists in data
  const {exists : fieldExists, field_value} = doesFieldExistInDataObject(data, field)
  if (!fieldExists) {
    throw badRequest(`field ${field} is missing from data.`);
  }
  const validationResponse = {
    error: true,
    field,
    field_value,
    condition,
    condition_value,
  }
  const errorMessage = `field ${field} failed validation.`
  try {
    const isValid = conditionInterpreter(rule.condition, field_value, rule.condition_value)
    if (isValid) {
      validationResponse.error = false;
      const successMessage = `field ${field} successfully validated.`
      return okRequest(successMessage, validationResponse)
    }
    throw badRequest(errorMessage, validationResponse)
  } catch (error) {
    // this is in case of an invalid condition and an error is thrown
    if (error.httpCode) throw badRequest(error.message, error.data ? error.data.validation : error.data)
    throw badRequest(errorMessage, validationResponse)
  }
}

module.exports = {
  dataValidation,
  doesFieldExistInDataObject,
  eqCondition,
  neqCondition,
  gtCondition,
  gteCondition,
  containsCondition
}