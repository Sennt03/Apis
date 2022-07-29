const Users = require('../classes/Users')

const usersConnect = new Users()

module.exports = {

    connectClient(client, io){
        const user = createUser(client)
        usersConnect.addUser(user)
        io.emit('usuarios-activos', `Conectado ${client.id}`)
        // io.emit('a', `a`)
        // io.emit('b', `b`)
    },

    disconnectClient(client, io){

        client.on('disconnect', () => {
            console.log('Cliente disconnected')
            usersConnect.deleteUser(client.id)

            io.emit('usuarios-activos', usersConnect.getList())
        })
    },

    // mensaje(cliente, io){
    //     cliente.on('mensaje', (payload) => {
    //         console.log('Mensaje recibido ', payload)
            
    //         io.emit('mensaje-nuevo', payload)
    //     })
    // },

    // configurarUsuarios(cliente, io){
    //     cliente.on('configurar-usuario', (payload, callback) => {
            
    //         usuariosConectados.actualizarNombre(cliente.id, payload.nombre)
            
    //         io.emit('usuarios-activos', usuariosConectados.getLista())

    //         callback({
    //             ok: true,
    //             mensaje: 'Usuario fernando'
    //         })
    //     })
    // },

    // obtenerUsuarios(cliente, io){
    //     cliente.on('obtener-usuarios', () => {
            
    //         io.to(cliente.id).emit('usuarios-activos', usuariosConectados.getLista())

    //     })
    // },

}


function createUser(client){
    return {
        client,
        id: client.id
    }
}