import { Header, HeaderType } from '../components/header'
import Styles from '../styles/pages/index.module.scss'
import { Context, context } from '../context/Context'
import { Container } from '../components/container'
import { SyntheticEvent, useContext } from 'react'
import { Button } from '../components/button'
import { Input } from '../components/input'
import { useRouter } from 'next/router'

const Index = () => {
  const router = useRouter()

  const contextValues: Context = useContext(context)

  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault()

    // Validating the form
    if (
      typeof contextValues.name !== 'undefined' &&
      typeof contextValues.room !== 'undefined'
    ) {
      if (
        contextValues.name.length > 20 ||
        contextValues.name.length === 0 ||
        contextValues.room.length === 0
      ) {
        alert('Please enter a valid name and room')
        return
      }
    }

    // Checking if the room is public or a custom one
    if (contextValues.room === 'public') {
      router.push('/chats/public')
    } else {
      router.push(`/chats/${contextValues.room}`)
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
            value={contextValues.name}
            onChange={(e) => contextValues.setName?.(e.target.value)}
          />
          <Input
            type="text"
            placeholder="Room"
            value={contextValues.room}
            onChange={(e) => contextValues.setRoom?.(e.target.value)}
          />

          <Button label="Join" onClick={handleSubmit} />
        </div>
      </Container>
    </div>
  )
}

export default Index
