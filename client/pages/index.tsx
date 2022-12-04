import { Header, HeaderType } from '../components/header'
import Styles from '../styles/pages/index.module.scss'
import { Container } from '../components/container'
import { Button } from '../components/button'
import { context } from '../context/Context'
import { Input } from '../components/input'
import { useRouter } from 'next/router'
import socket from '../socket/socket'
import { useContext } from 'react'

const Index = () => {
  const router = useRouter()
  const { name, setName, room, setRoom }: any = useContext(context)

  const handleSubmit = (e: any) => {
    e.preventDefault()

    // Validating the form
    if (name.length < 2 || name.length >= 25) {
      alert(
        'Please insert a name more than 2 characters and less than 25 characters'
      )
      return
    }

    // Validating the room field
    if (!room) {
      alert('Please enter a room name')
      return
    }

    // Checking if the room is public or a custom one
    if (room === 'public') {
      router.push('/chats/public')

      socket.emit('join', { id: socket.id, name })
    }
  }

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
            disabled={true}
          />

          <Button label="Join" onClick={handleSubmit} />
        </div>
      </Container>
    </div>
  )
}

export default Index
