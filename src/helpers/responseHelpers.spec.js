const ResponseHelper = require("./responseHelpers");

describe('badRequest', () => {
  it('should return an httpCode of 400', () => {
    const response = ResponseHelper.badRequest("bad request");
    expect(response.httpCode).toEqual(400)
    expect(response.message).toEqual('bad request')
    expect(response.data).toBe(null);
  })

  it ('data should contain a validation object is data is passed', () => {
    const response = ResponseHelper.badRequest('bad Request', {key: 'value'});
    expect(response.data).toHaveProperty('validation', {key: 'value'})
  })
});

describe('okRequest', () => {

  it ('data should contain a validation object', () => {
    const response = ResponseHelper.okRequest('ok Request', {key: 'value'});
    expect(response.data).toHaveProperty('validation', {key: 'value'})
  })
});