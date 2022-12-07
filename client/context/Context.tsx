import { createContext, ReactNode, useState } from 'react'

export const context = createContext({})

export enum MessageType {
  MESSAGE = 'message',
  NOTIFICATION = 'notification',
}

export interface From {
  id: string
  name: string
}

export interface Message {
  value: string
  from?: From
  time?: string
  type?: MessageType
}

export interface User {
  id: string
  username: string
}

export const Context = ({ children }: { children: ReactNode }) => {
  const [room, setRoom] = useState<string>('public')
  const [name, setName] = useState<string>('')
  const [modal, setModal] = useState<boolean>(false)
  const [chat, setChat] = useState<Message[]>([])
  const [users, setUsers] = useState<User[]>([])

  return (
    <context.Provider
      value={{
        room,
        setRoom,
        name,
        setName,
        chat,
        setChat,
        users,
        setUsers,
        modal,
        setModal,
      }}
    >
      {children}
    </context.Provider>
  )
}
