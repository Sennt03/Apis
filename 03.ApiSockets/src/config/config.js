if(process.env.NODE_ENV != 'production'){
    require('dotenv').config()
}

const config = {
    whiteList: ['http://localhost:4200', 'https://myapp.com'],
    dev: process.env.NODE_ENV != 'production',
    dbUri: process.env.MONGODB_URI || 'mongodb://localhost:27017/apiexample',
    port: process.env.PORT || 3000,
    jwtSecret:  process.env.JWT_sECRET || 'secret in key gen'
}

module.exports = config