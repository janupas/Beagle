import { ReactNode } from 'react'
import Styles from './container.module.scss'

interface ContainerProps {
  children: ReactNode | ReactNode[]
}

export const Container = ({ children }: ContainerProps) => {
  return <div className={Styles.container}>{children}</div>
}
