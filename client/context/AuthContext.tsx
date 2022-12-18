import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useState,
} from 'react'

interface AuthContextProps {
  children: ReactNode | ReactNode[]
}

export interface AuthContext {
  name: string
  room: string
  setName: Dispatch<SetStateAction<string>>
  setRoom: Dispatch<SetStateAction<string>>
}

export const authContext = createContext<AuthContext | {}>({})

export const AuthContextProvider = ({ children }: AuthContextProps) => {
  const [name, setName] = useState<string>('')
  const [room, setRoom] = useState<string>('public')

  return (
    <authContext.Provider value={{ name, setName, room, setRoom }}>
      {children}
    </authContext.Provider>
  )
}
