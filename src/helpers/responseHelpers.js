const httpStatus = require('http-status')

const badRequest = (message, data = null) => {
  // eslint-disable-next-line no-param-reassign
  data = data ? {validation: data} : data;
  return {
    message, httpCode: httpStatus.BAD_REQUEST,data
  }
}

const okRequest = (message, data) => {
  return {
    message, data: {validation: data}
  }
}

module.exports = {
  badRequest, okRequest
}
