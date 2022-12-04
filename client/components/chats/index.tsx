import React, { useEffect, useRef } from 'react'
import { socket } from '../../socket/socket'
import Styles from './chats.module.scss'

export enum MessageType {
  MESSAGE = 'message',
  NOTIFICATION = 'notification',
}
interface ChatsProps {
  messages: Array<Message>
}

interface From {
  id: string
  name: string
}

export interface Message {
  value: string
  from?: From
  time?: string
  type?: MessageType
}

export const Chats = ({ messages }: ChatsProps) => {
  const scrollRef = useRef<any>(null)

  // Scroll to bottom on change of messages
  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behaviour: 'smooth' })
  }, [messages])

  return (
    <React.Fragment>
      <div className={Styles.chats}>
        {/** Mapping through messages */}
        {messages.map((message: Message, index) => {
          return (
            <React.Fragment key={index}>
              {/** Checking the owner of the message */}
              {message.type === MessageType.MESSAGE ? (
                <>
                  {message.from?.id === socket.id ? (
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
                            {message.from?.name}
                          </span>
                          <span>{message.value}</span>
                          <span
                            className={`${Styles.date} ${Styles.their_date}`}
                          >
                            {message.time}
                          </span>
                        </div>
                      </div>
                    </div>
                  )}
                </>
              ) : (
                <div className={Styles.notification}>
                  <p>{message.value}</p>
                </div>
              )}
            </React.Fragment>
          )
        })}

        {/** Div to scroll to bottom */}
        <div ref={scrollRef} />
      </div>
    </React.Fragment>
  )
}
