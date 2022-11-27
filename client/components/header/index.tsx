import Styles from './header.module.scss'

// Enum for the types of headers
export enum HeaderType {
  H1 = 'h1',
  H2 = 'h2',
  H3 = 'h3',
  H4 = 'h4',
  H5 = 'h5',
  H6 = 'h6',
}

interface HeaderProps {
  title: string
  type?: HeaderType
}

export const Header = ({ title, type }: HeaderProps) => {
  // Mapping different types of headers to the user input
  const headers = {
    h1: <h1 className={Styles.header}>{title}</h1>,
    h2: <h2 className={Styles.header}>{title}</h2>,
    h3: <h3 className={Styles.header}>{title}</h3>,
    h4: <h4 className={Styles.header}>{title}</h4>,
    h5: <h5 className={Styles.header}>{title}</h5>,
    h6: <h6 className={Styles.header}>{title}</h6>,
  }

  // Setting the default size to h1
  if (typeof type === 'undefined') {
    type = HeaderType.H1
  }

  const headerToRender = headers[type]

  return <div>{headerToRender}</div>
}
