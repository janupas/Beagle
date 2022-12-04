import { Chats, Message, MessageType } from '../../../components/chats'
import { Container, ContainerTypes } from '../../../components/container'
import { useContext, useEffect, useState } from 'react'
import { Button } from '../../../components/button'
import { Header } from '../../../components/header'
import { context } from '../../../context/Context'
import { Input } from '../../../components/input'
import { AiOutlineSend } from 'react-icons/ai'
import socket from '../../../socket/socket'
import { useRouter } from 'next/router'

const PublicChatRoom = () => {
  const [chat, setChat] = useState<Array<Message>>([])
  const [message, setMessage] = useState<string>('')
  const { name }: any = useContext(context)
  const router = useRouter()

  const send = () => {
    if (message.length) {
      // Emitting the messages
      socket.emit('message', {
        value: message,
        from: { id: socket.id, name },
        time: new Date().toLocaleTimeString(),
      })

      // Empty the message field
      setMessage('')
    }
  }

  const handleSend = (e: any) => {
    send()
  }

  /**
   * Send the message if enter key got pressed
   */
  const handleKeyDown = (e: any) => {
    if (e.code === 'Enter' && e.keyCode === 13) {
      send()
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
        time: payload.time,
        type: MessageType.MESSAGE,
      }

      setChat([...chat, newMessage])
    })

    socket.on('user-changed', (payload) => {
      setChat([
        ...chat,
        {
          value: payload.value,
          type: MessageType.NOTIFICATION,
        },
      ])
    })
  }, [socket, chat])

  return (
    <div>
      <Container type={ContainerTypes.CHAT}>
        <Header title="Public chat room" />

        {/** Rendering the chats */}
        <Chats messages={chat} />

        <div style={{ marginTop: 30, display: 'flex' }}>
          <Input
            type="text"
            placeholder="Your message..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyDown={handleKeyDown}
          />
          <Button label={<AiOutlineSend />} onClick={handleSend} />
        </div>
      </Container>
    </div>
  )
}

export default PublicChatRoom
