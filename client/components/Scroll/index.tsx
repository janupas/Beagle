import { Ref } from 'react'
import Styles from './scroll.module.scss'

import { AiOutlineArrowDown } from 'react-icons/ai'

interface ScrollProps {
  scrollRef: any
}

export const Scroll = ({ scrollRef }: ScrollProps) => {
  const handleClick = () => {
    scrollRef?.current?.scrollIntoView({ behaviour: 'smooth' })
  }

  return (
    <div className={Styles.container}>
      <button className={Styles.button} onClick={handleClick}>
        <AiOutlineArrowDown fontSize={20} />
      </button>
    </div>
  )
}
