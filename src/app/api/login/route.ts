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
        alert(`ログイン成功: ${data.message}`);
        // 成功後、ダッシュボードページなどへリダイレクトする処理をここに記述
        // 例: window.location.href = '/dashboard';
      } else { // HTTPステータスコードが2xx以外の場合（失敗）
        alert(`ログイン失敗: ${data.message}`);
      }
    } catch (error) {
      // ネットワークエラーなど、通信自体に問題があった場合
      console.error('通信エラー:', error);
      alert('通信中にエラーが発生しました。ネットワーク接続を確認してください。');
    }
  };