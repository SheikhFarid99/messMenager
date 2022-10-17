const errorControll = require('../../utils/errorControll')
const validator = require('validator')
const bcrpty = require('bcrypt');
const formidable = require('formidable')
const nodemailer = require('nodemailer')
const authModel = require('../../models/authModel')
class authController {
    register = async (req, res) => {
        const form = formidable({ multiples: true })
        form.parse(req, async (error, fileds, files) => {
            if (error) {
                return errorControll(res, 500, { message: 'Internal server error', error: error })
            } else {
                const errorObj = {}
                const { name, username, email, password, type } = fileds
                if (!name) {
                    errorObj.name = 'please provide your name'
                }
                if (!username) {
                    errorObj.username = 'please provide your username'
                }
                if (!type) {
                    errorObj.type = 'please provide your acount type'
                }
                if (!password) {
                    errorObj.password = 'please provide your password'
                }
                if (!email) {
                    errorObj.password = 'please provide your email'
                }
                if (email && !validator.isEmail(email)) {
                    errorObj.password = 'please provide your valid email'
                }
                if (!files.image) {
                    errorObj.image = 'please provide your image'
                }
                if (Object.keys(errorObj).length > 0) {
                    return errorControll(res, 404, { error: errorObj })
                } else {
                    try {
                        const user = await authModel.findOne({ email });
                        if (user) {
                            return errorControll(res, 404, { message: 'Email already use' })
                        } else {
                            const otp = Math.floor(Math.random() * 100000 + 345678)
                            const transporter = nodeMiler.createTransport({
                                service: 'Gmail',
                                auth: {
                                    user: process.env.USER_EMAIL,
                                    pass: process.env.USER_PASSWORD
                                }
                            })

                            const mailOption = {
                                from: process.env.USER_EMAIL,
                                to: email,
                                subject: ' Sending email mern blog',
                                html: `<div style={padding:"10px"}>
                                    <h3>Your otp code ${otp}</h3>
                                </div>`
                            }

                            //email send
                            await transporter.sendMail(mailOption)

                            const verifyEmailToken = jwt.sign({
                                email,
                                name,
                                username,
                                password: await bcrpty.hash(password, 10),
                                image: files,
                                otpCode: otp,
                                type
                            }, process.env.SECRET, {
                                expiresIn: process.env.TOKEN_EXP
                            })

                            const option = {
                                expires: new Date(Date.now() + 1 * 24 * 60 * 60 * 1000)
                            }
                            res.status(201).cookie('emailVerifyToken', verifyEmailToken, option).json({ successMessage: "Check your email and submit otp" })


                        }
                    } catch (error) {
                        return errorControll(res, 500, { message: 'Internal server error', error })
                    }
                }

            }
        })
    }
}
module.exports = new authController()