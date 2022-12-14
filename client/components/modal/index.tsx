import React from 'react'

import { Button } from '../button'

import Styles from './modal.module.scss'

interface ModalProps {
  handleClose: () => void
  show: boolean
  children: React.ReactNode | React.ReactNode[]
}

export const Modal = ({ handleClose, show, children }: ModalProps) => {
  const showHideClassName = show
    ? `${Styles.modal} ${Styles.display_block}`
    : `${Styles.modal} ${Styles.display_none}`

  return (
    <div className={showHideClassName}>
      <section className={Styles.modal_main}>
        {children}

        <Button label="Close" onClick={handleClose} />
      </section>
    </div>
  )
}
