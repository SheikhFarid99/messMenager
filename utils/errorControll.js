const errorControll = (res, code, message) => {
    res.status(code).json(message)
}
module.exports = errorControll