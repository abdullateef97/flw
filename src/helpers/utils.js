const { badRequest } = require("./responseHelpers")

// checks if field exists
module.exports.fieldChecker = (field,fieldName) => {
  if (!field) throw badRequest(`${fieldName} is required.`)
}