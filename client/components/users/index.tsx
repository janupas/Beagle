import { useContext } from 'react'

import { context, User } from '../../context/Context'
import { socket } from '../../socket/socket'

import Styles from './users.module.scss'

export const Users = () => {
  const { users }: any = useContext(context)

  return (
    <div className={Styles.users}>
      {users.map((user: User) => {
        return (
          <div key={user.id} className={Styles.user}>
            <p
              style={
                user.id === socket.id
                  ? { backgroundColor: 'black', color: 'white' }
                  : {}
              }
            >
              {user.username}
            </p>
          </div>
        )
      })}
    </div>
  )
}
