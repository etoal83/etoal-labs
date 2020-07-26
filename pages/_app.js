import App from 'next/app'
import { Global, css } from '@emotion/core'
import emotionReset from 'emotion-reset'

const globalStyles = css`
  ${emotionReset}
  html {
    font-family: "Helvetica Neue", Arial, "Hiragino Kaku Gothic ProN", "Hiragino Sans", Meiryo, Roboto, sans-serif;
    box-sizing: border-box;
  }
  a {
    cursor: pointer;
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
