import React, { useContext } from 'react'
import { context } from '../../context/Context'
import socket from '../../socket/socket'
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
  return (
    <React.Fragment>
      <div className={Styles.chats}>
        {messages.map((message: Message, index) => {
          return (
            <React.Fragment key={index}>
              {/** Checking the owner of the message */}
              {message.from.id === socket.id ? (
                <div className={`${Styles.my_chat} ${Styles.chat}`}>
                  <div className={`${Styles.text} ${Styles.my_text}`}>
                    <span>{message.value}</span>
                  </div>
                </div>
              ) : (
                <div className={`${Styles.their_chat} ${Styles.chat}`}>
                  <div>
                    <div className={`${Styles.text} ${Styles.their_text}`}>
                      <span>{message.value}</span>
                    </div>
                  </div>
                </div>
              )}
            </React.Fragment>
          )
        })}
      </div>
    </React.Fragment>
  )
}
