import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useState,
} from 'react'

interface ChatContextInterface {
  children: ReactNode | ReactNode[]
}

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

export interface ChatContext {
  chat: Message[]
  setChat: Dispatch<SetStateAction<Message[]>>
}

export const chatContext = createContext<ChatContext | {}>({})

export const ChatContextProvider = ({ children }: ChatContextInterface) => {
  const [chat, setChat] = useState<Message[]>([])

  return (
    <chatContext.Provider value={{ chat, setChat }}>
      {children}
    </chatContext.Provider>
  )
}
