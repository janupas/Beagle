import Styles from './input.module.scss'

interface InputProps {
  type: string
  placeholder: string
  value: any
  disabled?: boolean
  onChange: (e: any) => any
  onKeyDown?: (e: any) => any
}

export const Input = (props: InputProps) => {
  return <input {...props} className={Styles.input} />
}
