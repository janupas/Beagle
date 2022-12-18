import express, { Request, Response } from 'express'
import { createServer } from 'http'
import { Server } from 'socket.io'
import { addMessage, connect, getSpecificRoomMessages, getAllMessages } from './db'
import dotenv from 'dotenv'
import cors from 'cors'

dotenv.config()

const app = express()
const httpServer = createServer(app)

app.use(cors())

connect()

/**
 * Creating a new web socket server
 */
const io = new Server(httpServer, {
  cors: {
    origin: process.env.CLIENT_URL,
    methods: ['GET', 'POST'],
  },
})

interface User {
  username: string
  id: string
  room: string
}

let online_users: Array<User> = [] // Online users

// Connecting to socket
io.on('connection', (socket) => {
  console.log('User connected: ' + socket.id)

  /**
   * Event to handle when a user joined to the server
   */
  socket.on('join', async (payload) => {
    socket.join(payload.room);
    io.to(payload.room).emit('user-changed', { value: `${payload.name} just joined` })

    /**
     * Adding a notification to the database
     */
    addMessage({
      value: `${payload.name} just joined`,
      room: payload.room,
      type: 'notification',
    })

    online_users.push({ username: payload.name, id: socket.id, room: payload.room })

    // Get the old messages
    const oldMessages = await getSpecificRoomMessages(payload.room)

    io.to(payload.room).emit('load-messages', { messages: oldMessages })
    io.to(payload.room).emit('users', { users: online_users.filter(user => user.room === payload.room) })
  })

  /**
   * This will trigger when a user sent a message
   */
  socket.on('message', (payload) => {
    addMessage({ ...payload, type: 'message' })

    io.to(payload.room).emit('message-back', payload)
  })

  socket.on('disconnect', () => {
    /**
     * Finding the disconnected user
     */
    const user = online_users.find((user) => user.id === socket.id)

    if (typeof user?.username !== 'undefined') {
      addMessage({ value: `${user?.username} just got disconnected`, type: 'notification', room: user.room })

      io.to(user.room).emit('user-changed', {
        value: `${user?.username} just got disconnected`,
      })

      /**
       * Filtering the new users that are online
       */
      online_users = online_users.filter((user) => user.id !== socket.id)
      io.emit('users', { users: online_users })
    }
  })
})

app.get('/', (req: Request, res: Response<{ msg: string }>) => {
  res.json({
    msg: 'Welcome to my chat app server',
  })
})

app.get('/messages', async (req: Request, res: Response) => {
  const messages: any = await getAllMessages()

  res.json({ messages })
})

httpServer.listen(process.env.PORT, () =>
  console.log('Server listening on port ' + process.env.PORT)
)
