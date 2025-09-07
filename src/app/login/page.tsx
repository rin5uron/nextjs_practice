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
      <div className={styles.formColumn}> {/* Form is now directly under container */}
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

      <div className={styles.cardsContainer}> {/* New container for cards */}
        {/* What I Learned Section */}
        <div className={styles.summaryCard}>
          <h2 className={styles.summaryTitle}>What I Learned</h2>
          <ul className={styles.summaryList}>
            <li>JSXとCSS ModulesによるUI構築</li>
            <li><strong>useState</strong>によるリアルタイム入力の状態管理</li>
            <li><strong>fetch</strong>を使ったクライアントサイドAPI呼び出し</li>
            <li>APIからの成功/エラー応答の処理</li>
            <li>接続拒否エラー: "ERR_CONNECTION_REFUSED"はサーバーセッション切れの可能性。`bun dev`で再起動。</li>
            <li><strong>`route.ts` (API):</strong> サーバーで動作し、データ処理が主。ログはサーバーのターミナルに出力。</li>
            <li><strong>`page.tsx` (ページ):</strong> ブラウザで動作し、画面表示が主。ログはブラウザコンソール、アラートは画面に表示。</li>
            <li>JSX内でJavaScriptのコメントを埋め込むには、{"{}"}で囲む必要がある</li>
            <li><strong>Next.jsプロジェクトにおける layout.tsx と components</strong>
              ディレクトリの役割をまとめます。
              layout.tsx は共通レイアウト、components
              は再利用可能なUI部品を置く場所。
            </li>
            <li>サーバーへデプロイする際はフレームワーク全体をデプロイし、その後
            以降でプロジェクト（ルート）を指定する
            </li>
          </ul>
        </div>

        {/* Next Steps Section */}
        <div className={styles.summaryCard}>
          <h2 className={styles.summaryTitle}>Next Steps</h2>
          <ul className={styles.summaryList}>
            <li>Supabaseを導入し、より堅牢で拡張性の高い機能を実装</li>
            <li>Google認証によるログイン実装</li>
            <li>LINE認証によるログイン実装</li>
          </ul>
        </div>

        
      </div>
    </div>
  );
}