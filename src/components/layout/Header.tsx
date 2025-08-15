import Link from 'next/link';
import styles from './Header.module.css';
import Image from 'next/image';

export default function Header() {
  return (
    <header className={styles.header}>
      <nav style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <Link href="/">
            <Image
              src="/next.svg" // publicフォルダからのパス
              alt="Next.js Logo" // 画像の説明
              width={100} // 表示する幅
              height={24} // 表示する高さ
            />
          </Link>
        </div>
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