import Styles from './input.module.scss'

interface InputProps {
  type: string
  placeholder: string
  value: any
  onChange: (e: any) => any
}

export const Input = (props: InputProps) => {
  return <input {...props} className={Styles.input} />
}
