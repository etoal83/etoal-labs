/** @jsx jsx */
import Link from 'next/link'
import { css, jsx } from '@emotion/core'

const NavItem = ({ label, url }) => (
  <div>
    <Link href={url}>
      <a>{label}</a>
    </Link>
  </div>
)

const Nav = () => (
  <>
    <NavItem label="Works" url="/works" />
    <NavItem label="Articles" url="/articles" />
  </>
)

export default Nav
