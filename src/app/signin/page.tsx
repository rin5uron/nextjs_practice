// src/app/signin/page.tsx
import styles from './signin-form.module.css';
import GoogleLoginButton from '@/components/ui/GoogleLoginButton'; // Googleボタンをインポート
// import LineLoginButton from '@/components/ui/LineLoginButton';   // LINEボタンをインポート

export default function AuthPage() {
  return (
    <div className={styles.container}>
      <div className={styles.formWrapper}>
        <h1 className={styles.title}>ログインまたは新規登録</h1>

        {/* --- ソーシャルログインボタンを配置 --- */}
        <div className={styles.socialLogins}>
          <GoogleLoginButton />
          {/* <LineLoginButton /> */}
        </div>

        <div className={styles.divider}>または</div>

        <form> {/* 機能は後で追加 */}
          <div className={styles.inputGroup}>
            <label htmlFor="email">メールアドレス</label>
            <input type="email" id="email" name="email" required />
          </div>
          <button type="submit" className={styles.emailButton}>
            メールアドレスで続ける
          </button>
        </form>
      </div>
    </div>
  );
}