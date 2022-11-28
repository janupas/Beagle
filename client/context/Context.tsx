import { createContext, ReactNode, useState } from 'react'

export const context = createContext({})

export const Context = ({ children }: { children: ReactNode }) => {
  const [name, setName] = useState<string>('')

  const joinPublicRoom = (e: any) => {
    e.preventDefault()

    console.log('Joining public room')
  }

  return (
    <context.Provider value={{ name, setName, joinPublicRoom }}>
      {children}
    </context.Provider>
  )
}
