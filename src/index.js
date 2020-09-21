const express = require('express')
const http = require('http')
const path = require('path')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const socketio = require('socket.io')
const Filter = require('bad-words')

const {generateMessage, generateLocationMessage} = require('./utils/messages')
const {addUser, removeUser, getUser, getUsersInRoom, getListOfActiveRooms} = require('./utils/users')
const { response } = require('express')

const htmlDir = path.join(__dirname, '../public')
const port = process.env.PORT || 3000

const app = express()
const server = http.createServer(app)
const io = socketio(server)

//app.set('view engine', 'html');
app.use(express.json())
app.use(express.static(htmlDir))

// app.get('/', (req, res) => {
//     res.render('index')
// })

app.post('/chat.html', async (req, res) => {
    res.redirect('/chat.html')
})

app.post('/invite/', async (req, res) => {
    
    const body = req.body
    
    const uname = await jwt.sign(body, 'palash');
    const rname = await jwt.sign(body.room, 'palash');
    
    const responseSigned = {
        username: uname,
        room: rname
    }
    
    res.send({responseSigned})
})

app.get('/join/', async(req, res) => {
    const secretkey = req.query.q.split('::')
    //const a = await jwt.sign(req.query.split('::'))
    const a = await jwt.decode(secretkey[0], 'palash'), b = await jwt.decode(secretkey[0], 'palash');
    res.send(JSON.stringify({a, b}))
})

io.on('connection', (socket) => {
    console.log('New connection')

    socket.on('getActiveRooms', (callback) => {
        //rooms =  [{roomName: 'Room #1'}, {roomName: 'Room #2'}]
        
        io.emit('roomList', {
            rooms : getListOfActiveRooms()
        })
        callback()
    })
    
    socket.on('join', ({username, room}, callback) => {
        const {error, user} = addUser({ id: socket.id, username, room})

        if(error) {
            return callback(error)
        }

        socket.join(user.room)
        
        socket.emit('message', generateMessage('Admin', 'Welcome to the chat room'))
        // to used for particular users in the room
        socket.broadcast.to(user.room).emit('message', generateMessage(`${user.username} has joined!`))
        //console.log(getUsersInRoom(user.room))
        io.to(user.room).emit('roomData', {
            room: user.room,
            users: getUsersInRoom(user.room)
        })

        io.emit('roomList', {
            rooms : getListOfActiveRooms()
        })
        
        callback()

    })
    
    socket.on('typingEvent', () => {
        const user = getUser(socket.id)
        if(user) {
            socket.broadcast.to(user.room).emit('typingEventClient', {
                text: `${user.username} is typing.....`,
                isTyping: true
            })
        }
    })

    socket.on('notTypingEvent', () => {
        const user = getUser(socket.id)
        if(user) {
            socket.broadcast.to(user.room).emit('typingEventClient', {
                isTyping: false
            })
        }
    })

    socket.on('sendMessage', (message, callback) => {
        const filter = new Filter()
        if(filter.isProfane(message)) {
            return callback('Profanity is not allowed')
        }

        const user = getUser(socket.id)
        if(user) {
            io.to(user.room).emit('message', generateMessage(user.username, message))
        }
        callback()
    })

    socket.on('sendLocation', ({latitude, longitude}, callback) => {
        const text = `https://google.com/maps?q=${latitude},${longitude}`
        
        const user = getUser(socket.id)
        if(user) {
            io.to(user.room).emit('locationMessage', generateLocationMessage(user.username, text))
        }
        callback('Location shared!')
    })

    socket.on('disconnect', () => {
        const user = removeUser(socket.id)
        if(user) {
            io.to(user.room).emit('message', generateMessage('Admin', `${user.username} has left!`))
            io.to(user.room).emit('roomData', {
                room: user.room,
                users: getUsersInRoom(user.room)
            })

            io.emit('roomList', {
                rooms : getListOfActiveRooms()
            })

            io.emit('typingEventClient', {isTyping: false})
        }
    })
})

server.listen(port, () => {
    console.log('Listening on the port ' + port)
})