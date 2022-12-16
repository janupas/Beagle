import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useState,
} from 'react'

export interface User {
  id: string
  username: string
}

export interface UserContext {
  users: User[]
  setUsers: Dispatch<SetStateAction<User>>
}

interface UserContextProps {
  children: ReactNode | ReactNode[]
}

export const userContext = createContext<UserContext | {}>({})

export const UserContextProvider = ({ children }: UserContextProps) => {
  const [users, setUsers] = useState<User[]>([])

  return (
    <userContext.Provider value={{ users, setUsers }}>
      {children}
    </userContext.Provider>
  )
}
