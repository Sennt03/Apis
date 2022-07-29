// const myError = require('../../libs/myError')
const Model = require('./model')
const Store = require('../../db/store')
const store = new Store(Model)

function getUser(id){
    return store.findOneById(id)
}

module.exports = {
    getUser
}