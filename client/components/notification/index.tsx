import Styles from './notification.module.scss'

interface Notification {
  value: string
}

export const Notification = ({ value }: Notification) => {
  return (
    <div className={Styles.notification}>
      <p>{value}</p>
    </div>
  )
}
