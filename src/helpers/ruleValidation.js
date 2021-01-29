const { badRequest } = require("./responseHelpers");
const { fieldChecker } = require("./utils");

module.exports.ruleValidation = (rule) => {
  // check if a rule is passed
  fieldChecker(rule, 'rule')

  // is a rule an object
  if (typeof rule !== 'object') throw badRequest('rule should be an object')

  // does rule contain 'field', 'condition' and  'condition_value' fields and are they of correct type
  const {field, condition, condition_value: conditionValue} = rule;
  fieldChecker(field, 'field');
  fieldChecker(condition, 'condition');
  fieldChecker(conditionValue, 'condition_value')
}


