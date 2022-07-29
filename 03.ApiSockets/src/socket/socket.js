const socketIO = require('socket.io')
const config = require('../config/config')
const listenEvents = require('./events/listenEvents')
const socket = {}


function connect(server){
    socket.io = socketIO(server, { cors: { origins: config.originsSocket } })

    listenSockets()
}

function listenSockets(){
    console.log('Escuchando conexiones')

    socket.io.on('connection', client => {
        console.log('Client connected')
        // console.log(client.handshake.query)
        // console.log(client.join(nameRoom))
        // console.log(client.emit(nameRoom).emit('event', payload)) emite a todos (los de la sala) incluyendote
        // console.log(client.to(nameRoom).emit('event', payload)) emite a todos (los de la sala) menos a ti
        // console.log(client)
        // console.log(client.time)
        console.log('New client', client.id)
        

        // Conectar cliente
        listenEvents.connectClient(client, socket.io)
        listenEvents.disconnectClient(client, socket.io)
        // listenEvent.mensaje(cliente, socket.io)
        // listenEvent.configurarUsuarios(cliente, socket.io)
        // listenEvent.obtenerUsuarios(cliente, socket.io)

    })
}

function emitEvent(event, payload){
    socket.io.emit(event, payload)
}


module.exports = {
    connect,
    // socket,
    emitEvent
}