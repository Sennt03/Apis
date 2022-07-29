const router = require('express').Router()
const controller = require('./controller')
const response = require('../../network/response')
const { verifyToken } = require('../../middlewares/authHandlers')

router.get('/', verifyToken, async (req, res, next) => {
    const { _id } = req.user
    try{
        const user = await controller.getUser(_id)
        response.success(req, res, user)
    }catch(error){
        next(error)
    }
})

module.exports = router