import { AuthContextProvider } from '../context/AuthContext'
import { ChatContextProvider } from '../context/ChatContext'
import { ModalContextProvider } from '../context/ModalContext'
import { UserContextProvider } from '../context/UserContext'

import '../styles/global.scss'

interface AppProps {
  Component: any
  pageProps: Object
}

// Custom app
const App = ({ Component, pageProps }: AppProps) => {
  return (
    <ModalContextProvider>
      <AuthContextProvider>
        <ChatContextProvider>
          <UserContextProvider>
            <Component {...pageProps} />
          </UserContextProvider>
        </ChatContextProvider>
      </AuthContextProvider>
    </ModalContextProvider>
  )
}

export default App
