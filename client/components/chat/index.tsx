import { From } from '../../context/ChatContext'

import Styles from './chat.module.scss'

export enum MessageStatus {
  SENT = 'sent',
  RECEIVED = 'received',
}

interface Chat {
  status: MessageStatus
  value: string
  time?: string
  from?: From
}

export const Chat = ({ value, time, status, from }: Chat) => {
  if (status === MessageStatus.SENT) {
    return (
      <div className={`${Styles.my_chat} ${Styles.chat}`}>
        <div className={`${Styles.text} ${Styles.my_text}`}>
          <span>{value}</span>
          <span className={Styles.date}>{time}</span>
        </div>
      </div>
    )
  }

  if (status === MessageStatus.RECEIVED) {
    return (
      <div className={`${Styles.their_chat} ${Styles.chat}`}>
        <div>
          <div className={`${Styles.text} ${Styles.their_text}`}>
            <span className={Styles.sender_name}>{from?.name}</span>
            <span>{value}</span>
            <span className={`${Styles.date} ${Styles.their_date}`}>
              {time}
            </span>
          </div>
        </div>
      </div>
    )
  }

  return <></>
}
