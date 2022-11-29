import { Context } from '../context/Context'
import '../styles/global.scss'

interface AppProps {
  Component: any
  pageProps: Object
}

// Custom app
const App = ({ Component, pageProps }: AppProps) => {
  return (
    <Context>
      <Component {...pageProps} />
    </Context>
  )
}

export default App
