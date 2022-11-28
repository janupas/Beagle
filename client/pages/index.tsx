import { useContext } from 'react'
import { Container } from '../components/container'
import { Header } from '../components/header'
import { Input } from '../components/input'
import { Button } from '../components/button'
import { context } from '../context/Context'

const Index = () => {
  const { name, setName, joinPublicRoom }: any = useContext(context)

  return (
    <div>
      <Container>
        <Header title={`Welcome to my chat application`} />

        <div style={{ marginTop: 50 }}>
          <form>
            <Input
              type="text"
              placeholder="Your name..."
              value={name}
              onChange={(e) => setName(e.target.value)}
            />

            <Button label="Join the public room" onClick={joinPublicRoom} />
          </form>
        </div>
      </Container>
    </div>
  )
}

export default Index
