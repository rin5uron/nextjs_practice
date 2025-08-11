import Link from 'next/link'; // ページ間を移動するための Next.js のコンポーネント

export default function Header() {
  return (
    <header style={{ padding: '1rem', borderBottom: '1px solid #ccc' }}>
      <nav style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <Link href="/" style={{ fontWeight: 'bold', textDecoration: 'none' }}>
            My Next.js Site
          </Link>
        </div>
        <ul style={{ listStyle: 'none', display: 'flex', gap: '1rem' }}>
          <li><Link href="/">ホーム</Link></li>
          <li><Link href="/news">お知らせ</Link></li>
          <li><Link href="/products">商品紹介</Link></li>
          <li><Link href="/profile">プロフィール</Link></li>
        </ul>
      </nav>
    </header>
  );
}

