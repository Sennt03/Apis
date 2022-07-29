const router = require('express').Router()

const auth = require('../components/auth/routes')
const user = require('../components/user/routes')

function routerApp(app){
    app.use('/api', router)
    router.use('/auth', auth)
    router.use('/user', user)
}

module.exports = routerApp