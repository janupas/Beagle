import { useRouter } from 'next/router'
import { useContext } from 'react'
import { Button } from '../components/button'
import { Container } from '../components/container'
import { Header } from '../components/header'
import { Input } from '../components/input'
import { context } from '../context/Context'

const Index = () => {
  const router = useRouter()
  const { name, setName }: any = useContext(context)

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
        <Header title={`Welcome to my chat application`} />

        <div style={{ marginTop: 50 }}>
          <form>
            <Input
              type="text"
              placeholder="Your name..."
              value={name}
              onChange={(e) => setName(e.target.value)}
            />

            <Button label="Join the public room" onClick={handleSubmit} />
          </form>
        </div>
      </Container>
    </div>
  )
}

export default Index
