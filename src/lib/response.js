const httpStatus = require('http-status');

function respond({ res, status, httpCode, data, message }) {
  const response = {
    status,
    data,
    message,
  }
  res.setHeader('Content-Type', 'application/json')
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Credentials', 'true')
  res.setHeader('Access-Control-Allow-Method', '*')
  return res.status(httpCode).send(response)
}

const successResponse = ({ res, data, message }) => {
  return respond({ res, status: "success", httpCode: httpStatus.OK, data, message })
}

const failureResponse = ({ res, message, data, httpCode }) => {
  return respond({ res, status: "error", httpCode, data, message })
}

module.exports = {
  successResponse, failureResponse,
}