//const errorController = require('../utils/errorControll')
const mongoose = require('mongoose')
const dbConnect = async () => {
    try {
        await mongoose.connect(process.env.DB_URL)
        console.log("database connected....")
    } catch (error) {
        console.log(error)
    }
}
module.exports = dbConnect