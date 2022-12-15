import { ReactNode } from 'react'

import Styles from './button.module.scss'

interface ButtonProps {
  label: string | ReactNode
  onClick: (e: any) => any
}

export const Button = ({ label, onClick }: ButtonProps) => {
  return (
    <button onClick={onClick} className={Styles.button}>
      {label}
    </button>
  )
}
