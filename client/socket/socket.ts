import { io, Socket } from 'socket.io-client'

export const socket: Socket = io(`${process.env.NEXT_PUBLIC_SERVER_URL}`)

// Set the socket id to local storage
socket.on('connect', () => {
  console.log('Socket connected: ' + socket.id)
})
