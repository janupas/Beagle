import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useState,
} from 'react'

interface ModalContextProps {
  children: ReactNode | ReactNode[]
}

export interface ModalContext {
  modal: boolean
  setModal: Dispatch<SetStateAction<boolean>>
}

export const modalContext = createContext<ModalContext | {}>({})

export const ModalContextProvider = ({ children }: ModalContextProps) => {
  const [modal, setModal] = useState<boolean>(false)

  return (
    <modalContext.Provider value={{ modal, setModal }}>
      {children}
    </modalContext.Provider>
  )
}
