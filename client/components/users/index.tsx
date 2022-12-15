import { useContext } from 'react'

import { userContext, UserContext } from '../../context/UserContext'
import { socket } from '../../socket/socket'

import Styles from './users.module.scss'

import { User } from '../../context/UserContext'

export const Users = () => {
  const { users } = useContext(userContext) as UserContext

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
