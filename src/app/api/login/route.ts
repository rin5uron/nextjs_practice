import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const { email, password } = await request.json();

    // Learning note: To embed JavaScript comments within JSX, you need to enclose them in `{}`.
    console.log("To embed JavaScript comments within JSX, you need to enclose them in `{}`.");

    if (email === 'test@example.com' && password === 'password123') {
      return NextResponse.json({ message: 'ログイン成功！' });
    } else {
      return NextResponse.json({ message: 'メールアドレスまたはパスワードが違います。' }, { status: 401 });
    }
  } catch (error) {
    console.error('APIエラー:', error);
    return NextResponse.json({ message: 'サーバーエラーが発生しました。' }, { status: 500 });
  }
}
