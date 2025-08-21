// src/components/ui/ProfileCard.tsx

import Image from 'next/image';
import styles from './ProfileCard.module.css';

export default function ProfileCard() {
  return (
    <div className={styles.card}>
      <Image
        src="/girl.png" // publicフォルダにあるgirl.pngを使用
        alt="アバター画像"
        width={100}
        height={100}
        className={styles.avatar}
      />
      <h2>りん</h2>
      <p>Next.js勉強中！</p>
    </div>
  );
}
