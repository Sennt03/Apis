const db = require('mongoose')
const config = require('../config/config')

db.Promise = global.Promise

// mongodb://localhost:27017/nodejs
async function connect(url = config.dbUri){
    await db.connect(url, {
        useNewUrlParser: true
    })
    console.log('DB connected successfull')
}

module.exports = connect