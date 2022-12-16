import { SyntheticEvent, useContext, useEffect } from 'react'

import Styles from '../styles/pages/index.module.scss'

import { Header, HeaderType } from '../components/header'
import { Container } from '../components/container'
import { Button } from '../components/button'
import { Input } from '../components/input'

import { authContext, AuthContext } from '../context/AuthContext'

import { socket } from '../socket/socket'

import { useRouter } from 'next/router'
import { UserContext, userContext } from '../context/UserContext'
import { ChatContext, chatContext } from '../context/ChatContext'

const Index = () => {
  const router = useRouter()

  const { setUsers } = useContext(userContext) as UserContext
  const { name, room, setName, setRoom } = useContext(
    authContext
  ) as AuthContext
  const { setChat } = useContext(chatContext) as ChatContext

  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault()

    // Validating the form
    if (typeof name !== 'undefined' && typeof room !== 'undefined') {
      if (name.length > 20 || name.length === 0 || room.length === 0) {
        alert('Please enter a valid name and room')
        return
      }
    }

    // Joining a room
    if (room !== '') {
      router.push('/chats/public')

      socket.emit('join', { id: socket.id, name, room })
    }
  }

  useEffect(() => {
    socket.on('users', (payload) => {
      setUsers(payload.users)
    })
  }, [socket])

  useEffect(() => {
    socket.on('load-messages', (payload) => {
      setChat(payload.messages)
    })
  }, [])

  return (
    <div>
      <Container>
        {/** Rendering the custom beagle header  */}
        <Header title={`Beagle`} type={HeaderType.BIG} />

        <div className={Styles.box}>
          <Header title="Join room" type={HeaderType.H1} />

          <Input
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <Input
            type="text"
            placeholder="Room"
            value={room}
            onChange={(e) => setRoom(e.target.value)}
          />

          <Button label="Join" onClick={handleSubmit} />
        </div>
      </Container>
    </div>
  )
}

export default Index
