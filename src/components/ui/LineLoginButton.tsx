// src/components/ui/LineLoginButton.tsx
"use client";

import supabase from "@/lib/supabase";
import styles from './social-buttons.module.css';

// LINEのロゴSVG (https://www.svgrepo.com/svg/303177/line-logo より)
const LineIcon = () => (
  <svg width="24px" height="24px" viewBox="0 0 24 24" version="1.1" xmlns="http://www.w3.org/2000/svg">
    <path fill="#FFFFFF" d="M21.22,11.35,21.17,11.36C19.5,10.5,17.38,10,15,10A10,10,0,0,0,5,20H5a10,10,0,0,0,10,10h0a10,10,0,0,0,10-10v-.1A10,10,0,0,0,21.22,11.35ZM15.1,18H13.9V15.3h-1V18H11.7V12.8h1.2v2.1h1V12.8h1.2Zm-5.3.2h-2V12.8h2Zm-.4-4h-1.2v1.2h1.2Zm4.5,4H12.8V12.8h1.1Zm-9-4.2A1.2,1.2,0,1,1,6.1,15,1.2,1.2,0,0,1,4.9,13.8Z" transform="translate(-5 -10)"/>
    <path fill="#FFFFFF" d="M19.1,4.4a7.8,7.8,0,0,0-13.2,0,8.1,8.1,0,0,0-.9,3.8,8.1,8.1,0,0,0,.9,3.8,1.1,1.1,0,0,0,1,.8,1,1,0,0,0,1-.7,5.8,5.8,0,0,1-.7-2.9,5.8,5.8,0,0,1,.7-2.9,5.8,5.8,0,0,1,9.8,0,5.8,5.8,0,0,1,.7,2.9,5.8,5.8,0,0,1-.7,2.9,1,1,0,0,0,1,.7,1.1,1.1,0,0,0,1-.8,8.1,8.1,0,0,0,.9-3.8A8.1,8.1,0,0,0,19.1,4.4Z" transform="translate(-5 -2)"/>
  </svg>
);

export default function LineLoginButton() {
  const supabase = createClient();
  const handleLineLogin = async () => {
    await supabase.auth.signInWithOAuth({ 
      provider: 'line',
      options: {
        redirectTo: `${location.origin}/auth/callback`
      }
    });
  };

  return (
    <button onClick={handleLineLogin} className={`${styles.socialButton} ${styles.line}`}>
      <LineIcon />
      <span>LINEで続ける</span>
    </button>
  );
}
