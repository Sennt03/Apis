class Users{
    users

    constructor(users){
        this.users = users || []
    }

    addUser(user){
        this.users.push(user)
    }

    deleteUser(id){
        this.users = this.users.filter(user => user.id != id)
    }

    getList(){
        return this.users
    }
}

module.exports = Users