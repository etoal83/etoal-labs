/** @jsx jsx */
import Link from 'next/link'
import { css, jsx } from '@emotion/core'

const logoAreaStyle = css({
  padding: '1rem 1.2rem',
  zIndex: 2000,
});

const logoTextStyle = css({
  color: '#ccc',
  fontSize: '2.2rem',
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
