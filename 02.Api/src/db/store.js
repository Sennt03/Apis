class Store{

    constructor(model){
        this.Model = model
    }

    addOne(data){
        const newModel = new this.Model(data)
        return newModel.save()
    }

    findOneById(id, options = {}){
        return this.Model.findById(id, options)
    }

    findAll(query = {}){
        return this.Model.find(query)
    }
    
    findOne(query = {}, options = {}){
        return this.Model.findOne(query, options)
    }

    query(query, dataQuery = {}, options = {}){
        return this.Model[query](dataQuery, options = {})
        // return Model.find({email: 'davidrsmk'})
    }
}

module.exports = Store