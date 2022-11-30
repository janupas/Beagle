import React, { useContext } from 'react'
import { context } from '../../context/Context'
import Styles from './chats.module.scss'

interface ChatsProps {
  messages: Array<Message>
}

type From = {
  id: string
  name: string
}

export type Message = {
  value: string
  from: From
}

export const Chats = ({ messages }: ChatsProps) => {
  const { id }: any = useContext(context)

  return (
    <React.Fragment>
      {messages.length > 0 ? (
        <div className={Styles.chats}>
          {messages.map((message: Message, index) => {
            return (
              <React.Fragment key={index}>
                {message.from.id === id ? (
                  <div>
                    <span>
                      {message.from.name}: {message.value}
                    </span>
                  </div>
                ) : (
                  <div>
                    <span>
                      {message.from.name}: {message.value}
                    </span>
                  </div>
                )}
              </React.Fragment>
            )
          })}
        </div>
      ) : (
        ''
      )}
    </React.Fragment>
  )
}
