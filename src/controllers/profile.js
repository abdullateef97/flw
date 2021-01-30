const { successResponse } = require("../lib/response")

const ProfileController = async(req, res) => {
  const data = {
    name: 'Abdullateef Adeniran-Yusuf',
    github: 'abdullateef97',
    email: 'adeniranyusufabdullateef@gmail.com',
    mobile: '08132400359'
  }
  return successResponse({res, message: 'My Rule-Validation API', data})

}

module.exports = {
  ProfileController,
}