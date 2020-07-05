import App, { Container } from 'next/app'
import { Global, css, jsx } from '@emotion/core'

const globalStyles = css`
  * {
    font-family: "Helvetica Neue", Arial, "Hiragino Kaku Gothic ProN", "Hiragino Sans", Meiryo, sans-serif;
  }
`;

function MyApp ({ Component, pageProps }) {
  return (
    <>
      <Global styles={globalStyles} />
      <Component {...pageProps} />
    </>
  )
}

export default MyApp
