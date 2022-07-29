const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const myError = require('../../libs/myError')
const config = require('../../config/config')
const Model = require('../user/model')
const Store = require('../../db/store')
const store = new Store(Model)

async function register(user){
    const password = await bcrypt.hash(user.password, 10)
    user.password = password
    const newUser = await store.addOne(user)
    const sendUser = createSendUser(newUser)

    const token = jwt.sign(sendUser, config.jwtSecret, { expiresIn: '15m' })
    
    return { user: sendUser, token }
}

async function login({ email, password }){
    const user = await store.findOne({ email })
    
    if(!user){
        throw myError('Unauthorized', 401)
    }

    const isMatch = await bcrypt.compare(password, user.password)
    if(!isMatch){
        throw myError('Unauthorized', 401)
    }

    const sendUser = createSendUser(user)
    const token = jwt.sign(sendUser, config.jwtSecret, { expiresIn: '15m' })    
    
    return { user: sendUser, token }
}

function createSendUser(user){
    return {
        _id: user._id,
        username: user.username,
        email: user.email
    }
}

module.exports = {
    register,
    login
}