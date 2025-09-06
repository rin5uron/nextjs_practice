import styles from './LoginForm.module.css';

export default function LoginPage() {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>ログイン</h1>
      <form className={styles.form}>
        <div className={styles.inputGroup}>
          <label htmlFor="email">メールアドレス</label>
          <input type="email" id="email" name="email" required />
        </div>
        <div className={styles.inputGroup}>
          <label htmlFor="password">パスワード</label>
          <input type="password" id="password" name="password" required />
        </div>
        <button type="submit" className={styles.button}>ログイン</button>
      </form>
    </div>
  );
}

"use client"; // このディレクティブは、このコンポーネントがクライアントサイドで実行されることを示します。

import { useState } from 'react'; // ReactのuseStateフックをインポート
import styles from './LoginForm.module.css';

export default function LoginPage() {
  // useStateを使って、emailとpasswordの状態変数とその更新関数を定義
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // フォーム送信時のハンドラ関数
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); // フォームのデフォルトの送信動作（ページリロード）を防ぐ
    alert(`入力された情報:\nメールアドレス: ${email}\nパスワード: ${password}`);
    // ここに後で「サーバーへのデータ送信」処理を実装します
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>ログイン</h1>
      {/* onSubmitイベントにhandleSubmit関数を設定 */}
      <form className={styles.form} onSubmit={handleSubmit}>
        <div className={styles.inputGroup}>
          <label htmlFor="email">メールアドレス</label>
          {/* input要素のvalueとonChangeを状態変数と紐付け */}
          <input
            type="email"
            id="email"
            name="email"
            value={email} // email状態変数の値を表示
            onChange={(e) => setEmail(e.target.value)} // 入力値が変更されるたびにemail状態を更新
            required
          />
        </div>
        <div className={styles.inputGroup}>
          <label htmlFor="password">パスワード</label>
          {/* input要素のvalueとonChangeを状態変数と紐付け */}
          <input
            type="password"
            id="password"
            name="password"
            value={password} // password状態変数の値を表示
            onChange={(e) => setPassword(e.target.value)} // 入力値が変更されるたびにpassword状態を更新
            required
          />
        </div>
        <button type="submit" className={styles.button}>ログイン</button>
      </form>
    </div>
  );
}