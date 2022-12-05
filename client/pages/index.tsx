import { SyntheticEvent, useContext, useEffect } from 'react'
import { Header, HeaderType } from '../components/header'
import Styles from '../styles/pages/index.module.scss'
import { Container } from '../components/container'
import { Button } from '../components/button'
import { context } from '../context/Context'
import { Input } from '../components/input'
import { socket } from '../socket/socket'
import { useRouter } from 'next/router'

const Index = () => {
  const router = useRouter()

  const { name, room, setName, setRoom, setChat, chat }: any =
    useContext(context)

  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault()

    // Validating the form
    if (typeof name !== 'undefined' && typeof room !== 'undefined') {
      if (name.length > 20 || name.length === 0 || room.length === 0) {
        alert('Please enter a valid name and room')
        return
      }
    }

    // Checking if the room is public or a custom one
    if (room === 'public') {
      router.push('/chats/public')

      socket.emit('join', { id: socket.id, name: name })
    }
  }

  useEffect(() => {
    async function fetchMessages() {
      const response = await fetch('http://localhost:5000/messages')
      const data = await response.json()

      setChat(data.messages)
    }

    fetchMessages()
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
            disabled={true}
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
