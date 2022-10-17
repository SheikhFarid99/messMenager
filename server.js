const express = require('express')
const app = express()
const dotenv = require('dotenv')
const fs = require('fs')
const path = require('path')
const dbConnect = require('./config/dbConnect')

dotenv.config({
    path: 'config/config.env'
})

fs.readdirSync(`${__dirname}/routes/`).map((fileName) => {
    app.use(
        '/messMenager/api',
        require(path.join(
            `${__dirname}`,
            `/routes/`,
            `${fileName}`.replace('.js', '')
        ))
    );
});
dbConnect()
app.get('/', (req, res) => res.send('Hello World!'))
app.listen(process.env.PORT, () => console.log(`Server is running on port ${process.env.PORT}!`))