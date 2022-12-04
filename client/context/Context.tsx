import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useState,
} from 'react'

export const context = createContext({})

export interface Context {
  room?: string
  name?: string
  setRoom?: Dispatch<SetStateAction<string>>
  setName?: Dispatch<SetStateAction<string>>
}

export const Context = ({ children }: { children: ReactNode }) => {
  const [room, setRoom] = useState<string>('public')
  const [name, setName] = useState<string>('')

  const contextValues: Context = {
    room,
    name,
    setName,
    setRoom,
  }

  return <context.Provider value={contextValues}>{children}</context.Provider>
}
