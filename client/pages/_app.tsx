import { Context } from '../context/Context'
import '../styles/global.scss'

// Custom app
const App = ({
  Component,
  pageProps,
}: {
  Component: any
  pageProps: Object
}) => {
  return (
    <Context>
      <Component {...pageProps} />
    </Context>
  )
}

export default App
