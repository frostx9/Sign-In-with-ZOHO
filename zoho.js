/* eslint-disable camelcase */
// eslint-disable-next-line import/no-unresolved
const axios = require("axios")
const jwtDecode = require("jwt-decode")
const User = require("../../modles/user")

module.exports = {

  async post(req, res) {
    try {
      console.log("Hello")
      const { authCode } = req.body

      console.log("authCode", authCode)



      const client_id =  //client_id
      const client_secret = //client_secret
      const redirect_uri = //redirect_uri

      const url = `https://accounts.zoho.in/oauth/v2/token?client_id=${client_id}&client_secret=${client_secret}&grant_type=authorization_code&redirect_uri=${redirect_uri}&code=${authCode}`

      let response
      response = await axios.post(url)

      console.log("response", response)

      const decodeToken = jwtDecode(response.data.id_token)
      console.log(decodeToken.email)

      const user = await User.findOne({ email: decodeToken.email }).exec()
      if (user === null) return res.status(400).json({ error: true, message: "No User Found" })

      const payload = {
        // User payload For Token Creation
      }

      const token = JWT.sign(payload, process.env.SECRET, {
        expiresIn: "10h",
      })

      return res.status(200).json({ error: false, token })

    } catch (error) {
      return res.status(400).json({ error: true, message: error.message })
    }
  }
}
