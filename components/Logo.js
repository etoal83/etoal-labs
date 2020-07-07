/** @jsx jsx */
import Link from 'next/link'
import { css, jsx } from '@emotion/core'

const logoAreaStyle = css({
  padding: '8px 20px',
  zIndex: 2000,
});

const logoTextStyle = css({
  color: 'white',
  fontSize: '2.0rem',
  fontWeight: 'bold'
});

const Logo = () => (
  <div css={logoAreaStyle}>
    <Link href="/">
      <a css={logoTextStyle}>EtoAl.com</a>
    </Link>
  </div>
)

export default Logo
