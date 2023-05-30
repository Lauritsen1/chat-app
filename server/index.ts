const express = require('express')
const http = require('http')
const app = express()
const server = http.createServer(app)

import { Server } from 'socket.io'

const io = new Server(server, {
  cors: {
    origin: '*',
  },
})

io.on('connection', (socket) => {
  socket.on('send-message', (message, room) => {
    if (!room) {
      socket.broadcast.emit('receive-message', message)
    } else {
      socket.to(room).emit('receive-message', message)
    }
  })
})

server.listen(3001, () => {
  console.log('Server listening on port 3001')
})
