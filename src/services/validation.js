const { dataValidation } = require("../helpers/dataValidation");
const { badRequest } = require("../helpers/responseHelpers");
const { ruleValidation } = require("../helpers/ruleValidation");

const ValidationService = (reqBody) => {
  const {rule, data} = reqBody;
  // check if reqBody contains more than two fields, the ruleValidation and dataValidation
  // functions would check if 'rule' and 'data' are passed respectively
  if (Object.keys(reqBody).length !== 2) {
    throw badRequest('Invalid JSON payload passed.')
  }
  // perform rule validation
  ruleValidation(rule);
  return dataValidation(rule, data);
}

module.exports = {
  ValidationService,
}