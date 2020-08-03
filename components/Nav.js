/** @jsx jsx */
import Link from 'next/link'
import { css, jsx } from '@emotion/core'

const navTextStyles = css({
  color: '#aaa',
})

const navItemStyles = css({
  padding: '1em 1.2rem 0.6rem',
})

const navAreaStyles = css({
  display: 'flex',
  justifyContent: 'flex-end',
})

const NavItem = ({ label, url }) => (
  <div css={navItemStyles}>
    <Link href={url}>
      <a css={navTextStyles}>{label}</a>
    </Link>
  </div>
)

const Nav = () => (
  <div css={navAreaStyles}>
    <NavItem label="Apps" url="/app" />
    <NavItem label="Blog" url="/blog" />
  </div>
)

export default Nav
