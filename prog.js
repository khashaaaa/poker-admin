// Express config
const path = require('path')
const express = require('express')
const cors = require('cors')
const prog = express()

prog.use(cors())
prog.use(express.static('public'))
prog.use(express.json())
prog.use(express.urlencoded({ extended: true }))

// Handlebars config
var handlebars = require('express-handlebars').create({
    layoutsDir: path.join(__dirname, 'template/layouts'),
    partialsDir: path.join(__dirname, 'template/components'),
    defaultLayout: 'main',
    extname: 'handlebars'
})
prog.engine('handlebars', handlebars.engine)
prog.set('view engine', 'handlebars')
prog.set('views', path.join(__dirname, 'template'))

// Socket connection
const http = require('http').createServer(prog)
const { Server } = require('socket.io')

const io = new Server(http, {
    cors: {
        origin: "http://localhost:3000"
    }
})
io.on('connection', socket => {
    console.log('User is connected: ' + socket.id)

    socket.on('join_room', ({room, username}) => {
        socket.join(room)
        console.log(`User ${username} is joined the room: ${room}`)
    })

    socket.on('send_message', (msg) => {
        socket.to(msg.room).emit('receive_message', msg)
    })

    socket.on('disconnect', () => {
        console.log(`User ${socket.id} is left the room`)
    })
})

// Routes
const { AdminRouter } = require('./routes/AdminRouter')
const { RoundRouter } = require('./routes/RoundRouter')

prog.use('/admin', AdminRouter)
prog.use('/round', RoundRouter)

// Program initialization and database migration
const { connector } = require('./database/connector')

const { AdminModel } = require('./models/AdminModel')
const { RoundModel } = require('./models/RoundModel')
const { PlayerModel } = require('./models/PlayerModel')

http.listen(8001, (aldaa, holbolt) => connector.connect((errcon, conn) => {

    AdminModel.init((error, result) => {
        if(error) {
            console.log(error)
        }
    })

    RoundModel.init((error, result) => {
        if(error) {
            console.log(error)
        }
    })

    PlayerModel.init((error, result) => {
        if(error) {
            console.log(error)
        }
    })

    if(aldaa) {
        console.log(aldaa)
    }

    if(errcon) {
        console.log('Error: ' + errcon)
    }

    console.log('Database migrated')
}))