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
                  <div className={`${Styles.my_chat} ${Styles.chat}`}>
                    <span>{message.value}</span>
                  </div>
                ) : (
                  <div className={`${Styles.their_chat} ${Styles.chat}`}>
                    <div>
                      <div>
                        <div>{message.from.name}</div>
                      </div>
                      <div>
                        <div>{message.value}</div>
                      </div>
                    </div>
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
