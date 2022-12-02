import { createContext, ReactNode, useState } from 'react'

export const context = createContext({})

export const Context = ({ children }: { children: ReactNode }) => {
  const [room, setRoom] = useState<string>('public')
  const [name, setName] = useState<string>('')

  return (
    <context.Provider value={{ name, setName, room, setRoom }}>
      {children}
    </context.Provider>
  )
}
