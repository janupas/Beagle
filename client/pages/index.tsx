import { useRouter } from 'next/router'
import { useContext } from 'react'
import { Button } from '../components/button'
import { Container } from '../components/container'
import { Header, HeaderType } from '../components/header'
import { Input } from '../components/input'
import { context } from '../context/Context'
import Styles from '../styles/pages/index.module.scss'

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

    router.push('/chats/public')
  }

  return (
    <div>
      <Container>
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
