const errorControll = require('../../utils/errorControll')
const validator = require('validator')
const formidable = require('formidable')
class authController {
    register = async (req, res) => {
        const form = formidable({ multiples: true })
        form.parse(req, (error, fileds, files) => {
            if (error) {
                errorControll(res, 500, { message: 'Internal server error', error: error.message })
            } else {
                const errorObj = {}
                const { name, username, email, password, type } = fileds
                if (!name) {
                    error.name = 'please provide your name'
                }
                if (!username) {
                    error.username = 'please provide your username'
                }
                if (!type) {
                    error.type = 'please provide your acount type'
                }
                if (!password) {
                    error.password = 'please provide your password'
                }
                if (!email) {
                    error.password = 'please provide your email'
                }
                if (email && !validator.isEmail(email)) {
                    error.password = 'please provide your valid email'
                }

                if (Object.keys(errorObj).length > 0) {
                    errorControll(res, 404, { error: errorObj })
                }else{
                    console.log("not error")
                }

            }
        })
    }
}
module.exports = new authController()