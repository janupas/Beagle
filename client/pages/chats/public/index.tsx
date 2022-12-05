import { Container, ContainerTypes } from '../../../components/container'
import { Header, HeaderType } from '../../../components/header'
import { context, MessageType } from '../../../context/Context'
import Styles from '../../../styles/pages/chat.module.scss'
import { useContext, useEffect, useState } from 'react'
import { Button } from '../../../components/button'
import { Chats } from '../../../components/chats'
import { Input } from '../../../components/input'
import { socket } from '../../../socket/socket'
import { AiOutlineSend } from 'react-icons/ai'
import { useRouter } from 'next/router'
import { Users } from '../../../components/users'

const PublicChatRoom = () => {
  const [message, setMessage] = useState<string>('')

  const { name, chat, setChat }: any = useContext(context)

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
      setMessage((message) => '')
    }
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
      setChat([
        ...chat,
        {
          value: payload.value,
          from: {
            id: payload.from.id,
            name: payload.from.name,
          },
          time: payload.time,
          type: MessageType.MESSAGE,
        },
      ])
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

        <div className={Styles.chat_box}>
          <div className={Styles.online_users}>
            <h2>Online users</h2>

            <Users />
          </div>
          <div className={Styles.chats}>
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
              <Button label={<AiOutlineSend />} onClick={send} />
            </div>
          </div>
        </div>
      </Container>
    </div>
  )
}

export default PublicChatRoom
