const { failureResponse, successResponse } = require("../lib/response");
const { ValidationService } = require("../services/validation");

const ValidationController = async(req, res) => {
  const { body } = req;
  try {
    const validationResponse = ValidationService(body)
    return successResponse({res, ...validationResponse})
  } catch (error) {
    return failureResponse({res, ...error})
  }
}

module.exports = {
  ValidationController,
}