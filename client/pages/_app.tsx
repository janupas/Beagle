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
    <>
      <Component {...pageProps} />
    </>
  )
}

export default App
