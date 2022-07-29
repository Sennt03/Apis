const express = require('express')
const cors = require('cors')
const router = require('./network/routes')
const errHandler = require('./middlewares/errorHandlers')
const config = require('./config/config')
const db = require('./db/connection')

const optionsCors = { origin: (origin, callback) => {
    if (config.whitelist.includes(origin) || !origin) callback(null, true);
        else callback(new Error('no permitido'));
    }
}

class App{

    constructor(){
        this.app = express()
        db()
        this.middlewares()
        this.routes()
        this.errHandlers()
    }

    middlewares(){
        this.app.use(cors(optionsCors));
        this.app.use(express.json())
        this.app.use(express.urlencoded({extended: true}))
    }

    routes(){
        router(this.app)
    }

    errHandlers(){
        this.app.use(errHandler.logErrors)
        this.app.use(errHandler.errorHandler)
    }

    start(){
        this.app.listen(config.port, () => {
            console.log('Server on port', config.port)
        })
    }

}

module.exports = App