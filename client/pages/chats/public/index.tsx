import { useRouter } from 'next/router'
import { useContext, useEffect, useState } from 'react'
import { Button } from '../../../components/button'
import { Chats, Message } from '../../../components/chats'
import { Container } from '../../../components/container'
import { Header } from '../../../components/header'
import { Input } from '../../../components/input'
import { context } from '../../../context/Context'
import socket from '../../../socket/socket'
import { AiOutlineSend } from 'react-icons/ai'

const PublicChatRoom = () => {
  const [chat, setChat] = useState<Array<Message>>([])
  const [message, setMessage] = useState<string>('')
  const { name, setId }: any = useContext(context)
  const router = useRouter()

  const handleSend = (e: any) => {
    if (message.length) {
      // Emitting the messages
      socket.emit('message', {
        value: message,
        from: { id: socket.id, name },
      })

      // Empty the message field
      setMessage('')
    }
  }

  useEffect(() => {
    // Redirecting user back to home page if a name is not found
    if (typeof name === 'undefined' || name.length === 0) {
      router.push('/')
    }
  }, [name])

  useEffect(() => {
    /**
     * Listening and getting the sent message from the server socket,
     *  and setting it to the state
     */
    socket.on('message-back', (payload) => {
      const newMessage: Message = {
        value: payload.value,
        from: {
          id: payload.from.id,
          name: payload.from.name,
        },
      }

      setChat([...chat, newMessage])
    })
  }, [socket, chat])

  return (
    <div>
      <Container>
        <Header title="Public chat room" />

        {/** Rendering the chats */}
        <Chats messages={chat} />

        <div style={{ marginTop: 30, display: 'flex' }}>
          <Input
            type="text"
            placeholder="Your message..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
          <Button label={<AiOutlineSend />} onClick={handleSend} />
        </div>
      </Container>
    </div>
  )
}

export default PublicChatRoom
