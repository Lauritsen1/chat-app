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
    io.to(room).emit('receive-message', message)
  })

  socket.on('join-room', (room) => {
    socket.join(room)
  })

  socket.on('leave-room', (room) => {
    socket.leave(room)
  })
})

server.listen(3001, () => {
  console.log('Server listening on port 3001')
})
