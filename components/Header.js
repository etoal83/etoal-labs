/** @jsx jsx */
import Link from 'next/link'
import { css, jsx } from '@emotion/core'
import Logo from './Logo'
import Nav from './Nav'

const headerAreaStyle = css({
  backgroundColor: 'black',
})

const Header = () => (
  <div css={headerAreaStyle}>
    <Logo />
    <Nav />
  </div>
)

export default Header