import React, { useEffect, useRef } from 'react'

import { socket } from '../../socket/socket'

import { Chat, MessageStatus } from '../chat'
import { Notification } from '../notification'

import Styles from './chats.module.scss'

import { Message, MessageType } from '../../context/ChatContext'
import { Scroll } from '../Scroll'

export interface ChatsProps {
  messages: Array<Message>
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
        <div>
          <Scroll scrollRef={scrollRef} />
        </div>

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
                    <Chat
                      value={message.value}
                      time={message.time}
                      status={MessageStatus.SENT}
                    />
                  ) : (
                    /**
                     * Messages got by others
                     */
                    <Chat
                      value={message.value}
                      time={message.time}
                      status={MessageStatus.RECEIVED}
                      from={message.from}
                    />
                  )}
                </>
              ) : (
                <Notification value={message.value} />
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
