import { createContext, ReactNode, useState } from 'react'

export const context = createContext({})

export const Context = ({ children }: { children: ReactNode }) => {
  const [name, setName] = useState<string>('')
  const [id, setId] = useState<string>('')

  return (
    <context.Provider value={{ name, setName, id, setId }}>
      {children}
    </context.Provider>
  )
}
