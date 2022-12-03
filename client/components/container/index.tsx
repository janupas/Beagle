import Styles from './container.module.scss'
import { ReactNode } from 'react'

interface ContainerProps {
  children: ReactNode | ReactNode[]
}

export const Container = ({ children }: ContainerProps) => {
  return <div className={Styles.container}>{children}</div>
}
