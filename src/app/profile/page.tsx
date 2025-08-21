// ★ 1. 作ったカードをインポート
import ProfileCard from '@/components/ui/ProfileCard';

export default function ProfilePage() {
  return (
    <div>
      <h1>プロフィール</h1>
      {/* ★ 2. カードを配置 */}
      <ProfileCard />
    </div>
  );
}