const ResponseHelper = require("./responseHelpers");

describe('badRequest', () => {
  it('should return an httpCode of 400', () => {
    const response = ResponseHelper.badRequest("bad request");
    expect(response.httpCode).toEqual(400)
    expect(response.message).toEqual('bad request')
  })
});