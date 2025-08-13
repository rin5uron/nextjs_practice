import Link from 'next/link';

export default function Header() {
  return (
    // headerに枠線をつけます
    <header style={{ padding: '1rem', borderBottom: '1px solid #ccc' }}>
      {/* navの中身を横並びにします */}
      <nav style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <Link href="/" style={{ fontWeight: 'bold', textDecoration: 'none' }}>
            My Next.js Site
          </Link>
        </div>
        {/* ulの中身を横並びにします */}
        <ul style={{ listStyle: 'none', display: 'flex', gap: '1rem' }}>
          <li><Link href="/">ホーム</Link></li>
          <li><Link href="/news">お知らせ</Link></li>
          <li><Link href="/products">商品紹介</Link></li>
          <li><Link href="/profile">プロフィール</Link></li>
          <li><Link href="/about">私について</Link></li>
        </ul>
      </nav>
    </header>
  );
}