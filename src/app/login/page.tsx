// 学習の過程として残された古いコード
// ==================================================
// import styles from './LoginForm.module.css';

// export default function LoginPage() {
//   return (
//     <div className={styles.container}>
//       <h1 className={styles.title}>ログイン</h1>
//       <form className={styles.form}>
//         <div className={styles.inputGroup}>
//           <label htmlFor="email">メールアドレス</label>
//           <input type="email" id="email" name="email" required />
//         </div>
//         <div className={styles.inputGroup}>
//           <label htmlFor="password">パスワード</label>
//           <input type="password" id="password" name="password" required />
//         </div>
//         <button type="submit" className={styles.button}>ログイン</button>
//       </form>
//     </div>
//   );
// }

// フォーム送信時のハンドラ関数 (旧)
// const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
//   e.preventDefault(); // フォームのデフォルトの送信動作（ページリロード）を防ぐ
//   alert(`入力された情報:\ne-Mail: ${email}\nPassword: ${password}\n\nSend this？`);
//   // ここに後で「サーバーへのデータ送信」処理を実装します
// };

// APIなしでログイン (旧)
//   const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
//     e.preventDefault(); // フォームのデフォルト送信を防ぐ
    
//     try {
//       // /api/login エンドポイントへPOSTリクエストを送信
//       const response = await fetch('/api/login', {
//         method: 'POST', // HTTPメソッドはPOST
//         headers: {
//           'Content-Type': 'application/json', // リクエストボディの形式はJSON
//         },
//         // メールアドレスとパスワードをJSON形式で送信
//         body: JSON.stringify({ email, password }),
//       });

//       // サーバーからのレスポンスをJSONとしてパース
//       const data = await response.json();

//       if (response.ok) { // HTTPステータスコードが2xxの場合（成功）
//         alert(`ログイン成功: ${data.message}`);
//         // 成功後、ダッシュボードページなどへリダイレクトする処理をここに記述
//         // 例: window.location.href = '/dashboard';
//       } else { // HTTPステータスコードが2xx以外の場合（失敗）
//         alert(`ログイン失敗: ${data.message}`);
//       }
//     } catch (error) {
//       // ネットワークエラーなど、通信自体に問題があった場合
//       console.error('通信エラー:', error);
//       alert('通信中にエラーが発生しました。ネットワーク接続を確認してください。');
//     }
//   };
// ==================================================


"use client"; // このディレクティブは、このコンポーネントがクライアントサイドで実行されることを示します。

import { useState } from 'react'; // ReactのuseStateフックをインポート
import styles from './LoginForm.module.css';

export default function LoginPage() {
  // useStateを使って、emailとpasswordの状態変数とその更新関数を定義
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // API連携ログイン
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); // フォームのデフォルト送信を防ぐ
    
    try {
      // /api/login エンドポイントへPOSTリクエストを送信
      const response = await fetch('/api/login', {
        method: 'POST', // HTTPメソッドはPOST
        headers: {
          'Content-Type': 'application/json', // リクエストボディの形式はJSON
        },
        // メールアドレスとパスワードをJSON形式で送信
        body: JSON.stringify({ email, password }),
      });

      // サーバーからのレスポンスをJSONとしてパース
      const data = await response.json();

      if (response.ok) { // HTTPステータスコードが2xxの場合（成功）
        alert(`Welcome♡♡\n\n: ${data.message}`);
        // 成功後、ダッシュボードページなどへリダイレクトする処理をここに記述
        // 例: window.location.href = '/dashboard';
      } else { // HTTPステータスコードが2xx以外の場合（失敗）
        alert(`Login failedT^T!!\nTry again〜\n\n: ${data.message}`);
      }
    } catch (error) {
      // ネットワークエラーなど、通信自体に問題があった場合
      console.error('error:', error);
      alert('Lost in the cloud ☁️☁️ Check your network connection');
    }
  };

  return (
    <div className={styles.container}>

      <div className={styles.mainContent}>
        <div className={styles.formColumn}>
          <h1 className={styles.title}>Login</h1>
          <p style={{ textAlign: 'center', color: '#888', fontSize: '14px' }}>
            Try loging in with: any email(user@example.com) / anypassword you like
          </p>
          {/* onSubmitイベントにhandleSubmit関数を設定 */}
          <form className={styles.form} onSubmit={handleSubmit}>
            <div className={styles.inputGroup}>
              <label htmlFor="email">e-Mail</label>
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
              <label htmlFor="password">Password</label>
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
            <button type="submit" className={styles.button}>Login</button>
          </form>
        </div>

        {/* What I Learned Section */}
        <div className={styles.summaryCard}>
          <h2 className={styles.summaryTitle}>What I Learned</h2>
          <ul className={styles.summaryList}>
            <li>UI Construction with JSX & CSS Modules</li>
            <li>State Management with <strong>useState</strong> to remember user input in real-time</li>
            <li>Event Handling for form submissions</li>
            <li>Client-side API calls with <strong>fetch</strong> to send login data to the server</li>
            <li>Handling success/error responses from an API</li>
          </ul>
        </div>
      </div>

    </div>
  );
}