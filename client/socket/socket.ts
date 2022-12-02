import { io } from 'socket.io-client'

const socket = io(`${process.env.NEXT_PUBLIC_SERVER_URL}`)

// Set the socket id to local storage
socket.on('connect', () => {
  console.log('Socket connected: ' + socket.id)
})

export default socket
