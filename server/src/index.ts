import express, { Request, Response } from 'express'
import { createServer } from 'http'
import { Server } from 'socket.io'
import { addMessage, connect, getAllMessages } from './db'
import dotenv from 'dotenv'
import cors from 'cors'

dotenv.config()

const app = express()
const httpServer = createServer(app)

app.use(cors())

connect()

const io = new Server(httpServer, {
  cors: {
    origin: process.env.CLIENT_URL,
    methods: ['GET', 'POST'],
  },
})

interface User {
  username: string
  id: string
}

let online_users: Array<User> = []

// Connecting to socket
io.on('connection', (socket) => {
  console.log('User connected: ' + socket.id)

  socket.on('join', (payload) => {
    io.emit('user-changed', { value: `${payload.name} just joined` })
    addMessage({
      value: `${payload.name} just joined`,
      type: 'notification',
    }).then((res) => {
      console.log(res)
    })

    online_users.push({ username: payload.name, id: socket.id })
  })

  socket.on('message', (payload) => {
    addMessage({ ...payload, type: 'message' }).then((res) => {
      console.log(res)
    })

    io.emit('message-back', payload)
  })

  socket.on('disconnect', () => {
    const user = online_users.find((user) => user.id === socket.id)

    if (typeof user?.username !== 'undefined') {
      addMessage({ value: `${user?.username} just got disconnected` }).then(
        (res) => {
          console.log(res)
        }
      )
      io.emit('user-changed', {
        value: `${user?.username} just got disconnected`,
      })

      online_users = online_users.filter((user) => user.id !== socket.id)
    }
  })
})

app.get('/', (req: Request, res: Response<{ msg: string }>) => {
  res.json({
    msg: 'Welcome to my chat app server',
  })
})

app.get('/messages', async (req: Request, res: Response) => {
  const messages = await getAllMessages()

  res.json({ messages })
})

httpServer.listen(process.env.PORT, () =>
  console.log('Server listening on port ' + process.env.PORT)
)
