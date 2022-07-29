const router = require('express').Router()
const controller = require('./controller')
const response = require('../../network/response')
const { registerValidator, loginValidator } = require('./validators') 
const { checkUserEmail } = require('../../middlewares/authHandlers') 

router.post('/register', registerValidator, checkUserEmail, async (req, res, next) => {
    const { username, email, password } = req.body
    try{
        const rta = await controller.register({ username, email, password })
        response.success(req, res, rta, 201)
    }catch(error){
        next(error)
    }
})

router.post('/login', loginValidator, async (req, res, next) => {
    const { email, password } = req.body
    try{
        const rta = await controller.login({ email, password })
        response.success(req, res, rta, 200)
    }catch(error){
        next(error)
    }
})

module.exports = router