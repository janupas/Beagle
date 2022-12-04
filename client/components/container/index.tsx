import Styles from './container.module.scss'
import { ReactNode } from 'react'

export enum ContainerTypes {
  DEFAULT = 'default',
  CHAT = 'chat',
}

interface ContainerProps {
  children: ReactNode | ReactNode[]
  type?: ContainerTypes
}

export const Container = ({ children, type }: ContainerProps) => {
  let inlineStyles: Object = {}

  if (typeof type === 'undefined') {
    type = ContainerTypes.DEFAULT
  }

  // Giving a width 0f 95% percent to the chat container
  switch (type) {
    case ContainerTypes.DEFAULT:
      inlineStyles = { width: '80%' }
      break
    case ContainerTypes.CHAT:
      inlineStyles = { width: '90%', maxWidth: '1000px' }
      break
    default:
      break
  }

  return (
    <div className={`${Styles.container}`} style={inlineStyles}>
      {children}
    </div>
  )
}
