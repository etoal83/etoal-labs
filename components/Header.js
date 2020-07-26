/** @jsx jsx */
import Link from 'next/link'
import { css, jsx } from '@emotion/core'
import Logo from './Logo'
import Nav from './Nav'

const headerAreaStyle = css({
  position: 'fixed',
  display: 'flex',
  alignItems: 'center',
  backgroundColor: 'transparent',
  zIndex: 2000,
})

const Header = () => (
  <div css={headerAreaStyle}>
    <Logo />
    <Nav />
  </div>
)

export default Header