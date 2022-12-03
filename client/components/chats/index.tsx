import Styles from './chats.module.scss'
import socket from '../../socket/socket'
import React from 'react'

interface ChatsProps {
  messages: Array<Message>
}

interface From {
  id: string
  name: string
}

export interface Message {
  value: string
  from: From
  time: string
}

export const Chats = ({ messages }: ChatsProps) => {
  return (
    <React.Fragment>
      <div className={Styles.chats}>
        {/** Mapping through messages */}
        {messages.map((message: Message, index) => {
          return (
            <React.Fragment key={index}>
              {/** Checking the owner of the message */}
              {message.from.id === socket.id ? (
                /**
                 * Messages sent by the user
                 */
                <div className={`${Styles.my_chat} ${Styles.chat}`}>
                  <div className={`${Styles.text} ${Styles.my_text}`}>
                    <span>{message.value}</span>
                    <span className={Styles.date}>{message.time}</span>
                  </div>
                </div>
              ) : (
                /**
                 * Messages got by others
                 */
                <div className={`${Styles.their_chat} ${Styles.chat}`}>
                  <div>
                    <div className={`${Styles.text} ${Styles.their_text}`}>
                      <span className={Styles.sender_name}>
                        {message.from.name}
                      </span>
                      <span>{message.value}</span>
                      <span className={`${Styles.date} ${Styles.their_date}`}>
                        {message.time}
                      </span>
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
