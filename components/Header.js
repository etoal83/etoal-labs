import Link from 'next/link'

const Header = () => (
  <div>
    <Link href="/">
      <a>Home</a>
    </Link>
    <Link href="/works">
      <a>Works</a>
    </Link>
    <Link href="/articles">
      <a>Articles</a>
    </Link>
  </div>
)

export default Header