const httpStatus = require('http-status')

const badRequest = (message, data = null) => {
  return {
    message, httpCode: httpStatus.BAD_REQUEST,data
  }
}

const okRequest = (message, data) => {
  return {
    message, data
  }
}

module.exports = {
  badRequest, okRequest
}
