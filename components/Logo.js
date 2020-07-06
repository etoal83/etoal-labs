import Link from 'next/link'
import { css } from '@emotion/core'

const logoAreaStyle = css({
  margin: '8px 20px',
  zIndex: 2000,
});

const logoTextStyle = css({
  color: 'red'
});

const Logo = () => (
  <div css={logoAreaStyle}>
    <Link href="/">
      <a css={logoTextStyle}>EtoAl.com</a>
    </Link>
  </div>
)

export default Logo
