import Link from 'next/link'
import { css } from '@emotion/core'
import Logo from './Logo'

const Header = () => (
  <div>
    <Logo />
    <Link href="/works">
      <a>Works</a>
    </Link>
    <Link href="/articles">
      <a>Articles</a>
    </Link>
  </div>
)

export default Header