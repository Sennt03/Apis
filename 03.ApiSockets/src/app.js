const express = require('express')
const cors = require('cors')
const router = require('./network/routes')
const errHandler = require('./middlewares/errorHandlers')
const socket = require('./socket/socket')
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
        this.server = require('http').Server(this.app)
        this.middlewares()
        this.initializations()
        this.routes()
        this.errHandlers()
    }

    middlewares(){
        this.app.use(cors(optionsCors));
        this.app.use(express.json())
        this.app.use(express.urlencoded({extended: true}))
    }

    initializations(){
        db()
        socket.connect(this.server)
    }

    routes(){
        router(this.app)
    }

    errHandlers(){
        this.app.use(errHandler.logErrors)
        this.app.use(errHandler.errorHandler)
    }

    start(){
        this.server.listen(config.port, () => {
            console.log('Server on port', config.port)
        })
    }

}

module.exports = App